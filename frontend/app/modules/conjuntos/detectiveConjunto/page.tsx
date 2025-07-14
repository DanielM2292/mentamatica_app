"use client";
import GameHeader from '@/components/molecules/GameHeader';
import InformacionNivel from '@/components/molecules/InformacionNivel';
import JuegoCompletado from '@/components/organisms/JuegoCompletado';
import NivelCompletado from '@/components/organisms/NivelCompletado';
import { useGameDetective } from '@/hooks/conjuntos/useGameDetective';
import GamesTemplate from '@/components/templates/conjuntos/GamesTemplate';
import TiempoJuego from '@/components/molecules/TiempoJuego';
import { TimerProvider } from "@/context/timer-context"
import AreaJuegoDetective from '@/components/organisms/AreaJuegoDetective';

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
  } = useGameDetective();

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4">
        <GameHeader
          aciertos={aciertos}
          errores={errores}
          completedSets={completedSets.length}
          imagen="/images/icons/conjuntos.png"
          name='Detective del Elemento Perdido'
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
          <AreaJuegoDetective
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