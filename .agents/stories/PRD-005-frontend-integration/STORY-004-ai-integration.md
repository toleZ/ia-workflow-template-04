---
id: STORY-004
prd: PRD-005
slug: ai-integration
title: Live AI Chat Integration
type: feature
priority: high
complexity: medium
phase: 4
status: done
labels: [frontend, ai]
epic_branch: epic/PRD-004-frontend-integration
plan: .agents/plans/PRD-005-frontend-integration/completed/STORY-004-ai-integration.plan.md
report: .agents/reports/PRD-005-frontend-integration/STORY-004-ai-integration.report.md
commit: d4858af3735e0c88730276754941c8135ffa81ec
depends_on: [STORY-001, STORY-003]
blocks: [STORY-005]
skills: [vercel-react-best-practices]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-004: Live AI Chat Integration

## Description

As a user, I want to send my questions to the real AI agent and see its response generated based on the actual database schema.

## Acceptance Criteria

- [ ] Given the chat input, when I send a message, then it calls `POST /api/v1/sessions/{id}/chat`.
- [ ] Given the AI response, when it returns, then the UI displays the real response content instead of mock text.
- [ ] Given the submission, when the request is in flight, then the "typing..." indicator is shown.

## Technical Notes

- Files to modify: `src/pages/Chat.jsx`.
- Replace the `setTimeout` simulation with a real async API call.
- Handle the `isTyping` state based on the actual fetch promise.

## Dependencies

- **Blocked by**: STORY-001, STORY-003
- **Blocks**: STORY-005

## PRD Reference

Source: [`PRD-005/PRD.md`](../../PRDs/PRD-005-frontend-integration/PRD.md) — section 12 (Phase 4)
