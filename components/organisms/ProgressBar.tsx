"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

interface ProgressBarProps {
  activityLocation: string;
  activityId: string;
  isSmallMobile?: boolean;
}

const ProgressBar = ({ activityLocation, activityId, isSmallMobile = false }: ProgressBarProps) => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fetchRef = useRef<boolean>(false);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        usuario_id: user?.id ?? "",
        juego: activityLocation
      });
      console.log("entra para ir al endpoint")
      const response = await fetch(`/api/metricas?${params.toString()}`);
      console.log("respuesta del endpoint", response)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("data para la barra de progreso", data)
      if (!Array.isArray(data.stars)) {
        throw new Error("Formato de datos incorrecto");
      }

      const actividad = data.stars?.find(
        (a: { actividad_id?: string; modulo_id?: string }) =>
          a.actividad_id === activityId || a.modulo_id === activityId
      );
      
      // Asume que el progreso viene como porcentaje (0-100)
      const currentProgress = actividad?.progress || actividad?.porcentaje_completado || 0;
      setProgress(currentProgress);

    } catch (error) {
      setProgress(0);
    } finally {
      setIsLoading(false);
      fetchRef.current = false;
    }
  }, [user, activityLocation, activityId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fetchRef.current) {
        fetchRef.current = true;
        fetchProgress();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchProgress]);

  if (isLoading) {
    return (
      <div className={`flex items-center ${isSmallMobile ? "gap-1" : "gap-2"}`}>
        <div className={`flex-1 bg-gray-200 rounded-full ${isSmallMobile ? "h-1.5" : "h-2"} overflow-hidden`}>
          <div 
            className={`${isSmallMobile ? "h-1.5" : "h-2"} bg-gray-300 rounded-full animate-pulse`}
            style={{ width: '50%' }}
          ></div>
        </div>
        <span className={`${isSmallMobile ? "text-xs" : "text-xs sm:text-sm"} text-gray-400`}>...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${isSmallMobile ? "gap-1" : "gap-2"}`}>
      <div className={`flex-1 bg-gray-200 rounded-full ${isSmallMobile ? "h-1.5" : "h-2"} overflow-hidden shadow-inner`}>
        <div
          className={`${isSmallMobile ? "h-1.5" : "h-2"} bg-gradient-to-r from-pink-300 to-purple-300 rounded-full transition-all duration-1000 ease-out relative`}
          style={{
            width: `${progress}%`,
          }}
        >
          {/* Efecto de brillo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-fast"></div>
          
          {/* Efecto de pulsación cuando está completo */}
          {progress === 100 && (
            <div className="absolute inset-0 bg-green-400 rounded-full opacity-0 animate-pulse-once"></div>
          )}
        </div>
      </div>
      <span className={`${isSmallMobile ? "text-xs" : "text-xs sm:text-sm"} text-gray-600 font-medium`}>
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;