import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';

const restaYRescataLevels = [
  {
    name: "Nivel 1",
    title: "Puente Corto",
    description: "Cruza el primer puente",
    difficulty: "Fácil",
    segmentCount: 5,
    minNumber: 3,
    maxNumber: 10,
  },
  {
    name: "Nivel 2",
    title: "Puente Medio",
    description: "Un puente más largo",
    difficulty: "Medio",
    segmentCount: 7,
    minNumber: 5,
    maxNumber: 15,
  },
  {
    name: "Nivel 3",
    title: "Puente Largo",
    description: "El puente más desafiante",
    difficulty: "Difícil",
    segmentCount: 9,
    minNumber: 8,
    maxNumber: 20,
  },
]

interface BridgeSegment {
  minuend: number
  subtrahend: number
  result: number
  options: number[]
}

export const useRestaYRescata = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [segments, setSegments] = useState<BridgeSegment[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = restaYRescataLevels[currentLevel]
  const currentSegment = segments[currentSegmentIndex]
  const isLastLevel = currentLevel >= restaYRescataLevels.length - 1
  const isLevelComplete = currentSegmentIndex >= currentGameLevel.segmentCount
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const isGameActive = !isLevelComplete && !isGameComplete;

  // Initialize timer and segments
  useEffect(() => {
    iniciar()
    if (segments.length === 0) {
      setSegments(generateRandomSegments(currentLevel))
    }
  }, [iniciar, currentLevel, segments.length])

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

  // Check level completion
  useEffect(() => {
    if (currentSegmentIndex > currentGameLevel?.segmentCount && !isLevelComplete) {
      setCompletedSets([{ id: currentLevel }])
      showToast("¡Nivel Completado! 🌉", `¡Completaste ${currentGameLevel.name}!`)
    }
  }, [currentSegmentIndex, currentGameLevel, isLevelComplete, currentLevel, showToast])

  const generateAnswerOptions = useCallback((correctAnswer: number, segmentIndex: number, level: number): number[] => {
    const seed = level * 10000 + segmentIndex * 1000 + correctAnswer
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const options = [correctAnswer]
    const usedNumbers = new Set([correctAnswer])
    
    let randomIndex = 0
    while (options.length < 4) {
      let wrong: number
      
      if (seededRandom(seed + randomIndex) < 0.3) {
        wrong = correctAnswer + (Math.floor(seededRandom(seed + randomIndex + 1) * 6) - 3)
      } else if (seededRandom(seed + randomIndex + 2) < 0.5) {
        wrong = Math.floor(seededRandom(seed + randomIndex + 3) * Math.max(20, correctAnswer * 2))
      } else {
        wrong = Math.floor(seededRandom(seed + randomIndex + 4) * 25)
      }
      
      randomIndex++
      
      if (wrong >= 0 && !usedNumbers.has(wrong)) {
        options.push(wrong)
        usedNumbers.add(wrong)
      }
    }
    
    return options.sort(() => seededRandom(seed + options.length) - 0.5)
  }, [])

  const generateRandomSegments = useCallback((level: number): BridgeSegment[] => {
    const gameLevel = restaYRescataLevels[level]
    const segments: BridgeSegment[] = []

    for (let i = 0; i < gameLevel.segmentCount; i++) {
      const minuend = Math.floor(Math.random() * (gameLevel.maxNumber - gameLevel.minNumber + 1)) + gameLevel.minNumber
      const subtrahend = Math.floor(Math.random() * (minuend - 1)) + 1
      const result = minuend - subtrahend
      const options = generateAnswerOptions(result, i, level)

      segments.push({
        minuend,
        subtrahend,
        result,
        options
      })
    }

    return segments
  }, [generateAnswerOptions])

  const handleAnswerSelect = useCallback((answer: number) => {
    if (showFeedback || !currentSegment) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentSegment.result
    setIsCorrect(correct)
    setShowFeedback(true)

    setTimeout(() => {
      if (correct) {
        setAciertos((prev) => prev + 1)
        
        const successMessages = ["¡Excelente! 🎉", "¡Perfecto! ⭐", "¡Increíble! 🌟", "¡Fantástico! 🎊"]
        const randomSuccess = Math.floor(Math.random() * successMessages.length)
        showToast(successMessages[randomSuccess], "¡Respuesta correcta!")

        if (currentSegmentIndex < segments.length - 1) {
          setTimeout(() => {
            setCurrentSegmentIndex((prev) => prev + 1)
            setShowFeedback(false)
            setSelectedAnswer(null)
          }, 1500)
        } else {
          // Esto activará el efecto de completado de nivel
          setCurrentSegmentIndex(currentSegmentIndex + 1)
        }
      } else {
        setErrores((prev) => prev + 1)
        
        const errorMessages = ["¡Inténtalo de nuevo! 💪", "¡Casi lo tienes! 🎯", "¡No te rindas! 🚀"]
        const randomError = Math.floor(Math.random() * errorMessages.length)
        showToast(errorMessages[randomError], "¡Sigue intentando!", "destructive")
        
        setTimeout(() => {
          setShowFeedback(false)
          setSelectedAnswer(null)
        }, 1500)
      }
    }, 1000)
  }, [currentSegment, currentSegmentIndex, segments.length, showFeedback, showToast])

  const handleNextLevel = useCallback(() => {
    if (currentLevel < restaYRescataLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setCurrentSegmentIndex(0)
      setSegments(generateRandomSegments(newLevel))
      setCompletedSets([])
      setShowFeedback(false)
      setSelectedAnswer(null)

      showToast("¡Nuevo Nivel! 🌉", `${restaYRescataLevels[newLevel].name}`)
    }
  }, [currentLevel, aciertos, generateRandomSegments, showToast, tiempo, detener])

  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentSegmentIndex(0)
    setSegments(generateRandomSegments(0))
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setShowFeedback(false)
    setSelectedAnswer(null)

    reiniciar()
    showToast("¡Nuevo Intento! 🔄", "¡A cruzar el puente!")
  }, [generateRandomSegments, reiniciar, showToast])

  // Enviar resultados
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
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return {
    currentLevel,
    currentSegmentIndex,
    currentSegment,
    segments,
    selectedAnswer,
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
    showFeedback,
    isCorrect,
    gameContainerRef,
    tiempoFinal,
    handleAnswerSelect,
    handleNextLevel,
    handleRestart,
  }
}