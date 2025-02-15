"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CollaborationTools() {
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the notes to a server
    console.log("Notes submitted:", notes)
    setNotes("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Collaboration Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="alert-id" className="block text-sm font-medium text-gray-700">
              Alert ID
            </label>
            <Input id="alert-id" type="text" placeholder="Enter alert ID" />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <Textarea
              id="notes"
              placeholder="Add your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
          <Button type="submit">Submit Notes</Button>
        </form>
      </CardContent>
    </Card>
  )
}

