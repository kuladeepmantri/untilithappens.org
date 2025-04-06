import './globals.css';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/ui/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Amisafe? - Protecting Your Digital Life',
  description: 'We help protect your digital life through education, tools, and community support. Find your digital footprint and get personalized security recommendations.',
  keywords: [
    'digital safety',
    'online security',
    'digital footprint',
    'cybersecurity',
    'data protection',
    'online privacy',
    'security guide',
    'cyber threats',
    'digital protection',
    'cyber awareness'
  ],
  openGraph: {
    title: 'Amisafe? - Protecting Your Digital Life',
    description: 'We help protect your digital life through education, tools, and community support. Find your digital footprint and get personalized security recommendations.',
    type: 'website',
    locale: 'en_US',
    url: 'https://amisafe.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amisafe? - Protecting Your Digital Life',
    description: 'We help protect your digital life through education, tools, and community support. Find your digital footprint and get personalized security recommendations.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
} 