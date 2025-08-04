import React from "react";

export function DashboardModulesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-8">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <div
          key={item}
          className="relative min-h-[140px] bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl p-4 shadow-xl animate-pulse-module"
          style={{ animationDelay: `${item * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full animate-shine"></div>
          
          <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-3"></div>
          <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
          
          <div className="flex justify-center gap-1">
            {[1, 2, 3].map((star) => (
              <div key={star} className="w-4 h-4 bg-yellow-200 rounded-full animate-pulse" style={{ animationDelay: `${star * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}