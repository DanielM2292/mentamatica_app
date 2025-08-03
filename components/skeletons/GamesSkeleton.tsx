"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { GameHeaderSkeleton } from './GameHeaderSkeleton';
import { InformacionNivelSkeleton } from '@/components/skeletons/InformacionNivelSkeleton';
import { AreaJuegoSkeleton } from '@/components/skeletons/AreaJuegoSkeleton';

export function GamesSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();
    
    // Animación de entrada escalonada
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animación del temporizador
    if (timerRef.current) {
      gsap.fromTo(timerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto pt-4" ref={containerRef}>
        <GameHeaderSkeleton />
        <InformacionNivelSkeleton />
        <AreaJuegoSkeleton />
      </div>
    </div>
  );
}