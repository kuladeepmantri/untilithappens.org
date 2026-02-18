'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const contributeWays = [
  {
    title: 'Improve page clarity',
    detail: 'Propose edits that make actions clearer for non-technical users under stress.',
  },
  {
    title: 'Submit verified references',
    detail: 'Add links to agency guidance, vendor docs, and standards-based controls.',
  },
  {
    title: 'Share anonymized incident lessons',
    detail: 'Contribute case patterns that teach prevention and faster containment.',
  },
  {
    title: 'Run local awareness sessions',
    detail: 'Use these guides with schools, families, and small teams in your community.',
  },
];

const principles = [
  'No unsourced claims: cite primary sources.',
  'No victim exposure: protect privacy and dignity.',
  'Action over noise: every section should produce next steps.',
  'Design for clarity: visual hierarchy should reduce panic.',
];

export default function CommunityPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Community</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Build safer behavior at scale
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          This project improves when practitioners and affected people contribute verified, actionable guidance.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {contributeWays.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07 }}
              className="story-card panel-gradient p-6"
            >
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/74">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold text-white">Contribution principles</h2>
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
            <Link href="/" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              back to guide start
            </Link>
          </div>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
