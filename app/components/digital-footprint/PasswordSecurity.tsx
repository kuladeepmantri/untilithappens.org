'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { value: "7K", label: "password attacks blocked per second" },
  { value: "53%", label: "already using passkeys" },
  { value: "3x", label: "faster than password login" },
  { value: "8x", label: "faster than 2FA" }
];

const passkeysAdvantages = [
  {
    title: "No More Phishing",
    description: "Passkeys are cryptographically bound to specific websites, making phishing impossible",
    impact: "Eliminates most common attack vector"
  },
  {
    title: "Biometric Security",
    description: "Use your fingerprint or face to authenticate, just like unlocking your phone",
    impact: "Natural, secure, and fast"
  },
  {
    title: "Cross-Platform",
    description: "Works seamlessly across all your devices through cloud sync",
    impact: "Available everywhere you are"
  }
];

const currentPasswordIssues = [
  {
    title: "Reuse Risk",
    description: "51% of people reuse passwords across accounts",
    recommendation: "Use unique passwords for every account"
  },
  {
    title: "Breach Exposure",
    description: "13+ billion credentials have been leaked online",
    recommendation: "Monitor for breaches and change compromised passwords"
  },
  {
    title: "Human Error",
    description: "81% of breaches exploit weak or stolen passwords",
    recommendation: "Use a password manager until passkeys are available"
  }
];

const systemPasswordManagers = [
  {
    ecosystem: "Apple",
    name: "iCloud Passwords",
    features: [
      "Built into iOS, iPadOS, and macOS",
      "Syncs across all Apple devices",
      "Passkey support",
      "Face ID/Touch ID integration",
      "Password sharing with family"
    ],
    bestFor: "Apple ecosystem users",
    url: "https://support.apple.com/guide/iphone/passwords-iph35589d1e2/"
  },
  {
    ecosystem: "Google",
    name: "Google Password Manager",
    features: [
      "Built into Chrome and Android",
      "Cross-platform support",
      "Passkey support",
      "Security checkup",
      "Breach alerts"
    ],
    bestFor: "Google/Android users",
    url: "https://passwords.google.com"
  }
];

const securityTools = [
  {
    category: "Cross-Platform Password Managers",
    description: "When you need to work across different ecosystems",
    tools: [
      { 
        name: "Bitwarden",
        desc: "Free, Open Source",
        features: ["Unlimited passwords", "Cross-platform sync", "End-to-end encryption"],
        price: "Free tier available",
        url: "https://bitwarden.com"
      },
      { 
        name: "1Password",
        desc: "Premium Security",
        features: ["Family sharing", "Travel mode", "Secret key protection"],
        price: "From $2.99/month",
        url: "https://1password.com"
      },
      { 
        name: "KeePassXC",
        desc: "Offline Security",
        features: ["Fully offline", "No cloud sync", "Complete control"],
        price: "Free forever",
        url: "https://keepassxc.org"
      },
      { 
        name: "Dashlane",
        desc: "All-in-One Security",
        features: ["VPN included", "Dark web monitoring", "Password health"],
        price: "Free tier available",
        url: "https://dashlane.com"
      }
    ]
  },
  {
    category: "Two-Factor Authentication",
    description: "Add an extra layer of security",
    tools: [
      { 
        name: "Authy",
        desc: "Cloud Backup",
        features: ["Multi-device sync", "Encrypted backups", "Desktop apps"],
        price: "Free",
        url: "https://authy.com"
      },
      { 
        name: "YubiKey",
        desc: "Hardware Security",
        features: ["Phishing-proof", "No batteries", "FIDO2 certified"],
        price: "From $45",
        url: "https://www.yubico.com"
      },
      { 
        name: "2FAS",
        desc: "Modern & Secure",
        features: ["Clean design", "Encrypted backup", "Privacy focused"],
        price: "Free",
        url: "https://2fas.com"
      },
      { 
        name: "Aegis",
        desc: "Open Source",
        features: ["Custom icons", "Encrypted vault", "No tracking"],
        price: "Free",
        url: "https://getaegis.app"
      }
    ]
  },
  {
    category: "Breach Monitoring",
    description: "Stay informed about data leaks",
    tools: [
      { 
        name: "Have I Been Pwned",
        desc: "Industry Standard",
        features: ["Email monitoring", "Password checking", "Real-time alerts"],
        price: "Free",
        url: "https://haveibeenpwned.com"
      },
      { 
        name: "Firefox Monitor",
        desc: "Browser Integration",
        features: ["Email alerts", "HIBP integration", "Dashboard"],
        price: "Free with Firefox",
        url: "https://monitor.firefox.com"
      },
      { 
        name: "DeHashed",
        desc: "Advanced Search",
        features: ["Detailed records", "API access", "Regular updates"],
        price: "Pay per search",
        url: "https://dehashed.com"
      }
    ]
  }
];

// Password strength checker with modern requirements
const checkPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, feedback: "Enter a password" };
  
  let strength = 0;
  let feedback = [];
  
  if (password.length >= 12) strength += 25;
  else feedback.push("Use at least 12 characters");
  
  if (password.match(/[A-Z]/)) strength += 25;
  else feedback.push("Include uppercase letters");
  
  if (password.match(/[0-9]/) && password.match(/[^A-Za-z0-9]/)) strength += 25;
  else feedback.push("Add numbers and symbols");
  
  if (!password.match(/(.)\1{2,}/)) strength += 25;
  else feedback.push("Avoid repeated characters");
  
  return {
    strength,
    feedback: feedback.length ? feedback.join(" • ") : "Strong password!"
  };
};

export default function PasswordSecurity() {
  const [password, setPassword] = useState('');
  const { strength, feedback } = checkPasswordStrength(password);

  return (
    <section className="relative bg-gradient-to-b from-[#2A5C91] via-[#2A5C91] to-[#1F4B7C] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div className="space-y-8" {...fadeIn}>
            <div className="relative">
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="text-white/50 text-sm tracking-wide">The Future of Authentication</span>
              </motion.div>
              <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight">
                Passkeys
                <span className="block text-white/80 mt-4 text-2xl md:text-4xl font-normal">
                  A password-free world is closer than you think
                </span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              Passkeys are revolutionizing how we secure our digital lives. But until they're everywhere,
              let&apos;s make your passwords unbreakable.
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-4">{stat.value}</div>
              <p className="text-sm md:text-lg text-white/60 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* System Password Managers Section */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Start With What You Have
          </h3>
          <p className="text-xl text-white/70 text-center mb-12">
            Your device already includes powerful password management. Here&apos;s what to use based on your ecosystem:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {systemPasswordManagers.map((manager) => (
              <div
                key={manager.ecosystem}
                className="bg-[#2A5C91]/40 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
              >
                <Link href={manager.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-12">
                      <div>
                        <div className="text-3xl font-bold text-white mb-2">{manager.ecosystem}</div>
                        <div className="text-xl text-white/70">{manager.name}</div>
                      </div>
                      <div className="text-sm text-white/40 text-right">
                        Best for:<br/>{manager.bestFor}
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="relative">
                      <div className="absolute top-0 left-8 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>
                      <div className="space-y-8">
                        {manager.features.map((feature, i) => (
                          <div key={i} className="relative pl-12">
                            <div className="absolute left-7 top-[12px] w-2 h-2 rounded-full bg-white/20"></div>
                            <div className="text-white/60">{feature}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-white/5 px-8 py-4 flex items-center justify-between">
                    <div className="text-white/60">Learn more about {manager.ecosystem} security</div>
                    <div className="text-white/40">→</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Passkeys Section */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Why Passkeys Are the Future
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {passkeysAdvantages.map((advantage, i) => (
              <motion.div
                key={advantage.title}
                className="bg-[#2A5C91]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">{advantage.title}</h4>
                <p className="text-white/70 mb-4">{advantage.description}</p>
                <div className="text-sm text-white/60">{advantage.impact}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Password Reality Section */}
        <div className="mb-32">
          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Until Then, Master Your Passwords
            </h3>
            <p className="text-xl text-white/70 text-center">
              While we transition to passkeys, strong passwords remain crucial.
              Try the password strength checker below.
            </p>
          </motion.div>

          {/* Password Strength Demo */}
          <motion.div 
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Try a password..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              />
              <div className="space-y-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${strength}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="text-sm text-white/50 text-center">
                  {feedback}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Current Issues Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {currentPasswordIssues.map((issue, i) => (
              <motion.div
                key={issue.title}
                className="bg-[#2A5C91]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">{issue.title}</h4>
                <p className="text-white/70 mb-4">{issue.description}</p>
                <p className="text-sm text-white/50 italic">
                  Recommendation: {issue.recommendation}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Security Tools Section */}
        <div className="space-y-32">
          {securityTools.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {category.category}
              </h3>
              <p className="text-xl text-white/70 mb-12">{category.description}</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-[#2A5C91]/40 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
                  >
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="mb-8">
                          <div className="text-2xl font-bold text-white mb-2">{tool.name}</div>
                          <div className="text-white/60">{tool.desc}</div>
                        </div>

                        {/* Features */}
                        <div className="relative mb-8">
                          <div className="absolute top-0 left-4 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0"></div>
                          <div className="space-y-4">
                            {tool.features.map((feature, i) => (
                              <div key={i} className="relative pl-8">
                                <div className="absolute left-3 top-[10px] w-2 h-2 rounded-full bg-white/20"></div>
                                <div className="text-sm text-white/60">{feature}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-sm text-white/40">{tool.price}</span>
                          <div className="flex items-center space-x-2 text-white/40 group-hover:text-white/60">
                            <span>Try</span>
                            <span className="text-lg">→</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 