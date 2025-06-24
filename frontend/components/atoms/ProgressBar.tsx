'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SynapseProgressBarProps {
  progress: number;
  label?: string;
}

export function ProgressBar({ progress, label = 'Progreso actual' }: SynapseProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 1,
        ease: "power2.out"
      });
    }
  }, [progress]);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">{label}</span>
        <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
