'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GuideFlow } from '@/components/site/guide-flow';

const auditSteps = [
  {
    title: 'Search your core identifiers',
    detail: 'Check full name, recurring usernames, primary emails, and old phone numbers across multiple search engines.',
  },
  {
    title: 'Check known breach exposure',
    detail: 'Use trusted breach tools, then rotate passwords and recovery factors for exposed accounts.',
  },
  {
    title: 'Prioritize data broker removals',
    detail: 'Start with listings that expose home address, direct phone number, and family relationships.',
  },
  {
    title: 'Lock social discoverability',
    detail: 'Reduce searchable profile fields, follower visibility, and location metadata in old posts.',
  },
];

const scenarios = [
  {
    key: 'email',
    label: 'email',
    placeholder: 'Type an email...',
    exposures: [
      'Data brokers: name + address history',
      'Marketing lists: shopping and profile segments',
      'Breach dumps: leaked credentials and reset hints',
    ],
  },
  {
    key: 'phone',
    label: 'phone',
    placeholder: 'Type a phone number...',
    exposures: [
      'People search pages: relatives and location ties',
      'Carrier metadata: provider and region clues',
      'Fraud targeting: SIM-swap social engineering prep',
    ],
  },
  {
    key: 'username',
    label: 'username',
    placeholder: 'Type a username...',
    exposures: [
      'Cross-platform account correlation',
      'Public comments and archived profile data',
      'Credential stuffing targeting from reused IDs',
    ],
  },
];

const tools = [
  { name: 'Have I Been Pwned', href: 'https://haveibeenpwned.com', note: 'Email breach exposure checks' },
  { name: 'Mozilla Monitor', href: 'https://monitor.mozilla.org', note: 'Breach alerts and tracking' },
  { name: 'Google Alerts', href: 'https://www.google.com/alerts', note: 'Name/handle monitoring' },
  { name: 'EFF Cover Your Tracks', href: 'https://coveryourtracks.eff.org', note: 'Fingerprinting visibility' },
  { name: 'JustDelete.me', href: 'https://justdelete.me', note: 'Account deletion index' },
  { name: 'Google Privacy Checkup', href: 'https://myaccount.google.com/privacycheckup', note: 'Account privacy controls' },
];

export default function CheckFootprintPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [query, setQuery] = useState('');
  const activeScenario = scenarios[scenarioIndex];

  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute left-10 top-44 h-72 w-72 rounded-full bg-[#76c6bb]/16 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-10 top-60 h-72 w-72 rounded-full bg-[#d7ab73]/14 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-14 pt-14 md:pt-20">
        <span className="guide-chip">Digital footprint guide</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Find what can be weaponized
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          This is not a vanity search. The goal is to remove data that helps attackers impersonate you, recover accounts, or target your family.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-14 lg:grid-cols-[1.2fr,1fr]">
        <div className="story-card panel-gradient p-6 md:p-8">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Interactive demo</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">What one identifier can reveal</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.key}
                type="button"
                onClick={() => {
                  setScenarioIndex(index);
                  setQuery('');
                }}
                className={`rounded-md px-3 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  scenarioIndex === index
                    ? 'bg-[#d7ab73] text-[#11191e]'
                    : 'border border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={activeScenario.placeholder}
              className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
            />
          </div>

          <AnimatePresence mode="wait">
            {query.length > 2 && (
              <motion.div
                key={activeScenario.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-4 space-y-2"
              >
                {activeScenario.exposures.map((item) => (
                  <p key={item} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/75">
                    {item}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="story-card p-6 md:p-8">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Priority removals</p>
          <div className="mt-4 space-y-2 text-sm text-white/76">
            <p className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">Home address and direct phone numbers</p>
            <p className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">Date-of-birth fragments and family associations</p>
            <p className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">Work details tied to personal contact channels</p>
            <p className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">Old usernames reused on sensitive accounts</p>
          </div>
          <Link
            href="/protect"
            className="mt-5 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
          >
            next: lock accounts and devices
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Audit sequence</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {auditSteps.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08 }}
                className="story-card p-6"
              >
                <p className="font-ui-mono text-xs uppercase tracking-[0.15em] text-white/55">Step 0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/74">{step.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-semibold text-white">Recommended tools</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="story-card p-4 transition hover:border-white/30 hover:bg-black/35"
            >
              <p className="text-sm font-medium text-white">{tool.name}</p>
              <p className="mt-1 text-xs text-white/66">{tool.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
