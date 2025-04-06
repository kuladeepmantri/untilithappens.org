import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? [0.3, 0.6, 0.3] : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{
        duration: isVisible ? 2.5 : 0.3,
        repeat: isVisible ? Infinity : 0,
        ease: "easeInOut"
      }}
      className="fixed left-1/2 -translate-x-1/2 bottom-16 md:bottom-20 flex flex-col items-center justify-center z-50 pointer-events-none"
    >
      <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase text-center font-medium">
        Scroll
      </div>
      <motion.div 
        animate={{ 
          y: isVisible ? [0, 6, 0] : 0
        }}
        transition={{
          duration: 2.5,
          repeat: isVisible ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="mt-2 w-[1px] h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent"
      />
    </motion.div>
  );
} 