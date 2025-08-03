import React from "react";

export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white/90 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-10 animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}