import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ModuleIconProps {
  icon?: string;
  IconComponent?: LucideIcon;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ModuleIcon: React.FC<ModuleIconProps> = ({ 
  icon, 
  IconComponent, 
  alt = '', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-lg',
    md: 'w-8 h-8 text-2xl',
    lg: 'w-12 h-12 text-4xl'
  };

  if (IconComponent) {
    return <IconComponent className={`${sizeClasses[size]} ${className}`} />;
  }

  if (icon?.startsWith('./') || icon?.startsWith('/')) {
    return (
      <img
        src={icon}
        alt={alt}
        className={`${sizeClasses[size]} object-contain ${className}`}
        draggable={false}
      />
    );
  }

  return <span className={`${sizeClasses[size]} ${className}`}>{icon}</span>;
};

export default ModuleIcon;