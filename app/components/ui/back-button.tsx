'use client';

import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <div className="sticky top-24 z-10 w-full">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.button
          onClick={onClick}
          className="text-white/60 hover:text-white transition-all duration-200"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
} 