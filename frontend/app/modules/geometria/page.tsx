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

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

// Componente Button mejorado para responsividad
const Button: React.FC<ButtonProps> = ({
  onClick,
  variant = "primary",
  size = "sm",
  icon: Icon,
  className = "",
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400",
    ghost: "bg-transparent hover:bg-purple-100 text-purple-700 hover:text-purple-800 focus:ring-purple-400"
  };
  
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
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

  // Efecto de entrada progresiva optimizado para móvil
  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes geométricos - menos en móvil
    const shapesCount = window.innerWidth < 768 ? 6 : 15;
    const shapes = ["circle", "square", "triangle", "hexagon"];
    const colors = ["bg-purple-200", "bg-pink-200", "bg-violet-200", "bg-fuchsia-200"];
    
    const elements = Array.from({ length: shapesCount }, (_, i) => ({
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

  const handleVideoPlay = () => {
    console.log("Playing geometría video");
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

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "drag-drop":
        return (
          <div className="flex gap-1 sm:gap-2 items-center">
            <Circle className="w-3 h-3 sm:w-6 sm:h-6 text-purple-500" />
            <Square className="w-3 h-3 sm:w-6 sm:h-6 text-pink-500" />
          </div>
        );
      case "selection":
        return (
          <div className="flex gap-1 sm:gap-2 items-center">
            <Triangle className="w-3 h-3 sm:w-6 sm:h-6 text-violet-500" />
            <div className="w-3 h-3 sm:w-6 sm:h-6 bg-purple-500 rounded-full"></div>
          </div>
        );
      case "matching":
        return (
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-4 sm:h-4 border-2 border-purple-500"></div>
            <div className="w-2 h-2 sm:w-4 sm:h-4 bg-pink-500 rounded-full"></div>
            <Triangle className="w-2 h-2 sm:w-4 sm:h-4 text-violet-500" />
          </div>
        );
      default:
        return <Circle className="w-3 h-3 sm:w-6 sm:h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo - ocultos en móvil muy pequeño */}
      <div className="absolute inset-0 pointer-events-none hidden xs:block">
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30 animate-float`}
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

      {/* Burbujas de formas geométricas grandes - reducidas en móvil */}
      <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-purple-100 rounded-full opacity-30 animate-pulse flex items-center justify-center">
        <Circle className="w-8 h-8 sm:w-16 sm:h-16 text-purple-400" />
      </div>
      <div
        className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-pink-100 opacity-30 animate-pulse flex items-center justify-center"
        style={{ animationDelay: "1s" }}
      >
        <Square className="w-6 h-6 sm:w-12 sm:h-12 text-pink-400" />
      </div>
      <div
        className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-violet-100 opacity-30 animate-pulse flex items-center justify-center"
        style={{ 
          animationDelay: "2s",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
        }}
      >
        <Triangle className="w-6 h-6 sm:w-12 sm:h-12 text-violet-400" />
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

      {/* Header - Mejorado para móvil */}
      <div className={`bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10 transition-all duration-700 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              className="hover:scale-105 transition-transform duration-200 flex-shrink-0"
            >
              <span className="hidden sm:inline">Volver</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer flex-shrink-0">
                <img
                  src="/images/icons/geometria.png"
                  alt="Ícono de geometría"
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                  GEOMETRÍA
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  Explora formas y figuras divertidas
                </p>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-1 sm:gap-2 bg-purple-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-purple-200 transition-colors duration-300 flex-shrink-0 ${isVisible ? "animate-bounce-in" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <Star className="w-3 h-3 sm:w-5 sm:h-5 text-purple-500 animate-pulse" />
            <span className="font-bold text-purple-700 text-xs sm:text-base">0</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 relative z-10">
        {/* Video Section - Optimizado para móvil */}
        <div className={`mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? "animate-scale-in" : "opacity-0 scale-75"}`} style={{ animationDelay: "0.3s" }}>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-purple-100 hover:shadow-xl transition-all duration-500 group">
            <div className="text-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                VIDEO EXPLICATIVO
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Descubre el fascinante mundo de las formas
              </p>
            </div>

            <div 
              className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-800 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] cursor-pointer group hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover:scale-[1.02]"
              onClick={handleVideoPlay}
            >
              <div className="absolute inset-2 sm:inset-4 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

              {/* Elementos visuales de geometría en el video - simplificados en móvil */}
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2 items-center">
                <div className="w-2 h-2 sm:w-8 sm:h-8 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 sm:w-8 sm:h-8 bg-pink-300 animate-pulse" style={{ animationDelay: "0.3s" }}></div>
                <div className="w-2 h-2 sm:w-8 sm:h-8 bg-violet-300 animate-pulse" style={{ 
                  animationDelay: "0.6s",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                }}></div>
              </div>

              <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-2 items-center">
                <div className="w-1.5 h-1.5 sm:w-6 sm:h-6 bg-fuchsia-300 animate-pulse" style={{ 
                  animationDelay: "0.9s",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}></div>
                <div className="w-1.5 h-1.5 sm:w-6 sm:h-6 bg-purple-300 animate-pulse" style={{ animationDelay: "1.2s" }}></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-purple-600 transition-colors duration-300" />
                </div>

                <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-purple-800 transition-colors duration-300 px-2">
                  ¿Qué formas ves a tu alrededor?
                </h3>
              </div>

              {/* Representación visual de formas geométricas - responsive */}
              <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-6 items-center">
                {/* Círculo */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 rounded-full border-2 border-purple-400"></div>
                  <span className="text-xs font-bold text-purple-700 hidden sm:block">Círculo</span>
                </div>
                {/* Cuadrado */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 border-2 border-pink-400"></div>
                  <span className="text-xs font-bold text-pink-700 hidden sm:block">Cuadrado</span>
                </div>
                {/* Triángulo */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 border-2 border-violet-400" style={{
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                  }}></div>
                  <span className="text-xs font-bold text-violet-700 hidden sm:block">Triángulo</span>
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
              className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden ${
                animatedElements.has(index) ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Elementos decorativos relacionados con geometría - simplificados en móvil */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-ping"></div>
                <div className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-pink-400 animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <div className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-violet-400 animate-ping" style={{ 
                  animationDelay: "1s",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                }}></div>
              </div>

              {/* Representación visual del tipo de actividad */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                {renderActivityIcon(activity.type)}
              </div>

              <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-purple-200 transition-colors duration-300 w-fit">
                      ACTIVIDAD {activity.id}
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
                <Button
                  onClick={() => handleActivityStart(activity.id)}
                  variant="primary"
                  size="sm"
                  icon={Play}
                  className="hover:scale-105 transition-transform duration-200 hover:shadow-lg text-xs sm:text-sm"
                >
                  {activity.completed ? "Repetir" : "Jugar"}
                </Button>
              </div>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Progress Section - Optimizado para móvil */}
        <div className="mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center break-words">
            Tu Progreso en Geometría
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

        {/* Fun Fact Section - Responsive */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 flex items-center justify-center gap-2 break-words">
              🔺 ¿Sabías qué?
            </h3>
            <p className="text-sm sm:text-base text-purple-700 break-words">
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