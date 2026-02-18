'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ScenarioStage = {
  id: string;
  label: string;
  summary: string;
  actions: string[];
};

type ThreatScenario = {
  id: string;
  name: string;
  signal: string;
  overview: string;
  latest: string;
  impact: string;
  actionWindow: string;
  avoid: string[];
  stageFlow: ScenarioStage[];
  sourceLabel: string;
  sourceUrl: string;
};

const scenarios: ThreatScenario[] = [
  {
    id: 'qr-spearphishing',
    name: 'QR-code spearphishing in email',
    signal: 'Unexpected QR image + urgent verification + account login prompt',
    overview:
      'Threat actors are embedding QR codes in phishing emails to bypass link filters and push users into credential-harvesting pages.',
    latest: 'FBI Cyber Alert published January 8, 2026',
    impact: 'Credential theft and mailbox/account takeover',
    actionWindow: 'Before scan',
    avoid: [
      'Do not scan unknown QR codes from email.',
      'Do not enter credentials after scanning unless destination was independently verified.',
      'Do not forward suspicious messages without context to colleagues.',
    ],
    stageFlow: [
      {
        id: 'observe',
        label: 'Stage 1: Observe',
        summary: 'Pause and inspect before interacting with the message.',
        actions: [
          'Check sender domain and compare it to known sender patterns.',
          'Look for urgency language, account-lock pressure, or MFA reset pressure.',
          'Treat embedded QR images as equivalent to unknown links.',
        ],
      },
      {
        id: 'verify',
        label: 'Stage 2: Verify',
        summary: 'Validate request through a trusted channel you control.',
        actions: [
          'Open the service from your own bookmark or typed URL.',
          'Check if the same request exists in the official portal.',
          'Call or message the sender through known contact details, not the email thread.',
        ],
      },
      {
        id: 'contain',
        label: 'Stage 3: Contain',
        summary: 'If interaction occurred, contain immediately.',
        actions: [
          'Reset credentials from a trusted device.',
          'Revoke active sessions and rotate MFA/recovery options.',
          'Notify security/helpdesk and preserve artifacts.',
        ],
      },
      {
        id: 'report',
        label: 'Stage 4: Report',
        summary: 'Report with evidence so pattern response can happen quickly.',
        actions: [
          'Capture screenshot, sender details, and timestamp.',
          'Submit through internal security and official reporting channels.',
          'Document user impact and accounts touched.',
        ],
      },
    ],
    sourceLabel: 'FBI: QR codes used in spearphishing',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2026/threat-actors-employing-qr-codes-to-deliver-spearphishing-emails-to-state-and-federal-government-employees',
  },
  {
    id: 'file-share-lures',
    name: 'Malicious file-sharing lures',
    signal: 'Unexpected file-share invite + login request + urgency',
    overview:
      'Threat actors are sending fake file-sharing notifications to steal credentials and create initial access into target environments.',
    latest: 'FBI Cyber Alert published January 15, 2026',
    impact: 'Email and collaboration-suite compromise',
    actionWindow: 'First click decision',
    avoid: [
      'Do not authenticate through unsolicited file-share links.',
      'Do not assume familiar branding means safe origin.',
      'Do not approve unknown OAuth/app prompts.',
    ],
    stageFlow: [
      {
        id: 'observe',
        label: 'Stage 1: Observe',
        summary: 'Treat unexpected file requests as suspicious by default.',
        actions: [
          'Inspect sender, tenant/workspace name, and URL destination.',
          'Look for language that bypasses normal process.',
          'Check whether the file request matches your role or active work.',
        ],
      },
      {
        id: 'verify',
        label: 'Stage 2: Verify',
        summary: 'Verify through known channels before opening.',
        actions: [
          'Open the official workspace directly and search for the file there.',
          'Confirm with sender through a separate trusted channel.',
          'Escalate unknown invitations to security.',
        ],
      },
      {
        id: 'contain',
        label: 'Stage 3: Contain',
        summary: 'Assume compromise if credentials were entered.',
        actions: [
          'Reset credentials and sign out from all sessions.',
          'Revoke suspicious tokens, app grants, and mailbox rules.',
          'Check forwarding rules and external sharing settings.',
        ],
      },
      {
        id: 'report',
        label: 'Stage 4: Report',
        summary: 'Report quickly to reduce lateral spread.',
        actions: [
          'Provide URL, sender data, and tenant identifiers.',
          'Document impacted users and potentially exposed docs.',
          'File official cyber report if material impact exists.',
        ],
      },
    ],
    sourceLabel: 'FBI: malicious file-sharing links',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2026/threat-actors-are-sending-malicious-file-sharing-links-to-federal-and-state-government-employees',
  },
  {
    id: 'account-takeover',
    name: 'Financial account takeover fraud',
    signal: 'Unexpected MFA prompts, resets, or support contact',
    overview:
      'Fraud actors are actively targeting financial accounts with takeover patterns that lead to direct theft and owner lockout.',
    latest: 'FBI Cyber Alert published November 25, 2025',
    impact: 'Direct financial loss',
    actionWindow: 'First 5 minutes',
    avoid: [
      'Do not ignore repeated MFA prompts.',
      'Do not call phone numbers sent in suspicious messages.',
      'Do not delay account lock and password reset.',
    ],
    stageFlow: [
      {
        id: 'observe',
        label: 'Stage 1: Observe',
        summary: 'Identify signs of account control loss quickly.',
        actions: [
          'Review recent logins, reset emails, and device sessions.',
          'Check transaction feed for unknown activity.',
          'Treat unknown verification prompts as active attack signal.',
        ],
      },
      {
        id: 'verify',
        label: 'Stage 2: Verify',
        summary: 'Verify channel integrity before taking account actions.',
        actions: [
          'Use official app/site bookmarked by you.',
          'Call provider using number from card or official site.',
          'Confirm recent changes and block new transfers.',
        ],
      },
      {
        id: 'contain',
        label: 'Stage 3: Contain',
        summary: 'Stabilize the account before investigation.',
        actions: [
          'Force sign-out all sessions and rotate password.',
          'Reset MFA/recovery methods and remove unknown devices.',
          'Freeze cards/accounts where needed and start dispute process.',
        ],
      },
      {
        id: 'report',
        label: 'Stage 4: Report',
        summary: 'Create a strong evidence package for recovery.',
        actions: [
          'Record transaction IDs and timeline of unauthorized actions.',
          'File provider fraud case and FTC/IC3 reports as applicable.',
          'Store all case IDs for follow-up and cross-agency linkage.',
        ],
      },
    ],
    sourceLabel: 'FBI: account takeover fraud alert',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2025/the-fbi-warns-financial-services-about-customer-account-takeover-fraud-targeting-u-s-financial-sector',
  },
  {
    id: 'ic3-impersonation',
    name: 'Fake recovery agents (IC3 impersonation)',
    signal: '“Recovered funds” promise + upfront payment request',
    overview:
      'Criminals impersonate IC3 contacts and target prior victims with fake recovery promises to extract more money and identity data.',
    latest: 'FBI PSA I-041825-PSA (April 18, 2025)',
    impact: 'Secondary victimization',
    actionWindow: 'Before any reply',
    avoid: [
      'Do not pay “release fees” for alleged recovered funds.',
      'Do not send identity packets to unsolicited contacts.',
      'Do not trust non-.gov domains claiming FBI/IC3 affiliation.',
    ],
    stageFlow: [
      {
        id: 'observe',
        label: 'Stage 1: Observe',
        summary: 'Watch for patterns that indicate impersonation.',
        actions: [
          'Look for pressure to act privately and quickly.',
          'Check whether message source is official .gov domain.',
          'Flag requests for crypto, gift cards, or wire “processing fees”.',
        ],
      },
      {
        id: 'verify',
        label: 'Stage 2: Verify',
        summary: 'Validate directly against official sources.',
        actions: [
          'Open IC3.gov manually and verify reporting instructions.',
          'Confirm no fee-based release process exists.',
          'Cross-check contacts with official FBI pages.',
        ],
      },
      {
        id: 'contain',
        label: 'Stage 3: Contain',
        summary: 'Stop communication and protect exposed identity surface.',
        actions: [
          'Block sender and preserve all communication records.',
          'Freeze or alert credit if identity artifacts were shared.',
          'Rotate exposed credentials immediately.',
        ],
      },
      {
        id: 'report',
        label: 'Stage 4: Report',
        summary: 'Report impersonation for pattern disruption.',
        actions: [
          'Submit report with sender handles, domains, and payment requests.',
          'Link with prior case IDs if previously victimized.',
          'Warn trusted contacts who may be targeted next.',
        ],
      },
    ],
    sourceLabel: 'FBI: scammers impersonating IC3',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-warns-of-scammers-impersonating-the-ic3',
  },
];

const triageStack = [
  { label: 'Trust model', value: 'Verify before action' },
  { label: 'Evidence rule', value: 'Capture first, clean up second' },
  { label: 'Escalation rule', value: 'Official channel only' },
];

export default function ThreatsPage() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const scenario = scenarios[scenarioIndex];
  const stage = scenario.stageFlow[stageIndex];

  useEffect(() => {
    setStageIndex(0);
  }, [scenarioIndex]);

  return (
    <div className="page-shell page-threats">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Threat command center</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">Triage before you trust</h1>
        <p className="mt-5 max-w-3xl text-lg text-white/76">
          This page is intentionally staged. Choose a threat, then move through Observe, Verify, Contain, and Report in order.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {triageStack.map((item) => (
            <article key={item.label} className="story-card p-4">
              <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-band py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.92fr,1.25fr]">
          <aside className="space-y-2">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Choose active scenario</p>
            {scenarios.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenarioIndex(index)}
                className={`w-full rounded-xl border px-4 py-4 text-left transition ${
                  index === scenarioIndex ? 'border-[#8db1c8]/80 bg-[#111a24] text-white' : 'border-white/10 bg-[#0d141d] text-white/74 hover:border-white/25 hover:text-white'
                }`}
              >
                <p className="font-ui-mono text-[10px] uppercase tracking-[0.18em] text-white/50">Scenario {index + 1}</p>
                <p className="mt-1 text-sm font-medium">{item.name}</p>
                <p className="mt-2 text-xs text-white/60">{item.signal}</p>
              </button>
            ))}
          </aside>

          <AnimatePresence mode="wait">
            <motion.article
              key={scenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24 }}
              className="story-card p-6 md:p-8"
            >
              <h2 className="text-3xl font-semibold text-white">{scenario.name}</h2>
              <p className="mt-3 text-sm text-white/74">{scenario.overview}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/12 bg-[#0d1621] px-3 py-2">
                  <p className="text-xs text-white/58">Latest advisory</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.latest}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-[#0d1621] px-3 py-2">
                  <p className="text-xs text-white/58">Impact</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.impact}</p>
                </div>
                <div className="rounded-lg border border-white/12 bg-[#0d1621] px-3 py-2">
                  <p className="text-xs text-white/58">Action window</p>
                  <p className="mt-1 text-sm text-white/88">{scenario.actionWindow}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Guided response stages</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {scenario.stageFlow.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStageIndex(index)}
                      className={`rounded-md border px-3 py-2 text-xs transition ${
                        stageIndex === index ? 'border-[#f0bc7f]/70 bg-[#2b2014] text-white' : 'border-white/18 text-white/72 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/12 bg-[#0c131d] p-4">
                <h3 className="text-xl font-semibold text-white">{stage.label}</h3>
                <p className="mt-2 text-sm text-white/72">{stage.summary}</p>
                <ol className="mt-3 space-y-2">
                  {stage.actions.map((item, index) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-[#101925] px-3 py-2 text-sm text-white/78">
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setStageIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={stageIndex === 0}
                    className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/78 disabled:opacity-35"
                  >
                    previous stage
                  </button>
                  <button
                    type="button"
                    onClick={() => setStageIndex((prev) => Math.min(prev + 1, scenario.stageFlow.length - 1))}
                    disabled={stageIndex === scenario.stageFlow.length - 1}
                    className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/78 disabled:opacity-35"
                  >
                    next stage
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {scenario.avoid.map((item) => (
                  <div key={item} className="rounded-lg border border-[#8f5c58]/45 bg-[#231415] px-3 py-2 text-sm text-white/80">
                    avoid: {item}
                  </div>
                ))}
              </div>

              <Link href={scenario.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm text-white/80 underline underline-offset-4 hover:text-white">
                Source: {scenario.sourceLabel}
              </Link>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap gap-3">
          <Link href="/check-footprint" className="rounded-md bg-[#f0bc7f] px-4 py-2 text-sm font-medium text-[#161008]">
            next: run exposure audit
          </Link>
          <Link href="/get-help" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/82 hover:bg-white/10">
            incident already active? open first-hour response
          </Link>
        </div>
      </section>
    </div>
  );
}
