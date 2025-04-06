'use client';

import { Shield, AlertTriangle, Lock, Laptop, Brain, Heart, ExternalLink, RefreshCcw, ChevronRight, Globe, Users, Zap, Search, Shield as ShieldIcon, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Cta11 } from "@/components/ui/call-to-action";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Navigation } from "@/components/ui/navigation";
import { ScrollIndicator } from "./components/ui/scroll-indicator";

const testimonials = [
  {
    quote: "I watched helplessly as the ransomware encrypted our hospital's patient records. Every minute of delay meant critical care decisions were harder to make. This wasn't just about data—it was about lives.",
    name: "Dr. Sarah Chen",
    designation: "Emergency Medicine, Chicago General",
    src: "/images/doctor.jpg",
    impact: "4,000 patients affected"
  },
  {
    quote: "The scammers used AI to perfectly mimic my daughter's voice, crying for help. I transferred my life savings thinking I was saving her. Now at 67, I have to start over.",
    name: "Robert Martinez",
    designation: "Retired Teacher, Florida",
    src: "/images/elderly.jpg",
    impact: "Life savings lost: $180,000"
  },
  {
    quote: "When our small business was hacked, we lost everything—customer trust, financial records, order history. Twelve employees lost their jobs. These aren't just statistics; these are families.",
    name: "Priya Sharma",
    designation: "Former Business Owner, Mumbai",
    src: "/images/business-owner.jpg",
    impact: "12 families affected"
  }
];

const impactStats = [
  {
    title: "Lives Changed Forever",
    value: "17B+",
    description: "Records exposed in data breaches (2023)",
    story: "A hospital's ransomware attack left doctors unable to access critical patient records during emergencies."
  },
  {
    title: "Small Businesses Lost",
    value: "60%",
    description: "Never recover from cyber attacks",
    story: "A 40-year family business closed after ransomware, leaving 12 employees without jobs."
  },
  {
    title: "Mental Health Impact",
    value: "73%",
    description: "Victims report severe stress & anxiety",
    story: "An elderly couple lost their life savings to an AI voice clone of their grandson."
  }
];

const recentThreats = [
  {
    title: "AI Voice Scams",
    icon: Brain,
    description: "Scammers use AI to perfectly clone voices, leading to a 10x increase in deepfake fraud (2023-2024).",
    impact: "$48M+ lost in 2023 (U.S. alone)",
    color: "from-purple-500/20 to-purple-400/5"
  },
  {
    title: "QR Code Fraud",
    icon: AlertTriangle,
    description: "10% of QR codes may be fraudulent, leading to credential theft and malware.",
    impact: "$75B+ in global losses annually",
    color: "from-rose-500/20 to-rose-400/5"
  },
  {
    title: "Browser Extension Threats",
    icon: Globe,
    description: "Malicious extensions stealing user data, affecting millions.",
    impact: "280M Chrome users exposed in 2024",
    color: "from-blue-500/20 to-blue-400/5"
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-theme">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden">
        <ScrollIndicator />
        {/* Content Container */}
        <div className="relative w-full h-full flex items-start md:items-center justify-center pt-24 md:pt-0">
          <div className="max-w-screen-xl mx-auto px-6 w-full flex flex-col md:flex-row items-start md:items-center justify-between">
            {/* Main Title Group */}
            <div className="relative flex-1 flex items-start md:items-center justify-start w-full">
              {/* Vertical Text Container */}
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

                <div className="relative">
                  {/* Main Title */}
                  <motion.div 
                    className="flex flex-col items-start"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    <h1 
                      className="text-[clamp(4rem,15vw,8rem)] font-bold tracking-tighter text-white leading-[0.85]"
                      style={{ fontFamily: 'var(--font-geist-sans)' }}
                    >
                      <span className="block">until it</span>
                      <span className="block">happens.</span>
                    </h1>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="flex-1 max-w-full md:max-w-lg w-full mt-16 md:mt-0">
              <div className="space-y-10 md:space-y-12">
                {/* AI Warning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute -left-3 top-0 w-[1px] h-full bg-gradient-to-b from-white/0 via-white to-white/0" />
                  <motion.div 
                    className="pl-8 space-y-5 md:space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    <div className="text-sm text-white/90 tracking-widest uppercase">real case: ai scam</div>
                    <p className="text-2xl md:text-2xl lg:text-3xl text-white font-light leading-[1.15]">
                      82-year-old thought son-in-law was in trouble.<br/>
                      <span className="text-white/90">lost $17,000 to AI scammers.</span>
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/90">
                      <span className="text-white">family devastated</span>
                      <span className="w-1 h-1 rounded-full bg-white/90" />
                      <span>trust shattered forever</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* AI Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-2 gap-12 md:gap-8 px-0"
                >
                  <div>
                    <div className="text-4xl md:text-4xl font-bold text-white mb-3">1 in 4</div>
                    <p className="text-sm text-white/90">experienced AI scams</p>
                  </div>
                  <div>
                    <div className="text-4xl md:text-4xl font-bold text-white mb-3">$108M</div>
                    <p className="text-sm text-white/90">lost to AI scams in 2024</p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col gap-4"
                >
                  <Link
                    href="/check-footprint"
                    className="group relative overflow-hidden bg-white hover:bg-white/90 text-theme px-8 py-5 rounded-lg font-medium transition-all duration-500 text-center w-full text-lg"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={false}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative z-10">see what they know about you.</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Breach Impact Section */}
      <section className="w-full py-24 bg-[#0D3A3F] relative border-t border-white/5">
        <div className="container relative z-10">
          {/* Vertical Year Indicator */}
          <div className="absolute -left-4 top-0 bottom-0 flex items-center">
            <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
              2024 BREACH REPORT
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Primary Stat */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <div className="text-[8rem] md:text-[12rem] font-bold text-white leading-none tracking-tighter">
                    429<span className="text-white/90 text-6xl md:text-8xl">%</span>
                  </div>
                  <div className="text-xl md:text-2xl text-white/80">
                    Data breach exposure increase in Q1 2024
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 p-8 bg-white/5 border border-white/5 rounded-lg"
            >
              <div className="text-5xl md:text-6xl font-bold text-white">1.9T</div>
              <div className="text-lg text-white/80">Records impacted in 2024 Q1 alone</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6 p-8 bg-white/5 border border-white/5 rounded-lg"
            >
              <div className="text-5xl md:text-6xl font-bold text-white">26B</div>
              <div className="text-lg text-white/80">"Mother of All Breaches" combined records</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6 p-8 bg-white/5 border border-white/5 rounded-lg"
            >
              <div className="text-5xl md:text-6xl font-bold text-white">12B+</div>
              <div className="text-lg text-white/80">Breached accounts tracked globally</div>
            </motion.div>
          </div>

          {/* Data Types List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="text-xl text-white/60">EXPOSED DATA TYPES</div>
              <div className="flex flex-wrap gap-3">
                {[
                  'Passwords',
                  'Phone Numbers',
                  'Home Addresses',
                  'Financial Data',
                  'Biometric Data',
                  'Health Records',
                  'Genetic Info'
                ].map((item) => (
                  <span key={item} className="px-4 py-2 bg-white/5 text-white/80 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-xl text-white/60">MAJOR PLATFORMS</div>
              <div className="flex flex-wrap gap-3">
                {[
                  'Facebook',
                  'LinkedIn',
                  'Yahoo',
                  'Aadhaar',
                  'CoWIN',
                  'DMV Records',
                  'DNA Services'
                ].map((item) => (
                  <span key={item} className="px-4 py-2 bg-white/5 text-white/80 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Psychological & Financial Impact Section */}
      <section className="w-full py-24 bg-[#144C52] relative border-t border-white/5">
        <div className="container relative z-10">
          {/* Vertical Year Indicator */}
          <div className="absolute -left-4 top-0 bottom-0 flex items-center">
            <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
              HUMAN COST
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Emotional Impact Column */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-xl text-white/60">EMOTIONAL TOLL</div>
                
                {/* Large Stat */}
                <div className="space-y-3">
                  <div className="text-[7rem] md:text-[8rem] font-bold text-white leading-none tracking-tighter">
                    73<span className="text-white/90 text-4xl md:text-5xl">%</span>
                  </div>
                  <div className="text-xl text-white/80">
                    victims report severe stress
                  </div>
                </div>

                {/* Mental Health Stats */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">63%</div>
                    <div className="text-sm text-white/70">report anxiety</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-white mb-2">18%</div>
                    <div className="text-sm text-white/70">suffer depression</div>
                  </div>
                </div>

                {/* Emotional Response Tags */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { text: 'Fear', value: '47%' },
                    { text: 'Shame', value: '56%' },
                    { text: 'Anger', value: '49%' },
                    { text: 'Suicidal Thoughts', value: '3%' }
                  ].map((item) => (
                    <div key={item.text} className="px-4 py-2 bg-white/5 rounded-lg">
                      <div className="text-sm font-medium text-white">{item.value}</div>
                      <div className="text-xs text-white/60">{item.text}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Financial Impact Column */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="text-xl text-white/60">FINANCIAL DEVASTATION</div>
                
                {/* Large Financial Stat */}
                <div className="space-y-3">
                  <div className="text-[5rem] md:text-[6rem] font-bold text-white leading-none tracking-tighter">
                    $12.5B
                  </div>
                  <div className="text-xl text-white/80">
                    lost to cybercrime in U.S. (2023)
                  </div>
                </div>

                {/* Business Impact */}
                <div className="p-6 bg-white/5 rounded-lg">
                  <div className="text-5xl font-bold text-white mb-3">60%</div>
                  <div className="text-lg text-white/80">small businesses shut down within 6 months of a cyberattack</div>
                </div>

                {/* Common Scams */}
                <div className="space-y-4">
                  <div className="text-sm text-white/60 uppercase tracking-wider">Common Attack Types</div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Voice Cloning',
                      'Phishing',
                      'Crypto Fraud',
                      'OTP/UPI Fraud'
                    ].map((scam) => (
                      <div key={scam} className="px-4 py-3 bg-white/5 rounded-lg text-sm text-white/80 border border-white/5">
                        {scam}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Behavioral Changes */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="text-sm text-white/60 uppercase tracking-wider">Security Awareness Impact</div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">54%</div>
                    <div className="text-sm text-white/70">increased privacy concern</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">47%</div>
                    <div className="text-sm text-white/70">improved security practices</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Edge Cases & Emerging Threats Section */}
      <section className="w-full py-32 bg-[#0D3A3F] relative border-t border-white/5">
        <div className="container relative z-10">
          {/* Vertical Year Indicator */}
          <div className="absolute -left-4 top-0 bottom-0 flex items-center">
            <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
              NEW THREATS
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-32">
            {/* Hero Stat */}
            <div className="max-w-screen-lg">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="text-sm text-white/60 uppercase tracking-widest">AI-Powered Deception</div>
                  <div className="text-[7rem] md:text-[10rem] font-bold text-white leading-none tracking-tighter">
                    10<span className="text-white/90 text-4xl md:text-6xl">×</span>
                  </div>
                </div>
                <div className="max-w-xl">
                  <div className="text-xl md:text-2xl text-white/80 leading-relaxed">
                    Surge in AI voice cloning attacks targeting families and businesses
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[
                {
                  value: "$48M",
                  label: "Lost to SIM swapping",
                  story: "They hijacked my phone number. Within minutes, my bank accounts were drained.",
                  impact: "U.S. losses in 2023"
                },
                {
                  value: "280M",
                  label: "Chrome users at risk",
                  story: "The extension was reading all my passwords. Every account I had was compromised.",
                  impact: "Malicious extensions"
                },
                {
                  value: "75B+",
                  label: "QR code fraud",
                  story: "One scan at a restaurant. That's all it took to steal my credit card details.",
                  impact: "Annual global losses"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative space-y-6"
                >
                  <div className="space-y-3">
                    <div className="text-5xl md:text-6xl font-bold text-white">{stat.value}</div>
                    <div className="text-lg text-white/80">{stat.label}</div>
                  </div>
                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="text-sm text-white/70 italic leading-relaxed">
                      "{stat.story}"
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">
                      {stat.impact}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Threat Types & Prevention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              {/* Critical Threats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="text-sm text-white/60 uppercase tracking-widest">Critical Vulnerabilities</div>
                  <div className="space-y-6">
                    {[
                      { 
                        title: "SIM Swapping",
                        desc: "Carriers tricked into transferring phone numbers",
                        impact: "Complete account takeover in minutes"
                      },
                      { 
                        title: "AI Voice Cloning",
                        desc: "Perfect mimicry of loved ones voices",
                        impact: "Emotional manipulation for financial fraud"
                      },
                      { 
                        title: "Malicious Extensions",
                        desc: "Hidden data theft in browser add-ons",
                        impact: "Silent theft of passwords and credit cards"
                      }
                    ].map((item) => (
                      <div key={item.title} className="space-y-3">
                        <div className="text-xl font-medium text-white">{item.title}</div>
                        <div className="text-sm text-white/70">{item.desc}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider">{item.impact}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Prevention */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="text-sm text-white/60 uppercase tracking-widest">Immediate Actions</div>
                  <div className="space-y-8">
                    {[
                      {
                        action: 'Enable SIM PIN',
                        context: 'First line of defense against SIM swapping'
                      },
                      {
                        action: 'Use Authenticator Apps',
                        context: 'Never rely on SMS for 2FA'
                      },
                      {
                        action: 'Audit Browser Extensions',
                        context: 'Remove unused or suspicious add-ons'
                      },
                      {
                        action: 'Verify Voice Calls',
                        context: 'Have a family security phrase'
                      }
                    ].map((item) => (
                      <div key={item.action} className="space-y-2">
                        <div className="text-lg font-medium text-white">{item.action}</div>
                        <div className="text-sm text-white/70">{item.context}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 md:py-24 bg-[#144C52] relative border-t border-white/5">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="text-2xl font-bold text-white tracking-tight">
                  until it happens.
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <Link
                  href="https://www.linkedin.com/company/until-it-happens"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Users className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/untilithappens"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/untilithappens"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/untilithappens"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="View our GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Navigation Columns */}
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-12">
                {[
                  {
                    title: "Learn",
                    links: [
                      { href: "/check-footprint", text: "Digital Footprint" },
                      { href: "/threats", text: "Threats" },
                      { href: "/security-guide", text: "Protection" }
                    ]
                  },
                  {
                    title: "Help",
                    links: [
                      { href: "/get-help", text: "Get Help" },
                      { href: "/community", text: "Community" },
                      { href: "/report", text: "Report" }
                    ]
                  }
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-6"
                  >
                    <div className="text-sm text-white/60 uppercase tracking-widest">
                      {section.title}
                    </div>
                    <div className="space-y-4">
                      {section.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="block text-sm text-white/80 hover:text-white transition-colors"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="text-sm text-white/50">
              © 2025 until it happens
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
} 