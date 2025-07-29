"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from "@/services/convertidorEstrellas"

// Game configuration
const numeroCorrectoLevels = [
  { name: "Nivel 1", maxNumber: 10, title: "Explotando globos", description: "Números del 1 al 10" },
  { name: "Nivel 2", maxNumber: 15, title: "Explotando globos", description: "Números del 1 al 15" },
  { name: "Nivel 3", maxNumber: 20, title: "Explotando globos", description: "Números del 1 al 20" },
]

const balloonColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57",
  "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43",
  "#C44569", "#40739E", "#487EB0", "#8C7AE6", "#00A085",
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

export const useNumeroCorrect = () => {
  const { toast } = useToast()
  const { user } = useUser()
  const { iniciar, detener, reiniciar, tiempo } = useTimer()

  // Game state
  const [currentLevel, setCurrentLevel] = useState(0)
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [nextExpectedNumber, setNextExpectedNumber] = useState(1)
  const [aciertos, setAciertos] = useState(0)
  const [errores, setErrores] = useState(0)
  const [completedSets, setCompletedSets] = useState<string[]>([])
  const [totalAciertos, setTotalAciertos] = useState(0)
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null)
  const [isGameActive, setIsGameActive] = useState(false)

  // Refs
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const animationTimeouts = useRef<NodeJS.Timeout[]>([])
  const processingBalloons = useRef<Set<string>>(new Set())
  const lastToastTime = useRef<number>(0)
  const lastToastMessage = useRef<string>("")

  // Computed values
  const currentGameLevel = numeroCorrectoLevels[currentLevel]
  const isLastLevel = currentLevel === numeroCorrectoLevels.length - 1
  const isLevelComplete = completedSets.includes(currentLevel.toString())
  const isGameComplete = isLastLevel && isLevelComplete
  const estrellas = convertirErrores(errores)

  // Initialize timer
  useEffect(() => {
    iniciar()
    return () => detener()
  }, [iniciar, detener])

  // Toast function
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

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

  // Generate balloons
  const generateBalloons = useCallback((count: number): Balloon[] => {
    const numbers = Array.from({ length: count }, (_, i) => i + 1)
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5)

    const positions = Array.from({ length: count }, (_, i) => {
      const rows = Math.ceil(Math.sqrt(count))
      const cols = Math.ceil(count / rows)

      const row = Math.floor(i / cols)
      const col = i % cols

      const xPadding = 20
      const yPadding = 20
      const xSpacing = (100 - 2 * xPadding) / (cols - 1)
      const ySpacing = (100 - 2 * yPadding) / (rows - 1)

      const xBase = xPadding + col * xSpacing
      const yBase = yPadding + row * ySpacing

      return {
        x: `${xBase + (Math.random() * 10 - 5)}%`,
        y: `${yBase + (Math.random() * 10 - 5)}%`
      }
    })

    return shuffledNumbers.map((number, i) => ({
      id: `balloon-${number}-${Date.now()}-${i}`,
      number,
      x: positions[i]?.x || "50%",
      y: positions[i]?.y || "50%",
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      isPopped: false,
      isClickable: true,
      isExploding: false,
    }))
  }, [])

  // Explosion effect
  const createExplosionEffect = useCallback((x: string, y: string, color: string) => {
    if (!gameContainerRef.current) return
    const container = gameContainerRef.current
    const rect = container.getBoundingClientRect()
    const pixelX = (Number.parseFloat(x) / 100) * rect.width
    const pixelY = (Number.parseFloat(y) / 100) * rect.height

    for (let i = 0; i < 15; i++) {
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

      const angle = (i / 15) * Math.PI * 2
      const distance = 80 + Math.random() * 60
      const endX = pixelX + Math.cos(angle) * distance
      const endY = pixelY + Math.sin(angle) * distance

      const timeout = setTimeout(() => {
        particle.style.transform = `translate(${endX - pixelX}px, ${endY - pixelY}px) scale(0) rotate(720deg)`
        particle.style.opacity = "0"

        const removeTimeout = setTimeout(() => {
          particle.remove()
        }, 1500)
        animationTimeouts.current.push(removeTimeout)
      }, 100)

      animationTimeouts.current.push(timeout)
    }
  }, [])

  // Error effect
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

  // Pop balloon function
  const popBalloon = useCallback(
    (balloonId: string) => {
      if (processingBalloons.current.has(balloonId)) return
      processingBalloons.current.add(balloonId)

      const balloon = balloons.find(b => b.id === balloonId)
      if (!balloon || balloon.isPopped || balloon.isExploding) {
        processingBalloons.current.delete(balloonId)
        return
      }

      const isCorrect = balloon.number === nextExpectedNumber

      if (isCorrect) {
        setBalloons(prev => prev.map(b =>
          b.id === balloonId ? { ...b, isExploding: true, isClickable: false } : b
        ))

        createExplosionEffect(balloon.x, balloon.y, balloon.color)
        showToast("¡Excelente!", `¡Encontraste el ${balloon.number}!`)

        setAciertos(prev => prev + 1)
        setNextExpectedNumber(prev => prev + 1)

        setTimeout(() => {
          setBalloons(prev => prev.map(b =>
            b.id === balloonId ? { ...b, isPopped: true, isClickable: false, isExploding: false } : b
          ))
          processingBalloons.current.delete(balloonId)

          if (nextExpectedNumber >= currentGameLevel.maxNumber) {
            setCompletedSets(prev => [...prev, currentLevel.toString()])
            showToast("¡Nivel completado! 🎉", `Has completado el ${currentGameLevel.name}`)
          }
        }, 500)
      } else {
        setErrores(prev => prev + 1)
        const balloonElement = document.getElementById(balloonId)
        if (balloonElement) createErrorEffect(balloonElement)
        showToast("¡Oops!", `Busca el número ${nextExpectedNumber}`, "destructive")
        setTimeout(() => processingBalloons.current.delete(balloonId), 100)
      }
    },
    [nextExpectedNumber, currentGameLevel, createExplosionEffect, createErrorEffect, showToast, balloons, currentLevel]
  )

  // Start game
  const startGame = useCallback(() => {
    processingBalloons.current.clear()
    animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
    animationTimeouts.current = []

    const newBalloons = generateBalloons(currentGameLevel.maxNumber)
    setBalloons(newBalloons)
    setNextExpectedNumber(1)
    setIsGameActive(true)
  }, [currentGameLevel, generateBalloons])

  // Next level - FIXED: Now properly starts the next level
  const handleNextLevel = useCallback(() => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos)
      setCurrentLevel(prev => prev + 1)
      showToast("¡Nuevo nivel desbloqueado! 🚀", `${numeroCorrectoLevels[currentLevel + 1].name}`)

      // Start the new level immediately
      startGame()
    }
  }, [isLastLevel, aciertos, showToast, currentLevel, startGame])

  // Restart game
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setAciertos(0)
    setErrores(0)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)

    reiniciar()
    showToast("¡Juego reiniciado! 🔄", "Comenzando desde el nivel 1")

    // Start the game immediately
    startGame()
  }, [reiniciar, showToast, startGame])

  // Auto-start game when level changes - FIXED: Better handling of level transitions
  useEffect(() => {
    if (!isLevelComplete && !isGameComplete) {
      const timeout = setTimeout(startGame, 500)
      animationTimeouts.current.push(timeout)
      return () => clearTimeout(timeout)
    }
  }, [currentLevel, isLevelComplete, isGameComplete, startGame])

  // Handle game completion
  useEffect(() => {
    if (isGameComplete) {
      setTotalAciertos(prev => prev + aciertos)
      setTiempoFinal(tiempo)
      detener()
    }
  }, [isGameComplete, aciertos, tiempo, detener])

  // Cleanup
  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout))
      processingBalloons.current.clear()
      detener()
    }
  }, [detener])

  // Send results
  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal
  })

  return {
    currentLevel,
    balloons,
    nextExpectedNumber,
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos: totalAciertos + aciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    gameContainerRef,
    tiempoFinal,
    popBalloon,
    handleNextLevel,
    handleRestart,
    items: [],
    handleDragStart: () => { },
    handleDrop: () => { },
  }
}