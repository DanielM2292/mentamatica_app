"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"

// Game configuration - following useGameLogic pattern
const numeroCorrectoLevels = [
  { name: "Nivel 1", maxNumber: 10 },
  { name: "Nivel 2", maxNumber: 15 },
  { name: "Nivel 3", maxNumber: 20 },
]

const balloonColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
  "#FF9F43",
  "#C44569",
  "#40739E",
  "#487EB0",
  "#8C7AE6",
  "#00A085",
]

interface Balloon {
  id: string
  number: number
  x: string
  y: string
  color: string
  isPopped: boolean
  isClickable: boolean
  isExploding?: boolean
}

// Utility function - following useGameLogic pattern
const convertirErrores = (errores: number) => {
  return Math.max(1, 5 - Math.floor(errores / 2))
}

export const useNumeroCorrect = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Core game state - following useGameLogic structure
  const [currentLevel, setCurrentLevel] = useState(0)
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [nextExpectedNumber, setNextExpectedNumber] = useState(1)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isLevelComplete, setIsLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [completedSets, setCompletedSets] = useState<any[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const processingBalloons = useRef<Set<string>>(new Set())
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values - following useGameLogic pattern
  const currentGameLevel = numeroCorrectoLevels[currentLevel]
  const isLastLevel = currentLevel >= numeroCorrectoLevels.length - 1
  const estrellas = convertirErrores(errores)

  // Initialize timer - following useGameLogic pattern
  useEffect(() => {
    iniciar()
  }, [iniciar])

  // Función para mostrar toast sin duplicados
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

      // Prevenir toasts duplicados en los últimos 500ms
      if (now - lastToastTime.current < 500 && lastToastMessage.current === message) {
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

  // Balloon generation with optimized positioning
  const generateBalloons = useCallback((count: number): Balloon[] => {
    console.log(`=== GENERANDO ${count} GLOBOS ===`)
    const numbers = Array.from({ length: count }, (_, i) => i + 1)
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5)
    console.log(`Números mezclados: ${shuffledNumbers.join(", ")}`)

    // Optimized positions for different screen sizes
    let positions: { x: string; y: string }[] = []

    if (count === 10) {
      // Nivel 1: Distribución mejorada para todas las pantallas
      positions = [
        { x: "25%", y: "20%" }, // Fila 1
        { x: "50%", y: "18%" },
        { x: "75%", y: "20%" },
        { x: "15%", y: "40%" }, // Fila 2
        { x: "40%", y: "38%" },
        { x: "65%", y: "40%" },
        { x: "85%", y: "38%" },
        { x: "30%", y: "60%" }, // Fila 3
        { x: "55%", y: "58%" },
        { x: "80%", y: "60%" },
      ]
    } else if (count === 15) {
      // Nivel 2: Grid 5x3
      positions = [
        { x: "10%", y: "20%" },
        { x: "30%", y: "18%" },
        { x: "50%", y: "20%" },
        { x: "70%", y: "18%" },
        { x: "90%", y: "20%" },
        { x: "15%", y: "40%" },
        { x: "35%", y: "38%" },
        { x: "55%", y: "40%" },
        { x: "75%", y: "38%" },
        { x: "85%", y: "40%" },
        { x: "20%", y: "60%" },
        { x: "40%", y: "58%" },
        { x: "60%", y: "60%" },
        { x: "80%", y: "58%" },
        { x: "45%", y: "78%" },
      ]
    } else if (count === 20) {
      // Nivel 3: Grid 5x4
      positions = [
        { x: "10%", y: "15%" },
        { x: "30%", y: "13%" },
        { x: "50%", y: "15%" },
        { x: "70%", y: "13%" },
        { x: "90%", y: "15%" },
        { x: "15%", y: "32%" },
        { x: "35%", y: "30%" },
        { x: "55%", y: "32%" },
        { x: "75%", y: "30%" },
        { x: "85%", y: "32%" },
        { x: "20%", y: "50%" },
        { x: "40%", y: "48%" },
        { x: "60%", y: "50%" },
        { x: "80%", y: "48%" },
        { x: "25%", y: "50%" },
        { x: "25%", y: "68%" },
        { x: "45%", y: "66%" },
        { x: "65%", y: "68%" },
        { x: "85%", y: "66%" },
        { x: "50%", y: "78%" },
      ]
    }

    // Crear globos - TODOS son clickeables ahora
    const newBalloons: Balloon[] = []
    for (let i = 0; i < count; i++) {
      const number = shuffledNumbers[i]
      const position = positions[i] || { x: "50%", y: "50%" } // Fallback
      const balloon: Balloon = {
        id: `balloon-${number}-${Date.now()}-${i}`,
        number: number,
        x: position.x,
        y: position.y,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        isPopped: false,
        isClickable: true, // TODOS los globos son clickeables
        isExploding: false,
      }
      newBalloons.push(balloon)
    }

    console.log(`Globos creados: ${newBalloons.length}`)
    console.log("Detalles de globos:", newBalloons.map((b) => `${b.number}:(${b.x},${b.y})`).join(", "))
    return newBalloons
  }, [])

  const createExplosionEffect = useCallback((x: string, y: string, color: string) => {
    if (!gameContainerRef.current) return
    const container = gameContainerRef.current
    const rect = container.getBoundingClientRect()
    const pixelX = (Number.parseFloat(x) / 100) * rect.width
    const pixelY = (Number.parseFloat(y) / 100) * rect.height

    const particles = []
    const particleCount = 15

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const shapes = ["🎉", "⭐", "✨", "💥", "🌟", "🎊", "🔥", "💫"]
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

      particle.innerHTML = randomShape
      particle.style.cssText = `
        position: absolute;
        font-size: ${14 + Math.random() * 10}px;
        left: ${pixelX}px;
        top: ${pixelY}px;
        pointer-events: none;
        z-index: 1000;
        transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform-origin: center;
      `

      container.appendChild(particle)
      particles.push(particle)
    }

    particles.forEach((particle, index) => {
      const angle = (index / particles.length) * Math.PI * 2
      const distance = 80 + Math.random() * 60
      const endX = pixelX + Math.cos(angle) * distance
      const endY = pixelY + Math.sin(angle) * distance

      const timeout = setTimeout(() => {
        particle.style.transform = `translate(${endX - pixelX}px, ${endY - pixelY}px) scale(0) rotate(720deg)`
        particle.style.opacity = "0"

        const removeTimeout = setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 1500)

        animationTimeouts.current.push(removeTimeout)
      }, 100)

      animationTimeouts.current.push(timeout)
    })
  }, [])

  const createErrorEffect = useCallback((balloonElement: HTMLElement) => {
    balloonElement.style.animation = "errorShake 0.6s ease-in-out"
    const timeout = setTimeout(() => {
      balloonElement.style.animation = ""
    }, 600)
    animationTimeouts.current.push(timeout)

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 100])
    }
  }, [])

  // Debounced popBalloon function
  const popBalloon = useCallback(
    (balloonId: string) => {
      console.log(`Intentando explotar globo: ${balloonId}`)

      // Verificación múltiple para prevenir doble procesamiento
      if (processingBalloons.current.has(balloonId)) {
        console.log(`Globo ${balloonId} ya está siendo procesado`)
        return
      }

      // Marcar inmediatamente como en procesamiento
      processingBalloons.current.add(balloonId)
      console.log(`Globo ${balloonId} marcado como en procesamiento`)

      setBalloons((prev) => {
        const balloon = prev.find((b) => b.id === balloonId)
        if (!balloon || balloon.isPopped || balloon.isExploding) {
          console.log(`Globo ${balloonId} no válido para procesar`)
          processingBalloons.current.delete(balloonId)
          return prev
        }

        const currentExpected = nextExpectedNumber
        const isCorrect = balloon.number === currentExpected

        console.log(`Procesando globo ${balloonId}, número: ${balloon.number}, esperado: ${currentExpected}`)

        if (isCorrect) {
          // Acierto - incrementar aciertos aquí UNA SOLA VEZ
          setAciertos((prev) => prev + 1)
          
          // Actualizar globos
          const explodingBalloons = prev.map((b) => {
            if (b.id === balloonId) {
              return { ...b, isExploding: true, isClickable: false }
            }
            return b
          })

          createExplosionEffect(balloon.x, balloon.y, balloon.color)

          // Usar la función showToast para evitar duplicados
          showToast("¡Excelente!", `¡Encontraste el ${balloon.number}!`)

          const timeout = setTimeout(() => {
            setBalloons((current) => {
              const newBalloons = current.map((b) => {
                if (b.id === balloonId) {
                  return { ...b, isPopped: true, isClickable: false, isExploding: false }
                }
                return b
              })
              // Remover el globo del set de procesamiento
              processingBalloons.current.delete(balloonId)
              console.log(`Globo ${balloonId} removido del procesamiento`)
              return newBalloons
            })
          }, 500)

          animationTimeouts.current.push(timeout)
          setNextExpectedNumber(currentExpected + 1)

          // Verificar si el nivel se completó
          if (currentExpected >= currentGameLevel.maxNumber) {
            const completeTimeout = setTimeout(() => {
              setIsGameActive(false)
              setIsLevelComplete(true)
              setCompletedSets([{ id: 1 }])

              showToast("¡Nivel completado! 🎉", `Has completado el ${currentGameLevel.name}`)
            }, 1000)

            animationTimeouts.current.push(completeTimeout)
          }

          return explodingBalloons
        } else {
          // Error - incrementar errores aquí UNA SOLA VEZ
          setErrores((prev) => prev + 1)
          
          const balloonElement = document.getElementById(balloonId)
          if (balloonElement) {
            createErrorEffect(balloonElement)
          }

          // Usar la función showToast para evitar duplicados
          showToast("¡Oops!", `Busca el número ${currentExpected}`, "destructive")

          // Remover el globo del set de procesamiento después de un breve delay
          setTimeout(() => {
            processingBalloons.current.delete(balloonId)
            console.log(`Globo ${balloonId} removido del procesamiento (error)`)
          }, 100)

          return prev
        }
      })
    },
    [nextExpectedNumber, currentGameLevel, createExplosionEffect, createErrorEffect, showToast],
  )

  const startGame = useCallback(() => {
    const levelData = numeroCorrectoLevels[currentLevel]
    if (!levelData) return

    console.log(`=== INICIANDO NIVEL ${currentLevel + 1} ===`)
    console.log(`Debe generar ${levelData.maxNumber} globos`)

    // Limpiar el set de procesamiento
    processingBalloons.current.clear()

    animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
    animationTimeouts.current = []

    const newBalloons = generateBalloons(levelData.maxNumber)
    console.log(`Globos generados en startGame: ${newBalloons.length}`)

    setBalloons(newBalloons)
    setNextExpectedNumber(1)
    setIsGameActive(true)
    setIsLevelComplete(false)
    setIsGameComplete(false)
  }, [currentLevel, generateBalloons])

  const handleNextLevel = useCallback(() => {
    if (currentLevel < numeroCorrectoLevels.length - 1) {
      const newLevel = currentLevel + 1
      // Acumular aciertos del nivel anterior
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(newLevel)
      setAciertos(0) // Reset aciertos para el nuevo nivel
      setErrores(0) // Reset errores para el nuevo nivel
      setIsLevelComplete(false)
      setCompletedSets([])

      showToast("¡Nuevo nivel desbloqueado! 🚀", `${numeroCorrectoLevels[newLevel].name}`)

      const timeout = setTimeout(() => {
        const levelData = numeroCorrectoLevels[newLevel]
        if (levelData) {
          const newBalloons = generateBalloons(levelData.maxNumber)
          setBalloons(newBalloons)
          setNextExpectedNumber(1)
          setIsGameActive(true)
          setIsLevelComplete(false)
          setIsGameComplete(false)
        }
      }, 1000)

      animationTimeouts.current.push(timeout)
    } else {
      setIsGameComplete(true)
      detener()
    }
  }, [currentLevel, aciertos, generateBalloons, showToast, detener])

  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)

    reiniciar()

    showToast("¡Juego reiniciado! 🔄", "Comenzando desde el nivel 1")

    startGame()
  }, [startGame, reiniciar, showToast])

  // Results submission - following useGameLogic pattern
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id
      const urlParts = window.location.pathname.split("/")
      const actividad = urlParts[urlParts.length - 1]
      const intentos = aciertos + errores
      const tiempoAEnviar = tiempo

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
            intentos,
            errores,
            tiempo: tiempoAEnviar,
          }),
        })

        if (!res.ok) {
          throw new Error("Error al guardar resultados")
        }

        setTiempoFinal(tiempoAEnviar) // Guardamos el tiempo final solo si se envió correctamente
      } catch (error) {
        console.error("Error al guardar resultados:", error)
      }
    }

    if (isGameComplete && tiempoFinal === null) {
      detener()
      enviarResultados()
    }
  }, [isGameComplete, tiempoFinal, user?.id, estrellas, aciertos, errores, tiempo, detener])

  // Auto-start game
  useEffect(() => {
    const levelData = numeroCorrectoLevels[currentLevel]
    if (levelData && !isGameActive && !isLevelComplete && !isGameComplete) {
      console.log(`Auto-iniciando nivel ${currentLevel + 1}`)
      const timeout = setTimeout(() => {
        startGame()
      }, 1000)

      animationTimeouts.current.push(timeout)
      return () => clearTimeout(timeout)
    }
  }, [currentLevel, isGameActive, isLevelComplete, isGameComplete, startGame])

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout))
      processingBalloons.current.clear() // Limpiar el set de procesamiento
    }
  }, [])

  // Return interface matching useGameLogic pattern
  return {
    // Core game state
    currentLevel,
    balloons,
    nextExpectedNumber,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    gameContainerRef,
    tiempoFinal,

    // Game actions
    popBalloon,
    handleNextLevel,
    handleRestart,

    // Compatibility with existing interface
    items: [],
    handleDragStart: () => {},
    handleDrop: () => {},
  }
}