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
import { Star, Zap, Target, Gift, Sparkles, Crown, Trophy, Volume2, Gamepad2 } from "lucide-react"
import { useState, useEffect } from "react"

const PinataGamePage = () => {
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
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; emoji: string; rotation: number; scale: number }>>([])
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [touchFeedback, setTouchFeedback] = useState<{ x: number; y: number; id: number; type: 'success' | 'error' } | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; x: number; y: number; text: string; color: string }>>([])
  const [shakeScreen, setShakeScreen] = useState(false)
  const [pulseElements, setPulseElements] = useState<Set<number>>(new Set())

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)
    return () => window.removeEventListener('resize', checkTouch)
  }, [])

  // Animaciones de entrada más fluidas
  useEffect(() => {
    setIsVisible(true)

    // Generar chispas de fondo con mejor distribución
    const sparkleCount = window.innerWidth < 768 ? 12 : 20
    const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }))
    setSparkles(newSparkles)

    const elements = ["header", "problem", "pinatas", "progress", "combo"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  // Celebración con confetti mejorado
  const createConfetti = () => {
    const confettiCount = window.innerWidth < 768 ? 15 : 25
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['text-pink-500', 'text-purple-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-red-500'][i % 6],
      emoji: ['🎉', '🎊', '⭐', '🎈', '🎁', '🌟', '💫', '✨', '🎯', '🏆'][i % 10],
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }

  // Crear texto flotante
  const createFloatingText = (x: number, y: number, text: string, color: string) => {
    const id = Date.now() + Math.random()
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }])
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id))
    }, 2000)
  }

  useEffect(() => {
    if (showCelebration) {
      createConfetti()
    }
  }, [showCelebration])

  // Feedback táctil mejorado con diferentes tipos
  const handleTouchFeedback = (e: React.TouchEvent | React.MouseEvent, piñataId: number, type: 'success' | 'error' = 'success') => {
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
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    setTouchFeedback({ x, y, id: piñataId, type })
    
    // Crear texto flotante
    if (type === 'success') {
      createFloatingText(clientX, clientY, '+10', 'text-green-500')
    } else {
      createFloatingText(clientX, clientY, '¡Ups!', 'text-red-500')
      // Shake effect para errores
      setShakeScreen(true)
      setTimeout(() => setShakeScreen(false), 500)
    }
    
    setTimeout(() => setTouchFeedback(null), 600)
  }

  // Vibración táctil mejorada
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20, 10, 20],
        heavy: [30, 20, 30]
      }
      navigator.vibrate(patterns[type])
    }
  }

  // Efecto de pulso para piñatas
  const triggerPulse = (piñataId: number) => {
    setPulseElements(prev => new Set([...prev, piñataId]))
    setTimeout(() => {
      setPulseElements(prev => {
        const newSet = new Set(prev)
        newSet.delete(piñataId)
        return newSet
      })
    }, 1000)
  }

  const handlePinataInteraction = (piñataId: number, e: React.TouchEvent | React.MouseEvent) => {
    const piñata = pinatas.find(p => p.id === piñataId)
    if (!piñata || piñata.isHit || !isGameActive) return

    const isCorrect = piñata.isCorrect
    
    handleTouchFeedback(e, piñataId, isCorrect ? 'success' : 'error')
    triggerHapticFeedback(isCorrect ? 'medium' : 'heavy')
    triggerPulse(piñataId)
    
    handlePinataHit(piñataId)
  }

  return (
    <div className={`relative min-h-screen overflow-hidden transition-all duration-300 ${shakeScreen ? 'animate-shake' : ''}`}>
      {/* Fondo festivo mejorado */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-500 animate-gradient-shift">
        {/* Elementos decorativos con mejor animación */}
        <div className="absolute inset-0">
          {/* Globos flotantes mejorados */}
          {Array.from({ length: window.innerWidth < 768 ? 6 : 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl md:text-4xl opacity-20 md:opacity-30 pointer-events-none animate-float-smooth"
              style={{
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            >
              🎈
            </div>
          ))}
          
          {/* Formas geométricas flotantes */}
          {Array.from({ length: window.innerWidth < 768 ? 4 : 8 }).map((_, i) => (
            <div
              key={`shape-${i}`}
              className="absolute w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-full animate-float-geometric"
              style={{
                left: `${20 + i * 12}%`,
                top: `${25 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        {/* Chispas de fondo mejoradas */}
        <div className="absolute inset-0">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-yellow-300 text-lg md:text-2xl opacity-40 md:opacity-60 pointer-events-none animate-sparkle-enhanced"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Confetti de celebración mejorado */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`fixed pointer-events-none z-50 text-2xl md:text-3xl ${piece.color} animate-confetti-enhanced`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            animationDelay: `${piece.id % 10 * 0.1}s`,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      {/* Textos flotantes */}
      {floatingTexts.map((text) => (
        <div
          key={text.id}
          className={`fixed pointer-events-none z-50 text-xl font-bold ${text.color} animate-float-text`}
          style={{
            left: text.x - 20,
            top: text.y - 30,
          }}
        >
          {text.text}
        </div>
      ))}

      {/* Feedback táctil mejorado */}
      {touchFeedback && (
        <div
          className={`fixed pointer-events-none z-50 w-16 h-16 rounded-full opacity-90 flex items-center justify-center animate-touch-ripple-enhanced ${
            touchFeedback.type === 'success' 
              ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
              : 'bg-gradient-to-r from-red-400 to-pink-400'
          }`}
          style={{
            left: touchFeedback.x - 32,
            top: touchFeedback.y - 32,
          }}
        >
          <div className="text-white text-xl font-bold">
            {touchFeedback.type === 'success' ? '✓' : '✗'}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes confetti-enhanced {
          0% { 
            transform: translateY(-100px) rotate(0deg) scale(0); 
            opacity: 1; 
          }
          10% { 
            transform: translateY(-50px) rotate(36deg) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(100vh) rotate(360deg) scale(0.5); 
            opacity: 0; 
          }
        }
        
        @keyframes float-smooth {
          0%, 100% { 
            transform: translateY(0) rotate(-2deg) scale(1); 
          }
          33% { 
            transform: translateY(-20px) rotate(1deg) scale(1.05); 
          }
          66% { 
            transform: translateY(-10px) rotate(-1deg) scale(0.95); 
          }
        }
        
        @keyframes float-geometric {
          0%, 100% { 
            transform: translateY(0) rotate(0deg); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 0.3; 
          }
        }
        
        @keyframes sparkle-enhanced {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.4; 
          }
          25% { 
            transform: scale(1.3) rotate(90deg); 
            opacity: 0.8; 
          }
          50% { 
            transform: scale(0.8) rotate(180deg); 
            opacity: 0.6; 
          }
          75% { 
            transform: scale(1.1) rotate(270deg); 
            opacity: 0.9; 
          }
        }
        
        @keyframes pinata-bounce-enhanced {
          0%, 100% { 
            transform: translateY(0) rotate(0deg) scale(1); 
          }
          25% { 
            transform: translateY(-8px) rotate(2deg) scale(1.02); 
          }
          50% { 
            transform: translateY(-4px) rotate(-1deg) scale(0.98); 
          }
          75% { 
            transform: translateY(-6px) rotate(1deg) scale(1.01); 
          }
        }
        
        @keyframes pinata-hit-enhanced {
          0% { 
            transform: scale(1) rotate(0deg); 
            filter: brightness(1); 
          }
          25% { 
            transform: scale(1.3) rotate(10deg); 
            filter: brightness(1.5); 
          }
          50% { 
            transform: scale(1.2) rotate(-8deg); 
            filter: brightness(1.3); 
          }
          75% { 
            transform: scale(1.25) rotate(5deg); 
            filter: brightness(1.4); 
          }
          100% { 
            transform: scale(1) rotate(0deg); 
            filter: brightness(1); 
          }
        }
        
        @keyframes pinata-break-enhanced {
          0% { 
            transform: scale(1) rotate(0deg); 
            opacity: 1; 
            filter: brightness(1); 
          }
          30% { 
            transform: scale(1.4) rotate(45deg); 
            opacity: 0.9; 
            filter: brightness(2); 
          }
          60% { 
            transform: scale(1.6) rotate(120deg); 
            opacity: 0.6; 
            filter: brightness(1.5); 
          }
          100% { 
            transform: scale(0) rotate(180deg); 
            opacity: 0; 
            filter: brightness(0); 
          }
        }
        
        @keyframes slide-up-enhanced {
          0% { 
            transform: translateY(30px) scale(0.9); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        
        @keyframes glow-party-enhanced {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2); 
          }
          50% { 
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(236, 72, 153, 0.4); 
          }
        }
        
        @keyframes touch-ripple-enhanced {
          0% { 
            transform: scale(0); 
            opacity: 0.9; 
          }
          50% { 
            transform: scale(2); 
            opacity: 0.6; 
          }
          100% { 
            transform: scale(4); 
            opacity: 0; 
          }
        }
        
        @keyframes pulse-glow-enhanced {
          0%, 100% { 
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.6), inset 0 0 15px rgba(59, 130, 246, 0.2); 
          }
          50% { 
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.9), inset 0 0 25px rgba(59, 130, 246, 0.4); 
          }
        }
        
        @keyframes float-text {
          0% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-50px) scale(1.2); 
            opacity: 0; 
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { 
            background: linear-gradient(135deg, #f9a8d4, #a855f7, #3b82f6); 
          }
          50% { 
            background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4); 
          }
        }
        
        @keyframes correct-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.9); 
          }
        }
        
        .animate-float-smooth { animation: float-smooth 4s ease-in-out infinite; }
        .animate-float-geometric { animation: float-geometric 6s ease-in-out infinite; }
        .animate-sparkle-enhanced { animation: sparkle-enhanced 3s ease-in-out infinite; }
        .animate-pinata-bounce-enhanced { animation: pinata-bounce-enhanced 3s ease-in-out infinite; }
        .animate-pinata-hit-enhanced { animation: pinata-hit-enhanced 0.8s ease-out; }
        .animate-pinata-break-enhanced { animation: pinata-break-enhanced 1s ease-out forwards; }
        .animate-slide-up-enhanced { animation: slide-up-enhanced 0.6s ease-out forwards; }
        .animate-glow-party-enhanced { animation: glow-party-enhanced 2.5s ease-in-out infinite; }
        .animate-touch-ripple-enhanced { animation: touch-ripple-enhanced 0.6s ease-out forwards; }
        .animate-pulse-glow-enhanced { animation: pulse-glow-enhanced 2s ease-in-out infinite; }
        .animate-float-text { animation: float-text 2s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-gradient-shift { animation: gradient-shift 8s ease-in-out infinite; }
        .animate-confetti-enhanced { animation: confetti-enhanced 3s ease-out forwards; }
        .animate-correct-glow { animation: correct-glow 1s ease-in-out infinite; }
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
              {/* Problema actual con animación mejorada */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-pink-400 shadow-xl animate-glow-party-enhanced transition-all duration-500 ${
                  animatedElements.has("problem") ? "animate-slide-up-enhanced" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Gift className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600 animate-bounce" />
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-pink-800 animate-pulse">
                        ¡Encuentra la Piñata Correcta!
                      </h3>
                      <Gift className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 border-2 sm:border-4 border-purple-300 transform hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2 animate-pulse">
                          {currentProblem.expression} = ?
                        </div>
                        <p className="text-sm sm:text-lg text-purple-600 flex items-center justify-center gap-2">
                          <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                          {isTouchDevice ? '¡Toca' : '¡Haz clic en'} la piñata con el resultado correcto!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Campo de piñatas mejorado */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-blue-400 shadow-xl transition-all duration-700 ${
                  animatedElements.has("pinatas") ? "animate-slide-up-enhanced" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-xl font-bold text-blue-800 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" />
                      ¡Elige tu Piñata!
                      <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" style={{ animationDirection: 'reverse' }} />
                    </h4>
                  </div>
                  
                  <div className="relative min-h-[320px] sm:min-h-[400px] bg-gradient-to-br from-sky-100 to-blue-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-sky-300 overflow-hidden">
                    {/* Decoración de fondo del campo mejorada */}
                    <div className="absolute inset-0">
                      {Array.from({ length: window.innerWidth < 768 ? 5 : 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-lg sm:text-2xl opacity-15 sm:opacity-20 pointer-events-none animate-sparkle-enhanced"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            animationDelay: `${i * 0.7}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                          }}
                        >
                          🌟
                        </div>
                      ))}
                    </div>
                    
                    {/* Piñatas con animaciones mejoradas */}
                    {pinatas.map((pinata) => (
                      <button
                        key={pinata.id}
                        onClick={(e) => handlePinataInteraction(pinata.id, e)}
                        onTouchStart={(e) => handlePinataInteraction(pinata.id, e)}
                        disabled={pinata.isHit || !isGameActive}
                        className={`
                          absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500
                          touch-manipulation select-none focus:outline-none focus:ring-4 focus:ring-yellow-400
                          ${pinata.isHit 
                            ? 'animate-pinata-break-enhanced pointer-events-none' 
                            : pinata.isAnimating 
                              ? 'animate-pinata-hit-enhanced' 
                              : 'animate-pinata-bounce-enhanced hover:scale-110 active:scale-95'
                          }
                          ${!pinata.isHit && isGameActive ? 'animate-pulse-glow-enhanced' : ''}
                          ${pinata.isCorrect && !pinata.isHit ? 'animate-correct-glow' : ''}
                          ${pulseElements.has(pinata.id) ? 'animate-pulse' : ''}
                        `}
                        style={{
                          left: `${pinata.x}%`,
                          top: `${pinata.y}%`,
                          transform: `translate(-50%, -50%) scale(${pinata.scale}) rotate(${pinata.rotation}deg)`,
                          minWidth: '70px',
                          minHeight: '80px',
                          animationDelay: `${pinata.id * 0.3}s`,
                        }}
                      >
                        <div className={`
                          w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-xl sm:rounded-2xl border-3 sm:border-4 shadow-xl
                          bg-gradient-to-br ${pinata.color} border-opacity-80 relative overflow-hidden
                          ${pinata.isCorrect ? 'border-yellow-400 shadow-yellow-400/50' : 'border-gray-600'}
                          transition-all duration-500 hover:shadow-2xl
                        `}>
                          {/* Brillo de piñata mejorado */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/50 to-transparent animate-pulse" />
                          <div className="absolute top-1 left-1 w-3 h-3 bg-white/70 rounded-full animate-ping" />
                          <div className="absolute top-1 left-1 w-3 h-3 bg-white/70 rounded-full" />
                          
                          {/* Contenido de la piñata */}
                          <div className="w-full h-full flex flex-col items-center justify-center text-white relative z-10">
                            <div className="text-lg sm:text-xl md:text-2xl mb-1 drop-shadow-lg animate-bounce" style={{ animationDelay: `${pinata.id * 0.2}s` }}>
                              {pinata.emoji}
                            </div>
                            <div className="text-sm sm:text-base md:text-lg font-bold bg-black/40 rounded-lg px-2 py-1 backdrop-blur-sm border border-white/20">
                              {pinata.result}
                            </div>
                          </div>
                          
                          {/* Efecto de golpe mejorado */}
                          {pinata.isAnimating && (
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/70 to-orange-300/70 animate-pulse rounded-xl" />
                          )}
                          
                          {/* Indicador de respuesta correcta mejorado */}
                          {pinata.isCorrect && !pinata.isHit && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                              <Star className="w-3 h-3 text-yellow-800" />
                            </div>
                          )}
                          
                          {/* Partículas alrededor de piñatas correctas */}
                          {pinata.isCorrect && !pinata.isHit && (
                            <>
                              <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                            </>
                          )}
                        </div>
                      </button>
                    ))}
                    
                    {/* Mensaje de celebración mejorado */}
                    {showCelebration && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white px-8 py-4 rounded-3xl shadow-2xl animate-bounce border-4 border-white">
                          <div className="text-2xl sm:text-4xl md:text-6xl font-bold drop-shadow-lg text-center animate-pulse">
                            ¡PERFECTO! 🎉
                          </div>
                          <div className="text-sm sm:text-lg text-center mt-2 animate-pulse">
                            ¡Piñata rota!
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego mejorada */}
              <Card
                className={`bg-gradient-to-r from-pink-100 to-purple-100 border-2 sm:border-4 border-pink-300 shadow-xl transition-all duration-900 ${
                  animatedElements.has("progress") ? "animate-slide-up-enhanced" : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-pink-700 mb-2">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
                    <span className="text-sm sm:text-base font-bold animate-pulse">¡Fiesta de Multiplicaciones!</span>
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                  <p className="text-xs sm:text-sm text-pink-600">
                    {isTouchDevice ? 'Toca' : 'Haz clic en'} la piñata con el resultado correcto para romperla y ganar dulces
                  </p>
                  
                  {/* Barra de progreso visual */}
                  <div className="mt-3 bg-pink-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-1000 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-pink-500 mt-1">
                    Progreso: {piñatasRotas}/{currentGameLevel?.piñatasPerLevel}
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

export default PinataGamePage