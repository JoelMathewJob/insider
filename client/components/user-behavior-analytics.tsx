"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from "recharts"

const data = [
  { subject: "Login Frequency", A: 120, B: 110, fullMark: 150 },
  { subject: "File Access", A: 98, B: 130, fullMark: 150 },
  { subject: "Network Usage", A: 86, B: 130, fullMark: 150 },
  { subject: "After Hours Activity", A: 99, B: 100, fullMark: 150 },
  { subject: "Data Transfer", A: 85, B: 90, fullMark: 150 },
  { subject: "Application Usage", A: 65, B: 85, fullMark: 150 },
]

export function UserBehaviorAnalytics() {
  const [selectedUser, setSelectedUser] = useState("user1")

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>User Behavior Analytics</CardTitle>
        <CardDescription>Comparative analysis of user behavior patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user1">Joel Job</SelectItem>
            <SelectItem value="user2">Jeremy</SelectItem>
            <SelectItem value="user3">Sophia</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar name="User" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Baseline" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

