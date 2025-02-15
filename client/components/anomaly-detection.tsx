"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", score: 0.2 },
  { name: "Tue", score: 0.5 },
  { name: "Wed", score: 0.3 },
  { name: "Thu", score: 0.8 },
  { name: "Fri", score: 0.4 },
  { name: "Sat", score: 0.2 },
  { name: "Sun", score: 0.1 },
]

export function AnomalyDetection() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>Real-time anomaly detection scores</CardDescription>
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
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

