"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Lock, Coins, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UnlockConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cost: number
  userCoins: number
  optionName: string
}

export function UnlockConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  cost,
  userCoins,
  optionName,
}: UnlockConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const coinsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && dialogRef.current && overlayRef.current && contentRef.current) {
      // Animate in
      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.5, opacity: 0, y: 50 })

      const tl = gsap.timeline()
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .to(
          contentRef.current,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.1",
        )
        .to(
          coinsRef.current,
          {
            rotation: 360,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2",
        )
    }
  }, [isOpen])

  const handleClose = () => {
    if (contentRef.current && overlayRef.current) {
      const tl = gsap.timeline()
      tl.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        y: -30,
        duration: 0.3,
      })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          "-=0.1",
        )
        .call(() => onClose())
    }
  }

  const handleConfirm = () => {
    if (contentRef.current && overlayRef.current) {
      const tl = gsap.timeline()
      tl.to(contentRef.current, {
        scale: 1.1,
        duration: 0.1,
      })
        .to(contentRef.current, {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
        })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.2,
          },
          "-=0.1",
        )
        .call(() => {
          onConfirm()
          onClose()
        })
    }
  }

  if (!isOpen) return null

  const canAfford = userCoins >= cost

  return (
    <div ref={dialogRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div ref={overlayRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div
        ref={contentRef}
        className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-4 border-purple-200 max-w-md w-full mx-4"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-purple-800 mb-2">🔓 ¡Desbloquear Apariencia!</h3>
            <p className="text-purple-600 font-semibold">{optionName}</p>
          </div>

          <div
            ref={coinsRef}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 mb-6 border-2 border-yellow-300"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Coins className="w-8 h-8 text-yellow-600" />
              <span className="text-3xl font-black text-yellow-700">{cost}</span>
            </div>
            <p className="text-yellow-700 font-bold text-sm">Costo de desbloqueo</p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 mb-6 border-2 border-blue-300">
            <div className="flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-black text-blue-700">{userCoins}</span>
              <span className="text-blue-600 font-semibold">monedas disponibles</span>
            </div>
          </div>

          {!canAfford && (
            <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-4 mb-6">
              <p className="text-red-700 font-bold">❌ No tienes suficientes monedas</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 py-3 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 bg-transparent"
            >
              ❌ Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!canAfford}
              className={`flex-1 py-3 text-lg font-bold ${
                canAfford
                  ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <Check className="w-5 h-5 mr-2" />✨ Desbloquear
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}