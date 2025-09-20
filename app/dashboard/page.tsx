"use client";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Brain,
  Star,
  Trophy,
  Clock,
  Settings,
  Volume2,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Monedas from "@/components/molecules/Monedas";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import EnhancedCognitiveModal from "@/components/organisms/EnhancedCognitiveModal";
import { useCognitiveAudio } from "@/hooks/useCognitiveAudio";
import StatsCard from "@/components/molecules/StatsCard";
import StarRating from "@/components/molecules/StarRating";
import MetricDisplay from "@/components/molecules/MetricDisplay";
import ProgressBar from "@/components/organisms/ProgressBar";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface Module {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
  progress: number;
  actividad_id: string;
}

interface UserStats {
  name: string;
  totalStars: number;
  totalCoins: number;
  streak: number;
  timeSpent: number;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  // Hook de audio cognitivo
  const {
    currentAudio,
    isPlaying,
    isAvailable,
    showCognitiveModal,
    setShowCognitiveModal,
    cognitiveAudios,
    playAudio,
    stopAudio,
    // Nota: Estas funciones están disponibles pero NO se usan automáticamente
    playWelcomeAudio,
    playFocusAudio,
  } = useCognitiveAudio();

  // Referencias para animaciones GSAP
  const headerRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);
  const starsCounterRef = useRef<HTMLDivElement>(null);
  const coinsCounterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const [userStats, setUserStats] = useState<UserStats>({
    name: "Nombre/Apodo",
    totalStars: 2,
    totalCoins: 1,
    streak: 0,
    timeSpent: 23,
  });

  const [modules] = useState<Module[]>([
    {
      id: "conjuntos",
      name: "CONJUNTOS",
      icon: "./images/icons/conjuntos.png",
      description: "Agrupa elementos",
      color: "#FF69B4",
      bgColor: "from-pink-200 to-purple-200",
      progress: 0,
      actividad_id: "MOD0001",
    },
    {
      id: "numeracion",
      name: "NUMERACIÓN",
      icon: "./images/icons/numeracion.png",
      description: "Aprende números",
      color: "#4169E1",
      bgColor: "from-blue-200 to-indigo-200",
      progress: 0,
      actividad_id: "MOD0002",
    },
    {
      id: "suma",
      name: "SUMA",
      icon: "./images/icons/suma.png",
      description: "Suma fácil",
      color: "#32CD32",
      bgColor: "from-green-200 to-emerald-200",
      progress: 0,
      actividad_id: "MOD0003",
    },
    {
      id: "resta",
      name: "RESTA",
      icon: "./images/icons/resta.png",
      description: "Resta simple",
      color: "#FF4500",
      bgColor: "from-orange-200 to-red-200",
      progress: 0,
      actividad_id: "MOD0004",
    },
    {
      id: "multiplicacion",
      name: "MULTIPLICACIÓN",
      icon: "./images/icons/multiplicacion.png",
      description: "Multiplica",
      color: "#8B4513",
      bgColor: "from-yellow-200 to-orange-200",
      progress: 0,
      actividad_id: "MOD0005",
    },
    {
      id: "division",
      name: "DIVISIÓN",
      icon: "./images/icons/division.png",
      description: "Divide y reparte",
      color: "#20B2AA",
      bgColor: "from-cyan-200 to-teal-200",
      progress: 0,
      actividad_id: "MOD0006",
    },
    {
      id: "geometria",
      name: "GEOMETRÍA",
      icon: "./images/icons/geometria.png",
      description: "Formas divertidas",
      color: "#9370DB",
      bgColor: "from-purple-200 to-pink-200",
      progress: 0,
      actividad_id: "MOD0007",
    },
  ]);

  // Animaciones GSAP - Principios de neurociencia cognitiva
  useEffect(() => {
    const tl = gsap.timeline();

    // Header
    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power1.out" }
    );

    // Logo animación rotatoria
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });
    }

    // Welcome
    if (welcomeRef.current) {
      const children = Array.from(welcomeRef.current.children);
      tl.fromTo(
        children,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power1.out",
        },
        "-=0.3"
      );
    }

    // Stats
    if (statsRef.current) {
      const children = Array.from(statsRef.current.children);
      tl.fromTo(
        children,
        { y: 20, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power1.out",
        },
        "-=0.2"
      );
    }

    // Modules
    if (modulesRef.current) {
      const children = Array.from(modulesRef.current.children);
      tl.fromTo(
        children,
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: { amount: 0.6, from: "start", ease: "power1.out" },
          ease: "power1.out",
        },
        "-=0.2"
      );
    }

    // Counters
    if (starsCounterRef.current) {
      gsap.to(starsCounterRef.current, {
        text: (userStats.totalStars || 0).toString(),
        duration: 2,
        ease: "power2.out",
        snap: { text: 1 },
        delay: 1.5,
      });
    }

    if (coinsCounterRef.current) {
      gsap.to(coinsCounterRef.current, {
        text: (userStats.totalCoins || 0).toString(),
        duration: 2,
        ease: "power2.out",
        snap: { text: 1 },
        delay: 1.7,
      });
    }

    // Scroll Animations
    if (progressRef.current) {
      ScrollTrigger.create({
        trigger: progressRef.current,
        start: "top 80%",
        animation: gsap.fromTo(
          progressRef.current,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power1.out" }
        ),
      });
    }

    if (tipsRef.current) {
      const children = Array.from(tipsRef.current.children);
      ScrollTrigger.create({
        trigger: tipsRef.current,
        start: "top 85%",
        animation: gsap.fromTo(
          children,
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power1.out",
          }
        ),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [userStats.totalStars, userStats.totalCoins]);

  // Animaciones de hover para módulos (principio de feedback inmediato)
  const handleModuleHover = (moduleId: string, isHovering: boolean) => {
    const moduleElement = document.querySelector(
      `[data-module-id="${moduleId}"]`
    );
    if (moduleElement) {
      gsap.to(moduleElement, {
        scale: isHovering ? 1.02 : 1,
        y: isHovering ? -2 : 0,
        duration: 0.2,
        ease: "power1.out",
      });

      // Efecto de partículas en hover
      if (isHovering) {
        const particles = moduleElement.querySelectorAll(".particle");
        particles.forEach((particle, index) => {
          gsap.to(particle, {
            scale: 1.2,
            opacity: 0.6,
            duration: 0.3,
            delay: index * 0.1,
            ease: "power1.out",
          });
        });
      }
    }
  };

  // Animación de click para módulos (refuerzo positivo)
  const handleModuleClick = (moduleId: string) => {
    const moduleElement = document.querySelector(
      `[data-module-id="${moduleId}"]`
    );
    if (moduleElement) {
      gsap.to(moduleElement, {
        scale: 0.98,
        duration: 0.1,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(moduleElement, {
            scale: 1,
            duration: 0.15,
            ease: "power1.out",
          });
        },
      });

      // Efecto de ondas expansivas
      const ripple = document.createElement("div");
      ripple.className =
        "absolute inset-0 rounded-xl bg-white opacity-30 pointer-events-none";
      moduleElement.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.3 },
        {
          scale: 2,
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => ripple.remove(),
        }
      );
    }
  };

  // Componente de módulo optimizado para móviles
  const ModuleCard = React.memo(
    ({
      module,
      index,
      animatingModule,
      isMobile,
      isSmallMobile,
    }: {
      module: Module;
      index: number;
      animatingModule: string | null;
      isMobile: boolean;
      isSmallMobile: boolean;
    }) => (
      <Link
        href={`/modules/${module.id}`}
        className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95
        ${animatingModule === module.id ? "animate-shake" : ""}
      `}
        data-module-id={module.id}
        onMouseEnter={() => !isMobile && handleModuleHover(module.id, true)}
        onMouseLeave={() => !isMobile && handleModuleHover(module.id, false)}
        onClick={(e) => handleModuleClick(module.id)}
      >
        <div
          className={`bg-gradient-to-br ${module.bgColor} rounded-lg sm:rounded-xl lg:rounded-2xl 
          p-2 sm:p-3 lg:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 
          relative overflow-hidden
          ${isSmallMobile ? "min-h-[100px]" : isMobile ? "min-h-[110px]" : "min-h-[140px] lg:min-h-[180px]"}
          flex flex-col items-center justify-center`}
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

          {/* Partículas GSAP */}
          <div className="particle absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="particle absolute bottom-2 left-2 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60"></div>

          {/* Icono del módulo - Mejorado para móviles */}
          <div
            className={`${isSmallMobile ? "text-lg mb-1" : isMobile ? "text-xl mb-1" : "text-2xl lg:text-4xl mb-2 lg:mb-3"} animate-bounce-gentle`}
          >
            {module.icon.startsWith("./") || module.icon.startsWith("/") ? (
              <img
                src={module.icon}
                alt={module.name}
                className={`${isSmallMobile ? "w-5 h-5" : isMobile ? "w-6 h-6" : "w-8 h-8 lg:w-12 lg:h-12"} object-contain mx-auto`}
                draggable={false}
                loading="lazy"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = "📚";
                  }
                }}
              />
            ) : (
              <span>{module.icon}</span>
            )}
          </div>

          {/* Nombre del módulo - Optimizado para móviles */}
          <h3
            className={`
        ${isSmallMobile ? "text-xs" : isMobile ? "text-xs" : "text-sm lg:text-lg"} 
        font-bold text-gray-800 text-center mb-1 px-1 leading-tight
        ${isSmallMobile ? "line-clamp-1" : "line-clamp-2"}
      `}
          >
            {module.name}
          </h3>

          {/* Descripción - Solo en pantallas grandes */}
          {!isMobile && (
            <p className="hidden lg:block text-sm text-gray-600 text-center mb-3">
              {module.description}
            </p>
          )}

          {/* Progreso y estrellas - Compacto para móviles con mejores colores */}
          <div className="flex items-center gap-0.5 sm:gap-1 stars-container">
            {typeof window !== "undefined" && (
              <StarRating
                activityLocation={window.location.pathname.split("/").pop() as string}
                activityId={module.actividad_id}
              />
            )}
          </div>

          {/* Efectos de partículas para módulos desbloqueados - Reducidos en móviles */}
          {!isSmallMobile && (
            <>
              <div
                className="absolute top-1 right-1 sm:top-2 sm:right-2 text-xs animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                ✨
              </div>
              <div
                className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-xs animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                🌟
              </div>
            </>
          )}
        </div>
      </Link>
    )
  );

  ModuleCard.displayName = "ModuleCard";

  // Detectar tamaños de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Actualizar nombre del usuario cuando esté disponible
  useEffect(() => {
    if (user) {
      setUserStats((prev) => ({
        ...prev,
        name: user.fullName || user.username || "Usuario",
      }));
    }
  }, [user]);

  // REMOVIDO: Reproducción automática de audio de bienvenida
  // Los audios ahora solo se reproducen cuando el usuario los solicita explícitamente

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Header - Ultra optimizado para móviles */}
      <header
        ref={headerRef}
        className="relative z-10 flex justify-between items-center p-2 sm:p-4 lg:p-6 bg-white/80 backdrop-blur-sm shadow-lg"
      >
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              ref={logoRef}
              src="/images/logo.png"
              alt="Logo MentaMática"
              className={`${isSmallMobile ? "w-6 h-6" : "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"}`}
              loading="eager"
            />
            <div
              className={`absolute -top-0.5 -right-0.5 ${isSmallMobile ? "w-2 h-2" : "w-3 h-3 sm:w-4 sm:h-4"} bg-yellow-400 rounded-full animate-bounce`}
            ></div>
          </div>
          {/* Título responsivo */}
          <h1
            className={`${isSmallMobile ? "hidden" : "hidden sm:block"} text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate`}
          >
            MentaMática
          </h1>
        </div>

        <div
          className={`flex items-center ${isSmallMobile ? "gap-1" : "gap-1 sm:gap-2 lg:gap-4"} flex-shrink-0`}
        >
          {/* Contenedor de estrellas */}
          <MetricDisplay />

          {/* Contenedor de monedas */}
          {user && <Monedas userId={user.id} isVisible={true} />}

          {/* Botón de Configuración */}
          <Link href="/settings">
            <button
              type="button"
              className={`bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white ${isSmallMobile ? "p-1.5" : "p-2 sm:p-3"} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50`}
              title="Configuración"
            >
              <Settings
                className={`${isSmallMobile ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"}`}
              />
            </button>
          </Link>

          {/* Botón de Audio Cognitivo - Mejorado con indicador de disponibilidad */}
          <button
            onClick={() => setShowCognitiveModal(!showCognitiveModal)}
            className={`bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white ${isSmallMobile ? "p-1.5" : "p-2 sm:p-3"} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 relative ${currentAudio ? "animate-pulse" : ""}`}
            title={`Estimulación Cognitiva ${!isAvailable ? "(No disponible)" : ""}`}
          >
            {currentAudio ? (
              <Volume2
                className={`${isSmallMobile ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"} animate-bounce`}
              />
            ) : (
              <Brain
                className={`${isSmallMobile ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"}`}
              />
            )}

            {/* Indicador de disponibilidad */}
            <div
              className={`absolute -top-1 -right-1 ${isSmallMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full ${isAvailable ? "bg-green-400" : "bg-red-400"
                }`}
            ></div>
          </button>

          {/* UserButton de Clerk para cerrar sesión */}
          <div
            className={`${isSmallMobile ? "scale-75" : "scale-90 sm:scale-100 lg:scale-110"}`}
          >
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: `${isSmallMobile ? "w-6 h-6" : "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"} ring-2 ring-white/20 ring-offset-2 ring-offset-transparent hover:ring-blue-400 transition-all duration-300`,
                  userButtonPopoverCard:
                    "rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm",
                  userButtonPopoverActions: "rounded-xl",
                  userButtonPopoverActionButton:
                    "rounded-lg hover:bg-gray-100/80 transition-colors duration-200",
                  userButtonPopoverActionButtonText: "font-medium",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </div>
        </div>
      </header>

      {/* Modal de Audio Cognitivo Mejorado */}
      <EnhancedCognitiveModal
        isOpen={showCognitiveModal}
        onClose={() => setShowCognitiveModal(false)}
        currentAudio={currentAudio}
        isPlaying={isPlaying}
        onPlayAudio={playAudio}
        onStopAudio={stopAudio}
        isMobile={isMobile}
        isSmallMobile={isSmallMobile}
      />

      {/* Main Content */}
      <main
        className={`relative z-10 container mx-auto ${isSmallMobile ? "px-1 py-2" : "px-2 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8"} pb-20 sm:pb-8`}
      >
        {/* Welcome Section - Optimizado para móviles */}
        <div
          ref={welcomeRef}
          className={`text-center ${isSmallMobile ? "mb-3" : "mb-4 sm:mb-8 lg:mb-12"}`}
        >
          <h2
            className={`${isSmallMobile ? "text-lg" : "text-xl sm:text-2xl lg:text-4xl"} font-bold ${isSmallMobile ? "mb-1" : "mb-1 sm:mb-2 lg:mb-4"} text-gray-800 px-2`}
          >
            Bienvenid@ {user?.username || userStats.name}
          </h2>
          <p
            className={`${isSmallMobile ? "text-sm" : "text-sm sm:text-lg lg:text-xl"} text-gray-600 px-2`}
          >
            ¿Qué quieres aprender hoy?
          </p>
          {currentAudio && (
            <div
              className={`${isSmallMobile ? "mt-1" : "mt-2 sm:mt-4"} flex items-center justify-center gap-1 sm:gap-2 text-purple-600 animate-pulse px-2`}
            >
              <Volume2
                className={`${isSmallMobile ? "w-3 h-3" : "w-4 h-4 sm:w-5 sm:h-5"}`}
              />
              <span
                className={`${isSmallMobile ? "text-xs" : "text-xs sm:text-sm"} font-medium text-center`}
              >
                <span
                  className={`${isSmallMobile ? "inline" : "hidden sm:inline"}`}
                >
                  Reproduciendo estimulación cognitiva...
                </span>
                <span className={`${isSmallMobile ? "hidden" : "sm:hidden"}`}>
                  Audio cognitivo activo
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Stats Bar - Compacto para móviles */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 lg:grid-cols-4 ${isSmallMobile ? "gap-1 mb-3" : "gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-8 lg:mb-12"}`}
        >
          <StatsCard
            icon={<Star />}
            title="Estrellas"
            gradient="from-yellow-400 to-orange-400"
          />
          {user && (
            <StatsCard
              icon={<Trophy />}
              title="Racha"
              user={user.id}
              suffix=" dias"
              gradient="from-green-400 to-emerald-400"
            />
          )}
          {user && (
            <StatsCard
              icon={<Clock />}
              title="Tiempo"
              user={user.id}
              gradient="from-blue-400 to-indigo-400"
            />
          )}
          {user && (
            <StatsCard
              icon={<Brain />}
              title="Nivel"
              user={user.id}
              gradient="from-purple-400 to-pink-400"
            />
          )}
        </div>

        {/* Modules Grid - Optimizado para móviles */}
        <div
          ref={modulesRef}
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ${isSmallMobile ? "gap-1" : "gap-2 sm:gap-4 lg:gap-6"} max-w-7xl mx-auto`}
        >
          {modules.map((module, index) => (
            <ModuleCard
              animatingModule={null}
              key={module.id}
              module={module}
              index={index}
              isMobile={isMobile}
              isSmallMobile={isSmallMobile}
            />
          ))}
        </div>

        {/* Floating Action Button para móviles */}
        {isMobile && (
          <div
            className={`fixed ${isSmallMobile ? "bottom-2 right-2" : "bottom-4 right-4"} z-40`}
          >
            <button
              onClick={() => setShowCognitiveModal(!showCognitiveModal)}
              className={`${isSmallMobile ? "w-12 h-12" : "w-14 h-14"} bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 flex items-center justify-center relative ${currentAudio ? "animate-pulse" : ""}`}
            >
              {currentAudio ? (
                <Volume2
                  className={`${isSmallMobile ? "w-5 h-5" : "w-6 h-6"} animate-bounce`}
                />
              ) : (
                <Brain className={`${isSmallMobile ? "w-5 h-5" : "w-6 h-6"}`} />
              )}

              {/* Indicador de disponibilidad en móvil */}
              <div
                className={`absolute -top-1 -right-1 ${isSmallMobile ? "w-2 h-2" : "w-3 h-3"} rounded-full ${isAvailable ? "bg-green-400" : "bg-red-400"
                  }`}
              ></div>
            </button>
          </div>
        )}

        {/* Progress Indicator - Responsive mejorado */}
        <div
          ref={progressRef}
          className={`${isSmallMobile ? "mt-4 px-2" : "mt-8 lg:mt-12 px-4 sm:px-6 lg:px-0"}`}
        >
          <div
            className={`bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl ${isSmallMobile ? "p-3" : "p-4 sm:p-6"} shadow-lg max-w-4xl mx-auto transform hover:scale-102 transition-all duration-500 relative overflow-hidden`}
          >
            {/* Estrellas flotantes decorativas - Reducidas en móviles */}
            {!isSmallMobile && (
              <div className="absolute -top-2 -right-2 flex gap-1">
                <span className="text-yellow-400 animate-twinkle-fast text-sm sm:text-base">
                  ⭐
                </span>
                <span
                  className="text-pink-400 animate-twinkle-fast text-sm sm:text-base"
                  style={{ animationDelay: "0.3s" }}
                >
                  ✨
                </span>
                <span
                  className="text-blue-400 animate-twinkle-fast text-sm sm:text-base"
                  style={{ animationDelay: "0.6s" }}
                >
                  🌟
                </span>
              </div>
            )}

            <h3
              className={`${isSmallMobile ? "text-base" : "text-lg sm:text-xl"} font-bold text-gray-800 ${isSmallMobile ? "mb-2" : "mb-4"} flex items-center gap-1 sm:gap-2`}
            >
              <div className="relative">
                <Trophy
                  className={`${isSmallMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"} text-yellow-500`}
                />
                <div
                  className={`absolute inset-0 ${isSmallMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"} bg-yellow-300 rounded-full opacity-30 animate-ping`}
                ></div>
              </div>
              <span className={isSmallMobile ? "text-sm" : ""}>
                Tu Progreso de Aprendizaje
              </span>
              <span
                className={`${isSmallMobile ? "text-base" : "text-lg sm:text-xl"}`}
              >
                🎉
              </span>
            </h3>

            {/* Barra de progreso general animada */}
            <div
              className={`${isSmallMobile ? "mb-3" : "mb-6"} bg-gray-200 rounded-full ${isSmallMobile ? "h-2" : "h-3 sm:h-4"} overflow-hidden shadow-inner`}
            >
              <div
                className={`${isSmallMobile ? "h-2" : "h-3 sm:h-4"} bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full relative`}
                style={{
                  width: `${Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.filter.length || 0)}%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-progress"></div>
                <div
                  className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${isSmallMobile ? "w-1 h-1" : "w-2 h-2"} bg-white rounded-full animate-bounce-tiny`}
                ></div>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${isSmallMobile ? "gap-2" : "gap-3 sm:gap-4"}`}
            >
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`flex items-center ${isSmallMobile ? "gap-2 p-2" : "gap-3 p-3 sm:p-4"} bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 relative overflow-hidden`}
                >
                  {/* Efecto de brillo que pasa ocasionalmente - Solo en desktop */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rainbow-shimmer to-transparent opacity-0 animate-random-shimmer"></div>
                  )}

                  {/* Icono del módulo con efectos */}
                  <div
                    className={`relative ${isSmallMobile ? "w-8 h-8" : "w-10 h-10 sm:w-12 sm:h-12"} bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full animate-pulse-color opacity-50"></div>
                    {module.icon.startsWith("./") ||
                      module.icon.startsWith("/") ? (
                      <img
                        src={module.icon}
                        alt={module.name}
                        className={`${isSmallMobile ? "w-4 h-4" : "w-5 h-5 sm:w-6 sm:h-6"} object-contain relative z-10`}
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={`${isSmallMobile ? "text-sm" : "text-base sm:text-lg"} relative z-10`}
                      >
                        {module.icon}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-semibold text-gray-800 ${isSmallMobile ? "text-xs mb-1" : "text-sm sm:text-base mb-1"} truncate`}
                    >
                      {module.name}
                    </h4>

                    {/* Estrellas con colores mejorados para mayor visibilidad */}
                    {typeof window !== "undefined" && (
                      <StarRating
                        activityLocation={window.location.pathname.split("/").pop() as string}
                        activityId={module.actividad_id}
                      />
                    )}

                    {/* Barra de progreso individual con animaciones */}
                    {typeof window !== "undefined" && (
                      <ProgressBar
                        activityLocation={window.location.pathname.split("/").pop() as string}
                        activityId={module.actividad_id}
                        isSmallMobile={isSmallMobile}
                      />
                    )}

                    {/* Indicador de completado */}
                    {module.progress === 100 && (
                      <div className="absolute top-1 right-1">
                        <span className="text-green-500 animate-bounce text-lg">
                          ✅
                        </span>
                        <div className="absolute inset-0 w-4 h-4 bg-green-300 rounded-full opacity-30 animate-ping"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje motivacional animado */}
            <div className={`${isSmallMobile ? "mt-2" : "mt-4"} text-center`}>
              <div
                className={`inline-flex items-center ${isSmallMobile ? "gap-1 px-2 py-1" : "gap-2 px-4 py-2"} bg-gradient-to-r from-green-100 to-blue-100 rounded-full shadow-sm`}
              >
                <span
                  className={`text-green-600 ${isSmallMobile ? "text-base" : "text-lg"}`}
                >
                  🚀
                </span>
                <span
                  className={`${isSmallMobile ? "text-xs" : "text-sm sm:text-base"} font-medium text-gray-700`}
                >
                  ¡Sigue así, campeón!
                </span>
                <span
                  className={`text-yellow-500 ${isSmallMobile ? "text-base" : "text-lg"}`}
                >
                  ⭐
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips para padres - Responsive mejorado */}
        <div
          ref={tipsRef}
          className={`${isSmallMobile ? "mt-4 px-2" : "mt-6 lg:mt-8 px-4 sm:px-6 lg:px-0"}`}
        >
          <div
            className={`bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl lg:rounded-2xl ${isSmallMobile ? "p-3" : "p-4 sm:p-6"} shadow-lg max-w-4xl mx-auto transform hover:scale-102 transition-all duration-500 relative overflow-hidden`}
          >
            <h3
              className={`${isSmallMobile ? "text-base" : "text-lg sm:text-xl"} font-bold text-gray-800 ${isSmallMobile ? "mb-2" : "mb-4"} flex items-center gap-1 sm:gap-2 relative z-10`}
            >
              <span
                className={`${isSmallMobile ? "text-lg" : "text-xl sm:text-2xl"}`}
              >
                💡
              </span>
              <span className={isSmallMobile ? "text-sm" : ""}>
                Tips para Padres
              </span>
              <span
                className={`${isSmallMobile ? "text-base" : "text-lg sm:text-xl"}`}
              >
                🧠
              </span>
            </h3>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${isSmallMobile ? "gap-2 text-xs" : "gap-3 sm:gap-4 text-sm sm:text-base"} text-gray-700 relative z-10`}
            >
              <div
                className={`bg-white/70 ${isSmallMobile ? "p-2" : "p-3 sm:p-4"} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl backdrop-blur-sm border border-white/30 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                <h4
                  className={`font-semibold ${isSmallMobile ? "mb-1" : "mb-2"} flex items-center gap-1 sm:gap-2`}
                >
                  <span className={`${isSmallMobile ? "text-sm" : "text-lg"}`}>
                    🧠
                  </span>
                  <span className="text-purple-700">Neuroplasticidad</span>
                </h4>
                <p className="leading-relaxed">
                  Los audios cognitivos ayudan a crear nuevas conexiones
                  neuronales que facilitan el aprendizaje matemático.
                </p>
              </div>

              <div
                className={`bg-white/70 ${isSmallMobile ? "p-2" : "p-3 sm:p-4"} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl backdrop-blur-sm border border-white/30 relative overflow-hidden`}
              >
                <div
                  className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full animate-ping"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <h4
                  className={`font-semibold ${isSmallMobile ? "mb-1" : "mb-2"} flex items-center gap-1 sm:gap-2`}
                >
                  <span className={`${isSmallMobile ? "text-sm" : "text-lg"}`}>
                    ⏰
                  </span>
                  <span className="text-blue-700">Sesiones Cortas</span>
                </h4>
                <p className="leading-relaxed">
                  15-20 minutos diarios son ideales. La consistencia es más
                  importante que la duración.
                </p>
              </div>

              <div
                className={`bg-white/70 ${isSmallMobile ? "p-2" : "p-3 sm:p-4"} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl backdrop-blur-sm border border-white/30 relative overflow-hidden`}
              >
                <div
                  className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
                <h4
                  className={`font-semibold ${isSmallMobile ? "mb-1" : "mb-2"} flex items-center gap-1 sm:gap-2`}
                >
                  <span className={`${isSmallMobile ? "text-sm" : "text-lg"}`}>
                    🎯
                  </span>
                  <span className="text-green-700">Refuerzo Positivo</span>
                </h4>
                <p className="leading-relaxed">
                  Celebra cada logro, por pequeño que sea. Esto fortalece la
                  motivación intrínseca.
                </p>
              </div>

              <div
                className={`bg-white/70 ${isSmallMobile ? "p-2" : "p-3 sm:p-4"} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl backdrop-blur-sm border border-white/30 relative overflow-hidden`}
              >
                <div
                  className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <h4
                  className={`font-semibold ${isSmallMobile ? "mb-1" : "mb-2"} flex items-center gap-1 sm:gap-2`}
                >
                  <span className={`${isSmallMobile ? "text-sm" : "text-lg"}`}>
                    🌟
                  </span>
                  <span className="text-yellow-700">Paciencia</span>
                </h4>
                <p className="leading-relaxed">
                  Cada niño tiene su ritmo. Respeta sus tiempos de procesamiento
                  y aprendizaje.
                </p>
              </div>
            </div>

            {/* Información sobre audios */}
            <div
              className={`${isSmallMobile ? "mt-2 p-2" : "mt-4 p-3"} bg-purple-50 rounded-lg border border-purple-200`}
            >
              <h4
                className={`font-semibold ${isSmallMobile ? "mb-1" : "mb-2"} flex items-center gap-1 sm:gap-2 text-purple-700`}
              >
                <Volume2 className="w-4 h-4" />
                <span className={isSmallMobile ? "text-xs" : "text-sm"}>
                  Audios Cognitivos
                </span>
              </h4>
              <p
                className={`${isSmallMobile ? "text-xs" : "text-sm"} text-purple-600`}
              >
                Haz clic en el botón del cerebro para acceder a audios
                especializados en estimulación cognitiva. Cada audio está
                diseñado con principios de neurociencia para mejorar el
                aprendizaje.
              </p>
            </div>
          </div>
        </div>

        {/* Footer decorativo - Responsive mejorado */}
        <div
          className={`${isSmallMobile ? "mt-4" : "mt-8 lg:mt-12"} text-center px-4`}
        >
          <div
            className={`flex flex-col sm:flex-row items-center justify-center ${isSmallMobile ? "gap-1" : "gap-2 sm:gap-4"} text-gray-400 ${isSmallMobile ? "text-xs" : "text-sm"}`}
          >
            <div
              className={`flex items-center ${isSmallMobile ? "gap-1" : "gap-2"}`}
            >
              <span className="transform hover:scale-110 transition-transform duration-300 hover:text-gray-600">
                Hecho con
              </span>
              <span className="text-red-400 animate-heartbeat text-lg transform hover:scale-125 transition-transform duration-300 cursor-pointer">
                ❤️
              </span>
              <span className="transform hover:scale-110 transition-transform duration-300 hover:text-gray-600">
                para pequeños genios
              </span>
            </div>
            <div className={`flex ${isSmallMobile ? "gap-0.5" : "gap-1"}`}>
              <span
                className="animate-bounce text-yellow-400"
                style={{ animationDelay: "0s" }}
              >
                ✨
              </span>
              <span
                className="animate-bounce text-pink-400"
                style={{ animationDelay: "0.2s" }}
              >
                🌟
              </span>
              <span
                className="animate-bounce text-blue-400"
                style={{ animationDelay: "0.4s" }}
              >
                ⭐
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* CSS personalizado para animaciones cognitivas optimizadas */}
      <style jsx>{`
        /* Animaciones GSAP mejoradas para neurociencia cognitiva */
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.2);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.2);
          }
          70% {
            transform: scale(1);
          }
        }

        @keyframes shine-progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce-tiny {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes random-shimmer {
          0%,
          90%,
          100% {
            opacity: 0;
          }
          5%,
          15% {
            opacity: 0.3;
          }
        }

        @keyframes pulse-color {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes shine-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes twinkle-fast {
          0%,
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2) rotate(180deg);
          }
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-shine-progress {
          animation: shine-progress 2s linear infinite;
        }

        .animate-bounce-tiny {
          animation: bounce-tiny 1s ease-in-out infinite;
        }

        .animate-random-shimmer {
          animation: random-shimmer 8s linear infinite;
        }

        .animate-pulse-color {
          animation: pulse-color 2s ease-in-out infinite;
        }

        .animate-shine-fast {
          animation: shine-fast 1.5s linear infinite;
        }

        .animate-twinkle-fast {
          animation: twinkle-fast 1.5s ease-in-out infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Optimizaciones para dispositivos móviles */
        @media (max-width: 640px) {
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01s !important;
          }
        }
      `}</style>
    </div>
  );
}
