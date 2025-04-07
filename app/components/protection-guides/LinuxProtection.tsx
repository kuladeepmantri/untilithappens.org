'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackButton } from '../ui/back-button';

const stats = [
  { value: "54%", label: "server malware" },
  { value: "3x", label: "security layers" },
  { value: "SELinux", label: "core defense" },
  { value: "24/7", label: "active monitoring" }
];

const securitySections = [
  {
    title: "Essential Protection",
    description: "Core security features that form your first line of defense",
    color: "from-[#801336] to-[#701130]",
    stats: [
      { value: "Auto", label: "security updates" },
      { value: "UFW", label: "firewall active" }
    ],
    steps: [
      {
        heading: "System Updates",
        stat: "Critical patches",
        action: "Keep your system updated with latest security patches",
        details: "sudo apt update && sudo apt upgrade (Ubuntu/Debian) or equivalent",
        importance: "Critical - Regular updates patch security vulnerabilities"
      },
      {
        heading: "UFW Firewall",
        stat: "Network defense",
        action: "Enable and configure Uncomplicated Firewall",
        details: "sudo ufw enable && sudo ufw default deny incoming",
        importance: "Essential - Blocks unauthorized network access"
      },
      {
        heading: "User Privileges",
        stat: "Access control",
        action: "Use sudo for admin tasks, avoid root login",
        details: "Create standard user accounts, use sudo when needed",
        importance: "High - Limits potential damage from attacks"
      }
    ]
  },
  {
    title: "Advanced Security",
    description: "Kernel-level and specialized protections for stronger defense",
    color: "from-[#701130] to-[#600F2A]",
    stats: [
      { value: "MAC", label: "protection" },
      { value: "LUKS", label: "encryption" }
    ],
    steps: [
      {
        heading: "AppArmor/SELinux",
        stat: "Process control",
        action: "Enable and configure Mandatory Access Control",
        details: "Check status with aa-status or sestatus",
        importance: "Critical - Confines applications to minimal permissions"
      },
      {
        heading: "Disk Encryption",
        stat: "Data protection",
        action: "Use LUKS encryption for sensitive data",
        details: "Configure during install or use cryptsetup for existing partitions",
        importance: "High - Protects data if hardware is stolen"
      },
      {
        heading: "Secure Boot",
        stat: "Boot security",
        action: "Enable UEFI Secure Boot if hardware supports it",
        details: "Check status in BIOS/UEFI settings",
        importance: "Recommended - Prevents bootloader tampering"
      }
    ]
  },
  {
    title: "Monitoring & Recovery",
    description: "Active system monitoring and data protection measures",
    color: "from-[#600F2A] to-[#500D24]",
    stats: [
      { value: "IDS", label: "intrusion detection" },
      { value: "Audit", label: "system logs" }
    ],
    steps: [
      {
        heading: "Intrusion Detection",
        stat: "Active defense",
        action: "Install and configure AIDE or OSSEC",
        details: "Regular system file integrity checks",
        importance: "High - Detects unauthorized system changes"
      },
      {
        heading: "System Auditing",
        stat: "Log monitoring",
        action: "Configure auditd for security monitoring",
        details: "Set up audit rules for critical system events",
        importance: "Essential - Tracks security-relevant events"
      },
      {
        heading: "Backup Strategy",
        stat: "Data safety",
        action: "Implement automated encrypted backups",
        details: "Use tools like restic or borg for secure backups",
        importance: "Critical - Protects against data loss and ransomware"
      }
    ]
  }
];

export default function LinuxProtection({ onBack }: { onBack: () => void }) {
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
                    <div className="space-y-8">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                      >
                        <span className="px-4 py-2 rounded-full bg-white/10 text-sm text-white/90 tracking-widest">
                          LINUX SECURITY
                        </span>
                      </motion.div>
                      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-white leading-[0.9] tracking-tight">
                        Secure your<br/>
                        <span className="text-white/60">Linux system.</span>
                      </h1>
                      <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
                        While Linux is inherently secure, proper configuration is crucial. Let's strengthen your system's defenses against modern threats.
                      </p>

                      <div className="mt-16">
                        <div className="relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20 blur-3xl transform -skew-y-12"></div>
                          <div className="relative flex flex-col md:flex-row items-center gap-8 py-8">
                            <div className="flex-1">
                              <div className="flex items-baseline gap-3">
                                <span className="text-6xl font-bold text-white">54</span>
                                <span className="text-4xl font-bold text-white/90">%</span>
                              </div>
                              <p className="text-lg text-white/70 mt-4 leading-relaxed">
                                of detected malware targets Linux systems, primarily servers
                              </p>
                            </div>
                            <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>
                            <div className="flex-1">
                              <p className="text-lg text-white/90">
                                Linux systems are increasingly targeted by sophisticated attacks, especially in server environments.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Stats Grid */}
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
                  <div className="grid md:grid-cols-3 gap-8">
                    {section.steps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <div className="relative space-y-4 p-8">
                          <div className="space-y-2">
                            <div className="text-sm text-white/40">{step.stat}</div>
                            <h3 className="text-2xl font-bold text-white">{step.heading}</h3>
                          </div>
                          <div className="h-px w-12 bg-gradient-to-r from-white/40 to-transparent"></div>
                          <div className="space-y-4">
                            <p className="text-white/70">{step.action}</p>
                            <div className="text-sm text-white/50">{step.details}</div>
                            <div className="text-sm text-white/40">{step.importance}</div>
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