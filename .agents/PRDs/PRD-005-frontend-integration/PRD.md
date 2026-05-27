---
id: PRD-005
slug: frontend-integration
title: Frontend API Integration
status: active
base_branch: main
epic_branch: epic/PRD-005-frontend-integration
created: 2026-05-21
updated: 2026-05-21
---

# PRD-005: Frontend API Integration

## 1. Executive Summary
The goal of this PRD is to connect the React-based chat interface (built in PRD-003) to the real FastAPI backend services (built in PRD-002 and PRD-004). This involves replacing all mock data sources with real HTTP requests, implementing a robust API client, and handling real-world concerns such as network latency, loading states, and API error responses.

## 2. Mission
Transform the static prototype into a fully functional AI application by bridging the gap between the user interface and the backend intelligence.
- **Reliability:** Ensure the UI correctly reflects the state of the backend database.
- **UX:** Provide clear feedback (spinners, skeletons) while data is being fetched.
- **Resilience:** Gracefully handle API failures without crashing the UI.

## 3. Target Users
- **End Users:** Who can now perform real database queries and see persistent chat history.
- **QA Engineers:** Who can now test the application end-to-end.

## 4. MVP Scope
- [x] Configure environment variables for the API base URL.
- [x] Implement a centralized API utility layer (fetch-based).
- [x] Connect `AppSidebar` to fetch and display the real session list from `/api/v1/sessions/`.
- [x] Implement "New Chat" functionality that hits the backend creation endpoint.
- [x] Connect `Chat` page to fetch historical messages from `/api/v1/sessions/{id}/messages/`.
- [x] Connect Chat Input to the real AI chat endpoint `/api/v1/sessions/{id}/chat`.
- [x] Add global/local loading indicators and error toasts/messages.

## 5. User Stories
- **Story 1:** As a user, when I open the app, I want to see my actual saved chat history so I can pick up where I left off.
- **Story 2:** As a user, when I click "New Chat", I want a new session to be created on the server and appear in my sidebar.
- **Story 3:** As a user, when I send a database question, I want to see the real AI response based on the actual database schema.
- **Story 4:** As a user, if the server is down or my query fails, I want to see an error message explaining that something went wrong.

## 6. Core Architecture & Patterns
- **API Client:** Simple wrapper around `window.fetch` with response handling and error mapping.
- **State Synchronization:** Using `useEffect` and `useState` for data fetching. (Standard pattern defined in `frontend/AGENTS.md`).
- **Base URL:** Defined via `import.meta.env.VITE_API_URL`.
- **Error Handling:** Centralized logic to parse backend `HTTPException` details.

## 7. Tools/Features
- **API Utilities:** `src/lib/api.js` to house all fetch calls.
- **Skeletons/Loading:** Use Shadcn's `Skeleton` component for initial session/message loading.
- **Toasts:** Use Shadcn's `Toast` (if available) or a simple error banner for global API errors.

## 8. Technology Stack
- **Frontend:** React 19, Vite.
- **Backend:** FastAPI (Existing).
- **Communication:** REST / JSON.

## 9. Security & Configuration
- **CORS:** Ensure the backend (PRD-002) is configured to allow requests from the frontend origin.
- **Env Vars:** Create `frontend/.env` with `VITE_API_URL=http://localhost:8000`.

## 10. API Specification
- `GET /api/v1/sessions/` -> `list_sessions`
- `POST /api/v1/sessions/` -> `create_session`
- `GET /api/v1/sessions/{id}/messages/` -> `list_messages`
- `POST /api/v1/sessions/{id}/chat` -> `chat_with_agent`

## 11. Success Criteria
- [x] Sidebar displays real session titles from the backend.
- [x] Clicking a session loads the actual message history from the backend.
- [x] Sending a message triggers the backend AI agent and updates the chat.
- [x] The UI doesn't crash if the backend returns a 404 or 500.

## 12. Implementation Phases
- **Phase 1: Foundation:** Setup `.env` and create the `api.js` utility layer.
- **Phase 2: Session List:** Update Sidebar to use real data.
- **Phase 3: Chat History:** Update Chat page to fetch real messages.
- **Phase 4: AI Integration:** Connect the prompt submission to the real AI endpoint.
- **Phase 5: Error Handling:** Add comprehensive loading and error states.

## 13. Future Considerations
- Use a data-fetching library like `TanStack Query` (React Query) for better caching and revalidation.
- Support for session deletion/renaming.

## 14. Risks & Mitigations
- **Risk:** Backend might not be running during frontend development.
  - **Mitigation:** Ensure the `api.js` layer can fall back to mocks if an environment flag is set (optional).
- **Risk:** Large histories causing slow loads.
  - **Mitigation:** Use pagination (query params) already supported by backend endpoints.

## 15. Appendix
- Backend Router: `backend/app/routers/session.py`
- Frontend Layout: `frontend/src/layouts/RootLayout.jsx`
