"use client";
import GameHeader from '@/components/molecules/GameHeader';
import InformacionNivel from '@/components/molecules/InformacionNivel';
import JuegoCompletado from '@/components/organisms/JuegoCompletado';
import NivelCompletado from '@/components/organisms/NivelCompletado';
import AreaJuego from '@/components/organisms/AreaJuego';
import { useGameUnion } from '@/hooks/conjuntos/useGameUnion';
import GamesTemplate from '@/components/templates/conjuntos/GamesTemplate';
import TiempoJuego from '@/components/molecules/TiempoJuego';
import { TimerProvider } from "@/context/timer-context"

const Page = () => {
  return (
    <TimerProvider>
      <GameWrapper />
    </TimerProvider>
  );
};

const GameWrapper = () => {
  const {
    currentLevel,
    items,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    handleDragStart,
    handleDrop,
    handleNextLevel,
    handleRestart,
  } = useGameUnion();

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4">
        <GameHeader
          aciertos={aciertos}
          errores={errores}
          completedSets={completedSets.length}
          imagen="/images/icons/conjuntos.png"
          name='La Union y la Intersección'
          totalSets={currentGameLevel.sets.length}
          level={currentLevel + 1}
          totalAciertos={totalAciertos + aciertos}
        />

        <TiempoJuego position="top-right" formato="minutos" />
        <InformacionNivel currentLevel={currentLevel} gameLevel={currentGameLevel} />

        {isGameComplete ? (
          <JuegoCompletado aciertos={aciertos} estrellas={estrellas} onRestart={handleRestart} />
        ) : isLevelComplete ? (
          <NivelCompletado aciertos={aciertos} isLastLevel={isLastLevel} onNextLevel={handleNextLevel} />
        ) : (
          <AreaJuego
            items={items}
            currentGameLevel={currentGameLevel}
            completedSets={completedSets}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        )}
      </div>
    </GamesTemplate>
  );
};


export default Page;