"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración ultra-simple para niños pequeños (3-6 años)
const contadorEspacialLevels = [
  {
    name: "Nivel 1",
    title: "Primeros Números",
    description: "Aprende a subir y bajar",
    difficulty: "Súper Fácil",
    missions: [
      { start: 3, target: 5 }, // Solo subir 2 pasos
      { start: 7, target: 4 }, // Solo bajar 3 pasos
      { start: 2, target: 6 }, // Subir 4 pasos
      { start: 8, target: 5 }, // Bajar 3 pasos
      { start: 1, target: 4 }, // Subir 3 pasos
    ],
  },
  {
    name: "Nivel 2",
    title: "Más Aventuras",
    description: "Números un poco más lejos",
    difficulty: "Fácil",
    missions: [
      { start: 2, target: 8 }, // Subir 6 pasos
      { start: 9, target: 3 }, // Bajar 6 pasos
      { start: 1, target: 7 }, // Subir 6 pasos
      { start: 10, target: 4 }, // Bajar 6 pasos
      { start: 3, target: 9 }, // Subir 6 pasos
    ],
  },
  {
    name: "Nivel 3",
    title: "Experto en Números",
    description: "¡Eres un campeón!",
    difficulty: "Medio",
    missions: [
      { start: 1, target: 10 }, // Subir todo el camino
      { start: 10, target: 1 }, // Bajar todo el camino
      { start: 5, target: 2 }, // Bajar 3 pasos
      { start: 4, target: 9 }, // Subir 5 pasos
      { start: 8, target: 2 }, // Bajar 6 pasos
    ],
  },
]

export const useContadorEspacial = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0)
  const [currentValue, setCurrentValue] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [isMoving, setIsMoving] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  
  // Computed values - Similar a useGameLogic
  const currentGameLevel = contadorEspacialLevels[currentLevel]
  const currentMission = currentGameLevel?.missions[currentMissionIndex]
  const isLastLevel = currentLevel === contadorEspacialLevels.length - 1
  const isLevelComplete = completedSets.length === 1 && completedSets.includes(`level-${currentLevel}`)
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)

  // Initialize timer
  useEffect(() => {
    iniciar()
  }, [iniciar])

  // Initialize mission
  const initializeMission = useCallback(() => {
    if (!currentMission) return

    setCurrentValue(currentMission.start)
    setIsGameActive(true)
    setIsMoving(false)
  }, [currentMission])

  // Handle mission completion
  const handleMissionComplete = useCallback((newValue: number) => {
    setAciertos((prev) => prev + 1)
    toast({
      title: "¡Excelente! 🎉",
      description: `¡Llegaste al número ${newValue}!`,
      duration: 3000,
    })

    // Check if this was the last mission of the level
    if (currentMissionIndex >= currentGameLevel.missions.length - 1) {
      // Level completed
      setTimeout(() => {
        setCompletedSets([`level-${currentLevel}`])
        setIsGameActive(false)
        toast({
          title: "¡Nivel Completado! 🌟",
          description: `¡Terminaste ${currentGameLevel.name}!`,
        })
      }, 1500)
    } else {
      // Move to next mission
      setTimeout(() => {
        setCurrentMissionIndex((prev) => prev + 1)
      }, 2000)
    }
  }, [currentMissionIndex, currentGameLevel, currentLevel, toast])

  // Move up (increase number by 1)
  const moveUp = useCallback(() => {
    if (isMoving || currentValue >= 10) return

    // Haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(100)
    }

    setIsMoving(true)

    const timeout = setTimeout(() => {
      const newValue = currentValue + 1
      setCurrentValue(newValue)
      setIsMoving(false)

      // Check if mission is complete
      if (newValue === currentMission?.target) {
        setTimeout(() => {
          handleMissionComplete(newValue)
        }, 500)
      } else {
        // Give encouraging feedback
        if (newValue < currentMission?.target) {
          toast({
            title: "¡Muy bien! 👍",
            description: "¡Sigue subiendo!",
          })
        } else {
          toast({
            title: "¡Ups! 😅",
            description: "Te pasaste un poquito",
            variant: "destructive",
          })
          setErrores(prev => prev + 1)
        }
      }
    }, 800)

    animationTimeouts.current.push(timeout)
  }, [currentValue, currentMission, isMoving, toast, handleMissionComplete])

  // Move down (decrease number by 1)
  const moveDown = useCallback(() => {
    if (isMoving || currentValue <= 1) return

    // Haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(100)
    }

    setIsMoving(true)

    const timeout = setTimeout(() => {
      const newValue = currentValue - 1
      setCurrentValue(newValue)
      setIsMoving(false)

      // Check if mission is complete
      if (newValue === currentMission?.target) {
        setTimeout(() => {
          handleMissionComplete(newValue)
        }, 500)
      } else {
        // Give encouraging feedback
        if (newValue > currentMission?.target) {
          toast({
            title: "¡Muy bien! 👍",
            description: "¡Sigue bajando!",
          })
        } else {
          toast({
            title: "¡Ups! 😅",
            description: "Te pasaste un poquito",
            variant: "destructive",
          })
          setErrores(prev => prev + 1)
        }
      }
    }, 800)

    animationTimeouts.current.push(timeout)
  }, [currentValue, currentMission, isMoving, toast, handleMissionComplete])

  // Handle next level - Similar a useGameLogic
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCurrentMissionIndex(0)      
      setCompletedSets([])
      toast({
        title: "¡Nuevo Nivel! 🚀",
        description: `${contadorEspacialLevels[currentLevel + 1].name}`,
      })

      setTimeout(() => {
        initializeMission()
      }, 1000)
    }
  }, [currentLevel, aciertos, isLastLevel, toast, initializeMission])

  // Handle restart - Similar a useGameLogic
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentMissionIndex(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)

    reiniciar()
    toast({
      title: "¡Empezamos de nuevo! 🔄",
      description: "¡Nueva aventura!",
    })

    setTimeout(() => {
      initializeMission()
    }, 1000)
  }, [reiniciar, toast, initializeMission])

  // Handle final time - Similar a useGameLogic
  const handleTiempoFinalizado = (tiempo: number) => {
    setTiempoFinal(tiempo);
  };

  // useEnviarResultados - Igual que useGameLogic
  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal
  })

  // Auto-start game
  useEffect(() => {
    if (currentMission && !isGameActive && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        initializeMission()
      }, 1000)

      animationTimeouts.current.push(timeout)
      return () => clearTimeout(timeout)
    }
  }, [currentMission, isGameActive, isLevelComplete, isGameComplete, initializeMission])

  // Update when mission index changes
  useEffect(() => {
    if (currentMission && isGameActive && !isLevelComplete) {
      initializeMission()
    }
  }, [currentMissionIndex, currentMission, isGameActive, isLevelComplete, initializeMission])

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return {
    currentLevel,
    currentMissionIndex,
    currentValue,
    currentMission,
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
    isMoving,
    gameContainerRef,
    tiempoFinal,

    moveUp,
    moveDown,
    handleNextLevel,
    handleRestart,
    handleTiempoFinalizado,

    spaceshipPosition: { x: 10, y: 50 },
    targetPosition: { x: 90, y: 50 },
    availableOperations: [],
    usedOperations: [],
    spaceObjects: [],
    applyOperation: () => {},
    items: [],
    handleDragStart: () => {},
    handleDrop: () => {},
    score: aciertos * 10,
  }
}