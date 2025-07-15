import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles basada en desarrollo cognitivo
const desafioTablasLevels = [
  {
    name: "Nivel 1 - Tablas Básicas",
    description: "Tablas del 2 y 3",
    difficulty: "Fácil",
    tables: [2, 3],
    maxMultiplier: 5,
    problemsPerLevel: 8,
    timeLimit: 90,
  },
  {
    name: "Nivel 2 - Tablas Intermedias",
    description: "Tablas del 2, 3 y 4",
    difficulty: "Medio",
    tables: [2, 3, 4],
    maxMultiplier: 7,
    problemsPerLevel: 10,
    timeLimit: 120,
  },
  {
    name: "Nivel 3 - Desafío Completo",
    description: "Tablas del 2 al 5",
    difficulty: "Difícil",
    tables: [2, 3, 4, 5],
    maxMultiplier: 10,
    problemsPerLevel: 12,
    timeLimit: 150,
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

interface Problem {
  multiplicand: number
  multiplier: number
  result: number
  expression: string
}

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

// Función para generar problemas únicos
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
  
  // Activar primera celda
  if (problems.length > 0) {
    problems[0].isActive = true
  }
  
  return problems
}

export const useDesafioTablas = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [tableCells, setTableCells] = useState<TableCell[]>([])
  const [currentCellIndex, setCurrentCellIndex] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [completedCells, setCompletedCells] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [inputValue, setInputValue] = useState("")

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = desafioTablasLevels[currentLevel]
  const isLastLevel = currentLevel >= desafioTablasLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (completedCells / currentGameLevel.problemsPerLevel) * 100
  const currentCell = tableCells[currentCellIndex]

  // Initialize timer
  useEffect(() => {
    iniciar()
  }, [iniciar])

  // Toast function
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

  // Generar celdas de tabla únicas
  const generateTableCells = useCallback((): TableCell[] => {
    return generateUniqueProblems(currentGameLevel, currentGameLevel.problemsPerLevel)
  }, [currentGameLevel])

  // Inicializar timer del nivel
  const initializeLevelTimer = useCallback(() => {
    setTimeRemaining(currentGameLevel.timeLimit)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Tiempo agotado
          setIsGameActive(false)
          showToast("⏰ Tiempo Agotado", "¡Inténtalo de nuevo!", "destructive")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [currentGameLevel, showToast])

  // Manejar respuesta
  const handleAnswer = useCallback((answer: string) => {
    if (!currentCell || !isGameActive) return

    const numericAnswer = parseInt(answer)
    const isCorrect = numericAnswer === currentCell.result

    // Actualizar celda actual
    setTableCells(prev => prev.map((cell, index) => 
      index === currentCellIndex 
        ? { ...cell, userAnswer: answer, isCorrect, isCompleted: true, isActive: false }
        : cell
    ))

    if (isCorrect) {
      setAciertos(prev => prev + 1)
      setCompletedCells(prev => prev + 1)
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

    // Verificar si el nivel está completo
    if (completedCells + 1 >= currentGameLevel.problemsPerLevel) {
      setTimeout(() => {
        setIsLevelComplete(true)
        setIsGameActive(false)
        setCompletedSets([{ id: currentLevel }])
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
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
        
        // Focus en input
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 1500)
    }
  }, [currentCell, isGameActive, currentCellIndex, completedCells, currentGameLevel, currentLevel, streak, showToast])

  // Manejar input
  const handleInputChange = useCallback((value: string) => {
    // Solo permitir números
    const numericValue = value.replace(/[^0-9]/g, '')
    setInputValue(numericValue)
  }, [])

  // Manejar envío de respuesta
  const handleSubmit = useCallback(() => {
    if (inputValue.trim() !== "") {
      handleAnswer(inputValue)
    }
  }, [inputValue, handleAnswer])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < desafioTablasLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setCompletedCells(0)
      setCurrentCellIndex(0)
      setAciertos(0)
      setErrores(0)
      setStreak(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setInputValue("")
      
      const newCells = generateUniqueProblems(desafioTablasLevels[newLevel], desafioTablasLevels[newLevel].problemsPerLevel)
      setTableCells(newCells)
      setIsGameActive(true)
      initializeLevelTimer()

      showToast("¡Nuevo Desafío! ⚡", `${desafioTablasLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, initializeLevelTimer, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setCurrentLevel(0)
    setCompletedCells(0)
    setCurrentCellIndex(0)
    setAciertos(0)
    setErrores(0)
    setStreak(0)
    setMaxStreak(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setInputValue("")
    
    const newCells = generateUniqueProblems(desafioTablasLevels[0], desafioTablasLevels[0].problemsPerLevel)
    setTableCells(newCells)
    setIsGameActive(true)
    initializeLevelTimer()

    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A por las tablas!")
  }, [initializeLevelTimer, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && tableCells.length === 0) {
      const newCells = generateTableCells()
      setTableCells(newCells)
      setIsGameActive(true)
      initializeLevelTimer()
    }
  }, [currentGameLevel, tableCells.length, generateTableCells, initializeLevelTimer])

  // Focus en input cuando se activa
  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isGameActive, currentCellIndex])

  // Enviar resultados
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const urlParts = window.location.pathname.split("/")
      const actividad = urlParts[urlParts.length - 1]

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
            intentos: aciertos + errores,
            errores,
            tiempo,
          }),
        })

        if (!res.ok) {
          throw new Error("Error al guardar resultados")
        }

        setTiempoFinal(tiempo)
      } catch (error) {
        console.error("Error al guardar resultados:", error)
      }
    }

    if (isGameComplete && tiempoFinal === null) {
      detener()
      enviarResultados()
    }
  }, [isGameComplete, tiempoFinal, user?.id, estrellas, aciertos, errores, tiempo, detener])

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    tableCells,
    currentCell,
    currentCellIndex,
    aciertos,
    errores,
    completedCells,
    streak,
    maxStreak,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    timeRemaining,
    inputValue,
    gameContainerRef,
    inputRef,
    tiempoFinal,

    // Game actions
    handleInputChange,
    handleSubmit,
    handleNextLevel,
    handleRestart,
  }
}