"use client";
import React from 'react';
import { SumDisplay } from '../molecules/SumDisplay';
import { InputAnswer } from '../atoms/InputAnswer';
import { ValidateButton } from '../atoms/ValidateButton';
import { ProgressTrack } from '../molecules/ProgressTrack';

interface GameBoard2Props {
  number1: number;
  number2: number;
  result: number;
  level: number;  
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
  userAnswer,
  isCorrect,
  showResult,
  currentPosition,
  onAnswerChange,
  onValidate
}) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-200 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-10">

        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-700 mb-2 animate-bounce">
            ¡Escribe la Respuesta! ✏️
          </h1>
          <p className="text-base md:text-lg text-teal-600">
            Digita el resultado de la suma
          </p>
        </div>

        <div className="flex justify-center">
          <SumDisplay
            number1={number1}
            number2={number2}
            result={result}
          />
        </div>

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

        <div className="flex justify-center">
          <ProgressTrack
            currentPosition={currentPosition}
            level={level}
          />
        </div>

      </div>
    </div>
  );
};