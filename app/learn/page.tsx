'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const modules = [
  {
    title: 'Module 1: Attack recognition',
    duration: '30 min',
    outcomes: [
      'Spot urgency + impersonation patterns before taking action.',
      'Use verification checkpoints in family and work contexts.',
      'Escalate quickly when risk is uncertain.',
    ],
    links: [
      { label: 'Threat briefings', href: '/threats' },
      { label: 'Real stories', href: '/real-stories' },
    ],
    gradient: 'from-[#76c6bb]/27 to-[#355d6d]/35',
  },
  {
    title: 'Module 2: Identity defense',
    duration: '45 min',
    outcomes: [
      'Use password managers with unique credentials.',
      'Shift critical accounts to phishing-resistant MFA.',
      'Harden account recovery routes before incidents.',
    ],
    links: [
      { label: 'Protection playbook', href: '/protect' },
      { label: 'NIST guidance', href: 'https://csrc.nist.gov/pubs/sp/800/63/4/final' },
    ],
    gradient: 'from-[#9ebac4]/22 to-[#445b6c]/36',
  },
  {
    title: 'Module 3: Exposure reduction',
    duration: '60 min',
    outcomes: [
      'Audit public identifiers and data broker exposure.',
      'Prioritize removals that reduce social engineering risk.',
      'Set recurring monitoring routines.',
    ],
    links: [
      { label: 'Footprint audit', href: '/check-footprint' },
      { label: 'CISA Secure Our World', href: 'https://www.cisa.gov/secure-our-world' },
    ],
    gradient: 'from-[#d7ab73]/21 to-[#5a432d]/37',
  },
  {
    title: 'Module 4: Response and reporting',
    duration: '30 min',
    outcomes: [
      'Preserve evidence and stabilize accounts in first hour.',
      'Route incidents to agencies with correct metadata.',
      'Turn incidents into better future controls.',
    ],
    links: [
      { label: 'Get help', href: '/get-help' },
      { label: 'Report channels', href: '/report' },
    ],
    gradient: 'from-[#8ea8a0]/24 to-[#58402f]/36',
  },
];

const cadence = [
  'Weekly: review account alerts, unknown sign-ins, and financial notifications.',
  'Monthly: audit app permissions, browser extensions, and backup restore capability.',
  'Quarterly: run a tabletop drill with family/team incident roles.',
  'Post-incident: document what failed, then update playbooks.',
];

export default function LearnPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Learning path</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Turn knowledge into habit
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          This curriculum is structured to guide non-technical and technical users through the same decision flow they will use in real incidents.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="space-y-4">
          {modules.map((module, index) => (
            <motion.article
              key={module.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className={`story-card bg-gradient-to-br ${module.gradient} p-6 md:p-8`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{module.title}</h2>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">{module.duration}</span>
              </div>

              <ul className="mt-4 grid gap-2 text-sm text-white/78 md:grid-cols-3">
                {module.outcomes.map((outcome) => (
                  <li key={outcome} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                    {outcome}
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

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Cadence that sticks</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {cadence.map((item) => (
              <p key={item} className="story-card px-4 py-3 text-sm text-white/76">
                {item}
              </p>
            ))}
          </div>
          <Link
            href="/real-stories"
            className="mt-6 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
          >
            next: learn from real stories
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
