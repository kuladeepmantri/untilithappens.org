'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '../ui/back-button';
import { useState } from 'react';

const securityJourney = [
  {
    id: "intro",
    title: "Let's Keep Your iPhone Safe",
    description: "Your phone carries your world—personal messages, photos, banking details. Simple steps can help protect everything that matters to you.",
    stats: [
      { 
        value: "3%", 
        label: "of mobile threats target iOS devices", 
        context: "While iOS is naturally secure, understanding key protections helps keep your personal information even safer."
      },
      { 
        value: "2FA", 
        label: "adds an extra layer of security", 
        context: "Two-factor authentication helps ensure only you can access your accounts, even if someone gets your password."
      },
      { 
        value: "15+", 
        label: "built-in security features", 
        context: "Your device already has powerful security tools. We'll help you make the most of them."
      }
    ]
  },
  {
    id: "foundation",
    title: "Essential Security Steps",
    description: "Let's start with the basics that make the biggest difference in protecting your information.",
    sections: [
      {
        title: "Keep iOS Current",
        description: "Updates include important security fixes that protect your information.",
        action: "Enable automatic updates",
        path: "Settings → General → Software Update → Automatic Updates",
        importance: "Critical Protection",
        details: [
          "Get security fixes as soon as they're available",
          "Enable automatic security responses for quick patches",
          "Protect against newly discovered security issues"
        ],
        context: "Security threats evolve constantly. Updates are your first line of defense against new risks."
      },
      {
        title: "Set Up Strong Device Lock",
        description: "Your lock screen is the front door to all your personal information.",
        action: "Create a strong passcode and set up Face ID/Touch ID",
        path: "Settings → Face ID & Passcode",
        importance: "Essential Security",
        details: [
          "Use an alphanumeric code instead of just numbers",
          "Enable Face ID or Touch ID for convenient security",
          "Turn on 'Erase Data' after 10 failed attempts"
        ],
        context: "A strong passcode keeps others from accessing your personal information, even if they have your device."
      }
    ]
  },
  {
    id: "privacy",
    title: "Take Control of Your Privacy",
    description: "Your data belongs to you. Let's make sure it stays that way.",
    sections: [
      {
        title: "App Privacy Controls",
        description: "Control exactly what information apps can access.",
        action: "Review app permissions",
        path: "Settings → Privacy & Security",
        importance: "Privacy Essential",
        details: [
          "Check which apps use location, camera, or contacts",
          "Limit apps to accessing features only when needed",
          "Review and adjust notification previews"
        ],
        context: "Apps might ask for more access than they need. You have the power to limit what they can see and use."
      },
      {
        title: "Protect Your iCloud Data",
        description: "Keep your backups and cloud data secure.",
        action: "Enable Advanced Data Protection",
        path: "Settings → Apple ID → iCloud → Advanced Data Protection",
        importance: "Data Security",
        details: [
          "End-to-end encrypt your iCloud backups",
          "Secure your photos and messages in the cloud",
          "Protect your data even if iCloud is compromised"
        ],
        context: "Advanced Data Protection ensures only you can access your sensitive information in iCloud."
      }
    ]
  },
  {
    id: "browsing",
    title: "Safe Online Activities",
    description: "Stay protected while browsing, messaging, and using public networks.",
    sections: [
      {
        title: "Secure Web Browsing",
        description: "Browse safely and protect your information online.",
        action: "Enable Safari protection features",
        path: "Settings → Safari → Privacy & Security",
        importance: "Online Safety",
        details: [
          "Block trackers and cross-site tracking",
          "Get warnings about fraudulent websites",
          "Use Private Browsing for sensitive activities"
        ],
        context: "Safari's built-in protections help keep your browsing private and warn you about dangerous sites."
      },
      {
        title: "Network Security",
        description: "Stay safe on public Wi-Fi and cellular networks.",
        action: "Set up network protection",
        path: "Settings → Privacy & Security → iCloud Private Relay",
        importance: "Connection Safety",
        details: [
          "Hide your IP address while browsing",
          "Protect your location from websites",
          "Encrypt your DNS queries"
        ],
        context: "Public Wi-Fi can be risky. Features like Private Relay help keep your online activity private."
      }
    ]
  },
  {
    id: "advanced",
    title: "Advanced Protection",
    description: "Extra security measures for those who need maximum protection.",
    sections: [
      {
        title: "Lockdown Mode",
        description: "Extreme protection against sophisticated attacks.",
        action: "Consider enabling Lockdown Mode",
        path: "Settings → Privacy & Security → Lockdown Mode",
        importance: "Maximum Security",
        details: [
          "Block most message attachments",
          "Disable potentially vulnerable features",
          "Prevent unknown connections"
        ],
        context: "Lockdown Mode significantly limits features but provides the highest level of protection against targeted attacks."
      },
      {
        title: "Physical Security",
        description: "Protect against physical access to your device.",
        action: "Review lock screen access",
        path: "Settings → Face ID & Passcode → Allow Access When Locked",
        importance: "Physical Protection",
        details: [
          "Control what's accessible on lock screen",
          "Limit USB accessory connections",
          "Enable Find My iPhone features"
        ],
        context: "These settings help protect your information even when someone has physical access to your device."
      }
    ]
  }
];

export default function IOSProtection({ onBack }: { onBack: () => void }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="relative w-full min-h-screen" style={{ backgroundColor: '#801336' }}>
      <BackButton onClick={onBack} />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-white/80 to-white"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentSection / (securityJourney.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative pt-32 pb-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16 md:space-y-24"
            >
              {/* Section Header */}
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block"
                  >
                    <span className="px-6 py-3 rounded-full bg-white/10 text-sm font-medium text-white/90 tracking-wider backdrop-blur-sm">
                      {currentSection + 1} of {securityJourney.length}
                    </span>
                  </motion.div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                    {securityJourney[currentSection].title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
                    {securityJourney[currentSection].description}
                  </p>
                </div>

                {/* Stats for Intro Section */}
                {currentSection === 0 && securityJourney[0]?.stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {securityJourney[0].stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="relative group"
                      >
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm">
                          <div className="space-y-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-5xl md:text-6xl font-bold text-white">{stat.value}</span>
                            </div>
                            <div className="h-px w-16 bg-gradient-to-r from-white/40 to-transparent" />
                            <p className="text-lg text-white/70">{stat.label}</p>
                            <p className="text-base text-white/60 leading-relaxed">{stat.context}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Security Sections */}
                {currentSection > 0 && securityJourney[currentSection]?.sections && (
                  <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {securityJourney[currentSection].sections.map((section, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="relative"
                      >
                        <button
                          onClick={() => {
                            if (!isAnimating) {
                              setIsAnimating(true);
                              setExpandedSection(expandedSection === section.title ? null : section.title);
                              setTimeout(() => setIsAnimating(false), 300);
                            }
                          }}
                          className="w-full text-left"
                        >
                          <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                            expandedSection === section.title 
                              ? 'bg-gradient-to-br from-white/15 to-white/5' 
                              : 'bg-gradient-to-br from-white/10 to-transparent'
                          } backdrop-blur-sm`}>
                            <div className="p-8 space-y-6">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-3">
                                  <div className="text-sm font-medium text-white/60 uppercase tracking-wider">
                                    {section.importance}
                                  </div>
                                  <h3 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h3>
                                  <p className="text-lg text-white/70 leading-relaxed">{section.description}</p>
                                </div>
                                <motion.div
                                  animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-white/60 text-xl"
                                >
                                  ↓
                                </motion.div>
                              </div>
                              
                              <AnimatePresence>
                                {expandedSection === section.title && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                  >
                                    <div className="pt-6 space-y-8 border-t border-white/10">
                                      <div className="space-y-6">
                                        <div className="space-y-4">
                                          <div className="text-white/60">Ready to Act?</div>
                                          <div className="text-xl text-white font-medium">{section.action}</div>
                                        </div>
                                        <div className="space-y-4">
                                          <div className="text-white/60">Here's How:</div>
                                          <div className="text-lg text-white/90 font-medium bg-white/5 rounded-lg px-4 py-3">
                                            {section.path}
                                          </div>
                                        </div>
                                        <div className="space-y-4">
                                          <div className="text-white/60">What You'll Get:</div>
                                          <div className="space-y-3">
                                            {section.details.map((detail, j) => (
                                              <div key={j} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                                                <div className="text-white/80 text-lg">{detail}</div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div className="mt-6 p-4 rounded-lg bg-white/5">
                                          <p className="text-white/70 text-lg leading-relaxed">
                                            {section.context}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-12">
                <button
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSection(prev => Math.max(0, prev - 1));
                      setExpandedSection(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                    currentSection === 0 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-white/10 backdrop-blur-sm'
                  }`}
                  disabled={currentSection === 0 || isAnimating}
                >
                  <span className="text-white font-medium">Previous</span>
                </button>

                <button
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentSection(prev => Math.min(securityJourney.length - 1, prev + 1));
                      setExpandedSection(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`px-8 py-4 rounded-xl transition-all duration-300 ${
                    currentSection === securityJourney.length - 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'bg-white hover:bg-white/90 backdrop-blur-sm'
                  }`}
                  disabled={currentSection === securityJourney.length - 1 || isAnimating}
                >
                  <span className={`font-medium ${
                    currentSection === securityJourney.length - 1 
                      ? 'text-[#0055FF]/50' 
                      : 'text-[#0055FF]'
                  }`}>Continue</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 