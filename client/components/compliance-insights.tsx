import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ComplianceInsights() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Compliance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span>GDPR Compliance</span>
            <span>85%</span>
          </div>
          <Progress value={85} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>HIPAA Compliance</span>
            <span>92%</span>
          </div>
          <Progress value={92} className="w-full" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span>PCI DSS Compliance</span>
            <span>78%</span>
          </div>
          <Progress value={78} className="w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

