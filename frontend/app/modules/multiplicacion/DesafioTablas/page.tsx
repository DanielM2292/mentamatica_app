"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useDesafioTablas } from "@/hooks/multiplicacion/useDesafioTablas"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Zap, Target, Trophy, Flame, Timer, CheckCircle, X, Keyboard, Smartphone } from "lucide-react"
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
    tableCells,
    currentCell,
    currentCellIndex,
    aciertos,
    errores,
    completedCells,
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
    inputValue,
    gameContainerRef,
    inputRef,
    handleInputChange,
    handleSubmit,
    handleNextLevel,
    handleRestart,
  } = useDesafioTablas()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [lightning, setLightning] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [speedLines, setSpeedLines] = useState<Array<{ id: number; delay: number; duration: number }>>([])
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false)

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(isTouch)
      setShowVirtualKeyboard(isTouch)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Animaciones de entrada optimizadas para velocidad
  useEffect(() => {
    setIsVisible(true)

    // Generar líneas de velocidad
    const lines = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.1,
      duration: 1.5 + Math.random() * 0.5,
    }))
    setSpeedLines(lines)

    const elements = ["timer", "problem", "table", "input", "stats"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 150)
    })
  }, [])

  // Efectos de rayo para racha
  const createLightning = () => {
    const bolts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setLightning(bolts)
    setTimeout(() => setLightning([]), 1500)
  }

  useEffect(() => {
    if (streak > 0 && streak % 3 === 0) {
      createLightning()
    }
  }, [streak])

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Manejar tecla Enter
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isGameActive) {
        handleSubmit()
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [handleSubmit, isGameActive])

  // Teclado virtual para dispositivos táctiles
  const VirtualKeyboard = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    
    const handleNumberClick = (num: number) => {
      handleInputChange(inputValue + num.toString())
      // Vibración táctil
      if ('vibrate' in navigator) {
        navigator.vibrate(10)
      }
    }

    const handleBackspace = () => {
      handleInputChange(inputValue.slice(0, -1))
      if ('vibrate' in navigator) {
        navigator.vibrate(15)
      }
    }

    const handleClear = () => {
      handleInputChange('')
      if ('vibrate' in navigator) {
        navigator.vibrate(20)
      }
    }

    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-xl p-3 sm:p-4 border-2 border-purple-300 shadow-xl">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {numbers.slice(1, 4).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg sm:text-xl rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {numbers.slice(4, 7).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg sm:text-xl rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {numbers.slice(7, 10).map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg sm:text-xl rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleClear}
            className="h-12 sm:h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
          >
            Limpiar
          </button>
          <button
            onClick={() => handleNumberClick(0)}
            className="h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg sm:text-xl rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-12 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm sm:text-base rounded-lg transition-all duration-200 active:scale-95 touch-manipulation shadow-lg"
          >
            ←
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo de velocidad con gradientes dinámicos */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600">
        {/* Líneas de velocidad */}
        <div className="absolute inset-0">
          {speedLines.map((line) => (
            <div
              key={line.id}
              className="absolute bg-white/20 h-0.5 pointer-events-none"
              style={{
                left: '0%',
                top: `${10 + line.id * 7}%`,
                width: '100%',
                animation: `speed-line ${line.duration}s linear infinite`,
                animationDelay: `${line.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Partículas de energía */}
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-xl opacity-70 pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `energy-pulse ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ⚡
            </div>
          ))}
        </div>
      </div>

      {/* Rayos de racha */}
      {lightning.map((bolt) => (
        <div
          key={bolt.id}
          className="fixed pointer-events-none z-50 text-6xl text-yellow-300"
          style={{
            left: `${bolt.x}%`,
            top: `${bolt.y}%`,
            animation: `lightning-strike 1.5s ease-out forwards`,
            animationDelay: `${bolt.id * 0.1}s`,
          }}
        >
          ⚡
        </div>
      ))}

      <style jsx>{`
        @keyframes lightning-strike {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes speed-line {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        
        @keyframes energy-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
        }
        
        @keyframes slide-speed {
          0% { transform: translateX(-30px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes glow-speed {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        
        @keyframes timer-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-slide-speed { animation: slide-speed 0.5s ease-out forwards; }
        .animate-glow-speed { animation: glow-speed 2s ease-in-out infinite; }
        .animate-timer-pulse { animation: timer-pulse 1s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-2 sm:pt-4 relative z-10">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/multiplicacion.png"
            name="Desafío de Tablas"
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
            <div className="mt-3 sm:mt-6 space-y-3 sm:space-y-6" ref={gameContainerRef}>
              {/* Timer y estadísticas de velocidad */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-blue-400 shadow-2xl animate-glow-speed ${
                  animatedElements.has("timer") ? "animate-slide-speed" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div className="text-center bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-2 sm:p-3 border-2 border-red-300">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <Timer className={`w-4 h-4 sm:w-5 sm:h-5 text-red-600 ${timeRemaining <= 30 ? 'animate-timer-pulse' : ''}`} />
                        <span className="font-bold text-red-800 text-xs sm:text-sm">Tiempo</span>
                      </div>
                      <div className={`text-lg sm:text-xl font-bold ${timeRemaining <= 30 ? 'text-red-700 animate-timer-pulse' : 'text-red-600'}`}>
                        {formatTime(timeRemaining)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Problema actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-purple-400 shadow-2xl ${
                  animatedElements.has("problem") ? "animate-slide-speed" : "opacity-0"
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" />
                      <h3 className="text-lg sm:text-2xl font-bold text-purple-800">
                        ¡Velocidad Mental!
                      </h3>
                      <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    
                    {currentCell && (
                      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 border-2 sm:border-4 border-indigo-300">
                        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-indigo-800 mb-3 sm:mb-4">
                          {currentCell.multiplicand} × {currentCell.multiplier} = ?
                        </div>
                        
                        {/* Input de respuesta mejorado */}
                        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-2 text-indigo-600 text-sm">
                            {isTouchDevice ? (
                              <>
                                <Smartphone className="w-4 h-4" />
                                <span>Usa el teclado táctil</span>
                              </>
                            ) : (
                              <>
                                <Keyboard className="w-4 h-4" />
                                <span>Escribe tu respuesta</span>
                              </>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                            <input
                              ref={inputRef}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              value={inputValue}
                              onChange={(e) => handleInputChange(e.target.value)}
                              placeholder="Tu respuesta"
                              className="w-32 sm:w-40 h-12 sm:h-14 text-xl sm:text-2xl font-bold text-center border-3 sm:border-4 border-indigo-400 rounded-xl focus:border-purple-500 focus:outline-none bg-white/90 touch-manipulation"
                              disabled={!isGameActive}
                              readOnly={isTouchDevice}
                            />
                            <Button
                              onClick={handleSubmit}
                              disabled={!inputValue.trim() || !isGameActive}
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-6 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation shadow-lg"
                            >
                              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                              ¡Enviar!
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Teclado virtual para dispositivos táctiles */}
              {showVirtualKeyboard && isTouchDevice && (
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-green-400 shadow-2xl ${
                    animatedElements.has("input") ? "animate-slide-speed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg font-bold text-green-800 flex items-center justify-center gap-2">
                        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                        Teclado Táctil
                      </h4>
                    </div>
                    <VirtualKeyboard />
                  </CardContent>
                </Card>
              )}

              {/* Tabla de progreso */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-green-400 shadow-2xl ${
                  animatedElements.has("table") ? "animate-slide-speed" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-xl font-bold text-green-800 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
                      Tabla de Velocidad
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {tableCells.map((cell, index) => (
                      <div
                        key={cell.id}
                        className={`
                          aspect-square rounded-lg sm:rounded-xl border-2 sm:border-3 flex flex-col items-center justify-center p-1 sm:p-2 transition-all duration-300
                          ${cell.isActive 
                            ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 animate-glow-speed scale-105 sm:scale-110' 
                            : cell.isCompleted
                              ? cell.isCorrect
                                ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 text-white'
                                : 'bg-gradient-to-br from-red-400 to-red-600 border-red-700 text-white'
                              : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400'
                          }
                        `}
                      >
                        <div className="text-xs sm:text-sm font-bold mb-1">
                          {cell.multiplicand} × {cell.multiplier}
                        </div>
                        
                        {cell.isCompleted ? (
                          <div className="flex flex-col items-center">
                            {cell.isCorrect ? (
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white mb-1" />
                            ) : (
                              <X className="w-3 h-3 sm:w-4 sm:h-4 text-white mb-1" />
                            )}
                            <div className="text-xs font-bold">{cell.result}</div>
                          </div>
                        ) : cell.isActive ? (
                          <div className="text-base sm:text-lg animate-pulse">⚡</div>
                        ) : (
                          <div className="text-base sm:text-lg opacity-50">?</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-blue-100 to-indigo-100 border-2 sm:border-4 border-blue-300 shadow-2xl ${
                  animatedElements.has("stats") ? "animate-slide-speed" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-bold">¡Desafío de Velocidad Mental!</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-blue-600">
                    Completa todas las multiplicaciones antes de que se acabe el tiempo
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