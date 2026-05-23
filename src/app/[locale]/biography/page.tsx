'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { AnimatedHeading, ParallaxSection, FadeIn } from '@/components/animations';
import { GraduationCap, Heart, Crown, Quote, Building, Globe } from 'lucide-react';

export default function BiographyPage() {
  const t = useTranslations('biography');
  const tc = useTranslations('common');
  const timelineRef = useRef<HTMLDivElement>(null);

  // Streamlined timeline with key milestones in chronological order
  const sections = [
    {
      key: 'earlyLife',
      icon: Crown,
      title: t('timeline.earlyLife.title'),
      content: t('timeline.earlyLife.content'),
      year: t('timeline.earlyLife.year'),
      period: t('timeline.earlyLife.period'),
    },
    {
      key: 'menloCollege',
      icon: GraduationCap,
      title: t('timeline.menloCollege.title'),
      content: t('timeline.menloCollege.content'),
      year: t('timeline.menloCollege.year'),
      period: t('timeline.menloCollege.period'),
    },
    {
      key: 'kingdomHolding',
      icon: Building,
      title: t('timeline.kingdomHolding.title'),
      content: t('timeline.kingdomHolding.content'),
      year: t('timeline.kingdomHolding.year'),
      period: t('timeline.kingdomHolding.period'),
    },
    {
      key: 'syracuse',
      icon: GraduationCap,
      title: t('timeline.syracuse.title'),
      content: t('timeline.syracuse.content'),
      year: t('timeline.syracuse.year'),
      period: t('timeline.syracuse.period'),
    },
    {
      key: 'globalExpansion',
      icon: Globe,
      title: t('timeline.globalExpansion.title'),
      content: t('timeline.globalExpansion.content'),
      year: t('timeline.globalExpansion.year'),
      period: t('timeline.globalExpansion.period'),
    },
    {
      key: 'philanthropy',
      icon: Heart,
      title: t('timeline.philanthropy.title'),
      content: t('timeline.philanthropy.content'),
      year: t('timeline.philanthropy.year'),
      period: t('timeline.philanthropy.period'),
    },
    {
      key: 'legacy',
      icon: Heart,
      title: t('timeline.legacy.title'),
      content: t('timeline.legacy.content'),
      year: t('timeline.legacy.year'),
      period: t('timeline.legacy.period'),
    },
  ];

  // Timeline animation
  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the timeline line
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Animate timeline items
      gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.fromTo(
          item as Element,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <PageHero
        heroPrefix="bio"
        icon={<Crown className="w-14 h-14 text-regal-gold" />}
        title={t('title')}
        subtitle={t('subtitle')}
        minHeight="min-h-[70vh]"
      />

      {/* ============================================
          INTRO SECTION
          ============================================ */}
      <section className="py-16 bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <EightPointStar className="text-regal-gold mx-auto mb-8" size={36} strokeWidth={2} />
            <p className="text-body-lg text-muted leading-relaxed max-w-3xl mx-auto">
              {t('intro')}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          TIMELINE SECTION
          ============================================ */}
      <section ref={timelineRef} className="section-padding bg-cream relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Arabic decorative elements with rotation */}
        <EightPointStar
          className="absolute top-20 right-[5%] text-regal-gold/12 rotate-[15deg]"
          size={140}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="absolute top-1/3 left-[3%] text-regal-gold/10 -rotate-[25deg]"
          size={180}
          strokeWidth={0.4}
        />
        <EightPointStar
          className="absolute bottom-40 right-[8%] text-regal-gold/8 rotate-[32deg]"
          size={120}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="absolute bottom-20 left-[10%] text-regal-gold/10 -rotate-[18deg]"
          size={90}
          strokeWidth={0.7}
        />
        <ArabesqueCorner position="top-left" className="text-regal-gold/20" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/20" />

        <Container>
          {/* Section header */}
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">{t('timeline.label')}</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              {t('timeline.title')}
            </AnimatedHeading>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block">
              <div className="timeline-line absolute inset-0 bg-regal-gold origin-top" />
            </div>

            {/* Mobile line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border lg:hidden">
              <div className="timeline-line absolute inset-0 bg-regal-gold origin-top" />
            </div>

            {/* Timeline items */}
            <div className="space-y-12 lg:space-y-16">
              {sections.map((section, index) => (
                <div
                  key={section.key}
                  className={`timeline-item relative flex flex-col lg:flex-row gap-6 lg:gap-12 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Year marker - desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 w-16 h-16 rounded-full bg-background border-2 border-regal-gold items-center justify-center z-10 shadow-lg">
                    <span className="text-xs font-bold text-regal-gold">{section.year}</span>
                  </div>

                  {/* Year marker - mobile */}
                  <div className="lg:hidden absolute left-6 -translate-x-1/2 top-0 w-12 h-12 rounded-full bg-background border-2 border-regal-gold flex items-center justify-center z-10">
                    <span className="text-[10px] font-bold text-regal-gold">{section.year}</span>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12'
                    } pl-16 lg:pl-0`}
                  >
                    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
                      <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-regal-gold-muted flex items-center justify-center">
                          <section.icon className="w-6 h-6 text-regal-gold" />
                        </div>
                        <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                          <span className="text-xs font-semibold text-regal-gold uppercase tracking-wider">
                            {section.period}
                          </span>
                          <h3 className="text-xl lg:text-2xl font-serif font-medium text-charcoal mt-1 mb-3">
                            {section.title}
                          </h3>
                          <p className="text-muted leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          QUOTE SECTION
          ============================================ */}
      <ParallaxSection speed={0.1}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/8" />
          </div>

          {/* Decorative stars */}
          <EightPointStar
            className="absolute -left-20 top-1/2 -translate-y-1/2 text-regal-gold/15"
            size={280}
            strokeWidth={1.5}
          />
          <EightPointStar
            className="absolute -right-20 top-1/3 text-regal-gold/10"
            size={200}
            strokeWidth={1.5}
          />

          <Container size="md" className="relative z-10">
            <FadeIn className="text-center">
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-regal-gold mx-auto mb-8 opacity-60" />

              {/* Quote text */}
              <blockquote className="text-2xl lg:text-3xl font-serif text-white leading-relaxed">
                &ldquo;{t('quote')}&rdquo;
              </blockquote>
            </FadeIn>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          HERITAGE SECTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/25" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/25" />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <FadeIn direction="left">
              <span className="text-label text-regal-gold mb-4 block">{t('heritage.label')}</span>
              <h2 className="text-title font-serif text-charcoal mb-6">
                {t('heritage.title')}
              </h2>
              <div className="space-y-5 text-muted leading-relaxed">
                <p>{t('heritage.paragraph1')}</p>
                <p>{t('heritage.paragraph2')}</p>
                <p>{t('heritage.paragraph3')}</p>
              </div>
            </FadeIn>

            {/* Right - Facts Grid */}
            <FadeIn direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">{t('heritage.facts.grandsonOf')}</h4>
                  <p className="text-muted text-sm">{t('heritage.facts.grandsonOfValue')}</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">{t('heritage.facts.sonOf')}</h4>
                  <p className="text-muted text-sm">{t('heritage.facts.sonOfValue')}</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">{t('heritage.facts.born')}</h4>
                  <p className="text-muted text-sm">{t('heritage.facts.bornValue')}</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">{t('heritage.facts.education')}</h4>
                  <p className="text-muted text-sm">{t('heritage.facts.educationValue')}</p>
                </div>
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
        primaryLabel={tc('cta.viewAccomplishments')}
        primaryHref="/accomplishments"
        primaryCursor={tc('cta.cursor.view')}
        outlineLabel={tc('cta.explorePhilanthropy')}
        outlineHref="/philanthropy"
        outlineCursor={tc('cta.cursor.explore')}
      />
    </>
  );
}
