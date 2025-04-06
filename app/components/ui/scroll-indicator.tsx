import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 10) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? [0.5, 1, 0.5] : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{
        duration: isVisible ? 2 : 0.3,
        repeat: isVisible ? Infinity : 0,
        ease: "easeInOut"
      }}
      className="fixed left-1/2 -translate-x-1/2 bottom-12 flex flex-col items-center justify-center z-50 pointer-events-none"
    >
      <div className="text-white/50 text-[10px] tracking-widest uppercase text-center">Scroll</div>
      <motion.div 
        animate={{ 
          y: isVisible ? [0, 4, 0] : 0
        }}
        transition={{
          duration: 2,
          repeat: isVisible ? Infinity : 0,
          ease: "easeInOut"
        }}
        className="mt-2 w-[1px] h-6 bg-gradient-to-b from-transparent via-white/50 to-transparent"
      />
    </motion.div>
  );
} 