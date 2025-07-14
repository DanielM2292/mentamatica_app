import React from 'react';
import { SumDisplay } from '../molecules/SumDisplay';
import { AnswerOptions } from '../molecules/AnswerOptions';
import { GameStats } from '../molecules/GameStats';

interface GameBoardProps {
  number1: number;
  number2: number;
  result: number;
  options: number[];
  level: number;
  correctAnswers: number;
  errors: number;
  totalQuestions: number;
  onAnswer: (answer: number) => void;
  selectedAnswer: number | null;
  showResult: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  number1,
  number2,
  result,
  options,
  level,
  correctAnswers,
  errors,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  showResult
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-pink-200 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <GameStats 
          level={level}
          correctAnswers={correctAnswers}
          errors={errors}
          totalQuestions={totalQuestions}
        />
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-700 mb-2 animate-bounce">
            ¡Resuelve la Suma! ⭐
          </h1>
          <p className="text-lg text-purple-600">
            Elige la estrella con la respuesta correcta
          </p>
        </div>

        <SumDisplay 
          number1={number1}
          number2={number2}
          result={result}
        />

        <AnswerOptions
          options={options}
          correctAnswer={result}
          onAnswer={onAnswer}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
        />
      </div>
    </div>
  );
};