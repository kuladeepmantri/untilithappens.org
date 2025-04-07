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
  const [isProtectionPage, setIsProtectionPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if we're on a protection page
    const checkProtectionPage = () => {
      // Check if we're on a protection page by looking for the red background
      const hasRedBackground = document.querySelector('div[class*="bg-[#801336]"]') !== null;
      setIsProtectionPage(hasRedBackground);
    };

    handleScroll();
    handleResize();
    checkProtectionPage();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // For floating variant, always show on protection pages regardless of mobile
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`
          fixed z-50 flex items-center gap-2 transition-colors duration-200
          ${isMobile ? 'top-6 left-6' : 'top-8 left-8 text-sm md:text-base text-white/80 hover:text-white'}
        `}
      >
        <span className="text-lg">←</span>
        {!isMobile && <span className="font-medium tracking-wide">Back</span>}
      </motion.button>
    );
  }

  // For default variant, show on protection pages regardless of mobile
  return (
    <div 
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'top-[4.5rem] bg-gradient-to-b from-[#801336]/80 to-transparent backdrop-blur-sm' 
          : isMobile
            ? 'top-16 bg-gradient-to-b from-[#801336]/80 to-transparent backdrop-blur-sm'
            : 'top-24'
      } ${className}`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.button
          onClick={onClick}
          className={`group flex items-center gap-2 py-4 text-white/60 hover:text-white transition-all duration-200 ${
            isMobile ? 'text-sm' : ''
          }`}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">←</span>
          {!isMobile && <span className="font-medium tracking-wide">Back</span>}
        </motion.button>
      </div>
    </div>
  );
} 