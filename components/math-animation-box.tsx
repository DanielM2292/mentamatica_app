"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Plus, Minus, X, Divide, Star } from "lucide-react"

interface MathAnimationBoxProps {
  type: "counting" | "operations"
}

export default function MathAnimationBox({ type }: MathAnimationBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
      )
    }
  }, [currentStep])

  if (type === "counting") {
    const dots = Array.from({ length: currentStep + 1 }, (_, i) => i)

    return (
      <div
        ref={boxRef}
        className="animation-box w-64 h-64 bg-white/90 rounded-3xl border-4 border-purple-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm"
      >
        <h4 className="text-lg font-bold text-purple-600 mb-6">¡Contemos juntos!</h4>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {dots.map((_, index) => (
            <div
              key={`${currentStep}-${index}`}
              className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>

        <div className="text-4xl font-bold text-gray-700 bg-yellow-200 rounded-full w-16 h-16 flex items-center justify-center">
          {currentStep + 1}
        </div>
      </div>
    )
  }

  const operations = [
    {
      symbol: <Plus className="w-10 h-10" />,
      color: "from-green-400 to-emerald-500",
      problem: "3 + 2",
      result: "5",
      bgColor: "bg-green-100",
    },
    {
      symbol: <Minus className="w-10 h-10" />,
      color: "from-orange-400 to-red-500",
      problem: "8 - 3",
      result: "5",
      bgColor: "bg-orange-100",
    },
    {
      symbol: <X className="w-10 h-10" />,
      color: "from-yellow-400 to-orange-500",
      problem: "3 × 2",
      result: "6",
      bgColor: "bg-yellow-100",
    },
    {
      symbol: <Divide className="w-10 h-10" />,
      color: "from-cyan-400 to-blue-500",
      problem: "10 ÷ 2",
      result: "5",
      bgColor: "bg-blue-100",
    },
  ]

  const currentOp = operations[currentStep]

  return (
    <div
      ref={boxRef}
      className={`animation-box w-64 h-64 bg-white/90 rounded-3xl border-4 border-blue-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm ${currentOp.bgColor}`}
    >
      <h4 className="text-lg font-bold text-blue-600 mb-4">¡Resolvamos!</h4>

      <div
        className={`w-20 h-20 bg-gradient-to-br ${currentOp.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300`}
      >
        {currentOp.symbol}
      </div>

      <div className="text-center">
        <div className="text-xl font-semibold text-gray-700 mb-2">{currentOp.problem}</div>
        <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
          = {currentOp.result}
          <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
        </div>
      </div>
    </div>
  )
}