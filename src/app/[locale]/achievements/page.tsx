'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTranslations } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';
import { AnimatedHeading, ParallaxSection, FadeIn } from '@/components/animations';
import { Award, Globe, Handshake, Trophy, Star, Medal, Crown, Users } from 'lucide-react';

export default function AchievementsPage() {
  const t = useTranslations('achievements');
  const tc = useTranslations('common');
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
    { icon: Star, label: t('highlights.time100.label'), desc: t('highlights.time100.desc') },
    { icon: Medal, label: t('highlights.forbes.label'), desc: t('highlights.forbes.desc') },
    { icon: Crown, label: t('highlights.orderOfRepublic.label'), desc: t('highlights.orderOfRepublic.desc') },
    { icon: Users, label: t('highlights.unesco.label'), desc: t('highlights.unesco.desc') },
  ];

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
      <PageHero
        heroPrefix="ach"
        icon={<Trophy className="w-14 h-14 text-regal-gold" />}
        title={t('title')}
        subtitle={t('subtitle')}
        description={t('intro')}
        minHeight="min-h-[90vh]"
        decorativeLine
        rightContent={
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
        }
      />

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
              <span className="text-label text-regal-gold mb-4 block">{t('recognition.label')}</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              {t('recognition.title')}
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
                    <p className="text-sm text-muted mt-1">{t('recognition.recognitions', { count: category.items.length })}</p>
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
                  <span className="text-label text-regal-gold mb-4 block">{t('milestones.label')}</span>
                </FadeIn>
                <AnimatedHeading as="h2" className="text-title font-serif text-white">
                  {t('milestones.title')}
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
                        <h3 className="text-xl font-serif text-white">{t('featured.time.title')}</h3>
                        <p className="text-regal-gold text-sm">{t('featured.time.subtitle')}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t('featured.time.description')}
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
                        <h3 className="text-xl font-serif text-white">{t('featured.forbes.title')}</h3>
                        <p className="text-regal-gold text-sm">{t('featured.forbes.subtitle')}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t('featured.forbes.description')}
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
                        <h3 className="text-xl font-serif text-white">{t('featured.orderOfRepublic.title')}</h3>
                        <p className="text-regal-gold text-sm">{t('featured.orderOfRepublic.subtitle')}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t('featured.orderOfRepublic.description')}
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
                        <h3 className="text-xl font-serif text-white">{t('featured.unesco.title')}</h3>
                        <p className="text-regal-gold text-sm">{t('featured.unesco.subtitle')}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {t('featured.unesco.description')}
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
                  { value: t('diplomacyStats.yearsOfEngagement.value'), label: t('diplomacyStats.yearsOfEngagement.label') },
                  { value: t('diplomacyStats.globalPartnerships.value'), label: t('diplomacyStats.globalPartnerships.label') },
                  { value: t('diplomacyStats.continentsReached.value'), label: t('diplomacyStats.continentsReached.label') },
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
      <PageCTA
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLabel={tc('cta.explorePhilanthropy')}
        primaryHref="/philanthropy"
        primaryCursor={tc('cta.cursor.view')}
        outlineLabel={tc('cta.exploreFamilyLegacy')}
        outlineHref="/family"
        outlineCursor={tc('cta.cursor.explore')}
      />
    </>
  );
}
