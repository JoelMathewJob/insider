"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const activityLogs = [
  { id: 1, user: "admin", action: "Adjusted detection threshold", timestamp: "2025-01-25 14:30:22" },
  { id: 2, user: "analyst1", action: "Flagged alert #1234", timestamp: "2025-01-25 15:45:10" },
  { id: 3, user: "system", action: "Automated report generated", timestamp: "2025-01-25 16:00:00" },
]

export function ActivityLogs() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

