'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '../ui/back-button';
import { useState } from 'react';

const securityJourney = [
  {
    id: "intro",
    title: "Let's Secure Your Device",
    description: "Your phone holds everything that matters—messages from loved ones, precious photos, personal information. A few simple steps can help keep it all safe.",
    stats: [
      { 
        value: "97%", 
        label: "of mobile threats affect Android devices", 
        context: "While this number might seem scary, understanding basic security steps can make a big difference in keeping your information safe."
      },
      { 
        value: "50B", 
        label: "apps checked for security daily", 
        context: "Security tools are already working in the background. We'll help you make the most of them."
      },
      { 
        value: "14+", 
        label: "ways to protect your device", 
        context: "Simple settings and features you can activate today to better protect your personal information."
      }
    ]
  },
  {
    id: "foundation",
    title: "Start with the Basics",
    description: "Small changes in your settings can significantly improve your security. Let's begin with what matters most.",
    sections: [
      {
        title: "Keep Your Device Updated",
        description: "Updates fix security issues that could put your information at risk.",
        action: "Check if your device needs any security updates",
        path: "Settings → System → System update",
        importance: "Essential First Step",
        details: [
          "Updates protect against newly discovered security issues",
          "Set them to install overnight so they don't interrupt your day",
          "Regular updates help prevent others from accessing your personal information"
        ],
        context: "Security issues are discovered all the time. Updates are your way of staying protected against these new risks."
      },
      {
        title: "Scan Apps for Safety",
        description: "Make sure the apps you download aren't hiding anything harmful.",
        action: "Enable automatic app scanning",
        path: "Play Store → Your Profile → Play Protect → Settings",
        importance: "Basic Protection",
        details: [
          "Automatically checks new apps before they can cause problems",
          "Regularly scans installed apps to ensure they stay safe",
          "Warns you about potentially harmful apps before they can do damage"
        ],
        context: "Some apps can hide harmful code. App scanning helps catch these before they can access your personal information."
      }
    ]
  },
  {
    id: "access",
    title: "Control Who Can Access Your Phone",
    description: "Protect your personal information from people who might pick up your phone when you're not looking.",
    sections: [
      {
        title: "Set Up a Strong Lock",
        description: "Choose a secure way to unlock your phone that works for you.",
        action: "Set up or improve your screen lock",
        path: "Settings → Security → Screen Lock",
        importance: "Must-Have Security",
        details: [
          "Use your fingerprint for quick, secure access",
          "Choose a PIN that others can't easily guess",
          "Add extra protection for sensitive situations"
        ],
        context: "A good lock screen is essential—it keeps others from accessing your personal information, apps, and accounts."
      },
      {
        title: "Convenient but Secure",
        description: "Balance security with ease of use in trusted situations.",
        action: "Customize your security for different situations",
        path: "Settings → Security → Smart Lock",
        importance: "Optional Enhancement",
        details: [
          "Choose places where your phone can stay unlocked",
          "Use trusted devices for easier access",
          "Understand which settings might reduce security"
        ],
        context: "Find the right balance between security and convenience based on your daily routine and comfort level."
      }
    ]
  },
  {
    id: "privacy",
    title: "Take Control of Your Privacy",
    description: "Decide what information apps can access and how your personal data is used.",
    sections: [
      {
        title: "Manage App Permissions",
        description: "Control what each app can access on your device.",
        action: "Review what your apps can access",
        path: "Settings → Privacy → Permission Manager",
        importance: "Privacy Essential",
        details: [
          "See which apps use your location, camera, or contacts",
          "Limit apps to accessing features only when in use",
          "Remove permissions from apps you don't trust"
        ],
        context: "Apps often ask for more access than they need. You have the right to limit what they can see and use."
      },
      {
        title: "Protect Your Information",
        description: "Keep your personal data safe, even if your phone is lost.",
        action: "Check your data protection settings",
        path: "Settings → Security → Encryption",
        importance: "Data Security",
        details: [
          "Make your data unreadable to others",
          "Protect your information if your phone is lost",
          "Secure your personal files and accounts"
        ],
        context: "Encryption helps protect your personal information, making it extremely difficult for others to access without your permission."
      }
    ]
  },
  {
    id: "network",
    title: "Stay Safe Online",
    description: "Protect your information when browsing and using public Wi-Fi.",
    sections: [
      {
        title: "Safer Web Browsing",
        description: "Avoid harmful websites and scams while online.",
        action: "Turn on browsing protection",
        path: "Chrome → Settings → Privacy and Security",
        importance: "Online Safety",
        details: [
          "Get alerts about dangerous websites",
          "Help protect against scam attempts",
          "Keep your passwords and payment info private"
        ],
        context: "Many online threats try to steal your information. These settings help you avoid the riskiest sites and situations."
      },
      {
        title: "Public Wi-Fi Safety",
        description: "Protect your data when using Wi-Fi in public places.",
        action: "Set up protection for public networks",
        path: "Settings → Network & Internet → VPN",
        importance: "Connection Safety",
        details: [
          "Keep your information private on public Wi-Fi",
          "Protect your data when away from home",
          "Stay safer on unknown networks"
        ],
        context: "Public Wi-Fi networks can be risky. Using protection helps keep your personal information private when you're out and about."
      }
    ]
  }
];

export default function AndroidProtection({ onBack }: { onBack: () => void }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#901540] to-[#801336]">
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
                      ? 'text-[#801336]/50' 
                      : 'text-[#801336]'
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