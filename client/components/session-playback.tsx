"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

export function SessionPlayback() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlayback = () => setIsPlaying(!isPlaying)

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Session Playback</CardTitle>
        <CardDescription>Investigate user actions during flagged events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="session1">Session 1 - Basil Mathai (2023-05-15 09:30)</SelectItem>
              <SelectItem value="session2">Session 2 - Rahul Jadhav (2023-05-16 14:45)</SelectItem>
              <SelectItem value="session3">Session 3 - Smitha Rukhande (2023-05-17 11:20)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="icon">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={togglePlayback}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="icon">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p>Current Time: {currentTime} seconds</p>
          </div>
          <div className="border p-4 h-40 overflow-y-auto">
            <p className="text-sm">Session activity log will be displayed here...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

