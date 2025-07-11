"use client";

import React, { useState, useEffect } from "react";
import { Play, Star, Plus } from "lucide-react";
import Button from "@/components/atoms/Button";

interface Activity {
  id: string;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  stars: number;
}

interface SumasContentProps {
  videoTitle: string;
  videoDescription: string;
  videoBackground: string;
  activities: Activity[];
  onActivityStart: (activityId: string) => void;
  onVideoPlay: () => void;
}

const SumaTemplate: React.FC<SumasContentProps> = ({
  videoTitle,
  videoDescription,
  videoBackground,
  activities,
  onActivityStart,
  onVideoPlay,
}) => {
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Animación escalonada para las actividades
    activities.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, index]));
      }, index * 200);
    });
  }, [activities]);

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
        return "bg-purple-100 text-purple-800 group-hover:bg-purple-200";
      case "medium":
        return "bg-pink-100 text-pink-800 group-hover:bg-pink-200";
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
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-purple-500" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
          </div>
        );
      case "selection":
        return (
          <div className="flex gap-1 sm:gap-2 items-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-pink-500" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-fuchsia-500 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-fuchsia-500" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-fuchsia-500 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Video Section */}
      <div className={`mb-6 sm:mb-8 animate-scale-in`} style={{ animationDelay: "0.3s" }}>
        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-purple-100 hover:shadow-xl transition-all duration-500 group ${videoBackground}`}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
              {videoTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {videoDescription}
            </p>
          </div>

          <div
            className="relative rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-800 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] cursor-pointer group hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-purple-100 to-pink-100"
            onClick={onVideoPlay}
          >
            <div className="absolute inset-2 sm:inset-4 border-2 border-dashed border-purple-400 rounded-xl sm:rounded-2xl group-hover:border-purple-600 transition-colors duration-300"></div>

            {/* Elementos visuales de conjuntos */}
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2 items-center">
              <div className="w-3 h-3 sm:w-6 sm:h-6 bg-purple-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-purple-800">
                <span className="hidden sm:inline">A</span>
              </div>
              <div className="w-3 h-3 sm:w-6 sm:h-6 bg-pink-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-pink-800" style={{ animationDelay: "0.3s" }}>
                <span className="hidden sm:inline">B</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-purple-600 transition-colors duration-300" />
              </div>

              <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-purple-800 transition-colors duration-300 px-2">
                ¿Qué son los conjuntos?
              </h3>
            </div>

            {/* Representación visual de conjuntos */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 items-center">
              <div className="w-4 h-4 sm:w-8 sm:h-8 bg-white/50 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">
                <span className="hidden sm:inline">A</span>
                <span className="sm:hidden text-xs">•</span>
              </div>
              <div className="w-4 h-4 sm:w-8 sm:h-8 bg-white/50 rounded-full flex items-center justify-center text-xs font-bold text-purple-700">
                <span className="hidden sm:inline">B</span>
                <span className="sm:hidden text-xs">•</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden ${
              animatedElements.has(index) ? "animate-bounce-in" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Elementos decorativos */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                <span className="hidden sm:inline">A</span>
              </div>
              <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white" style={{ animationDelay: "0.5s" }}>
                <span className="hidden sm:inline">B</span>
              </div>
            </div>

            {/* Representación visual del tipo de actividad */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
              {renderActivityIcon(activity.type)}
            </div>

            <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-200 transition-colors duration-300 w-fit">
                    ACTIVIDAD {index + 1}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 w-fit ${getDifficultyStyles(activity.difficulty)}`}>
                    {getDifficultyText(activity.difficulty)}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-800 transition-colors duration-300 break-words">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 break-words">
                  {activity.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 hover:scale-125 ${
                        i < activity.stars
                          ? "text-yellow-400 fill-current animate-pulse"
                          : "text-gray-300 group-hover:text-yellow-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <Button
                onClick={() => onActivityStart(activity.id)}
                variant="primary"
                size="sm"
                icon={Play}
                className="hover:scale-105 transition-transform duration-200 hover:shadow-lg text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
              >
                {activity.completed ? "Repetir" : "Jugar"}
              </Button>
            </div>

            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
          Tu Progreso en Conjuntos
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
          <div
            className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 sm:h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-600">
            {completedActivities} de {activities.length} actividades completadas
          </p>
        </div>
      </div>

      {/* Fun Fact Section */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 flex items-center justify-center gap-2 break-words">
            🧠 ¿Sabías qué?
          </h3>
          <p className="text-sm sm:text-base text-purple-700 break-words">
            Los conjuntos son una de las bases fundamentales de las matemáticas. 
            Casi todo en matemáticas puede definirse en términos de conjuntos.
          </p>
        </div>
      </div>
    </>
  );
};

export default SumaTemplate;