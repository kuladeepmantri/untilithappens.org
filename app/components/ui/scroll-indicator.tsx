import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
      className="fixed left-1/2 -translate-x-1/2 bottom-12 md:bottom-16 flex flex-col items-center justify-center z-50 pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            y: [0, 4, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown className="w-4 h-4 text-white/40" strokeWidth={1.5} />
          <ChevronDown className="w-4 h-4 text-white/30" strokeWidth={1.5} />
          <ChevronDown className="w-4 h-4 text-white/20" strokeWidth={1.5} />
        </motion.div>
      </div>
    </motion.div>
  );
} 