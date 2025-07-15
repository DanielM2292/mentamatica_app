"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useRompePinata } from "@/hooks/multiplicacion/useRompePinata"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Target, Gift, Sparkles, Crown, Trophy, Volume2, Gamepad2 } from "lucide-react"
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
    pinatas,
    aciertos,
    errores,
    piñatasRotas,
    combo,
    maxCombo,
    estrellas,
    progress,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    showCelebration,
    gameContainerRef,
    handlePinataHit,
    handleNextLevel,
    handleRestart,
  } = useRompePinata()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; emoji: string }>>([])
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [touchFeedback, setTouchFeedback] = useState<{ x: number; y: number; id: number } | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Animaciones de entrada optimizadas para móviles
  useEffect(() => {
    setIsVisible(true)

    // Generar chispas de fondo (menos en móvil)
    const sparkleCount = window.innerWidth < 768 ? 8 : 15
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setSparkles(newSparkles)

    const elements = ["header", "problem", "pinatas", "progress", "combo"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 150)
    })
  }, [])

  // Celebración con confetti optimizada
  const createConfetti = () => {
    const confettiCount = window.innerWidth < 768 ? 12 : 20
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['text-pink-500', 'text-purple-500', 'text-blue-500', 'text-green-500', 'text-yellow-500'][i % 5],
      emoji: ['🎉', '🎊', '⭐', '🎈', '🎁', '🌟', '💫', '✨'][i % 8],
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 2500)
  }

  useEffect(() => {
    if (showCelebration) {
      createConfetti()
    }
  }, [showCelebration])

  // Feedback táctil mejorado
  const handleTouchFeedback = (e: React.TouchEvent | React.MouseEvent, piñataId: number) => {
    let clientX, clientY
    
    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0]
      clientX = touch.clientX
      clientY = touch.clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const rect = e.currentTarget.getBoundingClientRect()
    setTouchFeedback({
      x: clientX - rect.left,
      y: clientY - rect.top,
      id: piñataId
    })
    setTimeout(() => setTouchFeedback(null), 400)
  }

  // Vibración táctil (si está disponible)
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      }
      navigator.vibrate(patterns[type])
    }
  }

  const handlePinataInteraction = (piñataId: number, e: React.TouchEvent | React.MouseEvent) => {
    handleTouchFeedback(e, piñataId)
    triggerHapticFeedback('medium')
    handlePinataHit(piñataId)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo festivo optimizado para móviles */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-500">
        {/* Elementos decorativos reducidos en móvil */}
        <div className="absolute inset-0">
          {/* Globos flotantes */}
          {Array.from({ length: window.innerWidth < 768 ? 4 : 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-4xl opacity-20 md:opacity-30 pointer-events-none"
              style={{
                left: `${15 + i * 18}%`,
                top: `${20 + (i % 2) * 30}%`,
                animation: `float-balloon ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              🎈
            </div>
          ))}
        </div>
        
        {/* Chispas de fondo */}
        <div className="absolute inset-0">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-yellow-300 text-lg md:text-2xl opacity-40 md:opacity-60 pointer-events-none"
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
      </div>

      {/* Confetti de celebración */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`fixed pointer-events-none z-50 text-2xl md:text-3xl ${piece.color}`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animation: `confetti-fall 2.5s ease-out forwards`,
            animationDelay: `${piece.id * 0.08}s`,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      {/* Feedback táctil mejorado */}
      {touchFeedback && (
        <div
          className="fixed pointer-events-none z-50 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 flex items-center justify-center"
          style={{
            left: touchFeedback.x - 24,
            top: touchFeedback.y - 24,
            animation: 'touch-ripple 0.4s ease-out forwards',
          }}
        >
          <div className="text-white text-lg font-bold">+</div>
        </div>
      )}

      <style jsx>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes float-balloon {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        
        @keyframes sparkle-twinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes pinata-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        
        @keyframes pinata-hit {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(5deg); }
          50% { transform: scale(1.15) rotate(-5deg); }
          75% { transform: scale(1.18) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes pinata-break {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.3) rotate(90deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(180deg); opacity: 0; }
        }
        
        @keyframes slide-up-festa {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-party {
          0%, 100% { box-shadow: 0 0 15px rgba(236, 72, 153, 0.3); }
          50% { box-shadow: 0 0 25px rgba(236, 72, 153, 0.6); }
        }
        
        @keyframes touch-ripple {
          0% { transform: scale(0); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
        }
        
        .animate-pinata-bounce { animation: pinata-bounce 2s ease-in-out infinite; }
        .animate-pinata-hit { animation: pinata-hit 0.6s ease-out; }
        .animate-pinata-break { animation: pinata-break 0.8s ease-out forwards; }
        .animate-slide-up-festa { animation: slide-up-festa 0.5s ease-out forwards; }
        .animate-glow-party { animation: glow-party 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 1.5s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-2 sm:pt-4 relative z-10">
          <GameHeader
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/multiplicacion.png"
            name="Rompe la Piñata"
            totalSets={currentGameLevel?.piñatasPerLevel || 1}
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
              {/* Problema actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-pink-400 shadow-xl animate-glow-party ${
                  animatedElements.has("problem") ? "animate-slide-up-festa" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Gift className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600" />
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-pink-800">
                        ¡Encuentra la Piñata Correcta!
                      </h3>
                      <Gift className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600" />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 border-2 sm:border-4 border-purple-300">
                        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2">
                          {currentProblem.expression} = ?
                        </div>
                        <p className="text-sm sm:text-lg text-purple-600 flex items-center justify-center gap-2">
                          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          {isTouchDevice ? '¡Toca' : '¡Haz clic en'} la piñata con el resultado correcto!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Campo de piñatas - Optimizado para táctil */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-blue-400 shadow-xl ${
                  animatedElements.has("pinatas") ? "animate-slide-up-festa" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-xl font-bold text-blue-800 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                      ¡Elige tu Piñata!
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                    </h4>
                  </div>
                  
                  <div className="relative min-h-[320px] sm:min-h-[400px] bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-sky-300 overflow-hidden">
                    {/* Decoración de fondo del campo */}
                    <div className="absolute inset-0">
                      {Array.from({ length: window.innerWidth < 768 ? 3 : 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-lg sm:text-2xl opacity-15 sm:opacity-20 pointer-events-none"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            animation: `sparkle-twinkle ${3 + Math.random()}s ease-in-out infinite`,
                            animationDelay: `${i * 0.5}s`,
                          }}
                        >
                          🌟
                        </div>
                      ))}
                    </div>
                    
                    {/* Piñatas optimizadas para táctil */}
                    {pinatas.map((pinata) => (
                      <button
                        key={pinata.id}
                        onClick={(e) => handlePinataInteraction(pinata.id, e)}
                        onTouchStart={(e) => handlePinataInteraction(pinata.id, e)}
                        disabled={pinata.isHit || !isGameActive}
                        className={`
                          absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                          touch-manipulation select-none focus:outline-none focus:ring-4 focus:ring-yellow-400
                          ${pinata.isHit 
                            ? 'animate-pinata-break pointer-events-none' 
                            : pinata.isAnimating 
                              ? 'animate-pinata-hit' 
                              : 'animate-pinata-bounce hover:scale-110 active:scale-95'
                          }
                          ${!pinata.isHit && isGameActive ? 'animate-pulse-glow' : ''}
                        `}
                        style={{
                          left: `${pinata.x}%`,
                          top: `${pinata.y}%`,
                          transform: `translate(-50%, -50%) scale(${pinata.scale}) rotate(${pinata.rotation}deg)`,
                          minWidth: '70px',
                          minHeight: '80px',
                        }}
                      >
                        <div className={`
                          w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl sm:rounded-2xl border-3 sm:border-4 shadow-xl
                          bg-gradient-to-br ${pinata.color} border-opacity-80 relative overflow-hidden
                          ${pinata.isCorrect ? 'border-yellow-400' : 'border-gray-600'}
                          transition-all duration-300
                        `}>
                          {/* Brillo de piñata mejorado */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent" />
                          <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 rounded-full" />
                          
                          {/* Contenido de la piñata */}
                          <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
                            <div className="text-lg sm:text-xl md:text-2xl mb-1 drop-shadow-lg">
                              {pinata.emoji}
                            </div>
                            <div className="text-sm sm:text-base md:text-lg font-bold bg-black/30 rounded-lg px-2 py-1 backdrop-blur-sm">
                              {pinata.result}
                            </div>
                          </div>
                          
                          {/* Efecto de golpe mejorado */}
                          {pinata.isAnimating && (
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/60 to-orange-300/60 animate-pulse" />
                          )}
                          
                          {/* Indicador de respuesta correcta */}
                          {pinata.isCorrect && !pinata.isHit && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Star className="w-2 h-2 text-yellow-800" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                    
                    {/* Mensaje de celebración mejorado */}
                    {showCelebration && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-2xl shadow-2xl">
                          <div className="text-2xl sm:text-4xl md:text-6xl font-bold animate-bounce drop-shadow-lg text-center">
                            ¡PERFECTO! 🎉
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-pink-100 to-purple-100 border-2 sm:border-4 border-pink-300 shadow-xl ${
                  animatedElements.has("progress") ? "animate-slide-up-festa" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-pink-700 mb-2">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-bold">¡Fiesta de Multiplicaciones!</span>
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-pink-600">
                    {isTouchDevice ? 'Toca' : 'Haz clic en'} la piñata con el resultado correcto para romperla y ganar dulces
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