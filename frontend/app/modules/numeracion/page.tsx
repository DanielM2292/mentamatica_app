"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Star, Circle, Square, Triangle } from "lucide-react";
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

const NumeracionPage: React.FC = () => {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(
    new Set()
  );
  const [floatingNumbers, setFloatingNumbers] = useState<
    Array<{ id: number; x: number; y: number; number: number; color: string }>
  >([]);

  // Efecto de entrada progresiva basado en neurociencia cognitiva
  useEffect(() => {
    setIsVisible(true);

    // Crear números flotantes para representar conceptos de numeración
    const numbers = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      number: i + 1,
      color: ["bg-blue-200", "bg-indigo-200", "bg-cyan-200", "bg-sky-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingNumbers(numbers);

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
      title: "El Número Correcto",
      description: "Explota globos en orden ascendente.",
      type: "drag-drop",
      difficulty: "easy",
      completed: false,
      stars: 0,
    },
    {
      id: 2,
      title: "Forma el Número Gigante",
      description: "Construye números de 4-5 cifras usando el valor posicional.",
      type: "matching",
      difficulty: "medium",
      completed: false,
      stars: 0,
    },
    {
      id: 3,
      title: "Contador Espacial",
      description: "Avanza en el mapa sumando/restando decenas.",
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
    router.push(`/numeracion/actividad/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo - Representación visual de números */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingNumbers.map((item) => (
          <div
            key={item.id}
            className={`absolute w-10 h-10 ${item.color} rounded-full opacity-20 animate-float flex items-center justify-center text-blue-800 font-bold text-sm`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.id * 0.5}s`,
              animationDuration: `${3 + item.id * 0.2}s`,
            }}
          >
            {item.number}
          </div>
        ))}
      </div>

      {/* Burbujas de números animados */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-4xl font-bold text-blue-600">
        1
      </div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-2xl font-bold text-indigo-600"
        style={{ animationDelay: "1s" }}
      >
        5
      </div>
      <div
        className="absolute bottom-40 left-20 w-28 h-28 bg-cyan-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-3xl font-bold text-cyan-600"
        style={{ animationDelay: "2s" }}
      >
        10
      </div>

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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/images/icons/numeracion.png"
                  alt="Ícono de numeración"
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  NUMERACIÓN
                </h1>
                <p className="text-sm text-gray-600">
                  Aprende a contar y los números
                </p>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="font-bold text-yellow-700">0</span>
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
                Aprende qué son los números antes de comenzar
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl border-4 border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group hover:from-blue-200 hover:to-indigo-200 transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales de números en el video */}
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-6 h-6 bg-blue-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-blue-800">1</div>
                <div
                  className="w-6 h-6 bg-indigo-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-indigo-800"
                  style={{ animationDelay: "0.5s" }}
                >2</div>
                <div
                  className="w-6 h-6 bg-cyan-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-cyan-800"
                  style={{ animationDelay: "1s" }}
                >3</div>
              </div>

              <div className="absolute top-6 right-6 flex gap-2">
                <div
                  className="w-6 h-6 bg-sky-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-sky-800"
                  style={{ animationDelay: "1.5s" }}
                >4</div>
                <div
                  className="w-6 h-6 bg-blue-400 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-blue-900"
                  style={{ animationDelay: "2s" }}
                >5</div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-8 h-8 text-gray-700 ml-1 group-hover:text-blue-600 transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-blue-800 transition-colors duration-300">
                  ¿Cómo contar del 1 al 10?
                </h3>
              </div>

              {/* Representación visual de números */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center justify-center w-8 h-8 bg-white/50 rounded-full text-xs font-bold text-blue-700">
                    {num}
                  </div>
                ))}
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
              {/* Elementos decorativos relacionados con números */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">1</div>
                <div
                  className="w-3 h-3 bg-indigo-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white"
                  style={{ animationDelay: "0.5s" }}
                >2</div>
                <div
                  className="w-3 h-3 bg-cyan-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white"
                  style={{ animationDelay: "1s" }}
                >3</div>
              </div>

              {/* Representación visual del tipo de actividad */}
              <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {activity.type === "drag-drop" && (
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">5</div>
                    <div className="w-0.5 h-4 bg-blue-500"></div>
                    <div className="flex flex-col gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                )}
                {activity.type === "selection" && (
                  <div className="flex gap-2">
                    {[1,2,3].map(num => (
                      <div key={num} className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {num}
                      </div>
                    ))}
                  </div>
                )}
                {activity.type === "matching" && (
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                    <div className="w-4 h-0.5 bg-purple-500"></div>
                    <div className="flex gap-0.5">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
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
            Tu Progreso en Numeración
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-gray-600">
              0 de {activities.length} actividades completadas
            </p>
          </div>
        </div>

        {/* Fun Fact Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="text-center">
            <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
              🧠 ¿Sabías qué?
            </h3>
            <p className="text-blue-700">
              Los números están en todas partes: tu edad, los dedos de tus manos, 
              las horas del día... ¡Aprender a contar te ayuda a entender el mundo!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumeracionPage;