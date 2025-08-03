import React from 'react';

interface LevelButtonProps {
  level: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const LevelButton: React.FC<LevelButtonProps> = ({
  level,
  isActive = false,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-3 rounded-full font-bold text-white text-lg
        transition-all duration-300 hover:scale-105 shadow-lg
        ${isActive 
          ? 'bg-gradient-to-r from-sky-400 to-sky-500 shadow-sky-300' 
          : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
        }
        ${className}
      `}
    >
      NIVEL {level}
    </button>
  );
};