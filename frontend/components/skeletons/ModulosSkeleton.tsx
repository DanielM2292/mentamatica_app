"use client"

import React from "react";
import { ModulosHeaderSkeleton } from "./ModulosHeaderSkeleton";
import { ModulosVideoSkeleton } from "./ModulosVideoSkeleton";
import { ModulosActivitiesSkeleton } from "./ModulosActivitiesSkeleton";
import { ModulosFunFactSkeleton } from "./ModulosFunFactSkeleton";
import { ModulosProgressSkeleton } from "./ModulosProgressSkeleton";

export function ModulosSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo animados */}
      <div className="absolute inset-0 pointer-events-none hidden xs:block">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 ${
              ["bg-pink-200", "bg-purple-200", "bg-rose-200", "bg-fuchsia-200"][
                i % 4
              ]
            } rounded-full opacity-20 flex items-center justify-center text-xs sm:text-sm font-bold animate-float`}
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {["∪", "∩", "⊂", "{ }"][i % 4]}
          </div>
        ))}
      </div>

      <ModulosHeaderSkeleton />
      
      <div className="max-w-6xl mx-auto p-3 sm:p-6 relative z-10">
        <ModulosVideoSkeleton />
        <ModulosActivitiesSkeleton />
        <ModulosProgressSkeleton />
        <ModulosFunFactSkeleton />
      </div>

      {/* Animaciones CSS personalizadas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-opacity {
          animation: pulse-opacity 1.5s ease-in-out infinite;
        }
        
        .animate-shine {
          animation: shine 2s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse-opacity,
          .animate-shine {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}