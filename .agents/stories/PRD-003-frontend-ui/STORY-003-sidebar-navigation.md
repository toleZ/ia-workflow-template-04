---
id: STORY-003
prd: PRD-003
slug: sidebar-navigation
title: App Sidebar & Session Navigation
type: feature
priority: high
complexity: medium
phase: 2
status: done
labels: [frontend, ui]
epic_branch: epic/PRD-003-frontend-ui
plan: .agents/plans/PRD-003-frontend-ui/completed/STORY-003-sidebar-navigation.plan.md
report: .agents/reports/PRD-003-frontend-ui/STORY-003-sidebar-navigation.report.md
commit: 4cfb28329ca614e860695f96a9c6cccdcb3a2768
depends_on: [STORY-001, STORY-002]
blocks: [STORY-005]
skills: [shadcn, react-router-declarative-mode]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-003: App Sidebar & Session Navigation

## Description

As a user, I want to see my previous chat sessions in a sidebar and click on them to navigate so I can easily switch context.

## Acceptance Criteria

- [ ] Given the sidebar, when it renders, then it displays a list of session titles from the mock data.
- [ ] Given a session item in the sidebar, when I click it, then the URL changes to `/chat/:sessionId`.
- [ ] Given the active session, when I look at the sidebar, then the selected item is visually highlighted.

## Technical Notes

- Use Shadcn's `SidebarMenu` and `SidebarMenuItem`.
- Use `NavLink` for active state tracking as per `react-router` guidelines.

## Dependencies

- **Blocked by**: STORY-001, STORY-002
- **Blocks**: STORY-005

## PRD Reference

Source: [`PRD-003/PRD.md`](../../PRDs/PRD-003-frontend-ui/PRD.md) — section 5 (Story 1)
