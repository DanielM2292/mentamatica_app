"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { usePulsaCifraCorrecta } from "@/hooks/division/usePulsaCifraCorrecta"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Timer, Target, Trophy, Flame, Clock, CheckCircle, X } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  return (
    <TimerProvider>
      <GameWrapper />
    </TimerProvider>
  )
}

const GameWrapper = () => {
  const {
    currentLevel,
    currentProblem,
    options,
    aciertos,
    errores,
    problemsCompleted,
    streak,
    maxStreak,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    timeRemaining,
    selectedOption,
    gameContainerRef,
    handleOptionSelect,
    handleNextLevel,
    handleRestart,
  } = usePulsaCifraCorrecta()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [speedLines, setSpeedLines] = useState<Array<{ id: number; delay: number; duration: number }>>([])
  const [energyBursts, setEnergyBursts] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  // Animaciones de entrada optimizadas para velocidad
  useEffect(() => {
    setIsVisible(true)

    // Generar líneas de velocidad
    const lines = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
      duration: 1 + Math.random() * 0.5,
    }))
    setSpeedLines(lines)

    const elements = ["timer", "problem", "options", "stats", "progress"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 100) // Timing muy rápido para sensación de velocidad
    })
  }, [])

  // Crear ráfagas de energía para racha
  const createEnergyBursts = () => {
    const bursts = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['text-yellow-400', 'text-orange-400', 'text-red-400', 'text-purple-400'][i % 4],
    }))
    setEnergyBursts(bursts)
    setTimeout(() => setEnergyBursts([]), 2000)
  }

  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      createEnergyBursts()
    }
  }, [streak])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo de velocidad extrema */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-400 via-orange-500 to-yellow-600">
        {/* Líneas de velocidad */}
        <div className="absolute inset-0">
          {speedLines.map((line) => (
            <div
              key={line.id}
              className="absolute bg-white/30 h-1"
              style={{
                left: '0%',
                top: `${5 + line.id * 6}%`,
                width: '100%',
                animation: `speed-rush ${line.duration}s linear infinite`,
                animationDelay: `${line.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Partículas de energía */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-white/40 text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `energy-rush ${1.5 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ⚡
            </div>
          ))}
        </div>
        
        {/* Ondas de velocidad */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 h-2 rounded-full"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${100 + Math.random() * 200}px`,
                animation: `velocity-wave ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Ráfagas de energía */}
      {energyBursts.map((burst) => (
        <div
          key={burst.id}
          className={`fixed pointer-events-none z-50 text-5xl ${burst.color}`}
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
            animation: `energy-explosion 2s ease-out forwards`,
            animationDelay: `${burst.id * 0.1}s`,
          }}
        >
          💥
        </div>
      ))}

      <style jsx>{`
        @keyframes energy-explosion {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes speed-rush {
          0% { transform: translateX(-200px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        
        @keyframes energy-rush {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
        }
        
        @keyframes velocity-wave {
          0%, 100% { transform: translateY(0) scaleX(1); }
          50% { transform: translateY(-10px) scaleX(1.2); }
        }
        
        @keyframes slide-velocity {
          0% { transform: translateX(-40px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes glow-velocity {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.8); }
        }
        
        @keyframes option-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes timer-urgent {
          0%, 100% { transform: scale(1); color: rgb(239, 68, 68); }
          50% { transform: scale(1.1); color: rgb(220, 38, 38); }
        }
        
        .animate-slide-velocity { animation: slide-velocity 0.4s ease-out forwards; }
        .animate-glow-velocity { animation: glow-velocity 1.5s ease-in-out infinite; }
        .animate-option-pulse { animation: option-pulse 0.3s ease-in-out infinite; }
        .animate-timer-urgent { animation: timer-urgent 0.5s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/division.png"
            name="Pulsa la Cifra Correcta"
            totalSets={currentGameLevel?.problemsPerLevel || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado 
              aciertos={aciertos} 
              estrellas={estrellas} 
              errores={errores} 
              onRestart={handleRestart} 
            />
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
              {/* Timer y estadísticas de velocidad */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-red-400 shadow-2xl animate-glow-velocity ${
                  animatedElements.has("timer") ? "animate-slide-velocity" : "opacity-0"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-3 border-2 border-red-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Timer className={`w-5 h-5 text-red-600 ${timeRemaining <= 2 ? 'animate-timer-urgent' : ''}`} />
                        <span className="font-bold text-red-800">Tiempo</span>
                      </div>
                      <div className={`text-2xl font-bold ${timeRemaining <= 2 ? 'text-red-700 animate-timer-urgent' : 'text-red-600'}`}>
                        {timeRemaining}s
                      </div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl p-3 border-2 border-orange-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-orange-600" />
                        <span className="font-bold text-orange-800">Racha</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700">{streak}</div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-3 border-2 border-yellow-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <span className="font-bold text-yellow-800">Mejor</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-700">{maxStreak}</div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-3 border-2 border-green-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-800">Progreso</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {problemsCompleted}/{currentGameLevel?.problemsPerLevel}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problema actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-orange-400 shadow-2xl ${
                  animatedElements.has("problem") ? "animate-slide-velocity" : "opacity-0"
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                      <h3 className="text-xl sm:text-2xl font-bold text-orange-800">
                        ¡Velocidad Extrema!
                      </h3>
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-4 sm:p-6 border-4 border-red-300">
                        <div className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-800 mb-4">
                          {currentProblem.expression} = ?
                        </div>
                        <p className="text-sm sm:text-lg text-red-600">
                          ¡Pulsa la respuesta correcta antes de que se acabe el tiempo!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Opciones de respuesta */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                  animatedElements.has("options") ? "animate-slide-velocity" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-yellow-800 flex items-center justify-center gap-2">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                      ¡Elige Rápido!
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={selectedOption !== null || !isGameActive}
                        className={`
                          aspect-square rounded-2xl border-4 transition-all duration-200 transform
                          ${selectedOption === option.id
                            ? option.isCorrect
                              ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 scale-110'
                              : 'bg-gradient-to-br from-red-400 to-red-600 border-red-700 scale-110'
                            : selectedOption !== null
                              ? option.isCorrect
                                ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 animate-option-pulse'
                                : `bg-gradient-to-br ${option.color} border-opacity-50 opacity-50`
                              : `bg-gradient-to-br ${option.color} border-opacity-80 hover:scale-105 active:scale-95 animate-option-pulse`
                          }
                          ${selectedOption === null ? 'cursor-pointer' : 'cursor-not-allowed'}
                          shadow-lg text-white font-bold text-xl sm:text-2xl md:text-3xl
                        `}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className="text-2xl sm:text-3xl mb-2">{option.emoji}</div>
                          <div>{option.value}</div>
                          {selectedOption === option.id && (
                            <div className="mt-2">
                              {option.isCorrect ? (
                                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                              ) : (
                                <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl ${
                  animatedElements.has("stats") ? "animate-slide-velocity" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-3 border-2 border-green-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-800">Aciertos</span>
                      </div>
                      <div className="text-xl font-bold text-green-700">{aciertos}</div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-3 border-2 border-red-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <X className="w-5 h-5 text-red-600" />
                        <span className="font-bold text-red-800">Errores</span>
                      </div>
                      <div className="text-xl font-bold text-red-700">{errores}</div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-3 border-2 border-blue-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-blue-800">Velocidad</span>
                      </div>
                      <div className="text-xl font-bold text-blue-700">
                        {aciertos + errores > 0 ? Math.round((aciertos / (aciertos + errores)) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mt-4">
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-full rounded-full transition-all duration-500 animate-glow-velocity"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center mt-2 text-sm font-bold text-orange-700">
                      {Math.round(progress)}% completado
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-red-100 to-orange-100 border-4 border-red-300 shadow-2xl ${
                  animatedElements.has("progress") ? "animate-slide-velocity" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-red-700 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold">¡Desafío de Velocidad Mental!</span>
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-red-600">
                    Pulsa la respuesta correcta lo más rápido posible antes de que se acabe el tiempo
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