import React from "react";

export function ModulosHeaderSkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b p-3 sm:p-4 relative z-10">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse-opacity"></div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-pink-100 rounded-xl animate-pulse-opacity"></div>
            <div className="min-w-0 flex-1">
              <div className="h-6 sm:h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-md w-3/4 animate-pulse-opacity"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-1 animate-pulse-opacity"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
            <div className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse-opacity"></div>
            <div className="h-4 bg-yellow-200 rounded w-6 animate-pulse-opacity"></div>
          </div>
          <div className="w-8 h-8 bg-purple-100 rounded-full animate-pulse-opacity"></div>
        </div>
      </div>
    </div>
  );
}