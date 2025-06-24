"use client";
import { Shapes, Trophy, Target } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ProgressBar } from '../atoms';

interface GameHeaderProps {
  score: number;
  completedSets: number;
  totalSets: number;
  level?: number;
  totalScore?: number;
}

export default function GameHeader({ score, completedSets, totalSets, level = 1, totalScore = 0 }: GameHeaderProps) {
  const progress = (completedSets / totalSets) * 100;
  const headerRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<SVGSVGElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!headerRef.current || !brainRef.current) return;

    // Animación de entrada del header
    gsap.fromTo(headerRef.current,
      {
        y: -100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "bounce.out"
      }
    );

    // Animación de pulso continuo
    gsap.to(brainRef.current, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  useEffect(() => {
    // Animación de la barra de progreso
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 1,
        ease: "power2.out"
      });
    }
  }, [progress]);

  useEffect(() => {
    // Animación del score cuando cambia
    if (scoreRef.current) {
      gsap.fromTo(scoreRef.current,
        {
          scale: 1.3,
          color: "#f59e0b"
        },
        {
          scale: 1,
          color: "#92400e",
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }, [score]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);



  return (
    <div ref={headerRef} className="bg-white rounded-3xl p-6 mb-8 shadow-xl border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl">
            <Shapes ref={brainRef} className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Clasifica y Agrupa - Nivel {level}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={`flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200 transition-all duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
            style={{ animationDelay: "0.5s" }}
          >
            <Trophy className="w-5 h-5 text-yellow-600 animate-pulse" />
            <span ref={scoreRef} className="font-bold text-yellow-800">{score} puntos</span>
          </div>

          <div
            className={`flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200 transition-all duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
            style={{ animationDelay: "0.6s" }}
          >
            <Trophy className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="font-bold text-green-800">Total: {totalScore} puntos</span>
          </div>

          <div
            className={`flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 transition-all duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
            style={{ animationDelay: "0.7s" }}
          >
            <Target className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="font-bold text-blue-800">
              {completedSets}/{totalSets} conjuntos
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
`}</style>


      <ProgressBar
        progress={(completedSets / totalSets) * 100}
        size="lg"
        showLabel={true}
        className="mt-6"
      />
    </div>
  );
};