"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion"

// Severity color mapping
const severityColors = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500",
  High: "bg-orange-500",
  Critical: "bg-red-500",
}

export function RecentAlerts({ showAllAlerts = false }) {
  const [alerts, setAlerts] = useState([])
  const [newAlert, setNewAlert] = useState(false) // To show "New Alert Received" indicator
  const [timeFilter, setTimeFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAll, setShowAll] = useState(showAllAlerts)

  // Fetch alerts from JSON file
  const fetchAlerts = async () => {
    try {
      const response = await fetch("/data/alerts.json")
      const data = await response.json()

      // Simulate real-time updates: Add only new alerts to the top
      setAlerts((prevAlerts) => {
        const newAlerts = data.filter(alert => !prevAlerts.some(a => a.id === alert.id))
        if (newAlerts.length > 0) {
          setNewAlert(true) // Show the "New Alert" indicator
          setTimeout(() => setNewAlert(false), 3000) // Hide after 3 seconds
        }
        return [...newAlerts, ...prevAlerts]
      })
    } catch (error) {
      console.error("Error fetching alerts:", error)
    }
  }

  // Fetch alerts initially and every 5 seconds to simulate real-time updates
  useEffect(() => {
    fetchAlerts()
    const interval = setInterval(fetchAlerts, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Filter alerts based on user selections
  const filteredAlerts = alerts.filter((alert) => {
    if (severityFilter !== "all" && alert.severity !== severityFilter) return false
    if (statusFilter !== "all" && alert.status !== statusFilter) return false
    if (timeFilter === "today" && !alert.time.includes("minutes ago") && !alert.time.includes("hours ago")) return false
    if (timeFilter === "week" && alert.time.includes("days ago")) return false
    if (searchTerm && !Object.values(alert).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())))
      return false
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
        <CardDescription>You have {alerts.length} total alerts.</CardDescription>
      </CardHeader>
      <CardContent>

        {/* New Alert Indicator */}
        <AnimatePresence>
          {newAlert && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              transition={{ duration: 0.3 }}
              className="mb-4 bg-red-600 text-white text-center py-2 rounded-md animate-pulse"
            >
              🚨 New Alert Received!
            </motion.div>
          )}
        </AnimatePresence>

        {showAll && (
          <div className="flex flex-wrap gap-4 mb-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px]"
            />
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Alert ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredAlerts.slice(0, showAll ? undefined : 5).map((alert) => (
                <motion.tr
                  key={alert.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-b"
                >
                  <TableCell>{alert.id}</TableCell>
                  <TableCell>{alert.user}</TableCell>
                  <TableCell>{alert.action}</TableCell>
                  <TableCell>
                    <Badge className={`text-white px-2 py-1 rounded-md ${severityColors[alert.severity]}`}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.status}</TableCell>
                  <TableCell className="text-right">{alert.time}</TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>

        {/* View All Alerts Button */}
        {!showAll && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowAll(true)}>View All Alerts</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
