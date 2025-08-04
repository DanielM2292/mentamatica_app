"use client";
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { gsap } from 'gsap';

interface ValidateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isCorrect?: boolean | null;
}

export const ValidateButton: React.FC<ValidateButtonProps> = ({ 
  onClick, 
  disabled, 
  isCorrect 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "bounce.out",
          delay: 0.3
        }
      );
    }
  }, []);

  const handleClick = () => {
    if (buttonRef.current && !disabled) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
    onClick();
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg"
    >
      {isCorrect === true ? (
        <Check className="w-6 h-6 mr-2" />
      ) : isCorrect === false ? (
        <X className="w-6 h-6 mr-2" />
      ) : null}
      Validar
    </Button>
  );
};