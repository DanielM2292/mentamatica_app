"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useRestaEnLaCueva } from "@/hooks/resta/useRestaEnLaCueva"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Clock, Zap, Mountain, ArrowDown, Target, Flame } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("RestaEnLaCueva page loaded")

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
    currentDepth,
    maxDepthReached,
    currentProblem,
    selectedAnswer,
    aciertos,
    errores,
    timeLeft,
    streak,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showFeedback,
    isCorrect,
    gameContainerRef,
    currentOptions,
    handleAnswerSelect,
    handleNextLevel,
    handleRestart,
  } = useRestaEnLaCueva()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [depthAnimation, setDepthAnimation] = useState(false)

  // Animaciones de entrada con timing cognitivo óptimo
  useEffect(() => {
    setIsVisible(true)

    const elements = ["cave", "problem", "depth", "timer", "options"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 300) // 300ms es óptimo para procesamiento visual
    })
  }, [])

  // Animación de profundidad
  useEffect(() => {
    if (currentDepth > 0) {
      setDepthAnimation(true)
      setTimeout(() => setDepthAnimation(false), 800)
    }
  }, [currentDepth])

  // Celebración con partículas
  const createCelebration = () => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setCelebrationParticles(particles)
    setTimeout(() => setCelebrationParticles([]), 3000)
  }

  useEffect(() => {
    if (isCorrect && showFeedback) {
      createCelebration()
    }
  }, [isCorrect, showFeedback])

  console.log("Rendering RestaEnLaCueva with depth:", currentDepth, "problem:", currentProblem)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo de cueva con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
        {/* Efectos de cueva */}
        <div className="absolute inset-0">
          {/* Estalactitas */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-b from-gray-600 to-gray-800 opacity-60"
              style={{
                left: `${10 + i * 12}%`,
                top: '0',
                width: '20px',
                height: `${30 + Math.random() * 40}px`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          
          {/* Efectos de profundidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Partículas de polvo */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-cave 3s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          {["⭐", "💎", "🔥", "⚡", "🌟", "💫"][particle.id % 6]}
        </div>
      ))}

      <style jsx>{`
        @keyframes celebration-cave {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-80px) scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-160px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes depth-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes slide-up-cave {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        .animate-depth-pulse { animation: depth-pulse 0.8s ease-in-out; }
        .animate-slide-up-cave { animation: slide-up-cave 0.6s ease-out forwards; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/resta"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/resta.png"
            name="Resta en la Cueva"
            totalSets={1}
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
            <div className="mt-6 space-y-6" ref={gameContainerRef}>
              {/* Medidor de profundidad */}
              <Card
                className={`bg-gray-800/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl ${
                  animatedElements.has("cave") ? "animate-slide-up-cave" : "opacity-0"
                } ${depthAnimation ? "animate-depth-pulse" : ""}`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-100 mb-2 flex items-center justify-center gap-2">
                      <Mountain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      Exploración de la Cueva
                      <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                        <span className="font-bold text-green-300 text-sm sm:text-base">Profundidad: {currentDepth}m</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                        <span className="font-bold text-orange-300 text-sm sm:text-base">Racha: {streak}</span>
                      </div>
                    </div>
                    
                    {/* Barra de profundidad visual */}
                    <div className="relative w-full max-w-md mx-auto">
                      <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full transition-all duration-1000 animate-glow-pulse"
                          style={{ width: `${Math.min((currentDepth / (currentGameLevel?.targetDepth || 20)) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-300">
                        Meta: {currentGameLevel?.targetDepth}m | Máximo: {maxDepthReached}m
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problema actual */}
              {currentProblem && (
                <Card
                  className={`bg-gray-900/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                    animatedElements.has("problem") ? "animate-slide-up-cave" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <Clock className={`w-6 h-6 sm:w-8 sm:h-8 ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`} />
                        <span className={`text-2xl sm:text-3xl font-bold ${timeLeft <= 5 ? 'text-red-300' : 'text-yellow-300'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                      
                      <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 mb-6 border-2 border-gray-600">
                        <div className="text-4xl sm:text-6xl font-bold text-white mb-2">
                          {currentProblem.minuend} - {currentProblem.subtrahend} = ?
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base">
                          Resuelve para continuar explorando
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Opciones de respuesta */}
              <Card
                className={`bg-gray-800/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl ${
                  animatedElements.has("options") ? "animate-slide-up-cave" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {currentProblem?.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={showFeedback}
                        className={`
                          h-16 sm:h-20 text-xl sm:text-2xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95
                          ${showFeedback && selectedAnswer === option
                            ? isCorrect
                              ? 'bg-green-600 hover:bg-green-600 text-white border-4 border-green-400'
                              : 'bg-red-600 hover:bg-red-600 text-white border-4 border-red-400'
                            : showFeedback && option === currentProblem?.result
                            ? 'bg-green-600 hover:bg-green-600 text-white border-4 border-green-400'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-2 border-gray-500'
                          }
                        `}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  
                  {showFeedback && (
                    <div className="mt-4 text-center">
                      <div className={`text-lg sm:text-xl font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {isCorrect ? '¡Correcto! Avanzas más profundo 🎯' : '¡Incorrecto! Retrocedes en la cueva 😰'}
                      </div>
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