---
id: STORY-004
prd: PRD-006
slug: agent-analytical-tools
title: Agent Analytical Tools Implementation
type: feature
priority: high
complexity: medium
phase: 3
status: todo
labels: [backend, ai, agent]
epic_branch: epic/PRD-006-postgres-migration
plan: null
report: null
commit: null
depends_on: [STORY-002, STORY-003]
blocks: []
skills: [building-pydantic-ai-agents]
created: 2026-05-27
updated: 2026-05-27
---

# STORY-004: Agent Analytical Tools Implementation

## Description

As a User, I want the AI agent to have specialized tools to explore and query the analytical database, so that I can get answers to my data-related questions in natural language.

## Acceptance Criteria

- [ ] The `execute_query` tool in `backend/app/services/agent.py` is updated to use the `analytics_db` engine.
- [ ] The `list_tables` and `get_table_metadata` tools are fully functional and tested with the Postgres instance.
- [ ] Strict `SELECT` validation is enforced in `execute_query`.
- [ ] The agent's system prompt is updated to reflect its role as a "Database Analyst".
- [ ] A query that successfully joins two tables returns correct data.

## Technical Notes

- Mirror patterns from `building-pydantic-ai-agents` skill for tool definition and error handling.
- Use `inspect(ctx.deps.analytics_db)` to retrieve schema information.
- Ensure `execute_query` uses a connection from the `analytics_db` engine.

## Dependencies

- **Blocked by**: STORY-002, STORY-003
- **Blocks**: None

## PRD Reference

Source: [PRD-006/PRD.md](../../PRDs/PRD-006-postgresql-migration/PRD.md) — Section 11, Phase 3
