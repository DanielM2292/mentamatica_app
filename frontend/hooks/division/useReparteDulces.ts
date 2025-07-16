import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles basada en desarrollo cognitivo
const reparteDulcesLevels = [
  {
    name: "Nivel 1 - Reparto Básico",
    description: "Divide entre 2 y 3 personajes",
    difficulty: "Fácil",
    divisors: [2, 3],
    maxDividend: 12,
    problemsPerLevel: 6,
  },
  {
    name: "Nivel 2 - Reparto Intermedio",
    description: "Divide entre 2, 3 y 4 personajes",
    difficulty: "Medio",
    divisors: [2, 3, 4],
    maxDividend: 20,
    problemsPerLevel: 8,
  },
  {
    name: "Nivel 3 - Reparto Avanzado",
    description: "Divide entre 2 al 5 personajes",
    difficulty: "Difícil",
    divisors: [2, 3, 4, 5],
    maxDividend: 30,
    problemsPerLevel: 10,
  },
]

interface Character {
  id: number
  name: string
  emoji: string
  color: string
  receivedCandies: Candy[]
  expectedAmount: number
}

interface Candy {
  id: number
  emoji: string
  color: string
  x: number
  y: number
  isDragging: boolean
  isPlaced: boolean
  characterId?: number
}

interface Problem {
  dividend: number
  divisor: number
  quotient: number
  remainder: number
  expression: string
  totalCandies: number
}

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

// Personajes adorables para niños
const characters = [
  { name: "Luna", emoji: "🐱", color: "from-pink-400 to-pink-600" },
  { name: "Sol", emoji: "🐶", color: "from-yellow-400 to-yellow-600" },
  { name: "Estrella", emoji: "🐰", color: "from-purple-400 to-purple-600" },
  { name: "Nube", emoji: "🐻", color: "from-blue-400 to-blue-600" },
  { name: "Arco", emoji: "🦊", color: "from-orange-400 to-orange-600" },
]

// Tipos de dulces
const candyTypes = [
  { emoji: "🍭", color: "from-red-400 to-red-600" },
  { emoji: "🍬", color: "from-green-400 to-green-600" },
  { emoji: "🧁", color: "from-blue-400 to-blue-600" },
  { emoji: "🍪", color: "from-yellow-400 to-yellow-600" },
  { emoji: "🍩", color: "from-purple-400 to-purple-600" },
]

export const useReparteDulces = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [characters_state, setCharacters] = useState<Character[]>([])
  const [candies, setCandies] = useState<Candy[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [problemsCompleted, setProblemsCompleted] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [selectedCandy, setSelectedCandy] = useState(0)
  const [draggedCandy, setDraggedCandy] = useState<number | null>(null)
  const [showHint, setShowHint] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = reparteDulcesLevels[currentLevel]
  const isLastLevel = currentLevel >= reparteDulcesLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (problemsCompleted / currentGameLevel.problemsPerLevel) * 100

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
      remainder: 0, // Solo divisiones exactas para simplicidad
      expression: `${dividend} ÷ ${divisor}`,
      totalCandies: dividend,
    }
  }, [currentGameLevel])

  // Generar personajes
  const generateCharacters = useCallback((problem: Problem) => {
    const chars: Character[] = []
    
    for (let i = 0; i < problem.divisor; i++) {
      const character = characters[i]
      chars.push({
        id: i,
        name: character.name,
        emoji: character.emoji,
        color: character.color,
        receivedCandies: [],
        expectedAmount: problem.quotient,
      })
    }
    
    return chars
  }, [])

  // Generar dulces
  const generateCandies = useCallback((problem: Problem) => {
    const candyList: Candy[] = []
    const candyType = candyTypes[selectedCandy]
    
    for (let i = 0; i < problem.totalCandies; i++) {
      candyList.push({
        id: i,
        emoji: candyType.emoji,
        color: candyType.color,
        x: 20 + (i % 6) * 12, // Distribución en grid
        y: 20 + Math.floor(i / 6) * 15,
        isDragging: false,
        isPlaced: false,
      })
    }
    
    return candyList
  }, [selectedCandy])

  // Manejar inicio de arrastre
  const handleDragStart = useCallback((candyId: number) => {
    setDraggedCandy(candyId)
    setCandies(prev => prev.map(candy => 
      candy.id === candyId ? { ...candy, isDragging: true } : candy
    ))
  }, [])

  // Manejar drop en personaje
  const handleDropOnCharacter = useCallback((characterId: number, candyId: number) => {
    if (!currentProblem) return

    const candy = candies.find(c => c.id === candyId)
    const character = characters_state.find(c => c.id === characterId)
    
    if (!candy || !character || candy.isPlaced) return

    // Verificar si el personaje ya tiene suficientes dulces
    if (character.receivedCandies.length >= character.expectedAmount) {
      showToast("¡Ya tiene suficientes! 🍭", `${character.name} ya tiene todos sus dulces`)
      return
    }

    // Colocar dulce con el personaje
    setCandies(prev => prev.map(c => 
      c.id === candyId ? { ...c, isPlaced: true, characterId, isDragging: false } : c
    ))

    setCharacters(prev => prev.map(c => {
      if (c.id === characterId) {
        const newReceivedCandies = [...c.receivedCandies, candy]
        return { ...c, receivedCandies: newReceivedCandies }
      }
      return c
    }))

    setDraggedCandy(null)

    // Verificar si el problema está completo
    const updatedCharacters = characters_state.map(c => {
      if (c.id === characterId) {
        const newReceivedCandies = [...c.receivedCandies, candy]
        return { ...c, receivedCandies: newReceivedCandies }
      }
      return c
    })

    const allCharactersComplete = updatedCharacters.every(c => c.receivedCandies.length === c.expectedAmount)
    
    if (allCharactersComplete) {
      setAciertos(prev => prev + 1)
      setProblemsCompleted(prev => prev + 1)
      
      showToast("¡Perfecto! 🎉", `${currentProblem.expression} = ${currentProblem.quotient}`)
      
      // Verificar si el nivel está completo
      if (problemsCompleted + 1 >= currentGameLevel.problemsPerLevel) {
        setTimeout(() => {
          setIsLevelComplete(true)
          setIsGameActive(false)
          setCompletedSets([{ id: currentLevel }])
          showToast("¡Nivel Completado! 🏆", "¡Excelente reparto de dulces!")
        }, 1500)
      } else {
        // Generar nuevo problema
        setTimeout(() => {
          const newProblem = generateProblem()
          setCurrentProblem(newProblem)
          setCharacters(generateCharacters(newProblem))
          setCandies(generateCandies(newProblem))
          setSelectedCandy(Math.floor(Math.random() * candyTypes.length))
        }, 2000)
      }
    }
  }, [currentProblem, candies, characters_state, problemsCompleted, currentGameLevel, currentLevel, generateProblem, generateCharacters, generateCandies, showToast])

  // Remover dulce de personaje
  const handleRemoveFromCharacter = useCallback((candyId: number) => {
    const candy = candies.find(c => c.id === candyId)
    if (!candy || !candy.isPlaced) return

    setCandies(prev => prev.map(c => 
      c.id === candyId ? { ...c, isPlaced: false, characterId: undefined, isDragging: false } : c
    ))

    setCharacters(prev => prev.map(c => ({
      ...c,
      receivedCandies: c.receivedCandies.filter(candy => candy.id !== candyId),
    })))
  }, [candies])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && currentProblem) {
      showToast("💡 Pista", `Cada personaje debe recibir exactamente ${currentProblem.quotient} dulces`)
    }
  }, [showHint, currentProblem, showToast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < reparteDulcesLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setProblemsCompleted(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      
      const newProblem = generateProblem()
      setCurrentProblem(newProblem)
      setCharacters(generateCharacters(newProblem))
      setCandies(generateCandies(newProblem))
      setSelectedCandy(Math.floor(Math.random() * candyTypes.length))
      setIsGameActive(true)

      showToast("¡Nuevo Desafío! 🍭", `${reparteDulcesLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateProblem, generateCharacters, generateCandies, showToast, detener])

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
    setDraggedCandy(null)
    
    const newProblem = generateProblem()
    setCurrentProblem(newProblem)
    setCharacters(generateCharacters(newProblem))
    setCandies(generateCandies(newProblem))
    setSelectedCandy(Math.floor(Math.random() * candyTypes.length))
    setIsGameActive(true)

    reiniciar()
    showToast("¡Nueva Partida! 🔄", "¡A repartir dulces!")
  }, [generateProblem, generateCharacters, generateCandies, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem) {
      const newProblem = generateProblem()
      setCurrentProblem(newProblem)
      setCharacters(generateCharacters(newProblem))
      setCandies(generateCandies(newProblem))
      setSelectedCandy(Math.floor(Math.random() * candyTypes.length))
      setIsGameActive(true)
    }
  }, [currentGameLevel, currentProblem, generateProblem, generateCharacters, generateCandies])

  // Enviar resultados
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const urlParts = window.location.pathname.split("/")
      const actividad = urlParts[urlParts.length - 1]

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
    currentProblem,
    characters: characters_state,
    candies,
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
    selectedCandy,
    draggedCandy,
    gameContainerRef,
    tiempoFinal,
    candyTypes,

    // Game actions
    handleDragStart,
    handleDropOnCharacter,
    handleRemoveFromCharacter,
    handleNextLevel,
    handleRestart,
    toggleHint,
  }
}