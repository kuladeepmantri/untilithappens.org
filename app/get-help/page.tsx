'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { emergencyResources } from '@/lib/site-data';

const firstHour = [
  'Stop further transfers and call your financial provider fraud line immediately.',
  'Change compromised credentials and revoke suspicious active sessions.',
  'Capture screenshots, headers, logs, and transaction references.',
  'Warn trusted contacts about possible impersonation follow-up.',
];

const dayOne = [
  'Submit reports to relevant agencies (FTC/IC3/CISA as applicable).',
  'Add fraud alerts or freeze credit when identity data is exposed.',
  'Audit account recovery and mailbox forwarding settings for tampering.',
  'Keep a detailed timeline with exact timestamps and actions taken.',
];

export default function GetHelpPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Incident help</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Stabilize first. Investigate second.
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          In live incidents, clear sequencing reduces additional damage. Follow this first-hour and first-day response map.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-14 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="story-card panel-gradient p-6"
        >
          <h2 className="text-2xl font-semibold text-white">First 60 minutes</h2>
          <ol className="mt-4 space-y-2 text-sm text-white/78">
            {firstHour.map((item, index) => (
              <li key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.08 }}
          className="story-card panel-gradient p-6"
        >
          <h2 className="text-2xl font-semibold text-white">First 24 hours</h2>
          <ol className="mt-4 space-y-2 text-sm text-white/78">
            {dayOne.map((item, index) => (
              <li key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </motion.article>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Official reporting channels</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {emergencyResources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="story-card p-4 transition hover:border-white/30 hover:bg-black/35"
              >
                <p className="text-sm font-medium text-white">{resource.name}</p>
                <p className="mt-1 text-sm text-white/66">{resource.purpose}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/report" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#08242d] hover:bg-white/90">
              next: reporting matrix
            </Link>
            <Link href="/community" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              find community support
            </Link>
          </div>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
