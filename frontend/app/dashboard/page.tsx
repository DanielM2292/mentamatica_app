"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Brain, Star, Trophy, Clock, Settings, User, Volume2, Play, Pause } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

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

interface UserStats {
  name: string;
  totalStars: number;
  streak: number;
  timeSpent: number;
  level: number;
}

interface CognitiveAudio {
  id: string;
  title: string;
  description: string;
  category: 'motivacion' | 'concentracion' | 'relajacion' | 'celebracion';
  duration: string;
  audioUrl: string;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const [userStats, setUserStats] = useState<UserStats>({
    name: "Nombre/Apodo",
    totalStars: 0,
    streak: 0,
    timeSpent: 0,
    level: 1,
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
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "numeracion",
      name: "NUMERACIÓN",
      icon: "./images/icons/numeracion.png",
      description: "Aprende números",
      color: "#4169E1",
      bgColor: "from-blue-200 to-indigo-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "suma",
      name: "SUMA",
      icon: "./images/icons/suma.png",
      description: "Suma fácil",
      color: "#32CD32",
      bgColor: "from-green-200 to-emerald-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "resta",
      name: "RESTA",
      icon: "./images/icons/resta.png",
      description: "Resta simple",
      color: "#FF4500",
      bgColor: "from-orange-200 to-red-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "multiplicacion",
      name: "MULTIPLICACIÓN",
      icon: "./images/icons/multiplicacion.png",
      description: "Multiplica",
      color: "#8B4513",
      bgColor: "from-yellow-200 to-orange-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "division",
      name: "DIVISIÓN",
      icon: "./images/icons/division.png",
      description: "Divide y reparte",
      color: "#20B2AA",
      bgColor: "from-cyan-200 to-teal-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
    {
      id: "geometria",
      name: "GEOMETRÍA",
      icon: "./images/icons/geometria.png",
      description: "Formas divertidas",
      color: "#9370DB",
      bgColor: "from-purple-200 to-pink-200",
      progress: 0,
      stars: 0,
      isUnlocked: true,
    },
  ]);

  // Audios basados en neurociencia cognitiva para niños
  const cognitiveAudios: CognitiveAudio[] = useMemo(() => [
    {
      id: "welcome-motivation",
      title: "¡Hola pequeño genio!",
      description: "Audio de bienvenida que activa la motivación intrínseca",
      category: "motivacion",
      duration: "30s",
      audioUrl: "/audios/welcome-motivation.mp3"
    },
    {
      id: "focus-breathing",
      title: "Respiración para concentrarse",
      description: "Técnica de respiración que mejora la atención sostenida",
      category: "concentracion",
      duration: "45s",
      audioUrl: "/audios/focus-breathing.mp3"
    },
    {
      id: "success-celebration",
      title: "¡Lo lograste!",
      description: "Celebración que refuerza el aprendizaje mediante dopamina",
      category: "celebracion",
      duration: "20s",
      audioUrl: "/audios/success-celebration.mp3"
    },
    {
      id: "calm-transition",
      title: "Momento de calma",
      description: "Audio de transición que regula el sistema nervioso",
      category: "relajacion",
      duration: "60s",
      audioUrl: "/audios/calm-transition.mp3"
    }
  ], []);

  const [animatingModule, setAnimatingModule] = useState<string | null>(null);
  const [showCognitivePanel, setShowCognitivePanel] = useState(false);

  // Componente de tarjeta de estadísticas optimizado
  const StatsCard = React.memo(({ icon, title, value, gradient }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    gradient: string;
  }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
        <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white"
          })}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm text-gray-600 truncate">{title}</p>
          <p className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-800 truncate">{value}</p>
        </div>
      </div>
    </div>
  ));

  StatsCard.displayName = 'StatsCard';

  // Componente de módulo optimizado para móviles
  const ModuleCard = React.memo(({
    module,
    index,
    animatingModule,
    isMobile,
    isSmallMobile
  }: {
    module: Module;
    index: number;
    animatingModule: string | null;
    isMobile: boolean;
    isSmallMobile: boolean;
  }) => (
    <Link
      href={module.isUnlocked ? `/modules/${module.id}` : "#"}
      className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 active:scale-95
        ${animatingModule === module.id ? "animate-shake" : ""}
        ${!module.isUnlocked ? "opacity-60" : ""}
      `}
      onClick={(e) => {
        if (!module.isUnlocked) {
          e.preventDefault();
          setAnimatingModule(module.id);
          setTimeout(() => setAnimatingModule(null), 600);
        } else {
          const focusAudio = cognitiveAudios.find(audio => audio.id === "focus-breathing");
          if (focusAudio) {
            playAudio(focusAudio.id);
          }
        }
      }}
    >
      <div
         className={`bg-gradient-to-br ${module.bgColor} rounded-lg sm:rounded-xl lg:rounded-2xl 
          p-2 sm:p-3 lg:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 
          relative overflow-hidden
          ${module.isUnlocked ? "hover:-translate-y-1 sm:hover:-translate-y-2" : ""}
          ${isSmallMobile ? 'min-h-[100px]' : isMobile ? 'min-h-[110px]' : 'min-h-[140px] lg:min-h-[180px]'}
          flex flex-col items-center justify-center`}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Lock overlay para módulos bloqueados */}
        {!module.isUnlocked && (
          <div className="absolute inset-0 bg-black/20 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center">
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm lg:text-lg">🔒</span>
            </div>
          </div>
        )}

        {/* Icono del módulo - Mejorado para móviles */}
        <div className={`${isSmallMobile ? 'text-lg mb-1' : isMobile ? 'text-xl mb-1' : 'text-2xl lg:text-4xl mb-2 lg:mb-3'} animate-bounce-gentle`}>
          {module.icon.startsWith("./") || module.icon.startsWith("/") ? (
            <img
              src={module.icon}
              alt={module.name}
              className={`${isSmallMobile ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-8 h-8 lg:w-12 lg:h-12'} object-contain mx-auto`}
              draggable={false}
              loading="lazy"
              onError={(e) => {
                // Fallback si la imagen no carga
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '📚';
                }
              }}
            />
          ) : (
            <span>{module.icon}</span>
          )}
        </div>

        {/* Nombre del módulo - Optimizado para móviles */}
        <h3 className={`
        ${isSmallMobile ? 'text-xs' : isMobile ? 'text-xs' : 'text-sm lg:text-lg'} 
        font-bold text-gray-800 text-center mb-1 px-1 leading-tight
        ${isSmallMobile ? 'line-clamp-1' : 'line-clamp-2'}
      `}>
          {module.name}
        </h3>

        {/* Descripción - Solo en pantallas grandes */}
        {!isMobile && (
          <p className="hidden lg:block text-sm text-gray-600 text-center mb-3">
            {module.description}
          </p>
        )}

        {/* Progreso y estrellas - Compacto para móviles */}
        {module.isUnlocked && (
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`${isSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 sm:w-4 sm:h-4'} ${i < module.stars
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                  }`}
              />
            ))}
          </div>
        )}

        {/* Efectos de partículas para módulos desbloqueados - Reducidos en móviles */}
        {module.isUnlocked && !isSmallMobile && (
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
  ));

  ModuleCard.displayName = 'ModuleCard';

  // Detectar tamaños de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsSmallMobile(width < 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Actualizar nombre del usuario cuando esté disponible
  useEffect(() => {
    if (user) {
      setUserStats(prev => ({
        ...prev,
        name: user.fullName || user.username || "Usuario"
      }));
    }
  }, [user]);

  // Reproducir audio de bienvenida al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      playWelcomeAudio();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const playWelcomeAudio = useCallback(() => {
    const welcomeAudio = cognitiveAudios.find(audio => audio.id === "welcome-motivation");
    if (welcomeAudio) {
      playAudio(welcomeAudio.id);
    }
  }, [cognitiveAudios]);

  const playAudio = useCallback((audioId: string) => {
    const audio = cognitiveAudios.find(a => a.id === audioId);
    if (!audio) return;

    // Detener audio actual si existe
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Crear nuevo audio
    audioRef.current = new Audio(audio.audioUrl);
    audioRef.current.volume = 0.7;

    audioRef.current.onplay = () => {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    };

    audioRef.current.onended = () => {
      setCurrentAudio(null);
      setIsPlaying(false);
    };

    audioRef.current.onerror = () => {
      console.log(`Audio ${audio.title} no encontrado, continuando sin audio`);
      setCurrentAudio(null);
      setIsPlaying(false);
    };

    audioRef.current.play().catch(() => {
      // Silenciar errores de audio para mejor UX
      console.log(`No se pudo reproducir ${audio.title}`);
    });
  }, [cognitiveAudios]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  }, []);

  const CognitiveAudioPanel = useMemo(() => () => (
    <div className={`
      fixed ${isSmallMobile ? 'inset-x-1 bottom-1' : 'inset-x-2 bottom-2'} sm:right-4 sm:left-auto sm:inset-x-auto sm:bottom-4 
      bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200/50 
      ${isSmallMobile ? 'p-2' : 'p-3 sm:p-4'} z-50 transition-all duration-300 
      ${showCognitivePanel ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0 scale-95'} 
      w-auto ${isSmallMobile ? 'max-w-full' : 'max-w-xs sm:max-w-sm'} mx-auto sm:mx-0
    `}>
      <div className={`flex items-center justify-between ${isSmallMobile ? 'mb-2' : 'mb-3 sm:mb-4'}`}>
        <h3 className={`font-bold text-gray-800 flex items-center gap-1 sm:gap-2 ${isSmallMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
          <Brain className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} text-purple-600`} />
          <span className={`${isSmallMobile ? 'hidden' : 'hidden sm:inline'}`}>Estimulación Cognitiva</span>
          <span className={`${isSmallMobile ? 'inline' : 'sm:hidden'}`}>Audio</span>
        </h3>
        <button
          onClick={() => setShowCognitivePanel(false)}
          className={`text-gray-500 hover:text-gray-700 ${isSmallMobile ? 'text-lg' : 'text-lg sm:text-xl'} min-w-[20px] min-h-[20px] flex items-center justify-center`}
        >
          ×
        </button>
      </div>

      <div className={`space-y-1 sm:space-y-2 ${isSmallMobile ? 'max-h-48' : 'max-h-60 sm:max-h-80'} overflow-y-auto`}>
        {cognitiveAudios.map((audio) => (
          <div key={audio.id} className={`${isSmallMobile ? 'p-2' : 'p-2 sm:p-3'} rounded-lg sm:rounded-xl border transition-all duration-200 ${currentAudio === audio.id ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
            <div className={`flex items-center ${isSmallMobile ? 'gap-1' : 'gap-2'}`}>
              <div className="flex-1 min-w-0">
                <h4 className={`font-semibold ${isSmallMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-gray-800 truncate`}>{audio.title}</h4>
                <p className={`${isSmallMobile ? 'text-xs' : 'text-xs'} text-gray-600 mb-1 line-clamp-2`}>{audio.description}</p>
                <span className={`${isSmallMobile ? 'text-xs' : 'text-xs'} text-purple-600 font-medium`}>{audio.duration}</span>
              </div>
              <button
                onClick={() => currentAudio === audio.id ? stopAudio() : playAudio(audio.id)}
                className={`${isSmallMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${currentAudio === audio.id ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
              >
                {currentAudio === audio.id && isPlaying ?
                  <Pause className={`${isSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 sm:w-4 sm:h-4'}`} /> :
                  <Play className={`${isSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 sm:w-4 sm:h-4'}`} />
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`${isSmallMobile ? 'mt-2 p-2' : 'mt-3 sm:mt-4 p-2 sm:p-3'} bg-blue-50 rounded-lg sm:rounded-xl`}>
        <p className={`${isSmallMobile ? 'text-xs' : 'text-xs'} text-blue-800`}>
          <strong>💡 Neurociencia:</strong> Estos audios están diseñados para optimizar el aprendizaje mediante técnicas de neuroplasticidad y regulación emocional.
        </p>
      </div>
    </div>
  ), [showCognitivePanel, cognitiveAudios, currentAudio, isPlaying, playAudio, stopAudio, isSmallMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">

      {/* Header - Ultra optimizado para móviles */}
      <header className="relative z-10 flex justify-between items-center p-2 sm:p-4 lg:p-6 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo MentaMática"
              className={`${isSmallMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'} animate-pulse`}
              loading="eager"
            />
            <div className={`absolute -top-0.5 -right-0.5 ${isSmallMobile ? 'w-2 h-2' : 'w-3 h-3 sm:w-4 sm:h-4'} bg-yellow-400 rounded-full animate-bounce`}></div>
          </div>
          {/* Título responsivo */}
          <h1 className={`${isSmallMobile ? 'hidden' : 'hidden sm:block'} text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate`}>
            MentaMática
          </h1>
        </div>

        <div className={`flex items-center ${isSmallMobile ? 'gap-1' : 'gap-1 sm:gap-2 lg:gap-4'} flex-shrink-0`}>
          <div className={`flex items-center gap-1 bg-yellow-100 ${isSmallMobile ? 'px-1.5 py-1' : 'px-2 sm:px-3 lg:px-4 py-1 sm:py-2'} rounded-full`}>
            <Star
              className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} text-yellow-500 animate-spin`}
              style={{ animationDuration: "3s" }}
            />
            <span className={`font-bold text-yellow-700 ${isSmallMobile ? 'text-xs' : 'text-sm sm:text-base'}`}>
              {userStats.totalStars}
            </span>
          </div>

          {/* Botón de Configuración */}
          <Link href="/settings">
            <button
              type="button"
              className={`bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white ${isSmallMobile ? 'p-1.5' : 'p-2 sm:p-3'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50`}
              title="Configuración"
            >
              <Settings className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
            </button>
          </Link>

          {/* Botón de Audio Cognitivo */}
          <button
            onClick={() => setShowCognitivePanel(!showCognitivePanel)}
            className={`bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white ${isSmallMobile ? 'p-1.5' : 'p-2 sm:p-3'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 ${currentAudio ? 'animate-pulse' : ''}`}
            title="Estimulación Cognitiva"
          >
            {currentAudio ? (
              <Volume2 className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'} animate-bounce`} />
            ) : (
              <Brain className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
            )}
          </button>

          {/* UserButton de Clerk para cerrar sesión */}
          <div className={`${isSmallMobile ? 'scale-75' : 'scale-90 sm:scale-100 lg:scale-110'}`}>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: `${isSmallMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'} ring-2 ring-white/20 ring-offset-2 ring-offset-transparent hover:ring-blue-400 transition-all duration-300`,
                  userButtonPopoverCard: "rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm",
                  userButtonPopoverActions: "rounded-xl",
                  userButtonPopoverActionButton: "rounded-lg hover:bg-gray-100/80 transition-colors duration-200",
                  userButtonPopoverActionButtonText: "font-medium",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Panel de Audio Cognitivo */}
      <CognitiveAudioPanel />

      {/* Main Content */}
      <main className={`relative z-10 container mx-auto ${isSmallMobile ? 'px-1 py-2' : 'px-2 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8'} pb-20 sm:pb-8`}>
        {/* Welcome Section - Optimizado para móviles */}
        <div className={`text-center ${isSmallMobile ? 'mb-3' : 'mb-4 sm:mb-8 lg:mb-12'}`}>
          <h2 className={`${isSmallMobile ? 'text-lg' : 'text-xl sm:text-2xl lg:text-4xl'} font-bold ${isSmallMobile ? 'mb-1' : 'mb-1 sm:mb-2 lg:mb-4'} text-gray-800 animate-fade-in px-2`}>
            Bienvenido {user?.username || userStats.name}
          </h2>
          <p className={`${isSmallMobile ? 'text-sm' : 'text-sm sm:text-lg lg:text-xl'} text-gray-600 animate-fade-in-delay px-2`}>
            ¿Qué quieres aprender hoy?
          </p>
          {currentAudio && (
            <div className={`${isSmallMobile ? 'mt-1' : 'mt-2 sm:mt-4'} flex items-center justify-center gap-1 sm:gap-2 text-purple-600 animate-pulse px-2`}>
              <Volume2 className={`${isSmallMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
              <span className={`${isSmallMobile ? 'text-xs' : 'text-xs sm:text-sm'} font-medium text-center`}>
                <span className={`${isSmallMobile ? 'inline' : 'hidden sm:inline'}`}>Reproduciendo estimulación cognitiva...</span>
                <span className={`${isSmallMobile ? 'hidden' : 'sm:hidden'}`}>Audio cognitivo activo</span>
              </span>
            </div>
          )}
        </div>

        {/* Stats Bar - Compacto para móviles */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 ${isSmallMobile ? 'gap-1 mb-3' : 'gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-8 lg:mb-12'}`}>
          <StatsCard
            icon={<Star />}
            title="Estrellas"
            value={userStats.totalStars}
            gradient="from-yellow-400 to-orange-400"
          />
          <StatsCard
            icon={<Trophy />}
            title="Racha"
            value={`${userStats.streak} días`}
            gradient="from-green-400 to-emerald-400"
          />
          <StatsCard
            icon={<Clock />}
            title="Tiempo"
            value={`${userStats.timeSpent}min`}
            gradient="from-blue-400 to-indigo-400"
          />
          <StatsCard
            icon={<Brain />}
            title="Nivel"
            value={userStats.level}
            gradient="from-purple-400 to-pink-400"
          />
        </div>

        {/* Modules Grid - Optimizado para móviles */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ${isSmallMobile ? 'gap-1' : 'gap-2 sm:gap-4 lg:gap-6'} max-w-7xl mx-auto`}>
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              index={index}
              animatingModule={animatingModule}
              isMobile={isMobile}
              isSmallMobile={isSmallMobile}
            />
          ))}
        </div>

        {/* Floating Action Button para móviles */}
        {isMobile && (
          <div className={`fixed ${isSmallMobile ? 'bottom-2 right-2' : 'bottom-4 right-4'} z-40`}>
            <button
              onClick={() => setShowCognitivePanel(!showCognitivePanel)}
              className={`${isSmallMobile ? 'w-12 h-12' : 'w-14 h-14'} bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 flex items-center justify-center ${currentAudio ? 'animate-pulse' : ''}`}
            >
              {currentAudio ? (
                <Volume2 className={`${isSmallMobile ? 'w-5 h-5' : 'w-6 h-6'} animate-bounce`} />
              ) : (
                <Brain className={`${isSmallMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
              )}
            </button>
          </div>
        )}

        {/* Progress Indicator - Responsive mejorado */}
        <div className={`${isSmallMobile ? 'mt-4 px-2' : 'mt-8 lg:mt-12 px-4 sm:px-6 lg:px-0'}`}>
          <div className={`bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl ${isSmallMobile ? 'p-3' : 'p-4 sm:p-6'} shadow-lg max-w-4xl mx-auto animate-float-gentle`}>
            {/* Estrellas flotantes decorativas - Reducidas en móviles */}
            {!isSmallMobile && (
              <div className="absolute -top-2 -right-2 flex gap-1">
                <span className="text-yellow-400 animate-twinkle-fast text-sm sm:text-base">⭐</span>
                <span className="text-pink-400 animate-twinkle-fast text-sm sm:text-base" style={{ animationDelay: "0.3s" }}>✨</span>
                <span className="text-blue-400 animate-twinkle-fast text-sm sm:text-base" style={{ animationDelay: "0.6s" }}>🌟</span>
              </div>
            )}

            <h3 className={`${isSmallMobile ? 'text-base' : 'text-lg sm:text-xl'} font-bold text-gray-800 ${isSmallMobile ? 'mb-2' : 'mb-4'} flex items-center gap-1 sm:gap-2 animate-bounce-soft`}>
              <div className="relative">
                <Trophy className={`${isSmallMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} text-yellow-500 animate-trophy-shine`} />
                <div className={`absolute inset-0 ${isSmallMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} bg-yellow-300 rounded-full opacity-30 animate-ping`}></div>
              </div>
              <span className={isSmallMobile ? 'text-sm' : ''}>
                Tu Progreso de Aprendizaje
              </span>
              <span className={`${isSmallMobile ? 'text-base' : 'text-lg sm:text-xl'} animate-celebration`}>🎉</span>
            </h3>

            {/* Barra de progreso general animada */}
            <div className={`${isSmallMobile ? 'mb-3' : 'mb-6'} bg-gray-200 rounded-full ${isSmallMobile ? 'h-2' : 'h-3 sm:h-4'} overflow-hidden shadow-inner`}>
              <div
                className={`${isSmallMobile ? 'h-2' : 'h-3 sm:h-4'} bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full animate-progress-fill relative`}
                style={{
                  width: `${Math.round((modules.filter(m => m.isUnlocked).reduce((acc, m) => acc + m.progress, 0) / modules.filter(m => m.isUnlocked).length) || 0)}%`,
                  animationDelay: "0.5s"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine-progress"></div>
                <div className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${isSmallMobile ? 'w-1 h-1' : 'w-2 h-2'} bg-white rounded-full animate-bounce-tiny`}></div>
              </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSmallMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
              {modules.filter(m => m.isUnlocked).map((module, index) => (
                <div
                  key={module.id}
                  className={`flex items-center ${isSmallMobile ? 'gap-2 p-2' : 'gap-3 p-3 sm:p-4'} bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-module-entry transform hover:scale-102 relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Efecto de brillo que pasa ocasionalmente - Solo en desktop */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rainbow-shimmer to-transparent opacity-0 animate-random-shimmer"></div>
                  )}

                  {/* Icono del módulo con efectos */}
                  <div className={`relative ${isSmallMobile ? 'w-8 h-8' : 'w-10 h-10 sm:w-12 sm:h-12'} bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full flex items-center justify-center animate-icon-float shadow-lg`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full animate-pulse-color opacity-50"></div>
                    {module.icon.startsWith("./") || module.icon.startsWith("/") ? (
                      <img
                        src={module.icon}
                        alt={module.name}
                        className={`${isSmallMobile ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'} object-contain relative z-10 animate-icon-bounce`}
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      <span className={`${isSmallMobile ? 'text-sm' : 'text-base sm:text-lg'} relative z-10 animate-icon-bounce`}>{module.icon}</span>
                    )}
                    {/* Partículas alrededor del icono - Solo en pantallas grandes */}
                    {!isSmallMobile && (
                      <>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-particle-1"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-particle-2"></div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-gray-800 ${isSmallMobile ? 'text-xs mb-1' : 'text-sm sm:text-base mb-1'} truncate animate-text-wave`}>
                      {module.name}
                    </h4>

                    {/* Estrellas con animaciones mejoradas */}
                    <div className={`flex items-center ${isSmallMobile ? 'gap-0.5 mb-1' : 'gap-1 mb-2'}`}>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="relative">
                          <Star
                            className={`${isSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3 sm:w-4 sm:h-4'} transition-all duration-300 ${i < module.stars
                                ? "text-yellow-500 fill-yellow-500 drop-shadow-md animate-star-earned"
                                : "text-gray-400 fill-gray-200 opacity-60 animate-star-waiting"
                              }`}
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                          {i < module.stars && !isSmallMobile && (
                            <div className="absolute inset-0 animate-star-sparkle">
                              <div className="w-1 h-1 bg-yellow-300 rounded-full absolute -top-0.5 left-1/2 transform -translate-x-1/2 animate-sparkle-1"></div>
                              <div className="w-0.5 h-0.5 bg-yellow-400 rounded-full absolute top-1/2 -right-0.5 transform -translate-y-1/2 animate-sparkle-2"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Barra de progreso individual con animaciones */}
                    <div className={`flex items-center ${isSmallMobile ? 'gap-1' : 'gap-2'}`}>
                      <div className={`flex-1 bg-gray-200 rounded-full ${isSmallMobile ? 'h-1.5' : 'h-2'} overflow-hidden shadow-inner`}>
                        <div
                          className={`${isSmallMobile ? 'h-1.5' : 'h-2'} bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out animate-progress-fill-individual relative`}
                          style={{
                            width: `${module.progress}%`,
                            animationDelay: `${index * 0.2 + 0.5}s`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine-fast"></div>
                        </div>
                      </div>
                      <span className={`${isSmallMobile ? 'text-xs' : 'text-xs sm:text-sm'} text-gray-600 font-medium animate-number-count`}>
                        {module.progress}%
                      </span>
                    </div>

                    {/* Indicador de completado */}
                    {module.progress === 100 && (
                      <div className="absolute top-1 right-1 animate-completion-celebration">
                        <span className="text-green-500 animate-bounce text-lg">✅</span>
                        <div className="absolute inset-0 w-4 h-4 bg-green-300 rounded-full opacity-30 animate-ping"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mensaje motivacional animado */}
            <div className={`${isSmallMobile ? 'mt-2' : 'mt-4'} text-center`}>
              <div className={`inline-flex items-center ${isSmallMobile ? 'gap-1 px-2 py-1' : 'gap-2 px-4 py-2'} bg-gradient-to-r from-green-100 to-blue-100 rounded-full shadow-sm animate-message-float`}>
                <span className={`text-green-600 animate-bounce-gentle ${isSmallMobile ? 'text-base' : 'text-lg'}`}>🚀</span>
                <span className={`${isSmallMobile ? 'text-xs' : 'text-sm sm:text-base'} font-medium text-gray-700 animate-text-glow`}>
                  ¡Sigue así, campeón!
                </span>
                <span className={`text-yellow-500 animate-twinkle ${isSmallMobile ? 'text-base' : 'text-lg'}`}>⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tips para padres - Responsive mejorado */}
        <div className={`${isSmallMobile ? 'mt-4 px-2' : 'mt-6 lg:mt-8 px-4 sm:px-6 lg:px-0'}`}>
          <div className={`bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl lg:rounded-2xl ${isSmallMobile ? 'p-3' : 'p-4 sm:p-6'} shadow-lg max-w-4xl mx-auto transform hover:scale-102 transition-all duration-500 animate-float-gentle relative overflow-hidden`}>
            {/* Efectos de fondo animados - Reducidos en móviles */}
            {!isSmallMobile && (
              <>
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full animate-bubble-1"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-yellow-200/30 rounded-full animate-bubble-2"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full animate-bubble-3"></div>
              </>
            )}

            {/* Efecto de brillo que se desliza - Solo en desktop */}
            {!isMobile && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shine-slow"></div>
            )}

            <h3 className={`${isSmallMobile ? 'text-base' : 'text-lg sm:text-xl'} font-bold text-gray-800 ${isSmallMobile ? 'mb-2' : 'mb-4'} flex items-center gap-1 sm:gap-2 animate-bounce-soft relative z-10`}>
              <span className={`${isSmallMobile ? 'text-lg' : 'text-xl sm:text-2xl'} animate-glow`}>💡</span>
              <span className={isSmallMobile ? 'text-sm' : ''}>
                Tips para Padres
              </span>
              <span className={`${isSmallMobile ? 'text-base' : 'text-lg sm:text-xl'} animate-celebration`}>🧠</span>
            </h3>

            <div className={`grid grid-cols-1 sm:grid-cols-2 ${isSmallMobile ? 'gap-2 text-xs' : 'gap-3 sm:gap-4 text-sm sm:text-base'} text-gray-700 relative z-10`}>
              <div className={`bg-white/70 ${isSmallMobile ? 'p-2' : 'p-3 sm:p-4'} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl animate-slide-in-left backdrop-blur-sm border border-white/30 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                <h4 className={`font-semibold ${isSmallMobile ? 'mb-1' : 'mb-2'} flex items-center gap-1 sm:gap-2`}>
                  <span className={`${isSmallMobile ? 'text-sm' : 'text-lg'} animate-pulse-slow`}>🧠</span>
                  <span className="text-purple-700 animate-text-wave">Neuroplasticidad</span>
                </h4>
                <p className="leading-relaxed">Los audios cognitivos ayudan a crear nuevas conexiones neuronales que facilitan el aprendizaje matemático.</p>
              </div>

              <div className={`bg-white/70 ${isSmallMobile ? 'p-2' : 'p-3 sm:p-4'} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl animate-slide-in-right backdrop-blur-sm border border-white/30 relative overflow-hidden`} style={{ animationDelay: "0.1s" }}>
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: "0.5s" }}></div>
                <h4 className={`font-semibold ${isSmallMobile ? 'mb-1' : 'mb-2'} flex items-center gap-1 sm:gap-2`}>
                  <span className={`${isSmallMobile ? 'text-sm' : 'text-lg'} animate-spin-slow`}>⏰</span>
                  <span className="text-blue-700 animate-text-wave">Sesiones Cortas</span>
                </h4>
                <p className="leading-relaxed">15-20 minutos diarios son ideales. La consistencia es más importante que la duración.</p>
              </div>

              <div className={`bg-white/70 ${isSmallMobile ? 'p-2' : 'p-3 sm:p-4'} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl animate-slide-in-left backdrop-blur-sm border border-white/30 relative overflow-hidden`} style={{ animationDelay: "0.2s" }}>
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
                <h4 className={`font-semibold ${isSmallMobile ? 'mb-1' : 'mb-2'} flex items-center gap-1 sm:gap-2`}>
                  <span className={`${isSmallMobile ? 'text-sm' : 'text-lg'} animate-bounce-gentle`}>🎯</span>
                  <span className="text-green-700 animate-text-wave">Refuerzo Positivo</span>
                </h4>
                <p className="leading-relaxed">Celebra cada logro, por pequeño que sea. Esto fortalece la motivación intrínseca.</p>
              </div>

              <div className={`bg-white/70 ${isSmallMobile ? 'p-2' : 'p-3 sm:p-4'} rounded-lg sm:rounded-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl animate-slide-in-right backdrop-blur-sm border border-white/30 relative overflow-hidden`} style={{ animationDelay: "0.3s" }}>
                <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: "1.5s" }}></div>
                <h4 className={`font-semibold ${isSmallMobile ? 'mb-1' : 'mb-2'} flex items-center gap-1 sm:gap-2`}>
                  <span className={`${isSmallMobile ? 'text-sm' : 'text-lg'} animate-twinkle`}>🌟</span>
                  <span className="text-yellow-700 animate-text-wave">Paciencia</span>
                </h4>
                <p className="leading-relaxed">Cada niño tiene su ritmo. Respeta sus tiempos de procesamiento y aprendizaje.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer decorativo - Responsive mejorado */}
        <div className={`${isSmallMobile ? 'mt-4' : 'mt-8 lg:mt-12'} text-center px-4`}>
          <div className={`flex flex-col sm:flex-row items-center justify-center ${isSmallMobile ? 'gap-1' : 'gap-2 sm:gap-4'} text-gray-400 ${isSmallMobile ? 'text-xs' : 'text-sm'} animate-fade-in-up`} style={{ animationDelay: "1s" }}>
            <div className={`flex items-center ${isSmallMobile ? 'gap-1' : 'gap-2'}`}>
              <span className="transform hover:scale-110 transition-transform duration-300 hover:text-gray-600">Hecho con</span>
              <span className="text-red-400 animate-heartbeat text-lg transform hover:scale-125 transition-transform duration-300 cursor-pointer">❤️</span>
              <span className="transform hover:scale-110 transition-transform duration-300 hover:text-gray-600">para pequeños genios</span>
            </div>
            <div className={`flex ${isSmallMobile ? 'gap-0.5' : 'gap-1'}`}>
              <span className="animate-bounce text-yellow-400" style={{ animationDelay: "0s" }}>✨</span>
              <span className="animate-bounce text-pink-400" style={{ animationDelay: "0.2s" }}>🌟</span>
              <span className="animate-bounce text-blue-400" style={{ animationDelay: "0.4s" }}>⭐</span>
            </div>
          </div>
        </div>
      </main>

      {/* CSS personalizado para animaciones cognitivas - Optimizado para móviles */}
      <style jsx>{`
        /* Animaciones base existentes */
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(255, 193, 7, 0.8), 0 0 10px rgba(255, 193, 7, 0.6);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 10px rgba(255, 193, 7, 1), 0 0 15px rgba(255, 193, 7, 0.8);
            transform: scale(1.1);
          }
        }
        
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-2px); }
          50% { transform: translateY(-4px); }
          75% { transform: translateY(-2px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          25% { opacity: 0.7; transform: scale(1.1) rotate(90deg); }
          50% { opacity: 1; transform: scale(0.9) rotate(180deg); }
          75% { opacity: 0.8; transform: scale(1.05) rotate(270deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.2); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        
        /* Nuevas animaciones cognitivas para niños */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-3px) rotate(0.5deg); }
          66% { transform: translateY(-1px) rotate(-0.5deg); }
        }
        
        @keyframes trophy-shine {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 193, 7, 0.3)); }
          50% { filter: brightness(1.3) drop-shadow(0 0 15px rgba(255, 193, 7, 0.8)); }
        }
        
        @keyframes rainbow-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes celebration {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          75% { transform: scale(1.15) rotate(-5deg); }
        }
        
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: var(--progress-width, 0%); }
        }
        
        @keyframes shine-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes bounce-tiny {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes module-entry {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.9); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes random-shimmer {
          0%, 90%, 100% { opacity: 0; }
          5%, 15% { opacity: 0.3; }
        }
        
        @keyframes icon-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.05); }
        }
        
        @keyframes pulse-color {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes icon-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes particle-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          25% { transform: translate(2px, -3px) scale(1.2); opacity: 0.8; }
          50% { transform: translate(-1px, -2px) scale(0.8); opacity: 0.6; }
          75% { transform: translate(1px, -1px) scale(1.1); opacity: 0.9; }
        }
        
        @keyframes particle-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
          25% { transform: translate(-2px, 3px) scale(1.1); opacity: 0.7; }
          50% { transform: translate(2px, 2px) scale(0.9); opacity: 0.5; }
          75% { transform: translate(-1px, 1px) scale(1.2); opacity: 0.8; }
        }
        
        @keyframes text-wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        
        @keyframes star-earned {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.3) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        
        @keyframes star-waiting {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        
        @keyframes sparkle-1 {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes sparkle-2 {
          0%, 100% { opacity: 0; transform: scale(0); }
          25%, 75% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes progress-fill-individual {
          0% { width: 0%; }
          100% { width: var(--individual-progress, 0%); }
        }
        
        @keyframes shine-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes number-count {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes completion-celebration {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        @keyframes message-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes twinkle-fast {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes bubble-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10px, -10px) scale(1.1); }
          66% { transform: translate(-5px, -5px) scale(0.9); }
        }
        
        @keyframes bubble-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-8px, 8px) scale(1.05); }
          75% { transform: translate(4px, -4px) scale(0.95); }
        }
        
        @keyframes bubble-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(6px, 6px) scale(1.15); }
          80% { transform: translate(-3px, 3px) scale(0.85); }
        }
        
        @keyframes shine-slow {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes slide-in-left {
          0% { 
            opacity: 0; 
            transform: translateX(-30px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes slide-in-right {
          0% { 
            opacity: 0; 
            transform: translateX(30px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.98); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        /* Clases de animación */
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-trophy-shine {
          animation: trophy-shine 2s ease-in-out infinite;
        }
        
        .animate-rainbow-text {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: rainbow-text 3s ease infinite;
        }
        
        .animate-celebration {
          animation: celebration 2s ease-in-out infinite;
        }
        
        .animate-progress-fill {
          animation: progress-fill 2s ease-out forwards;
        }
        
        .animate-shine-progress {
          animation: shine-progress 2s linear infinite;
        }
        
        .animate-bounce-tiny {
          animation: bounce-tiny 1s ease-in-out infinite;
        }
        
        .animate-module-entry {
          animation: module-entry 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-random-shimmer {
          animation: random-shimmer 8s linear infinite;
        }
        
        .animate-icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }
        
        .animate-pulse-color {
          animation: pulse-color 2s ease-in-out infinite;
        }
        
        .animate-icon-bounce {
          animation: icon-bounce 2s ease-in-out infinite;
        }
        
        .animate-particle-1 {
          animation: particle-1 3s ease-in-out infinite;
        }
        
        .animate-particle-2 {
          animation: particle-2 3s ease-in-out infinite 0.5s;
        }
        
        .animate-text-wave {
          animation: text-wave 3s ease-in-out infinite;
        }
        
        .animate-star-earned {
          animation: star-earned 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-star-waiting {
          animation: star-waiting 2s ease-in-out infinite;
        }
        
        .animate-star-sparkle {
          animation: sparkle-1 1.5s ease-in-out infinite;
        }
        
        .animate-sparkle-1 {
          animation: sparkle-1 2s ease-in-out infinite;
        }
        
        .animate-sparkle-2 {
          animation: sparkle-2 2s ease-in-out infinite 0.3s;
        }
        
        .animate-progress-fill-individual {
          animation: progress-fill-individual 1.5s ease-out forwards;
        }
        
        .animate-shine-fast {
          animation: shine-fast 1.5s linear infinite;
        }
        
        .animate-number-count {
          animation: number-count 0.8s ease-out forwards;
        }
        
        .animate-completion-celebration {
          animation: completion-celebration 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-message-float {
          animation: message-float 3s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .animate-twinkle-fast {
          animation: twinkle-fast 1.5s ease-in-out infinite;
        }
        
        .animate-bubble-1 {
          animation: bubble-1 6s ease-in-out infinite;
        }
        
        .animate-bubble-2 {
          animation: bubble-2 8s ease-in-out infinite;
        }
        
        .animate-bubble-3 {
          animation: bubble-3 7s ease-in-out infinite;
        }
        
        .animate-shine-slow {
          animation: shine-slow 4s linear infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-bounce-soft {
          animation: bounce-soft 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Mejoras específicas para móviles */
        @media (max-width: 640px) {
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.2;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.3;
          }
          
          /* Reducir intensidad de animaciones en móviles para mejor rendimiento */
          .animate-shine-progress {
            animation-duration: 3s;
          }
          
          .animate-random-shimmer {
            animation-duration: 12s;
          }
          
          .animate-bubble-1,
          .animate-bubble-2,
          .animate-bubble-3 {
            animation-duration: 10s;
          }
          
          /* Optimizar transiciones para touch */
          .transition-all {
            transition-duration: 0.2s;
          }
        }

        /* Optimizaciones para pantallas muy pequeñas */
        @media (max-width: 480px) {
          .grid-cols-2 {
            gap: 0.25rem;
          }
          
          .min-h-[100px] {
            min-height: 90px;
          }
          
          /* Simplificar animaciones en pantallas muy pequeñas */
          .animate-particle-1,
          .animate-particle-2,
          .animate-sparkle-1,
          .animate-sparkle-2 {
            display: none;
          }
          
          /* Reducir efectos de hover en pantallas táctiles pequeñas */
          .hover\\:scale-105:hover,
          .hover\\:scale-102:hover {
            transform: none;
          }
          
          .hover\\:-translate-y-1:hover,
          .hover\\:-translate-y-2:hover {
            transform: none;
          }
        }

        /* Mejoras para tablets */
        @media (min-width: 641px) and (max-width: 1024px) {
          .grid-cols-2.sm\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          
          /* Mantener animaciones suaves en tablets */
          .hover\\:scale-105:hover {
            transform: scale(1.03);
          }
        }

        /* Efectos de hover mejorados para dispositivos táctiles */
        @media (hover: hover) {
          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }
          
          .hover\\:-translate-y-1:hover {
            transform: translateY(-0.25rem);
          }
          
          .hover\\:-translate-y-2:hover {
            transform: translateY(-0.5rem);
          }
        }

        /* Desactivar algunos efectos en dispositivos táctiles para mejor UX */
        @media (hover: none) {
          .hover\\:scale-105:hover,
          .hover\\:scale-102:hover {
            transform: none;
          }
          
          .hover\\:-translate-y-1:hover,
          .hover\\:-translate-y-2:hover {
            transform: none;
          }
          
          /* Usar efectos táctiles alternativos */
          .hover\\:scale-105:active,
          .hover\\:scale-102:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }

        /* Animaciones de entrada escalonadas para mejor UX cognitiva */
        .animate-module-entry:nth-child(1) { animation-delay: 0s; }
        .animate-module-entry:nth-child(2) { animation-delay: 0.1s; }
        .animate-module-entry:nth-child(3) { animation-delay: 0.2s; }
        .animate-module-entry:nth-child(4) { animation-delay: 0.3s; }
        .animate-module-entry:nth-child(5) { animation-delay: 0.4s; }
        .animate-module-entry:nth-child(6) { animation-delay: 0.5s; }

        /* Mejoras de accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01s !important;
          }
          
          .animate-bounce,
          .animate-pulse,
          .animate-spin,
          .animate-ping {
            animation: none !important;
          }
        }

        /* Colores vibrantes para estimulación cognitiva */
        .bg-rainbow-shimmer {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd);
        }

        /* Efectos de profundidad para mejor percepción visual */
        .shadow-cognitive {
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        /* Gradientes estimulantes para el desarrollo cognitivo */
        .bg-cognitive-gradient {
          background: linear-gradient(135deg, 
            #667eea 0%, 
            #764ba2 25%, 
            #f093fb 50%, 
            #f5576c 75%, 
            #4facfe 100%);
        }

        /* Optimizaciones específicas para imágenes */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        /* Mejoras de rendimiento para animaciones */
        .animate-bounce,
        .animate-pulse,
        .animate-spin {
          will-change: transform;
        }

        .animate-fade-in,
        .animate-fade-in-delay {
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}