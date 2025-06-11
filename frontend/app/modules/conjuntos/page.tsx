"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Star, Circle, Square, Triangle, Coins } from "lucide-react";
import Button from "../../../components/atoms/Button";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  stars: number;
}

const ConjuntosPage: React.FC = () => {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(
    new Set()
  );
  const [floatingShapes, setFloatingShapes] = useState<
    Array<{ id: number; x: number; y: number; type: string; color: string }>
  >([]);

  // Efecto de entrada progresiva basado en neurociencia cognitiva
  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes para representar conceptos de conjuntos
    const shapes = Array.from({ length: 8 }, (_, i) => ({
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
  }, []);

  const activities: Activity[] = [
    {
      id: 1,
      title: "Clasifica y agrupa",
      description: "Arrastra objetos al conjunto correcto",
      type: "drag-drop",
      difficulty: "easy",
      completed: false,
      stars: 0,
    },
    {
      id: 2,
      title: "La unión y la intersección",
      description: "Selecciona que elementos pertenecen a la unión o intersección de dos conjuntos",
      type: "selection",
      difficulty: "easy",
      completed: false,
      stars: 0,
    },
    {
      id: 3,
      title: "Detective del Conjunto Perdido",
      description: "Encuentra qué conjunto falta para completar una operación",
      type: "drag-drop",
      difficulty: "medium",
      completed: false,
      stars: 0,
    },
  ];

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleActivityStart = (activityId: number) => {
    // Navegar a la actividad específica usando Next.js router
    router.push(`/conjuntos/actividad/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo - Representación visual de conjuntos */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map((shape) => (
          <div
            key={shape.id}
            className={`absolute w-8 h-8 ${shape.color} rounded-full opacity-20 animate-float`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              animationDelay: `${shape.id * 0.5}s`,
              animationDuration: `${3 + shape.id * 0.2}s`,
            }}
          >
            {shape.type === "circle" && (
              <Circle className="w-full h-full p-1" />
            )}
            {shape.type === "square" && (
              <Square className="w-full h-full p-1" />
            )}
            {shape.type === "triangle" && (
              <Triangle className="w-full h-full p-1" />
            )}
          </div>
        ))}
      </div>

      {/* Burbujas de conjuntos animados */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-pink-100 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-28 h-28 bg-green-100 rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-slide-in-left {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInFromRight 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
      `}</style>
      {/* Header */}
      <div
        className={`bg-white/90 backdrop-blur-sm shadow-sm border-b p-4 relative z-10 transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              className="hover:scale-105 transition-transform duration-200"
            >
              Volver
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/images/icons/conjuntos.png"
                  alt="Ícono de conjuntos"
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  CONJUNTOS
                </h1>
                <p className="text-sm text-gray-600">
                  Aprende a agrupar elementos
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Estrellas */}
            <div
              className={`flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"}`}
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span className="font-bold text-yellow-700">0</span>
            </div>
            
            {/* Monedas */}
            <div
              className={`flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"}`}
              style={{ animationDelay: "0.7s" }}
            >
              <Coins className="w-5 h-5 text-amber-600 animate-pulse" />
              <span className="font-bold text-amber-700">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Video Section */}
        <div
          className={`mb-8 transition-all duration-700 ${isVisible ? "animate-scale-in" : "opacity-0 scale-75"}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-500 group">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                VIDEO EXPLICATIVO
              </h2>
              <p className="text-gray-600">
                Aprende qué son los conjuntos antes de comenzar
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl border-4 border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group hover:from-yellow-200 hover:to-orange-200 transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales de conjuntos en el video */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse"></div>
                <div
                  className="w-4 h-4 bg-blue-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-green-300 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <div className="absolute top-6 right-6 flex gap-2">
                <div
                  className="w-4 h-4 bg-purple-300 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-pink-300 rounded-full animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-8 h-8 text-gray-700 ml-1 group-hover:text-blue-600 transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-blue-800 transition-colors duration-300">
                  ¿Qué son los conjuntos?
                </h3>
              </div>

              {/* Representación visual de conjuntos */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <div className="flex items-center gap-1 bg-white/50 rounded-full px-3 py-1">
                  <Circle className="w-3 h-3 text-blue-500" />
                  <span className="text-xs font-medium">A</span>
                </div>
                <div className="flex items-center gap-1 bg-white/50 rounded-full px-3 py-1">
                  <Square className="w-3 h-3 text-red-500" />
                  <span className="text-xs font-medium">B</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden ${
                animatedElements.has(index) ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Elementos decorativos relacionados con conjuntos */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Representación visual del tipo de actividad */}
              <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {activity.type === "drag-drop" && (
                  <div className="flex gap-1">
                    <Circle className="w-6 h-6 text-blue-500" />
                    <Square className="w-6 h-6 text-red-500" />
                  </div>
                )}
                {activity.type === "selection" && (
                  <div className="relative">
                    <Circle className="w-8 h-8 text-green-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                )}
                {activity.type === "matching" && (
                  <div className="flex items-center gap-1">
                    <Circle className="w-4 h-4 text-purple-500" />
                    <div className="w-4 h-0.5 bg-purple-500"></div>
                    <Square className="w-4 h-4 text-purple-500" />
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-pink-100 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-pink-200 transition-colors duration-300">
                      ACTIVIDAD {activity.id}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                        activity.difficulty === "easy"
                          ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                          : activity.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                            : "bg-red-100 text-red-800 group-hover:bg-red-200"
                      }`}
                    >
                      {activity.difficulty === "easy"
                        ? "FÁCIL"
                        : activity.difficulty === "medium"
                          ? "MEDIO"
                          : "DIFÍCIL"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-800 transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-all duration-300 hover:scale-125 ${
                        i < activity.stars
                          ? "text-yellow-400 fill-current animate-pulse"
                          : "text-gray-300 group-hover:text-yellow-200"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  onClick={() => handleActivityStart(activity.id)}
                  variant="primary"
                  size="sm"
                  icon={Play}
                  className="hover:scale-105 transition-transform duration-200 hover:shadow-lg"
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
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Tu Progreso en Conjuntos
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              0 de {activities.length} actividades completadas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjuntosPage;