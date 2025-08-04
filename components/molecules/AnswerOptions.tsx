"use client";
import React from 'react';
import { StarButton } from '../atoms/StarButton';

interface AnswerOptionsProps {
  options: number[];
  correctAnswer: number;
  onAnswer: (answer: number) => void;
  selectedAnswer: number | null;
  showResult: boolean;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({ 
  options, 
  correctAnswer, 
  onAnswer, 
  selectedAnswer,
  showResult 
}) => {
  return (
    <div className="flex justify-center gap-8 p-6">
      {options.map((option, index) => (
        <StarButton
          key={index}
          number={option}
          isCorrect={option === correctAnswer}
          onClick={() => onAnswer(option)}
          isSelected={selectedAnswer === option && showResult}
          disabled={showResult}
        />
      ))}
    </div>
  );
};