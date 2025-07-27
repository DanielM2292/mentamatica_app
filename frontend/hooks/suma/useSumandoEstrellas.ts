"use client";

import { useState, useEffect, useCallback } from "react";
import { useTimer } from "@/context/timer-context";
import { useUser } from "@clerk/nextjs";
import { convertirErrores } from "@/services/convertidorEstrellas";
import { useEnviarResultados } from "../useEnviarResultados";

export interface SumandoEstrellas {
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
  options: number[];
  selectedAnswer: number | null;
  showResult: boolean;
  gameCompleted: boolean;
}

const QUESTIONS_PER_LEVEL = 5;
const MAX_LEVEL = 3;

export const useSumandoEstrellas = () => {
  const initialState: SumandoEstrellas = {
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
    options: [],
    selectedAnswer: null,
    showResult: false,
    gameCompleted: false,
  };

  const [gameState, setGameState] = useState<SumandoEstrellas>(initialState);
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
    const wrongAnswers: number[] = [];

    while (wrongAnswers.length < 2) {
      const candidate = result + generateRandomNumber(-20, 20);
      if (
        candidate !== result &&
        candidate > 0 &&
        !wrongAnswers.includes(candidate)
      ) {
        wrongAnswers.push(candidate);
      }
    }

    const options = [result, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setGameState((prev) => ({
      ...prev,
      number1: num1,
      number2: num2,
      result,
      options,
      selectedAnswer: null,
      showResult: false,
    }));
  }, [gameState.level, generateRandomNumber]);

  const handleAnswer = useCallback(
    (answer: number) => {
      if (gameState.showResult || gameState.gameCompleted) return;

      const isCorrect = answer === gameState.result;
      const newCorrectAnswers = isCorrect
        ? gameState.levelCorrectAnswers + 1
        : gameState.levelCorrectAnswers;

      setGameState((prev) => ({
        ...prev,
        selectedAnswer: answer,
        showResult: true,
        isCorrect,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        levelCorrectAnswers: newCorrectAnswers,
        errors: isCorrect ? prev.errors : prev.errors + 1,
        currentPosition: prev.currentPosition + 1,
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
        } else {
          generateQuestion();
        }
      }, 2000);
    },
    [
      gameState.showResult,
      gameState.result,
      gameState.levelCorrectAnswers,
      gameState.gameCompleted,
      isLastLevel,
      generateQuestion,
    ]
  );

  const handleNextLevel = () => {
    if (isLastLevel) {
      setGameState((prev) => ({
        ...prev,
        gameCompleted: true,
      }));
    } else {
      setGameState((prev) => ({
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
    handleAnswer,
    handleNextLevel,
    resetGame,
  };
};