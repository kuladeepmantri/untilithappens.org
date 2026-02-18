'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { guideJourney } from '@/lib/site-data';

export function GuideFlow() {
  const pathname = usePathname();
  const currentIndex = guideJourney.findIndex((step) => step.href === pathname);

  if (currentIndex === -1) {
    return null;
  }

  const progress = (currentIndex / Math.max(guideJourney.length - 1, 1)) * 100;
  const previous = currentIndex > 0 ? guideJourney[currentIndex - 1] : null;
  const next = currentIndex < guideJourney.length - 1 ? guideJourney[currentIndex + 1] : null;

  return (
    <section className="relative border-y border-white/10 bg-black/35 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-white/55">Guided Path</p>
          <p className="text-xs text-white/60">
            Step {currentIndex + 1} of {guideJourney.length}
          </p>
        </div>

        <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#3ecad8] via-[#46b5ff] to-[#f95f8f]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>

        <div className="mt-5 grid gap-2 md:grid-cols-5">
          {guideJourney.map((step, index) => {
            const isCurrent = index === currentIndex;
            const isDone = index < currentIndex;

            return (
              <Link
                key={step.href}
                href={step.href}
                className={`rounded-lg border px-3 py-3 text-xs transition ${
                  isCurrent
                    ? 'border-[#4dd4e0] bg-[#4dd4e0]/15 text-white'
                    : isDone
                      ? 'border-white/20 bg-white/10 text-white/80'
                      : 'border-white/10 bg-white/[0.04] text-white/60 hover:border-white/20 hover:text-white/85'
                }`}
              >
                <p className="font-ui-mono text-[10px] uppercase tracking-[0.18em]">{step.short}</p>
                <p className="mt-1 font-medium">{step.title}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="max-w-xl text-sm text-white/70">{guideJourney[currentIndex].intent}</div>
          <div className="flex flex-wrap gap-2">
            {previous && (
              <Link
                href={previous.href}
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                Back: {previous.short}
              </Link>
            )}
            {next && (
              <Link
                href={next.href}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#052026] transition hover:bg-white/90"
              >
                Next: {next.short}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
