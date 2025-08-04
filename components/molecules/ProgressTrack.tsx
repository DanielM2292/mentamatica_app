"use client";
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { gsap } from 'gsap';

interface ProgressTrackProps {
  currentPosition: number; // 0 to 5
  level: number;
}

export const ProgressTrack: React.FC<ProgressTrackProps> = ({ currentPosition, level }) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      gsap.fromTo(trackRef.current,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  useEffect(() => {
    if (avatarRef.current) {
      const positions = [0, 20, 40, 60, 80, 100];
      gsap.to(avatarRef.current, {
        x: `${positions[currentPosition]}%`,
        duration: 0.8,
        ease: "power2.out"
      });

      if (currentPosition > 0) {
        gsap.to(avatarRef.current, {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      }
    }
  }, [currentPosition]);

  const getAvatarColor = () => {
    switch (level) {
      case 1: return 'bg-blue-400';
      case 2: return 'bg-purple-400';
      case 3: return 'bg-orange-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div ref={trackRef} className="w-full max-w-2xl mx-auto p-6">
      <h3 className="text-center text-lg font-bold text-purple-700 mb-4">
        ¡Ayuda al explorador a llegar a la meta! 🎯
      </h3>
      
      {/* Pista */}
      <div className="relative h-20 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-full border-4 border-brown-300 shadow-lg overflow-hidden">
        {/* Secciones de la pista */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`absolute top-0 h-full w-1/5 border-r-2 border-brown-300 flex items-center justify-center ${
              index < currentPosition ? 'bg-green-300' : ''
            }`}
            style={{ left: `${index * 20}%` }}
          >
            <Star 
              className={`w-6 h-6 ${
                index < currentPosition 
                  ? 'text-yellow-500 fill-yellow-400' 
                  : 'text-gray-400'
              }`} 
            />
          </div>
        ))}
        
        {/* Meta */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🏁</span>
          </div>
        </div>
        
        {/* Avatar */}
        <div 
          ref={avatarRef}
          className="absolute top-1/2 transform -translate-y-1/2 transition-transform duration-300"
          style={{ left: '0%' }}
        >
          <Avatar className={`w-12 h-12 border-3 border-white shadow-lg ${getAvatarColor()}`}>
            <AvatarFallback className="text-white font-bold text-lg">
              🚀
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      {/* Indicador de progreso */}
      <div className="text-center mt-4">
        <span className="text-sm font-semibold text-gray-600">
          Progreso: {currentPosition}/5
        </span>
      </div>
    </div>
  );
};