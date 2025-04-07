'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { value: "70%", label: "share personal details weekly" },
  { value: "15M", label: "identity theft victims" },
  { value: "78%", label: "of burglars use social media" },
  { value: "40%", label: "admit posting sensitive info" }
];

const risks = [
  {
    title: "Identity Theft",
    impact: "Criminals piece together your life from public posts",
    stat: "1 in 5 identity theft victims had info taken from social media",
    suggestion: "Use unique usernames and limit personal details across platforms"
  },
  {
    title: "Physical Safety",
    impact: "Real-time location sharing exposes your daily patterns",
    stat: "79% have location sharing enabled by default",
    suggestion: "Share locations after events, not during them"
  },
  {
    title: "Digital Footprint",
    impact: "Everything you share becomes a permanent record",
    stat: "40% admit posting sensitive personal information",
    suggestion: "Think twice before sharing personal milestones"
  }
];

const solutions = [
  {
    category: "Email Protection",
    description: "86% use multiple emails for privacy",
    suggestion: "Create separate emails for different purposes - personal, shopping, and subscriptions",
    tools: [
      { name: "SimpleLogin", desc: "Create unlimited aliases", url: "https://simplelogin.io" },
      { name: "Firefox Relay", desc: "Mask your real email", url: "https://relay.firefox.com" },
      { name: "ProtonMail", desc: "Encrypted email service", url: "https://proton.me/mail" }
    ]
  },
  {
    category: "Identity Protection",
    description: "70% use pseudonyms for better privacy",
    suggestion: "Use different usernames across platforms to prevent cross-platform tracking",
    tools: [
      { name: "MySudo", desc: "Digital identity manager", url: "https://mysudo.com" },
      { name: "Bitwarden", desc: "Secure password manager", url: "https://bitwarden.com" },
      { name: "KnowEm", desc: "Username checker", url: "https://knowem.com" }
    ]
  },
  {
    category: "Phone Privacy",
    description: "Your number is a unique identifier",
    suggestion: "Use temporary numbers for non-essential services and online shopping",
    tools: [
      { name: "Google Voice", desc: "Free virtual number", url: "https://voice.google.com" },
      { name: "Burner", desc: "Temporary numbers", url: "https://burner.com" },
      { name: "TextNow", desc: "Free text & calls", url: "https://textnow.com" }
    ]
  },
  {
    category: "Location Privacy",
    description: "55% unknowingly share their location",
    suggestion: "Regularly audit app permissions and location sharing settings",
    tools: [
      { name: "DuckDuckGo", desc: "Private browsing", url: "https://duckduckgo.com" },
      { name: "Brave Browser", desc: "Built-in protection", url: "https://brave.com" },
      { name: "Tor Browser", desc: "Anonymous browsing", url: "https://torproject.org" }
    ]
  }
];

export default function Oversharing() {
  return (
    <section className="relative bg-gradient-to-b from-[#1F4B7C] via-[#2A5C91] to-[#2A5C91] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div className="space-y-8" {...fadeIn}>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Your data never sleeps.
              <span className="block text-white/80 mt-2">Neither do those who want it.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              Every post, every check-in, every detail you share becomes a permanent part of your digital identity.
              Learn how to protect yourself.
            </p>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-32"
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
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4">{stat.value}</div>
              <p className="text-base md:text-lg text-white/60 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Risks Section */}
        <div className="mb-32">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
            {...fadeIn}
          >
            The Hidden Costs of Oversharing
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {risks.map((risk, i) => (
              <motion.div
                key={risk.title}
                className="flex flex-col h-full bg-[#2A5C91]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-2xl font-bold text-white mb-4">{risk.title}</h4>
                <p className="text-white/70 mb-4">{risk.impact}</p>
                <div className="text-sm text-white/60 mb-6">{risk.stat}</div>
                <p className="text-sm text-white/50 mt-auto italic">
                  Suggestion: {risk.suggestion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Solutions Section */}
        <div>
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-white mb-16 text-center"
            {...fadeIn}
          >
            Take Control of Your Privacy
          </motion.h3>
          <div className="grid gap-12">
            {solutions.map((solution, i) => (
              <motion.div
                key={solution.category}
                className="bg-[#2A5C91]/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="grid md:grid-cols-[1fr,2fr] gap-8">
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-white">{solution.category}</h4>
                    <p className="text-white/70">{solution.description}</p>
                    <p className="text-sm text-white/50 italic">{solution.suggestion}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {solution.tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col justify-center p-4 bg-[#1F4B7C]/40 rounded-lg hover:bg-[#3674B5]/40 transition-colors group"
                      >
                        <span className="text-white font-medium mb-1">{tool.name}</span>
                        <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                          {tool.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 