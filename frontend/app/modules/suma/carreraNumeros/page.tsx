"use client";
import React from 'react';
import { GameBoard2 } from '@/components/organisms/GameBoard2';
import { useGameLogic2 } from '@/hooks/suma/useGameLogic2';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy } from 'lucide-react';

const Index = () => {
  const { gameState, handleAnswerChange, handleValidate, resetGame } = useGameLogic2();

  if (gameState.gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl p-8 shadow-2xl animate-scale-in">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            ¡Felicitaciones! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Has completado todos los niveles
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Total de errores: {gameState.errors}
          </p>
          <Button 
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-bold"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Jugar de Nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <GameBoard2
      number1={gameState.number1}
      number2={gameState.number2}
      result={gameState.result}
      level={gameState.level}
      errors={gameState.errors}
      userAnswer={gameState.userAnswer}
      isCorrect={gameState.isCorrect}
      showResult={gameState.showResult}
      currentPosition={gameState.currentPosition}
      onAnswerChange={handleAnswerChange}
      onValidate={handleValidate}
    />
  );
};

export default Index;