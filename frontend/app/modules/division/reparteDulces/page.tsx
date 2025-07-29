"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useReparteDulces } from "@/hooks/division/useReparteDulces"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Lightbulb, Gift, Share, CheckCircle, Smartphone, Hand } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"

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
    characters,
    candies,
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
    selectedCandy,
    draggedCandy,
    gameContainerRef,
    candyTypes,
    handleDragStart,
    handleDropOnCharacter,
    handleRemoveFromCharacter,
    handleNextLevel,
    handleRestart,
    toggleHint,
  } = useReparteDulces()

  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  const [shareSparkles, setShareSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  
  // Estados para el sistema táctil mejorado
  const [selectedCandyForMobile, setSelectedCandyForMobile] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [currentDraggedCandy, setCurrentDraggedCandy] = useState<number | null>(null)
  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Detectar dispositivo táctil
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
    }
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  // Animaciones de entrada
  useEffect(() => {
    setIsVisible(true)

    const sparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setShareSparkles(sparkles)

    const elements = ["problem", "candies", "characters", "progress", "hint"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 200)
    })
  }, [])

  // Crear corazones de celebración
  const createHearts = useCallback(() => {
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: ['text-pink-500', 'text-red-500', 'text-purple-500', 'text-yellow-500'][i % 4],
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 3000)
  }, [])

  useEffect(() => {
    if (aciertos > 0) {
      createHearts()
    }
  }, [aciertos, createHearts])

  const currentCandyType = candyTypes[selectedCandy]

  // Sistema de selección para móviles
  const handleCandySelect = useCallback((candyId: number) => {
    if (!isTouchDevice) return
    
    const candy = candies.find(c => c.id === candyId)
    if (!candy || candy.isPlaced) return

    if (selectedCandyForMobile === candyId) {
      setSelectedCandyForMobile(null)
    } else {
      setSelectedCandyForMobile(candyId)
    }
  }, [isTouchDevice, candies, selectedCandyForMobile])

  // Colocación en personaje para móviles
  const handleCharacterTap = useCallback((characterId: number) => {
    if (!isTouchDevice || selectedCandyForMobile === null) return
    
    const character = characters.find(c => c.id === characterId)
    if (!character || character.receivedCandies.length >= character.expectedAmount) return

    handleDropOnCharacter(characterId, selectedCandyForMobile)
    setSelectedCandyForMobile(null)
  }, [isTouchDevice, selectedCandyForMobile, characters, handleDropOnCharacter])

  // Drag and drop para computadoras
  const handleMouseDown = useCallback((e: React.MouseEvent, candyId: number) => {
    if (isTouchDevice) return
    
    const candy = candies.find(c => c.id === candyId)
    if (!candy || candy.isPlaced) return

    e.preventDefault()
    
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    
    setCurrentDraggedCandy(candyId)
    setIsDragging(true)
    setDragOffset({ x: offsetX, y: offsetY })
    setDragPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY })
    
    handleDragStart(candyId)
    
    const handleMouseMove = (e: MouseEvent) => {
      setDragPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY })
      
      // Detectar personaje sobre el que está el mouse
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const characterElement = elements.find(el => el.hasAttribute('data-character-drop'))
      
      if (characterElement) {
        const characterId = parseInt(characterElement.getAttribute('data-character-drop') || '-1')
        setHoveredCharacter(characterId >= 0 ? characterId : null)
      } else {
        setHoveredCharacter(null)
      }
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false)
      setDragPosition(null)
      setCurrentDraggedCandy(null)
      setHoveredCharacter(null)
      
      // Encontrar el personaje donde se soltó
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const characterElement = elements.find(el => el.hasAttribute('data-character-drop'))
      
      if (characterElement) {
        const characterId = parseInt(characterElement.getAttribute('data-character-drop') || '-1')
        if (characterId >= 0) {
          handleDropOnCharacter(characterId, candyId)
        }
      }
      
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [isTouchDevice, candies, handleDragStart, handleDropOnCharacter])

  // Touch events para móviles
  const handleTouchStart = useCallback((e: React.TouchEvent, candyId: number) => {
    if (!isTouchDevice) return
    
    const candy = candies.find(c => c.id === candyId)
    if (!candy || candy.isPlaced) return

    e.preventDefault()
    
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top
    
    setCurrentDraggedCandy(candyId)
    setIsDragging(true)
    setDragOffset({ x: offsetX, y: offsetY })
    setDragPosition({ x: touch.clientX - offsetX, y: touch.clientY - offsetY })
    
    handleDragStart(candyId)
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      setDragPosition({ x: touch.clientX - offsetX, y: touch.clientY - offsetY })
      
      // Detectar personaje sobre el que está el dedo
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
      const characterElement = elements.find(el => el.hasAttribute('data-character-drop'))
      
      if (characterElement) {
        const characterId = parseInt(characterElement.getAttribute('data-character-drop') || '-1')
        setHoveredCharacter(characterId >= 0 ? characterId : null)
      } else {
        setHoveredCharacter(null)
      }
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      setIsDragging(false)
      setDragPosition(null)
      setCurrentDraggedCandy(null)
      setHoveredCharacter(null)
      
      const touch = e.changedTouches[0]
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
      const characterElement = elements.find(el => el.hasAttribute('data-character-drop'))
      
      if (characterElement) {
        const characterId = parseInt(characterElement.getAttribute('data-character-drop') || '-1')
        if (characterId >= 0) {
          handleDropOnCharacter(characterId, candyId)
        }
      }
      
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
  }, [isTouchDevice, candies, handleDragStart, handleDropOnCharacter])

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Fondo animado */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400">
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl opacity-30"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `float-heart ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              💖
            </div>
          ))}
          
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-pink-400/30 to-purple-400/30 h-2 rounded-full"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${60 + Math.random() * 80}px`,
                animation: `wave-kindness ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0">
          {shareSparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute text-yellow-300 text-2xl opacity-60"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animation: `share-twinkle ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      {/* Corazones de celebración */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`fixed pointer-events-none z-50 text-4xl ${heart.color}`}
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animation: `heart-float 3s ease-out forwards`,
            animationDelay: `${heart.id * 0.1}s`,
          }}
        >
          💖
        </div>
      ))}

      {/* Dulce siendo arrastrado */}
      {isDragging && currentDraggedCandy !== null && dragPosition && (
        <div
          className="fixed pointer-events-none z-50 w-16 h-16 rounded-xl border-4 bg-gradient-to-br shadow-2xl flex items-center justify-center text-2xl transform rotate-12 scale-110 animate-drag-wobble"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            background: `linear-gradient(to bottom right, ${currentCandyType.color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${currentCandyType.color.replace('from-', '').replace('to-', '').split(' ')[1]})`,
            borderColor: currentCandyType.color.includes('pink') ? '#ec4899' : 
                        currentCandyType.color.includes('green') ? '#10b981' :
                        currentCandyType.color.includes('blue') ? '#3b82f6' :
                        currentCandyType.color.includes('yellow') ? '#f59e0b' : '#8b5cf6',
          }}
        >
          {currentCandyType.emoji}
        </div>
      )}

      <GamesTemplate>
        <div className="max-w-4xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/division"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/division.png"
            name="Reparte los Dulces"
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
              onRestart={handleRestart} 
            />
          ) : isLevelComplete ? (
            <NivelCompletado
              aciertos={aciertos}
              isLastLevel={isLastLevel}
              onNextLevel={handleNextLevel}
            />
          ) : (
            <div className="mt-6 space-y-6" ref={gameContainerRef}>
              {/* Problema actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-4 border-pink-400 shadow-2xl animate-glow-sweet ${
                  animatedElements.has("problem") ? "animate-slide-share" : "opacity-0"
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                      <h3 className="text-xl sm:text-2xl font-bold text-pink-800">
                        ¡Comparte con Amor!
                      </h3>
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 sm:p-6 border-4 border-purple-300">
                        <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-purple-800 mb-2">
                          {currentProblem.expression} = {currentProblem.quotient}
                        </div>
                        <p className="text-sm sm:text-lg text-purple-600 mb-4">
                          Reparte {currentProblem.totalCandies} dulces entre {currentProblem.divisor} amigos
                        </p>
                        
                        <Button
                          onClick={toggleHint}
                          variant="outline"
                          size="sm"
                          className="bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300"
                        >
                          <Lightbulb className="w-4 h-4 mr-2" />
                          {showHint ? 'Ocultar' : 'Mostrar'} Pista
                        </Button>
                        
                        {showHint && (
                          <div className="mt-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                            <p className="text-sm text-yellow-800">
                              💡 <strong>Pista:</strong> Cada amigo debe recibir exactamente {currentProblem.quotient} dulces para que sea justo.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instrucciones para móviles */}
              {isTouchDevice && (
                <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-blue-300 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-bold">Modo Táctil Activado</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      {selectedCandyForMobile !== null 
                        ? "🎯 Toca un amigo para darle el dulce seleccionado" 
                        : "👆 Toca un dulce para seleccionarlo o arrastra directamente"
                      }
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Área de juego */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dulces para repartir */}
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-yellow-400 shadow-2xl ${
                    animatedElements.has("candies") ? "animate-slide-share" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-yellow-800 flex items-center justify-center gap-2">
                        <Gift className="w-5 h-5" />
                        Dulces para Compartir
                      </h4>
                      <p className="text-sm text-yellow-600 mt-2">
                        {isTouchDevice ? "Toca para seleccionar o arrastra" : "Arrastra los dulces a tus amigos"}
                      </p>
                    </div>
                    
                    <div className="relative min-h-[200px] bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-3 border-yellow-300 p-4">
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {candies.filter(candy => !candy.isPlaced).map((candy) => (
                          <div
                            key={candy.id}
                            onMouseDown={(e) => handleMouseDown(e, candy.id)}
                            onTouchStart={(e) => handleTouchStart(e, candy.id)}
                            onClick={() => handleCandySelect(candy.id)}
                            className={`
                              relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-3 cursor-pointer
                              bg-gradient-to-br ${currentCandyType.color} border-opacity-80 
                              flex items-center justify-center text-xl sm:text-2xl transition-all duration-300
                              hover:scale-110 active:scale-95 shadow-lg select-none touch-manipulation
                              ${currentDraggedCandy === candy.id && isDragging ? 'opacity-30' : ''}
                              ${selectedCandyForMobile === candy.id ? 'animate-candy-select ring-4 ring-blue-400' : ''}
                              ${!isDragging ? 'animate-candy-bounce' : ''}
                            `}
                            style={{
                              touchAction: 'none',
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              animationDelay: `${candy.id * 0.1}s`
                            }}
                          >
                            {currentCandyType.emoji}
                            {selectedCandyForMobile === candy.id && isTouchDevice && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                <Hand className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personajes */}
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-4 border-blue-400 shadow-2xl ${
                    animatedElements.has("characters") ? "animate-slide-share" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-blue-800 flex items-center justify-center gap-2">
                        <Users className="w-5 h-5" />
                        Amigos Esperando
                      </h4>
                      <p className="text-sm text-blue-600 mt-2">
                        Cada uno necesita {currentProblem?.quotient} dulces
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {characters.map((character) => (
                        <div
                          key={character.id}
                          data-character-drop={character.id}
                          onClick={() => handleCharacterTap(character.id)}
                          className={`
                            relative min-h-[80px] rounded-xl border-3 p-3 sm:p-4 transition-all duration-300
                            ${isTouchDevice ? 'cursor-pointer' : ''}
                            ${character.receivedCandies.length === character.expectedAmount
                              ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-400 animate-character-happy' 
                              : `bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300`
                            }
                            ${hoveredCharacter === character.id ? 'animate-drop-zone-active ring-4 ring-green-400 scale-105' : ''}
                            ${selectedCandyForMobile !== null && isTouchDevice && character.receivedCandies.length < character.expectedAmount 
                              ? 'ring-2 ring-purple-400 ring-opacity-50 animate-pulse' : ''
                            }
                          `}
                          style={{
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none'
                          }}
                        >
                          <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl sm:text-3xl">{character.emoji}</span>
                              <div>
                                <div className="font-bold text-blue-800 text-sm sm:text-base">{character.name}</div>
                                <div className="text-xs sm:text-sm text-blue-600">
                                  {character.receivedCandies.length}/{character.expectedAmount} dulces
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedCandyForMobile !== null && isTouchDevice && character.receivedCandies.length < character.expectedAmount && (
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                                  <Hand className="w-3 h-3 text-white" />
                                </div>
                              )}
                              {character.receivedCandies.length === character.expectedAmount && (
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {character.receivedCandies.map((candy) => (
                              <div
                                key={candy.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromCharacter(candy.id)
                                }}
                                className={`
                                  w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg border-2 cursor-pointer
                                  bg-gradient-to-br ${currentCandyType.color} border-opacity-80
                                  flex items-center justify-center text-sm sm:text-base md:text-lg transition-all duration-300
                                  hover:scale-110 active:scale-95 animate-candy-bounce
                                `}
                                style={{
                                  touchAction: 'manipulation',
                                  userSelect: 'none',
                                  WebkitUserSelect: 'none',
                                  animationDelay: `${candy.id * 0.05}s`
                                }}
                              >
                                {currentCandyType.emoji}
                              </div>
                            ))}
                            
                            {Array.from({ length: character.expectedAmount - character.receivedCandies.length }).map((_, i) => (
                              <div
                                key={`empty-${i}`}
                                className={`
                                  w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg border-2 border-dashed 
                                  ${selectedCandyForMobile !== null && isTouchDevice 
                                    ? 'border-purple-400 bg-purple-50 animate-pulse' 
                                    : 'border-gray-300 bg-gray-100'
                                  } 
                                  flex items-center justify-center text-gray-400 text-sm sm:text-base
                                `}
                              >
                                ?
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-pink-100 to-purple-100 border-4 border-pink-300 shadow-2xl ${
                  animatedElements.has("hint") ? "animate-slide-share" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-pink-700 mb-2">
                    <Share className="w-5 h-5" />
                    <span className="font-bold">¡Aprende a Compartir!</span>
                    <Share className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-pink-600">
                    {isTouchDevice 
                      ? "Toca un dulce para seleccionarlo, luego toca un amigo para dárselo, o arrastra directamente"
                      : "Arrastra los dulces para repartirlos equitativamente entre todos los amigos"
                    }
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