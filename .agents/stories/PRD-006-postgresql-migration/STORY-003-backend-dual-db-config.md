---
id: STORY-003
prd: PRD-006
slug: backend-dual-db-config
title: Backend Dual Database Configuration
type: technical
priority: high
complexity: small
phase: 2
status: done
labels: [backend, config]
epic_branch: epic/PRD-006-postgres-migration
plan: .agents/plans/PRD-006-postgresql-migration/completed/STORY-003-backend-dual-db-config.plan.md
report: .agents/reports/PRD-006-postgresql-migration/STORY-003-backend-dual-db-config.report.md
commit: 76d30fdbc1333d0d8d7080fa9727de398eb041c6
depends_on: [STORY-001]
blocks: [STORY-004]
skills: [fastapi-python]
created: 2026-05-27
updated: 2026-05-27
---

# STORY-003: Backend Dual Database Configuration

## Description

As a Developer, I want to configure the FastAPI backend to support a secondary PostgreSQL connection, so that the application can distinguish between session data (SQLite) and analytical data (Postgres).

## Acceptance Criteria

- [ ] `backend/app/core/config.py` is updated to include `ANALYTICS_DATABASE_URL`.
- [ ] `backend/app/core/database.py` correctly initializes the `analytics_engine` using the new environment variable.
- [ ] A `get_analytics_db` dependency is available for use in routers or services.
- [ ] The application starts without errors when the Postgres URL is provided.

## Technical Notes

- Use `asyncpg` or `psycopg[binary]` as the driver for PostgreSQL.
- Ensure the SQLite connection remains untouched.
- Reference `fastapi-python` skill for dependency injection patterns.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-004

## PRD Reference

Source: [PRD-006/PRD.md](../../PRDs/PRD-006-postgresql-migration/PRD.md) — Section 11, Phase 2
