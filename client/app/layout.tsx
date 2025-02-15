import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
// import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Insider Threat Detection Dashboard",
  description: "Monitor and manage insider threats in real-time",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex h-full bg-gradient-to-br from-gray-900 to-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex h-full w-full ">
            {/* <div className="hidden md:block"> */}

              <Sidebar />
            {/* </div> */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-6 bg-black/10 backdrop-blur-sm">{children}</main>
            </div>
          </div>
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}

