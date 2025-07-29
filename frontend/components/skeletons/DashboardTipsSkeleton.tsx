import React from "react";

export function DashboardTipsSkeleton() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-purple-300 rounded-full"></div>
        <div className="h-6 bg-gray-300 rounded w-32"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white/70 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-5 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}