"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useConstruyeFigura } from "@/hooks/geometria/useConstruyeFiguras"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Lightbulb, Target, CheckCircle, RotateCcw, Trash2, Zap, Sparkles, Smartphone, Hand } from "lucide-react"
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
    constructionState,
    aciertos,
    errores,
    figuresCompleted,
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
    canvasRef,
    pointsRefs,
    linesRefs,
    progressBarRef,
    figureTemplates,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,
    constructionSparkles,
    handlePointClick,
    handleRemoveLine,
    handleNextLevel,
    handleRestart,
    toggleHint,
    handleClearConstruction,
  } = useConstruyeFigura()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [backgroundSparkles, setBackgroundSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    const sparkleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setBackgroundSparkles(sparkleArray)

    const elements = ["construction", "progress", "tools", "hint"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  const currentTemplate = constructionState.targetFigure ? figureTemplates[constructionState.targetFigure] : null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado mejorado */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-300 via-blue-300 to-purple-400">
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl sm:text-4xl opacity-20"
              style={{
                left: `${10 + i * 6}%`,
                top: `${5 + (i % 3) * 30}%`,
                animation: `float-construction ${5 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              🔧
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
                animation: `construction-twinkle ${2.5 + Math.random()}s ease-in-out infinite`,
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
            animation: `celebration-burst 2.5s ease-out forwards`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Chispas de construcción */}
      {constructionSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40 text-2xl"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            animation: `construction-sparkle 1s ease-out forwards`,
          }}
        >
          ⚡
        </div>
      ))}

      {/* Mensaje de aliento */}
      {showEncouragement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full text-xl sm:text-2xl font-bold shadow-2xl animate-encouragement-bounce">
            {encouragementMessage}
          </div>
        </div>
      )}

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-2 sm:pt-4 relative z-10 px-2 sm:px-4">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/geometry.png"
            name="Construye tu Figura"
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
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
              {/* Objetivo de construcción */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl animate-glow-construction ${
                  animatedElements.has("construction") ? "animate-slide-construction" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Wrench className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                      <h3 className="text-lg sm:text-2xl font-bold text-green-800">
                        ¡Construye la Figura!
                      </h3>
                      <Wrench className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    
                    {currentTemplate && (
                      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-3 sm:p-6 border-4 border-green-300">
                        <div className="text-4xl sm:text-6xl mb-2 animate-target-bounce">{currentTemplate.emoji}</div>
                        <div className="text-lg sm:text-xl font-bold text-green-800 mb-2">
                          {currentTemplate.name}
                        </div>
                        <p className="text-sm sm:text-base text-green-600 mb-3 sm:mb-4">
                          Conecta <span className="font-bold">{currentTemplate.points}</span> puntos con <span className="font-bold">{currentTemplate.lines}</span> líneas
                        </p>
                        
                        <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                          <Button
                            onClick={toggleHint}
                            variant="outline"
                            size={isTouchDevice ? "default" : "sm"}
                            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 touch-manipulation"
                          >
                            <Lightbulb className="w-4 h-4 mr-2" />
                            {showHint ? 'Ocultar' : 'Mostrar'} Pista
                          </Button>
                          
                          <Button
                            onClick={handleClearConstruction}
                            variant="outline"
                            size={isTouchDevice ? "default" : "sm"}
                            className="bg-red-100 hover:bg-red-200 text-red-800 border-red-300 touch-manipulation"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Limpiar
                          </Button>
                        </div>
                        
                        {showHint && (
                          <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 animate-hint-appear">
                            <p className="text-sm sm:text-base text-yellow-800">
                              💡 <strong>Pista:</strong> {currentTemplate.sound}
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
                <Card className="bg-gradient-to-r from-blue-100 to-green-100 border-4 border-blue-300 shadow-xl">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-bold text-sm sm:text-base">Modo Construcción Táctil</span>
                      <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-xs sm:text-sm text-blue-600">
                      👆 Toca un punto, luego toca otro para conectarlos. ¡Los puntos son más grandes para facilitar la construcción!
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Progreso y herramientas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl ${
                    animatedElements.has("progress") ? "animate-slide-construction" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-2 sm:p-3 border-2 border-blue-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          <span className="font-bold text-blue-800 text-xs sm:text-sm">Figuras</span>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-blue-700">
                          {figuresCompleted}/{currentGameLevel?.figuresPerLevel}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-2 sm:p-3 border-2 border-green-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span className="font-bold text-green-800 text-xs sm:text-sm">Aciertos</span>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-green-700">{aciertos}</div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl p-2 sm:p-3 border-2 border-purple-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Wrench className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                          <span className="font-bold text-purple-800 text-xs sm:text-sm">Progreso</span>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-purple-700">{Math.round(progress)}%</div>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:mt-3">
                      <div className="relative w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div
                          ref={progressBarRef}
                          className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 h-full rounded-full transition-all duration-1000 animate-glow-construction"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl ${
                    animatedElements.has("tools") ? "animate-slide-construction" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="text-center mb-2 sm:mb-3">
                      <h4 className="text-sm sm:text-lg font-bold text-purple-800 flex items-center justify-center gap-2">
                        <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                        Estado de Construcción
                      </h4>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-2 sm:p-3 border border-purple-200">
                        <span className="text-xs sm:text-sm font-medium text-purple-700">Puntos Conectados:</span>
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs sm:text-sm">
                          {constructionState.points.filter(p => p.isConnected).length}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2 sm:p-3 border border-blue-200">
                        <span className="text-xs sm:text-sm font-medium text-blue-700">Líneas Trazadas:</span>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                          {constructionState.lines.length}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-2 sm:p-3 border border-green-200">
                        <span className="text-xs sm:text-sm font-medium text-green-700">Estado:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs sm:text-sm ${constructionState.isComplete ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {constructionState.isComplete ? "¡Completa!" : "En Progreso"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Área de construcción */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                  animatedElements.has("construction") ? "animate-slide-construction" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-yellow-800 flex items-center justify-center gap-2">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                      Mesa de Construcción
                    </h4>
                    <p className="text-xs sm:text-sm text-yellow-600 mt-2">
                      {isTouchDevice ? "Toca los puntos para conectarlos y formar la figura" : "Haz clic en los puntos para conectarlos y formar la figura"}
                    </p>
                  </div>
                  
                  <div 
                    ref={canvasRef}
                    className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-3 border-yellow-300 overflow-hidden touch-manipulation"
                    style={{ touchAction: 'manipulation' }}
                  >
                    {/* SVG para las líneas */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {constructionState.lines.map((line) => {
                        const startPoint = constructionState.points.find(p => p.id === line.startPoint)
                        const endPoint = constructionState.points.find(p => p.id === line.endPoint)
                        
                        if (!startPoint || !endPoint) return null
                        
                        return (
                          <line
                            key={line.id}
                            ref={(el) => (linesRefs.current[line.id] = el)}
                            x1={startPoint.x}
                            y1={startPoint.y}
                            x2={endPoint.x}
                            y2={endPoint.y}
                            stroke="#3b82f6"
                            strokeWidth={isTouchDevice ? "4" : "3"}
                            className={`animate-line-draw ${line.isAnimating ? 'animate-line-glow' : ''}`}
                            style={{ animationDelay: `${line.id * 0.2}s` }}
                          />
                        )
                      })}
                    </svg>
                    
                    {/* Puntos */}
                    {constructionState.points.map((point) => (
                      <div
                        key={point.id}
                        ref={(el) => (pointsRefs.current[point.id] = el)}
                        onClick={(e) => handlePointClick(point.id, e)}
                        onTouchEnd={(e) => {
                          e.preventDefault()
                          handlePointClick(point.id, e)
                        }}
                        className={`
                          absolute ${isTouchDevice ? 'w-8 h-8' : 'w-6 h-6'} rounded-full border-4 cursor-pointer transition-all duration-300
                          ${point.isSelected 
                            ? 'bg-yellow-400 border-yellow-600 ring-4 ring-yellow-300 animate-point-selected' 
                            : point.isConnected 
                              ? 'bg-blue-400 border-blue-600 hover:bg-blue-500 animate-point-connected' 
                              : 'bg-gray-300 border-gray-500 hover:bg-gray-400 hover:animate-point-hover'
                          }
                          hover:scale-125 active:scale-95 select-none animate-point-entry touch-manipulation
                          ${point.isAnimating ? 'animate-point-pulse' : ''}
                        `}
                        style={{
                          left: `${point.x - (isTouchDevice ? 16 : 12)}px`,
                          top: `${point.y - (isTouchDevice ? 16 : 12)}px`,
                          transform: point.isSelected ? 'scale(1.3)' : 'scale(1)',
                          animationDelay: `${point.pulseDelay}s`,
                          touchAction: 'manipulation',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitTouchCallout: 'none',
                        }}
                      >
                        {point.isConnected && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-bounce">
                            <Sparkles className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Indicador de líneas */}
                    {constructionState.lines.map((line) => {
                      const startPoint = constructionState.points.find(p => p.id === line.startPoint)
                      const endPoint = constructionState.points.find(p => p.id === line.endPoint)
                      
                      if (!startPoint || !endPoint) return null
                      
                      const midX = (startPoint.x + endPoint.x) / 2
                      const midY = (startPoint.y + endPoint.y) / 2
                      
                      return (
                        <button
                          key={`remove-${line.id}`}
                          onClick={() => handleRemoveLine(line.id)}
                          onTouchEnd={(e) => {
                            e.preventDefault()
                            handleRemoveLine(line.id)
                          }}
                          className={`absolute ${isTouchDevice ? 'w-8 h-8' : 'w-6 h-6'} bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation`}
                          style={{
                            left: `${midX - (isTouchDevice ? 16 : 12)}px`,
                            top: `${midY - (isTouchDevice ? 16 : 12)}px`,
                            touchAction: 'manipulation',
                          }}
                        >
                          <Trash2 className={`${isTouchDevice ? 'w-4 h-4' : 'w-3 h-3'} text-white`} />
                        </button>
                      )
                    })}
                    
                    {/* Indicador de progreso en la construcción */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 rounded-full px-2 sm:px-3 py-1 border-2 border-yellow-300">
                      <span className="text-xs sm:text-sm font-bold text-yellow-700">
                        {constructionState.lines.length} / {currentTemplate?.lines || 0}
                      </span>
                    </div>
                    
                    {/* Efectos de construcción completada */}
                    {constructionState.isComplete && (
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute text-2xl animate-construction-celebration"
                            style={{
                              left: `${20 + i * 10}%`,
                              top: `${20 + (i % 3) * 20}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          >
                            <Zap className="w-6 h-6 text-yellow-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300 shadow-2xl ${
                  animatedElements.has("hint") ? "animate-slide-construction" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">¡Desarrolla tu Habilidad Constructiva!</span>
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-green-600">
                    Conecta los puntos con líneas para formar figuras geométricas. {isTouchDevice ? "Toca un punto y luego otro para conectarlos." : "Haz clic en un punto y luego en otro para conectarlos."}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </GamesTemplate>

      <style jsx>{`
        @keyframes float-construction {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        
        @keyframes construction-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        
        @keyframes glow-construction {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 197, 94, 0.6); }
        }
        
        @keyframes slide-construction {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes line-draw {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        
        @keyframes line-glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
          50% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8)); }
        }
        
        @keyframes point-entry {
          from { transform: scale(0) rotate(180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes point-selected {
          0%, 100% { transform: scale(1.3); box-shadow: 0 0 15px rgba(255, 255, 0, 0.6); }
          50% { transform: scale(1.5); box-shadow: 0 0 25px rgba(255, 255, 0, 0.9); }
        }
        
        @keyframes point-connected {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.7); }
        }
        
        @keyframes point-hover {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes point-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes construction-celebration {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-30px) scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes construction-sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
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
        
        .animate-point-entry {
          animation: point-entry 0.6s ease-out;
        }
        
        .animate-point-selected {
          animation: point-selected 1s ease-in-out infinite;
        }
        
        .animate-point-connected {
          animation: point-connected 2s ease-in-out infinite;
        }
        
        .animate-point-hover {
          animation: point-hover 0.3s ease-in-out;
        }
        
        .animate-point-pulse {
          animation: point-pulse 1s ease-in-out infinite;
        }
        
        .animate-construction-celebration {
          animation: construction-celebration 2s ease-out;
        }
        
        .animate-line-draw {
          animation: line-draw 0.5s ease-out;
        }
        
        .animate-line-glow {
          animation: line-glow 1s ease-in-out infinite;
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