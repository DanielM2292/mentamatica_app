import React from "react"

export const metadata = {
  title: "MentaMática | Dashboard",
  description: "Explora módulos interactivos para aprender matemáticas",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F0E1]">
      {children}
    </div>
  )
}
