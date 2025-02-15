"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PrivacyCompliance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Compliance</CardTitle>
        <CardDescription>Manage privacy settings and compliance features</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="privacy">
          <TabsList>
            <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="data-anonymization">Data Anonymization</Label>
                <Switch id="data-anonymization" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="encryption">AES-256 Encryption</Label>
                <Switch id="encryption" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="compliance">
            <div className="space-y-4">
              <div>
                <Label>GDPR Compliance</Label>
                <Progress value={85} className="mt-2" />
                <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">85% compliant</p>
              </div>
              <div>
                <Label>HIPAA Compliance</Label>
                <Progress value={92} className="mt-2" />
                <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">92% compliant</p>
              </div>
              <div>
                <Label>PCI DSS Compliance</Label>
                <Progress value={78} className="mt-2" />
                <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">78% compliant</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

