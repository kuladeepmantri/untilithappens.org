'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { PasswordStrengthLab } from '@/components/site/password-strength-lab';

const modules = [
  {
    title: 'Module 1: Recognize active scam patterns',
    duration: '30 min',
    outcome: 'You can classify a suspicious request in under 60 seconds.',
    checkpoints: [
      'Identify urgency, secrecy, and channel-switch pressure.',
      'Use callback verification before action.',
      'Escalate uncertain cases without delay.',
    ],
    links: [
      { label: 'Threat command center', href: '/threats' },
      { label: 'Real incidents', href: '/real-stories' },
    ],
    gradient: 'from-[#76c6bb]/27 to-[#355d6d]/35',
  },
  {
    title: 'Module 2: Defend identity and accounts',
    duration: '40 min',
    outcome: 'You can reduce credential takeover risk across all critical accounts.',
    checkpoints: [
      'Use unique credentials managed in one password manager.',
      'Enable MFA with strongest available factor.',
      'Harden recovery channels before incidents.',
    ],
    links: [
      { label: 'Protection workflow', href: '/protect' },
      { label: 'NIST identity guidance', href: 'https://csrc.nist.gov/pubs/sp/800/63/4/final' },
    ],
    gradient: 'from-[#9ebac4]/22 to-[#445b6c]/36',
  },
  {
    title: 'Module 3: Reduce exposed personal data',
    duration: '35 min',
    outcome: 'You can run a recurring footprint cleanup cycle.',
    checkpoints: [
      'Audit identifiers and exposed records.',
      'Prioritize high-risk removals first.',
      'Set a 30-day recheck routine.',
    ],
    links: [
      { label: 'Footprint workflow', href: '/check-footprint' },
      { label: 'CISA Secure Our World', href: 'https://www.cisa.gov/secure-our-world' },
    ],
    gradient: 'from-[#d7ab73]/21 to-[#5a432d]/37',
  },
  {
    title: 'Module 4: Respond and report correctly',
    duration: '30 min',
    outcome: 'You can run first-hour containment without panic.',
    checkpoints: [
      'Preserve evidence before cleanup.',
      'Stabilize accounts and payment channels quickly.',
      'Report to the right agency with quality evidence.',
    ],
    links: [
      { label: 'Get help', href: '/get-help' },
      { label: 'Reporting routes', href: '/report' },
    ],
    gradient: 'from-[#8ea8a0]/24 to-[#58402f]/36',
  },
];

const cadence = [
  { period: 'Weekly (15 min)', action: 'Review unknown sign-ins and financial alerts.' },
  { period: 'Monthly (30 min)', action: 'Audit app permissions, extensions, and breach notices.' },
  { period: 'Quarterly (45 min)', action: 'Run an incident drill with family or team roles.' },
  { period: 'Post-incident (60 min)', action: 'Document failure points and update your playbook.' },
];

export default function LearnPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Learning system</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Build skills that hold under pressure
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          This training path is staged for people without security background. Each module has a clear outcome and completion signal.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="space-y-4">
          {modules.map((module, index) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className={`story-card bg-gradient-to-br ${module.gradient} p-6 md:p-8`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{module.title}</h2>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">{module.duration}</span>
              </div>

              <p className="mt-3 text-sm text-white/74">{module.outcome}</p>
              <ul className="mt-4 grid gap-2 text-sm text-white/78 md:grid-cols-3">
                {module.checkpoints.map((item) => (
                  <li key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {module.links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/78 transition hover:border-white/35 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <PasswordStrengthLab />
      </section>

      <section className="border-y border-white/10 bg-[#0b141a]/55 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Cadence that keeps working</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {cadence.map((item) => (
              <article key={item.period} className="story-card p-4">
                <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.period}</p>
                <p className="mt-2 text-sm text-white/76">{item.action}</p>
              </article>
            ))}
          </div>
          <Link
            href="/real-stories"
            className="mt-6 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
          >
            next: study real incident narratives
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
