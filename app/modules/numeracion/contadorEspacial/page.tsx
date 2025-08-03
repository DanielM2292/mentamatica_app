"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useContadorEspacial } from "@/hooks/numeracion/useContadorEspacial"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Target, ArrowUp, ArrowDown, CheckCircle, Heart } from "lucide-react"
import { useState, useEffect } from "react"

const Page = () => {
  console.log("ContadorEspacial page loaded")

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
    currentMissionIndex,
    currentValue,
    currentMission,
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
    isMoving,
    gameContainerRef,
    moveUp,
    moveDown,
    handleNextLevel,
    handleRestart,
  } = useContadorEspacial()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [showTutorial, setShowTutorial] = useState(true)

  // Animaciones de entrada
  useEffect(() => {
    setIsVisible(true)

    const elements = ["tutorial", "mission", "ladder", "buttons"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]))
      }, index * 400)
    })
  }, [])

  // Celebración
  const createCelebration = () => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setCelebrationParticles(particles)
    setTimeout(() => setCelebrationParticles([]), 2000)
  }

  useEffect(() => {
    if (aciertos > 0) {
      createCelebration()
    }
  }, [aciertos])

  const isAtTarget = currentValue === currentMission?.target
  const canMoveUp = currentValue < 10
  const canMoveDown = currentValue > 1

  // Crear camino espacial horizontal
  const createSpacePath = () => {
    const planets = []
    for (let i = 1; i <= 10; i++) {
      const isCurrentPosition = i === currentValue
      const isTarget = i === currentMission?.target
      const leftPosition = ((i - 1) / 9) * 100 // Distribución horizontal

      planets.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Planeta */}
          <div
            className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-500 ${
              isCurrentPosition
                ? "bg-yellow-400 border-yellow-600 text-yellow-900 scale-125 shadow-2xl animate-pulse-gentle"
                : isTarget
                  ? "bg-red-400 border-red-600 text-red-900 scale-110 shadow-xl animate-bounce-gentle"
                  : "bg-blue-300 border-blue-500 text-blue-800 hover:scale-105"
            }`}
          >
            {i}
            
            {/* Cohete en posición actual con animación horizontal */}
            {isCurrentPosition && (
              <div className={`absolute -top-6 transition-all duration-1000 ${isMoving ? 'animate-rocket-fly' : ''}`}>
                <Rocket className="w-6 h-6 text-yellow-600 animate-bounce" />
              </div>
            )}
            
            {/* Bandera en objetivo */}
            {isTarget && (
              <div className="absolute -top-6">
                <Target className="w-6 h-6 text-red-600 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* Número del planeta */}
          <div className="mt-1 text-xs font-bold text-gray-700">{i}</div>
        </div>
      )
    }
    return planets
  }

  console.log("Rendering ultra-simple game with level:", currentLevel, "mission:", currentMissionIndex)

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo espacial mejorado */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        {/* Estrellas parpadeantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Nebulosas */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-20 w-24 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-24 bg-pink-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 left-1/2 w-28 h-18 bg-cyan-500/20 rounded-full blur-xl"></div>
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
            animation: `celebration-simple 2s ease-out forwards`,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        >
          {["🎉", "⭐", "✨", "🌟"][particle.id % 4]}
        </div>
      ))}

      {/* Tutorial súper simple */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white border-8 border-blue-400 shadow-2xl max-w-lg w-full">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Aventura Espacial!</h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Tu cohete está en el <strong className="text-yellow-600">planeta {currentMission?.start}</strong>
                </p>
                <p>
                  Quiere llegar al <strong className="text-red-600">planeta {currentMission?.target}</strong>
                </p>
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="bg-green-100 p-3 rounded-2xl border-4 border-green-400">
                    <ArrowUp className="w-10 h-10 text-green-600" />
                    <p className="text-base font-bold text-green-700 mt-2">Subir</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-2xl border-4 border-red-400">
                    <ArrowDown className="w-10 h-10 text-red-600" />
                    <p className="text-base font-bold text-red-700 mt-2">Bajar</p>
                  </div>
                </div>
                <p className="text-lg">¡Es muy fácil!</p>
              </div>
              <Button
                onClick={() => setShowTutorial(false)}
                className="mt-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-xl px-10 py-4 rounded-3xl font-bold"
              >
                ¡Despegar! 🚀
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes celebration-simple {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          50% { transform: translateY(-80px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-160px) scale(0); opacity: 0; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1.1); }
          50% { transform: translateY(-6px) scale(1.15); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1.25); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.8; }
        }
        
        @keyframes rocket-fly {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(15px) rotate(10deg); }
          50% { transform: translateX(30px) rotate(0deg); }
          75% { transform: translateX(15px) rotate(-10deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes slide-up-simple {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-rocket-fly { animation: rocket-fly 1s ease-in-out; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-slide-up-simple { animation: slide-up-simple 0.6s ease-out forwards; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/numeracion"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/numeracion.png"
            name="Contador Espacial"
            totalSets={currentGameLevel?.missions?.length || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado aciertos={aciertos} estrellas={estrellas} onRestart={handleRestart} />
          ) : isLevelComplete ? (
            <NivelCompletado
              aciertos={aciertos}
              isLastLevel={isLastLevel}
              onNextLevel={handleNextLevel}
            />
          ) : (
            <div className="mt-6 space-y-6" ref={gameContainerRef}>
              {/* Instrucciones compactas */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-blue-300 shadow-2xl ${
                  animatedElements.has("tutorial") ? "animate-slide-up-simple" : "opacity-0"
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                      <div className="text-3xl">🎯</div>
                      ¿Cómo Jugar?
                      <Button
                        onClick={() => setShowTutorial(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-base"
                      >
                        Ver Tutorial
                      </Button>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-green-100 p-4 rounded-2xl border-3 border-green-300">
                        <div className="text-4xl mb-2">⬆️</div>
                        <p className="text-lg font-bold text-green-800">Toca para SUBIR</p>
                        <p className="text-sm text-green-700">Números más grandes</p>
                      </div>
                      <div className="bg-red-100 p-4 rounded-2xl border-3 border-red-300">
                        <div className="text-4xl mb-2">⬇️</div>
                        <p className="text-lg font-bold text-red-800">Toca para BAJAR</p>
                        <p className="text-sm text-red-700">Números más pequeños</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Misión compacta */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-300 shadow-2xl ${
                  animatedElements.has("mission") ? "animate-slide-up-simple" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
                      <div className="text-3xl">🚀</div>
                      Tu Misión
                      <div className="text-3xl">⭐</div>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-yellow-100 rounded-2xl p-4 border-4 border-yellow-400">
                        <div className="text-4xl mb-2">🚀</div>
                        <div className="text-lg font-bold text-yellow-800 mb-1">Estás en:</div>
                        <div className="text-4xl font-bold text-yellow-900">{currentValue}</div>
                      </div>

                      <div className="bg-red-100 rounded-2xl p-4 border-4 border-red-400">
                        <div className="text-4xl mb-2">🎯</div>
                        <div className="text-lg font-bold text-red-800 mb-1">Quieres llegar a:</div>
                        <div className="text-4xl font-bold text-red-900">{currentMission?.target}</div>
                      </div>
                    </div>

                    {/* Estado de la misión */}
                    <div className="flex justify-center">
                      {isAtTarget ? (
                        <Badge className="bg-green-500 text-white px-6 py-3 text-lg font-bold rounded-2xl">
                          <CheckCircle className="w-6 h-6 mr-2" />
                          ¡LO LOGRASTE! 🎉
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-500 text-white px-6 py-3 text-lg font-bold rounded-2xl">
                          <Heart className="w-6 h-6 mr-2" />
                          ¡Sigue intentando!
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Camino espacial horizontal */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-green-300 shadow-2xl ${
                  animatedElements.has("ladder") ? "animate-slide-up-simple" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <div className="text-3xl">🌌</div>
                      Ruta Espacial
                      <div className="text-3xl">🛸</div>
                    </h3>
                    <p className="text-base text-gray-600">Tu cohete 🚀 viaja entre planetas numerados</p>
                  </div>

                  {/* Camino horizontal */}
                  <div className="relative h-20 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 rounded-2xl p-4 border-3 border-sky-300">
                    {/* Línea de conexión entre planetas */}
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full transform -translate-y-1/2"></div>
                    
                    {/* Planetas */}
                    <div className="relative h-full">
                      {createSpacePath()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botones compactos */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-orange-300 shadow-2xl ${
                  animatedElements.has("buttons") ? "animate-slide-up-simple" : "opacity-0"
                }`}
                style={{ animationDelay: "0.6s" }}
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <div className="text-3xl">👆</div>
                      Controles de Navegación
                      <div className="text-3xl">🎮</div>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Botón SUBIR */}
                    <Button
                      onClick={moveUp}
                      disabled={!canMoveUp || isMoving}
                      className={`group relative overflow-hidden p-8 rounded-2xl shadow-2xl transform transition-all duration-300 border-4 text-white font-bold text-2xl min-h-[140px] ${
                        !canMoveUp || isMoving
                          ? "opacity-50 cursor-not-allowed bg-gray-400 border-gray-300"
                          : "bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-green-300 hover:scale-105 hover:shadow-3xl active:scale-95"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4 relative z-10">
                        <ArrowUp className="w-16 h-16" />
                        <div className="text-3xl font-bold">SUBIR</div>
                        <div className="text-lg opacity-90">
                          Al planeta: <span className="font-bold text-2xl">{currentValue + 1}</span>
                        </div>
                      </div>

                      {/* Efecto de hover */}
                      {canMoveUp && !isMoving && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      )}
                    </Button>

                    {/* Botón BAJAR */}
                    <Button
                      onClick={moveDown}
                      disabled={!canMoveDown || isMoving}
                      className={`group relative overflow-hidden p-8 rounded-2xl shadow-2xl transform transition-all duration-300 border-4 text-white font-bold text-2xl min-h-[140px] ${
                        !canMoveDown || isMoving
                          ? "opacity-50 cursor-not-allowed bg-gray-400 border-gray-300"
                          : "bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 border-red-300 hover:scale-105 hover:shadow-3xl active:scale-95"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-4 relative z-10">
                        <ArrowDown className="w-16 h-16" />
                        <div className="text-3xl font-bold">BAJAR</div>
                        <div className="text-lg opacity-90">
                          Al planeta: <span className="font-bold text-2xl">{currentValue - 1}</span>
                        </div>
                      </div>

                      {/* Efecto de hover */}
                      {canMoveDown && !isMoving && (
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      )}
                    </Button>
                  </div>

                  {/* Ayuda visual */}
                  {!isMoving && (
                    <div className="mt-6 p-4 bg-blue-100 rounded-2xl border-3 border-blue-300">
                      <div className="text-center text-blue-800">
                        <div className="text-3xl mb-2">💡</div>
                        <p className="text-lg font-bold mb-1">Consejo:</p>
                        <p className="text-base">
                          Estás en el planeta <strong className="text-2xl text-yellow-600">{currentValue}</strong> y quieres llegar
                          al planeta <strong className="text-2xl text-red-600">{currentMission?.target}</strong>
                        </p>
                        <p className="text-sm mt-2 opacity-80">
                          {currentValue < (currentMission?.target || 0) ? "¡Necesitas SUBIR! ⬆️" : "¡Necesitas BAJAR! ⬇️"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Estado de movimiento */}
                  {isMoving && (
                    <div className="mt-6 text-center">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 text-lg font-bold rounded-2xl animate-pulse-gentle">
                        <Rocket className="w-6 h-6 mr-2 animate-bounce-gentle" />
                        ¡El cohete se está moviendo! 🚀
                      </Badge>
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