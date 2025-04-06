import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/check-footprint", text: "Digital Footprint" },
    { href: "/threats", text: "Threats" },
    { href: "/security-guide", text: "Protection" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#144C52]/95 to-[#144C52]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-xl text-white font-medium tracking-tight">
            until it happens
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors tracking-wide"
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="/get-help"
              className="relative group"
            >
              <div className="absolute -inset-x-4 -inset-y-2 bg-white/5 group-hover:bg-white/10 rounded-lg transition-all duration-300" />
              <div className="absolute -inset-x-4 -inset-y-2 bg-[#144C52] rounded-lg opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
              <motion.div
                className="relative px-5 py-2.5 text-sm font-medium text-white rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Help
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white/40 group-hover:bg-white/80 transition-all duration-300" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative group"
          >
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 rounded-lg transition-all duration-300 -m-2" />
            <div className="relative text-white/80 group-hover:text-white transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#144C52]/95 backdrop-blur-xl"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base text-white/70 hover:text-white transition-colors tracking-wide"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                ))}
                <Link
                  href="/get-help"
                  className="relative mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    className="relative flex items-center justify-between w-full px-6 py-4 text-white font-medium bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="tracking-wide">Get Help</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 group-hover:bg-white animate-pulse" />
                    </div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 