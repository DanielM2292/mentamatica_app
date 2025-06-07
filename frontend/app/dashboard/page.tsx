"use client";

import React, { useState, useEffect, useRef } from "react";
import { Brain, Star, Trophy, Clock, Settings, User, Volume2, Play, Pause } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs"; 
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [userStats, setUserStats] = useState<UserStats>({
    name: "Nombre/Apodo",
    totalStars: 0,
    streak: 0,
    timeSpent: 0,
    level: 1,
  });

  const [modules, setModules] = useState<Module[]>([
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
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
      isUnlocked: false,
    },
  ]);

  // Audios basados en neurociencia cognitiva para niños
  const cognitiveAudios: CognitiveAudio[] = [
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
  ];

  const [animatingModule, setAnimatingModule] = useState<string | null>(null);
  const [showCognitivePanel, setShowCognitivePanel] = useState(false);

  // Actualizar nombre del usuario cuando esté disponible
  useEffect(() => {
    if (user) {
      setUserStats(prev => ({
        ...prev,
        name: user.firstName || user.username || "Usuario"
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

  const playWelcomeAudio = () => {
    const welcomeAudio = cognitiveAudios.find(audio => audio.id === "welcome-motivation");
    if (welcomeAudio) {
      playAudio(welcomeAudio.id);
    }
  };

  const playAudio = (audioId: string) => {
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
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  const handleModuleClick = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module?.isUnlocked) {
      setAnimatingModule(moduleId);
      setTimeout(() => setAnimatingModule(null), 600);
      return;
    }

    // Reproducir audio de concentración antes de navegar
    const focusAudio = cognitiveAudios.find(audio => audio.id === "focus-breathing");
    if (focusAudio) {
      playAudio(focusAudio.id);
    }

    // Navegar al módulo específico
    setTimeout(() => {
      router.push(`/modules/${moduleId}`);
    }, 1000);
  };

  const handleConfigClick = () => {
    router.push('/settings');
  };

  const FloatingParticle = ({ delay }: { delay: number }) => (
    <div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-bounce"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    />
  );

  const CognitiveAudioPanel = () => (
    <div className={`fixed right-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-4 z-50 transition-all duration-300 ${showCognitivePanel ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Estimulación Cognitiva
        </h3>
        <button
          onClick={() => setShowCognitivePanel(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 max-w-xs">
        {cognitiveAudios.map((audio) => (
          <div key={audio.id} className={`p-3 rounded-xl border transition-all duration-200 ${currentAudio === audio.id ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800">{audio.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                <span className="text-xs text-purple-600 font-medium">{audio.duration}</span>
              </div>
              <button
                onClick={() => currentAudio === audio.id ? stopAudio() : playAudio(audio.id)}
                className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${currentAudio === audio.id ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
              >
                {currentAudio === audio.id && isPlaying ? 
                  <Pause className="w-4 h-4" /> : 
                  <Play className="w-4 h-4" />
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className="text-xs text-blue-800">
          <strong>💡 Neurociencia:</strong> Estos audios están diseñados para optimizar el aprendizaje mediante técnicas de neuroplasticidad y regulación emocional.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-15 blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-3/4 w-28 h-28 bg-green-200 rounded-full opacity-15 blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src="/images/logo.png" alt="Logo MentaMática" className="w-12 h-12 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MentaMática
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <Star
              className="w-5 h-5 text-yellow-500 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <span className="font-bold text-yellow-700">
              {userStats.totalStars}
            </span>
          </div>

          {/* Botón de Configuración */}
          <button
            onClick={handleConfigClick}
            className="bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            title="Configuración"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Botón de Audio Cognitivo */}
          <button
            onClick={() => setShowCognitivePanel(!showCognitivePanel)}
            className={`bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 ${currentAudio ? 'animate-pulse' : ''}`}
            title="Estimulación Cognitiva"
          >
            {currentAudio ? (
              <Volume2 className="w-5 h-5 animate-bounce" />
            ) : (
              <Brain className="w-5 h-5" />
            )}
          </button>
          
          {/* UserButton de Clerk para cerrar sesión */}
          <div className="scale-110">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent hover:ring-blue-400 transition-all duration-300",
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
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
            Bienvenido {userStats.name}
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-delay">
            ¿Qué quieres aprender hoy?
          </p>
          {currentAudio && (
            <div className="mt-4 flex items-center justify-center gap-2 text-purple-600 animate-pulse">
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-medium">
                Reproduciendo estimulación cognitiva...
              </span>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estrellas</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.totalStars}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Racha</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.streak} días
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiempo</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.timeSpent}min
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Nivel</p>
                <p className="text-2xl font-bold text-gray-800">
                  {userStats.level}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`
                relative group cursor-pointer transform transition-all duration-500 hover:scale-105
                ${animatingModule === module.id ? "animate-shake" : ""}
                ${!module.isUnlocked ? "opacity-60" : ""}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`
                bg-gradient-to-br ${module.bgColor} rounded-3xl p-6 shadow-xl 
                hover:shadow-2xl transition-all duration-300 relative overflow-hidden
                ${module.isUnlocked ? "hover:-translate-y-2" : ""}
                min-h-[180px] flex flex-col items-center justify-center
              `}
              >
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Lock overlay para módulos bloqueados */}
                {!module.isUnlocked && (
                  <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🔒</span>
                    </div>
                  </div>
                )}

                {/* Icono del módulo */}
                <div className="text-4xl mb-3 animate-bounce-gentle">
                  {module.icon.startsWith("./") ||
                  module.icon.startsWith("/") ? (
                    <img
                      src={module.icon}
                      alt={module.name}
                      className="w-12 h-12 object-contain mx-auto"
                      draggable={false}
                    />
                  ) : (
                    <span>{module.icon}</span>
                  )}
                </div>

                {/* Nombre del módulo */}
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  {module.name}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-gray-600 text-center mb-3">
                  {module.description}
                </p>

                {/* Progreso y estrellas */}
                {module.isUnlocked && (
                  <div className="flex items-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < module.stars
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Efectos de partículas para módulos desbloqueados */}
                {module.isUnlocked && (
                  <>
                    <div
                      className="absolute top-2 right-2 text-xs animate-bounce"
                      style={{ animationDelay: "0.5s" }}
                    >
                      ✨
                    </div>
                    <div
                      className="absolute bottom-2 left-2 text-xs animate-bounce"
                      style={{ animationDelay: "1s" }}
                    >
                      🌟
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message with Neuroscience Info */}
        <div className="text-center mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              ¡Sigue así, eres un gran estudiante!
            </h3>
            <p className="text-gray-600 mb-4">
              Cada problema que resuelves hace que tu cerebro sea más fuerte 🧠💪
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
              <p className="text-sm text-purple-800">
                <strong>💡 Dato curioso:</strong> Tu cerebro tiene más de 100 mil millones de neuronas 
                que se conectan cada vez que aprendes algo nuevo. ¡Cada ejercicio crea nuevas conexiones!
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}