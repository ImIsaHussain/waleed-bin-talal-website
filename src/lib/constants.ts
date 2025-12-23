/**
 * Site-wide constants
 */

// GitHub Pages base path - used for static asset URLs
export const REPO_NAME = 'waleed-bin-talal-website';

// Get base path for assets (detects GitHub Pages at runtime)
export function getBasePath(): string {
  if (typeof window === 'undefined') return '';
  return window.location.hostname.includes('github.io') ? `/${REPO_NAME}` : '';
}

// Get full asset path with base path prefix
export function assetPath(path: string): string {
  const base = getBasePath();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export const SITE_CONFIG = {
  name: 'Prince Alwaleed bin Talal',
  title: 'Prince Alwaleed bin Talal | Investor & Philanthropist',
  description: 'Official website of Prince Alwaleed bin Talal - global investor, philanthropist, and advocate for sustainable development.',
  url: 'https://walidbintalal.com',
  author: 'Alpha International Group',
} as const;

export const COLORS = {
  regalGold: '#C5A059',
  regalGoldLight: '#D4B574',
  regalGoldDark: '#A68642',
  // Saudi Royal Green
  deepGreen: '#004D2C',
  deepGreenLight: '#006B3D',
  deepGreenDark: '#003820',
  // Legacy aliases
  deepNavy: '#004D2C',
  deepNavyLight: '#006B3D',
  deepNavyDark: '#003820',
  royalWhite: '#F9F9F9',
  offWhite: '#FFFFFF',
  charcoal: '#121212',
  charcoalLight: '#2A2A2A',
} as const;

// Navigation items - contact removed per user request
export const NAVIGATION_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'biography', href: '/biography' },
  { key: 'accomplishments', href: '/accomplishments' },
  { key: 'achievements', href: '/achievements' },
  { key: 'family', href: '/family' },
  { key: 'philanthropy', href: '/philanthropy' },
  { key: 'gallery', href: '/gallery' },
  { key: 'news', href: '/news' },
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/Alloosh_1',
  linkedin: 'https://linkedin.com/in/prince-alwaleed',
} as const;

export const CONTACT_INFO = {
  sponsor: 'Alpha International Group / Twaik Holding Group',
  address: 'Prince Turki Bin Abdulaziz AlAwwal Rd, King Saud University District, Riyadh, Saudi Arabia',
  phone: '(+966) 11-263-4444',
  email: 'Info@twaik.com',
} as const;

export const EXTERNAL_LINKS = {
  kingdomHolding: 'https://kingdom.com.sa',
  alwaleedPhilanthropies: 'https://alwaleedphilanthropies.org',
  givingPledge: 'https://givingpledge.org/pledger/hrh-prince-alwaleed-bin-talal',
} as const;

export const STATS = {
  sectors: 18,
  countriesReached: 190,
  yearsInBusiness: 50,
  givingPledgeYear: 2015,
} as const;
