'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteNavItems } from '@/lib/site-data';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const primaryNavItems = useMemo(
    () => siteNavItems.filter((item) => item.primary),
    []
  );

  const secondaryItems = useMemo(
    () => siteNavItems.filter((item) => !item.primary),
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 z-[100] border-b transition-all duration-300',
          isScrolled
            ? 'border-white/10 bg-[#07171b]/88 backdrop-blur-xl'
            : 'border-transparent bg-gradient-to-b from-[#07171b]/70 to-transparent'
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-base font-semibold tracking-tight text-white">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3ecad8]" />
              until it happens.
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative py-2 text-sm transition-colors',
                  isActive(item.href) ? 'text-white' : 'text-white/70 hover:text-white'
                )}
              >
                  <span>{item.label}</span>
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#3ecad8] to-[#f95f8f] transition-transform duration-300',
                    isActive(item.href) && 'scale-x-100'
                  )}
                />
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden w-max -translate-x-1/2 rounded-md border border-white/10 bg-black/70 px-2 py-1 text-xs text-white/70 group-hover:block">
                  {item.description}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors',
                  isActive(item.href) ? 'text-white' : 'text-white/65 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-help"
              className="inline-flex items-center rounded-lg border border-white/20 bg-gradient-to-r from-[#f95f8f]/30 to-[#7a2f61]/35 px-4 py-2 text-sm font-medium text-white/95 transition hover:border-white/40 hover:from-[#f95f8f]/40 hover:to-[#7a2f61]/45"
            >
              get help.
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="relative z-[110] inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <span
              className={cn(
                'absolute h-[1.5px] w-5 bg-white transition-transform duration-300',
                isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[6px]'
              )}
            />
            <span
              className={cn(
                'absolute h-[1.5px] w-5 bg-white transition-opacity duration-300',
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={cn(
                'absolute h-[1.5px] w-5 bg-white transition-transform duration-300',
                isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[6px]'
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-black/45 backdrop-blur-lg lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-white/10 bg-[#08191d]/95 px-6 pt-24"
            >
              <div className="space-y-3">
                {siteNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'block rounded-xl border px-4 py-3 transition-colors',
                      isActive(item.href)
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/10'
                    )}
                  >
                    <p className="text-base font-medium">{item.label}</p>
                    <p className="mt-1 text-sm text-white/60">{item.description}</p>
                  </Link>
                ))}

                <Link
                  href="/get-help"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-3 flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white"
                >
                  <span>get help.</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
