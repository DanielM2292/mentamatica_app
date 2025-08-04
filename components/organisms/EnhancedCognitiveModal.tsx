import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { Brain, Volume2, Play, Pause, X, Sparkles, Heart, Star } from "lucide-react";

interface CognitiveAudio {
  id: string;
  title: string;
  description: string;
  category: 'motivacion' | 'concentracion' | 'relajacion' | 'celebracion' | 'resolucion' | 'recuperacion' | 'energia' | 'confianza';
  duration: string;
  audioUrl: string;
  neuroscience_principle: string;
  color: string;
  icon: string;
}

interface EnhancedCognitiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAudio: string | null;
  isPlaying: boolean;
  onPlayAudio: (audioId: string) => void;
  onStopAudio: () => void;
  isMobile: boolean;
  isSmallMobile: boolean;
}

const enhancedCognitiveAudios: CognitiveAudio[] = [
  {
    id: "welcome-motivation",
    title: "¡Hola pequeño genio!",
    description: "Audio de bienvenida que activa la motivación intrínseca y la dopamina",
    category: "motivacion",
    duration: "30s",
    audioUrl: "/audios/welcome-motivation.mp3",
    neuroscience_principle: "Activación del sistema de recompensa cerebral",
    color: "from-yellow-400 to-orange-500",
    icon: "🌟"
  },
  {
    id: "focus-breathing",
    title: "Respiración para el súper cerebro",
    description: "Técnica de respiración que mejora la atención sostenida y reduce cortisol",
    category: "concentracion",
    duration: "45s",
    audioUrl: "/audios/focus-breathing.mp3",
    neuroscience_principle: "Activación del sistema nervioso parasimpático",
    color: "from-blue-400 to-indigo-500",
    icon: "🧘‍♀️"
  },
  {
    id: "success-celebration",
    title: "¡Eres un campeón!",
    description: "Celebración que refuerza el aprendizaje mediante dopamina y serotonina",
    category: "celebracion",
    duration: "20s",
    audioUrl: "/audios/success-celebration.mp3",
    neuroscience_principle: "Consolidación de memoria a largo plazo",
    color: "from-green-400 to-emerald-500",
    icon: "🏆"
  },
  {
    id: "calm-transition",
    title: "Jardín de conocimiento",
    description: "Audio de transición que facilita la consolidación de memoria",
    category: "relajacion",
    duration: "60s",
    audioUrl: "/audios/calm-transition.mp3",
    neuroscience_principle: "Facilita la neuroplasticidad durante el descanso",
    color: "from-purple-400 to-pink-500",
    icon: "🌸"
  },
  {
    id: "problem-solving-boost",
    title: "Detective matemático",
    description: "Prepara la mente para resolver problemas complejos",
    category: "resolucion",
    duration: "35s",
    audioUrl: "/audios/problem-solving-boost.mp3",
    neuroscience_principle: "Activación de la corteza prefrontal",
    color: "from-cyan-400 to-blue-500",
    icon: "🔍"
  },
  {
    id: "error-recovery",
    title: "Los errores son maestros",
    description: "Ayuda a procesar errores de manera positiva y constructiva",
    category: "recuperacion",
    duration: "40s",
    audioUrl: "/audios/error-recovery.mp3",
    neuroscience_principle: "Reduce activación de amígdala, promueve resiliencia",
    color: "from-rose-400 to-red-500",
    icon: "💪"
  },
  {
    id: "pre-game-energy",
    title: "¡Hora de jugar!",
    description: "Energiza y motiva antes de comenzar actividades",
    category: "energia",
    duration: "25s",
    audioUrl: "/audios/pre-game-energy.mp3",
    neuroscience_principle: "Activa motivación intrínseca y reduce ansiedad",
    color: "from-amber-400 to-yellow-500",
    icon: "⚡"
  },
  {
    id: "concentration-boost",
    title: "Súper concentración",
    description: "Mejora el enfoque y la atención selectiva",
    category: "concentracion",
    duration: "40s",
    audioUrl: "/audios/concentration-boost.mp3",
    neuroscience_principle: "Mejora atención selectiva, activa corteza prefrontal",
    color: "from-indigo-400 to-purple-500",
    icon: "🎯"
  },
  {
    id: "math-confidence",
    title: "Matemáticas divertidas",
    description: "Reduce la ansiedad matemática y aumenta la confianza",
    category: "confianza",
    duration: "35s",
    audioUrl: "/audios/math-confidence.mp3",
    neuroscience_principle: "Reduce ansiedad matemática, mejora autoeficacia",
    color: "from-teal-400 to-cyan-500",
    icon: "🧮"
  },
  {
    id: "end-session-positive",
    title: "¡Sesión fantástica!",
    description: "Cierre positivo que consolida el aprendizaje",
    category: "celebracion",
    duration: "30s",
    audioUrl: "/audios/end-session-positive.mp3",
    neuroscience_principle: "Consolida aprendizaje, refuerza motivación futura",
    color: "from-emerald-400 to-green-500",
    icon: "🎉"
  }
];

export default function EnhancedCognitiveModal({
  isOpen,
  onClose,
  currentAudio,
  isPlaying,
  onPlayAudio,
  onStopAudio,
  isMobile,
  isSmallMobile
}: EnhancedCognitiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const audioItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalReady, setIsModalReady] = useState(false);
  const [activeAnimations, setActiveAnimations] = useState<Set<string>>(new Set());
  const [hasInitialized, setHasInitialized] = useState(false);

  // Timeline principal para controlar todas las animaciones
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const pulseAnimationsRef = useRef<Map<string, gsap.core.Tween>>(new Map());

  // Limpiar animaciones previas
  const cleanupAnimations = useCallback(() => {
    if (mainTimelineRef.current) {
      mainTimelineRef.current.kill();
    }

    pulseAnimationsRef.current.forEach((tween) => {
      tween.kill();
    });
    pulseAnimationsRef.current.clear();

    gsap.killTweensOf([
      modalRef.current,
      overlayRef.current,
      contentRef.current,
      headerRef.current,
      ...audioItemsRef.current.filter(Boolean),
      ...floatingElementsRef.current.filter(Boolean)
    ]);

    setActiveAnimations(new Set());
  }, []);

  // Crear efecto de partículas optimizado
  const createParticleEffect = useCallback(() => {
    if (!contentRef.current || !isModalReady) return;

    const container = contentRef.current;
    const particleCount = isMobile ? 8 : 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1.5 h-1.5 rounded-full pointer-events-none z-10';
      particle.style.background = `hsl(${Math.random() * 60 + 280}, 70%, 60%)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      container.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        opacity: 0,
        scale: 0,
        duration: 1.5 + Math.random() * 1.5,
        ease: "power2.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }
      });
    }
  }, [isModalReady, isMobile]);

  // Animación de apertura optimizada
  const openModal = useCallback(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current || isAnimating) return;

    cleanupAnimations();
    setIsAnimating(true);

    // Crear nueva timeline principal
    mainTimelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setIsModalReady(true);
        createParticleEffect();
      }
    });

    const tl = mainTimelineRef.current;

    // Configuración inicial
    gsap.set(modalRef.current, { display: "flex" });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(contentRef.current, {
      scale: 0.85,
      opacity: 0,
      y: 30,
      rotationX: -10
    });

    // Animación fluida del overlay
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    // Animación del contenido con efecto suave
    tl.to(contentRef.current, {
      scale: 1,
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

    // Animación escalonada del header
    if (headerRef.current) {
      const headerElements = headerRef.current.querySelectorAll('*');
      tl.fromTo(headerElements,
        {
          y: -15,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, "-=0.3"
      );
    }

    // Animación suave de elementos de audio
    audioItemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(item,
          {
            x: -20,
            opacity: 0,
            scale: 0.95
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          }, `-=${0.4 - index * 0.03}`
        );
      }
    });

    // Animación de elementos flotantes
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        tl.fromTo(element,
          {
            scale: 0,
            opacity: 0,
            rotation: -90
          },
          {
            scale: 1,
            opacity: 0.6,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
          }, `-=${0.3 - index * 0.1}`
        );

        // Animación flotante continua suave
        gsap.to(element, {
          y: "-8px",
          duration: 2.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, [isAnimating, cleanupAnimations, createParticleEffect]);

  // Animación de cierre optimizada
  const closeModal = useCallback(() => {
    if (!modalRef.current || !overlayRef.current || !contentRef.current || isAnimating) return;

    cleanupAnimations();
    setIsAnimating(true);
    setIsModalReady(false);

    mainTimelineRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set(modalRef.current, { display: "none" });
        setIsAnimating(false);
        onClose();
      }
    });

    const tl = mainTimelineRef.current;

    // Animación de salida suave
    tl.to(audioItemsRef.current.filter(Boolean), {
      x: 15,
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      stagger: 0.02,
      ease: "power2.in"
    });

    tl.to(contentRef.current, {
      scale: 0.85,
      opacity: 0,
      y: -20,
      rotationX: 10,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.1");

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  }, [isAnimating, onClose, cleanupAnimations]);

  // Manejo optimizado de hover
  const handleAudioHover = useCallback((index: number, isHovering: boolean) => {
    if (!isModalReady || isAnimating || isMobile) return;

    const item = audioItemsRef.current[index];
    if (!item) return;

    const animationId = `hover-${index}`;

    if (activeAnimations.has(animationId)) {
      gsap.killTweensOf(item);
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete(animationId);
        return newSet;
      });
    }

    setActiveAnimations(prev => new Set(prev).add(animationId));

    gsap.to(item, {
      scale: isHovering ? 1.02 : 1,
      y: isHovering ? -3 : 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setActiveAnimations(prev => {
          const newSet = new Set(prev);
          newSet.delete(animationId);
          return newSet;
        });
      }
    });
  }, [isModalReady, isAnimating, isMobile, activeAnimations]);

  // Manejo optimizado de click con funcionalidad de audio completa
  const handleAudioClick = useCallback((audioId: string, index: number) => {
    if (isAnimating) return;

    const item = audioItemsRef.current[index];
    if (!item) return;

    // Efecto de click suave
    gsap.to(item, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      }
    });

    // Efecto de ondas optimizado
    const ripple = document.createElement('div');
    ripple.className = 'absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 pointer-events-none';
    item.appendChild(ripple);

    gsap.fromTo(ripple,
      { scale: 0, opacity: 0.4 },
      {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }
      }
    );

    // Lógica de audio - FUNCIONALIDAD COMPLETA RESTAURADA
    if (currentAudio === audioId && isPlaying) {
      onStopAudio();
    } else {
      onPlayAudio(audioId);
    }
  }, [isAnimating, currentAudio, isPlaying, onPlayAudio, onStopAudio]);

  // Efecto de pulsación para audio activo optimizado
  const updatePulseAnimation = useCallback(() => {
    if (!isModalReady) return;

    audioItemsRef.current.forEach((item, index) => {
      if (!item) return;

      const audio = enhancedCognitiveAudios[index];
      const pulseKey = `pulse-${audio.id}`;

      // Limpiar animación anterior si existe
      if (pulseAnimationsRef.current.has(pulseKey)) {
        pulseAnimationsRef.current.get(pulseKey)?.kill();
        pulseAnimationsRef.current.delete(pulseKey);
      }

      if (audio && currentAudio === audio.id && isPlaying) {
        // Crear nueva animación de pulsación suave
        const pulseAnimation = gsap.to(item, {
          scale: 1.03,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        pulseAnimationsRef.current.set(pulseKey, pulseAnimation);
      } else {
        // Restaurar escala normal
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }, [currentAudio, isPlaying, isModalReady]);

  // Efectos de apertura y cierre - ARREGLADO PARA EVITAR REINICIO EN SCROLL
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      openModal();
      setHasInitialized(true);
    } else if (!isOpen && hasInitialized) {
      closeModal();
      setHasInitialized(false);
    }
  }, [isOpen, hasInitialized, openModal, closeModal]);

  // Actualizar animaciones de pulsación cuando cambia el audio
  useEffect(() => {
    updatePulseAnimation();
  }, [updatePulseAnimation]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      cleanupAnimations();
      setHasInitialized(false);
    };
  }, [cleanupAnimations]);

  // Memoización de la estructura del modal
  const modalContent = useMemo(() => (
    <div className="space-y-4">
      {enhancedCognitiveAudios.map((audio, index) => (
        <div
          key={audio.id}
          className={`relative rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${currentAudio === audio.id
              ? 'border-purple-300 bg-purple-50 shadow-lg'
              : 'border-gray-200 bg-white hover:bg-gray-50 shadow-md'
            }`}
          onMouseEnter={() => handleAudioHover(index, true)}
          onMouseLeave={() => handleAudioHover(index, false)}
          onClick={() => handleAudioClick(audio.id, index)}
        >
          {/* Gradiente de categoría */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${audio.color}`}></div>

          <div className={`${isSmallMobile ? 'p-3' : 'p-4'} relative z-10`}>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{audio.icon}</span>
                  <h3 className={`${isSmallMobile ? 'text-sm' : 'text-base'} font-semibold text-gray-800`}>
                    {audio.title}
                  </h3>
                </div>
                <p className={`${isSmallMobile ? 'text-xs' : 'text-sm'} text-gray-600 mb-3 line-clamp-2`}>
                  {audio.description}
                </p>
                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                    {audio.duration}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium capitalize">
                    {audio.category}
                  </span>
                </div>
                <p className={`${isSmallMobile ? 'text-xs' : 'text-sm'} text-purple-600 font-medium`}>
                  💡 {audio.neuroscience_principle}
                </p>
              </div>

              <button
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentAudio === audio.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}
              >
                {currentAudio === audio.id && isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  ), [currentAudio, isPlaying, isSmallMobile, handleAudioHover, handleAudioClick]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className={`relative bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden ${isSmallMobile
            ? 'w-full h-[90vh] max-w-sm'
            : isMobile
              ? 'w-full h-[85vh] max-w-md'
              : 'w-full max-w-2xl max-h-[85vh]'
          }`}
      >
        {/* Elementos flotantes decorativos */}
        <div
          className="absolute top-4 right-4 text-2xl opacity-60 pointer-events-none z-10"
        >
          🧠
        </div>
        <div
          className="absolute top-8 left-8 text-xl opacity-60 pointer-events-none z-10"
        >
          ✨
        </div>
        <div
          className="absolute bottom-8 right-8 text-lg opacity-60 pointer-events-none z-10"
        >
          🌟
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className={`${isSmallMobile ? 'p-4' : 'p-6'} bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/20 to-pink-700/20 animate-pulse"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`${isSmallMobile ? 'text-lg' : 'text-xl'} font-bold`}>
                  Estimulación Cognitiva
                </h2>
                <p className={`${isSmallMobile ? 'text-sm' : 'text-base'} opacity-90`}>
                  Audios basados en neurociencia
                </p>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio List */}
        <div className={`${isSmallMobile ? 'p-4' : 'p-6'} overflow-y-auto ${isSmallMobile ? 'max-h-[calc(90vh-120px)]' : 'max-h-[calc(85vh-120px)]'}`}>
          {modalContent}

          {/* Información adicional */}
          <div className={`${isSmallMobile ? 'mt-4 p-3' : 'mt-6 p-4'} bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50`}>
            <h4 className={`${isSmallMobile ? 'text-sm' : 'text-base'} font-semibold text-blue-800 mb-2 flex items-center gap-2`}>
              <Sparkles className="w-4 h-4" />
              Beneficios Neurocientíficos
            </h4>
            <ul className={`${isSmallMobile ? 'text-xs' : 'text-sm'} text-blue-700 space-y-1`}>
              <li>• Mejora la neuroplasticidad y formación de nuevas conexiones</li>
              <li>• Reduce el estrés y mejora la concentración</li>
              <li>• Activa sistemas de recompensa para motivación intrínseca</li>
              <li>• Facilita la consolidación de memoria a largo plazo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}