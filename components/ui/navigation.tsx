'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  showFullNav?: boolean;
}

export function Navigation({ showFullNav = true }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => pathname === href;

  const navigationItems = [
    {
      href: '/',
      label: 'home.',
      description: 'Return to homepage'
    },
    {
      href: '/check-footprint',
      label: 'footprint.',
      description: 'See what the internet knows about you'
    },
    {
      href: '/protect',
      label: 'protect.',
      description: 'Personalized protection suggestions'
    },
    {
      href: '/real-stories',
      label: 'stories.',
      description: 'Learn from others\' experiences'
    },
    {
      href: '/learn',
      label: 'learn.',
      description: 'Simple steps to stay safe'
    }
  ];

  return (
    <>
      {/* Navigation with highest z-index */}
      <nav
        className={cn(
          'fixed top-0 right-0 w-full transition-all duration-300',
          isScrolled ? 'bg-theme/80 backdrop-blur-2xl h-16' : 'bg-transparent h-20'
        )}
        style={{ zIndex: 100 }}
      >
        <div className="container mx-auto px-6 h-full flex items-center">
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8 justify-center flex-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative px-3 py-2 transition-all',
                  isActive(item.href)
                    ? 'text-white/80'
                    : 'text-white/60 hover:text-white/80'
                )}
              >
                <div className="flex items-center">
                  <span className="font-medium text-base tracking-wide">{item.label}</span>
                </div>
                <div className="absolute left-0 right-0 -bottom-1 h-[1px] bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-black/80 text-sm text-white/60 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap backdrop-blur-lg border border-white/5">
                  {item.description}
                </div>
              </Link>
            ))}
            <div className="absolute right-6">
              <Link
                href="/get-help"
                className={cn(
                  'inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium tracking-wide',
                  'bg-white/10 text-white/90 hover:bg-white/15 rounded-lg transition-colors duration-200'
                )}
              >
                get help.
              </Link>
            </div>
          </div>

          {/* Mobile menu button - more minimal */}
          <div className="flex lg:hidden items-center justify-end flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4">
                <span
                  className={`absolute w-5 h-[1px] bg-white/90 transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45 top-2' : 'rotate-0 top-0'
                  }`}
                />
                <span
                  className={`absolute w-5 h-[1px] bg-white/90 transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100 top-2'
                  }`}
                />
                <span
                  className={`absolute w-5 h-[1px] bg-white/90 transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45 top-2' : 'rotate-0 top-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay with enhanced blur effect */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-xl"
            style={{ zIndex: 95 }}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-theme/30 backdrop-blur-2xl p-6 pt-24"
            >
              <div className="flex flex-col gap-3">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex flex-col gap-1.5 p-3 rounded-lg transition-all',
                        isActive(item.href)
                          ? 'bg-white/5 text-white/90'
                          : 'text-white/70 hover:bg-white/5'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium text-base tracking-wide">{item.label}</span>
                      </div>
                      <span className={cn(
                        "text-sm",
                        isActive(item.href) ? 'opacity-50' : 'opacity-40'
                      )}>
                        {item.description}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigationItems.length * 0.05 }}
                >
                  <Link
                    href="/get-help"
                    className="flex flex-col gap-1.5 p-3 bg-white/5 text-white/90 hover:bg-white/10 rounded-lg font-medium text-base tracking-wide mt-3 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>get help.</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </div>
                    <span className="text-sm opacity-50">
                      Get help for personalized support
                    </span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 