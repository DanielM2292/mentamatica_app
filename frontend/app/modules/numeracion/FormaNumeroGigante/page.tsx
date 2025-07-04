"use client"

import type React from "react"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useFormaNumeroGigante } from "@/hooks/useFormaNumeroGigante"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, CheckCircle, Target, Smartphone, Sparkles, Zap, Star, Trophy } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const Page = () => {
  console.log("FormaNumeroGigante page loaded")

  return (
    <TimerProvider>
      <GameWrapper />
    </TimerProvider>
  )
}

const GameWrapper = () => {
  console.log("GameWrapper loaded")

  const {
    currentLevel,
    currentNumberIndex,
    digitCards,
    dropSlots,
    currentTargetNumber,
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
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,
    checkNumber,
  } = useFormaNumeroGigante()

  const [draggedOver, setDraggedOver] = useState<string | null>(null)
  const [selectedDigit, setSelectedDigit] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [pulsingSlots, setPulsingSlots] = useState<Set<number>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Estados para drag and drop táctil
  const [isDragging, setIsDragging] = useState(false)
  const [draggedDigit, setDraggedDigit] = useState<any>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 })
  const dragElementRef = useRef<HTMLDivElement>(null)

  // Animaciones de entrada progresiva (Neurociencia: reducir carga cognitiva)
  useEffect(() => {
    setIsVisible(true)

    // Animar elementos uno por uno para reducir sobrecarga visual
    const elements = ["target", "instructions", "slots", "digits", "buttons"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 300)
    })
  }, [])

  // Efecto de pulsación en slots vacíos (Neurociencia: affordance visual)
  useEffect(() => {
    const emptySlots = dropSlots.filter((slot) => slot.digit === null).map((slot) => slot.position)
    setPulsingSlots(new Set(emptySlots))
  }, [dropSlots])

  // Partículas de celebración
  const createCelebrationParticles = () => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setCelebrationParticles(particles)

    setTimeout(() => setCelebrationParticles([]), 2000)
  }

  // Funciones para drag and drop táctil
  const handleTouchStart = (e: React.TouchEvent, digit: any) => {
    if (digit.isUsed) return

    e.preventDefault()
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()

    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })

    setDraggedDigit(digit)
    setIsDragging(true)
    setDragPosition({
      x: touch.clientX - touchOffset.x,
      y: touch.clientY - touchOffset.y,
    })

    // Haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50)
    }

    handleDragStart(digit)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggedDigit) return

    e.preventDefault()
    const touch = e.touches[0]

    setDragPosition({
      x: touch.clientX - touchOffset.x,
      y: touch.clientY - touchOffset.y,
    })

    // Detectar sobre qué slot está el dedo
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const slotElement = elementBelow?.closest("[data-slot-position]")

    if (slotElement) {
      const slotPosition = slotElement.getAttribute("data-slot-position")
      setDraggedOver(`slot-${slotPosition}`)
    } else {
      setDraggedOver(null)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !draggedDigit) return

    e.preventDefault()
    const touch = e.changedTouches[0]

    // Encontrar el elemento debajo del punto de toque
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const slotElement = elementBelow?.closest("[data-slot-position]")

    if (slotElement) {
      const slotPosition = Number.parseInt(slotElement.getAttribute("data-slot-position") || "0")
      handleDrop(slotPosition)

      // Haptic feedback para drop exitoso
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }
    }

    // Reset drag state
    setIsDragging(false)
    setDraggedDigit(null)
    setDraggedOver(null)
    setSelectedDigit(null)
  }

  // Handle click interaction for desktop and fallback
  const handleDigitClick = (digit: any) => {
    if (digit.isUsed) return

    // Haptic feedback para móviles
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50)
    }

    if (selectedDigit === digit.id) {
      setSelectedDigit(null) // Deselect if clicking same digit
    } else {
      setSelectedDigit(digit.id)
      handleDragStart(digit)
    }
  }

  const handleSlotClick = (slotPosition: number) => {
    if (selectedDigit) {
      // Haptic feedback
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100])
      }

      handleDrop(slotPosition)
      setSelectedDigit(null)
    }
  }

  const handleSubmitWithCelebration = () => {
    const isCorrect = checkNumber()
    if (isCorrect) {
      createCelebrationParticles()
    }
    submitNumber()
  }

  const isNumberComplete = dropSlots.every((slot) => slot.digit !== null)
  const isNumberCorrect = checkNumber()

  console.log("Rendering game with level:", currentLevel, "target:", currentTargetNumber)

  return (
    <div className="relative min-h-screen">
      {/* Elemento arrastrable para touch */}
      {isDragging && draggedDigit && (
        <div
          ref={dragElementRef}
          className="fixed pointer-events-none z-50 w-16 h-20 sm:w-20 sm:h-24 rounded-2xl shadow-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-yellow-300 scale-110"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {draggedDigit.digit}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center">
            <Star className="w-2 h-2 text-yellow-700" />
          </div>
        </div>
      )}

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-float 2s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          <div className="text-2xl">{["🎉", "⭐", "✨", "🌟", "💫", "🎊"][particle.id % 6]}</div>
        </div>
      ))}

      {/* Fondo animado con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 animate-gradient-shift"></div>

      {/* Elementos flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-float-gentle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-purple-600">
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background: linear-gradient(135deg, #f3e8ff, #dbeafe, #e0e7ff); }
          50% { background: linear-gradient(135deg, #e0e7ff, #f3e8ff, #dbeafe); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-5px) rotate(240deg) scale(0.9); }
        }
        
        @keyframes celebration-float {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-100px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-200px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        
        .animate-gradient-shift { animation: gradient-shift 6s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-4 relative z-10">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            totalSets={currentGameLevel?.numbersPerLevel || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado aciertos={aciertos} estrellas={estrellas} errores={errores} onRestart={handleRestart} />
          ) : isLevelComplete ? (
            <NivelCompletado
              aciertos={aciertos}
              estrellas={estrellas}
              errores={errores}
              nivel={currentLevel + 1}
              isLastLevel={isLastLevel}
              onNextLevel={handleNextLevel}
              onRestart={handleRestart}
            />
          ) : (
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
              {/* Target Number Display - Mejorado con animaciones */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-purple-300 shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 ${
                  animatedElements.has("target") ? "animate-bounce-in" : "opacity-0"
                }`}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative">
                        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Número Objetivo
                      </h2>
                      <Sparkles className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
                    </div>

                    <div className="relative inline-block">
                      <div className="text-4xl sm:text-6xl font-bold text-purple-600 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-4 sm:p-6 border-4 border-purple-200 shadow-lg hover:scale-105 transition-transform duration-300">
                        {currentTargetNumber?.toLocaleString()}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <Star className="w-3 h-3 text-yellow-700" />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="font-medium">{currentGameLevel?.description}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {currentNumberIndex + 1} de {currentGameLevel?.numbersPerLevel}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Instructions - Mejoradas */}
              <Card
                className={`bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 sm:hidden shadow-lg ${
                  animatedElements.has("instructions") ? "animate-slide-up" : "opacity-0"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-blue-800">
                    <div className="p-2 bg-blue-200 rounded-full">
                      <Smartphone className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">💡 Consejo para móvil</p>
                      <p className="text-xs">Mantén presionado y arrastra los dígitos, o toca para seleccionar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Drop Slots Area - Mejorado */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-blue-300 shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 ${
                  animatedElements.has("slots") ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                      Arrastra los dígitos a su posición correcta
                      <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                    {dropSlots.map((slot, index) => (
                      <div key={slot.position} className="text-center group">
                        <div className="text-xs font-bold text-gray-700 mb-1 group-hover:text-purple-600 transition-colors">
                          {slot.label}
                        </div>
                        <div className="text-xs text-gray-500 mb-2 font-medium">({slot.value.toLocaleString()})</div>
                        <div
                          data-slot-position={slot.position}
                          className={`
                            w-16 h-20 sm:w-24 sm:h-28 border-3 border-dashed rounded-xl
                            flex items-center justify-center text-2xl sm:text-3xl font-bold
                            transition-all duration-300 cursor-pointer relative overflow-hidden
                            ${
                              slot.digit !== null
                                ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 text-green-700 shadow-lg scale-105"
                                : draggedOver === `slot-${slot.position}`
                                  ? "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-400 scale-110 shadow-xl"
                                  : pulsingSlots.has(slot.position)
                                    ? "bg-gradient-to-br from-gray-50 to-blue-50 border-blue-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 animate-pulse-glow"
                                    : "bg-gradient-to-br from-gray-50 to-blue-50 border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50"
                            }
                          `}
                          onDragOver={(e) => {
                            e.preventDefault()
                            setDraggedOver(`slot-${slot.position}`)
                          }}
                          onDragLeave={() => setDraggedOver(null)}
                          onDrop={(e) => {
                            e.preventDefault()
                            setDraggedOver(null)
                            handleDrop(slot.position)
                          }}
                          onClick={() => handleSlotClick(slot.position)}
                        >
                          {slot.digit !== null ? (
                            <div className="relative">
                              {slot.digit}
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            </div>
                          ) : (
                            <div className="text-gray-400 animate-pulse">?</div>
                          )}

                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 hover:translate-x-full transition-all duration-700"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons - Mejorados con Neurociencia Cognitiva */}
                  <div
                    className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${
                      animatedElements.has("buttons") ? "animate-slide-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    {/* Botón Limpiar - Color rojo suave para acción destructiva */}
                    <Button
                      onClick={clearNumber}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-red-300 hover:border-red-400"
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-wiggle" />
                        <span className="text-sm sm:text-base">Limpiar</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>

                    {/* Botón Verificar - Verde para acción positiva, con estados intuitivos */}
                    <Button
                      onClick={handleSubmitWithCelebration}
                      disabled={!isNumberComplete}
                      className={`group relative overflow-hidden font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 border-2 ${
                        !isNumberComplete
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                          : isNumberCorrect
                            ? "bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white border-green-300 hover:border-green-400 hover:scale-105 hover:shadow-xl"
                            : "bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-amber-300 hover:border-amber-400 hover:scale-105 hover:shadow-xl"
                      }`}
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <CheckCircle
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${isNumberComplete ? "group-hover:animate-pulse" : ""}`}
                        />
                        <span className="text-sm sm:text-base">
                          {!isNumberComplete ? "Completa el número" : "Verificar"}
                        </span>
                      </div>
                      {isNumberComplete && (
                        <div
                          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isNumberCorrect
                              ? "bg-gradient-to-r from-green-600 to-emerald-600"
                              : "bg-gradient-to-r from-amber-600 to-orange-600"
                          }`}
                        ></div>
                      )}
                    </Button>
                  </div>

                  {/* Status Indicator - Mejorado */}
                  {isNumberComplete && (
                    <div className="text-center mt-6 animate-bounce-in">
                      <Badge
                        variant={isNumberCorrect ? "default" : "destructive"}
                        className={`text-sm sm:text-base px-4 py-2 font-bold shadow-lg ${
                          isNumberCorrect
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        }`}
                      >
                        {isNumberCorrect ? (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 animate-spin" />
                            ¡Correcto! ¡Excelente trabajo!
                            <Star className="w-4 h-4 animate-spin" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 animate-pulse" />
                            Inténtalo de nuevo - ¡Tú puedes!
                          </div>
                        )}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Digits - Mejorado con drag táctil */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-green-300 shadow-2xl hover:shadow-green-200/50 transition-all duration-500 ${
                  animatedElements.has("digits") ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">123</span>
                      </div>
                      Dígitos Disponibles
                      <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto"></div>
                  </div>

                  <div
                    className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {digitCards
                      .filter((card) => !card.isUsed)
                      .map((card, index) => (
                        <div
                          key={card.id}
                          draggable={!card.isUsed}
                          onDragStart={() => handleDragStart(card)}
                          onTouchStart={(e) => handleTouchStart(e, card)}
                          onClick={() => handleDigitClick(card)}
                          className={`
                            w-14 h-18 sm:w-20 sm:h-24 rounded-2xl shadow-xl flex items-center justify-center
                            text-white text-xl sm:text-2xl font-bold cursor-pointer relative overflow-hidden
                            transform transition-all duration-300 border-2 select-none
                            ${
                              selectedDigit === card.id
                                ? "bg-gradient-to-br from-yellow-400 to-amber-500 scale-110 shadow-2xl border-yellow-300 animate-pulse"
                                : isDragging && draggedDigit?.id === card.id
                                  ? "opacity-50 scale-95"
                                  : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl border-blue-400 hover:border-purple-400"
                            }
                            ${card.isUsed ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                          style={{
                            touchAction: card.isUsed ? "none" : "none", // Prevent default touch behavior
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="relative z-10 flex flex-col items-center">
                            <span>{card.digit}</span>
                            {(selectedDigit === card.id || (isDragging && draggedDigit?.id === card.id)) && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center">
                                <Star className="w-2 h-2 text-yellow-700" />
                              </div>
                            )}
                          </div>

                          {/* Efecto de brillo en hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 hover:translate-x-full transition-all duration-700"></div>

                          {/* Partículas flotantes en hover */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                                style={{
                                  left: `${20 + i * 30}%`,
                                  top: `${20 + i * 20}%`,
                                  animationDelay: `${i * 0.2}s`,
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>

                  {digitCards.filter((card) => !card.isUsed).length === 0 && (
                    <div className="text-center mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border-2 border-purple-200">
                      <p className="text-purple-700 font-semibold flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        ¡Todos los dígitos han sido utilizados!
                        <Sparkles className="w-5 h-5 animate-spin" />
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </GamesTemplate>
    </div>
  )
}

export default Page
