"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", logins: 20, fileAccesses: 45, anomalies: 2 },
  { name: "Tue", logins: 25, fileAccesses: 50, anomalies: 1 },
  { name: "Wed", logins: 22, fileAccesses: 48, anomalies: 3 },
  { name: "Thu", logins: 30, fileAccesses: 55, anomalies: 1 },
  { name: "Fri", logins: 28, fileAccesses: 52, anomalies: 2 },
  { name: "Sat", logins: 15, fileAccesses: 30, anomalies: 0 },
  { name: "Sun", logins: 18, fileAccesses: 35, anomalies: 1 },
]

export function UserActivity() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Weekly overview of user activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Select defaultValue="logins">
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logins">Logins</SelectItem>
            <SelectItem value="fileAccesses">File Accesses</SelectItem>
            <SelectItem value="anomalies">Anomalies</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="logins" stroke="#8884d8" />
            <Line type="monotone" dataKey="fileAccesses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="anomalies" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

