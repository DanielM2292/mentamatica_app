"use client";
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { GameItem } from '@/public/data/conjuntos/gameLevels';
import { UnifiedGameItem } from '@/types/gameTypes';

interface DraggableItemProps {
  item: GameItem;
  onDragStart: (item: GameItem) => void;
}

export function ArrastrarItem({ item, onDragStart }: DraggableItemProps) {
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !iconRef.current) return;

    // Animación inicial del contenedor
    gsap.fromTo(itemRef.current,
      { scale: 0, opacity: 0, rotation: -180 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: Math.random() * 0.5 }
    );

    // Pulso continuo en el ícono
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Animación de flotación suave
    gsap.to(itemRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: Math.random() * 2
    });
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(item);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(item));

    // Animación durante el arrastre
    gsap.to(itemRef.current, {
      scale: 1.2,
      rotation: 15,
      opacity: 0.8,
      duration: 0.3,
      ease: "power2.out"
    });

    console.log('DragStart en DraggableItem:', item.name);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Regresa a estado inicial
    gsap.to(itemRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)"
    });

    console.log('DragEnd en DraggableItem:', item.name);
  };

  const handleMouseEnter = () => {
    if (!isDragging && itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging && itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
