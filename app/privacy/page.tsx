import Link from 'next/link';

const sections = [
  {
    title: '1. Scope',
    body:
      'This policy describes how untilithappens.org handles information when you browse this website and follow external links to third-party resources.',
  },
  {
    title: '2. Data we process',
    body:
      'This site does not require account registration for core content access. Standard web server logs (such as IP address, user agent, and request metadata) may be processed by hosting infrastructure for security and reliability.',
  },
  {
    title: '3. How information is used',
    body:
      'Operational logs may be used to maintain uptime, investigate abuse, and protect the service. We do not sell personal data through this site.',
  },
  {
    title: '4. Third-party services',
    body:
      'Many pages link to external agencies and documentation. Those sites operate under their own privacy terms. Review their policies before submitting personal information.',
  },
  {
    title: '5. Security and retention',
    body:
      'We use reasonable technical safeguards for the website stack. Log retention periods may vary by hosting provider and legal requirements.',
  },
  {
    title: '6. Contact',
    body:
      'For privacy concerns about this website, open an issue via the project repository or use listed contact channels when provided.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Privacy
        </span>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/65">Last updated: February 18, 2026</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="site-panel p-6">
              <h2 className="text-xl font-medium text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/terms" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            View terms
          </Link>
          <Link href="/get-help" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            Get help
          </Link>
        </div>
      </section>
    </div>
  );
}
