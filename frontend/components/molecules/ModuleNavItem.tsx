import React from 'react';
import ModuleIcon from '../atoms/ModuleIcon';
import StarRating from '../atoms/StarRating';
import ProgressBar from '../atoms/ProgressBar';

interface ModuleNavItemProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  stars: number;
  isUnlocked: boolean;
  isActive?: boolean;
  onClick: (id: string) => void;
}

const ModuleNavItem: React.FC<ModuleNavItemProps> = ({
  id,
  name,
  icon,
  color,
  progress,
  stars,
  isUnlocked,
  isActive = false,
  onClick
}) => {
  return (
    <div
      onClick={() => isUnlocked && onClick(id)}
      className={`
        relative p-3 rounded-xl cursor-pointer transition-all duration-300 group
        ${isActive 
          ? 'bg-white shadow-lg scale-105' 
          : 'hover:bg-white/80 hover:shadow-md hover:scale-102'
        }
        ${!isUnlocked ? 'opacity-60 cursor-not-allowed' : ''}
        ${isUnlocked ? 'hover:scale-105' : ''}
      `}
      style={{ borderLeft: isActive ? `4px solid ${color}` : 'none' }}
    >
      {/* Lock overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-black/10 rounded-xl flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🔒</span>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: `${color}20` }}
        >
          <ModuleIcon icon={icon} alt={name} size="md" />
        </div>

        {/* Name */}
        <span className="text-xs font-semibold text-gray-800 text-center leading-tight">
          {name}
        </span>

        {/* Progress and Stars for unlocked modules */}
        {isUnlocked && (
          <div className="w-full space-y-1">
            <ProgressBar 
              progress={progress} 
              size="sm" 
              color={color.replace('#', '').toLowerCase()}
            />
            <div className="flex justify-center">
              <StarRating rating={stars} size="sm" />
            </div>
          </div>
        )}

        {/* Active indicator */}
        {isActive && (
          <div 
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-8 rounded-l-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    </div>
  );
};

export default ModuleNavItem;