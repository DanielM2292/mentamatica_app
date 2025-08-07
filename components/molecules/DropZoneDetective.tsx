"use client";
import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Target, Sparkles, Search, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { UnifiedGameItem } from '@/types/gameTypes';
import { ArrastrarItemDetective } from './ArrastrarItemDetective';

interface GameSet {
  id: string;
  name: string;
  color: string;
  icon: any;
  clue?: UnifiedGameItem;
}

interface DropZoneProps {
  set: GameSet;
  onDrop: (setId: string, itemData: UnifiedGameItem) => void;
  onClick?: () => void;
  isCompleted: boolean;
  isDraggedOver: boolean;
  isClickable: boolean;
  itemCount: number;
  initialItems?: UnifiedGameItem[];
}

export default function DropZoneDetective({
  set,
  onDrop,
  onClick,
  isCompleted,
  isDraggedOver,
  isClickable,
  itemCount,
  initialItems = [],
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGSVGElement>(null);
  const synapticRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const magnifyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current) return;

    gsap.fromTo(
      zoneRef.current,
      { scale: 0.8, opacity: 0, rotateY: 90 },
      {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
      }
    );

    // Animación sináptica detective
    if (synapticRef.current) {
      gsap.to(synapticRef.current, {
        x: '100%',
        duration: 3,
        repeat: -1,
        ease: 'power2.inOut',
      });
    }

    // Animación de lupa detective
    if (magnifyRef.current) {
      gsap.to(magnifyRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  useEffect(() => {
    if (isCompleted && checkRef.current) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        }
      );

      if (zoneRef.current) {
        gsap.to(zoneRef.current, {
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)',
          duration: 0.5,
          yoyo: true,
          repeat: 3,
        });
      }
    }
  }, [isCompleted]);

  // Efectos visuales para drag touch
  useEffect(() => {
    if (!zoneRef.current) return;

    if (isDraggedOver) {
      gsap.to(zoneRef.current, {
        scale: 1.05,
        borderColor: "#7c3aed",
        boxShadow: "0 0 25px rgba(124, 58, 237, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(zoneRef.current, {
        scale: 1,
        borderColor: isCompleted ? "#10b981" : "#d1d5db",
        boxShadow: isCompleted ? "0 0 15px rgba(16, 185, 129, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isDraggedOver, isCompleted]);

  // Efecto pulsante para modo clickable
  useEffect(() => {
    if (!pulseRef.current) return;

    if (isClickable && !isCompleted) {
      gsap.to(pulseRef.current, {
        scale: 1.1,
        opacity: 0.5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    } else {
      gsap.killTweensOf(pulseRef.current);
      gsap.set(pulseRef.current, { scale: 1, opacity: 0 });
    }
  }, [isClickable, isCompleted]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);

    if (zoneRef.current) {
      gsap.to(zoneRef.current, {
        scale: 1.02,
        borderColor: '#7c3aed',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);

    if (zoneRef.current) {
      gsap.to(zoneRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const itemData = JSON.parse(e.dataTransfer.getData('application/json'));
    onDrop(set.id, itemData);

    if (zoneRef.current) {
      gsap.to(zoneRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
    }
  };

  const handleClick = () => {
    if (isClickable && !isCompleted) {
      // Efecto visual de click detective
      if (zoneRef.current) {
        gsap.to(zoneRef.current, {
          scale: 1.03,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }

      onClick?.();
    }
  };

  const IconComponent = set.icon;

  return (
    <div className="relative">
      {/* Efecto de pulso para modo clickable */}
      <div
        ref={pulseRef}
        className="absolute inset-0 bg-purple-200 rounded-2xl opacity-0 pointer-events-none"
      />

      <div
        ref={zoneRef}
        data-drop-zone-id={set.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          ${set.color}
          ${isCompleted ? 'border-green-400 bg-green-50' : ''}
          ${isDraggedOver ? 'border-purple-500 bg-purple-50' : ''}
          ${isClickable && !isCompleted ? 'cursor-pointer hover:shadow-lg' : ''}
          p-6 rounded-2xl border-2 min-h-[140px]
          transition-all duration-300 relative overflow-hidden
          bg-gradient-to-br from-white/80 to-transparent
          touch-none select-none
        `}
        style={{
          touchAction: 'manipulation', // Permite taps pero evita otros gestos
        }}
      >
        {/* Fondo animado sináptico detective */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div ref={synapticRef} className="h-1 bg-purple-500 w-full"></div>
          <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
        </div>

        {/* Lupa detective flotante */}
        <div ref={magnifyRef} className="absolute top-3 right-3 opacity-20 pointer-events-none">
          <Search className="w-4 h-4 text-purple-600" />
        </div>

        {/* Efectos de partículas detective cuando se puede hacer click */}
        {isClickable && !isCompleted && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-30"
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${25 + i * 15}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                {isDraggedOver && (
                  <Target className="absolute -top-1 -right-1 w-3 h-3 text-purple-500 animate-spin" />
                )}
              </div>
              {isClickable && !isCompleted && (
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              )}
            </div>

            {isCompleted && (
              <CheckCircle
                ref={checkRef}
                className="w-6 h-6 text-green-500"
              />
            )}

            <div className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-600 shadow-sm flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {itemCount} elementos
            </div>
          </div>

          {/* Pistas mostradas como ítems visuales */}
          {initialItems.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {initialItems.map((item) => (
                  <ArrastrarItemDetective
                    key={item.id}
                    item={item}
                    onDragStart={() => { }}
                    isPreview={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Estados dinámicos */}
          {isDraggedOver && (
            <div className="text-center text-purple-600 font-semibold animate-pulse">
              🔍 Analizando conexión detective...
            </div>
          )}

          {isClickable && !isCompleted && !isDraggedOver && (
            <div className="text-center text-purple-600 font-semibold text-sm flex items-center justify-center gap-2">
              <Search className="w-4 h-4 animate-pulse" />
              Toca aquí para resolver el misterio
              <Eye className="w-4 h-4 animate-pulse" />
            </div>
          )}

          {isCompleted && (
            <div className="text-center text-green-600 font-semibold flex items-center justify-center gap-2">
              ✅ ¡Caso resuelto exitosamente! 🕵️
            </div>
          )}

          {!isDraggedOver && !isClickable && !isCompleted && (
            <div className="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
              <Search className="w-3 h-3" />
              Observa las pistas y arrastra los elementos correctos
            </div>
          )}
        </div>

        {/* Indicador táctil para móviles detective */}
        {isClickable && !isCompleted && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full opacity-60 animate-bounce sm:hidden flex items-center justify-center">
            <Search className="w-2 h-2 text-white" />
          </div>
        )}

        {/* Marco detective especial */}
        <div className="absolute inset-0 border border-purple-200 rounded-2xl opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-purple-400"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-purple-400"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-purple-400"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-purple-400"></div>
        </div>
      </div>
    </div>
  );
}