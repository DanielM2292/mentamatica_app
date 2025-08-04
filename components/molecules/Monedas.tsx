"use client";

import { useEffect, useState } from "react";
import { Coins } from "lucide-react";

interface MonedasBadgeProps {
  userId: string;
  isVisible?: boolean;
}

export default function Monedas({ userId, isVisible = true }: MonedasBadgeProps) {
  const [monedas, setMonedas] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchMonedas = async () => {
      try {
        const res = await fetch(`/api/usuarios?usuario_id=${userId}`);
        const data = await res.json();
        setMonedas(data.monedas);
      } catch (error) {
        console.error("Error al obtener monedas:", error);
      }
    };

    if (userId) {
      fetchMonedas();
    }
  }, [userId]);

  if (!isClient || monedas === null) return null;

  return (
    <div
      className={`flex items-center gap-1 sm:gap-2 bg-amber-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 ${
        isVisible ? "animate-bounce-in" : "opacity-0"
      }`}
      style={{ animationDelay: "0.7s" }}
    >
      <Coins className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600 animate-pulse" />
      <span className="font-bold text-amber-700 text-xs sm:text-base">
        {monedas}
      </span>
    </div>
  );
}
