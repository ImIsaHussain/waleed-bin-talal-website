'use client';

import { useRef, useEffect } from 'react';
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
import { Award, Globe, Handshake, Trophy, Star, Medal, Crown, Users } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AchievementsPage() {
  const t = useTranslations('achievements');
  const heroRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      key: 'influence',
      icon: Globe,
      title: t('categories.influence.title'),
      items: t.raw('categories.influence.items') as string[],
      gradient: 'from-blue-600 to-indigo-700',
      lightGradient: 'from-blue-500/10 to-indigo-500/5',
    },
    {
      key: 'humanitarian',
      icon: Handshake,
      title: t('categories.humanitarian.title'),
      items: t.raw('categories.humanitarian.items') as string[],
      gradient: 'from-emerald-600 to-teal-700',
      lightGradient: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      key: 'business',
      icon: Trophy,
      title: t('categories.business.title'),
      items: t.raw('categories.business.items') as string[],
      gradient: 'from-amber-500 to-orange-600',
      lightGradient: 'from-amber-500/10 to-orange-500/5',
    },
  ];

  const highlights = [
    { icon: Star, label: 'TIME 100', desc: 'Most Influential People' },
    { icon: Medal, label: 'Forbes', desc: 'Most Powerful People' },
    { icon: Crown, label: 'Order of Republic', desc: 'Multiple Nations' },
    { icon: Users, label: 'UNESCO', desc: 'Humanitarian Award' },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      // Hero icon animation
      tl.fromTo(
        '.ach-hero-icon',
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.ach-hero-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' },
          '-=0.5'
        )
        .fromTo(
          '.ach-hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.ach-hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.ach-highlight',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.3'
        );

      // Subtle floating animation for hero icon (no rotation)
      gsap.to('.ach-hero-icon', {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on decorative elements
      gsap.to('.ach-hero-star', {
        y: -80,
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

  // Awards cards animation
  useEffect(() => {
    if (!awardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.award-card').forEach((card, index) => {
        gsap.fromTo(
          card as Element,
          { opacity: 0, y: 60, scale: 0.95 },
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

      // Animate award items within cards
      gsap.utils.toArray('.award-item').forEach((item) => {
        gsap.fromTo(
          item as Element,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item as Element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, awardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] pt-20 lg:pt-24 pb-15 lg:pb-20 flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>

        {/* Decorative stars - more prominent with rotation variation */}
        <EightPointStar
          className="ach-hero-star absolute top-32 right-[12%] text-regal-gold/25 rotate-12"
          size={180}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="ach-hero-star absolute bottom-40 left-[8%] text-regal-gold/20 -rotate-15"
          size={120}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="ach-hero-star absolute top-1/3 left-[3%] text-regal-gold/15 rotate-[22deg]"
          size={220}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="ach-hero-star absolute top-1/2 right-[5%] text-regal-gold/10 -rotate-[30deg]"
          size={280}
          strokeWidth={0.4}
        />
        <EightPointStar
          className="ach-hero-star absolute bottom-20 right-[25%] text-regal-gold/15 rotate-45"
          size={90}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="ach-hero-star absolute top-40 left-[20%] text-regal-gold/10 -rotate-[18deg]"
          size={60}
          strokeWidth={1}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/30" />

        {/* Gradient overlay - softer */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/20 via-deep-navy/5 to-deep-navy/40" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero icon */}
            <div className="ach-hero-icon relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 blur-xl" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/30">
                <Trophy className="w-14 h-14 text-regal-gold" />
              </div>
            </div>

            {/* Decorative line */}
            <div className="ach-hero-line w-24 h-1 bg-regal-gold mb-8 mx-auto origin-center" />

            {/* Title */}
            <h1 className="ach-hero-title text-display font-serif text-white mb-6">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="ach-hero-subtitle text-subtitle text-regal-gold-light font-light mb-8">
              {t('subtitle')}
            </p>

            {/* Intro text */}
            <p className="ach-hero-subtitle text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-16">
              {t('intro')}
            </p>

            {/* Highlight badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="ach-highlight p-4 lg:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center group hover:bg-white/10 hover:border-regal-gold/30 transition-all duration-500"
                >
                  <item.icon className="w-8 h-8 text-regal-gold mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-medium mb-1">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================
          RECOGNITION CATEGORIES - CLEAN VERTICAL LAYOUT
          ============================================ */}
      <section ref={awardsRef} className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Arabic decorative elements with rotation */}
        <EightPointStar
          className="absolute top-20 right-[5%] text-regal-gold/10 rotate-[15deg]"
          size={150}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="absolute bottom-32 left-[3%] text-regal-gold/8 -rotate-[25deg]"
          size={180}
          strokeWidth={0.4}
        />
        <ArabesqueCorner position="top-right" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/15" />

        <Container className="relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">Recognition</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              Areas of Achievement
            </AnimatedHeading>
          </div>

          {/* Categories - Clean Vertical Layout */}
          <div className="max-w-4xl mx-auto space-y-12">
            {categories.map((category, categoryIndex) => (
              <div
                key={category.key}
                className="award-card group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-serif font-medium text-charcoal group-hover:text-regal-gold transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted mt-1">{category.items.length} recognitions</p>
                  </div>
                </div>

                {/* Items - Horizontal Flow */}
                <div className="pl-4 border-l-2 border-regal-gold/20 group-hover:border-regal-gold/40 transition-colors">
                  <div className="grid sm:grid-cols-2 gap-4 pl-6">
                    {category.items.map((item, index) => (
                      <div
                        key={index}
                        className="award-item flex items-start gap-3 p-4 rounded-xl bg-white/50 hover:bg-white hover:shadow-md border border-transparent hover:border-regal-gold/20 transition-all duration-300 group/item"
                      >
                        <Award className="w-5 h-5 text-regal-gold shrink-0 mt-0.5" />
                        <span className="text-charcoal leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Separator */}
                {categoryIndex < categories.length - 1 && (
                  <div className="flex justify-center mt-12">
                    <EightPointStar className="text-regal-gold/30" size={24} strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================
          FEATURED RECOGNITION
          ============================================ */}
      <ParallaxSection speed={0.1}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/5" />
          </div>

          <EightPointStar
            className="absolute -left-24 top-1/2 -translate-y-1/2 text-regal-gold/10"
            size={350}
            strokeWidth={0.5}
          />
          <EightPointStar
            className="absolute -right-16 bottom-20 text-regal-gold/5"
            size={200}
            strokeWidth={0.5}
          />

          <Container className="relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section header */}
              <div className="text-center mb-16">
                <FadeIn>
                  <span className="text-label text-regal-gold mb-4 block">Milestones</span>
                </FadeIn>
                <AnimatedHeading as="h2" className="text-title font-serif text-white">
                  A Legacy of Recognition
                </AnimatedHeading>
              </div>

              {/* Recognition showcase */}
              <div className="grid md:grid-cols-2 gap-8">
                <FadeIn direction="left">
                  <div className="p-8 lg:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-regal-gold/20 rounded-2xl flex items-center justify-center">
                        <Star className="w-8 h-8 text-regal-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white">TIME Magazine</h3>
                        <p className="text-regal-gold text-sm">100 Most Influential</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Recognized among the world&apos;s 100 most influential people for contributions
                      to global business, philanthropy, and cross-cultural understanding.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.1}>
                  <div className="p-8 lg:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-regal-gold/20 rounded-2xl flex items-center justify-center">
                        <Medal className="w-8 h-8 text-regal-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white">Forbes</h3>
                        <p className="text-regal-gold text-sm">Most Powerful People</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Consistently ranked among Forbes&apos; World&apos;s Most Powerful People for
                      global business influence and philanthropic leadership.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn direction="left" delay={0.2}>
                  <div className="p-8 lg:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-regal-gold/20 rounded-2xl flex items-center justify-center">
                        <Crown className="w-8 h-8 text-regal-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white">Order of the Republic</h3>
                        <p className="text-regal-gold text-sm">Multiple Nations</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Honored with the Order of the Republic from multiple nations in recognition
                      of contributions to international relations and humanitarian causes.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn direction="right" delay={0.3}>
                  <div className="p-8 lg:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-regal-gold/20 rounded-2xl flex items-center justify-center">
                        <Users className="w-8 h-8 text-regal-gold" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-white">UNESCO</h3>
                        <p className="text-regal-gold text-sm">Humanitarian Award</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Recognized by UNESCO for outstanding contributions to education, cultural
                      preservation, and humanitarian initiatives worldwide.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          DIPLOMACY SECTION
          ============================================ */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/25" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/25" />

        {/* Floating stars with rotation */}
        <EightPointStar
          className="absolute top-16 right-[10%] text-regal-gold/12 rotate-[20deg]"
          size={100}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="absolute bottom-20 left-[8%] text-regal-gold/10 -rotate-[35deg]"
          size={80}
          strokeWidth={0.8}
        />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-regal-gold-muted flex items-center justify-center">
                <Globe className="w-10 h-10 text-regal-gold" />
              </div>

              {/* Title */}
              <h2 className="text-title font-serif text-charcoal mb-8">
                {t('diplomacy.title')}
              </h2>

              {/* Content */}
              <p className="text-body-lg text-muted leading-relaxed mb-12">
                {t('diplomacy.content')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: '50+', label: 'Years of Engagement' },
                  { value: '100+', label: 'Global Partnerships' },
                  { value: '6', label: 'Continents Reached' },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 bg-white rounded-xl border border-border">
                    <p className="text-3xl font-display font-bold text-regal-gold mb-2">{stat.value}</p>
                    <p className="text-sm text-muted">{stat.label}</p>
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
      <section className="section-padding-sm bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
            <h2 className="text-subtitle font-serif text-charcoal mb-4">
              Explore the Journey
            </h2>
            <p className="text-muted mb-8">
              Discover the philanthropic initiatives and family legacy behind these achievements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/philanthropy"
                className="btn-primary"
                data-cursor="View"
              >
                View Philanthropy
              </a>
              <a
                href="/family"
                className="btn-outline"
                data-cursor="Explore"
              >
                Explore Family Legacy
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
