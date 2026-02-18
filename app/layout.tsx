import './globals.css';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { Navigation } from '@/components/ui/navigation';
import { SiteFooter } from '@/components/site/site-footer';

const heading = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://untilithappens.org'),
  title: {
    default: 'Until It Happens | Practical Cyber Safety',
    template: '%s | Until It Happens',
  },
  description: 'Actionable security guidance, incident reporting resources, and prevention playbooks for real-world cyber risks.',
  keywords: [
    'cyber safety',
    'cyber security',
    'incident response',
    'digital footprint',
    'fraud prevention',
    'identity theft',
    'online privacy',
    'security awareness',
  ],
  openGraph: {
    title: 'Until It Happens | Practical Cyber Safety',
    description: 'Understand current cyber risks, tighten your setup, and get help fast when incidents happen.',
    type: 'website',
    locale: 'en_US',
    url: 'https://untilithappens.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Until It Happens | Practical Cyber Safety',
    description: 'Current threat notes, platform hardening guides, and incident reporting routes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${mono.variable} bg-black text-white antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
