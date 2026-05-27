# Report: STORY-001 - Fix Global Horizontal Overflow

## Summary
Eliminated the global horizontal scrollbar by correctly constraining the main layout containers.

## Changes
- **`frontend/src/layouts/RootLayout.jsx`**:
  - Added `min-w-0` and `overflow-hidden` to the `SidebarInset` component.
  - Added `min-w-0` and `overflow-hidden` to the `<main>` content container.
- These changes ensure that flexbox children (like the chat window) cannot expand beyond the parent's width, preventing the "push" effect that causes horizontal scrolling.

## Verification Results
- Horizontal scrollbar removed in desktop view: SUCCESS
- Layout stability during sidebar toggle: SUCCESS
