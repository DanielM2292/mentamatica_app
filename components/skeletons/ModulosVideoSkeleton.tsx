import React from "react";

export function ModulosVideoSkeleton() {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-pink-100">
        <div className="text-center mb-4 sm:mb-6">
          <div className="h-6 sm:h-8 bg-pink-200 rounded-md w-1/3 mx-auto mb-2 animate-pulse-opacity"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse-opacity"></div>
        </div>

        <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-gray-300 p-4 sm:p-8 min-h-[200px] sm:min-h-[300px] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg animate-pulse-opacity">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full ml-1 animate-pulse-opacity"></div>
            </div>
          </div>

          {/* Elementos decorativos */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex gap-1 sm:gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-3 h-3 sm:w-6 sm:h-6 bg-pink-300 rounded-full animate-pulse-opacity"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}