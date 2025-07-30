"use client"

import React from "react"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useDragDropNumerico } from "@/hooks/suma/useDragDropNumerico"
import GamesTemplate from "@/components/templates/suma/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, CheckCircle, Target, Smartphone, Sparkles, Zap, Star, Trophy, Plus, Equal } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const Page = () => {
  console.log("DragDropNumerico page loaded")

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
    currentProblemIndex,
    currentProblem,
    numberCards,
    dropZones,
    selectedCard,
    isDragging,
    dragPosition,
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
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleCardClick,
    handleZoneClick,
    clearProblem,
    handleNextLevel,
    handleRestart,
  } = useDragDropNumerico()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const dragElementRef = useRef<HTMLDivElement>(null)

  // Animaciones de entrada progresiva
  useEffect(() => {
    setIsVisible(true)

    const elements = ["problem", "zones", "cards", "buttons"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 300)
    })
  }, [])

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

  // Crear partículas cuando se completa correctamente
  useEffect(() => {
    if (dropZones.every((z) => z.value !== null && z.isCorrect)) {
      createCelebrationParticles()
    }
  }, [dropZones])

  const draggedCardData = numberCards.find((card) => card.id === selectedCard)

  console.log("Rendering game with level:", currentLevel, "problem:", currentProblem)

  return (
    <div className="relative min-h-screen">
      {/* Elemento arrastrable para touch */}
      {isDragging && draggedCardData && (
        <div
          ref={dragElementRef}
          className="fixed pointer-events-none z-50 w-16 h-20 sm:w-20 sm:h-24 rounded-2xl shadow-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-purple-300 scale-110"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {draggedCardData.value}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center">
            <Star className="w-2 h-2 text-purple-700" />
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
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 animate-gradient-shift"></div>

      {/* Elementos flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-float-gentle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-purple-600">
              {Math.floor(Math.random() * 10)}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background: linear-gradient(135deg, #f3e8ff, #fdf2f8, #e0e7ff); }
          50% { background: linear-gradient(135deg, #e0e7ff, #f3e8ff, #fdf2f8); }
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
          0%, 100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.4); }
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
            nav="/modules/suma"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/suma.png"
            name="Arrastra y Suelta Números"
            totalSets={currentGameLevel?.numbersPerLevel || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado aciertos={aciertos} estrellas={estrellas} onRestart={handleRestart} />
          ) : isLevelComplete ? (
            <NivelCompletado aciertos={aciertos} isLastLevel={isLastLevel} onNextLevel={handleNextLevel} />
          ) : (
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
              {/* Problem Display */}
              {currentProblem && (
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-2 border-purple-300 shadow-2xl hover:shadow-purple-200/50 transition-all duration-500 ${
                    animatedElements.has("problem") ? "animate-bounce-in" : "opacity-0"
                  }`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative">
                          <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Completa la Suma
                        </h2>
                        <Sparkles className="w-5 h-5 text-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{currentGameLevel?.description}</span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {currentProblemIndex + 1} de {currentGameLevel?.numbersPerLevel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mobile Instructions */}
              <Card
                className={`bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 sm:hidden shadow-lg ${
                  animatedElements.has("problem") ? "animate-slide-up" : "opacity-0"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-pink-800">
                    <div className="p-2 bg-pink-200 rounded-full">
                      <Smartphone className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">💡 Consejo para móvil</p>
                      <p className="text-xs">Mantén presionado y arrastra los números, o toca para seleccionar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Drop Zones Area */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-pink-300 shadow-2xl hover:shadow-pink-200/50 transition-all duration-500 ${
                  animatedElements.has("zones") ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-purple-500 animate-pulse" />
                      Arrastra el número que falta
                      <Zap className="w-5 h-5 text-purple-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
                  </div>

                  {/* Equation Display */}
                  <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 flex-wrap">
                    {dropZones.map((zone, index) => (
                      <React.Fragment key={zone.id}>
                        {/* Drop Zone */}
                        <div
                          data-zone-id={zone.id}
                          className={`
                            w-20 h-24 sm:w-28 sm:h-32 border-3 border-dashed rounded-xl
                            flex items-center justify-center text-2xl sm:text-3xl font-bold
                            transition-all duration-300 cursor-pointer relative overflow-hidden
                            ${
                              zone.value !== null
                                ? zone.isCorrect
                                  ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 text-green-700 shadow-lg scale-105"
                                  : "bg-gradient-to-br from-red-100 to-pink-100 border-red-400 text-red-700 shadow-lg"
                                : "bg-gradient-to-br from-gray-50 to-purple-50 border-purple-300 hover:border-pink-400 hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 animate-pulse-glow"
                            }
                          `}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            handleDrop(zone.id)
                          }}
                          onClick={() => handleZoneClick(zone.id)}
                        >
                          {zone.value !== null ? (
                            <div className="relative">
                              {zone.value}
                              {zone.isCorrect && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                              )}
                              {!zone.isCorrect && zone.value !== null && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                              )}
                            </div>
                          ) : (
                            <div className="text-purple-400 animate-pulse">?</div>
                          )}

                          {/* Efecto de brillo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 hover:translate-x-full transition-all duration-700"></div>
                        </div>

                        {/* Operadores */}
                        {index === 0 && <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />}
                        {index === 1 && <Equal className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 flex-shrink-0" />}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div
                    className={`flex flex-wrap justify-center gap-4 sm:gap-6 ${
                      animatedElements.has("buttons") ? "animate-slide-up" : "opacity-0"
                    }`}
                    style={{ animationDelay: "0.4s" }}
                  >
                    <Button
                      onClick={clearProblem}
                      className="group relative overflow-hidden bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-red-300 hover:border-red-400"
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-wiggle" />
                        <span className="text-sm sm:text-base">Limpiar</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </div>

                  {/* Status Indicator */}
                  {dropZones.every((z) => z.value !== null) && (
                    <div className="text-center mt-6 animate-bounce-in">
                      <Badge
                        variant={dropZones.every((z) => z.isCorrect) ? "default" : "destructive"}
                        className={`text-sm sm:text-base px-4 py-2 font-bold shadow-lg ${
                          dropZones.every((z) => z.isCorrect)
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        }`}
                      >
                        {dropZones.every((z) => z.isCorrect) ? (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 animate-spin" />
                            ¡Correcto! ¡Excelente trabajo!
                            <Star className="w-4 h-4 animate-spin" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 animate-pulse" />
                            Algunos números no están correctos
                          </div>
                        )}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Numbers */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-indigo-300 shadow-2xl hover:shadow-indigo-200/50 transition-all duration-500 ${
                  animatedElements.has("cards") ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">123</span>
                      </div>
                      Números Disponibles
                      <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
                  </div>

                  <div
                    className="flex flex-wrap justify-center gap-3 sm:gap-4"
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {numberCards
                      .filter((card) => !card.isUsed)
                      .map((card, index) => (
                        <div
                          key={card.id}
                          draggable={!card.isUsed}
                          onDragStart={() => handleDragStart(card)}
                          onTouchStart={(e) => handleTouchStart(e, card)}
                          onClick={() => handleCardClick(card)}
                          className={`
                            w-14 h-18 sm:w-20 sm:h-24 rounded-2xl shadow-xl flex items-center justify-center
                            text-white text-xl sm:text-2xl font-bold cursor-pointer relative overflow-hidden
                            transform transition-all duration-300 border-2 select-none
                            ${
                              selectedCard === card.id
                                ? "bg-gradient-to-br from-pink-400 to-purple-500 scale-110 shadow-2xl border-pink-300 animate-pulse"
                                : isDragging && draggedCardData?.id === card.id
                                  ? "opacity-50 scale-95"
                                  : "bg-gradient-to-br from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl border-purple-400 hover:border-indigo-400"
                            }
                            ${card.isUsed ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                          style={{
                            touchAction: card.isUsed ? "none" : "none",
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="relative z-10 flex flex-col items-center">
                            <span>{card.value}</span>
                            {(selectedCard === card.id || (isDragging && draggedCardData?.id === card.id)) && (
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full flex items-center justify-center">
                                <Star className="w-2 h-2 text-pink-700" />
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

                  {numberCards.filter((card) => !card.isUsed).length === 0 && (
                    <div className="text-center mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl border-2 border-indigo-200">
                      <p className="text-indigo-700 font-semibold flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        ¡Todos los números han sido utilizados!
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