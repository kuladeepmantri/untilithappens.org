'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const contributeWays = [
  {
    title: 'Submit clarity fixes',
    detail: 'Rewrite confusing guidance into plain language with direct action steps.',
    target: '1 actionable rewrite per contribution',
  },
  {
    title: 'Add verified references',
    detail: 'Propose primary-source links from agencies, standards bodies, and official vendor docs.',
    target: 'Source + publication date required',
  },
  {
    title: 'Share anonymized incident patterns',
    detail: 'Contribute repeatable lessons without exposing victim identities or sensitive evidence.',
    target: 'Failure point + preventive control format',
  },
  {
    title: 'Run local training sessions',
    detail: 'Use these playbooks with families, schools, and small teams then feed back improvement notes.',
    target: 'Collect 3+ confusion points per session',
  },
];

const principles = [
  'No unsourced claims; cite primary references.',
  'No victim exposure; protect privacy and dignity.',
  'Action over noise; every section must produce a next step.',
  'Design for stress; content must work during panic.',
];

export default function CommunityPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Community workflow</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Improve the guidance with real-world feedback
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          The goal is practical clarity for people under stress. Contributions should improve speed, confidence, and correctness.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          {contributeWays.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07 }}
              className="story-card panel-gradient p-6"
            >
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/74">{item.detail}</p>
              <p className="mt-3 rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-xs text-white/70">
                Quality target: {item.target}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Contribution guardrails</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="story-card px-4 py-3 text-sm text-white/76">
                {principle}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://github.com/untilithappens"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]"
            >
              open GitHub
            </Link>
            <Link href="/" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/82 hover:bg-white/10">
              return to guide start
            </Link>
          </div>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
