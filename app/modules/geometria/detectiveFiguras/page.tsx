"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useDetectiveFiguras } from "@/hooks/geometria/useDetectiveFiguras"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Eye, Lightbulb, Clock, Target, CheckCircle, Zap, Sparkles, Smartphone, Hand } from "lucide-react"
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
    gameState,
    aciertos,
    errores,
    roundsCompleted,
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
    gameContainerRef,
    sceneRef,
    timerRef,
    figureTypes,
    roundTime,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,
    handleFigureClick,
    handleNextLevel,
    handleRestart,
    toggleHint,
  } = useDetectiveFiguras()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [backgroundSparkles, setBackgroundSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    const sparkleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setBackgroundSparkles(sparkleArray)

    const elements = ["scene", "progress", "timer", "hint"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  const currentTargetFigure = gameState.targetFigure ? figureTypes[gameState.targetFigure] : null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado mejorado */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-300 via-purple-300 to-green-400">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl sm:text-4xl opacity-20"
              style={{
                left: `${5 + i * 5}%`,
                top: `${10 + (i % 4) * 20}%`,
                animation: `float-detective ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              🔍
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0">
          {backgroundSparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-yellow-300 text-xl sm:text-2xl opacity-40"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: `detective-twinkle ${3 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-3xl sm:text-4xl"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animation: `celebration-burst 2s ease-out forwards`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Mensaje de aliento */}
      {showEncouragement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full text-xl sm:text-2xl font-bold shadow-2xl animate-encouragement-bounce">
            {encouragementMessage}
          </div>
        </div>
      )}

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-2 sm:pt-4 relative z-10 px-2 sm:px-4">
          <GameHeader
            nav="/modules/geometria"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/geometria.png"
            name="Detective de Figuras"
            totalSets={currentGameLevel?.figuresPerLevel || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado 
              aciertos={aciertos} 
              estrellas={estrellas} 
              onRestart={handleRestart} 
            />
          ) : isLevelComplete ? (
            <NivelCompletado
              aciertos={aciertos}
              isLastLevel={isLastLevel}
              onNextLevel={handleNextLevel}
            />
          ) : (
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
              {/* Misión actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl animate-glow-detective ${
                  animatedElements.has("scene") ? "animate-slide-detective" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Search className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
                      <h3 className="text-lg sm:text-2xl font-bold text-blue-800">
                        ¡Misión Detective!
                      </h3>
                      <Eye className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    
                    {currentTargetFigure && (
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-3 sm:p-6 border-4 border-blue-300">
                        <div className="text-3xl sm:text-4xl mb-2 animate-target-bounce">
                          Busca todas las figuras: <span className="text-4xl sm:text-5xl">{currentTargetFigure.emoji}</span>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
                          {currentTargetFigure.name}
                        </div>
                        <p className="text-sm sm:text-base text-blue-600 mb-3 sm:mb-4">
                          Encontradas: <span className="font-bold text-lg">{gameState.foundCount}</span> / <span className="font-bold text-lg">{gameState.totalTargets}</span>
                        </p>
                        
                        <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <Button
                            onClick={toggleHint}
                            variant="outline"
                            size={isTouchDevice ? "default" : "sm"}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 touch-manipulation"
                          >
                            <Lightbulb className="w-4 h-4 mr-2" />
                            {showHint ? 'Ocultar' : 'Mostrar'} Pista
                          </Button>
                        </div>
                        
                        {showHint && (
                          <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 animate-hint-appear">
                            <p className="text-sm sm:text-base text-yellow-800">
                              💡 <strong>Pista:</strong> {currentTargetFigure.sound}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instrucciones para dispositivos táctiles */}
              {isTouchDevice && (
                <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300 shadow-xl">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-bold text-sm sm:text-base">Modo Táctil Activado</span>
                      <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-xs sm:text-sm text-green-600">
                      👆 Toca las figuras para encontrarlas. ¡Las figuras son más grandes para que sea más fácil!
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Timer */}
              <div className="gap-4 sm:gap-6">
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-orange-400 shadow-2xl ${
                    animatedElements.has("timer") ? "animate-slide-detective" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardContent className="p-3 sm:p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                      <span className="font-bold text-orange-800 text-sm sm:text-base">Tiempo Restante</span>
                    </div>
                    <div 
                      ref={timerRef}
                      className={`text-2xl sm:text-3xl font-bold ${roundTime <= 10 ? 'text-red-600 animate-pulse' : 'text-orange-700'}`}
                    >
                      {Math.floor(roundTime / 60)}:{(roundTime % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="mt-2 sm:mt-3 w-full bg-gray-200 rounded-full h-2 sm:h-3">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          roundTime <= 30 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'
                        }`}
                        style={{ width: `${(roundTime / currentGameLevel.timeLimit) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>                
              </div>

              {/* Escena de búsqueda */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl ${
                  animatedElements.has("scene") ? "animate-slide-detective" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-purple-800 flex items-center justify-center gap-2">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                      Zona de Investigación
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-600 mt-2">
                      {isTouchDevice ? "Toca las figuras que coincidan con la misión" : "Haz clic en las figuras que coincidan con la misión"}
                    </p>
                  </div>
                  
                  <div 
                    ref={sceneRef}
                    className="relative min-h-[300px] sm:min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-3 border-purple-300 p-2 sm:p-4 overflow-hidden touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {gameState.figures.map((figure) => {
                      const figureData = figureTypes[figure.type]
                      return (
                        <div
                          onClick={(e) => handleFigureClick(figure.id, e)}
                          onTouchEnd={(e) => {
                            e.preventDefault()
                            handleFigureClick(figure.id, e)
                          }}
                          className={`
                            absolute cursor-pointer transition-all duration-300 select-none touch-manipulation
                            ${figure.isFound ? 'opacity-50 cursor-not-allowed animate-figure-found' : 'hover:scale-110 active:scale-95 animate-figure-pulse'}
                            ${figure.isTarget && !figure.isFound && showHint ? 'animate-figure-hint' : ''}
                            ${figure.isAnimating && !figure.isFound ? 'animate-figure-error' : ''}
                          `}
                          style={{
                            left: `${figure.x}%`,
                            top: `${figure.y}%`,
                            transform: `rotate(${figure.rotation}deg) scale(${figure.scale})`,
                            animationDelay: `${figure.pulseDelay}s`,
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            WebkitTouchCallout: 'none',
                          }}
                        >
                          <div
                            className={`
                              ${isTouchDevice ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-12 h-12 sm:w-16 sm:h-16'} 
                              border-4 transition-all duration-300
                              bg-gradient-to-br ${figureData.color} ${figureData.shape}
                              ${figure.isFound ? 'border-green-500 ring-4 ring-green-300 animate-success-glow' : 'border-gray-300 hover:border-gray-500'}
                              ${figure.isTarget && showHint && !figure.isFound ? 'ring-2 ring-yellow-400 animate-hint-glow' : ''}
                              shadow-lg hover:shadow-xl
                            `}
                          >
                            {figure.isFound && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 animate-bounce" />
                              </div>
                            )}
                          </div>
                          
                          {figure.isFound && (
                            <div className="absolute -top-2 -right-2 text-xl sm:text-2xl animate-bounce">
                              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-spin" />
                            </div>
                          )}
                        </div>
                      )
                    })}
                    
                    {/* Indicador de progreso en la escena */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 rounded-full px-2 sm:px-3 py-1 border-2 border-purple-300">
                      <span className="text-xs sm:text-sm font-bold text-purple-700">
                        {gameState.foundCount} / {gameState.totalTargets}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-blue-100 to-green-100 border-4 border-blue-300 shadow-2xl ${
                  animatedElements.has("hint") ? "animate-slide-detective" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">¡Desarrolla tu Ojo Detective!</span>
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-blue-600">
                    Observa cuidadosamente y encuentra todas las figuras que coincidan con la misión. ¡Algunas pueden estar rotadas o ser de diferente tamaño!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </GamesTemplate>

      <style jsx>{`
        @keyframes float-detective {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes detective-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes glow-detective {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes slide-detective {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes figure-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes figure-found {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(90deg); }
          50% { transform: scale(1.1) rotate(180deg); }
          75% { transform: scale(1.15) rotate(270deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes figure-error {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes figure-hint {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 0, 0.5); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 0, 0.8); }
        }
        
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.8); }
        }
        
        @keyframes hint-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 0, 0.4); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 0, 0.7); }
        }
        
        @keyframes target-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes hint-appear {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes celebration-burst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes encouragement-bounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-10px); }
        }
        
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        
        .clip-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }
        
        .clip-hexagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
        }
        
        .clip-octagon {
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        }
        
        .clip-star {
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
        
        .animate-figure-found {
          animation: figure-found 1s ease-in-out;
        }
        
        .animate-figure-pulse {
          animation: figure-pulse 2s ease-in-out infinite;
        }
        
        .animate-figure-error {
          animation: figure-error 0.6s ease-in-out;
        }
        
        .animate-figure-hint {
          animation: figure-hint 2s ease-in-out infinite;
        }
        
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        
        .animate-hint-glow {
          animation: hint-glow 2s ease-in-out infinite;
        }
        
        .animate-target-bounce {
          animation: target-bounce 2s ease-in-out infinite;
        }
        
        .animate-hint-appear {
          animation: hint-appear 0.3s ease-out;
        }
        
        .animate-encouragement-bounce {
          animation: encouragement-bounce 2s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Page