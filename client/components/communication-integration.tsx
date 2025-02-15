"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function CommunicationIntegration() {
  const [slackWebhook, setSlackWebhook] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(false)

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Communication Integration</CardTitle>
        <CardDescription>Configure integrations with communication platforms</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
          <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
          <Input
            id="slack-webhook"
            value={slackWebhook}
            onChange={(e) => setSlackWebhook(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          <Label htmlFor="email-notifications">Enable Email Notifications</Label>
        </div>
        <Button className="mt-auto">Save Integration Settings</Button>
      </CardContent>
    </Card>
  )
}

