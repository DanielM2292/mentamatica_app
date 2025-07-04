import React, { useState, useEffect } from 'react';
import { useContadorEspacial } from '../hooks/useContadorEspacial';
import { Rocket, Target, ArrowUp, ArrowDown, CheckCircle, Heart, Star } from 'lucide-react';

// Mock components
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const Button = ({ children, onClick, disabled, className }: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  disabled?: boolean; 
  className?: string; 
}) => (
  <button onClick={onClick} disabled={disabled} className={className}>
    {children}
  </button>
);

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

const SpaceGame = () => {
  const {
    currentLevel,
    currentMissionIndex,
    currentValue,
    currentMission,
    aciertos,
    errores,
    estrellas,
    completedSets,
    totalAciertos,
    currentGameLevel,
    isLastLevel,
    isLevelComplete,
    isGameComplete,
    isGameActive,
    isMoving,
    gameContainerRef,
    moveUp,
    moveDown,
    handleNextLevel,
    handleRestart,
  } = useContadorEspacial();

  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());
  const [celebrationParticles, setCelebrationParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [showTutorial, setShowTutorial] = useState(true);

  // Animaciones de entrada
  useEffect(() => {
    setIsVisible(true);
    const elements = ["mission", "space-path", "controls"];
    elements.forEach((element, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, element]));
      }, index * 300);
    });
  }, []);

  // Celebración
  const createCelebration = () => {
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setCelebrationParticles(particles);
    setTimeout(() => setCelebrationParticles([]), 2000);
  };

  useEffect(() => {
    if (aciertos > 0) {
      createCelebration();
    }
  }, [aciertos]);

  const isAtTarget = currentValue === currentMission?.target;
  const canMoveUp = currentValue < 10;
  const canMoveDown = currentValue > 1;

  // Crear el camino espacial horizontal
  const createSpacePath = () => {
    const planets = [];
    for (let i = 1; i <= 10; i++) {
      const isCurrentPosition = i === currentValue;
      const isTarget = i === currentMission?.target;
      const leftPosition = ((i - 1) / 9) * 100; // Distribución horizontal

      planets.push(
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Planeta */}
          <div
            className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-500 ${
              isCurrentPosition
                ? "bg-yellow-400 border-yellow-600 text-yellow-900 scale-125 shadow-2xl animate-pulse-gentle"
                : isTarget
                  ? "bg-red-400 border-red-600 text-red-900 scale-110 shadow-xl animate-bounce-gentle"
                  : "bg-blue-300 border-blue-500 text-blue-800 hover:scale-105"
            }`}
          >
            {i}
            
            {/* Cohete en posición actual */}
            {isCurrentPosition && (
              <div className={`absolute -top-6 transition-all duration-1000 ${isMoving ? 'animate-rocket-move' : ''}`}>
                <Rocket className="w-6 h-6 text-yellow-600 animate-bounce" />
              </div>
            )}
            
            {/* Bandera en objetivo */}
            {isTarget && (
              <div className="absolute -top-6">
                <Target className="w-6 h-6 text-red-600 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* Número del planeta */}
          <div className="mt-1 text-xs font-bold text-gray-700">{i}</div>
        </div>
      );
    }
    return planets;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo espacial */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        {/* Estrellas */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Partículas de celebración */}
      {celebrationParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 text-3xl"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `celebration-float 2s ease-out forwards`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        >
          {["🎉", "⭐", "✨", "🌟"][particle.id % 4]}
        </div>
      ))}

      {/* Tutorial */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white border-4 border-blue-400 shadow-2xl max-w-md w-full">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Aventura Espacial!</h3>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  Tu cohete está en el <strong className="text-yellow-600">planeta {currentMission?.start}</strong>
                </p>
                <p>
                  Debe llegar al <strong className="text-red-600">planeta {currentMission?.target}</strong>
                </p>
                <div className="flex justify-center gap-4 my-6">
                  <div className="bg-green-100 p-3 rounded-xl border-2 border-green-400">
                    <ArrowUp className="w-8 h-8 text-green-600" />
                    <p className="text-sm font-bold text-green-700 mt-1">Subir</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-xl border-2 border-red-400">
                    <ArrowDown className="w-8 h-8 text-red-600" />
                    <p className="text-sm font-bold text-red-700 mt-1">Bajar</p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowTutorial(false)}
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-8 py-3 rounded-2xl font-bold transition-all duration-300"
              >
                ¡Despegar! 🚀
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes celebration-float {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          50% { transform: translateY(-60px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1.25); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.8; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes rocket-move {
          0% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(10px) rotate(5deg); }
          75% { transform: translateX(-10px) rotate(-5deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-rocket-move { animation: rocket-move 0.8s ease-in-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Header compacto */}
        <div className="flex justify-between items-center mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-white">Nivel {currentLevel + 1}</div>
            <div className="flex items-center gap-1">
              {Array.from({ length: estrellas }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="text-white">
            <span className="text-green-400 font-bold">{aciertos}</span> aciertos
          </div>
        </div>

        {/* Misión actual */}
        <Card
          className={`mb-6 bg-white/95 backdrop-blur-lg border-2 border-purple-300 ${
            animatedElements.has("mission") ? "animate-slide-up" : "opacity-0"
          }`}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <Rocket className="w-6 h-6 text-blue-600" />
                Misión Espacial
                <Target className="w-6 h-6 text-red-600" />
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-400">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="text-lg font-bold text-yellow-800">Posición:</div>
                  <div className="text-3xl font-bold text-yellow-900">{currentValue}</div>
                </div>

                <div className="bg-red-100 rounded-2xl p-4 border-2 border-red-400">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-lg font-bold text-red-800">Destino:</div>
                  <div className="text-3xl font-bold text-red-900">{currentMission?.target}</div>
                </div>
              </div>

              {/* Estado de la misión */}
              <div className="flex justify-center">
                {isAtTarget ? (
                  <Badge className="bg-green-500 text-white px-6 py-3 text-lg font-bold rounded-2xl flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    ¡MISIÓN CUMPLIDA! 🎉
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500 text-white px-6 py-3 text-lg font-bold rounded-2xl flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    ¡Sigue navegando!
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camino espacial horizontal */}
        <Card
          className={`mb-6 bg-white/95 backdrop-blur-lg border-2 border-blue-300 ${
            animatedElements.has("space-path") ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <div className="text-2xl">🌌</div>
                Ruta Espacial
                <div className="text-2xl">🛸</div>
              </h3>
              <p className="text-gray-600">Tu cohete 🚀 viaja entre planetas numerados</p>
            </div>

            {/* Camino horizontal */}
            <div className="relative h-20 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 rounded-2xl p-4 border-2 border-blue-200">
              {/* Línea de conexión */}
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full transform -translate-y-1/2"></div>
              
              {/* Planetas */}
              <div className="relative h-full">
                {createSpacePath()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controles */}
        <Card
          className={`bg-white/95 backdrop-blur-lg border-2 border-green-300 ${
            animatedElements.has("controls") ? "animate-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <div className="text-2xl">🎮</div>
                Controles de Navegación
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Botón SUBIR */}
              <button
                onClick={moveUp}
                disabled={!canMoveUp || isMoving}
                className={`group relative overflow-hidden p-6 rounded-2xl shadow-xl transform transition-all duration-300 border-4 text-white font-bold text-xl min-h-[120px] ${
                  !canMoveUp || isMoving
                    ? "opacity-50 cursor-not-allowed bg-gray-400 border-gray-300"
                    : "bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 border-green-300 hover:scale-105 active:scale-95"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <ArrowUp className="w-12 h-12" />
                  <div className="text-2xl font-bold">SUBIR</div>
                  <div className="text-sm opacity-90">
                    Al planeta: <span className="font-bold text-lg">{currentValue + 1}</span>
                  </div>
                </div>
              </button>

              {/* Botón BAJAR */}
              <button
                onClick={moveDown}
                disabled={!canMoveDown || isMoving}
                className={`group relative overflow-hidden p-6 rounded-2xl shadow-xl transform transition-all duration-300 border-4 text-white font-bold text-xl min-h-[120px] ${
                  !canMoveDown || isMoving
                    ? "opacity-50 cursor-not-allowed bg-gray-400 border-gray-300"
                    : "bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 border-red-300 hover:scale-105 active:scale-95"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <ArrowDown className="w-12 h-12" />
                  <div className="text-2xl font-bold">BAJAR</div>
                  <div className="text-sm opacity-90">
                    Al planeta: <span className="font-bold text-lg">{currentValue - 1}</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Ayuda visual */}
            {!isMoving && (
              <div className="mt-6 p-4 bg-blue-100 rounded-2xl border-2 border-blue-300">
                <div className="text-center text-blue-800">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-lg font-bold mb-1">Navegación:</p>
                  <p className="text-base">
                    Estás en el planeta <strong className="text-2xl text-yellow-600">{currentValue}</strong> y necesitas llegar al planeta <strong className="text-2xl text-red-600">{currentMission?.target}</strong>
                  </p>
                  <p className="text-sm mt-2 opacity-80">
                    {currentValue < (currentMission?.target || 0) ? "¡Navega hacia arriba! ⬆️" : "¡Navega hacia abajo! ⬇️"}
                  </p>
                </div>
              </div>
            )}

            {/* Estado de movimiento */}
            {isMoving && (
              <div className="mt-6 text-center">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 text-lg font-bold rounded-2xl animate-pulse-gentle flex items-center justify-center gap-2">
                  <Rocket className="w-6 h-6 animate-bounce" />
                  ¡Cohete en movimiento! 🚀
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpaceGame;