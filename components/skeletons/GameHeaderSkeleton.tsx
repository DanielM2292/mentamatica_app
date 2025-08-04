"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export function GameHeaderSkeleton() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(headerRef.current,
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "elastic.out(1, 0.5)" 
      }
    );
  }, []);

  return (
    <div 
      ref={headerRef}
      className="bg-white rounded-3xl p-6 mb-8 shadow-xl border border-gray-200 opacity-0"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Sección izquierda - Título y navegación */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Botón de volver */}
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex items-center justify-center"></div>

          {/* Icono del módulo */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-xl animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-pink-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Título y nivel */}
          <div className="flex-1 min-w-[180px] sm:min-w-[220px]">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>

        {/* Sección derecha - Puntuación */}
        <div className="flex items-center gap-3 p-2">
          {/* Aciertos */}
          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200"><div className="h-5 bg-yellow-100 rounded w-16 animate-pulse"></div>
          </div>

          {/* Errores */}
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200"><div className="h-5 bg-green-100 rounded w-16 animate-pulse"></div>
          </div>

          {/* Conjuntos completados */}
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200"><div className="h-5 bg-blue-100 rounded w-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
}