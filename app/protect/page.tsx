'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { GuideFlow } from '@/components/site/guide-flow';
import { PasswordStrengthLab } from '@/components/site/password-strength-lab';

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
  'Enable auto-updates for operating system, browsers, and password manager.',
  'Use unique credentials and MFA for every critical account.',
  'Keep one offline or immutable backup and test restore monthly.',
  'Remove stale apps/extensions and revoke unknown sessions.',
];

const guides: Guide[] = [
  {
    id: 'windows',
    platform: 'Windows',
    summary: 'Defender, Firewall, BitLocker, and account hardening are your main native controls.',
    essentials: [
      'Confirm Defender real-time protection is enabled.',
      'Turn on automatic Windows security updates.',
      'Enable Defender Firewall for all profiles.',
      'Use BitLocker/device encryption where available.',
    ],
    hardening: [
      'Use a standard account for daily work, admin only for changes.',
      'Reduce remote exposure and disable unused services.',
      'Review startup tasks and extensions monthly.',
    ],
    recovery: [
      'Store BitLocker recovery keys safely.',
      'Keep disconnected backup copies after backup jobs complete.',
    ],
    links: [
      {
        label: 'Windows Security settings (Microsoft)',
        href: 'https://support.microsoft.com/en-us/windows/windows-security-app-settings-1ec98620-1d39-8420-6f13-60448c7b31fd',
      },
    ],
  },
  {
    id: 'macos',
    platform: 'macOS',
    summary: 'Prioritize updates, FileVault, Apple ID security, and strict app permissions.',
    essentials: [
      'Enable automatic updates and rapid security responses.',
      'Turn on FileVault full-disk encryption.',
      'Review app access to camera, mic, files, and location.',
      'Disable automatic login and require strong local password.',
    ],
    hardening: [
      'Separate admin and daily-use accounts.',
      'Audit login items and unknown launch agents.',
      'Enable Advanced Data Protection if risk justifies it.',
    ],
    recovery: [
      'Run encrypted Time Machine backups.',
      'Set recovery contacts and safeguard Apple recovery options.',
    ],
    links: [
      { label: 'Apple Account two-factor authentication', href: 'https://support.apple.com/en-us/ht204915' },
      { label: 'Advanced Data Protection', href: 'https://support.apple.com/en-us/102651' },
    ],
  },
  {
    id: 'android',
    platform: 'Android',
    summary: 'Patch velocity, Play Protect, and permission controls drive the biggest risk reduction.',
    essentials: [
      'Install OS/security updates quickly.',
      'Enable Play Protect automatic scans.',
      'Use biometric lock plus strong PIN/passphrase.',
      'Restrict app permissions to minimal access.',
    ],
    hardening: [
      'Avoid sideloading unless verified and required.',
      'Review accessibility permissions for unknown apps.',
      'Remove dormant apps with broad permission scope.',
    ],
    recovery: [
      'Enable remote locate/lock/wipe.',
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
    summary: 'Strong passcode policy and Apple ID controls are the core of iPhone/iPad resilience.',
    essentials: [
      'Keep iOS/iPadOS on automatic update.',
      'Use strong passcode plus Face ID/Touch ID.',
      'Turn on Apple ID two-factor authentication.',
      'Review lock-screen exposure and privacy settings.',
    ],
    hardening: [
      'Disable lock-screen controls you do not need.',
      'Use Private Relay and tracker protections where available.',
      'Enable Lockdown Mode for elevated threat profiles.',
    ],
    recovery: [
      'Verify Find My and trusted recovery contacts.',
      'Maintain encrypted backup options for fast restore.',
    ],
    links: [
      { label: 'Apple Account two-factor authentication', href: 'https://support.apple.com/en-us/ht204915' },
      { label: 'iPhone Lockdown Mode', href: 'https://support.apple.com/en-us/105120' },
    ],
  },
  {
    id: 'linux',
    platform: 'Linux',
    summary: 'Configuration discipline matters most: updates, service minimization, and log monitoring.',
    essentials: [
      'Apply updates on a fixed cadence or unattended flow.',
      'Use a host firewall with deny-by-default inbound policy.',
      'Disable password SSH login where key auth is possible.',
      'Limit sudo/admin membership and review often.',
    ],
    hardening: [
      'Enable SELinux/AppArmor where supported.',
      'Remove unnecessary network services and open ports.',
      'Track auth and system logs for abnormal patterns.',
    ],
    recovery: [
      'Test full backup restore, not only backup creation.',
      'Keep baseline configs for quick rebuild.',
    ],
    links: [
      { label: 'Ubuntu security overview', href: 'https://ubuntu.com/security' },
      { label: 'Debian security management', href: 'https://wiki.debian.org/SecurityManagement' },
    ],
  },
];

export default function ProtectPage() {
  const [active, setActive] = useState(guides[0].id);
  const currentGuide = useMemo(
    () => guides.find((guide) => guide.id === active) ?? guides[0],
    [active]
  );

  return (
    <div className="aurora-bg relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute left-4 top-36 h-72 w-72 rounded-full bg-[#76c6bb]/17 blur-3xl float-orb" />
      <div className="pointer-events-none absolute right-4 top-52 h-72 w-72 rounded-full bg-[#d7ab73]/14 blur-3xl float-orb" />

      <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-14 md:pt-20">
        <span className="guide-chip">Protection playbook</span>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.9] text-white sm:text-6xl">
          Harden the systems you already use
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/77">
          Choose your platform, apply essentials first, then layer hardening and recovery controls. This page is designed to teach by action.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="story-card panel-gradient p-6">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Universal baseline</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {baseline.map((item) => (
              <p key={item} className="rounded-lg border border-white/12 bg-black/25 px-3 py-2 text-sm text-white/77">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/30 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-ui-mono text-xs uppercase tracking-[0.2em] text-white/55">Select platform</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guides.map((guide) => (
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
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentGuide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="story-card p-6 md:p-8"
          >
            <h2 className="text-3xl font-semibold text-white">{currentGuide.platform}</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/74">{currentGuide.summary}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Essentials</p>
                <ul className="mt-2 space-y-2">
                  {currentGuide.essentials.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/77">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Hardening</p>
                <ul className="mt-2 space-y-2">
                  {currentGuide.hardening.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/77">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-ui-mono text-xs uppercase tracking-[0.16em] text-white/55">Recovery</p>
                <ul className="mt-2 space-y-2">
                  {currentGuide.recovery.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/77">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

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
          </motion.article>
        </AnimatePresence>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <PasswordStrengthLab />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/learn" className="rounded-md bg-[#d7ab73] px-4 py-2 text-sm font-medium text-[#11191e] hover:bg-[#e1b988]">
            next: build long-term habits
          </Link>
          <Link href="/get-help" className="rounded-md border border-white/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10">
            already compromised? get help
          </Link>
        </div>
      </section>

      <GuideFlow />
    </div>
  );
}
