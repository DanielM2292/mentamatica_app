"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Star, Square, Circle, Triangle } from "lucide-react";

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
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400",
    ghost: "bg-transparent hover:bg-purple-100 text-purple-700 hover:text-purple-800 focus:ring-purple-400"
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

const GeometriaPage: React.FC = () => {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(
    new Set()
  );
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; shape: string; color: string }>
  >([]);

  // Efecto de entrada progresiva
  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes geométricos
    const shapes = ["circle", "square", "triangle", "hexagon"];
    const colors = ["bg-purple-200", "bg-pink-200", "bg-violet-200", "bg-fuchsia-200"];
    
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
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
      title: "Detective de Figuras",
      description: "Encuentra figuras geométricas ocultas",
      type: "matching",
      difficulty: "easy",
      completed: false,
      stars: 0,
    },
    {
      id: 2,
      title: "Construye tu Figura",
      description: "Usa puntos y lineas para construir figuras",
      type: "matching",
      difficulty: "medium",
      completed: false,
      stars: 0,
    },
    {
      id: 3,
      title: "Perímetro Mágico",
      description: "Calcula perímetros para desbloquear cofres",
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
    router.push(`/geometria/actividad/${activityId}`);
  };

  const ShapeComponent = ({ shape, className }: { shape: string; className?: string }) => {
    const baseClasses = "w-full h-full transition-all duration-300";
    
    switch (shape) {
      case "circle":
        return <div className={`${baseClasses} rounded-full ${className}`} />;
      case "square":
        return <div className={`${baseClasses} ${className}`} />;
      case "triangle":
        return (
          <div 
            className={`${baseClasses} ${className}`}
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
            }}
          />
        );
      case "hexagon":
        return (
          <div 
            className={`${baseClasses} ${className}`}
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            }}
          />
        );
      default:
        return <div className={`${baseClasses} rounded-full ${className}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className={`absolute w-8 h-8 opacity-30 animate-float`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.id * 0.5}s`,
              animationDuration: `${3 + item.id * 0.2}s`,
            }}
          >
            <ShapeComponent shape={item.shape} className={item.color} />
          </div>
        ))}
      </div>

      {/* Burbujas de formas geométricas grandes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100 rounded-full opacity-30 animate-pulse flex items-center justify-center">
        <Circle className="w-16 h-16 text-purple-400" />
      </div>
      <div
        className="absolute top-40 right-20 w-24 h-24 bg-pink-100 opacity-30 animate-pulse flex items-center justify-center"
        style={{ animationDelay: "1s" }}
      >
        <Square className="w-12 h-12 text-pink-400" />
      </div>
      <div
        className="absolute bottom-40 left-20 w-28 h-28 bg-violet-100 opacity-30 animate-pulse flex items-center justify-center"
        style={{ 
          animationDelay: "2s",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
        }}
      >
        <Triangle className="w-12 h-12 text-violet-400" />
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
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
                <img
                  src="/images/icons/geometria.png"
                  alt="Ícono de geometría"
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  GEOMETRÍA
                </h1>
                <p className="text-sm text-gray-600">
                  Explora formas y figuras divertidas
                </p>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-300 ${isVisible ? "animate-bounce-in" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <Star className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="font-bold text-purple-700">0</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        {/* Video Section */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "animate-scale-in" : "opacity-0 scale-75"}`} style={{ animationDelay: "0.3s" }}>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all duration-500 group">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                VIDEO EXPLICATIVO
              </h2>
              <p className="text-gray-600">
                Descubre el fascinante mundo de las formas
              </p>
            </div>

            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl border-4 border-gray-800 p-8 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales de geometría en el video */}
              <div className="absolute top-6 left-6 flex gap-2 items-center">
                <div className="w-8 h-8 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-pink-300 animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="w-8 h-8 bg-violet-300 animate-pulse" style={{ 
                  animationDelay: "0.6s",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                }}></div>
              </div>

              <div className="absolute top-6 right-6 flex gap-2 items-center">
                <div className="w-6 h-6 bg-fuchsia-300 animate-pulse" style={{ 
                  animationDelay: "0.9s",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}></div>
                <div className="w-6 h-6 bg-purple-300 animate-pulse" style={{ animationDelay: "1.2s" }}></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-8 h-8 text-gray-700 ml-1 group-hover:text-purple-600 transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-purple-800 transition-colors duration-300">
                  ¿Qué formas ves a tu alrededor?
                </h3>
              </div>

              {/* Representación visual de formas geométricas */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6 items-center">
                {/* Círculo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-white/50 rounded-full border-2 border-purple-400"></div>
                  <span className="text-xs font-bold text-purple-700">Círculo</span>
                </div>
                {/* Cuadrado */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-white/50 border-2 border-pink-400"></div>
                  <span className="text-xs font-bold text-pink-700">Cuadrado</span>
                </div>
                {/* Triángulo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-white/50 border-2 border-violet-400" style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                  }}></div>
                  <span className="text-xs font-bold text-violet-700">Triángulo</span>
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
              {/* Elementos decorativos relacionados con geometría */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-4 h-4 bg-purple-400 rounded-full animate-ping"></div>
                <div className="w-4 h-4 bg-pink-400 animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <div className="w-4 h-4 bg-violet-400 animate-ping" style={{ 
                  animationDelay: "1s",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                }}></div>
              </div>

              {/* Representación visual del tipo de actividad */}
              <div className="absolute top-4 left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {activity.type === "drag-drop" && (
                  <div className="flex gap-2 items-center">
                    <Circle className="w-6 h-6 text-purple-500" />
                    <Square className="w-6 h-6 text-pink-500" />
                  </div>
                )}
                {activity.type === "selection" && (
                  <div className="flex gap-2 items-center">
                    <Triangle className="w-6 h-6 text-violet-500" />
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                  </div>
                )}
                {activity.type === "matching" && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-purple-500"></div>
                    <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                    <Triangle className="w-4 h-4 text-violet-500" />
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
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
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-purple-800 transition-colors duration-300">
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
            Tu Progreso en Geometría
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-500"
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
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="text-center">
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
              🔺 ¿Sabías qué?
            </h3>
            <p className="text-purple-700">
              Las formas geométricas están en todas partes: las ruedas son círculos, 
              las ventanas son cuadrados, y los techos de las casas son triángulos. 
              ¡La geometría nos ayuda a entender el mundo que nos rodea!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeometriaPage;