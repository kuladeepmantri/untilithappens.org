'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GuideFlow } from '@/components/site/guide-flow';

const stories = [
  {
    title: 'Family voice-clone payment request',
    happened: 'Caller impersonated a close relative and demanded urgent transfer support.',
    missed: 'No independent callback before payment action.',
    control: 'Mandatory callback + private verification phrase.',
    detection: '<2 minutes if callback policy exists',
  },
  {
    title: 'Payroll reroute from mailbox compromise',
    happened: 'Attacker changed payroll destination through hijacked email trust.',
    missed: 'No dual approval for bank detail changes.',
    control: 'Two-person approval + verbal verification.',
    detection: 'Same-day with payment change alerting',
  },
  {
    title: 'Account takeover from overshared profile data',
    happened: 'Public profile metadata supported recovery-question abuse and pivot attacks.',
    missed: 'No recovery hardening and excessive identity exposure.',
    control: 'Recovery factor hardening + metadata cleanup cycle.',
    detection: 'Within 24h via login alert reviews',
  },
  {
    title: 'Tampered QR payment redirection',
    happened: 'Physical QR replacement redirected users to phishing payment page.',
    missed: 'No destination validation before credentials/payment entry.',
    control: 'Manual domain verification for sensitive payments.',
    detection: 'Immediate if URL verification is routine',
  },
];

export default function RealStoriesPage() {
  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Incident narratives</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Learn from failure points, not headlines
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/78">
          Each scenario shows one missed checkpoint and one control that would have prevented loss.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07 }}
              className="story-card panel-gradient p-6"
            >
              <h2 className="text-2xl font-semibold text-white">{story.title}</h2>
              <p className="mt-3 text-sm text-white/76">
                <span className="font-medium text-white/90">What happened:</span> {story.happened}
              </p>
              <p className="mt-2 text-sm text-white/74">
                <span className="font-medium text-white/90">Missed checkpoint:</span> {story.missed}
              </p>
              <p className="mt-2 text-sm text-white/74">
                <span className="font-medium text-white/90">Preventive control:</span> {story.control}
              </p>
              <p className="mt-3 rounded-lg border border-white/12 bg-white/[0.06] px-3 py-2 text-xs text-white/70">
                Expected detection speed: {story.detection}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/get-help" className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]">
            next: run incident response checklist
          </Link>
          <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/82 hover:bg-white/10">
            next: reporting matrix
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
