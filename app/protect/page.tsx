import Link from 'next/link';

type Guide = {
  id: string;
  platform: string;
  summary: string;
  essentials: string[];
  hardening: string[];
  recovery: string[];
  links: { label: string; href: string }[];
};

const baseline = [
  'Turn on automatic updates for OS, browsers, and password managers.',
  'Use a password manager and unique credentials for every account.',
  'Enable MFA, preferring passkeys/security keys over SMS when possible.',
  'Keep at least one offline or immutable backup of critical files.',
  'Remove apps/extensions you do not actively use.',
];

const guides: Guide[] = [
  {
    id: 'windows',
    platform: 'Windows',
    summary: 'Use built-in Microsoft controls first: Defender, Firewall, BitLocker, and account hardening.',
    essentials: [
      'Confirm Microsoft Defender real-time protection is enabled.',
      'Keep Windows Update on automatic install.',
      'Turn on Microsoft Defender Firewall for every profile.',
      'Enable BitLocker or device encryption where supported.',
    ],
    hardening: [
      'Disable unused remote desktop exposure and old SMB shares.',
      'Use a standard user account for daily use; reserve admin for changes.',
      'Review startup apps and browser extensions monthly.',
    ],
    recovery: [
      'Create a recovery key backup for encrypted drives.',
      'Keep an offline backup disconnected after backup completes.',
    ],
    links: [
      {
        label: 'Windows Security app settings (Microsoft)',
        href: 'https://support.microsoft.com/en-us/windows/windows-security-app-settings-1ea73c14-777c-1659-bdcc-fb3e2272a9d1',
      },
    ],
  },
  {
    id: 'macos',
    platform: 'macOS',
    summary: 'Center on updates, FileVault, app permission review, and strong Apple ID protection.',
    essentials: [
      'Enable automatic macOS updates and rapid security responses.',
      'Turn on FileVault for full-disk encryption.',
      'Review Privacy & Security permissions for camera, mic, files, and location.',
      'Use a strong account password and disable automatic login.',
    ],
    hardening: [
      'Use separate user accounts for admin and daily activity.',
      'Audit login items and launch agents for unknown entries.',
      'Enable iCloud Advanced Data Protection if your risk model requires it.',
    ],
    recovery: [
      'Keep Time Machine backups with encryption enabled.',
      'Store recovery keys and Apple recovery contacts securely.',
    ],
    links: [
      {
        label: 'Two-factor authentication for Apple ID',
        href: 'https://support.apple.com/en-us/102660',
      },
      {
        label: 'Turn on Advanced Data Protection for iCloud',
        href: 'https://support.apple.com/en-mide/108756',
      },
    ],
  },
  {
    id: 'android',
    platform: 'Android',
    summary: 'Prioritize update cadence, Play Protect, lock-screen strength, and permission hygiene.',
    essentials: [
      'Check Android version updates and install security patches quickly.',
      'Enable Google Play Protect automatic scanning.',
      'Use biometric + strong PIN/passphrase lock.',
      'Restrict app permissions to "while in use" wherever possible.',
    ],
    hardening: [
      'Disable sideloading unless explicitly required and verified.',
      'Remove stale apps with broad permissions or no active maintenance.',
      'Review accessibility permissions for unknown apps.',
    ],
    recovery: [
      'Enable remote locate/lock/wipe before travel.',
      'Back up photos/messages to a trusted encrypted destination.',
    ],
    links: [
      {
        label: 'Check and update your Android version',
        href: 'https://support.google.com/android/answer/7680439?hl=en',
      },
      {
        label: 'Google Play Protect overview',
        href: 'https://support.google.com/googleplay/answer/2812853?hl=en',
      },
    ],
  },
  {
    id: 'ios',
    platform: 'iOS / iPadOS',
    summary: 'Treat Apple ID controls and device lock configuration as your primary defense layer.',
    essentials: [
      'Enable automatic iOS/iPadOS updates.',
      'Use a strong device passcode and Face ID / Touch ID.',
      'Turn on two-factor authentication for Apple ID.',
      'Review Privacy & Security permissions and lock-screen exposure.',
    ],
    hardening: [
      'Disable lock-screen access for controls you do not need.',
      'Use iCloud Private Relay and tracking protections where available.',
      'Consider Lockdown Mode if you are at elevated targeting risk.',
    ],
    recovery: [
      'Confirm Find My is active with recovery contacts configured.',
      'Keep encrypted local/cloud backups for rapid restoration.',
    ],
    links: [
      {
        label: 'Two-factor authentication for Apple ID',
        href: 'https://support.apple.com/en-us/102660',
      },
      {
        label: 'Harden your iPhone with Lockdown Mode',
        href: 'https://support.apple.com/en-mide/guide/iphone/iph845f6f40c/ios',
      },
    ],
  },
  {
    id: 'linux',
    platform: 'Linux',
    summary: 'Security posture depends on configuration discipline: updates, service minimization, and logging.',
    essentials: [
      'Apply security updates on a fixed schedule (or automatic unattended upgrades).',
      'Use a host firewall with deny-by-default for inbound services.',
      'Disable password SSH login when key-based auth is available.',
      'Limit sudo/admin membership and review it regularly.',
    ],
    hardening: [
      'Enable mandatory access control (AppArmor/SELinux) where supported.',
      'Remove unnecessary network services and open ports.',
      'Monitor auth and system logs for repeated failed login patterns.',
    ],
    recovery: [
      'Test restore from encrypted backups, not only backup creation.',
      'Keep golden-image or config-as-code baselines for fast rebuilds.',
    ],
    links: [
      {
        label: 'Ubuntu security overview',
        href: 'https://ubuntu.com/security',
      },
      {
        label: 'Debian security management',
        href: 'https://wiki.debian.org/SecurityManagement',
      },
    ],
  },
];

export default function ProtectPage() {
  return (
    <div className="bg-[#06161a] pt-24">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:pb-16 md:pt-20">
        <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
          Protection Playbooks
        </span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
          Platform hardening, without the noise
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/75">
          Use this as your baseline. Keep it simple, repeatable, and evidence-based. Apply these controls first before buying extra tools.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="site-panel p-6">
          <h2 className="text-2xl font-medium text-white">Universal baseline</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {baseline.map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">Jump to platform</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`#${guide.id}`}
                className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/75 transition hover:border-white/30 hover:text-white"
              >
                {guide.platform}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-12">
        {guides.map((guide) => (
          <article key={guide.id} id={guide.id} className="site-panel p-6 md:p-8">
            <h2 className="text-3xl font-medium text-white">{guide.platform}</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/70">{guide.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Essential</p>
                <ul className="mt-2 space-y-2">
                  {guide.essentials.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Hardening</p>
                <ul className="mt-2 space-y-2">
                  {guide.hardening.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Recovery</p>
                <ul className="mt-2 space-y-2">
                  {guide.recovery.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {guide.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/75 transition hover:border-white/30 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="site-panel p-6">
          <h2 className="text-xl font-medium text-white">Need incident help instead of prevention?</h2>
          <p className="mt-3 text-sm text-white/70">
            If compromise is already active, stop and follow the response flow first: preserve evidence, contain accounts, then report.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/get-help" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-[#062026] hover:bg-white/90">
              Open response checklist
            </Link>
            <Link href="/report" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
              Report an incident
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
