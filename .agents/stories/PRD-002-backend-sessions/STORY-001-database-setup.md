---
id: STORY-001
prd: PRD-002
slug: database-setup
title: Configure Dual Database Connections
type: technical
priority: high
complexity: medium
phase: 1
status: done
labels: [backend, infrastructure]
epic_branch: epic/PRD-002-backend-sessions
plan: .agents/plans/PRD-002-backend-sessions/completed/STORY-001-database-setup.plan.md
report: .agents/reports/PRD-002-backend-sessions/STORY-001-database-setup.report.md
commit: 07537a3fe9bc2388b642bb6d1c392b2efdcfd25a
depends_on: []
blocks: [STORY-002]
skills: [fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-001: Configure Dual Database Connections

## Description

As a backend developer, I want to configure dual database connections (SQLite for state, PostgreSQL placeholder for analytics) so that the application can safely segregate operational and analytical data.

## Acceptance Criteria

- [ ] Given the FastAPI app starts, when I check `app/core/database.py`, then I see two separate SQLAlchemy engines defined (one for SQLite, one for PostgreSQL).
- [ ] Given the application is running, when it initializes, then it automatically creates `app.db` if it doesn't exist.
- [ ] Given the PostgreSQL connection is a placeholder, when the credentials are empty, then the app does not crash on startup unless an analytical query is explicitly made.

## Technical Notes

- Files likely to be modified: `app/core/database.py`, `app/core/config.py`.
- Use Dependency Injection (`get_db` and `get_analytics_db`).
- Follow `fastapi-python` skill guidelines for async operations.

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-002

## PRD Reference

Source: [`PRD-002/PRD.md`](../../PRDs/PRD-002-backend-sessions/PRD.md) — section 12 (Phase 1)
