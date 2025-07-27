import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas";

// Configuración de niveles para Resta en la Cueva con generación aleatoria
const restaEnLaCuevaLevels = [
  {
    name: "Nivel 1 - Entrada de la Cueva",
    description: "Primeros pasos en la oscuridad",
    difficulty: "Fácil",
    minNumber: 3,
    maxNumber: 12,
    targetDepth: 10,
  },
  {
    name: "Nivel 2 - Túneles Profundos",
    description: "Más adentro en la cueva",
    difficulty: "Medio",
    minNumber: 5,
    maxNumber: 18,
    targetDepth: 15,
  },
  {
    name: "Nivel 3 - Corazón de la Cueva",
    description: "El desafío final",
    difficulty: "Difícil",
    minNumber: 8,
    maxNumber: 25,
    targetDepth: 20,
  },
]

interface CaveProblem {
  minuend: number
  subtrahend: number
  result: number
  options: number[]
}

export const useRestaEnLaCueva = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentDepth, setCurrentDepth] = useState(0)
  const [maxDepthReached, setMaxDepthReached] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<CaveProblem | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [vidas, setVidas] = useState(3)
  const [timeLeft, setTimeLeft] = useState(15)
  const [streak, setStreak] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = restaEnLaCuevaLevels[currentLevel]
  const isLastLevel = currentLevel >= restaEnLaCuevaLevels.length - 1
  const isLevelComplete = currentDepth >= currentGameLevel.targetDepth
  const isGameComplete = isLastLevel && isLevelComplete
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
        duration: 3000,
        ...(variant && { variant }),
      })
    },
    [toast],
  )

  // Generate random problem based on depth and level
  const generateRandomProblem = useCallback((depth: number): CaveProblem => {
    const gameLevel = currentGameLevel
    
    // La dificultad aumenta con la profundidad
    const difficultyMultiplier = Math.min(1 + Math.floor(depth / 3) * 0.3, 2)
    const minRange = Math.floor(gameLevel.minNumber * difficultyMultiplier)
    const maxRange = Math.floor(gameLevel.maxNumber * difficultyMultiplier)
    
    // Generar números aleatorios
    const minuend = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange
    const subtrahend = Math.floor(Math.random() * (minuend - 1)) + 1
    const result = minuend - subtrahend
    
    // Generate wrong options with better distribution
    const options = [result]
    const usedNumbers = new Set([result])
    
    while (options.length < 4) {
      let wrong: number
      
      const randomType = Math.random()
      if (randomType < 0.4) {
        // Opciones cercanas al resultado correcto
        wrong = result + (Math.floor(Math.random() * 6) - 3)
      } else if (randomType < 0.7) {
        // Errores comunes: minuend o subtrahend
        wrong = Math.random() < 0.5 ? minuend : subtrahend
      } else {
        // Opciones completamente aleatorias
        wrong = Math.floor(Math.random() * Math.max(30, result * 2))
      }
      
      // Asegurar que sea positivo y no repetido
      if (wrong >= 0 && !usedNumbers.has(wrong)) {
        options.push(wrong)
        usedNumbers.add(wrong)
      }
    }
    
    return {
      minuend,
      subtrahend,
      result,
      options: options.sort(() => Math.random() - 0.5)
    }
  }, [currentGameLevel])

  // Handle time up with better feedback
  const handleTimeUp = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setVidas(prev => {
      const newVidas = prev - 1
      if (newVidas <= 0) {
        setIsGameOver(true)
        showToast("¡Perdido en la Cueva! 💀", `Profundidad máxima: ${maxDepthReached}m`, "destructive")
      } else {
        // Retroceder en la cueva
        setCurrentDepth(prev => Math.max(0, prev - 2))
        setStreak(0)
        setErrores(prev => prev + 1)
        nextProblem()
        
        const timeUpMessages = [
          "¡Tiempo Agotado! ⏰",
          "¡Muy lento! 🐌",
          "¡Apúrate! ⚡",
          "¡El tiempo vuela! 🕐"
        ]
        const randomMessage = timeUpMessages[Math.floor(Math.random() * timeUpMessages.length)]
        showToast(randomMessage, `Retrocedes en la cueva. Vidas: ${newVidas}`, "destructive")
      }
      return newVidas
    })
  }, [maxDepthReached, showToast])

  // Handle answer selection with improved feedback
  const handleAnswerSelect = useCallback((answer: number) => {
    if (showFeedback || !currentProblem || isGameOver) return
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setSelectedAnswer(answer)
    const correct = answer === currentProblem.result
    setIsCorrect(correct)
    setShowFeedback(true)

    setTimeout(() => {
      if (correct) {
        // Correct answer
        const points = Math.max(10, 20 - Math.floor(currentDepth / 2)) + (streak * 2)
        setAciertos(prev => prev + 1)
        setStreak(prev => prev + 1)
        
        // Advance deeper
        const newDepth = currentDepth + 1
        setCurrentDepth(newDepth)
        setMaxDepthReached(prev => Math.max(prev, newDepth))
        
        // Mensajes de éxito más variados
        const successMessages = [
          "¡Avanzas! 🕳️",
          "¡Más profundo! ⬇️",
          "¡Excelente! 🌟",
          "¡Sigue así! 🚀"
        ]
        const randomSuccess = Math.floor(Math.random() * successMessages.length)
        showToast(successMessages[randomSuccess], `Profundidad: ${newDepth}m | Racha: ${streak + 1}`)

        // Check if level is complete
        if (newDepth >= currentGameLevel.targetDepth) {
          setTimeout(() => {
            setCompletedSets([{ id: currentLevel }])
            showToast("¡Escapaste! 🌟", `¡Completaste ${currentGameLevel.name}!`)
          }, 1000)
        } else {
          nextProblem()
        }
      } else {
        // Wrong answer
        setErrores(prev => prev + 1)
        setVidas(prev => {
          const newVidas = prev - 1
          if (newVidas <= 0) {
            setIsGameOver(true)
            showToast("¡Perdido en la Cueva! 💀", `Profundidad máxima: ${maxDepthReached}m`, "destructive")
          } else {
            // Retroceder más dramáticamente
            const retreat = Math.min(3, currentDepth)
            setCurrentDepth(prev => Math.max(0, prev - retreat))
            setStreak(0)
            nextProblem()
            
            const errorMessages = [
              "¡Retrocedes! 😰",
              "¡Cuidado! ⚠️",
              "¡Error peligroso! 💥",
              "¡La cueva es traicionera! 🕳️"
            ]
            const randomError = Math.floor(Math.random() * errorMessages.length)
            showToast(errorMessages[randomError], `Retrocedes ${retreat}m. Vidas: ${newVidas}`, "destructive")
          }
          return newVidas
        })
      }

      // Reset for next question
      setTimeout(() => {
        setShowFeedback(false)
        setSelectedAnswer(null)
      }, 1500)
    }, 1000)
  }, [currentProblem, currentDepth, streak, currentGameLevel, currentLevel, showFeedback, isGameOver, maxDepthReached, showToast])

  // Generate next problem
  const nextProblem = useCallback(() => {
    setCurrentProblem(generateRandomProblem(currentDepth))
  }, [currentDepth, generateRandomProblem])

  // Handle next level
  const handleNextLevel = useCallback(() => {
    if (currentLevel < restaEnLaCuevaLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCurrentDepth(0)
      setMaxDepthReached(0)
      setAciertos(0)
      setErrores(0)
      setVidas(3)
      setStreak(0)
      setIsGameOver(false)
      setCompletedSets([])

      showToast("¡Nueva Cueva! 🕳️", `${restaEnLaCuevaLevels[newLevel].name}`)
    }
  }, [currentLevel, aciertos, showToast, detener])

  // Handle restart
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentDepth(0)
    setMaxDepthReached(0)
    setAciertos(0)
    setErrores(0)
    setVidas(3)
    setStreak(0)
    setIsGameOver(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setShowFeedback(false)
    setSelectedAnswer(null)

    reiniciar()
    showToast("¡Nueva Exploración! 🔄", "¡A explorar la cueva!")
  }, [reiniciar, showToast])

  // Initialize first problem
  useEffect(() => {
    if (currentGameLevel && !currentProblem && !isLevelComplete && !isGameComplete && !isGameOver) {
      nextProblem()
    }
  }, [currentGameLevel, currentProblem, isLevelComplete, isGameComplete, isGameOver, nextProblem])

  // Results submission
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


  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    currentDepth,
    maxDepthReached,
    currentProblem,
    selectedAnswer,
    aciertos,
    errores,
    vidas,
    timeLeft,
    streak,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameOver,
    showFeedback,
    isCorrect,
    gameContainerRef,
    tiempoFinal,

    // Game actions
    handleAnswerSelect,
    handleNextLevel,
    handleRestart,
  }
}