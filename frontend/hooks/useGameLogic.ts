"use client";

import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { gameLevels, GameItem } from '@/public/data/conjuntos/gameLevels';
import { useUser } from '@clerk/nextjs';
import { convertirErrores } from '@/services/convertidorEstrellas';
import { useTimer } from '@/context/timer-context';


export const useGameLogic = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [items, setItems] = useState(gameLevels[0].items);
  const [score, setScore] = useState(0);
  const [completedSets, setCompletedSets] = useState<string[]>([]);
  const [totalAciertos, setTotalAciertos] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [errores, setErrores] = useState(0);
  const dragItem = useRef<GameItem | null>(null);
  const currentGameLevel = gameLevels[currentLevel];
  const isLastLevel = currentLevel === gameLevels.length - 1;
  const isLevelComplete = completedSets.length === currentGameLevel.sets.length;
  const isGameComplete = isLastLevel && isLevelComplete;
  const [tiempoFinal, setTiempoFinal] = useState<number | null>(null);
  const { iniciar, detener, reiniciar, tiempo } = useTimer();
  const { user } = useUser();

  useEffect(() => {
    iniciar();
  }, []);

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
      setAciertos(prev => prev + 1);
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
      setErrores(prev => prev + 1);
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
      setTotalAciertos(prev => prev + score);
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

  const handleRestart = async () => {
    const usuario_id = user?.id;
    const urlParts = window.location.pathname.split('/');
    const actividad = urlParts[urlParts.length - 1];
    const estrellas = convertirErrores(errores);
    const intentos = aciertos + errores;
    const tiempoAEnviar = tiempoFinal ?? tiempo;
    console.log("Enviando datos:", {
      usuario_id,
      actividad,
      estrellas,
      intentos,
      errores,
      tiempo: tiempoAEnviar
    });

    try {
      const res = await fetch(`http://localhost:3001/api/conjuntos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id,
          actividad,
          estrellas,
          intentos,
          errores,
          tiempo: tiempoFinal,
        })
      });

      if (!res.ok) {
        throw new Error('Error al guardar resultados');
      }
    } catch (error) {
      console.error('Error al guardar resultados:', error);
    }

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

  const handleTiempoFinalizado = (tiempo: number) => {
    setTiempoFinal(tiempo);
  };

  useEffect(() => {
    if (isGameComplete && tiempoFinal === null) {
      detener();
      setTiempoFinal(tiempo);
    }
  }, [isGameComplete, tiempoFinal]);


  return {
    currentLevel,
    items,
    score,
    completedSets,
    totalAciertos,
    aciertos,
    errores,
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