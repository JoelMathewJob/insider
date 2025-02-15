"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", precision: 0.85, recall: 0.78, f1Score: 0.81 },
  { name: "Feb", precision: 0.87, recall: 0.8, f1Score: 0.83 },
  { name: "Mar", precision: 0.86, recall: 0.82, f1Score: 0.84 },
  { name: "Apr", precision: 0.88, recall: 0.83, f1Score: 0.85 },
  { name: "May", precision: 0.89, recall: 0.85, f1Score: 0.87 },
]

export function DetectionModelMetrics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detection Model Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="precision" stroke="#8884d8" name="Precision" />
            <Line type="monotone" dataKey="recall" stroke="#82ca9d" name="Recall" />
            <Line type="monotone" dataKey="f1Score" stroke="#ffc658" name="F1 Score" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

