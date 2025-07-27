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
    <div className="min-h-screen w-full rounded-xl flex items-center justify-center bg-gradient-to-br from-sky-200 via-purple-200 to-pink-200 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 md:p-10 space-y-8 animate-fade-in">

        {/* Encabezado */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2 animate-bounce">
            ¡Resuelve la Suma! ⭐
          </h1>
          <p className="text-base md:text-lg text-purple-600">
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