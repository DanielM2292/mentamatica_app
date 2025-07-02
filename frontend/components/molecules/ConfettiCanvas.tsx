'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiCanvas = () => {
  useEffect(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default ConfettiCanvas;
