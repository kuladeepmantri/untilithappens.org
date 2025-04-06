'use client';

import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  className?: string;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      side = 'top',
      align = 'center',
      sideOffset = 4,
      alignOffset = 0,
      delayDuration = 200,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsOpen(true), delayDuration);
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutId);
      setIsOpen(false);
    };

    const getPosition = () => {
      switch (side) {
        case 'top':
          return {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 10 },
            className: 'bottom-full mb-2',
          };
        case 'right':
          return {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -10 },
            className: 'left-full ml-2',
          };
        case 'bottom':
          return {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: 'top-full mt-2',
          };
        case 'left':
          return {
            initial: { opacity: 0, x: 10 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 10 },
            className: 'right-full mr-2',
          };
      }
    };

    const position = getPosition();
    const alignmentClass = {
      start: 'start-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'end-0',
    }[align];

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={position.initial}
              animate={position.animate}
              exit={position.exit}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 max-w-xs px-2 py-1 text-xs text-white bg-black rounded shadow-lg pointer-events-none whitespace-nowrap',
                position.className,
                alignmentClass
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';

export { Tooltip }; 