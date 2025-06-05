"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface ModuleProps {
  module: {
    name: string
    icon: string
    color: string
    description: string
  }
  index: number
}

export default function ModuleCard({ module, index }: ModuleProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hover animation
    if (cardRef.current) {
      cardRef.current.addEventListener("mouseenter", () => {
        gsap.to(cardRef.current, {
          y: -5,
          scale: 1.05,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
        })
      })

      cardRef.current.addEventListener("mouseleave", () => {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          duration: 0.3,
        })
      })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="module-card bg-white rounded-lg p-3 text-center shadow-md cursor-pointer transition-all duration-300"
      style={{ borderTop: `3px solid ${module.color}` }}
    >
      <div className="mb-2 flex justify-center">
        <div className="w-12 h-12 relative">
          {module.icon.startsWith("/") ? (
            <Image
              src={module.icon || "/placeholder.svg"}
              alt={module.name}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <div className="text-3xl">{module.icon}</div>
          )}
        </div>
      </div>

      <h4 className="font-bold text-xs mb-1" style={{ color: module.color }}>
        {module.name}
      </h4>

      <p className="text-xs text-gray-600">{module.description}</p>
    </div>
  )
}