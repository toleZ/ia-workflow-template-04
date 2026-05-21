import logging
from sqlalchemy.orm import Session

from app.repositories import message as repo
from app.services.session import _get_or_404
from app.schemas.message import MessageCreate, MessageRead

logger = logging.getLogger("api.services.message")


def list_messages(db: Session, session_id: int, skip: int = 0, limit: int = 100) -> list[MessageRead]:
    logger.debug("list_messages session_id=%d skip=%d limit=%d", session_id, skip, limit)
    _get_or_404(db, session_id)  # Ensure session exists
    return [MessageRead.model_validate(m) for m in repo.list_by_session(db, session_id, skip, limit)]


def create_message(db: Session, session_id: int, data: MessageCreate) -> MessageRead:
    logger.info("create_message session_id=%d role=%s", session_id, data.role)
    _get_or_404(db, session_id)  # Ensure session exists
    return MessageRead.model_validate(repo.create(db, session_id, data))
