'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  onClick: () => void;
  variant?: 'default' | 'floating';
  className?: string;
}

export function BackButton({ onClick, variant = 'default', className = '' }: BackButtonProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (variant === 'floating') {
    return (
      <motion.button
        onClick={onClick}
        className={`fixed ${isMobile ? 'top-4 left-4' : 'top-8 left-8'} z-50 p-3 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-200 group ${className}`}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2">
          <svg 
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm text-white/60 group-hover:text-white transition-colors font-medium">
            Back
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <div 
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'top-[4.5rem] bg-gradient-to-b from-[#801336]/80 to-transparent backdrop-blur-sm' 
          : 'top-24'
      } ${className}`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.button
          onClick={onClick}
          className="group flex items-center gap-2 py-4 text-white/60 hover:text-white transition-all duration-200"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg 
            className="w-5 h-5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium tracking-wide">
            Back to Device Selection
          </span>
        </motion.button>
      </div>
    </div>
  );
} 