"use client";

import { ArrastrarItem } from '../molecules/ArrastrarItem';
import DropZone from '../molecules/DropZone';
import { GameItem, GameLevel } from '@/public/data/conjuntos/gameLevels';
import { UnifiedGameLevel, UnifiedGameItem } from '@/types/gameTypes';
import { useState, useRef } from 'react';

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
  // Estados para drag and drop táctil
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<GameItem | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const dragElementRef = useRef<HTMLDivElement>(null);

  // Funciones para drag and drop táctil
  const handleTouchStart = (e: React.TouchEvent, item: GameItem) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();

    setTouchOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    });

    setDraggedItem(item);
    setIsDragging(true);
    setDragPosition({
      x: touch.clientX - touchOffset.x,
      y: touch.clientY - touchOffset.y,
    });

    // Haptic feedback
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    onDragStart(item);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !draggedItem) return;

    e.preventDefault();
    const touch = e.touches[0];

    setDragPosition({
      x: touch.clientX - touchOffset.x,
      y: touch.clientY - touchOffset.y,
    });

    // Detectar sobre qué drop zone está el dedo
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZoneElement = elementBelow?.closest("[data-drop-zone-id]");

    if (dropZoneElement) {
      const setId = dropZoneElement.getAttribute("data-drop-zone-id");
      setDraggedOver(setId);
    } else {
      setDraggedOver(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !draggedItem) return;

    e.preventDefault();
    const touch = e.changedTouches[0];

    // Encontrar el elemento debajo del punto de toque
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropZoneElement = elementBelow?.closest("[data-drop-zone-id]");

    if (dropZoneElement) {
      const setId = dropZoneElement.getAttribute("data-drop-zone-id");
      if (setId) {
        onDrop(setId);
        
        // Haptic feedback para drop exitoso
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    }

    // Reset drag state
    setIsDragging(false);
    setDraggedItem(null);
    setDraggedOver(null);
    setSelectedItem(null);
  };

  // Handle click interaction for desktop and fallback
  const handleItemClick = (item: GameItem) => {
    // Haptic feedback para móviles
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }

    if (selectedItem === item.id) {
      setSelectedItem(null); // Deselect if clicking same item
    } else {
      setSelectedItem(item.id);
      onDragStart(item);
    }
  };

  const handleDropZoneClick = (setId: string) => {
    if (selectedItem) {
      // Haptic feedback
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      onDrop(setId);
      setSelectedItem(null);
    }
  };

  return (
    <div className="relative">
      {/* Elemento arrastrable para touch */}
      {isDragging && draggedItem && (
        <div
          ref={dragElementRef}
          className="fixed pointer-events-none z-50 w-20 h-20 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-300 scale-110"
          style={{
            left: dragPosition.x,
            top: dragPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-6 h-6 mb-1 flex items-center justify-center">
            <img src={draggedItem.icon} alt={draggedItem.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-center leading-tight">{draggedItem.name}</span>
        </div>
      )}

      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
              onClick={() => handleDropZoneClick(set.id)}
              isCompleted={completedSets.includes(set.id)}
              isDraggedOver={draggedOver === set.id}
              isClickable={selectedItem !== null}
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
              📱 Elementos del Nivel
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              <strong>Móvil:</strong> Mantén presionado y arrastra, o toca para seleccionar<br />
              <strong>Desktop:</strong> Arrastra directamente los elementos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {items.map((item) => (
                <ArrastrarItem
                  key={item.id}
                  item={item}
                  onDragStart={onDragStart}
                  onTouchStart={(e) => handleTouchStart(e, item)}
                  onClick={() => handleItemClick(item)}
                  isSelected={selectedItem === item.id}
                  isDragging={isDragging && draggedItem?.id === item.id}
                />
              ))}
            </div>
            
            {selectedItem && (
              <div className="mt-4 p-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
                <p className="text-blue-700 font-semibold text-sm">
                  ✨ Elemento seleccionado: <strong>{items.find(i => i.id === selectedItem)?.name}</strong>
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Ahora toca un conjunto para colocar el elemento
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaJuego;