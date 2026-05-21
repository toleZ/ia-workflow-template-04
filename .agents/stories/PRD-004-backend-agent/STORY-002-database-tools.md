---
id: STORY-002
prd: PRD-004
slug: database-tools
title: Database Inspection & Query Tools
type: technical
priority: high
complexity: medium
phase: 2
status: done
labels: [backend, ai, sql]
epic_branch: epic/PRD-004-backend-agent
plan: .agents/plans/PRD-004-backend-agent/completed/STORY-002-database-tools.plan.md
report: .agents/reports/PRD-004-backend-agent/STORY-002-database-tools.report.md
commit: aa51908aebbbbf90d632d8df3b98b7006b4f48ac
depends_on: [STORY-001]
blocks: [STORY-003]
skills: [building-pydantic-ai-agents, fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-002: Database Inspection & Query Tools

## Description

As a developer, I want to implement the `list_tables`, `get_table_metadata`, and `execute_query` tools so the agent can safely interact with the PostgreSQL analytical database.

## Acceptance Criteria

- [ ] Given the `list_tables` tool, when called by the agent, then it returns all table names from the `public` schema.
- [ ] Given the `get_table_metadata` tool, when provided a table name, then it returns columns and types for that table.
- [ ] Given the `execute_query` tool, when provided a `SELECT` query, then it executes it and returns the rows.
- [ ] Given the `execute_query` tool, when provided an `INSERT/UPDATE/DELETE/DROP` query, then it raises an error or rejects the execution.

## Technical Notes

- Use `@agent.tool` decorator in `app/services/agent.py`.
- Use SQLAlchemy's `inspect` or raw SQL on `information_schema`.
- Implement strict regex or keyword checking for `SELECT` enforcement.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-003

## PRD Reference

Source: [`PRD-004/PRD.md`](../../PRDs/PRD-004-backend-agent/PRD.md) — section 12 (Phase 2)
