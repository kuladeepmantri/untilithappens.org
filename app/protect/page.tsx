'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ScrollIndicator } from '../components/ui/scroll-indicator';
import { BackButton } from '../components/ui/back-button';
import WindowsProtection from '../components/protection-guides/WindowsProtection';
import MacOSProtection from '../components/protection-guides/MacOSProtection';
import LinuxProtection from '../components/protection-guides/LinuxProtection';
import AndroidProtection from '../components/protection-guides/AndroidProtection';
import IOSProtection from '../components/protection-guides/iOSProtection';
import Link from 'next/link';
import { WindowsIcon, AppleIcon } from '../components/icons';
import Image from 'next/image';

// Import images statically to ensure they're included in the build
import linuxIcon from '../../public/images/linux.png';
import androidIcon from '../../public/images/android.png';
import iosIcon from '../../public/images/ios.png';

interface DetectedDevice {
  type: string;
  os: string;
  version?: string;
  architecture?: string;
  detectionData?: {
    userAgent: string;
    platform: string;
  };
}

interface DeviceMatch {
  id: string;
  type: string;
  os: string;
  model: string;
  category: string;
  keywords: string[];
}

interface OS {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const operatingSystems = {
  desktop: [
    { id: 'windows', name: 'Windows', icon: WindowsIcon },
    { id: 'macos', name: 'macOS', icon: AppleIcon },
    { 
      id: 'linux', 
      name: 'Linux', 
      icon: ({ className }: { className?: string }) => (
        <Image
          src={linuxIcon}
          alt="Linux"
          width={32}
          height={32}
          className={className}
          priority
        />
      )
    }
  ],
  mobile: [
    { 
      id: 'android', 
      name: 'Android', 
      icon: ({ className }: { className?: string }) => (
        <Image
          src={androidIcon}
          alt="Android"
          width={32}
          height={32}
          className={className}
          priority
        />
      )
    },
    { 
      id: 'ios', 
      name: 'iOS', 
      icon: ({ className }: { className?: string }) => (
        <Image
          src={iosIcon}
          alt="iOS"
          width={32}
          height={32}
          className={className}
          priority
        />
      )
    }
  ]
} as const;

export default function Protect() {
  const [detectedDevice, setDetectedDevice] = useState<DetectedDevice | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceMatch | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [step, setStep] = useState<'initial' | 'detection' | 'manual' | 'results'>('initial');
  const [showOSTooltip, setShowOSTooltip] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const deviceDatabase: DeviceMatch[] = [
    // Samsung Devices
    {
      id: 'samsung-s-series',
      type: 'Phone',
      os: 'Android',
      model: 'Samsung Galaxy S Series',
      category: 'Mobile',
      keywords: ['samsung', 'galaxy', 's23', 's22', 's21', 's20', 'ultra', 'plus', 'android']
    },
    {
      id: 'samsung-fold',
      type: 'Phone',
      os: 'Android',
      model: 'Samsung Galaxy Fold/Flip',
      category: 'Mobile',
      keywords: ['samsung', 'galaxy', 'fold', 'flip', 'z fold', 'z flip', 'android']
    },
    {
      id: 'samsung-tablet',
      type: 'Tablet',
      os: 'Android',
      model: 'Samsung Galaxy Tab',
      category: 'Tablet',
      keywords: ['samsung', 'galaxy', 'tab', 's8', 's7', 'tablet', 'android']
    },
    // Apple Devices
    {
      id: 'iphone',
      type: 'Phone',
      os: 'iOS',
      model: 'iPhone',
      category: 'Mobile',
      keywords: ['iphone', 'apple', 'ios', '15', '14', '13', '12', 'pro', 'max', 'plus']
    },
    // Google Devices
    {
      id: 'pixel',
      type: 'Phone',
      os: 'Android',
      model: 'Google Pixel',
      category: 'Mobile',
      keywords: ['google', 'pixel', '8', '7', '6', 'pro', 'android']
    },
    // OnePlus Devices
    {
      id: 'oneplus',
      type: 'Phone',
      os: 'Android',
      model: 'OnePlus',
      category: 'Mobile',
      keywords: ['oneplus', '12', '11', '10', 'pro', 'android']
    },
    // Xiaomi Devices
    {
      id: 'xiaomi',
      type: 'Phone',
      os: 'Android',
      model: 'Xiaomi',
      category: 'Mobile',
      keywords: ['xiaomi', 'redmi', 'poco', 'mi', 'android']
    },
    // OPPO Devices
    {
      id: 'oppo',
      type: 'Phone',
      os: 'Android',
      model: 'OPPO',
      category: 'Mobile',
      keywords: ['oppo', 'find', 'reno', 'android']
    },
    // Computers
    {
      id: 'windows-hp',
      type: 'Laptop',
      os: 'Windows',
      model: 'HP Laptop',
      category: 'Computer',
      keywords: ['hp', 'pavilion', 'envy', 'spectre', 'windows', 'laptop']
    },
    {
      id: 'windows-dell',
      type: 'Laptop',
      os: 'Windows',
      model: 'Dell Laptop',
      category: 'Computer',
      keywords: ['dell', 'xps', 'inspiron', 'latitude', 'windows', 'laptop']
    },
    {
      id: 'windows-lenovo',
      type: 'Laptop',
      os: 'Windows',
      model: 'Lenovo Laptop',
      category: 'Computer',
      keywords: ['lenovo', 'thinkpad', 'yoga', 'ideapad', 'windows', 'laptop']
    },
    // Add a generic Windows entry
    {
      id: 'windows-os',
      type: 'Computer',
      os: 'Windows',
      model: 'Windows PC',
      category: 'Computer',
      keywords: ['windows', 'pc', 'computer', 'desktop']
    }
  ];

  const detectDevice = async () => {
    setIsAnalyzing(true);
    setStep('detection');
    
    try {
      const userAgent = window.navigator.userAgent.toLowerCase();
      let platform = window.navigator.platform.toLowerCase();
      const vendor = window.navigator.vendor;
      
      let detectedOS = '';
      let deviceType = '';
      let version = '';
      
      // Enhanced OS Detection with multiple checks
      if (userAgent.includes('win') || platform.includes('win')) {
        detectedOS = 'Windows';
        if (userAgent.includes('windows nt 10.0')) {
          const build = userAgent.match(/build\s(\d+)/i);
          version = build && parseInt(build[1]) >= 22000 ? 'Windows 11' : 'Windows 10';
        } else if (userAgent.includes('windows nt 6.3')) version = 'Windows 8.1';
        else if (userAgent.includes('windows nt 6.2')) version = 'Windows 8';
        else if (userAgent.includes('windows nt 6.1')) version = 'Windows 7';
      } else if ((userAgent.includes('mac') || platform.includes('mac')) && vendor?.includes('Apple')) {
        detectedOS = 'macOS';
        const macOSVersion = userAgent.match(/mac os x (\d+[._]\d+[._]\d+)/i);
        if (macOSVersion) {
          const versionStr = macOSVersion[1].replace(/_/g, '.');
          const major = parseInt(versionStr.split('.')[0]);
          if (major >= 14) version = 'Sonoma';
          else if (major >= 13) version = 'Ventura';
          else if (major >= 12) version = 'Monterey';
          else if (major >= 11) version = 'Big Sur';
        }
        // Override platform display for Mac
        platform = 'Mac';
      } else if (userAgent.includes('android')) {
        detectedOS = 'Android';
        const match = userAgent.match(/android\s([0-9.]*)/i);
        if (match) version = `Android ${match[1]}`;
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
        detectedOS = 'iOS';
        const match = userAgent.match(/os\s([0-9_]*)/i);
        if (match) version = `iOS ${match[1].replace(/_/g, '.')}`;
      } else if (userAgent.includes('linux')) {
        detectedOS = 'Linux';
        if (userAgent.includes('ubuntu')) version = 'Ubuntu';
        else if (userAgent.includes('fedora')) version = 'Fedora';
        else if (userAgent.includes('debian')) version = 'Debian';
        else if (userAgent.includes('arch')) version = 'Arch';
      }
      
      // Device Type Detection
      if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
        deviceType = 'Mobile';
      } else if (userAgent.includes('ipad') || (userAgent.includes('tablet') && !userAgent.includes('mobile'))) {
        deviceType = 'Tablet';
      } else {
        deviceType = 'Computer';
      }

      // Architecture detection (important for security features)
      let architecture = '';
      if (userAgent.includes('x64') || userAgent.includes('x86_64') || userAgent.includes('win64') || userAgent.includes('amd64')) {
        architecture = 'x64';
      } else if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
        architecture = 'ARM64';
      } else if (userAgent.includes('x86') || userAgent.includes('i386') || userAgent.includes('i686')) {
        architecture = 'x86';
      }

      // If we couldn't detect the OS, transition to manual selection
      if (!detectedOS) {
        console.log('No OS detected, transitioning to manual selection');
        setTimeout(() => {
          setIsAnalyzing(false);
          setStep('manual');
        }, 2000);
        return;
      }

      const detected: DetectedDevice = {
        type: deviceType,
        os: detectedOS,
        version: version || platform,
        architecture,
        detectionData: {
          userAgent,
          platform
        }
      };

      console.log('Device detected:', detected);
      setDetectedDevice(detected);

      // Create a matching device entry based on detected OS
      const baseDevice: DeviceMatch = {
        id: detectedOS.toLowerCase(),
        type: deviceType,
        os: detectedOS,
        model: `${detectedOS} Device`,
        category: deviceType,
        keywords: [detectedOS.toLowerCase()]
      };

      setSelectedDevice(baseDevice);

      // Show loading animation for 2 seconds
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000);

      // Show detection results for 5 seconds, then transition to protection guide
      setTimeout(() => {
        if (detectedOS) {
          setStep('results');
          window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
          setStep('manual');
        }
      }, 7000); // 2s loading + 5s results = 7s total

    } catch (error) {
      console.error('Error during device detection:', error);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep('manual');
      }, 2000);
    }
  };

  const getDeviceSuggestions = (query: string) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    
    // Check if it's a direct OS match first
    const osKeywords = ['windows', 'android', 'ios', 'ipados', 'macos', 'linux'];
    if (osKeywords.includes(lowerQuery)) {
      return deviceDatabase.filter(device => 
        device.os.toLowerCase() === lowerQuery
      );
    }
    
    // Then try exact device matches
    const exactMatches = deviceDatabase.filter(device => 
      device.keywords.some(keyword => keyword === lowerQuery)
    );
    
    if (exactMatches.length > 0) {
      return exactMatches;
    }
    
    // Finally, try partial matches
    return deviceDatabase.filter(device => 
      device.keywords.some(keyword => keyword.includes(lowerQuery)) ||
      device.model.toLowerCase().includes(lowerQuery)
    );
  };

  const suggestions = getDeviceSuggestions(searchQuery);
  const groupedSuggestions = suggestions.reduce((acc, device) => {
    if (!acc[device.category]) {
      acc[device.category] = [];
    }
    acc[device.category].push(device);
    return acc;
  }, {} as Record<string, DeviceMatch[]>);

  // OS Tooltip component
  const OSTooltip = () => (
    <AnimatePresence>
      {showOSTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 right-0 top-[calc(100%+1.5rem)] bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl z-10"
        >
          <div className="relative">
            <button
              onClick={() => setShowOSTooltip(false)}
              className="absolute -top-2 -right-2 text-white/60 hover:text-white"
            >
              ×
            </button>
            <div className="space-y-4">
              <div>
                <p className="text-white/90 text-lg font-light mb-2">
                  Quick Tip: Operating System is Key
                </p>
                <p className="text-white/70 text-base font-light leading-relaxed">
                  We focus on providing operating system level protection, which is the foundation of your device's security. Simply tell us your OS (Windows, Android, iOS, etc.).
                </p>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-white/60 text-sm font-light">
                  While we can't provide device-specific security features, we'll give you comprehensive OS-level protection steps. For device-specific security features, please refer to your manufacturer's guidelines.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Preserve the existing hero section code
  const heroSection = (
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
  );

  // New innovative device detection section
  const deviceDetectionSection = (
    <section className="relative w-full min-h-screen">
      {step !== 'initial' && <BackButton onClick={() => setStep('initial')} />}
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {step === 'initial' && (
                <motion.div 
                  className="space-y-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl text-white font-light">how would you like to start?</h2>
                    <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
                      choose your preferred way to identify your device and get personalized protection steps.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.button
                      onClick={() => {
                        setStep('detection');
                        detectDevice();
                      }}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 text-left transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative space-y-4">
                        <div className="text-3xl text-white font-light">automatic.</div>
                        <p className="text-lg text-white/70 font-light">
                          let us detect your device specifications automatically for the most accurate protection steps.
                        </p>
                        <div className="absolute -right-4 md:-right-4 top-0 bottom-0 hidden md:flex items-center">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rotate-180 [writing-mode:vertical-lr] text-[11px] text-white/40 tracking-[0.25em] uppercase"
                          >
                            no data stored
                          </motion.div>
                        </div>
                        <div className="md:hidden mt-6">
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[11px] text-white/40 tracking-[0.25em] uppercase"
                          >
                            no data stored
                          </motion.div>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        setStep('manual');
                        setShowOSTooltip(true);
                        setTimeout(() => setShowOSTooltip(false), 8000);
                      }}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 text-left transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative space-y-4">
                        <div className="text-3xl text-white font-light">manual.</div>
                        <p className="text-lg text-white/70 font-light">
                          tell us about your device and we'll guide you through the protection process step by step.
                        </p>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'detection' && (
                <motion.div 
                  className="space-y-12 pt-16 md:pt-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="text-center space-y-6">
                    <h2 className="text-5xl md:text-6xl text-white font-light">analyzing your device.</h2>
                    <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">
                      we're scanning your system to provide the most relevant protection steps.
                    </p>
                  </div>

                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center space-y-12">
                      <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      </div>
                      <div className="space-y-8 text-center max-w-2xl mx-auto">
                        <div className="space-y-4">
                          <p className="text-xl text-white/60 font-light">analyzing your system...</p>
                          <p className="text-sm text-white/40">this will only take a moment</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="text-sm text-white/60 uppercase tracking-wider">Essential Data Being Collected</div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-white/40 text-xs uppercase mb-1">Operating System</div>
                              <div className="text-white/80 text-sm">Type & Version</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-white/40 text-xs uppercase mb-1">Device Type</div>
                              <div className="text-white/80 text-sm">Computer/Mobile/Tablet</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                              <div className="text-white/40 text-xs uppercase mb-1">Architecture</div>
                              <div className="text-white/80 text-sm">System Architecture</div>
                            </div>
                          </div>
                          <p className="text-xs text-white/40 italic">
                            * We only collect essential data needed for security recommendations. All processing is done locally.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : detectedDevice && (
                    <motion.div 
                      className="space-y-8"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 space-y-8">
                        <div className="space-y-2">
                          <h3 className="text-3xl text-white font-light">system detected.</h3>
                          <p className="text-lg text-white/60">
                            redirecting to protection steps in a moment...
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <div className="text-lg text-white/60 font-light">device type</div>
                            <div className="text-2xl text-white">{detectedDevice.type}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-lg text-white/60 font-light">operating system</div>
                            <div className="text-2xl text-white">
                              {detectedDevice.os}
                              {detectedDevice.version && (
                                <span className="text-white/60 ml-2 text-lg">
                                  {detectedDevice.version}
                                </span>
                              )}
                            </div>
                          </div>
                          {detectedDevice.architecture && (
                            <div className="space-y-2">
                              <div className="text-lg text-white/60 font-light">architecture</div>
                              <div className="text-2xl text-white">{detectedDevice.architecture}</div>
                            </div>
                          )}
                        </div>

                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                          <motion.div 
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 'manual' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="min-h-screen"
                >
                  <div className="pt-24 pb-20">
                    <div className="max-w-screen-xl mx-auto px-6">
                      <div className="space-y-16">
                        {/* Hero Section */}
                        <div className="text-center space-y-6">
                          <h1 
                            className="text-[clamp(3.5rem,8vw,5rem)] font-bold tracking-tighter text-white leading-[0.85]"
                            style={{ fontFamily: 'var(--font-geist-sans)' }}
                          >
                            select your<br/>
                            <span className="text-white/90">operating system.</span>
                          </h1>
                        </div>

                        <div className="space-y-12">
                          {/* Desktop Systems */}
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white text-center">Desktop & Laptop</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                              {operatingSystems.desktop.map((os) => (
                                <button
                                  key={os.id}
                                  onClick={() => handleOSSelect(os.id)}
                                  className="group flex items-center justify-center gap-4 w-full p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                                >
                                  <div className="w-8 h-8 flex items-center justify-center">
                                    <os.icon className="w-8 h-8 text-white" />
                                  </div>
                                  <span className="text-xl text-white font-medium">{os.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Mobile Systems */}
                          <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white text-center">Mobile Devices</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                              {operatingSystems.mobile.map((os) => (
                                <button
                                  key={os.id}
                                  onClick={() => handleOSSelect(os.id)}
                                  className="group flex items-center justify-center gap-4 w-full p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                                >
                                  <div className="w-8 h-8 flex items-center justify-center">
                                    <os.icon className="w-8 h-8 text-white" />
                                  </div>
                                  <span className="text-xl text-white font-medium">{os.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Help Section */}
                          <div className="space-y-4 text-center">
                            <h3 className="text-xl text-white/90 font-medium">Not sure about your operating system?</h3>
                            <a
                              href={`https://www.google.com/search?q=how+to+check+what+operating+system+I+have`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                            >
                              <span>Search on Google</span>
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'results' && (
                <motion.div 
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Render protection guide based on OS */}
                  {(selectedDevice?.os.toLowerCase() === 'windows' || 
                    detectedDevice?.os.toLowerCase() === 'windows') && (
                    <WindowsProtection onBack={() => {
                      setStep('initial');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }} />
                  )}
                  {(selectedDevice?.os.toLowerCase() === 'macos' || 
                    detectedDevice?.os.toLowerCase() === 'macos') && (
                    <MacOSProtection onBack={() => {
                      setStep('initial');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }} />
                  )}
                  {(selectedDevice?.os.toLowerCase() === 'linux' || 
                    detectedDevice?.os.toLowerCase() === 'linux') && (
                    <LinuxProtection onBack={() => {
                      setStep('initial');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }} />
                  )}
                  {(selectedDevice?.os.toLowerCase() === 'android' || 
                    detectedDevice?.os.toLowerCase() === 'android') && (
                    <AndroidProtection onBack={() => {
                      setStep('initial');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }} />
                  )}
                  {(selectedDevice?.os.toLowerCase() === 'ios' || 
                    detectedDevice?.os.toLowerCase() === 'ios') && (
                    <IOSProtection onBack={() => {
                      setStep('initial');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const handleOSSelect = (osId: string) => {
    // Scroll to top before showing the guide
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    setDetectedDevice({
      type: osId === 'android' || osId === 'ios' ? 'Mobile' : 'Computer',
      os: osId.charAt(0).toUpperCase() + osId.slice(1)
    });
    setStep('results');
  };

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#801336' }}>
      {/* Only show ScrollIndicator on initial step */}
      {step === 'initial' && <ScrollIndicator />}
      
      {/* Only show hero section on initial step */}
      {step === 'initial' && heroSection}

      <div className="w-full">
        {step !== 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {deviceDetectionSection}
          </motion.div>
        )}
        
        {step === 'results' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {(selectedDevice?.os.toLowerCase() === 'windows' || 
              detectedDevice?.os.toLowerCase() === 'windows') && (
              <WindowsProtection onBack={() => {
                setStep('initial');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} />
            )}
            {(selectedDevice?.os.toLowerCase() === 'macos' || 
              detectedDevice?.os.toLowerCase() === 'macos') && (
              <MacOSProtection onBack={() => {
                setStep('initial');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} />
            )}
            {(selectedDevice?.os.toLowerCase() === 'linux' || 
              detectedDevice?.os.toLowerCase() === 'linux') && (
              <LinuxProtection onBack={() => {
                setStep('initial');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} />
            )}
            {(selectedDevice?.os.toLowerCase() === 'android' || 
              detectedDevice?.os.toLowerCase() === 'android') && (
              <AndroidProtection onBack={() => {
                setStep('initial');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} />
            )}
            {(selectedDevice?.os.toLowerCase() === 'ios' || 
              detectedDevice?.os.toLowerCase() === 'ios') && (
              <IOSProtection onBack={() => {
                setStep('initial');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }} />
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 