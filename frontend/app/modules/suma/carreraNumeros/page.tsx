"use client";
import React from 'react';
import { GameBoard2 } from '@/components/organisms/GameBoard2';
import { useCarreraNumeros } from '@/hooks/suma/useCarreraNumeros';
import { TimerProvider } from "@/context/timer-context";
import JuegoCompletado from '@/components/organisms/JuegoCompletado';
import GameHeader from '@/components/molecules/GameHeader';
import TiempoJuego from '@/components/molecules/TiempoJuego';
import InformacionNivel from '@/components/molecules/InformacionNivel';
import NivelCompletado from '@/components/organisms/NivelCompletado';
import GamesTemplate from '@/components/templates/suma/GamesTemplate';

const Page = () => (
  <TimerProvider>
    <GameWrapper />
  </TimerProvider>
);

const GameWrapper = () => {
  const { gameState, handleAnswerChange, levelUpPending, isLastLevel, handleNextLevel, handleValidate, estrellas, resetGame } = useCarreraNumeros();

  return (
    <GamesTemplate>
      <div className="max-w-6xl mx-auto pt-4">
        <GameHeader
          nav="/modules/suma"
          aciertos={gameState.correctAnswers}
          errores={gameState.errors}
          completedSets={gameState.currentPosition}
          imagen="/images/icons/suma.png"
          name="Carrera de Numeros"
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
            isLastLevel={isLastLevel}
            onNextLevel={handleNextLevel}
          />
        ) : (
          <GameBoard2
            number1={gameState.number1}
            number2={gameState.number2}
            result={gameState.result}
            level={gameState.level}
            userAnswer={gameState.userAnswer}
            isCorrect={gameState.isCorrect}
            showResult={gameState.showResult}
            currentPosition={gameState.currentPosition}
            onAnswerChange={handleAnswerChange}
            onValidate={handleValidate}
          />
        )}
      </div>
    </GamesTemplate>
  );
};

export default Page;