"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send } from "lucide-react"
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E1" }}>
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="MentaMática Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#2C3E50" }}>
            MentaMática
          </h1>
        </div>

        <SignedOut>
          <SignInButton 
            mode="modal"
            // Configurar redirect después del login
            afterSignInUrl="/"
            afterSignUpUrl="/"
          >
            <div className="flex justify-center">
              <Button
                className="font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: "#F7DC6F",
                  color: "#2C3E50",
                  border: "2px solid #F4D03F",
                }}
              >
                INICIAR SESIÓN
              </Button>
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in" style={{ color: "#2C3E50" }}>
            Piensa, juega y resuelve
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 animate-fade-in-delay">
            MentaMática es una aplicación donde encontrarás una forma inteligente y divertida de aprender matemáticas.
          </p>
        </div>

        {/* Interactive Section with Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Animation */}
          <div className="flex justify-center">
            <SmoothCountingBox />
          </div>

          {/* Center Registration */}
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

          {/* Right Animation */}
          <div className="flex justify-center">
            <SmoothOperationsBox />
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: "#2C3E50" }}>
            Que aprenderás aquí:
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {modules.map((module, index) => (
              <div
                key={module.name}
                className="text-center cursor-pointer group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-3 flex justify-center">
                  <div className="w-16 h-16 relative">
                    <img
                      src={module.icon || "/placeholder.svg?height=64&width=64"}
                      alt={module.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1" style={{ color: "#2C3E50" }}>
                  {module.name}
                </h4>
                <p className="text-xs text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="max-w-md mx-auto text-center animate-fade-in-up">
          <p className="text-gray-700 mb-4">Si deseas más información escribe tu correo electrónico</p>
          <div className="relative">
            <div className="flex items-center">
              <Input
                type="email"
                placeholder="example@hotmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-l-full border-2 text-center transition-all duration-300 focus:scale-105"
                style={{
                  backgroundColor: "#D2B48C",
                  borderColor: "#C19A6B",
                  color: "white",
                }}
              />
              <Button
                onClick={handleSubmitEmail}
                className="rounded-r-full px-4 py-3 h-full hover:scale-110 transition-all duration-300"
                style={{
                  backgroundColor: "#C19A6B",
                  borderColor: "#C19A6B",
                  color: "white",
                }}
              >
                <Send className="w-5 h-5" />
              </Button>
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
    `}</style>
    </div>
  )
}

// Componente de conteo mejorado con animaciones suaves
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
    <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl border-4 border-purple-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/20 animate-pulse"></div>

      <h4 className="text-lg font-bold text-purple-600 mb-6 z-10">¡Contemos juntos!</h4>

      <div className={`grid grid-cols-3 gap-3 mb-6 transition-all duration-500 ${isTransitioning ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
        {dots.map((_, index) => (
          <div
            key={`${currentCount}-${index}`}
            className="w-8 h-8 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 rounded-full shadow-lg animate-slide-in-scale relative"
            style={{
              animationDelay: `${index * 0.1}s`,
              boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          </div>
        ))}
      </div>

      <div className={`text-4xl font-bold text-gray-700 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10 transition-all duration-500 ${isTransitioning ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
        {currentCount}
      </div>

      <div className="absolute bottom-4 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i + 1 === currentCount ? 'bg-purple-500 scale-125' : 'bg-purple-200'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

// Componente de operaciones mejorado con símbolos animados
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
          <div className="text-6xl font-bold text-green-500 animate-pulse">+</div>
          <div className="absolute inset-0 text-6xl font-bold text-green-300 animate-ping opacity-50">+</div>
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
          <div className="text-6xl font-bold text-orange-500 animate-bounce">−</div>
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
          <div className="text-6xl font-bold text-blue-500 animate-spin" style={{ animationDuration: '2s' }}>×</div>
          <div className="absolute inset-0 text-6xl font-bold text-purple-400 animate-ping opacity-40">×</div>
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
          <div className="text-6xl font-bold text-yellow-600">
            <div className="flex flex-col items-center animate-bounce">
              <div className="w-2 h-2 bg-yellow-600 rounded-full mb-1"></div>
              <div className="w-8 h-1 bg-yellow-600 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1"></div>
            </div>
          </div>
          <div className="absolute -inset-3 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        </div>
      )
    },
  ]

  const currentOp = operations[currentStep]

  return (
    <div className={`w-64 h-64 bg-gradient-to-br ${currentOp.bgGradient} rounded-3xl border-4 border-blue-200 flex flex-col items-center justify-center shadow-xl backdrop-blur-sm relative overflow-hidden transition-all duration-500`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse"></div>

      <h4 className="text-lg font-bold text-blue-600 mb-4 z-10">¡Resolvamos!</h4>

      <div className={`mb-4 transition-all duration-500 ${isTransitioning ? 'scale-75 opacity-30 rotate-180' : 'scale-100 opacity-100 rotate-0'}`}>
        {currentOp.symbol}
      </div>

      <div className={`text-center z-10 transition-all duration-500 ${isTransitioning ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
        <div className="text-xl font-semibold text-gray-700 mb-2">{currentOp.problem}</div>
        <div className={`text-3xl font-bold bg-gradient-to-r ${currentOp.gradient} bg-clip-text text-transparent flex items-center gap-2 justify-center`}>
          = {currentOp.result}
          <span className="text-2xl animate-bounce">⭐</span>
        </div>
      </div>

      <div className="absolute bottom-4 flex gap-1">
        {operations.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-blue-500 scale-125' : 'bg-blue-200'
              }`}
          />
        ))}
      </div>

      {/* Partículas decorativas */}
      <div className="absolute top-2 right-2 text-sm animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
      <div className="absolute bottom-2 left-2 text-sm animate-bounce" style={{ animationDelay: '1s' }}>🌟</div>
    </div>
  )
}