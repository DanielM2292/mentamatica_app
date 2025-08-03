import React from 'react';

interface IconProps {
  src?: string;
  emoji?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  src,
  emoji,
  alt = '',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} object-contain ${className}`}
        draggable={false}
      />
    );
  }

  if (emoji) {
    return (
      <span className={`${sizeClasses[size]} flex items-center justify-center text-center ${className}`}>
        {emoji}
      </span>
    );
  }

  return null;
};