"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas"

const desafioTablasLevels = [
  {
    name: "Nivel 1 - Tablas Básicas",
    description: "Tablas del 2 y 3",
    difficulty: "Fácil",
    tables: [2, 3],
    maxMultiplier: 5,
    problemsPerLevel: 8,
  },
  {
    name: "Nivel 2 - Tablas Intermedias",
    description: "Tablas del 2, 3 y 4",
    difficulty: "Medio",
    tables: [2, 3, 4],
    maxMultiplier: 7,
    problemsPerLevel: 10,
  },
  {
    name: "Nivel 3 - Desafío Completo",
    description: "Tablas del 2 al 5",
    difficulty: "Difícil",
    tables: [2, 3, 4, 5],
    maxMultiplier: 10,
    problemsPerLevel: 12,
  },
]

interface TableCell {
  id: string
  multiplicand: number
  multiplier: number
  result: number
  userAnswer: string
  isCorrect: boolean | null
  isCompleted: boolean
  isActive: boolean
}

const generateUniqueProblems = (level: any, count: number): TableCell[] => {
  const problems: TableCell[] = []
  const usedProblems = new Set<string>()
  
  while (problems.length < count) {
    const table = level.tables[Math.floor(Math.random() * level.tables.length)]
    const multiplier = Math.floor(Math.random() * level.maxMultiplier) + 1
    const problemKey = `${table}x${multiplier}`
    
    if (!usedProblems.has(problemKey)) {
      usedProblems.add(problemKey)
      problems.push({
        id: problemKey,
        multiplicand: table,
        multiplier,
        result: table * multiplier,
        userAnswer: "",
        isCorrect: null,
        isCompleted: false,
        isActive: false,
      })
    }
  }
  
  if (problems.length > 0) {
    problems[0].isActive = true
  }
  
  return problems
}

export const useDesafioTablas = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Estados del juego
  const [currentLevel, setCurrentLevel] = useState(0)
  const [tableCells, setTableCells] = useState<TableCell[]>([])
  const [currentCellIndex, setCurrentCellIndex] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [completedCells, setCompletedCells] = useState(0)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isGameActive, setIsGameActive] = useState(true)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Valores calculados
  const currentGameLevel = desafioTablasLevels[currentLevel]
  const isLastLevel = currentLevel === desafioTablasLevels.length - 1
  const isLevelComplete = completedSets.includes(currentLevel.toString())
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const progress = (completedCells / currentGameLevel?.problemsPerLevel) * 100 || 0
  const currentCell = tableCells[currentCellIndex]

  // Inicializar temporizador solo una vez al inicio del juego
  useEffect(() => {
    iniciar()
    return () => detener()
  }, [iniciar, detener])

  // Función para mostrar toast
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

      if (now - lastToastTime.current < 800 && lastToastMessage.current === message) {
        return
      }

      lastToastTime.current = now
      lastToastMessage.current = message

      toast({
        title,
        description,
        duration: 1500,
        ...(variant && { variant }),
      })
    },
    [toast],
  )

  // Generar celdas de tabla
  const generateTableCells = useCallback((): TableCell[] => {
    return generateUniqueProblems(currentGameLevel, currentGameLevel.problemsPerLevel)
  }, [currentGameLevel])

  // Manejar respuesta
  const handleAnswer = useCallback((answer: string) => {
    if (!currentCell || !isGameActive) return

    const numericAnswer = parseInt(answer)
    const isCorrect = numericAnswer === currentCell.result

    setTableCells(prev => prev.map((cell, index) => 
      index === currentCellIndex 
        ? { ...cell, userAnswer: answer, isCorrect, isCompleted: true, isActive: false }
        : cell
    ))

    if (isCorrect) {
      setAciertos(prev => prev + 1)
      setStreak(prev => prev + 1)
      setMaxStreak(prev => Math.max(prev, streak + 1))
      
      const successMessages = [
        "¡Perfecto! ⚡",
        "¡Excelente! 🎯",
        "¡Increíble! 🌟",
        "¡Fantástico! 🚀",
        "¡Genial! ✨",
        "¡Súper! 💫"
      ]
      const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)]
      showToast(randomMessage, `${currentCell.multiplicand} × ${currentCell.multiplier} = ${currentCell.result}`)
    } else {
      setErrores(prev => prev + 1)
      setStreak(0)
      const errorMessages = [
        "¡Ups! 😅",
        "¡Inténtalo de nuevo! 🤔",
        "¡Casi! 😊",
        "¡Sigue intentando! 💪"
      ]
      const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]
      showToast(randomErrorMessage, `${currentCell.multiplicand} × ${currentCell.multiplier} = ${currentCell.result}`, "destructive")
    }

    setInputValue("")
    setCompletedCells(prev => prev + 1)

    // Verificar si el nivel está completo
    if (completedCells + 1 >= currentGameLevel.problemsPerLevel) {
      setTimeout(() => {
        setCompletedSets(prev => [...prev, currentLevel.toString()])
        setIsGameActive(false)
        showToast("¡Nivel Completado! 🏆", "¡Dominaste las tablas!")
      }, 1000)
    } else {
      // Activar siguiente celda
      setTimeout(() => {
        const nextIndex = currentCellIndex + 1
        setCurrentCellIndex(nextIndex)
        setTableCells(prev => prev.map((cell, index) => 
          index === nextIndex ? { ...cell, isActive: true } : cell
        ))
        
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 1500)
    }
  }, [currentCell, currentCellIndex, completedCells, currentGameLevel, currentLevel, streak, showToast, isGameActive])

  // Manejar input
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value.replace(/[^0-9]/g, ''))
  }, [])

  // Manejar envío de respuesta
  const handleSubmit = useCallback(() => {
    if (inputValue.trim() !== "" && isGameActive) {
      handleAnswer(inputValue)
    }
  }, [inputValue, handleAnswer, isGameActive])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCompletedCells(0)
      setCurrentCellIndex(0)
      setAciertos(0)
      setErrores(0)
      setStreak(0)
      setInputValue("")
      
      const newCells = generateUniqueProblems(desafioTablasLevels[currentLevel + 1], 
        desafioTablasLevels[currentLevel + 1].problemsPerLevel)
      setTableCells(newCells)
      setIsGameActive(true)

      showToast("¡Nuevo Desafío! ⚡", `${desafioTablasLevels[currentLevel + 1].name}`)
    }
  }, [isLastLevel, aciertos, currentLevel, showToast])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCompletedCells(0)
    setCurrentCellIndex(0)
    setAciertos(0)
    setErrores(0)
    setStreak(0)
    setMaxStreak(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setInputValue("")
    
    const newCells = generateUniqueProblems(desafioTablasLevels[0], 
      desafioTablasLevels[0].problemsPerLevel)
    setTableCells(newCells)
    setIsGameActive(true)

    reiniciar()
    iniciar()
    showToast("¡Nueva Partida! 🔄", "¡A por las tablas!")
  }, [reiniciar, iniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && tableCells.length === 0) {
      const newCells = generateTableCells()
      setTableCells(newCells)
      setIsGameActive(true)
    }
  }, [currentGameLevel, tableCells.length, generateTableCells])

  // Focus en input cuando cambia la celda activa
  useEffect(() => {
    if (inputRef.current && currentCell?.isActive && isGameActive) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [currentCell, isGameActive])

  // Manejar finalización del juego
  useEffect(() => {
    if (isGameComplete && !tiempoFinal) {
      setTotalAciertos(prev => prev + aciertos)
      setTiempoFinal(tiempo)
      detener()
      showToast("¡Juego Completado! 🎉", "¡Felicidades por completar todos los niveles!")
    }
  }, [isGameComplete, aciertos, tiempo, detener, tiempoFinal, showToast])

  // Limpieza
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  // Enviar resultados usando el hook personalizado
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
    tableCells,
    currentCell,
    currentCellIndex,
    aciertos,
    errores,
    isGameActive,
    completedCells,
    streak,
    maxStreak,
    estrellas,
    progress,
    completedSets,
    totalAciertos: totalAciertos + aciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    timeRemaining: 0, // Ya no se usa
    inputValue,
    gameContainerRef,
    inputRef,
    tiempoFinal,

    // Acciones del juego
    handleInputChange,
    handleSubmit,
    handleNextLevel,
    handleRestart,
  }
}