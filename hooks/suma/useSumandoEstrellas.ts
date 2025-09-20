"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from "../useEnviarResultados"
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles
const sumandoEstrellasLevels = [
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

interface SumProblem {
  id: string
  num1: number
  num2: number
  correctAnswer: number
  options: number[]
}

interface Star {
  id: string
  value: number
  isCorrect: boolean
  isSelected: boolean
  position: { x: number; y: number }
  color: string
}

const generateSumProblem = (maxNumber: number, minNumber: number): SumProblem => {
  const num1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
  const num2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
  const correctAnswer = num1 + num2

  // Generar opciones incorrectas
  const wrongOptions = new Set<number>()
  while (wrongOptions.size < 3) {
    const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5)
    if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
      wrongOptions.add(wrongAnswer)
    }
  }

  const options = [correctAnswer, ...Array.from(wrongOptions)].sort(() => Math.random() - 0.5)

  return {
    id: `sum-${Date.now()}-${Math.random()}`,
    num1,
    num2,
    correctAnswer,
    options,
  }
}

// En la función generateStars, cambiar el z-index y mejorar la visibilidad del texto
const generateStars = (options: number[], correctAnswer: number): Star[] => {
  const colors = ["bg-yellow-400", "bg-blue-400", "bg-pink-400", "bg-green-400"]

  return options.map((value, index) => ({
    id: `star-${index}-${Date.now()}`,
    value,
    isCorrect: value === correctAnswer,
    isSelected: false,
    position: {
      x: 20 + (index % 2) * 60 + Math.random() * 10,
      y: 20 + Math.floor(index / 2) * 40 + Math.random() * 10,
    },
    color: colors[index % colors.length],
  }))
}

export const useSumandoEstrellas = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Estados del juego
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<SumProblem | null>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [selectedStar, setSelectedStar] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)

  // Valores calculados
  const currentGameLevel = sumandoEstrellasLevels[currentLevel]
  const isLastLevel = currentLevel === sumandoEstrellasLevels.length - 1
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

    const problem = generateSumProblem(currentGameLevel.maxNumber, currentGameLevel.minNumber)
    const newStars = generateStars(problem.options, problem.correctAnswer)

    setCurrentProblem(problem)
    setStars(newStars)
    setSelectedStar(null)
    setShowResult(false)
    setIsGameActive(true)
  }, [currentGameLevel])

  // Manejar selección de estrella
  const handleStarSelect = useCallback(
    (starId: string) => {
      if (!isGameActive || showResult) return

      const star = stars.find((s) => s.id === starId)
      if (!star) return

      setSelectedStar(starId)
      setStars((prev) => prev.map((s) => ({ ...s, isSelected: s.id === starId })))

      // Verificar respuesta después de un breve delay
      setTimeout(() => {
        if (star.isCorrect) {
          setAciertos((prev) => prev + 1)
          toast({
            title: "¡Excelente!",
            description: `¡${currentProblem?.num1} + ${currentProblem?.num2} = ${star.value}!`,
            duration: 3000,
          })

          // Avanzar al siguiente problema
          if (currentProblemIndex < currentGameLevel.numbersPerLevel - 1) {
            setTimeout(() => {
              setCurrentProblemIndex((prev) => prev + 1)
            }, 1500)
          } else {
            // Nivel completado
            setTimeout(() => {
              setCompletedSets((prev) => [...prev, currentLevel.toString()])
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
            description: "Esa no es la respuesta correcta",
            duration: 3000,
            variant: "destructive",
          })

          // Reset después de error
          setTimeout(() => {
            setStars((prev) => prev.map((s) => ({ ...s, isSelected: false })))
            setSelectedStar(null)
            setShowResult(false)
            setIsGameActive(true) // Reactivar el juego para permitir otro intento
          }, 1500)
        }

        setShowResult(true)
        // Solo desactivar el juego temporalmente si es correcto
        if (star.isCorrect) {
          setIsGameActive(false)
        }
      }, 500)
    },
    [isGameActive, showResult, stars, currentProblem, currentProblemIndex, currentGameLevel, toast, currentLevel],
  )

  // Siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel((prev) => prev + 1)
      setCurrentProblemIndex(0)
      toast({
        title: "¡Nuevo nivel desbloqueado! 🚀",
        description: `${sumandoEstrellasLevels[currentLevel + 1].name}`,
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
    setStars([])
    setSelectedStar(null)
    setShowResult(false)

    reiniciar()
    toast({
      title: "¡Juego reiniciado! 🔄",
      description: "Comenzando desde el nivel 1",
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

  // Agregar un efecto para inicializar el juego correctamente
  useEffect(() => {
    // Forzar inicialización cuando se monta el componente
    if (currentGameLevel && !currentProblem && !isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(() => {
        const problem = generateSumProblem(currentGameLevel.maxNumber, currentGameLevel.minNumber)
        const newStars = generateStars(problem.options, problem.correctAnswer)

        setCurrentProblem(problem)
        setStars(newStars)
        setSelectedStar(null)
        setShowResult(false)
        setIsGameActive(true)
      }, 500) // Delay para asegurar que todo esté listo

      return () => clearTimeout(timeout)
    }
  }, [currentGameLevel, currentProblem, isLevelComplete, isGameComplete])

  // Efecto para manejar la finalización del juego
  useEffect(() => {
    if (isGameComplete) {
      setTotalAciertos((prev) => prev + aciertos)
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
    stars,
    selectedStar,
    showResult,
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
    handleStarSelect,
    handleNextLevel,
    handleRestart,
  }
}