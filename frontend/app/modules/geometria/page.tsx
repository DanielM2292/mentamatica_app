"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Star,
  Square,
  Circle,
  Triangle,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Monedas from "@/components/molecules/Monedas";
import StarRating from "@/components/molecules/StarRating";
import PromedioStars from "@/components/molecules/PromedioStars";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  actividad_id: string;
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
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl focus:ring-purple-400",
    ghost:
      "bg-transparent hover:bg-purple-100 text-purple-700 hover:text-purple-800 focus:ring-purple-400",
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
  const [showVideo, setShowVideo] = useState(false);
  const { user } = useUser();

  // Referencias para animaciones GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const funFactRef = useRef<HTMLDivElement>(null);

  // Efecto de entrada progresiva con GSAP
  useEffect(() => {
    // Crear elementos flotantes geométricos - menos en móvil
    const shapesCount = window.innerWidth < 768 ? 6 : 15;
    const shapes = ["circle", "square", "triangle", "hexagon"];
    const colors = [
      "bg-purple-200",
      "bg-pink-200",
      "bg-violet-200",
      "bg-fuchsia-200",
    ];

    const elements = Array.from({ length: shapesCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFloatingElements(elements);

    // Timeline principal de GSAP
    const tl = gsap.timeline();

    // Animación del header
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }

    // Animación de la sección de video
    if (videoSectionRef.current) {
      tl.fromTo(
        videoSectionRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }

    // Animación de las actividades
    if (activitiesRef.current) {
      const activityCards = activitiesRef.current.children;
      tl.fromTo(
        activityCards,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
    }

    // Animación del progreso y fun fact
    if (progressRef.current) {
      tl.fromTo(
        progressRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.1"
      );
    }

    if (funFactRef.current) {
      tl.fromTo(
        funFactRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );
    }

    // Animación de elementos flotantes
    if (floatingElementsRef.current) {
      const floatingEls = floatingElementsRef.current.children;
      gsap.fromTo(
        floatingEls,
        { scale: 0, rotation: 0 },
        {
          scale: 1,
          rotation: 360,
          duration: 1,
          stagger: 0.1,
          ease: "elastic.out(1, 0.3)",
          delay: 0.5,
        }
      );

      // Animación continua de flotación
      gsap.to(floatingEls, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }

    setIsVisible(true);

    // Animaciones de hover para las actividades
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
      actividad_id: "ACT0019",
    },
    {
      id: 2,
      title: "Construye tu Figura",
      description: "Usa puntos y lineas para construir figuras",
      type: "matching",
      difficulty: "medium",
      completed: false,
      actividad_id: "ACT0020",
    },
    {
      id: 3,
      title: "Perímetro Mágico",
      description: "Calcula perímetros para desbloquear cofres",
      type: "matching",
      difficulty: "hard",
      completed: false,
      actividad_id: "ACT0021",
    },
  ];

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleActivityStart = (activityId: number) => {
    console.log(`Intentando navegar a actividad de geometría ${activityId}`);

    if (activityId === 1) {
      console.log("Navegando a Detective de Figuras");
      window.location.href = "/modules/geometria/detectiveFiguras";
    } else if (activityId === 2) {
      console.log("Navegando a Construye tu Figura");
      window.location.href = "/modules/geometria/construyeFiguras";
    } else if (activityId === 3) {
      console.log("Navegando a Perímetro Mágico");
      window.location.href = "/modules/geometria/perimetroMagico";
    } else {
      console.log("Navegando a actividad genérica de geometría");
      window.location.href = `/geometria/actividad/${activityId}`;
    }
  };

  const handleVideoPlay = () => {
    setShowVideo(true);
    // Animación de entrada del modal de video
    gsap.fromTo(
      ".video-modal",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
  };

  const handleCloseVideo = () => {
    // Animación de salida del modal de video
    gsap.to(".video-modal", {
      scale: 0.5,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setShowVideo(false),
    });
  };

  const completedActivities = activities.filter(
    (activity) => activity.completed
  ).length;
  const progressPercentage = (completedActivities / activities.length) * 100;

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "FÁCIL";
      case "medium":
        return "MEDIO";
      case "hard":
        return "DIFÍCIL";
      default:
        return difficulty.toUpperCase();
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

  const ShapeComponent = ({
    shape,
    className,
  }: {
    shape: string;
    className?: string;
  }) => {
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
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
        );
      case "hexagon":
        return (
          <div
            className={`${baseClasses} ${className}`}
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
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
      {/* Elementos flotantes de fondo */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none hidden xs:block"
      >
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
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
      <div className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-pink-100 opacity-30 animate-pulse flex items-center justify-center">
        <Square className="w-6 h-6 sm:w-12 sm:h-12 text-pink-400" />
      </div>
      <div
        className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-violet-100 opacity-30 animate-pulse flex items-center justify-center"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        }}
      >
        <Triangle className="w-6 h-6 sm:w-12 sm:h-12 text-violet-400" />
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10 opacity-0"
      >
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
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <PromedioStars/>
            {user && <Monedas userId={user.id} isVisible={true} />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 relative z-10">
        {/* Video Section */}
        <div ref={videoSectionRef} className="mb-6 sm:mb-8 opacity-0">
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

              {/* Elementos visuales de geometría en el video */}
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2 items-center">
                <div className="w-2 h-2 sm:w-8 sm:h-8 bg-purple-300 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 sm:w-8 sm:h-8 bg-pink-300 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-2 h-2 sm:w-8 sm:h-8 bg-violet-300 animate-pulse"
                  style={{
                    animationDelay: "0.6s",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                ></div>
              </div>

              <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-2 items-center">
                <div
                  className="w-1.5 h-1.5 sm:w-6 sm:h-6 bg-fuchsia-300 animate-pulse"
                  style={{
                    animationDelay: "0.9s",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                ></div>
                <div
                  className="w-1.5 h-1.5 sm:w-6 sm:h-6 bg-purple-300 animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                ></div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-purple-600 transition-colors duration-300" />
                </div>

                <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-purple-800 transition-colors duration-300 px-2">
                  ¿Qué formas ves a tu alrededor?
                </h3>
              </div>

              {/* Representación visual de formas geométricas */}
              <div className="absolute bottom-2 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-6 items-center">
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 rounded-full border-2 border-purple-400"></div>
                  <span className="text-xs font-bold text-purple-700 hidden sm:block">
                    Círculo
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 border-2 border-pink-400"></div>
                  <span className="text-xs font-bold text-pink-700 hidden sm:block">
                    Cuadrado
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div
                    className="w-4 h-4 sm:w-10 sm:h-10 bg-white/50 border-2 border-violet-400"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  ></div>
                  <span className="text-xs font-bold text-violet-700 hidden sm:block">
                    Triángulo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div
          ref={activitiesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden opacity-0"
            >
              {/* Elementos decorativos relacionados con geometría */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-purple-400 rounded-full animate-ping"></div>
                <div
                  className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-pink-400 animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 sm:w-4 sm:h-4 bg-violet-400 animate-ping"
                  style={{
                    animationDelay: "1s",
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  }}
                ></div>
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
                    <span
                      className={`text-xs px-2 py-1 rounded-full transition-all duration-300 w-fit ${getDifficultyStyles(activity.difficulty)}`}
                    >
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
                {typeof window !== "undefined" && (
                  <StarRating 
                  activityLocation={window.location.pathname.split("/").pop() as string}
                  activityId={activity.actividad_id}
                  />
                )}
                
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

        {/* Progress Section */}
        <div
          ref={progressRef}
          className="mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg opacity-0"
        >
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
              {completedActivities} de {activities.length} actividades
              completadas
            </p>
          </div>
        </div>

        {/* Fun Fact Section */}
        <div
          ref={funFactRef}
          className="mt-6 sm:mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100 opacity-0"
        >
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 flex items-center justify-center gap-2 break-words">
              🔺 ¿Sabías qué?
            </h3>
            <p className="text-sm sm:text-base text-purple-700 break-words">
              Las formas geométricas están en todas partes: las ruedas son
              círculos, las ventanas son cuadrados, y los techos de las casas
              son triángulos. ¡La geometría nos ayuda a entender el mundo que
              nos rodea!
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Video de YouTube */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="video-modal bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Geometría para Niños - Formas y Figuras
              </h3>
              <Button
                onClick={handleCloseVideo}
                variant="ghost"
                size="sm"
                icon={X}
                className="hover:bg-gray-100"
              />
            </div>
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/CC_SXuBXu_U?autoplay=1&rel=0"
                title="Geometría para Niños"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeometriaPage;
