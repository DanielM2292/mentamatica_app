"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
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

  // Función para verificar si un item pertenece a un conjunto específico
  const itemBelongsToSet = (item: UnifiedGameItem, setId: string): boolean => {
    const categories = Array.isArray(item.category) ? item.category : [item.category];
    
    if (setId === 'interseccion') {
      return categories.length === 2;
    } else {
      return categories.includes(setId);
    }
  };

  const isSetComplete = (setId: string, currentItems: UnifiedGameItem[]): boolean => {
    return !currentItems.some(item => itemBelongsToSet(item, setId));
  };

  const handleDragStart = useCallback((item: UnifiedGameItem) => {
    dragItem.current = item;
    console.log('Iniciando arrastre:', item.name, 'Categorías:', item.category);
  }, []);

  const handleDrop = useCallback((setId: string) => {
    if (!dragItem.current) return;
    
    const item = dragItem.current;
    const belongsToSet = itemBelongsToSet(item, setId);

    if (belongsToSet) {
      // Remover el item de la lista (siempre que sea correcto)
      const newItems = items.filter(i => i.id !== item.id);
      setItems(newItems);
      setScore(prev => prev + 10);
      setAciertos(prev => prev + 1);

      // Encontrar el nombre del conjunto para mostrar en el toast
      const setName = currentGameLevel.sets.find(s => s.id === setId)?.name || setId;
      
      toast({
        title: "¡Excelente relación!",
        description: `${item.name} pertenece a ${setName}`,
        duration: 2000,
      });

      // Verificar qué conjuntos se completaron después de este movimiento
      const newlyCompletedSets: string[] = [];
      
      currentGameLevel.sets.forEach(set => {
        if (!completedSets.includes(set.id) && isSetComplete(set.id, newItems)) {
          newlyCompletedSets.push(set.id);
        }
      });

      // Actualizar conjuntos completados si hay nuevos
      if (newlyCompletedSets.length > 0) {
        setCompletedSets(prev => [...prev, ...newlyCompletedSets]);
        
        // Mostrar toast especial para conjuntos completados
        if (newlyCompletedSets.length === 1) {
          const completedSetName = currentGameLevel.sets.find(s => s.id === newlyCompletedSets[0])?.name;
          toast({
            title: "¡Conjunto completado! 🎉",
            description: `Has completado el conjunto ${completedSetName}`,
            duration: 3000,
          });
        } else {
          toast({
            title: "¡Múltiples conjuntos completados! 🎉",
            description: `${item.name} completó ${newlyCompletedSets.length} conjuntos`,
            duration: 3000,
          });
        }
      }
    } else {
      setErrores(prev => prev + 1);
      
      // Mensaje más específico según el tipo de error
      let errorMessage = "Intenta con otro conjunto";
      if (setId === 'interseccion') {
        errorMessage = "Este elemento no pertenece a ambos conjuntos a la vez";
      }
      
      toast({
        title: "El elemento no pertenece a este conjunto",
        description: errorMessage,
        duration: 2000,
        variant: "destructive"
      });
    }

    dragItem.current = null;
  }, []);

  const handleNextLevel = () => {
    if (!isLastLevel) {
      setTotalAciertos(prev => prev + aciertos);
      setCurrentLevel(prev => prev + 1);
      
      // Resetear estados para el nuevo nivel
      const nextLevel = currentLevel + 1;
      setItems(gameLevels[nextLevel].items);
      setScore(0);
      setCompletedSets([]);
      setAciertos(0);
      
      toast({
        title: "¡Nivel completado! 🎉",
        description: `Avanzando al nivel ${nextLevel + 1}`,
        duration: 2000,
      });
    }
  };

  const handleRestart = () => {
    setTiempoFinal(null);
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