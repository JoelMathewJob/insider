"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function DataLossPrevention() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Data Loss Prevention</CardTitle>
        <CardDescription>Monitor data transfers and policy violations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-05-15 11:30:22</TableCell>
              <TableCell>jane.smith</TableCell>
              <TableCell>Upload to cloud storage</TableCell>
              <TableCell>
                <Badge variant="warning">Flagged</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-05-15 13:45:10</TableCell>
              <TableCell>bob.johnson</TableCell>
              <TableCell>USB device connection</TableCell>
              <TableCell>
                <Badge variant="destructive">Blocked</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-05-15 15:20:05</TableCell>
              <TableCell>alice.williams</TableCell>
              <TableCell>Email attachment</TableCell>
              <TableCell>
                <Badge variant="default">Allowed</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

