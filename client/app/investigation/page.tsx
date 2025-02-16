"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Shield } from "lucide-react"

// Define a type for the log entries
type LogEntry = {
  id: number;
  user: string;
  department: string;
  action: string;
  resource: string;
  resourceType: string;
  timestamp: string;
  status: 'blocked' | 'allowed' | 'flagged';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  anomalyType: string | null;
  reviewedBy: string | null;
};

const logs: LogEntry[] = [
  { 
    id: 1, 
    user: "Joel Job",
    department: "Engineering",
    action: "File access",
    resource: "sensitive_data.xlsx",
    resourceType: "Confidential",
    timestamp: "2023-05-15 10:30:22",
    status: "flagged",
    riskLevel: "high",
    anomalyType: "Unusual access time",
    reviewedBy: "Admin Smith"
  },
  { 
    id: 2, 
    user: "Meljo Saji",
    department: "HR",
    action: "Login",
    resource: "Main Dashboard",
    resourceType: "Internal",
    timestamp: "2023-05-15 09:45:10",
    status: "allowed",
    riskLevel: "low",
    anomalyType: null,
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
    status: "blocked",
    riskLevel: "critical",
    anomalyType: "Bulk data export",
    reviewedBy: "Admin Johnson"
  },
  {
    id: 4,
    user: "Jini Job",
    department: "IT",
    action: "Password change",
    resource: "User  Settings",
    resourceType: "System",
    timestamp: "2023-05-15 14:20:18",
    status: "allowed",
    riskLevel: "medium",
    anomalyType: "Multiple password changes",
    reviewedBy: "Admin Davis"
  }
]

export default function Investigation() {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const getStatusBadge = (status: 'blocked' | 'allowed' | 'flagged') => {
    switch(status) {
      case 'blocked':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Blocked</Badge>
      case 'allowed':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Allowed</Badge>
      case 'flagged':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Flagged</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getRiskBadge = (level: 'low' | 'medium' | 'high' | 'critical') => {
    const styles: Record<'low' | 'medium' | 'high' | 'critical', string> = {
        low: "default",
        medium: "outline",
        high: "secondary",
        critical: "destructive"
    };

    return <Badge variant={styles[level]}>{level}</Badge>;
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <TableHead className="w-[150px]">User </TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Anomaly</TableHead>
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
  );
}