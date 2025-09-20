import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles
const detectiveLevels = [
  {
    name: "Nivel 1",
    title: "Figuras Básicas",
    description: "Encuentra círculos, cuadrados y triángulos",
    difficulty: "Fácil",
    figuresPerLevel: 4,
    timeLimit: 90,
    targetFigures: ["circle", "square", "triangle"],
    distractors: 3,
  },
  {
    name: "Nivel 2", 
    title: "Figuras Intermedias",
    description: "Incluye rectángulos, pentágonos y hexágonos",
    difficulty: "Medio",
    figuresPerLevel: 6,
    timeLimit: 120,
    targetFigures: ["circle", "square", "triangle", "rectangle", "pentagon"],
    distractors: 5,
  },
  {
    name: "Nivel 3",
    title: "Figuras Avanzadas",
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
  rectangle: { name: "Rectángulo", emoji: "▬", color: "from-green-400 to-green-600", shape: "rounded-sm", sound: "¡Como una puerta!" },
  pentagon: { name: "Pentágono", emoji: "⬟", color: "from-purple-400 to-purple-600", shape: "clip-pentagon", sound: "¡Cinco lados mágicos!" },
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
  const roundTimer = useRef<NodeJS.Timeout>()

  // Computed values
  const currentGameLevel = detectiveLevels[currentLevel]
  const isLastLevel = currentLevel >= detectiveLevels.length - 1
  const isLevelComplete = roundsCompleted >= currentGameLevel.figuresPerLevel
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const progress = (roundsCompleted / currentGameLevel.figuresPerLevel) * 100
  const isGameActive = !isLevelComplete && !isGameComplete

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

  // Función para verificar colisiones entre figuras
  const checkCollision = useCallback((newFigure: { x: number; y: number; scale: number }, existingFigures: Figure[]) => {
    const minDistance = 12 // Distancia mínima entre figuras (en porcentaje)
    
    return existingFigures.some(existing => {
      const dx = newFigure.x - existing.x
      const dy = newFigure.y - existing.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const requiredDistance = minDistance * (newFigure.scale + existing.scale) / 2
      return distance < requiredDistance
    })
  }, [])

  // Función para generar posición sin colisiones
  const generateSafePosition = useCallback((existingFigures: Figure[], scale: number) => {
    let attempts = 0
    const maxAttempts = 50
    
    while (attempts < maxAttempts) {
      const position = {
        x: Math.random() * 70 + 15, // Margen del 15% en cada lado
        y: Math.random() * 65 + 15, // Margen del 15% arriba y abajo
        scale
      }
      
      if (!checkCollision(position, existingFigures)) {
        return position
      }
      attempts++
    }
    
    // Si no encuentra posición segura, usar una posición aleatoria
    return {
      x: Math.random() * 70 + 15,
      y: Math.random() * 65 + 15,
      scale
    }
  }, [checkCollision])

  // Generar escena con figuras
  const generateScene = useCallback(() => {
    const level = currentGameLevel
    const targetFigures = level.targetFigures
    const targetFigure = targetFigures[Math.floor(Math.random() * targetFigures.length)] as keyof typeof figureTypes
    
    const figures: Figure[] = []
    let figureId = 0

    // Generar figuras objetivo (2-4 por ronda)
    const targetCount = Math.min(Math.floor(Math.random() * 3) + 2, 4) // Máximo 4 objetivos
    for (let i = 0; i < targetCount; i++) {
      const scale = isTouchDevice ? 1.1 + Math.random() * 0.3 : 0.9 + Math.random() * 0.3
      const position = generateSafePosition(figures, scale)
      
      figures.push({
        id: figureId++,
        type: targetFigure,
        x: position.x,
        y: position.y,
        rotation: Math.random() * 360,
        scale: position.scale,
        isFound: false,
        isTarget: true,
        isDistractor: false,
        isAnimating: false,
        pulseDelay: Math.random() * 2,
      })
    }

    // Generar distractores (reducir cantidad para evitar amontonamiento)
    const distractorCount = Math.min(level.distractors, isTouchDevice ? 4 : 6)
    for (let i = 0; i < distractorCount; i++) {
      const distractorTypes = targetFigures.filter(f => f !== targetFigure)
      const distractorType = distractorTypes[Math.floor(Math.random() * distractorTypes.length)]  as keyof typeof figureTypes
      
      const scale = isTouchDevice ? 1.0 + Math.random() * 0.2 : 0.8 + Math.random() * 0.3
      const position = generateSafePosition(figures, scale)
      
      figures.push({
        id: figureId++,
        type: distractorType,
        x: position.x,
        y: position.y,
        rotation: Math.random() * 360,
        scale: position.scale,
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
  }, [currentGameLevel, generateSafePosition, isTouchDevice])

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
      toast({
        title: "¡Correcto! 🎯",
        description: figureData.sound,
        duration: 3000,
      })
      showEncouragementMessage()
      createCelebrationParticles(x, y)

      // Verificar si se encontraron todas las figuras objetivo
      const newFoundCount = gameState.foundCount + 1
      if (newFoundCount >= gameState.totalTargets) {
        setRoundsCompleted(prev => prev + 1)
        
        // Verificar si el nivel está completo
        if (roundsCompleted + 1 >= currentGameLevel.figuresPerLevel) {
          setCompletedSets([{ id: currentLevel }])
          toast({
            title: "¡Nivel Completado! 🏆",
            description: "¡Eres un detective increíble!",
            duration: 3000,
          })
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
      toast({
        title: "¡Oops! 🤔",
        description: "Esa figura no es la que buscamos. ¡Inténtalo de nuevo!",
        duration: 3000,
        variant: "destructive",
      })
    }
  }, [gameState, isGameActive, roundsCompleted, currentGameLevel, currentLevel, generateScene, toast, showEncouragementMessage, createCelebrationParticles])

  // Timer de ronda
  useEffect(() => {
    if(gameState.figures.length === 0) return;
    if (isGameActive && roundTime > 0) {
      roundTimer.current = setTimeout(() => {
        setRoundTime(prev => prev - 1)
      }, 1000)
    } else if (roundTime === 0 && isGameActive) {
      // Tiempo agotado
      setErrores(prev => prev + 1)
      toast({
        title: "¡Tiempo Agotado! ⏰",
        description: "¡No te preocupes! Inténtalo de nuevo",
        duration: 3000,
        variant: "destructive",
      })
      
      setTimeout(() => {
        generateScene()
      }, 2000)
    }

    return () => {
      if (roundTimer.current) clearTimeout(roundTimer.current)
    }
  }, [isGameActive, roundTime, generateScene, toast, gameState.figures.length])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && gameState.targetFigure) {
      const figureData = figureTypes[gameState.targetFigure]
      toast({
        title: "💡 Pista",
        description: `Busca todas las figuras: ${figureData.name} ${figureData.emoji}`,
        duration: 3000,
      })
    }
  }, [showHint, gameState.targetFigure, toast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setRoundsCompleted(0)
      setCompletedSets([])

      generateScene()
      toast({
        title: "¡Nuevo Desafío! 🔍",
        description: `${detectiveLevels[currentLevel + 1].name}`,
        duration: 3000,
      })
    }
  }, [isLastLevel, aciertos, generateScene, toast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setRoundsCompleted(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setCelebrationParticles([])

    generateScene()
    reiniciar()
    toast({
      title: "¡Nueva Partida! 🔄",
      description: "¡A buscar figuras!",
      duration: 3000,
    })
  }, [generateScene, reiniciar, toast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && gameState.figures.length === 0) {
      generateScene()
    }
  }, [currentGameLevel, gameState.figures.length, generateScene])

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