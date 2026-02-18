'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { emergencyResources, sourceIndex, verifiedNotes } from '@/lib/site-data';

const pathPreview = [
  { step: '01', title: 'Read what threat is active', page: '/threats', eta: '8 min' },
  { step: '02', title: 'Check what data is exposed', page: '/check-footprint', eta: '12 min' },
  { step: '03', title: 'Harden your current device', page: '/protect', eta: '15 min' },
  { step: '04', title: 'Practice response habits', page: '/learn', eta: '10 min' },
];

const startCards = [
  {
    title: 'I got a suspicious message',
    detail: 'Open the threat briefing and follow the response stages one by one.',
    href: '/threats',
    cta: 'Open threat briefing',
  },
  {
    title: 'I think an account is compromised',
    detail: 'Start containment and reporting flow with first-hour priorities.',
    href: '/get-help',
    cta: 'Open first-hour response',
  },
  {
    title: 'I want prevention now',
    detail: 'Run an exposure audit and lock down your primary platform.',
    href: '/check-footprint',
    cta: 'Start prevention track',
  },
];

export default function Home() {
  return (
    <div className="page-shell page-home">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="guide-chip">practical cybersecurity guidance</span>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-7xl">
              Start calm.
              <span className="block text-white/78">Move step by step.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/78 md:text-xl">
              Until It Happens teaches cybersecurity in a guided sequence for people without security background. You always
              see what to do now, what to avoid, and what to do next.
            </p>
            <p className="max-w-2xl text-sm text-white/62">
              References on this site are pinned to official sources available on February 18, 2026.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/threats" className="inline-flex items-center gap-2 rounded-lg bg-[#f0bc7f] px-5 py-3 text-sm font-medium text-[#161008]">
                start guided journey
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/get-help" className="rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10">
                I need help now
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="story-card p-6 md:p-8"
          >
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">How guidance works</p>
            <div className="mt-4 space-y-3">
              {pathPreview.map((item) => (
                <Link
                  key={item.step}
                  href={item.page}
                  className="block rounded-xl border border-white/12 bg-[#0f1823] p-4 transition hover:border-white/25"
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

      <section className="page-band py-14">
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06 }}
                className="story-card p-5"
              >
                <p className="text-2xl font-semibold text-white">{note.metric}</p>
                <p className="mt-2 text-sm text-white/74">{note.detail}</p>
                <p className="mt-3 text-xs text-white/58">{note.asOf}</p>
                <Link href={note.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs text-white/75 underline underline-offset-4 hover:text-white">
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
            <article key={card.title} className="story-card p-6">
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm text-white/75">{card.detail}</p>
              <Link href={card.href} className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10">
                {card.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-band py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.3fr,1fr]">
          <div className="story-card p-6 md:p-8">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">If something happened today</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Official channels</h2>
            <p className="mt-3 text-sm text-white/72">Preserve evidence first, then report through the correct channel to avoid delays.</p>
            <div className="mt-5 grid gap-3">
              {emergencyResources.map((resource) => (
                <Link key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/12 bg-[#0f1823] p-4 transition hover:border-white/25">
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
                <Link key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="block rounded-lg border border-white/10 px-3 py-2 text-sm text-white/75 transition hover:border-white/25 hover:text-white">
                  {source.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
