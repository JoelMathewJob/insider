import { AnomalyGraph } from "@/components/anomaly-graph"
import { TrendAnalysis } from "@/components/trend-analysis"
import { DataExfiltrationMonitor } from "@/components/data-exfiltration-monitor"
import { MachineLearningInsights } from "@/components/machine-learning-insights"
import { HistoricalDataAnalysis } from "@/components/historical-data-analysis"


export default function TrendsPage() {
  return (

    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Trends</h2>
      <AnomalyGraph />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr mt-5">
        <div className="flex">
          <TrendAnalysis />

        </div>
        <div className="flex">
          <MachineLearningInsights />


        </div>
        <div className="flex">
          <DataExfiltrationMonitor />

        </div>
        <div className="flex">
          <HistoricalDataAnalysis />
        </div>
      </div>
    </div>
  )
}

