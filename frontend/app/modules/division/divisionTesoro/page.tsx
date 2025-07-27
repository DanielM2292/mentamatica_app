"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useDivisionTesoro } from "@/hooks/division/useDivisionTesoro"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Compass, Lightbulb, Sparkles, Trash as Treasure, Users, CheckCircle, X } from "lucide-react"
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
    treasureMaps,
    pirates,
    aciertos,
    errores,
    problemsCompleted,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showHint,
    selectedTreasure,
    currentMapIndex,
    userAnswer,
    gameContainerRef,
    inputRef,
    treasureTypes,
    currentTreasureType,
    handleInputChange,
    handleSubmit,
    handleNextLevel,
    handleRestart,
    toggleHint,
  } = useDivisionTesoro()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [treasureSparkles, setTreasureSparkles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [waves, setWaves] = useState<Array<{ id: number; delay: number; duration: number }>>([])

  // Animaciones de entrada temática pirata
  useEffect(() => {
    setIsVisible(true)

    // Generar ondas del mar
    const seaWaves = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      duration: 3 + Math.random() * 2,
    }))
    setWaves(seaWaves)

    const elements = ["story", "map", "pirates", "input", "progress"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  // Crear chispas de tesoro
  const createTreasureSparkles = () => {
    const sparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['text-yellow-400', 'text-blue-400', 'text-purple-400', 'text-green-400'][i % 4],
    }))
    setTreasureSparkles(sparkles)
    setTimeout(() => setTreasureSparkles([]), 3000)
  }

  useEffect(() => {
    if (aciertos > 0) {
      createTreasureSparkles()
    }
  }, [aciertos])

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo pirata con mar y aventura */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-teal-500 to-blue-600">
        {/* Ondas del mar */}
        <div className="absolute inset-0">
          {waves.map((wave) => (
            <div
              key={wave.id}
              className="absolute bg-white/20 h-2 rounded-full"
              style={{
                left: '0%',
                top: `${70 + wave.id * 3}%`,
                width: '100%',
                animation: `sea-wave ${wave.duration}s ease-in-out infinite`,
                animationDelay: `${wave.delay}s`,
              }}
            />
          ))}
        </div>
        
        {/* Elementos piratas de fondo */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                animation: `pirate-float ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {['🏴‍☠️', '⚓', '🗺️', '💰', '🦜', '⛵', '🏝️', '🧭'][i]}
            </div>
          ))}
        </div>
        
        {/* Estrellas del tesoro */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-xl opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `treasure-twinkle ${3 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Chispas de tesoro */}
      {treasureSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className={`fixed pointer-events-none z-50 text-4xl ${sparkle.color}`}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: `treasure-burst 3s ease-out forwards`,
            animationDelay: `${sparkle.id * 0.1}s`,
          }}
        >
          💰
        </div>
      ))}

      <style jsx>{`
        @keyframes treasure-burst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes sea-wave {
          0%, 100% { transform: translateX(-50px); opacity: 0.3; }
          50% { transform: translateX(50px); opacity: 0.7; }
        }
        
        @keyframes pirate-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes treasure-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.4) rotate(180deg); opacity: 1; }
        }
        
        @keyframes slide-adventure {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-treasure {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
          50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
        }
        
        @keyframes map-reveal {
          0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes pirate-happy {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-slide-adventure { animation: slide-adventure 0.6s ease-out forwards; }
        .animate-glow-treasure { animation: glow-treasure 2s ease-in-out infinite; }
        .animate-map-reveal { animation: map-reveal 0.8s ease-out forwards; }
        .animate-pirate-happy { animation: pirate-happy 1s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/division"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/division.png"
            name="División del Tesoro"
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
              {/* Historia del tesoro */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl animate-glow-treasure ${
                  animatedElements.has("story") ? "animate-slide-adventure" : "opacity-0"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Map className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                      <h3 className="text-xl sm:text-2xl font-bold text-yellow-800">
                        ¡Aventura Pirata!
                      </h3>
                      <Map className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-4 sm:p-6 border-4 border-blue-300">
                        <div className="text-lg sm:text-xl text-blue-800 mb-4 font-medium">
                          📖 {currentProblem.story}
                        </div>
                        
                        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                          {currentProblem.expression} = ?
                        </div>
                        
                        <p className="text-sm sm:text-lg text-blue-600 mb-4">
                          ¿Cuántos {currentTreasureType.name} recibe cada pirata?
                        </p>
                        
                        {/* Sistema de pistas */}
                        <Button
                          onClick={toggleHint}
                          variant="outline"
                          size="sm"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300"
                        >
                          <Lightbulb className="w-4 h-4 mr-2" />
                          {showHint ? 'Ocultar' : 'Mostrar'} Pista del Mapa
                        </Button>
                        
                        {showHint && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              🗺️ <strong>Pista:</strong> Divide {currentProblem.dividend} {currentTreasureType.name} entre {currentProblem.divisor} piratas por igual.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Input de respuesta */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl ${
                  animatedElements.has("input") ? "animate-slide-adventure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Compass className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                      <h4 className="text-lg sm:text-xl font-bold text-purple-800">
                        Descifra el Mapa
                      </h4>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <input
                        ref={inputRef}
                        type="text"
                        value={userAnswer}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="¿Cuántos para cada uno?"
                        className="w-48 sm:w-56 h-12 sm:h-14 text-2xl sm:text-3xl font-bold text-center border-4 border-purple-400 rounded-xl focus:border-yellow-500 focus:outline-none bg-white/90"
                        disabled={!isGameActive}
                      />
                      <Button
                        onClick={handleSubmit}
                        disabled={!userAnswer.trim() || !isGameActive}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        <Treasure className="w-5 h-5 mr-2" />
                        ¡Buscar Tesoro!
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Piratas esperando */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl ${
                  animatedElements.has("pirates") ? "animate-slide-adventure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-green-800 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                      Tripulación Pirata
                    </h4>
                    <p className="text-sm text-green-600 mt-2">
                      Cada pirata espera su parte del tesoro
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {pirates.map((pirate) => (
                      <div
                        key={pirate.id}
                        className={`
                          bg-gradient-to-br ${pirate.color} rounded-xl p-4 border-3 border-opacity-80 text-white text-center transition-all duration-300
                          ${pirate.receivedCoins > 0 ? 'animate-pirate-happy border-yellow-400' : 'border-gray-600'}
                        `}
                      >
                        <div className="text-3xl sm:text-4xl mb-2">{pirate.emoji}</div>
                        <div className="font-bold text-sm sm:text-base mb-2">{pirate.name}</div>
                        <div className="bg-black/20 rounded-lg p-2">
                          <div className="text-xs sm:text-sm">Tesoro:</div>
                          <div className="text-lg sm:text-xl font-bold">
                            {pirate.receivedCoins} {currentTreasureType.emoji}
                          </div>
                        </div>
                        {pirate.receivedCoins === pirate.expectedCoins && pirate.receivedCoins > 0 && (
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 mx-auto mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mapa del tesoro */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl ${
                  animatedElements.has("map") ? "animate-slide-adventure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center mb-4">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-800 flex items-center justify-center gap-2">
                      <Map className="w-5 h-5 sm:w-6 sm:h-6" />
                      Mapa del Tesoro
                    </h4>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl border-3 border-yellow-300 p-4 min-h-[200px]">
                    {/* Decoración del mapa */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 text-2xl">🏝️</div>
                      <div className="absolute top-4 right-4 text-2xl">⚓</div>
                      <div className="absolute bottom-4 left-4 text-2xl">🦜</div>
                      <div className="absolute bottom-4 right-4 text-2xl">⛵</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 relative z-10">
                      {treasureMaps.map((map, index) => (
                        <div
                          key={map.id}
                          className={`
                            aspect-square rounded-xl border-3 p-3 text-center transition-all duration-300
                            ${map.isCompleted 
                              ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-700 text-white animate-glow-treasure' 
                              : map.isRevealed
                                ? index === currentMapIndex
                                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-700 text-white animate-map-reveal'
                                  : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700 text-white'
                                : 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-700 text-white opacity-50'
                            }
                          `}
                        >
                          <div className="text-2xl sm:text-3xl mb-2">
                            {map.isCompleted ? '✅' : map.isRevealed ? map.treasureType : '❓'}
                          </div>
                          <div className="text-xs sm:text-sm font-bold">
                            {map.isRevealed ? `${map.dividend} ÷ ${map.divisor}` : '???'}
                          </div>
                          {map.isCompleted && (
                            <div className="text-xs mt-1">= {map.quotient}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progreso */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl ${
                  animatedElements.has("progress") ? "animate-slide-adventure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-3 border-2 border-yellow-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Treasure className="w-5 h-5 text-yellow-600" />
                        <span className="font-bold text-yellow-800">Tesoros</span>
                      </div>
                      <div className="text-xl font-bold text-yellow-700">
                        {problemsCompleted}/{currentGameLevel?.problemsPerLevel}
                      </div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-3 border-2 border-green-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-green-800">Aciertos</span>
                      </div>
                      <div className="text-xl font-bold text-green-700">{aciertos}</div>
                    </div>
                    
                    <div className="text-center bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-3 border-2 border-blue-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="font-bold text-blue-800">Progreso</span>
                      </div>
                      <div className="text-xl font-bold text-blue-700">{Math.round(progress)}%</div>
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="mt-4">
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-full rounded-full transition-all duration-1000 animate-glow-treasure"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-blue-100 to-teal-100 border-4 border-blue-300 shadow-2xl ${
                  animatedElements.has("progress") ? "animate-slide-adventure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.5s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                    <Map className="w-5 h-5" />
                    <span className="font-bold">¡Aventura de División!</span>
                    <Map className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-blue-600">
                    Sigue las pistas del mapa para dividir el tesoro equitativamente entre los piratas
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