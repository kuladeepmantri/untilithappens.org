'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const stories = [
  {
    title: 'Family voice-clone scam',
    summary: 'A caller sounded like a close relative and demanded immediate transfer support after a staged emergency.',
    failurePoint: 'No out-of-band verification channel under emotional pressure.',
    lesson: 'Use a private verification phrase and callback policy.',
  },
  {
    title: 'Payroll reroute through mailbox compromise',
    summary: 'An attacker hijacked internal email trust and changed payment destination details before payroll run.',
    failurePoint: 'No dual-approval checkpoint for payment destination updates.',
    lesson: 'Require verbal verification + second approver for all bank detail changes.',
  },
  {
    title: 'Public profile data to account takeover',
    summary: 'Open social metadata and reused handles made recovery questions and account pivots easy for attackers.',
    failurePoint: 'Overexposed profile identifiers and weak recovery setup.',
    lesson: 'Reduce profile metadata and harden recovery factors before incident day.',
  },
  {
    title: 'QR payment redirect fraud',
    summary: 'A tampered physical QR sticker redirected users to a fake payment domain harvesting credentials.',
    failurePoint: 'No URL preview/validation before submitting sensitive actions.',
    lesson: 'Preview every QR destination and navigate manually for high-risk payments.',
  },
];

export default function RealStoriesPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Incident narratives</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Stories that change behavior
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Each case highlights the exact moment where a verification checkpoint could have stopped loss.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07 }}
              className="story-card panel-gradient p-6"
            >
              <h2 className="text-2xl font-semibold text-white">{story.title}</h2>
              <p className="mt-3 text-sm text-white/76">{story.summary}</p>
              <p className="mt-3 text-sm text-white/70">
                <span className="font-medium text-white/88">Failure point:</span> {story.failurePoint}
              </p>
              <p className="mt-2 text-sm text-white/70">
                <span className="font-medium text-white/88">Lesson:</span> {story.lesson}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/get-help" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#08242d] hover:bg-white/90">
            next: incident response checklist
          </Link>
          <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            official reporting channels
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
