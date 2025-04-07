import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`w-full py-16 md:py-24 relative ${className}`}>
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
          className="mt-16 md:mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
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
  );
} 