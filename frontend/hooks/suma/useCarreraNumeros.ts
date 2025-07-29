"use client";
import { useState, useEffect, useCallback } from 'react';
import { useTimer } from "@/context/timer-context";
import { useUser } from "@clerk/nextjs";
import { convertirErrores } from "@/services/convertidorEstrellas";
import { useEnviarResultados } from "../useEnviarResultados";

export interface CarreraNumeros {
  currentPosition: number;
  isCorrect: boolean | null;
  level: number;
  correctAnswers: number;
  levelCorrectAnswers: number;
  errors: number;
  totalQuestions: number;
  number1: number;
  number2: number;
  result: number;
  userAnswer: string;
  showResult: boolean;
  gameCompleted: boolean;
}

const QUESTIONS_PER_LEVEL = 5;
const MAX_LEVEL = 3;

export const useCarreraNumeros = () => {
  const initialState: CarreraNumeros = {
    currentPosition: 0,
    isCorrect: null,
    level: 1,
    correctAnswers: 0,
    levelCorrectAnswers: 0,
    errors: 0,
    totalQuestions: QUESTIONS_PER_LEVEL,
    number1: 0,
    number2: 0,
    result: 0,
    userAnswer: '',
    showResult: false,
    gameCompleted: false,
  };

  const [gameState, setGameState] = useState<CarreraNumeros>(initialState);
  const [levelUpPending, setLevelUpPending] = useState(false);
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null);
  const { iniciar, detener, reiniciar, tiempo } = useTimer();
  const { user } = useUser();

  const isLastLevel = gameState.level >= MAX_LEVEL;

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
        num1 = generateRandomNumber(10, 20);
        num2 = generateRandomNumber(10, 20);
        break;
      case 3:
        num1 = generateRandomNumber(1, 30);
        num2 = generateRandomNumber(1, 30);
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
    const newCorrectAnswers = isCorrect
      ? gameState.levelCorrectAnswers + 1
      : gameState.levelCorrectAnswers;

    setGameState(prev => ({
      ...prev,
      isCorrect,
      showResult: true,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      levelCorrectAnswers: newCorrectAnswers,
      errors: isCorrect ? prev.errors : prev.errors + 1,
      currentPosition: isCorrect ? prev.currentPosition + 1 : prev.currentPosition
    }));

    setTimeout(() => {
      if (isCorrect && newCorrectAnswers >= QUESTIONS_PER_LEVEL) {
        if (isLastLevel) {
          setGameState(prev => ({
            ...prev,
            gameCompleted: true
          }));
        } else {
          setLevelUpPending(true);
        }
      } else if (isCorrect) {
        generateQuestion();
      } else {
        setGameState(prev => ({
          ...prev,
          userAnswer: '',
          isCorrect: null,
          showResult: false
        }));
      }
    }, 2000);
  }, [
    gameState.showResult,
    gameState.userAnswer,
    gameState.result,
    gameState.levelCorrectAnswers,
    isLastLevel,
    generateQuestion
  ]);

  const handleNextLevel = () => {
    if (isLastLevel) {
      setGameState(prev => ({
        ...prev,
        gameCompleted: true,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        levelCorrectAnswers: 0,
        currentPosition: 0,
        totalQuestions: QUESTIONS_PER_LEVEL,
      }));
      setLevelUpPending(false);
      generateQuestion();
    }
  };

  const resetGame = useCallback(() => {
    setGameState(initialState);
    reiniciar();
    setTiempoFinal(null);
    setLevelUpPending(false);
    iniciar();
    generateQuestion();
  }, [generateQuestion, reiniciar, iniciar]);

  useEffect(() => {
    iniciar();
    generateQuestion();
    return () => {
      detener();
    };
  }, []);

  useEffect(() => {
    if (gameState.gameCompleted) {
      detener();
      setTiempoFinal(tiempo);
    }
  }, [gameState.gameCompleted, detener, tiempo]);

  const estrellas = convertirErrores(gameState.errors);

  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos: gameState.correctAnswers,
    errores: gameState.errors,
    estrellas,
    tiempo,
    isGameComplete: gameState.gameCompleted,
    tiempoFinal,
    detener,
    setTiempoFinal,
  });

  return {
    estrellas,
    gameState,
    levelUpPending,
    isLastLevel,
    handleAnswerChange,
    handleValidate,
    handleNextLevel,
    resetGame,
  };
};