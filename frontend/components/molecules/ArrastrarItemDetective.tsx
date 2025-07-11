"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { UnifiedGameItem } from '@/types/gameTypes';

interface DraggableItemProps {
  item: UnifiedGameItem;
  onDragStart: (item: UnifiedGameItem) => void;
  isPreview?: boolean;
}

export function ArrastrarItemDetective({ item, onDragStart, isPreview = false }: DraggableItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  // Vista en modo pista (sin interacción)
  if (isPreview) {
    return (
      <div
        className={`
          ${item.color}
          p-4 rounded-2xl border-2 border-gray-200 shadow-md
          flex flex-col items-center gap-2
          cursor-default opacity-90 scale-95
        `}
      >
        <div className="relative w-8 h-8">
          <Image
            src={item.icon}
            alt={item.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <span className="text-sm font-semibold text-gray-700 text-center">
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
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: Math.random() * 0.5 }
    );

    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(itemRef.current, {
      x: 10,
      y: -10,
      rotation: 5,
      duration: 1.2,
      ease: "power2.inOut"
    });
    tl.to(itemRef.current, {
      x: -10,
      y: 10,
      rotation: -5,
      duration: 1.2,
      ease: "power2.inOut"
    });

    gsap.to(itemRef.current, {
      boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut"
    });
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(item);
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'move';

    gsap.to(itemRef.current, {
      scale: 1.2,
      rotation: 15,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    gsap.to(itemRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        ${item.color}
        p-4 rounded-2xl border-2 border-gray-200 shadow-md cursor-move 
        hover:shadow-lg hover:border-blue-300
        flex flex-col items-center gap-2
        select-none
      `}
    >
      <div ref={iconRef} className="relative w-8 h-8">
        <Image
          src={item.icon}
          alt={item.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 text-center">
        {item.name}
      </span>
    </div>
  );
}
