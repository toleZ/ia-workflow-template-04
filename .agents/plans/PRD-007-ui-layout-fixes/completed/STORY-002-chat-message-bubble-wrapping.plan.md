---
story: STORY-002
prd: PRD-007
slug: chat-message-bubble-wrapping
title: Chat Message Bubble Wrapping & Containment
type: BUG_FIX
complexity: LOW
epic_branch: epic/PRD-007-ui-layout-fixes
created: 2026-05-27
---

# Plan: Chat Message Bubble Wrapping & Containment

## Summary

This plan focuses on fixing the chat message bubbles to prevent text from overflowing their containers and causing horizontal scrollbars or cut-off text. We will modify the CSS classes applied to the message bubbles in `Chat.jsx`. By replacing `w-max` with `w-fit` and explicitly adding `break-words` and `whitespace-pre-wrap`, the bubbles will correctly wrap long continuous text (like code snippets, URLs, or long AI responses) while maintaining their proper maximum width (`max-w-[85%]`).

## User Story

As a User
I want long AI responses and code snippets to stay within the chat boundaries
So that I can read the entire message without it being cut off or overflowing the screen

## Story Reference

- Story file: `.agents/stories/PRD-007-ui-layout-fixes/STORY-002-chat-message-bubble-wrapping.md`
- PRD: `.agents/PRDs/PRD-007-ui-layout-fixes/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | BUG_FIX |
| Complexity | LOW |
| Systems Affected | Frontend UI (Chat component) |
| Story | STORY-002 |
| PRD | PRD-007 |
| Epic Branch | `epic/PRD-007-ui-layout-fixes` |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| None specifically | Standard Tailwind CSS styling for word breaks | Task 1 |

---

## Patterns to Follow

### Word Wrapping in Tailwind
When elements use `w-max` (max-content), they try to be as wide as their content without breaking. This fights against `max-w-[80%]`. We will use `w-fit` along with `break-words` and `whitespace-pre-wrap` to force long text to break cleanly.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `frontend/src/pages/Chat.jsx` | UPDATE | Fix Tailwind classes on message bubbles to ensure text wraps correctly. |

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Update Message Bubble Classes

- **File**: `frontend/src/pages/Chat.jsx`
- **Action**: UPDATE
- **Implement**: 
  - Locate the `.map` loop rendering messages.
  - In the `cn(...)` utility, replace `"flex w-max max-w-[80%] ..."` with `"flex w-fit max-w-[85%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words whitespace-pre-wrap"`.
  - Apply the exact same structural classes to the `isTyping` indicator div for consistency.
- **Validate**: `cd frontend && npm run lint`

---

## End-to-End Tests

- [ ] Send a message with a very long continuous string (e.g. "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA").
- [ ] Observe that the bubble does not push past 85% of the screen width and the text breaks onto the next line.
- [ ] Confirm no horizontal scrolling occurs.

---

## Validation

```bash
cd frontend && npm run lint
```

---

## Acceptance Criteria

- [ ] Update `Chat.jsx` message bubble styles with `break-words` and `whitespace-pre-wrap`.
- [ ] Ensure message bubbles have a responsive `max-width` (e.g., `max-w-[85%]`).
- [ ] Verify that the message container itself is bounded by its parent's width.
- [ ] Test with an extremely long continuous string (no spaces) to verify word breaking.
- [ ] All tasks completed
