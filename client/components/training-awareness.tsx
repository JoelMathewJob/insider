"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const trainingModules = [
  { id: 1, name: "Phishing Awareness", progress: 75 },
  { id: 2, name: "Data Protection Basics", progress: 100 },
  { id: 3, name: "Insider Threat Recognition", progress: 50 },
  { id: 4, name: "Secure Password Practices", progress: 90 },
]

export function TrainingAwareness() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training & Awareness</CardTitle>
        <CardDescription>Employee security training progress and resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trainingModules.map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex justify-between">
                <span>{module.name}</span>
                <span>{module.progress}%</span>
              </div>
              <Progress value={module.progress} />
            </div>
          ))}
          <Button className="w-full">Launch Training Portal</Button>
        </div>
      </CardContent>
    </Card>
  )
}

