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

  const bgColor = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const borderColor = theme === 'dark' ? 'border-[#2a2a2a]' : 'border-gray-300';

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <div
        className={`w-14 h-20 sm:w-20 sm:h-28 md:w-28 md:h-40 lg:w-32 lg:h-48 
          rounded-xl ${bgColor} border ${borderColor} 
          shadow-[0_8px_20px_rgba(0,0,0,0.6)] overflow-hidden 
          flex items-center justify-center transition-all duration-300`}
      >
        <div
          className={`absolute inset-0 flex items-center justify-center ${textColor} 
            text-4xl sm:text-6xl md:text-8xl font-bold`}
          style={{
            animation: isFlipping ? 'flip 0.6s ease-in-out' : 'none',
          }}
        >
          {currentValue}
        </div>

        {/* Divider line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/40" />

        {/* Upper and lower gradient shading */}
        <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-gradient-to-b from-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

       {/* flip animation */}
      <style jsx>{`
        .digit {
          display: inline-block;
          transform-origin: center;
          transition: transform 0.6s ease-in-out;
        }

        .flip {
          animation: flipAnim 0.6s ease-in-out;
        }

        @keyframes flipAnim {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(-90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
}
