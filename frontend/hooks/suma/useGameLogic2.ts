"use client";
import { useState, useEffect, useCallback } from 'react';

export interface GameState2 {
  level: number;
  currentQuestion: number;
  errors: number;
  number1: number;
  number2: number;
  result: number;
  userAnswer: string;
  isCorrect: boolean | null;
  showResult: boolean;
  gameCompleted: boolean;
  currentPosition: number; // posición en la pista (0-5)
}

const QUESTIONS_PER_LEVEL = 5;

export const useGameLogic2 = () => {
  const [gameState, setGameState] = useState<GameState2>({
    level: 1,
    currentQuestion: 0,
    errors: 0,
    number1: 0,
    number2: 0,
    result: 0,
    userAnswer: '',
    isCorrect: null,
    showResult: false,
    gameCompleted: false,
    currentPosition: 0
  });

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

    setGameState(prev => ({
      ...prev,
      number1: num1,
      number2: num2,
      result,
      userAnswer: '',
      isCorrect: null,
      showResult: false
    }));
  }, [gameState.level, generateRandomNumber]);

  const handleAnswerChange = useCallback((answer: string) => {
    setGameState(prev => ({
      ...prev,
      userAnswer: answer,
      isCorrect: null,
      showResult: false
    }));
  }, []);

  const handleValidate = useCallback(() => {
    if (gameState.showResult || gameState.userAnswer.trim() === '') return;

    const userNum = parseInt(gameState.userAnswer);
    const isCorrect = userNum === gameState.result;
    
    setGameState(prev => ({
      ...prev,
      isCorrect,
      showResult: true,
      errors: isCorrect ? prev.errors : prev.errors + 1,
      currentPosition: isCorrect ? prev.currentPosition + 1 : prev.currentPosition
    }));

    // Esperar 2 segundos antes de la siguiente pregunta o avanzar nivel
    setTimeout(() => {
      if (isCorrect && gameState.currentPosition + 1 >= QUESTIONS_PER_LEVEL) {
        // Avanzar al siguiente nivel
        if (gameState.level < 3) {
          setGameState(prev => ({
            ...prev,
            level: prev.level + 1,
            currentQuestion: 0,
            currentPosition: 0
          }));
        } else {
          // Juego completado
          setGameState(prev => ({
            ...prev,
            gameCompleted: true
          }));
        }
      } else if (isCorrect) {
        // Generar siguiente pregunta
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
        generateQuestion();
      } else {
        // Si es incorrecto, mantener la misma pregunta
        setGameState(prev => ({
          ...prev,
          userAnswer: '',
          isCorrect: null,
          showResult: false
        }));
      }
    }, 2000);
  }, [gameState.result, gameState.showResult, gameState.userAnswer, gameState.currentPosition, gameState.level, generateQuestion]);

  const resetGame = useCallback(() => {
    setGameState({
      level: 1,
      currentQuestion: 0,
      errors: 0,
      number1: 0,
      number2: 0,
      result: 0,
      userAnswer: '',
      isCorrect: null,
      showResult: false,
      gameCompleted: false,
      currentPosition: 0
    });
  }, []);

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
    handleAnswerChange,
    handleValidate,
    resetGame
  };
};