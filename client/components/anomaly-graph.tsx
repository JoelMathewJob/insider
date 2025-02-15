"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  ResponsiveContainer,  Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,  } from "recharts"


const anomalyData = [
    { date: "2025-05-01", criticalAnomalies: 2, highAnomalies: 5, mediumAnomalies: 12 },
    { date: "2025-05-02", criticalAnomalies: 1, highAnomalies: 7, mediumAnomalies: 15 },
    { date: "2025-05-03", criticalAnomalies: 3, highAnomalies: 4, mediumAnomalies: 10 },
    { date: "2025-05-04", criticalAnomalies: 0, highAnomalies: 6, mediumAnomalies: 14 },
    { date: "2025-05-05", criticalAnomalies: 2, highAnomalies: 3, mediumAnomalies: 11 },
    { date: "2025-05-06", criticalAnomalies: 1, highAnomalies: 2, mediumAnomalies: 8 },
    { date: "2025-05-07", criticalAnomalies: 2, highAnomalies: 5, mediumAnomalies: 13 },
  ]


export function AnomalyGraph() {
    return (
        <Card className="w-full h-full flex flex-col">

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
    )
}

