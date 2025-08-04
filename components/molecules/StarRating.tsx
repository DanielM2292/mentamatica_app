"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useStars } from "@/context/StarsContext";

interface StarRatingProps {
  activityLocation: string;
  activityId: string
}

const StarRating = ({ activityLocation, activityId }: StarRatingProps) => {
  const { user } = useUser();
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { updateStars } = useStars();
  const fetchRef = useRef<boolean>(false);

  const fetchStars = useCallback(async () => {
    if (!user) {
      setIsLoading(false)
      return;
    }
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        usuario_id: user?.id ?? "",
        juego: activityLocation
      });
      const response = await fetch(`/api/metricas?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log("respuesta desde el back GET", data)

      if (!Array.isArray(data.stars)) {
        throw new Error("Formato de datos incorrecto");
      }
      console.log("el id actividad", activityId)
      const actividad = data.stars?.find(
        (a: { actividad_id?: string; modulo_id?: string; }) =>
          a.actividad_id === activityId || a.modulo_id === activityId
      );
      const currentStars = actividad?.estrellas || actividad?.promedio_estrellas || 0;
      setStars(currentStars);
      updateStars(activityId, currentStars);

    } catch (error) {
      setStars(0);
      updateStars(activityId, 0);
    } finally {
      setIsLoading(false);
      fetchRef.current = false;
    }
  }, [user, activityLocation, activityId, updateStars]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStars()
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchStars]);

  if (isLoading) {
    return <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-200 animate-pulse" />
      ))}
    </div>;
  }
  return (
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 hover:scale-125 ${i < stars
            ? "text-yellow-500 fill-yellow-500 drop-shadow-md"
            : "text-yellow-500 fill-transparent stroke-yellow-500 stroke-2 opacity-70"
            }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
