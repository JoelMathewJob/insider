"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function IncidentInvestigation() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Incident Investigation</CardTitle>
        <CardDescription>Forensic analysis and timeline view of incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="logs">
          <TabsList>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="logs">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button>Search</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-05-15 10:30:22</TableCell>
                    <TableCell>john.doe</TableCell>
                    <TableCell>File Access</TableCell>
                    <TableCell>Accessed sensitive_data.xlsx</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-15 10:35:47</TableCell>
                    <TableCell>john.doe</TableCell>
                    <TableCell>Data Transfer</TableCell>
                    <TableCell>Uploaded file to external cloud storage</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="timeline">
            <div className="space-y-4">
              <p>Timeline view of events will be displayed here...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

