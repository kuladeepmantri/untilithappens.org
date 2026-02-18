import Link from 'next/link';

const contributeWays = [
  {
    title: 'Improve guidance',
    detail: 'Suggest clearer wording, stronger checks, or better response sequencing for current pages.',
  },
  {
    title: 'Submit verified resources',
    detail: 'Share official documentation links from standards bodies, vendors, and public agencies.',
  },
  {
    title: 'Share incident lessons',
    detail: 'Contribute anonymized narratives that help others avoid the same failure modes.',
  },
  {
    title: 'Local awareness support',
    detail: 'Run small workshops for families, schools, and community groups using these playbooks.',
  },
];

const principles = [
  'Evidence over hype: no unsourced claims.',
  'Privacy first: never post private victim data.',
  'Actionable output: every page should end with clear next steps.',
  'Inclusive language: write for non-technical readers too.',
];

export default function CommunityPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Community
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Build safer habits together
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          This project is strongest when practitioners, educators, and affected people contribute practical fixes and verified resources.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {contributeWays.map((item) => (
            <article key={item.title} className="site-panel p-6">
              <h2 className="text-2xl font-medium text-white">{item.title}</h2>
              <p className="mt-3 text-sm text-white/70">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Contribution principles</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {principle}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://github.com/untilithappens"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#062026] hover:bg-white/90"
            >
              open GitHub
            </Link>
            <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              incident reporting guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
