import React from 'react';
import { Home, Settings, Volume2 } from 'lucide-react';
import { Icon } from '../atoms/Icon';

interface Module {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  stars: number;
  isUnlocked: boolean;
}

interface ModuleSidebarProps {
  modules: Module[];
  activeModuleId: string;
  onModuleSelect: (moduleId: string) => void;
  onHomeClick: () => void;
  onSettingsClick: () => void;
  onAudioClick: () => void;
}

export const ModuleSidebar: React.FC<ModuleSidebarProps> = ({
  modules,
  activeModuleId,
  onModuleSelect,
  onHomeClick,
  onSettingsClick,
  onAudioClick
}) => {
  return (
    <div className="w-20 bg-gradient-to-b from-amber-100 to-orange-100 border-r border-gray-200/50 flex flex-col py-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center">
          <Icon src="/images/logo.png" alt="Logo" size="lg" />
        </div>
      </div>

      {/* Home Button */}
      <div className="px-2 mb-4">
        <div
          onClick={onHomeClick}
          className="p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:scale-105 group"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-semibold text-gray-800">INICIO</span>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 px-2 space-y-2 overflow-y-auto scrollbar-hide">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => module.isUnlocked && onModuleSelect(module.id)}
            className={`
              relative p-3 rounded-xl cursor-pointer transition-all duration-300 group
              ${activeModuleId === module.id 
                ? 'bg-white shadow-lg scale-105' 
                : 'hover:bg-white/80 hover:shadow-md hover:scale-102'
              }
              ${!module.isUnlocked ? 'opacity-60 cursor-not-allowed' : ''}
              ${module.isUnlocked ? 'hover:scale-105' : ''}
            `}
            style={{ borderLeft: activeModuleId === module.id ? `4px solid ${module.color}` : 'none' }}
          >
            {/* Lock overlay */}
            {!module.isUnlocked && (
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
                style={{ backgroundColor: `${module.color}20` }}
              >
                <Icon src={module.icon} alt={module.name} size="lg" />
              </div>

              {/* Name */}
              <span className="text-xs font-semibold text-gray-800 text-center leading-tight">
                {module.name}
              </span>

              {/* Active indicator */}
              {activeModuleId === module.id && (
                <div 
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-8 rounded-l-full"
                  style={{ backgroundColor: module.color }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="px-2 space-y-2 mt-4">
        <div
          onClick={onSettingsClick}
          className="p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:scale-105"
        >
          <div className="flex justify-center">
            <Settings className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        
        <div
          onClick={onAudioClick}
          className="p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:scale-105"
        >
          <div className="flex justify-center">
            <Volume2 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};