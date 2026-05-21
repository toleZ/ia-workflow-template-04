---
id: STORY-002
prd: PRD-003
slug: routing-mock-data
title: Routing & Mock Data Foundation
type: technical
priority: high
complexity: small
phase: 2
status: done
labels: [frontend, routing]
epic_branch: epic/PRD-003-frontend-ui
plan: .agents/plans/PRD-003-frontend-ui/completed/STORY-002-routing-mock-data.plan.md
report: .agents/reports/PRD-003-frontend-ui/STORY-002-routing-mock-data.report.md
commit: cc8d1baf7478ad266df01c849b375dbddcd73e43
depends_on: []
blocks: [STORY-003, STORY-004]
skills: [react-router-declarative-mode]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-002: Routing & Mock Data Foundation

## Description

As a developer, I want to set up React Router and a centralized mock data store so that the app can handle multiple sessions and navigation.

## Acceptance Criteria

- [ ] Given the application router, when I navigate to `/chat/:sessionId`, then the page correctly parses the `sessionId` param.
- [ ] Given the application logic, when I import `MOCK_SESSIONS`, then I get a list of at least 3 chat sessions with metadata.
- [ ] Given a session, when I query its messages, then I get an array of user/assistant messages.

## Technical Notes

- Files to create: `src/mocks/chat-data.js`.
- Files to modify: `src/App.jsx`.
- Use React Router 7's declarative mode.

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-003, STORY-004

## PRD Reference

Source: [`PRD-003/PRD.md`](../../PRDs/PRD-003-frontend-ui/PRD.md) — section 12 (Phase 2)
