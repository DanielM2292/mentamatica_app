"use client";

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Partículas flotantes de fondo */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-yellow-300 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Elementos decorativos de fondo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-200 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-15 blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-3/4 w-28 h-28 bg-green-200 rounded-full opacity-15 blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {children}
    </div>
  );
}