"use client"

import React from "react";
import { DashboardStatsSkeleton } from "./DashboardStatsSkeleton";
import { DashboardModulesSkeleton } from "./DashboardModulesSkeleton";
import { DashboardProgressSkeleton } from "./DashboardProgressSkeleton";
import { DashboardTipsSkeleton } from "./DashboardTipsSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Skeleton */}
      <header className="relative z-10 flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm shadow-lg animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse-slow"></div>
          <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-200 rounded-full animate-bounce-gentle"></div>
          <div className="w-8 h-8 bg-yellow-300 rounded-full animate-bounce-gentle" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20 sm:pb-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-300 rounded-md w-3/4 mx-auto mb-4 animate-pulse-slow"></div>
          <div className="h-6 bg-gray-300 rounded-md w-1/2 mx-auto animate-pulse-slow" style={{ animationDelay: "0.2s" }}></div>
        </div>

        <DashboardStatsSkeleton />
        <DashboardModulesSkeleton />
        <DashboardProgressSkeleton />
        <DashboardTipsSkeleton />
      </main>

      {/* Animaciones CSS personalizadas */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 1.5s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}