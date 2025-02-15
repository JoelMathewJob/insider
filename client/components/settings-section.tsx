"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SettingsSection() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="space-y-4">
      {/* <h2 className="text-2xl font-bold">Settings</h2> */}
      <Tabs defaultValue="privacy">
        <TabsList>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="detection">Detection Thresholds</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin Tools</TabsTrigger>}
        </TabsList>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="anonymize-data">Anonymize Data</Label>
                <Switch id="anonymize-data" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="encryption">Use AES-256 Encryption</Label>
                <Switch id="encryption" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="detection">
          <Card>
            <CardHeader>
              <CardTitle>Detection Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="anomaly-threshold">Anomaly Detection Threshold</Label>
                <Slider id="anomaly-threshold" min={0} max={100} step={1} defaultValue={[50]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-threshold">Risk Score Threshold</Label>
                <Slider id="risk-threshold" min={0} max={100} step={1} defaultValue={[75]} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {isAdmin && (
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-logs">System Logs</Label>
                  <textarea
                    id="system-logs"
                    className="w-full h-32 p-2 border border-neutral-200 rounded dark:border-neutral-800"
                    readOnly
                    value="[2023-05-15 10:30:22] System started
                                      [2023-05-15 10:35:15] User login: admin
                                      [2023-05-15 10:40:03] Anomaly detected: USR001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-threshold">Update Global Threshold</Label>
                  <div className="flex space-x-2">
                    <Input id="update-threshold" type="number" placeholder="New threshold value" />
                    <Button>Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      <div className="mt-8">
        <Button onClick={() => setIsAdmin(!isAdmin)}>{isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}</Button>
      </div>
    </div>
  )
}

