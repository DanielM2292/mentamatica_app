"use client";
import React, { useEffect, useRef } from 'react';
import { NumberDisplay } from '../atoms/NumberDisplay';
import { Plus, Equal } from 'lucide-react';
import { gsap } from 'gsap';

interface SumDisplayProps {
  number1: number;
  number2: number;
  result: number;
}

export const SumDisplay: React.FC<SumDisplayProps> = ({ number1, number2, result }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<SVGSVGElement>(null);
  const equalRef = useRef<SVGSVGElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "bounce.out"
        }
      );
    }

    if (plusRef.current) {
      gsap.fromTo(plusRef.current,
        {
          scale: 0,
          rotation: 180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "back.out(1.7)"
        }
      );
    }

    if (equalRef.current) {
      gsap.fromTo(equalRef.current,
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.6,
          ease: "back.out(1.7)"
        }
      );
    }

    if (questionRef.current) {
      gsap.fromTo(questionRef.current,
        {
          scale: 0
        },
        {
          scale: 1,
          duration: 0.8,
          delay: 0.9,
          ease: "elastic.out(1, 0.3)"
        }
      );

      gsap.to(questionRef.current, {
        scale: 1.1,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }
  }, [number1, number2]);

  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center gap-4 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg"
    >
      <NumberDisplay number={number1} />
      <Plus ref={plusRef} className="w-8 h-8 text-purple-600" />
      <NumberDisplay number={number2} />
      <Equal ref={equalRef} className="w-8 h-8 text-purple-600" />
      <div 
        ref={questionRef}
        className="w-16 h-16 rounded-full border-4 border-dashed border-purple-400 flex items-center justify-center text-purple-600 text-xl font-bold"
      >
        ?
      </div>
    </div>
  );
};