import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Sans_Arabic, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Display font - bold, architectural
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cabinet',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// Body font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Serif font for elegance
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Arabic font
const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Prince Alwaleed bin Talal | Investor & Philanthropist',
    template: '%s | Prince Alwaleed bin Talal',
  },
  description:
    'Official website of Prince Alwaleed bin Talal - global investor, philanthropist, and advocate for sustainable development.',
  keywords: [
    'Prince Alwaleed bin Talal',
    'Kingdom Holding Company',
    'Alwaleed Philanthropies',
    'Saudi investor',
    'Giving Pledge',
    'الأمير الوليد بن طلال',
    'شركة المملكة القابضة',
  ],
  authors: [{ name: 'Alpha International Group' }],
  creator: 'Alpha International Group',
  metadataBase: new URL('https://walidbintalal.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: 'https://walidbintalal.com',
    siteName: 'Prince Alwaleed bin Talal',
    title: 'Prince Alwaleed bin Talal | Investor & Philanthropist',
    description:
      'Official website of Prince Alwaleed bin Talal - global investor, philanthropist, and advocate for sustainable development.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Alwaleed bin Talal',
    description: 'Global investor, philanthropist, and advocate for sustainable development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Font class names exported for use in locale layout
export const fontVariables = `${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} ${notoArabic.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
