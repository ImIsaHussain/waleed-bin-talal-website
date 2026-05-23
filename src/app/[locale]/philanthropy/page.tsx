'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { AnimatedHeading, AnimatedCounter, ParallaxSection, FadeIn } from '@/components/animations';
import {
  Heart,
  Users,
  Home,
  HeartHandshake,
  Globe,
  Handshake,
  GraduationCap,
  Building2,
  Droplets,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

export default function PhilanthropyPage() {
  const t = useTranslations('philanthropy');
  const tc = useTranslations('common');
  const pillarsRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      key: 'empowerment',
      icon: Users,
      title: t('pillars.empowerment.title'),
      description: t('pillars.empowerment.description'),
      gradient: 'from-purple-500 to-violet-600',
      accentColor: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      key: 'community',
      icon: Home,
      title: t('pillars.community.title'),
      description: t('pillars.community.description'),
      gradient: 'from-emerald-500 to-teal-600',
      accentColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      key: 'disaster',
      icon: HeartHandshake,
      title: t('pillars.disaster.title'),
      description: t('pillars.disaster.description'),
      gradient: 'from-rose-500 to-red-600',
      accentColor: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
    {
      key: 'culture',
      icon: Globe,
      title: t('pillars.culture.title'),
      description: t('pillars.culture.description'),
      gradient: 'from-blue-500 to-indigo-600',
      accentColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  const impactStats = [
    { number: 190, suffix: '+', label: t('impact.countries'), icon: Globe },
    { number: 1, suffix: 'B+', label: t('impact.beneficiaries'), icon: Users },
    { number: 1000, suffix: '+', label: t('impact.initiatives'), icon: Heart },
    { number: 500, suffix: '+', label: t('impact.partners'), icon: Handshake },
  ];

  const focusAreas = [
    { icon: GraduationCap, label: t('focusAreas.education.label'), count: t('focusAreas.education.count') },
    { icon: Building2, label: t('focusAreas.healthcare.label'), count: t('focusAreas.healthcare.count') },
    { icon: Droplets, label: t('focusAreas.waterAccess.label'), count: t('focusAreas.waterAccess.count') },
    { icon: BookOpen, label: t('focusAreas.culturalExchange.label'), count: t('focusAreas.culturalExchange.count') },
  ];

  // Pillars animation
  useEffect(() => {
    if (!pillarsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.pillar-card').forEach((card, index) => {
        gsap.fromTo(
          card as Element,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.15,
          }
        );
      });
    }, pillarsRef);

    return () => ctx.revert();
  }, []);

  // Impact section animation
  useEffect(() => {
    if (!impactRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the globe/world visualization
      gsap.fromTo(
        '.impact-globe',
        { scale: 0, rotation: -90 },
        {
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 70%',
          },
        }
      );

      // Animate stat items
      gsap.utils.toArray('.impact-stat').forEach((stat, index) => {
        gsap.fromTo(
          stat as Element,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat as Element,
              start: 'top 85%',
            },
            delay: index * 0.1,
          }
        );
      });
    }, impactRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <PageHero
        heroPrefix="phil"
        icon={<Heart className="w-16 h-16 text-regal-gold" fill="currentColor" />}
        title={t('title')}
        subtitle={t('subtitle')}
        minHeight="min-h-[85vh]"
        rightContent={
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {impactStats.slice(0, 3).map((stat, index) => (
              <div
                key={index}
                className="philanthropy-hero-stat text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-regal-gold mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        }
      />

      {/* ============================================
          MISSION SECTION
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
          FOUR PILLARS SECTION - HORIZONTAL SCROLL
          ============================================ */}
      <section ref={pillarsRef} className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/15" />

        <Container>
          {/* Section header */}
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">{t('approach.label')}</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              {t('pillars.title')}
            </AnimatedHeading>
          </div>
        </Container>

        {/* Horizontal Scrolling Pillars */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 px-4 md:px-8 lg:px-16 snap-x snap-mandatory no-scrollbar">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.key}
                className="pillar-card group flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[380px] snap-center"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden border border-border hover:border-regal-gold/30 transition-all duration-500 hover:shadow-xl h-full">
                  {/* Top Visual Area */}
                  <div className={`relative h-40 bg-gradient-to-br ${pillar.gradient} overflow-hidden`}>
                    {/* Large background icon */}
                    <pillar.icon className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10" />

                    {/* Star decoration */}
                    <EightPointStar
                      className="absolute top-4 right-4 text-white/20"
                      size={48}
                      strokeWidth={1.5}
                    />

                    {/* Pillar number */}
                    <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <span className="text-xl font-bold text-white">0{index + 1}</span>
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-6 left-6 w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                      <pillar.icon className={`w-8 h-8 ${pillar.accentColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-serif font-medium text-charcoal mb-4 group-hover:text-regal-gold transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {pillar.description}
                    </p>

                    {/* Bottom indicator */}
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                      <EightPointStar className="text-regal-gold/40" size={16} strokeWidth={2} />
                      <span className="text-xs text-muted uppercase tracking-wider">
                        {t('approach.swipeToExplore')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {pillars.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-regal-gold/30 hover:bg-regal-gold transition-colors"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          GLOBAL IMPACT SECTION
          ============================================ */}
      <ParallaxSection speed={0.15}>
        <section ref={impactRef} className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/5" />
          </div>

          {/* Decorative elements */}
          <EightPointStar
            className="absolute -left-32 top-1/4 text-regal-gold/10"
            size={400}
            strokeWidth={0.3}
          />
          <EightPointStar
            className="absolute -right-32 bottom-1/4 text-regal-gold/5"
            size={350}
            strokeWidth={0.3}
          />

          <Container className="relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <FadeIn>
                <span className="text-label text-regal-gold mb-4 block">{t('impact.label')}</span>
              </FadeIn>
              <AnimatedHeading as="h2" className="text-title font-serif text-white">
                {t('impact.title')}
              </AnimatedHeading>
            </div>

            {/* Globe visualization placeholder */}
            <div className="impact-globe relative w-64 h-64 mx-auto mb-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-transparent border border-regal-gold/30" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-regal-gold/10 to-transparent border border-regal-gold/20" />
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-regal-gold/5 to-transparent border border-regal-gold/10 flex items-center justify-center">
                <Globe className="w-20 h-20 text-regal-gold" />
              </div>
              {/* Orbit rings */}
              <div className="absolute inset-0 border border-dashed border-regal-gold/20 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
              <div className="absolute -inset-8 border border-dashed border-regal-gold/10 rounded-full animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="impact-stat text-center p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-regal-gold/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-regal-gold" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          FOCUS AREAS SECTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">{t('focusAreas.label')}</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              {t('focusAreas.title')}
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group text-center p-8 bg-white rounded-2xl border border-border hover:border-regal-gold/30 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-regal-gold-muted flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-regal-gold/20">
                    <area.icon className="w-8 h-8 text-regal-gold" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-charcoal mb-2">
                    {area.label}
                  </h3>
                  <p className="text-sm text-muted">
                    {area.count}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================
          GIVING PLEDGE SECTION
          ============================================ */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/20" />

        <Container size="md">
          <FadeIn className="text-center">
            {/* Icon */}
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-regal-gold/10" />
              <div className="relative w-full h-full rounded-full border-2 border-regal-gold/30 flex items-center justify-center">
                <Handshake className="w-12 h-12 text-regal-gold" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-serif font-medium text-charcoal mb-6">
              {t('givingPledge.title')}
            </h2>

            {/* Content */}
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('givingPledge.content')}
            </p>

            {/* Link */}
            <a
              href="https://givingpledge.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-regal-gold hover:text-regal-gold-dark transition-colors group"
            >
              <span className="font-medium">{t('givingPledge.learnMore')}</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </FadeIn>
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
        outlineLabel={tc('cta.readBiography')}
        outlineHref="/biography"
        outlineCursor={tc('cta.cursor.read')}
      />
    </>
  );
}
