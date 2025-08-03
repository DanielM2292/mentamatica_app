import React from 'react';
import { LevelButton } from '../atoms/LevelButton';

interface Level {
  id: number;
  title: string;
  description: string;
  stars: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface ModuleContentProps {
  moduleId: string;
  levels: Level[];
  currentLevel: number;
  onLevelSelect: (levelId: number) => void;
  onPlayLevel: (levelId: number) => void;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({
  moduleId,
  levels,
  currentLevel,
  onLevelSelect,
  onPlayLevel
}) => {
  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Level Selection */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-4">
          {levels.slice(0, 5).map((level) => (
            <LevelButton
              key={level.id}
              level={level.id}
              isActive={currentLevel === level.id}
              onClick={() => onLevelSelect(level.id)}
            />
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">VIDEO EXPLICATIVO</h2>
            <p className="text-gray-600">
              Mira este video antes de comenzar los ejercicios
            </p>
          </div>
          
          <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group hover:from-yellow-200 hover:to-orange-200 transition-all duration-300">
            <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-gray-700 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 text-center">
                VIDEO EXPLICATIVO
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Nivel {currentLevel} - {levels.find(l => l.id === currentLevel)?.title}
          </h3>
          <p className="text-gray-600 mb-8">
            {levels.find(l => l.id === currentLevel)?.description}
          </p>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Actividad Interactiva
              </h4>
              <p className="text-gray-600 mb-6">
                Aquí se desarrollarán las actividades específicas para {moduleId}
              </p>
              <button
                onClick={() => onPlayLevel(currentLevel)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Comenzar Actividad
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};