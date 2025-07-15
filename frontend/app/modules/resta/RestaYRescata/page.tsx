"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useRestaYRescata } from "@/hooks/resta/useRestaYRescata"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Navigation, Grid as Bridge, CheckCircle, ArrowRight, Waves, Anchor, Ship, Compass } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("RestaYRescata page loaded")

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
    currentSegmentIndex,
    currentSegment,
    segments,
    selectedAnswer,
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
    showFeedback,
    isCorrect,
    gameContainerRef,
    handleAnswerSelect,
    handleNextLevel,
    handleRestart,
  } = useRestaYRescata()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [bridgeAnimation, setBridgeAnimation] = useState(false)
  const [waveElements, setWaveElements] = useState<Array<{ id: number; delay: number; duration: number }>>([])

  // Animaciones de entrada con timing cognitivo óptimo
  useEffect(() => {
    setIsVisible(true)

    // Generar ondas oceánicas
    const waves = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: i * 0.4,
      duration: 3 + i * 0.3,
    }))
    setWaveElements(waves)

    const elements = ["ocean", "bridge", "problem", "progress", "options", "rescue"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 250) // 250ms para fluidez visual
    })
  }, [])

  // Animación del puente
  useEffect(() => {
    if (currentSegmentIndex > 0) {
      setBridgeAnimation(true)
      setTimeout(() => setBridgeAnimation(false), 1000)
    }
  }, [currentSegmentIndex])

  // Celebración con partículas marinas
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

  console.log("Rendering RestaYRescata with segment:", currentSegmentIndex, "problem:", currentSegment)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo oceánico con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-200 via-blue-400 to-blue-800">
        {/* Nubes flotantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/70 rounded-full opacity-90"
              style={{
                left: `${5 + i * 12}%`,
                top: `${3 + Math.random() * 25}%`,
                width: `${40 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 30}px`,
                animation: `float-cloud ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Olas del océano con movimiento realista */}
        <div className="absolute bottom-0 w-full">
          {waveElements.map((wave) => (
            <div
              key={wave.id}
              className="absolute w-full bg-blue-600/30"
              style={{
                bottom: `${wave.id * 12}px`,
                height: `${15 + wave.id * 3}px`,
                animation: `ocean-wave ${wave.duration}s ease-in-out infinite`,
                animationDelay: `${wave.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Gaviotas y elementos marinos */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-white/80 text-xl"
            style={{
              left: `${15 + i * 25}%`,
              top: `${8 + Math.random() * 30}%`,
              animation: `fly-seagull ${5 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {i % 2 === 0 ? '🕊️' : '⛵'}
          </div>
        ))}
        
        {/* Burbujas oceánicas */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 50}%`,
                animation: `bubble-rise ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Partículas de celebración marina */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-bridge 3s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          {["🌊", "⚓", "🚢", "🏆", "⭐", "💎", "🐚", "🌟", "⛵", "🦈", "🐙", "🏝️"][particle.id % 12]}
        </div>
      ))}

      <style jsx>{`
        @keyframes celebration-bridge {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-80px) scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-160px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes float-cloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(30px) translateY(-15px); }
        }
        
        @keyframes ocean-wave {
          0%, 100% { transform: translateX(0) scaleY(1); opacity: 0.3; }
          50% { transform: translateX(-30px) scaleY(1.3); opacity: 0.6; }
        }
        
        @keyframes fly-seagull {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(40px) translateY(-20px) rotate(5deg); }
          75% { transform: translateX(-25px) translateY(-8px) rotate(-3deg); }
        }
        
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0.7; }
          50% { transform: translateY(-100px) scale(1); opacity: 0.4; }
          100% { transform: translateY(-200px) scale(0.3); opacity: 0; }
        }
        
        @keyframes bridge-cross {
          0% { transform: translateX(-15px) scale(0.95); }
          100% { transform: translateX(15px) scale(1.05); }
        }
        
        @keyframes slide-up-bridge {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-pulse-ocean {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        .animate-bridge-cross { animation: bridge-cross 1s ease-in-out; }
        .animate-slide-up-bridge { animation: slide-up-bridge 0.6s ease-out forwards; }
        .animate-glow-pulse-ocean { animation: glow-pulse-ocean 2s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/resta.png"
            name="Resta y Rescata"
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
              {/* Estado oceánico y navegación */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl animate-glow-pulse-ocean ${
                  animatedElements.has("ocean") ? "animate-slide-up-bridge" : "opacity-0"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
                      <Ship className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                      Misión de Rescate Oceánico
                      <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        <span className="font-bold text-green-600 text-sm sm:text-base">
                          Segmento: {currentSegmentIndex + 1}/{segments.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        <span className="font-bold text-blue-600 text-sm sm:text-base">
                          Precisión: {aciertos + errores > 0 ? Math.round((aciertos / (aciertos + errores)) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-blue-700 px-2">
                      Navega por el océano resolviendo cada operación para avanzar hacia el rescate
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Progreso del puente marítimo */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-cyan-400 shadow-2xl ${
                  animatedElements.has("bridge") ? "animate-slide-up-bridge" : "opacity-0"
                } ${bridgeAnimation ? "animate-bridge-cross" : ""}`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-cyan-800 mb-4 flex items-center justify-center gap-2">
                      <Bridge className="w-5 h-5" />
                      Ruta de Navegación
                    </h4>
                    
                    {/* Visualización del puente marítimo */}
                    <div className="relative w-full max-w-lg mx-auto mb-4">
                      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 rounded-lg p-3 border-2 border-cyan-300">
                        {segments.map((_, index) => (
                          <div
                            key={index}
                            className={`
                              w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-500 relative
                              ${index < currentSegmentIndex
                                ? 'bg-green-500 border-green-600 text-white shadow-lg'
                                : index === currentSegmentIndex
                                ? 'bg-yellow-400 border-yellow-500 text-gray-800 animate-pulse shadow-lg'
                                : 'bg-gray-300 border-gray-400 text-gray-600'
                              }
                            `}
                          >
                            {index < currentSegmentIndex ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : index === currentSegmentIndex ? (
                              '🚢'
                            ) : (
                              '⚓'
                            )}
                            
                            {/* Ondas alrededor del segmento actual */}
                            {index === currentSegmentIndex && (
                              <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-75" />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between text-xs text-gray-600">
                        <span>🏝️ Inicio</span>
                        <span className="font-bold text-blue-600">
                          Progreso: {Math.round((currentSegmentIndex / segments.length) * 100)}%
                        </span>
                        <span>🏆 Rescate</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problema actual */}
              {currentSegment && (
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                    animatedElements.has("problem") ? "animate-slide-up-bridge" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-100 rounded-2xl p-6 sm:p-8 mb-6 border-3 border-blue-300 relative overflow-hidden">
                        {/* Efecto de ondas de fondo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        
                        <div className="relative z-10">
                          <div className="text-4xl sm:text-6xl font-bold text-blue-800 mb-3">
                            {currentSegment.minuend} - {currentSegment.subtrahend} = ?
                          </div>
                          <p className="text-blue-600 text-sm sm:text-base">
                            Resuelve para navegar hacia el siguiente punto
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-blue-700">
                        <Waves className="w-5 h-5" />
                        <span className="text-sm">¡Navega con cuidado por las aguas!</span>
                        <Waves className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Opciones de respuesta */}
              {currentSegment && (
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl ${
                    animatedElements.has("options") ? "animate-slide-up-bridge" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.4s" }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-green-800 flex items-center justify-center gap-2">
                        <Navigation className="w-5 h-5" />
                        Elige tu Rumbo
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {currentSegment.options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelect(option)}
                          disabled={showFeedback || !isGameActive}
                          className={`
                            h-16 sm:h-20 text-xl sm:text-2xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden
                            ${showFeedback && selectedAnswer === option
                              ? isCorrect
                                ? 'bg-green-600 hover:bg-green-600 text-white border-4 border-green-400 shadow-lg'
                                : 'bg-red-600 hover:bg-red-600 text-white border-4 border-red-400 shadow-lg'
                              : showFeedback && option === currentSegment?.result
                              ? 'bg-green-600 hover:bg-green-600 text-white border-4 border-green-400 shadow-lg'
                              : 'bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500 shadow-md'
                            }
                          `}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          {/* Efecto de brillo */}
                          {!showFeedback && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                          )}
                          <span className="relative z-10">{option}</span>
                        </Button>
                      ))}
                    </div>
                    
                    {showFeedback && (
                      <div className="mt-4 text-center">
                        <div className={`text-lg sm:text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? '¡Excelente navegación! Avanzas por el océano 🌊' : '¡Cuidado! Revisa tu rumbo 🧭'}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Información de rescate */}
              <Card
                className={`bg-gradient-to-r from-cyan-100 via-blue-100 to-cyan-100 border-4 border-cyan-400 shadow-2xl ${
                  animatedElements.has("rescue") ? "animate-slide-up-bridge" : "opacity-0"
                }`}
                style={{ animationDelay: "0.6s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-cyan-700 mb-2">
                    <Anchor className="w-5 h-5" />
                    <span className="font-bold">Operación de Rescate Marítimo</span>
                    <Ship className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-cyan-600">
                    Navega por todos los puntos del océano para completar la misión de rescate
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-4 text-xs text-cyan-500">
                    <span>🌊 Aguas tranquilas</span>
                    <span>⚓ Puntos seguros</span>
                    <span>🏆 Rescate exitoso</span>
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