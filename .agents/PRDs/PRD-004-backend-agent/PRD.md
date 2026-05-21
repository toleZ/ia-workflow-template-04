---
id: PRD-004
slug: backend-agent
title: AI Database Analysis Agent
status: active
base_branch: main
epic_branch: epic/PRD-004-backend-agent
created: 2026-05-21
updated: 2026-05-21
---

# PRD-004: AI Database Analysis Agent

## 1. Executive Summary
This PRD defines the integration of an AI Agent into the FastAPI backend using `pydantic-ai`. The agent will be capable of inspecting a PostgreSQL database schema and executing read-only SQL queries to answer user questions in natural language. It will also integrate with the existing SQLite message history to maintain conversational context.

## 2. Mission
Provide a safe, intelligent, and conversational bridge between users and their data.
- **Accuracy:** Ensure the agent only answers based on real database schema and records.
- **Security:** Aggressively prevent any non-SELECT queries (No-Mutations).
- **Context:** Use message history to allow for multi-turn data exploration.

## 3. Target Users
- **Data Analysts:** Who want quick answers without writing SQL.
- **Business Users:** Who need to explore trends and summaries in the application data.

## 4. MVP Scope
- [x] Integration of `pydantic-ai` library into the FastAPI project.
- [x] Connection to the analytical PostgreSQL database (using `get_analytics_db`).
- [x] Agent Tool: `list_tables` (Lists all tables in the public schema).
- [x] Agent Tool: `get_table_metadata` (Returns column names and types for a specific table).
- [x] Agent Tool: `execute_query` (Executes a raw SQL string, strictly enforced as SELECT).
- [x] Chat Endpoint: `POST /api/v1/sessions/{id}/chat` that orchestrates history loading, agent run, and response persistence.
- [ ] Support for complex visualization data types.
- [ ] Agent self-correction (retrying failed SQL queries).

## 5. User Stories
- **Story 1:** As a user, I want the AI to know what data is available so it doesn't hallucinate non-existent tables.
- **Story 2:** As a user, I want to ask "Which country has the most records?" and get a natural language answer based on the real database.
- **Story 3:** As an administrator, I want to be 100% sure the AI cannot drop or modify any data.
- **Story 4:** As a user, I want to ask follow-up questions (e.g., "And what about the second one?") and have the AI remember the previous context.

## 6. Core Architecture & Patterns
- **Agent Framework:** `pydantic-ai`.
- **System Prompt:** Instructs the agent on how to use tools to explore the schema before querying.
- **Dependency Injection:** Use Pydantic AI's `RunContext` to pass the analytical database connection.
- **Persistence:** Before running the agent, load `Message` history from SQLite; after the run, save both the user prompt and the AI response back to SQLite.

## 7. Tools/Features
- **`list_tables`**: Queries `information_schema.tables`.
- **`get_table_metadata`**: Queries `information_schema.columns`.
- **`execute_query`**: Uses SQLAlchemy's `text()` with a regex check to ensure the query starts with `SELECT`.

## 8. Technology Stack
- **Backend:** FastAPI.
- **AI Engine:** `pydantic-ai`.
- **LLM:** OpenAI (GPT-4o or GPT-4o-mini).
- **ORM/Query:** SQLAlchemy 2.0.
- **Database:** SQLite (History) + PostgreSQL (Data).

## 9. Security & Configuration
- **Environment Variables:** `OPENAI_API_KEY`, `ANALYTICS_DATABASE_URL`.
- **Read-Only Enforcement:** The `execute_query` tool must explicitly fail if `INSERT`, `UPDATE`, `DELETE`, `DROP`, or `ALTER` keywords are detected.

## 10. API Specification
**POST `/api/v1/sessions/{session_id}/chat`**
- **Request Body:** `{ "prompt": "string" }`
- **Logic:**
  1. Load history from SQLite for `session_id`.
  2. Instantiate `pydantic-ai` agent with history.
  3. Run agent with `prompt`.
  4. Save prompt (user) and response (assistant) to SQLite.
- **Response:** `MessageRead` (The assistant's message).

## 11. Success Criteria
- [x] The agent successfully lists the `paises` table.
- [x] The agent correctly answers "How many countries are there?".
- [x] The agent rejects a prompt to "Delete all countries".
- [x] Conversational context is maintained across two consecutive messages.

## 12. Implementation Phases
- **Phase 1: Agent Setup:** Configure the `pydantic-ai` agent and define the system prompt.
- **Phase 2: Database Tools:** Implement the 3 core tools (`list_tables`, `metadata`, `query`) using SQLAlchemy.
- **Phase 3: Service Integration:** Create the chat service that combines history loading, agent execution, and result saving.
- **Phase 4: API Endpoint:** Expose the chat functionality via a FastAPI router.

## 13. Future Considerations
- Streaming responses for better UX.
- Tool for "generating charts" from data.
- User-specific permissions for certain tables.

## 14. Risks & Mitigations
- **Risk:** SQL Injection via LLM.
  - **Mitigation:** Strict SELECT-only regex and read-only DB user credentials.
- **Risk:** Token cost of large histories.
  - **Mitigation:** Implement message windowing/trimming if history exceeds a certain threshold.

## 15. Appendix
- Skills: `building-pydantic-ai-agents`, `fastapi-python`.
- Existing state: `PRD-002` (Backend Sessions Foundation).
