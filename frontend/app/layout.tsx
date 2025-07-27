import type React from "react"
import type { Metadata } from "next"
import { Inter, Comic_Neue } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { StarsProvider } from "@/context/StarsContext"

// Optimización de fuentes con Next.js
const inter = Inter({ subsets: ["latin"], display: "swap" })
const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comic-neue",
})

export const metadata: Metadata = {
  title: "MentaMática - Aprende matemáticas jugando",
  description:
    "Aplicación interactiva basada en principios de neurociencia cognitiva para potenciar el aprendizaje de las operaciones matemáticas básicas en niños de segundo de primaria",
  keywords: "matemáticas, educación, niños, primaria, neurociencia, aprendizaje, juegos educativos",
  authors: [{ name: "MentaMática Team" }],
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <head>
          {/* Favicon personalizado */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={`${inter.className} ${comicNeue.variable} min-h-screen bg-[#F5F0E1]`}>
          <StarsProvider>

            {/* Sonidos preload para efectos auditivos */}
            <audio id="correct-sound" preload="auto" src="/sounds/correct.mp3"></audio>
            <audio id="wrong-sound" preload="auto" src="/sounds/wrong.mp3"></audio>
            <audio id="celebration-sound" preload="auto" src="/sounds/celebration.mp3"></audio>

            {/* Contenido principal */}
            <div className="relative overflow-hidden">
              {/* Elementos decorativos de fondo - estimulación visual periférica */}
              <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full opacity-5 blur-3xl"></div>
              </div>

              {/* Contenido de la página */}
              <main className="relative z-10">{children}</main>

              {/* Footer global */}
              <footer className="py-4 text-center text-sm text-gray-500 relative z-10">
                <p>© {new Date().getFullYear()} MentaMática - Aprendizaje basado en neurociencia cognitiva</p>
              </footer>
            </div>

            <Toaster />

            {/* Script para inicializar efectos de sonido */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                // Función para reproducir sonidos con volumen adecuado para niños
                window.playSound = function(id) {
                  const sound = document.getElementById(id);
                  if (sound) {
                    sound.volume = 0.5; // Volumen moderado
                    sound.currentTime = 0;
                    sound.play().catch(e => console.log('Error reproduciendo sonido:', e));
                  }
                }
              `,
              }}
            />
          </StarsProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}