"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, Plus, X } from "lucide-react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import Monedas from "@/components/molecules/Monedas"
import { useUser } from "@clerk/nextjs"
import StarRating from "@/components/molecules/StarRating"
import MetricDisplay from "@/components/molecules/MetricDisplay"

interface Activity {
  id: string
  title: string
  description: string
  type: "drag-drop" | "selection" | "matching"
  difficulty: "easy" | "medium" | "hard"
  completed: boolean
  actividad_id: string
}

interface FloatingElement {
  id: number
  x: number
  y: number
  symbol: string
  color: string
}

type ButtonVariant = "primary" | "ghost"
type ButtonSize = "sm" | "md"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ElementType
  className?: string
  children?: React.ReactNode
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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl focus:ring-green-400",
    ghost: "bg-transparent hover:bg-green-100 text-green-700 hover:text-green-800 focus:ring-green-400",
  }

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}

// Componente de Máquina de Escribir
const TypewriterAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const text = "¡Bienvenido al Módulo de SUMA! 🧮✨"

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        // Esperar 3 segundos después de terminar de escribir
        setTimeout(() => {
          onComplete()
        }, 3000)
      }
    }, 100) // Velocidad de escritura

    // Animación del cursor parpadeante
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [text, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center z-50"
    >
      <div className="text-center px-4">
        {/* Elementos decorativos animados */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.5, duration: 1, ease: "elastic.out" }}
        >
          <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center text-2xl font-bold text-green-800 animate-bounce">
            2
          </div>
          <motion.div
            className="flex items-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Plus className="w-8 h-8 text-green-600" />
          </motion.div>
          <div className="w-12 h-12 bg-emerald-300 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-800 animate-bounce delay-150">
            3
          </div>
          <motion.div
            className="flex items-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          >
            <span className="text-2xl text-green-600 font-bold">=</span>
          </motion.div>
          <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center text-2xl font-bold text-lime-800 animate-bounce delay-300">
            5
          </div>
        </motion.div>

        {/* Texto de la máquina de escribir */}
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
          {displayText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}>|</span>
        </div>

        {/* Elementos flotantes decorativos */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-green-200 rounded-full opacity-60 flex items-center justify-center text-green-800 font-bold"
            style={{
              left: `${10 + (i * 10)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {i % 2 === 0 ? '+' : (i % 3) + 1}
          </motion.div>
        ))}

        {/* Indicador de carga */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

const SumaPage: React.FC = () => {
  const router = useRouter()
  const [currentActivity, setCurrentActivity] = useState<number>(1)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedElements, setAnimatedElements] = useState<Set<number>>(new Set())
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [showVideo, setShowVideo] = useState(false)
  const [showTypewriter, setShowTypewriter] = useState(true)
  const { user } = useUser()

  // Referencias para animaciones GSAP
  const headerRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const activitiesRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const funFactRef = useRef<HTMLDivElement>(null)

  // Función para completar la animación de typewriter
  const handleTypewriterComplete = () => {
    setShowTypewriter(false)
  }

  // Efecto de entrada progresiva con GSAP
  useEffect(() => {
    if (!showTypewriter) {
      // Crear elementos flotantes - menos en móvil
      const elementsCount = window.innerWidth < 768 ? 6 : 12
      const elements = Array.from({ length: elementsCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        symbol: i % 3 === 0 ? "+" : i % 3 === 1 ? `${Math.floor(Math.random() * 9) + 1}` : "=",
        color: ["bg-green-200", "bg-emerald-200", "bg-lime-200", "bg-teal-200"][Math.floor(Math.random() * 4)],
      }))
      setFloatingElements(elements)

      // Timeline principal de GSAP
      const tl = gsap.timeline()

      // Animación del header
      if (headerRef.current) {
        tl.fromTo(headerRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
      }

      // Animación de la sección de video
      if (videoSectionRef.current) {
        tl.fromTo(
          videoSectionRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.3",
        )
      }

      // Animación de las actividades
      if (activitiesRef.current) {
        const activityCards = activitiesRef.current.children
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
          "-=0.2",
        )
      }

      // Animación de elementos flotantes
      if (floatingElementsRef.current) {
        const floatingEls = floatingElementsRef.current.children
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
          },
        )

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
        })
      }

      setIsVisible(true)

      // Animaciones de hover para las actividades
      activities.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedElements((prev) => new Set([...prev, index]))
        }, index * 200)
      })
    }
  }, [showTypewriter])

  const activities: Activity[] = [
    {
      id: "sumandoEstrellas",
      title: "Sumando Estrellas",
      description: "Elige la estrella con el resultado correcto",
      type: "selection",
      difficulty: "easy",
      completed: false,
      actividad_id: "ACT0007",
    },
    {
      id: "carreraNumeros",
      title: "Carrera de Números",
      description: "Resuelve sumas para avanzar en la carrera",
      type: "matching",
      difficulty: "medium",
      completed: false,
      actividad_id: "ACT0008",
    },
    {
      id: "dragDropNumerico",
      title: "Arrastra y suelta los números",
      description: "Completa sumas arrastrando los números correctos",
      type: "drag-drop",
      difficulty: "hard",
      completed: false,
      actividad_id: "ACT0009",
    },
  ]

  const handleBack = () => {
    router.push("/dashboard")
  }

  // CORREGIR LA NAVEGACIÓN - usar window.location.href para forzar navegación completa
  const handleActivityStart = (activityId: string) => {
    // Limpiar cualquier estado previo y forzar navegación completa
    window.location.href = `/modules/suma/${activityId}`
  }

  const handleVideoPlay = () => {
    setShowVideo(true)
    // Animación de entrada del modal de video
    gsap.fromTo(
      ".video-modal",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
    )
  }

  const handleCloseVideo = () => {
    // Animación de salida del modal de video
    gsap.to(".video-modal", {
      scale: 0.5,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setShowVideo(false),
    })
  }

  const completedActivities = activities.filter((activity) => activity.completed).length
  const progressPercentage = (completedActivities / activities.length) * 100

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "FÁCIL"
      case "medium":
        return "MEDIO"
      case "hard":
        return "DIFÍCIL"
      default:
        return difficulty.toUpperCase()
    }
  }

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 group-hover:bg-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 group-hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 group-hover:bg-gray-200"
    }
  }

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case "drag-drop":
        return (
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              3
            </div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              2
            </div>
          </div>
        )
      case "selection":
        return (
          <div className="flex gap-1 sm:gap-2 items-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              1
            </div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-500" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              1
            </div>
          </div>
        )
      case "matching":
        return (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-lime-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              5
            </div>
            <Plus className="w-2 h-2 sm:w-3 sm:h-3 text-lime-500" />
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-lime-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              5
            </div>
          </div>
        )
      default:
        return <Plus className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500" />
    }
  }

  return (
    <>
      {/* Animación de Máquina de Escribir */}
      <AnimatePresence>
        {showTypewriter && (
          <TypewriterAnimation onComplete={handleTypewriterComplete} />
        )}
      </AnimatePresence>

      {/* Contenido Principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTypewriter ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden"
      >
        {/* Elementos flotantes de fondo */}
        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none hidden xs:block">
          {floatingElements.map((item) => (
            <div
              key={item.id}
              className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${item.color} rounded-full opacity-20 flex items-center justify-center text-green-800 font-bold text-xs sm:text-sm`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.symbol}
            </div>
          ))}
        </div>

        {/* Burbujas de símbolos matemáticos - reducidas en móvil */}
        <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-green-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-xl sm:text-4xl font-bold text-green-600">
          +
        </div>
        <div className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-2xl font-bold text-emerald-600">
          2+3
        </div>
        <div className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-lime-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-3xl font-bold text-lime-600">
          =5
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
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer flex-shrink-0">
                    <img
                      src="/images/icons/suma.png"
                      alt="Ícono de suma"
                      className="w-full h-full object-contain animate-bounce"
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-sm sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate">
                      SUMA
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">Aprende a sumar números</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <MetricDisplay />
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
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-green-400 hover:shadow-xl transition-all duration-500 group">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 group-hover:scale-105 transition-transform duration-300">
                  VIDEO EXPLICATIVO
                </h2>
                <p className="text-sm sm:text-base text-gray-600">Descubre lo divertido que es sumar</p>
              </div>

              <div
                className="relative bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-green-400 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[300px] cursor-pointer group hover:from-green-200 hover:to-emerald-200 transition-all duration-300 hover:scale-[1.02]"
                onClick={handleVideoPlay}
              >
                <div className="absolute inset-2 sm:inset-4 border-2 border-dashed border-gray-400 rounded-xl sm:rounded-2xl group-hover:border-gray-600 transition-colors duration-300"></div>

                {/* Elementos visuales de suma en el video */}
                <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2 items-center">
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-green-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-green-800">
                    <span className="hidden sm:inline">2</span>
                  </div>
                  <Plus className="w-2 h-2 sm:w-4 sm:h-4 text-green-600 animate-pulse" />
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-emerald-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-emerald-800">
                    <span className="hidden sm:inline">3</span>
                  </div>
                </div>

                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex gap-1 sm:gap-2 items-center">
                  <span className="text-xs sm:text-base text-green-600 font-bold animate-pulse">=</span>
                  <div className="w-3 h-3 sm:w-6 sm:h-6 bg-lime-300 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-lime-800">
                    <span className="hidden sm:inline">5</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 ml-1 group-hover:text-green-600 transition-colors duration-300" />
                  </div>

                  <h3 className="text-base sm:text-xl font-bold text-gray-800 text-center group-hover:text-green-800 transition-colors duration-300 px-2">
                    ¿Cómo sumar fácilmente?
                  </h3>
                </div>

                {/* Representación visual de suma con grupos */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-4 items-center">
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-2 h-2 sm:w-6 sm:h-6 bg-white/50 rounded-full text-xs font-bold text-green-700"
                    >
                      <span className="hidden sm:inline">●</span>
                      <span className="sm:hidden text-xs">•</span>
                    </div>
                  ))}
                  <Plus className="w-2 h-2 sm:w-4 sm:h-4 text-green-600" />
                  {[1, 2].map((num) => (
                    <div
                      key={num}
                      className="flex items-center justify-center w-2 h-2 sm:w-6 sm:h-6 bg-white/50 rounded-full text-xs font-bold text-green-700"
                    >
                      <span className="hidden sm:inline">●</span>
                      <span className="sm:hidden text-xs">•</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activities Grid */}
          <div ref={activitiesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 hover:rotate-1 group relative overflow-hidden opacity-0"
              >
                {/* Elementos decorativos relacionados con suma */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">+</span>
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">1</span>
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-lime-400 rounded-full animate-ping flex items-center justify-center text-xs font-bold text-white">
                    <span className="hidden sm:inline">2</span>
                  </div>
                </div>

                {/* Icono del tipo de actividad */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {renderActivityIcon(activity.type)}
                </div>

                <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full group-hover:bg-green-200 transition-colors duration-300 w-fit">
                        ACTIVIDAD {index + 1}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full transition-all duration-300 w-fit ${getDifficultyStyles(activity.difficulty)}`}
                      >
                        {getDifficultyText(activity.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 group-hover:text-green-800 transition-colors duration-300 break-words">
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
                      activityLocation={window.location.pathname.split("/").pop() as string}
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

          {/* Fun Fact Section */}
          <div
            ref={funFactRef}
            className="mt-6 sm:mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100 opacity-0"
          >
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-green-800 mb-2 flex items-center justify-center gap-2 break-words">
                🧠 ¿Sabías qué?
              </h3>
              <p className="text-sm sm:text-base text-green-700 break-words">
                Sumar es como juntar cosas: si tienes 2 manzanas y tu amigo te da 3 más, ¡ahora tienes 5 manzanas! La suma
                está en todas partes de tu vida diaria.
              </p>
            </div>
          </div>
        </div>

        {/* Modal de Video de YouTube */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="video-modal bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">La Suma para Niños - Aprende a Sumar</h3>
                <Button onClick={handleCloseVideo} variant="ghost" size="sm" icon={X} className="hover:bg-gray-100" />
              </div>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/oexd_Dfic_Q?autoplay=1&rel=0"
                  title="La Suma para Niños"
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
  )
}

export default SumaPage