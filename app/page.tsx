import Link from 'next/link';
import { emergencyResources, sourceIndex, verifiedNotes } from '@/lib/site-data';

const quickActions = [
  {
    title: 'Map your exposed data',
    description: 'Run a structured footprint audit and remove high-risk public data first.',
    href: '/check-footprint',
    cta: 'Start audit',
  },
  {
    title: 'Harden your devices',
    description: 'Use platform-specific security checklists for Windows, macOS, Linux, Android, and iOS.',
    href: '/protect',
    cta: 'Open guides',
  },
  {
    title: 'Understand current threats',
    description: 'Get concise threat briefs with warning signs, attack patterns, and defensive actions.',
    href: '/threats',
    cta: 'View threats',
  },
  {
    title: 'Know where to report fast',
    description: 'Use official reporting channels when fraud, phishing, or account takeover happens.',
    href: '/report',
    cta: 'Report now',
  },
];

const featureLinks = [
  {
    href: '/learn',
    title: 'Learn',
    detail: 'Step-by-step training path for individuals and families.',
  },
  {
    href: '/real-stories',
    title: 'Real Stories',
    detail: 'Incident narratives with concrete lessons and controls.',
  },
  {
    href: '/get-help',
    title: 'Get Help',
    detail: 'Rapid stabilization checklist for active incidents.',
  },
  {
    href: '/community',
    title: 'Community',
    detail: 'Contribute fixes, resources, and local awareness support.',
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-[#06161a] pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(61,191,205,0.22),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(18,84,120,0.3),transparent_45%)]" />

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12 md:pb-24 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr,1fr] lg:items-end">
          <div className="space-y-8">
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
              Practical Cyber Safety
            </span>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Don't wait for the incident.
              <span className="block text-white/75">Prepare before it happens.</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/75 md:text-xl">
              This site focuses on prevention, rapid response, and verified public guidance. Every major route now resolves,
              and every headline metric below links to a primary source.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/check-footprint"
                className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-medium text-[#062026] transition hover:bg-white/90"
              >
                see what is exposed
              </Link>
              <Link
                href="/get-help"
                className="inline-flex items-center rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                I need help now
              </Link>
            </div>
          </div>

          <div className="site-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Current Notes</p>
            <ul className="mt-5 space-y-4">
              {verifiedNotes.map((note) => (
                <li key={note.metric} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-lg font-medium text-white">{note.metric}</p>
                  <p className="mt-2 text-sm text-white/70">{note.detail}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
                    <span>{note.asOf}</span>
                    <span>|</span>
                    <Link href={note.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/85">
                      {note.sourceLabel}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-black/20 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/55">Core Features</p>
              <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">What you can do right now</h2>
            </div>
            <Link href="/learn" className="text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline">
              start with the learning path
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((item) => (
              <article key={item.title} className="site-panel p-6">
                <h3 className="text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70">{item.description}</p>
                <Link href={item.href} className="mt-5 inline-flex text-sm font-medium text-white underline underline-offset-4 hover:text-white/85">
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[2fr,1fr]">
          <div className="site-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Emergency Routes</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">If something happened today</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              Preserve evidence first: screenshots, transaction IDs, email headers, and timestamps. Then report through official channels.
            </p>

            <div className="mt-6 grid gap-3">
              {emergencyResources.map((resource) => (
                <Link
                  key={resource.name}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/15 bg-black/20 p-4 transition hover:border-white/30 hover:bg-black/30"
                >
                  <p className="text-sm font-medium text-white">{resource.name}</p>
                  <p className="mt-1 text-sm text-white/65">{resource.purpose}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="site-panel p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/55">Explore</p>
            <div className="mt-4 space-y-3">
              {featureLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg border border-white/10 px-4 py-3 transition hover:border-white/25 hover:bg-white/5"
                >
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-xs text-white/65">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-black/35 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-lg font-medium text-white">Primary Sources</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sourceIndex.map((source) => (
              <Link
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
              >
                {source.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
