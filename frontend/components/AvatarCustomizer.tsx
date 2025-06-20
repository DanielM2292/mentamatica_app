import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Sparkles, Heart, Star, Lock, Coins } from 'lucide-react';

interface AvatarOptions {
  gender: 'boy' | 'girl';
  skinColor: string;
  eyes: string;
  eyeColor: string;
  eyebrows: string;
  nose: string;
  mouth: string;
  ears: string;
  hairType: string;
  hairColor: string;
  clothing: string;
  accessories: string;
  background: string;
  facialHair: string;
}

interface CategoryOption {
  id: string;
  name: string;
  preview: string;
  color?: string;
  cost?: number;
}

interface AvatarCustomizerProps {
  onBack: () => void;
  onSave: (avatar: AvatarOptions) => void;
  userCoins?: number;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ onBack, onSave, userCoins = 50 }) => {
  const [currentCategory, setCurrentCategory] = useState<string>('gender');
  const [avatar, setAvatar] = useState<AvatarOptions>({
    gender: 'boy',
    skinColor: '#FDBCB4',
    eyes: 'normal',
    eyeColor: '#4A5568',
    eyebrows: 'normal',
    nose: 'normal',
    mouth: 'smile',
    ears: 'normal',
    hairType: 'short',
    hairColor: '#8B4513',
    clothing: 'casual',
    accessories: 'none',
    background: 'gradient1',
    facialHair: 'none'
  });

  const [animatingOption, setAnimatingOption] = useState<string | null>(null);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [unlockedCategories, setUnlockedCategories] = useState<string[]>(['gender', 'skinColor']);
  const avatarRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Simulamos GSAP con animaciones CSS personalizadas
  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.style.animation = 'avatarFloat 3s ease-in-out infinite';
    }
  }, [avatar]);

  const categories = [
    { id: 'gender', name: 'Género', icon: '👤', color: 'from-pink-200 to-blue-200', isLocked: false, cost: 0 },
    { id: 'skinColor', name: 'Color de Piel', icon: '🎨', color: 'from-orange-200 to-yellow-200', isLocked: false, cost: 0 },
    { id: 'eyes', name: 'Forma de Ojos', icon: '👀', color: 'from-blue-200 to-cyan-200', isLocked: !unlockedCategories.includes('eyes'), cost: 10 },
    { id: 'eyeColor', name: 'Color de Ojos', icon: '🌈', color: 'from-green-200 to-teal-200', isLocked: !unlockedCategories.includes('eyeColor'), cost: 15 },
    { id: 'eyebrows', name: 'Cejas', icon: '✨', color: 'from-yellow-200 to-orange-200', isLocked: !unlockedCategories.includes('eyebrows'), cost: 12 },
    { id: 'nose', name: 'Nariz', icon: '👃', color: 'from-green-200 to-emerald-200', isLocked: !unlockedCategories.includes('nose'), cost: 15 },
    { id: 'mouth', name: 'Boca', icon: '👄', color: 'from-red-200 to-pink-200', isLocked: !unlockedCategories.includes('mouth'), cost: 10 },
    { id: 'ears', name: 'Orejas', icon: '👂', color: 'from-purple-200 to-indigo-200', isLocked: !unlockedCategories.includes('ears'), cost: 20 },
    { id: 'facialHair', name: 'Vello Facial', icon: '🧔', color: 'from-gray-200 to-slate-200', isLocked: !unlockedCategories.includes('facialHair'), cost: 18 },
    { id: 'hairType', name: 'Tipo de Pelo', icon: '💇', color: 'from-yellow-200 to-orange-200', isLocked: !unlockedCategories.includes('hairType'), cost: 25 },
    { id: 'hairColor', name: 'Color de Pelo', icon: '🌈', color: 'from-indigo-200 to-purple-200', isLocked: !unlockedCategories.includes('hairColor'), cost: 15 },
    { id: 'clothing', name: 'Ropa', icon: '👕', color: 'from-teal-200 to-green-200', isLocked: !unlockedCategories.includes('clothing'), cost: 30 },
    { id: 'accessories', name: 'Accesorios', icon: '🎀', color: 'from-pink-200 to-rose-200', isLocked: !unlockedCategories.includes('accessories'), cost: 50 },
    { id: 'background', name: 'Fondo', icon: '🌟', color: 'from-cyan-200 to-blue-200', isLocked: !unlockedCategories.includes('background'), cost: 40 }
  ];

  const options: Record<string, CategoryOption[]> = {
    gender: [
      { id: 'boy', name: 'Niño', preview: '👦' },
      { id: 'girl', name: 'Niña', preview: '👧' }
    ],
    skinColor: [
      { id: '#FDBCB4', name: 'Claro', preview: '🟤', color: '#FDBCB4' },
      { id: '#F1C27D', name: 'Medio', preview: '🟤', color: '#F1C27D' },
      { id: '#E0AC69', name: 'Dorado', preview: '🟤', color: '#E0AC69' },
      { id: '#C68642', name: 'Moreno', preview: '🟤', color: '#C68642' },
      { id: '#8D5524', name: 'Oscuro', preview: '🟤', color: '#8D5524' },
      { id: '#D4A574', name: 'Canela', preview: '🟤', color: '#D4A574' }
    ],
    eyes: [
      { id: 'normal', name: 'Normales', preview: '👁️' },
      { id: 'big', name: 'Grandes', preview: '😍' },
      { id: 'small', name: 'Pequeños', preview: '😊' },
      { id: 'almond', name: 'Almendrados', preview: '😌' },
      { id: 'round', name: 'Redondos', preview: '😮' },
      { id: 'sleepy', name: 'Somnolientos', preview: '😴' },
      { id: 'wink', name: 'Guiño', preview: '😉' }
    ],
    eyeColor: [
      { id: '#4A5568', name: 'Gris', preview: '⚫', color: '#4A5568' },
      { id: '#8B4513', name: 'Café', preview: '🟤', color: '#8B4513' },
      { id: '#2D5A87', name: 'Azul', preview: '🔵', color: '#2D5A87' },
      { id: '#2F855A', name: 'Verde', preview: '🟢', color: '#2F855A' },
      { id: '#553C9A', name: 'Violeta', preview: '🟣', color: '#553C9A' },
      { id: '#C05621', name: 'Ámbar', preview: '🟠', color: '#C05621' }
    ],
    eyebrows: [
      { id: 'normal', name: 'Normales', preview: '━' },
      { id: 'thick', name: 'Gruesas', preview: '═' },
      { id: 'thin', name: 'Delgadas', preview: '─' },
      { id: 'arched', name: 'Arqueadas', preview: '︶' },
      { id: 'straight', name: 'Rectas', preview: '▬' },
      { id: 'bushy', name: 'Pobladas', preview: '≡' }
    ],
    nose: [
      { id: 'normal', name: 'Normal', preview: '👃🏼' },
      { id: 'small', name: 'Pequeña', preview: '👃🏻' },
      { id: 'big', name: 'Grande', preview: '👃🏽' },
      { id: 'button', name: 'Respingona', preview: '👃🏾' },
      { id: 'pointed', name: 'Puntiaguda', preview: '🔺' },
      { id: 'wide', name: 'Ancha', preview: '▽' }
    ],
    mouth: [
      { id: 'smile', name: 'Sonrisa', preview: '😊' },
      { id: 'big_smile', name: 'Sonrisa Grande', preview: '😄' },
      { id: 'neutral', name: 'Neutral', preview: '😐' },
      { id: 'small', name: 'Pequeña', preview: '🙂' },
      { id: 'lips', name: 'Labios Gruesos', preview: '💋' },
      { id: 'whistle', name: 'Silbido', preview: '😗' },
      { id: 'tongue', name: 'Lengua', preview: '😛' }
    ],
    ears: [
      { id: 'normal', name: 'Normales', preview: '👂' },
      { id: 'small', name: 'Pequeñas', preview: '👂🏻' },
      { id: 'big', name: 'Grandes', preview: '👂🏼' },
      { id: 'pointed', name: 'Puntiagudas', preview: '🧝' },
      { id: 'round', name: 'Redondas', preview: '⭕' }
    ],
    facialHair: [
      { id: 'none', name: 'Sin Vello', preview: '🚫' },
      { id: 'mustache', name: 'Bigote', preview: '👨' },
      { id: 'beard', name: 'Barba', preview: '🧔' },
      { id: 'goatee', name: 'Perilla', preview: '🐐' },
      { id: 'stubble', name: 'Barba de 3 días', preview: '👤' }
    ],
    hairType: [
      { id: 'short', name: 'Corto', preview: '👦' },
      { id: 'medium', name: 'Mediano', preview: '👨' },
      { id: 'long', name: 'Largo', preview: '👧' },
      { id: 'curly', name: 'Rizado', preview: '👨‍🦱' },
      { id: 'wavy', name: 'Ondulado', preview: '👩‍🦰' },
      { id: 'braids', name: 'Trenzas', preview: '👧🏽' },
      { id: 'ponytail', name: 'Cola', preview: '👱‍♀️' },
      { id: 'bald', name: 'Calvo', preview: '👨‍🦲' },
      { id: 'mohawk', name: 'Mohicano', preview: '🤘' }
    ],
    hairColor: [
      { id: '#000000', name: 'Negro', preview: '⚫', color: '#000000' },
      { id: '#8B4513', name: 'Castaño', preview: '🟤', color: '#8B4513' },
      { id: '#CD853F', name: 'Rubio Oscuro', preview: '🟫', color: '#CD853F' },
      { id: '#FFD700', name: 'Rubio', preview: '🟡', color: '#FFD700' },
      { id: '#FF4500', name: 'Pelirrojo', preview: '🔴', color: '#FF4500' },
      { id: '#9370DB', name: 'Morado', preview: '🟣', color: '#9370DB' },
      { id: '#00CED1', name: 'Azul', preview: '🔵', color: '#00CED1' },
      { id: '#FF69B4', name: 'Rosa', preview: '🩷', color: '#FF69B4' },
      { id: '#32CD32', name: 'Verde', preview: '🟢', color: '#32CD32' },
      { id: '#C0C0C0', name: 'Gris', preview: '⚪', color: '#C0C0C0' }
    ],
    clothing: [
      { id: 'casual', name: 'Casual', preview: '👕' },
      { id: 'formal', name: 'Elegante', preview: '👔' },
      { id: 'sports', name: 'Deportiva', preview: '🏃' },
      { id: 'hoodie', name: 'Sudadera', preview: '🧥' },
      { id: 'dress', name: 'Vestido', preview: '👗' },
      { id: 'superhero', name: 'Superhéroe', preview: '🦸' },
      { id: 'princess', name: 'Princesa', preview: '👸' },
      { id: 'pirate', name: 'Pirata', preview: '🏴‍☠️' },
      { id: 'uniform', name: 'Uniforme', preview: '👮' }
    ],
    accessories: [
      { id: 'none', name: 'Ninguno', preview: '❌' },
      { id: 'glasses', name: 'Lentes', preview: '🤓' },
      { id: 'sunglasses', name: 'Lentes de Sol', preview: '😎' },
      { id: 'hat', name: 'Sombrero', preview: '🎩' },
      { id: 'cap', name: 'Gorra', preview: '🧢' },
      { id: 'bow', name: 'Moño', preview: '🎀' },
      { id: 'crown', name: 'Corona', preview: '👑' },
      { id: 'headband', name: 'Diadema', preview: '👸' },
      { id: 'earrings', name: 'Aretes', preview: '💎' },
      { id: 'necklace', name: 'Collar', preview: '📿' }
    ],
    background: [
      { id: 'gradient1', name: 'Arcoíris', preview: '🌈' },
      { id: 'gradient2', name: 'Atardecer', preview: '🌅' },
      { id: 'space', name: 'Espacio', preview: '🌌' },
      { id: 'forest', name: 'Bosque', preview: '🌲' },
      { id: 'ocean', name: 'Océano', preview: '🌊' },
      { id: 'castle', name: 'Castillo', preview: '🏰' },
      { id: 'city', name: 'Ciudad', preview: '🏙️' },
      { id: 'clouds', name: 'Nubes', preview: '☁️' },
      { id: 'stars', name: 'Estrellas', preview: '⭐' }
    ]
  };

  const unlockCategory = (categoryId: string, cost: number) => {
    if (userCoins >= cost && !unlockedCategories.includes(categoryId)) {
      setUnlockedCategories([...unlockedCategories, categoryId]);
      // Aquí podrías actualizar las monedas del usuario
      return true;
    }
    return false;
  };

  const handleOptionSelect = (optionId: string) => {
    const currentCategoryData = categories.find(c => c.id === currentCategory);
    
    if (currentCategoryData?.isLocked) {
      setAnimatingOption(optionId);
      setTimeout(() => setAnimatingOption(null), 600);
      return;
    }

    setAnimatingOption(optionId);
    
    setTimeout(() => {
      setAvatar(prev => ({
        ...prev,
        [currentCategory]: optionId
      }));
      setAnimatingOption(null);
    }, 200);
  };

  const handleSave = () => {
    setShowSaveAnimation(true);
    setTimeout(() => {
      onSave(avatar);
      setShowSaveAnimation(false);
    }, 2000);
  };

  const FloatingParticle = ({ delay, emoji, className = "" }: { delay: number; emoji: string; className?: string }) => (
    <div
      className={`absolute text-2xl opacity-60 pointer-events-none ${className}`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `floatParticle ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );

  const renderBackground = () => {
    const backgrounds = {
      gradient1: 'bg-gradient-to-br from-red-200 via-yellow-200 via-green-200 via-blue-200 to-purple-200',
      gradient2: 'bg-gradient-to-br from-orange-300 via-pink-300 to-purple-400',
      space: 'bg-gradient-to-br from-indigo-900 to-purple-900',
      forest: 'bg-gradient-to-br from-green-400 to-green-600',
      ocean: 'bg-gradient-to-br from-blue-400 to-blue-600',
      castle: 'bg-gradient-to-br from-gray-400 to-gray-600',
      city: 'bg-gradient-to-br from-gray-600 to-slate-800',
      clouds: 'bg-gradient-to-br from-sky-200 to-sky-400',
      stars: 'bg-gradient-to-br from-indigo-800 to-purple-800'
    };

    return backgrounds[avatar.background as keyof typeof backgrounds] || backgrounds.gradient1;
  };

  // Componente 2D del Avatar
  const Avatar2D = () => (
    <div 
      ref={avatarRef}
      className="relative w-48 h-60 mx-auto"
      style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
    >
      {/* Cabeza */}
      <div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-28 rounded-full border-2 border-white/20"
        style={{ 
          backgroundColor: avatar.skinColor,
          clipPath: 'ellipse(50% 55% at 50% 45%)'
        }}
      >
        {/* Cabello */}
        {avatar.hairType !== 'bald' && (
          <div 
            className="absolute -top-4 -left-4 -right-4 h-16 rounded-t-full"
            style={{ 
              backgroundColor: avatar.hairColor,
              clipPath: avatar.hairType === 'curly' ? 'polygon(20% 80%, 80% 80%, 90% 40%, 70% 10%, 30% 10%, 10% 40%)' :
                       avatar.hairType === 'long' ? 'polygon(0% 70%, 100% 70%, 90% 0%, 10% 0%)' :
                       avatar.hairType === 'mohawk' ? 'polygon(40% 100%, 60% 100%, 55% 0%, 45% 0%)' :
                       'ellipse(80% 60% at 50% 40%)'
            }}
          >
            {/* Detalles del cabello */}
            {avatar.hairType === 'braids' && (
              <>
                <div className="absolute -bottom-8 left-1 w-2 h-12 rounded-full" style={{ backgroundColor: avatar.hairColor }} />
                <div className="absolute -bottom-8 right-1 w-2 h-12 rounded-full" style={{ backgroundColor: avatar.hairColor }} />
              </>
            )}
            {avatar.hairType === 'ponytail' && (
              <div className="absolute -bottom-6 right-0 w-3 h-10 rounded-full" style={{ backgroundColor: avatar.hairColor }} />
            )}
          </div>
        )}

        {/* Cejas */}
        <div className="absolute top-4 left-3 w-4 h-1 rounded-full" style={{ backgroundColor: avatar.hairColor, opacity: 0.8 }} />
        <div className="absolute top-4 right-3 w-4 h-1 rounded-full" style={{ backgroundColor: avatar.hairColor, opacity: 0.8 }} />

        {/* Ojos */}
        <div className="absolute top-6 left-4">
          <div 
            className="w-3 h-2 rounded-full bg-white border border-gray-300"
            style={{ 
              transform: avatar.eyes === 'big' ? 'scale(1.3)' : 
                        avatar.eyes === 'small' ? 'scale(0.8)' :
                        avatar.eyes === 'almond' ? 'scaleY(0.7)' : 'scale(1)'
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full absolute top-0.5 left-0.5"
              style={{ backgroundColor: avatar.eyeColor }}
            />
          </div>
        </div>
        <div className="absolute top-6 right-4">
          <div 
            className="w-3 h-2 rounded-full bg-white border border-gray-300"
            style={{ 
              transform: avatar.eyes === 'big' ? 'scale(1.3)' : 
                        avatar.eyes === 'small' ? 'scale(0.8)' :
                        avatar.eyes === 'almond' ? 'scaleY(0.7)' : 'scale(1)'
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full absolute top-0.5 right-0.5"
              style={{ backgroundColor: avatar.eyeColor }}
            />
          </div>
        </div>

        {/* Nariz */}
        <div 
          className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-2 rounded-full"
          style={{ 
            backgroundColor: avatar.skinColor,
            filter: 'brightness(0.9)',
            transform: `translateX(-50%) ${avatar.nose === 'big' ? 'scale(1.3)' : 
                                          avatar.nose === 'small' ? 'scale(0.8)' : 'scale(1)'}`
          }}
        />

        {/* Boca */}
        <div 
          className="absolute top-14 left-1/2 transform -translate-x-1/2"
          style={{
            width: avatar.mouth === 'big_smile' ? '12px' : 
                   avatar.mouth === 'small' ? '6px' : '8px',
            height: '4px',
            backgroundColor: '#ff6b9d',
            borderRadius: avatar.mouth === 'smile' || avatar.mouth === 'big_smile' ? '0 0 20px 20px' : '4px',
            border: avatar.mouth === 'lips' ? '1px solid #ff1744' : 'none'
          }}
        />

        {/* Orejas */}
        <div 
          className="absolute top-8 -left-2 w-3 h-4 rounded-full border border-white/20"
          style={{ backgroundColor: avatar.skinColor }}
        />
        <div 
          className="absolute top-8 -right-2 w-3 h-4 rounded-full border border-white/20"
          style={{ backgroundColor: avatar.skinColor }}
        />

        {/* Vello facial */}
        {avatar.facialHair !== 'none' && (
          <div 
            className="absolute top-16 left-1/2 transform -translate-x-1/2"
            style={{
              width: avatar.facialHair === 'mustache' ? '8px' : '12px',
              height: avatar.facialHair === 'mustache' ? '2px' : '6px',
              backgroundColor: avatar.hairColor,
              borderRadius: '4px',
              opacity: 0.8
            }}
          />
        )}
      </div>

      {/* Cuerpo */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-20 h-24">
        {/* Torso */}
        <div 
          className="w-full h-16 rounded-t-lg"
          style={{
            backgroundColor: avatar.clothing === 'formal' ? '#1a365d' :
                            avatar.clothing === 'sports' ? '#e53e3e' :
                            avatar.clothing === 'hoodie' ? '#4a5568' :
                            avatar.clothing === 'dress' ? '#d53f8c' :
                            '#4299e1'
          }}
        />
        
        {/* Brazos */}
        <div 
          className="absolute top-2 -left-3 w-4 h-12 rounded-full"
          style={{ backgroundColor: avatar.skinColor }}
        />
        <div 
          className="absolute top-2 -right-3 w-4 h-12 rounded-full"
          style={{ backgroundColor: avatar.skinColor }}
        />
      </div>

      {/* Accesorios */}
      {avatar.accessories !== 'none' && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          {avatar.accessories === 'glasses' && (
            <div className="w-12 h-4 border-2 border-gray-800 rounded bg-transparent" />
          )}
          {avatar.accessories === 'hat' && (
            <div className="w-16 h-8 bg-gray-800 rounded-t-full -mt-6" />
          )}
          {avatar.accessories === 'crown' && (
            <div className="w-14 h-6 bg-yellow-400 rounded -mt-4 relative">
              <div className="absolute -top-2 left-2 w-2 h-2 bg-yellow-400 transform rotate-45" />
              <div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow-400 transform -translate-x-1/2 rotate-45" />
              <div className="absolute -top-2 right-2 w-2 h-2 bg-yellow-400 transform rotate-45" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  const AvatarPreview = () => (
    <div className={`relative ${renderBackground()} rounded-3xl p-8 shadow-2xl border-4 border-white/50 backdrop-blur-sm overflow-hidden`}>
      {/* Efectos de fondo especiales */}
      {avatar.background === 'space' && (
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {avatar.background === 'stars' && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {/* Avatar 2D */}
      <div className="relative z-10 flex flex-col items-center justify-center h-64">
        <Avatar2D />
      </div>

      {/* Efectos de brillo */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-3xl" />
      
      {/* Partículas flotantes */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        <FloatingParticle delay={0} emoji="✨" />
        <FloatingParticle delay={1} emoji="🌟" />
        <FloatingParticle delay={2} emoji="💫" />
        <FloatingParticle delay={3} emoji="🎭" /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatBackground ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full text-yellow-300 border border-yellow-500/30">
              <Coins size={20} />
              <span className="font-bold">{userCoins}</span>
            </div>

            <button
              onClick={handleSave}
              disabled={showSaveAnimation}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {showSaveAnimation ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Guardar Avatar</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Categorías */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                <Sparkles className="inline-block mr-2" size={24} />
                Personalización
              </h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      if (category.isLocked) {
                        if (unlockCategory(category.id, category.cost)) {
                          setCurrentCategory(category.id);
                        }
                      } else {
                        setCurrentCategory(category.id);
                      }
                    }}
                    className={`w-full p-4 rounded-xl transition-all duration-300 border-2 relative overflow-hidden group ${
                      currentCategory === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-white text-white scale-105 shadow-lg'
                        : category.isLocked
                        ? 'bg-gray-500/20 border-gray-500/30 text-gray-400 hover:bg-gray-500/30'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      
                      {category.isLocked && (
                        <div className="flex items-center gap-2 text-sm">
                          <Lock size={16} />
                          <span>{category.cost}</span>
                          <Coins size={16} />
                        </div>
                      )}
                    </div>

                    {!category.isLocked && currentCategory === category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vista previa del Avatar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <AvatarPreview />
              
              {/* Efectos de guardado */}
              {showSaveAnimation && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 animate-bounce">
                      <Heart className="text-red-500" size={32} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel de Opciones */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 capitalize">
                {categories.find(c => c.id === currentCategory)?.name || 'Opciones'}
              </h3>
              
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar">
                {options[currentCategory]?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`p-4 rounded-xl transition-all duration-300 border-2 relative group ${
                      avatar[currentCategory as keyof AvatarOptions] === option.id
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 border-white text-white scale-105 shadow-lg'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105'
                    } ${
                      animatingOption === option.id ? 'animate-pulse' : ''
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">
                        {option.color ? (
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-white/50 shadow-lg"
                            style={{ backgroundColor: option.color }}
                          />
                        ) : (
                          option.preview
                        )}
                      </span>
                      <span className="text-sm font-medium text-center">{option.name}</span>
                      {option.cost && (
                        <div className="flex items-center gap-1 text-xs text-yellow-300">
                          <Coins size={12} />
                          <span>{option.cost}</span>
                        </div>
                      )}
                    </div>

                    {avatar[currentCategory as keyof AvatarOptions] === option.id && (
                      <div className="absolute top-2 right-2">
                        <Star className="text-yellow-300 fill-current" size={16} />
                      </div>
                    )}

                    {animatingOption === option.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-xl" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes avatarFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes floatBackground {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AvatarCustomizer;