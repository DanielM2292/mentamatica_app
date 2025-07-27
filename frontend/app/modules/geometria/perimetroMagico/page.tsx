"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { usePerimetroMagico } from "@/hooks/geometria/usePerimetroMagico"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Key, Lightbulb, Clock, Target, CheckCircle, Coins, Send, BookOpen, Zap, Sparkles, Smartphone, Hand } from "lucide-react"
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
    showFormula,
    gameContainerRef,
    chestsRefs,
    problemRef,
    inputRef,
    timerRef,
    treasureRef,
    progressBarRef,
    shapeTypes,
    roundTime,
    isTouchDevice,
    celebrationParticles,
    encouragementMessage,
    showEncouragement,
    treasureSparkles,
    handleSubmitAnswer,
    handleAnswerChange,
    handleNextLevel,
    handleRestart,
    toggleHint,
    toggleFormula,
    animateInputFocus,
  } = usePerimetroMagico()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [backgroundTreasures, setBackgroundTreasures] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    const treasureArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setBackgroundTreasures(treasureArray)

    const elements = ["problem", "progress", "chests", "formula"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  const currentProblem = gameState.problems[gameState.currentProblem]
  const currentShape = currentProblem ? shapeTypes[currentProblem.shape] : null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado mejorado */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-400">
        <div className="absolute inset-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl sm:text-4xl opacity-25"
              style={{
                left: `${5 + i * 6}%`,
                top: `${10 + (i % 3) * 25}%`,
                animation: `float-treasure ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              🗝️
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0">
          {backgroundTreasures.map((treasure) => (
            <div
              key={treasure.id}
              className="absolute text-yellow-400 text-xl sm:text-2xl opacity-30"
              style={{
                left: `${treasure.x}%`,
                top: `${treasure.y}%`,
                animation: `treasure-twinkle ${3 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${treasure.delay}s`,
              }}
            >
              💎
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
            animation: `celebration-burst 3s ease-out forwards`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Chispas de tesoro */}
      {treasureSparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40 text-2xl"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            animation: `treasure-sparkle 1.5s ease-out forwards`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Mensaje de aliento */}
      {showEncouragement && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 rounded-full text-xl sm:text-2xl font-bold shadow-2xl animate-encouragement-bounce">
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
            name="Perímetro Mágico"
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
            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
              {/* Problema actual */}
              <Card
                ref={problemRef}
                className={`bg-white/95 backdrop-blur-lg border-4 border-amber-400 shadow-2xl animate-glow-treasure ${
                  animatedElements.has("problem") ? "animate-slide-treasure" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Key className="w-5 h-5 sm:w-8 sm:h-8 text-amber-600" />
                      <h3 className="text-lg sm:text-2xl font-bold text-amber-800">
                        ¡Desbloquea el Cofre del Tesoro!
                      </h3>
                      <Key className="w-5 h-5 sm:w-8 sm:h-8 text-amber-600" />
                    </div>
                    
                    {currentProblem && currentShape && (
                      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-3 sm:p-6 border-4 border-amber-300">
                        <div className="text-4xl sm:text-6xl mb-2 animate-target-bounce">{currentShape.emoji}</div>
                        <div className="text-lg sm:text-xl font-bold text-amber-800 mb-2">
                          {currentShape.name}
                        </div>
                        
                        <div className="text-base sm:text-lg text-amber-700 mb-3 sm:mb-4">
                          {currentProblem.shape === "rectangle" ? (
                            <div className="space-y-1">
                              <p><strong>Largo:</strong> {currentProblem.sides[0]} cm</p>
                              <p><strong>Ancho:</strong> {currentProblem.sides[1]} cm</p>
                            </div>
                          ) : currentProblem.shape === "triangle" ? (
                            <div>
                              <p><strong>Lados:</strong> {currentProblem.sides.join(" cm, ")} cm</p>
                            </div>
                          ) : (
                            <p><strong>Lado:</strong> {currentProblem.sides[0]} cm</p>
                          )}
                        </div>
                        
                        <p className="text-sm sm:text-base text-amber-600 mb-3 sm:mb-4">
                          Calcula el perímetro para desbloquear el cofre
                        </p>
                        
                        <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                          <Button
                            onClick={toggleHint}
                            variant="outline"
                            size={isTouchDevice ? "default" : "sm"}
                            className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 touch-manipulation"
                          >
                            <Lightbulb className="w-4 h-4 mr-2" />
                            {showHint ? 'Ocultar' : 'Mostrar'} Pista
                          </Button>
                          
                          <Button
                            onClick={toggleFormula}
                            variant="outline"
                            size={isTouchDevice ? "default" : "sm"}
                            className="bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300 touch-manipulation"
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            {showFormula ? 'Ocultar' : 'Ver'} Fórmula
                          </Button>
                        </div>
                        
                        {showHint && (
                          <div className="p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 mb-3 animate-hint-appear">
                            <p className="text-sm sm:text-base text-yellow-800">
                              💡 <strong>Pista:</strong> {currentShape.sound}
                            </p>
                          </div>
                        )}
                        
                        {showFormula && (
                          <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 animate-hint-appear">
                            <p className="text-sm sm:text-base text-blue-800">
                              📐 <strong>Fórmula:</strong> {currentShape.formula}
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
                <Card className="bg-gradient-to-r from-purple-100 to-amber-100 border-4 border-purple-300 shadow-xl">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-purple-700 mb-2">
                      <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-bold text-sm sm:text-base">Modo Cazatesoros Táctil</span>
                      <Hand className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-xs sm:text-sm text-purple-600">
                      🧮 Usa el teclado numérico para calcular el perímetro y desbloquear cofres llenos de tesoros
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Timer y tesoro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-red-400 shadow-2xl ${
                    animatedElements.has("progress") ? "animate-slide-treasure" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <CardContent className="p-3 sm:p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                      <span className="font-bold text-red-800 text-sm sm:text-base">Tiempo Restante</span>
                    </div>
                    <div 
                      ref={timerRef}
                      className={`text-2xl sm:text-3xl font-bold ${roundTime <= 30 ? 'text-red-600 animate-pulse' : 'text-red-700'}`}
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

                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                    animatedElements.has("progress") ? "animate-slide-treasure" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-2 sm:p-3 border-2 border-yellow-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                          <span className="font-bold text-yellow-800 text-xs sm:text-sm">Cofres</span>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-yellow-700">
                          {problemsCompleted}/{currentGameLevel?.problemsPerLevel}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-2 sm:p-3 border-2 border-green-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <span className="font-bold text-green-800 text-xs sm:text-sm">Aciertos</span>
                        </div>
                        <div className="text-sm sm:text-lg font-bold text-green-700">{aciertos}</div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl p-2 sm:p-3 border-2 border-amber-300">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                          <span className="font-bold text-amber-800 text-xs sm:text-sm">Tesoro</span>
                        </div>
                        <div 
                          ref={treasureRef}
                          className="text-sm sm:text-lg font-bold text-amber-700 animate-treasure-count"
                        >
                          {gameState.totalTreasure}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:mt-3">
                      <div className="relative w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div
                          ref={progressBarRef}
                          className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 h-full rounded-full transition-all duration-1000 animate-glow-treasure"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Área de respuesta */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-green-400 shadow-2xl ${
                  animatedElements.has("problem") ? "animate-slide-treasure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-green-800 flex items-center justify-center gap-2">
                      <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                      Ingresa el Perímetro
                    </h4>
                    <p className="text-xs sm:text-sm text-green-600 mt-2">
                      Calcula el perímetro en centímetros para desbloquear el cofre
                    </p>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex gap-2 sm:gap-3">
                      <Input
                        ref={inputRef}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={gameState.userAnswer}
                        onChange={(e) => handleAnswerChange(e.target.value)}
                        placeholder="Perímetro en cm"
                        className={`text-center text-lg sm:text-xl font-bold border-3 border-green-300 focus:border-green-500 touch-manipulation ${
                          isTouchDevice ? 'h-12 text-lg' : 'h-10'
                        }`}
                        onFocus={animateInputFocus}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmitAnswer()
                          }
                        }}
                        style={{ touchAction: 'manipulation' }}
                      />
                      
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!gameState.userAnswer}
                        className={`bg-green-500 hover:bg-green-600 text-white touch-manipulation ${
                          isTouchDevice ? 'px-6 h-12' : 'px-4 h-10'
                        }`}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Verificar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cofres del tesoro */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-purple-400 shadow-2xl ${
                  animatedElements.has("chests") ? "animate-slide-treasure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="text-base sm:text-lg font-bold text-purple-800 flex items-center justify-center gap-2">
                      <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                      Sala del Tesoro
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-600 mt-2">
                      Cada cofre contiene monedas de oro que se desbloquean con el perímetro correcto
                    </p>
                  </div>
                  
                  <div className={`grid gap-3 sm:gap-4 ${
                    isTouchDevice 
                      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
                      : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                  }`}>
                    {gameState.chests.map((chest, index) => (
                      <div
                        key={chest.id}
                        ref={(el) => (chestsRefs.current[index] = el)}
                        className={`
                          relative p-3 sm:p-4 rounded-xl border-3 transition-all duration-500 touch-manipulation
                          ${chest.isUnlocked 
                            ? 'bg-gradient-to-br from-yellow-200 to-amber-300 border-yellow-400 animate-chest-unlocked' 
                            : index === gameState.currentProblem 
                              ? 'bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400 animate-chest-active ring-2 ring-purple-400'
                              : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-400 hover:animate-chest-hover'
                          }
                          ${chest.isAnimating ? 'animate-chest-celebration' : ''}
                        `}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl mb-2">
                            {chest.isUnlocked ? (
                              <div className="animate-treasure-sparkle">💰</div>
                            ) : index === gameState.currentProblem ? (
                              <div className="animate-key-glow">🗝️</div>
                            ) : (
                              '🔒'
                            )}
                          </div>
                          <div className={`text-xs sm:text-sm font-bold ${
                            chest.isUnlocked ? 'text-yellow-800' : 
                            index === gameState.currentProblem ? 'text-purple-800' : 'text-gray-600'
                          }`}>
                            {chest.isUnlocked ? `+${chest.value}` : chest.value} 💰
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            Cofre #{chest.id + 1}
                          </div>
                        </div>
                        
                        {chest.isUnlocked && (
                          <div className="absolute -top-2 -right-2 text-lg sm:text-xl animate-bounce">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 animate-spin" />
                          </div>
                        )}
                        
                        {chest.isAnimating && (
                          <div className="absolute inset-0 animate-treasure-explosion pointer-events-none">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute text-base sm:text-lg animate-coin-burst"
                                style={{
                                  left: '50%',
                                  top: '50%',
                                  transform: `rotate(${i * 60}deg) translateY(-20px)`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              >
                                💰
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 sm:mt-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full px-3 sm:px-4 py-2 border-2 border-amber-300">
                      <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      <span className="font-bold text-amber-800 text-sm sm:text-base">
                        Tesoro Total: {gameState.totalTreasure} monedas de oro
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-amber-100 to-yellow-100 border-4 border-amber-300 shadow-2xl ${
                  animatedElements.has("formula") ? "animate-slide-treasure" : "opacity-0"
                }`}
                style={{ animationDelay: "0.5s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-amber-700 mb-2">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-bold text-sm sm:text-base">¡Conviértete en un Cazatesoros Matemático!</span>
                    <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-amber-600">
                    Calcula perímetros correctamente para desbloquear cofres llenos de tesoros. ¡Cada figura tiene su propia fórmula secreta!
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </GamesTemplate>

      <style jsx>{`
        @keyframes float-treasure {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(20deg); }
        }
        
        @keyframes treasure-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.4); }
        }
        
        @keyframes glow-treasure {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.6); }
        }
        
        @keyframes slide-treasure {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes chest-unlocked {
          0% { transform: scale(1) rotate(0deg); box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
          25% { transform: scale(1.1) rotate(5deg); box-shadow: 0 0 30px rgba(245, 158, 11, 0.7); }
          50% { transform: scale(1.05) rotate(-5deg); box-shadow: 0 0 25px rgba(245, 158, 11, 0.6); }
          75% { transform: scale(1.08) rotate(3deg); box-shadow: 0 0 35px rgba(245, 158, 11, 0.8); }
          100% { transform: scale(1) rotate(0deg); box-shadow: 0 0 20px rgba(245, 158, 11, 0.5); }
        }
        
        @keyframes chest-active {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(147, 51, 234, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 25px rgba(147, 51, 234, 0.7); }
        }
        
        @keyframes chest-hover {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes chest-celebration {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(10deg); }
          50% { transform: scale(1.1) rotate(-10deg); }
          75% { transform: scale(1.15) rotate(5deg); }
        }
        
        @keyframes treasure-sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(90deg); }
          50% { transform: scale(1.1) rotate(180deg); }
          75% { transform: scale(1.15) rotate(270deg); }
        }
        
        @keyframes key-glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 255, 0, 0.5)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 15px rgba(255, 255, 0, 0.8)); }
        }
        
        @keyframes treasure-explosion {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes coin-burst {
          0% { transform: rotate(var(--rotation)) translateY(0) scale(0); opacity: 1; }
          50% { transform: rotate(var(--rotation)) translateY(-30px) scale(1.2); opacity: 0.8; }
          100% { transform: rotate(var(--rotation)) translateY(-50px) scale(0); opacity: 0; }
        }
        
        @keyframes treasure-count {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
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
        
        @keyframes treasure-sparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        
        @keyframes encouragement-bounce {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-10px); }
        }
        
        @keyframes shake-input {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-chest-unlocked {
          animation: chest-unlocked 2s ease-in-out;
        }
        
        .animate-chest-active {
          animation: chest-active 2s ease-in-out infinite;
        }
        
        .animate-chest-hover {
          animation: chest-hover 0.3s ease-in-out;
        }
        
        .animate-chest-celebration {
          animation: chest-celebration 1s ease-in-out;
        }
        
        .animate-treasure-sparkle {
          animation: treasure-sparkle 2s ease-in-out infinite;
        }
        
        .animate-key-glow {
          animation: key-glow 2s ease-in-out infinite;
        }
        
        .animate-treasure-explosion {
          animation: treasure-explosion 1s ease-out;
        }
        
        .animate-coin-burst {
          animation: coin-burst 1s ease-out;
        }
        
        .animate-treasure-count {
          animation: treasure-count 0.3s ease-in-out;
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