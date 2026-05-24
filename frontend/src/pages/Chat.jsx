import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { api } from "@/lib/api"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"

export default function Chat() {
  const { sessionId } = useParams()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Fetch real history when session changes
  useEffect(() => {
    let isMounted = true

    async function fetchHistory() {
      setIsLoading(true)
      setMessages([]) // Reset messages for new session
      try {
        const data = await api.get(`/sessions/${sessionId}/messages/`)
        if (isMounted) {
          setMessages(data)
        }
      } catch (error) {
        console.error("Failed to fetch message history:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (sessionId) {
      fetchHistory()
      setInputValue("")
      setIsTyping(false)
    }

    return () => {
      isMounted = false
    }
  }, [sessionId])

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

    // Simulate AI response delay for now (Fully integrated in STORY-004)
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `This is a mock response to: "${userMessage.content}". Once STORY-004 is finished, this will be real.`,
        created_at: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading history...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.length === 0 && !isTyping ? (
            <div className="text-center py-10 text-muted-foreground italic">
              No messages in this conversation.
            </div>
          ) : (
            messages.map((message) => (
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
            ))
          )}
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
