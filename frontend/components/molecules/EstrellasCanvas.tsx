import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const EstrellasCanvas = ({ 
  spread = 360,
  ticks = 50,
  gravity = 0,
  decay = 0.94,
  startVelocity = 30,
  colors = ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  particleCount = 40,
  scalar = 1.2,
  shapes = ['star'],
  repeatCount = 3,
  delayBetween = 100
}) => {
  useEffect(() => {
    const defaults = { spread, ticks, gravity, decay, startVelocity, colors };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount,
        scalar,
        shapes: shapes as confetti.Shape[]
      });

      // Opcional: disparar un segundo tipo de partículas
      if (shapes.includes('star') && shapes.includes('circle')) {
        confetti({
          ...defaults,
          particleCount: Math.floor(particleCount / 4),
          scalar: scalar * 0.75,
          shapes: ['circle']
        });
      }
    };

    // Disparar varias veces con retraso
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < repeatCount; i++) {
      timeouts.push(setTimeout(shoot, i * delayBetween));
    }

    // Limpieza
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [spread, ticks, gravity, decay, startVelocity, colors, particleCount, scalar, shapes, repeatCount, delayBetween]);

  return null;
};

export default EstrellasCanvas;
