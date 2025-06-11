"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Star, X } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  stars: number;
}

// Componente Button simple para evitar importaciones externas
const Button: React.FC<{
  onClick: () => void;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  icon?: React.ComponentType<any>;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, variant = "primary", size = "md", icon: Icon, className = "", children }) => {
  const baseClasses = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl focus:ring-amber-400",
    ghost: "bg-transparent hover:bg-brown-100 text-brown-700 hover:text-brown-800 focus:ring-brown-400"
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const MultiplicacionPage: React.FC = () => {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(
    new Set()
  );
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; symbol: string; color: string }>
  >([]);

  // Efecto de entrada progresiva
  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes para representar multiplicaciones
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: i % 3 === 0 ? "×" : i % 3 === 1 ? `${Math.floor(Math.random() * 9) + 1}` : "=",
      color: ["bg-amber-200", "bg-orange-200", "bg-yellow-200", "bg-brown-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingElements(elements);

    // Animación escalonada
    activities.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedElements((prev) => new Set([...prev, index]));
      }, index * 200);
    });
  }, []);

  const activities: Activity[] = [
    {
      id: 1,
      title: "Rompe la piñata",
      description: "Golpea la piñata con el resultado correcto",
      type: "matching",
      difficulty: "easy",
      completed: false,
      stars: 0,
    },
    {
      id: 2,
      title: "Repeticiones Rápidas",	
      description: "Agrupa elementos para representar multiplicaciones",
      type: "drag-drop",
      difficulty: "medium",
      completed: false,
      stars: 0,
    },
    {
      id: 3,
      title: "Desafío de Tablas",
      description: "Completa las tablas de multiplicar antes de que se acabe el tiempo",
      type: "matching",
      difficulty: "hard",
      completed: false,
      stars: 0,
    },
  ];

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleActivityStart = (activityId: number) => {
    router.push(`/multiplicacion/actividad/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className={`absolute w-10 h-10 ${item.color} rounded-full opacity-20 animate-float flex items-center justify-center text-brown-800 font-bold text-sm`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.id * 0.5}s`,
              animationDuration: `${3 + item.id * 0.2}s`,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Burbujas de símbolos matemáticos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-4xl font-bold text-amber-600">
        ×
      </div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-orange-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-2xl font-bold text-orange-600"
        style={{ animationDelay: "1s" }}
      >
        3×4
      </div>
      <div
        className="absolute bottom-40 left-20 w-28 h-28 bg-yellow-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-3xl font-bold text-yellow-600"
        style={{ animationDelay: "2s" }}
      >
        =12
      </div>

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

      {/* Header */}
      <div className={`bg-white/90 backdrop-blur-sm shadow-sm border-b p-4 relative z-10 transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
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
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/images/icons/multiplicacion.png"
                  alt="Ícono de multiplicación"
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  MULTIPLICACIÓN
                </h1>
                <p className="text-sm text-gray-600">
                  Aprende a multiplicar números
                </p>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
            <span className="font-bold text-yellow-700">0</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Video Section */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "animate-scale-in" : "opacity-0 scale-75"}`} style={{ animationDelay: "0.3s" }}>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-amber-100 hover:shadow-xl transition-all duration-500 group">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                VIDEO EXPLICATIVO
              </h2>
              <p className="text-gray-600">
                Descubre lo divertido que es multiplicar
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl border-4 border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group hover:from-amber-200 hover:to-orange-200 transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales de multiplicación en el video */}
              <div className="absolute top-6 left-6 flex gap-2 items-center">
                <div className="w-6 h-6 bg-amber-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-amber-800">3</div>
                <X className="w-4 h-4 text-amber-600 animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="w-6 h-6 bg-orange-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-orange-800" style={{ animationDelay: "0.6s" }}>4</div>
              </div>

              <div className="absolute top-6 right-6 flex gap-2 items-center">
                <span className="text-amber-600 font-bold animate-pulse" style={{ animationDelay: "0.9s" }}>=</span>
                <div className="w-6 h-6 bg-yellow-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-yellow-800" style={{ animationDelay: "1.2s" }}>12</div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-8 h-8 text-gray-700 ml-1 group-hover:text-amber-600 transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-amber-800 transition-colors duration-300">
                  ¿Cómo multiplicar fácilmente?
                </h3>
              </div>

              {/* Representación visual de multiplicación con grupos */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 items-center">
                {/* Grupo 1 */}
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center justify-center w-6 h-6 bg-white/50 rounded-full text-xs font-bold text-amber-700">
                      ●
                    </div>
                  ))}
                </div>
                {/* Grupo 2 */}
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center justify-center w-6 h-6 bg-white/50 rounded-full text-xs font-bold text-amber-700">
                      ●
                    </div>
                  ))}
                </div>
                {/* Grupo 3 */}
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center justify-center w-6 h-6 bg-white/50 rounded-full text-xs font-bold text-amber-700">
                      ●
                    </div>
                  ))}
                </div>
                {/* Grupo 4 */}
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center justify-center w-6 h-6 bg-white/50 rounded-full text-xs font-bold text-amber-700">
                      ●
                    </div>
                  ))}
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
              {/* Elementos decorativos relacionados con multiplicación */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">×</div>
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white" style={{ animationDelay: "0.5s" }}>2</div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white" style={{ animationDelay: "1s" }}>6</div>
              </div>

              {/* Representación visual del tipo de actividad */}
              <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {activity.type === "drag-drop" && (
                  <div className="flex gap-1 items-center">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                    <X className="w-3 h-3 text-amber-500" />
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                  </div>
                )}
                {activity.type === "selection" && (
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">4</div>
                    <X className="w-3 h-3 text-orange-500" />
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                  </div>
                )}
                {activity.type === "matching" && (
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">5</div>
                    <X className="w-3 h-3 text-yellow-500" />
                    <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-amber-200 transition-colors duration-300">
                      ACTIVIDAD {activity.id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                        activity.difficulty === "easy"
                          ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                          : activity.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                            : "bg-red-100 text-red-800 group-hover:bg-red-200"
                      }`}>
                      {activity.difficulty === "easy" ? "FÁCIL" : activity.difficulty === "medium" ? "MEDIO" : "DIFÍCIL"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-amber-800 transition-colors duration-300">
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
            Tu Progreso en Multiplicación
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500"
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
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="text-center">
            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center justify-center gap-2">
              🧠 ¿Sabías qué?
            </h3>
            <p className="text-amber-700">
              Multiplicar es como sumar varias veces: si tienes 3 grupos de 4 caramelos, 
              ¡tienes 12 caramelos en total! La multiplicación nos ayuda a contar grupos rápidamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplicacionPage;