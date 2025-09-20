import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';

// Configuración de niveles
const construccionLevels = [
  {
    name: "Nivel 1",
    title: "Figuras Básicas",
    description: "Construye triángulos y cuadrados",
    difficulty: "Fácil",
    figuresPerLevel: 2,
    targetFigures: ["triangle", "square"],
    maxPoints: 4,
  },
  {
    name: "Nivel 2",
    title: "Figuras Intermedias",
    description: "Incluye pentágonos y hexágonos",
    difficulty: "Medio", 
    figuresPerLevel: 4,
    targetFigures: ["triangle", "square", "pentagon", "hexagon"],
    maxPoints: 6,
  },
  {
    name: "Nivel 3",
    title: "Figuras Avanzadas",
    description: "Construye cualquier figura geométrica",
    difficulty: "Difícil",
    figuresPerLevel: 6,
    targetFigures: ["triangle", "square", "pentagon", "hexagon", "octagon", "star"],
    maxPoints: 10,
  },
]

const figureTemplates = {
  triangle: {
    name: "Triángulo",
    emoji: "🔺",
    color: "from-red-400 to-red-600",
    points: 3,
    lines: 3,
    description: "Conecta 3 puntos formando un triángulo",
    sound: "¡Como una montaña con tres picos!",
  },
  square: {
    name: "Cuadrado", 
    emoji: "🟦",
    color: "from-blue-400 to-blue-600",
    points: 4,
    lines: 4,
    description: "Conecta 4 puntos formando un cuadrado",
    sound: "¡Cuatro lados iguales como una ventana!",
  },
  pentagon: {
    name: "Pentágono",
    emoji: "⬟",
    color: "from-purple-400 to-purple-600", 
    points: 5,
    lines: 5,
    description: "Conecta 5 puntos formando un pentágono",
    sound: "¡Cinco lados mágicos!",
  },
  hexagon: {
    name: "Hexágono",
    emoji: "⬡",
    color: "from-yellow-400 to-yellow-600",
    points: 6,
    lines: 6,
    description: "Conecta 6 puntos formando un hexágono",
    sound: "¡Como las celdas de las abejas!",
  },
  octagon: {
    name: "Octágono",
    emoji: "🛑",
    color: "from-pink-400 to-pink-600",
    points: 8,
    lines: 8,
    description: "Conecta 8 puntos formando un octágono",
    sound: "¡Ocho lados como una señal de alto!",
  },
  star: {
    name: "Estrella",
    emoji: "⭐",
    color: "from-amber-400 to-amber-600",
    points: 5,
    lines: 5,
    description: "Conecta 5 puntos formando una estrella",
    sound: "¡Brilla como las estrellas del cielo!",
  },
}

interface Point {
  id: number
  x: number
  y: number
  isConnected: boolean
  connections: number[]
  isSelected: boolean
  isFixed: boolean
  isAnimating: boolean
  pulseDelay: number
}

interface Line {
  id: number
  startPoint: number
  endPoint: number
  isComplete: boolean
  isAnimating: boolean
}

interface ConstructionState {
  points: Point[]
  lines: Line[]
  targetFigure: keyof typeof figureTemplates | null
  selectedPoint: number | null
  isComplete: boolean
  currentConnections: number
}

export const useConstruyeFigura = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [constructionState, setConstructionState] = useState<ConstructionState>({
    points: [],
    lines: [],
    targetFigure: null,
    selectedPoint: null,
    isComplete: false,
    currentConnections: 0,
  })
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [figuresCompleted, setFiguresCompleted] = useState(0)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])
  const [encouragementMessage, setEncouragementMessage] = useState("")
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [constructionSparkles, setConstructionSparkles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const pointsRefs = useRef<(HTMLDivElement | null)[]>([])
  const linesRefs = useRef<(SVGLineElement | null)[]>([])
  const progressBarRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  
  // Computed values
  const currentGameLevel = construccionLevels[currentLevel]
  const isLastLevel = currentLevel >= construccionLevels.length - 1
  const isLevelComplete = figuresCompleted >= currentGameLevel.figuresPerLevel
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const isGameActive = !isLevelComplete && !isGameComplete

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

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  // Mensajes de aliento
  const encouragementMessages = [
    "¡Genial! 🌟",
    "¡Eres un constructor increíble! 🏗️",
    "¡Sigue construyendo! 🔧",
    "¡Excelente conexión! ⚡",
    "¡Qué bien lo haces! 👏",
    "¡Eres un artista! 🎨",
    "¡Fantástico! 🎊",
    "¡Lo estás haciendo súper! 🚀"
  ]

  // Crear partículas de celebración
  const createCelebrationParticles = useCallback((x: number, y: number) => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 150,
      y: y + (Math.random() - 0.5) * 150,
      emoji: ['🔧', '⚒️', '🛠️', '⭐', '✨', '🎉'][Math.floor(Math.random() * 6)]
    }))
    
    setCelebrationParticles(prev => [...prev, ...particles])
    
    setTimeout(() => {
      setCelebrationParticles(prev => prev.filter(p => !particles.some(np => np.id === p.id)))
    }, 2500)
  }, [])

  // Crear chispas de construcción
  const createConstructionSparkles = useCallback((x: number, y: number) => {
    const sparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 50,
      y: y + (Math.random() - 0.5) * 50,
    }))
    
    setConstructionSparkles(prev => [...prev, ...sparkles])
    
    setTimeout(() => {
      setConstructionSparkles(prev => prev.filter(s => !sparkles.some(ns => ns.id === s.id)))
    }, 1000)
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

  // Generar puntos para construcción
  const generateConstructionArea = useCallback(() => {
    const level = currentGameLevel
    const targetFigures = level.targetFigures
    const targetFigure = targetFigures[Math.floor(Math.random() * targetFigures.length)] as keyof typeof figureTemplates
    const template = figureTemplates[targetFigure]
    
    const points: Point[] = []
    const maxPoints = Math.min(level.maxPoints, template.points + 2) // Algunos puntos extra

    // Dimensiones del área de construcción adaptadas a pantalla
    const canvasWidth = isTouchDevice ? 280 : 400
    const canvasHeight = isTouchDevice ? 280 : 350
    const centerX = canvasWidth / 2
    const centerY = canvasHeight / 2
    const minDistance = isTouchDevice ? 60 : 80 // Distancia mínima entre puntos

    // Generar puntos necesarios para la figura objetivo
    for (let i = 0; i < template.points; i++) {
      const angle = (i * 2 * Math.PI) / template.points
      const radius = isTouchDevice ? 80 : 120
      
      points.push({
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        isConnected: false,
        connections: [],
        isSelected: false,
        isFixed: false,
        isAnimating: false,
        pulseDelay: i * 0.2,
      })
    }

    // Agregar puntos adicionales (distractores) con mejor distribución
    for (let i = template.points; i < maxPoints; i++) {
      let x: number, y: number
      let attempts = 0
      const maxAttempts = 50
      
      // Intentar encontrar una posición que no esté muy cerca de otros puntos
      do {
        x = 40 + Math.random() * (canvasWidth - 80)
        y = 40 + Math.random() * (canvasHeight - 80)
        attempts++
      } while (
        attempts < maxAttempts &&
        points.some(point => {
          const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2)
          return distance < minDistance
        })
      )
      
      points.push({
        id: i,
        x,
        y,
        isConnected: false,
        connections: [],
        isSelected: false,
        isFixed: false,
        isAnimating: false,
        pulseDelay: i * 0.2,
      })
    }

    setConstructionState({
      points,
      lines: [],
      targetFigure,
      selectedPoint: null,
      isComplete: false,
      currentConnections: 0,
    })
  }, [currentGameLevel, isTouchDevice])

  // Manejar click en punto
  const handlePointClick = useCallback((pointId: number, event?: React.MouseEvent | React.TouchEvent) => {
    if (!isGameActive || constructionState.isComplete) return

    const point = constructionState.points.find(p => p.id === pointId)
    if (!point) return

    // Obtener posición para efectos
    let x = 200, y = 200
    if (event && 'clientX' in event) {
      x = event.clientX
      y = event.clientY
    } else if (event && 'touches' in event && event.touches[0]) {
      x = event.touches[0].clientX
      y = event.touches[0].clientY
    }

    if (constructionState.selectedPoint === null) {
      // Seleccionar primer punto
      setConstructionState(prev => ({
        ...prev,
        selectedPoint: pointId,
        points: prev.points.map(p => 
          p.id === pointId ? { ...p, isSelected: true, isAnimating: true } : { ...p, isSelected: false, isAnimating: false }
        ),
      }))
      
      createConstructionSparkles(point.x, point.y)
      toast({
        title: "¡Punto seleccionado! 🎯",
        description: "Ahora toca otro punto para conectar",
        duration: 3000,
      })
    } else if (constructionState.selectedPoint === pointId) {
      // Deseleccionar punto
      setConstructionState(prev => ({
        ...prev,
        selectedPoint: null,
        points: prev.points.map(p => ({ ...p, isSelected: false, isAnimating: false })),
      }))
    } else {
      // Conectar puntos
      const selectedPoint = constructionState.selectedPoint
      const newLineId = constructionState.lines.length
      
      // Verificar si ya existe una línea entre estos puntos
      const existingLine = constructionState.lines.find(line => 
        (line.startPoint === selectedPoint && line.endPoint === pointId) ||
        (line.startPoint === pointId && line.endPoint === selectedPoint)
      )

      if (existingLine) {
        toast({
          title: "¡Ya conectado! 🔗",
          description: "Estos puntos ya están conectados",
          duration: 3000,
        })
        return
      }

      const newLine: Line = {
        id: newLineId,
        startPoint: selectedPoint,
        endPoint: pointId,
        isComplete: true,
        isAnimating: true,
      }

      setConstructionState(prev => {
        const updatedPoints = prev.points.map(p => {
          if (p.id === selectedPoint) {
            return { ...p, connections: [...p.connections, pointId], isConnected: true, isSelected: false, isAnimating: false }
          }
          if (p.id === pointId) {
            return { ...p, connections: [...p.connections, selectedPoint], isConnected: true }
          }
          return { ...p, isSelected: false, isAnimating: false }
        })

        const newLines = [...prev.lines, newLine]
        const newConnectionCount = prev.currentConnections + 1

        return {
          ...prev,
          points: updatedPoints,
          lines: newLines,
          selectedPoint: null,
          currentConnections: newConnectionCount,
        }
      })

      createConstructionSparkles(x, y)
      showEncouragementMessage()

      // Verificar si la figura está completa
      const template = figureTemplates[constructionState.targetFigure!]
      if (constructionState.currentConnections + 1 >= template.lines) {
        setTimeout(() => {
          setAciertos(prev => prev + 1)
          setFiguresCompleted(prev => prev + 1)
          toast({
            title: "¡Figura completada! 🎉",
            description: template.sound,
            duration: 3000,
          })
          createCelebrationParticles(x, y)
          
          setConstructionState(prev => ({ ...prev, isComplete: true }))
          
          // Verificar si el nivel está completo
          if (figuresCompleted + 1 >= currentGameLevel.figuresPerLevel) {
            setCompletedSets([{ id: currentGameLevel.figuresPerLevel }])
            toast({
              title: "¡Nivel completado! 🏆",
              description: "¡Eres un constructor increíble!",
              duration: 3000,
            })
          } else {
            // Nueva figura
            setTimeout(() => {
              generateConstructionArea()
            }, 2500)
          }
        }, 500)
      }
    }
  }, [isGameActive, constructionState, figuresCompleted, currentGameLevel, currentLevel, generateConstructionArea, toast, showEncouragementMessage, createCelebrationParticles, createConstructionSparkles])

  // Remover línea
  const handleRemoveLine = useCallback((lineId: number) => {
    const line = constructionState.lines.find(l => l.id === lineId)
    if (!line) return

    setConstructionState(prev => ({
      ...prev,
      lines: prev.lines.filter(l => l.id !== lineId),
      points: prev.points.map(p => {
        if (p.id === line.startPoint) {
          const newConnections = p.connections.filter(c => c !== line.endPoint)
          return { ...p, connections: newConnections, isConnected: newConnections.length > 0 }
        }
        if (p.id === line.endPoint) {
          const newConnections = p.connections.filter(c => c !== line.startPoint)
          return { ...p, connections: newConnections, isConnected: newConnections.length > 0 }
        }
        return p
      }),
      currentConnections: prev.currentConnections - 1,
      isComplete: false,
    }))

    toast({
      title: "🗑️ Línea eliminada",
      description: "Puedes intentar de nuevo",
      duration: 3000,
    })
  }, [constructionState.lines, toast])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && constructionState.targetFigure) {
      const template = figureTemplates[constructionState.targetFigure]
      toast({
        title: "💡 Pista",
        description: `${template.description}`,
        duration: 4000,
      })
    }
  }, [showHint, constructionState.targetFigure, toast])

  // Limpiar construcción
  const handleClearConstruction = useCallback(() => {
    setConstructionState(prev => ({
      ...prev,
      lines: [],
      points: prev.points.map(p => ({
        ...p,
        isConnected: false,
        connections: [],
        isSelected: false,
        isAnimating: false,
      })),
      selectedPoint: null,
      currentConnections: 0,
      isComplete: false,
    }))
    toast({
      title: "🧹 ¡Limpio!",
      description: "Puedes empezar de nuevo",
      duration: 3000,
    })
  }, [toast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < construccionLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setFiguresCompleted(0)
      setCompletedSets([])

      generateConstructionArea()
      toast({
        title: "¡Nuevo Desafío! 🔧",
        description: `${construccionLevels[newLevel].name}`,
        duration: 3000,
      })
    }
  }, [currentLevel, aciertos, generateConstructionArea, toast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setFiguresCompleted(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setCelebrationParticles([])
    setConstructionSparkles([])

    generateConstructionArea()
    reiniciar()
    toast({
      title: "¡Nueva Partida! 🔄",
      description: "¡A construir figuras!",
      duration: 3000,
    })
  }, [generateConstructionArea, reiniciar, toast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && constructionState.points.length === 0) {
      generateConstructionArea()
    }
  }, [currentGameLevel, constructionState.points.length, generateConstructionArea])

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    constructionState,
    aciertos,
    errores,
    figuresCompleted,
    estrellas,
    onprogress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showHint,
    gameContainerRef,
    canvasRef,
    tiempoFinal,
    figureTemplates,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,
    constructionSparkles,

    // Refs
    pointsRefs,
    linesRefs,
    progressBarRef,

    // Game actions
    handlePointClick,
    handleRemoveLine,
    handleNextLevel,
    handleRestart,
    toggleHint,
    handleClearConstruction,
  }
}