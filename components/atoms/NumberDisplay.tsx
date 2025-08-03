"use client";
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface NumberDisplayProps {
  number: number;
  className?: string;
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({ number, className }) => {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (numberRef.current) {
      gsap.fromTo(numberRef.current, 
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
          ease: "bounce.out"
        }
      );
    }
  }, [number]);

  return (
    <div 
      ref={numberRef}
      className={cn(
        "w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg",
        className
      )}
    >
      {number}
    </div>
  );
};