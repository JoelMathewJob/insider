"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", anomalies: 65, logins: 1200, fileAccesses: 3200 },
  { name: "Feb", anomalies: 59, logins: 1300, fileAccesses: 3400 },
  { name: "Mar", anomalies: 80, logins: 1400, fileAccesses: 3600 },
  { name: "Apr", anomalies: 81, logins: 1500, fileAccesses: 3800 },
  { name: "May", anomalies: 56, logins: 1600, fileAccesses: 4000 },
  { name: "Jun", anomalies: 55, logins: 1700, fileAccesses: 4200 },
  { name: "Jul", anomalies: 40, logins: 1800, fileAccesses: 4400 },
]

export function TrendAnalysis() {
  const [metric, setMetric] = useState("anomalies")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Trend Analysis</CardTitle>
        <CardDescription>Long-term trend analysis of key metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anomalies">Anomalies</SelectItem>
            <SelectItem value="logins">Logins</SelectItem>
            <SelectItem value="fileAccesses">File Accesses</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={metric} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

