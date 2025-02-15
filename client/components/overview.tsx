"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  { name: "Jan", alerts: 4000, anomalies: 2400 },
  { name: "Feb", alerts: 3000, anomalies: 1398 },
  { name: "Mar", alerts: 2000, anomalies: 9800 },
  { name: "Apr", alerts: 2780, anomalies: 3908 },
  { name: "May", alerts: 1890, anomalies: 4800 },
  { name: "Jun", alerts: 2390, anomalies: 3800 },
  { name: "Jul", alerts: 3490, anomalies: 4300 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="alerts" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="anomalies" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

