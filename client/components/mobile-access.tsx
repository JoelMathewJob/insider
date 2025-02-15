"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function MobileAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mobile Access</CardTitle>
        <CardDescription>Configure mobile access settings for the dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="enable-mobile-access" />
          <Label htmlFor="enable-mobile-access">Enable Mobile Access</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="push-notifications" />
          <Label htmlFor="push-notifications">Enable Push Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="biometric-auth" />
          <Label htmlFor="biometric-auth">Enable Biometric Authentication</Label>
        </div>
        <Button>Save Mobile Settings</Button>
      </CardContent>
    </Card>
  )
}

