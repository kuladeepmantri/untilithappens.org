'use client';

import { motion } from 'framer-motion';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/20 via-black/10 to-transparent">
      <div className="max-w-screen-xl mx-auto">
        <motion.button
          onClick={onClick}
          className="group flex items-center gap-3 px-6 py-8 text-white/80 hover:text-white transition-all duration-300"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300">
            <span className="text-2xl transform -translate-x-px">←</span>
          </span>
          <span className="text-base font-medium tracking-wide">Back</span>
        </motion.button>
      </div>
    </div>
  );
}; 