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

const KHC_FOUNDING_YEAR = 1980;

export const STATS = {
  sectors: 18,
  countriesReached: 190,
  yearsInBusiness: new Date().getFullYear() - KHC_FOUNDING_YEAR,
  givingPledgeYear: 2015,
} as const;
