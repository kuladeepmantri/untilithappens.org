'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Oversharing() {
  return (
    <section className="relative min-h-screen bg-[#0D3A3F] py-24">
      {/* Vertical Category Indicator */}
      <div className="absolute -left-4 top-0 bottom-0 flex items-center">
        <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
          DIGITAL PROTECTION
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Impact Stats */}
          <div className="space-y-16">
            {/* Title Group */}
            <div className="relative">
              <motion.div
                className="absolute -inset-x-20 -inset-y-20 bg-white/10 blur-3xl rounded-full hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.05, 0.1, 0.05],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white leading-[0.85]"
                >
                  your data<br/>
                  never sleeps.
                </motion.h2>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-sm text-white/90 tracking-widest uppercase">oversharing impact</div>
                  <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                    Every detail you share becomes a permanent part of your digital identity.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="text-5xl md:text-6xl font-bold text-white">86%</div>
                <p className="text-sm text-white/70">use multiple emails for privacy</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                <div className="text-5xl md:text-6xl font-bold text-white">70%</div>
                <p className="text-sm text-white/70">use pseudonyms online</p>
              </motion.div>
            </div>

            {/* Risk Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="text-sm text-white/60 uppercase tracking-widest">Critical Risks</div>
              <div className="grid gap-6">
                {[
                  {
                    title: "Identity Theft",
                    desc: "Your real name + birthday = stolen identity"
                  },
                  {
                    title: "Location Tracking",
                    desc: "79% have location sharing always on"
                  },
                  {
                    title: "Data Aggregation",
                    desc: "Every post builds your digital profile"
                  }
                ].map((risk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="p-6 bg-[#0A2C30] rounded-lg space-y-2 hover:bg-[#0B3236] transition-colors"
                  >
                    <h3 className="text-lg font-medium text-white">{risk.title}</h3>
                    <p className="text-sm text-white/70">{risk.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Protection Tools */}
          <div className="relative space-y-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -inset-x-20 -inset-y-20 bg-white/5 blur-3xl rounded-full"
            />
            
            {/* Email Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative space-y-8"
            >
              <h3 className="text-xl font-semibold text-white">Email Protection</h3>
              <div className="grid gap-4">
                {[
                  {
                    name: "SimpleLogin",
                    desc: "Create unlimited email aliases",
                    type: "Email Alias",
                    url: "https://simplelogin.io"
                  },
                  {
                    name: "Firefox Relay",
                    desc: "Mozilla's email masking service",
                    type: "Email Mask",
                    url: "https://relay.firefox.com"
                  },
                  {
                    name: "ProtonMail",
                    desc: "End-to-end encrypted email",
                    type: "Secure Email",
                    url: "https://proton.me/mail"
                  }
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="group relative overflow-hidden rounded-lg bg-[#0A2C30] hover:bg-[#0B3236] transition-all duration-300"
                  >
                    <div className="p-4 md:p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="text-base font-medium text-white">{tool.name}</h4>
                          <div className="text-sm text-white/60">{tool.type}</div>
                        </div>
                        {tool.url && (
                          <Link
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-[#144C52] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-white/70 group-hover:text-white/80">{tool.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Identity Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative space-y-8"
            >
              <h3 className="text-xl font-semibold text-white">Identity Protection</h3>
              <div className="grid gap-4">
                {[
                  {
                    name: "MySudo",
                    desc: "Create multiple digital identities",
                    type: "Identity Management",
                    url: "https://mysudo.com"
                  },
                  {
                    name: "Burner",
                    desc: "Temporary phone numbers",
                    type: "Phone Privacy",
                    url: "https://burner.com"
                  },
                  {
                    name: "DuckDuckGo",
                    desc: "Private browser with tracker blocking",
                    type: "Browser Privacy",
                    url: "https://duckduckgo.com"
                  }
                ].map((tool, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="group relative overflow-hidden rounded-lg bg-[#0A2C30] hover:bg-[#0B3236] transition-all duration-300"
                  >
                    <div className="p-4 md:p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="text-base font-medium text-white">{tool.name}</h4>
                          <div className="text-sm text-white/60">{tool.type}</div>
                        </div>
                        {tool.url && (
                          <Link
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-[#144C52] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white" />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-white/70 group-hover:text-white/80">{tool.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 