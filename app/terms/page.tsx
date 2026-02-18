import Link from 'next/link';

const terms = [
  {
    title: '1. Educational purpose',
    body:
      'Content on this website is provided for educational and informational purposes. It is not legal, financial, or incident-response representation.',
  },
  {
    title: '2. No warranty',
    body:
      'The website is provided "as is" without guarantees of completeness, accuracy, or fitness for a specific purpose. Threat conditions and regulations change over time.',
  },
  {
    title: '3. User responsibility',
    body:
      'You are responsible for how you apply this information. For active incidents, engage qualified legal, forensic, and response professionals as needed.',
  },
  {
    title: '4. External links',
    body:
      'This site links to third-party resources. We are not responsible for the content, uptime, or policies of external sites.',
  },
  {
    title: '5. Acceptable use',
    body:
      'Do not use this website or its content for unlawful activity, harassment, fraud, or unauthorized system access.',
  },
  {
    title: '6. Changes to terms',
    body:
      'These terms may be updated over time. Continued use of the site after updates indicates acceptance of revised terms.',
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#09151c] pt-24">
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Terms
        </span>
        <h1 className="mt-6 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">Terms of Use</h1>
        <p className="mt-4 text-sm text-white/65">Last updated: February 18, 2026</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="space-y-4">
          {terms.map((term) => (
            <article key={term.title} className="site-panel p-6">
              <h2 className="text-xl font-medium text-white">{term.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{term.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/privacy" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            View privacy policy
          </Link>
          <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            Report an incident
          </Link>
        </div>
      </section>
    </div>
  );
}
