'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import {
  EightPointStar,
  GeometricGrid,
  ArabesqueCorner,
  GeometricDivider,
} from '@/components/ui/GeometricPatterns';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import ParallaxSection, { FadeIn } from '@/components/animations/ParallaxSection';
import {
  Camera,
  Image as ImageIcon,
  Video,
  Calendar,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder gallery items with more data
const galleryItems = [
  { id: 1, category: 'business', year: '2024', type: 'image', title: 'Kingdom Tower Groundbreaking', aspect: 'landscape' },
  { id: 2, category: 'philanthropy', year: '2023', type: 'image', title: 'Education Initiative Launch', aspect: 'portrait' },
  { id: 3, category: 'diplomatic', year: '2023', type: 'image', title: 'Global Leaders Summit', aspect: 'landscape' },
  { id: 4, category: 'family', year: '2022', type: 'image', title: 'Royal Heritage Ceremony', aspect: 'square' },
  { id: 5, category: 'business', year: '2022', type: 'video', title: 'Investment Summit Keynote', aspect: 'landscape' },
  { id: 6, category: 'philanthropy', year: '2021', type: 'image', title: 'Healthcare Fund Announcement', aspect: 'portrait' },
  { id: 7, category: 'diplomatic', year: '2020', type: 'image', title: 'Peace Conference Opening', aspect: 'landscape' },
  { id: 8, category: 'business', year: '2019', type: 'image', title: 'Tech Innovation Award', aspect: 'square' },
  { id: 9, category: 'family', year: '2018', type: 'image', title: 'Family Foundation Gala', aspect: 'landscape' },
  { id: 10, category: 'philanthropy', year: '2024', type: 'image', title: 'Water Access Program', aspect: 'portrait' },
  { id: 11, category: 'diplomatic', year: '2024', type: 'video', title: 'Economic Forum Address', aspect: 'landscape' },
  { id: 12, category: 'business', year: '2023', type: 'image', title: 'Global Expansion Announcement', aspect: 'square' },
];

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const categories = [
    { key: 'all', label: t('categories.all'), count: galleryItems.length },
    { key: 'business', label: t('categories.business'), count: galleryItems.filter(i => i.category === 'business').length },
    { key: 'philanthropy', label: t('categories.philanthropy'), count: galleryItems.filter(i => i.category === 'philanthropy').length },
    { key: 'family', label: t('categories.family'), count: galleryItems.filter(i => i.category === 'family').length },
    { key: 'diplomatic', label: t('categories.diplomatic'), count: galleryItems.filter(i => i.category === 'diplomatic').length },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.gallery-hero-icon',
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.gallery-hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.gallery-hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.gallery-hero-stats span',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        );

      // Subtle floating animation (no rotation)
      gsap.to('.gallery-hero-icon', {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax stars
      gsap.to('.gallery-star', {
        y: -80,
        rotation: 120,
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
            delay: (index % 4) * 0.1,
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [filteredItems]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Animate category change
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
      <section
        ref={heroRef}
        className="relative min-h-[75vh] flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>

        {/* Decorative stars */}
        <EightPointStar
          className="gallery-star absolute top-24 right-[12%] text-regal-gold/20"
          size={140}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="gallery-star absolute bottom-36 left-[8%] text-regal-gold/10"
          size={200}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="gallery-star absolute top-1/3 left-[20%] text-regal-gold/5"
          size={80}
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
            {/* Camera Icon */}
            <div className="gallery-hero-icon relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 rotate-12" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/20 -rotate-6">
                <Camera className="w-14 h-14 text-regal-gold" />
              </div>
            </div>

            {/* Title */}
            <h1 className="gallery-hero-title text-display font-serif text-white mb-6">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="gallery-hero-subtitle text-subtitle text-regal-gold-light font-light max-w-2xl mx-auto mb-10">
              {t('subtitle')}
            </p>

            {/* Stats */}
            <div className="gallery-hero-stats flex flex-wrap justify-center gap-8">
              <span className="flex items-center gap-2 text-gray-400">
                <ImageIcon className="w-5 h-5 text-regal-gold" />
                <span className="text-white font-semibold">{galleryItems.filter(i => i.type === 'image').length}</span> Photos
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Video className="w-5 h-5 text-regal-gold" />
                <span className="text-white font-semibold">{galleryItems.filter(i => i.type === 'video').length}</span> Videos
              </span>
              <span className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-5 h-5 text-regal-gold" />
                <span className="text-white font-semibold">2018-2024</span> Timeline
              </span>
            </div>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.key
                      ? 'bg-regal-gold text-white shadow-lg shadow-regal-gold/20'
                      : 'bg-gray-100 text-charcoal hover:bg-regal-gold/10 hover:text-regal-gold'
                  }`}
                >
                  {category.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === category.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-regal-gold shadow-sm'
                    : 'text-gray-500 hover:text-charcoal'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'masonry'
                    ? 'bg-white text-regal-gold shadow-sm'
                    : 'text-gray-500 hover:text-charcoal'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
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
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer bg-white border border-border shadow-sm hover:shadow-2xl transition-all duration-500 ${
                  viewMode === 'masonry' && item.aspect === 'portrait' ? 'sm:row-span-2' : ''
                } ${viewMode === 'masonry' && item.aspect === 'landscape' && index % 3 === 0 ? 'sm:col-span-2' : ''}`}
              >
                {/* Image placeholder */}
                <div className={`relative bg-gradient-to-br from-deep-navy/10 via-regal-gold/5 to-deep-navy/10 ${
                  viewMode === 'grid' ? 'aspect-[4/3]' :
                  item.aspect === 'portrait' ? 'aspect-[3/4]' :
                  item.aspect === 'square' ? 'aspect-square' : 'aspect-[16/10]'
                }`}>
                  {/* Placeholder icon */}
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

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                          {item.type === 'video' ? (
                            <Play className="w-8 h-8 text-white ml-1" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-white" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-regal-gold rounded-full mb-3 capitalize">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-serif text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.year}
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
                    <span className="capitalize">{item.category}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{item.year}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More
            </button>
          </div>
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
                Explore an interactive timeline of key moments and milestones spanning over five decades of impact and achievement.
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
                Interactive Timeline Coming Soon
              </button>
            </FadeIn>
          </Container>
        </section>
      </ParallaxSection>

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
              Discover more about the life and legacy of Prince Alwaleed bin Talal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/biography"
                className="btn-primary"
                data-cursor="Read"
              >
                Read Biography
              </a>
              <a
                href="/news"
                className="btn-outline"
                data-cursor="View"
              >
                Latest News
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
