'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const reportMatrix = [
  {
    incident: 'Consumer fraud, scams, identity theft',
    channel: 'FTC ReportFraud',
    href: 'https://reportfraud.ftc.gov',
    notes: 'Primary U.S. route for consumer fraud reporting.',
  },
  {
    incident: 'Internet-enabled financial cybercrime',
    channel: 'FBI IC3',
    href: 'https://www.ic3.gov',
    notes: 'Use for BEC, crypto fraud, extortion, and significant internet crime losses.',
  },
  {
    incident: 'Phishing campaigns and cyber threat reporting',
    channel: 'CISA Report',
    href: 'https://www.cisa.gov/reporting-cyber-incident',
    notes: 'Useful for suspicious campaigns impacting broader communities or infrastructure.',
  },
  {
    incident: 'Card/bank fraud',
    channel: 'Financial institution fraud team',
    href: '/get-help',
    notes: 'Contact your provider immediately to freeze and dispute transactions.',
  },
];

const filingTips = [
  'Submit quickly. Delay can reduce recovery options.',
  'Use exact timestamps and include timezone.',
  'Attach transaction IDs and relevant message artifacts.',
  'Do not modify raw evidence before export.',
  'Cross-reference case numbers when filing with multiple agencies.',
];

export default function ReportPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Incident reporting</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Route the report to the right channel
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Fast, accurate reporting improves investigative quality. Use this matrix to choose your first channel and keep documentation clean.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="space-y-3">
          {reportMatrix.map((item, index) => (
            <motion.article
              key={item.incident}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.06 }}
              className="story-card panel-gradient p-5 md:p-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.incident}</p>
                  <p className="mt-1 text-sm text-white/67">{item.notes}</p>
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
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Filing quality checklist</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {filingTips.map((tip) => (
              <li key={tip} className="story-card px-4 py-3 text-sm text-white/76">
                {tip}
              </li>
            ))}
          </ul>
          <Link
            href="/community"
            className="mt-6 inline-flex rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] transition hover:bg-[#e1b988]"
          >
            next: join community and keep improving
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
