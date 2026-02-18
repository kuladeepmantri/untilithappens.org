'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GuideFlow } from '@/components/site/guide-flow';

type ThreatScenario = {
  id: string;
  name: string;
  signal: string;
  pattern: string;
  latest: string;
  impact: string;
  actionWindow: string;
  defense: string[];
  drill: string[];
  sourceLabel: string;
  sourceUrl: string;
};

const scenarios: ThreatScenario[] = [
  {
    id: 'impersonation',
    name: 'AI text + voice impersonation',
    signal: 'Urgent request + pressure to switch apps + financial action',
    pattern:
      'Recent FBI alerts describe coordinated text and voice impersonation campaigns targeting trusted relationships.',
    latest: 'FBI PSA I-121925-PSA (December 19, 2025)',
    impact: 'High account and payment takeover risk',
    actionWindow: 'First 2 minutes',
    defense: [
      'Stop the live conversation and call back using a saved trusted number.',
      'Require a private verification phrase for money, passwords, or recovery requests.',
      'Do not use links delivered in first-contact messages.',
    ],
    drill: [
      'Pause and read the request out loud.',
      'Verify identity through your independent channel.',
      'Only continue after positive confirmation.',
    ],
    sourceLabel: 'FBI: senior U.S. officials impersonated',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-continue-to-be-impersonated-in-malicious-messaging-campaign',
  },
  {
    id: 'toll-smishing',
    name: 'Toll and payment text smishing',
    signal: '“Final notice” payment text with short deadline and unknown URL',
    pattern:
      'Field-office reports showed mass waves of fake toll payment texts that harvest card and account credentials.',
    latest: 'FBI Atlanta warning (March 14, 2025)',
    impact: 'Fast theft of payment details and identity data',
    actionWindow: 'Under 60 seconds',
    defense: [
      'Never pay tolls through text links.',
      'Open your official toll account manually in browser/app.',
      'Capture screenshot, block sender, then report.',
    ],
    drill: [
      'Inspect sender and domain mismatch.',
      'Open official portal manually.',
      'Report as phishing before deleting.',
    ],
    sourceLabel: 'FBI Atlanta: smishing text scam',
    sourceUrl:
      'https://www.fbi.gov/contact-us/field-offices/atlanta/news/fbi-atlanta-warns-of-smishing-text-message-scam',
  },
  {
    id: 'ic3-impersonation',
    name: 'Fake recovery agents (IC3 impersonation)',
    signal: 'Claim that lost funds were recovered, asks for fee or account proof',
    pattern:
      'FBI documented 100+ reports of criminals impersonating IC3 contacts to revictimize prior fraud victims.',
    latest: 'FBI PSA I-041825-PSA (April 18, 2025)',
    impact: 'Secondary victimization after initial fraud',
    actionWindow: 'Before any reply',
    defense: [
      'IC3 does not request payment or direct-message victims for fund release.',
      'Use only official .gov channels you typed yourself.',
      'Never submit full identity packets to unsolicited “recovery” outreach.',
    ],
    drill: [
      'Stop and verify domain authenticity.',
      'Cross-check contact through official IC3/FBI pages.',
      'Report impersonation attempt immediately.',
    ],
    sourceLabel: 'FBI: scammers impersonating IC3',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-warns-of-scammers-impersonating-the-ic3',
  },
  {
    id: 'ic3-spoof',
    name: 'Spoofed IC3 websites',
    signal: 'Site looks official but URL is not exact ic3.gov',
    pattern:
      'FBI warned actors were spoofing IC3 properties to harvest identity and financial information.',
    latest: 'FBI PSA I-091925-PSA (September 19, 2025)',
    impact: 'Identity theft + account compromise',
    actionWindow: 'Immediately on domain mismatch',
    defense: [
      'Type known government URLs manually; do not trust redirects.',
      'Validate the full domain before form submission.',
      'Avoid uploading SSN, account credentials, or ID documents to unverified pages.',
    ],
    drill: [
      'Check exact domain and TLS lock details.',
      'Compare against bookmarked official source.',
      'Abort and report lookalike page.',
    ],
    sourceLabel: 'FBI: threat actors spoofing IC3',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2025/threat-actors-spoofing-the-fbi-ic3-website-for-possible-malicious-activity',
  },
];

const triageStack = [
  { label: 'Verify identity independently', value: 'Always' },
  { label: 'Use official channels only', value: '.gov / known domains' },
  { label: 'Preserve evidence before cleanup', value: 'Screenshots + headers + IDs' },
];

export default function ThreatsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scenario = scenarios[activeIndex];

  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute left-4 top-36 h-64 w-64 rounded-full bg-[#76c6bb]/16 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-4 top-56 h-64 w-64 rounded-full bg-[#d7ab73]/15 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Threat command center</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Triage before you trust
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/76">
          Pick a live threat scenario and follow the exact response flow. This page is built to reduce panic and shorten decision time.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {triageStack.map((item) => (
            <article key={item.label} className="story-card p-4">
              <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b141a]/55 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.95fr,1.2fr]">
          <div className="space-y-2">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Choose threat pattern</p>
            {scenarios.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  index === activeIndex
                    ? 'border-[#86d8ca]/70 bg-[#86d8ca]/12 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/74 hover:border-white/25 hover:text-white'
                }`}
              >
                <p className="font-ui-mono text-[10px] uppercase tracking-[0.18em] text-white/55">Scenario {index + 1}</p>
                <p className="mt-1 text-sm font-medium">{item.name}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={scenario.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24 }}
              className="story-card panel-gradient p-6 md:p-8"
            >
              <h2 className="text-3xl font-semibold text-white">{scenario.name}</h2>
              <p className="mt-3 text-sm text-white/74">
                <span className="font-medium text-white/90">What to watch:</span> {scenario.signal}
              </p>
              <p className="mt-2 text-sm text-white/74">
                <span className="font-medium text-white/90">Pattern:</span> {scenario.pattern}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                  <p className="text-xs text-white/58">Latest advisory</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.latest}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                  <p className="text-xs text-white/58">Impact</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.impact}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                  <p className="text-xs text-white/58">Action window</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.actionWindow}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Immediate actions</p>
                  <ul className="mt-2 space-y-2">
                    {scenario.defense.map((item) => (
                      <li key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2 text-sm text-white/78">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">30-second drill</p>
                  <ol className="mt-2 space-y-2">
                    {scenario.drill.map((item, index) => (
                      <li key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2 text-sm text-white/78">
                        {index + 1}. {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <Link
                href={scenario.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm text-white/80 underline underline-offset-4 hover:text-white"
              >
                Source: {scenario.sourceLabel}
              </Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap gap-3">
          <Link href="/check-footprint" className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]">
            next: run exposure audit
          </Link>
          <Link href="/get-help" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/82 hover:bg-white/10">
            incident already active? open first-hour response
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
