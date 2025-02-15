"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const alerts = [
  { id: 1, user: "joshua ", action: "Unusual file access", severity: "High", timestamp: "2023-05-15 10:30:22" },
  { id: 2, user: "swayam", action: "Multiple spam logins", severity: "Medium", timestamp: "2023-05-15 11:45:10" },
  {
    id: 3,
    user: "baby johnson",
    action: "Sensitive data download",
    severity: "Critical",
    timestamp: "2023-05-15 12:15:05",
  },
]

export function AlertsSection() {
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const filteredAlerts =
    selectedSeverity === "all" ? alerts : alerts.filter((alert) => alert.severity.toLowerCase() === selectedSeverity)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Required </CardTitle>
        <CardDescription>View and manage alerts based on severity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.user}</TableCell>
                <TableCell>{alert.action}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      alert.severity.toLowerCase() === "critical"
                        ? "destructive"
                        : alert.severity.toLowerCase() === "high"
                        ? "warning"
                        : "default"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>{alert.timestamp}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm">Flag</Button>
                    <Button size="sm" variant="outline">
                      Dismiss
                    </Button>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="analyst1">Analyst 1</SelectItem>
                        <SelectItem value="analyst2">Analyst 2</SelectItem>
                        <SelectItem value="analyst3">Analyst 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
