"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const activityData = [
  { date: "2023-05-01", logins: 120, fileAccesses: 450 },
  { date: "2023-05-02", logins: 132, fileAccesses: 478 },
  { date: "2023-05-03", logins: 101, fileAccesses: 412 },
  { date: "2023-05-04", logins: 134, fileAccesses: 489 },
  { date: "2023-05-05", logins: 90, fileAccesses: 367 },
  { date: "2023-05-06", logins: 72, fileAccesses: 301 },
  { date: "2023-05-07", logins: 85, fileAccesses: 324 },
]

const anomalyData = [
  { date: "2023-05-01", criticalAnomalies: 2, highAnomalies: 5, mediumAnomalies: 12 },
  { date: "2023-05-02", criticalAnomalies: 1, highAnomalies: 7, mediumAnomalies: 15 },
  { date: "2023-05-03", criticalAnomalies: 3, highAnomalies: 4, mediumAnomalies: 10 },
  { date: "2023-05-04", criticalAnomalies: 0, highAnomalies: 6, mediumAnomalies: 14 },
  { date: "2023-05-05", criticalAnomalies: 2, highAnomalies: 3, mediumAnomalies: 11 },
  { date: "2023-05-06", criticalAnomalies: 1, highAnomalies: 2, mediumAnomalies: 8 },
  { date: "2023-05-07", criticalAnomalies: 2, highAnomalies: 5, mediumAnomalies: 13 },
]

export function TrendsSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Behavioral Trends</h2>
      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="logins" stroke="#8884d8" name="Logins" />
                  <Line yAxisId="right" type="monotone" dataKey="fileAccesses" stroke="#82ca9d" name="File Accesses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomalies Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={anomalyData}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="criticalAnomalies" fill="#ff0000" name="Critical" />
                  <Bar dataKey="highAnomalies" fill="#ffa500" name="High" />
                  <Bar dataKey="mediumAnomalies" fill="#ffff00" name="Medium" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

