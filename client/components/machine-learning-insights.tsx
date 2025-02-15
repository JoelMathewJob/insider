"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Unusual Access", actual: 400, predicted: 430 },
  { name: "Data Exfiltration", actual: 300, predicted: 320 },
  { name: "Privilege Escalation", actual: 200, predicted: 180 },
  { name: "Unauthorized Changes", actual: 278, predicted: 290 },
  { name: "Off-hours Activity", actual: 189, predicted: 200 },
]

export function MachineLearningInsights() {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Machine Learning Insights</CardTitle>
        <CardDescription>Comparison of actual vs. predicted insider threat activities</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="actual" fill="#8884d8" name="Actual" />
            <Bar dataKey="predicted" fill="#82ca9d" name="Predicted" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

