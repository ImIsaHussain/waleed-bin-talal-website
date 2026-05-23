'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations, useLocale } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { ParallaxSection, FadeIn } from '@/components/animations';
import {
  Newspaper,
  Calendar,
  Rss,
  TrendingUp,
  Heart,
  Mic,
  Award,
  ArrowRight,
  Bell,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { getNewsSortedByDate, getNewsCategoryCounts } from '@/lib/content';
import type { Locale } from '@/i18n/routing';

// Number of items per row (3 columns) x 3 rows = 9 items per load
const ITEMS_PER_PAGE = 9;

export default function NewsPage() {
  const t = useTranslations('news');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const newsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Get news data from JSON content
  const newsItems = useMemo(() => getNewsSortedByDate(locale), [locale]);
  const categoryCounts = useMemo(() => getNewsCategoryCounts(), []);

  const categories = [
    { key: 'all', label: t('categories.all'), icon: Newspaper, count: categoryCounts.all || 0 },
    { key: 'investments', label: t('categories.investments'), icon: TrendingUp, count: categoryCounts.investments || 0 },
    { key: 'philanthropy', label: t('categories.philanthropy'), icon: Heart, count: categoryCounts.philanthropy || 0 },
    { key: 'media', label: t('categories.media'), icon: Mic, count: categoryCounts.media || 0 },
    { key: 'awards', label: t('categories.awards'), icon: Award, count: categoryCounts.awards || 0 },
  ];

  const filteredItems = useMemo(() => {
    return activeCategory === 'all'
      ? newsItems
      : newsItems.filter(item => item.category === activeCategory);
  }, [newsItems, activeCategory]);

  // Featured item is always the first (latest by date since already sorted)
  const featuredItem = filteredItems[0];
  // Other items exclude the featured one
  const otherItems = filteredItems.slice(1);
  // Items to display (limited by visibleCount)
  const displayedItems = otherItems.slice(0, visibleCount);
  // Check if there are more items to load
  const hasMoreItems = visibleCount < otherItems.length;

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat?.icon || Newspaper;
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'investments':
        return 'from-emerald-500 to-teal-600';
      case 'philanthropy':
        return 'from-rose-500 to-pink-600';
      case 'media':
        return 'from-blue-500 to-indigo-600';
      case 'awards':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-regal-gold to-regal-gold-dark';
    }
  };

  // News items animation
  useEffect(() => {
    if (!newsRef.current) return;

    const ctx = gsap.context(() => {
      // Featured card
      gsap.fromTo(
        '.news-featured',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.news-featured',
            start: 'top 85%',
          },
        }
      );

      // Other news cards
      gsap.utils.toArray('.news-card').forEach((card, index) => {
        gsap.fromTo(
          card as Element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 90%',
            },
            delay: (index % 3) * 0.1,
          }
        );
      });
    }, newsRef);

    return () => ctx.revert();
  }, [displayedItems]);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <PageHero
        heroPrefix="news"
        icon={<Newspaper className="w-12 h-12 text-regal-gold" />}
        title={t('title')}
        subtitle={t('subtitle')}
        minHeight="min-h-[70vh]"
      />

      {/* ============================================
          INTRO SECTION
          ============================================ */}
      <section className="section-padding-sm bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <EightPointStar className="text-regal-gold mx-auto mb-8" size={32} strokeWidth={1} />
            <p className="text-body-lg text-muted leading-relaxed max-w-3xl mx-auto">
              {t('intro')}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          FILTER BAR
          ============================================ */}
      <section className="sticky top-20 lg:top-24 z-30 bg-white/95 backdrop-blur-md border-y border-border py-4 shadow-sm">
        <Container>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.key
                      ? 'bg-regal-gold text-white shadow-lg shadow-regal-gold/20'
                      : 'bg-gray-100 text-charcoal hover:bg-regal-gold/10 hover:text-regal-gold'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================
          NEWS GRID
          ============================================ */}
      <section ref={newsRef} className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/10" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/10" />

        <Container>
          {/* Featured Article (Latest News) */}
          {featuredItem && (
            <div className="news-featured mb-12">
              <a
                href={featuredItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500 block"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[320px] bg-gradient-to-br from-deep-navy/20 via-regal-gold/10 to-deep-navy/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/50 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-gray-300" />
                      </div>
                    </div>
                    {/* Category badge */}
                    <div className={`absolute top-6 left-6 px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryGradient(featuredItem.category)} text-white text-sm font-medium flex items-center gap-2`}>
                      {(() => {
                        const Icon = getCategoryIcon(featuredItem.category);
                        return <Icon className="w-4 h-4" />;
                      })()}
                      {t(`categories.${featuredItem.category}`)}
                    </div>
                    {/* External link indicator */}
                    {featuredItem.url && (
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-charcoal" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-label text-regal-gold mb-4 block uppercase tracking-wider">{t('latest')}</span>
                    <h2 className="text-2xl lg:text-3xl font-serif font-medium text-charcoal mb-4 group-hover:text-regal-gold transition-colors">
                      {featuredItem.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-6 line-clamp-3">
                      {featuredItem.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-sm text-muted min-w-0">
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredItem.date)}
                        </span>
                        <span className="truncate max-w-[150px] relative">
                          <span className="truncate block">{featuredItem.source}</span>
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-regal-gold font-medium shrink-0">
                        {t('readMore')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedItems.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card group bg-white rounded-2xl overflow-hidden border border-border hover:border-regal-gold/30 hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-deep-navy/10 via-regal-gold/5 to-deep-navy/10 shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-200" />
                    </div>
                    {/* Category badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryGradient(item.category)} text-white text-xs font-medium`}>
                      {t(`categories.${item.category}`)}
                    </div>
                    {/* External link indicator */}
                    {item.url && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-charcoal" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm text-muted mb-3">
                      <Calendar className="w-4 h-4 shrink-0" />
                      {formatDate(item.date)}
                    </div>
                    <h3 className="text-lg font-serif font-medium text-charcoal mb-3 group-hover:text-regal-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2 flex-grow">
                      {item.description}
                    </p>
                    {/* Fixed bottom section */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      {/* Source with fade effect for overflow */}
                      <div className="relative max-w-[120px] overflow-hidden">
                        <span className="text-xs text-muted whitespace-nowrap">{item.source}</span>
                        <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-regal-gold font-medium shrink-0">
                        {t('readMore')}
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Load More */}
          {hasMoreItems && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="btn-outline"
              >
                {t('loadMore', { count: otherItems.length - visibleCount })}
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ============================================
          NEWSLETTER / RSS SECTION - COMING SOON
          ============================================ */}
      <ParallaxSection speed={0.15}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/5" />
          </div>

          {/* Decorative stars */}
          <EightPointStar
            className="absolute -left-20 top-1/2 -translate-y-1/2 text-regal-gold/10"
            size={250}
            strokeWidth={0.3}
          />
          <EightPointStar
            className="absolute -right-20 top-1/3 text-regal-gold/5"
            size={180}
            strokeWidth={0.3}
          />

          <Container size="md" className="relative z-10">
            <FadeIn className="text-center">
              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-regal-gold/20 border border-regal-gold/30 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-regal-gold animate-pulse" />
                <span className="text-sm font-medium text-regal-gold uppercase tracking-wider">{t('newsletter.comingSoon')}</span>
              </div>

              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-regal-gold/10" />
                <div className="relative w-full h-full rounded-full border-2 border-regal-gold/30 flex items-center justify-center">
                  <Bell className="w-10 h-10 text-regal-gold/60" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">
                {t('newsletter.title')}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                {t('newsletter.description')}
              </p>

              {/* Coming soon indicator */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4 opacity-50 pointer-events-none">
                  <input
                    type="email"
                    placeholder={t('newsletter.emailPlaceholder')}
                    disabled
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50 placeholder-gray-500"
                  />
                  <button className="btn-primary whitespace-nowrap opacity-60" disabled>
                    {t('newsletter.subscribe')}
                  </button>
                </div>
              </div>

              {/* Future features */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">{t('newsletter.emailNotifications')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rss className="w-4 h-4" />
                  <span className="text-sm">{t('newsletter.rssFeed')}</span>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          SOURCES INFO
          ============================================ */}
      <section className="section-padding-sm bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <div className="p-8 bg-cream rounded-2xl border border-border">
              <Rss className="w-10 h-10 text-regal-gold mx-auto mb-4" />
              <p className="text-muted leading-relaxed">
                News updates are aggregated from official sources including{' '}
                <a href="https://www.kingdom.com.sa" target="_blank" rel="noopener noreferrer" className="text-regal-gold hover:underline">
                  {t('sources.kingdomHolding')}
                </a>{' '}
                and{' '}
                <a href="https://alwaleedphilanthropies.org" target="_blank" rel="noopener noreferrer" className="text-regal-gold hover:underline">
                  {t('sources.alwaleedPhilanthropies')}
                </a>.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <PageCTA
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLabel={tc('cta.explorePhilanthropy')}
        primaryHref="/philanthropy"
        primaryCursor={tc('cta.cursor.explore')}
        outlineLabel={tc('cta.readBiography')}
        outlineHref="/biography"
        outlineCursor={tc('cta.cursor.read')}
      />
    </>
  );
}
