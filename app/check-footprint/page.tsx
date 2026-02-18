import Link from 'next/link';

const auditSteps = [
  {
    title: 'Search your core identifiers',
    detail:
      'Check your full name, common username handles, primary email addresses, and old phone numbers in multiple search engines.',
  },
  {
    title: 'Check known breach exposure',
    detail:
      'Use trusted breach notification tools first, then rotate passwords and recovery factors for any exposed account.',
  },
  {
    title: 'Review data broker listings',
    detail:
      'Prioritize records with home address, phone, family links, and date-of-birth fragments. Start opt-out requests there.',
  },
  {
    title: 'Audit social profile visibility',
    detail:
      'Lock down profile discoverability, follower lists, and location metadata. Remove outdated public posts with personal clues.',
  },
  {
    title: 'Set monitoring reminders',
    detail:
      'Repeat this audit monthly and after any major life event (new job, move, legal name changes, phone number changes).',
  },
];

const toolGroups = [
  {
    title: 'Breach exposure checks',
    tools: [
      {
        name: 'Have I Been Pwned',
        note: 'Public breach lookup for email exposure.',
        href: 'https://haveibeenpwned.com',
      },
      {
        name: 'Mozilla Monitor',
        note: 'Breach alerts and account monitoring.',
        href: 'https://monitor.mozilla.org',
      },
    ],
  },
  {
    title: 'Search + monitoring',
    tools: [
      {
        name: 'Google Alerts',
        note: 'Track new public mentions of your name or handles.',
        href: 'https://www.google.com/alerts',
      },
      {
        name: 'Bing Search',
        note: 'Catch results not surfaced by other engines.',
        href: 'https://www.bing.com',
      },
    ],
  },
  {
    title: 'Profile and tracker visibility',
    tools: [
      {
        name: 'Namechk',
        note: 'Find username presence across major services.',
        href: 'https://namechk.com',
      },
      {
        name: 'EFF Cover Your Tracks',
        note: 'Assess browser fingerprinting and tracking resistance.',
        href: 'https://coveryourtracks.eff.org',
      },
    ],
  },
  {
    title: 'Account cleanup support',
    tools: [
      {
        name: 'JustDelete.me',
        note: 'Fast reference for account deletion links.',
        href: 'https://justdelete.me',
      },
      {
        name: 'Google Account Privacy Checkup',
        note: 'Review account-level privacy and security settings.',
        href: 'https://myaccount.google.com/privacycheckup',
      },
    ],
  },
];

const removalPriorities = [
  'Home address and direct phone numbers',
  'Date-of-birth fragments and family relationships',
  'Employer details tied to personal contact data',
  'Old usernames reused across sensitive accounts',
  'Public photos with location metadata',
];

export default function CheckFootprintPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Digital Footprint
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Find what others can see about you
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          Treat this as an operational security review. Focus first on data that enables account takeover, stalking, or financial fraud.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {auditSteps.map((step, index) => (
            <article key={step.title} className="site-panel p-6">
              <p className="font-ui-mono text-xs text-white/55">STEP 0{index + 1}</p>
              <h2 className="mt-2 text-xl font-medium text-white">{step.title}</h2>
              <p className="mt-3 text-sm text-white/70">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Tooling that is worth your time</h2>
          <p className="mt-3 max-w-3xl text-sm text-white/70">
            Use reputable tools and official account settings first. Avoid unknown "instant removal" promises that demand sensitive identity documents up front.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {toolGroups.map((group) => (
              <article key={group.title} className="site-panel p-6">
                <h3 className="text-lg font-medium text-white">{group.title}</h3>
                <div className="mt-4 space-y-3">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/25"
                    >
                      <p className="text-sm font-medium text-white">{tool.name}</p>
                      <p className="mt-1 text-xs text-white/65">{tool.note}</p>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[1.3fr,1fr]">
        <div className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">72-hour cleanup plan</h2>
          <ol className="mt-4 space-y-3 text-sm text-white/75">
            <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">1. Rotate passwords for any breached or reused login immediately.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">2. Enable MFA and remove SMS as primary factor where possible.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">3. Submit opt-outs to major data brokers and archive confirmation receipts.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">4. Lock social profile visibility, remove location trails, and prune old public content.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">5. Schedule recurring checks through alerts and calendar reminders.</li>
          </ol>
        </div>

        <div className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">Remove first</h2>
          <p className="mt-3 text-sm text-white/70">These data points are commonly abused for social engineering and account recovery attacks.</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {removalPriorities.map((priority) => (
              <li key={priority} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                {priority}
              </li>
            ))}
          </ul>
          <Link
            href="/report"
            className="mt-5 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:text-white/85"
          >
            need to report active abuse?
          </Link>
        </div>
      </section>
    </div>
  );
}
