import React from 'react';

interface SideModuleButtonProps {
  icon: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SideModuleButton: React.FC<SideModuleButtonProps> = ({
  icon,
  isActive = false,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-14 h-14 rounded-2xl flex items-center justify-center
        transition-all duration-300 hover:scale-105 shadow-lg
        ${isActive 
          ? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-300' 
          : 'bg-white/90 backdrop-blur-sm hover:shadow-xl'
        }
        ${className}
      `}
    >
      {icon.startsWith('./') || icon.startsWith('/') ? (
        <img
          src={icon}
          alt="Module icon"
          className="w-8 h-8 object-contain"
          draggable={false}
        />
      ) : (
        <span className="text-2xl">{icon}</span>
      )}
    </button>
  );
};