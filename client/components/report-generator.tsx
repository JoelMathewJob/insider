"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download } from "lucide-react"

const reportOptions = [
  { id: "alerts", label: "Alerts Summary" },
  { id: "userActivity", label: "User Activity" },
  { id: "anomalies", label: "Anomaly Detection" },
  { id: "riskScores", label: "Risk Score Distribution" },
  { id: "dataExfiltration", label: "Data Exfiltration" },
  { id: "compliance", label: "Compliance Overview" },
]

export function ReportGenerator() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState("week")
  const [loading, setLoading] = useState(false)

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleGenerateReport = async () => {
    if (selectedOptions.length === 0) return;
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedOptions, timeRange }),
      });
  
      if (!response.ok) throw new Error("Failed to generate report");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf"; // Change based on format
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error generating report");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
        <CardDescription>Create custom reports based on selected metrics and time range</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Select report components:</Label>
          {reportOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => handleOptionChange(option.id)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeRange">Time Range:</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="timeRange" className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 hours</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 3 months</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleGenerateReport} disabled={loading || selectedOptions.length === 0} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

