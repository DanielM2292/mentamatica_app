"use client";
import { useState } from 'react';
import { ModuleHeader } from '../molecules/ModuleHeader';
import { ModuleSidebar } from '../molecules/ModuleSidebar';
import { ModuleContent } from '../molecules/ModuleContent';

interface Module {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  stars: number;
  isUnlocked: boolean;
}

interface Level {
  id: number;
  title: string;
  description: string;
  stars: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface ModulePageTemplateProps {
  currentModule: Module;
  allModules: Module[];
  levels: Level[];
  coins: number;
  onBack: () => void;
  onModuleSelect: (moduleId: string) => void;
  onHomeClick: () => void;
  onSettingsClick: () => void;
  onAudioClick: () => void;
  onPlayLevel: (levelId: number) => void;
}

export const ModulePageTemplate: React.FC<ModulePageTemplateProps> = ({
  currentModule,
  allModules,
  levels,
  coins,
  onBack,
  onModuleSelect,
  onHomeClick,
  onSettingsClick,
  onAudioClick,
  onPlayLevel
}) => {
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevel(levelId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex">
      {/* Sidebar */}
      <ModuleSidebar
        modules={allModules}
        activeModuleId={currentModule.id}
        onModuleSelect={onModuleSelect}
        onHomeClick={onHomeClick}
        onSettingsClick={onSettingsClick}
        onAudioClick={onAudioClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ModuleHeader
          moduleName={currentModule.name}
          moduleIcon={currentModule.icon}
          moduleColor={currentModule.color}
          coins={coins}
          onBack={onBack}
        />

        {/* Content */}
        <ModuleContent
          moduleId={currentModule.id}
          levels={levels}
          currentLevel={currentLevel}
          onLevelSelect={handleLevelSelect}
          onPlayLevel={onPlayLevel}
        />
      </div>
    </div>
  );
};