"use client"
import { AlertsSection } from "@/components/alerts-section"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { AlertTrends } from "@/components/alert-trends"
import { RiskScoreDistribution } from "@/components/risk-score-distribution"


export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Alerts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr mb-4">
        <div className="flex">
          <AlertTrends />
    
        </div>
        <div className="flex">
          <AnomalyDetection />
        </div>


        <div className="flex">
          <RiskScoreDistribution />
        </div>
      </div>
      <div >
        <AlertsSection />



      </div>
    </div>
  )
}


