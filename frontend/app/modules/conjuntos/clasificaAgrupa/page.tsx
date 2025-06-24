"use client";
import GameHeader from '@/components/molecules/GameHeader';
import InformacionNivel from '@/components/molecules/InformacionNivel';
import JuegoCompletado from '@/components/organisms/JuegoCompletado';
import NivelCompletado from '@/components/organisms/NivelCompletado';
import AreaJuego from '@/components/organisms/AreaJuego';
import { useGameLogic } from '@/hooks/useGameLogic';
import GamesTemplate from '@/components/templates/conjuntos/GamesTemplate';

const Page = () => {
  const {
    currentLevel,
    items,
    score,
    completedSets,
    totalScore,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    handleDragStart,
    handleDrop,
    handleNextLevel,
    handleRestart
  } = useGameLogic();

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4">
        <GameHeader
          score={score}
          completedSets={completedSets.length}
          totalSets={currentGameLevel.sets.length}
          level={currentLevel + 1}
          totalScore={totalScore + score}
        />

        <InformacionNivel
          currentLevel={currentLevel}
          gameLevel={currentGameLevel}
        />

        {isGameComplete ? (
          <JuegoCompletado
            totalScore={totalScore}
            score={score}
            onRestart={handleRestart}
          />
        ) : isLevelComplete ? (
          <NivelCompletado
            score={score}
            isLastLevel={isLastLevel}
            onNextLevel={handleNextLevel}
          />
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