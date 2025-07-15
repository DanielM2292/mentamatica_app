import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Configuración de niveles basada en desarrollo cognitivo infantil
const rompePinataLevels = [
  {
    name: "Nivel 1 - Primeras Multiplicaciones",
    description: "Tablas del 2 y 3",
    difficulty: "Fácil",
    tables: [2, 3],
    maxMultiplier: 5,
    piñatasPerLevel: 8,
    timeLimit: 60,
  },
  {
    name: "Nivel 2 - Multiplicaciones Básicas",
    description: "Tablas del 2, 3 y 4",
    difficulty: "Medio",
    tables: [2, 3, 4],
    maxMultiplier: 7,
    piñatasPerLevel: 10,
    timeLimit: 90,
  },
  {
    name: "Nivel 3 - Desafío Multiplicativo",
    description: "Tablas del 2 al 5",
    difficulty: "Difícil",
    tables: [2, 3, 4, 5],
    maxMultiplier: 10,
    piñatasPerLevel: 12,
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

const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
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
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = rompePinataLevels[currentLevel]
  const isLastLevel = currentLevel >= rompePinataLevels.length - 1
  const estrellas = convertirErrores(errores)
  const progress = (piñatasRotas / currentGameLevel.piñatasPerLevel) * 100

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

    // Animación de golpe inmediata
    setPinatas(prev => prev.map(p => 
      p.id === piñataId 
        ? { ...p, isAnimating: true, scale: p.scale * 1.3 }
        : p
    ))

    setTimeout(() => {
      if (piñata.isCorrect) {
        // Respuesta correcta - feedback positivo inmediato
        setPinatas(prev => prev.map(p => 
          p.id === piñataId 
            ? { ...p, isHit: true, isAnimating: false }
            : p
        ))
        
        setAciertos(prev => prev + 1)
        setPiñatasRotas(prev => prev + 1)
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
        
        // Verificar si el nivel está completo
        if (piñatasRotas + 1 >= currentGameLevel.piñatasPerLevel) {
          setTimeout(() => {
            setIsLevelComplete(true)
            setIsGameActive(false)
            setCompletedSets([{ id: currentLevel }])
            showToast("¡Nivel Completado! 🏆", `¡Rompiste todas las piñatas!`)
          }, 1000)
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
        setPinatas(prev => prev.map(p => 
          p.id === piñataId 
            ? { ...p, isAnimating: false, scale: p.scale * 0.8 }
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
              ? { ...p, scale: p.scale / 0.8 }
              : p
          ))
        }, 500)
      }
    }, 300) // Delay para percepción de impacto
  }, [isGameActive, currentProblem, pinatas, piñatasRotas, currentGameLevel, combo, getNextProblem, generatePinatas, showToast, currentLevel])

  // Manejar siguiente nivel
  const handleNextLevel = useCallback(() => {
    if (currentLevel < rompePinataLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(newLevel)
      setPiñatasRotas(0)
      setAciertos(0)
      setErrores(0)
      setCombo(0)
      setIsLevelComplete(false)
      setCompletedSets([])
      
      // Generar nuevos problemas para el nivel
      const newProblems = generateUniqueProblems(rompePinataLevels[newLevel], rompePinataLevels[newLevel].piñatasPerLevel)
      setLevelProblems(newProblems)
      setCurrentProblemIndex(0)
      const firstProblem = newProblems[0]
      
      setCurrentProblem(firstProblem)
      setPinatas(generatePinatas(firstProblem))
      setIsGameActive(true)

      showToast("¡Nuevo Desafío! 🎪", `${rompePinataLevels[newLevel].name}`)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generatePinatas, showToast, detener])

  // Reiniciar juego
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setPiñatasRotas(0)
    setAciertos(0)
    setErrores(0)
    setCombo(0)
    setMaxCombo(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
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
    setIsGameActive(true)

    reiniciar()
    showToast("¡Nueva Fiesta! 🎉", "¡A romper piñatas!")
  }, [generatePinatas, reiniciar, showToast])

  // Inicializar juego
  useEffect(() => {
    if (currentGameLevel && !currentProblem) {
      const firstProblem = generateLevelProblems()
      setCurrentProblem(firstProblem)
      setPinatas(generatePinatas(firstProblem))
      setIsGameActive(true)
    }
  }, [currentGameLevel, currentProblem, generateLevelProblems, generatePinatas])

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

    // Game actions
    handlePinataHit,
    handleNextLevel,
    handleRestart,
  }
}