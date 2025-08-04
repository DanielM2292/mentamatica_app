import React from "react";

export function DashboardProgressSkeleton() {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-lg max-w-4xl mx-auto mb-8 animate-pulse-slow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
        <div className="h-6 bg-gray-300 rounded w-48"></div>
      </div>
      
      <div className="bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-full w-3/4 rounded-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3].map((star) => (
                  <div key={star} className="w-3 h-3 bg-gray-200 rounded-full"></div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-300 h-2 rounded-full w-1/3"></div>
                </div>
                <div className="w-8 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}