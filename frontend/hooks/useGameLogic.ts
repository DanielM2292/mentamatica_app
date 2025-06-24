"use client";

import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { gameLevels, GameItem } from '@/public/data/conjuntos/gameLevels';

export const useGameLogic = () => {
  const { toast } = useToast();
  
  const [currentLevel, setCurrentLevel] = useState(0);
  const [items, setItems] = useState(gameLevels[0].items);
  const [score, setScore] = useState(0);
  const [completedSets, setCompletedSets] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const dragItem = useRef<GameItem | null>(null);

  const currentGameLevel = gameLevels[currentLevel];
  const isLastLevel = currentLevel === gameLevels.length - 1;
  const isLevelComplete = completedSets.length === currentGameLevel.sets.length;
  const isGameComplete = isLastLevel && isLevelComplete;

  const handleDragStart = (item: GameItem) => {
    dragItem.current = item;
    console.log('Iniciando arrastre:', item.name);
  };

  const handleDrop = (setId: string) => {
    if (!dragItem.current) return;

    const item = dragItem.current;
    console.log('Soltando:', item.name, 'en conjunto:', setId);

    if (item.category === setId) {
      // Clasificación correcta
      setItems(prev => prev.filter(i => i.id !== item.id));
      setScore(prev => prev + 10);
      
      toast({
        title: "¡Exelente relacion!",
        description: `${item.name} pertenece a ${currentGameLevel.sets.find(s => s.id === setId)?.name}`,
        duration: 2000,
      });

      // Verificar si el conjunto está completo
      const remainingItemsInSet = items.filter(i => i.category === setId && i.id !== item.id);
      if (remainingItemsInSet.length === 0 && !completedSets.includes(setId)) {
        setCompletedSets(prev => [...prev, setId]);
        toast({
          title: "¡Conjunto completado! 🎉",
          description: "Has relacionado todos los elementos de este conjunto.",
          duration: 3000,
        });
      }
    } else {
      // Clasificación incorrecta
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
      setTotalScore(prev => prev + score);
      setCurrentLevel(prev => prev + 1);
      setItems(gameLevels[currentLevel + 1].items);
      setScore(0);
      setCompletedSets([]);
      
      toast({
        title: "¡Nuevo nivel desbloqueado! 🚀",
        description: `Nivel ${currentLevel + 2}: ${gameLevels[currentLevel + 1].title}`,
        duration: 3000,
      });
    }
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setItems(gameLevels[0].items);
    setScore(0);
    setTotalScore(0);
    setCompletedSets([]);
    
    toast({
      title: "¡Juego reiniciado! 🔄",
      description: "Comenzando desde el nivel 1",
      duration: 2000,
    });
  };

  return {
    currentLevel,
    items,
    score,
    completedSets,
    totalScore,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    handleDragStart,
    handleDrop,
    handleNextLevel,
    handleRestart
  };
};