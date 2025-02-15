import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export function SystemHealthOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>CPU Usage</span>
            <span>65%</span>
          </div>
          <Progress value={65} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Memory Usage</span>
            <span>48%</span>
          </div>
          <Progress value={48} />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>Disk I/O</span>
            <span>72%</span>
          </div>
          <Progress value={72} />
        </div>
        <Link href="/settings" className="block mt-4 text-blue-500 hover:underline">
          View system settings
        </Link>
      </CardContent>
    </Card>
  )
}

