"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { GameItem } from "@/public/data/conjuntos/gameLevels";
import { Star } from "lucide-react";

interface DraggableItemProps {
  item: GameItem;
  onDragStart: (item: GameItem) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onClick?: () => void;
  isSelected?: boolean;
  isDragging?: boolean;
}

export function ArrastrarItem({ 
  item, 
  onDragStart, 
  onTouchStart,
  onClick,
  isSelected = false,
  isDragging = false
}: DraggableItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.fromTo(
      itemRef.current,
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: Math.random() * 0.5,
      }
    );
  }, []);

  // Animación cuando se selecciona
  useEffect(() => {
    if (!itemRef.current) return;

    if (isSelected) {
      gsap.to(itemRef.current, {
        scale: 1.1,
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(itemRef.current, {
        scale: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isSelected]);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(item);
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    
    // Añadir efecto visual al elemento original durante el drag
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        opacity: 0.5,
        scale: 0.95,
        duration: 0.2
      });
    }
  };

  const handleDragEnd = () => {
    // Restaurar el elemento original
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevenir el comportamiento por defecto para evitar scroll
    e.preventDefault();
    
    // Efecto visual inmediato
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.05,
        duration: 0.1
      });
    }

    onTouchStart?.(e);
  };

  const handleClick = () => {
    onClick?.();
  };

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      className={`
        ${item.color}
        p-4 rounded-2xl border-2 shadow-md cursor-pointer
        flex flex-col items-center gap-2 select-none
        transition-all duration-300 relative overflow-hidden
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:shadow-lg'}
        ${isSelected ? 'border-blue-400 shadow-blue-200' : 'border-gray-200'}
        touch-none
      `}
      style={{
        touchAction: 'none', // Importante para evitar comportamientos por defecto
      }}
    >
      {/* Efecto de selección */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <Star className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Efecto de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 hover:translate-x-full transition-all duration-700"></div>

      <div className="relative w-8 h-8 z-10">
        <Image
          src={item.icon}
          alt={item.name}
          layout="fill"
          objectFit="contain"
          draggable={false}
        />
      </div>
      
      <span className="text-sm font-semibold text-gray-700 text-center z-10">
        {item.name}
      </span>

      {/* Indicador táctil */}
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-400 rounded-full opacity-50 sm:hidden"></div>
    </div>
  );
}