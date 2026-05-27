---
id: PRD-007
slug: ui-layout-fixes
title: UI Layout & Overflow Fixes
status: draft
base_branch: main
epic_branch: epic/PRD-007-ui-layout-fixes
created: 2026-05-27
updated: 2026-05-27
---

# PRD-007: UI Layout & Overflow Fixes

## 1. Executive Summary
The application currently suffers from significant UI glitches that impact the user experience. Long messages from the AI agent overflow the horizontal boundaries of the screen, making them unreadable. Additionally, the sidebar implementation causes an unwanted horizontal scrollbar (`overflow-x`), which breaks the visual integrity of the single-page application. This PRD focuses on fixing these layout issues using Tailwind CSS best practices to ensure a fluid and responsive UI.

## 2. Mission
To provide a polished, stable, and responsive user interface where content fits naturally within its containers.
- **Visual Integrity**: No horizontal scrolling on standard screen sizes.
- **Readability**: Long text must wrap and break correctly.
- **Responsiveness**: Layout must adapt gracefully between sidebar states (expanded/collapsed).

## 3. Target Users
- **All Users**: Who interact with the chat and expect a standard, bug-free web experience.
- **Mobile Users**: Who are more sensitive to horizontal overflow and layout shifts.

## 4. MVP Scope

### In Scope
- [ ] Fix message bubble CSS to handle word wrapping and maximum width constraints.
- [ ] Debug and remove the cause of `overflow-x` in the main layout and sidebar.
- [ ] Ensure the scroll area for messages is correctly bounded.
- [ ] Verify layout stability during window resizing.

### Out of Scope
- [ ] Deep redesign of the sidebar or chat components (only fixing layout bugs).
- [ ] Adding new features like "dark mode" or themes.
- [ ] Changes to backend logic.

## 5. User Stories
- **As a User**, I want long AI responses to stay within the chat area, so I don't have to scroll horizontally or lose text.
- **As a User**, I want the sidebar to exist without creating a scrollbar at the bottom of my screen.
- **As a User**, I want the application to feel solid and professional on different screen sizes.

## 6. Core Architecture & Patterns
- **Tailwind CSS Utility First**: Using classes like `break-words`, `overflow-hidden`, `max-w-full`, and `flex-1`.
- **Flexbox/Grid Hygiene**: Ensuring parent containers have proper `min-width: 0` or `overflow: hidden` to prevent flex-children from expanding past their boundaries.

## 7. Technology Stack
- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui (Sidebar component).

## 8. Security & Configuration
- No security implications for these UI fixes.

## 9. Success Criteria
- [ ] AI messages containing long strings or URLs wrap correctly without overflowing the screen.
- [ ] Horizontal scrollbar is eliminated in desktop and mobile views.
- [ ] Sidebar transitions (expand/collapse) do not cause horizontal layout shifts.

## 10. Implementation Phases
### Phase 1: Debug & Fix Overflow
- Inspect `RootLayout` and `AppSidebar` to identify the source of `overflow-x`.
- Apply CSS fixes to containment wrappers.

### Phase 2: Message Bubble Wrapping
- Update `Chat.jsx` message bubble styling.
- Test with extremely long synthetic strings.

### Phase 3: Final Validation
- Test across various breakpoints (sm, md, lg, xl).

## 11. Risks & Mitigations
- **Component Conflicts**: `shadcn/ui` sidebar might have its own overflow logic. *Mitigation*: Carefully read the shadcn documentation/code before overriding.
- **Regression**: Fixing one overflow might hide another. *Mitigation*: Systematic testing of all pages.

## 12. Appendix
- **Skills referenced**: `agent-browser` (for UI verification).
