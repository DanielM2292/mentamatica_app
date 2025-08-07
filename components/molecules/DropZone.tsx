"use client";
import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Target, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

interface GameSet {
  id: string;
  name: string;
  color: string;
  icon: any;
}

interface DropZoneProps {
  set: GameSet;
  onDrop: (setId: string, itemData?: any) => void;
  onClick?: () => void;
  isCompleted: boolean;
  isDraggedOver: boolean;
  isClickable: boolean;
  itemCount: number;
}

export default function DropZone({ 
  set, 
  onDrop, 
  onClick,
  isCompleted, 
  isDraggedOver,
  isClickable,
  itemCount 
}: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGSVGElement>(null);
  const synapticRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current) return;

    gsap.fromTo(zoneRef.current, 
      { scale: 0.8, opacity: 0, rotateY: 90 },
      { scale: 1, opacity: 1, rotateY: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
    );

    if (synapticRef.current) {
      gsap.to(synapticRef.current, {
        x: "100%",
        duration: 2,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  }, []);

  useEffect(() => {
    if (isCompleted && checkRef.current) {
      gsap.fromTo(checkRef.current, 
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );

      if (zoneRef.current) {
        gsap.to(zoneRef.current, {
          boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
          duration: 0.5,
          yoyo: true,
          repeat: 3
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
        borderColor: "#3b82f6",
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(zoneRef.current, {
        scale: 1,
        borderColor: isCompleted ? "#fbbf24" : "#d1d5db",
        boxShadow: isCompleted ? "0 0 15px rgba(251, 191, 36, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
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
        opacity: 0.7,
        duration: 1,
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
    if (e.dataTransfer.types.includes('application/json')) {
      e.preventDefault();
      setIsDragOver(true);

      if (zoneRef.current) {
        gsap.to(zoneRef.current, {
          scale: 1.02,
          borderColor: "#3b82f6",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    gsap.to(zoneRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const itemData = JSON.parse(e.dataTransfer.getData('application/json'));
    onDrop(set.id, itemData);

    gsap.to(zoneRef.current, {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  };

  const handleClick = () => {
    if (isClickable && !isCompleted) {
      // Efecto visual de click
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
        className="absolute inset-0 bg-blue-200 rounded-2xl opacity-0 pointer-events-none"
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
          ${isCompleted ? 'border-yellow-400 bg-yellow-50' : ''}
          ${isDraggedOver ? 'border-blue-400 bg-blue-50' : ''}
          ${isClickable && !isCompleted ? 'cursor-pointer hover:shadow-lg' : ''}
          p-6 rounded-2xl border-2 min-h-[120px]
          transition-all duration-300 relative overflow-hidden
          touch-none select-none
        `}
        style={{
          touchAction: 'manipulation', // Permite taps pero evita otros gestos
        }}
      >
        {/* Indicador de actividad neural */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div ref={synapticRef} className="h-1 bg-current w-full"></div>
        </div>

        {/* Efectos de partículas cuando se puede hacer click */}
        {isClickable && !isCompleted && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="relative">
                <IconComponent className="w-6 h-6 text-gray-600" />
                {isDraggedOver && (
                  <Target className="absolute -top-1 -right-1 w-3 h-3 text-blue-500 animate-spin" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{set.name}</h3>
              {isClickable && !isCompleted && (
                <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
              )}
            </div>

            {isCompleted && (
              <CheckCircle 
                ref={checkRef} 
                className="w-6 h-6 text-green-500" 
              />
            )}

            <div className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-600 shadow-sm">
              {itemCount} elementos
            </div>
          </div>

          {/* Estados dinámicos */}
          {isDraggedOver && (
            <div className="text-center text-blue-600 font-semibold animate-pulse">
              ⚡ Estableciendo relación sináptica...
            </div>
          )}
          
          {isClickable && !isCompleted && !isDraggedOver && (
            <div className="text-center text-blue-600 font-semibold text-sm">
              👆 Toca aquí para colocar el elemento seleccionado
            </div>
          )}
          
          {isCompleted && (
            <div className="text-center text-green-600 font-semibold">
              ✅ Conjunto completado exitosamente!
            </div>
          )}
          
          {!isDraggedOver && !isClickable && !isCompleted && (
            <div className="text-center text-gray-500 text-sm">
              Arrastra elementos aquí o selecciona uno primero
            </div>
          )}
        </div>

        {/* Indicador táctil para móviles */}
        {isClickable && !isCompleted && (
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bounce sm:hidden"></div>
        )}
      </div>
    </div>
  );
}