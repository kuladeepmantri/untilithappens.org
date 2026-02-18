'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { emergencyResources, sourceIndex, verifiedNotes } from '@/lib/site-data';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const quickActions = [
  {
    title: 'Map your exposed data',
    description: 'Run a structured footprint audit and remove high-risk public data first.',
    href: '/check-footprint',
    cta: 'Start audit',
    color: 'from-[#76c6bb]/28 to-[#355d6d]/36',
  },
  {
    title: 'Harden your devices',
    description: 'Apply platform-specific controls that lower takeover and ransomware risk.',
    href: '/protect',
    cta: 'Open guides',
    color: 'from-[#9ebac4]/22 to-[#45596a]/34',
  },
  {
    title: 'Understand current threats',
    description: 'Use scenario-based warning signs before responding to messages or calls.',
    href: '/threats',
    cta: 'View threats',
    color: 'from-[#d7ab73]/22 to-[#5f452b]/35',
  },
  {
    title: 'Know where to report fast',
    description: 'Move from panic to action with official reporting channels and evidence prep.',
    href: '/report',
    cta: 'Report now',
    color: 'from-[#87a29d]/24 to-[#5a4430]/33',
  },
];

export default function Home() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-[#76c6bb]/17 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-0 top-44 h-72 w-72 rounded-full bg-[#d7ab73]/15 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-14 md:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr,1fr]">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12 }}
            className="space-y-8"
          >
            <motion.span variants={reveal} className="guide-chip">
              Human-first cyber guidance
            </motion.span>

            <motion.h1 variants={reveal} className="max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl lg:text-7xl">
              Learn before crisis.
              <span className="block text-white/78">Act faster during one.</span>
            </motion.h1>

            <motion.p variants={reveal} className="max-w-2xl text-lg leading-relaxed text-white/78 md:text-xl">
              We guide people step-by-step with real-world incident patterns, practical controls, and official reporting
              paths. The journey is connected end-to-end so you always know the next action.
            </motion.p>

            <motion.div variants={reveal} className="flex flex-wrap gap-3">
              <Link
                href="/threats"
                className="rounded-lg bg-[#d7ab73] px-5 py-3 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
              >
                start guided path
              </Link>
              <Link
                href="/get-help"
                className="rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
              >
                I need help now
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="story-card panel-gradient p-6 md:p-8"
          >
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Real-world notes</p>
            <div className="mt-4 space-y-4">
              {verifiedNotes.map((note, index) => (
                <motion.div
                  key={note.metric}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="rounded-xl border border-white/15 bg-black/25 p-4"
                >
                  <p className="text-2xl font-semibold text-white">{note.metric}</p>
                  <p className="mt-2 text-sm text-white/72">{note.detail}</p>
                  <div className="mt-3 text-xs text-white/55">
                    <span>{note.asOf}</span>
                    <span className="mx-2">|</span>
                    <Link
                      href={note.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white/90"
                    >
                      {note.sourceLabel}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/25 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Guided actions</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">What to do first</h2>
            </div>
            <Link href="/learn" className="text-sm text-white/70 underline underline-offset-4 hover:text-white">
              follow full training flow
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
                className={`story-card bg-gradient-to-br ${item.color} p-6`}
              >
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/78">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex rounded-md border border-white/20 px-4 py-2 text-sm text-white/92 transition hover:bg-white/10"
                >
                  {item.cta}
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.5fr,1fr]">
          <div className="story-card panel-gradient p-6 md:p-8">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">If something happened today</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Emergency channels</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/74">
              Preserve evidence first: screenshot messages, copy transaction IDs, collect email headers, and keep a timeline.
              Then escalate through the right agency.
            </p>

            <div className="mt-6 grid gap-3">
              {emergencyResources.map((resource) => (
                <Link
                  key={resource.name}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/15 bg-black/25 p-4 transition hover:border-white/30 hover:bg-black/35"
                >
                  <p className="text-sm font-medium text-white">{resource.name}</p>
                  <p className="mt-1 text-sm text-white/66">{resource.purpose}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="story-card p-6 md:p-8">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Primary sources</p>
            <div className="mt-4 space-y-3">
              {sourceIndex.map((source) => (
                <Link
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
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
