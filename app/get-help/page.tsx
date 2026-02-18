'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';
import { emergencyResources } from '@/lib/site-data';

const first15 = [
  'Stop further transfers or credential changes initiated by attacker.',
  'Call bank/payment provider fraud line from a trusted number.',
  'Reset compromised credentials and revoke active unknown sessions.',
];

const firstHour = [
  'Capture screenshots, message headers, wallet/payment IDs, and timestamps.',
  'Notify trusted contacts of impersonation risk to prevent follow-on scams.',
  'Isolate compromised device if malware activity is suspected.',
];

const firstDay = [
  'File agency reports (FTC/IC3/CISA as applicable) with complete evidence.',
  'Enable credit freeze or fraud alert when identity data is exposed.',
  'Review mailbox forwarding, recovery methods, and admin role changes.',
];

const responseMetrics = [
  { label: 'Containment objective', value: '<15 min' },
  { label: 'Evidence package objective', value: '<60 min' },
  { label: 'Agency report objective', value: '<24 hours' },
];

export default function GetHelpPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Incident response</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Contain first, investigate second
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Use this timeline when something is actively going wrong. The goal is to stop further damage before deep analysis.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {responseMetrics.map((item) => (
            <article key={item.label} className="story-card p-4">
              <p className="font-ui-mono text-xs uppercase tracking-[0.18em] text-white/55">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="story-card panel-gradient p-6"
          >
            <h2 className="text-2xl font-semibold text-white">0-15 minutes</h2>
            <ol className="mt-4 space-y-2">
              {first15.map((item, index) => (
                <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.07 }}
            className="story-card panel-gradient p-6"
          >
            <h2 className="text-2xl font-semibold text-white">15-60 minutes</h2>
            <ol className="mt-4 space-y-2">
              {firstHour.map((item, index) => (
                <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.12 }}
            className="story-card panel-gradient p-6"
          >
            <h2 className="text-2xl font-semibold text-white">1-24 hours</h2>
            <ol className="mt-4 space-y-2">
              {firstDay.map((item, index) => (
                <li key={item} className="rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-white/78">
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </motion.article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-3xl font-semibold text-white">Official reporting channels</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {emergencyResources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="story-card p-4 transition hover:border-white/30 hover:bg-white/[0.12]"
            >
              <p className="text-sm font-medium text-white">{resource.name}</p>
              <p className="mt-1 text-sm text-white/66">{resource.purpose}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/report" className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]">
            next: reporting matrix
          </Link>
          <Link href="/community" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/82 hover:bg-white/10">
            next: community support
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
