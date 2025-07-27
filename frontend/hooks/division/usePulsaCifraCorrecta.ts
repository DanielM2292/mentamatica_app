import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';

// Configuración de niveles basada en velocidad de procesamiento
const pulsaCifraLevels = [
  {
    name: "Nivel 1 - Velocidad Básica",
    description: "Divisiones simples entre 2 y 3",
    difficulty: "Fácil",
    divisors: [2, 3],
    maxDividend: 12,
    problemsPerLevel: 2,
    timePerProblem: 8,
  },
  {
    name: "Nivel 2 - Velocidad Media",
    description: "Divisiones entre 2, 3 y 4",
    difficulty: "Medio",
    divisors: [2, 3, 4],
    maxDividend: 20,
    problemsPerLevel: 2,
    timePerProblem: 6,
  },
  {
    name: "Nivel 3 - Velocidad Extrema",
    description: "Divisiones entre 2 al 5",
    difficulty: "Difícil",
    divisors: [2, 3, 4, 5],
    maxDividend: 30,
    problemsPerLevel: 2,
    timePerProblem: 4,
  },
]

interface Option {
  id: number
  value: number
  isCorrect: boolean
  isSelected: boolean
  color: string
  emoji: string
}

interface Problem {
  dividend: number
  divisor: number
  quotient: number
  remainder: number
  expression: string
}

// Colores vibrantes para opciones
const optionColors = [
  { bg: "from-red-400 to-red-600", border: "border-red-700", emoji: "🔴" },
  { bg: "from-blue-400 to-blue-600", border: "border-blue-700", emoji: "🔵" },
  { bg: "from-green-400 to-green-600", border: "border-green-700", emoji: "🟢" },
  { bg: "from-yellow-400 to-yellow-600", border: "border-yellow-700", emoji: "🟡" },
  { bg: "from-purple-400 to-purple-600", border: "border-purple-700", emoji: "🟣" },
  { bg: "from-pink-400 to-pink-600", border: "border-pink-700", emoji: "🩷" },
]

export const usePulsaCifraCorrecta = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [options, setOptions] = useState<Option[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [problemsCompleted, setProblemsCompleted] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const problemTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = pulsaCifraLevels[currentLevel]
  const isLastLevel = currentLevel >= pulsaCifraLevels.length - 1
  const isLevelComplete = problemsCompleted >= currentGameLevel.problemsPerLevel
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const progress = (problemsCompleted / currentGameLevel.problemsPerLevel) * 100
  const isGameActive = !isLevelComplete && !isGameComplete;

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

  // Generar problema de división
  const generateProblem = useCallback((): Problem => {
    const level = currentGameLevel
    const divisor = level.divisors[Math.floor(Math.random() * level.divisors.length)]

    // Generar dividendo que sea divisible exactamente
    const quotient = Math.floor(Math.random() * (level.maxDividend / divisor)) + 1
    const dividend = divisor * quotient

    return {
      dividend,
      divisor,
      quotient,
      remainder: 0,
      expression: `${dividend} ÷ ${divisor}`,
    }
  }, [currentGameLevel])

  // Generar opciones de respuesta
  const generateOptions = useCallback((problem: Problem) => {
    const optionsList: Option[] = []
    const correctAnswer = problem.quotient

    // Generar respuestas incorrectas estratégicamente
    const wrongAnswers = new Set<number>()

    // Errores comunes en división
    wrongAnswers.add(correctAnswer + 1) // Error por uno más
    wrongAnswers.add(correctAnswer - 1) // Error por uno menos
    wrongAnswers.add(problem.dividend) // Confundir dividendo con resultado
    wrongAnswers.add(problem.divisor) // Confundir divisor con resultado
    wrongAnswers.add(correctAnswer * 2) // Multiplicar en lugar de dividir

    // Añadir más respuestas aleatorias si es necesario
    while (wrongAnswers.size < 5) {
      const randomWrong = Math.floor(Math.random() * 20) + 1
      if (randomWrong !== correctAnswer && randomWrong > 0) {
        wrongAnswers.add(randomWrong)
      }
    }

    // Seleccionar 5 respuestas incorrectas
    const selectedWrong = Array.from(wrongAnswers).slice(0, 5)
    const allAnswers = [correctAnswer, ...selectedWrong]

    // Mezclar respuestas
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]]
    }

    // Crear opciones con colores
    allAnswers.forEach((answer, index) => {
      const colorIndex = index % optionColors.length
      const color = optionColors[colorIndex]

      optionsList.push({
        id: index,
        value: answer,
        isCorrect: answer === correctAnswer,
        isSelected: false,
        color: color.bg,
        emoji: color.emoji,
      })
    })

    return optionsList
  }, [])

  // Inicializar timer del problema
  const initializeProblemTimer = useCallback(() => {
    setTimeRemaining(currentGameLevel.timePerProblem)

    if (problemTimerRef.current) {
      clearInterval(problemTimerRef.current)
    }

    problemTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Tiempo agotado para este problema
          setErrores(prevErrores => prevErrores + 1)
          setStreak(0)
          showToast("⏰ Tiempo Agotado", "¡Más rápido la próxima vez!", "destructive")

          // Generar nuevo problema
          setTimeout(() => {
            generateNewProblem()
          }, 1000)

          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [currentGameLevel, showToast])

  // Generar nuevo problema
  const generateNewProblem = useCallback(() => {
    const newProblem = generateProblem()
    setCurrentProblem(newProblem)
    setOptions(generateOptions(newProblem))
    setSelectedOption(null)
    initializeProblemTimer()
  }, [generateProblem, generateOptions, initializeProblemTimer])

  // Manejar selección de opción
  const handleOptionSelect = useCallback((optionId: number) => {
    if (!currentProblem || selectedOption !== null) return

    const option = options.find(o => o.id === optionId)
    if (!option) return

    setSelectedOption(optionId)

    // Actualizar opciones para mostrar selección
    setOptions(prev => prev.map(o =>
      o.id === optionId ? { ...o, isSelected: true } : o
    ))

    // Limpiar timer del problema
    if (problemTimerRef.current) {
      clearInterval(problemTimerRef.current)
    }

    setTimeout(() => {
      if (option.isCorrect) {
        setAciertos(prev => prev + 1)
        setProblemsCompleted(prev => prev + 1)
        setStreak(prev => prev + 1)
        setMaxStreak(prev => Math.max(prev, streak + 1))

        const successMessages = [
          "¡Perfecto! ⚡",
          "¡Increíble! 🎯",
          "¡Fantástico! 🌟",
          "¡Excelente! 🚀"
        ]
        const randomMessage = successMessages[Math.floor(Math.random() * successMessages.length)]
        showToast(randomMessage, `${currentProblem?.expression} = ${option.value}`)

        // Verificar si el nivel está completo
        if (problemsCompleted + 1 >= currentGameLevel.problemsPerLevel) {
          setCompletedSets([{ id: currentLevel }])
          showToast("¡Nivel Completado! 🏆", "¡Velocidad mental increíble!")
        } else {
          // Generar nuevo problema
          setTimeout(() => {
            generateNewProblem()
          }, 1500)
        }
      } else {
        setErrores(prev => prev + 1)
        setStreak(0)

        const correctOption = options.find(o => o.isCorrect)
        showToast("¡Ups! 😅", `La respuesta correcta era ${correctOption?.value}`, "destructive")

        // Generar nuevo problema
        setTimeout(() => {
          generateNewProblem()
        }, 2000)
      }
    }, 300)
  }, [isGameActive, selectedOption, options, problemsCompleted, currentGameLevel, currentLevel, streak, currentProblem, showToast, generateNewProblem])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < pulsaCifraLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setProblemsCompleted(0)
      setAciertos(0)
      setErrores(0)
      setStreak(0)
      setSelectedOption(null)

      generateNewProblem()
      showToast("¡Nuevo Desafío! ⚡", `${pulsaCifraLevels[newLevel].name}`)
    }
  }, [currentLevel, aciertos, generateNewProblem, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    if (problemTimerRef.current) {
      clearInterval(problemTimerRef.current)
    }

    setCurrentLevel(0)
    setProblemsCompleted(0)
    setAciertos(0)
    setErrores(0)
    setStreak(0)
    setMaxStreak(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setSelectedOption(null)

    generateNewProblem()

    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A toda velocidad!")
  }, [generateNewProblem, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem) {
      generateNewProblem()
    }
  }, [currentGameLevel, currentProblem, generateNewProblem])

  // Cleanup
  useEffect(() => {
    return () => {
      if (problemTimerRef.current) {
        clearInterval(problemTimerRef.current)
      }
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    currentProblem,
    options,
    aciertos,
    errores,
    problemsCompleted,
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
    selectedOption,
    gameContainerRef,
    tiempoFinal,

    // Game actions
    handleOptionSelect,
    handleNextLevel,
    handleRestart,
  }
}