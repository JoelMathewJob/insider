"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Unusual Access", value: 45 },
  { name: "Data Exfiltration", value: 28 },
  { name: "Privilege Escalation", value: 17 },
  { name: "Unauthorized Changes", value: 34 },
  { name: "Off-hours Activity", value: 23 },
]

export function DataInsights() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Key Insights:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Unusual access events are the most common type of anomaly.</li>
            <li>Data exfiltration attempts have increased by 15% this month.</li>
            <li>Off-hours activity shows a correlation with unauthorized changes.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

