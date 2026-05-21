---
id: STORY-003
prd: PRD-004
slug: chat-orchestration
title: AI Chat Orchestration Service
type: feature
priority: high
complexity: high
phase: 3
status: done
labels: [backend, ai, logic]
epic_branch: epic/PRD-004-backend-agent
plan: .agents/plans/PRD-004-backend-agent/completed/STORY-003-chat-orchestration.plan.md
report: .agents/reports/PRD-004-backend-agent/STORY-003-chat-orchestration.report.md
commit: 2aca2bd023df48d39db5c4a84bc5f18121e4e11b
depends_on: [STORY-002]
blocks: [STORY-004]
skills: [building-pydantic-ai-agents]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-003: AI Chat Orchestration Service

## Description

As a developer, I want to create a service that loads SQLite message history, runs the AI agent with the new prompt, and saves both the prompt and the response back to SQLite.

## Acceptance Criteria

- [ ] Given a session ID and a prompt, when the service runs, then it fetches all previous messages for that session from SQLite.
- [ ] Given the history, when calling the agent, then the history is passed as `ModelMessage` objects.
- [ ] Given the agent finishes, when the result is returned, then the assistant's response is saved to the SQLite database.

## Technical Notes

- File to modify: `app/services/message.py` or a new `app/services/chat.py`.
- Use Pydantic AI's `ModelMessage` to reconstruct history.
- Ensure deps (DB engines) are passed correctly to the `agent.run()` call.

## Dependencies

- **Blocked by**: STORY-002
- **Blocks**: STORY-004

## PRD Reference

Source: [`PRD-004/PRD.md`](../../PRDs/PRD-004-backend-agent/PRD.md) — section 12 (Phase 3)
