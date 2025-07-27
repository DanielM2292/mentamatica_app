import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';

// Configuración de niveles basada en narrativa pirata
const divisionTesoroLevels = [
  {
    name: "Nivel 1 - Isla del Tesoro",
    description: "Divisiones básicas entre 2 y 3 piratas",
    difficulty: "Fácil",
    divisors: [2, 3],
    maxDividend: 15,
    problemsPerLevel: 6,
    theme: "island",
  },
  {
    name: "Nivel 2 - Cueva Misteriosa",
    description: "Divisiones entre 2, 3 y 4 piratas",
    difficulty: "Medio",
    divisors: [2, 3, 4],
    maxDividend: 24,
    problemsPerLevel: 8,
    theme: "cave",
  },
  {
    name: "Nivel 3 - Barco Fantasma",
    description: "Divisiones entre 2 al 5 piratas",
    difficulty: "Difícil",
    divisors: [2, 3, 4, 5],
    maxDividend: 35,
    problemsPerLevel: 10,
    theme: "ship",
  },
]

interface TreasureMap {
  id: number
  clue: string
  dividend: number
  divisor: number
  quotient: number
  remainder: number
  isRevealed: boolean
  isCompleted: boolean
  x: number
  y: number
  treasureType: string
}

interface Problem {
  dividend: number
  divisor: number
  quotient: number
  remainder: number
  expression: string
  story: string
}

interface Pirate {
  id: number
  name: string
  emoji: string
  color: string
  receivedCoins: number
  expectedCoins: number
}

// Piratas adorables
const pirates = [
  { name: "Capitán Barba", emoji: "🏴‍☠️", color: "from-red-400 to-red-600" },
  { name: "Luna Dorada", emoji: "👩‍🏴‍☠️", color: "from-purple-400 to-purple-600" },
  { name: "Jack Moneda", emoji: "🦜", color: "from-green-400 to-green-600" },
  { name: "Rosa Marina", emoji: "🧜‍♀️", color: "from-blue-400 to-blue-600" },
  { name: "Tormenta", emoji: "⚡", color: "from-yellow-400 to-yellow-600" },
]

// Tipos de tesoro
const treasureTypes = [
  { name: "monedas de oro", emoji: "🪙", color: "from-yellow-400 to-yellow-600" },
  { name: "gemas brillantes", emoji: "💎", color: "from-blue-400 to-blue-600" },
  { name: "perlas marinas", emoji: "🦪", color: "from-pink-400 to-pink-600" },
  { name: "rubíes rojos", emoji: "💍", color: "from-red-400 to-red-600" },
]

// Historias narrativas
const storyTemplates = [
  "Los piratas encontraron {dividend} {treasure} en un cofre enterrado",
  "El mapa del tesoro reveló {dividend} {treasure} escondidas",
  "En la cueva secreta había {dividend} {treasure} brillantes",
  "El barco fantasma guardaba {dividend} {treasure} misteriosas",
]

export const useDivisionTesoro = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [treasureMaps, setTreasureMaps] = useState<TreasureMap[]>([])
  const [pirates_state, setPiratesState] = useState<Pirate[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [problemsCompleted, setProblemsCompleted] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [selectedTreasure, setSelectedTreasure] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [currentMapIndex, setCurrentMapIndex] = useState(0)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = divisionTesoroLevels[currentLevel]
  const isLastLevel = currentLevel >= divisionTesoroLevels.length - 1
  const isLevelComplete = problemsCompleted >= currentGameLevel.problemsPerLevel
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)
  const progress = (problemsCompleted / currentGameLevel.problemsPerLevel) * 100
  const currentTreasureType = treasureTypes[selectedTreasure]

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

  // Generar problema de división con historia
  const generateProblem = useCallback((): Problem => {
    const level = currentGameLevel
    const divisor = level.divisors[Math.floor(Math.random() * level.divisors.length)]

    // Generar dividendo que sea divisible exactamente
    const quotient = Math.floor(Math.random() * (level.maxDividend / divisor)) + 1
    const dividend = divisor * quotient

    const treasure = treasureTypes[selectedTreasure]
    const storyTemplate = storyTemplates[Math.floor(Math.random() * storyTemplates.length)]
    const story = storyTemplate
      .replace("{dividend}", dividend.toString())
      .replace("{treasure}", treasure.name)

    return {
      dividend,
      divisor,
      quotient,
      remainder: 0,
      expression: `${dividend} ÷ ${divisor}`,
      story,
    }
  }, [currentGameLevel, selectedTreasure])

  // Generar piratas
  const generatePirates = useCallback((problem: Problem) => {
    const pirateList: Pirate[] = []

    for (let i = 0; i < problem.divisor; i++) {
      const pirate = pirates[i]
      pirateList.push({
        id: i,
        name: pirate.name,
        emoji: pirate.emoji,
        color: pirate.color,
        receivedCoins: 0,
        expectedCoins: problem.quotient,
      })
    }

    return pirateList
  }, [])

  // Generar mapas del tesoro
  const generateTreasureMaps = useCallback(() => {
    const maps: TreasureMap[] = []

    for (let i = 0; i < currentGameLevel.problemsPerLevel; i++) {
      const problem = generateProblem()
      maps.push({
        id: i,
        clue: `Mapa ${i + 1}: ${problem.story}`,
        dividend: problem.dividend,
        divisor: problem.divisor,
        quotient: problem.quotient,
        remainder: problem.remainder,
        isRevealed: i === 0, // Solo el primer mapa está revelado
        isCompleted: false,
        x: 20 + (i % 3) * 30,
        y: 20 + Math.floor(i / 3) * 25,
        treasureType: treasureTypes[Math.floor(Math.random() * treasureTypes.length)].emoji,
      })
    }

    return maps
  }, [currentGameLevel, generateProblem])

  // Manejar respuesta
  const handleAnswer = useCallback((answer: string) => {
    if (!currentProblem) return

    const numericAnswer = parseInt(answer)
    const isCorrect = numericAnswer === currentProblem.quotient

    if (isCorrect) {
      setAciertos(prev => prev + 1)
      setProblemsCompleted(prev => prev + 1)

      // Actualizar mapa actual como completado
      setTreasureMaps(prev => prev.map((map, index) =>
        index === currentMapIndex
          ? { ...map, isCompleted: true }
          : map
      ))

      // Distribuir tesoro entre piratas
      setPiratesState(prev => prev.map(pirate => ({
        ...pirate,
        receivedCoins: currentProblem.quotient,
      })))

      showToast("¡Tesoro Encontrado! 🏴‍☠️", `Cada pirata recibe ${currentProblem.quotient} ${currentTreasureType.name}`)

      // Verificar si el nivel está completo
      if (problemsCompleted + 1 >= currentGameLevel.problemsPerLevel) {
        setCompletedSets([{ id: currentLevel }])
        showToast("¡Aventura Completada! 🏆", "¡Todos los tesoros han sido encontrados!")
      } else {
        // Revelar siguiente mapa
        setTimeout(() => {
          const nextMapIndex = currentMapIndex + 1
          setCurrentMapIndex(nextMapIndex)

          setTreasureMaps(prev => prev.map((map, index) =>
            index === nextMapIndex
              ? { ...map, isRevealed: true }
              : map
          ))

          const nextMap = treasureMaps[nextMapIndex]
          if (nextMap) {
            const newProblem = {
              dividend: nextMap.dividend,
              divisor: nextMap.divisor,
              quotient: nextMap.quotient,
              remainder: nextMap.remainder,
              expression: `${nextMap.dividend} ÷ ${nextMap.divisor}`,
              story: nextMap.clue,
            }
            setCurrentProblem(newProblem)
            setPiratesState(generatePirates(newProblem))
          }

          setUserAnswer("")
          setSelectedTreasure(Math.floor(Math.random() * treasureTypes.length))
        }, 2500)
      }
    } else {
      setErrores(prev => prev + 1)
      showToast("¡Pista Incorrecta! 🗺️", `El tesoro no está ahí. Intenta de nuevo.`, "destructive")
    }
  }, [currentProblem, currentMapIndex, problemsCompleted, currentGameLevel, currentLevel, treasureMaps, currentTreasureType, generatePirates, showToast])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      setProblemsCompleted(0)
      setCurrentMapIndex(0)
      setAciertos(0)
      setErrores(0)
      setUserAnswer("")

      const newMaps = generateTreasureMaps()
      setTreasureMaps(newMaps)

      if (newMaps.length > 0) {
        const firstMap = newMaps[0]
        const newProblem = {
          dividend: firstMap.dividend,
          divisor: firstMap.divisor,
          quotient: firstMap.quotient,
          remainder: firstMap.remainder,
          expression: `${firstMap.dividend} ÷ ${firstMap.divisor}`,
          story: firstMap.clue,
        }
        setCurrentProblem(newProblem)
        setPiratesState(generatePirates(newProblem))
      }

      setSelectedTreasure(Math.floor(Math.random() * treasureTypes.length))
      showToast("¡Nueva Aventura! 🏴‍☠️", `${divisionTesoroLevels[currentLevel + 1].name}`)
    }
  }, [isLastLevel, aciertos, generateTreasureMaps, generatePirates, showToast, detener])

  // Manejar input
  const handleInputChange = useCallback((value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    setUserAnswer(numericValue)
  }, [])

  // Manejar envío
  const handleSubmit = useCallback(() => {
    if (userAnswer.trim() !== "") {
      handleAnswer(userAnswer)
    }
  }, [userAnswer, handleAnswer])

  // Toggle hint
  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev)
    if (!showHint && currentProblem) {
      showToast("🗺️ Pista del Mapa", `Divide ${currentProblem.dividend} entre ${currentProblem.divisor} piratas`)
    }
  }, [showHint, currentProblem, showToast])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setProblemsCompleted(0)
    setCurrentMapIndex(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setUserAnswer("")

    const newMaps = generateTreasureMaps()
    setTreasureMaps(newMaps)

    if (newMaps.length > 0) {
      const firstMap = newMaps[0]
      const newProblem = {
        dividend: firstMap.dividend,
        divisor: firstMap.divisor,
        quotient: firstMap.quotient,
        remainder: firstMap.remainder,
        expression: `${firstMap.dividend} ÷ ${firstMap.divisor}`,
        story: firstMap.clue,
      }
      setCurrentProblem(newProblem)
      setPiratesState(generatePirates(newProblem))
    }

    setSelectedTreasure(Math.floor(Math.random() * treasureTypes.length))
    setIsGameActive(true)

    reiniciar()
    showToast("¡Nueva Expedición! 🗺️", "¡A buscar tesoros!")
  }, [generateTreasureMaps, generatePirates, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && treasureMaps.length === 0) {
      const newMaps = generateTreasureMaps()
      setTreasureMaps(newMaps)

      if (newMaps.length > 0) {
        const firstMap = newMaps[0]
        const newProblem = {
          dividend: firstMap.dividend,
          divisor: firstMap.divisor,
          quotient: firstMap.quotient,
          remainder: firstMap.remainder,
          expression: `${firstMap.dividend} ÷ ${firstMap.divisor}`,
          story: firstMap.clue,
        }
        setCurrentProblem(newProblem)
        setPiratesState(generatePirates(newProblem))
      }

      setSelectedTreasure(Math.floor(Math.random() * treasureTypes.length))
      setIsGameActive(true)
    }
  }, [currentGameLevel, treasureMaps.length, generateTreasureMaps, generatePirates])

  // Focus en input
  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isGameActive, currentMapIndex])

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
    treasureMaps,
    pirates: pirates_state,
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
    selectedTreasure,
    currentMapIndex,
    userAnswer,
    gameContainerRef,
    inputRef,
    tiempoFinal,
    treasureTypes,
    currentTreasureType,

    // Game actions
    handleInputChange,
    handleSubmit,
    handleNextLevel,
    handleRestart,
    toggleHint,
  }
}