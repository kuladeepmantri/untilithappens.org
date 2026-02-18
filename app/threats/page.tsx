'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { sourceIndex } from '@/lib/site-data';

const threatCards = [
  {
    name: 'AI impersonation and voice cloning',
    signal: 'Urgent requests, emotional pressure, and secrecy demands',
    pattern: 'Scammers mimic trusted voices to trigger instant payments before verification.',
    defense: [
      'Use a family verification phrase.',
      'Call back using a known number from your contacts.',
      'Pause every urgent transfer request for independent verification.',
    ],
    gradient: 'from-[#3ecad8]/28 to-[#1e5a7f]/30',
  },
  {
    name: 'Credential theft and MFA fatigue',
    signal: 'Unexpected sign-in prompts, fake login pages, repeated MFA pushes',
    pattern: 'Phishing + reused passwords + notification spam create account takeover windows.',
    defense: [
      'Use unique passwords with a manager.',
      'Prefer passkeys/security keys over SMS where possible.',
      'Deny all unexpected MFA prompts and change credentials immediately.',
    ],
    gradient: 'from-[#6f78ff]/26 to-[#383f89]/34',
  },
  {
    name: 'Ransomware and data extortion',
    signal: 'Mass file encryption, backup tampering, suspicious admin actions',
    pattern: 'Attackers often enter through exposed services or stolen credentials.',
    defense: [
      'Maintain offline/immutable backups and test restores.',
      'Patch internet-facing services quickly.',
      'Limit admin privileges and segment critical systems.',
    ],
    gradient: 'from-[#f95f8f]/24 to-[#742247]/34',
  },
  {
    name: 'Malicious extensions and browser hijack',
    signal: 'Unexpected redirects, suspicious extension installs, fake prompts',
    pattern: 'Trojanized add-ons collect credentials and session tokens silently.',
    defense: [
      'Audit extensions monthly and remove stale ones.',
      'Install from official stores and trusted publishers only.',
      'Use separate browser profiles for sensitive workflows.',
    ],
    gradient: 'from-[#f6af57]/24 to-[#82431a]/36',
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
      <div className="pointer-events-none absolute left-4 top-36 h-64 w-64 rounded-full bg-[#3ecad8]/18 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-4 top-56 h-64 w-64 rounded-full bg-[#f95f8f]/16 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Threat briefing</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          See the pattern before you are in it
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/76">
          Each card below maps a current attack pattern to warning signals and immediate defensive actions you can execute without a large security team.
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
              <ul className="mt-4 space-y-2 text-sm text-white/78">
                {threat.defense.map((item) => (
                  <li key={item} className="rounded-lg border border-white/15 bg-black/25 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
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
              className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-medium text-[#08242d] transition hover:bg-white/90"
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
