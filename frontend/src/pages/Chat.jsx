import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { api } from "@/lib/api"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Send, AlertTriangle } from "lucide-react"

export default function Chat() {
  const { sessionId } = useParams()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Fetch real history when session changes
  useEffect(() => {
    let isMounted = true

    async function fetchHistory() {
      setIsLoading(true)
      setError(null)
      setMessages([]) // Reset messages for new session
      try {
        const data = await api.get(`/sessions/${sessionId}/messages/`)
        if (isMounted) {
          setMessages(data)
        }
      } catch (err) {
        console.error("Failed to fetch message history:", err)
        if (isMounted) {
          setError("I couldn't load the chat history. The server might be offline.")
        }
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

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    const promptText = inputValue

    // 1. Optimistic UI update for user message
    const optimisticUserMessage = {
      id: Date.now(),
      role: "user",
      content: promptText,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, optimisticUserMessage])
    setInputValue("")
    setIsTyping(true)

    // 2. Real API call to the AI Agent
    try {
      const assistantMessage = await api.post(`/sessions/${sessionId}/chat`, {
        prompt: promptText,
      })
      
      // 3. Append real backend response
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("AI chat failed:", error)
      // Fallback for errors
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Sorry, I encountered an error connecting to the AI Agent. Please check if the backend is running.",
          created_at: new Date().toISOString(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4 space-y-4">
          <Skeleton className="h-12 w-[60%] rounded-lg" />
          <Skeleton className="h-12 w-[40%] ml-auto rounded-lg" />
          <Skeleton className="h-12 w-[70%] rounded-lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
          <AlertTriangle className="size-8" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Connection Error</h2>
        <p className="text-muted-foreground max-w-sm">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry Connection
        </Button>
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
