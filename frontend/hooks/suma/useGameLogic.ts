"use client";

import { useState, useEffect, useCallback } from 'react';

export interface GameState {
  currentPosition: number;
  isCorrect: boolean | null;
  level: number;
  correctAnswers: number;
  errors: number;
  totalQuestions: number;
  number1: number;
  number2: number;
  result: number;
  options: number[];
  selectedAnswer: number | null;
  showResult: boolean;
  gameCompleted: boolean;
}

const QUESTIONS_PER_LEVEL = 5;

export const useGameLogic = () => {
  const initialState: GameState = {
    currentPosition: 0,
    isCorrect: null,
    level: 1,
    correctAnswers: 0,
    errors: 0,
    totalQuestions: QUESTIONS_PER_LEVEL,
    number1: 0,
    number2: 0,
    result: 0,
    options: [],
    selectedAnswer: null,
    showResult: false,
    gameCompleted: false
  };

  const [gameState, setGameState] = useState<GameState>(initialState);

  const generateRandomNumber = useCallback((min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  const generateQuestion = useCallback(() => {
    let num1: number, num2: number;

    switch (gameState.level) {
      case 1:
        num1 = generateRandomNumber(1, 9);
        num2 = generateRandomNumber(1, 9);
        break;
      case 2:
        num1 = generateRandomNumber(10, 99);
        num2 = generateRandomNumber(10, 99);
        break;
      case 3:
        num1 = generateRandomNumber(1, 99);
        num2 = generateRandomNumber(1, 99);
        break;
      default:
        num1 = generateRandomNumber(1, 9);
        num2 = generateRandomNumber(1, 9);
    }

    const result = num1 + num2;
    const wrongAnswers: number[] = [];

    while (wrongAnswers.length < 2) {
      const wrongAnswer = result + generateRandomNumber(-20, 20);
      if (wrongAnswer !== result && wrongAnswer > 0 && !wrongAnswers.includes(wrongAnswer)) {
        wrongAnswers.push(wrongAnswer);
      }
    }

    const options = [result, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setGameState(prev => ({
      ...prev,
      number1: num1,
      number2: num2,
      result,
      options,
      selectedAnswer: null,
      showResult: false
    }));
  }, [gameState.level, generateRandomNumber]);

  const handleAnswer = useCallback((answer: number) => {
    if (gameState.showResult) return;

    const isCorrect = answer === gameState.result;

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true,
      isCorrect,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      errors: isCorrect ? prev.errors : prev.errors + 1,
      currentPosition: prev.currentPosition + 1
    }));

    setTimeout(() => {
      if (isCorrect && gameState.correctAnswers + 1 >= QUESTIONS_PER_LEVEL) {
        if (gameState.level < 3) {
          setGameState(prev => ({
            ...prev,
            level: prev.level + 1,
            correctAnswers: 0,
            currentPosition: 0,
            totalQuestions: QUESTIONS_PER_LEVEL
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            gameCompleted: true
          }));
        }
      } else {
        generateQuestion();
      }
    }, 2000);
  }, [gameState.result, gameState.showResult, gameState.correctAnswers, gameState.level, generateQuestion]);

  const resetGame = useCallback(() => {
    setGameState(initialState);
    generateQuestion();
  }, [initialState, generateQuestion]);

  useEffect(() => {
    generateQuestion();
  }, [gameState.level]);

  useEffect(() => {
    if (gameState.level === 1 && gameState.number1 === 0) {
      generateQuestion();
    }
  }, []);

  return {
    gameState,
    handleAnswer,
    resetGame
  };
};
