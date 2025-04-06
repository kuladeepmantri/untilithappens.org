'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Search, Shield, AlertTriangle, Lock, Users } from 'lucide-react';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import Oversharing from './digital-footprint/Oversharing';
import PasswordSecurity from './digital-footprint/PasswordSecurity';
import PersonalInfoRemoval from './digital-footprint/PersonalInfoRemoval';

interface Tool {
  name: string;
  description: string;
  type: string;
  loginRequired: boolean;
  pricing: string;
  url?: string;
  icon?: string;
}

interface Category {
  id: string;
  title: string;
  description: string;
  tools: Tool[];
  stats?: {
    value: string;
    label: string;
  }[];
}

const categories: Category[] = [
  {
    id: 'search',
    title: 'Search Engines & Alerts',
    description: 'Monitor and track your online presence across search engines and web mentions',
    stats: [
      {
        value: '80%',
        label: 'of your data is publicly searchable'
      },
      {
        value: '24/7',
        label: 'continuous monitoring'
      }
    ],
    tools: [
      {
        name: 'Google Alerts',
        description: 'Free alerting service to monitor new mentions of your name or keywords online. Get email notifications when your chosen terms appear.',
        type: 'Web search monitoring',
        loginRequired: true,
        pricing: 'Free',
        url: 'https://google.com/alerts'
      },
      {
        name: 'Google Search',
        description: 'The most comprehensive search engine to find your public digital footprint, including images and social profiles.',
        type: 'Web search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://google.com'
      },
      {
        name: 'Google Images',
        description: 'Specialized image search to find photos and visual content associated with your identity.',
        type: 'Image search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://images.google.com'
      },
      {
        name: 'Bing Search',
        description: 'Microsoft&apos;s search engine offering different results and perspectives on your online presence.',
        type: 'Web search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://bing.com'
      }
    ]
  },
  {
    id: 'people-search',
    title: 'People Search & Public Records',
    description: 'Discover what personal information is available through public record aggregators',
    stats: [
      {
        value: '12B+',
        label: 'records indexed'
      },
      {
        value: '95%',
        label: 'accuracy rate'
      }
    ],
    tools: [
      {
        name: 'Spokeo',
        description: 'Search engine with 12 billion records across thousands of sources. Find details like relatives, addresses, and social accounts.',
        type: 'Public data aggregator (USA)',
        loginRequired: false,
        pricing: '$5-20/month',
        url: 'https://spokeo.com'
      },
      {
        name: 'Pipl',
        description: 'Global people search engine finding social profiles and professional info from deep web sources.',
        type: 'Deep web search',
        loginRequired: true,
        pricing: 'Enterprise',
        url: 'https://pipl.com'
      },
      {
        name: 'PeekYou',
        description: 'Free search engine indexing 250M+ people. Find social media profiles, websites, and news mentions.',
        type: 'Public profile index',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://peekyou.com'
      },
      {
        name: 'Yasni',
        description: 'International people search engine that aggregates information from multiple sources worldwide.',
        type: 'Global people search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://yasni.com'
      },
      {
        name: 'Intelius',
        description: 'Comprehensive background check service with access to public records, criminal history, and more.',
        type: 'Background check',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://intelius.com'
      },
      {
        name: 'BeenVerified',
        description: 'Public records search engine with detailed reports on individuals including contact info and assets.',
        type: 'Background check',
        loginRequired: true,
        pricing: 'Subscription',
        url: 'https://beenverified.com'
      },
      {
        name: 'TruthFinder',
        description: 'Deep-dive background check service with comprehensive reports on individuals.',
        type: 'Background check',
        loginRequired: true,
        pricing: 'Subscription',
        url: 'https://truthfinder.com'
      },
      {
        name: 'Whitepages',
        description: 'One of the oldest and largest public record databases for finding people and businesses.',
        type: 'Public records',
        loginRequired: false,
        pricing: 'Freemium',
        url: 'https://whitepages.com'
      }
    ]
  },
  {
    id: 'breach-check',
    title: 'Data Breach & Leak Checkers',
    description: 'Check if your personal data has been exposed in known data breaches',
    stats: [
      {
        value: '24B+',
        label: 'leaked records'
      },
      {
        value: '1.5M',
        label: 'daily checks'
      }
    ],
    tools: [
      {
        name: 'Have I Been Pwned',
        description: 'The most popular breach lookup service. Search by email to see if your data was compromised.',
        type: 'Breach database',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://haveibeenpwned.com'
      },
      {
        name: 'HPI Identity Leak Checker',
        description: 'Academic service checking 14 billion leaked accounts from verified breaches.',
        type: 'Breach database',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://sec.hpi.de/ilc'
      },
      {
        name: 'DeHashed',
        description: 'Commercial breach search engine with detailed query capabilities for emails, usernames, IPs, and more.',
        type: 'OSINT database',
        loginRequired: true,
        pricing: 'Freemium',
        url: 'https://dehashed.com'
      },
      {
        name: 'LeakCheck',
        description: 'Advanced data breach search engine with real-time monitoring and notifications.',
        type: 'Breach monitoring',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://leakcheck.io'
      },
      {
        name: 'BreachDirectory',
        description: 'Searchable database of leaked credentials with API access for automated monitoring.',
        type: 'Breach database',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://breachdirectory.org'
      },
      {
        name: 'SpyCloud',
        description: 'Enterprise-grade breach monitoring with early warning system and automated remediation.',
        type: 'Enterprise monitoring',
        loginRequired: true,
        pricing: 'Enterprise',
        url: 'https://spycloud.com'
      },
      {
        name: 'F-Secure Identity Theft Checker',
        description: 'Free tool by F-Secure to check if your personal information has been stolen.',
        type: 'Identity theft check',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://f-secure.com/identity-theft-checker'
      },
      {
        name: 'Avast Hack Check',
        description: 'Email and password breach monitoring service by Avast Security.',
        type: 'Breach monitoring',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://avast.com/hackcheck'
      },
      {
        name: 'Trend Micro ID Protection',
        description: 'Dark web monitoring service that scans for leaked personal information.',
        type: 'Dark web monitoring',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://idprotection.trendmicro.com'
      }
    ]
  },
  {
    id: 'social-presence',
    title: 'Username & Social Media Presence',
    description: 'Track your social media footprint and username usage across platforms',
    stats: [
      {
        value: '300+',
        label: 'platforms checked'
      },
      {
        value: '24/7',
        label: 'monitoring'
      }
    ],
    tools: [
      {
        name: 'Namechk',
        description: 'Username search engine checking availability across 100+ social sites and domains.',
        type: 'Username search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://namechk.com'
      },
      {
        name: 'KnowEm',
        description: 'Professional username and brand search across 500+ social networks.',
        type: 'Brand protection',
        loginRequired: false,
        pricing: 'Freemium',
        url: 'https://knowem.com'
      },
      {
        name: 'Sherlock',
        description: 'Open-source command-line tool for finding usernames across 300+ social networks.',
        type: 'OSINT tool',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://github.com/sherlock-project/sherlock'
      },
      {
        name: 'WhatsMyName',
        description: 'Web interface for username enumeration across various platforms.',
        type: 'Username search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://whatsmyname.app'
      },
      {
        name: 'Namecheckr',
        description: 'Quick username availability checker for social media and domains.',
        type: 'Username search',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://namecheckr.com'
      },
      {
        name: 'BrandSnag',
        description: 'Professional brand and username monitoring service.',
        type: 'Brand protection',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://brandsnag.com'
      },
      {
        name: 'Social Searcher',
        description: 'Real-time social media search engine for monitoring mentions and posts.',
        type: 'Social monitoring',
        loginRequired: false,
        pricing: 'Freemium',
        url: 'https://social-searcher.com'
      },
      {
        name: 'Social Mention',
        description: 'Social media search and analysis platform for real-time monitoring.',
        type: 'Social monitoring',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://socialmention.com'
      }
    ]
  },
  {
    id: 'identity-monitoring',
    title: 'Identity Exposure & Data Broker Monitoring',
    description: 'Professional services to monitor and remove your personal information',
    stats: [
      {
        value: '100+',
        label: 'data brokers covered'
      },
      {
        value: '90%',
        label: 'removal success rate'
      }
    ],
    tools: [
      {
        name: 'BrandYourself',
        description: 'Complete online reputation management and privacy protection service.',
        type: 'Reputation management',
        loginRequired: true,
        pricing: 'Premium',
        url: 'https://brandyourself.com'
      },
      {
        name: 'PrivacyBee',
        description: 'Automated data broker removal and ongoing privacy protection service.',
        type: 'Privacy protection',
        loginRequired: true,
        pricing: 'Subscription',
        url: 'https://privacybee.com'
      },
      {
        name: 'Optery',
        description: 'Comprehensive data broker removal service with continuous monitoring.',
        type: 'Data broker removal',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://optery.com'
      },
      {
        name: 'DeleteMe',
        description: 'Privacy experts manually opt you out of dozens of data brokers with periodic removal reports.',
        type: 'Data broker removal',
        loginRequired: true,
        pricing: '$129/year',
        url: 'https://joindeleteme.com'
      },
      {
        name: 'OneRep',
        description: 'Automated personal information removal from 100+ data broker sites.',
        type: 'Data broker removal',
        loginRequired: true,
        pricing: 'Subscription',
        url: 'https://onerep.com'
      },
      {
        name: 'Mozilla Firefox Monitor Plus',
        description: 'Premium data breach monitoring and removal service by Mozilla.',
        type: 'Privacy protection',
        loginRequired: true,
        pricing: '$8.99/month',
        url: 'https://monitor.firefox.com'
      }
    ]
  },
  {
    id: 'oauth-tools',
    title: 'Tools Requiring Permissions',
    description: 'Services that need access to your accounts for comprehensive analysis',
    stats: [
      {
        value: '100%',
        label: 'secure OAuth'
      },
      {
        value: '24/7',
        label: 'monitoring'
      }
    ],
    tools: [
      {
        name: 'Mine',
        description: 'AI-powered service that finds and manages your data across companies.',
        type: 'Data discovery',
        loginRequired: true,
        pricing: 'Freemium',
        url: 'https://saymine.com'
      },
      {
        name: 'Scrubber',
        description: 'Automated privacy protection tool that removes sensitive information.',
        type: 'Privacy automation',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://scrubber.ai'
      },
      {
        name: 'Redact',
        description: 'Bulk delete your social media history and sensitive content.',
        type: 'Content removal',
        loginRequired: true,
        pricing: 'Paid',
        url: 'https://redact.dev'
      },
      {
        name: 'Jumbo Privacy',
        description: 'All-in-one privacy app that helps manage your digital life.',
        type: 'Privacy management',
        loginRequired: true,
        pricing: 'Premium',
        url: 'https://jumboprivacy.com'
      },
      {
        name: 'Google Privacy Dashboard',
        description: 'Central hub for managing your Google account privacy settings.',
        type: 'Privacy settings',
        loginRequired: true,
        pricing: 'Free',
        url: 'https://myaccount.google.com/privacy'
      },
      {
        name: 'Facebook Access Your Information',
        description: 'Tool to download and manage your Facebook data.',
        type: 'Data export',
        loginRequired: true,
        pricing: 'Free',
        url: 'https://facebook.com/your_information'
      },
      {
        name: 'Social Media Data Exports',
        description: 'Official data export tools for Twitter, Instagram, and LinkedIn.',
        type: 'Data export',
        loginRequired: true,
        pricing: 'Free',
        url: '#'
      }
    ]
  },
  {
    id: 'tracking',
    title: 'Tracking & Privacy Analysis',
    description: 'Tools to understand who is tracking you online and how',
    stats: [
      {
        value: '75%',
        label: 'of sites track you'
      },
      {
        value: '1000+',
        label: 'trackers detected'
      }
    ],
    tools: [
      {
        name: 'EFF Cover Your Tracks',
        description: 'Comprehensive browser fingerprinting and tracking analysis tool.',
        type: 'Browser privacy',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://coveryourtracks.eff.org'
      },
      {
        name: 'AmIUnique',
        description: 'Detailed browser fingerprint analysis and tracking vulnerability assessment.',
        type: 'Browser fingerprinting',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://amiunique.org'
      },
      {
        name: 'The Markup Blacklight',
        description: 'Privacy inspector for websites that reveals hidden tracking technologies.',
        type: 'Website privacy',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://themarkup.org/blacklight'
      },
      {
        name: 'WhoTracks.me',
        description: 'Database of tracking companies and their prevalence across the web.',
        type: 'Tracker database',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://whotracks.me'
      },
      {
        name: 'BrowserLeaks',
        description: 'Comprehensive suite of browser security and privacy testing tools.',
        type: 'Privacy testing',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://browserleaks.com'
      },
      {
        name: 'DeviceInfo.me',
        description: 'Detailed analysis of your device fingerprint and identifiable information.',
        type: 'Device fingerprinting',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://deviceinfo.me'
      },
      {
        name: 'IPLeak.net',
        description: 'Comprehensive IP, DNS, and WebRTC leak testing tool.',
        type: 'Connection privacy',
        loginRequired: false,
        pricing: 'Free',
        url: 'https://ipleak.net'
      },
      {
        name: 'Google Ad Settings',
        description: 'View and control how Google personalizes ads for you.',
        type: 'Ad privacy',
        loginRequired: true,
        pricing: 'Free',
        url: 'https://adssettings.google.com'
      },
      {
        name: 'Facebook Ad Preferences',
        description: 'Control how Facebook uses your data for advertising.',
        type: 'Ad privacy',
        loginRequired: true,
        pricing: 'Free',
        url: 'https://facebook.com/ads/preferences'
      }
    ]
  }
]; 

export default function DigitalFootprint() {
  const [selectedCategory, setSelectedCategory] = useState<string>('search');
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0D3A3F] via-[#144C52] to-[#0D3A3F]">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden pt-32 md:pt-0">
        <ScrollIndicator />
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
                    <span className="block">digital</span>
                    <span className="block">footprint.</span>
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 max-w-full md:max-w-lg w-full mt-16 md:mt-0">
            <div className="space-y-10 md:space-y-12">
              {/* Description */}
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
                  <div className="text-sm text-white/90 tracking-widest uppercase">your digital presence</div>
                  <p className="text-2xl md:text-2xl lg:text-3xl text-white font-light leading-[1.15]">
                    Every click, search, and post leaves a trace.<br/>
                    <span className="text-white/90">Let&apos;s find what they know about you.</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 gap-12 md:gap-8 px-0"
              >
                <div>
                  <div className="text-4xl md:text-4xl font-bold text-white mb-3">75%</div>
                  <p className="text-sm text-white/90">of your data is public</p>
                </div>
                <div>
                  <div className="text-4xl md:text-4xl font-bold text-white mb-3">24/7</div>
                  <p className="text-sm text-white/90">being tracked online</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section - Now starts after full viewport height */}
      <section className="w-full py-24 relative">
        {/* Vertical Category Indicator */}
        <div className="absolute -left-4 top-0 bottom-0 flex items-center">
          <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
            DIGITAL TOOLS
          </div>
        </div>

        <div className="container mx-auto px-6">
          {/* Category Navigation - Mobile */}
          <div className="md:hidden mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 text-white border border-white/10 focus:border-white/20 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-[#0D3A3F] text-white">
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="hidden md:flex flex-wrap gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id 
                  ? 'bg-white text-[#144C52] shadow-lg' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.title}
              </motion.button>
            ))}
          </div>

          {/* Selected Category Content */}
          <AnimatePresence mode="wait">
            {categories.map((category) => (
              category.id === selectedCategory && (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 md:space-y-16"
                >
                  {/* Category Header */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                    <div className="space-y-4 md:space-y-6">
                      <h2 className="text-2xl md:text-4xl font-bold text-white">{category.title}</h2>
                      <p className="text-lg md:text-xl text-white/80">{category.description}</p>
                    </div>
                    {category.stats && (
                      <div className="grid grid-cols-2 gap-4 md:gap-8">
                        {category.stats.map((stat, index) => (
                          <div key={index} className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="group relative overflow-hidden rounded-lg bg-[#0A2C30] hover:bg-[#0B3236] transition-all duration-300"
                      >
                        <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="text-base md:text-lg font-medium text-white group-hover:text-white transition-colors">
                                {tool.name}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/60">
                                <span>{tool.type}</span>
                                <span className="w-1 h-1 rounded-full bg-white/40" />
                                <span>{tool.pricing}</span>
                              </div>
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

                          <p className="text-xs md:text-sm text-white/70 group-hover:text-white/80">{tool.description}</p>

                          <div className="pt-2 flex items-center gap-3">
                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs ${
                              tool.loginRequired 
                              ? 'bg-[#144C52] text-white/80' 
                              : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {tool.loginRequired ? 'Login Required' : 'No Login'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Protection Components */}
      <Oversharing />
      <PasswordSecurity />
      <PersonalInfoRemoval />

      {/* Footer */}
      <footer className="w-full py-16 md:py-24 bg-[#144C52] relative border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
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
                      { href: "/protect", text: "Protection" }
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
    </div>
  );
} 