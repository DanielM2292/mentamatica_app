"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { UnifiedGameItem } from '@/types/gameTypes';
import { Search, Eye } from 'lucide-react';

interface DraggableItemProps {
  item: UnifiedGameItem;
  onDragStart: (item: UnifiedGameItem) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onClick?: () => void;
  isSelected?: boolean;
  isDragging?: boolean;
  isPreview?: boolean;
}

export function ArrastrarItemDetective({ 
  item, 
  onDragStart, 
  onTouchStart,
  onClick,
  isSelected = false,
  isDragging = false,
  isPreview = false 
}: DraggableItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const magnifyRef = useRef<HTMLDivElement>(null);

  // Vista en modo pista (sin interacción)
  if (isPreview) {
    return (
      <div
        className={`
          ${item.color}
          p-4 rounded-2xl border-2 border-dashed border-purple-300 shadow-md
          flex flex-col items-center gap-2
          cursor-default opacity-75 scale-95
          bg-gradient-to-br from-white/50 to-transparent
          relative overflow-hidden
        `}
      >
        {/* Efecto de pista detective */}
        <div className="absolute top-1 right-1 w-4 h-4 bg-purple-200 rounded-full flex items-center justify-center">
          <Eye className="w-2 h-2 text-purple-600" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
        
        <div className="relative w-8 h-8">
          <Image
            src={item.icon}
            alt={item.name}
            layout="fill"
            objectFit="contain"
            className="opacity-80"
          />
        </div>
        <span className="text-sm font-semibold text-gray-600 text-center">
          {item.name}
        </span>
      </div>
    );
  }

  // Animación para ítems activos
  useEffect(() => {
    if (!itemRef.current || !iconRef.current) return;

    gsap.fromTo(itemRef.current,
      { scale: 0, opacity: 0, rotation: -180 },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 0, 
        duration: 0.8, 
        ease: "back.out(1.7)", 
        delay: Math.random() * 0.5 
      }
    );

    // Animación de flotación detective
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(itemRef.current, {
      x: 5,
      y: -8,
      rotation: 2,
      duration: 1.5,
      ease: "power2.inOut"
    });
    tl.to(itemRef.current, {
      x: -5,
      y: 8,
      rotation: -2,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Efecto de brillo detective
    gsap.to(itemRef.current, {
      boxShadow: "0 0 12px rgba(147, 51, 234, 0.3)",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut"
    });

    // Animación del icono
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  // Animación cuando se selecciona
  useEffect(() => {
    if (!itemRef.current) return;

    if (isSelected) {
      gsap.to(itemRef.current, {
        scale: 1.15,
        boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)",
        borderColor: "#a855f7",
        duration: 0.3,
        ease: "power2.out"
      });

      // Animación de la lupa
      if (magnifyRef.current) {
        gsap.to(magnifyRef.current, {
          scale: 1.2,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    } else {
      gsap.to(itemRef.current, {
        scale: 1,
        boxShadow: "0 0 12px rgba(147, 51, 234, 0.3)",
        borderColor: "#d1d5db",
        duration: 0.3,
        ease: "power2.out"
      });

      if (magnifyRef.current) {
        gsap.to(magnifyRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, [isSelected]);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(item);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';

    // Efecto visual al inicio del drag
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.3,
        rotation: 15,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleDragEnd = () => {
    // Restaurar el elemento original
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevenir el comportamiento por defecto para evitar scroll
    e.preventDefault();
    
    // Efecto visual inmediato
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.1,
        duration: 0.1
      });
    }

    onTouchStart?.(e);
  };

  const handleClick = () => {
    onClick?.();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (magnifyRef.current) {
      gsap.to(magnifyRef.current, {
        scale: 1.1,
        duration: 0.2
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (magnifyRef.current) {
      gsap.to(magnifyRef.current, {
        scale: 1,
        duration: 0.2
      });
    }
  };

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        ${item.color}
        p-4 rounded-2xl border-2 shadow-md cursor-pointer
        flex flex-col items-center gap-2 select-none
        transition-all duration-300 relative overflow-hidden
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105 hover:shadow-lg'}
        ${isSelected ? 'border-purple-400 shadow-purple-200' : 'border-gray-200'}
        bg-gradient-to-br from-white/80 to-transparent
        touch-none
      `}
      style={{
        touchAction: 'none', // Importante para evitar comportamientos por defecto
      }}
    >
      {/* Efecto de selección con lupa detective */}
      {isSelected && (
        <div 
          ref={magnifyRef}
          className="absolute -top-2 -right-2 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center animate-pulse"
        >
          <Search className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Efectos de fondo detective */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-100/20 to-transparent transform -skew-x-12 hover:translate-x-full transition-all duration-700 opacity-0 hover:opacity-100"></div>
      
      {/* Partículas detectivescas */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 animate-ping"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div ref={iconRef} className="relative w-8 h-8 z-10">
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

      {/* Indicador táctil detective */}
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-purple-400 rounded-full opacity-50 sm:hidden">
        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
      </div>

      {/* Badge detective */}
      <div className="absolute top-1 left-1 text-xs opacity-60">
        🔍
      </div>
    </div>
  );
}