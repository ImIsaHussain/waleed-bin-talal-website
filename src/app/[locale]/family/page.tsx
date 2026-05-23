'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useTranslations } from 'next-intl';
import { Container, EightPointStar, GeometricGrid, ArabesqueCorner, GeometricDivider } from '@/components/ui';
import { AnimatedHeading, ParallaxSection, FadeIn } from '@/components/animations';
import { Crown, Users, Heart, Sparkles } from 'lucide-react';
import { assetPath } from '@/lib/constants';
import PageHero from '@/components/layout/PageHero';
import PageCTA from '@/components/layout/PageCTA';

export default function FamilyPage() {
  const t = useTranslations('family');
  const tc = useTranslations('common');
  const lineageRef = useRef<HTMLDivElement>(null);

  // Image paths state for GitHub Pages compatibility
  const [imagePaths, setImagePaths] = useState({
    grandfather: '/images/King Abdulaziz Al Saud.png',
    father: '/images/Prince Talal bin Abdulaziz.jpg',
    mother: '/images/Princess Mona El Solh.jpeg',
    princeKhaled: '/images/Prince Khaled.jpg',
    princessReem: '/images/Princess Reem.jpg',
    heroImage: '/images/wbt-image-10.png',
  });

  useEffect(() => {
    setImagePaths({
      grandfather: assetPath('/images/King Abdulaziz Al Saud.png'),
      father: assetPath('/images/Prince Talal bin Abdulaziz.jpg'),
      mother: assetPath('/images/Princess Mona El Solh.jpeg'),
      princeKhaled: assetPath('/images/Prince Khaled.jpg'),
      princessReem: assetPath('/images/Princess Reem.jpg'),
      heroImage: assetPath('/images/wbt-image-10.png'),
    });
  }, []);

  // Grandfather data (founder)
  const grandfather = {
    key: 'grandfather',
    name: t('lineage.grandfather.name'),
    role: t('lineage.grandfather.role'),
    description: t('lineage.grandfather.description'),
    era: t('lineage.grandfather.era'),
    icon: Crown,
    relationship: t('lineage.grandfather.relationship'),
    image: imagePaths.grandfather,
  };

  // Parents data
  const parents = [
    {
      key: 'father',
      name: t('lineage.father.name'),
      role: t('lineage.father.role'),
      description: t('lineage.father.description'),
      era: t('lineage.father.era'),
      icon: Sparkles,
      relationship: t('lineage.father.relationship'),
      image: imagePaths.father,
    },
    {
      key: 'mother',
      name: t('lineage.mother.name'),
      role: t('lineage.mother.role'),
      description: t('lineage.mother.description'),
      era: t('lineage.mother.era'),
      icon: Heart,
      relationship: t('lineage.mother.relationship'),
      image: imagePaths.mother,
    },
  ];

  // Children data
  const children = [
    {
      key: 'khaled',
      name: t('children.khaled.name'),
      role: t('children.khaled.role'),
      description: t('children.khaled.description'),
      image: imagePaths.princeKhaled,
    },
    {
      key: 'reem',
      name: t('children.reem.name'),
      role: t('children.reem.role'),
      description: t('children.reem.description'),
      image: imagePaths.princessReem,
    },
  ];

  // Lineage cards animation
  useEffect(() => {
    if (!lineageRef.current) return;

    const ctx = gsap.context(() => {
      // Grandfather card
      gsap.fromTo(
        '.grandfather-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.grandfather-card',
            start: 'top 85%',
          },
        }
      );

      // Vertical connector
      gsap.fromTo(
        '.vertical-connector',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.vertical-connector',
            start: 'top 80%',
          },
        }
      );

      // Parent cards
      gsap.utils.toArray('.parent-card').forEach((card, index) => {
        gsap.fromTo(
          card as Element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 85%',
            },
            delay: index * 0.15,
          }
        );
      });
    }, lineageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageHero
        heroPrefix="fam"
        icon={<Users className="w-14 h-14 text-regal-gold" />}
        title={t('title')}
        subtitle={t('subtitle')}
        minHeight="min-h-[80vh]"
      >
        <>
          {/* Hero image - positioned at bottom right, behind gradient */}
          <div className="absolute bottom-0 right-0 z-[1] hidden lg:block">
            <div className="fam-hero-image relative w-[560px] h-[680px]">
              <img
                src={imagePaths.heroImage}
                alt="Prince Alwaleed bin Talal"
                className="w-full h-full object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-deep-navy/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-deep-navy/60 z-[1]" />
            </div>
          </div>
          {/* Softer bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent z-[1]" />
        </>
      </PageHero>

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
          ROYAL LINEAGE SECTION - Hierarchical Layout
          ============================================ */}
      <section ref={lineageRef} className="section-padding bg-cream relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <EightPointStar
          className="absolute -left-20 top-1/4 text-regal-gold/8"
          size={280}
          strokeWidth={1.5}
        />
        <EightPointStar
          className="absolute -right-20 bottom-1/4 text-regal-gold/8"
          size={220}
          strokeWidth={1.5}
        />

        <Container className="relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">{t('heritage.label')}</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              {t('lineage.title')}
            </AnimatedHeading>
          </div>

          {/* Family Tree Layout */}
          <div className="max-w-5xl mx-auto">
            {/* Grandfather - Top (Founder) */}
            <div className="grandfather-card mb-8">
              <div className="relative bg-white rounded-2xl border-2 border-regal-gold/30 p-8 text-center shadow-lg max-w-lg mx-auto hover:shadow-xl hover:-translate-y-1 hover:border-regal-gold/50 transition-all duration-300">
                {/* Crown badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-regal-gold rounded-full">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Grandfather</span>
                </div>

                {/* Portrait */}
                <div className="relative w-40 h-48 mx-auto mb-4 mt-2 overflow-hidden rounded-xl">
                  <img
                    src={grandfather.image}
                    alt={grandfather.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Era badge */}
                <div className="inline-block px-3 py-1 bg-regal-gold-muted rounded-full mb-3">
                  <span className="text-xs font-medium text-regal-gold">{grandfather.era}</span>
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl lg:text-3xl font-serif font-medium text-charcoal mb-1">
                  {grandfather.name}
                </h3>
                <p className="text-regal-gold text-lg font-medium mb-3">{grandfather.role}</p>

                {/* Description */}
                <p className="text-muted text-base leading-relaxed">
                  {grandfather.description}
                </p>
              </div>
            </div>

            {/* Vertical connector */}
            <div className="vertical-connector w-0.5 h-12 bg-regal-gold/40 mx-auto origin-top" />

            {/* Horizontal connector */}
            <div className="hidden sm:block w-1/2 h-0.5 bg-regal-gold/40 mx-auto" />

            {/* Parents - Bottom Row */}
            <div className="grid sm:grid-cols-2 gap-8 mt-6">
              {parents.map((parent) => (
                <div key={parent.key} className="parent-card">
                  <div className="relative bg-white rounded-2xl border border-border p-8 text-center hover:shadow-xl hover:-translate-y-1 hover:border-regal-gold/40 transition-all duration-300">
                    {/* Relationship badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-charcoal rounded-full">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">{parent.relationship}</span>
                    </div>

                    {/* Portrait */}
                    <div className="relative w-36 h-44 mx-auto mb-4 mt-2 overflow-hidden rounded-xl">
                      <img
                        src={parent.image}
                        alt={parent.name}
                        className={`w-full h-full object-cover object-top ${parent.key === 'mother' ? 'filter grayscale' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Era badge */}
                    <div className="inline-block px-3 py-1 bg-regal-gold-muted rounded-full mb-3">
                      <span className="text-xs font-medium text-regal-gold">{parent.era}</span>
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-xl lg:text-2xl font-serif font-medium text-charcoal mb-1">
                      {parent.name}
                    </h3>
                    <p className="text-regal-gold text-base font-medium mb-3">{parent.role}</p>

                    {/* Description */}
                    <p className="text-muted text-base leading-relaxed">
                      {parent.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          THREE PILLARS SECTION
          ============================================ */}
      <ParallaxSection speed={0.1}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/8" />
          </div>

          <EightPointStar
            className="absolute -right-24 top-1/2 -translate-y-1/2 text-regal-gold/15"
            size={350}
            strokeWidth={1.5}
          />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="text-label text-regal-gold mb-4 block">{t('pillars.label')}</span>
              </FadeIn>

              <AnimatedHeading as="h2" className="text-title font-serif text-white mb-12">
                {t('pillars.title')}
              </AnimatedHeading>

              <div className="grid md:grid-cols-3 gap-6">
                <FadeIn delay={0}>
                  <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-regal-gold/20 flex items-center justify-center">
                      <Crown className="w-7 h-7 text-regal-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-white mb-3">{t('pillars.vision.title')}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('pillars.vision.description')}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-regal-gold/20 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-regal-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-white mb-3">{t('pillars.reform.title')}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('pillars.reform.description')}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="p-6 lg:p-8 bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-regal-gold/20 flex items-center justify-center">
                      <Heart className="w-7 h-7 text-regal-gold" />
                    </div>
                    <h3 className="text-lg font-serif text-white mb-3">{t('pillars.globalPerspective.title')}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('pillars.globalPerspective.description')}
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          NEXT GENERATION SECTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />

        <ArabesqueCorner position="top-left" className="text-regal-gold/25" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/25" />

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-12">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-regal-gold-muted flex items-center justify-center">
                <Users className="w-10 h-10 text-regal-gold" />
              </div>

              {/* Title */}
              <h2 className="text-title font-serif text-charcoal mb-6">
                {t('nextGeneration.title')}
              </h2>

              {/* Content */}
              <p className="text-body-lg text-muted leading-relaxed max-w-2xl mx-auto">
                {t('nextGeneration.content')}
              </p>
            </FadeIn>

            {/* Prince Khaled - Image Left, Text Right */}
            <FadeIn className="mb-10">
              <div className="bg-cream rounded-2xl border border-border p-8 lg:p-10 hover:border-regal-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <div className="relative w-full h-72 md:h-80 overflow-hidden rounded-xl">
                    <img
                      src={children[0].image}
                      alt={children[0].name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  {/* Text */}
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl lg:text-3xl font-serif text-charcoal mb-2">{children[0].name}</h3>
                    <p className="text-regal-gold text-base font-medium mb-4">{children[0].role}</p>
                    <p className="text-base text-muted leading-relaxed">{children[0].description}</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Princess Reem - Text Left, Image Right */}
            <FadeIn>
              <div className="bg-cream rounded-2xl border border-border p-8 lg:p-10 hover:border-regal-gold/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Text - First on mobile, second on desktop */}
                  <div className="text-center md:text-left order-2 md:order-1">
                    <h3 className="text-2xl lg:text-3xl font-serif text-charcoal mb-2">{children[1].name}</h3>
                    <p className="text-regal-gold text-base font-medium mb-4">{children[1].role}</p>
                    <p className="text-base text-muted leading-relaxed">{children[1].description}</p>
                  </div>
                  {/* Image */}
                  <div className="relative w-full h-72 md:h-80 overflow-hidden rounded-xl order-1 md:order-2">
                    <img
                      src={children[1].image}
                      alt={children[1].name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          LEGACY QUOTE
          ============================================ */}
      <section className="py-16 bg-cream relative overflow-hidden">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />

            <blockquote className="text-xl lg:text-2xl font-serif text-charcoal leading-relaxed italic">
              &ldquo;{t('quote')}&rdquo;
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      <PageCTA
        title={t('cta.title')}
        description={t('cta.description')}
        primaryLabel={tc('cta.viewPhilanthropy')}
        primaryHref="/philanthropy"
        primaryCursor={tc('cta.cursor.view')}
        outlineLabel={tc('cta.readBiography')}
        outlineHref="/biography"
        outlineCursor={tc('cta.cursor.read')}
        showDivider={false}
      />
    </>
  );
}
