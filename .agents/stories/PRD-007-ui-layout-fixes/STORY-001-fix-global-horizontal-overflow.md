---
id: STORY-001
prd: PRD-007
slug: fix-global-horizontal-overflow
title: Fix Global Horizontal Overflow
type: bug
priority: high
complexity: small
phase: 1
status: done
labels: [frontend, css]
epic_branch: epic/PRD-007-ui-layout-fixes
plan: .agents/plans/PRD-007-ui-layout-fixes/completed/STORY-001-fix-global-horizontal-overflow.plan.md
report: .agents/reports/PRD-007-ui-layout-fixes/STORY-001-fix-global-horizontal-overflow.report.md
commit: c9dfa282bcc390fc13de0d203029f50a773c4e52
depends_on: []
blocks: [STORY-002]
skills: []
created: 2026-05-27
updated: 2026-05-27
---

# STORY-001: Fix Global Horizontal Overflow

## Description

As a User, I want the application to fit within my screen without showing a horizontal scrollbar, so that the navigation feels fluid and stable.

## Acceptance Criteria

- [ ] Identify the source of `overflow-x` in `RootLayout.jsx` or `AppSidebar.jsx`.
- [ ] Apply CSS fixes (e.g., `overflow-x-hidden`, `max-w-full`, `min-w-0`) to the offending containers.
- [ ] Ensure the main content area correctly occupies the remaining space next to the sidebar.
- [ ] Verify that no horizontal scrollbar appears on common screen resolutions (1280px, 1440px, 1920px).

## Technical Notes

- Check `RootLayout.jsx` container classes.
- Inspect the `SidebarProvider` and `SidebarInset` from shadcn/ui.
- Use browser dev tools to find elements with width greater than the viewport.

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-002

## PRD Reference

Source: [PRD-007/PRD.md](../../PRDs/PRD-007-ui-layout-fixes/PRD.md) — Section MVP Scope, Phase 1
