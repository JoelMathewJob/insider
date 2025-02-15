"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const threats = [
  { id: 1, type: "Malware", source: "External", severity: "High", lastUpdated: "2023-05-15 10:30:22" },
  { id: 2, type: "Phishing", source: "Email", severity: "Medium", lastUpdated: "2023-05-15 11:45:10" },
  { id: 3, type: "Data Breach", source: "Internal", severity: "Critical", lastUpdated: "2023-05-15 09:15:05" },
  { id: 4, type: "DDoS", source: "External", severity: "Low", lastUpdated: "2023-05-15 14:20:18" },
]

export function ThreatIntelligence() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Threat Intelligence</CardTitle>
        <CardDescription>Latest threat intelligence data and indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Threat Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {threats.map((threat) => (
              <TableRow key={threat.id}>
                <TableCell>{threat.type}</TableCell>
                <TableCell>{threat.source}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      threat.severity === "Critical"
                        ? "destructive"
                        : threat.severity === "High"
                          ? "default"
                          : threat.severity === "Medium"
                            ? "secondary"
                            : "outline"
                    }
                  >
                    {threat.severity}
                  </Badge>
                </TableCell>
                <TableCell>{threat.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

