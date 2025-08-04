import { useEffect, useRef } from "react";
import gsap from "gsap";

interface EstrellasFinalesProps {
  estrellas: number;
  onFinish: () => void;
}

export default function EstrellasFinales({ estrellas, onFinish }: EstrellasFinalesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const estrellasRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Crear monedas cayendo
    const createCoins = () => {
      for (let i = 0; i < 10; i++) {
        const coin = document.createElement('span');
        coin.innerHTML = '🪙';
        coin.style.position = 'absolute';
        coin.style.fontSize = '1.5rem';
        coin.style.left = Math.random() * 100 + '%';
        coin.style.top = '-50px';
        coin.style.zIndex = '40';
        coin.style.pointerEvents = 'none';
        
        containerRef.current?.appendChild(coin);
        
        gsap.to(coin, {
          y: window.innerHeight + 100,
          rotation: 720,
          duration: 2 + Math.random() * 2,
          ease: "power2.in",
          delay: Math.random() * 0.5,
          onComplete: () => coin.remove()
        });
      }
    };

    // Animación de entrada del fondo
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animación secuencial de estrellas
    estrellasRefs.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { scale: 0, rotation: -180 },
          {
            scale: 1.5,
            rotation: 0,
            duration: 0.6,
            delay: i * 0.3,
            ease: "back.out(1.7)",
          }
        );
        gsap.to(el, {
          scale: 1,
          rotation: 360,
          duration: 0.3,
          delay: i * 0.3 + 0.6,
          ease: "bounce.out",
        });
      }
    });

    // Iniciar monedas
    createCoins();
    const coinInterval = setInterval(createCoins, 800);

    // Ocultar después de 3.5 segundos
    const timer = setTimeout(() => {
      clearInterval(coinInterval);
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onFinish,
      });
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(coinInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 flex flex-col items-center justify-center z-50 overflow-hidden"
    >
      <h2 className="text-5xl sm:text-6xl font-bold text-pink-700 mb-6 animate-bounce">
        ¡Excelente trabajo! 🌟
      </h2>
      <div className="flex gap-6">
        {Array.from({ length: estrellas }).map((_, i) => (
          <span
            key={i}
            ref={(el) => { estrellasRefs.current[i] = el; }}
            className="text-yellow-500 text-7xl sm:text-8xl drop-shadow-lg animate-pulse"
          >
            ⭐
          </span>
        ))}
      </div>
      <div className="absolute inset-0 bg-opacity-30 bg-white animate-pulse" />
    </div>
  );
}