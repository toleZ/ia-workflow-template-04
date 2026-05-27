---
id: STORY-002
prd: PRD-007
slug: chat-message-bubble-wrapping
title: Chat Message Bubble Wrapping & Containment
type: bug
priority: high
complexity: small
phase: 2
status: todo
labels: [frontend, ui]
epic_branch: epic/PRD-007-ui-layout-fixes
plan: null
report: null
commit: null
depends_on: [STORY-001]
blocks: []
skills: []
created: 2026-05-27
updated: 2026-05-27
---

# STORY-002: Chat Message Bubble Wrapping & Containment

## Description

As a User, I want long AI responses and code snippets to stay within the chat boundaries, so that I can read the entire message without it being cut off or overflowing the screen.

## Acceptance Criteria

- [ ] Update `Chat.jsx` message bubble styles with `break-words` and `whitespace-pre-wrap`.
- [ ] Ensure message bubbles have a responsive `max-width` (e.g., `max-w-[85%]`).
- [ ] Verify that the message container itself is bounded by its parent's width.
- [ ] Test with an extremely long continuous string (no spaces) to verify word breaking.

## Technical Notes

- Modify the Tailwind classes in the message mapping loop in `Chat.jsx`.
- Check if `ScrollArea` is correctly constrained.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: None

## PRD Reference

Source: [PRD-007/PRD.md](../../PRDs/PRD-007-ui-layout-fixes/PRD.md) — Section MVP Scope, Phase 2
