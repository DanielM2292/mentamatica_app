"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

const GamesTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Crear elementos flotantes - menos en móvil
    const elementsCount = window.innerWidth < 768 ? 6 : 12;
    const elements = Array.from({ length: elementsCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: i % 3 === 0 ? "+" : i % 3 === 1 ? `${Math.floor(Math.random() * 9) + 1}` : "=",
      color: ["bg-green-200", "bg-emerald-200", "bg-lime-200", "bg-teal-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingElements(elements);

    // Animación de elementos flotantes
    if (floatingElementsRef.current) {
      const floatingEls = floatingElementsRef.current.children;
      gsap.fromTo(floatingEls,
        { scale: 0, rotation: 0 },
        { 
          scale: 1, 
          rotation: 360, 
          duration: 1, 
          stagger: 0.1, 
          ease: "elastic.out(1, 0.3)",
          delay: 0.5
        }
      );

      // Animación continua de flotación
      gsap.to(floatingEls, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });
    }

    // Animación de entrada del contenido principal
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden" ref={containerRef}>
      {/* Elementos flotantes de fondo */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none hidden xs:block">
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${item.color} rounded-full opacity-20 flex items-center justify-center text-green-800 font-bold text-xs sm:text-sm`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Burbujas de símbolos matemáticos - reducidas en móvil */}
      <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-green-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-xl sm:text-4xl font-bold text-green-600">
        +
      </div>
      <div className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-2xl font-bold text-emerald-600">
        2+3
      </div>
      <div className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-lime-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-3xl font-bold text-lime-600">
        =5
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GamesTemplate;