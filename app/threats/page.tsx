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
    id: 'qr-spearphishing',
    name: 'QR-code spearphishing in email',
    signal: 'Unexpected QR image, urgent verification language, login or file request',
    pattern:
      'FBI reported threat actors embedding QR codes in spearphishing emails to redirect users into credential-harvesting flows.',
    latest: 'FBI Cyber Alert published January 8, 2026',
    impact: 'Credential theft and mailbox/account takeover',
    actionWindow: 'Before scanning',
    defense: [
      'Do not scan QR codes from unexpected email messages.',
      'Open the official service directly from your own bookmark or manually typed URL.',
      'Forward suspicious message to security/helpdesk and then report phishing.',
    ],
    drill: [
      'Pause before scanning and inspect sender/domain carefully.',
      'Open the destination manually without using the QR code.',
      'Report and delete after preserving evidence.',
    ],
    sourceLabel: 'FBI: QR codes used in spearphishing',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2026/threat-actors-employing-qr-codes-to-deliver-spearphishing-emails-to-state-and-federal-government-employees',
  },
  {
    id: 'file-share-lures',
    name: 'Malicious file-sharing lures',
    signal: 'Unfamiliar file-sharing invite with urgency and a login prompt',
    pattern:
      'FBI warned that threat actors are sending weaponized file-sharing links designed to steal credentials and stage follow-on compromise.',
    latest: 'FBI Cyber Alert published January 15, 2026',
    impact: 'Initial access into email, collaboration suites, and internal systems',
    actionWindow: 'First click decision',
    defense: [
      'Never authenticate through unsolicited file-share links.',
      'Verify request context with sender through a second trusted channel.',
      'Open the official workspace directly instead of clicking the message link.',
    ],
    drill: [
      'Validate sender identity and business context.',
      'Open official platform manually and check for the file there.',
      'Escalate suspicious invitations to security/reporting channels.',
    ],
    sourceLabel: 'FBI: malicious file-sharing links',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2026/threat-actors-are-sending-malicious-file-sharing-links-to-federal-and-state-government-employees',
  },
  {
    id: 'account-takeover',
    name: 'Financial account takeover fraud',
    signal: 'Unexpected MFA prompts, account resets, or support outreach you did not initiate',
    pattern:
      'FBI warned financial services about active account takeover campaigns with significant reported victim losses.',
    latest: 'FBI Cyber Alert published November 25, 2025',
    impact: 'Direct financial theft and lockout of legitimate account owner',
    actionWindow: 'First 5 minutes',
    defense: [
      'Lock down the account through official provider channels immediately.',
      'Reset password from a trusted device and revoke unknown sessions/tokens.',
      'Call provider fraud line using verified contact details from official site/app.',
    ],
    drill: [
      'Confirm whether sign-in attempts were yours or unauthorized.',
      'Force sign-out across sessions and rotate credentials.',
      'Document IDs/timestamps and submit incident reports quickly.',
    ],
    sourceLabel: 'FBI: account takeover fraud alert',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2025/the-fbi-warns-financial-services-about-customer-account-takeover-fraud-targeting-u-s-financial-sector',
  },
  {
    id: 'ic3-impersonation',
    name: 'Fake recovery agents (IC3 impersonation)',
    signal: 'Claim that funds were recovered, asks for payment or identity packet',
    pattern:
      'FBI documented criminals impersonating IC3 contacts to target previous fraud victims with secondary scams.',
    latest: 'FBI PSA I-041825-PSA (April 18, 2025)',
    impact: 'Secondary victimization and identity data theft',
    actionWindow: 'Before any reply',
    defense: [
      'IC3 does not request payment to release recovered funds.',
      'Use only official .gov channels entered manually.',
      'Do not submit sensitive identity packets to unsolicited outreach.',
    ],
    drill: [
      'Stop and verify domain/contact authenticity.',
      'Cross-check through official IC3/FBI pages.',
      'Report impersonation attempt immediately.',
    ],
    sourceLabel: 'FBI: scammers impersonating IC3',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-warns-of-scammers-impersonating-the-ic3',
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

      <section className="border-y border-white/10 bg-white/[0.03] py-12">
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
                <div className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Latest advisory</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.latest}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Impact</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.impact}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Action window</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.actionWindow}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Immediate actions</p>
                  <ul className="mt-2 space-y-2">
                    {scenario.defense.map((item) => (
                      <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">30-second drill</p>
                  <ol className="mt-2 space-y-2">
                    {scenario.drill.map((item, index) => (
                      <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
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
