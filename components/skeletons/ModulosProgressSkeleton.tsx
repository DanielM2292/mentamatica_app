import React from "react";

export function ModulosProgressSkeleton() {
  return (
    <div className="mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
      <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto mb-4 animate-pulse-opacity"></div>
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 h-full rounded-full w-1/3 animate-pulse-opacity"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse-opacity"></div>
    </div>
  );
}