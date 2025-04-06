import './globals.css';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/ui/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Until It Happens | Digital safety shouldn't be complicated. We're here to help.",
  description: "Digital safety shouldn't be complicated. We're here to help.",
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
    title: "Until It Happens | Digital safety shouldn't be complicated. We're here to help.",
    description: "Digital safety shouldn't be complicated. We're here to help.",
    type: 'website',
    locale: 'en_US',
    url: 'https://untilithappens.org',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Until It Happens | Digital safety shouldn't be complicated. We're here to help.",
    description: "Digital safety shouldn't be complicated. We're here to help.",
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