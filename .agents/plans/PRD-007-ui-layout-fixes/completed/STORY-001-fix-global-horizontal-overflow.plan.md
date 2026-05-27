---
story: STORY-001
prd: PRD-007
slug: fix-global-horizontal-overflow
title: Fix Global Horizontal Overflow
type: BUG_FIX
complexity: LOW
epic_branch: epic/PRD-007-ui-layout-fixes
created: 2026-05-27
---

# Plan: Fix Global Horizontal Overflow

## Summary

This plan addresses the horizontal scrollbar issue occurring in the main layout. We will investigate the interaction between `SidebarProvider`, `AppSidebar`, and `SidebarInset`. The primary goal is to ensure that the main content area (where the chat lives) is correctly constrained and doesn't push the viewport width beyond 100%. We will apply `min-w-0` to flex-containers and ensure `overflow-x-hidden` is set on the root layout wrappers.

## User Story

As a User
I want the application to fit within my screen without showing a horizontal scrollbar
So that the navigation feels fluid and stable

## Story Reference

- Story file: `.agents/stories/PRD-007-ui-layout-fixes/STORY-001-fix-global-horizontal-overflow.md`
- PRD: `.agents/PRDs/PRD-007-ui-layout-fixes/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | BUG_FIX |
| Complexity | LOW |
| Systems Affected | Root Layout, CSS |
| Story | STORY-001 |
| PRD | PRD-007 |
| Epic Branch | `epic/PRD-007-ui-layout-fixes` |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| None specifically | Standard Tailwind CSS Layout fix | All tasks |

---

## Patterns to Follow

### Flexbox Containment
```jsx
// SOURCE: frontend/src/layouts/RootLayout.jsx
<SidebarProvider>
  <AppSidebar />
  <SidebarInset className="min-w-0 overflow-hidden">
    ...
  </SidebarInset>
</SidebarProvider>
```

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `frontend/src/layouts/RootLayout.jsx` | UPDATE | Add containment classes to `SidebarInset` and `main` to prevent horizontal expansion. |

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Add Layout Containment

- **File**: `frontend/src/layouts/RootLayout.jsx`
- **Action**: UPDATE
- **Implement**: 
  - Add `className="flex-1 min-w-0 overflow-hidden"` to the `<main>` tag.
  - Add `className="min-w-0 overflow-hidden"` to `<SidebarInset>`.
- **Mirror**: Standard shadcn/ui sidebar integration patterns.
- **Validate**: `cd frontend && npm run lint`

---

## End-to-End Tests

- [ ] Open the app in a browser.
- [ ] Check if the horizontal scrollbar is visible at the bottom of the page.
- [ ] Resize the window and verify no scrollbar appears.

---

## Validation

```bash
cd frontend && npm run lint
```

---

## Acceptance Criteria

- [ ] Identify the source of `overflow-x` in `RootLayout.jsx` or `AppSidebar.jsx`.
- [ ] Apply CSS fixes (e.g., `overflow-x-hidden`, `max-w-full`, `min-w-0`) to the offending containers.
- [ ] Ensure the main content area correctly occupies the remaining space next to the sidebar.
- [ ] Verify that no horizontal scrollbar appears on common screen resolutions.
- [ ] All tasks completed
