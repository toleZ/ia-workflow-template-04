import { useParams } from "react-router"
import { MOCK_SESSIONS } from "@/mocks/chat-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function Chat() {
  const { sessionId } = useParams()
  const session = MOCK_SESSIONS.find((s) => s.id === Number(sessionId))

  if (!session) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground italic">Session not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {session.messages.map((message) => (
            <div
              key={message.id}
              style={{ contentVisibility: "auto" }}
              className={cn(
                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
