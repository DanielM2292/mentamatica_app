import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles
const detectiveLevels = [
  {
    name: "Nivel 1 - Figuras Básicas",
    description: "Encuentra círculos, cuadrados y triángulos",
    difficulty: "Fácil",
    figuresPerLevel: 4,
    timeLimit: 90,
    targetFigures: ["circle", "square", "triangle"],
    distractors: 3,
  },
  {
    name: "Nivel 2 - Figuras Intermedias", 
    description: "Incluye rectángulos, pentágonos y hexágonos",
    difficulty: "Medio",
    figuresPerLevel: 6,
    timeLimit: 120,
    targetFigures: ["circle", "square", "triangle", "rectangle", "pentagon"],
    distractors: 5,
  },
  {
    name: "Nivel 3 - Figuras Avanzadas",
    description: "Todas las figuras geométricas",
    difficulty: "Difícil", 
    figuresPerLevel: 8,
    timeLimit: 150,
    targetFigures: ["circle", "square", "triangle", "rectangle", "pentagon", "hexagon", "octagon", "star"],
    distractors: 8,
  },
]

const figureTypes = {
  circle: { name: "Círculo", emoji: "🟠", color: "from-orange-400 to-orange-600", shape: "rounded-full", sound: "¡Redondo como una pelota!" },
  square: { name: "Cuadrado", emoji: "🟦", color: "from-blue-400 to-blue-600", shape: "rounded-none", sound: "¡Cuatro lados iguales!" },
  triangle: { name: "Triángulo", emoji: "🔺", color: "from-red-400 to-red-600", shape: "clip-triangle", sound: "¡Tres puntas como una montaña!" },
  rectangle: { name: "Rectángulo", emoji: "🟩", color: "from-green-400 to-green-600", shape: "rounded-sm", sound: "¡Como una puerta!" },
  pentagon: { name: "Pentágono", emoji: "🔷", color: "from-purple-400 to-purple-600", shape: "clip-pentagon", sound: "¡Cinco lados mágicos!" },
  hexagon: { name: "Hexágono", emoji: "⬡", color: "from-yellow-400 to-yellow-600", shape: "clip-hexagon", sound: "¡Como un panal de abejas!" },
  octagon: { name: "Octágono", emoji: "🛑", color: "from-pink-400 to-pink-600", shape: "clip-octagon", sound: "¡Como una señal de alto!" },
  star: { name: "Estrella", emoji: "⭐", color: "from-amber-400 to-amber-600", shape: "clip-star", sound: "¡Brilla en el cielo!" },
}

interface Figure {
  id: number
  type: keyof typeof figureTypes
  x: number
  y: number
  rotation: number
  scale: number
  isFound: boolean
  isTarget: boolean
  isDistractor: boolean
  isAnimating: boolean
  pulseDelay: number
}

interface GameState {
  figures: Figure[]
  targetFigure: keyof typeof figureTypes | null
  foundCount: number
  totalTargets: number
}

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

export const useDetectiveFiguras = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [gameState, setGameState] = useState<GameState>({
    figures: [],
    targetFigure: null,
    foundCount: 0,
    totalTargets: 0,
  })
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [roundsCompleted, setRoundsCompleted] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [roundTime, setRoundTime] = useState(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])
  const [encouragementMessage, setEncouragementMessage] = useState("")
  const [showEncouragement, setShowEncouragement] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const figuresRefs = useRef<(HTMLDivElement | null)[]>([])
  const sceneRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")
  const roundTimer = useRef<NodeJS.Timeout>()

  // Computed values
  const currentGameLevel = detectiveLevels[currentLevel]
  const isLastLevel = currentLevel >= detectiveLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (roundsCompleted / currentGameLevel.figuresPerLevel) * 100

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
    "¡Muy bien! 🌟",
    "¡Eres increíble! 🎉",
    "¡Sigue así! 💪",
    "¡Excelente trabajo! ⭐",
    "¡Eres un detective genial! 🕵️",
    "¡Qué observador eres! 👀",
    "¡Fantástico! 🎊",
    "¡Lo estás haciendo súper bien! 🚀"
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
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
      emoji: ['⭐', '✨', '🎉', '💫', '🌟'][Math.floor(Math.random() * 5)]
    }))
    
    setCelebrationParticles(prev => [...prev, ...particles])
    
    setTimeout(() => {
      setCelebrationParticles(prev => prev.filter(p => !particles.some(np => np.id === p.id)))
    }, 2000)
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

  // Generar escena con figuras
  const generateScene = useCallback(() => {
    const level = currentGameLevel
    const targetFigures = level.targetFigures
    const targetFigure = targetFigures[Math.floor(Math.random() * targetFigures.length)]
    
    const figures: Figure[] = []
    let figureId = 0

    // Generar figuras objetivo (2-4 por ronda)
    const targetCount = Math.floor(Math.random() * 3) + 2
    for (let i = 0; i < targetCount; i++) {
      figures.push({
        id: figureId++,
        type: targetFigure,
        x: Math.random() * 70 + 15, // Más margen para pantallas pequeñas
        y: Math.random() * 70 + 15,
        rotation: Math.random() * 360,
        scale: 0.9 + Math.random() * 0.3, // Figuras más grandes para táctil
        isFound: false,
        isTarget: true,
        isDistractor: false,
        isAnimating: false,
        pulseDelay: Math.random() * 2,
      })
    }

    // Generar distractores
    for (let i = 0; i < level.distractors; i++) {
      const distractorTypes = targetFigures.filter(f => f !== targetFigure)
      const distractorType = distractorTypes[Math.floor(Math.random() * distractorTypes.length)]
      
      figures.push({
        id: figureId++,
        type: distractorType,
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        rotation: Math.random() * 360,
        scale: 0.9 + Math.random() * 0.3,
        isFound: false,
        isTarget: false,
        isDistractor: true,
        isAnimating: false,
        pulseDelay: Math.random() * 2,
      })
    }

    // Mezclar figuras
    const shuffledFigures = figures.sort(() => Math.random() - 0.5)

    setGameState({
      figures: shuffledFigures,
      targetFigure,
      foundCount: 0,
      totalTargets: targetCount,
    })

    setRoundTime(level.timeLimit)
  }, [currentGameLevel])

  // Manejar click en figura
  const handleFigureClick = useCallback((figureId: number, event?: React.MouseEvent | React.TouchEvent) => {
    const figure = gameState.figures.find(f => f.id === figureId)
    if (!figure || figure.isFound || !isGameActive) return

    // Obtener posición para partículas
    let x = 50, y = 50
    if (event && 'clientX' in event) {
      x = event.clientX
      y = event.clientY
    } else if (event && 'touches' in event && event.touches[0]) {
      x = event.touches[0].clientX
      y = event.touches[0].clientY
    }

    if (figure.isTarget) {
      // Figura correcta
      setGameState(prev => ({
        ...prev,
        figures: prev.figures.map(f => 
          f.id === figureId ? { ...f, isFound: true, isAnimating: true } : f
        ),
        foundCount: prev.foundCount + 1,
      }))
      
      setAciertos(prev => prev + 1)
      
      const figureData = figureTypes[figure.type]
      showToast("¡Correcto! 🎯", figureData.sound)
      showEncouragementMessage()
      createCelebrationParticles(x, y)

      // Verificar si se encontraron todas las figuras objetivo
      const newFoundCount = gameState.foundCount + 1
      if (newFoundCount >= gameState.totalTargets) {
        setRoundsCompleted(prev => prev + 1)
        
        // Verificar si el nivel está completo
        if (roundsCompleted + 1 >= currentGameLevel.figuresPerLevel) {
          setTimeout(() => {
            setIsLevelComplete(true)
            setIsGameActive(false)
            setCompletedSets([{ id: currentLevel }])
            showToast("¡Nivel Completado! 🏆", "¡Eres un detective increíble!")
          }, 1500)
        } else {
          // Nueva ronda
          setTimeout(() => {
            generateScene()
          }, 2000)
        }
      }
    } else {
      // Figura incorrecta
      setErrores(prev => prev + 1)
      
      // Animar figura incorrecta
      setGameState(prev => ({
        ...prev,
        figures: prev.figures.map(f => 
          f.id === figureId ? { ...f, isAnimating: true } : f
        ),
      }))
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          figures: prev.figures.map(f => 
            f.id === figureId ? { ...f, isAnimating: false } : f
          ),
        }))
      }, 600)
      
      showToast("¡Oops! 🤔", "Esa no es la figura que buscamos. ¡Inténtalo de nuevo!", "destructive")
    }
  }, [gameState, isGameActive, roundsCompleted, currentGameLevel, currentLevel, generateScene, showToast, showEncouragementMessage, createCelebrationParticles])

  // Timer de ronda
  useEffect(() => {
    if (isGameActive && roundTime > 0) {
      roundTimer.current = setTimeout(() => {
        setRoundTime(prev => prev - 1)
      }, 1000)
    } else if (roundTime === 0 && isGameActive) {
      // Tiempo agotado
      setErrores(prev => prev + 1)
      showToast("¡Tiempo Agotado! ⏰", "¡No te preocupes! Inténtalo de nuevo", "destructive")
      
      setTimeout(() => {
        generateScene()
      }, 2000)
    }

    return () => {
      if (roundTimer.current) clearTimeout(roundTimer.current)
    }
  }, [isGameActive, roundTime, generateScene, showToast])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && gameState.targetFigure) {
      const figureData = figureTypes[gameState.targetFigure]
      showToast("💡 Pista", `Busca todas las figuras: ${figureData.name} ${figureData.emoji}`)
    }
  }, [showHint, gameState.targetFigure, showToast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < detectiveLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setRoundsCompleted(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setIsGameActive(true)

      generateScene()
      showToast("¡Nuevo Desafío! 🔍", `${detectiveLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateScene, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setRoundsCompleted(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setIsGameActive(true)
    setCelebrationParticles([])

    generateScene()
    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A buscar figuras!")
  }, [generateScene, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && gameState.figures.length === 0) {
      generateScene()
      setIsGameActive(true)
    }
  }, [currentGameLevel, gameState.figures.length, generateScene])

  // Enviar resultados
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const actividad = "detective-figuras"

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
    roundsCompleted,
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
    gameContainerRef,
    tiempoFinal,
    figureTypes,
    roundTime,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,

    // Refs
    figuresRefs,
    sceneRef,
    progressBarRef,
    timerRef,

    // Game actions
    handleFigureClick,
    handleNextLevel,
    handleRestart,
    toggleHint,
  }
}