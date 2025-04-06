'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      tabs,
      defaultTabId,
      onChange,
      variant = 'default',
      size = 'default',
    },
    ref
  ) => {
    const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
      setActiveTabId(tabId);
      onChange?.(tabId);
    };

    const getTabStyles = () => {
      const baseStyles = 'relative flex items-center justify-center';
      const sizeStyles = {
        default: 'px-4 py-2',
        sm: 'px-3 py-1.5 text-sm',
        lg: 'px-6 py-3 text-lg',
      }[size];

      switch (variant) {
        case 'pills':
          return cn(
            baseStyles,
            sizeStyles,
            'rounded-lg transition-colors',
            'hover:bg-white/5'
          );
        case 'underline':
          return cn(baseStyles, sizeStyles, 'border-b-2 border-transparent');
        default:
          return cn(
            baseStyles,
            sizeStyles,
            'border-b-2 border-transparent transition-colors'
          );
      }
    };

    const getIndicatorStyles = () => {
      switch (variant) {
        case 'pills':
          return 'absolute inset-0 bg-white/10 rounded-lg';
        case 'underline':
          return 'absolute bottom-0 left-0 right-0 h-0.5 bg-white';
        default:
          return 'absolute bottom-0 left-0 right-0 h-0.5 bg-white';
      }
    };

    return (
      <div ref={ref} className={cn('w-full space-y-4', className)}>
        <div
          role="tablist"
          className="relative flex items-center gap-1 border-b border-white/10"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                disabled={tab.disabled}
                className={cn(
                  getTabStyles(),
                  'relative text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
                  isActive
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-white'
                )}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="indicator"
                    className={getIndicatorStyles()}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={tab.id}
              hidden={tab.id !== activeTabId}
            >
              {tab.id === activeTabId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
Tabs.displayName = 'Tabs';

export { Tabs }; 