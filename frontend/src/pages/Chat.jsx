import { useParams } from "react-router"

export default function Chat() {
  const { sessionId } = useParams()

  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Chat Session</h1>
      <p className="text-muted-foreground text-lg">
        Currently viewing session ID: <span className="font-mono text-primary">{sessionId}</span>
      </p>
      <div className="p-4 bg-muted rounded-lg border border-border max-w-md text-center italic">
        This is a placeholder for the chat interface. In the next story, we will render the actual message history from the mock data.
      </div>
    </div>
  )
}
