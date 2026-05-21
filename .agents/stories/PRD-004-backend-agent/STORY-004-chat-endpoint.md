---
id: STORY-004
prd: PRD-004
slug: chat-endpoint
title: AI Chat API Endpoint
type: feature
priority: high
complexity: small
phase: 4
status: done
labels: [backend, api]
epic_branch: epic/PRD-004-backend-agent
plan: .agents/plans/PRD-004-backend-agent/completed/STORY-004-chat-endpoint.plan.md
report: .agents/reports/PRD-004-backend-agent/STORY-004-chat-endpoint.report.md
commit: 8fab14ef18ac3ad926f95bef38a0ace69bcfa23a
depends_on: [STORY-003]
blocks: []
skills: [fastapi-python]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-004: AI Chat API Endpoint

## Description

As a frontend app, I want to send a prompt to `POST /api/v1/sessions/{id}/chat` and receive the AI's natural language response so the user can interact with their data.

## Acceptance Criteria

- [ ] Given a `POST` request to `/api/v1/sessions/{id}/chat`, when provided with a valid prompt, then it returns 200 OK with the AI's message.
- [ ] Given an invalid session ID, when the endpoint is called, then it returns 404 Not Found.
- [ ] Given an internal AI error, when the endpoint is called, then it returns a meaningful 500 error.

## Technical Notes

- File to modify: `app/routers/session.py`.
- Ensure the endpoint is documented in Swagger UI.

## Dependencies

- **Blocked by**: STORY-003
- **Blocks**: None

## PRD Reference

Source: [`PRD-004/PRD.md`](../../PRDs/PRD-004-backend-agent/PRD.md) — section 12 (Phase 4)
