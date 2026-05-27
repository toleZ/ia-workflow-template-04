import logging
from sqlalchemy.orm import Session
from sqlalchemy import Engine

from pydantic_ai.messages import ModelMessage, ModelRequest, ModelResponse, TextPart, UserPromptPart
from app.services.agent import db_analyst_agent, AgentDeps
from app.services import session as session_svc
from app.services import message as message_svc
from app.schemas.message import MessageCreate, MessageRead

logger = logging.getLogger("api.services.chat")


def _format_history(messages: list[MessageRead]) -> list[ModelMessage]:
    """Translates database Message schemas into Pydantic AI ModelMessage objects."""
    history: list[ModelMessage] = []
    for msg in messages:
        if msg.role == "user":
            history.append(ModelRequest(parts=[UserPromptPart(content=msg.content)]))
        elif msg.role == "assistant":
            history.append(ModelResponse(parts=[TextPart(content=msg.content)]))
    return history


def process_chat(
    db: Session, analytics_db: Engine, session_id: int, prompt: str
) -> MessageRead:
    """
    Orchestrates the chat flow:
    1. Verifies session existence.
    2. Persists user prompt.
    3. Loads and formats history.
    4. Executes the AI agent.
    5. Persists AI response.
    """
    logger.info("process_chat session_id=%d prompt='%s...'", session_id, prompt[:20])

    # 1. Verify session exists
    session_svc._get_or_404(db, session_id)

    # 2. Save user prompt to DB
    message_svc.create_message(db, session_id, MessageCreate(role="user", content=prompt))

    # 3. Fetch full history to pass context to the agent
    # We load history after saving the user prompt, then exclude the last one 
    # because run_sync takes the 'new' prompt as its first argument.
    all_messages = message_svc.list_messages(db, session_id, limit=100)
    history = _format_history(all_messages[:-1])

    # 4. Run the AI agent
    deps = AgentDeps(db=db, analytics_db=analytics_db)
    
    try:
        result = db_analyst_agent.run_sync(
            prompt, 
            deps=deps, 
            message_history=history
        )
        
        # 5. Save assistant response
        ai_message = message_svc.create_message(
            db, 
            session_id, 
            MessageCreate(role="assistant", content=result.output)
        )
        
        return ai_message

    except Exception as e:
        logger.error("AI Agent error: %s", str(e))
        # Save a friendly error message as the assistant response so it's persisted in history
        error_msg = "I encountered an error while processing your request. Please try again or check your query."
        return message_svc.create_message(
            db, 
            session_id, 
            MessageCreate(role="assistant", content=error_msg)
        )
