"use client"

import { useState } from "react"
import { AlertsSection } from "@/components/alerts-section"
import { TrendsSection } from "@/components/trends-section"
import { UserProfilesSection } from "@/components/user-profiles-section"
import { SettingsSection } from "@/components/settings-section"

export function MainContent() {
  const [activeSection, setActiveSection] = useState("alerts")

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {activeSection === "alerts" && <AlertsSection />}
      {activeSection === "trends" && <TrendsSection />}
      {activeSection === "user-profiles" && <UserProfilesSection />}
      {activeSection === "settings" && <SettingsSection />}
    </main>
  )
}

