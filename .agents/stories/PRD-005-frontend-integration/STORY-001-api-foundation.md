---
id: STORY-001
prd: PRD-005
slug: api-foundation
title: API Foundation & Environment
type: technical
priority: high
complexity: small
phase: 1
status: done
labels: [frontend, infrastructure]
epic_branch: epic/PRD-004-frontend-integration
plan: .agents/plans/PRD-005-frontend-integration/completed/STORY-001-api-foundation.plan.md
report: .agents/reports/PRD-005-frontend-integration/STORY-001-api-foundation.report.md
commit: 8c7e6bfd5cf8733a7afcd838faf757170f3b083e
depends_on: []
blocks: [STORY-002, STORY-003, STORY-004]
skills: [vercel-react-best-practices]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-001: API Foundation & Environment

## Description

As a developer, I want to configure the environment variables and create a reusable API client so that I can consistently communicate with the FastAPI backend.

## Acceptance Criteria

- [ ] Given the frontend project, when I check `frontend/.env`, then it contains `VITE_API_URL=http://localhost:8000`.
- [ ] Given the application code, when I import the API client, then I can perform `GET` and `POST` requests with automatic base URL and JSON handling.
- [ ] Given an API error, when the client handles it, then it returns a structured error object.

## Technical Notes

- Create `frontend/src/lib/api.js`.
- Use `fetch` API.
- Ensure the client adds `Content-Type: application/json` to POST requests.

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-002, STORY-003, STORY-004

## PRD Reference

Source: [`PRD-005/PRD.md`](../../PRDs/PRD-005-frontend-integration/PRD.md) — section 12 (Phase 1)
