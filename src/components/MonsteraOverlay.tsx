import React from 'react';

interface MonsteraOverlayProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MonsteraOverlay({ className = '', size = 'md' }: MonsteraOverlayProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`absolute bottom-4 right-4 opacity-20 hover:opacity-30 transition-opacity duration-300 ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-jonquil"
      >
        {/* Monstera leaf shape */}
        <path
          d="M20 30 Q30 20 40 25 Q50 30 60 25 Q70 20 80 30 Q85 40 80 50 Q75 60 70 55 Q65 50 60 55 Q55 60 50 55 Q45 50 40 55 Q35 60 30 55 Q25 50 20 55 Q15 60 10 50 Q15 40 20 30 Z"
          fill="currentColor"
          opacity="0.8"
        />
        
        {/* Leaf holes/patterns */}
        <circle cx="35" cy="35" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="45" cy="40" r="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="55" cy="35" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="65" cy="40" r="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        
        {/* Stem */}
        <path
          d="M50 60 Q50 70 50 80"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />
        
        {/* Additional smaller leaves */}
        <path
          d="M15 45 Q20 40 25 45 Q30 50 25 55 Q20 60 15 55 Q10 50 15 45 Z"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M75 45 Q80 40 85 45 Q90 50 85 55 Q80 60 75 55 Q70 50 75 45 Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    </div>
  );
} 