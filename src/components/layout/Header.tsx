'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Container } from '@/components/ui';
import { MagneticWrapper } from '@/components/animations/MagneticButton';
import { EightPointStar } from '@/components/ui/GeometricPatterns';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Check if we're on the home page (for transparent header on hero)
  const isHomePage = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : isHomePage
              ? 'bg-transparent'
              : 'bg-white/95 backdrop-blur-md'
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-20 min-[1200px]:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-10"
              onClick={closeMenu}
              data-cursor="Home"
            >
              {/* Animated star logo */}
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <EightPointStar
                  className="text-regal-gold transition-colors duration-300"
                  size={36}
                  strokeWidth={2}
                />
              </motion.div>

              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-lg min-[1200px]:text-xl font-serif font-semibold leading-tight transition-colors duration-300',
                    isScrolled || isMenuOpen || !isHomePage
                      ? 'text-charcoal'
                      : 'text-white'
                  )}
                >
                  {locale === 'ar' ? 'الأمير الوليد' : 'Prince Alwaleed'}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium tracking-wider uppercase transition-colors duration-300',
                    isScrolled || isMenuOpen || !isHomePage
                      ? 'text-muted'
                      : 'text-white/70'
                  )}
                >
                  {locale === 'ar' ? 'صاحب السمو الملكي' : 'bin Talal'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-[1200px]:flex items-center gap-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <MagneticWrapper key={item.key} strength={0.08}>
                    <Link
                      href={item.href}
                      className={cn(
                        'relative px-3 py-2 text-sm font-semibold transition-all duration-300 rounded-lg whitespace-nowrap',
                        isActive
                          ? 'text-regal-gold -translate-y-0.5'
                          : isScrolled || !isHomePage
                            ? 'text-charcoal hover:text-regal-gold hover:-translate-y-0.5'
                            : 'text-white/90 hover:text-white hover:-translate-y-0.5'
                      )}
                      data-cursor="View"
                    >
                      {t(item.key)}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-regal-gold rounded-full"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                    </Link>
                  </MagneticWrapper>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <MagneticWrapper strength={0.12}>
                <button
                  onClick={toggleLanguage}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full border-2 transition-all duration-300',
                    isScrolled || isMenuOpen || !isHomePage
                      ? 'border-charcoal/20 text-charcoal hover:border-regal-gold hover:text-regal-gold'
                      : 'border-white/40 text-white hover:border-white hover:bg-white/10'
                  )}
                  aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {locale === 'en' ? 'العربية' : 'EN'}
                  </span>
                </button>
              </MagneticWrapper>

              {/* Mobile Menu Button */}
              <button
                className={cn(
                  'min-[1200px]:hidden relative w-11 h-11 flex items-center justify-center rounded-full border-2 transition-colors duration-300',
                  isScrolled || isMenuOpen || !isHomePage
                    ? 'border-charcoal/20 text-charcoal hover:bg-gray-100'
                    : 'border-white/40 text-white hover:bg-white/10'
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 min-[1200px]:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-deep-navy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Decorative elements */}
            <EightPointStar
              className="absolute top-40 right-10 text-regal-gold/15"
              size={200}
              strokeWidth={1.5}
            />
            <EightPointStar
              className="absolute bottom-20 left-10 text-regal-gold/10"
              size={150}
              strokeWidth={1.5}
            />

            {/* Navigation Links */}
            <nav className="relative h-full flex flex-col justify-center px-8 pt-24">
              <div className="space-y-2">
                {NAVIGATION_ITEMS.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          'group flex items-center justify-between py-4 border-b border-white/10 transition-colors',
                          isActive ? 'text-regal-gold' : 'text-white hover:text-regal-gold'
                        )}
                      >
                        <span className="text-2xl font-serif font-medium">{t(item.key)}</span>
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer info in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="flex items-center justify-between text-white/50 text-sm">
                  <span>© {new Date().getFullYear()}</span>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 hover:text-regal-gold transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    {locale === 'en' ? 'العربية' : 'English'}
                  </button>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
