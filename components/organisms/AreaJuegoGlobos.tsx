import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Target, Trophy } from 'lucide-react';

interface Balloon {
  id: string;
  number: number;
  x: string;
  y: string;
  color: string;
  isPopped: boolean;
  isClickable: boolean;
  isExploding?: boolean;
}

interface AreaJuegoGlobosProps {
  balloons: Balloon[];
  nextExpectedNumber: number;
  isGameActive: boolean;
  isLevelComplete?: boolean; // NUEVO: Estado del nivel
  balloonsPopped?: number;   // NUEVO: Contador de globos reventados
  totalBalloons?: number;    // NUEVO: Total de globos en el nivel
  onBalloonPop: (balloonId: string) => void;
  gameContainerRef: React.RefObject<HTMLDivElement>;
}

const BalloonComponent: React.FC<{
  balloon: Balloon;
  isGameActive: boolean;
  onPop: (balloonId: string) => void;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  totalBalloons: number;
  nextExpectedNumber: number;
  isLevelComplete: boolean;
}> = ({ balloon, isGameActive, onPop, screenSize, totalBalloons, nextExpectedNumber, isLevelComplete }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGameActive && balloon.isClickable && !balloon.isPopped && !balloon.isExploding && !isLevelComplete) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onPop(balloon.id);
    }
  };

  // Determinar si este globo es el siguiente esperado - SOLO SI EL NIVEL NO ESTÁ COMPLETO
  const isNextExpected = !isLevelComplete && balloon.number === nextExpectedNumber;

  // Improved responsive sizing system
  const getSizeClasses = () => {
    const isHighDensity = totalBalloons > 15;
    const isMediumDensity = totalBalloons > 10;
    
    switch (screenSize) {
      case 'xs': // < 480px
        return {
          balloon: isHighDensity ? 'w-8 h-10' : isMediumDensity ? 'w-10 h-12' : 'w-12 h-16',
          font: isHighDensity ? 'text-xs' : isMediumDensity ? 'text-sm' : 'text-base',
          icon: isHighDensity ? 'w-3 h-3' : 'w-4 h-4',
          highlight: isHighDensity ? 'w-1.5 h-2' : 'w-2 h-3',
          string: isHighDensity ? 'h-2' : 'h-3'
        };
      case 'sm': // 480px - 640px
        return {
          balloon: isHighDensity ? 'w-10 h-12' : isMediumDensity ? 'w-14 h-18' : 'w-16 h-20',
          font: isHighDensity ? 'text-sm' : isMediumDensity ? 'text-base' : 'text-lg',
          icon: isHighDensity ? 'w-4 h-4' : 'w-5 h-5',
          highlight: isHighDensity ? 'w-2 h-3' : 'w-3 h-4',
          string: isHighDensity ? 'h-3' : 'h-4'
        };
      case 'md': // 640px - 768px
        return {
          balloon: isHighDensity ? 'w-12 h-16' : isMediumDensity ? 'w-18 h-22' : 'w-20 h-24',
          font: isHighDensity ? 'text-base' : isMediumDensity ? 'text-lg' : 'text-xl',
          icon: 'w-5 h-5',
          highlight: isHighDensity ? 'w-3 h-4' : 'w-4 h-5',
          string: isHighDensity ? 'h-4' : 'h-5'
        };
      case 'lg': // 768px - 1024px
        return {
          balloon: isHighDensity ? 'w-16 h-20' : isMediumDensity ? 'w-20 h-24' : 'w-24 h-32',
          font: isHighDensity ? 'text-lg' : isMediumDensity ? 'text-xl' : 'text-2xl',
          icon: 'w-6 h-6',
          highlight: isHighDensity ? 'w-4 h-5' : 'w-5 h-6',
          string: isHighDensity ? 'h-5' : 'h-6'
        };
      default: // xl: >= 1024px
        return {
          balloon: isHighDensity ? 'w-20 h-24' : isMediumDensity ? 'w-24 h-32' : 'w-28 h-36',
          font: isHighDensity ? 'text-xl' : isMediumDensity ? 'text-2xl' : 'text-3xl',
          icon: 'w-7 h-7',
          highlight: isHighDensity ? 'w-5 h-6' : 'w-6 h-8',
          string: isHighDensity ? 'h-6' : 'h-8'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <div
      id={balloon.id}
      className={`balloon absolute select-none transition-all duration-300 ease-out ${
        balloon.isClickable && !isLevelComplete ? 'cursor-pointer z-20' : 'cursor-default z-10'
      } ${balloon.isPopped ? 'opacity-0 pointer-events-none scale-0' : ''} ${
        balloon.isExploding ? 'animate-explode' : ''
      } ${isPressed ? 'scale-110' : balloon.isClickable && !isLevelComplete ? 'hover:scale-105 active:scale-110' : ''}`}
      style={{
        left: balloon.x,
        top: balloon.y,
        transform: 'translate(-50%, -50%)',
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchEnd={(e) => e.preventDefault()}
    >
      <div className="relative">
        {/* Main balloon */}
        <div
          className={`${sizeClasses.balloon} rounded-full relative shadow-lg transition-all duration-500 ease-out ${
            isNextExpected 
              ? 'ring-2 ring-yellow-400 ring-opacity-90 shadow-yellow-400/50' 
              : 'shadow-black/20'
          }`}
          style={{
            background: isNextExpected
              ? `radial-gradient(circle at 30% 30%, ${balloon.color}ff, ${balloon.color}cc, ${balloon.color}aa)`
              : `radial-gradient(circle at 30% 30%, ${balloon.color}dd, ${balloon.color}aa, ${balloon.color}88)`,
            filter: isNextExpected
              ? 'brightness(1.2) saturate(1.4) drop-shadow(0 4px 20px rgba(255,215,0,0.5))'
              : isLevelComplete 
                ? 'brightness(0.6) saturate(0.6) drop-shadow(0 2px 10px rgba(0,0,0,0.1))'
                : 'brightness(0.9) saturate(0.8) drop-shadow(0 2px 10px rgba(0,0,0,0.2))',
            animation: isNextExpected
              ? 'gentleBounce 1.5s ease-in-out infinite'
              : 'gentleFloat 3s ease-in-out infinite',
          }}
        >
          {/* Highlight */}
          <div
            className={`absolute ${sizeClasses.highlight} bg-white bg-opacity-70 rounded-full blur-sm`}
            style={{ top: '20%', left: '30%' }}
          />

          {/* Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`${sizeClasses.font} font-bold text-white drop-shadow-lg transition-all duration-300 ${
                isNextExpected ? 'animate-pulse' : ''
              }`}
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)',
              }}
            >
              {balloon.number}
            </span>
          </div>

          {/* Active indicators - solo para el siguiente número esperado Y si el nivel no está completo */}
          {isNextExpected && (
            <>
              <div className="absolute -top-1 -right-1 animate-spin">
                <Sparkles className={`${sizeClasses.icon} text-yellow-300`} />
              </div>
              <div className="absolute -bottom-1 -left-1">
                <Target className={`${sizeClasses.icon} text-red-400 animate-pulse`} />
              </div>
            </>
          )}
        </div>

        {/* Balloon string */}
        <div
          className={`absolute left-1/2 top-full w-0.5 ${sizeClasses.string} bg-gradient-to-b from-gray-600 to-gray-800 transform -translate-x-1/2`}
        />

        {/* String knot */}
        <div
          className={`absolute left-1/2 top-full transform -translate-x-1/2 translate-y-${sizeClasses.string.split('-')[1]} w-1.5 h-1.5 bg-gray-800 rounded-full`}
        />
      </div>
    </div>
  );
};

const AreaJuegoGlobos: React.FC<AreaJuegoGlobosProps> = ({
  balloons,
  nextExpectedNumber,
  isGameActive,
  isLevelComplete = false, // VALOR POR DEFECTO
  balloonsPopped = 0,      // VALOR POR DEFECTO
  totalBalloons,           // CALCULADO DINÁMICAMENTE SI NO SE PROPORCIONA
  onBalloonPop,
  gameContainerRef,
}) => {
  const [screenSize, setScreenSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('lg');

  // CALCULAR TOTAL DE GLOBOS SI NO SE PROPORCIONA
  const calculatedTotalBalloons = totalBalloons || balloons.length;

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 480) setScreenSize('xs');
      else if (width < 640) setScreenSize('sm');
      else if (width < 768) setScreenSize('md');
      else if (width < 1024) setScreenSize('lg');
      else setScreenSize('xl');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Enhanced responsive container height
  const getContainerHeight = () => {
    switch (screenSize) {
      case 'xs': return 'h-[50vh] min-h-[300px] max-h-[400px]';
      case 'sm': return 'h-[55vh] min-h-[350px] max-h-[500px]';
      case 'md': return 'h-[60vh] min-h-[400px] max-h-[600px]';
      case 'lg': return 'h-[65vh] min-h-[450px] max-h-[700px]';
      default: return 'h-[70vh] min-h-[500px] max-h-[800px]';
    }
  };

  // DETERMINAR QUÉ MOSTRAR EN LA INFORMACIÓN DE DEBUG
  const getDisplayInfo = () => {
    if (isLevelComplete) {
      return {
        status: "¡COMPLETADO!",
        nextNumber: "✓",
        progress: `${balloonsPopped}/${calculatedTotalBalloons}`
      };
    } else {
      return {
        status: "En progreso",
        nextNumber: nextExpectedNumber,
        progress: `${balloonsPopped}/${calculatedTotalBalloons}`
      };
    }
  };

  const displayInfo = getDisplayInfo();

  return (
    <div className={`relative w-full ${getContainerHeight()} bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30`}>
      {/* Debug info mejorada - hidden on small screens */}
      {screenSize !== 'xs' && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-50">
          Progreso: {displayInfo.progress} | Siguiente: {displayInfo.nextNumber} | Estado: {displayInfo.status} | Pantalla: {screenSize}
        </div>
      )}

      {/* Enhanced background clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(screenSize === 'xs' ? 4 : 6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white bg-opacity-40 rounded-full"
            style={{
              width: `${screenSize === 'xs' ? 10 + Math.random() * 15 : 15 + Math.random() * 20}px`,
              height: `${screenSize === 'xs' ? 5 + Math.random() * 8 : 8 + Math.random() * 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animation: `cloudFloat ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced sun */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <div className={`${
          screenSize === 'xs' ? 'w-6 h-6' : screenSize === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
        } bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg animate-spin-slow`}>
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80" />
        </div>
      </div>

      {/* INSTRUCCIONES MEJORADAS */}
      {isGameActive && !isLevelComplete && nextExpectedNumber <= 3 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full shadow-lg font-bold ${
            screenSize === 'xs' ? 'text-xs' : 'text-sm'
          } flex items-center space-x-2`}>
            <Sparkles className={screenSize === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} />
            <span>¡Busca el {nextExpectedNumber}!</span>
          </div>
        </div>
      )}

      {/* MENSAJE DE NIVEL COMPLETADO */}
      {isLevelComplete && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
          <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg font-bold ${
            screenSize === 'xs' ? 'text-xs' : 'text-sm'
          } flex items-center space-x-2 animate-pulse`}>
            <Trophy className={screenSize === 'xs' ? 'w-3 h-3' : 'w-4 h-4'} />
            <span>¡Nivel Completado! 🎉</span>
          </div>
        </div>
      )}

      {/* Game area */}
      <div
        ref={gameContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          touchAction: 'manipulation',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        {balloons.map((balloon) => (
          <BalloonComponent
            key={balloon.id}
            balloon={balloon}
            isGameActive={isGameActive}
            onPop={onBalloonPop}
            screenSize={screenSize}
            totalBalloons={calculatedTotalBalloons}
            nextExpectedNumber={nextExpectedNumber}
            isLevelComplete={isLevelComplete}
          />
        ))}
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
        
        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(12px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes explode {
          0% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            filter: brightness(1);
          }
          25% { 
            transform: translate(-50%, -50%) scale(1.4) rotate(90deg);
            filter: brightness(1.8) saturate(2);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.8) rotate(180deg);
            filter: brightness(2.5) saturate(3);
          }
          75% { 
            transform: translate(-50%, -50%) scale(2.2) rotate(270deg);
            filter: brightness(3) saturate(4);
            opacity: 0.7;
          }
          100% { 
            transform: translate(-50%, -50%) scale(2.6) rotate(360deg);
            filter: brightness(4) saturate(5);
            opacity: 0;
          }
        }

        @keyframes errorShake {
          0%, 100% { transform: translate(-50%, -50%) translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-50%, -50%) translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translate(-50%, -50%) translateX(10px); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-explode {
          animation: explode 0.5s ease-out forwards;
        }

        /* Enhanced touch responsiveness */
        @media (hover: none) and (pointer: coarse) {
          .balloon:active {
            transform: scale(1.15) translate(-50%, -50%) !important;
            transition: transform 0.1s ease-out !important;
          }
        }

        /* Better visibility on very small screens */
        @media (max-width: 480px) {
          .balloon {
            filter: brightness(1.1) saturate(1.2);
          }
        }

        /* Improved performance on mobile */
        @media (max-width: 768px) {
          .balloon {
            will-change: transform;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        }

        /* Ensure balloons are properly sized on large screens */
        @media (min-width: 1024px) {
          .balloon {
            filter: brightness(1.05) saturate(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default AreaJuegoGlobos;