'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type Guide = {
  id: string;
  platform: string;
  summary: string;
  setupTime: string;
  riskCut: string;
  checks: string;
  essentials: string[];
  hardening: string[];
  recovery: string[];
  links: { label: string; href: string }[];
};

const baseline = [
  'Auto-updates enabled on OS + browser + password manager',
  'Unique credentials and MFA on every critical account',
  'Offline or immutable backup with monthly restore test',
];

const guides: Guide[] = [
  {
    id: 'windows',
    platform: 'Windows',
    summary: 'Use native controls first: Defender, Firewall, BitLocker, and account privilege separation.',
    setupTime: '20 min',
    riskCut: 'High vs commodity malware',
    checks: '4 core checks',
    essentials: [
      'Enable Defender real-time protection and cloud-delivered protection.',
      'Turn on automatic Windows security updates.',
      'Enable Defender Firewall for domain, private, and public profiles.',
      'Enable BitLocker or device encryption and save recovery key securely.',
    ],
    hardening: [
      'Use standard account for daily work; admin account only when needed.',
      'Disable unused remote services and review startup apps monthly.',
      'Keep browser extensions minimal and trusted.',
    ],
    recovery: [
      'Store BitLocker recovery key in protected offline location.',
      'Maintain disconnected backup copies after backup jobs complete.',
    ],
    links: [
      {
        label: 'Windows Security settings',
        href: 'https://support.microsoft.com/en-us/windows/windows-security-app-settings-7022b7ba-7aa1-560e-a582-fae7f7f71764',
      },
    ],
  },
  {
    id: 'macos',
    platform: 'macOS',
    summary: 'Prioritize updates, FileVault, Apple account hardening, and app permission controls.',
    setupTime: '18 min',
    riskCut: 'High vs credential and local theft',
    checks: '4 core checks',
    essentials: [
      'Enable automatic updates and rapid security responses.',
      'Turn on FileVault full-disk encryption.',
      'Review app access to camera, microphone, files, and location.',
      'Disable automatic login and enforce strong device password.',
    ],
    hardening: [
      'Use separate admin and daily-use accounts.',
      'Audit login items and unknown background services monthly.',
      'Enable Advanced Data Protection if your threat model requires it.',
    ],
    recovery: [
      'Run encrypted Time Machine backups.',
      'Set recovery contacts and verify account recovery options.',
    ],
    links: [
      { label: 'Apple account two-factor authentication', href: 'https://support.apple.com/en-us/ht204915' },
      { label: 'Advanced Data Protection', href: 'https://support.apple.com/en-us/102651' },
    ],
  },
  {
    id: 'android',
    platform: 'Android',
    summary: 'Patch speed, Play Protect, and strict permission policy drive the biggest reduction in risk.',
    setupTime: '15 min',
    riskCut: 'High vs mobile phishing and malware',
    checks: '4 core checks',
    essentials: [
      'Install OS/security updates quickly.',
      'Enable Play Protect automatic scans.',
      'Use biometric lock plus strong PIN/passphrase.',
      'Restrict app permissions to minimum required.',
    ],
    hardening: [
      'Avoid sideloading except for verified operational need.',
      'Review accessibility and notification access permissions.',
      'Remove dormant apps with wide privilege scope.',
    ],
    recovery: [
      'Enable remote locate, lock, and wipe.',
      'Back up critical data to trusted encrypted destinations.',
    ],
    links: [
      { label: 'Update Android version', href: 'https://support.google.com/android/answer/7680439?hl=en' },
      { label: 'Google Play Protect', href: 'https://support.google.com/googleplay/answer/2812853?hl=en' },
    ],
  },
  {
    id: 'ios',
    platform: 'iOS / iPadOS',
    summary: 'Strong passcode policy and account controls are the core of iPhone and iPad resilience.',
    setupTime: '15 min',
    riskCut: 'High vs account hijack and physical loss',
    checks: '4 core checks',
    essentials: [
      'Keep iOS/iPadOS on automatic updates.',
      'Use strong passcode plus Face ID or Touch ID.',
      'Enable Apple account two-factor authentication.',
      'Review lock-screen exposure and privacy settings.',
    ],
    hardening: [
      'Disable lock-screen controls not needed.',
      'Use tracker protections and Private Relay where available.',
      'Enable Lockdown Mode for elevated threat profiles.',
    ],
    recovery: [
      'Verify Find My and trusted recovery contacts.',
      'Maintain encrypted backup options for fast restore.',
    ],
    links: [
      { label: 'Apple account two-factor authentication', href: 'https://support.apple.com/en-us/ht204915' },
      { label: 'iPhone Lockdown Mode', href: 'https://support.apple.com/en-us/105120' },
    ],
  },
  {
    id: 'linux',
    platform: 'Linux',
    summary: 'Configuration discipline is primary: updates, service minimization, key auth, and monitoring.',
    setupTime: '25 min',
    riskCut: 'High vs exposed-service compromise',
    checks: '5 core checks',
    essentials: [
      'Apply updates on a fixed cadence or unattended security flow.',
      'Use deny-by-default inbound firewall policy.',
      'Disable password SSH login where key auth is possible.',
      'Review sudo/admin memberships regularly.',
    ],
    hardening: [
      'Enable SELinux or AppArmor where supported.',
      'Remove unnecessary network services and open ports.',
      'Track auth and system logs for abnormal patterns.',
    ],
    recovery: [
      'Test full backup restore, not only backup creation.',
      'Keep baseline configs for rapid rebuild.',
    ],
    links: [
      { label: 'Ubuntu security overview', href: 'https://ubuntu.com/security' },
      { label: 'Debian security management', href: 'https://wiki.debian.org/SecurityManagement' },
    ],
  },
];

function detectPlatformId(): string | null {
  if (typeof navigator === 'undefined') {
    return null;
  }

  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const platform = (nav.userAgentData?.platform || nav.platform || '').toLowerCase();
  const ua = nav.userAgent.toLowerCase();

  if (platform.includes('mac') || ua.includes('mac os x')) return 'macos';
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  if (platform.includes('linux')) return 'linux';
  if (ua.includes('android')) return 'android';
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) return 'ios';

  return null;
}

export default function ProtectPage() {
  const [active, setActive] = useState(guides[0].id);
  const [detectedId, setDetectedId] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    const detected = detectPlatformId();
    if (detected) {
      setDetectedId(detected);
      setActive(detected);
    }
    setDetecting(false);
  }, []);

  const currentGuide = useMemo(
    () => guides.find((guide) => guide.id === active) ?? guides[0],
    [active]
  );
  const detectedGuide = useMemo(
    () => guides.find((guide) => guide.id === detectedId) ?? null,
    [detectedId]
  );

  return (
    <div className="page-shell page-protect">

      <section className="relative mx-auto max-w-7xl px-6 pb-10 pt-14 md:pt-20">
        <span className="guide-chip">Device hardening workflow</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Harden your primary device first
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/77">
          We auto-select a recommended playbook from your current device. Finish one platform fully before switching.
        </p>
        <p className="mt-3 text-sm text-white/70">
          {detecting
            ? 'Detecting your platform from browser metadata...'
            : detectedGuide
              ? `Detected platform: ${detectedGuide.platform}. You can switch manually below.`
              : 'Could not auto-detect your platform. Select one manually below.'}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="story-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Universal baseline</p>
            {detectedGuide && (
              <p className="rounded-full border border-[#8db1c8]/60 bg-[#182432] px-3 py-1 text-xs text-white/85">
                Recommended now: {detectedGuide.platform}
              </p>
            )}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {baseline.map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3 text-sm text-white/77">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="page-band py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Select platform</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guides.map((guide) => {
              const recommended = detectedId === guide.id;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setActive(guide.id)}
                  className={`rounded-md px-4 py-2 text-sm transition ${
                    active === guide.id
                      ? 'bg-[#d7ab73] text-[#11191e]'
                      : 'border border-white/20 bg-white/5 text-white/75 hover:bg-white/10'
                  }`}
                >
                  {guide.platform}
                  {recommended && ' (recommended)'}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGuide.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <section className="story-card p-6 md:p-8">
              <h2 className="text-3xl font-semibold text-white">{currentGuide.platform}</h2>
              <p className="mt-3 max-w-3xl text-sm text-white/74">{currentGuide.summary}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Estimated setup time</p>
                  <p className="mt-1 text-sm text-white/90">{currentGuide.setupTime}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Expected impact</p>
                  <p className="mt-1 text-sm text-white/90">{currentGuide.riskCut}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2">
                  <p className="text-xs text-white/58">Verification points</p>
                  <p className="mt-1 text-sm text-white/90">{currentGuide.checks}</p>
                </div>
              </div>
            </section>

            <section className="story-card p-6 md:p-8">
              <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Step 1</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Essentials first</h3>
              <ul className="mt-3 space-y-2">
                {currentGuide.essentials.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/77">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="story-card p-6 md:p-8">
              <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Step 2</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Hardening controls</h3>
              <ul className="mt-3 space-y-2">
                {currentGuide.hardening.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/77">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="story-card p-6 md:p-8">
              <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Step 3</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Recovery readiness</h3>
              <ul className="mt-3 space-y-2">
                {currentGuide.recovery.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/77">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {currentGuide.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/20 px-3 py-2 text-xs text-white/75 transition hover:border-white/35 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="flex flex-wrap gap-3">
          <Link href="/learn" className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]">
            next: build habits and test credentials
          </Link>
          <Link href="/get-help" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            already compromised? open first-hour help
          </Link>
        </div>
      </section>

    </div>
  );
}
