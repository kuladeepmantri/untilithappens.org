'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const reportMatrix = [
  {
    incident: 'Consumer fraud, scams, identity theft',
    channel: 'FTC ReportFraud',
    href: 'https://reportfraud.ftc.gov',
    useWhen: 'Primary U.S. route for consumer fraud patterns and case documentation.',
  },
  {
    incident: 'Internet-enabled financial cybercrime',
    channel: 'FBI IC3',
    href: 'https://www.ic3.gov',
    useWhen: 'Use for BEC, crypto fraud, extortion, and significant online financial loss.',
  },
  {
    incident: 'Broader phishing or cyber campaign reports',
    channel: 'CISA reporting',
    href: 'https://www.cisa.gov/reporting-cyber-incident',
    useWhen: 'Use for suspicious campaigns affecting communities or infrastructure.',
  },
  {
    incident: 'Card or bank fraud in progress',
    channel: 'Your financial provider',
    href: '/get-help',
    useWhen: 'Immediate containment path to freeze, dispute, and recover transactions.',
  },
];

const requiredFields = [
  'Exact timestamps including timezone',
  'Sender account, domain, and communication channel',
  'Transaction IDs, wallet IDs, payment references',
  'Screenshots and preserved message/email headers',
  'Case numbers from other agencies already contacted',
];

const qualityTargets = [
  { label: 'Initial filing', value: '<24 hours' },
  { label: 'Evidence completeness', value: '90%+' },
  { label: 'Cross-agency case linkage', value: 'Include all case IDs' },
];

export default function ReportPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Reporting matrix</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Send the report to the right place first
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Fast reporting helps recovery only when evidence is clear. Use this matrix to route cases with accurate data.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {qualityTargets.map((item) => (
            <article key={item.label} className="story-card p-4">
              <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-3">
            {reportMatrix.map((item, index) => (
              <motion.article
                key={item.incident}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.06 }}
                className="story-card panel-gradient p-5 md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.incident}</p>
                    <p className="mt-1 text-sm text-white/67">{item.useWhen}</p>
                  </div>
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex rounded-md border border-white/20 px-3 py-2 text-sm text-white/82 transition hover:border-white/35 hover:bg-white/10"
                  >
                    {item.channel}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-semibold text-white">Required evidence fields</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {requiredFields.map((item) => (
            <li key={item} className="story-card px-4 py-3 text-sm text-white/76">
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/community"
          className="mt-6 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
        >
          next: contribute improvements to the playbooks
        </Link>
      </section>

      <GuideFlow />
    </div>
  );
}
