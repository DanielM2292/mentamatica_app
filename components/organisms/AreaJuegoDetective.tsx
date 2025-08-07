"use client";

import { UnifiedGameItem, UnifiedGameLevel } from "@/types/gameTypes";
import { GameLevel } from "@/public/data/conjuntos/gameLevelsDetective";
import DropZoneDetective from '../molecules/DropZoneDetective';
import { ArrastrarItemDetective } from '../molecules/ArrastrarItemDetective';
import { useState, useRef } from 'react';

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
  // Estados para drag and drop táctil
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<UnifiedGameItem | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const dragElementRef = useRef<HTMLDivElement>(null);

  // Elementos pendientes para arrastrar (solo los que aún están en el array items)
  const elementosPendientes = items.filter(item => {
    const categorias = Array.isArray(item.category) ? item.category : [item.category];
    return !categorias.some(categoria => completedSets.includes(categoria));
  });

  // Funciones para drag and drop táctil
  const handleTouchStart = (e: React.TouchEvent, item: UnifiedGameItem) => {
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
        onDrop(setId, draggedItem);
        
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
  const handleItemClick = (item: UnifiedGameItem) => {
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
      const item = elementosPendientes.find(i => i.id === selectedItem);
      if (item) {
        // Haptic feedback
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }

        onDrop(setId, item);
        setSelectedItem(null);
      }
    }
  };

  return (
    <div className="relative">
      {/* Elemento arrastrable para touch */}
      {isDragging && draggedItem && (
        <div
          ref={dragElementRef}
          className="fixed pointer-events-none z-50 w-20 h-20 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-purple-300 scale-110"
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
          
          {/* Efecto detective: lupa animada */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">🔍</span>
          </div>
        </div>
      )}

      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Conjuntos con pistas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🕵️ Conjuntos Detective
            <span className="text-sm font-normal text-gray-600">(con pistas)</span>
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
                onClick={() => handleDropZoneClick(set.id)}
                isCompleted={completedSets.includes(set.id)}
                isDraggedOver={draggedOver === set.id}
                isClickable={selectedItem !== null}
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
              🔍 Elementos Detective
              <span className="text-xl">📱</span>
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              <strong>🕵️ Modo Detective:</strong> Observa las pistas en los conjuntos<br />
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {elementosPendientes.map((item) => (
                <ArrastrarItemDetective
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
              <div className="mt-4 p-3 bg-purple-50 border-2 border-purple-200 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-lg">🕵️</span>
                  <p className="text-purple-700 font-semibold text-sm">
                    Elemento seleccionado: <strong>{elementosPendientes.find(i => i.id === selectedItem)?.name}</strong>
                  </p>
                  <span className="text-lg">🔍</span>
                </div>
                <p className="text-purple-600 text-xs">
                  Ahora toca un conjunto para resolver el misterio
                </p>
              </div>
            )}

            {elementosPendientes.length === 0 && (
              <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🎉</span>
                  <p className="text-green-700 font-semibold">
                    ¡Caso resuelto! Todos los elementos han sido clasificados
                  </p>
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaJuegoDetective;