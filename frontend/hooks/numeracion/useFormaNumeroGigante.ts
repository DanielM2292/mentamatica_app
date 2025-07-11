"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Modificar la configuración de niveles para generar números aleatorios
const formaNumeroLevels = [
  {
    name: "Nivel 1",
    digits: 4,
    description: "Números de 4 cifras",
    numbersPerLevel: 5,
  },
  {
    name: "Nivel 2",
    digits: 5,
    description: "Números de 5 cifras",
    numbersPerLevel: 5,
  },
  {
    name: "Nivel 3",
    digits: 5,
    description: "Números complejos de 5 cifras",
    numbersPerLevel: 5,
  },
]

// Agregar función para generar números aleatorios
const generateRandomNumber = (digits: number): number => {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Agregar función para generar array de números aleatorios únicos
const generateRandomNumbers = (digits: number, count: number): number[] => {
  const numbers = new Set<number>()
  while (numbers.size < count) {
    numbers.add(generateRandomNumber(digits))
  }
  return Array.from(numbers)
}

interface DigitCard {
  id: string
  digit: number
  isUsed: boolean
  position?: number
}

interface DropSlot {
  position: number
  digit: number | null
  label: string
  value: number
}

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

const generateDigitCards = (targetNumber: number): DigitCard[] => {
  const targetDigits = targetNumber.toString().split("").map(Number)
  const extraDigits = []

  // Add random extra digits for challenge
  for (let i = 0; i < 4; i++) {
    extraDigits.push(Math.floor(Math.random() * 10))
  }

  const allDigits = [...targetDigits, ...extraDigits]
  const shuffledDigits = allDigits.sort(() => Math.random() - 0.5)

  return shuffledDigits.map((digit, index) => ({
    id: `digit-${digit}-${index}-${Date.now()}`,
    digit,
    isUsed: false,
  }))
}

export const useFormaNumeroGigante = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0)
  const [digitCards, setDigitCards] = useState<DigitCard[]>([])
  const [dropSlots, setDropSlots] = useState<DropSlot[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  // En el hook, modificar la inicialización para generar números aleatorios
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const draggedItem = useRef<DigitCard | null>(null)
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = formaNumeroLevels[currentLevel]
  // Modificar currentTargetNumber para usar números aleatorios
  const currentTargetNumber = randomNumbers[currentNumberIndex]
  const isLastLevel = currentLevel >= formaNumeroLevels.length - 1
  const estrellas = convertirErrores(errores)

  // Initialize timer
  useEffect(() => {
    iniciar()
  }, [iniciar])

  // Toast function to prevent duplicates
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

      if (now - lastToastTime.current < 500 && lastToastMessage.current === message) {
        return
      }

      lastToastTime.current = now
      lastToastMessage.current = message

      toast({
        title,
        description,
        duration: 2000,
        ...(variant && { variant }),
      })
    },
    [toast],
  )

  // Initialize drop slots
  const initializeDropSlots = useCallback((targetNumber: number) => {
    const digits = targetNumber.toString().length
    const slots: DropSlot[] = []
    const labels = ["Unidades", "Decenas", "Centenas", "Miles", "Decenas de Miles"]

    for (let i = 0; i < digits; i++) {
      slots.push({
        position: i,
        digit: null,
        label: labels[i],
        value: Math.pow(10, i),
      })
    }

    return slots.reverse() // Show from left to right (highest to lowest value)
  }, [])

  // Start new number challenge
  const startNewNumber = useCallback(() => {
    if (!currentTargetNumber) return

    const newDigitCards = generateDigitCards(currentTargetNumber)
    const newDropSlots = initializeDropSlots(currentTargetNumber)

    setDigitCards(newDigitCards)
    setDropSlots(newDropSlots)
    setIsGameActive(true)
  }, [currentTargetNumber, initializeDropSlots])

  // Handle drag start
  const handleDragStart = useCallback((digitCard: DigitCard) => {
    if (digitCard.isUsed) return
    draggedItem.current = digitCard
  }, [])

  // Handle drop
  const handleDrop = useCallback((slotPosition: number) => {
    if (!draggedItem.current) return

    const draggedDigit = draggedItem.current

    setDropSlots((prev) => {
      const newSlots = [...prev]
      const targetSlot = newSlots.find((slot) => slot.position === slotPosition)

      if (!targetSlot) return prev

      // If slot is occupied, return previous digit to available cards
      if (targetSlot.digit !== null) {
        setDigitCards((prevCards) =>
          prevCards.map((card) =>
            card.position === slotPosition ? { ...card, isUsed: false, position: undefined } : card,
          ),
        )
      }

      // Place the new digit
      targetSlot.digit = draggedDigit.digit
      return newSlots
    })

    // Mark digit as used
    setDigitCards((prev) =>
      prev.map((card) => (card.id === draggedDigit.id ? { ...card, isUsed: true, position: slotPosition } : card)),
    )

    draggedItem.current = null
  }, [])

  // Check if number is complete and correct
  const checkNumber = useCallback(() => {
    const formedNumber = dropSlots
      .sort((a, b) => b.position - a.position)
      .map((slot) => slot.digit)
      .join("")

    if (formedNumber.length !== currentTargetNumber?.toString().length) {
      return false
    }

    const formedNum = Number.parseInt(formedNumber)
    return formedNum === currentTargetNumber
  }, [dropSlots, currentTargetNumber])

  // Submit current number
  const submitNumber = useCallback(() => {
    const isCorrect = checkNumber()

    if (isCorrect) {
      setAciertos((prev) => prev + 1)
      showToast("¡Excelente!", `¡Formaste correctamente ${currentTargetNumber?.toLocaleString()}!`)

      // Move to next number or complete level
      if (currentNumberIndex < currentGameLevel.numbersPerLevel - 1) {
        setTimeout(() => {
          setCurrentNumberIndex((prev) => prev + 1)
        }, 1500)
      } else {
        // Level complete
        setTimeout(() => {
          setIsLevelComplete(true)
          setIsGameActive(false)
          setCompletedSets([{ id: currentLevel }])
          showToast("¡Nivel completado! 🎉", `Has completado el ${currentGameLevel.name}`)
        }, 1500)
      }
    } else {
      setErrores((prev) => prev + 1)
      showToast("¡Inténtalo de nuevo!", "El número no es correcto", "destructive")
    }
  }, [checkNumber, currentTargetNumber, currentNumberIndex, currentGameLevel, showToast, currentLevel])

  // Clear current number
  const clearNumber = useCallback(() => {
    setDropSlots((prev) => prev.map((slot) => ({ ...slot, digit: null })))
    setDigitCards((prev) => prev.map((card) => ({ ...card, isUsed: false, position: undefined })))
  }, [])

  // Handle next level
  const handleNextLevel = useCallback(() => {
    if (currentLevel < formaNumeroLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(newLevel)
      setCurrentNumberIndex(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setRandomNumbers([]) // Resetear para generar nuevos números

      showToast("¡Nuevo nivel desbloqueado! 🚀", `${formaNumeroLevels[newLevel].name}`)

      setTimeout(() => {
        startNewNumber()
      }, 1000)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, showToast, detener, startNewNumber])

  // Handle restart
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentNumberIndex(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setRandomNumbers([]) // Resetear números aleatorios

    reiniciar()
    showToast("¡Juego reiniciado! 🔄", "Comenzando desde el nivel 1")

    setTimeout(() => {
      startNewNumber()
    }, 1000)
  }, [reiniciar, showToast, startNewNumber])

  // Results submission
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const urlParts = window.location.pathname.split("/")
      const actividad = urlParts[urlParts.length - 1]
      const intentos = aciertos + errores
      const tiempoAEnviar = tiempo

      try {
        const res = await fetch(`http://localhost:3001/api/numeracion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id,
            actividad,
            estrellas,
            intentos,
            errores,
            tiempo: tiempoAEnviar,
          }),
        })

        if (!res.ok) {
          throw new Error("Error al guardar resultados")
        }

        setTiempoFinal(tiempoAEnviar)
      } catch (error) {
        console.error("Error al guardar resultados:", error)
      }
    }

    if (isGameComplete && tiempoFinal === null) {
      detener()
      enviarResultados()
    }
  }, [isGameComplete, tiempoFinal, user?.id, estrellas, aciertos, errores, tiempo, detener])

  // Modificar el useEffect de inicialización
  useEffect(() => {
    if (currentGameLevel && randomNumbers.length === 0) {
      const newRandomNumbers = generateRandomNumbers(currentGameLevel.digits, currentGameLevel.numbersPerLevel)
      setRandomNumbers(newRandomNumbers)
    }
  }, [currentGameLevel, randomNumbers.length])

  // Auto-start game
  useEffect(() => {
    if (currentTargetNumber && !isGameActive && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        startNewNumber()
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentTargetNumber, isGameActive, isLevelComplete, isGameComplete, startNewNumber])

  // Update when number index changes
  useEffect(() => {
    if (currentTargetNumber && isGameActive) {
      startNewNumber()
    }
  }, [currentNumberIndex, currentTargetNumber, isGameActive, startNewNumber])

  return {
    // Core game state
    currentLevel,
    currentNumberIndex,
    digitCards,
    dropSlots,
    currentTargetNumber,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    gameContainerRef,
    tiempoFinal,

    // Game actions
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,

    // Utility
    checkNumber,

    // Compatibility with existing interface
    items: digitCards,
  }
}