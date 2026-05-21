export const MOCK_SESSIONS = [
  {
    id: 1,
    title: "Country Statistics Inquiry",
    created_at: "2026-05-21T10:00:00Z",
    messages: [
      { id: 1, role: "user", content: "List all countries with ISO code starting with 'A'.", created_at: "2026-05-21T10:00:05Z" },
      { id: 2, role: "assistant", content: "I found several countries: Argentina (ARG), Albania (ALB), and Australia (AUS).", created_at: "2026-05-21T10:00:10Z" }
    ]
  },
  {
    id: 2,
    title: "Database Schema Overview",
    created_at: "2026-05-21T11:30:00Z",
    messages: [
      { id: 3, role: "user", content: "What tables are available in the database?", created_at: "2026-05-21T11:30:05Z" },
      { id: 4, role: "assistant", content: "The current database contains the following tables: `sessions`, `messages`, and `paises`.", created_at: "2026-05-21T11:30:10Z" }
    ]
  },
  {
    id: 3,
    title: "Active Users Report",
    created_at: "2026-05-21T14:15:00Z",
    messages: [
      { id: 5, role: "user", content: "How many active sessions are there today?", created_at: "2026-05-21T14:15:05Z" },
      { id: 6, role: "assistant", content: "There are currently 42 active chat sessions recorded in the system.", created_at: "2026-05-21T14:15:10Z" }
    ]
  }
];
