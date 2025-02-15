"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Email", amount: 400 },
  { name: "USB", amount: 300 },
  { name: "Cloud", amount: 200 },
  { name: "Print", amount: 100 },
  { name: "Network", amount: 150 },
]

export function DataExfiltrationMonitor() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Data Exfiltration Monitor</CardTitle>
        <CardDescription>Monitoring potential data exfiltration channels</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 hours</SelectItem>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

