"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useMemoriaInversa } from "@/hooks/resta/useMemoriaInversa"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Brain, CheckCircle, ArrowRight, Lightbulb, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("MemoriaInversa page loaded")

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
    cards,
    flippedCards,
    matchedPairs,
    aciertos,
    errores,
    attempts,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showHint,
    gameContainerRef,
    handleCardPress,
    handleNextLevel,
    handleRestart,
    toggleHint,
  } = useMemoriaInversa()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [brainWaves, setBrainWaves] = useState<Array<{ id: number; delay: number; duration: number }>>([])

  // Animaciones de entrada con timing cognitivo óptimo
  useEffect(() => {
    setIsVisible(true)

    // Generar ondas cerebrales
    const waves = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      duration: 2 + i * 0.2,
    }))
    setBrainWaves(waves)

    const elements = ["brain", "memory", "cards", "progress", "hint"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 300) // 300ms es óptimo para procesamiento visual
    })
  }, [])

  // Celebración con partículas neuronales
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
    if (aciertos > 0) {
      createCelebration()
    }
  }, [aciertos])

  console.log("Rendering MemoriaInversa with level:", currentLevel, "pairs:", matchedPairs)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo neuronal con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600">
        {/* Red neuronal de fondo */}
        <div className="absolute inset-0">
          {/* Neuronas principales */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 bg-white/20 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `neuron-pulse ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
          
          {/* Conexiones sinápticas */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 h-0.5"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${50 + Math.random() * 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `synapse-flow ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Ondas cerebrales */}
        <div className="absolute inset-0">
          {brainWaves.map((wave) => (
            <div
              key={wave.id}
              className="absolute w-full h-1 bg-white/15"
              style={{
                top: `${15 + wave.id * 12}%`,
                animation: `brain-wave ${wave.duration}s ease-in-out infinite`,
                animationDelay: `${wave.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Partículas de pensamiento */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white/30 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `thought-float ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {["💭", "🧠", "💡", "⚡", "🌟"][i % 5]}
            </div>
          ))}
        </div>
      </div>

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-4xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-memory 3s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          {["🧠", "💡", "⚡", "🎯", "🌟", "💫", "🔥", "💎"][particle.id % 8]}
        </div>
      ))}

      <style jsx>{`
        @keyframes celebration-memory {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-80px) scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-160px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes neuron-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        
        @keyframes synapse-flow {
          0% { opacity: 0; transform: scaleX(0); }
          50% { opacity: 0.6; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        
        @keyframes brain-wave {
          0%, 100% { transform: translateX(-100px); opacity: 0; }
          50% { transform: translateX(100px); opacity: 0.4; }
        }
        
        @keyframes thought-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes flip-card {
          0% { transform: rotateY(0); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(0); }
        }
        
        @keyframes slide-up-memory {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.4); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8); }
        }
        
        .animate-flip-card { animation: flip-card 0.6s ease-in-out; }
        .animate-slide-up-memory { animation: slide-up-memory 0.6s ease-out forwards; }
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
            name="Memoria Inversa"
            totalSets={currentGameLevel?.pairs || 1}
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
              {/* Estado del cerebro y memoria */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl animate-glow-pulse ${
                  animatedElements.has("brain") ? "animate-slide-up-memory" : "opacity-0"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
                      <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                      Entrenamiento Neuronal
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        <span className="font-bold text-red-600 text-sm sm:text-base">Intentos: {attempts}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        <span className="font-bold text-yellow-600 text-sm sm:text-base">
                          Conexiones: {matchedPairs}/{currentGameLevel?.pairs}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        <span className="font-bold text-purple-600 text-sm sm:text-base">Precisión: {attempts > 0 ? Math.round((aciertos / attempts) * 100) : 0}%</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-purple-700 px-2">
                      Conecta las neuronas: cada resta debe encontrar su suma complementaria
                    </p>
                  </div>

                  {/* Sistema de pistas cognitivas */}
                  <div className="text-center mb-4">
                    <Button
                      onClick={toggleHint}
                      variant="outline"
                      size="sm"
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300 transition-all duration-300 transform hover:scale-105"
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      {showHint ? 'Ocultar' : 'Activar'} Sinapsis
                    </Button>
                    {showHint && (
                      <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 animate-slide-up-memory">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-purple-800">Conexión Neuronal</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          💡 <strong>Estrategia:</strong> Si encuentras "12 - 5", busca "7 + 5" porque ambas operaciones conectan al mismo resultado: 12.
                        </p>
                        <p className="text-xs text-purple-600 mt-2">
                          🧠 Las cartas rojas son restas, las verdes son sumas de verificación
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Red neuronal de cartas */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-indigo-400 shadow-2xl ${
                  animatedElements.has("cards") ? "animate-slide-up-memory" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-indigo-800 flex items-center justify-center gap-2">
                      <Brain className="w-5 h-5" />
                      Red Neuronal de Memoria
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => handleCardPress(card.id)}
                        className={`
                          aspect-square rounded-xl border-3 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden
                          ${card.isFlipped || card.isMatched
                            ? card.type === 'subtraction'
                              ? 'bg-gradient-to-br from-red-400 via-red-500 to-red-600 border-red-700 text-white shadow-lg'
                              : 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 border-green-700 text-white shadow-lg'
                            : 'bg-gradient-to-br from-purple-300 via-indigo-300 to-blue-300 border-purple-500 hover:from-purple-400 hover:to-indigo-400 shadow-md'
                          }
                          ${card.isMatched ? 'ring-4 ring-yellow-400 ring-opacity-75 animate-glow-pulse' : ''}
                          ${flippedCards.includes(card.id) ? 'animate-flip-card' : ''}
                        `}
                      >
                        {/* Efecto de brillo neuronal */}
                        {(card.isFlipped || card.isMatched) && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                        )}
                        
                        <div className="w-full h-full flex items-center justify-center p-1 relative z-10">
                          {card.isFlipped || card.isMatched ? (
                            <div className="text-center">
                              <div className="text-xs sm:text-sm md:text-base font-bold leading-tight mb-1">
                                {card.problem}
                              </div>
                              {card.isMatched && (
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 mx-auto animate-pulse" />
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="text-2xl sm:text-3xl mb-1">🧠</div>
                              <div className="text-xs text-purple-700 font-medium">Neurona</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progreso neuronal */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl ${
                  animatedElements.has("progress") ? "animate-slide-up-memory" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                      Actividad Cerebral
                    </h3>
                    
                    {/* Barra de progreso neuronal */}
                    <div className="relative w-full bg-gray-200 rounded-full h-4 sm:h-5 mb-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-full rounded-full transition-all duration-1000 relative animate-glow-pulse"
                        style={{ width: `${(matchedPairs / (currentGameLevel?.pairs || 1)) * 100}%` }}
                      >
                        {/* Efecto de pulso neuronal */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                        <div className="font-bold text-purple-800">Conexiones</div>
                        <div className="text-purple-600">{matchedPairs} / {currentGameLevel?.pairs}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="font-bold text-blue-800">Eficiencia</div>
                        <div className="text-blue-600">{attempts > 0 ? Math.round((aciertos / attempts) * 100) : 0}%</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 border border-green-200 sm:col-span-1 col-span-2">
                        <div className="font-bold text-green-800">Sinapsis</div>
                        <div className="text-green-600">{aciertos} exitosas</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información cognitiva */}
              <Card
                className={`bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-indigo-300 shadow-2xl ${
                  animatedElements.has("hint") ? "animate-slide-up-memory" : "opacity-0"
                }`}
                style={{ animationDelay: "0.6s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-indigo-700 mb-2">
                    <Brain className="w-5 h-5" />
                    <span className="font-bold">Entrenamiento de Memoria de Trabajo</span>
                    <Brain className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-indigo-600">
                    Fortalece las conexiones neuronales encontrando las parejas matemáticas complementarias
                  </p>
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