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
import { MessageSquarePlus } from "lucide-react"
import { NavLink } from "react-router"
import { MOCK_SESSIONS } from "@/mocks/chat-data"

export function AppSidebar() {
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
              {MOCK_SESSIONS.map((session) => (
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenuButton className="w-full justify-start gap-2" asChild>
          <NavLink to="/">
            <MessageSquarePlus className="size-4" />
            <span>New Chat</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
