"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function DataVisualizationCustomization() {
  const [theme, setTheme] = useState("light")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [realTimeUpdates, setRealTimeUpdates] = useState(true)

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Data Visualization Customization</CardTitle>
        <CardDescription>Customize the appearance and behavior of data visualizations</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="refresh-interval">Refresh Interval</Label>
          <Select value={refreshInterval} onValueChange={setRefreshInterval}>
            <SelectTrigger id="refresh-interval">
              <SelectValue placeholder="Select refresh interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">1 minute</SelectItem>
              <SelectItem value="300">5 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="real-time-updates" checked={realTimeUpdates} onCheckedChange={setRealTimeUpdates} />
          <Label htmlFor="real-time-updates">Enable real-time updates</Label>
        </div>
        <Button className="mt-auto">Save Preferences</Button>
      </CardContent>
    </Card>
  )
}

