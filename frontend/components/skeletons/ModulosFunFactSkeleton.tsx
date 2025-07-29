import React from "react";

export function ModulosFunFactSkeleton() {
  return (
    <div className="mt-6 sm:mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-pink-100">
      <div className="h-5 bg-pink-200 rounded w-1/4 mx-auto mb-3 animate-pulse-opacity"></div>
      <div className="h-4 bg-pink-100 rounded w-full mb-1 animate-pulse-opacity"></div>
      <div className="h-4 bg-pink-100 rounded w-5/6 mx-auto animate-pulse-opacity"></div>
    </div>
  );
}