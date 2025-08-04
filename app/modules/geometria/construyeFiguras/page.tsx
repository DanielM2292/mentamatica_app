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
    onprogress,
    figuresCompleted,
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

  const currentTemplate = constructionState?.targetFigure ? figureTemplates?.[constructionState.targetFigure] : null

  // Manejo seguro de eventos táctiles
  const handleSafePointClick = (pointId: string, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (handlePointClick) {
      handlePointClick(Number(pointId), event)
    }
  }

  const handleSafeRemoveLine = (lineId: number, event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (handleRemoveLine) {
        handleRemoveLine(lineId)
      }
    }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado mejorado y más llamativo */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
        {/* Ondas animadas de fondo */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
        
        {/* Círculos flotantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-white/20 rounded-full"
              style={{
                left: `${5 + i * 8}%`,
                top: `${10 + (i % 4) * 25}%`,
                animation: `float-circles ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Iconos de herramientas flotantes */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl sm:text-3xl opacity-25 text-white"
              style={{
                left: `${15 + i * 10}%`,
                top: `${8 + (i % 3) * 30}%`,
                animation: `float-tools ${6 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {['🔧', '⚒️', '🛠️', '📐', '📏', '✏️', '🎯', '⭐'][i]}
            </div>
          ))}
        </div>
        
        {/* Estrellas parpadeantes */}
        <div className="absolute inset-0">
          {backgroundSparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-yellow-200 text-lg sm:text-xl opacity-60"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: `sparkle-twinkle ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        {/* Gradiente overlay para mejor legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5"></div>
      </div>

      {/* Partículas de celebración */}
      {celebrationParticles?.map((particle) => (
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
      {constructionSparkles?.map((sparkle) => (
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
      {showEncouragement && encouragementMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full text-xl sm:text-2xl font-bold shadow-2xl animate-encouragement-bounce">
            {encouragementMessage}
          </div>
        </div>
      )}

      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-2 sm:pt-4 relative z-10 px-2 sm:px-4">
          <GameHeader
            nav="/modules/geometria"
            aciertos={aciertos || 0}
            errores={errores || 0}
            completedSets={completedSets?.length || 0}
            imagen="/images/icons/geometria.png"
            name="Construye tu Figura"
            totalSets={currentGameLevel?.figuresPerLevel || 1}
            level={(currentLevel || 0) + 1}
            totalAciertos={(totalAciertos || 0) + (aciertos || 0)}
          />

          <TiempoJuego position="top-right" formato="minutos" />

          <InformacionNivel currentLevel={currentLevel || 0} gameLevel={currentGameLevel as any} />

          {isGameComplete ? (
            <JuegoCompletado 
              aciertos={aciertos || 0} 
              estrellas={estrellas || 0} 
              onRestart={handleRestart} 
            />
          ) : isLevelComplete ? (
            <NivelCompletado
              aciertos={aciertos || 0}
              isLastLevel={isLastLevel || false}
              onNextLevel={handleNextLevel}
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
                        
                        {showHint && currentTemplate.sound && (
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
              <div className="gap-4 sm:gap-6">
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
                          {constructionState?.points?.filter(p => p.isConnected).length || 0}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-2 sm:p-3 border border-blue-200">
                        <span className="text-xs sm:text-sm font-medium text-blue-700">Líneas Trazadas:</span>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs sm:text-sm">
                          {constructionState?.lines?.length || 0}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg p-2 sm:p-3 border border-green-200">
                        <span className="text-xs sm:text-sm font-medium text-green-700">Estado:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs sm:text-sm ${constructionState?.isComplete ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {constructionState?.isComplete ? "¡Completa!" : "En Progreso"}
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
                    className="relative w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border-4 border-yellow-300 overflow-hidden touch-manipulation shadow-inner"
                    style={{ 
                      height: isTouchDevice ? '320px' : '400px',
                      maxWidth: isTouchDevice ? '320px' : '450px',
                      margin: '0 auto',
                      touchAction: 'manipulation' 
                    }}
                  >
                    {/* Fondo decorativo mejorado */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-purple-50/40 to-pink-100/30"></div>
                    
                    {/* Círculos decorativos de fondo */}
                    <div className="absolute inset-0 overflow-hidden">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={`bg-circle-${i}`}
                          className="absolute rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 animate-float-slow"
                          style={{
                            width: `${30 + i * 15}px`,
                            height: `${30 + i * 15}px`,
                            left: `${10 + i * 12}%`,
                            top: `${5 + (i % 3) * 30}%`,
                            animationDelay: `${i * 0.8}s`,
                            animationDuration: `${4 + i * 0.5}s`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Estrellas decorativas */}
                    <div className="absolute inset-0">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={`star-${i}`}
                          className="absolute text-yellow-300/40 animate-twinkle"
                          style={{
                            left: `${8 + i * 8}%`,
                            top: `${10 + (i % 4) * 20}%`,
                            fontSize: `${12 + Math.random() * 8}px`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                          }}
                        >
                          ✨
                        </div>
                      ))}
                    </div>
                    
                    {/* Bordes decorativos internos */}
                    <div className="absolute inset-2 rounded-lg border-2 border-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 pointer-events-none"></div>
                    <div className="absolute inset-4 rounded-lg border border-white/40 pointer-events-none"></div>

                    {/* SVG para las líneas */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                      {/* Patrón de fondo sutil */}
                      <defs>
                        <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                          <circle cx="12.5" cy="12.5" r="1" fill="#e0e7ff" opacity="0.3"/>
                          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e0e7ff" strokeWidth="0.5" opacity="0.2"/>
                        </pattern>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="25%" stopColor="#8b5cf6" />
                          <stop offset="75%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                          <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                        </linearGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                      
                      {constructionState?.lines?.map((line) => {
                        const startPoint = constructionState.points?.find(p => p.id === line.startPoint)
                        const endPoint = constructionState.points?.find(p => p.id === line.endPoint)
                        
                        if (!startPoint || !endPoint) return null
                        
                        return (
                          <g key={line.id}>
                            {/* Sombra de la línea */}
                            <line
                              x1={startPoint.x + 2}
                              y1={startPoint.y + 2}
                              x2={endPoint.x + 2}
                              y2={endPoint.y + 2}
                              stroke="url(#shadowGradient)"
                              strokeWidth={isTouchDevice ? "6" : "5"}
                              className="animate-line-draw"
                              style={{ animationDelay: `${line.id * 0.2}s` }}
                            />
                            {/* Línea principal */}
                            <line
                              x1={startPoint.x}
                              y1={startPoint.y}
                              x2={endPoint.x}
                              y2={endPoint.y}
                              stroke="url(#lineGradient)"
                              strokeWidth={isTouchDevice ? "5" : "4"}
                              filter="url(#glow)"
                              className={`animate-line-draw animate-line-pulse ${line.isAnimating ? 'animate-line-glow' : ''}`}
                              style={{ animationDelay: `${line.id * 0.2}s` }}
                            />
                            {/* Línea de brillo superior */}
                            <line
                              x1={startPoint.x}
                              y1={startPoint.y}
                              x2={endPoint.x}
                              y2={endPoint.y}
                              stroke="rgba(255,255,255,0.6)"
                              strokeWidth={isTouchDevice ? "2" : "1.5"}
                              className="animate-line-draw"
                              style={{ animationDelay: `${line.id * 0.2}s` }}
                            />
                          </g>
                        )
                      })}
                    </svg>
                    
                    {/* Puntos */}
                    {constructionState?.points?.map((point) => (
                      <button
                        key={point.id}
                        onClick={(e) => handleSafePointClick(String(point.id), e)}
                        className={`
                          absolute rounded-full border-4 cursor-pointer transition-all duration-300 shadow-2xl z-20
                          ${isTouchDevice ? 'w-12 h-12' : 'w-10 h-10'}
                          ${point.isSelected 
                            ? 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 border-yellow-600 ring-4 ring-yellow-300/60 animate-point-selected shadow-yellow-400/70' 
                            : point.isConnected 
                              ? 'bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-500 border-emerald-500 hover:from-emerald-500 hover:to-purple-600 animate-point-connected shadow-emerald-400/60' 
                              : 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-slate-600 hover:from-slate-400 hover:to-slate-600 hover:animate-point-hover shadow-slate-400/60'
                          }
                          hover:scale-125 active:scale-95 select-none animate-point-entry touch-manipulation focus:outline-none focus:ring-4 focus:ring-blue-300/50
                          ${point.isAnimating ? 'animate-point-pulse' : ''}
                        `}
                        style={{
                          left: `${point.x - (isTouchDevice ? 24 : 20)}px`,
                          top: `${point.y - (isTouchDevice ? 24 : 20)}px`,
                          transform: point.isSelected ? 'scale(1.3)' : 'scale(1)',
                          animationDelay: `${point.pulseDelay || 0}s`,
                          touchAction: 'manipulation',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          WebkitTouchCallout: 'none',
                        }}
                      >
                        {/* Efectos de brillo mejorados */}
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/60 to-white/20"></div>
                        <div className="absolute inset-2 rounded-full bg-white/40"></div>
                        
                        {/* Punto central brillante */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                        
                        {point.isConnected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-bounce shadow-xl border-2 border-white">
                            <Sparkles className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                          </div>
                        )}
                        
                        {/* Efecto de ondas cuando está seleccionado */}
                        {point.isSelected && (
                          <>
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-400/60 animate-ping"></div>
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-300/40 animate-ping" style={{ animationDelay: '0.2s' }}></div>
                          </>
                        )}
                      </button>
                    ))}
                    
                    {/* Indicador de líneas mejorado */}
                    {constructionState?.lines?.map((line) => {
                      const startPoint = constructionState.points?.find(p => p.id === line.startPoint)
                      const endPoint = constructionState.points?.find(p => p.id === line.endPoint)
                      
                      if (!startPoint || !endPoint) return null
                      
                      const midX = (startPoint.x + endPoint.x) / 2
                      const midY = (startPoint.y + endPoint.y) / 2
                      
                      return (
                        <button
                          key={`remove-${line.id}`}
                          onClick={(e) => handleSafeRemoveLine(line.id, e)}
                          className={`absolute bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation shadow-2xl border-3 border-white z-30 focus:outline-none focus:ring-4 focus:ring-red-300/50
                            ${isTouchDevice ? 'w-10 h-10' : 'w-8 h-8'}
                          `}
                          style={{
                            left: `${midX - (isTouchDevice ? 20 : 16)}px`,
                            top: `${midY - (isTouchDevice ? 20 : 16)}px`,
                            touchAction: 'manipulation',
                          }}
                        >
                          <Trash2 className={`${isTouchDevice ? 'w-5 h-5' : 'w-4 h-4'} text-white drop-shadow-lg`} />
                        </button>
                      )
                    })}
                    
                    {/* Indicador de progreso en la construcción mejorado */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-white/95 via-blue-50/95 to-purple-50/95 backdrop-blur-md rounded-full px-4 py-2 border-3 border-blue-300 shadow-2xl z-20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                        <span className="text-xs sm:text-sm font-bold text-blue-800 drop-shadow-sm">
                          {constructionState?.lines?.length || 0} / {currentTemplate?.lines || 0}
                        </span>
                      </div>
                    </div>
                    
                    {/* Efectos de construcción completada mejorados */}
                    {constructionState?.isComplete && (
                      <div className="absolute inset-0 pointer-events-none z-40">
                        {/* Efecto de resplandor */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-green-400/30 to-blue-400/30 animate-pulse rounded-xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-lg animate-pulse"></div>
                        
                        {/* Partículas de celebración */}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={`celebration-${i}`}
                            className="absolute text-4xl animate-construction-celebration drop-shadow-lg"
                            style={{
                              left: `${15 + i * 7}%`,
                              top: `${15 + (i % 4) * 20}%`,
                              animationDelay: `${i * 0.15}s`
                            }}
                          >
                            {['⭐', '✨', '🎉', '🔥', '💫', '🌟'][i % 6]}
                          </div>
                        ))}
                        
                        {/* Ondas de celebración */}
                        <div className="absolute inset-0 rounded-xl">
                          <div className="absolute inset-0 border-4 border-yellow-400/60 rounded-xl animate-ping"></div>
                          <div className="absolute inset-2 border-4 border-green-400/60 rounded-xl animate-ping" style={{ animationDelay: '0.3s' }}></div>
                          <div className="absolute inset-4 border-4 border-blue-400/60 rounded-xl animate-ping" style={{ animationDelay: '0.6s' }}></div>
                        </div>
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
        @keyframes float-circles {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-tools {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(20deg); }
        }
        
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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
        
        @keyframes line-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-15px) rotate(5deg); opacity: 0.6; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes point-entry {
          from { transform: scale(0) rotate(180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes point-selected {
          0%, 100% { transform: scale(1.3); box-shadow: 0 0 20px rgba(255, 193, 7, 0.8), 0 0 40px rgba(255, 193, 7, 0.4); }
          50% { transform: scale(1.5); box-shadow: 0 0 30px rgba(255, 193, 7, 1), 0 0 60px rgba(255, 193, 7, 0.6); }
        }
        
        @keyframes point-connected {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.9), 0 0 50px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes point-hover {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(100, 116, 139, 0.4); }
          50% { transform: scale(1.1); box-shadow: 0 0 20px rgba(100, 116, 139, 0.7); }
        }
        
        @keyframes point-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
          50% { transform: scale(1.2); box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes construction-celebration {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; filter: brightness(1); }
          50% { transform: translateY(-40px) scale(1.3) rotate(180deg); opacity: 0.9; filter: brightness(1.5); }
          100% { transform: translateY(-80px) scale(0) rotate(360deg); opacity: 0; filter: brightness(2); }
        }
        
        @keyframes construction-sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; filter: brightness(1); }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.9; filter: brightness(1.8); }
          100% { transform: scale(0) rotate(360deg); opacity: 0; filter: brightness(2.5); }
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
          0% { transform: scale(0) rotate(0deg); opacity: 1; filter: brightness(1); }
          50% { transform: scale(1.4) rotate(180deg); opacity: 0.9; filter: brightness(1.8); }
          100% { transform: scale(0) rotate(360deg); opacity: 0; filter: brightness(2.5); }
        }
        
        @keyframes encouragement-bounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-10px); }
        }
        
        .wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: wave 8s linear infinite;
        }
        
        .wave1 {
          animation-delay: 0s;
        }
        
        .wave2 {
          animation-delay: 2s;
        }
        
        .wave3 {
          animation-delay: 4s;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
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
        
        .animate-line-pulse {
          animation: line-pulse 2s ease-in-out infinite;
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