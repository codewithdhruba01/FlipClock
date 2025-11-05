'use client';

import { useState, useEffect } from 'react';

interface FlipDigitProps {
  value: string;
  theme: 'light' | 'dark';
}

export default function FlipDigit({ value, theme }: FlipDigitProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [value, currentValue]);

  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-800' : 'border-gray-300';
  const shadowColor = theme === 'dark' ? 'shadow-black/60' : 'shadow-gray-500/30';
  const accentColor = theme === 'dark' ? 'bg-black/40' : 'bg-white/40';

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <div
        className={`w-16 h-24 sm:w-20 sm:h-32 md:w-28 md:h-40 lg:w-32 lg:h-48 rounded-2xl ${bgColor} ${shadowColor} shadow-2xl overflow-hidden border-4 ${borderColor}`}
        style={{
          boxShadow: `inset 0 0 20px ${theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        <div className={`absolute inset-0 flex items-center justify-center ${textColor} text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-none`}>
          <div
            style={{
              animation: isFlipping ? 'flip 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none',
              transformStyle: 'preserve-3d',
            }}
          >
            {currentValue}
          </div>
        </div>

        <div className={`absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 ${
          theme === 'dark' ? 'bg-black' : 'bg-gray-400'
        }`} />

        <div
          className={`absolute top-0 left-0 right-0 bottom-1/2 ${
            theme === 'dark' ? 'bg-gradient-to-b from-transparent via-transparent to-black/20' : 'bg-gradient-to-b from-transparent via-transparent to-black/10'
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 top-1/2 ${
            theme === 'dark' ? 'bg-gradient-to-t from-transparent via-transparent to-black/20' : 'bg-gradient-to-t from-transparent via-transparent to-black/10'
          }`}
        />
      </div>

      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg) rotateZ(0deg);
            opacity: 1;
          }
          25% {
            transform: rotateX(-45deg) rotateZ(0deg);
          }
          50% {
            transform: rotateX(-90deg) rotateZ(0deg);
            opacity: 0.3;
          }
          75% {
            transform: rotateX(-45deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(0deg) rotateZ(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
