import Link from 'next/link';
import { footerGroups } from '@/lib/site-data';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050f14]">
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#3ecad8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-8 h-56 w-56 rounded-full bg-[#f95f8f]/16 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(38,132,145,0.18),transparent_52%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr,3fr]">
          <div className="space-y-5">
            <p className="text-2xl font-semibold tracking-tight text-white">until it happens.</p>
            <p className="max-w-md text-sm text-white/70">
              Guided cybersecurity learning with real incident patterns, practical controls, and official response channels.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/threats"
                className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#08242d] transition hover:bg-white/90"
              >
                start guide
              </Link>
              <Link
                href="/get-help"
                className="inline-flex items-center rounded-lg border border-white/20 px-4 py-2 text-sm text-white/90 transition hover:border-white/40 hover:bg-white/5"
              >
                get help
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{group.title}</p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>(c) {year} until it happens</p>
          <p>Security information is educational and should not replace legal or incident-response professionals.</p>
        </div>
      </div>
    </footer>
  );
}
