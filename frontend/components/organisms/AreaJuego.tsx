"use client";

import { ArrastrarItem } from '../molecules/ArrastrarItem';
import DropZone from '../molecules/DropZone';
import { GameItem, GameLevel } from '@/public/data/conjuntos/gameLevels';
import { UnifiedGameLevel, UnifiedGameItem } from '@/types/gameTypes';

interface GamePlayAreaProps {
  items: GameItem[];
  currentGameLevel: GameLevel | UnifiedGameLevel;
  completedSets: string[];
  onDragStart: (item: GameItem) => void;
  onDrop: (setId: string) => void;
}

const AreaJuego = ({ 
  items, 
  currentGameLevel, 
  completedSets, 
  onDragStart, 
  onDrop 
}: GamePlayAreaProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Área de conjuntos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🎯 Conjuntos del Nivel
        </h2>
        {currentGameLevel.sets.map((set) => (
          <DropZone
            key={set.id}
            set={set}
            onDrop={onDrop}
            isCompleted={completedSets.includes(set.id)}
            itemCount={items.filter(item => {
              const categories = Array.isArray(item.category) ? item.category : [item.category];
              return set.id === 'interseccion'
                ? categories.length > 1
                : categories.includes(set.id);
            }).length}
          />
        ))}
      </div>
      
      {/* Área de elementos arrastrables */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Elementos del Nivel
          </h2>
          <p className="text-gray-600 mb-6">
            Arrastra cada elemento al conjunto correspondiente para completar el nivel.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <ArrastrarItem
                key={item.id}
                item={item}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaJuego;
