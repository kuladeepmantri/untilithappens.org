'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Monitor, Smartphone, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface SecurityGuide {
  title: string;
  steps: string[];
}

interface DesktopGuides {
  windows: SecurityGuide[];
  mac: SecurityGuide[];
  linux: SecurityGuide[];
}

interface MobileGuides {
  android: SecurityGuide[];
  ios: SecurityGuide[];
}

interface SecurityGuides {
  desktop: DesktopGuides;
  mobile: MobileGuides;
}

const securityGuides: SecurityGuides = {
  desktop: {
    windows: [
      {
        title: "Windows Security Essentials",
        steps: [
          "Enable Windows Defender real-time protection",
          "Turn on Windows Firewall",
          "Set up Windows automatic updates",
          "Enable BitLocker drive encryption",
          "Install Windows Security updates immediately"
        ]
      },
      {
        title: "Account Security",
        steps: [
          "Use a strong local account password",
          "Enable Windows Hello biometric login",
          "Set up Dynamic Lock with your phone",
          "Create a separate admin account",
          "Enable Controlled Folder Access"
        ]
      }
    ],
    mac: [
      {
        title: "macOS Security Basics",
        steps: [
          "Enable FileVault disk encryption",
          "Turn on macOS Firewall",
          "Enable System Integrity Protection",
          "Use Gatekeeper for app installation",
          "Keep macOS updated automatically"
        ]
      },
      {
        title: "Privacy & Security",
        steps: [
          "Set up Touch ID or Watch unlock",
          "Enable Find My Mac",
          "Use strong iCloud password",
          "Enable two-factor authentication",
          "Review Privacy & Security settings"
        ]
      }
    ],
    linux: [
      {
        title: "Linux Security Foundation",
        steps: [
          "Keep system packages updated",
          "Configure UFW firewall",
          "Enable disk encryption (LUKS)",
          "Use strong user passwords",
          "Install security updates promptly"
        ]
      },
      {
        title: "Advanced Protection",
        steps: [
          "Set up SELinux/AppArmor",
          "Configure system auditing",
          "Use secure boot",
          "Implement fail2ban",
          "Regular security audits"
        ]
      }
    ]
  },
  mobile: {
    android: [
      {
        title: "Android Security Basics",
        steps: [
          "Enable screen lock with biometrics",
          "Turn on Find My Device",
          "Keep Android OS updated",
          "Enable Play Protect",
          "Review app permissions regularly"
        ]
      },
      {
        title: "Data Protection",
        steps: [
          "Enable storage encryption",
          "Use secure lock screen PIN",
          "Regular security updates",
          "Backup data to Google Drive",
          "Use Google Play Store only"
        ]
      }
    ],
    ios: [
      {
        title: "iOS Security Essentials",
        steps: [
          "Enable Face ID/Touch ID",
          "Turn on Find My iPhone",
          "Keep iOS updated",
          "Use strong Apple ID password",
          "Enable two-factor authentication"
        ]
      },
      {
        title: "Privacy Settings",
        steps: [
          "Review app privacy settings",
          "Enable iCloud Keychain",
          "Use App Tracking Protection",
          "Regular privacy checkup",
          "Secure iCloud backup"
        ]
      }
    ]
  }
};

export default function SecurityGuide() {
  const [platform, setPlatform] = useState<'desktop' | 'mobile'>('desktop');
  const [system, setSystem] = useState<'windows' | 'mac' | 'linux' | 'android' | 'ios'>('windows');

  // Helper function to get the correct guides based on platform and system
  const getCurrentGuides = (): SecurityGuide[] => {
    if (platform === 'desktop') {
      return securityGuides.desktop[system as keyof DesktopGuides];
    } else {
      return securityGuides.mobile[system as keyof MobileGuides];
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0066FF] to-[#003399]">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white">
              Security Suggestions
            </h1>
            <p className="text-lg text-white/80">
              Choose your platform and operating system to get personalized security recommendations.
            </p>
          </div>

          {/* Platform Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setPlatform('desktop')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                platform === 'desktop'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-800/50 text-white hover:bg-slate-800'
              }`}
            >
              <Monitor className="w-5 h-5" />
              Desktop
            </button>
            <button
              onClick={() => setPlatform('mobile')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                platform === 'mobile'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-800/50 text-white hover:bg-slate-800'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              Mobile
            </button>
          </div>

          {/* OS Selection */}
          <div className="flex justify-center gap-4 mb-12">
            {platform === 'desktop' ? (
              <>
                {(['windows', 'mac', 'linux'] as const).map((os) => (
                  <button
                    key={os}
                    onClick={() => setSystem(os)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      system === os
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-800/50 text-white hover:bg-slate-800'
                    }`}
                  >
                    {os.charAt(0).toUpperCase() + os.slice(1)}
                  </button>
                ))}
              </>
            ) : (
              <>
                {(['android', 'ios'] as const).map((os) => (
                  <button
                    key={os}
                    onClick={() => setSystem(os)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                      system === os
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-800/50 text-white hover:bg-slate-800'
                    }`}
                  >
                    {os === 'ios' ? 'iOS' : os.charAt(0).toUpperCase() + os.slice(1)}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Security Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            {getCurrentGuides().map((guide: SecurityGuide, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {guide.title}
                </h3>
                <ul className="space-y-3">
                  {guide.steps.map((step: string, stepIndex: number) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 