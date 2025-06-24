"use client";
import React from "react";

interface BackgroundTemplateProps {
  children: React.ReactNode;
  backgroundGradient?: string;
  className?: string;
}

const GamesTemplate: React.FC<BackgroundTemplateProps> = ({
  children,
  backgroundGradient = "bg-gradient-to-br from-pink-50 to-purple-50",
  className = "",
}) => {
  return (
    <div className={`min-h-screen relative overflow-hidden ${backgroundGradient} ${className}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200/25 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-green-200/30 rounded-full animate-pulse delay-500"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-purple-300/40 rotate-45 animate-spin-slow"></div>
        <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-pink-300/35 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/6 w-10 h-10 bg-indigo-200/30 rounded-full animate-bounce delay-300"></div>
        
        {/* Mathematical Symbols */}
        <div className="absolute top-16 right-1/3 text-3xl text-purple-300/40 animate-float font-bold">∪</div>
        <div className="absolute bottom-32 left-1/5 text-2xl text-pink-300/40 animate-float delay-1000 font-bold">∩</div>
        <div className="absolute top-1/3 right-1/6 text-4xl text-blue-300/30 animate-pulse delay-500 font-bold">∈</div>
        <div className="absolute bottom-1/4 right-2/3 text-2xl text-green-300/40 animate-bounce delay-700 font-bold">⊆</div>
        
        {/* Additional Decorative Elements */}
        <div className="absolute top-3/4 left-2/3 w-14 h-14 border-4 border-yellow-200/30 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/6 left-2/3 w-18 h-18 border-2 border-purple-200/25 animate-pulse delay-300"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GamesTemplate;