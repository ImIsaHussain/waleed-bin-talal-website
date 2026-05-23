'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations, useLocale } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { ParallaxSection, FadeIn } from '@/components/animations';
import {
  Camera,
  Image as ImageIcon,
  Video,
  Calendar,
  Play,
  ExternalLink,
} from 'lucide-react';
import { getGallerySortedByDate, getGalleryTypeCounts } from '@/lib/content';
import type { Locale } from '@/i18n/routing';

// Number of items per row (3 columns) x 3 rows = 9 items per load
const ITEMS_PER_PAGE = 9;

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const tc = useTranslations('common');
  const locale = useLocale() as Locale;
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<'all' | 'image' | 'video'>('all');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Get gallery data from JSON content
  const allGalleryItems = useMemo(() => getGallerySortedByDate(locale), [locale]);
  const typeCounts = useMemo(() => getGalleryTypeCounts(), []);

  const typeFilters = [
    { key: 'all' as const, label: t('types.all'), icon: Camera, count: typeCounts.all },
    { key: 'image' as const, label: t('types.images'), icon: ImageIcon, count: typeCounts.images },
    { key: 'video' as const, label: t('types.videos'), icon: Video, count: typeCounts.videos },
  ];

  // Filter by type only
  const filteredItems = useMemo(() => {
    if (activeType === 'all') return allGalleryItems;
    return allGalleryItems.filter(item => item.type === activeType);
  }, [allGalleryItems, activeType]);

  // Items to display (limited by visibleCount)
  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Check if there are more items to load
  const hasMoreItems = visibleCount < filteredItems.length;

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeType]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  // Gallery items animation
  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.fromTo(
          item as Element,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: (index % 3) * 0.1,
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [displayedItems]);

  const handleTypeChange = (type: 'all' | 'image' | 'video') => {
    setActiveType(type);
    // Animate filter change
    if (galleryRef.current) {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
      );
    }
  };

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <PageHero
        heroPrefix="gallery"
        icon={<Camera className="w-14 h-14 text-regal-gold" />}
        iconStyle="square"
        title={t('title')}
        subtitle={t('subtitle')}
        rightContent={
          <div className="gallery-hero-stats flex flex-wrap justify-center gap-8">
            <span className="flex items-center gap-2 text-gray-400">
              <ImageIcon className="w-5 h-5 text-regal-gold" />
              <span className="text-white font-semibold">{typeCounts.images}</span> {t('types.images')}
            </span>
            <span className="flex items-center gap-2 text-gray-400">
              <Video className="w-5 h-5 text-regal-gold" />
              <span className="text-white font-semibold">{typeCounts.videos}</span> {t('types.videos')}
            </span>
            <span className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-5 h-5 text-regal-gold" />
              <span className="text-white font-semibold">{typeCounts.all}</span> {t('types.all')}
            </span>
          </div>
        }
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
          {/* Type Filters (All/Images/Videos) */}
          <div className="flex flex-wrap justify-center gap-3">
            {typeFilters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.key}
                  onClick={() => handleTypeChange(filter.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeType === filter.key
                      ? 'bg-regal-gold text-white shadow-lg shadow-regal-gold/20'
                      : 'bg-gray-100 text-charcoal hover:bg-regal-gold/10 hover:text-regal-gold'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeType === filter.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================
          GALLERY GRID
          ============================================ */}
      <section ref={galleryRef} className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/10" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/10" />

        <Container>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displayedItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-item group relative overflow-hidden rounded-2xl cursor-pointer bg-white border border-border shadow-sm hover:shadow-2xl transition-all duration-500 block"
              >
                {/* Image/Video thumbnail */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-deep-navy/10 via-regal-gold/5 to-deep-navy/10">
                  {/* Placeholder icon or actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center">
                      {item.type === 'video' ? (
                        <Play className="w-10 h-10 text-regal-gold" />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-gray-300" />
                      )}
                    </div>
                  </div>

                  {/* Video indicator */}
                  {item.type === 'video' && (
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-regal-gold flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  )}

                  {/* External link indicator */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-charcoal" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          {item.type === 'video' ? (
                            <Play className="w-8 h-8 text-white ml-1" />
                          ) : (
                            <ExternalLink className="w-8 h-8 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <h3 className="text-lg font-serif text-white mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {item.year}
                        {item.source && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span className="truncate max-w-[120px]">{item.source}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom info bar */}
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-charcoal truncate group-hover:text-regal-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted mt-1 flex items-center gap-2">
                    <span>{item.year}</span>
                    {item.source && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="truncate">{item.source}</span>
                      </>
                    )}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Load More */}
          {hasMoreItems && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="btn-outline"
              >
                {t('loadMore', { count: filteredItems.length - visibleCount })}
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ============================================
          TIMELINE TEASER SECTION
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
            size={300}
            strokeWidth={0.3}
          />
          <EightPointStar
            className="absolute -right-20 top-1/4 text-regal-gold/5"
            size={200}
            strokeWidth={0.3}
          />

          <Container size="md" className="relative z-10">
            <FadeIn className="text-center">
              {/* Icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-regal-gold/20 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-2 border-regal-gold/50 flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-regal-gold" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">
                {t('timeline')}
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                {t('timelineSection.description')}
              </p>

              {/* Timeline Preview */}
              <div className="flex items-center justify-center gap-4 mb-10">
                {['1955', '1970s', '1980s', '2000s', '2024'].map((year, index) => (
                  <div key={year} className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-regal-gold" />
                    {index < 4 && <div className="w-12 h-px bg-regal-gold/30" />}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="btn-primary" disabled>
                {t('timelineSection.comingSoon')}
              </button>
            </FadeIn>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <PageCTA
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLabel={tc('cta.readBiography')}
        primaryHref="/biography"
        primaryCursor={tc('cta.cursor.read')}
        outlineLabel={tc('cta.latestNews')}
        outlineHref="/news"
        outlineCursor={tc('cta.cursor.view')}
      />
    </>
  );
}
