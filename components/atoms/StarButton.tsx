import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarButtonProps {
  number: number;
  isCorrect?: boolean;
  onClick: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

export const StarButton: React.FC<StarButtonProps> = ({ 
  number, 
  isCorrect, 
  onClick, 
  isSelected,
  disabled 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-20 h-20 transition-all duration-300 hover:scale-110 disabled:opacity-50",
        isSelected && isCorrect && "animate-pulse",
        isSelected && !isCorrect && "animate-bounce"
      )}
    >
      <Star 
        className={cn(
          "w-full h-full transition-colors duration-300",
          isSelected && isCorrect 
            ? "fill-green-400 text-green-500" 
            : isSelected && !isCorrect
            ? "fill-red-400 text-red-500"
            : "fill-yellow-400 text-yellow-500 hover:fill-yellow-300"
        )}
      />
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
        {number}
      </span>
    </button>
  );
};