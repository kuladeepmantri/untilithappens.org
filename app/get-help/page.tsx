import Link from 'next/link';
import { emergencyResources } from '@/lib/site-data';

const firstHour = [
  'Stop further payments/transfers and contact your financial provider immediately.',
  'Change passwords for impacted accounts and revoke unknown sessions/devices.',
  'Capture screenshots, message headers, call logs, and transaction references.',
  'Notify trusted contacts so they can ignore follow-up impersonation attempts.',
];

const sameDay = [
  'Submit official incident reports (FTC/IC3/CISA as appropriate).',
  'Place fraud alerts or freezes when identity data is exposed.',
  'Review mailbox forwarding rules and account recovery settings for tampering.',
  'Document every action and timestamp for disputes or investigations.',
];

const whatToPrepare = [
  'Email addresses and phone numbers involved',
  'Transaction IDs, wallet addresses, and payment timestamps',
  'Screenshots of scam content and sender details',
  'Device and browser used during incident',
  'Any related account lockout notifications',
];

export default function GetHelpPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Incident Help
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Stabilize first, investigate second
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          During incidents, speed and clarity matter more than perfection. Follow this sequence to reduce additional loss and preserve evidence.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-14 lg:grid-cols-2">
        <article className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">First 60 minutes</h2>
          <ol className="mt-4 space-y-3 text-sm text-white/75">
            {firstHour.map((item, index) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </article>

        <article className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">First 24 hours</h2>
          <ol className="mt-4 space-y-3 text-sm text-white/75">
            {sameDay.map((item, index) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                {index + 1}. {item}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Official reporting channels</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {emergencyResources.map((resource) => (
              <Link
                key={resource.href}
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">Prepare this before filing</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {whatToPrepare.map((item) => (
              <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/report" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#062026] hover:bg-white/90">
              open full reporting guide
            </Link>
            <Link href="/threats" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              review active threat patterns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
