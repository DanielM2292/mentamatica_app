import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles
const construccionLevels = [
  {
    name: "Nivel 1 - Figuras Básicas",
    description: "Construye triángulos y cuadrados",
    difficulty: "Fácil",
    figuresPerLevel: 4,
    targetFigures: ["triangle", "square"],
    maxPoints: 4,
  },
  {
    name: "Nivel 2 - Figuras Intermedias",
    description: "Incluye pentágonos y hexágonos",
    difficulty: "Medio", 
    figuresPerLevel: 6,
    targetFigures: ["triangle", "square", "pentagon", "hexagon"],
    maxPoints: 6,
  },
  {
    name: "Nivel 3 - Figuras Avanzadas",
    description: "Construye cualquier figura geométrica",
    difficulty: "Difícil",
    figuresPerLevel: 8,
    targetFigures: ["triangle", "square", "pentagon", "hexagon", "octagon", "star"],
    maxPoints: 8,
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
    emoji: "🔷",
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

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
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
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
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
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = construccionLevels[currentLevel]
  const isLastLevel = currentLevel >= construccionLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (figuresCompleted / currentGameLevel.figuresPerLevel) * 100

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
    "¡Genial! 🌟",
    "¡Eres un constructor increíble! 🏗️",
    "¡Sigue construyendo! 🔧",
    "¡Excelente conexión! ⚡",
    "¡Qué bien lo haces! 👏",
    "¡Eres un artista! 🎨",
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
    const targetFigure = targetFigures[Math.floor(Math.random() * targetFigures.length)]
    const template = figureTemplates[targetFigure]
    
    const points: Point[] = []
    const maxPoints = Math.min(level.maxPoints, template.points + 3) // Algunos puntos extra

    // Generar puntos necesarios para la figura objetivo
    for (let i = 0; i < template.points; i++) {
      const angle = (i * 2 * Math.PI) / template.points
      const radius = isTouchDevice ? 120 : 150 // Más pequeño para móviles
      const centerX = isTouchDevice ? 150 : 200
      const centerY = isTouchDevice ? 150 : 200
      
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

    // Agregar puntos adicionales (distractores)
    for (let i = template.points; i < maxPoints; i++) {
      points.push({
        id: i,
        x: 80 + Math.random() * (isTouchDevice ? 140 : 240),
        y: 80 + Math.random() * (isTouchDevice ? 140 : 240),
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
      showToast("¡Punto seleccionado! 🎯", "Ahora toca otro punto para conectar")
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
        showToast("¡Ya conectado! 🔗", "Estos puntos ya están unidos")
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
          
          showToast("¡Figura Completada! 🎉", template.sound)
          createCelebrationParticles(x, y)
          
          setConstructionState(prev => ({ ...prev, isComplete: true }))
          
          // Verificar si el nivel está completo
          if (figuresCompleted + 1 >= currentGameLevel.figuresPerLevel) {
            setTimeout(() => {
              setIsLevelComplete(true)
              setIsGameActive(false)
              setCompletedSets([{ id: currentLevel }])
              showToast("¡Nivel Completado! 🏆", "¡Eres un constructor increíble!")
            }, 1500)
          } else {
            // Nueva figura
            setTimeout(() => {
              generateConstructionArea()
            }, 2500)
          }
        }, 500)
      }
    }
  }, [isGameActive, constructionState, figuresCompleted, currentGameLevel, currentLevel, generateConstructionArea, showToast, showEncouragementMessage, createCelebrationParticles, createConstructionSparkles])

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

    showToast("🗑️ Línea eliminada", "Puedes intentar de nuevo")
  }, [constructionState.lines, showToast])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && constructionState.targetFigure) {
      const template = figureTemplates[constructionState.targetFigure]
      showToast("💡 Pista", `${template.description}`)
    }
  }, [showHint, constructionState.targetFigure, showToast])

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
    showToast("🧹 ¡Limpio!", "Puedes empezar de nuevo")
  }, [showToast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < construccionLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setFiguresCompleted(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      setIsGameActive(true)

      generateConstructionArea()
      showToast("¡Nuevo Desafío! 🔧", `${construccionLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateConstructionArea, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setFiguresCompleted(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setIsGameActive(true)
    setCelebrationParticles([])
    setConstructionSparkles([])

    generateConstructionArea()
    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A construir figuras!")
  }, [generateConstructionArea, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && constructionState.points.length === 0) {
      generateConstructionArea()
      setIsGameActive(true)
    }
  }, [currentGameLevel, constructionState.points.length, generateConstructionArea])

  // Enviar resultados
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const actividad = "construye-figura"

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