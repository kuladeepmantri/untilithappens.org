'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { sourceIndex } from '@/lib/site-data';

const threatCards = [
  {
    name: 'AI smishing and vishing impersonation',
    signal: 'Unexpected encrypted app handoff, urgent policy/finance request, subtle voice mismatch',
    pattern:
      'FBI PSAs in May 2025 and December 2025 warned of ongoing text + AI voice impersonation campaigns targeting high-trust contacts.',
    latest: 'FBI PSA I-121925-PSA (December 19, 2025)',
    defense: [
      'Never switch channels from a cold text/call without independent callback verification.',
      'Create an internal challenge phrase for money, credential, or data requests.',
      'Block all links in first-contact text messages from unknown senders.',
    ],
    gradient: 'from-[#76c6bb]/26 to-[#355d6d]/34',
    sourceLabel: 'FBI: Senior U.S. officials impersonated',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/senior-us-officials-continue-to-be-impersonated-in-malicious-messaging-campaign',
  },
  {
    name: 'Toll/payment text smishing waves',
    signal: '“Pay now” toll notices, short deadlines, payment portal with misspelled domain',
    pattern:
      'Field-office reporting in March 2025 showed large complaint bursts linked to fake toll payment texts and cloned payment portals.',
    latest: 'FBI Atlanta warning (March 14, 2025)',
    defense: [
      'Never pay tolls through links in texts; open your toll account manually.',
      'Register direct billing alerts in the official provider app only.',
      'Report the smishing text and preserve screenshots before deleting.',
    ],
    gradient: 'from-[#9bb8c3]/23 to-[#445b6c]/36',
    sourceLabel: 'FBI Atlanta: text toll scam campaign',
    sourceUrl: 'https://www.fbi.gov/contact-us/field-offices/atlanta/news/fbi-atlanta-warns-of-smishing-text-message-scam',
  },
  {
    name: 'IC3 impersonation and fake recovery agents',
    signal: 'Claim that funds were recovered, request to pay “processing” fee, outreach from unofficial account',
    pattern:
      'FBI documented 100+ reports where scammers impersonated IC3 staff and revictimized people already harmed by prior fraud.',
    latest: 'FBI PSA I-041825-PSA (April 18, 2025)',
    defense: [
      'IC3 will not directly DM, text, or ask payment to recover money.',
      'Reject all “recovery service” requests that require upfront fees.',
      'Use only https://www.ic3.gov and verified FBI contact channels.',
    ],
    gradient: 'from-[#d7ab73]/22 to-[#5a432d]/37',
    sourceLabel: 'FBI: scammers impersonating IC3',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-warns-of-scammers-impersonating-the-ic3',
  },
  {
    name: 'Spoofed IC3 websites and data harvesting',
    signal: 'Domain almost matches ic3.gov, asks for full identity and banking details',
    pattern:
      'FBI warned in September 2025 that actors were spoofing the IC3 website to steal identity and financial information.',
    latest: 'FBI PSA I-091925-PSA (September 19, 2025)',
    defense: [
      'Manually type government domains and validate exact spelling before submission.',
      'Do not provide SSN or account credentials on unverified domains.',
      'Use browser password manager alerts for lookalike domain warnings.',
    ],
    gradient: 'from-[#8ea8a0]/24 to-[#58402f]/36',
    sourceLabel: 'FBI: threat actors spoofing IC3 website',
    sourceUrl: 'https://www.fbi.gov/investigate/cyber/alerts/2025/threat-actors-spoofing-the-fbi-ic3-website-for-possible-malicious-activity',
  },
];

const evidenceChecklist = [
  'Timestamp of first suspicious activity',
  'Screenshots of messages, invoices, and phishing pages',
  'Transaction references and wallet/payment identifiers',
  'Email headers and sender domain details',
  'Device, browser, and network context',
];

export default function ThreatsPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute left-4 top-36 h-64 w-64 rounded-full bg-[#76c6bb]/16 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-4 top-56 h-64 w-64 rounded-full bg-[#d7ab73]/15 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Threat briefing</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          See the pattern before you are in it
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/76">
          These are active U.S. patterns with dated official advisories. Each card gives an immediate triage sequence you can apply in under five minutes.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {threatCards.map((threat, index) => (
            <motion.article
              key={threat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              className={`story-card bg-gradient-to-br ${threat.gradient} p-6`}
            >
              <h2 className="text-2xl font-semibold text-white">{threat.name}</h2>
              <p className="mt-3 text-sm text-white/75">
                <span className="font-medium text-white/92">Warning signals:</span> {threat.signal}
              </p>
              <p className="mt-2 text-sm text-white/75">
                <span className="font-medium text-white/92">Pattern:</span> {threat.pattern}
              </p>
              <p className="mt-2 rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">
                {threat.latest}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/78">
                {threat.defense.map((item) => (
                  <li key={item} className="rounded-lg border border-white/15 bg-black/25 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={threat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-xs text-white/72 underline underline-offset-4 hover:text-white"
              >
                source: {threat.sourceLabel}
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.25fr,1fr]">
          <div className="story-card panel-gradient p-6">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Incident kit</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Evidence checklist</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/77">
              {evidenceChecklist.map((item) => (
                <li key={item} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="story-card p-6">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Source trail</p>
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
            <Link
              href="/check-footprint"
              className="mt-5 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
            >
              continue to exposure audit
            </Link>
          </div>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
