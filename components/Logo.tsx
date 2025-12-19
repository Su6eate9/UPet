
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16'
  };

  const iconSizeMap = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`aspect-square ${sizeMap[size]} bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3`}>
        <span className={`material-symbols-outlined text-white ${iconSizeMap[size]} font-bold`}>
          pets
        </span>
      </div>
      {showText && (
        <span className={`font-display font-[800] tracking-tighter ${size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-xl'} dark:text-white`}>
          <span className="text-primary">U</span>Pet
        </span>
      )}
    </div>
  );
};

export default Logo;
