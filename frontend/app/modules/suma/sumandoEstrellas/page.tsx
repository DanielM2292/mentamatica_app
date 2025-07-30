"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useSumandoEstrellas } from "@/hooks/suma/useSumandoEstrellas"
import GamesTemplate from "@/components/templates/suma/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles, Target, Plus, Trophy } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("SumandoEstrellas page loaded")

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
    stars,
    selectedStar,
    showResult,
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
    handleStarSelect,
    handleNextLevel,
    handleRestart,
  } = useSumandoEstrellas()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Animaciones de entrada progresiva
  useEffect(() => {
    setIsVisible(true)

    const elements = ["problem", "stars", "info"]
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

  // Crear partículas cuando se acierta
  useEffect(() => {
    if (showResult && selectedStar && stars.find((s) => s.id === selectedStar)?.isCorrect) {
      createCelebrationParticles()
    }
  }, [showResult, selectedStar, stars])

  console.log("Rendering game with level:", currentLevel, "problem:", currentProblem)

  return (
    <div className="relative min-h-screen">
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
          <div className="text-2xl">{["⭐", "✨", "🌟", "💫", "🎊", "🎉"][particle.id % 6]}</div>
        </div>
      ))}

      {/* Fondo animado con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 animate-gradient-shift"></div>

      {/* Elementos flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 animate-float-gentle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-orange-600">
              <Star className="w-2 h-2 sm:w-4 sm:h-4" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background: linear-gradient(135deg, #fef3c7, #fed7aa, #fecaca); }
          50% { background: linear-gradient(135deg, #fecaca, #fef3c7, #fed7aa); }
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
          0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.5); }
          50% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4); }
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
        
        @keyframes star-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        .animate-gradient-shift { animation: gradient-shift 6s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-star-twinkle { animation: star-twinkle 2s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/suma"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/suma.png"
            name="Sumando Estrellas"
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
                  className={`bg-white/95 backdrop-blur-lg border-2 border-yellow-300 shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 ${
                    animatedElements.has("problem") ? "animate-bounce-in" : "opacity-0"
                  }`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative">
                          <Target className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                          Resuelve la Suma
                        </h2>
                        <Sparkles
                          className="w-5 h-5 text-yellow-500 animate-spin"
                          style={{ animationDuration: "3s" }}
                        />
                      </div>

                      <div className="relative inline-block">
                        <div className="text-4xl sm:text-6xl font-bold text-yellow-600 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-4 sm:p-6 border-4 border-yellow-200 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                          <span>{currentProblem.num1}</span>
                          <Plus className="w-8 h-8 sm:w-12 sm:h-12 text-orange-500" />
                          <span>{currentProblem.num2}</span>
                          <span className="text-orange-500">=</span>
                          <span className="text-gray-400">?</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                          <Star className="w-3 h-3 text-yellow-700" />
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{currentGameLevel?.description}</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                          {currentProblemIndex + 1} de {currentGameLevel?.numbersPerLevel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stars Area */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-orange-300 shadow-2xl hover:shadow-orange-200/50 transition-all duration-500 ${
                  animatedElements.has("stars") ? "animate-bounce-in" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 animate-star-twinkle" />
                      Toca la estrella con la respuesta correcta
                      <Star className="w-5 h-5 text-yellow-500 animate-star-twinkle" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
                  </div>

                  <div className="relative min-h-[300px] sm:min-h-[400px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border-2 border-dashed border-blue-300 overflow-hidden">
                    {/* Fondo estrellado */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Estrellas interactivas */}
                    {stars.map((star, index) => (
                      <div
                        key={star.id}
                        className={`
                          absolute cursor-pointer transform transition-all duration-300 select-none
                          ${
                            star.isSelected
                              ? star.isCorrect
                                ? "scale-125 animate-pulse-glow"
                                : "scale-110 opacity-50"
                              : "hover:scale-110 hover:rotate-12"
                          }
                        `}
                        style={{
                          left: `${star.position.x}%`,
                          top: `${star.position.y}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                        onClick={() => handleStarSelect(star.id)}
                      >
                        <div
                          className={`
                          relative w-16 h-16 sm:w-20 sm:h-20 ${star.color} rounded-full shadow-lg
                          flex items-center justify-center text-white font-bold text-lg sm:text-xl
                          border-4 border-white hover:shadow-xl
                          ${star.isSelected && star.isCorrect ? "animate-star-twinkle" : ""}
                        `}
                        >
                          <Star className="absolute inset-0 w-full h-full p-2" fill="currentColor" />
                          {/* Círculo blanco de fondo para el número */}
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200">
                              <span className="text-gray-900 font-black text-lg sm:text-xl">
                                {star.value}
                              </span>
                            </div>
                          </div>

                          {star.isSelected && star.isCorrect && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}

                          {star.isSelected && !star.isCorrect && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center animate-bounce">
                              <span className="text-white text-xs">✗</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Result Display */}
                  {showResult && selectedStar && (
                    <div className="text-center mt-6 animate-bounce-in">
                      {stars.find((s) => s.id === selectedStar)?.isCorrect ? (
                        <Badge className="text-sm sm:text-base px-4 py-2 font-bold shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 animate-spin" />
                            ¡Correcto! ¡Excelente trabajo!
                            <Star className="w-4 h-4 animate-spin" />
                          </div>
                        </Badge>
                      ) : (
                        <Badge
                          variant="destructive"
                          className="text-sm sm:text-base px-4 py-2 font-bold shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            Inténtalo de nuevo - ¡Tú puedes!
                          </div>
                        </Badge>
                      )}
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