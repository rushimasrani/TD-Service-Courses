import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 40,
  alt = "TechDefends Logo"
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center flex-shrink-0 bg-white rounded-xl p-1 shadow-sm border border-slate-100/60 overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/assets/techdefends-logo.png"
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain block"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default Logo;