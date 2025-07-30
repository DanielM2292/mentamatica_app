"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Star, Circle, X } from "lucide-react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Monedas from "@/components/molecules/Monedas";
import { useUser } from "@clerk/nextjs";
import StarRating from "@/components/molecules/StarRating";
import PromedioStars from "@/components/molecules/PromedioStars";

interface Activity {
  id: number;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching" | "navigation";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  actividad_id: string;
}

interface FloatingNumber {
  id: number;
  x: number;
  y: number;
  number: number;
  color: string;
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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl focus:ring-blue-400",
    ghost:
      "bg-transparent hover:bg-blue-100 text-blue-700 hover:text-blue-800 focus:ring-blue-400",
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

// Componente de animación de máquina de escribir
const TypewriterAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "¡Bienvenido al Módulo de NUMERACIÓN! 🔢✨";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100); // Velocidad de escritura
      
      return () => clearTimeout(timer);
    } else {
      // Cuando termina de escribir, espera 3 segundos
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText, onComplete]);

  // Animación del cursor parpadeante
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center z-50"
    >
      {/* Números flotantes de fondo */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 font-bold select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 20}px`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {Math.floor(Math.random() * 10) + 1}
        </motion.div>
      ))}

      <div className="text-center px-4">
        {/* Icono animado */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <motion.img
              src="/images/icons/numeracion.png"
              alt="Numeración"
              className="w-16 h-16 sm:w-20 sm:h-20"
              animate={{ 
                bounce: [0, -10, 0],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>

        {/* Texto de máquina de escribir */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {displayText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
              |
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-lg sm:text-xl text-white/90"
          >
            Donde los números cobran vida ✨
          </motion.p>

          {/* Barra de progreso */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: currentIndex / fullText.length }}
            className="mt-6 h-2 bg-white/30 rounded-full overflow-hidden"
          >
            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Números decorativos que aparecen gradualmente */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: currentIndex > i * 3 ? [0.3, 0.6, 0.3] : 0,
                scale: currentIndex > i * 3 ? [1, 1.2, 1] : 0,
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.2 
              }}
              className="absolute text-white/40 font-bold text-4xl sm:text-6xl select-none"
              style={{
                left: `${10 + (i % 5) * 20}%`,
                top: `${20 + Math.floor(i / 5) * 60}%`,
              }}
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const NumeracionPage: React.FC = () => {
  const router = useRouter();
  const [currentActivity, setCurrentActivity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(
    new Set()
  );
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const { user } = useUser();

  // Referencias para animaciones GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const funFactRef = useRef<HTMLDivElement>(null);

  // Función que se ejecuta cuando termina la animación de máquina de escribir
  const handleTypewriterComplete = () => {
    setShowTypewriter(false);
    // Iniciar las animaciones GSAP después de que desaparezca el typewriter
    setTimeout(() => {
      initializeAnimations();
    }, 300);
  };

  // Efecto de entrada progresiva con GSAP
  const initializeAnimations = () => {
    // Crear números flotantes - menos en móvil
    const numbersCount = window.innerWidth < 768 ? 6 : 12;
    const numbers = Array.from({ length: numbersCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      number: i + 1,
      color: ["bg-blue-200", "bg-indigo-200", "bg-cyan-200", "bg-sky-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingNumbers(numbers);

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
  };

  const activities: Activity[] = [
    {
      id: 1,
      title: "El Número Correcto",
      description: "Explota globos en orden ascendente.",
      type: "drag-drop",
      difficulty: "easy",
      completed: false,
      actividad_id: "ACT0004",
    },
    {
      id: 2,
      title: "Forma el Número Gigante",
      description:
        "Construye números de 4-5 cifras usando el valor posicional.",
      type: "matching",
      difficulty: "medium",
      completed: false,
      actividad_id: "ACT0005",
    },
    {
      id: 3,
      title: "Contador Espacial",
      description: "Avanza en un mapa sumando/restando decenas.",
      type: "navigation",
      difficulty: "medium",
      completed: false,
      actividad_id: "ACT0006",
    },
  ];

  const handleBack = () => {
    router.push("/dashboard");
  };

  const handleActivityStart = (activityId: number) => {
    console.log(`Intentando navegar a actividad ${activityId}`);

    if (activityId === 1) {
      console.log("Navegando a NumeroCorrecto");
      router.push("/modules/numeracion/NumeroCorrecto");
    } else if (activityId === 2) {
      console.log("Navegando a FormaNumeroGigante");
      router.push("/modules/numeracion/FormaNumeroGigante");
    } else if (activityId === 3) {
      console.log("Navegando a ContadorEspacial");
      router.push("/modules/numeracion/ContadorEspacial");
    } else {
      console.log("Navegando a actividad genérica");
      router.push(`/numeracion/actividad/${activityId}`);
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

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "drag-drop":
        return (
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              5
            </div>
            <div className="w-0.5 h-3 sm:h-4 bg-blue-500"></div>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-1 h-1 bg-blue-500 rounded-full"></div>
              ))}
            </div>
          </div>
        );
      case "selection":
        return (
          <div className="flex gap-1 sm:gap-2">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
              >
                {num}
              </div>
            ))}
          </div>
        );
      case "matching":
        return (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </div>
            <div className="w-3 h-0.5 sm:w-4 bg-purple-500"></div>
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-purple-500 rounded-full"
                ></div>
              ))}
            </div>
          </div>
        );
      case "navigation":
        return (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              🚀
            </div>
            <div className="w-6 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full"></div>
          </div>
        );
      default:
        return <Circle className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Animación de máquina de escribir */}
      <AnimatePresence>
        {showTypewriter && (
          <TypewriterAnimation onComplete={handleTypewriterComplete} />
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTypewriter ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Elementos flotantes de fondo */}
        <div
          ref={floatingElementsRef}
          className="absolute inset-0 pointer-events-none hidden xs:block"
        >
          {floatingNumbers.map((item) => (
            <div
              key={item.id}
              className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${item.color} rounded-full opacity-20 flex items-center justify-center text-blue-800 font-bold text-xs sm:text-sm`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.number}
            </div>
          ))}
        </div>

        {/* Burbujas de números animados - reducidas en móvil */}
        <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-blue-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-xl sm:text-4xl font-bold text-blue-600">
          1
        </div>
        <div className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-2xl font-bold text-indigo-600">
          5
        </div>
        <div className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-cyan-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-3xl font-bold text-cyan-600">
          10
        </div>

        {/* Header */}
        <div
          ref={headerRef}
          className="bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10 opacity-0"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer flex-shrink-0">
                    <img
                      src="/images/icons/numeracion.png"
                      alt="Ícono de numeración"
                      className="w-full h-full object-contain animate-bounce"
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-sm sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent truncate">
                      NUMERACIÓN
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      Aprende a contar y los números
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <PromedioStars />
                {user && <Monedas userId={user.id} isVisible={true} />}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 relative z-10">
          {/* Video Section */}
          <div ref={videoSectionRef} className="mb-6 sm:mb-8 opacity-0">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <Button
                onClick={handleBack}
                variant="ghost"
                size="sm"
                icon={ArrowLeft}
                className="hover:scale-105 transition-transform duration-200"
              >
                <span className="hidden sm:inline">Volver</span>
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-blue-400 hover:shadow-xl transition-all duration-500 group">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                  VIDEO EXPLICATIVO
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Aprende qué son los números antes de comenzar
                </p>
              </div>

              <div
                className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-blue-400 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] cursor-pointer group hover:from-blue-200 hover:to-indigo-200 transition-all duration-300 hover:scale-[1.02]"
                onClick={handleVideoPlay}
              >
                <div className="absolute inset-2 sm:inset-4 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

                {/* Elementos visuales de números en el video */}
                <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-blue-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-blue-800">
                    <span className="hidden sm:inline">1</span>
                  </div>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-indigo-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-indigo-800">
                    <span className="hidden sm:inline">2</span>
                  </div>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-cyan-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-cyan-800">
                    <span className="hidden sm:inline">3</span>
                  </div>
                </div>

                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-sky-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-sky-800">
                    <span className="hidden sm:inline">4</span>
                  </div>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-blue-400 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-blue-900">
                    <span className="hidden sm:inline">5</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-blue-800 transition-colors duration-300 px-2">
                    ¿Cómo contar del 1 al 10?
                  </h3>
                </div>

                {/* Representación visual de números */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-2 h-2 sm:w-6 sm:h-6 bg-white/50 rounded-full text-xs font-bold text-blue-700"
                    >
                      <span className="hidden sm:inline">{num}</span>
                      <span className="sm:hidden text-xs">•</span>
                    </div>
                  ))}
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
                {/* Elementos decorativos relacionados con numeración */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">1</span>
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-indigo-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">2</span>
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">3</span>
                  </div>
                </div>

                {/* Icono del tipo de actividad */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {renderActivityIcon(activity.type)}
                </div>

                <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-blue-200 transition-colors duration-300 w-fit">
                        ACTIVIDAD {activity.id}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full transition-all duration-300 w-fit ${getDifficultyStyles(activity.difficulty)}`}
                      >
                        {getDifficultyText(activity.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-800 transition-colors duration-300 break-words">
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
                      activityLocation={
                        window.location.pathname.split("/").pop() as string
                      }
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
              Tu Progreso en Numeración
            </h3>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 sm:h-3 rounded-full transition-all duration-500"
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
            className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 opacity-0"
          >
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2 flex items-center justify-center gap-2 break-words">
                🧠 ¿Sabías qué?
              </h3>
              <p className="text-sm sm:text-base text-blue-700 break-words">
                Los números están en todas partes: tu edad, los dedos de tus
                manos, las horas del día... ¡Aprender a contar te ayuda a entender
                el mundo!
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
                  Los Números del 1 al 10 - Aprende a Contar
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
                  src="https://www.youtube.com/embed/eC6-OOfx1tQ?autoplay=1&rel=0"
                  title="Los Números del 1 al 10"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default NumeracionPage;