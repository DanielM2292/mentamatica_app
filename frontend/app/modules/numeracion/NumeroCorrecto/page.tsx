"use client"
import GameHeader from "@/components/molecules/GameHeader"
import InformacionNivel from "@/components/molecules/InformacionNivel"
import JuegoCompletado from "@/components/organisms/JuegoCompletado"
import NivelCompletado from "@/components/organisms/NivelCompletado"
import AreaJuegoGlobos from "@/components/organisms/AreaJuegoGlobos"
import { useNumeroCorrect } from "@/hooks/useNumeroCorrect"
import TiempoJuego from "@/components/molecules/TiempoJuego"
import { TimerProvider } from "@/context/timer-context"
import { Sparkles } from "lucide-react"

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
    balloons,
    nextExpectedNumber,
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
    gameContainerRef,
    popBalloon,
    handleNextLevel,
    handleRestart,
  } = useNumeroCorrect()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Contenido Principal */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <GameHeader
          aciertos={aciertos}
          errores={errores}
          completedSets={completedSets.length}
          totalSets={currentGameLevel?.sets?.length || 1}
          level={currentLevel + 1}
          totalAciertos={totalAciertos + aciertos}
        />

        <TiempoJuego position="top-right" formato="minutos" />
        <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel} />

        {/* Área de Juego con altura fija para evitar interferencia con footer */}
        <div className="pb-20">
          {" "}
          {/* Espacio para el footer */}
          {isGameComplete ? (
            <JuegoCompletado aciertos={aciertos} estrellas={estrellas} onRestart={handleRestart} />
          ) : isLevelComplete ? (
            <NivelCompletado aciertos={aciertos} isLastLevel={isLastLevel} onNextLevel={handleNextLevel} />
          ) : (
            <AreaJuegoGlobos
              balloons={balloons}
              nextExpectedNumber={nextExpectedNumber}
              isGameActive={isGameActive}
              onBalloonPop={popBalloon}
              gameContainerRef={gameContainerRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
