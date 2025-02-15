"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const activityData = [
  { name: "Mon", anomalies: 4, logins: 120, fileAccesses: 230 },
  { name: "Tue", anomalies: 3, logins: 132, fileAccesses: 280 },
  { name: "Wed", anomalies: 7, logins: 101, fileAccesses: 190 },
  { name: "Thu", anomalies: 5, logins: 134, fileAccesses: 240 },
  { name: "Fri", anomalies: 6, logins: 90, fileAccesses: 200 },
  { name: "Sat", anomalies: 2, logins: 72, fileAccesses: 140 },
  { name: "Sun", anomalies: 3, logins: 85, fileAccesses: 160 },
]

const anomalyData = [
  { name: "Mon", critical: 1, high: 2, medium: 1, low: 0 },
  { name: "Tue", critical: 0, high: 1, medium: 2, low: 0 },
  { name: "Wed", critical: 2, high: 3, medium: 1, low: 1 },
  { name: "Thu", critical: 1, high: 2, medium: 1, low: 1 },
  { name: "Fri", critical: 1, high: 3, medium: 2, low: 0 },
  { name: "Sat", critical: 0, high: 1, medium: 1, low: 0 },
  { name: "Sun", critical: 1, high: 1, medium: 0, low: 1 },
]

export function TrendsOverview() {
  const [selectedMetric, setSelectedMetric] = useState("anomalies")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity Trends</CardTitle>
        <Select value={selectedMetric} onValueChange={setSelectedMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anomalies">Anomalies</SelectItem>
            <SelectItem value="logins">Logins</SelectItem>
            <SelectItem value="fileAccesses">File Accesses</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <TabsList>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="line">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="bar">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="critical" stackId="a" fill="#ff0000" />
                <Bar dataKey="high" stackId="a" fill="#ff9900" />
                <Bar dataKey="medium" stackId="a" fill="#ffff00" />
                <Bar dataKey="low" stackId="a" fill="#00ff00" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {selectedMetric === "anomalies" && "Number of detected anomalies per day"}
          {selectedMetric === "logins" && "Number of user logins per day"}
          {selectedMetric === "fileAccesses" && "Number of file access operations per day"}
        </div>
        <div className="mt-4 text-right">
          <Link href="/trends" className="text-blue-500 hover:underline">
            View detailed trends
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

