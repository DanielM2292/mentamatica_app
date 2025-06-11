import React from 'react';
import ModuleIcon from '../atoms/ModuleIcon';
import StarRating from '../atoms/StarRating';

interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  progress: number;
  stars: number;
  isUnlocked: boolean;
}

interface ModuleCardProps {
  module: Module;
  isAnimating: boolean;
  onClick: () => void;
  animationDelay: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isAnimating,
  onClick,
  animationDelay
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative group cursor-pointer transform transition-all duration-500 hover:scale-105
        ${isAnimating ? "animate-shake" : ""}
        ${!module.isUnlocked ? "opacity-60" : ""}
      `}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div
        className={`
          bg-gradient-to-br ${module.bgColor} rounded-3xl p-6 shadow-xl 
          hover:shadow-2xl transition-all duration-300 relative overflow-hidden
          ${module.isUnlocked ? "hover:-translate-y-2" : ""}
          min-h-[180px] flex flex-col items-center justify-center
        `}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Lock overlay para módulos bloqueados */}
        {!module.isUnlocked && (
          <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🔒</span>
            </div>
          </div>
        )}

        {/* Icono del módulo */}
        <div className="text-4xl mb-3 animate-bounce-gentle">
          <ModuleIcon icon={module.icon} alt={module.name} size="lg" />
        </div>

        {/* Nombre del módulo */}
        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
          {module.name}
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 text-center mb-3">
          {module.description}
        </p>

        {/* Progreso y estrellas */}
        {module.isUnlocked && (
          <StarRating rating={module.stars} />
        )}

        {/* Efectos de partículas para módulos desbloqueados */}
        {module.isUnlocked && (
          <>
            <div
              className="absolute top-2 right-2 text-xs animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              ✨
            </div>
            <div
              className="absolute bottom-2 left-2 text-xs animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              🌟
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ModuleCard;