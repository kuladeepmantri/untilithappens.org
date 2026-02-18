import Link from 'next/link';

const reportMatrix = [
  {
    incident: 'Consumer fraud, scams, identity theft',
    channel: 'FTC ReportFraud',
    href: 'https://reportfraud.ftc.gov',
    notes: 'Primary U.S. consumer fraud reporting path.',
  },
  {
    incident: 'Internet-enabled crime and significant financial cyber losses',
    channel: 'FBI IC3',
    href: 'https://www.ic3.gov',
    notes: 'Use for business email compromise, crypto fraud, extortion, and cyber-enabled financial loss.',
  },
  {
    incident: 'Phishing campaigns or broader cyber threats',
    channel: 'CISA Report',
    href: 'https://www.cisa.gov/report',
    notes: 'Useful for suspicious campaigns affecting multiple victims or infrastructure.',
  },
  {
    incident: 'Banking or card fraud',
    channel: 'Your financial institution fraud team',
    href: '/get-help',
    notes: 'Contact your bank/card provider first to freeze transactions and start recovery workflows.',
  },
];

const filingTips = [
  'Report as soon as possible. Delays can reduce recovery options.',
  'Use precise timestamps and include time zone.',
  'Attach transaction references and evidence files where allowed.',
  'Do not alter evidence before export (headers, metadata, logs).',
  'If uncertain, file with multiple agencies and cross-reference case IDs.',
];

export default function ReportPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Report Incidents
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Route incidents to the right channel
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          Fast reporting improves investigation quality and can improve recovery outcomes. Use this matrix to choose your first destination.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="space-y-3">
          {reportMatrix.map((item) => (
            <article key={item.incident} className="site-panel p-5 md:p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.incident}</p>
                  <p className="mt-1 text-sm text-white/65">{item.notes}</p>
                </div>
                <Link
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex rounded-md border border-white/20 px-3 py-2 text-sm text-white/80 transition hover:border-white/35 hover:text-white"
                >
                  {item.channel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Filing quality checklist</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {filingTips.map((tip) => (
              <li key={tip} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {tip}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/get-help" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#062026] hover:bg-white/90">
              incident stabilization checklist
            </Link>
            <Link href="/threats" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              review threat patterns
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
