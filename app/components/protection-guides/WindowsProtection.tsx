'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackButton } from '../ui/back-button';

const stats = [
  { value: "94%", label: "threats preventable" },
  { value: "24/7", label: "active protection" },
  { value: "60%", label: "of attacks target OS" },
  { value: "2.0", label: "TPM recommended" }
];

const securitySections = [
  {
    title: "Essential Protection",
    description: "Core Windows security features that form your first line of defense",
    color: "from-[#801336] to-[#701130]",
    stats: [
      { value: "90%+", label: "common threats blocked" },
      { value: "Active", label: "threat monitoring" }
    ],
    steps: [
      {
        heading: "Windows Security",
        stat: "Primary defense",
        action: "Enable real-time protection and cloud-delivered protection",
        details: "Start > Windows Security > Virus & threat protection > Manage settings > Enable all protections",
        importance: "Critical - Your main protection against malware, as effective as paid solutions"
      },
      {
        heading: "Automatic Updates",
        stat: "Critical patches",
        action: "Keep Windows updated to patch security vulnerabilities",
        details: "Settings > Windows Update > Turn on automatic updates",
        importance: "Essential - Regular updates patch security holes"
      },
      {
        heading: "SmartScreen",
        stat: "Web & app safety",
        action: "Block malicious sites and unrecognized apps",
        details: "Windows Security > App & browser control > Ensure SmartScreen is enabled",
        importance: "High - Prevents phishing and malicious downloads"
      }
    ]
  },
  {
    title: "Advanced Security",
    description: "Hardware-based and specialized protections for stronger defense",
    color: "from-[#701130] to-[#600F2A]",
    stats: [
      { value: "HVCI", label: "optional protection" },
      { value: "TPM", label: "recommended" }
    ],
    steps: [
      {
        heading: "Core Isolation",
        stat: "Memory protection",
        action: "Enable Memory Integrity for kernel protection",
        details: "Windows Security > Device security > Core isolation > Enable Memory Integrity",
        importance: "High - Protects against kernel-level malware"
      },
      {
        heading: "BitLocker",
        stat: "Drive encryption",
        action: "Encrypt your drives to protect data if device is lost",
        details: "Settings > Privacy & Security > BitLocker > Turn on BitLocker",
        importance: "Critical - Prevents data theft if device is stolen"
      },
      {
        heading: "Ransomware Protection",
        stat: "File protection",
        action: "Enable Controlled Folder Access to block unauthorized changes",
        details: "Windows Security > Virus & threat protection > Ransomware protection > Turn on Controlled folder access",
        importance: "High - Prevents ransomware from encrypting your files"
      }
    ]
  },
  {
    title: "Network & Account",
    description: "Protect your connections and control system access",
    color: "from-[#600F2A] to-[#500D24]",
    stats: [
      { value: "Multi", label: "layer defense" },
      { value: "User", label: "access control" }
    ],
    steps: [
      {
        heading: "Windows Firewall",
        stat: "Network defense",
        action: "Block unauthorized network access",
        details: "Windows Security > Firewall & network protection > Enable for all networks",
        importance: "Critical - Blocks hackers and malware communication"
      },
      {
        heading: "User Account Control",
        stat: "Admin rights",
        action: "Use standard account for daily tasks, admin for changes",
        details: "Settings > System > About > Advanced system settings > User Account Control",
        importance: "High - Limits damage if malware runs"
      },
      {
        heading: "Windows Hello",
        stat: "Secure login",
        action: "Set up biometric or PIN sign-in",
        details: "Settings > Accounts > Sign-in options > Set up Windows Hello",
        importance: "Recommended - More secure than passwords"
      }
    ]
  }
];

interface WindowsProtectionProps {
  onBack: () => void;
}

const WindowsProtection = ({ onBack }: WindowsProtectionProps) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-[#901540] to-[#801336]">
        <BackButton onClick={onBack} />
        <div className="min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative w-full pt-24">
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
                        WINDOWS SECURITY
                      </span>
                    </motion.div>
                    <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-bold text-white leading-[0.9] tracking-tight">
                      Let's secure<br/>
                      <span className="text-white/60">your Windows PC.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
                      Your Windows system comes with powerful built-in protections. We'll help you understand and activate these features to keep your digital life secure.
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                    >
                      <div className="space-y-2">
                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{stat.value}</div>
                        <p className="text-sm md:text-base text-white/60 leading-tight">{stat.label}</p>
                      </div>
                    </motion.div>
                  ))}
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
  );
};

export default WindowsProtection; 