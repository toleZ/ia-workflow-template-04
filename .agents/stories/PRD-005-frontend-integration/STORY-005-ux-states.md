---
id: STORY-005
prd: PRD-005
slug: ux-states
title: UX States & Error Handling
type: enhancement
priority: medium
complexity: small
phase: 5
status: done
labels: [frontend, ui]
epic_branch: epic/PRD-004-frontend-integration
plan: .agents/plans/PRD-005-frontend-integration/completed/STORY-005-ux-states.plan.md
report: .agents/reports/PRD-005-frontend-integration/STORY-005-ux-states.report.md
commit: 40f94131f50548531613f10333e61110c05a5b82
depends_on: [STORY-002, STORY-003, STORY-004]
blocks: []
skills: [shadcn]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-005: UX States & Error Handling

## Description

As a user, I want to see clear loading states (skeletons) and error messages if the backend is unavailable or a query fails.

## Acceptance Criteria

- [ ] Given a data fetch, when it's slow, then I see Shadcn `Skeleton` placeholders in the sidebar and chat area.
- [ ] Given an API failure, when it occurs, then I see a descriptive error message or toast explaining the problem.
- [ ] Given an empty session list, when I log in, then I see a friendly "No sessions found" message.

## Technical Notes

- Files to modify: `src/pages/Chat.jsx`, `src/components/AppSidebar.jsx`.
- Import `Skeleton` from `@/components/ui/skeleton`.

## Dependencies

- **Blocked by**: STORY-002, STORY-003, STORY-004
- **Blocks**: None

## PRD Reference

Source: [`PRD-005/PRD.md`](../../PRDs/PRD-005-frontend-integration/PRD.md) — section 12 (Phase 5)
