"use client";
import { useState, useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';

interface GameSet {
  id: string;
  name: string;
  color: string;
  icon: any;
}

interface DropZoneProps {
  set: GameSet;
  onDrop: (setId: string) => void;
  isCompleted: boolean;
  itemCount: number;
}

export default function DropZone ({ set, onDrop, isCompleted, itemCount }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGSVGElement>(null);
  const synapticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current) return;

    // Animación de entrada
    gsap.fromTo(zoneRef.current, 
      { 
        scale: 0.8, 
        opacity: 0,
        rotateY: 90
      },
      { 
        scale: 1, 
        opacity: 1, 
        rotateY: 0,
        duration: 0.6, 
        ease: "power2.out",
        delay: 0.2
      }
    );

    // Animación de flujo sináptico continuo
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
      // Animación de éxito
      gsap.fromTo(checkRef.current, 
        { 
          scale: 0, 
          rotation: -180,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          duration: 0.8, 
          ease: "elastic.out(1, 0.5)"
        }
      );

      // Efecto de celebración en la zona completa
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

  const handleDragOver = (e: React.DragEvent) => {
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
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
    
    if (zoneRef.current) {
      gsap.to(zoneRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(set.id);
    
    // Animación de recepción exitosa
    if (zoneRef.current) {
      gsap.to(zoneRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
    
    console.log('Drop en DropZone:', set.id);
  };

  const IconComponent = set.icon;

  return (
    <div
      ref={zoneRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        ${set.color}
        ${isCompleted ? 'border-yellow-400 bg-yellow-50' : ''}
        p-6 rounded-2xl border-2 min-h-[120px]
        transition-colors duration-300
        relative overflow-hidden
      `}
    >
      {/* Efecto de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div ref={synapticRef} className="h-1 bg-current w-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <IconComponent className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-800">
              {set.name}
            </h3>
          </div>
          
          {isCompleted && (
            <CheckCircle ref={checkRef} className="w-6 h-6 text-green-500" />
          )}
          
          <div className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
            {itemCount} elementos
          </div>
        </div>
        
        {isDragOver && (
          <div className="text-center text-blue-600 font-semibold">
            ⚡ Estableciendo relacion...
          </div>
        )}
        
        {isCompleted && (
          <div className="text-center text-green-600 font-semibold">
            ✅ Conjunto completado exitosamente!
          </div>
        )}
      </div>
    </div>
  );
};
