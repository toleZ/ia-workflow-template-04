import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { MOCK_SESSIONS } from "@/mocks/chat-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"

export default function Chat() {
  const { sessionId } = useParams()
  const session = MOCK_SESSIONS.find((s) => s.id === Number(sessionId))

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Sync state when session changes
  useEffect(() => {
    if (session) {
      setMessages(session.messages)
      setInputValue("")
      setIsTyping(false)
    }
  }, [sessionId, session])

  if (!session) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground italic">Session not found</p>
      </div>
    )
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputValue,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `This is a mock response to: "${userMessage.content}". Once the real backend is connected, you will see actual database analysis here.`,
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
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
          {isTyping && (
            <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted animate-pulse">
              Typing...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your database question..."
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
            <Send className="size-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
