"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles
const formaNumeroLevels = [
  {
    name: "Nivel 1",
    title: "Números de 4 cifras",
    digits: 4,
    description: "Número formado por 4 digitos",
    numbersPerLevel: 6,
  },
  {
    name: "Nivel 2",
    title: "Números de 5 cifras",
    digits: 5,
    description: "Número formado por 5 digitos",
    numbersPerLevel: 8,
  },
  {
    name: "Nivel 3",
    title: "Números de 5 cifras",
    digits: 5,
    description: "Número formado por 5 digitos",
    numbersPerLevel: 10,
  },
]

// Generar números aleatorios
const generateRandomNumber = (digits: number): number => {
  const min = Math.pow(10, digits - 1)
  const max = Math.pow(10, digits) - 1
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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

const generateDigitCards = (targetNumber: number): DigitCard[] => {
  const targetDigits = targetNumber.toString().split("").map(Number)
  const extraDigits = []

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

  // Estados del juego
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0)
  const [digitCards, setDigitCards] = useState<DigitCard[]>([])
  const [dropSlots, setDropSlots] = useState<DropSlot[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  // NUEVO: Estado para controlar cuando necesitamos preparar el siguiente número
  const [needsNewNumber, setNeedsNewNumber] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const draggedItem = useRef<DigitCard | null>(null)
  
  // Valores calculados
  const currentGameLevel = formaNumeroLevels[currentLevel]
  const currentTargetNumber = randomNumbers[currentNumberIndex]
  const isLastLevel = currentLevel === formaNumeroLevels.length - 1
  const isLevelComplete = completedSets.includes(currentLevel.toString())
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)

  // Inicializar temporizador
  useEffect(() => {
    iniciar()
    return () => detener()
  }, [iniciar, detener])

  // Inicializar slots
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

    return slots.reverse()
  }, [])

  // Comenzar nuevo número
  const startNewNumber = useCallback(() => {
    if (!currentTargetNumber) return

    const newDigitCards = generateDigitCards(currentTargetNumber)
    const newDropSlots = initializeDropSlots(currentTargetNumber)

    setDigitCards(newDigitCards)
    setDropSlots(newDropSlots)
    setIsGameActive(true)
    setNeedsNewNumber(false) // IMPORTANTE: Marcamos que ya no necesitamos nuevo número
  }, [currentTargetNumber, initializeDropSlots])

  // Manejar inicio de arrastre
  const handleDragStart = useCallback((digitCard: DigitCard) => {
    if (digitCard.isUsed) return
    draggedItem.current = digitCard
  }, [])

  // Manejar soltar
  const handleDrop = useCallback((slotPosition: number) => {
    if (!draggedItem.current) return

    const draggedDigit = draggedItem.current

    setDropSlots((prev) => {
      const newSlots = [...prev]
      const targetSlot = newSlots.find((slot) => slot.position === slotPosition)

      if (!targetSlot) return prev

      if (targetSlot.digit !== null) {
        setDigitCards((prevCards) =>
          prevCards.map((card) =>
            card.position === slotPosition ? { ...card, isUsed: false, position: undefined } : card,
          ),
        )
      }

      targetSlot.digit = draggedDigit.digit
      return newSlots
    })

    setDigitCards((prev) =>
      prev.map((card) => (card.id === draggedDigit.id ? { ...card, isUsed: true, position: slotPosition } : card)),
    )

    draggedItem.current = null
  }, [])

  // Verificar número
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

  // Enviar número - CORREGIDO
  const submitNumber = useCallback(() => {
    const isCorrect = checkNumber()

    if (isCorrect) {
      setAciertos((prev) => prev + 1)
      toast({
        title: "¡Excelente!",
        description: `¡Formaste correctamente ${currentTargetNumber?.toLocaleString()}!`,
      })

      // Limpiar inmediatamente las tarjetas y slots
      setDigitCards([])
      setDropSlots([])
      setIsGameActive(false)

      // Verificar si hay más números en este nivel
      if (currentNumberIndex < currentGameLevel.numbersPerLevel - 1) {
        // Hay más números, preparar el siguiente
        setTimeout(() => {
          setCurrentNumberIndex((prev) => prev + 1)
          setNeedsNewNumber(true) // Marcar que necesitamos nuevo número
        }, 1500)
      } else {
        // Nivel completado
        setTimeout(() => {
          setCompletedSets(prev => [...prev, currentLevel.toString()])
          toast({
            title: "¡Nivel completado! 🎉",
            description: `Has completado el ${currentGameLevel.name}`,
          })
        }, 1500)
      }
    } else {
      setErrores((prev) => prev + 1)
      toast({
        title: "¡Inténtalo de nuevo!",
        description: `El número no es correcto`,
        variant: "destructive",
      })
      clearNumber();
    }
  }, [checkNumber, currentTargetNumber, currentNumberIndex, currentGameLevel, toast, currentLevel])

  // Limpiar número
  const clearNumber = useCallback(() => {
    setDropSlots((prev) => prev.map((slot) => ({ ...slot, digit: null })))
    setDigitCards((prev) =>
      prev.map((card) => ({
        ...card,
        isUsed: false,
        position: undefined
      }))
    )
  }, [])

  // Siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCurrentNumberIndex(0)
      setRandomNumbers([])
      setDigitCards([])
      setDropSlots([])
      setNeedsNewNumber(false) // Reset del flag
      toast({
        title: "¡Nuevo nivel desbloqueado! 🚀",
        description: `${formaNumeroLevels[currentLevel + 1].name}`,
      })
    }
  }, [isLastLevel, aciertos, toast, currentLevel])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentNumberIndex(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setRandomNumbers([])
    setNeedsNewNumber(false) // Reset del flag

    reiniciar()
    toast({
      title: "¡Juego reiniciado! 🔄",
      description: "Comenzando desde el nivel 1",
    })
  }, [reiniciar, toast])

  // Efecto para generar números aleatorios cuando cambia el nivel
  useEffect(() => {
    if (currentGameLevel && randomNumbers.length === 0) {
      const newRandomNumbers = generateRandomNumbers(currentGameLevel.digits, currentGameLevel.numbersPerLevel)
      setRandomNumbers(newRandomNumbers)
      setNeedsNewNumber(true) // Necesitamos preparar el primer número
    }
  }, [currentGameLevel, randomNumbers.length])

  // EFECTO CORREGIDO: Para iniciar nuevo número
  useEffect(() => {
    // Condiciones para iniciar un nuevo número:
    // 1. Tenemos un número objetivo
    // 2. El juego no está activo actualmente
    // 3. Necesitamos un nuevo número (después de completar uno o al inicio)
    // 4. El nivel no está completo
    // 5. El juego no está completo
    if (currentTargetNumber && !isGameActive && needsNewNumber && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        startNewNumber()
      }, 100) // Reducido el timeout para que sea más responsivo

      return () => clearTimeout(timeout)
    }
  }, [currentTargetNumber, isGameActive, needsNewNumber, isLevelComplete, isGameComplete, startNewNumber])

  // Efecto para manejar la finalización del juego
  useEffect(() => {
    if (isGameComplete) {
      setTotalAciertos(prev => prev + aciertos)
      setTiempoFinal(tiempo)
      detener()
    }
  }, [isGameComplete, aciertos, tiempo, detener])

  // Enviar resultados
  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal
  })

  return {
    // Estados del juego
    currentLevel,
    currentNumberIndex,
    digitCards,
    dropSlots,
    currentTargetNumber,
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos: totalAciertos + aciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    gameContainerRef,
    tiempoFinal,

    // Acciones del juego
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,

    // Utilidades
    checkNumber,

    // Compatibilidad
    items: digitCards,
  }
}