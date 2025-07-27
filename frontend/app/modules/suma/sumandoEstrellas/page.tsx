"use client";

import React from 'react';
import { GameBoard } from '@/components/organisms/GameBoard';
import GamesTemplate from '@/components/templates/suma/GamesTemplate';
import { useSumandoEstrellas } from '@/hooks/suma/useSumandoEstrellas';
import { TimerProvider } from "@/context/timer-context";
import JuegoCompletado from '@/components/organisms/JuegoCompletado';
import GameHeader from '@/components/molecules/GameHeader';
import TiempoJuego from '@/components/molecules/TiempoJuego';
import InformacionNivel from '@/components/molecules/InformacionNivel';
import NivelCompletado from '@/components/organisms/NivelCompletado';

const Page = () => (
  <TimerProvider>
    <GameWrapper />
  </TimerProvider>
);

const GameWrapper = () => {
  const { gameState, handleAnswer, levelUpPending, isLastLevel, handleNextLevel, resetGame, estrellas } = useSumandoEstrellas();

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4">
        <GameHeader
          nav="/modules/suma"
          aciertos={gameState.correctAnswers}
          errores={gameState.errors}
          completedSets={gameState.currentPosition}
          imagen="/images/icons/suma.png"
          name="Sumando Estrellas"
          totalSets={gameState.totalQuestions}
          level={gameState.level}
          totalAciertos={gameState.correctAnswers}
        />

        <TiempoJuego position="top-right" formato="minutos" />
        <InformacionNivel currentLevel={gameState.level} gameLevel={gameState.level as any} />

        {gameState.gameCompleted ? (
          <JuegoCompletado aciertos={gameState.correctAnswers} estrellas={estrellas} onRestart={resetGame} />
        ) : levelUpPending ? (
          <NivelCompletado
              aciertos={gameState.correctAnswers}
              nivel={gameState.level + 1}
              isLastLevel={isLastLevel}
              onNextLevel={handleNextLevel}
              onRestart={resetGame}
            />
        ) : (
          <GameBoard
            number1={gameState.number1}
            number2={gameState.number2}
            result={gameState.result}
            options={gameState.options}
            level={gameState.level}
            correctAnswers={gameState.correctAnswers}
            errors={gameState.errors}
            totalQuestions={gameState.totalQuestions}
            onAnswer={handleAnswer}
            selectedAnswer={gameState.selectedAnswer}
            showResult={gameState.showResult}
          />
        )}
      </div>
    </GamesTemplate>
  );
};

export default Page;
