import React from 'react';

export const MizaLogo: React.FC<{ className?: string }> = ({ className }) => {
  const darkColor = "#334155"; // slate-700
  const cyanColor = "#0e7490"; // cyan-700

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-end gap-3">
        {/* Logo Icon SVG */}
        <svg viewBox="0 0 280 80" className="h-12 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* M - Part 1 (Left Chevron) */}
          <path d="M0 60 L25 10 L50 60 L38 60 L25 35 L12 60 Z" fill={darkColor} />
          
          {/* M - Part 2 (Right Chevron) */}
          <path d="M45 60 L70 10 L95 60 L83 60 L70 35 L57 60 Z" fill={darkColor} />
          
          {/* I - Slash (Cyan) */}
          <path d="M105 60 L135 10 L150 10 L120 60 Z" fill={cyanColor} />
          
          {/* Z - Right Chevron */}
          <path d="M160 10 L200 35 L160 60 L160 48 L180 35 L160 22 Z" fill={darkColor} />
          
          {/* A - Up Chevron */}
          <path d="M210 60 L235 10 L260 60 L248 60 L235 35 L222 60 Z" fill={darkColor} />
        </svg>
      </div>
      
      {/* Bottom Lines and Text */}
      <div className="flex items-center mt-1 gap-3">
        <div className="flex flex-col gap-1">
            <div className="h-1.5 w-16 bg-slate-600"></div>
            <div className="h-1.5 w-16 bg-cyan-700"></div>
        </div>
        <span className="text-sm font-light tracking-[0.2em] text-slate-700 uppercase leading-none">
          École d'ingénieur·e·s
        </span>
      </div>
    </div>
  );
};