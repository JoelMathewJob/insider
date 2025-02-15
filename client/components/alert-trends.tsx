"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", low: 400, medium: 240, high: 100, critical: 20 },
  { name: "Feb", low: 300, medium: 220, high: 80, critical: 15 },
  { name: "Mar", low: 350, medium: 280, high: 120, critical: 30 },
  { name: "Apr", low: 280, medium: 200, high: 90, critical: 25 },
  { name: "May", low: 320, medium: 250, high: 110, critical: 35 },
  { name: "Jun", low: 390, medium: 310, high: 140, critical: 40 },
]

export function AlertTrends() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Alert Trends</CardTitle>
        <CardDescription>Monthly breakdown of alerts by severity</CardDescription>
      </CardHeader>
      <CardContent>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="low" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="medium" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="high" stackId="1" stroke="#ffc658" fill="#ffc658" />
            <Area type="monotone" dataKey="critical" stackId="1" stroke="#ff8042" fill="#ff8042" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

