"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, BarChart2, Settings, Users, Home, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: AlertCircle, label: "Alerts", href: "/alerts" },
  // { icon: BarChart2, label: "Trends", href: "/trends" },
  { icon: Users, label: "User Profiles", href: "/user-profiles" },
  { icon: Users, label: "Investigation", href: "/investigation" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="flex flex-col w-64 border-r border-black bg-white dark:bg-neutral-950 hidden md:block">
      <div className="p-4 border-b border-gray-500">
        <Button variant="outline" className="w-full justify-start" onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <Filter className="mr-2 h-4 w-4" />
          Quick Filters
        </Button>
      </div>
      {isFilterOpen && (
        <div className="p-4 border-b space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Select>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select>
              <SelectTrigger id="severity">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user">User</Label>
            <Input id="user" placeholder="Search users" />
          </div>
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn("w-full justify-start", pathname === item.href && "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50")}
              asChild
            >
              <Link href={item.href} className="flex items-center space-x-2">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

