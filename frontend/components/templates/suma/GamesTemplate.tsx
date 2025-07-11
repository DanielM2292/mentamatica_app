"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Coins } from "lucide-react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  symbol: string;
  color: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
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
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
  };
  
  const sizes = {
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

interface BackgroundLayoutProps {
  title: string;
  description: string;
  iconSrc: string;
  children: React.ReactNode;
  onBack: () => void;
  stars?: number;
  coins?: number;
}

const GamesTemplate: React.FC<BackgroundLayoutProps> = ({
  title,
  description,
  iconSrc,
  children,
  onBack,
  stars = 0,
  coins = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // Crear elementos flotantes - menos en móvil
    const elementsCount = window.innerWidth < 768 ? 4 : 8;
    const elements = Array.from({ length: elementsCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: i % 3 === 0 ? "+" : i % 3 === 1 ? `${Math.floor(Math.random() * 9) + 1}` : "=",
      color: ["bg-green-200", "bg-emerald-200", "bg-lime-200", "bg-teal-200"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      {/* Elementos flotantes de fondo - ocultos en móvil muy pequeño */}
      <div className="absolute inset-0 pointer-events-none hidden xs:block">
        {floatingElements.map((item) => (
          <div
            key={item.id}
            className={`absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${item.color} rounded-full opacity-20 animate-float flex items-center justify-center text-green-800 font-bold text-xs sm:text-sm`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animationDelay: `${item.id * 0.5}s`,
              animationDuration: `${3 + item.id * 0.2}s`,
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
      <div
        className="hidden sm:block absolute top-40 right-4 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-emerald-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-2xl font-bold text-emerald-600"
        style={{ animationDelay: "1s" }}
      >
        2+3
      </div>
      <div
        className="hidden sm:block absolute bottom-40 left-4 sm:left-20 w-14 h-14 sm:w-28 sm:h-28 bg-lime-100 rounded-full opacity-30 animate-pulse flex items-center justify-center text-lg sm:text-3xl font-bold text-lime-600"
        style={{ animationDelay: "2s" }}
      >
        =5
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-slide-in-left { animation: slideInFromLeft 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInFromRight 0.6s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
      `}</style>

      {/* Header - Mejorado para móvil */}
      <div
        className={`bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10 transition-all duration-700 ${
          isVisible ? "animate-slide-in-left" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              className="hover:scale-105 transition-transform duration-200 flex-shrink-0"
            >
              <span className="hidden sm:inline">Volver</span>
            </Button>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer flex-shrink-0">
                <img
                  src={iconSrc}
                  alt={`Ícono de ${title}`}
                  className="w-full h-full object-contain animate-bounce"
                  draggable={false}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate">
                  {title.toUpperCase()}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div
              className={`flex items-center gap-1 sm:gap-2 bg-yellow-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300 ${
                isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
              <span className="font-bold text-yellow-700 text-xs sm:text-base">{stars}</span>
            </div>
            <div
              className={`flex items-center gap-1 sm:gap-2 bg-amber-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-amber-200 transition-colors duration-300 ${
                isVisible ? "animate-bounce-in" : "opacity-0"
              }`}
              style={{ animationDelay: "0.7s" }}
            >
              <Coins className="w-3 h-3 sm:w-5 sm:h-5 text-amber-600 animate-pulse" />
              <span className="font-bold text-amber-700 text-xs sm:text-base">{coins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GamesTemplate;