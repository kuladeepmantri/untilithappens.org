import Link from 'next/link';

const stories = [
  {
    title: 'Family Voice Clone Scam',
    summary:
      'A retired couple received a call that sounded like their grandson asking for immediate money after an accident. They transferred funds before verifying.',
    failurePoint: 'No secondary verification channel during urgent emotional pressure.',
    lesson: 'Use a private verification phrase and always call back on a known number.',
  },
  {
    title: 'Small Business Payroll Breach',
    summary:
      'An attacker gained mailbox access and changed payroll routing details. The finance team trusted the thread because it looked internal.',
    failurePoint: 'No approval checkpoint for payment destination changes.',
    lesson: 'Require out-of-band verification and dual approval for banking updates.',
  },
  {
    title: 'Social Profile to Account Takeover',
    summary:
      'Public profile details and reused usernames helped an attacker reset multiple personal accounts.',
    failurePoint: 'Overexposed profile metadata plus weak recovery controls.',
    lesson: 'Reduce public identifiers and harden recovery emails + MFA.',
  },
  {
    title: 'QR Payment Redirect Fraud',
    summary:
      'A fake QR code sticker replaced the legitimate payment code at a venue. Victims were redirected to a credential harvest page.',
    failurePoint: 'Users trusted unverified QR destinations for sensitive actions.',
    lesson: 'Preview destination URLs and manually open trusted payment sites.',
  },
];

const responseHabits = [
  'Pause when urgency is the primary argument.',
  'Verify through a second trusted channel.',
  'Document evidence before cleanup/reset actions.',
  'Report quickly through official channels.',
  'Share lessons learned with your household or team.',
];

export default function RealStoriesPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Real Stories
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Case patterns worth remembering
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          These anonymized stories reflect common incident dynamics: urgency, trust hijacking, and missed verification points.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {stories.map((story) => (
            <article key={story.title} className="site-panel p-6">
              <h2 className="text-2xl font-medium text-white">{story.title}</h2>
              <p className="mt-3 text-sm text-white/70">{story.summary}</p>
              <p className="mt-4 text-sm text-white/65">
                <span className="font-medium text-white/85">Failure point:</span> {story.failurePoint}
              </p>
              <p className="mt-2 text-sm text-white/65">
                <span className="font-medium text-white/85">Lesson:</span> {story.lesson}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-medium text-white">Shared response habits</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {responseHabits.map((habit) => (
              <p key={habit} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {habit}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/learn" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#062026] hover:bg-white/90">
              continue learning
            </Link>
            <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              official reporting routes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
