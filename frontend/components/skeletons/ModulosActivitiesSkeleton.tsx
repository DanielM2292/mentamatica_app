import React from "react";

export function ModulosActivitiesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg relative overflow-hidden animate-pulse-opacity"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute top-2 right-2 flex gap-1 opacity-30">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-pink-400 rounded-full animate-pulse-opacity"></div>
            ))}
          </div>

          <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-2">
                <div className="h-5 bg-pink-200 rounded-full w-20 animate-pulse-opacity"></div>
                <div className="h-5 bg-yellow-200 rounded-full w-16 animate-pulse-opacity"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse-opacity"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse-opacity"></div>
            </div>
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse-opacity"></div>
              ))}
            </div>
            <div className="h-8 bg-pink-300 rounded-lg w-20 animate-pulse-opacity"></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shine"></div>
        </div>
      ))}
    </div>
  );
}