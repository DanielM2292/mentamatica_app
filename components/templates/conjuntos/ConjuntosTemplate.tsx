"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, Star, Circle, Square, Triangle, Coins } from "lucide-react";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Monedas from "@/components/molecules/Monedas";


interface Activity {
  id: string;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  stars: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  type: string;
  color: string;
}

interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  backgroundGradient: string;
  videoTitle: string;
  videoDescription: string;
  videoBackground: string;
  activities: Activity[];
}

interface ModuleTemplateProps {
  config: ModuleConfig;
  userStars?: number;
  userCoins?: number;
}

const ConjuntosTemplate: React.FC<ModuleTemplateProps> = ({
  config,
  userStars = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(new Set());
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([]);
  const [activities, setActivities] = useState<Activity[]>(config.activities);
  const { user } = useUser();

  // Efecto de entrada progresiva basado en neurociencia cognitiva
  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes - menos en móvil
    const shapesCount = window.innerWidth < 768 ? 4 : 8;
    const shapes = Array.from({ length: shapesCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)],
      color: ["bg-blue-200", "bg-pink-200", "bg-green-200", "bg-yellow-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingShapes(shapes);

    // Animación escalonada para reducir carga cognitiva
    activities.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, index]));
      }, index * 200);
    });
  }, [activities]);

  const handleVideoPlay = () => {
    // Implementar reproducción de video
    console.log(`Playing video for ${config.id}`);
  };

  const completedActivities = activities.filter(activity => activity.completed).length;
  const progressPercentage = (completedActivities / activities.length) * 100;

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "FÁCIL";
      case "medium": return "MEDIO";
      case "hard": return "DIFÍCIL";
      default: return difficulty.toUpperCase();
    }
  };

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 group-hover:bg-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 group-hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 group-hover:bg-gray-200";
    }
  };

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "drag-drop":
        return (
          <div className="flex gap-1">
            <Circle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
            <Square className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
          </div>
        );
      case "selection":
        return (
          <div className="relative">
            <Circle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        );
      case "matching":
        return (
          <div className="flex items-center gap-1">
            <Circle className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
            <div className="w-3 sm:w-4 h-0.5 bg-purple-500"></div>
            <Square className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
          </div>
        );
      default:
        return <Circle className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${config.backgroundGradient} relative overflow-hidden`}>
      {/* Elementos flotantes de fondo - ocultos en móvil muy pequeño */}
      <div className="absolute inset-0 pointer-events-none hidden xs:block">
        {floatingShapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 ${shape.color} rounded-full opacity-20 animate-float`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              animationDelay: `${shape.id * 0.5}s`,
              animationDuration: `${3 + shape.id * 0.2}s`,
            }}
          >
            {shape.type === "circle" && <Circle className="w-full h-full p-1" />}
            {shape.type === "square" && <Square className="w-full h-full p-1" />}
            {shape.type === "triangle" && <Triangle className="w-full h-full p-1" />}
          </div>
        ))}
      </div>

      {/* Burbujas animadas - reducidas en móvil */}
      <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
      <div
        className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-pink-100 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-green-100 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-slide-in-left { animation: slideInFromLeft 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInFromRight 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
      `}</style>

      {/* Header - Mejorado para móvil */}
      <div
        className={`bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10 transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"
          }`}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Link href="/dashboard">
              <Button
                icon={ArrowLeft}
                variant="ghost"
                size="sm"
                className="hover:scale-105 transition-transform duration-200 flex-shrink-0"
              >
                <span className="hidden sm:inline">Volver</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-pink-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer flex-shrink-0">
                <img
                  src={config.iconPath}
                  alt={`Ícono de ${config.title}`}
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
                  {config.title.toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{config.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Estrellas */}
            <div
              className={`flex items-center gap-1 sm:gap-2 bg-yellow-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"
                }`}
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
              <span className="font-bold text-yellow-700 text-xs sm:text-base">{userStars}</span>
            </div>

            {/* Monedas */}
            {user && <Monedas userId={user.id} isVisible={true}/>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 relative z-10">
        {/* Video Section - Optimizado para móvil */}
        <div
          className={`mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? "animate-scale-in" : "opacity-0 scale-75"
            }`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-blue-100 hover:shadow-xl transition-all duration-500 group">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                VIDEO EXPLICATIVO
              </h2>
              <p className="text-sm sm:text-base text-gray-600">{config.videoDescription}</p>
            </div>

            <div
              className={`relative ${config.videoBackground} rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-800 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] cursor-pointer group hover:scale-[1.02] transition-all duration-300`}
              onClick={handleVideoPlay}
            >
              <div className="absolute inset-2 sm:inset-4 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales decorativos - simplificados en móvil */}
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-red-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>

              <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                <div className="w-2 h-2 sm:w-4 sm:h-4 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-blue-800 transition-colors duration-300 px-2">
                  {config.videoTitle}
                </h3>
              </div>

              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-4">
                <div className="flex items-center gap-1 bg-white/50 rounded-full px-2 py-1 sm:px-3">
                  <Circle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-500" />
                  <span className="text-xs font-medium">A</span>
                </div>
                <div className="flex items-center gap-1 bg-white/50 rounded-full px-2 py-1 sm:px-3">
                  <Square className="w-2 h-2 sm:w-3 sm:h-3 text-red-500" />
                  <span className="text-xs font-medium">B</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden ${animatedElements.has(index) ? "animate-bounce-in" : "opacity-0"
                }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Elementos decorativos - simplificados en móvil */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
              </div>

              {/* Icono del tipo de actividad */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {renderActivityIcon(activity.type)}
              </div>

              <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-pink-200 transition-colors duration-300 w-fit">
                      ACTIVIDAD {index + 1}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 w-fit ${getDifficultyStyles(activity.difficulty)}`}>
                      {getDifficultyText(activity.difficulty)}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-800 transition-colors duration-300 break-words">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 break-words">
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 hover:scale-125 ${i < activity.stars
                        ? "text-yellow-400 fill-current animate-pulse"
                        : "text-gray-300 group-hover:text-yellow-200"
                        }`}
                    />
                  ))}
                </div>
                <Link href={`/modules/${config.id}/${activity.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Play}
                    className="hover:scale-105 transition-transform duration-200 hover:shadow-lg text-xs sm:text-sm"
                  >
                    {activity.completed ? "Repetir" : "Jugar"}
                  </Button>
                </Link>
              </div>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Progress Section - Optimizado para móvil */}
        <div className="mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
            Tu Progreso en {config.title}
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-600">
              {completedActivities} de {activities.length} actividades completadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjuntosTemplate;