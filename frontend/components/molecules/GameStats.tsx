"use client";
import React, { useEffect, useRef } from 'react';
import { Heart, Trophy, Target } from 'lucide-react';
import { gsap } from 'gsap';

interface GameStatsProps {
  level: number;
  correctAnswers: number;
  errors: number;
  totalQuestions: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ 
  level, 
  correctAnswers, 
  errors, 
  totalQuestions 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        {
          y: -30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, []);

  useEffect(() => {
    if (levelRef.current) {
      gsap.to(levelRef.current, {
        scale: 1.2,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  }, [level]);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
  }, [correctAnswers]);

  useEffect(() => {
    if (errorsRef.current && errors > 0) {
      gsap.to(errorsRef.current, {
        keyframes: [
          { x: -5, duration: 0.1 },
          { x: 5, duration: 0.1 },
          { x: -5, duration: 0.1 },
          { x: 5, duration: 0.1 },
          { x: 0, duration: 0.1 }
        ],
        ease: "power2.out"
      });
    }
  }, [errors]);

  return (
    <div 
      ref={containerRef}
      className="flex justify-center gap-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow-md"
    >
      <div ref={levelRef} className="flex items-center gap-2 text-blue-600">
        <Trophy className="w-6 h-6" />
        <span className="font-bold">Nivel {level}</span>
      </div>
      <div ref={progressRef} className="flex items-center gap-2 text-green-600">
        <Target className="w-6 h-6" />
        <span className="font-bold">{correctAnswers}/{totalQuestions}</span>
      </div>
      <div ref={errorsRef} className="flex items-center gap-2 text-red-500">
        <Heart className="w-6 h-6" />
        <span className="font-bold">Errores: {errors}</span>
      </div>
    </div>
  );
};