"use client";
import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface InputAnswerProps {
  value: string;
  onChange: (value: string) => void;
  isCorrect?: boolean | null;
  disabled?: boolean;
}

export const InputAnswer: React.FC<InputAnswerProps> = ({ 
  value, 
  onChange, 
  isCorrect, 
  disabled 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      gsap.fromTo(inputRef.current,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isCorrect !== null && inputRef.current) {
      if (isCorrect) {
        gsap.to(inputRef.current, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        });
      } else {
        gsap.to(inputRef.current, {
          keyframes: [
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: -10, duration: 0.1 },
            { x: 10, duration: 0.1 },
            { x: 0, duration: 0.1 }
          ],
          ease: "power2.out"
        });
      }
    }
  }, [isCorrect]);

  return (
    <div className="flex justify-center">
      <Input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="?"
        className={cn(
          "relative w-24 h-16 text-center text-2xl font-bold rounded-xl border-4 transition-colors",
          isCorrect === true && "border-green-400 bg-green-50",
          isCorrect === false && "border-red-400 bg-red-50",
          isCorrect === null && "border-purple-400 bg-purple-50"
        )}
      />
    </div>
  );
};