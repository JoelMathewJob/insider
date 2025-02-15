"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, AlertCircle, Clock, FileText, Shield, UserCircle } from "lucide-react";


const users = [
  {
    id: "USR001",
    name: "Basil Mathai",
    email: "basilmathai62@gmail.com",
    department: "IT",
    role: "System Administrator",
    riskScore: 75,
    lastLogin: "2023-05-15 09:30:22",
    recentActivities: ["File access", "Database query", "Config change"],
    avatar: "/avatars/01.png",
  },
  {
    id: "USR002",
    name: "Arya Aloni",
    email: "aryaaloni12@outlook.com",
    department: "Finance",
    role: "Accountant",
    riskScore: 25,
    lastLogin: "2023-05-15 08:45:10",
    recentActivities: ["Report generation", "Invoice processing"],
    avatar: "/avatars/02.png",
  },
  {
    id: "USR003",
    name: "Joash Johnson",
    email: "joash.johnson@gmail.com",
    department: "Sales",
    role: "Sales Manager",
    riskScore: 50,
    lastLogin: "2023-05-15 10:15:30",
    recentActivities: ["CRM access", "Email sent to competitor"],
    avatar: "/avatars/03.png",
  },
]

export function UserProfiles() {
  const [selectedUser, setSelectedUser] = useState(users[0])

  return (
    <div className="w-full h-full flex flex-col">
      <Card className="w-full h-full flex flex-col">
        <div className="m-5">

          <Select
            value={selectedUser.id}
            onValueChange={(value) => setSelectedUser(users.find((u) => u.id === value) || users[0])}

          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardHeader >
          <div className="flex items-center space-x-4">
          <UserCircle className="h-10 w-10 text-gray-400" />
            <div>
              <CardTitle>{selectedUser.name}</CardTitle>
              <CardDescription>{selectedUser.email}</CardDescription>
            </div>
          </div>

        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm">{selectedUser.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Role</p>
              <p className="text-sm">{selectedUser.role}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Login</p>
              <p className="text-sm">{selectedUser.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Risk Score</p>
              <div className="flex items-center space-x-2">
                {/* <Progress value={selectedUser.riskScore} className="w-[60px]"  /> */}
                <Badge
                  variant={
                    selectedUser.riskScore > 70 ? "destructive" : 
                    selectedUser.riskScore > 30 ? "warning" : "default"
                  }
                >
                  {selectedUser.riskScore}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Recent Activities</p>
            <ul className="list-disc list-inside text-sm">
              {selectedUser.recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline">View Full Profile</Button>
            <Button variant="destructive">Flag User</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

