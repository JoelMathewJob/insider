"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { month: "Jan", incidents: 65 },
  { month: "Feb", incidents: 59 },
  { month: "Mar", incidents: 80 },
  { month: "Apr", incidents: 81 },
  { month: "May", incidents: 56 },
  { month: "Jun", incidents: 55 },
  { month: "Jul", incidents: 40 },
]

export function HistoricalDataAnalysis() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Historical Data Analysis</CardTitle>
        <CardDescription>Long-term trends in insider threat incidents</CardDescription>
      </CardHeader>
      <CardContent>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="2years">Last 2 Years</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="incidents" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

