"use client"
import { SecurityIntegrations } from "@/components/security-integrations"
import { DataVisualizationCustomization } from "@/components/data-visualization-customization"
import { CommunicationIntegration } from "@/components/communication-integration"
import { UserManagement } from "@/components/user-management"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        <div className="flex">
          <UserManagement />

        </div>
        <div className="flex">
          <SecurityIntegrations />

        </div>
        <div className="flex">
          <DataVisualizationCustomization />
        </div>
        <div className="flex">
          <CommunicationIntegration />
        </div>
      </div>
    </div>
  )
}

