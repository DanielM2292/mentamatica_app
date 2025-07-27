"use client";

import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GameLevel, gameLevels } from '@/public/data/conjuntos/gameLevelsUnion';
import { UnifiedGameItem } from '@/types/gameTypes';
import { useUser } from '@clerk/nextjs';
import { convertirErrores } from '@/services/convertidorEstrellas';
import { useTimer } from '@/context/timer-context';
import { useEnviarResultados } from '../useEnviarResultados';

export const useGameUnion = () => {
  const { toast } = useToast();
  const { iniciar, detener, reiniciar, tiempo } = useTimer();
  const { user } = useUser();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [items, setItems] = useState<UnifiedGameItem[]>(gameLevels[0].items);
  const [score, setScore] = useState(0);
  const [completedSets, setCompletedSets] = useState<string[]>([]);
  const [totalAciertos, setTotalAciertos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null);
  const dragItem = useRef<UnifiedGameItem | null>(null);

  const currentGameLevel: GameLevel = gameLevels[currentLevel];
  const isLastLevel = currentLevel === gameLevels.length - 1;
  const isLevelComplete = completedSets.length === currentGameLevel.sets.length;
  const isGameComplete = isLastLevel && isLevelComplete;
  const estrellas = convertirErrores(errores);

  useEffect(() => {
    iniciar();
  }, []);

  const handleDragStart = (item: UnifiedGameItem) => {
    dragItem.current = item;
    console.log('Iniciando arrastre:', item.name);
  };

  const handleDrop = (setId: string) => {
    if (!dragItem.current) return;
    const item = dragItem.current;
    const categories = Array.isArray(item.category) ? item.category : [item.category];

    const isIntersection = setId === 'interseccion';
    const belongsToSet = isIntersection
      ? categories.length > 1
      : categories.includes(setId);

    if (belongsToSet) {
      setItems(prev => prev.filter(i => i.id !== item.id));
      setScore(prev => prev + 10);
      setAciertos(prev => prev + 1);

      toast({
        title: "¡Excelente relación!",
        description: `${item.name} pertenece a ${currentGameLevel.sets.find(s => s.id === setId)?.name}`,
        duration: 2000,
      });

      const remainingItemsInSet = items.filter(i => {
        const cat = Array.isArray(i.category) ? i.category : [i.category];
        const valid = setId === 'interseccion' ? cat.length > 1 : cat.includes(setId);
        return valid && i.id !== item.id;
      });

      if (remainingItemsInSet.length === 0 && !completedSets.includes(setId)) {
        setCompletedSets(prev => [...prev, setId]);
        toast({
          title: "¡Conjunto completado! 🎉",
          description: "Has relacionado todos los elementos de este conjunto.",
          duration: 3000,
        });
      }
    } else {
      setErrores(prev => prev + 1);
      toast({
        title: "El elemento no pertenece a este conjunto",
        description: "Intenta con otro conjunto",
        duration: 2000,
        variant: "destructive"
      });
    }

    dragItem.current = null;
  };

  const handleNextLevel = () => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + score);
      setCurrentLevel(prev => prev + 1);
      setItems(gameLevels[currentLevel + 1].items);
      setScore(0);
      setCompletedSets([]);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setItems(gameLevels[0].items);
    setScore(0);
    setTotalAciertos(0);
    setCompletedSets([]);
    setAciertos(0);
    setErrores(0);
    reiniciar();

    toast({
      title: "¡Juego reiniciado! 🔄",
      description: "Comenzando desde el nivel 1",
      duration: 2000,
    });
  };

  const handleTiempoFinalizado = (t: number) => {
    setTiempoFinal(t);
  };

  useEnviarResultados({
    user: user ? { id: user.id } : {},
    aciertos,
    errores,
    estrellas,
    tiempo,
    isGameComplete,
    tiempoFinal,
    detener,
    setTiempoFinal
  })

  return {
    currentLevel,
    items,
    score,
    completedSets,
    totalAciertos,
    aciertos,
    errores,
    estrellas,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    handleDragStart,
    handleDrop,
    handleNextLevel,
    handleRestart,
    tiempoFinal,
    handleTiempoFinalizado
  };
};
