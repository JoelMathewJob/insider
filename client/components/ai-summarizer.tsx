"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function AISummarizer() {
  const [input, setInput] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    setLoading(true)
    // Simulating AI summarization
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSummary(
      "This is a simulated AI-generated summary of the input text. In real-world scenario, this would be result processing through an AI model.",
    )
    setLoading(false)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Summarizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Enter text to summarize..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSummarize} disabled={loading || !input}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {loading ? "Summarizing..." : "Summarize"}
        </Button>
        {summary && (
          <div className="mt-4 p-4 bg-neutral-100 rounded-md dark:bg-neutral-800">
            <h4 className="font-semibold mb-2">Summary:</h4>
            <p>{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

