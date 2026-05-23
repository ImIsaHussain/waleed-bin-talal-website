'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { AnimatedHeading, AnimatedCounter, ParallaxSection, FadeIn, MagneticWrapper } from '@/components/animations';
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

export default function AccomplishmentsPage() {
  const t = useTranslations('accomplishments');
  const tc = useTranslations('common');
  const sectorsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for disabling stacking cards (debounced)
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    let timeoutId: ReturnType<typeof setTimeout>;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 1024);
      }, 150);
    };
    window.addEventListener('resize', checkMobile);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const sectors = [
    {
      key: 'finance',
      icon: Landmark,
      title: t('sectors.finance.title'),
      description: t('sectors.finance.description'),
      longDescription: t('sectors.finance.longDescription'),
      investments: t.raw('sectors.finance.investments') as string[],
      highlights: t.raw('sectors.finance.highlights') as string[],
    },
    {
      key: 'technology',
      icon: Cpu,
      title: t('sectors.technology.title'),
      description: t('sectors.technology.description'),
      longDescription: t('sectors.technology.longDescription'),
      investments: t.raw('sectors.technology.investments') as string[],
      highlights: t.raw('sectors.technology.highlights') as string[],
    },
    {
      key: 'hospitality',
      icon: Hotel,
      title: t('sectors.hospitality.title'),
      description: t('sectors.hospitality.description'),
      longDescription: t('sectors.hospitality.longDescription'),
      investments: t.raw('sectors.hospitality.investments') as string[],
      highlights: t.raw('sectors.hospitality.highlights') as string[],
    },
    {
      key: 'media',
      icon: Tv,
      title: t('sectors.media.title'),
      description: t('sectors.media.description'),
      longDescription: t('sectors.media.longDescription'),
      investments: t.raw('sectors.media.investments') as string[],
      highlights: t.raw('sectors.media.highlights') as string[],
    },
    {
      key: 'realEstate',
      icon: Building2,
      title: t('sectors.realEstate.title'),
      description: t('sectors.realEstate.description'),
      longDescription: t('sectors.realEstate.longDescription'),
      investments: t.raw('sectors.realEstate.investments') as string[],
      highlights: t.raw('sectors.realEstate.highlights') as string[],
    },
  ];

  const stats = [
    { number: 18, label: t('stats.industrySectors'), suffix: '+' },
    { number: 50, label: t('stats.yearsOfExperience'), suffix: '+' },
    { number: 6, label: t('stats.continents'), suffix: '' },
    { number: 100, label: t('stats.billionSarAssets'), suffix: '+' },
  ];

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
      <PageHero
        heroPrefix="acc"
        icon={<Crown className="w-14 h-14 text-regal-gold" />}
        layout="two-column"
        title={t('title')}
        subtitle={t('subtitle')}
        description={t('intro')}
        minHeight="min-h-[85vh]"
        decorativeLine
        rightContent={
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
        }
      />

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
              {t('khcIntro.title')}
            </h2>
            <p className="text-body-lg text-muted leading-relaxed max-w-3xl mx-auto">
              {t('khcIntro.description')}
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
                  <span className="text-label text-regal-gold mb-3 block">{t('portfolio.label')}</span>
                </FadeIn>
                <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
                  {t('portfolio.title')}
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
                            <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">{t('columnHeaders.overview')}</h4>
                            <p className="text-muted leading-relaxed text-lg">
                              {sector.longDescription}
                            </p>
                          </div>

                          {/* Right Column - Investments & Highlights */}
                          <div className="space-y-8">
                            {/* Key Investments */}
                            <div>
                              <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">{t('columnHeaders.keyInvestments')}</h4>
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
                              <h4 className="text-lg font-semibold text-charcoal mb-4 uppercase tracking-wider">{t('columnHeaders.highlights')}</h4>
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
                <span className="text-label text-regal-gold mb-4 block">{t('investingInTomorrow.label')}</span>
                <h2 className="text-title font-serif text-white mb-6">
                  {t('investingInTomorrow.title')}
                </h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    {t('investingInTomorrow.paragraph1')}
                  </p>
                  <p>
                    {t('investingInTomorrow.paragraph2')}
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <MagneticWrapper strength={0.1}>
                    <a
                      href="https://www.kingdom.com.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-regal-gold text-deep-navy font-medium rounded-full hover:bg-regal-gold-light transition-colors"
                      data-cursor={tc('cta.cursor.visit')}
                    >
                      {t('investingInTomorrow.kingdomHolding')}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </MagneticWrapper>
                </div>
              </FadeIn>

              {/* Right - Investment highlights */}
              <FadeIn direction="right" delay={0.2}>
                <div className="space-y-4">
                  {[
                    { icon: TrendingUp, title: t('investmentHighlights.earlyTechInvestor.title'), desc: t('investmentHighlights.earlyTechInvestor.description') },
                    { icon: Globe2, title: t('investmentHighlights.globalPresence.title'), desc: t('investmentHighlights.globalPresence.description') },
                    { icon: Briefcase, title: t('investmentHighlights.diversifiedPortfolio.title'), desc: t('investmentHighlights.diversifiedPortfolio.description') },
                  ].map((item) => (
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
                  { label: t('saudiStats.jobsCreated.label'), value: t('saudiStats.jobsCreated.value') },
                  { label: t('saudiStats.vision2030.label'), value: t('saudiStats.vision2030.value') },
                  { label: t('saudiStats.economicImpact.label'), value: t('saudiStats.economicImpact.value') },
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
      <PageCTA
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLabel={tc('cta.viewAchievements')}
        primaryHref="/achievements"
        primaryCursor={tc('cta.cursor.view')}
        outlineLabel={tc('cta.explorePhilanthropy')}
        outlineHref="/philanthropy"
        outlineCursor={tc('cta.cursor.explore')}
      />
    </>
  );
}
