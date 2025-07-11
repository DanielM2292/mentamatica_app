"use client";
import React from 'react';
import { SumDisplay } from '../molecules/SumDisplay';
import { InputAnswer } from '../atoms/InputAnswer';
import { ValidateButton } from '../atoms/ValidateButton';
import { ProgressTrack } from '../molecules/ProgressTrack';
import { GameStats } from '../molecules/GameStats';

interface GameBoard2Props {
  number1: number;
  number2: number;
  result: number;
  level: number;
  errors: number;
  userAnswer: string;
  isCorrect: boolean | null;
  showResult: boolean;
  currentPosition: number;
  onAnswerChange: (answer: string) => void;
  onValidate: () => void;
}

export const GameBoard2: React.FC<GameBoard2Props> = ({
  number1,
  number2,
  result,
  level,
  errors,
  userAnswer,
  isCorrect,
  showResult,
  currentPosition,
  onAnswerChange,
  onValidate
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <GameStats 
          level={level}
          correctAnswers={currentPosition}
          errors={errors}
          totalQuestions={5}
        />
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-700 mb-2 animate-bounce">
            ¡Escribe la Respuesta! ✏️
          </h1>
          <p className="text-lg text-teal-600">
            Digita el resultado de la suma
          </p>
        </div>

        <SumDisplay 
          number1={number1}
          number2={number2}
          result={result}
        />

        <div className="space-y-6">
          <InputAnswer
            value={userAnswer}
            onChange={onAnswerChange}
            isCorrect={isCorrect}
            disabled={showResult}
          />

          <div className="flex justify-center">
            <ValidateButton
              onClick={onValidate}
              disabled={showResult || userAnswer.trim() === ''}
              isCorrect={isCorrect}
            />
          </div>
        </div>

        <ProgressTrack 
          currentPosition={currentPosition}
          level={level}
        />
      </div>
    </div>
  );
};