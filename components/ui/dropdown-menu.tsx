'use client';

import { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface DropdownMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  items?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
  className?: string;
}

const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, items, align = 'start', className }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-dropdown]')) {
          setIsOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setActiveItemIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setActiveItemIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          event.preventDefault();
          if (activeItemIndex >= 0) {
            const item = items[activeItemIndex];
            if (!item.disabled) {
              if (item.onClick) item.onClick();
              if (item.href) window.location.href = item.href;
              setIsOpen(false);
            }
          }
          break;
      }
    };

    const alignmentClass = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    }[align];

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        data-dropdown
        onKeyDown={handleKeyDown}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          {trigger}
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border border-white/10 bg-black/90 p-1 shadow-lg backdrop-blur-sm',
                alignmentClass
              )}
            >
              {items.map((item, index) => {
                if (item.items) {
                  return (
                    <DropdownSubmenu
                      key={item.label}
                      item={item}
                      isActive={index === activeItemIndex}
                    />
                  );
                }

                return (
                  <DropdownMenuItem
                    key={item.label}
                    item={item}
                    isActive={index === activeItemIndex}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
DropdownMenu.displayName = 'DropdownMenu';

interface DropdownMenuItemProps {
  item: DropdownMenuItem;
  isActive?: boolean;
}

const DropdownMenuItem = ({ item, isActive }: DropdownMenuItemProps) => {
  const Component = item.href ? 'a' : 'button';

  return (
    <Component
      href={item.href}
      onClick={item.onClick}
      disabled={item.disabled}
      className={cn(
        'flex w-full items-center rounded-md px-2 py-1.5 text-sm transition-colors',
        isActive || item.disabled
          ? 'cursor-default'
          : 'cursor-pointer hover:bg-white/10',
        item.disabled ? 'opacity-50' : '',
        isActive ? 'bg-white/10' : ''
      )}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </Component>
  );
};

interface DropdownSubmenuProps {
  item: DropdownMenuItem;
  isActive?: boolean;
}

const DropdownSubmenu = ({ item, isActive }: DropdownSubmenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.items) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors',
          isActive ? 'bg-white/10' : 'hover:bg-white/10'
        )}
      >
        <span className="flex items-center">
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </span>
        <ChevronRight className="ml-2 h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full top-0 ml-1 min-w-[8rem] rounded-lg border border-white/10 bg-black/90 p-1 shadow-lg backdrop-blur-sm"
          >
            {item.items.map((subItem) => (
              <DropdownMenuItem key={subItem.label} item={subItem} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { DropdownMenu }; 