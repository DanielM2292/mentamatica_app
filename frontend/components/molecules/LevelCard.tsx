import React from 'react';
import { Play, Lock } from 'lucide-react';
import Button from '../atoms/Button';
import StarRating from '../atoms/StarRating';

interface LevelCardProps {
  level: number;
  title: string;
  description: string;
  stars: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  onPlay: () => void;
}

const LevelCard: React.FC<LevelCardProps> = ({
  level,
  title,
  description,
  stars,
  isUnlocked,
  isCompleted,
  onPlay
}) => {
  return (
    <div className={`
      bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
      ${isUnlocked ? 'hover:scale-105' : 'opacity-60'}
      ${isCompleted ? 'ring-2 ring-green-200' : ''}
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              NIVEL {level}
            </span>
            {isCompleted && (
              <span className="text-green-500 text-sm">✓ Completado</span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        {!isUnlocked && (
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <Lock className="w-4 h-4 text-gray-500" />
          </div>
        )}
      </div>

      {isUnlocked && (
        <div className="flex items-center justify-between">
          <StarRating rating={stars} />
          <Button
            onClick={onPlay}
            variant="primary"
            size="sm"
            icon={Play}
          >
            Jugar
          </Button>
        </div>
      )}
    </div>
  );
};

export default LevelCard;