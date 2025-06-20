import React, { useState } from 'react';
import { ArrowLeft, User, Palette, Volume2, Info } from 'lucide-react';
import AvatarCustomizer from '../AvatarCustomizer';

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

  // Simular monedas del usuario (esto vendría de tu estado global o API)
  const [userCoins] = useState(25);

  const handleBack = () => {
    if (currentView === 'avatar') {
      setCurrentView('main');
    } else {
      // Volver al dashboard
      window.history.back();
    }
  };

  const handleAvatarSave = (avatar: AvatarOptions) => {
    setUserAvatar(avatar);
    setCurrentView('main');
    // Aquí podrías guardar en localStorage o enviar a una API
    localStorage.setItem('userAvatar', JSON.stringify(avatar));
  };

  const FloatingParticle = ({ delay, emoji }: { delay: number; emoji: string }) => (
    <div
      className="absolute text-2xl opacity-60 animate-bounce pointer-events-none"
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
        onBack={handleBack}
        onSave={handleAvatarSave}
        userCoins={userCoins}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.3} emoji={['⚙️', '🎨', '🔧', '✨', '🌟', '💫'][i % 6]} />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-bold">Volver</span>
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <User className="w-8 h-8 text-blue-600 animate-pulse" />
          Configuración
        </h1>

        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
            ¡Personaliza tu experiencia!
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-delay">
            Haz que MentaMática sea perfecta para ti
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          
          {/* Avatar Settings */}
          <div 
            onClick={() => setCurrentView('avatar')}
            className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Palette className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Mi Avatar</h3>
              <p className="text-gray-600 mb-6">
                Crea y personaliza tu avatar único. ¡Hazlo tan especial como tú!
              </p>
              
              {/* Mini Avatar Preview */}
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 flex items-center justify-center">
                <div className="text-5xl animate-bounce-gentle">
                  {userAvatar.gender === 'boy' ? '👦' : '👧'}
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center">
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                  ¡Personalízame!
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
          </div>

          {/* Sound Settings */}
          <div className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sonidos</h3>
              <p className="text-gray-600 mb-6">
                Ajusta los efectos de sonido y la música de fondo para una mejor experiencia.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-blue-800">Efectos de Sonido</span>
                  <div className="w-14 h-7 bg-blue-400 rounded-full relative cursor-pointer">
                    <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm transition-transform duration-200"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-blue-800">Música de Fondo</span>
                  <div className="w-14 h-7 bg-gray-300 rounded-full relative cursor-pointer">
                    <div className="w-6 h-6 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transition-transform duration-200"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4">
                  <span className="text-sm font-semibold text-blue-800">Volumen</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-blue-200 rounded-full">
                      <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-blue-600 font-medium">75%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
          </div>

          {/* Help & Info */}
          <div className="group cursor-pointer bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce">
                <Info className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ayuda</h3>
              <p className="text-gray-600 mb-6">
                Encuentra respuestas a tus preguntas y aprende cómo usar MentaMática.
              </p>
              
              <div className="space-y-3">
                <div className="bg-orange-50 rounded-xl p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-orange-800">📚 Cómo Jugar</span>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-yellow-800">❓ Preguntas Frecuentes</span>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center hover:bg-orange-100 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-orange-800">🎯 Consejos y Trucos</span>
                </div>
                <div className="bg-yellow-50 rounded-xl p-3 text-center hover:bg-yellow-100 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold text-yellow-800">📞 Contactar Ayuda</span>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl"></div>
          </div>
        </div>

        {/* Neuroscience Info */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center justify-center gap-2">
              🧠 Personalización y Aprendizaje
            </h3>
            <p className="text-blue-700 mb-6">
              La personalización no es solo diversión: ¡es ciencia! Cuando personalizas tu experiencia de aprendizaje, 
              tu cerebro crea conexiones más fuertes y duraderas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 rounded-xl p-6">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-bold text-blue-800 mb-2">Creatividad</h4>
                <p className="text-sm text-blue-700">Personalizar tu avatar estimula la corteza prefrontal, mejorando tu creatividad y resolución de problemas.</p>
              </div>
              <div className="bg-white/60 rounded-xl p-6">
                <div className="text-3xl mb-3">💖</div>
                <h4 className="font-bold text-blue-800 mb-2">Motivación</h4>
                <p className="text-sm text-blue-700">Tener un avatar único activa tu sistema de recompensa, haciendo que quieras aprender más.</p>
              </div>
              <div className="bg-white/60 rounded-xl p-6">
                <div className="text-3xl mb-3">🧩</div>
                <h4 className="font-bold text-blue-800 mb-2">Memoria</h4>
                <p className="text-sm text-blue-700">Las experiencias personalizadas fortalecen tu hipocampo, mejorando tu capacidad de recordar.</p>
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
      `}</style>
    </div>
  );
};

export default Settings;