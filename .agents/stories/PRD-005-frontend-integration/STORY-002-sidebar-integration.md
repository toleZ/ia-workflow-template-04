---
id: STORY-002
prd: PRD-005
slug: sidebar-integration
title: Real Sidebar & Session Creation
type: feature
priority: high
complexity: medium
phase: 2
status: done
labels: [frontend, api]
epic_branch: epic/PRD-004-frontend-integration
plan: .agents/plans/PRD-005-frontend-integration/completed/STORY-002-sidebar-integration.plan.md
report: .agents/reports/PRD-005-frontend-integration/STORY-002-sidebar-integration.report.md
commit: 7566856d06d5efc7af2e067ca17a1c5f214b88aa
depends_on: [STORY-001]
blocks: [STORY-005]
skills: [vercel-react-best-practices, shadcn]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-002: Real Sidebar & Session Creation

## Description

As a user, I want to see my actual saved sessions in the sidebar and be able to create new ones that persist on the server.

## Acceptance Criteria

- [ ] Given the Sidebar, when it mounts, then it fetches the session list from `/api/v1/sessions/` and replaces the mock data.
- [ ] Given the "New Chat" button, when I click it, then it sends a `POST` request to create a session and redirects to the new session URL.
- [ ] Given a session list, when the data is loading, then I see loading indicators or a skeleton state.

## Technical Notes

- Files to modify: `src/components/AppSidebar.jsx`.
- Use `useEffect` for the initial fetch.
- Update the "New Chat" `NavLink` to a `button` or `onClick` handler to trigger the API call.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-005

## PRD Reference

Source: [`PRD-005/PRD.md`](../../PRDs/PRD-005-frontend-integration/PRD.md) — section 12 (Phase 2)
