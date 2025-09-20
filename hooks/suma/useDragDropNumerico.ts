"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from "../useEnviarResultados"
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles
const dragDropNumericoLevels = [
  {
    name: "Nivel 1",
    title: "Sumas básicas",
    description: "Sumas del 1 al 10",
    numbersPerLevel: 5,
    maxNumber: 10,
    minNumber: 1,
  },
  {
    name: "Nivel 2",
    title: "Sumas intermedias",
    description: "Sumas del 1 al 20",
    numbersPerLevel: 5,
    maxNumber: 20,
    minNumber: 10,
  },
  {
    name: "Nivel 3",
    title: "Sumas avanzadas",
    description: "Sumas del 1 al 50",
    numbersPerLevel: 5,
    maxNumber: 50,
    minNumber: 20,
  },
]

interface DragDropProblem {
  id: string
  num1: number
  num2: number
  correctAnswer: number
  missingPosition: number // 0 = num1, 1 = num2, 2 = result
}

interface NumberCard {
  id: string
  value: number
  isUsed: boolean
}

interface DropZone {
  id: string
  value: number | null
  isCorrect: boolean
  expectedValue: number
  position: number // 0 = num1, 1 = num2, 2 = result
}

const generateDragDropProblem = (maxNumber: number, minNumber: number): DragDropProblem => {
  const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
  const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
  const correctAnswer = num1 + num2
  const missingPosition = Math.floor(Math.random() * 3) // 0, 1, or 2

  return {
    id: `dragdrop-${Date.now()}-${Math.random()}`,
    num1,
    num2,
    correctAnswer,
    missingPosition,
  }
}

const generateNumberCards = (problem: DragDropProblem): NumberCard[] => {
  const correctValue = problem.missingPosition === 0 ? problem.num1 :
    problem.missingPosition === 1 ? problem.num2 :
      problem.correctAnswer

  // Generar números incorrectos
  const wrongNumbers = new Set<number>()
  while (wrongNumbers.size < 3) {
    const wrongNumber = correctValue + (Math.floor(Math.random() * 10) - 5)
    if (wrongNumber !== correctValue && wrongNumber > 0 && wrongNumber <= 100) {
      wrongNumbers.add(wrongNumber)
    }
  }

  const allNumbers = [correctValue, ...Array.from(wrongNumbers)]

  return allNumbers.map((value, index) => ({
    id: `card-${index}-${Date.now()}`,
    value,
    isUsed: false,
  })).sort(() => Math.random() - 0.5)
}

const generateDropZones = (problem: DragDropProblem): DropZone[] => {
  return [
    {
      id: "zone-0",
      value: problem.missingPosition === 0 ? null : problem.num1,
      isCorrect: problem.missingPosition !== 0,
      expectedValue: problem.num1,
      position: 0,
    },
    {
      id: "zone-1",
      value: problem.missingPosition === 1 ? null : problem.num2,
      isCorrect: problem.missingPosition !== 1,
      expectedValue: problem.num2,
      position: 1,
    },
    {
      id: "zone-2",
      value: problem.missingPosition === 2 ? null : problem.correctAnswer,
      isCorrect: problem.missingPosition !== 2,
      expectedValue: problem.correctAnswer,
      position: 2,
    },
  ]
}

export const useDragDropNumerico = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Estados del juego
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<DragDropProblem | null>(null)
  const [numberCards, setNumberCards] = useState<NumberCard[]>([])
  const [dropZones, setDropZones] = useState<DropZone[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)

  // Valores calculados
  const currentGameLevel = dragDropNumericoLevels[currentLevel]
  const isLastLevel = currentLevel === dragDropNumericoLevels.length - 1
  const isLevelComplete = completedSets.includes(currentLevel.toString())
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)

  // Inicializar temporizador
  useEffect(() => {
    iniciar()
    return () => detener()
  }, [iniciar, detener])

  // Generar nuevo problema
  const generateNewProblem = useCallback(() => {
    if (!currentGameLevel) return

    const problem = generateDragDropProblem(currentGameLevel.maxNumber, currentGameLevel.minNumber)
    const cards = generateNumberCards(problem)
    const zones = generateDropZones(problem)

    setCurrentProblem(problem)
    setNumberCards(cards)
    setDropZones(zones)
    setSelectedCard(null)
    setIsGameActive(true)
  }, [currentGameLevel])

  // Verificar si el problema está completo y correcto
  const checkProblemCompletion = useCallback((zones: DropZone[]) => {
    const allFilled = zones.every(zone => zone.value !== null)
    if (!allFilled) return

    const allCorrect = zones.every(zone => zone.value === zone.expectedValue)

    if (allCorrect) {
      setAciertos(prev => prev + 1)
      toast({
        title: "¡Excelente!",
        description: "¡Respuesta correcta!",
        duration: 3000,
      })

      // Avanzar al siguiente problema
      setTimeout(() => {
        if (currentProblemIndex < currentGameLevel.numbersPerLevel - 1) {
          setCurrentProblemIndex(prev => prev + 1)
        } else {
          // Nivel completado
          setCompletedSets(prev => [...prev, currentLevel.toString()])
          toast({
            title: "¡Nivel completado!",
            description: `Has completado el ${currentGameLevel.name}`,
            duration: 3000,
          })
        }
      }, 1500)
    } else {
      // Hay errores, marcar las zonas incorrectas
      setDropZones(prev => prev.map(zone => ({
        ...zone,
        isCorrect: zone.value === zone.expectedValue
      })))
    }
  }, [currentProblemIndex, currentGameLevel, toast, currentLevel])

  // Manejar inicio de arrastre
  const handleDragStart = useCallback((card: NumberCard) => {
    if (card.isUsed) return
    setSelectedCard(card.id)
    setIsDragging(true)
  }, [])

  // Manejar drop
  const handleDrop = useCallback((zoneId: string) => {
    if (!selectedCard) return

    const card = numberCards.find(c => c.id === selectedCard)
    const zone = dropZones.find(z => z.id === zoneId)

    if (!card || !zone || card.isUsed) return

    // Si la zona ya tiene un valor, liberar la carta anterior
    if (zone.value !== null) {
      setNumberCards(prev => prev.map(c =>
        c.value === zone.value ? { ...c, isUsed: false } : c
      ))
    }

    // Actualizar la zona con el nuevo valor
    const newZones = dropZones.map(z =>
      z.id === zoneId
        ? { ...z, value: card.value, isCorrect: card.value === z.expectedValue }
        : z
    )

    // Marcar la carta como usada
    setNumberCards(prev => prev.map(c =>
      c.id === selectedCard ? { ...c, isUsed: true } : c
    ))

    setDropZones(newZones)
    setSelectedCard(null)
    setIsDragging(false)

    // Verificar si el problema está completo
    checkProblemCompletion(newZones)
  }, [selectedCard, numberCards, dropZones, checkProblemCompletion])

  // Manejar touch start
  const handleTouchStart = useCallback((e: React.TouchEvent, card: NumberCard) => {
    if (card.isUsed) return

    e.preventDefault()
    const touch = e.touches[0]
    setSelectedCard(card.id)
    setIsDragging(true)
    setDragPosition({ x: touch.clientX, y: touch.clientY })
  }, [])

  // Manejar touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return

    e.preventDefault()
    const touch = e.touches[0]
    setDragPosition({ x: touch.clientX, y: touch.clientY })
  }, [isDragging])

  // Manejar touch end
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !selectedCard) return

    e.preventDefault()
    const touch = e.changedTouches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    const zoneElement = element?.closest('[data-zone-id]')

    if (zoneElement) {
      const zoneId = zoneElement.getAttribute('data-zone-id')
      if (zoneId) {
        handleDrop(zoneId)
      }
    }

    setIsDragging(false)
    setSelectedCard(null)
  }, [isDragging, selectedCard, handleDrop])

  // Manejar click en carta (para dispositivos táctiles)
  const handleCardClick = useCallback((card: NumberCard) => {
    if (card.isUsed) return

    if (selectedCard === card.id) {
      setSelectedCard(null)
    } else {
      setSelectedCard(card.id)
    }
  }, [selectedCard])

  // Manejar click en zona
  const handleZoneClick = useCallback((zoneId: string) => {
    if (!selectedCard) return

    handleDrop(zoneId)
  }, [selectedCard, handleDrop])

  // Limpiar problema
  const clearProblem = useCallback(() => {
    if (!currentProblem) return

    // Restaurar todas las cartas
    setNumberCards(prev => prev.map(card => ({ ...card, isUsed: false })))

    // Limpiar todas las zonas que deberían estar vacías
    setDropZones(prev => prev.map(zone => ({
      ...zone,
      value: zone.position === currentProblem.missingPosition ? null : zone.expectedValue,
      isCorrect: zone.position !== currentProblem.missingPosition
    })))

    setSelectedCard(null)
    toast({
      title: "Problema limpiado",
      description: "Puedes intentar de nuevo",
    })    
  }, [currentProblem, toast])

  // Siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCurrentProblemIndex(0)
      toast({
        title: "¡Nuevo nivel desbloqueado! 🚀",
        description: `${dragDropNumericoLevels[currentLevel + 1].name}`,
        duration: 3000,
      })      
    }
  }, [isLastLevel, aciertos, toast, currentLevel])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentProblemIndex(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setCurrentProblem(null)
    setNumberCards([])
    setDropZones([])
    setSelectedCard(null)
    setIsDragging(false)

    reiniciar()
    toast({
      title: "¡Juego reiniciado! 🔄",
      description: "Comenzando desde el nivel 1",
      duration: 3000,
    })
  }, [reiniciar, toast])

  // Efecto para generar nuevo problema cuando cambia el índice
  useEffect(() => {
    if (currentGameLevel && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        generateNewProblem()
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [currentProblemIndex, currentGameLevel, isLevelComplete, isGameComplete, generateNewProblem])

  // Efecto para inicializar el juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        generateNewProblem()
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [currentGameLevel, currentProblem, isLevelComplete, isGameComplete, generateNewProblem])

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
    setTiempoFinal,
  })

  return {
    // Estados del juego
    currentLevel,
    currentProblemIndex,
    currentProblem,
    numberCards,
    dropZones,
    selectedCard,
    isDragging,
    dragPosition,
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
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleCardClick,
    handleZoneClick,
    clearProblem,
    handleNextLevel,
    handleRestart,
  }
}