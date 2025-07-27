"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useRepeticionesRapidas } from "@/hooks/multiplicacion/useRepeticionesRapidas"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Target, Lightbulb, Sparkles, Grid3X3, CheckCircle, Move, Hand, Star, Smartphone, Zap, Trophy, Trash2 } from "lucide-react"
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
    dragItems,
    dropZones,
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
    selectedElement,
    draggedItem,
    gameContainerRef,
    elementTypes,
    handleDragStart,
    handleDrop,
    handleRemoveFromZone,
    handleNextLevel,
    handleRestart,
    toggleHint,
  } = useRepeticionesRapidas()

  // Estados para el sistema táctil del juego reparte dulces
  const [selectedItemForMobile, setSelectedItemForMobile] = useState<number | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [currentDraggedItem, setCurrentDraggedItem] = useState<number | null>(null)
  const [hoveredZone, setHoveredZone] = useState<number | null>(null)
  
  // Estados de animación
  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set())
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [pulsingZones, setPulsingZones] = useState<Set<number>>(new Set())

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

  // Animaciones de entrada optimizadas
  useEffect(() => {
    setIsVisible(true)

    // Generar elementos flotantes
    const elementCount = window.innerWidth < 768 ? 6 : 12
    const floating = Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: elementTypes[i % elementTypes.length].emoji,
    }))
    setFloatingElements(floating)

    const elements = ["problem", "elements", "zones", "progress", "hint"]
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements(prev => new Set([...prev, element]))
      }, index * 150)
    })
  }, [elementTypes])

  // Efecto de pulsación en zonas incompletas
  useEffect(() => {
    const incompleteZones = dropZones.filter(zone => !zone.isComplete).map(zone => zone.id)
    setPulsingZones(new Set(incompleteZones))
  }, [dropZones])

  // Crear partículas de celebración
  const createCelebrationParticles = () => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setCelebrationParticles(particles)
    setTimeout(() => setCelebrationParticles([]), 2000)
  }

  const currentElementType = elementTypes[selectedElement]

  // Sistema de selección para móviles (igual que reparte dulces)
  const handleItemSelect = useCallback((itemId: number) => {
    if (!isTouchDevice) return
    
    const item = dragItems.find(i => i.id === itemId)
    if (!item || item.isPlaced) return

    if (selectedItemForMobile === itemId) {
      setSelectedItemForMobile(null)
    } else {
      setSelectedItemForMobile(itemId)
    }
  }, [isTouchDevice, dragItems, selectedItemForMobile])

  // Colocación en zona para móviles (igual que reparte dulces)
  const handleZoneTap = useCallback((zoneId: number) => {
    if (!isTouchDevice || selectedItemForMobile === null) return
    
    const zone = dropZones.find(z => z.id === zoneId)
    if (!zone || zone.isComplete) return

    handleDrop(zoneId, selectedItemForMobile)
    setSelectedItemForMobile(null)
  }, [isTouchDevice, selectedItemForMobile, dropZones, handleDrop])

  // Drag and drop para computadoras (igual que reparte dulces)
  const handleMouseDown = useCallback((e: React.MouseEvent, itemId: number) => {
    if (isTouchDevice) return
    
    const item = dragItems.find(i => i.id === itemId)
    if (!item || item.isPlaced) return

    e.preventDefault()
    
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    
    setCurrentDraggedItem(itemId)
    setIsDragging(true)
    setDragOffset({ x: offsetX, y: offsetY })
    setDragPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY })
    
    handleDragStart(itemId)
    
    const handleMouseMove = (e: MouseEvent) => {
      setDragPosition({ x: e.clientX - offsetX, y: e.clientY - offsetY })
      
      // Detectar zona sobre la que está el mouse
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const zoneElement = elements.find(el => el.hasAttribute('data-zone-drop'))
      
      if (zoneElement) {
        const zoneId = parseInt(zoneElement.getAttribute('data-zone-drop') || '-1')
        setHoveredZone(zoneId >= 0 ? zoneId : null)
      } else {
        setHoveredZone(null)
      }
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false)
      setDragPosition(null)
      setCurrentDraggedItem(null)
      setHoveredZone(null)
      
      // Encontrar la zona donde se soltó
      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const zoneElement = elements.find(el => el.hasAttribute('data-zone-drop'))
      
      if (zoneElement) {
        const zoneId = parseInt(zoneElement.getAttribute('data-zone-drop') || '-1')
        if (zoneId >= 0) {
          handleDrop(zoneId, itemId)
        }
      }
      
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [isTouchDevice, dragItems, handleDragStart, handleDrop])

  // Touch events para móviles (igual que reparte dulces)
  const handleTouchStart = useCallback((e: React.TouchEvent, itemId: number) => {
    if (!isTouchDevice) return
    
    const item = dragItems.find(i => i.id === itemId)
    if (!item || item.isPlaced) return

    e.preventDefault()
    
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top
    
    setCurrentDraggedItem(itemId)
    setIsDragging(true)
    setDragOffset({ x: offsetX, y: offsetY })
    setDragPosition({ x: touch.clientX - offsetX, y: touch.clientY - offsetY })
    
    handleDragStart(itemId)
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      setDragPosition({ x: touch.clientX - offsetX, y: touch.clientY - offsetY })
      
      // Detectar zona sobre la que está el dedo
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
      const zoneElement = elements.find(el => el.hasAttribute('data-zone-drop'))
      
      if (zoneElement) {
        const zoneId = parseInt(zoneElement.getAttribute('data-zone-drop') || '-1')
        setHoveredZone(zoneId >= 0 ? zoneId : null)
      } else {
        setHoveredZone(null)
      }
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      setIsDragging(false)
      setDragPosition(null)
      setCurrentDraggedItem(null)
      setHoveredZone(null)
      
      const touch = e.changedTouches[0]
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
      const zoneElement = elements.find(el => el.hasAttribute('data-zone-drop'))
      
      if (zoneElement) {
        const zoneId = parseInt(zoneElement.getAttribute('data-zone-drop') || '-1')
        if (zoneId >= 0) {
          handleDrop(zoneId, itemId)
        }
      }
      
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })
  }, [isTouchDevice, dragItems, handleDragStart, handleDrop])

  // Limpiar todos los elementos de las zonas
  const clearAllZones = () => {
    dropZones.forEach(zone => {
      zone.placedItems.forEach(item => {
        handleRemoveFromZone(item.id)
      })
    })
    setSelectedItemForMobile(null)
  }

  return (
    <div className="relative min-h-screen overflow-hidden" ref={containerRef}>
      {/* Elemento siendo arrastrado */}
      {isDragging && currentDraggedItem !== null && dragPosition && (
        <div
          className="fixed pointer-events-none z-50 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl shadow-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold border-2 border-yellow-300 scale-110"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: "translate(-50%, -50%)",
            background: `linear-gradient(135deg, ${currentElementType.color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${currentElementType.color.replace('from-', '').replace('to-', '').split(' ')[1]})`,
          }}
        >
          {currentElementType.emoji}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full flex items-center justify-center">
            <Star className="w-2 h-2 text-yellow-700" />
          </div>
        </div>
      )}

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-float 2s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          <div className="text-2xl">{["🎉", "⭐", "✨", "🌟", "💫", "🎊"][particle.id % 6]}</div>
        </div>
      ))}

      {/* Fondo de construcción optimizado para móviles */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
        {/* Elementos flotantes de fondo */}
        <div className="absolute inset-0">
          {floatingElements.map((element) => (
            <div
              key={element.id}
              className="absolute text-lg sm:text-2xl opacity-20 sm:opacity-30"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animation: `float-element ${4 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {element.emoji}
            </div>
          ))}
        </div>
        
        {/* Partículas de construcción */}
        <div className="absolute inset-0">
          {Array.from({ length: window.innerWidth < 768 ? 5 : 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-lg sm:text-xl opacity-40 sm:opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `construction-sparkle ${3 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float-element {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(60deg); }
          66% { transform: translateY(-5px) rotate(120deg); }
        }
        
        @keyframes construction-sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes slide-build {
          0% { transform: translateY(15px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes glow-build {
          0%, 100% { box-shadow: 0 0 15px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); }
        }
        
        @keyframes pulse-selected {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }

        @keyframes pulse-zone {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.4); }
        }

        @keyframes celebration-float {
          0% { transform: translateY(0) scale(0) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-100px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(-200px) scale(0) rotate(360deg); opacity: 0; }
        }

        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }

        @keyframes drop-zone-active {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0.4); }
        }

        @keyframes candy-select {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes candy-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes character-happy {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes drag-wobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-2deg); }
          75% { transform: rotate(2deg); }
        }
        
        .animate-slide-build { animation: slide-build 0.5s ease-out forwards; }
        .animate-glow-build { animation: glow-build 2s ease-in-out infinite; }
        .animate-pulse-selected { animation: pulse-selected 1s ease-in-out infinite; }
        .animate-pulse-zone { animation: pulse-zone 2s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out forwards; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-drop-zone-active { animation: drop-zone-active 1s ease-in-out infinite; }
        .animate-candy-select { animation: candy-select 1s ease-in-out infinite; }
        .animate-candy-bounce { animation: candy-bounce 2s ease-in-out infinite; }
        .animate-character-happy { animation: character-happy 2s ease-in-out infinite; }
        .animate-drag-wobble { animation: drag-wobble 0.5s ease-in-out infinite; }
      `}</style>

      <GamesTemplate>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-2 sm:pt-4 relative z-10">
          <GameHeader
            nav="/modules/multiplicacion"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/multiplicacion.png"
            name="Repeticiones Rápidas"
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
              {/* Problema actual */}
              <Card
                className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-green-400 shadow-xl animate-glow-build ${
                  animatedElements.has("problem") ? "animate-slide-build" : "opacity-0"
                }`}
              >
                <CardContent className="p-3 sm:p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <Package className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                      <h3 className="text-lg sm:text-2xl font-bold text-green-800">
                        ¡Construye Grupos!
                      </h3>
                      <Package className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    
                    {currentProblem && (
                      <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 border-2 sm:border-4 border-blue-300">
                        <div className="text-xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-2">
                          {currentProblem.expression} = {currentProblem.result}
                        </div>
                        <p className="text-sm sm:text-lg text-blue-600 mb-3 sm:mb-4">
                          {isTouchDevice ? 'Toca para seleccionar o arrastra directamente' : 'Arrastra'} {currentProblem.totalElements} {currentElementType.name} para formar {currentProblem.multiplier} grupos de {currentProblem.multiplicand}
                        </p>
                        
                        {/* Sistema de pistas */}
                        <Button
                          onClick={toggleHint}
                          variant="outline"
                          size="sm"
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 text-xs sm:text-sm"
                        >
                          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {showHint ? 'Ocultar' : 'Mostrar'} Pista
                        </Button>
                        
                        {showHint && (
                          <div className="mt-3 p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl border border-yellow-200">
                            <p className="text-xs sm:text-sm text-yellow-800">
                              💡 <strong>Pista:</strong> Necesitas hacer {currentProblem.multiplier} grupos, cada uno con exactamente {currentProblem.multiplicand} elementos.
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
                      {selectedItemForMobile !== null 
                        ? "🎯 Toca un grupo para colocar el elemento seleccionado" 
                        : "👆 Toca un elemento para seleccionarlo o arrastra directamente"
                      }
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Área de construcción - Layout vertical en móvil */}
              <div className="space-y-3 sm:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {/* Elementos para arrastrar */}
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-yellow-400 shadow-xl ${
                    animatedElements.has("elements") ? "animate-slide-build" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.2s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg font-bold text-yellow-800 flex items-center justify-center gap-2">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                        Elementos para Agrupar
                      </h4>
                      <p className="text-xs sm:text-sm text-yellow-600 mt-1 sm:mt-2">
                        {isTouchDevice ? 'Toca para seleccionar o arrastra directamente' : 'Arrastra'} los {currentElementType.name} a los grupos
                      </p>
                    </div>
                    
                    <div className="relative min-h-[150px] sm:min-h-[200px] bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl border-2 border-yellow-300 p-3 sm:p-4">
                      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                        {dragItems.filter(item => !item.isPlaced).map((item) => (
                          <div
                            key={item.id}
                            onMouseDown={(e) => handleMouseDown(e, item.id)}
                            onTouchStart={(e) => handleTouchStart(e, item.id)}
                            onClick={() => handleItemSelect(item.id)}
                            className={`
                              w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl border-2 sm:border-3 cursor-pointer
                              bg-gradient-to-br ${currentElementType.color} border-opacity-80 
                              flex items-center justify-center text-lg sm:text-2xl transition-all duration-300
                              hover:scale-110 active:scale-95 shadow-lg touch-manipulation select-none relative overflow-hidden
                              ${currentDraggedItem === item.id && isDragging ? 'opacity-30' : ''}
                              ${selectedItemForMobile === item.id ? 'animate-candy-select ring-4 ring-blue-400' : ''}
                              ${!isDragging ? 'animate-candy-bounce' : ''}
                            `}
                            style={{
                              touchAction: 'none',
                              userSelect: 'none',
                              WebkitUserSelect: 'none',
                              animationDelay: `${item.id * 0.1}s`
                            }}
                          >
                            {currentElementType.emoji}
                            {selectedItemForMobile === item.id && isTouchDevice && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                <Hand className="w-3 h-3 text-white" />
                              </div>
                            )}

                            {/* Efecto de brillo en hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 hover:translate-x-full transition-all duration-700"></div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Indicador de selección global */}
                      {isTouchDevice && selectedItemForMobile !== null && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          Elemento seleccionado
                        </div>
                      )}

                      {/* Indicador de modo drag */}
                      {isDragging && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                          Arrastrando...
                        </div>
                      )}

                      {/* Botón limpiar elementos */}
                      <div className="absolute bottom-2 right-2">
                        <Button
                          onClick={clearAllZones}
                          size="sm"
                          variant="outline"
                          className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300 text-xs"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Limpiar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Zonas de drop mejoradas */}
                <Card
                  className={`bg-white/95 backdrop-blur-lg border-2 sm:border-4 border-blue-400 shadow-xl ${
                    animatedElements.has("zones") ? "animate-slide-build" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <CardContent className="p-3 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-base sm:text-lg font-bold text-blue-800 flex items-center justify-center gap-2">
                        <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
                        Grupos de {currentProblem?.multiplicand}
                      </h4>
                      <p className="text-xs sm:text-sm text-blue-600 mt-1 sm:mt-2">
                        Forma {currentProblem?.multiplier} grupos iguales
                      </p>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      {dropZones.map((zone) => (
                        <div
                          key={zone.id}
                          data-zone-drop={zone.id}
                          onClick={() => handleZoneTap(zone.id)}
                          className={`
                            w-full min-h-[60px] sm:min-h-[80px] rounded-lg sm:rounded-xl border-2 border-dashed p-2 sm:p-3 
                            transition-all duration-300 touch-manipulation relative overflow-hidden cursor-pointer
                            ${zone.isComplete 
                              ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-400 shadow-lg animate-character-happy' 
                              : hoveredZone === zone.id
                                ? 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-400 scale-105 shadow-xl animate-drop-zone-active'
                                : pulsingZones.has(zone.id)
                                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 animate-pulse-zone'
                                  : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 hover:border-blue-400 hover:scale-102'
                            }
                            ${selectedItemForMobile !== null && isTouchDevice && !zone.isComplete 
                              ? 'ring-2 ring-purple-400 ring-opacity-50 animate-pulse' : ''
                            }
                          `}
                          style={{
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none'
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs sm:text-sm font-bold text-blue-800">
                              Grupo {zone.id + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                {zone.placedItems.length}/{zone.expectedCount}
                              </span>
                              {selectedItemForMobile !== null && isTouchDevice && !zone.isComplete && (
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
                                  <Hand className="w-3 h-3 text-white" />
                                </div>
                              )}
                              {zone.isComplete && (
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 animate-pulse" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 justify-center">
                            {zone.placedItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFromZone(item.id)
                                }}
                                className={`
                                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg border-2 border-opacity-80 cursor-pointer
                                  bg-gradient-to-br ${currentElementType.color} 
                                  flex items-center justify-center text-sm sm:text-lg transition-all duration-300
                                  hover:scale-110 active:scale-95 touch-manipulation shadow-md hover:shadow-lg
                                  relative overflow-hidden animate-candy-bounce
                                `}
                                style={{ 
                                  touchAction: 'manipulation',
                                  userSelect: 'none',
                                  WebkitUserSelect: 'none',
                                  animationDelay: `${item.id * 0.05}s`
                                }}
                              >
                                {currentElementType.emoji}
                                
                                {/* Efecto de brillo */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transform -skew-x-12 hover:translate-x-full transition-all duration-500"></div>
                              </div>
                            ))}
                            
                            {/* Espacios vacíos con mejor diseño */}
                            {Array.from({ length: zone.expectedCount - zone.placedItems.length }).map((_, i) => (
                              <div
                                key={`empty-${i}`}
                                className={`
                                  w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md sm:rounded-lg border-2 border-dashed 
                                  ${selectedItemForMobile !== null && isTouchDevice
                                    ? 'border-purple-400 bg-purple-50 animate-pulse' 
                                    : 'border-gray-300 bg-gray-50'
                                  } 
                                  flex items-center justify-center text-gray-400 text-xs sm:text-sm
                                `}
                              >
                                <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                              </div>
                            ))}
                          </div>

                          {/* Efecto de completado */}
                          {zone.isComplete && (
                            <div className="absolute top-1 right-1">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Información del juego */}
              <Card
                className={`bg-gradient-to-r from-green-100 to-blue-100 border-2 sm:border-4 border-green-300 shadow-xl ${
                  animatedElements.has("hint") ? "animate-slide-build" : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-bold">¡Construye y Aprende!</span>
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-green-600">
                    {isTouchDevice 
                      ? "Toca un elemento para seleccionarlo, luego toca un grupo para colocarlo, o arrastra directamente"
                      : "Arrastra los elementos para formar grupos iguales y descubrir la multiplicación"
                    }
                  </p>
                  
                  {/* Indicadores de estado */}
                  <div className="flex justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                      <div className="w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                      <span>Seleccionado</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                      <span>Completado</span>
                    </div>
                  </div>
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