import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Palette, Volume2, Info, VolumeX } from 'lucide-react';
import AvatarCustomizer from '../../app/settings/avatar/page';
import Link from 'next/link';

interface AvatarOptions {
  gender: 'boy' | 'girl';
  skinColor: string;
  eyes: string;
  nose: string;
  mouth: string;
  ears: string;
  hairType: string;
  hairColor: string;
  clothing: string;
  accessories: string;
  background: string;
}

interface AudioSettings {
  soundEffects: boolean;
  backgroundMusic: boolean;
  volume: number;
}

const Settings: React.FC = () => {
  const [currentView, setCurrentView] = useState<'main' | 'avatar'>('main');
  const [userAvatar, setUserAvatar] = useState<AvatarOptions>({
    gender: 'boy',
    skinColor: '#FDBCB4',
    eyes: 'happy',
    nose: 'small',
    mouth: 'smile',
    ears: 'normal',
    hairType: 'short',
    hairColor: '#8B4513',
    clothing: 'casual',
    accessories: 'none',
    background: 'rainbow'
  });

  // Estado para configuraciones de audio
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    soundEffects: true,
    backgroundMusic: false,
    volume: 75
  });

  // Simular monedas del usuario
  const [userCoins] = useState(25);

  // Cargar configuraciones desde localStorage al montar el componente
  useEffect(() => {
    const savedAudioSettings = localStorage.getItem('audioSettings');
    if (savedAudioSettings) {
      setAudioSettings(JSON.parse(savedAudioSettings));
    }

    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUserAvatar(JSON.parse(savedAvatar));
    }
  }, []);

  // Guardar configuraciones en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('audioSettings', JSON.stringify(audioSettings));
  }, [audioSettings]);

  const handleAvatarSave = (avatar: AvatarOptions) => {
    setUserAvatar(avatar);
    setCurrentView('main');
    localStorage.setItem('userAvatar', JSON.stringify(avatar));
  };

  // Funciones para manejar cambios en configuraciones de audio
  const toggleSoundEffects = () => {
    setAudioSettings(prev => ({
      ...prev,
      soundEffects: !prev.soundEffects
    }));
    
    // Reproducir sonido de prueba si se activa
    if (!audioSettings.soundEffects) {
      playTestSound();
    }
  };

  const toggleBackgroundMusic = () => {
    setAudioSettings(prev => ({
      ...prev,
      backgroundMusic: !prev.backgroundMusic
    }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setAudioSettings(prev => ({
      ...prev,
      volume: newVolume
    }));
  };

  // Función para reproducir sonido de prueba
  const playTestSound = () => {
    // Crear un contexto de audio simple para prueba
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(audioSettings.volume / 100 * 0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const FloatingParticle = ({ delay, emoji }: { delay: number; emoji: string }) => (
    <div
      className="absolute text-lg sm:text-2xl opacity-60 animate-bounce pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    >
      {emoji}
    </div>
  );

  if (currentView === 'avatar') {
    return (
      <AvatarCustomizer
        onSave={handleAvatarSave}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Partículas de fondo - Responsive */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 25)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} emoji={['⚙️', '🎨', '🔧', '✨', '🌟', '💫'][i % 6]} />
        ))}
      </div>

      {/* Header - Fully Responsive */}
      <header className="relative z-10 flex justify-between items-center p-3 sm:p-6 bg-white/80 backdrop-blur-sm shadow-lg">
        <Link href="/dashboard">
          <button
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold hidden xs:inline">Volver</span>
            <span className="font-bold xs:hidden">🏠</span>
          </button>
        </Link>

        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 sm:gap-2">
          <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 animate-pulse" />
          <span className="hidden sm:inline">Configuración</span>
          <span className="sm:hidden">Configuración</span>
        </h1>

        <div className="w-12 sm:w-24"></div>
      </header>

      {/* Main Content - Responsive */}
      <main className="relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Welcome Section - Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-gray-800 animate-fade-in">
            ¡Personaliza tu experiencia!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 animate-fade-in-delay px-4">
            Haz que MentaMática sea perfecta para ti
          </p>
        </div>

        {/* Settings Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">

          {/* Avatar Settings - Responsive */}
          <Link href="/settings/avatar">
            <div
              className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce">
                  <Palette className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Mi Avatar</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Crea y personaliza tu avatar único. ¡Hazlo tan especial como tú!
                </p>

                {/* Mini Avatar Preview - Responsive */}
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center justify-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl animate-bounce-gentle">
                    {userAvatar.gender === 'boy' ? '👦' : '👧'}
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center justify-center">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    ¡Personalízame!
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"></div>
            </div>
          </Link>

          {/* Sound Settings - Responsive y Funcional */}
          <div className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce">
                {audioSettings.volume === 0 ? (
                  <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                ) : (
                  <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                )}
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Sonidos</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Ajusta los efectos de sonido y la música de fondo para una mejor experiencia.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {/* Toggle para Efectos de Sonido */}
                <div className="flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <span className="text-xs sm:text-sm font-semibold text-blue-800">Efectos de Sonido</span>
                  <button
                    onClick={toggleSoundEffects}
                    className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full relative cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      audioSettings.soundEffects ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${
                        audioSettings.soundEffects ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Toggle para Música de Fondo */}
                <div className="flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <span className="text-xs sm:text-sm font-semibold text-blue-800">Música de Fondo</span>
                  <button
                    onClick={toggleBackgroundMusic}
                    className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full relative cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      audioSettings.backgroundMusic ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${
                        audioSettings.backgroundMusic ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Control de Volumen */}
                <div className="flex items-center justify-between bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <span className="text-xs sm:text-sm font-semibold text-blue-800">Volumen</span>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={audioSettings.volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-20 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${audioSettings.volume}%, #cbd5e1 ${audioSettings.volume}%, #cbd5e1 100%)`
                        }}
                      />
                    </div>
                    <span className="text-xs text-blue-600 font-medium min-w-[2.5rem] text-right">
                      {audioSettings.volume}%
                    </span>
                    <button
                      onClick={playTestSound}
                      className="ml-1 px-2 py-1 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={!audioSettings.soundEffects || audioSettings.volume === 0}
                    >
                      🔊
                    </button>
                  </div>
                </div>

                {/* Indicador de estado */}
                <div className="text-center mt-4">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                    <div className={`w-2 h-2 rounded-full ${audioSettings.soundEffects || audioSettings.backgroundMusic ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span>
                      {audioSettings.soundEffects || audioSettings.backgroundMusic ? 'Audio Activo' : 'Audio Desactivado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"></div>
          </div>

          {/* Help & Info - Responsive */}
          <div className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-105 relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:animate-bounce">
                <Info className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-4">Ayuda</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Encuentra respuestas a tus preguntas y aprende cómo usar MentaMática.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-3">
                <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">📚 Cómo Jugar</span>
                </div>
                <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-yellow-800">❓ Preguntas</span>
                </div>
                <div className="bg-orange-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-orange-800">🎯 Consejos</span>
                </div>
                <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer">
                  <span className="text-xs sm:text-sm font-semibold text-yellow-800">📞 Contacto</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl sm:rounded-3xl"></div>
          </div>
        </div>

        {/* Neuroscience Info - Fully Responsive */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg max-w-6xl mx-auto">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-2xl sm:text-3xl">🧠</span>
              <span>Personalización y Aprendizaje</span>
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-blue-700 mb-4 sm:mb-6 leading-relaxed px-2">
              La personalización no es solo diversión: ¡es ciencia! Cuando personalizas tu experiencia de aprendizaje,
              tu cerebro crea conexiones más fuertes y duraderas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎨</div>
                <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">Creatividad</h4>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">Personalizar tu avatar estimula la corteza prefrontal, mejorando tu creatividad y resolución de problemas.</p>
              </div>
              <div className="bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">💖</div>
                <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">Motivación</h4>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">Tener un avatar único activa tu sistema de recompensa, haciendo que quieras aprender más.</p>
              </div>
              <div className="bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🧩</div>
                <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">Memoria</h4>
                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">Las experiencias personalizadas fortalecen tu hipocampo, mejorando tu capacidad de recordar.</p>
              </div>
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

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
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

        /* Estilos personalizados para el slider */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;