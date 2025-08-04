import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlaceholderProps {
  title?: string;
  onClick?: () => void;
  className?: string;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  title = "VIDEO EXPLICATIVO",
  onClick,
  className = ""
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative bg-gradient-to-br from-yellow-100 to-orange-100 
        rounded-3xl border-4 border-gray-800 p-8
        flex flex-col items-center justify-center
        min-h-[300px] cursor-pointer group
        hover:from-yellow-200 hover:to-orange-200
        transition-all duration-300
        ${className}
      `}
    >
      <div className="absolute inset-4 border-2 border-dashed border-gray-400 rounded-2xl"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Play className="w-8 h-8 text-gray-700 ml-1" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};