"use client"

import { useState } from "react"
import { Bell, Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
// import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const [notifications, setNotifications] = useState(3)
  // const { toast } = useToast()

  const handleNotificationClick = () => {
    setNotifications(0)
    // toast({
    //   title: "Notifications cleared",
    //   description: "All notifications have been marked as read.",
    // })
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-black dark:bg-neutral-950">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Insider Threat Detection</h1>
        </Link>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400" />
          <Input type="search" placeholder="Search..." className="pl-8 w-64" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNotificationClick}>
              <span className="font-medium">New high-risk alert</span>
              <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">2m ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNotificationClick}>
              <span className="font-medium">Unusual login attempt detected</span>
              <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">1h ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleNotificationClick}>
              <span className="font-medium">System update available</span>
              <span className="ml-auto text-xs text-neutral-500 dark:text-neutral-400">1d ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Joel Job</p>
                <p className="text-xs leading-none text-neutral-500 dark:text-neutral-400">joelmathewjob36@gmail.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

