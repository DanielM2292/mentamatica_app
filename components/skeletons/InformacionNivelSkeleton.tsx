import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function InformacionNivelSkeleton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animación de entrada
    gsap.fromTo(containerRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Animación de pulso para los elementos de texto
    gsap.to([titleRef.current, descriptionRef.current], {
      opacity: 0.6,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-200 opacity-0"
    >
      <div className="flex items-center justify-between">
        <div className="w-full">
          {/* Título del nivel - Skeleton */}
          <div 
            ref={titleRef}
            className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"
          ></div>
          
          {/* Descripción - Skeleton */}
          <div 
            ref={descriptionRef}
            className="space-y-2"
          >
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}