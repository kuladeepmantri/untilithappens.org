'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrollIndicator } from '../components/ui/scroll-indicator';

interface DetectedDevice {
  type: string;
  os: string;
  browser: string;
  version: string;
}

export default function Protect() {
  const [detectedDevice, setDetectedDevice] = useState<DetectedDevice | null>(null);
  const [selectedOS, setSelectedOS] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const detectDevice = () => {
    setIsAnalyzing(true);
    // Simulated device detection - in real implementation, this would use actual device detection logic
    setTimeout(() => {
      setDetectedDevice({
        type: 'Desktop',
        os: 'macOS',
        browser: 'Chrome',
        version: '122.0.0'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const systemTypes = [
    { id: 'desktop', label: 'desktop computer.' },
    { id: 'laptop', label: 'laptop.' },
    { id: 'phone', label: 'mobile phone.' },
    { id: 'tablet', label: 'tablet.' }
  ];

  const filteredSystems = systemTypes.filter(system => 
    system.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#801336' }}>
      <ScrollIndicator />
      
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 w-full flex flex-col md:flex-row items-start md:items-center justify-between pt-32 md:pt-0">
          {/* Main Title Group */}
          <div className="relative flex-1 flex items-start md:items-center justify-start w-full">
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
                    <span className="block">protect</span>
                    <span className="block">yourself.</span>
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
                  <div className="text-sm text-white/90 tracking-widest uppercase">your digital safety</div>
                  <p className="text-2xl md:text-2xl lg:text-3xl text-white font-light leading-[1.15]">
                    let us help you stay safe.<br/>
                    <span className="text-white/90">we'll guide you every step.</span>
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
                  <div className="text-4xl md:text-4xl font-bold text-white mb-3">94%</div>
                  <p className="text-sm text-white/90">threats preventable</p>
                </div>
                <div>
                  <div className="text-4xl md:text-4xl font-bold text-white mb-3">3min</div>
                  <p className="text-sm text-white/90">to secure device</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Analysis Section */}
      <section className="w-full py-24 md:py-32 relative">
        <div className="absolute -left-4 top-0 bottom-0 flex items-center">
          <div className="rotate-180 [writing-mode:vertical-lr] text-white/40 text-sm tracking-widest">
            DEVICE ANALYSIS
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Auto Detection Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-4xl text-white font-light tracking-tight">automatic.</h2>
                <p className="text-xl text-white/80 font-light">
                  let us analyze your device and provide personalized protection.
                </p>

                <div className="text-sm text-white/60 leading-relaxed">
                  note: we only analyze your device specifications to provide relevant security recommendations. 
                  no data is stored or processed externally. all analysis happens in your browser.
                </div>

                {!detectedDevice ? (
                  <motion.button
                    onClick={detectDevice}
                    disabled={isAnalyzing}
                    className="relative w-full overflow-hidden bg-white hover:bg-white/90 text-[#801336] px-8 py-6 rounded-lg font-medium transition-all duration-500 text-center text-lg mt-8"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isAnalyzing ? (
                      <span className="block text-xl">analyzing your device...</span>
                    ) : (
                      <>
                        <span className="block text-xl">start analysis.</span>
                        <span className="block text-sm mt-1 opacity-60">detect your system automatically</span>
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="space-y-8 mt-8">
                    <div className="p-8 bg-white/10 rounded-lg space-y-8">
                      <div className="space-y-2">
                        <div className="text-2xl text-white font-light">detected system.</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <div className="text-lg text-white/60 font-light">system</div>
                          <div className="text-2xl text-white">{detectedDevice.type}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg text-white/60 font-light">os</div>
                          <div className="text-2xl text-white">{detectedDevice.os}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg text-white/60 font-light">browser</div>
                          <div className="text-2xl text-white">{detectedDevice.browser}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-lg text-white/60 font-light">version</div>
                          <div className="text-2xl text-white">{detectedDevice.version}</div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => setDetectedDevice(null)}
                      className="group relative overflow-hidden px-6 py-3 rounded-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300 rounded-lg" />
                      <span className="relative text-lg text-white/60 group-hover:text-white font-light">
                        analyze again.
                      </span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Manual Selection Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-4xl text-white font-light tracking-tight">manual.</h2>
                <p className="text-xl text-white/80 font-light">
                  tell us about your device.
                </p>

                <div className="space-y-8 mt-8">
                  {/* Search Input */}
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="what type of device do you use?"
                        className="w-full bg-white/5 border border-white/10 focus:border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-0 transition-colors duration-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {filteredSystems.map((system) => (
                        <motion.button
                          key={system.id}
                          onClick={() => setSelectedOS(system.id)}
                          className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                            selectedOS === system.id ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="p-6">
                            <div className="text-xl text-white font-light">{system.label}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedOS && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full overflow-hidden bg-white hover:bg-white/90 text-[#801336] px-8 py-6 rounded-lg font-medium transition-all duration-500 text-center"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="block text-xl">get protection steps.</span>
                      <span className="block text-sm mt-1 opacity-60">personalized for your system</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 