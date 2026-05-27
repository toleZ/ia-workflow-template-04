---
story: STORY-004
prd: PRD-006
slug: agent-analytical-tools
title: Agent Analytical Tools Implementation
type: BUG_FIX
complexity: MEDIUM
epic_branch: epic/PRD-006-postgres-migration
created: 2026-05-27
---

# Plan: Agent Analytical Tools Implementation

## Summary

This plan addresses the final integration of the AI agent with the Analytical PostgreSQL database. While the starter template provides the `execute_query`, `list_tables`, and `get_table_metadata` tools with strict SELECT validations and a Database Analyst system prompt, there are a few integration issues:
1. Dependency injection mismatch in `database.py` (yielding Session instead of Engine).
2. Attribute mismatch in `chat.py` (expecting `result.data` instead of `result.output`).
3. Outdated environment variables in `.env`.

This plan will fix these issues, ensuring the agent correctly identifies and queries the PostgreSQL analytical dataset.

## User Story

As a User
I want the AI agent to have specialized tools to explore and query the analytical database
So that I can get answers to my data-related questions in natural language

## Story Reference

- Story file: `.agents/stories/PRD-006-postgresql-migration/STORY-004-agent-analytical-tools.md`
- PRD: `.agents/PRDs/PRD-006-postgresql-migration/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | BUG_FIX |
| Complexity | MEDIUM |
| Systems Affected | Agent, Database, Chat Service |
| Story | STORY-004 |
| PRD | PRD-006 |
| Epic Branch | `epic/PRD-006-postgres-migration` |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| `building-pydantic-ai-agents` | Pydantic AI agent tools and result handling | Task 2 |

---

## Patterns to Follow

### Dependency Injection
Modify `get_analytics_db` to yield the `Engine` directly as expected by the tools and the `AgentDeps`.

### Result Handling
Use `result.output` for retrieving the agent's text response in `process_chat`.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/app/core/database.py` | UPDATE | Fix `get_analytics_db` to yield `analytics_engine`. |
| `backend/app/services/chat.py` | UPDATE | Change `result.data` to `result.output`. |
| `backend/.env` | UPDATE | Set `ANALYTICS_DATABASE_URL` to port 5435. |

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Fix Dependency Injection

- **File**: `backend/app/core/database.py`
- **Action**: UPDATE
- **Implement**: 
  - Modify `get_analytics_db` to `yield analytics_engine`.
- **Validate**: Python script connecting via `get_analytics_db` returns an Engine.

### Task 2: Fix Chat Service Result Handling

- **File**: `backend/app/services/chat.py`
- **Action**: UPDATE
- **Implement**: 
  - Replace `result.data` with `result.output` in the assistant response creation block.
- **Validate**: Chat responses are correctly saved to the database.

### Task 3: Finalize Environment Configuration

- **File**: `backend/.env`
- **Action**: UPDATE
- **Implement**: 
  - Ensure `ANALYTICS_DATABASE_URL=postgresql+psycopg://agent_user:agent_password@localhost:5435/analytics_db`.
- **Validate**: `cat backend/.env` shows the correct port 5435.

---

## End-to-End Tests

- [ ] Ask the agent: "List my analytical tables."
- [ ] Ask the agent: "Who is the top customer?"
- [ ] Verify both answers come from the PostgreSQL DB on port 5435.

---

## Validation

```bash
cd backend && ../backend/.venv/bin/python -c "from app.core.database import analytics_engine; print(analytics_engine.url)"
```

---

## Acceptance Criteria

- [ ] The `execute_query` tool in `backend/app/services/agent.py` is updated to use the `analytics_db` engine.
- [ ] The `list_tables` and `get_table_metadata` tools are fully functional.
- [ ] Strict `SELECT` validation is enforced.
- [ ] The agent's system prompt is updated.
- [ ] A query that successfully joins two tables returns correct data.
- [ ] All tasks completed
