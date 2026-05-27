---
story: STORY-003
prd: PRD-006
slug: backend-dual-db-config
title: Backend Dual Database Configuration
type: TECHNICAL
complexity: LOW
epic_branch: epic/PRD-006-postgres-migration
created: 2026-05-27
---

# Plan: Backend Dual Database Configuration

## Summary

This plan outlines the updates required in the FastAPI backend to actively connect to the new PostgreSQL container while maintaining the existing SQLite connection for sessions. We will update the `.env` / `.env.example` files to set `ANALYTICS_DATABASE_URL`, and install the `psycopg[binary]` driver. The `database.py` file is already structurally prepared for dual engines, so setting the environment variable and ensuring the driver is installed is the primary goal.

## User Story

As a Developer
I want to configure the FastAPI backend to support a secondary PostgreSQL connection
So that the application can distinguish between session data (SQLite) and analytical data (Postgres)

## Story Reference

- Story file: `.agents/stories/PRD-006-postgresql-migration/STORY-003-backend-dual-db-config.md`
- PRD: `.agents/PRDs/PRD-006-postgresql-migration/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | TECHNICAL |
| Complexity | LOW |
| Systems Affected | Backend Configuration |
| Story | STORY-003 |
| PRD | PRD-006 |
| Epic Branch | `epic/PRD-006-postgres-migration` |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| `fastapi-python` | Dependency injection & environment variable config | Task 3 |

---

## Patterns to Follow

### Database Configuration
- Use `psycopg[binary]` as it works out-of-the-box synchronously with SQLAlchemy 2.0.
- `ANALYTICS_DATABASE_URL` will point to `postgresql+psycopg://agent_user:agent_password@localhost:5435/analytics_db`.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/requirements.txt` | UPDATE | Add `psycopg[binary]`. |
| `backend/.env.example` | UPDATE | Add `ANALYTICS_DATABASE_URL` template. |
| `backend/.env` | UPDATE | (Local only) Set `ANALYTICS_DATABASE_URL`. |

*(Note: `app/core/config.py` and `app/core/database.py` already support this if the ENV var is present).*

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Add PostgreSQL Driver

- **File**: `backend/requirements.txt`
- **Action**: UPDATE
- **Implement**: Append `psycopg[binary]>=3.0.0` to the requirements file.
- **Validate**: Run `pip install -r backend/requirements.txt`.

### Task 2: Update Environment Examples

- **File**: `backend/.env.example`
- **Action**: UPDATE
- **Implement**: Add `ANALYTICS_DATABASE_URL=postgresql+psycopg://agent_user:agent_password@localhost:5435/analytics_db`
- **Validate**: File contains the new variable.

### Task 3: Configure Local Environment

- **Action**: COMMAND
- **Implement**: Copy or append the `ANALYTICS_DATABASE_URL` to `backend/.env`.
- **Validate**: `backend/.env` contains the correct connection string.

---

## End-to-End Tests

- [ ] Start the backend server (`cd backend && uvicorn app.main:app --reload`).
- [ ] Ensure no startup errors occur (meaning both engines connected/initialized).

---

## Validation

```bash
cd backend && pip install -r requirements.txt
python -c "from app.core.database import analytics_engine; analytics_engine.connect()"
```

---

## Acceptance Criteria

- [ ] `backend/app/core/config.py` is updated to include `ANALYTICS_DATABASE_URL` (Already exists).
- [ ] `backend/app/core/database.py` correctly initializes the `analytics_engine` using the new environment variable.
- [ ] A `get_analytics_db` dependency is available for use in routers or services.
- [ ] The application starts without errors when the Postgres URL is provided.
- [ ] All tasks completed
