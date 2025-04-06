'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { value: "89%", label: "of your data is for sale" },
  { value: "4,000+", label: "data points tracked per person" },
  { value: "72%", label: "reduction in exposure after removal" }
];

const dataExposureScenarios = [
  {
    type: 'email',
    placeholder: 'Type an email address...',
    exposures: [
      { source: 'Data Broker', details: 'Full name, age, relatives, current address' },
      { source: 'Social Media', details: 'Work history, education, connections' },
      { source: 'Public Records', details: 'Property ownership, court records' }
    ]
  },
  {
    type: 'phone',
    placeholder: 'Type a phone number...',
    exposures: [
      { source: 'People Search', details: 'Previous addresses, associated names' },
      { source: 'Marketing Lists', details: 'Shopping habits, income range' },
      { source: 'Phone Directories', details: 'Current location, carrier data' }
    ]
  },
  {
    type: 'name',
    placeholder: 'Type your full name...',
    exposures: [
      { source: 'Background Check', details: 'Employment history, criminal records' },
      { source: 'Web Mentions', details: 'News articles, public mentions' },
      { source: 'Data Aggregators', details: 'Combined profile from multiple sources' }
    ]
  }
];

const stages = [
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Find where your data lives',
    tools: [
      {
        name: 'Data Broker Search',
        description: 'Automated scanning across 200+ data brokers',
        timeEstimate: '24 hours',
        services: ['DeleteMe', 'Optery', 'PrivacyBee']
      },
      {
        name: 'Account Finder',
        description: 'Locate forgotten accounts and profiles',
        timeEstimate: '1-2 days',
        services: ['Mine', 'JustDelete.me', 'AccountKiller']
      }
    ]
  },
  {
    id: 'removal',
    title: 'Removal',
    description: 'Reclaim your information',
    tools: [
      {
        name: 'Automated Removal',
        description: 'Continuous monitoring and takedown',
        timeEstimate: '30-90 days',
        services: ['OneRep', 'Kanary', 'Incogni']
      },
      {
        name: 'Manual Cleanup',
        description: 'Direct opt-out from major sources',
        timeEstimate: '1-2 weeks',
        services: ['BackgroundChecks.org', 'Norton Privacy']
      }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    description: 'Stay protected',
    tools: [
      {
        name: 'Search Monitoring',
        description: 'Track new appearances of your data',
        timeEstimate: 'Ongoing',
        services: ['Google Alerts', 'DuckDuckGo', 'Reputation Defender']
      },
      {
        name: 'Social Cleanup',
        description: 'Manage social media exposure',
        timeEstimate: 'Weekly',
        services: ['Redact.dev', 'TweetDelete', 'Scrubber']
      }
    ]
  }
];

export default function PersonalInfoRemoval() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showExposure, setShowExposure] = useState(false);

  // Reset exposure when switching scenarios
  useEffect(() => {
    setInputValue('');
    setShowExposure(false);
  }, [activeScenario]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 3) {
      setShowExposure(true);
    } else {
      setShowExposure(false);
    }
  };

  const currentScenario = dataExposureScenarios[activeScenario];

  return (
    <section className="relative bg-[#092528] py-8 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-32">
          <motion.div className="space-y-6 md:space-y-8" {...fadeIn}>
            <div className="relative">
              <motion.div 
                className="mb-4 md:mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="text-white/50 text-sm tracking-wide">Your Digital Exposure</span>
              </motion.div>
              <h2 className="text-3xl md:text-7xl font-bold text-white leading-tight">
                Take Back Control
                <span className="block text-xl md:text-4xl text-white/80 mt-2 md:mt-4 font-normal">
                  See What&apos;s Out There
                </span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Interactive Demo */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16 md:mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#0A2C30] p-4 md:p-8 rounded-2xl border border-white/5">
            <div className="space-y-6">
              {/* Scenario Selector */}
              <div className="flex gap-2 md:gap-4 mb-6">
                {dataExposureScenarios.map((scenario, index) => (
                  <button
                    key={scenario.type}
                    onClick={() => setActiveScenario(index)}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base transition-all ${
                      activeScenario === index
                        ? 'bg-white text-[#092528] font-medium'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {scenario.type}
                  </button>
                ))}
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={currentScenario.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 md:px-6 py-3 md:py-4 text-base md:text-xl text-white placeholder-white/30 focus:outline-none focus:border-white/20"
              />

              {/* Exposure Details */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: showExposure ? 1 : 0,
                  height: showExposure ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {currentScenario.exposures.map((exposure, index) => (
                  <motion.div
                    key={exposure.source}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0D3A3F]/50 rounded-xl p-4 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8">
                      <div className="text-white/90 font-medium">{exposure.source}</div>
                      <div className="text-white/60 text-sm md:text-base">{exposure.details}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-16 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              className="text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-4">{stat.value}</div>
              <p className="text-sm md:text-base text-white/60 leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16 md:space-y-24">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="grid md:grid-cols-[1fr,2fr] gap-8 md:gap-12">
                  {/* Stage Info */}
                  <div className="relative">
                    <div className="md:sticky md:top-8 space-y-4">
                      <div className="text-6xl md:text-8xl font-bold text-white/10">0{index + 1}</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{stage.title}</h3>
                      <p className="text-base md:text-lg text-white/70">{stage.description}</p>
                    </div>
                  </div>

                  {/* Tools Grid */}
                  <div className="space-y-4 md:space-y-6">
                    {stage.tools.map((tool) => (
                      <motion.div
                        key={tool.name}
                        className="bg-[#0A2C30]/50 rounded-2xl border border-white/5 overflow-hidden"
                        whileHover={{ y: -2 }}
                      >
                        <div className="p-4 md:p-6 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
                            <div>
                              <h4 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{tool.name}</h4>
                              <p className="text-sm md:text-base text-white/70">{tool.description}</p>
                            </div>
                            <div className="text-sm text-white/40">{tool.timeEstimate}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {tool.services.map((service) => (
                              <span 
                                key={service}
                                className="px-2 md:px-3 py-1 rounded-full bg-[#144C52] text-white/80 text-xs md:text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
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