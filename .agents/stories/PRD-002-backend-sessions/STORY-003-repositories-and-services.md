---
id: STORY-003
prd: PRD-002
slug: repositories-and-services
title: Implement Repositories and Services
type: feature
priority: high
complexity: medium
phase: 3
status: done
labels: [backend, logic]
epic_branch: epic/PRD-002-backend-sessions
plan: .agents/plans/PRD-002-backend-sessions/completed/STORY-003-repositories-and-services.plan.md
report: .agents/reports/PRD-002-backend-sessions/STORY-003-repositories-and-services.report.md
commit: 6e9984285124ce450b3548a4b05a49db98536e36
depends_on: [STORY-002]
blocks: [STORY-004]
skills: [fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-003: Implement Repositories and Services

## Description

As a backend developer, I want to implement the Repository (data access) and Service (business logic) layers for Sessions and Messages to isolate business rules from HTTP routing.

## Acceptance Criteria

- [ ] Given a session creation request, when the service handles it, then it uses the repository to save it to the SQLite database and returns the new entity.
- [ ] Given a list sessions request, when the service handles it, then it retrieves all sessions ordered by creation date.
- [ ] Given a message creation request, when the service handles it, then it verifies the session exists before saving the message.

## Technical Notes

- Files likely to be modified: `app/repositories/session.py`, `app/repositories/message.py`, `app/services/session.py`, `app/services/message.py`.
- Adhere to the RORO (Receive an Object, Return an Object) pattern as per `fastapi-python` rules.

## Dependencies

- **Blocked by**: STORY-002
- **Blocks**: STORY-004

## PRD Reference

Source: [`PRD-002/PRD.md`](../../PRDs/PRD-002-backend-sessions/PRD.md) — section 12 (Phase 3)
