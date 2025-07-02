"use client";
import { createContext, useContext, useRef, useState, useEffect } from "react";

interface TimerContextType {
  tiempo: number;
  iniciar: () => void;
  detener: () => void;
  reiniciar: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [tiempo, setTiempo] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const iniciar = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTiempo(prev => prev + 1);
    }, 1000);
  };

  const detener = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reiniciar = () => {
    detener();
    setTiempo(0);
    iniciar();
  };

  useEffect(() => () => detener(), []);

  return (
    <TimerContext.Provider value={{ tiempo, iniciar, detener, reiniciar }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer debe estar dentro del TimerProvider");
  return context;
};
