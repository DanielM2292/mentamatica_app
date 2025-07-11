"use client";

import { UnifiedGameItem, UnifiedGameLevel } from "@/types/gameTypes";
import { GameLevel } from "@/public/data/conjuntos/gameLevelsDetective";
import DropZoneDetective from '../molecules/DropZoneDetective';
import { ArrastrarItemDetective } from '../molecules/ArrastrarItemDetective';

interface GamePlayAreaProps {
  items: UnifiedGameItem[];
  currentGameLevel: GameLevel;
  completedSets: string[];
  onDragStart: (item: UnifiedGameItem) => void;
  onDrop: (setId: string, itemData: UnifiedGameItem) => void;
}

const AreaJuegoDetective = ({ 
  items, 
  currentGameLevel, 
  completedSets, 
  onDragStart, 
  onDrop 
}: GamePlayAreaProps) => {
  // Elementos pendientes para arrastrar (solo los que aún están en el array items)
  const elementosPendientes = items.filter(item => {
    const categorias = Array.isArray(item.category) ? item.category : [item.category];
    return !categorias.some(categoria => completedSets.includes(categoria));
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Conjuntos con pistas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          🎯 Conjuntos del Nivel
        </h2>
        {currentGameLevel.sets.map((set) => {
          // Contar cuántos items faltan por arrastrar a este conjunto
          const itemsFaltantes = items.filter(item => {
            const categorias = Array.isArray(item.category) ? item.category : [item.category];
            return set.id === 'interseccion'
              ? categorias.length > 1
              : categorias.includes(set.id);
          });

          return (
            <DropZoneDetective
              key={set.id}
              set={set}
              onDrop={(setId, itemData) => onDrop(setId, itemData)}
              isCompleted={completedSets.includes(set.id)}
              itemCount={itemsFaltantes.length}
              initialItems={set.clue ? [set.clue] : []}
            />
          );
        })}
      </div>

      {/* Elementos arrastrables */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            Elementos del Nivel
          </h2>
          <p className="text-gray-600 mb-6">
            Observa las pistas en los conjuntos y arrastra los elementos que completan la relación.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {elementosPendientes.map((item) => (
              <ArrastrarItemDetective
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

export default AreaJuegoDetective;