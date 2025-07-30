"use client"
import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import { ArrowLeft, Heart, Star, Save, Settings, Download, Camera, Wand2, Lock, Coins } from "lucide-react"
import Button from "@/components/atoms/Button"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { toast } from "@/hooks/use-toast"
import Monedas from "@/components/molecules/monedas-updated";
import { UnlockConfirmationDialog } from "@/components/unlock-confirmation-dialog"
import { gsap } from "gsap"

export const categoryColors: Record<string, string> = {
  skinColor: "from-orange-400 via-amber-400 to-yellow-400",
  hair: "from-amber-400 via-yellow-400 to-lime-400",
  hairColor: "from-rose-400 via-pink-400 to-purple-400",
  eyes: "from-blue-400 via-cyan-400 to-teal-400",
  eyebrows: "from-green-400 via-emerald-400 to-teal-400",
  mouth: "from-pink-400 via-rose-400 to-red-400",
  glasses: "from-indigo-400 via-purple-400 to-pink-400",
  earrings: "from-yellow-400 via-orange-400 to-red-400",
  features: "from-red-400 via-pink-400 to-purple-400",
  backgroundColor: "from-purple-400 via-pink-400 to-red-400",
}

export const categoryBgColors: Record<string, string> = {
  skinColor: "from-orange-100 to-amber-100",
  hair: "from-amber-100 to-yellow-100",
  hairColor: "from-rose-100 to-pink-100",
  eyes: "from-blue-100 to-cyan-100",
  eyebrows: "from-green-100 to-emerald-100",
  mouth: "from-pink-100 to-rose-100",
  glasses: "from-indigo-100 to-purple-100",
  earrings: "from-yellow-100 to-orange-100",
  features: "from-red-100 to-pink-100",
  backgroundColor: "from-purple-100 to-pink-100",
}

interface AvatarCategory {
  categoria_id: string
  nombre_categoria: string
  id_api: string
  icono?: string
  emoji?: string
  orden: number
}

interface AvatarOption {
  opcion_id: string
  categoria_id: string
  valor: string
  costo: number
}

interface UserUnlockedOption {
  opcion_id: string
  fecha_desbloqueo: string
}

interface AvatarCustomizerProps {
  onSave?: (avatar: any) => void
}

const Page: React.FC<AvatarCustomizerProps> = ({}) => {
  const [categories, setCategories] = useState<AvatarCategory[]>([])
  const [avatarOptions, setAvatarOptions] = useState<Record<string, string>>({})
  const [options, setOptions] = useState<Record<string, AvatarOption[]>>({})
  const [showSaveAnimation, setShowSaveAnimation] = useState(false)
  const [seed] = useState("mi-avatar-magico")
  const [unlockedOptions, setUnlockedOptions] = useState<UserUnlockedOption[]>([])
  const [userCoins, setUserCoins] = useState(0)
  const { user } = useUser()
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    option: AvatarOption | null
    optionName: string
  }>({
    isOpen: false,
    option: null,
    optionName: "",
  })
  const [coinsUpdateTrigger, setCoinsUpdateTrigger] = useState(0)

  // Refs for GSAP animations
  const headerRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial GSAP animations
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      )
    }

    if (avatarRef.current) {
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.5, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.3 },
      )
    }

    if (categoriesRef.current) {
      gsap.fromTo(
        categoriesRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.5 },
      )
    }
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!user?.id) return

      try {
        // 1. Obtener categorías
        const catsRes = await fetch(`http://localhost:3001/api/avatar?get=categorias`)
        if (!catsRes.ok) throw new Error("Error al obtener categorías")

        const categoriesData = await catsRes.json()

        if (!categoriesData.success || !Array.isArray(categoriesData.categorias)) {
          throw new Error("La respuesta de categorías no es válida")
        }

        const categorias = categoriesData.categorias

        setCategories(categorias.sort((a: AvatarCategory, b: AvatarCategory) => a.orden - b.orden))

        // 2. Obtener opciones desbloqueadas
        const unlockedRes = await fetch(`http://localhost:3001/api/avatar?usuario_id=${user.id}`)
        const unlockedData = await unlockedRes.json()
        setUnlockedOptions(unlockedData.opciones_desbloqueadas || [])

        // 3. Obtener monedas del usuario
        const userRes = await fetch(`http://localhost:3001/api/usuarios?usuario_id=${user?.id}`)
        const userData = await userRes.json()
        setUserCoins(userData.monedas || 0)

        // 4. Cargar las opciones activas que vienen desde la base de datos
        const savedOptionsRes = await fetch(`http://localhost:3001/api/avatar?usuario_id=${user.id}`)
        const savedOptionsData = await savedOptionsRes.json()

        if (savedOptionsData.success && savedOptionsData.opciones_desbloqueadas) {
          setAvatarOptions(savedOptionsData.opciones_enviar || {})
        }

        // 4. Cargar opciones de la primera categoría
        if (categorias.length > 0) {
          setActiveCategory(categorias[0].id_api)
        }
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }
    fetchInitialData()
  }, [user])

  useEffect(() => {
    if (activeCategory) {
      loadCategoryOptions(activeCategory)
    }
  }, [activeCategory])

  // Función para cargar opciones por categoría
  const loadCategoryOptions = async (categoryId: string) => {
    if (options[categoryId]) return // Ya cargadas
    try {
      const res = await fetch(`http://localhost:3001/api/avatar?categoria_id=${categoryId}`)
      if (!res.ok) throw new Error(`Error al cargar opciones para la categoría ${categoryId}`)
      const data = await res.json()
      setOptions((prev) => ({
        ...prev,
        [categoryId]: data.opciones,
      }))

      // Animate options when they load
      setTimeout(() => {
        if (optionsRef.current) {
          gsap.fromTo(
            optionsRef.current.children,
            { scale: 0.8, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" },
          )
        }
      }, 100)
    } catch (error) {
      toast({ description: `Error al cargar opciones para la categoría ${categoryId}` })
    }
  }

  const handleUnlockOption = async (option: AvatarOption) => {
    try {
      const res = await fetch(`http://localhost:3001/api/avatar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          categoriaId: option.categoria_id,
          optionId: option.opcion_id,
          costo: option.costo,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 409) {
          // Ya está desbloqueada, aún puedes agregarla al estado si hace falta
          setUnlockedOptions((prev) => [
            ...prev,
            {
              opcion_id: option.opcion_id,
              fecha_desbloqueo: new Date().toISOString(),
            },
          ])
          toast({ description: "¡Ya habías desbloqueado esta opción!" })
          return true
        } else {
          toast({ description: `Error: ${data.error || "No se pudo desbloquear la opción."}` })
          return false
        }
      }

      // Desbloqueo exitoso - actualizar estado inmediatamente
      setUnlockedOptions((prev) => [
        ...prev,
        {
          opcion_id: option.opcion_id,
          fecha_desbloqueo: new Date().toISOString(),
        },
      ])

      // Actualizar monedas inmediatamente
      const newCoinsAmount = userCoins - option.costo
      setUserCoins(newCoinsAmount)

      // Forzar actualización del componente Monedas
      setCoinsUpdateTrigger((prev) => prev + 1)

      // Animación de éxito
      gsap.to(avatarRef.current, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })

      toast({
        description: (
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span>¡Opción desbloqueada! Costo: {option.costo} monedas</span>
          </div>
        ),
      })

      return true
    } catch (error) {
      toast({ description: "Hubo un problema de conexión con el servidor." })
      return false
    }
  }

  // Renderizado de opciones (ejemplo para colores)
  const handleOptionChange = (category: string, value: string) => {
    setIsLoading(true)
    setAvatarOptions((prev) => {
      const newAvatarOptions = {
        ...prev,
        [category]: value,
      }
      return newAvatarOptions
    })

    // Efectos visuales con GSAP
    setShowConfetti(true)
    setShowSparkles(true)

    // Animate avatar change
    gsap.to(avatarRef.current, {
      rotationY: 360,
      duration: 0.8,
      ease: "power2.inOut",
    })

    setTimeout(() => setShowConfetti(false), 800)
    setTimeout(() => setShowSparkles(false), 1000)
    setTimeout(() => setIsLoading(false), 300)
  }

  // Mapeo de nombres amigables para las opciones
  const FRIENDLY_NAMES: Record<string, Record<string, string>> = {
    backgroundColor: {
      transparent: "🚫",
      b6e3f4: "💙",
      c0aede: "💜",
      d1d4f9: "🌸",
      ffd5dc: "🌺",
      ffdfbf: "🍑",
      ff6b6b: "❤️",
      "4ecdc4": "🌊",
      "45b7d1": "🌀",
      "96ceb4": "🌿",
      ffeaa7: "☀️",
    },
    earrings: {
      none: "🚫",
    },
    features: {
      none: "🚫",
      birthmark: "🔸",
      blush: "😊",
      freckles: "⭐",
    },
    glasses: {
      none: "🚫",
    },
    hair: {
      none: "🚫",
    },
  }

  const generateAvatarUrl = (options: Record<string, string>, seed: string, size = "600"): string => {
    const params = new URLSearchParams()
    params.append("seed", seed)
    params.append("size", size)

    Object.entries(options).forEach(([categoryId, value]) => {
      if (["features", "glasses", "earrings", "hair"].includes(categoryId)) {
        if (value === "none") {
          params.append(`${categoryId}Probability`, "0")
        } else {
          params.append(categoryId, value)
          params.append(`${categoryId}Probability`, "100")
        }
      } else if (value && value !== "none") {
        params.append(categoryId, value)
      }
    })

    const url = `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`
    return url
  }

  const avatarUrl = useMemo(() => generateAvatarUrl(avatarOptions, seed), [avatarOptions, seed])

  const handleSave = async () => {
    setShowSaveAnimation(true)

    // GSAP save animation
    gsap.to(avatarRef.current, {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })

    try {
      const res = await fetch(`http://localhost:3001/api/avatar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          opciones_guardar: avatarOptions,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        toast({ description: `Error al guardar el avatar en base de datos: ${data.error}` })
      } else {
        toast({ description: "¡Avatar guardado exitosamente!" })
      }
    } catch (error) {
      toast({ description: "Error al guardar el avatar. Inténtalo de nuevo." })
    }
    setTimeout(() => {
      setShowSaveAnimation(false)
    }, 2000)
  }

  const downloadAvatar = async () => {
    try {
      const response = await fetch(avatarUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `mi-avatar-${seed}.svg`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading avatar:", error)
    }
  }

  const handleUnlockClick = (option: AvatarOption, optionName: string) => {
    if (userCoins < option.costo) {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-red-500" />
            <span>No tienes suficientes monedas</span>
          </div>
        ),
      })
      return
    }

    setConfirmDialog({
      isOpen: true,
      option,
      optionName,
    })
  }

  const handleConfirmUnlock = async () => {
    if (confirmDialog.option) {
      const success = await handleUnlockOption(confirmDialog.option)
      if (success) {
        handleOptionChange(activeCategory, confirmDialog.option.valor)
      }
    }
  }

  const currentOptions = activeCategory ? options[activeCategory] || [] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 via-blue-200 to-cyan-200 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-4 left-4 sm:top-10 sm:left-10 w-8 h-8 sm:w-16 sm:h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-16 right-8 sm:top-32 sm:right-16 w-6 h-6 sm:w-12 sm:h-12 bg-pink-300 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s", animationDuration: "2s" }}
        ></div>
        <div
          className="absolute bottom-10 left-16 sm:bottom-20 sm:left-32 w-10 h-10 sm:w-20 sm:h-20 bg-blue-300 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-4 sm:bottom-40 sm:right-8 w-4 h-4 sm:w-8 sm:h-8 bg-green-300 rounded-full opacity-35 animate-pulse"
          style={{ animationDelay: "0.5s", animationDuration: "3s" }}
        ></div>
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
                animationDuration: "1s",
              }}
            >
              <div
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                  [
                    "bg-yellow-400",
                    "bg-pink-400",
                    "bg-blue-400",
                    "bg-green-400",
                    "bg-purple-400",
                    "bg-red-400",
                    "bg-orange-400",
                  ][Math.floor(Math.random() * 7)]
                } opacity-80 shadow-lg`}
              ></div>
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
                animationDuration: "0.8s",
              }}
            >
              <Star
                className={`w-4 h-4 sm:w-6 sm:h-6 ${
                  ["text-yellow-400", "text-pink-400", "text-blue-400", "text-green-400", "text-purple-400"][
                    Math.floor(Math.random() * 5)
                  ]
                } opacity-70`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 shadow-2xl border-b-2 sm:border-b-4 border-white"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <Link href="/settings">
              <Button className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline text-sm sm:text-base">🏠 Inicio</span>
                <span className="xs:hidden">🏠</span>
              </Button>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-center max-w-md">
              <div
                className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-spin shadow-xl"
                style={{ animation: "spin 8s linear infinite" }}
              >
                <Wand2 className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-center">
                <h1
                  className="text-lg sm:text-2xl lg:text-3xl font-black text-white drop-shadow-lg animate-pulse leading-tight"
                  style={{ animationDuration: "2s" }}
                >
                  <span className="hidden sm:inline">✨🎨 AVATAR MÁGICO 🎨✨</span>
                  <span className="sm:hidden">✨ AVATAR ✨</span>
                </h1>
                <p
                  className="text-white/90 font-bold text-xs sm:text-sm lg:text-lg animate-bounce hidden sm:block"
                  style={{ animationDuration: "3s" }}
                >
                  ¡Crea tu personaje favorito!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {user && (
                <Monedas
                  userId={user.id}
                  isVisible={true}
                  currentCoins={userCoins}
                  updateTrigger={coinsUpdateTrigger}
                />
              )}
              <button
                onClick={handleSave}
                disabled={showSaveAnimation}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base font-bold disabled:opacity-50 animate-pulse"
                style={{ animationDuration: "2.5s" }}
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">💾 Guardar</span>
                <span className="xs:hidden">💾</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col xl:grid xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {/* Avatar Preview */}
          <div className="xl:col-span-2 order-1 xl:order-1">
            <div className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl xl:sticky xl:top-28 border-2 sm:border-4 border-gradient-to-r from-pink-400 to-purple-400 relative overflow-hidden">
              <div
                className="absolute top-4 right-4 sm:top-6 sm:right-6 animate-spin"
                style={{ animation: "spin 10s linear infinite" }}
              >
                <Star className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 opacity-80 drop-shadow-lg" />
              </div>
              <div
                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 opacity-80 drop-shadow-lg" />
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <h2
                  className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-800 mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-4 animate-bounce"
                  style={{ animationDuration: "2.5s" }}
                >
                  <Camera
                    className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600 animate-pulse"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <span>🎭 TU AVATAR 🎭</span>
                </h2>
                <p
                  className="text-purple-600 font-bold text-sm sm:text-lg lg:text-xl animate-pulse"
                  style={{ animationDuration: "3s" }}
                >
                  ¡Mira qué genial se ve! 🌟
                </p>
              </div>

              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="relative group">
                  <div
                    className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-2xl sm:blur-3xl animate-pulse"
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div
                    ref={avatarRef}
                    className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl overflow-hidden border-4 sm:border-6 lg:border-8 border-white group-hover:scale-105 transition-transform duration-300"
                  >
                    {isLoading && (
                      <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-16 sm:h-16 border-4 sm:border-8 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-purple-600 font-black text-sm sm:text-lg lg:text-xl animate-bounce">
                            🎨 Creando magia...
                          </p>
                        </div>
                      </div>
                    )}

                    <img
                      src={avatarUrl || "/placeholder.svg"}
                      alt="Tu avatar súper genial"
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`
                      }}
                    />

                    {showSaveAnimation && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-green-500/90 to-blue-500/90 rounded-full">
                        <div className="bg-white text-green-600 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-xl sm:rounded-2xl animate-bounce text-lg sm:text-xl lg:text-2xl font-black shadow-2xl">
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
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg lg:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 animate-pulse"
                  style={{ animationDuration: "2s" }}
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>📥 ¡Descargar mi Avatar!</span>
                </button>
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="xl:col-span-3 order-2 xl:order-2">
            <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border-2 sm:border-4 border-gradient-to-r from-blue-400 to-purple-400">
              <div className="mb-6 sm:mb-8">
                <h2
                  className="text-xl sm:text-2xl lg:text-3xl font-black text-blue-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-4 animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  <Settings
                    className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 animate-spin"
                    style={{ animation: "spin 6s linear infinite" }}
                  />
                  <span>🎨 PERSONALIZACIÓN 🎨</span>
                </h2>
              </div>

              {/* Category Tabs */}
              <div
                ref={categoriesRef}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10"
              >
                {categories.map((category) => (
                  <button
                    key={category.id_api}
                    onClick={() => {
                      setActiveCategory(category.id_api)
                      // Animate category change
                      gsap.to(categoriesRef.current?.children || [], {
                        scale: 0.95,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                      })
                    }}
                    className={`group relative overflow-hidden flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl font-black transition-all duration-300 text-xs sm:text-sm lg:text-base border-2 sm:border-4 hover:scale-105 ${
                      activeCategory === category.id_api
                        ? `bg-gradient-to-r ${categoryColors[category.id_api]} text-white shadow-2xl scale-105 border-white animate-pulse`
                        : `bg-gradient-to-r ${categoryBgColors[category.id_api]} text-slate-700 hover:shadow-xl border-slate-300 hover:border-purple-400`
                    }`}
                    style={{ animationDuration: activeCategory === category.id_api ? "2s" : undefined }}
                  >
                    <div
                      className={`text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 transition-transform duration-300 ${
                        activeCategory === category.id_api
                          ? "animate-bounce"
                          : "group-hover:scale-125 group-hover:animate-pulse"
                      }`}
                      style={{ animationDuration: "1.5s" }}
                    >
                      {category.emoji}
                    </div>
                    <span className="text-center leading-tight">{category.nombre_categoria}</span>

                    {activeCategory === category.id_api && (
                      <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center animate-ping">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Options */}
              <div ref={optionsRef}>
                {currentOptions.length > 0 ? (
                  <>
                    {/* Color pickers */}
                    {(activeCategory === "AVC0001" || activeCategory === "AVC0010") && (
                      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 sm:gap-4">
                        {currentOptions.map((option) => {
                          const isSelected = avatarOptions[activeCategory] === option.valor
                          const isUnlocked = unlockedOptions.some((uo) => uo.opcion_id === option.opcion_id)
                          const bgColor = option.valor === "transparent" ? "transparent" : `#${option.valor}`

                          const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option.valor] || `Color ${option.valor}`

                          return (
                            <button
                              key={option.opcion_id}
                              onClick={async (e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                if (!isUnlocked) {
                                  handleUnlockClick(option, friendlyName)
                                } else {
                                  handleOptionChange(activeCategory, option.valor)
                                }
                              }}
                              className={`group relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 hover:scale-110 hover:rotate-6 ${
                                isSelected
                                  ? "border-white scale-110 shadow-2xl ring-4 sm:ring-6 lg:ring-8 ring-yellow-300 animate-pulse"
                                  : "border-slate-400 hover:border-white shadow-lg hover:shadow-2xl"
                              } ${option.valor === "transparent" ? "bg-white bg-opacity-70 border-dashed" : ""}`}
                              style={{
                                backgroundColor: bgColor,
                                animationDuration: isSelected ? "2s" : undefined,
                              }}
                              title={friendlyName + (!isUnlocked ? " (Bloqueado)" : "")}
                            >
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div
                                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce"
                                    style={{ animationDuration: "1s" }}
                                  >
                                    <div className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-purple-500 rounded-full"></div>
                                  </div>
                                </div>
                              )}

                              {option.valor === "transparent" && (
                                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-red-400 to-pink-500 opacity-80 rounded-lg sm:rounded-xl flex items-center justify-center">
                                  <span className="text-white font-black text-sm sm:text-lg">🚫</span>
                                </div>
                              )}

                              {!isUnlocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl sm:rounded-2xl">
                                  <Lock className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white mb-1" />
                                  <div className="flex items-center gap-1 text-xs font-bold text-white bg-black bg-opacity-70 rounded-full px-2 py-1">
                                    <Coins className="w-3 h-3 text-yellow-400" />
                                    <span>{option.costo}</span>
                                  </div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    {/* Regular options */}
                    {!["AVC0001", "AVC0010"].includes(activeCategory) && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {currentOptions.map((option, index) => {
                          const isSelected = avatarOptions[activeCategory] === option.valor
                          const isUnlocked = unlockedOptions.some((uo) => uo.opcion_id === option.opcion_id) || false
                          const friendlyName = FRIENDLY_NAMES[activeCategory]?.[option.valor] || `Opción ${index + 1}`

                          const previewOptions = {
                            ...avatarOptions,
                            [activeCategory]: option.valor,
                          }

                          const previewUrl = generateAvatarUrl(previewOptions, seed, "120")
                          return (
                            <button
                              key={option.opcion_id}
                              onClick={async (e) => {
                                e.stopPropagation()
                                e.preventDefault()

                                if (!isUnlocked) {
                                  handleUnlockClick(option, friendlyName)
                                } else {
                                  handleOptionChange(activeCategory, option.valor)
                                }
                              }}
                              className={`group relative p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 text-left hover:scale-105 hover:rotate-1 ${
                                isSelected
                                  ? "border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 shadow-2xl scale-105 ring-2 sm:ring-4 ring-yellow-300 animate-pulse"
                                  : "border-slate-300 bg-gradient-to-br from-white to-blue-50 text-slate-700 hover:border-purple-400 hover:shadow-xl"
                              }`}
                              style={{ animationDuration: isSelected ? "2s" : undefined }}
                              title={friendlyName + (isUnlocked ? "" : " (Bloqueado)")}
                            >
                              <div className="flex justify-center mb-3 sm:mb-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-slate-300 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl">
                                  <img
                                    src={`${previewUrl}&t=${Date.now()}`}
                                    alt={`Preview ${friendlyName}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=b6e3f4`
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="text-center">
                                {option.valor === "none" ? (
                                  <div className="text-xs sm:text-sm font-black text-red-600 bg-red-100 rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-4 border-2 border-red-300">
                                    🚫 {friendlyName}
                                  </div>
                                ) : (
                                  <div className="text-xs sm:text-sm font-black text-purple-600 bg-purple-100 rounded-lg sm:rounded-xl py-2 sm:py-3 px-3 sm:px-4 border-2 border-purple-300">
                                    ✨ Opción {index + 1}
                                  </div>
                                )}
                              </div>

                              {isSelected && (
                                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                                  <div
                                    className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce shadow-xl"
                                    style={{ animationDuration: "1s" }}
                                  >
                                    <div className="text-white font-black text-xs sm:text-sm">✓</div>
                                  </div>
                                </div>
                              )}

                              {!isUnlocked && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-xl sm:rounded-2xl z-10">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-2" />
                                  <div className="flex items-center gap-1 text-sm font-bold text-white bg-black bg-opacity-70 rounded-full px-3 py-1">
                                    <Coins className="w-4 h-4 text-yellow-400" />
                                    <span>{option.costo}</span>
                                  </div>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div
                      className="text-6xl sm:text-8xl mb-4 sm:mb-6 animate-bounce"
                      style={{ animationDuration: "2s" }}
                    >
                      🎭
                    </div>
                    <p className="text-slate-600 font-black text-xl sm:text-2xl mb-2 sm:mb-3">
                      ¡Ups! No hay opciones aquí
                    </p>
                    <p
                      className="text-slate-500 font-bold text-lg sm:text-xl animate-pulse"
                      style={{ animationDuration: "3s" }}
                    >
                      🔄 Prueba con otra categoría
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Dialog */}
      <UnlockConfirmationDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, option: null, optionName: "" })}
        onConfirm={handleConfirmUnlock}
        cost={confirmDialog.option?.costo || 0}
        userCoins={userCoins}
        optionName={confirmDialog.optionName}
      />
    </div>
  )
}

export default Page
