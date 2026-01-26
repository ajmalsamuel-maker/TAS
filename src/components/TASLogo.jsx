import React from 'react';
import { Check } from 'lucide-react';

export default function TASLogo({ size = 'md', showText = true }) {
  const sizes = {
    sm: { container: 'w-8 h-8', shield: 'w-5 h-5', badge: 'w-4 h-4', text: 'text-base' },
    md: { container: 'w-10 h-10', shield: 'w-6 h-6', badge: 'w-5 h-5', text: 'text-xl' },
    lg: { container: 'w-16 h-16', shield: 'w-10 h-10', badge: 'w-7 h-7', text: 'text-3xl' }
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg className={s.container} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0044CC" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          
          {/* Shield Shape */}
          <path
            d="M50 10 L85 25 L85 50 Q85 75 50 90 Q15 75 15 50 L15 25 Z"
            fill="url(#logoGradient)"
            stroke="white"
            strokeWidth="2"
          />
          
          {/* Network Nodes - Three circles forming triangle */}
          <circle cx="50" cy="35" r="5" fill="white" opacity="0.9" />
          <circle cx="38" cy="55" r="5" fill="white" opacity="0.9" />
          <circle cx="62" cy="55" r="5" fill="white" opacity="0.9" />
          
          {/* Connection Lines */}
          <line x1="50" y1="35" x2="38" y2="55" stroke="white" strokeWidth="2" opacity="0.7" />
          <line x1="50" y1="35" x2="62" y2="55" stroke="white" strokeWidth="2" opacity="0.7" />
          <line x1="38" y1="55" x2="62" y2="55" stroke="white" strokeWidth="2" opacity="0.7" />
          
          {/* Green verification circle with checkmark - top right, not overlapping triangle */}
          <circle cx="75" cy="18" r="16" fill="#4ADE80" />
          <circle cx="75" cy="18" r="16" fill="none" stroke="white" strokeWidth="2.3" />
          {/* Checkmark path */}
          <path d="M68 18 L72 24 L82 12" fill="none" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {showText && (
      <div>
        <span className={`${s.text} font-bold bg-gradient-to-r from-[#0044CC] to-cyan-600 bg-clip-text text-transparent`}>
          TAS
        </span>
      </div>
      )}
      </div>
  );
}