"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useTimer } from "@/context/timer-context"
import { useEnviarResultados } from '../useEnviarResultados';
import { convertirErrores } from '@/services/convertidorEstrellas';
import { v4 as uuidv4 } from 'uuid';

// Configuración de niveles para suma
const sumaLevels = [
  {
    name: "Nivel 1",
    description: "Sumas básicas hasta 10",
    maxSum: 10,
    problemsPerLevel: 1,
  },
  {
    name: "Nivel 2",
    description: "Sumas hasta 20",
    maxSum: 20,
    problemsPerLevel: 1,
  },
  {
    name: "Nivel 3",
    description: "Sumas hasta 50",
    maxSum: 50,
    problemsPerLevel: 1,
  },
]

// Generar problema de suma aleatorio
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

// Generar problemas para un nivel
const generateProblems = (level: any) => {
  return Array.from({ length: level.problemsPerLevel }, () => generateSumProblem(level.maxSum));
}

// Generar opciones de respuesta (incluyendo la correcta)
const generateAnswerOptions = (correctAnswer: number): number[] => {
  const options = new Set<number>()
  options.add(correctAnswer)

  // Agregar opciones incorrectas
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
    id: `answer-${number}-${uuidv4()}`, // CORREGIDO: uuidv4() con paréntesis
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
  const [isGameActive, setIsGameActive] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [completedSets, setCompletedSets] = useState<any[]>([]);
  const [totalAciertos, setTotalAciertos] = useState(0);
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); // NUEVO: estado de inicialización

  const gameContainerRef = useRef<HTMLDivElement>(null);
  const draggedItem = useRef<AnswerCard | null>(null);
  const lastToastTime = useRef<number>(0);
  const lastToastMessage = useRef<string>('');

  const currentGameLevel = sumaLevels[currentLevel];
  const currentTargetNumber = problems[currentNumberIndex];
  const isLastLevel = currentLevel >= sumaLevels.length - 1;
  const estrellas = convertirErrores(errores);

  // Toast function to prevent duplicates
  const showToast = useCallback(
    (title: string, description: string, variant?: "default" | "destructive") => {
      const now = Date.now()
      const message = `${title}-${description}`

      if (now - lastToastTime.current < 500 && lastToastMessage.current === message) {
        return
      }

      lastToastTime.current = now
      lastToastMessage.current = message

      toast({
        title,
        description,
        duration: 2000,
        ...(variant && { variant }),
      })
    },
    [toast],
  )

  // Initialize drop slots
  const initializeDropSlots = useCallback((problem: any): DropSlot[] => {
    if (!problem) return [];
    return [{
      position: 0,
      number: null,
      label: 'Respuesta',
      acceptedNumber: problem.result,
    }];
  }, [])

  // Start new problem
  const startNewNumber = useCallback(() => {
    if (!currentTargetNumber) {
      console.log('No currentTargetNumber available');
      return;
    }

    console.log('Starting new number with target:', currentTargetNumber);
    
    const newAnswerCards = generateAnswerCards(currentTargetNumber.result)
    const newDropSlots = initializeDropSlots(currentTargetNumber)

    setAnswerCards(newAnswerCards)
    setDropSlots(newDropSlots)
    setIsGameActive(true)
  }, [currentTargetNumber, initializeDropSlots])

  // Handle drag start
  const handleDragStart = useCallback((answerCard: AnswerCard) => {
    if (answerCard.isUsed) return
    draggedItem.current = answerCard
  }, [])

  // Handle drop
  const handleDrop = useCallback((slotPosition: number) => {
    if (!draggedItem.current) return

    const draggedAnswer = draggedItem.current

    setDropSlots((prev) => {
      const newSlots = [...prev]
      const targetSlot = newSlots.find((slot) => slot.position === slotPosition)

      if (!targetSlot) return prev

      // If slot is occupied, return previous answer to available cards
      if (targetSlot.number !== null) {
        setAnswerCards((prevCards) =>
          prevCards.map((card) =>
            card.number === targetSlot.number ? { ...card, isUsed: false } : card,
          ),
        )
      }

      // Place the new answer
      targetSlot.number = draggedAnswer.number
      return newSlots
    })

    // Mark answer as used
    setAnswerCards((prev) =>
      prev.map((card) => (card.id === draggedAnswer.id ? { ...card, isUsed: true } : card)),
    )

    draggedItem.current = null
  }, [])

  // Check if answer is correct
  const checkNumber = useCallback(() => {
    if (!currentTargetNumber || dropSlots.length === 0) return false
    return dropSlots[0].number === currentTargetNumber.result;
  }, [dropSlots, currentTargetNumber])

  // Submit current answer
  const submitNumber = useCallback(() => {
    const isCorrect = checkNumber()

    if (isCorrect) {
      setAciertos((prev) => prev + 1)
      showToast("¡Excelente!", `¡Correcto! ${currentTargetNumber.firstNumber} + ${currentTargetNumber.secondNumber} = ${currentTargetNumber.result}`)

      // Move to next problem or complete level
      if (currentNumberIndex < currentGameLevel.problemsPerLevel - 1) {
        setTimeout(() => setCurrentNumberIndex((prev) => prev + 1), 1500)
      } else {
        // Level complete
        setTimeout(() => {
          setIsLevelComplete(true)
          setIsGameActive(false)
          setCompletedSets([{ id: currentLevel }])
          showToast("¡Nivel completado! 🎉", `Has completado el ${currentGameLevel.name}`)

          if (isLastLevel) {
            setIsGameComplete(true);
            setTiempoFinal(tiempo);
            detener();
          }
        }, 1500)
      }
    } else {
      setErrores((prev) => prev + 1)
      showToast("¡Inténtalo de nuevo!", "La respuesta no es correcta", "destructive")
    }
  }, [checkNumber, currentTargetNumber, currentNumberIndex, currentGameLevel, showToast, currentLevel, isLastLevel, tiempo, detener])

  // Clear current answer
  const clearNumber = useCallback(() => {
    setDropSlots((prev) => prev.map((slot) => ({ ...slot, number: null })))
    setAnswerCards((prev) => prev.map((card) => ({ ...card, isUsed: false })))
  }, [])

  // Handle next level
  const handleNextLevel = useCallback(() => {
    if (currentLevel < sumaLevels.length - 1) {
      const newLevel = currentLevel + 1
      setTotalAciertos((prev) => prev + aciertos)
      setCurrentLevel(newLevel)
      setCurrentNumberIndex(0)
      setAciertos(0)
      setErrores(0)
      setIsLevelComplete(false)
      setCompletedSets([])

      // Generar nuevos problemas para el nuevo nivel
      const newProblems = generateProblems(sumaLevels[newLevel])
      setProblems(newProblems);
      setIsInitialized(false); // Reset initialization for new level
    }
  }, [currentLevel, aciertos])

  // Handle restart
  const handleRestart = useCallback(() => {
    setCurrentLevel(0)
    setCurrentNumberIndex(0)
    setAciertos(0)
    setErrores(0)
    setIsLevelComplete(false)
    setIsGameComplete(false)
    setCompletedSets([])
    setTotalAciertos(0)
    setTiempoFinal(null)
    setIsInitialized(false)

    // Generar nuevos problemas para el primer nivel
    const newProblems = generateProblems(sumaLevels[0])
    setProblems(newProblems)

    reiniciar()
    showToast("¡Juego reiniciado! 🔄", "Comenzando desde el nivel 1")
  }, [reiniciar, showToast])

  // CORREGIDO: Inicialización inicial más clara
  useEffect(() => {
    if (!isInitialized) {
      console.log('Initializing game for level:', currentLevel);
      const initialProblems = generateProblems(currentGameLevel);
      setProblems(initialProblems);
      setCurrentNumberIndex(0);
      setIsLevelComplete(false);
      setIsGameActive(false); // Will be set to true when startNewNumber is called
      setIsInitialized(true);
      
      // Iniciar timer solo una vez
      if (currentLevel === 0) {
        iniciar();
      }
    }
  }, [currentLevel, currentGameLevel, isInitialized, iniciar]);

  // CORREGIDO: Efecto separado para iniciar nuevo número
  useEffect(() => {
    if (isInitialized && problems.length > 0 && currentNumberIndex < problems.length && !isLevelComplete && !isGameComplete) {
      console.log('Starting new number for index:', currentNumberIndex, 'problem:', problems[currentNumberIndex]);
      // Pequeño delay para asegurar que el estado se haya actualizado
      const timer = setTimeout(() => {
        startNewNumber();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized, problems, currentNumberIndex, isLevelComplete, isGameComplete, startNewNumber]);

  // Enviar resultados al finalizar el juego
  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos,
    errores,
    estrellas,
    tiempo: tiempoFinal || tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal,
  });

  // CORREGIDO: Asegurar que currentTargetNumber esté disponible
  const safeCurrentTargetNumber = problems[currentNumberIndex] || null;

  console.log('Hook state:', {
    currentLevel,
    currentNumberIndex,
    problemsLength: problems.length,
    currentTargetNumber: safeCurrentTargetNumber,
    isInitialized,
    isGameActive,
    isGameComplete,
    answerCardsLength: answerCards.length,
    dropSlotsLength: dropSlots.length,
    tiempoFinal,
    setTiempoFinal
  });

  return {
    currentLevel,
    currentNumberIndex,
    digitCards: answerCards,
    dropSlots,
    currentTargetNumber: safeCurrentTargetNumber, // CORREGIDO: usar versión segura
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    gameContainerRef,
    tiempoFinal,
    isInitialized, // NUEVO: exponer estado de inicialización

    // Game actions
    handleDragStart,
    handleDrop,
    submitNumber,
    clearNumber,
    handleNextLevel,
    handleRestart,

    // Utilidad
    checkNumber,
    items: answerCards,
  }
};