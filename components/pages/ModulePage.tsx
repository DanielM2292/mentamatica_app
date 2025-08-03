"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ModulePageTemplate } from '../organisms/ModulePageTemplate';

interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
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

const ModulePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const router = useRouter();
  const [coins, setCoins] = useState(0);

  const [modules] = useState<Module[]>([
    {
      id: "conjuntos",
      name: "CONJUNTOS",
      icon: "🎯",
      description: "Agrupa elementos",
      color: "#FF69B4",
      bgColor: "from-pink-200 to-purple-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "numeracion",
      name: "NUMERACIÓN",
      icon: "🔢",
      description: "Aprende números",
      color: "#4169E1",
      bgColor: "from-blue-200 to-indigo-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
    {
      id: "suma",
      name: "SUMA",
      icon: "➕",
      description: "Suma fácil",
      color: "#32CD32",
      bgColor: "from-green-200 to-emerald-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
    {
      id: "resta",
      name: "RESTA",
      icon: "➖",
      description: "Resta simple",
      color: "#FF4500",
      bgColor: "from-orange-200 to-red-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
    {
      id: "multiplicacion",
      name: "MULTIPLICACIÓN",
      icon: "✖️",
      description: "Multiplica",
      color: "#8B4513",
      bgColor: "from-yellow-200 to-orange-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
    {
      id: "division",
      name: "DIVISIÓN",
      icon: "➗",
      description: "Divide y reparte",
      color: "#20B2AA",
      bgColor: "from-cyan-200 to-teal-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
    {
      id: "geometria",
      name: "GEOMETRÍA",
      icon: "📐",
      description: "Formas divertidas",
      color: "#9370DB",
      bgColor: "from-purple-200 to-pink-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
  ]);

  const getLevelsForModule = (moduleId: string): Level[] => {
    const baseLevels = [
      {
        id: 1,
        title: "Fundamentos",
        description: "Aprende los conceptos básicos",
        stars: 0,
        isUnlocked: true,
        isCompleted: false,
      },
      {
        id: 2,
        title: "Práctica Básica",
        description: "Ejercicios simples para practicar",
        stars: 0,
        isUnlocked: false,
        isCompleted: false,
      },
      {
        id: 3,
        title: "Desafío Intermedio",
        description: "Problemas un poco más complejos",
        stars: 0,
        isUnlocked: false,
        isCompleted: false,
      },
      {
        id: 4,
        title: "Aplicación Práctica",
        description: "Usa lo aprendido en situaciones reales",
        stars: 0,
        isUnlocked: false,
        isCompleted: false,
      },
      {
        id: 5,
        title: "Maestría",
        description: "Demuestra que dominas el tema",
        stars: 0,
        isUnlocked: false,
        isCompleted: false,
      },
    ];

    switch (moduleId) {
      case 'conjuntos':
        return baseLevels.map((level, index) => ({
          ...level,
          title: [
            "¿Qué es un conjunto?",
            "Elementos y conjuntos",
            "Conjuntos iguales",
            "Subconjuntos",
            "Operaciones con conjuntos"
          ][index] || level.title,
          description: [
            "Aprende qué es un conjunto y sus elementos",
            "Identifica elementos que pertenecen a un conjunto",
            "Reconoce cuándo dos conjuntos son iguales",
            "Entiende qué son los subconjuntos",
            "Aprende unión e intersección de conjuntos"
          ][index] || level.description
        }));
      case 'numeracion':
        return baseLevels.map((level, index) => ({
          ...level,
          title: [
            "Números del 1 al 10",
            "Números del 11 al 20",
            "Decenas y unidades",
            "Números hasta 100",
            "Comparar números"
          ][index] || level.title
        }));
      default:
        return baseLevels;
    }
  };

  const currentModule = modules.find(m => m.id === moduleId);
  const levels = getLevelsForModule(moduleId || '');

  useEffect(() => {
    if (!currentModule) {
      router.push('/dashboard');
      return;
    }

    if (!currentModule.isUnlocked) {
      router.push('/dashboard');
      return;
    }
  }, [currentModule, router]);

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleModuleSelect = (selectedModuleId: string) => {
    const selectedModule = modules.find(m => m.id === selectedModuleId);
    if (selectedModule?.isUnlocked) {
      router.push(`/modules/${selectedModuleId}`);
    }
  };

  const handleHomeClick = () => {
    router.push('/dashboard');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleAudioClick = () => {
    console.log('Audio panel clicked');
  };

  const handlePlayLevel = (levelId: number) => {
    router.push(`/modules/${moduleId}/level/${levelId}`);
  };

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Módulo no encontrado</h2>
          <p className="text-gray-600">Regresando al dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ModulePageTemplate
      currentModule={currentModule}
      allModules={modules}
      levels={levels}
      coins={coins}
      onBack={handleBack}
      onModuleSelect={handleModuleSelect}
      onHomeClick={handleHomeClick}
      onSettingsClick={handleSettingsClick}
      onAudioClick={handleAudioClick}
      onPlayLevel={handlePlayLevel}
    />
  );
};

export default ModulePage;