"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// // Dynamically import MapContainer and related components without SSR
// const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
// const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
// const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

import "leaflet/dist/leaflet.css"

const users = [
  {
    id: "USR001",
    name: "John Doe",
    department: "IT",
    role: "System Administrator",
    riskScore: 75,
    lastLogin: "2023-05-15 09:30:22",
    recentActivities: ["File access", "Database query", "Config change"],
    location: [40.7128, -74.006],
  },
  {
    id: "USR002",
    name: "Jane Smith",
    department: "Finance",
    role: "Accountant",
    riskScore: 25,
    lastLogin: "2023-05-15 08:45:10",
    recentActivities: ["Report generation", "Invoice processing"],
    location: [34.0522, -118.2437],
  },
  // Add more sample users here
]

export function UserProfilesSection() {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Profiles</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id} className="cursor-pointer" onClick={() => setSelectedUser(user)}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/${user.id}.png`} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Department:</span>
                    <span>{user.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <Badge
                      variant={user.riskScore > 70 ? "destructive" : user.riskScore > 30 ? "warning" : "default"}
                    >
                      {user.riskScore}
                    </Badge>
                  </div>
                  <Progress value={user.riskScore} className="w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>User Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: "400px" }}>
              {/* <MapContainer
                center={[39.8283, -98.5795]}
                zoom={4}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {users.map((user) => (
                  <Marker key={user.id} position={user.location}>
                    <Popup>
                      <strong>{user.name}</strong>
                      <br />
                      {user.department} - {user.role}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer> */}
            </div>
          </CardContent>
        </Card>
      </div>
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed User Profile: {selectedUser.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Last Login:</span>
                <span>{selectedUser.lastLogin}</span>
              </div>
              <div>
                <p className="font-semibold">Recent Activities:</p>
                <ul className="list-disc list-inside">
                  {selectedUser.recentActivities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
