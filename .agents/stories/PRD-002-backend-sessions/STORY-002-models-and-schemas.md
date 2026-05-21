---
id: STORY-002
prd: PRD-002
slug: models-and-schemas
title: Create Session and Message Models & Schemas
type: feature
priority: high
complexity: small
phase: 2
status: done
labels: [backend, data]
epic_branch: epic/PRD-002-backend-sessions
plan: .agents/plans/PRD-002-backend-sessions/completed/STORY-002-models-and-schemas.plan.md
report: .agents/reports/PRD-002-backend-sessions/STORY-002-models-and-schemas.report.md
commit: 42cfc353614ffd03205fdb639a20795eebd718cb
depends_on: [STORY-001]
blocks: [STORY-003]
skills: [fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-002: Create Session and Message Models & Schemas

## Description

As a backend developer, I want to create the SQLAlchemy ORM models and Pydantic validation schemas for Sessions and Messages so that data is correctly structured and validated.

## Acceptance Criteria

- [ ] Given the application logic, when I import `Session`, then it maps to a table with `id`, `title`, and `created_at`.
- [ ] Given the application logic, when I import `Message`, then it maps to a table with `id`, `session_id` (FK), `role` (user/assistant), `content`, and `created_at`.
- [ ] Given API inputs, when a request is made, then Pydantic schemas validate the data structure before processing.

## Technical Notes

- Files likely to be modified: `app/models/session.py`, `app/models/message.py`, `app/schemas/session.py`, `app/schemas/message.py`.
- Use SQLAlchemy 2.0 declarative base.
- Use Pydantic v2 BaseModels.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-003

## PRD Reference

Source: [`PRD-002/PRD.md`](../../PRDs/PRD-002-backend-sessions/PRD.md) — section 12 (Phase 2)
