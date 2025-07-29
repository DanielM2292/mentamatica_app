"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function AreaJuegoSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZonesRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animación de entrada escalonada
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    // Animación de los drop zones
    if (dropZonesRef.current) {
      gsap.fromTo(dropZonesRef.current.children,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)"
        }
      );
    }

    // Animación de los items
    if (itemsRef.current) {
      gsap.fromTo(itemsRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.5,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="grid lg:grid gap-8 opacity-0">
      {/* Área de elementos arrastrables - Skeleton */}
      <div className="space-y-10">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
          
          <div ref={itemsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center animate-pulse">
                <div className="w-3/4 h-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}