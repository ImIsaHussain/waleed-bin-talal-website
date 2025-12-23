'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui';
import {
  EightPointStar,
  GeometricGrid,
  ArabesqueCorner,
  GeometricDivider,
  FloatingShapes,
} from '@/components/ui/GeometricPatterns';
import { AnimatedHeading, AnimatedCounter } from '@/components/animations/TextReveal';
import ParallaxSection, { FadeIn } from '@/components/animations/ParallaxSection';
import { MagneticWrapper } from '@/components/animations/MagneticButton';
import {
  Landmark,
  Cpu,
  Hotel,
  Tv,
  Building2,
  TrendingUp,
  Globe2,
  Briefcase,
  ArrowUpRight,
  Crown,
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AccomplishmentsPage() {
  const t = useTranslations('accomplishments');
  const heroRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for disabling stacking cards
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectors = [
    {
      key: 'finance',
      icon: Landmark,
      title: t('sectors.finance.title'),
      description: t('sectors.finance.description'),
      longDescription: 'Prince Alwaleed has been a transformative force in global finance, establishing Kingdom Holding Company as a major institutional investor. His strategic investments in banking institutions have consistently generated strong returns while supporting economic growth in both established and emerging markets.',
      investments: ['Citigroup', 'Saudi Fransi', 'Bank of China', 'HSBC'],
      highlights: ['$12B+ in financial sector investments', 'Board positions at major banks', 'Pioneer in Islamic finance integration'],
    },
    {
      key: 'technology',
      icon: Cpu,
      title: t('sectors.technology.title'),
      description: t('sectors.technology.description'),
      longDescription: 'A visionary early investor in technology, Prince Alwaleed recognized the transformative potential of digital platforms before they became mainstream. His technology investments span social media, ride-sharing, e-commerce, and enterprise software, establishing Kingdom Holding as a bridge between Silicon Valley and the Middle East.',
      investments: ['Apple', 'X (Twitter)', 'Snap', 'Uber', 'Meta', 'JD.com'],
      highlights: ['Early investor in Apple (1997)', 'Major stakeholder in social platforms', 'Pioneer in Middle East tech investment'],
    },
    {
      key: 'hospitality',
      icon: Hotel,
      title: t('sectors.hospitality.title'),
      description: t('sectors.hospitality.description'),
      longDescription: 'The hospitality portfolio represents some of the most prestigious properties in the world. Prince Alwaleed has redefined luxury hospitality through strategic acquisitions and partnerships with Four Seasons Hotels and Resorts, bringing world-class service standards to new markets while preserving the heritage and character of iconic properties.',
      investments: ['Four Seasons Hotels', 'The Savoy (London)', 'The Plaza (NYC)', 'George V (Paris)', 'Mövenpick'],
      highlights: ['Largest individual shareholder in Four Seasons', 'Owner of historic landmark hotels', '50+ luxury properties globally'],
    },
    {
      key: 'media',
      icon: Tv,
      title: t('sectors.media.title'),
      description: t('sectors.media.description'),
      longDescription: 'Through Rotana Group and strategic media investments, Prince Alwaleed has built the largest entertainment company in the Arab world. The media portfolio spans television broadcasting, film production, music recording, and digital content, promoting Arabic culture while fostering cross-cultural exchange.',
      investments: ['Rotana Group', 'News Corp', '21st Century Fox', 'Euro Disney'],
      highlights: ['Largest Arab entertainment network', '10+ TV channels reaching 300M+ viewers', 'Extensive Arabic music catalog'],
    },
    {
      key: 'realEstate',
      icon: Building2,
      title: t('sectors.realEstate.title'),
      description: t('sectors.realEstate.description'),
      longDescription: 'The real estate portfolio includes landmark developments that have reshaped skylines and set new standards for architectural excellence. From the iconic Kingdom Centre in Riyadh to the ambitious Jeddah Tower project, these investments reflect a commitment to creating spaces that inspire and endure for generations.',
      investments: ['Jeddah Tower', 'Kingdom Centre', 'Kingdom City', 'International properties'],
      highlights: ['Developer of world\'s tallest tower', 'Iconic Kingdom Centre tower', 'Mixed-use developments across continents'],
    },
  ];

  const stats = [
    { number: 18, label: 'Industry Sectors', suffix: '+' },
    { number: 50, label: 'Years of Experience', suffix: '+' },
    { number: 6, label: 'Continents', suffix: '' },
    { number: 100, label: 'Billion SAR Assets', suffix: '+' },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      // Hero icon animation
      tl.fromTo(
        '.acc-hero-icon',
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.acc-hero-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
          '-=0.5'
        )
        .fromTo(
          '.acc-hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.acc-hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.acc-hero-stat',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.3'
        );

      // Parallax on decorative elements
      gsap.to('.acc-hero-star', {
        y: -100,
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

  // Stacking cards animation with proper ScrollTrigger pinning (desktop only)
  useEffect(() => {
    if (!sectorsRef.current || isMobile) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stacking-card') as HTMLElement[];
      const scrollDistance = 500; // Distance to scroll per card (more for larger cards)
      const headerOffset = 96; // Account for fixed header on desktop

      // Pin the section while cards stack
      ScrollTrigger.create({
        trigger: sectorsRef.current,
        start: `top top+=${headerOffset}`,
        end: () => `+=${cards.length * scrollDistance}`,
        pin: '.stacking-cards-wrapper',
        pinSpacing: true,
      });

      // Animate each card sliding up and stacking with offset
      cards.forEach((card, index) => {
        const targetY = index * 10; // Offset position (10px per card)

        if (index === 0) {
          // First card just fades in at its position
          gsap.fromTo(
            card,
            { opacity: 0, y: '100%' },
            {
              opacity: 1,
              y: targetY,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectorsRef.current,
                start: 'top 60%',
              },
            }
          );
        } else {
          // Subsequent cards slide up from below to their offset position
          gsap.fromTo(
            card,
            { y: '100%', opacity: 0 },
            {
              y: targetY,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectorsRef.current,
                start: () => `top+=${(index - 1) * scrollDistance + 100} top+=${headerOffset}`,
                end: () => `top+=${index * scrollDistance} top+=${headerOffset}`,
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, sectorsRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] pt-20 lg:pt-24 pb-15 flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>

        {/* Decorative stars - more prominent with rotation variation */}
        <EightPointStar
          className="acc-hero-star absolute top-32 right-[15%] text-regal-gold/25 rotate-[20deg]"
          size={180}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="acc-hero-star absolute bottom-32 left-[8%] text-regal-gold/18 -rotate-[15deg]"
          size={140}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="acc-hero-star absolute top-1/2 right-[5%] text-regal-gold/12 rotate-[28deg]"
          size={280}
          strokeWidth={0.3}
        />
        <EightPointStar
          className="acc-hero-star absolute top-40 left-[3%] text-regal-gold/15 -rotate-[22deg]"
          size={200}
          strokeWidth={0.4}
        />
        <EightPointStar
          className="acc-hero-star absolute bottom-20 right-[30%] text-regal-gold/12 rotate-45"
          size={80}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="acc-hero-star absolute top-28 left-[22%] text-regal-gold/10 -rotate-[32deg]"
          size={60}
          strokeWidth={1}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/25" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/25" />

        {/* Gradient overlay - softer and lower start */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-navy/5 to-deep-navy/40" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              {/* Hero icon */}
              <div className="acc-hero-icon relative w-28 h-28 mb-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 blur-xl" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/30">
                  <Crown className="w-14 h-14 text-regal-gold" />
                </div>
              </div>

              {/* Decorative line */}
              <div className="acc-hero-line w-24 h-1 bg-regal-gold mb-8 origin-left" />

              {/* Title */}
              <h1 className="acc-hero-title text-display font-serif text-white mb-6">
                {t('title')}
              </h1>

              {/* Subtitle */}
              <p className="acc-hero-subtitle text-xl text-gray-300 leading-relaxed max-w-xl mb-8">
                {t('subtitle')}
              </p>

              {/* Intro text */}
              <p className="acc-hero-subtitle text-lg text-regal-gold-light/80 leading-relaxed max-w-xl">
                {t('intro')}
              </p>
            </div>

            {/* Right - Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="acc-hero-stat p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center group hover:bg-white/10 hover:border-regal-gold/30 transition-all duration-500"
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                    <AnimatedCounter end={stat.number} duration={2 + index * 0.3} />
                    <span className="text-regal-gold">{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================
          KINGDOM HOLDING INTRO
          ============================================ */}
      <section className="section-padding-sm bg-background relative overflow-hidden">
        {/* Arabic decorative elements with rotation */}
        <EightPointStar
          className="absolute top-10 right-[8%] text-regal-gold/10 rotate-[18deg]"
          size={100}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="absolute bottom-10 left-[5%] text-regal-gold/8 -rotate-[25deg]"
          size={80}
          strokeWidth={0.6}
        />
        <ArabesqueCorner position="top-right" className="text-regal-gold/12" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/12" />
        <Container size="md">
          <FadeIn className="text-center">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-regal-gold" />
              <EightPointStar className="text-regal-gold" size={24} strokeWidth={1.5} />
              <div className="w-12 h-px bg-regal-gold" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif text-charcoal mb-6">
              Kingdom Holding Company
            </h2>
            <p className="text-body-lg text-muted leading-relaxed max-w-3xl mx-auto">
              Founded in 1980, Kingdom Holding Company has grown into one of the world&apos;s
              most diversified investment holding companies, with strategic positions across
              technology, hospitality, finance, real estate, and entertainment sectors.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          SECTORS SHOWCASE - STACKING CARDS (Desktop) / NORMAL CARDS (Mobile)
          ============================================ */}
      <section ref={sectorsRef} className="relative overflow-hidden">
        {/* Pinnable wrapper */}
        <div className="stacking-cards-wrapper bg-background">
          {/* Section header - reduced padding */}
          <div className="pt-16 pb-6 relative">
            <ArabesqueCorner position="top-left" className="text-regal-gold/15" />
            <ArabesqueCorner position="top-right" className="text-regal-gold/15" />
            <Container>
              <div className="text-center">
                <FadeIn>
                  <span className="text-label text-regal-gold mb-3 block">Investment Portfolio</span>
                </FadeIn>
                <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
                  Sectors of Excellence
                </AnimatedHeading>
              </div>
            </Container>
          </div>

          {/* Desktop: Stacking Cards Container - Full Width Edge to Edge */}
          {!isMobile && (
            <div className="relative" style={{ height: 'calc(100vh - 120px)' }}>
              {sectors.map((sector, index) => (
                <div
                  key={sector.key}
                  className="stacking-card absolute inset-x-0"
                  style={{
                    zIndex: index + 1,
                    top: `${index * 10}px`,
                    height: 'calc(100vh - 120px)',
                  }}
                >
                  <div className="relative h-full bg-cream overflow-hidden rounded-t-lg shadow-2xl">
                    {/* Colored accent bar at top - 10px */}
                    <div className="h-2.5 w-full bg-deep-green" />

                    {/* Arabic pattern overlay - subtle */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                      <EightPointStar
                        className="absolute -top-20 -right-20 text-charcoal"
                        size={400}
                        strokeWidth={0.5}
                      />
                      <EightPointStar
                        className="absolute -bottom-20 -left-20 text-charcoal"
                        size={350}
                        strokeWidth={0.5}
                      />
                    </div>

                    {/* Card content */}
                    <div className="relative z-10 h-full p-8 lg:p-12 xl:p-16 overflow-y-auto">
                      <div className="max-w-7xl mx-auto">
                        {/* Header Row */}
                        <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
                          {/* Icon */}
                          <div className="w-20 h-20 rounded-2xl bg-deep-green flex items-center justify-center shadow-lg shrink-0">
                            <sector.icon className="w-10 h-10 text-white" />
                          </div>

                          {/* Title and Short Description */}
                          <div className="flex-1">
                            <h3 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-medium text-charcoal mb-4">
                              {sector.title}
                            </h3>
                            <p className="text-xl text-muted leading-relaxed max-w-3xl">
                              {sector.description}
                            </p>
                          </div>
                        </div>

                        {/* Divider - fading gold line */}
                        <div className="mb-8">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-regal-gold/40 to-transparent" />
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-12">
                          {/* Left Column - Long Description */}
                          <div>
                            <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">Overview</h4>
                            <p className="text-muted leading-relaxed text-lg">
                              {sector.longDescription}
                            </p>
                          </div>

                          {/* Right Column - Investments & Highlights */}
                          <div className="space-y-8">
                            {/* Key Investments */}
                            <div>
                              <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">Key Investments</h4>
                              <div className="flex flex-wrap gap-3">
                                {sector.investments.map((investment) => (
                                  <span
                                    key={investment}
                                    className="px-4 py-2 text-sm font-medium bg-deep-green/10 text-deep-green rounded-full border border-deep-green/30"
                                  >
                                    {investment}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Highlights */}
                            <div>
                              <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">Highlights</h4>
                              <ul className="space-y-3">
                                {sector.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <span className="w-2 h-2 rounded-full bg-deep-green mt-2 shrink-0" />
                                    <span className="text-muted">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Normal scrollable cards */}
          {isMobile && (
            <Container className="pb-12">
              <div className="space-y-6">
                {sectors.map((sector, index) => (
                  <FadeIn key={sector.key} delay={index * 0.1}>
                    <div className="bg-cream rounded-xl shadow-lg overflow-hidden">
                      {/* Colored accent bar at top */}
                      <div className="h-2 w-full bg-deep-green" />

                      {/* Card content */}
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-deep-green flex items-center justify-center shadow-md">
                            <sector.icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-serif font-medium text-charcoal">
                              {sector.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-muted leading-relaxed mb-4">
                          {sector.description}
                        </p>

                        {/* Divider - fading gold line */}
                        <div className="mb-4">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-regal-gold/40 to-transparent" />
                        </div>

                        {/* Key Investments */}
                        <div className="flex flex-wrap gap-2">
                          {sector.investments.slice(0, 4).map((investment) => (
                            <span
                              key={investment}
                              className="px-3 py-1 text-xs font-medium bg-deep-green/10 text-deep-green rounded-full border border-deep-green/30"
                            >
                              {investment}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </Container>
          )}

          {/* Bottom spacer to prevent next section overlap (desktop only) */}
          {!isMobile && <div className="h-20 bg-cream" />}
        </div>
      </section>

      {/* ============================================
          KEY INVESTMENTS HIGHLIGHT
          ============================================ */}
      <ParallaxSection speed={0.1}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/5" />
          </div>

          <EightPointStar
            className="absolute -right-32 top-1/2 -translate-y-1/2 text-regal-gold/10"
            size={400}
            strokeWidth={0.5}
          />

          <Container className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Content */}
              <FadeIn direction="left">
                <span className="text-label text-regal-gold mb-4 block">Strategic Vision</span>
                <h2 className="text-title font-serif text-white mb-6">
                  Investing in Tomorrow
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    My investment philosophy has always been to identify companies and sectors
                    poised for transformative growth. From early investments in Apple and
                    Citigroup to recent ventures in artificial intelligence and social media,
                    I seek opportunities that combine financial returns with lasting impact.
                  </p>
                  <p>
                    Kingdom Holding&apos;s portfolio reflects a commitment to innovation,
                    quality, and long-term value creation across six continents.
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <MagneticWrapper strength={0.1}>
                    <a
                      href="https://www.kingdom.com.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-regal-gold text-deep-navy font-medium rounded-full hover:bg-regal-gold-light transition-colors"
                      data-cursor="Visit"
                    >
                      Kingdom Holding
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticWrapper>
                </div>
              </FadeIn>

              {/* Right - Investment highlights */}
              <FadeIn direction="right" delay={0.2}>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: 'Early Tech Investor', desc: 'Pioneering investments in Apple, Twitter, and emerging platforms' },
                    { icon: Globe2, title: 'Global Presence', desc: 'Strategic holdings across Americas, Europe, Middle East, and Asia' },
                    { icon: Briefcase, title: 'Diversified Portfolio', desc: '18+ sectors from hospitality to healthcare, finance to technology' },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="flex gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-regal-gold/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-regal-gold/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-regal-gold" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          SAUDI CONTRIBUTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <ArabesqueCorner position="top-right" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/20" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <EightPointStar className="text-regal-gold mx-auto mb-8" size={40} strokeWidth={1} />
            </FadeIn>

            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal mb-8">
              {t('saudiContribution.title')}
            </AnimatedHeading>

            <FadeIn delay={0.2}>
              <p className="text-body-lg text-muted leading-relaxed mb-12">
                {t('saudiContribution.content')}
              </p>
            </FadeIn>

            {/* Vision 2030 alignment */}
            <FadeIn delay={0.3}>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { label: 'Jobs Created', value: 'Thousands' },
                  { label: 'Vision 2030', value: 'Aligned' },
                  { label: 'Economic Impact', value: 'Transformative' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-6 bg-cream rounded-xl border border-border"
                  >
                    <p className="text-2xl font-serif text-regal-gold mb-2">{item.value}</p>
                    <p className="text-sm text-muted uppercase tracking-wider">{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="section-padding-sm bg-cream relative">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
            <h2 className="text-subtitle font-serif text-charcoal mb-4">
              Explore More
            </h2>
            <p className="text-muted mb-8">
              Discover the achievements and philanthropic initiatives that complement this investment legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/achievements"
                className="btn-primary"
                data-cursor="View"
              >
                View Achievements
              </Link>
              <Link
                href="/philanthropy"
                className="btn-outline"
                data-cursor="Explore"
              >
                Explore Philanthropy
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
