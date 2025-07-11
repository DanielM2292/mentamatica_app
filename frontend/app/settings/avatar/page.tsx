"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Heart, Star, Save, Settings, Download, User, Sparkles, Palette, Eye, Smile, Glasses as GlassesIcon, Crown, Zap, Camera, Wand2, Rainbow, Lock } from 'lucide-react';
import Button from '../../../components/atoms/Button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { toast } from '@/hooks/use-toast';
import Monedas from '@/components/molecules/Monedas';

export const categoryColors: Record<string, string> = {
  AVC0001: "from-orange-400 via-amber-400 to-yellow-400",
  AVC0002: "from-amber-400 via-yellow-400 to-lime-400",
  AVC0003: "from-rose-400 via-pink-400 to-purple-400",
  AVC0004: "from-blue-400 via-cyan-400 to-teal-400",
  AVC0005: "from-green-400 via-emerald-400 to-teal-400",
  AVC0006: "from-pink-400 via-rose-400 to-red-400",
  AVC0007: "from-indigo-400 via-purple-400 to-pink-400",
  AVC0008: "from-yellow-400 via-orange-400 to-red-400",
  AVC0009: "from-red-400 via-pink-400 to-purple-400",
  AVC0010: "from-purple-400 via-pink-400 to-red-400",
};

export const categoryBgColors: Record<string, string> = {
  AVC0001: "from-orange-100 to-amber-100",
  AVC0002: "from-amber-100 to-yellow-100",
  AVC0003: "from-rose-100 to-pink-100",
  AVC0004: "from-blue-100 to-cyan-100",
  AVC0005: "from-green-100 to-emerald-100",
  AVC0006: "from-pink-100 to-rose-100",
  AVC0007: "from-indigo-100 to-purple-100",
  AVC0008: "from-yellow-100 to-orange-100",
  AVC0009: "from-red-100 to-pink-100",
  AVC0010: "from-purple-100 to-pink-100",
};

interface AvatarCategory {
  categoria_id: string;
  nombre_categoria: string;
  icono?: string;
  emoji?: string;
  orden: number;
}

interface AvatarOption {
  opcion_id: string;
  categoria_id: string;
  valor: string;
  costo: number;
}

interface UserUnlockedOption {
  opcion_id: string;
  fecha_desbloqueo: string;
}

interface AvatarCustomizerProps {
  onSave?: (avatar: any) => void;
}

const Page: React.FC<AvatarCustomizerProps> = ({
  onSave = (avatar) => console.log('Save', avatar)
}) => {
  const [categories, setCategories] = useState<AvatarCategory[]>([]);
  const [options, setOptions] = useState<Record<string, AvatarOption[]>>({});
  const [unlockedOptions, setUnlockedOptions] = useState<UserUnlockedOption[]>([]);
  const [userCoins, setUserCoins] = useState(0);
  const [seed] = useState('mi-avatar-magico');
  const { user } = useUser();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user?.id) return;

      try {
        console.log("Entra a buscar las categorías");

        // 1. Obtener categorías
        const catsRes = await fetch(`http://localhost:3001/api/avatar?get=categorias`);
        if (!catsRes.ok) throw new Error("Error al obtener categorías");

        const categoriesData = await catsRes.json();

        if (!categoriesData.success || !Array.isArray(categoriesData.categorias)) {
          throw new Error("La respuesta de categorías no es válida");
        }

        const categorias = categoriesData.categorias;
        console.log("Estas categorías:", categorias);

        setCategories(categorias.sort((a: AvatarCategory, b: AvatarCategory) => a.orden - b.orden));

        // 2. Obtener opciones desbloqueadas
        const unlockedRes = await fetch(`http://localhost:3001/api/avatar?usuario_id=${user.id}`);
        console.log("las opciones desbloqueadas", unlockedRes);
        const unlockedData = await unlockedRes.json();
        setUnlockedOptions(unlockedData.unlockedOptions || []);

        // 3. Obtener monedas del usuario
        const userRes = await fetch(`http://localhost:3001/api/usuarios?usuario_id=${user?.id}`);
        console.log("las monedas usuario", userRes);
        const userData = await userRes.json();
        setUserCoins(userData.monedas || 0);

        // 4. Cargar opciones de la primera categoría
        if (categorias.length > 0) {
          setActiveCategory(categorias[0].categoria_id);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [user]);

  useEffect(() => {
    if (activeCategory) {
      loadCategoryOptions(activeCategory);
    }
  }, [activeCategory]);


  // Función para cargar opciones por categoría
  const loadCategoryOptions = async (categoryId: string) => {
    if (options[categoryId]) return; // Ya cargadas
    try {
      const res = await fetch(`http://localhost:3001/api/avatar?categoria_id=${categoryId}`);
      if (!res.ok) throw new Error(`Error al cargar opciones para la categoría ${categoryId}`);
      const data = await res.json();
      console.log("Las opciones por categoria: ", data)
      setOptions(prev => ({
        ...prev,
        [categoryId]: data.opciones
      }));
    } catch (error) {
      console.error('Error cargando opciones de categorias:', error);
      toast({ description: `Error al cargar opciones para la categoría ${categoryId}` });
    }
  };

  // Verificar si una opción está desbloqueada
  const isOptionUnlocked = (optionId: string) => {
    return unlockedOptions.some(opt => opt.opcion_id === optionId);
  };

  const handleUnlockOption = async (option: AvatarOption) => {
    if (userCoins < option.costo) {
      toast({ description: 'No tienes suficientes monedas' });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/api/avatar`, { // Asumiendo un endpoint específico para desbloquear
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          categoriaId: option.categoria_id,
          optionId: option.opcion_id,
          costo: option.costo // Enviar el costo para que el backend lo reste
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          // Ya está desbloqueada, aún puedes agregarla al estado si hace falta
          setUnlockedOptions(prev => [...prev, { opcion_id: option.opcion_id, fecha_desbloqueo: new Date().toISOString() }]);
          toast({ description: "¡Ya habías desbloqueado esta opción!" });
        } else {
          toast({ description: `Error: ${data.error || 'No se pudo desbloquear la opción.'}` });
        }
        return;
      }

      // Desbloqueo exitoso, aquí puedes usar la lógica que tienes:
      setUnlockedOptions(prev => [...prev, { opcion_id: option.opcion_id, fecha_desbloqueo: new Date().toISOString() }]);
      setUserCoins(prev => prev - option.costo);
      toast({ description: `¡Opción desbloqueada! Costo: ${option.costo} monedas` });
    } catch (error) {
      console.error('Error de red al desbloquear:', error);
      toast({ description: 'Hubo un problema de conexión con el servidor.' });
    }
  };


  // Renderizado de opciones (ejemplo para colores)
  const handleOptionChange = (category: string, value: string) => {
    setIsLoading(true);
    setAvatarOptions(prev => ({
      ...prev,
      [category]: value
    }));

    // Efectos visuales
    setShowConfetti(true);
    setShowSparkles(true);
    setTimeout(() => setShowConfetti(false), 800);
    setTimeout(() => setShowSparkles(false), 1000);
    setTimeout(() => setIsLoading(false), 300);
  };

  // Mapeo de nombres amigables para las opciones
  const FRIENDLY_NAMES: Record<string, Record<string, string>> = {
    backgroundColor: {
      'transparent': '🚫',
      'b6e3f4': '💙',
      'c0aede': '💜',
      'd1d4f9': '🌸',
      'ffd5dc': '🌺',
      'ffdfbf': '🍑',
      'ff6b6b': '❤️',
      '4ecdc4': '🌊',
      '45b7d1': '🌀',
      '96ceb4': '🌿',
      'ffeaa7': '☀️'
    },
    earrings: {
      'none': '🚫'
    },
    features: {
      'none': '🚫',
      'birthmark': '🔸',
      'blush': '😊',
      'freckles': '⭐'
    },
    glasses: {
      'none': '🚫'
    },
    hair: {
      'none': '🚫'
    }
  };

  const avatarUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('seed', seed);
    params.append('size', '600');

    Object.entries(avatarOptions).forEach(([key, value]) => {
      if (['features', 'glasses', 'earrings', 'hair'].includes(key)) {
        if (value === 'none') {
          params.append(`${key}Probability`, '0');
        } else {
          params.append(key, value);
          params.append(`${key}Probability`, '100');
        }
      } else if (value && value !== 'none') {
        params.append(key, value);
      }
    });

    return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
  }, [avatarOptions, seed]);

  const handleSave = () => {
    setShowSaveAnimation(true);
    setTimeout(() => {
      const avatarData = {
        style: 'adventurer',
        options: options,
        seed: seed,
        url: avatarUrl
      };
      onSave(avatarData);
      setShowSaveAnimation(false);
    }, 2000);
  };

  const downloadAvatar = async () => {
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mi-avatar-${seed}.svg`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading avatar:', error);
    }
  };

  const currentCategory = categories.find(cat => cat.categoria_id === activeCategory);
  const currentOptions = activeCategory ? options[activeCategory] || [] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 via-blue-200 to-cyan-200 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-16 right-8 sm:top-32 sm:right-16 w-6 h-6 sm:w-12 sm:h-12 bg-pink-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2s' }}></div>
        <div className="absolute bottom-10 left-16 sm:bottom-20 sm:left-32 w-10 h-10 sm:w-20 sm:h-20 bg-blue-300 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-4 sm:bottom-40 sm:right-8 w-4 h-4 sm:w-8 sm:h-8 bg-green-300 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
      </div>

      {/* Efectos visuales */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1s'
              }}
            >
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-red-400', 'bg-orange-400'][Math.floor(Math.random() * 7)]
                } opacity-80 shadow-lg`}></div>
            </div>
          ))}
        </div>
      )}

      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.3}s`,
                animationDuration: '0.8s'
              }}
            >
              <Star className={`w-4 h-4 sm:w-6 sm:h-6 ${['text-yellow-400', 'text-pink-400', 'text-blue-400', 'text-green-400', 'text-purple-400'][Math.floor(Math.random() * 5)]
                } opacity-70`} />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 shadow-2xl border-b-2 sm:border-b-4 border-white">
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link href="/settings">
              <Button>
                <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="hidden xs:inline">🏠 Inicio</span>
                <span className="xs:hidden">🏠</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-center">
              <div className="w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-spin shadow-xl" style={{ animation: 'spin 8s linear infinite' }}>
                <Wand2 className="w-4 h-4 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-lg sm:text-3xl font-black text-white drop-shadow-lg animate-pulse leading-tight" style={{ animationDuration: '2s' }}>
                  <span className="hidden sm:inline">✨🎨 AVATAR MÁGICO 🎨✨</span>
                  <span className="sm:hidden">✨ AVATAR ✨</span>
                </h1>
                <p className="text-white/90 font-bold text-xs sm:text-lg animate-bounce hidden sm:block" style={{ animationDuration: '3s' }}>
                  ¡Crea tu personaje favorito!
                </p>
              </div>
            </div>

            {user && <Monedas userId={user.id} isVisible={true} />}
            <button
              onClick={handleSave}
              disabled={showSaveAnimation}
              className="flex items-center gap-1 sm:gap-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-sm sm:text-lg font-bold disabled:opacity-50 animate-pulse"
              style={{ animationDuration: '2.5s' }}
            >
              <Save className="w-4 h-4 sm:w-6 sm:h-6" />
              <span className="hidden xs:inline">💾 Guardar</span>
              <span className="xs:hidden">💾</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 sm:gap-10 max-w-7xl mx-auto">
          {/* Avatar Preview */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl lg:sticky lg:top-28 border-2 sm:border-4 border-gradient-to-r from-pink-400 to-purple-400 relative overflow-hidden">
              <div className="absolute top-3 right-3 sm:top-6 sm:right-6 animate-spin" style={{ animation: 'spin 10s linear infinite' }}>
                <Star className="w-4 h-4 sm:w-8 sm:h-8 text-yellow-400 opacity-80 drop-shadow-lg" />
              </div>
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 animate-bounce" style={{ animationDuration: '2s' }}>
                <Heart className="w-3 h-3 sm:w-6 sm:h-6 text-pink-400 opacity-80 drop-shadow-lg" />
              </div>

              <div className="text-center mb-4 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-black text-purple-800 mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-4 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <Camera className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600 animate-pulse" style={{ animationDuration: '1.5s' }} />
                  <span>🎭 TU AVATAR 🎭</span>
                </h2>
                <p className="text-purple-600 font-bold text-sm sm:text-xl animate-pulse" style={{ animationDuration: '3s' }}>
                  ¡Mira qué genial se ve! 🌟
                </p>
              </div>

              <div className="flex justify-center mb-4 sm:mb-8">
                <div className="relative group">
                  <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-2xl sm:blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                  <div className="relative w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 sm:border-8 border-white group-hover:scale-105 transition-transform duration-300">
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-2 sm:gap-4">
                          <div className="w-8 h-8 sm:w-16 sm:h-16 border-4 sm:border-8 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-purple-600 font-black text-sm sm:text-xl animate-bounce">🎨 Creando magia...</p>
                        </div>
                      </div>
                    )}

                    <img
                      src={avatarUrl}
                      alt="Tu avatar súper genial"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`;
                      }}
                    />

                    {showSaveAnimation && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-500/90 to-blue-500/90 rounded-full">
                        <div className="bg-white text-green-600 px-4 py-3 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl animate-bounce text-lg sm:text-2xl font-black shadow-2xl">
                          🎉✨ ¡GUARDADO! ✨🎉
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={downloadAvatar}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 animate-pulse"
                  style={{ animationDuration: '2s' }}
                >
                  <Download className="w-4 h-4 sm:w-6 sm:h-6" />
                  <span>📥 ¡Descargar mi Avatar!</span>
                </button>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border-2 sm:border-4 border-gradient-to-r from-blue-400 to-purple-400">
              <div className="mb-4 sm:mb-8">
                <h2 className="text-xl sm:text-3xl font-black text-blue-800 mb-3 sm:mb-6 flex items-center gap-2 sm:gap-4 animate-bounce" style={{ animationDuration: '2s' }}>
                  <Settings className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600 animate-spin" style={{ animation: 'spin 6s linear infinite' }} />
                  <span>🎨 PERSONALIZACIÓN 🎨</span>
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-10">
                {categories.map((category) => (
                  <button
                    key={category.categoria_id}
                    onClick={() => {
                      setActiveCategory(category.categoria_id);
                    }}
                    className={`group relative overflow-hidden flex flex-col items-center gap-1 sm:gap-3 p-3 sm:p-6 rounded-xl sm:rounded-2xl font-black transition-all duration-300 text-xs sm:text-base border-2 sm:border-4 hover:scale-105 sm:hover:scale-110 ${activeCategory === category.categoria_id
                      ? `bg-gradient-to-r ${categoryColors[category.categoria_id]} text-white shadow-2xl scale-105 sm:scale-110 border-white animate-pulse`
                      : `${categoryBgColors[category.categoria_id]} text-slate-700 hover:shadow-xl border-slate-300 hover:border-purple-400`
                      }`}
                    style={{ animationDuration: activeCategory === category.categoria_id ? '2s' : undefined }}
                  >
                    <div className={`text-2xl sm:text-4xl mb-1 sm:mb-2 transition-transform duration-300 ${activeCategory === category.categoria_id ? 'animate-bounce' : 'group-hover:scale-125 group-hover:animate-pulse'
                      }`} style={{ animationDuration: '1.5s' }}>
                      {category.emoji}
                    </div>
                    <span className="text-center leading-tight">{category.nombre_categoria}</span>

                    {activeCategory === category.categoria_id && (
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center animate-ping">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Options */}
              {currentOptions.length > 0 ? (
                <>
                  {/* Color pickers */}
                  {(activeCategory === 'AVC0001' || activeCategory === 'AVC0010') && (
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 sm:gap-4">
                      {currentOptions.map((option) => {
                        console.log("las opciones", option)
                        const isSelected = avatarOptions[activeCategory] === option.valor;
                        const isUnlocked = isOptionUnlocked(option.opcion_id);
                        const bgColor = option.valor === 'transparent' ? 'transparent' : `#${option.valor}`;
                        const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option.valor] || `Color ${option.valor}`;

                        return (
                          <button
                            key={option.opcion_id}
                            onClick={() => isUnlocked ? handleOptionChange(activeCategory, option.valor) : handleUnlockOption(option)}
                            className={`group relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 hover:scale-110 sm:hover:scale-125 hover:rotate-6 sm:hover:rotate-12 ${isSelected
                              ? 'border-white scale-110 sm:scale-125 shadow-2xl ring-4 sm:ring-8 ring-yellow-300 animate-pulse'
                              : 'border-slate-400 hover:border-white shadow-lg hover:shadow-2xl'
                              } ${option.valor === 'transparent' ? 'bg-white bg-opacity-70 border-dashed' : ''}`}
                            style={{
                              backgroundColor: bgColor,
                              animationDuration: isSelected ? '2s' : undefined
                            }}
                            title={friendlyName}
                            disabled={!isUnlocked && userCoins < option.costo}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-slate-300 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 shadow-lg group-hover:shadow-xl flex items-center justify-center">
                                {option.valor === 'none' ? (
                                  <span className="text-4xl">🚫</span>
                                ) : (
                                  <span className="text-4xl">{currentCategory?.emoji || '✨'}</span>
                                )}
                              </div>
                              <div className="text-center">
                                <div className={`text-xs sm:text-sm font-black rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-4 border-2 ${option.valor === 'none'
                                  ? 'text-red-600 bg-red-100 border-red-300'
                                  : isUnlocked
                                    ? 'text-purple-600 bg-purple-100 border-purple-300'
                                    : 'text-gray-600 bg-gray-100 border-gray-300'
                                  }`}>
                                  {option.valor === 'none' ? '🚫 Ninguno' : friendlyName}
                                </div>
                                {!isUnlocked && (
                                  <div className="mt-1 text-xs font-bold text-yellow-600 flex items-center justify-center gap-1">
                                    <span>{option.costo} monedas</span>
                                    <Lock className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Regular options */}
                  {!['AVC0001', 'AVC0010'].includes(activeCategory) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                      {currentOptions.map((option) => {
                        const isSelected = avatarOptions[activeCategory] === option.valor;
                        const isUnlocked = isOptionUnlocked(option.opcion_id);
                        const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option.valor] || option.valor;

                        return (
                          <button
                            key={option.opcion_id}
                            onClick={() => isUnlocked ? handleOptionChange(activeCategory, option.valor) : handleUnlockOption(option)}
                            className={`group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 text-left hover:scale-105 sm:hover:scale-110 hover:rotate-1 sm:hover:rotate-2 ${isSelected && isUnlocked
                              ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 shadow-2xl scale-105 sm:scale-110 ring-2 sm:ring-4 ring-yellow-300 animate-pulse'
                              : 'border-slate-300 bg-gradient-to-br from-white to-blue-50 text-slate-700 hover:border-purple-400 hover:shadow-xl'
                              }`}
                            style={{ animationDuration: isSelected ? '2s' : undefined }}
                            disabled={!isUnlocked && userCoins < option.costo}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-slate-300 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105 sm:group-hover:scale-110 shadow-lg group-hover:shadow-xl flex items-center justify-center">
                                {option.valor === 'none' ? (
                                  <span className="text-4xl">🚫</span>
                                ) : (
                                  <span className="text-4xl">{currentCategory?.emoji || '✨'}</span>
                                )}
                              </div>
                              <div className="text-center">
                                <div className={`text-xs sm:text-sm font-black rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-4 border-2 ${option.valor === 'none'
                                  ? 'text-red-600 bg-red-100 border-red-300'
                                  : isUnlocked
                                    ? 'text-purple-600 bg-purple-100 border-purple-300'
                                    : 'text-gray-600 bg-gray-100 border-gray-300'
                                  }`}>
                                  {option.valor === 'none' ? '🚫 Ninguno' : friendlyName}
                                </div>
                                {!isUnlocked && (
                                  <div className="mt-1 text-xs font-bold text-yellow-600 flex items-center justify-center gap-1">
                                    <span>{option.costo} monedas</span>
                                    <Lock className="w-3 h-3" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 sm:py-16">
                  <div className="text-4xl sm:text-8xl mb-3 sm:mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🎭</div>
                  <p className="text-slate-600 font-black text-lg sm:text-2xl mb-2 sm:mb-3">
                    ¡Ups! No hay opciones aquí
                  </p>
                  <p className="text-slate-500 font-bold text-sm sm:text-lg animate-pulse" style={{ animationDuration: '3s' }}>
                    🔄 Prueba con otra categoría
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
};

export default Page;

