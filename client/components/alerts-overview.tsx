"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, Flag, X, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const alertsData = [
  { id: 1, user: "john.doe", action: "Unusual file access", severity: "Critical", timestamp: "2025-01-25 10:30" },
  { id: 2, user: "jane.smith", action: "Multiple failed logins", severity: "High", timestamp: "2025-01-25 11:15" },
  { id: 3, user: "bob.johnson", action: "Sensitive data download", severity: "Medium", timestamp: "2025-01-25 12:00" },
  { id: 4, user: "alice.williams", action: "Off-hours system access", severity: "Low", timestamp: "2025-01-25 22:45" },
]

const severityColors = {
  Critical: "bg-red-500 hover:bg-red-600",
  High: "bg-orange-500 hover:bg-orange-600",
  Medium: "bg-yellow-500 hover:bg-yellow-600",
  Low: "bg-green-500 hover:bg-green-600",
}

export function AlertsOverview() {
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null)

  const handleFlag = (id: number) => {
    console.log(`Flagged alert ${id}`)
    // Here you would typically update the alert status in your backend
  }

  const handleDismiss = (id: number) => {
    console.log(`Dismissed alert ${id}`)
    // Here you would typically update the alert status in your backend
  }

  const handleAssign = (id: number, analyst: string) => {
    console.log(`Assigned alert ${id} to ${analyst}`)
    // Here you would typically update the alert assignment in your backend
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
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
            {alertsData.map((alert) => (
              <>
                <TableRow key={alert.id} className="group">
                  <TableCell>{alert.user}</TableCell>
                  <TableCell>{alert.action}</TableCell>
                  <TableCell>
                    <Badge className={`${severityColors[alert.severity as keyof typeof severityColors]} text-white`}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleFlag(alert.id)}>
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDismiss(alert.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Select onValueChange={(value) => handleAssign(alert.id, value)}>
                        <SelectTrigger className="w-[130px]">
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
                {expandedAlert === alert.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="p-4 bg-neutral-100 rounded-md dark:bg-neutral-800">
                        <h4 className="font-semibold mb-2">Alert Details</h4>
                        <p>User: {alert.user}</p>
                        <p>Action: {alert.action}</p>
                        <p>Severity: {alert.severity}</p>
                        <p>Timestamp: {alert.timestamp}</p>
                        <p>Additional context: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <Link href="/alerts" className="text-blue-500 hover:underline">
            View all alerts
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

