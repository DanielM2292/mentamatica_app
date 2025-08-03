import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from "../useEnviarResultados"
import { convertirErrores } from "@/services/convertidorEstrellas"

// Configuración de niveles basada en desarrollo cognitivo infantil
const rompePinataLevels = [
  {
    name: "Nivel 1",
    title: "Primeras Multiplicaciones",
    description: "Tablas del 2 y 3",
    difficulty: "Fácil",
    tables: [2, 3],
    maxMultiplier: 5,
    piñatasPerLevel: 4,
    timeLimit: 60,
  },
  {
    name: "Nivel 2",
    title: "Multiplicaciones Básicas",
    description: "Tablas del 2, 3 y 4",
    difficulty: "Medio",
    tables: [2, 3, 4],
    maxMultiplier: 7,
    piñatasPerLevel: 6,
    timeLimit: 90,
  },
  {
    name: "Nivel 3",
    title: "Desafio Multiplicativo",
    description: "Tablas del 2 al 5",
    difficulty: "Difícil",
    tables: [2, 3, 4, 5],
    maxMultiplier: 10,
    piñatasPerLevel: 8,
    timeLimit: 120,
  },
]

interface Pinata {
  id: number
  x: number
  y: number
  result: number
  isCorrect: boolean
  isHit: boolean
  isAnimating: boolean
  color: string
  emoji: string
  scale: number
  rotation: number
}

interface Problem {
  multiplicand: number
  multiplier: number
  result: number
  expression: string
}

// Colores basados en teoría del color para estimulación cognitiva
const piñataColors = [
  { bg: "from-pink-400 to-pink-600", border: "border-pink-700", emoji: "🎉" },
  { bg: "from-purple-400 to-purple-600", border: "border-purple-700", emoji: "🎊" },
  { bg: "from-blue-400 to-blue-600", border: "border-blue-700", emoji: "🎈" },
  { bg: "from-green-400 to-green-600", border: "border-green-700", emoji: "🎁" },
  { bg: "from-yellow-400 to-yellow-600", border: "border-yellow-700", emoji: "⭐" },
  { bg: "from-red-400 to-red-600", border: "border-red-700", emoji: "🎯" },
  { bg: "from-indigo-400 to-indigo-600", border: "border-indigo-700", emoji: "🎪" },
  { bg: "from-teal-400 to-teal-600", border: "border-teal-700", emoji: "🎭" },
]

// Función para generar problemas únicos
const generateUniqueProblems = (level: any, count: number): Problem[] => {
  const problems: Problem[] = []
  const usedProblems = new Set<string>()

  while (problems.length < count) {
    const table = level.tables[Math.floor(Math.random() * level.tables.length)]
    const multiplier = Math.floor(Math.random() * level.maxMultiplier) + 1
    const problemKey = `${table}x${multiplier}`

    if (!usedProblems.has(problemKey)) {
      usedProblems.add(problemKey)
      problems.push({
        multiplicand: table,
        multiplier,
        result: table * multiplier,
        expression: `${table} × ${multiplier}`,
      })
    }
  }

  return problems
}

export const useRompePinata = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null)
  const [levelProblems, setLevelProblems] = useState<Problem[]>([])
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [pinatas, setPinatas] = useState<Pinata[]>([])
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [piñatasRotas, setPiñatasRotas] = useState(0)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [hitAnimations, setHitAnimations] = useState<Set<number>>(new Set())

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values - SIGUIENDO EL PATRÓN DE useConstruyeFiguras
  const currentGameLevel = rompePinataLevels[currentLevel]
  const isLastLevel = currentLevel >= rompePinataLevels.length - 1
  const isLevelComplete = piñatasRotas >= currentGameLevel.piñatasPerLevel
  const isGameComplete = isLastLevel && isLevelComplete
  const isGameActive = !isLevelComplete && !isGameComplete
  const estrellas = convertirErrores(errores)
  const progress = (piñatasRotas / currentGameLevel.piñatasPerLevel) * 100

  // ENVIAR RESULTADOS - COLOCADO EN LA MISMA POSICIÓN QUE useConstruyeFiguras
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

  // Toast function optimizado para evitar spam
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

  // Generar problemas únicos para el nivel
  const generateLevelProblems = useCallback(() => {
    const problems = generateUniqueProblems(currentGameLevel, currentGameLevel.piñatasPerLevel)
    setLevelProblems(problems)
    setCurrentProblemIndex(0)
    return problems[0]
  }, [currentGameLevel])

  // Obtener siguiente problema
  const getNextProblem = useCallback(() => {
    const nextIndex = currentProblemIndex + 1
    if (nextIndex < levelProblems.length) {
      setCurrentProblemIndex(nextIndex)
      return levelProblems[nextIndex]
    }
    return null
  }, [currentProblemIndex, levelProblems])

  // Generar piñatas con posicionamiento cognitivamente óptimo
  const generatePinatas = useCallback((problem: Problem) => {
    const newPinatas: Pinata[] = []
    const correctAnswer = problem.result

    // Generar respuestas incorrectas estratégicamente
    const wrongAnswers = new Set<number>()

    // Errores comunes en multiplicación (neurociencia educativa)
    wrongAnswers.add(correctAnswer + problem.multiplicand) // Suma en lugar de multiplicar
    wrongAnswers.add(correctAnswer - problem.multiplicand) // Error de cálculo
    wrongAnswers.add(problem.multiplicand + problem.multiplier) // Suma los factores
    wrongAnswers.add(correctAnswer + 1) // Error por uno
    wrongAnswers.add(correctAnswer - 1) // Error por uno

    // Añadir más respuestas aleatorias si es necesario
    while (wrongAnswers.size < 3) {
      const randomWrong = Math.floor(Math.random() * 50) + 1
      if (randomWrong !== correctAnswer && randomWrong > 0) {
        wrongAnswers.add(randomWrong)
      }
    }

    const allAnswers = [correctAnswer, ...Array.from(wrongAnswers).slice(0, 3)]

    // Mezclar respuestas
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]]
    }

    // Posiciones más variadas y dinámicas
    const positions = [
      { x: 15 + Math.random() * 10, y: 20 + Math.random() * 10 }, // Superior izquierda
      { x: 65 + Math.random() * 10, y: 20 + Math.random() * 10 }, // Superior derecha
      { x: 15 + Math.random() * 10, y: 60 + Math.random() * 10 }, // Inferior izquierda
      { x: 65 + Math.random() * 10, y: 60 + Math.random() * 10 }, // Inferior derecha
    ]

    // Crear piñatas con posicionamiento espacial óptimo
    allAnswers.forEach((answer, index) => {
      const colorIndex = Math.floor(Math.random() * piñataColors.length)
      const color = piñataColors[colorIndex]
      const position = positions[index] || { x: 40 + Math.random() * 20, y: 40 + Math.random() * 20 }

      newPinatas.push({
        id: index,
        x: position.x,
        y: position.y,
        result: answer,
        isCorrect: answer === correctAnswer,
        isHit: false,
        isAnimating: false,
        color: color.bg,
        emoji: color.emoji,
        scale: 0.9 + Math.random() * 0.2, // Variación en tamaño
        rotation: Math.random() * 30 - 15, // Rotación más variada
      })
    })

    return newPinatas
  }, [])

  // Manejar golpe a piñata con feedback neurológico
  const handlePinataHit = useCallback((piñataId: number) => {
    if (!isGameActive || !currentProblem) return

    const piñata = pinatas.find(p => p.id === piñataId)
    if (!piñata || piñata.isHit) return

    // Marcar inmediatamente como golpeada para evitar doble conteo
    setPinatas(prev => prev.map(p =>
      p.id === piñataId
        ? { ...p, isHit: true, isAnimating: true, scale: p.scale * 1.4 }
        : p
    ))

    // Animación de golpe inmediata mejorada
    setHitAnimations(prev => new Set([...prev, piñataId]))

    setTimeout(() => {
      setHitAnimations(prev => {
        const newSet = new Set(prev)
        newSet.delete(piñataId)
        return newSet
      })

      if (piñata.isCorrect) {
        // Respuesta correcta - feedback positivo inmediato
        setPinatas(prev => prev.map(p =>
          p.id === piñataId
            ? { ...p, isAnimating: false }
            : p
        ))

        setAciertos(prev => prev + 1)
        const newPiñatasRotas = piñatasRotas + 1
        setPiñatasRotas(newPiñatasRotas)
        setCombo(prev => prev + 1)
        setMaxCombo(prev => Math.max(prev, combo + 1))
        setShowCelebration(true)

        // Feedback auditivo simulado con toast
        const celebrationMessages = [
          "¡Piñata rota! 🎉",
          "¡Perfecto! 🎊",
          "¡Excelente! ⭐",
          "¡Fantástico! 🎯",
          "¡Increíble! 🌟",
          "¡Genial! 🚀"
        ]
        const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)]
        showToast(randomMessage, `${currentProblem.expression} = ${currentProblem.result}`)

        setTimeout(() => setShowCelebration(false), 1500)

        // LÓGICA DE FINALIZACIÓN MEJORADA - SIGUIENDO EL PATRÓN DE useConstruyeFiguras
        if (newPiñatasRotas >= currentGameLevel.piñatasPerLevel) {
          // Marcar nivel como completado
          setCompletedSets([{ id: currentGameLevel.piñatasPerLevel }])
          
          if (isLastLevel) {
            // Es el último nivel - finalizamos el juego completamente
            showToast("¡Juego Completado! 🏆🎉", `¡Has completado todos los niveles!`)
          } else {
            // No es el último nivel - solo completamos el nivel actual
            showToast("¡Nivel Completado! 🏆", `¡Rompiste todas las piñatas!`)
          }
        } else {
          // Generar nuevo problema después de un breve delay
          setTimeout(() => {
            const nextProblem = getNextProblem()
            if (nextProblem) {
              setCurrentProblem(nextProblem)
              setPinatas(generatePinatas(nextProblem))
            }
          }, 1500)
        }
      } else {
        // Respuesta incorrecta - feedback correctivo
        // Restaurar el estado de la piñata para permitir otro intento
        setPinatas(prev => prev.map(p =>
          p.id === piñataId
            ? { ...p, isHit: false, isAnimating: false, scale: p.scale * 0.7 }
            : p
        ))

        setErrores(prev => prev + 1)
        setCombo(0) // Resetear combo

        const errorMessages = [
          "¡Ups! 😅",
          "¡Inténtalo de nuevo! 🤔",
          "¡Casi! 😊",
          "¡Sigue intentando! 💪"
        ]
        const randomErrorMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)]
        showToast(randomErrorMessage, "Esa no es la piñata correcta", "destructive")

        // Restaurar escala después de feedback
        setTimeout(() => {
          setPinatas(prev => prev.map(p =>
            p.id === piñataId
              ? { ...p, scale: p.scale / 0.7 }
              : p
          ))
        }, 800)
      }
    }, 400)
  }, [isGameActive, currentProblem, pinatas, piñatasRotas, currentGameLevel, combo, showToast, isLastLevel, getNextProblem, generatePinatas])

  // MANEJAR SIGUIENTE NIVEL - SIGUIENDO EL PATRÓN DE useConstruyeFiguras
  const handleNextLevel = useCallback(() => {
    if (currentLevel < rompePinataLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setPiñatasRotas(0)
      setCombo(0)
      setCompletedSets([])

      const newProblems = generateUniqueProblems(rompePinataLevels[newLevel], rompePinataLevels[newLevel].piñatasPerLevel)
      setLevelProblems(newProblems)
      setCurrentProblemIndex(0)
      const firstProblem = newProblems[0]

      setCurrentProblem(firstProblem)
      setPinatas(generatePinatas(firstProblem))

      showToast("¡Nuevo Desafío! 🎪", `${rompePinataLevels[newLevel].name}`)
    }
  }, [currentLevel, aciertos, generatePinatas, showToast])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setPiñatasRotas(0)
    setAciertos(0)
    setErrores(0)
    setCombo(0)
    setMaxCombo(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)

    // Generar nuevos problemas
    const newProblems = generateUniqueProblems(rompePinataLevels[0], rompePinataLevels[0].piñatasPerLevel)
    setLevelProblems(newProblems)
    setCurrentProblemIndex(0)
    const firstProblem = newProblems[0]

    setCurrentProblem(firstProblem)
    setPinatas(generatePinatas(firstProblem))

    reiniciar()
    showToast("¡Nueva Fiesta! 🎉", "¡A romper piñatas!")
  }, [generatePinatas, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem) {
      const firstProblem = generateLevelProblems()
      setCurrentProblem(firstProblem)
      setPinatas(generatePinatas(firstProblem))
    }
  }, [currentGameLevel, currentProblem, generateLevelProblems, generatePinatas])

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

  return {
    currentLevel,
    currentProblem,
    pinatas,
    aciertos,
    errores,
    piñatasRotas,
    combo,
    maxCombo,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showCelebration,
    gameContainerRef,
    tiempoFinal,
        
    handlePinataHit,
    handleNextLevel,
    handleRestart,
  }
}