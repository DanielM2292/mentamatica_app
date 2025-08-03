"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useCarreraNumeros } from "@/hooks/suma/useCarreraNumeros"
import GamesTemplate from "@/components/templates/suma/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Car, Flag, Timer, Plus, Trophy, Zap, Target } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("CarreraNumeros page loaded")

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
    userAnswer,
    racePositions,
    problemTimeLeft,
    isAnswering,
    playerPosition,
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
    handleAnswerChange,
    handleSubmitAnswer,
    handleNextLevel,
    handleRestart,
  } = useCarreraNumeros()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Animaciones de entrada progresiva
  useEffect(() => {
    setIsVisible(true)

    const elements = ["problem", "race", "input"]
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
    if (playerPosition > (racePositions.find((p) => p.player === 1)?.position || 0)) {
      createCelebrationParticles()
    }
  }, [playerPosition, racePositions])

  const timePercentage = currentGameLevel ? (problemTimeLeft / currentGameLevel.timeLimit) * 100 : 0
  const carColors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500"]
  const carEmojis = ["🏎️", "🚗", "🚙", "🚕"]

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
          <div className="text-2xl">{["🏁", "🏆", "🎉", "⚡", "🚀", "✨"][particle.id % 6]}</div>
        </div>
      ))}

      {/* Fondo animado con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100 animate-gradient-shift"></div>

      {/* Elementos flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-200 to-green-200 rounded-full opacity-20 animate-float-gentle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-blue-600">
              <Car className="w-2 h-2 sm:w-4 sm:h-4" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background: linear-gradient(135deg, #dbeafe, #dcfce7, #fef3c7); }
          50% { background: linear-gradient(135deg, #fef3c7, #dbeafe, #dcfce7); }
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
        
        @keyframes car-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-gradient-shift { animation: gradient-shift 6s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-car-bounce { animation: car-bounce 1s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/suma"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/suma.png"
            name="Carrera de Números"
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
                  className={`bg-white/95 backdrop-blur-lg border-2 border-blue-300 shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 ${animatedElements.has("problem") ? "animate-bounce-in" : "opacity-0"
                    }`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative">
                          <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-pulse" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                          ¡Resuelve rápido para ganar la carrera!
                        </h2>
                        <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                      </div>

                      <div className="relative inline-block">
                        <div className="text-4xl sm:text-6xl font-bold text-blue-600 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-4 sm:p-6 border-4 border-blue-200 shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-4">
                          <span>{currentProblem.num1}</span>
                          <Plus className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                          <span>{currentProblem.num2}</span>
                          <span className="text-green-500">=</span>
                          <span className="text-gray-400">?</span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center animate-bounce">
                          <Car className="w-3 h-3 text-white" />
                        </div>
                      </div>

                      {/* Timer */}
                      <div className="flex items-center justify-center gap-4">
                        <Timer className="w-5 h-5 text-red-500" />
                        <div className="w-48 sm:w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-100 ${timePercentage > 50
                                ? "bg-green-500"
                                : timePercentage > 25
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            style={{ width: `${timePercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{Math.ceil(problemTimeLeft / 1000)}s</span>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="font-medium">{currentGameLevel?.description}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {currentProblemIndex + 1} de {currentGameLevel?.numbersPerLevel}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Answer Input */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-yellow-300 shadow-2xl hover:shadow-yellow-200/50 transition-all duration-500 ${animatedElements.has("input") ? "animate-bounce-in" : "opacity-0"
                  }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                      Escribe tu respuesta
                      <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                    <Input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      placeholder="Tu respuesta..."
                      className="text-center text-2xl sm:text-3xl font-bold h-16 border-4 border-yellow-300 rounded-xl focus:border-yellow-500 focus:ring-yellow-400"
                      disabled={isAnswering || !isGameActive}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && userAnswer) {
                          handleSubmitAnswer()
                        }
                      }}
                    />

                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!userAnswer || isAnswering || !isGameActive}
                      className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400 hover:border-green-500"
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <Car className="w-5 h-5 group-hover:animate-bounce" />
                        <span className="text-base">¡Acelerar!</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </div>

                  {/* Instructions */}
                  <div className="text-center mt-4 text-sm text-gray-600">
                    <p>💡 Presiona Enter o haz clic en "¡Acelerar!" para enviar tu respuesta</p>
                  </div>
                </CardContent>
              </Card>

              {/* Race Track */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 border-green-300 shadow-2xl hover:shadow-green-200/50 transition-all duration-500 ${animatedElements.has("race") ? "animate-bounce-in" : "opacity-0"
                  }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <Flag className="w-5 h-5 text-green-500 animate-pulse" />
                      Pista de Carrera
                      <Flag className="w-5 h-5 text-green-500 animate-pulse" />
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto"></div>
                  </div>

                  <div className="relative bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-green-300">
                    {/* Línea de meta */}
                    <div className="absolute right-4 top-0 bottom-0 w-2 bg-gradient-to-b from-red-500 via-white to-red-500 opacity-50"></div>

                    {/* Pistas de carrera */}
                    {racePositions.map((position, index) => (
                      <div key={position.player} className="relative mb-4 last:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 rounded-full ${carColors[position.car]}`}></div>
                          <span className="text-sm font-bold text-gray-700">
                            {position.player === 0 ? "TÚ" : `Oponente ${position.player}`}
                          </span>
                          <span className="text-xs text-gray-500">{Math.round(position.position)}%</span>
                        </div>

                        {/* Pista */}
                        <div className="relative h-12 bg-gray-200 rounded-full border-2 border-gray-300 overflow-hidden">
                          {/* Líneas de la pista */}
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-0.5 bg-white opacity-50"></div>
                          </div>

                          {/* Carro */}
                          <div
                            className={`
                              absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out
                              w-10 h-8 flex items-center justify-center text-lg animate-car-bounce
                              ${position.player === 0 ? "z-10" : "z-5"}
                            `}
                            style={{
                              left: `${Math.min(position.position, 90)}%`,
                              transform: "translateY(-50%) scaleX(1)",
                            }}
                          >
                            <span className="drop-shadow-lg">
                              {carEmojis[position.car]}
                            </span>
                            {position.player === 0 && (
                              <div className="absolute -top-2 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Position Display */}
                  <div className="text-center mt-4">
                    <Badge
                      className={`text-sm px-4 py-2 font-bold shadow-lg ${playerPosition >= 80
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : playerPosition >= 50
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-blue-500 to-indigo-500"
                        }`}
                    >
                      Tu posición: {Math.round(playerPosition)}%
                    </Badge>
                  </div>
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