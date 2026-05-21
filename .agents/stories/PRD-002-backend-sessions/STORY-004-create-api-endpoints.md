---
id: STORY-004
prd: PRD-002
slug: create-api-endpoints
title: Create REST API Endpoints
type: feature
priority: high
complexity: small
phase: 4
status: done
labels: [backend, api]
epic_branch: epic/PRD-002-backend-sessions
plan: .agents/plans/PRD-002-backend-sessions/completed/STORY-004-create-api-endpoints.plan.md
report: .agents/reports/PRD-002-backend-sessions/STORY-004-create-api-endpoints.report.md
commit: c6b988a3957c7eee9767b7dbd698c58bf0162312
depends_on: [STORY-003]
blocks: []
skills: [fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-004: Create REST API Endpoints

## Description

As a frontend app, I want to interact with REST API endpoints to manage sessions and messages so that the chat UI can persist state.

## Acceptance Criteria

- [ ] Given the server is running, when I send a `POST` to `/api/v1/sessions/`, then it creates a session and returns 201 Created.
- [ ] Given the server is running, when I send a `GET` to `/api/v1/sessions/`, then it returns a list of all sessions.
- [ ] Given the server is running, when I send a `POST` to `/api/v1/sessions/{id}/messages/`, then it saves a new message and returns 201 Created.
- [ ] Given the server is running, when I send a `GET` to `/api/v1/sessions/{id}/messages/`, then it returns all messages for that session.

## Technical Notes

- Files likely to be modified: `app/routers/session.py`, `app/main.py`.
- Connect the routers to the main FastAPI application.
- Configure CORS in `main.py` to allow `localhost:5173`.

## Dependencies

- **Blocked by**: STORY-003
- **Blocks**: None

## PRD Reference

Source: [`PRD-002/PRD.md`](../../PRDs/PRD-002-backend-sessions/PRD.md) — section 12 (Phase 4)
