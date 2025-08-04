"use client"

import { useEffect, useState, useRef } from "react"
import { Coins } from "lucide-react"
import { gsap } from "gsap"

interface MonedasProps {
  userId: string
  isVisible: boolean
  currentCoins?: number
  updateTrigger?: number
}

export default function Monedas({ userId, isVisible, currentCoins, updateTrigger }: MonedasProps) {
  const [coins, setCoins] = useState(currentCoins || 0)
  const [isLoading, setIsLoading] = useState(false)
  const coinsRef = useRef<HTMLDivElement>(null)
  const previousCoins = useRef(currentCoins || 0)

  // Actualizar monedas cuando cambie currentCoins
  useEffect(() => {
    if (currentCoins !== undefined && currentCoins !== previousCoins.current) {
      const difference = currentCoins - previousCoins.current

      // Animación cuando las monedas cambian
      if (coinsRef.current && difference !== 0) {
        if (difference < 0) {
          // Monedas gastadas - animación de reducción
          gsap.to(coinsRef.current, {
            scale: 0.8,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setCoins(currentCoins)
            },
          })

          // Efecto de "gasto"
          gsap.to(coinsRef.current, {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
          })
        } else {
          // Monedas ganadas - animación de incremento
          gsap.to(coinsRef.current, {
            scale: 1.2,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
              setCoins(currentCoins)
            },
          })
        }
      } else {
        setCoins(currentCoins)
      }

      previousCoins.current = currentCoins
    }
  }, [currentCoins, updateTrigger])

  // Cargar monedas iniciales si no se proporcionan
  useEffect(() => {
    if (currentCoins === undefined) {
      fetchCoins()
    }
  }, [userId, currentCoins])

  const fetchCoins = async () => {
    if (!userId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/usuarios?usuario_id=${userId}`)
      const data = await response.json()

      if (response.ok) {
        setCoins(data.monedas || 0)
      }
    } catch (error) {
      console.error("Error fetching coins:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      ref={coinsRef}
      className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg border-2 border-yellow-300 font-black text-sm sm:text-base"
    >
      <Coins className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ animation: "spin 3s linear infinite" }} />
      <span className="min-w-[2rem] text-center">{isLoading ? "..." : coins.toLocaleString()}</span>
    </div>
  )
}