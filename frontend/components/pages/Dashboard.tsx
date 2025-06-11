import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Star, Trophy, Clock, Settings, Volume2, Play, Pause } from 'lucide-react';
import Button from '../atoms/Button';
import ModuleCard from '../molecules/ModuleCard';
import UserStats from '../molecules/UserStats';
import CognitiveAudioPanel from '../organisms/CognitiveAudioPanel';

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

interface UserStatsType {
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showCognitivePanel, setShowCognitivePanel] = useState(false);
  const [animatingModule, setAnimatingModule] = useState<string | null>(null);
  
  const [userStats, setUserStats] = useState<UserStatsType>({
    name: "Estudiante",
    totalStars: 0,
    streak: 0,
    timeSpent: 0,
    level: 1,
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: "conjuntos",
      name: "CONJUNTOS",
      icon: "🎯",
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
      icon: "🔢",
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
      icon: "➕",
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
      icon: "➖",
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
      icon: "✖️",
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
      icon: "➗",
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
      icon: "📐",
      description: "Formas divertidas",
      color: "#9370DB",
      bgColor: "from-purple-200 to-pink-200",
      progress: 0,
      stars: 0,
      isUnlocked: false,
    },
  ]);

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

  const handleModuleClick = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module?.isUnlocked) {
      setAnimatingModule(moduleId);
      setTimeout(() => setAnimatingModule(null), 600);
      return;
    }

    navigate(`/modules/${moduleId}`);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const playAudio = (audioId: string) => {
    const audio = cognitiveAudios.find(a => a.id === audioId);
    if (!audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

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
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-1/3 left-3/4 w-28 h-28 bg-green-200 rounded-full opacity-15 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold animate-pulse">
              🧠
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MentaMática
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <Star className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="font-bold text-yellow-700">
              {userStats.totalStars}
            </span>
          </div>

          <Button
            onClick={handleSettingsClick}
            variant="secondary"
            size="sm"
            icon={Settings}
            className="!p-3 !rounded-full"
          />

          <Button
            onClick={() => setShowCognitivePanel(!showCognitivePanel)}
            variant={currentAudio ? "primary" : "secondary"}
            size="sm"
            icon={currentAudio ? Volume2 : Brain}
            className={`!p-3 !rounded-full ${currentAudio ? '!animate-pulse' : ''}`}
          />
        </div>
      </header>

      {/* Panel de Audio Cognitivo */}
      <CognitiveAudioPanel
        isOpen={showCognitivePanel}
        onClose={() => setShowCognitivePanel(false)}
        audios={cognitiveAudios}
        currentAudio={currentAudio}
        isPlaying={isPlaying}
        onPlayAudio={playAudio}
        onStopAudio={stopAudio}
      />

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
        <UserStats userStats={userStats} />

        {/* Modules Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              isAnimating={animatingModule === module.id}
              onClick={() => handleModuleClick(module.id)}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        {/* Motivational Message */}
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out 0.3s both; }
      `}</style>
    </div>
  );
};

export default Dashboard;