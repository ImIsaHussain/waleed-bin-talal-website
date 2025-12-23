'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui';
import {
  EightPointStar,
  GeometricGrid,
  ArabesqueCorner,
  GeometricDivider,
} from '@/components/ui/GeometricPatterns';
import ParallaxSection, { FadeIn } from '@/components/animations/ParallaxSection';
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
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder news items with more data
const newsItems = [
  {
    id: 1,
    title: 'Kingdom Holding Company Announces Strategic Investment in AI Sector',
    description:
      'Prince Alwaleed announces new investment in emerging artificial intelligence technologies, reinforcing commitment to innovation and future-focused growth strategies.',
    date: '2025-01-15',
    category: 'investments',
    source: 'Kingdom Holding Company',
    featured: true,
    image: null,
  },
  {
    id: 2,
    title: 'Alwaleed Philanthropies Expands Water Restoration Project',
    description:
      'Foundation expands critical water infrastructure project reaching additional communities in the Middle East.',
    date: '2025-01-10',
    category: 'philanthropy',
    source: 'Alwaleed Philanthropies',
    featured: false,
    image: null,
  },
  {
    id: 3,
    title: 'Prince Alwaleed Delivers Keynote at Global Investment Forum',
    description:
      'Speaking at the annual forum, Prince Alwaleed shares insights on sustainable investment strategies for the future.',
    date: '2025-01-05',
    category: 'media',
    source: 'Global Investment Forum',
    featured: false,
    image: null,
  },
  {
    id: 4,
    title: 'Recognition for Humanitarian Leadership',
    description:
      'Prince Alwaleed honored for decades of philanthropic work impacting communities across 190 countries.',
    date: '2024-12-20',
    category: 'awards',
    source: 'Humanitarian Leadership Council',
    featured: false,
    image: null,
  },
  {
    id: 5,
    title: 'New Partnership with Leading Technology Firms',
    description:
      'Kingdom Holding announces strategic partnerships to accelerate digital transformation initiatives.',
    date: '2024-12-15',
    category: 'investments',
    source: 'Kingdom Holding Company',
    featured: false,
    image: null,
  },
  {
    id: 6,
    title: 'Education Initiative Reaches New Milestone',
    description:
      'Alwaleed Philanthropies celebrates supporting over 1 million students through global education programs.',
    date: '2024-12-01',
    category: 'philanthropy',
    source: 'Alwaleed Philanthropies',
    featured: false,
    image: null,
  },
];

export default function NewsPage() {
  const t = useTranslations('news');
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: t('categories.all'), icon: Newspaper, count: newsItems.length },
    { key: 'investments', label: t('categories.investments'), icon: TrendingUp, count: newsItems.filter(i => i.category === 'investments').length },
    { key: 'philanthropy', label: t('categories.philanthropy'), icon: Heart, count: newsItems.filter(i => i.category === 'philanthropy').length },
    { key: 'media', label: t('categories.media'), icon: Mic, count: newsItems.filter(i => i.category === 'media').length },
    { key: 'awards', label: t('categories.awards'), icon: Award, count: newsItems.filter(i => i.category === 'awards').length },
  ];

  const filteredItems = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(item => item.category === activeCategory);

  const featuredItem = filteredItems.find(item => item.featured) || filteredItems[0];
  const otherItems = filteredItems.filter(item => item.id !== featuredItem?.id);

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

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.news-hero-icon',
        { scale: 0, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.news-hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.news-hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );

      // Subtle floating animation (no rotation)
      gsap.to('.news-hero-icon', {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax stars
      gsap.to('.news-star', {
        y: -60,
        rotation: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
            delay: index * 0.1,
          }
        );
      });
    }, newsRef);

    return () => ctx.revert();
  }, [filteredItems]);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>

        {/* Decorative stars */}
        <EightPointStar
          className="news-star absolute top-28 right-[15%] text-regal-gold/20"
          size={130}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="news-star absolute bottom-32 left-[10%] text-regal-gold/10"
          size={180}
          strokeWidth={0.5}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/30" />

        {/* Gradient overlays - softer */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/20 via-deep-navy/5 to-deep-navy/40" />

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Icon */}
            <div className="news-hero-icon relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 rotate-6" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/20 -rotate-3">
                <Newspaper className="w-12 h-12 text-regal-gold" />
              </div>
            </div>

            {/* Title */}
            <h1 className="news-hero-title text-display font-serif text-white mb-6">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="news-hero-subtitle text-subtitle text-regal-gold-light font-light max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

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
          {/* Featured Article */}
          {featuredItem && (
            <div className="news-featured mb-12">
              <div className="group relative bg-white rounded-3xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-deep-navy/20 via-regal-gold/10 to-deep-navy/20">
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
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-label text-regal-gold mb-4 block">Featured</span>
                    <h2 className="text-2xl lg:text-3xl font-serif font-medium text-charcoal mb-4 group-hover:text-regal-gold transition-colors">
                      {featuredItem.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-6">
                      {featuredItem.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featuredItem.date)}
                        </span>
                        <span>{featuredItem.source}</span>
                      </div>
                      <button className="inline-flex items-center gap-2 text-regal-gold font-medium group/btn">
                        {t('readMore')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherItems.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <div
                  key={item.id}
                  className="news-card group bg-white rounded-2xl overflow-hidden border border-border hover:border-regal-gold/30 hover:shadow-xl transition-all duration-500"
                >
                  {/* Image placeholder */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-deep-navy/10 via-regal-gold/5 to-deep-navy/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-gray-200" />
                    </div>
                    {/* Category badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${getCategoryGradient(item.category)} text-white text-xs font-medium`}>
                      {t(`categories.${item.category}`)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.date)}
                    </div>
                    <h3 className="text-lg font-serif font-medium text-charcoal mb-3 group-hover:text-regal-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">{item.source}</span>
                      <button className="inline-flex items-center gap-1 text-sm text-regal-gold font-medium group/btn">
                        {t('readMore')}
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More News
            </button>
          </div>
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
                <span className="text-sm font-medium text-regal-gold uppercase tracking-wider">Coming Soon</span>
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
                Stay Updated
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                Newsletter subscription and RSS feed integration are coming soon. Stay tuned for the latest news and updates.
              </p>

              {/* Coming soon indicator */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4 opacity-50 pointer-events-none">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    disabled
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/50 placeholder-gray-500"
                  />
                  <button className="btn-primary whitespace-nowrap opacity-60" disabled>
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Future features */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Email Notifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rss className="w-4 h-4" />
                  <span className="text-sm">RSS Feed</span>
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
                  Kingdom Holding Company
                </a>{' '}
                and{' '}
                <a href="https://alwaleedphilanthropies.org" target="_blank" rel="noopener noreferrer" className="text-regal-gold hover:underline">
                  Alwaleed Philanthropies
                </a>.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="section-padding-sm bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
            <h2 className="text-subtitle font-serif text-charcoal mb-4">
              Continue Exploring
            </h2>
            <p className="text-muted mb-8">
              Learn more about the vision and impact of Prince Alwaleed bin Talal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/philanthropy"
                className="btn-primary"
                data-cursor="Explore"
              >
                Explore Philanthropy
              </a>
              <a
                href="/biography"
                className="btn-outline"
                data-cursor="Read"
              >
                Read Biography
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
