"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, X, Divide } from "lucide-react"

interface MathAnimationProps {
  type: "counting" | "operations"
}

export default function MathAnimation({ type }: MathAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (type === "counting") {
    const dots = Array.from({ length: currentStep + 1 }, (_, i) => i)

    return (
      <div className="w-48 h-48 bg-white/60 rounded-3xl border-4 border-purple-200 flex flex-col items-center justify-center shadow-xl">
        <motion.h4
          className="text-lg font-bold text-purple-600 mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          Contemos juntos
        </motion.h4>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <AnimatePresence>
            {dots.map((dot, index) => (
              <motion.div
                key={`${currentStep}-${index}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.2 }}
                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg"
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="text-2xl font-bold text-gray-700"
          key={currentStep}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep + 1}
        </motion.div>
      </div>
    )
  }

  const operations = [
    { symbol: <Plus className="w-8 h-8" />, color: "from-green-400 to-emerald-500", problem: "2 + 3", result: "5" },
    { symbol: <Minus className="w-8 h-8" />, color: "from-orange-400 to-red-500", problem: "8 - 3", result: "5" },
    { symbol: <X className="w-8 h-8" />, color: "from-yellow-400 to-orange-500", problem: "3 × 2", result: "6" },
    { symbol: <Divide className="w-8 h-8" />, color: "from-cyan-400 to-blue-500", problem: "10 ÷ 2", result: "5" },
  ]

  const currentOp = operations[currentStep]

  return (
    <div className="w-48 h-48 bg-white/60 rounded-3xl border-4 border-blue-200 flex flex-col items-center justify-center shadow-xl">
      <motion.h4
        className="text-lg font-bold text-blue-600 mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        ¡Resolvamos!
      </motion.h4>

      <motion.div
        key={currentStep}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`w-16 h-16 bg-gradient-to-br ${currentOp.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-4`}
      >
        {currentOp.symbol}
      </motion.div>

      <motion.div
        className="text-center"
        key={`problem-${currentStep}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-lg font-semibold text-gray-700 mb-1">{currentOp.problem}</div>
        <motion.div
          className="text-2xl font-bold text-green-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          = {currentOp.result}
        </motion.div>
      </motion.div>
    </div>
  )
}