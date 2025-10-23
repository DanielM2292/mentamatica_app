"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Download, User, Users } from "lucide-react"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"

export default function Page() {
  const [email, setEmail] = useState("")
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser()

  console.log("Estado actual:", {
    isLoaded,
    isSignedIn,
    userId: user?.id,
  });
  useEffect(() => {
    if (isSignedIn && user) {
      console.log("Usuario autenticado detectado, enviando datos...");
      router.push("/dashboard");
    }
  }, [isSignedIn, user])

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      alert(`¡Gracias por suscribirte con ${email}! Te enviaremos más información pronto.`)
      setEmail("")
    } else {
      alert("Por favor ingresa un correo electrónico válido.")
    }
  }

  const modules = [
    {
      name: "CONJUNTOS",
      icon: "/images/icons/conjuntos.png",
      description: "Agrupa elementos",
    },
    {
      name: "NUMERACIÓN",
      icon: "/images/icons/numeracion.png",
      description: "Aprende números",
    },
    {
      name: "SUMA",
      icon: "/images/icons/suma.png",
      description: "Suma fácil",
    },
    {
      name: "RESTA",
      icon: "/images/icons/resta.png",
      description: "Resta simple",
    },
    {
      name: "MULTIPLICACIÓN",
      icon: "/images/icons/multiplicacion.png",
      description: "Multiplica",
    },
    {
      name: "DIVISIÓN",
      icon: "/images/icons/division.png",
      description: "Divide y reparte",
    },
    {
      name: "GEOMETRÍA",
      icon: "/images/icons/geometria.png",
      description: "Formas divertidas",
    },
  ]

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/manuales/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E1" }}>
      {/* Header - Responsive */}
      <header className="flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="MentaMática Logo"
              width={40}
              height={40}
              className="object-contain sm:w-[50px] sm:h-[50px]"
            />
          </div>
          {/* Título solo visible en pantallas medianas y grandes */}
          <h1 className="hidden sm:block text-xl sm:text-2xl font-bold" style={{ color: "#2C3E50" }}>
            MentaMática
          </h1>
        </div>

        <SignedOut>
          <SignInButton
            mode="modal"
            afterSignInUrl="/"
            afterSignUpUrl="/"
          >
            <div className="flex justify-center">
              <Button
                className="font-bold px-3 py-2 sm:px-6 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm"
                style={{
                  backgroundColor: "#F7DC6F",
                  color: "#2C3E50",
                  border: "2px solid #F4D03F",
                }}
              >
                <span className="hidden sm:inline">INICIAR SESIÓN</span>
                <span className="sm:hidden">ENTRAR</span>
              </Button>
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Hero Section - Responsive */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in" style={{ color: "#2C3E50" }}>
            Piensa, juega y resuelve
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in-delay px-4">
            MentaMática es una aplicación donde encontrarás una forma inteligente y divertida de aprender matemáticas.
          </p>
        </div>

        {/* Interactive Section - Mobile Optimized */}
        <div className="mb-12 sm:mb-16">
          {/* En móvil: layout vertical */}
          <div className="block lg:hidden space-y-8">
            {/* Botón de registro prominente en móvil */}
            <SignedOut>
            </SignedOut>

            {/* Animaciones en grid 2x1 para móvil */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
              <SmoothCountingBox />
              <SmoothOperationsBox />
            </div>
          </div>

          {/* En desktop: layout original */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            <div className="flex justify-center">
              <SmoothCountingBox />
            </div>

            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignUpUrl="/"
              >
                <div className="flex flex-col items-center justify-center">
                  <Button
                    size="lg"
                    className="font-bold px-12 py-6 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-bounce-gentle"
                    style={{
                      backgroundColor: "#D2B48C",
                      color: "white",
                      border: "3px solid #C19A6B",
                    }}
                  >
                    <Sparkles className="w-6 h-6 mr-2" />
                    REGISTRARSE
                  </Button>
                </div>
              </SignUpButton>
            </SignedOut>

            <div className="flex justify-center">
              <SmoothOperationsBox />
            </div>
          </div>
        </div>

        {/* Learning Modules - Responsive Grid */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 px-4" style={{ color: "#2C3E50" }}>
            Que aprenderás aquí:
          </h3>

          {/* Grid responsivo: 2 columnas en móvil, más en pantallas grandes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {modules.map((module, index) => (
              <div
                key={module.name}
                className="text-center cursor-pointer group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-2 sm:mb-3 flex justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                    <img
                      src={module.icon || "/placeholder.svg?height=64&width=64"}
                      alt={module.name}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
                <h4 className="font-bold text-xs sm:text-sm mb-1" style={{ color: "#2C3E50" }}>
                  {module.name}
                </h4>
                <p className="text-xs text-gray-600 hidden sm:block">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription - Mobile Optimized */}
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up px-4">
          <p className="text-gray-700 mb-4 text-2xl 2xl:text-base font-bold">Manuales de uso</p>
          <div className="p-4 sm:p-6 rounded-xl shadow-lg relative overflow-hidden" style={{ backgroundColor: "#E2D9C8" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#E2D9C8]/80 to-[#D8CDB8]/80 animate-pulse opacity-20"></div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
              <button
                onClick={() => handleDownload("manualPadres.pdf")}
                className="group relative w-full sm:w-1/2 px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-white bg-gradient-to-r from-[#C19A6B] to-[#A57F50] hover:from-[#A57F50] hover:to-[#8B6A40] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl animate-pulse-gentle flex items-center justify-center gap-3 text-sm sm:text-base font-bold"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ animationDuration: "1.5s" }} />
                Manual para Padres
                <span className="absolute right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">✨</span>
              </button>
              <button
                onClick={() => handleDownload("manualNinios.pdf")}
                className="group relative w-full sm:w-1/2 px-4 py-3 sm:px-6 sm:py-4 rounded-xl text-white bg-gradient-to-r from-[#C19A6B] to-[#A57F50] hover:from-[#A57F50] hover:to-[#8B6A40] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl animate-pulse-gentle flex items-center justify-center gap-3 text-sm sm:text-base font-bold"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ animationDuration: "1.5s" }} />
                Manual para Niños
                <span className="absolute right-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xl">✨</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceGentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes slideInScale {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        @keyframes pulseGentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 3s ease-in-out infinite;
        }
        
        .animate-slide-in-scale {
          animation: slideInScale 0.5s ease-out both;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Componente de conteo optimizado para móvil
function SmoothCountingBox() {
  const [currentCount, setCurrentCount] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentCount((prev) => (prev % 5) + 1)
        setIsTransitioning(false)
      }, 250)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const dots = Array.from({ length: currentCount }, (_, i) => i)

  return (
    <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl border-4 border-purple-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/20 animate-pulse"></div>

      <h4 className="text-sm sm:text-lg font-bold text-purple-600 mb-4 sm:mb-6 z-10">¡Contemos juntos!</h4>

      <div className={`grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6 transition-all duration-500 ${isTransitioning ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
        {dots.map((_, index) => (
          <div
            key={`${currentCount}-${index}`}
            className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full shadow-lg animate-slide-in-scale relative"
            style={{
              animationDelay: `${index * 0.1}s`,
              boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          </div>
        ))}
      </div>

      <div className={`text-2xl sm:text-4xl font-bold text-gray-700 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg z-10 transition-all duration-500 ${isTransitioning ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
        {currentCount}
      </div>

      <div className="absolute bottom-2 sm:bottom-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i + 1 === currentCount ? 'bg-purple-500 scale-125' : 'bg-purple-200'}`}
          />
        ))}
      </div>
    </div>
  )
}

// Componente de operaciones optimizado para móvil
function SmoothOperationsBox() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % 4)
        setIsTransitioning(false)
      }, 300)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const operations = [
    {
      problem: "3 + 2",
      result: "5",
      gradient: "from-green-400 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      symbol: (
        <div className="relative">
          <div className="text-4xl sm:text-6xl font-bold text-green-500 animate-pulse">+</div>
          <div className="absolute inset-0 text-4xl sm:text-6xl font-bold text-green-300 animate-ping opacity-50">+</div>
        </div>
      )
    },
    {
      problem: "8 - 3",
      result: "5",
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      symbol: (
        <div className="relative">
          <div className="text-4xl sm:text-6xl font-bold text-orange-500 animate-bounce">−</div>
          <div className="absolute -inset-2 bg-orange-200 rounded-full opacity-30 animate-pulse"></div>
        </div>
      )
    },
    {
      problem: "3 × 2",
      result: "6",
      gradient: "from-blue-400 to-purple-500",
      bgGradient: "from-blue-50 to-purple-50",
      symbol: (
        <div className="relative">
          <div className="text-4xl sm:text-6xl font-bold text-blue-500 animate-spin" style={{ animationDuration: '2s' }}>×</div>
          <div className="absolute inset-0 text-4xl sm:text-6xl font-bold text-purple-400 animate-ping opacity-40">×</div>
        </div>
      )
    },
    {
      problem: "10 ÷ 2",
      result: "5",
      gradient: "from-yellow-400 to-amber-500",
      bgGradient: "from-yellow-50 to-amber-50",
      symbol: (
        <div className="relative">
          <div className="text-4xl sm:text-6xl font-bold text-yellow-600">
            <div className="flex flex-col items-center animate-bounce">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-600 rounded-full mb-1"></div>
              <div className="w-6 h-0.5 sm:w-8 sm:h-1 bg-yellow-600 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-600 rounded-full mt-1"></div>
            </div>
          </div>
          <div className="absolute -inset-3 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        </div>
      )
    },
  ]

  const currentOp = operations[currentStep]

  return (
    <div className={`w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br ${currentOp.bgGradient} rounded-3xl border-4 border-blue-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-500`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>

      <h4 className="text-sm sm:text-lg font-bold text-blue-600 mb-3 sm:mb-4 z-10">¡Resolvamos!</h4>

      <div className={`mb-3 sm:mb-4 transition-all duration-500 ${isTransitioning ? 'scale-75 opacity-30 rotate-180' : 'scale-100 opacity-100 rotate-0'}`}>
        {currentOp.symbol}
      </div>

      <div className={`text-center z-10 transition-all duration-500 ${isTransitioning ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
        <div className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">{currentOp.problem}</div>
        <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${currentOp.gradient} bg-clip-text text-transparent flex items-center gap-2 justify-center`}>
          = {currentOp.result}
          <span className="text-xl sm:text-2xl animate-bounce">⭐</span>
        </div>
      </div>

      <div className="absolute bottom-2 sm:bottom-4 flex gap-1">
        {operations.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-blue-500 scale-125' : 'bg-blue-200'}`}
          />
        ))}
      </div>

      {/* Partículas decorativas */}
      <div className="absolute top-2 right-2 text-xs sm:text-sm animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-2 left-2 text-xs sm:text-sm animate-bounce" style={{ animationDelay: '1s' }}>🌟</div>
    </div>
  )
}