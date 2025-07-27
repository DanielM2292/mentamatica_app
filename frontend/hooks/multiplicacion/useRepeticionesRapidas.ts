import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from "@/hooks/useEnviarResultados"
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles basada en desarrollo cognitivo
const repeticionesLevels = [
  {
    name: "Nivel 1 - Agrupaciones Básicas",
    description: "Multiplica por 2 y 3",
    difficulty: "Fácil",
    tables: [2, 3],
    maxMultiplier: 4,
    problemsPerLevel: 6,
  },
  {
    name: "Nivel 2 - Grupos Medianos",
    description: "Multiplica por 2, 3 y 4",
    difficulty: "Medio",
    tables: [2, 3, 4],
    maxMultiplier: 6,
    problemsPerLevel: 8,
  },
  {
    name: "Nivel 3 - Agrupaciones Avanzadas",
    description: "Multiplica por 2 al 5",
    difficulty: "Difícil",
    tables: [2, 3, 4, 5],
    maxMultiplier: 8,
    problemsPerLevel: 10,
  },
]

interface DragItem {
  id: number
  type: 'element' | 'group'
  value: number
  x: number
  y: number
  isDragging: boolean
  isPlaced: boolean
  groupId?: number
}

interface DropZone {
  id: number
  expectedCount: number
  placedItems: DragItem[]
  isComplete: boolean
  x: number
  y: number
}

interface Problem {
  multiplicand: number
  multiplier: number
  result: number
  expression: string
  totalElements: number
}

// Elementos visuales para arrastrar
const elementTypes = [
  { emoji: "🍎", color: "from-red-400 to-red-600", name: "manzanas" },
  { emoji: "🍊", color: "from-orange-400 to-orange-600", name: "naranjas" },
  { emoji: "🍌", color: "from-yellow-400 to-yellow-600", name: "plátanos" },
  { emoji: "🍇", color: "from-purple-400 to-purple-600", name: "uvas" },
  { emoji: "🍓", color: "from-pink-400 to-pink-600", name: "fresas" },
  { emoji: "🥕", color: "from-orange-500 to-orange-700", name: "zanahorias" },
]

export const useRepeticionesRapidas = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [dragItems, setDragItems] = useState<DragItem[]>([])
  const [dropZones, setDropZones] = useState<DropZone[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [problemsCompleted, setProblemsCompleted] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [selectedElement, setSelectedElement] = useState(0)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [resultadosEnviados, setResultadosEnviados] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = repeticionesLevels[currentLevel]
  const isLastLevel = currentLevel === repeticionesLevels.length - 1
  const isLevelComplete = completedSets.includes(currentLevel.toString())
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const progress = (problemsCompleted / currentGameLevel?.problemsPerLevel) * 100 || 0

  // Initialize timer
  useEffect(() => {
    iniciar()
  }, [iniciar])

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
        duration: 2000,
        ...(variant && { variant }),
      })
    },
    [toast],
  )

  // Generar problema de multiplicación
  const generateProblem = useCallback((): Problem => {
    const level = currentGameLevel
    const table = level.tables[Math.floor(Math.random() * level.tables.length)]
    const multiplier = Math.floor(Math.random() * level.maxMultiplier) + 1
    const result = table * multiplier
    
    return {
      multiplicand: table,
      multiplier,
      result,
      expression: `${table} × ${multiplier}`,
      totalElements: result,
    }
  }, [currentGameLevel])

  // Generar elementos arrastrables
  const generateDragItems = useCallback((problem: Problem) => {
    const items: DragItem[] = []
    
    // Crear elementos individuales
    for (let i = 0; i < problem.totalElements; i++) {
      items.push({
        id: i,
        type: 'element',
        value: 1,
        x: 20 + (i % 8) * 10, // Distribución en grid
        y: 20 + Math.floor(i / 8) * 15,
        isDragging: false,
        isPlaced: false,
      })
    }
    
    return items
  }, [])

  // Generar zonas de drop
  const generateDropZones = useCallback((problem: Problem) => {
    const zones: DropZone[] = []
    
    // Crear zonas para cada grupo
    for (let i = 0; i < problem.multiplier; i++) {
      zones.push({
        id: i,
        expectedCount: problem.multiplicand,
        placedItems: [],
        isComplete: false,
        x: 20 + i * 25, // Distribución horizontal
        y: 60,
      })
    }
    
    return zones
  }, [])

  // Manejar inicio de arrastre
  const handleDragStart = useCallback((itemId: number) => {
    setDraggedItem(itemId)
    setDragItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isDragging: true } : item
    ))
  }, [])

  // Manejar drop en zona
  const handleDrop = useCallback((zoneId: number, itemId: number) => {
    if (!currentProblem) return

    const item = dragItems.find(i => i.id === itemId)
    const zone = dropZones.find(z => z.id === zoneId)
    
    if (!item || !zone || item.isPlaced) return

    // Verificar si la zona no está llena
    if (zone.placedItems.length >= zone.expectedCount) {
      showToast("¡Grupo lleno! 📦", "Este grupo ya tiene suficientes elementos")
      return
    }

    // Colocar elemento en la zona
    setDragItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, isPlaced: true, groupId: zoneId, isDragging: false } : i
    ))

    setDropZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const newPlacedItems = [...z.placedItems, item]
        const isComplete = newPlacedItems.length === z.expectedCount
        return { ...z, placedItems: newPlacedItems, isComplete }
      }
      return z
    }))

    setDraggedItem(null)

    // Verificar si el problema está completo
    const updatedZones = dropZones.map(z => {
      if (z.id === zoneId) {
        const newPlacedItems = [...z.placedItems, item]
        return { ...z, placedItems: newPlacedItems, isComplete: newPlacedItems.length === z.expectedCount }
      }
      return z
    })

    const allZonesComplete = updatedZones.every(z => z.isComplete)
    
    if (allZonesComplete) {
      setAciertos(prev => prev + 1)
      const newProblemsCompleted = problemsCompleted + 1
      setProblemsCompleted(newProblemsCompleted)
      
      showToast("¡Perfecto! 🎯", `${currentProblem.expression} = ${currentProblem.result}`)
      
      // Verificar si el nivel está completo
      if (newProblemsCompleted >= currentGameLevel.problemsPerLevel) {
        setTimeout(() => {
          setCompletedSets(prev => [...prev, currentLevel.toString()])
          setIsGameActive(false)
          
          // AÑADIDO: Verificar si es el último nivel completado
          if (isLastLevel) {
            detener()
            showToast("¡Juego Completado! 🏆", "¡Felicidades! Has terminado todos los niveles")
          } else {
            showToast("¡Nivel Completado! 🎉", "¡Excelente trabajo agrupando!")
          }
        }, 1500)
      } else {
        // Generar nuevo problema
        setTimeout(() => {
          const newProblem = generateProblem()
          setCurrentProblem(newProblem)
          setDragItems(generateDragItems(newProblem))
          setDropZones(generateDropZones(newProblem))
          setSelectedElement(Math.floor(Math.random() * elementTypes.length))
        }, 2000)
      }
    }
  }, [currentProblem, dragItems, dropZones, problemsCompleted, currentGameLevel, currentLevel, generateProblem, generateDragItems, generateDropZones, showToast])

  // Remover elemento de zona
  const handleRemoveFromZone = useCallback((itemId: number) => {
    const item = dragItems.find(i => i.id === itemId)
    if (!item || !item.isPlaced) return

    setDragItems(prev => prev.map(i => 
      i.id === itemId ? { ...i, isPlaced: false, groupId: undefined, isDragging: false } : i
    ))

    setDropZones(prev => prev.map(z => ({
      ...z,
      placedItems: z.placedItems.filter(i => i.id !== itemId),
      isComplete: false,
    })))
  }, [dragItems])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && currentProblem) {
      showToast("💡 Pista", `Necesitas ${currentProblem.multiplier} grupos de ${currentProblem.multiplicand} elementos cada uno`)
    }
  }, [showHint, currentProblem, showToast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      // Avanzar al siguiente nivel
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setProblemsCompleted(0)
      setAciertos(0)
      setErrores(0)
      setCompletedSets([])
      
      const newProblem = generateProblem()
      setCurrentProblem(newProblem)
      setDragItems(generateDragItems(newProblem))
      setDropZones(generateDropZones(newProblem))
      setSelectedElement(Math.floor(Math.random() * elementTypes.length))
      setIsGameActive(true)

      showToast("¡Nuevo Desafío! 🎯", `${repeticionesLevels[newLevel].name}`)
    } else {
      // Completar el juego
      setTotalAciertos(prev => prev + aciertos)
      setIsGameActive(false)
      detener()
      showToast("¡Juego Completado! 🏆", "¡Felicidades! Has terminado todos los niveles")
    }
  }, [currentLevel, aciertos, isLastLevel, generateProblem, generateDragItems, generateDropZones, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setProblemsCompleted(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setDraggedItem(null)
    setResultadosEnviados(false)
    
    const newProblem = generateProblem()
    setCurrentProblem(newProblem)
    setDragItems(generateDragItems(newProblem))
    setDropZones(generateDropZones(newProblem))
    setSelectedElement(Math.floor(Math.random() * elementTypes.length))
    setIsGameActive(true)

    reiniciar()
    iniciar()
    showToast("¡Nueva Partida! 🔄", "¡A agrupar elementos!")
  }, [generateProblem, generateDragItems, generateDropZones, reiniciar, iniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem && !isGameComplete) {
      const newProblem = generateProblem()
      setCurrentProblem(newProblem)
      setDragItems(generateDragItems(newProblem))
      setDropZones(generateDropZones(newProblem))
      setSelectedElement(Math.floor(Math.random() * elementTypes.length))
      setIsGameActive(true)
    }
  }, [currentGameLevel, currentProblem, isGameComplete, generateProblem, generateDragItems, generateDropZones])

  // Enviar resultados cuando el juego esté completo
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
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return {
    // Core game state
    currentLevel,
    currentProblem,
    dragItems,
    dropZones,
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
    selectedElement,
    draggedItem,
    gameContainerRef,
    tiempoFinal,
    elementTypes,

    // Game actions
    handleDragStart,
    handleDrop,
    handleRemoveFromZone,
    handleNextLevel,
    handleRestart,
    toggleHint,
  }
}