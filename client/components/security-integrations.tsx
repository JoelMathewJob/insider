"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SecurityIntegrations() {
  const [siemIntegration, setSiemIntegration] = useState(false)
  const [apiKey, setApiKey] = useState("")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Security Integrations</CardTitle>
        <CardDescription>Integrate with SIEM systems and manage API access</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="siem-integration">SIEM Integration</Label>
          <Switch id="siem-integration" checked={siemIntegration} onCheckedChange={setSiemIntegration} />
        </div>
        {siemIntegration && (
          <div className="space-y-2">
            <Label htmlFor="siem-url">SIEM URL</Label>
            <Input id="siem-url" placeholder="Enter SIEM URL" />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API Key"
          />
        </div>
        <Button className="mt-auto">Save Integrations</Button>
      </CardContent>
    </Card>
  )
}

