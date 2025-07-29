"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';
import { v4 as uuidv4 } from 'uuid';

const sumaLevels = [
  {
    name: "Nivel 1",
    title: "Sumas hasta 10",
    description: "Realiza estas sumas básicas",
    maxSum: 10,
    problemsPerLevel: 1,
  },
  {
    name: "Nivel 2",
    title: "Sumas hasta 20",
    description: "Realiza las sumas hasta el 20",
    maxSum: 20,
    problemsPerLevel: 1,
  },
  {
    name: "Nivel 3",
    title: "Sumas hasta 50",
    description: "Realiza las sumas hasta el 50",
    maxSum: 50,
    problemsPerLevel: 1,
  },
]

const generateSumProblem = (maxSum: number) => {
  const result = Math.floor(Math.random() * maxSum) + 1
  const firstNumber = Math.floor(Math.random() * result) + 1
  const secondNumber = result - firstNumber

  return {
    firstNumber,
    secondNumber,
    result,
    equation: `${firstNumber} + ${secondNumber} = ?`
  }
}

const generateAnswerOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>()
  options.add(correctAnswer)

  while (options.size < 8) {
    const wrongAnswer = Math.max(1, correctAnswer + Math.floor(Math.random() * 10) - 5)
    if (wrongAnswer !== correctAnswer) {
      options.add(wrongAnswer)
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5)
}

interface AnswerCard {
  id: string
  number: number
  isUsed: boolean
  isCorrect?: boolean
}

interface DropSlot {
  position: number
  number: number | null
  label: string
  acceptedNumber: number
}

const generateAnswerCards = (correctAnswer: number): AnswerCard[] => {
  const answerOptions = generateAnswerOptions(correctAnswer)

  return answerOptions.map((number) => ({
    id: `answer-${number}-${uuidv4()}`,
    number,
    isUsed: false,
    isCorrect: number === correctAnswer
  }))
}

export const useDragDropNumero = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const { iniciar, detener, reiniciar, tiempo } = useTimer();

  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [answerCards, setAnswerCards] = useState<AnswerCard[]>([]);
  const [dropSlots, setDropSlots] = useState<DropSlot[]>([]);
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [completedSets, setCompletedSets] = useState<any[]>([]);
  const [totalAciertos, setTotalAciertos] = useState(0);
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null);
  const [problems, setProblems] = useState<any[]>([]);

  const gameContainerRef = useRef<HTMLDivElement>(null);
  const draggedItem = useRef<AnswerCard | null>(null);
  const hasInitialized = useRef(false);
  const currentLevelRef = useRef(currentLevel);
  const currentNumberIndexRef = useRef(currentNumberIndex);

  // Update refs when state changes
  useEffect(() => {
    currentLevelRef.current = currentLevel;
  }, [currentLevel]);

  useEffect(() => {
    currentNumberIndexRef.current = currentNumberIndex;
  }, [currentNumberIndex]);

  const currentGameLevel = sumaLevels[currentLevel];
  const currentTargetNumber = problems[currentNumberIndex] || null;
  const isLastLevel = currentLevel >= sumaLevels.length - 1;
  const estrellas = convertirErrores(errores);

  useEffect(() => {
    iniciar();
  }, [])
  // Initialize game - solo ejecuta una vez al montar
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      const initialProblems = Array.from({ length: currentGameLevel.problemsPerLevel }, () => 
        generateSumProblem(currentGameLevel.maxSum)
      );
      
      setProblems(initialProblems);
    }
  }, []);

  // Setup problem when problems are ready or index changes
  useEffect(() => {
    if (problems.length > 0 && currentNumberIndex < problems.length && !isLevelComplete && !isGameComplete) {
      const targetNumber = problems[currentNumberIndex];
      if (targetNumber) {
        const newAnswerCards = generateAnswerCards(targetNumber.result);
        const newDropSlots = [{
          position: 0,
          number: null,
          label: 'Respuesta',
          acceptedNumber: targetNumber.result,
        }];

        setAnswerCards(newAnswerCards);
        setDropSlots(newDropSlots);
      }
    }
  }, [problems, currentNumberIndex, isLevelComplete, isGameComplete]);

  // Handle drag start
  const handleDragStart = useCallback((answerCard: AnswerCard) => {
    if (answerCard.isUsed) return;
    draggedItem.current = answerCard;
  }, []);

  // Handle drop
  const handleDrop = useCallback((slotPosition: number) => {
    if (!draggedItem.current) return;

    const draggedAnswer = draggedItem.current;

    setDropSlots((prev) => {
      const newSlots = [...prev];
      const targetSlot = newSlots.find((slot) => slot.position === slotPosition);

      if (!targetSlot) return prev;

      if (targetSlot.number !== null) {
        setAnswerCards((prevCards) =>
          prevCards.map((card) =>
            card.number === targetSlot.number ? { ...card, isUsed: false } : card
          )
        );
      }

      targetSlot.number = draggedAnswer.number;
      return newSlots;
    });

    setAnswerCards((prev) =>
      prev.map((card) => (card.id === draggedAnswer.id ? { ...card, isUsed: true } : card))
    );

    draggedItem.current = null;
  }, []);

  // Check if answer is correct
  const checkNumber = useCallback(() => {
    if (!currentTargetNumber || dropSlots.length === 0) return false;
    return dropSlots[0].number === currentTargetNumber.result;
  }, [dropSlots, currentTargetNumber]);

  // Submit current answer
  const submitNumber = useCallback(() => {
    const isCorrect = checkNumber();

    if (isCorrect) {
      const newAciertos = aciertos + 1;
      setAciertos(newAciertos);
      toast({
        title: "¡Excelente!",
        description: `¡Correcto! ${currentTargetNumber.firstNumber} + ${currentTargetNumber.secondNumber} = ${currentTargetNumber.result}`,
        duration: 2000,
      });

      if (currentNumberIndex < currentGameLevel.problemsPerLevel - 1) {
        setTimeout(() => setCurrentNumberIndex((prev) => prev + 1), 1500);
      } else {
        const finalAciertos = totalAciertos + newAciertos;
        setTotalAciertos(finalAciertos);
        setTimeout(() => {
          setIsLevelComplete(true);
          setCompletedSets([{ id: currentLevel }]);
          if (isLastLevel) {
            detener();
            setIsGameComplete(true);
            setTiempoFinal(tiempo);
          }
        }, 1500);
      }
    } else {
      setErrores((prev) => prev + 1);
      toast({
        title: "¡Inténtalo de nuevo!",
        description: "La respuesta no es correcta",
        variant: "destructive",
        duration: 2000,
      });
    }
  }, [checkNumber, currentTargetNumber, currentNumberIndex, currentGameLevel, currentLevel, isLastLevel, tiempo, detener, aciertos, totalAciertos, toast]);

  // Clear current answer
  const clearNumber = useCallback(() => {
    setDropSlots((prev) => prev.map((slot) => ({ ...slot, number: null })));
    setAnswerCards((prev) => prev.map((card) => ({ ...card, isUsed: false })));
  }, []);

  // Handle next level
  const handleNextLevel = useCallback(() => {
    if (currentLevel < sumaLevels.length - 1) {
      const nextLevel = currentLevel + 1;
      const nextGameLevel = sumaLevels[nextLevel];
      
      // Update states
      setTotalAciertos((prev) => prev + aciertos);
      setCurrentLevel(nextLevel);
      setCurrentNumberIndex(0);
      setIsLevelComplete(false);
      
      // Generate new problems for next level
      const newProblems = Array.from({ length: nextGameLevel.problemsPerLevel }, () => 
        generateSumProblem(nextGameLevel.maxSum)
      );
      setProblems(newProblems);
    }
  }, [currentLevel, aciertos]);

  // Handle restart
  const handleRestart = useCallback(() => {
    const initialGameLevel = sumaLevels[0];
    
    // Reset all states
    setCurrentLevel(0);
    setCurrentNumberIndex(0);
    setTotalAciertos(0);
    setIsLevelComplete(false);
    setIsGameComplete(false);
    setAciertos(0);
    setErrores(0);
    setCompletedSets([]);
    setTiempoFinal(null);
    
    // Generate new problems for level 0
    const newProblems = Array.from({ length: initialGameLevel.problemsPerLevel }, () => 
      generateSumProblem(initialGameLevel.maxSum)
    );
    setProblems(newProblems);
    
    reiniciar();
  }, [reiniciar]);

  console.log("Data para el back", {
    user: user ? { id: user.id } : {},
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal,
  });

  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos: totalAciertos + aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal,
  });

  return {
    currentLevel,
    currentNumberIndex,
    digitCards: answerCards,
    dropSlots,
    currentTargetNumber,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    gameContainerRef,
    tiempoFinal,
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,
    checkNumber,
  };
};