import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles
const perimetroLevels = [
  {
    name: "Nivel 1 - Perímetros Básicos",
    description: "Cuadrados y rectángulos simples",
    difficulty: "Fácil",
    problemsPerLevel: 6,
    maxSideLength: 8,
    shapes: ["square", "rectangle"],
    timeLimit: 120,
  },
  {
    name: "Nivel 2 - Perímetros Intermedios",
    description: "Incluye triángulos y hexágonos",
    difficulty: "Medio",
    problemsPerLevel: 8,
    maxSideLength: 12,
    shapes: ["square", "rectangle", "triangle", "hexagon"],
    timeLimit: 150,
  },
  {
    name: "Nivel 3 - Perímetros Avanzados",
    description: "Figuras complejas y múltiples lados",
    difficulty: "Difícil",
    problemsPerLevel: 10,
    maxSideLength: 15,
    shapes: ["square", "rectangle", "triangle", "pentagon", "hexagon", "octagon"],
    timeLimit: 180,
  },
]

const shapeTypes = {
  square: {
    name: "Cuadrado",
    emoji: "🟦",
    color: "from-blue-400 to-blue-600",
    sidesCount: 4,
    formula: "4 × lado",
    calculate: (sides: number[]) => sides[0] * 4,
    sound: "¡Cuatro lados iguales como una ventana!",
  },
  rectangle: {
    name: "Rectángulo",
    emoji: "🟩",
    color: "from-green-400 to-green-600",
    sidesCount: 2,
    formula: "2 × (largo + ancho)",
    calculate: (sides: number[]) => 2 * (sides[0] + sides[1]),
    sound: "¡Como una puerta con largo y ancho!",
  },
  triangle: {
    name: "Triángulo",
    emoji: "🔺",
    color: "from-red-400 to-red-600",
    sidesCount: 3,
    formula: "lado₁ + lado₂ + lado₃",
    calculate: (sides: number[]) => sides.reduce((sum, side) => sum + side, 0),
    sound: "¡Tres lados como una montaña!",
  },
  pentagon: {
    name: "Pentágono",
    emoji: "🔷",
    color: "from-purple-400 to-purple-600",
    sidesCount: 5,
    formula: "5 × lado",
    calculate: (sides: number[]) => sides[0] * 5,
    sound: "¡Cinco lados mágicos!",
  },
  hexagon: {
    name: "Hexágono",
    emoji: "⬡",
    color: "from-yellow-400 to-yellow-600",
    sidesCount: 6,
    formula: "6 × lado",
    calculate: (sides: number[]) => sides[0] * 6,
    sound: "¡Seis lados como las celdas de abejas!",
  },
  octagon: {
    name: "Octágono",
    emoji: "🛑",
    color: "from-pink-400 to-pink-600",
    sidesCount: 8,
    formula: "8 × lado",
    calculate: (sides: number[]) => sides[0] * 8,
    sound: "¡Ocho lados como una señal de alto!",
  },
}

interface Problem {
  id: number
  shape: keyof typeof shapeTypes
  sides: number[]
  correctPerimeter: number
  chestValue: number
  isUnlocked: boolean
}

interface GameState {
  problems: Problem[]
  currentProblem: number
  userAnswer: string
  chests: { id: number; value: number; isUnlocked: boolean; isAnimating: boolean }[]
  totalTreasure: number
}

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

export const usePerimetroMagico = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [gameState, setGameState] = useState<GameState>({
    problems: [],
    currentProblem: 0,
    userAnswer: "",
    chests: [],
    totalTreasure: 0,
  })
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [problemsCompleted, setProblemsCompleted] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showFormula, setShowFormula] = useState(false)
  const [roundTime, setRoundTime] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])
  const [encouragementMessage, setEncouragementMessage] = useState("")
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [treasureSparkles, setTreasureSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const chestsRefs = useRef<(HTMLDivElement | null)[]>([])
  const problemRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const treasureRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")
  const roundTimer = useRef<NodeJS.Timeout>()

  // Computed values
  const currentGameLevel = perimetroLevels[currentLevel]
  const isLastLevel = currentLevel >= perimetroLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (problemsCompleted / currentGameLevel.problemsPerLevel) * 100

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  // Initialize timer
  useEffect(() => {
    iniciar()
  }, [iniciar])

  // Mensajes de aliento
  const encouragementMessages = [
    "¡Increíble! 🌟",
    "¡Eres un matemático genial! 🧮",
    "¡Sigue así! 💪",
    "¡Excelente cálculo! ⭐",
    "¡Eres un cazatesoros! 🏴‍☠️",
    "¡Qué inteligente eres! 🧠",
    "¡Fantástico! 🎊",
    "¡Lo estás haciendo súper! 🚀"
  ]

  // Toast function
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

      if (now - lastToastTime.current < 1000 && lastToastMessage.current === message) {
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

  // Crear partículas de celebración
  const createCelebrationParticles = useCallback((x: number, y: number) => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      emoji: ['💰', '💎', '🏆', '⭐', '✨', '🎉'][Math.floor(Math.random() * 6)]
    }))
    
    setCelebrationParticles(prev => [...prev, ...particles])
    
    setTimeout(() => {
      setCelebrationParticles(prev => prev.filter(p => !particles.some(np => np.id === p.id)))
    }, 3000)
  }, [])

  // Crear chispas de tesoro
  const createTreasureSparkles = useCallback((x: number, y: number) => {
    const sparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 80,
    }))
    
    setTreasureSparkles(prev => [...prev, ...sparkles])
    
    setTimeout(() => {
      setTreasureSparkles(prev => prev.filter(s => !sparkles.some(ns => ns.id === s.id)))
    }, 1500)
  }, [])

  // Mostrar mensaje de aliento
  const showEncouragementMessage = useCallback(() => {
    const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
    setEncouragementMessage(message)
    setShowEncouragement(true)
    
    setTimeout(() => {
      setShowEncouragement(false)
    }, 2000)
  }, [])

  // Generar problemas
  const generateProblems = useCallback(() => {
    const level = currentGameLevel
    const problems: Problem[] = []
    const chests: { id: number; value: number; isUnlocked: boolean; isAnimating: boolean }[] = []

    for (let i = 0; i < level.problemsPerLevel; i++) {
      const shapeKeys = level.shapes as (keyof typeof shapeTypes)[]
      const shape = shapeKeys[Math.floor(Math.random() * shapeKeys.length)]
      const shapeData = shapeTypes[shape]

      let sides: number[] = []
      
      if (shape === "square" || shape === "pentagon" || shape === "hexagon" || shape === "octagon") {
        // Figuras regulares - todos los lados iguales
        const sideLength = Math.floor(Math.random() * level.maxSideLength) + 2
        sides = [sideLength]
      } else if (shape === "rectangle") {
        // Rectángulo - largo y ancho diferentes
        const width = Math.floor(Math.random() * level.maxSideLength) + 2
        const height = Math.floor(Math.random() * level.maxSideLength) + 2
        sides = [width, height]
      } else if (shape === "triangle") {
        // Triángulo - tres lados que formen un triángulo válido
        const side1 = Math.floor(Math.random() * level.maxSideLength) + 3
        const side2 = Math.floor(Math.random() * level.maxSideLength) + 3
        const side3 = Math.floor(Math.random() * level.maxSideLength) + 3
        sides = [side1, side2, side3]
      }

      const correctPerimeter = shapeData.calculate(sides)
      const chestValue = correctPerimeter * 10 // Valor del cofre basado en el perímetro

      problems.push({
        id: i,
        shape,
        sides,
        correctPerimeter,
        chestValue,
        isUnlocked: false,
      })

      chests.push({
        id: i,
        value: chestValue,
        isUnlocked: false,
        isAnimating: false,
      })
    }

    setGameState({
      problems,
      currentProblem: 0,
      userAnswer: "",
      chests,
      totalTreasure: 0,
    })

    setRoundTime(level.timeLimit)
  }, [currentGameLevel])

  // Manejar respuesta
  const handleSubmitAnswer = useCallback(() => {
    const answer = parseInt(gameState.userAnswer)
    const currentProblem = gameState.problems[gameState.currentProblem]
    
    if (!currentProblem || isNaN(answer)) {
      showToast("¡Ups! 🤔", "Necesitas escribir un número", "destructive")
      
      // Animar input con error
      if (inputRef.current) {
        inputRef.current.style.animation = 'shake-input 0.5s ease-in-out'
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.style.animation = ''
          }
        }, 500)
      }
      return
    }

    if (answer === currentProblem.correctPerimeter) {
      // Respuesta correcta
      setAciertos(prev => prev + 1)
      setProblemsCompleted(prev => prev + 1)
      
      const newTreasure = gameState.totalTreasure + currentProblem.chestValue
      
      setGameState(prev => ({
        ...prev,
        chests: prev.chests.map(chest => 
          chest.id === currentProblem.id ? { ...chest, isUnlocked: true, isAnimating: true } : chest
        ),
        problems: prev.problems.map(prob => 
          prob.id === currentProblem.id ? { ...prob, isUnlocked: true } : prob
        ),
        totalTreasure: newTreasure,
        userAnswer: "",
      }))

      const shapeData = shapeTypes[currentProblem.shape]
      showToast("¡Cofre Desbloqueado! 🎉", shapeData.sound)
      showEncouragementMessage()
      
      // Crear efectos visuales
      createCelebrationParticles(window.innerWidth / 2, window.innerHeight / 2)
      createTreasureSparkles(window.innerWidth / 2, window.innerHeight / 2)

      // Verificar si el nivel está completo
      if (problemsCompleted + 1 >= currentGameLevel.problemsPerLevel) {
        setTimeout(() => {
          setIsLevelComplete(true)
          setIsGameActive(false)
          setCompletedSets([{ id: currentLevel }])
          showToast("¡Nivel Completado! 🏆", `¡Tesoro total: ${newTreasure} monedas!`)
        }, 1500)
      } else {
        // Siguiente problema
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            currentProblem: prev.currentProblem + 1,
            chests: prev.chests.map(chest => ({ ...chest, isAnimating: false })),
          }))
        }, 2500)
      }
    } else {
      // Respuesta incorrecta
      setErrores(prev => prev + 1)
      showToast("¡Inténtalo de nuevo! 🤔", `El perímetro correcto es ${currentProblem.correctPerimeter} cm`, "destructive")
      setGameState(prev => ({ ...prev, userAnswer: "" }))
      
      // Animar input con error
      if (inputRef.current) {
        inputRef.current.style.animation = 'shake-input 0.5s ease-in-out'
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.style.animation = ''
          }
        }, 500)
      }
    }
  }, [gameState, problemsCompleted, currentGameLevel, currentLevel, showToast, showEncouragementMessage, createCelebrationParticles, createTreasureSparkles])

  // Manejar cambio de respuesta
  const handleAnswerChange = useCallback((value: string) => {
    setGameState(prev => ({ ...prev, userAnswer: value }))
  }, [])

  // Timer de ronda
  useEffect(() => {
    if (isGameActive && roundTime > 0) {
      roundTimer.current = setTimeout(() => {
        setRoundTime(prev => prev - 1)
      }, 1000)
    } else if (roundTime === 0 && isGameActive) {
      // Tiempo agotado
      setErrores(prev => prev + 1)
      showToast("¡Tiempo Agotado! ⏰", "¡No te preocupes! Tendrás más tiempo en el siguiente nivel", "destructive")
      
      setTimeout(() => {
        generateProblems()
      }, 2000)
    }

    return () => {
      if (roundTimer.current) clearTimeout(roundTimer.current)
    }
  }, [isGameActive, roundTime, generateProblems, showToast])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && gameState.problems.length > 0) {
      const currentProblem = gameState.problems[gameState.currentProblem]
      if (currentProblem) {
        const shapeData = shapeTypes[currentProblem.shape]
        showToast("💡 Pista", `El perímetro es la suma de todos los lados: ${shapeData.formula}`)
      }
    }
  }, [showHint, gameState.problems, gameState.currentProblem, showToast])

  // Toggle formula
  const toggleFormula = useCallback(() => {
    setShowFormula(prev => !prev)
  }, [])

  // Animación de focus en input
  const animateInputFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.transform = 'scale(1.05)'
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.transform = 'scale(1)'
        }
      }, 200)
    }
  }, [])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < perimetroLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setProblemsCompleted(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setIsGameActive(true)

      generateProblems()
      showToast("¡Nuevo Desafío! 🗝️", `${perimetroLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateProblems, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setProblemsCompleted(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setIsGameActive(true)
    setCelebrationParticles([])
    setTreasureSparkles([])

    generateProblems()
    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A buscar tesoros!")
  }, [generateProblems, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && gameState.problems.length === 0) {
      generateProblems()
      setIsGameActive(true)
    }
  }, [currentGameLevel, gameState.problems.length, generateProblems])

  // Enviar resultados
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const actividad = "perimetro-magico"

      try {
        const res = await fetch(`http://localhost:3001/api/geometria`, {
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
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
      if (roundTimer.current) clearTimeout(roundTimer.current)
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    gameState,
    aciertos,
    errores,
    problemsCompleted,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showHint,
    showFormula,
    gameContainerRef,
    tiempoFinal,
    shapeTypes,
    roundTime,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,
    treasureSparkles,

    // Refs
    chestsRefs,
    problemRef,
    inputRef,
    timerRef,
    treasureRef,
    progressBarRef,

    // Game actions
    handleSubmitAnswer,
    handleAnswerChange,
    handleNextLevel,
    handleRestart,
    toggleHint,
    toggleFormula,
    animateInputFocus,
  }
}