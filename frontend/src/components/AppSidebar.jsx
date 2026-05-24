import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquarePlus, AlertCircle } from "lucide-react"
import { NavLink, useNavigate } from "react-router"
import { api } from "@/lib/api"

export function AppSidebar() {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchSessions() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.get("/sessions/")
        setSessions(data)
      } catch (err) {
        console.error("Failed to fetch sessions:", err)
        setError("Failed to load history")
      } finally {
        setIsLoading(false)
      }
    }
    fetchSessions()
  }, [])

  const handleNewChat = async () => {
    try {
      const newSession = await api.post("/sessions/", { title: "New Conversation" })
      setSessions((prev) => [newSession, ...prev])
      navigate(`/chat/${newSession.id}`)
    } catch (error) {
      console.error("Failed to create session:", error)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold tracking-tight">AI DB Analyst</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                <div className="flex flex-col gap-2 px-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-[90%]" />
                  <Skeleton className="h-9 w-full" />
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-destructive bg-destructive/10 rounded-md mx-2">
                  <AlertCircle className="size-3" />
                  <span>{error}</span>
                </div>
              ) : sessions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-muted-foreground italic">
                  No history found
                </div>
              ) : (
                sessions.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`/chat/${session.id}`}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            : ""
                        }
                      >
                        <span>{session.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenuButton
          className="w-full justify-start gap-2"
          onClick={handleNewChat}
        >
          <MessageSquarePlus className="size-4" />
          <span>New Chat</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
