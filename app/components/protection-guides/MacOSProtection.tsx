'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackButton } from '../ui/back-button';

const stats = [
  { value: "11%", label: "real malware threats" },
  { value: "3x", label: "security layers" },
  { value: "SIP", label: "system integrity" }
];

const securitySections = [
  {
    title: "Core Protection",
    description: "Essential security features built into every Mac",
    color: "from-[#801336] to-[#701130]",
    stats: [
      { value: "XProtect", label: "malware defense" },
      { value: "Active", label: "threat monitoring" }
    ],
    steps: [
      {
        heading: "System Updates",
        stat: "Critical patches",
        action: "Keep macOS updated with latest security patches",
        details: "Apple menu > System Settings > Software Update > Enable automatic updates",
        importance: "Critical - Regular updates patch security vulnerabilities"
      },
      {
        heading: "FileVault",
        stat: "Data encryption",
        action: "Enable full disk encryption to protect your data",
        details: "System Settings > Privacy & Security > FileVault > Turn On FileVault",
        importance: "Essential - Protects data if Mac is lost or stolen"
      },
      {
        heading: "Gatekeeper",
        stat: "App security",
        action: "Control which apps can run on your Mac",
        details: "System Settings > Privacy & Security > Allow apps downloaded from: App Store and identified developers",
        importance: "High - Prevents unauthorized apps from running"
      }
    ]
  },
  {
    title: "System Security",
    description: "Advanced protections that safeguard system integrity",
    color: "from-[#701130] to-[#600F2A]",
    stats: [
      { value: "SIP", label: "root protection" },
      { value: "T2/M1+", label: "security chip" }
    ],
    steps: [
      {
        heading: "System Integrity",
        stat: "Core defense",
        action: "Ensure System Integrity Protection is active",
        details: "Terminal command: csrutil status (should show enabled)",
        importance: "Critical - Prevents system file modifications"
      },
      {
        heading: "Login Security",
        stat: "Access control",
        action: "Set strong password and disable automatic login",
        details: "System Settings > Users & Groups > Login Options > Automatic login: Off",
        importance: "High - Prevents unauthorized access"
      },
      {
        heading: "Lockdown Mode",
        stat: "Max protection",
        action: "Enable for high-risk situations (optional)",
        details: "System Settings > Privacy & Security > Lockdown Mode",
        importance: "Advanced - For users requiring extreme security"
      }
    ]
  },
  {
    title: "Privacy & Network",
    description: "Control access to your data and network connections",
    color: "from-[#600F2A] to-[#500D24]",
    stats: [
      { value: "Multi", label: "layer defense" },
      { value: "Zero", label: "trust model" }
    ],
    steps: [
      {
        heading: "Firewall",
        stat: "Network defense",
        action: "Enable built-in firewall to control connections",
        details: "System Settings > Network > Firewall > Turn On Firewall",
        importance: "High - Blocks unauthorized network access"
      },
      {
        heading: "Privacy Controls",
        stat: "Data access",
        action: "Review and manage app permissions",
        details: "System Settings > Privacy & Security > Review all categories",
        importance: "Essential - Controls what apps can access"
      },
      {
        heading: "Time Machine",
        stat: "Data backup",
        action: "Set up encrypted backups",
        details: "System Settings > Time Machine > Select Disk > Encrypt Backups",
        importance: "Critical - Protects against data loss and ransomware"
      }
    ]
  }
];

export default function MacOSProtection({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative w-full">
      <BackButton onClick={onBack} />
      <div>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen">
          <div className="min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#901540] to-[#801336] transition-opacity" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="relative w-full pt-32 md:pt-40">
              <div className="max-w-screen-xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-16"
                >
                  <div className="max-w-4xl">
                    <div className="space-y-12">
                      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-white leading-[0.9] tracking-tight">
                        "Macs don't<br/>
                        <span className="text-white/90">get viruses"</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-white/80 max-w-2xl mt-8">
                        A dangerous myth. While macOS's lower market share meant fewer threats historically, 
                        attackers are now actively targeting Mac users.
                      </p>

                      <div className="mt-16">
                        <div className="relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20 blur-3xl transform -skew-y-12"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-8 py-8">
                            <div className="flex-1">
                              <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-bold text-white">101</span>
                                <span className="text-4xl font-bold text-white/90">%</span>
                              </div>
                              <p className="text-lg text-white/70 mt-4 leading-relaxed">
                                surge in macOS infostealers targeting passwords, credit cards, and personal data
                              </p>
                            </div>
                            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>
                            <div className="flex-1">
                              <p className="text-lg text-white/90">
                                <span className="font-medium">Last two quarters</span> have seen an unprecedented rise 
                                in sophisticated attacks targeting Mac users.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                          {stats.map((stat, i) => (
                            <motion.div 
                              key={i}
                              className="group relative"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + (i * 0.1) }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                              <div className="relative space-y-3">
                                <div className="text-4xl font-bold text-white">{stat.value}</div>
                                <div className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent"></div>
                                <p className="text-sm text-white/60 leading-relaxed">{stat.label}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Sections */}
        {securitySections.map((section, sectionIndex) => (
          <section
            key={section.title}
            className={`w-full bg-gradient-to-b ${section.color}`}
          >
            <div className="py-32 md:py-40">
              <div className="max-w-screen-xl mx-auto px-6">
                <motion.div 
                  className="space-y-16 md:space-y-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Section Header */}
                  <div className="space-y-8 md:space-y-12">
                    <div className="space-y-4">
                      <h2 className="text-3xl md:text-5xl font-bold text-white">{section.title}</h2>
                      <p className="text-lg md:text-xl text-white/70 max-w-2xl">{section.description}</p>
                    </div>

                    {/* Section Stats */}
                    <div className="grid grid-cols-2 gap-8 md:gap-12 max-w-lg">
                      {section.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="space-y-1"
                        >
                          <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                          <p className="text-sm text-white/60">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Steps Grid */}
                  <div className="grid gap-12 md:gap-16">
                    {section.steps.map((step, stepIndex) => (
                      <motion.div
                        key={step.heading}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: stepIndex * 0.1 }}
                        className="relative bg-black/20 rounded-2xl p-8 md:p-12"
                      >
                        <div className="space-y-6 md:space-y-8">
                          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 md:gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{step.heading}</h3>
                            <span className="text-base md:text-lg text-white/40">{step.stat}</span>
                          </div>
                          <p className="text-lg text-white/80">{step.action}</p>
                          <div className="space-y-4">
                            <div className="bg-black/20 rounded-xl px-6 py-4">
                              <p className="text-white/60 font-mono text-sm md:text-base">{step.details}</p>
                            </div>
                            <p className="text-sm md:text-base text-white/40 italic">{step.importance}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 