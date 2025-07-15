import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles para Resta y Rescata con generación aleatoria
const restaYRescataLevels = [
  {
    name: "Nivel 1 - Puente Corto",
    description: "Cruza el primer puente",
    difficulty: "Fácil",
    segmentCount: 5,
    minNumber: 3,
    maxNumber: 10,
  },
  {
    name: "Nivel 2 - Puente Medio",
    description: "Un puente más largo",
    difficulty: "Medio",
    segmentCount: 7,
    minNumber: 5,
    maxNumber: 15,
  },
  {
    name: "Nivel 3 - Puente Largo",
    description: "El puente más desafiante",
    difficulty: "Difícil",
    segmentCount: 8,
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

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
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
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
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

  // Generate answer options with seeded random for consistency
  const generateAnswerOptions = useCallback((correctAnswer: number, segmentIndex: number, level: number): number[] => {
    // Use segment index and level as seed for consistent options
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
        // Opciones cercanas al resultado correcto (+/- 1 a 3)
        wrong = correctAnswer + (Math.floor(seededRandom(seed + randomIndex + 1) * 6) - 3)
      } else if (seededRandom(seed + randomIndex + 2) < 0.5) {
        // Opciones más variadas pero lógicas
        wrong = Math.floor(seededRandom(seed + randomIndex + 3) * Math.max(20, correctAnswer * 2))
      } else {
        // Opciones completamente aleatorias
        wrong = Math.floor(seededRandom(seed + randomIndex + 4) * 25)
      }
      
      randomIndex++
      
      // Asegurar que sea positivo y no repetido
      if (wrong >= 0 && !usedNumbers.has(wrong)) {
        options.push(wrong)
        usedNumbers.add(wrong)
      }
    }
    
    // Sort with seeded random for consistency
    return options.sort(() => seededRandom(seed + options.length) - 0.5)
  }, [])

  // Generate random segments for current level with stable options
  const generateRandomSegments = useCallback((level: number): BridgeSegment[] => {
    const gameLevel = restaYRescataLevels[level]
    const segments: BridgeSegment[] = []

    for (let i = 0; i < gameLevel.segmentCount; i++) {
      // Generar números aleatorios dentro del rango del nivel
      const minuend = Math.floor(Math.random() * (gameLevel.maxNumber - gameLevel.minNumber + 1)) + gameLevel.minNumber
      const subtrahend = Math.floor(Math.random() * (minuend - 1)) + 1 // Asegurar que subtrahend < minuend
      const result = minuend - subtrahend

      // Generar opciones estables para este segmento
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

  // Handle answer selection with improved feedback
  const handleAnswerSelect = useCallback((answer: number) => {
    if (showFeedback || !currentSegment) return
    
    setSelectedAnswer(answer)
    const correct = answer === currentSegment.result
    setIsCorrect(correct)
    setShowFeedback(true)

    setTimeout(() => {
      if (correct) {
        setAciertos((prev) => prev + 1)
        
        // Mensajes de éxito más variados
        const successMessages = [
          "¡Excelente! 🎉",
          "¡Perfecto! ⭐",
          "¡Increíble! 🌟",
          "¡Fantástico! 🎊"
        ]
        const successDescriptions = [
          "¡Avanzas por el puente!",
          "¡Un paso más cerca!",
          "¡Sigue así!",
          "¡Vas muy bien!"
        ]
        
        const randomSuccess = Math.floor(Math.random() * successMessages.length)
        showToast(successMessages[randomSuccess], successDescriptions[randomSuccess])

        // Move to next segment or complete level
        if (currentSegmentIndex < segments.length - 1) {
          setTimeout(() => {
            setCurrentSegmentIndex((prev) => prev + 1)
            setShowFeedback(false)
            setSelectedAnswer(null)
          }, 1500)
        } else {
          setTimeout(() => {
            setIsLevelComplete(true)
            setIsGameActive(false)
            setCompletedSets([{ id: currentLevel }])
            showToast("¡Puente Cruzado! 🌉", `¡Completaste ${currentGameLevel.name}!`)
          }, 1500)
        }
      } else {
        setErrores((prev) => prev + 1)
        
        // Mensajes de error más motivadores
        const errorMessages = [
          "¡Inténtalo de nuevo! 💪",
          "¡Casi lo tienes! 🎯",
          "¡No te rindas! 🚀",
          "¡Puedes hacerlo! ⚡"
        ]
        const randomError = Math.floor(Math.random() * errorMessages.length)
        showToast(errorMessages[randomError], "¡Sigue intentando!", "destructive")
        
        setTimeout(() => {
          setShowFeedback(false)
          setSelectedAnswer(null)
        }, 1500)
      }
    }, 1000)
  }, [currentSegment, currentSegmentIndex, segments.length, currentGameLevel, currentLevel, showFeedback, showToast])

  // Handle next level with new random segments
  const handleNextLevel = useCallback(() => {
    if (currentLevel < restaYRescataLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(newLevel)
      setCurrentSegmentIndex(0)
      setSegments(generateRandomSegments(newLevel)) // Generar nuevos segmentos aleatorios
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setIsGameActive(true)
      setShowFeedback(false)
      setSelectedAnswer(null)

      showToast("¡Nuevo Puente! 🌉", `${restaYRescataLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateRandomSegments, showToast, detener])

  // Handle restart with new random segments
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentSegmentIndex(0)
    setSegments(generateRandomSegments(0)) // Generar nuevos segmentos aleatorios
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setIsGameActive(true)
    setShowFeedback(false)
    setSelectedAnswer(null)

    reiniciar()
    showToast("¡Nuevo Intento! 🔄", "¡A cruzar el puente!")
  }, [generateRandomSegments, reiniciar, showToast])

  // Initialize segments for current level
  useEffect(() => {
    if (currentGameLevel && segments.length === 0) {
      setSegments(generateRandomSegments(currentLevel))
      setIsGameActive(true)
    }
  }, [currentGameLevel, segments.length, generateRandomSegments, currentLevel])

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

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
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

    // Game actions
    handleAnswerSelect,
    handleNextLevel,
    handleRestart,
  }
}