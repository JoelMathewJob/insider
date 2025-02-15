"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RecentAlerts } from "@/components/recent-alerts"
import { UserActivity } from "@/components/user-activity"
import { TrendAnalysis } from "@/components/trend-analysis"
import { DataExfiltrationMonitor } from "@/components/data-exfiltration-monitor"
import { UserBehaviorAnalytics } from "@/components/user-behavior-analytics"
import { ReportGenerator } from "@/components/report-generator"
import { MachineLearningInsights } from "@/components/machine-learning-insights"
import { HistoricalDataAnalysis } from "@/components/historical-data-analysis"
import { AnomalyGraph } from "@/components/anomaly-graph"

// import { TrendAnalysis } from "@/components/trend-analysis"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-5">
      <div className="flex items-center justify-between space-y-2">
        {/* <h2 className="text-3xl font-bold tracking-tight">Insider Threat Detection Dashboard</h2> */}

      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        {/* <div className="flex items-center space-x-2 justify-center mb-10"> */}

        {/* <TabsList className="flex justify-center pb-12 max-md:hidden md:pb-16 dark:bg-transparent">
          <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1">
            {[
              // { value: "overview", label: "Overview" },
              // { value: "alerts", label: "Alerts" },
              // { value: "users", label: "Users" },
              // { value: "trends", label: "Trends" },
              // { value: "investigation", label: "Investigation" },
              // { value: "compliance", label: "Compliance" },
              // { value: "settings", label: "Settings" },
            ].map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className={`flex h-10 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors text-white focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 
                  data-[state=active]:relative
                  data-[state=active]:bg-gradient-to-b 
                  data-[state=active]:from-gray-900 
                  data-[state=active]:via-gray-800/60 
                  data-[state=active]:to-gray-900 
                  data-[state=active]:before:pointer-events-none 
                  data-[state=active]:before:absolute 
                  data-[state=active]:before:inset-0
                  // Increased height of the gradient
                  data-[state=active]:before:rounded-[inherit] 
                  data-[state=active]:before:border 
                  data-[state=active]:before:border-transparent 
                  data-[state=active]:before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/10))_border-box]
                  data-[state=active]:before:[mask-composite:exclude_!important] 
                  data-[state=active]:before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]
                  opacity-65 
                  transition-opacity hover:opacity-90`}
                
              >
                {label}
              </TabsTrigger>
            ))}
          </div>
        </TabsList> */}


        {/* </div> */}

        <TabsContent value="overview" className="space-y-4">
          <RecentAlerts />

          <AnomalyGraph />
          <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1">
            <HistoricalDataAnalysis />
            <ReportGenerator />
          </div>
        </TabsContent>
        {/* <TabsContent value="trends" className="space-y-4">

          <DataExfiltrationMonitor />
          <MachineLearningInsights />

        </TabsContent> */}

      </Tabs>
    </div>
  )
}

