---
id: PRD-002
slug: backend-sessions
title: Backend Chat Sessions Foundation
status: active
base_branch: main
epic_branch: epic/PRD-002-backend-sessions
created: 2026-05-21
updated: 2026-05-21
---

# PRD-002: Backend Chat Sessions Foundation

## 1. Executive Summary
This PRD outlines the foundational backend infrastructure for the AI Database Analysis App. The goal of this phase is to establish a FastAPI server, configure dual database connections (SQLite for state, PostgreSQL for future data analysis), and implement the core domain models and API endpoints required to persist chat sessions and messages. No AI integration is included in this phase.

## 2. Mission
Provide a robust, async-first backend foundation that safely separates operational state (chat history) from analytical data, following a strict Layered Architecture to enable parallel frontend development.

## 3. Target Users
- **Frontend Developers:** Need reliable REST endpoints to build the chat UI.
- **AI Backend Developers:** Will depend on this session infrastructure to inject historical context into LLM prompts in future phases.

## 4. MVP Scope
- [x] FastAPI project initialization and configuration.
- [x] SQLite database connection (for operational state: sessions & messages).
- [x] Empty/Placeholder PostgreSQL connection (read-only target for future AI).
- [x] SQLAlchemy 2.0 ORM models for `Session` and `Message`.
- [x] Pydantic v2 schemas for data validation.
- [x] CRUD API endpoints for managing sessions and messages.
- [ ] LLM or AI Agent integration.
- [ ] User authentication.

## 5. User Stories
- **Story 1:** As a frontend app, I want to create a new chat session so that the user can start a new conversation.
- **Story 2:** As a frontend app, I want to retrieve a list of all past sessions so that the user can see their history.
- **Story 3:** As a frontend app, I want to save a new message to a specific session so that the conversation state is persisted.
- **Story 4:** As a frontend app, I want to load all messages for a specific session ID so that the user can resume a previous chat.

## 6. Core Architecture & Patterns
- **Layered Architecture:** Routes -> Services -> Repositories -> Models.
- **Database Segregation:** 
  - `app.db` (SQLite): Manages application state.
  - `analytics.db` (PostgreSQL): Strictly read-only connection configured via environment variables.
- **FastAPI Standards:** Use Dependency Injection for database sessions, functional/declarative programming, and early returns for error handling.

## 7. Tools/Features
- **Database Configuration:** `app/core/database.py` will manage two separate SQLAlchemy engines and session makers.
- **Session Model:** `id` (UUID or Integer), `title` (String), `created_at` (DateTime).
- **Message Model:** `id` (UUID or Integer), `session_id` (ForeignKey), `role` (String: 'user' or 'assistant'), `content` (Text), `created_at` (DateTime).

## 8. Technology Stack
- **Framework:** FastAPI (Python)
- **Validation:** Pydantic v2
- **ORM:** SQLAlchemy 2.0 (async preferred)
- **Databases:** SQLite (local file), PostgreSQL (via asyncpg or psycopg)
- **Skills referenced:** `fastapi-python`

## 9. Security & Configuration
- **Environment Variables:** `DATABASE_URL` (SQLite, default `sqlite+aiosqlite:///app.db`), `ANALYTICS_DATABASE_URL` (PostgreSQL, default empty/placeholder).
- **CORS:** Must be configured to allow local frontend development (`localhost:5173`).

## 10. API Specification
- `POST /api/v1/sessions/`: Create a new session.
- `GET /api/v1/sessions/`: List all sessions.
- `GET /api/v1/sessions/{id}/messages/`: Get all messages for a session.
- `POST /api/v1/sessions/{id}/messages/`: Add a new message to a session.

## 11. Success Criteria
- [x] The FastAPI server starts without errors.
- [x] `app.db` is created automatically with the `sessions` and `messages` tables.
- [x] All 4 API endpoints return 200 OK or 201 Created on happy paths.
- [x] The PostgreSQL connection is defined but handles absence of credentials gracefully (since it's a placeholder for now).

## 12. Implementation Phases
- **Phase 1: Database Setup:** Configure SQLAlchemy with both SQLite and Postgres engines.
- **Phase 2: Models & Schemas:** Create `Session` and `Message` SQLAlchemy models and Pydantic schemas.
- **Phase 3: Repositories & Services:** Implement the data access and business logic layers.
- **Phase 4: Routers:** Expose the REST API endpoints and connect them to the main FastAPI app.

## 13. Future Considerations
- In the next PRD, a new endpoint (e.g., `POST /api/v1/sessions/{id}/chat`) will be added to trigger the pydantic-ai agent.
- Pagination for the messages endpoint.

## 14. Risks & Mitigations
- **Risk:** Complexity of managing two database engines in one app.
  - **Mitigation:** Strictly separate the dependency injections (`get_db` for SQLite vs `get_analytics_db` for Postgres).

## 15. Appendix
- Architecture guidelines: `backend/AGENTS.md`
- Skills referenced: `fastapi-python`
