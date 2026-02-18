'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GuideFlow } from '@/components/site/guide-flow';
import { emergencyResources, sourceIndex, verifiedNotes } from '@/lib/site-data';

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const pathPreview = [
  { step: '01', title: 'Understand active scams', page: '/threats', eta: '8 min' },
  { step: '02', title: 'Audit exposed personal data', page: '/check-footprint', eta: '12 min' },
  { step: '03', title: 'Harden the device you use most', page: '/protect', eta: '15 min' },
  { step: '04', title: 'Practice repeatable security habits', page: '/learn', eta: '10 min' },
];

const startCards = [
  {
    title: 'I got a suspicious message',
    detail: 'Start with threat triage, verify sender identity, and avoid channel switching.',
    href: '/threats',
    cta: 'Open threat triage',
  },
  {
    title: 'My account may be compromised',
    detail: 'Run first-hour containment, preserve evidence, and start reporting correctly.',
    href: '/get-help',
    cta: 'Open incident playbook',
  },
  {
    title: 'I want prevention now',
    detail: 'Audit your footprint and harden your primary operating system this session.',
    href: '/check-footprint',
    cta: 'Start prevention track',
  },
];

export default function Home() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#76c6bb]/17 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-0 top-44 h-72 w-72 rounded-full bg-[#d7ab73]/15 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-14 pt-14 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.1 }} className="space-y-6">
            <motion.span variants={reveal} className="guide-chip">
              guided cybersecurity for non-experts
            </motion.span>

            <motion.h1 variants={reveal} className="max-w-4xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Learn what matters.
              <span className="block text-white/78">Respond with confidence.</span>
            </motion.h1>

            <motion.p variants={reveal} className="max-w-2xl text-lg leading-relaxed text-white/78 md:text-xl">
              This site walks you step-by-step through active threats, personal exposure checks, device hardening,
              and incident response using dated official sources.
            </motion.p>

            <motion.p variants={reveal} className="max-w-2xl text-sm text-white/62">
              All metrics and references are pinned to the latest official releases available on February 18, 2026.
            </motion.p>

            <motion.div variants={reveal} className="flex flex-wrap gap-3">
              <Link
                href="/threats"
                className="inline-flex items-center gap-2 rounded-lg bg-[#d7ab73] px-5 py-3 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
              >
                start guided journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/get-help"
                className="rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                I need help now
              </Link>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="story-card panel-gradient p-6 md:p-8"
          >
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Journey preview</p>
            <div className="mt-4 space-y-3">
              {pathPreview.map((item) => (
                <Link
                  key={item.step}
                  href={item.page}
                  className="block rounded-xl border border-white/12 bg-white/[0.06] p-4 transition hover:border-white/25 hover:bg-white/[0.12]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-ui-mono text-xs text-white/62">Step {item.step}</p>
                    <p className="text-xs text-white/62">{item.eta}</p>
                  </div>
                  <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.03] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Current signal board</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">What changed recently</h2>
            </div>
            <Link href="/threats" className="text-sm text-white/75 underline underline-offset-4 hover:text-white">
              open full threat briefing
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {verifiedNotes.map((note, index) => (
              <motion.article
                key={note.metric}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.07 }}
                className="story-card p-5"
              >
                <p className="text-2xl font-semibold text-white">{note.metric}</p>
                <p className="mt-2 text-sm text-white/74">{note.detail}</p>
                <p className="mt-3 text-xs text-white/58">{note.asOf}</p>
                <Link
                  href={note.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-xs text-white/75 underline underline-offset-4 hover:text-white"
                >
                  {note.sourceLabel}
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Choose your start point</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {startCards.map((card) => (
            <article key={card.title} className="story-card panel-gradient p-6">
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-white/75">{card.detail}</p>
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr,1fr]">
          <div className="story-card p-6 md:p-8">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">If something happened today</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Official channels</h2>
            <p className="mt-3 text-sm text-white/72">
              Preserve evidence first, then report through the correct channel to avoid delays.
            </p>
            <div className="mt-5 grid gap-3">
              {emergencyResources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/12 bg-white/[0.06] p-4 transition hover:border-white/25 hover:bg-white/[0.12]"
                >
                  <p className="text-sm font-medium text-white">{resource.name}</p>
                  <p className="mt-1 text-sm text-white/66">{resource.purpose}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="story-card p-6 md:p-8">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Primary references</p>
            <div className="mt-4 space-y-2">
              {sourceIndex.map((source) => (
                <Link
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-3 py-2 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
                >
                  {source.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
