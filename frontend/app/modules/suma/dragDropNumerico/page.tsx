"use client"

import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import { useDragDropNumero } from "@/hooks/suma/useDragDropNumero"
import GamesTemplate from "@/components/templates/conjuntos/GamesTemplate"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, CheckCircle, Sparkles, Trophy, Plus } from "lucide-react"
import { useState, useRef } from "react"

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
    currentNumberIndex,
    digitCards,
    dropSlots,
    currentTargetNumber,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    gameContainerRef,
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,
    checkNumber,
  } = useDragDropNumero()

  const [draggedOver, setDraggedOver] = useState<string | null>(null)
  const [selectedDigit, setSelectedDigit] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedDigit, setDraggedDigit] = useState<any>(null)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 })
  const dragElementRef = useRef<HTMLDivElement>(null)

  const isNumberComplete = dropSlots.every((slot) => slot.number !== null)
  const isNumberCorrect = checkNumber()

  if (!currentTargetNumber) {
    return (
      <GamesTemplate>
        <div className="max-w-6xl mx-auto pt-4 relative z-10">
          <GameHeader
            nav="/modules/suma"
            aciertos={aciertos}
            errores={errores}
            completedSets={completedSets.length}
            imagen="/images/icons/suma.png"
            name="Drag & Drop Numérico"
            totalSets={currentGameLevel?.problemsPerLevel || 1}
            level={currentLevel + 1}
            totalAciertos={totalAciertos + aciertos}
          />
          <div className="mt-8 flex items-center justify-center">
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-green-300 shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
                  <h3 className="text-lg font-semibold text-gray-700">Cargando juego...</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GamesTemplate>
    )
  }

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4 relative z-10">
        <GameHeader
          nav="/modules/suma"
          aciertos={aciertos}
          errores={errores}
          completedSets={completedSets.length}
          imagen="/images/icons/suma.png"
          name="Drag & Drop Numérico"
          totalSets={currentGameLevel?.problemsPerLevel || 1}
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
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6" ref={gameContainerRef}>
            {/* Problem Display */}
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-green-300 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Resuelve la Suma
                    </h2>
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>

                  <div className="text-4xl sm:text-6xl font-bold text-green-600">
                    {currentTargetNumber.firstNumber} + {currentTargetNumber.secondNumber} = ?
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">{currentGameLevel?.description}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {currentNumberIndex + 1} de {currentGameLevel?.problemsPerLevel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Drop Zone Area */}
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-emerald-300 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Arrastra la respuesta correcta
                  </h3>
                </div>

                <div className="flex justify-center mb-6 sm:mb-8">
                  {dropSlots.map((slot) => (
                    <div key={slot.position} className="text-center">
                      <div className="text-xs font-bold text-gray-700 mb-1">
                        {slot.label}
                      </div>
                      <div
                        data-slot-position={slot.position}
                        className="w-20 h-24 sm:w-28 sm:h-32 border-3 border-dashed rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold cursor-pointer"
                        onDragOver={(e) => {
                          e.preventDefault()
                          setDraggedOver(`slot-${slot.position}`)
                        }}
                        onDragLeave={() => setDraggedOver(null)}
                        onDrop={(e) => {
                          e.preventDefault()
                          setDraggedOver(null)
                          handleDrop(slot.position)
                        }}
                      >
                        {slot.number !== null ? slot.number : "?"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  <Button
                    onClick={clearNumber}
                    className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="ml-2">Limpiar</span>
                  </Button>

                  <Button
                    onClick={submitNumber}
                    disabled={!isNumberComplete}
                    className={`${!isNumberComplete
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : isNumberCorrect
                        ? "bg-gradient-to-r from-green-400 to-emerald-400"
                        : "bg-gradient-to-r from-amber-400 to-orange-400"
                      }`}
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="ml-2">
                      {!isNumberComplete ? "Completa la respuesta" : "Verificar"}
                    </span>
                  </Button>
                </div>

                {isNumberComplete && (
                  <div className="text-center mt-6">
                    <Badge
                      variant={isNumberCorrect ? "default" : "destructive"}
                      className="text-sm sm:text-base px-4 py-2 font-bold"
                    >
                      {isNumberCorrect ? "¡Correcto!" : "Inténtalo de nuevo"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Available Numbers */}
            <Card className="bg-white/95 backdrop-blur-lg border-2 border-teal-300 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    Números Disponibles
                  </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {digitCards
                    .filter((card) => !card.isUsed)
                    .map((card) => (
                      <div
                        key={card.id}
                        draggable={!card.isUsed}
                        onDragStart={() => handleDragStart(card)}
                        className="w-14 h-18 sm:w-20 sm:h-24 rounded-2xl shadow-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        {card.number}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </GamesTemplate>
  )
}

export default Page