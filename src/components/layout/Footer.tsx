'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container, EightPointStar, GeometricGrid, GeometricDivider } from '@/components/ui';
import { MagneticWrapper } from '@/components/animations';
import { NAVIGATION_ITEMS, EXTERNAL_LINKS } from '@/lib/constants';
export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  // Quick links - subset of navigation (excluding contact)
  const quickLinks = NAVIGATION_ITEMS.filter((item) =>
    ['biography', 'philanthropy', 'accomplishments'].includes(item.key)
  );

  // Explore links
  const exploreLinks = NAVIGATION_ITEMS.filter((item) =>
    ['achievements', 'family', 'gallery', 'news'].includes(item.key)
  );

  return (
    <footer className="relative bg-deep-navy text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <GeometricGrid className="text-regal-gold/8" />
      </div>

      {/* Decorative Star */}
      <EightPointStar
        className="absolute -right-20 rtl:right-auto rtl:-left-20 top-20 text-regal-gold/10"
        size={300}
        strokeWidth={1.5}
      />

      {/* Main Footer Content */}
      <div className="relative py-16 lg:py-20">
        <Container>
          {/* Top Section with Logo */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
            {/* Logo/Brand */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <EightPointStar className="text-regal-gold" size={44} strokeWidth={2} />
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-white">
                    {t('footer.brand.name')}
                  </h3>
                  <p className="text-sm text-regal-gold/80 tracking-wider uppercase font-medium">
                    {t('footer.brand.subtitle')}
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t('footer.about.description')}
              </p>
            </div>

            {/* External Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticWrapper strength={0.1}>
                <a
                  href={EXTERNAL_LINKS.kingdomHolding}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/15 rounded-xl hover:border-regal-gold/50 hover:bg-regal-gold/10 transition-all duration-300"
                >
                  <span className="text-sm font-semibold">{t('footer.externalLinks.kingdomHolding')}</span>
                  <ArrowUpRight className="w-4 h-4 text-regal-gold transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1" />
                </a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.1}>
                <a
                  href={EXTERNAL_LINKS.alwaleedPhilanthropies}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/15 rounded-xl hover:border-regal-gold/50 hover:bg-regal-gold/10 transition-all duration-300"
                >
                  <span className="text-sm font-semibold">{t('footer.externalLinks.alwaleedPhilanthropies')}</span>
                  <ArrowUpRight className="w-4 h-4 text-regal-gold transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1" />
                </a>
              </MagneticWrapper>
            </div>
          </div>

          {/* Divider */}
          <div className="flex justify-center mb-12">
            <GeometricDivider variant="line" className="text-regal-gold/40 max-w-md" />
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-label text-regal-gold mb-6">{t('footer.quickLinks.title')}</h4>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="w-0 h-px bg-regal-gold transition-all group-hover:w-4 rtl:order-1" />
                      <span className="font-medium">{t(`navigation.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-label text-regal-gold mb-6">{t('footer.explore.title')}</h4>
              <ul className="space-y-3">
                {exploreLinks.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="w-0 h-px bg-regal-gold transition-all group-hover:w-4 rtl:order-1" />
                      <span className="font-medium">{t(`navigation.${item.key}`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Giving Pledge */}
            <div>
              <h4 className="text-label text-regal-gold mb-6">{t('footer.commitment.title')}</h4>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {t('footer.commitment.description')}
              </p>
              <MagneticWrapper strength={0.1}>
                <a
                  href={EXTERNAL_LINKS.givingPledge}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-regal-gold hover:text-regal-gold-light transition-colors font-medium"
                >
                  {t('footer.commitment.givingPledgeMember')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </MagneticWrapper>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 text-sm text-gray-500">
            <p>{t('footer.legal.copyright', { year: currentYear })}</p>
            <p className="text-gray-500">{t('footer.legal.sponsor')}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
