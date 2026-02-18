import Link from 'next/link';

const modules = [
  {
    title: 'Module 1: Incident Mindset',
    duration: '30 minutes',
    outcomes: [
      'Recognize urgency, impersonation, and pressure tactics.',
      'Use a verification step before every high-risk action.',
      'Know when to stop and escalate.',
    ],
    links: [
      { label: 'Threat briefings', href: '/threats' },
      { label: 'Response flow', href: '/get-help' },
    ],
  },
  {
    title: 'Module 2: Identity & Access Security',
    duration: '45 minutes',
    outcomes: [
      'Set up password manager workflows and unique credentials.',
      'Enable MFA and migrate critical accounts away from SMS.',
      'Prioritize passkeys/security keys for sensitive accounts.',
    ],
    links: [
      { label: 'Platform hardening', href: '/protect' },
      { label: 'NIST SP 800-63B', href: 'https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final' },
    ],
  },
  {
    title: 'Module 3: Digital Footprint Reduction',
    duration: '60 minutes',
    outcomes: [
      'Map exposed identifiers and prioritize high-risk removals.',
      'Set recurring monitoring for breach alerts and mentions.',
      'Reduce social profile metadata and public visibility.',
    ],
    links: [
      { label: 'Footprint audit', href: '/check-footprint' },
      { label: 'CISA Secure Our World', href: 'https://www.cisa.gov/secure-our-world' },
    ],
  },
  {
    title: 'Module 4: Reporting & Recovery',
    duration: '30 minutes',
    outcomes: [
      'Capture evidence and maintain a clear timeline.',
      'Route incidents to the right agencies quickly.',
      'Communicate with family/team without spreading panic.',
    ],
    links: [
      { label: 'Official reporting channels', href: '/report' },
      { label: 'Community support', href: '/community' },
    ],
  },
];

const rhythm = [
  'Weekly: Review financial/account alerts and unknown sign-ins.',
  'Monthly: Audit browser extensions, app permissions, and backup integrity.',
  'Quarterly: Refresh incident contacts and run a tabletop drill.',
  'After incidents: Update playbooks with lessons learned.',
];

export default function LearnPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Learning Path
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Build repeatable cyber habits
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          Treat security as a routine, not a one-time checklist. This path is designed for people who want practical outcomes, not theory-heavy material.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="space-y-4">
          {modules.map((module) => (
            <article key={module.title} className="site-panel p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-2xl font-medium text-white">{module.title}</h2>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/65">{module.duration}</span>
              </div>

              <ul className="mt-4 grid gap-2 text-sm text-white/75 md:grid-cols-3">
                {module.outcomes.map((outcome) => (
                  <li key={outcome} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
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
                    className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/75 transition hover:border-white/30 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Operating rhythm</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/70">
            Security improves when your checks are predictable. Use this cadence to keep controls from drifting.
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {rhythm.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
