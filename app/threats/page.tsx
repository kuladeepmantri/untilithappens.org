import Link from 'next/link';
import { sourceIndex } from '@/lib/site-data';

const threatCards = [
  {
    name: 'AI Impersonation & Voice Cloning',
    signal: 'Unexpected urgent calls, payment pressure, secrecy requests',
    pattern:
      'Attackers imitate trusted people to push immediate transfer requests before verification can happen.',
    defense: [
      'Use a family verification phrase for urgent requests.',
      'Call back through a known number, not the number that contacted you.',
      'Pause all payment actions when urgency is the main pressure tactic.',
    ],
  },
  {
    name: 'Credential Theft (Phishing + Reused Passwords)',
    signal: 'Login prompts from fake pages, MFA fatigue pushes, unusual sign-in alerts',
    pattern:
      'Credential stuffing and phishing campaigns target reused passwords and weak recovery settings.',
    defense: [
      'Use a password manager and unique credentials per service.',
      'Enable phishing-resistant MFA where available (passkeys/security keys).',
      'Immediately rotate credentials after any suspected leak.',
    ],
  },
  {
    name: 'Ransomware & Data Extortion',
    signal: 'Mass file encryption, suspicious admin activity, disabled backups',
    pattern:
      'Initial access is often through stolen credentials, exposed remote services, or malicious attachments.',
    defense: [
      'Keep offline or immutable backups and test restores regularly.',
      'Patch internet-facing systems quickly and remove unused remote access.',
      'Segment critical systems and limit admin privileges.',
    ],
  },
  {
    name: 'Malicious Extensions & Browser Hijack',
    signal: 'Unknown extensions, forced search redirects, credential prompts',
    pattern:
      'Trojanized browser add-ons can collect credentials, session tokens, and browsing history silently.',
    defense: [
      'Audit browser extensions monthly and remove anything unnecessary.',
      'Install only from official stores and verified publishers.',
      'Use separate browser profiles for high-risk activity.',
    ],
  },
  {
    name: 'QR-Code Phishing ("Quishing")',
    signal: 'QR codes in unexpected invoices, parking notices, or account alerts',
    pattern:
      'QR links can route users to credential-harvesting pages that look like trusted services.',
    defense: [
      'Preview the URL before opening after scanning.',
      'Avoid scanning codes from untrusted physical locations.',
      'Navigate manually to payment/account sites for sensitive actions.',
    ],
  },
  {
    name: 'SIM Swap & Account Recovery Abuse',
    signal: 'Sudden cellular outage followed by account lockouts',
    pattern:
      'Attackers transfer your number and intercept SMS-based login and password-reset flows.',
    defense: [
      'Set a carrier account PIN/port-out lock.',
      'Move MFA away from SMS for critical services.',
      'Review account recovery emails and backup factors now, before incident day.',
    ],
  },
];

const evidenceChecklist = [
  'Timestamp of first suspicious activity',
  'Screenshots of messages, invoices, or phishing pages',
  'Transaction IDs, wallet addresses, or payment references',
  'Email headers and sender domains',
  'Device/browser used and approximate location',
];

export default function ThreatsPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Threat Briefing
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Current attack patterns and how to break them
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          These are the high-frequency patterns we see across public reporting and incident investigations. Keep this page as a
          quick playbook during stressful moments.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {threatCards.map((threat) => (
            <article key={threat.name} className="site-panel p-6">
              <h2 className="text-2xl font-medium text-white">{threat.name}</h2>
              <p className="mt-3 text-sm text-white/70">
                <span className="font-medium text-white/90">Warning signs:</span> {threat.signal}
              </p>
              <p className="mt-3 text-sm text-white/70">
                <span className="font-medium text-white/90">Pattern:</span> {threat.pattern}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {threat.defense.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr,1fr]">
          <div className="site-panel p-6">
            <h2 className="text-2xl font-medium text-white">Incident evidence checklist</h2>
            <p className="mt-3 text-sm text-white/70">
              Collect this before accounts are cleaned up or devices are reset. It helps investigations and chargeback/dispute flows.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {evidenceChecklist.map((item) => (
                <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="site-panel p-6">
            <h2 className="text-2xl font-medium text-white">Escalate quickly</h2>
            <p className="mt-3 text-sm text-white/70">If an active fraud or takeover is in progress, do these first:</p>
            <ol className="mt-4 space-y-3 text-sm text-white/75">
              <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">1. Freeze payment methods where possible.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">2. Revoke suspicious sessions and rotate credentials.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">3. Submit official reports via <Link href="/report" className="underline">report channels</Link>.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">4. Notify impacted contacts using known-good channels.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-xl font-medium text-white">Referenced Sources</h2>
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
      </section>
    </div>
  );
}
