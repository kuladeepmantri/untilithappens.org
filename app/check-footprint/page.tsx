'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

const phases = [
  {
    id: 'discover',
    name: 'Discover',
    target: 'Map what is publicly exposed',
    duration: '10 min',
    checklist: [
      'Search your full name, old usernames, and primary emails.',
      'Run searches in Google, Bing, and DuckDuckGo.',
      'Save exact URLs of exposed records into one tracking doc.',
    ],
  },
  {
    id: 'prioritize',
    name: 'Prioritize',
    target: 'Focus on exploitable data first',
    duration: '8 min',
    checklist: [
      'Mark address, phone, DOB fragments, and family relations as critical.',
      'Flag workplace info tied to personal contact channels.',
      'Tag breached accounts linked to financial or primary email access.',
    ],
  },
  {
    id: 'remove',
    name: 'Remove',
    target: 'Reduce attack surface quickly',
    duration: '12 min',
    checklist: [
      'Submit data broker removal requests for critical records first.',
      'Disable discoverability by email/phone on social accounts.',
      'Set a 30-day recheck reminder for reappearing listings.',
    ],
  },
];

const exposureModels = [
  {
    key: 'email',
    label: 'email',
    placeholder: 'you@example.com',
    findings: [
      'Breach exposure and password reset hints',
      'Marketing profile segments and purchase history',
      'Broker records connecting identity + address',
    ],
  },
  {
    key: 'phone',
    label: 'phone',
    placeholder: '(555) 123-4567',
    findings: [
      'People-search listings with relatives and location history',
      'SIM swap targeting risk from published carrier metadata',
      'Scam pretext targeting through trusted contact spoofing',
    ],
  },
  {
    key: 'username',
    label: 'username',
    placeholder: 'old_handle_2018',
    findings: [
      'Cross-platform account correlation',
      'Archived profile and comment history',
      'Credential stuffing targeting from reused IDs',
    ],
  },
];

const tools = [
  { name: 'Have I Been Pwned', href: 'https://haveibeenpwned.com', note: 'Breach exposure checks by email' },
  { name: 'Mozilla Monitor', href: 'https://monitor.mozilla.org', note: 'Breach monitoring and alerts' },
  { name: 'Google Alerts', href: 'https://www.google.com/alerts', note: 'Name and handle tracking' },
  { name: 'JustDelete.me', href: 'https://justdelete.me', note: 'Account deletion reference index' },
  { name: 'EFF Cover Your Tracks', href: 'https://coveryourtracks.eff.org', note: 'Browser fingerprint exposure test' },
  { name: 'Google Privacy Checkup', href: 'https://myaccount.google.com/privacycheckup', note: 'Google account visibility controls' },
];

const scoreBoard = [
  { label: 'Initial audit session', value: '30 min' },
  { label: 'Critical removals first pass', value: '5-10 records' },
  { label: 'Recheck cycle', value: 'Every 30 days' },
];

export default function CheckFootprintPage() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);
  const [query, setQuery] = useState('');

  const phase = phases[phaseIndex];
  const model = exposureModels[modelIndex];

  const shouldShowFindings = useMemo(() => query.trim().length > 2, [query]);

  return (
    <div className="page-shell page-footprint">

      <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Footprint reduction lab</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Remove what attackers can weaponize
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Follow this three-phase workflow. You will discover exposed data, prioritize high-risk records, and reduce public attack surface.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {scoreBoard.map((item) => (
            <article key={item.label} className="story-card p-4">
              <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-band py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.95fr,1.2fr]">
          <div className="space-y-2">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Phase sequence</p>
            {phases.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPhaseIndex(index)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  index === phaseIndex
                    ? 'border-[#86d8ca]/70 bg-[#86d8ca]/12 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/74 hover:border-white/25 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-ui-mono text-[10px] uppercase tracking-[0.18em]">Phase {index + 1}</p>
                  <p className="text-xs text-white/58">{item.duration}</p>
                </div>
                <p className="mt-1 text-sm font-medium">{item.name}</p>
                <p className="mt-1 text-xs text-white/62">{item.target}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={phase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24 }}
              className="story-card p-6 md:p-8"
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Current phase</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">{phase.name}</h2>
                </div>
                <p className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">{phase.duration}</p>
              </div>

              <p className="mt-3 text-sm text-white/74">{phase.target}</p>
              <ol className="mt-4 space-y-2">
                {phase.checklist.map((item, index) => (
                  <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.15fr,1fr]">
        <div className="story-card p-6 md:p-8">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Exposure simulator</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">What one identifier can reveal</h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {exposureModels.map((item, index) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setModelIndex(index);
                  setQuery('');
                }}
                className={`rounded-md px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  modelIndex === index
                    ? 'bg-[#d7ab73] text-[#11191e]'
                    : 'border border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={model.placeholder}
            className="mt-4 w-full rounded-lg border border-white/20 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />

          <AnimatePresence mode="wait">
            {shouldShowFindings && (
              <motion.ul
                key={model.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 space-y-2"
              >
                {model.findings.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/76">
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="story-card p-6 md:p-8">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Trusted tools</p>
          <div className="mt-4 grid gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-3 transition hover:border-white/25 hover:bg-white/[0.12]"
              >
                <p className="text-sm font-medium text-white">{tool.name}</p>
                <p className="mt-1 text-xs text-white/65">{tool.note}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/protect"
            className="mt-5 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
          >
            next: harden your primary device
          </Link>
        </div>
      </section>

    </div>
  );
}
