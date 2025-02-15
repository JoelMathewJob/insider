"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Shield } from "lucide-react"

const logs = [
  { 
    id: 1, 
    user: "Joel Job",
    department: "Engineering",
    action: "File access",
    resource: "sensitive_data.xlsx",
    resourceType: "Confidential",
    timestamp: "2023-05-15 10:30:22",
    location: "192.168.1.100",
    status: "flagged",
    riskLevel: "high",
    anomalyType: "Unusual access time",
    deviceType: "Personal laptop",
    reviewedBy: "Admin Smith"
  },
  { 
    id: 2, 
    user: "Liz Annie",
    department: "HR",
    action: "Login",
    resource: "Main Dashboard",
    resourceType: "Internal",
    timestamp: "2023-05-15 09:45:10",
    location: "10.0.0.15",
    status: "allowed",
    riskLevel: "low",
    anomalyType: null,
    deviceType: "Company desktop",
    reviewedBy: null
  },
  {
    id: 3,
    user: "Bini Job",
    department: "Sales",
    action: "Data export",
    resource: "Customer Database",
    resourceType: "Restricted",
    timestamp: "2023-05-15 11:15:05",
    location: "172.16.0.25",
    status: "blocked",
    riskLevel: "critical",
    anomalyType: "Bulk data export",
    deviceType: "Unknown device",
    reviewedBy: "Admin Johnson"
  },
  {
    id: 4,
    user: "Jini Job",
    department: "IT",
    action: "Password change",
    resource: "User Settings",
    resourceType: "System",
    timestamp: "2023-05-15 14:20:18",
    location: "192.168.1.150",
    status: "allowed",
    riskLevel: "medium",
    anomalyType: "Multiple password changes",
    deviceType: "Company laptop",
    reviewedBy: "Admin Davis"
  }
]

export function UserInteractionLogs() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status) => {
    const styles = {
      flagged: "bg-yellow-500 text-white",
      blocked: "bg-red-500 text-white",
      allowed: "bg-green-500 text-white"
    }
    return <Badge className={styles[status]}>{status}</Badge>
  }

  const getRiskBadge = (level) => {
    const styles = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      critical: "bg-red-500 text-white"
    }
    return <Badge className={styles[level]}>{level}</Badge>
  }

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Interaction Logs</CardTitle>
        <CardDescription>Security monitoring and insider threat detection logs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input 
            placeholder="Search logs by user, action, resource, department..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <Button variant="secondary">Search</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Anomaly</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Reviewed By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.department}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.resourceType}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>{getRiskBadge(log.riskLevel)}</TableCell>
                  <TableCell>
                    {log.anomalyType ? (
                      <span className="text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {log.anomalyType}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>{log.deviceType}</TableCell>
                  <TableCell>
                    <span className="text-xs font-mono">{log.location}</span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {log.timestamp}
                    </span>
                  </TableCell>
                  <TableCell>
                    {log.reviewedBy ? (
                      <span className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        {log.reviewedBy}
                      </span>
                    ) : (
                      <span className="text-gray-400">Pending review</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}