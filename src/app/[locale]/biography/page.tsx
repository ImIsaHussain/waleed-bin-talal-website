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
import { GraduationCap, Heart, Crown, Quote, Building, Globe } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BiographyPage() {
  const t = useTranslations('biography');
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Streamlined timeline with key milestones in chronological order
  const sections = [
    {
      key: 'earlyLife',
      icon: Crown,
      title: 'Royal Heritage',
      content: 'Born March 7, 1955, in Riyadh as grandson of King Abdulaziz, founder of Saudi Arabia. Raised in a family dedicated to nation-building and social reform.',
      year: '1955',
      period: 'Birth',
    },
    {
      key: 'menloCollege',
      icon: GraduationCap,
      title: 'Menlo College',
      content: 'Earned a B.S. in Business Administration from Menlo College in California, gaining foundational knowledge in Western business practices.',
      year: '1979',
      period: 'Undergraduate',
    },
    {
      key: 'kingdomHolding',
      icon: Building,
      title: 'Kingdom Holding Company',
      content: 'Founded Kingdom Holding Company, which grew to become one of the world\'s largest diversified investment holding companies across five continents.',
      year: '1980',
      period: 'Business Foundation',
    },
    {
      key: 'syracuse',
      icon: GraduationCap,
      title: 'Syracuse University',
      content: 'Completed a Master\'s degree in Social Science from Syracuse University, broadening his understanding of global economics and international development.',
      year: '1985',
      period: 'Graduate Studies',
    },
    {
      key: 'globalExpansion',
      icon: Globe,
      title: 'Global Investments',
      content: 'Made strategic investments in Citigroup, Apple, Twitter, Four Seasons, and other iconic companies, establishing a reputation for identifying transformative opportunities.',
      year: '1990s',
      period: 'International Growth',
    },
    {
      key: 'philanthropy',
      icon: Heart,
      title: 'The Giving Pledge',
      content: 'Became the first Arab Muslim to join the Giving Pledge in 2015, committing the majority of wealth to charitable causes through Alwaleed Philanthropies.',
      year: '2015',
      period: 'Philanthropic Commitment',
    },
    {
      key: 'legacy',
      icon: Heart,
      title: 'Continuing Legacy',
      content: 'Continues to lead Kingdom Holding Company while championing women\'s empowerment, interfaith dialogue, and sustainable development worldwide.',
      year: 'Today',
      period: 'Present Day',
    },
  ];

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      tl.fromTo(
        '.bio-hero-icon',
        { scale: 0, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.bio-hero-title',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.bio-hero-subtitle',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );

      // Subtle floating animation (no rotation)
      gsap.to('.bio-hero-icon', {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on decorative elements
      gsap.to('.bio-hero-star', {
        y: -60,
        rotation: 60,
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
          HERO SECTION - Softer gradient
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] pt-20 lg:pt-24 flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/8" />
        </div>

        {/* Decorative stars - more prominent with rotation variation */}
        <EightPointStar
          className="bio-hero-star absolute top-32 right-[12%] text-regal-gold/25 rotate-[18deg]"
          size={160}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="bio-hero-star absolute bottom-32 left-[8%] text-regal-gold/20 -rotate-[22deg]"
          size={120}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="bio-hero-star absolute top-1/2 left-[3%] text-regal-gold/15 rotate-[30deg]"
          size={200}
          strokeWidth={0.4}
        />
        <EightPointStar
          className="bio-hero-star absolute top-40 right-[3%] text-regal-gold/10 -rotate-[15deg]"
          size={250}
          strokeWidth={0.3}
        />
        <EightPointStar
          className="bio-hero-star absolute bottom-20 right-[20%] text-regal-gold/15 rotate-45"
          size={80}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="bio-hero-star absolute top-28 left-[18%] text-regal-gold/12 -rotate-[28deg]"
          size={60}
          strokeWidth={1}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/40" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/40" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/40" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/40" />

        {/* Softer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/20 via-deep-navy/5 to-deep-navy/40" />

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Icon */}
            <div className="bio-hero-icon relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 blur-xl" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/30">
                <Crown className="w-14 h-14 text-regal-gold" />
              </div>
            </div>

            {/* Title */}
            <h1 className="bio-hero-title text-display font-serif text-white mb-6">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="bio-hero-subtitle text-subtitle text-regal-gold-light font-light max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>

        {/* Softer bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* ============================================
          INTRO SECTION
          ============================================ */}
      <section className="py-16 bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <EightPointStar className="text-regal-gold mx-auto mb-8" size={36} strokeWidth={2} />
            <p className="text-body-lg text-muted leading-relaxed max-w-3xl mx-auto">
              Born into the esteemed Saudi royal family as the grandson of King Abdulaziz,
              the visionary founder of the Kingdom of Saudi Arabia, Prince Alwaleed&apos;s journey has been shaped
              by a unique heritage of leadership, reform, and global perspective.
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
              <span className="text-label text-regal-gold mb-4 block">The Journey</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              A Life of Purpose
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
              <blockquote className="text-2xl lg:text-3xl font-serif text-white leading-relaxed mb-8">
                &ldquo;His grandfather taught him that leadership means service. His father
                showed him that reform requires courage. His mother gave him a global
                perspective. These three pillars guide every decision he makes.&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-regal-gold" />
                <cite className="text-regal-gold font-medium text-lg not-italic">
                  HRH Prince Alwaleed bin Talal
                </cite>
                <div className="w-12 h-px bg-regal-gold" />
              </div>
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
              <span className="text-label text-regal-gold mb-4 block">Royal Heritage</span>
              <h2 className="text-title font-serif text-charcoal mb-6">
                A Unique Lineage
              </h2>
              <div className="space-y-5 text-muted leading-relaxed">
                <p>
                  As the grandson of King Abdulaziz Ibn Saud, the founder of modern Saudi Arabia,
                  Prince Alwaleed inherited a legacy of nation-building and visionary leadership.
                </p>
                <p>
                  His father, Prince Talal bin Abdulaziz, was known as the &ldquo;Red Prince&rdquo;
                  for his progressive views on constitutional reform and social justice. His
                  advocacy for human rights and democratic principles deeply influenced Prince Alwaleed&apos;s values.
                </p>
                <p>
                  His mother, Princess Mona El Solh, daughter of Lebanon&apos;s first Prime Minister,
                  brought an international perspective and a commitment to cultural bridge-building
                  that continues to guide his philanthropic work today.
                </p>
              </div>
            </FadeIn>

            {/* Right - Facts Grid */}
            <FadeIn direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">Grandson of</h4>
                  <p className="text-muted text-sm">King Abdulaziz Ibn Saud</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">Son of</h4>
                  <p className="text-muted text-sm">Prince Talal bin Abdulaziz</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">Born</h4>
                  <p className="text-muted text-sm">March 7, 1955</p>
                </div>
                <div className="p-6 bg-cream rounded-2xl border border-border text-center">
                  <EightPointStar className="text-regal-gold mx-auto mb-3" size={28} strokeWidth={2} />
                  <h4 className="text-base font-serif text-charcoal mb-1">Education</h4>
                  <p className="text-muted text-sm">Menlo & Syracuse</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-16 bg-cream relative">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
            <h2 className="text-subtitle font-serif text-charcoal mb-4">
              Continue Exploring
            </h2>
            <p className="text-muted mb-8">
              Discover how this heritage has shaped a global business empire and philanthropic legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/accomplishments"
                className="btn-primary"
                data-cursor="View"
              >
                View Accomplishments
              </a>
              <a
                href="/philanthropy"
                className="btn-outline"
                data-cursor="Explore"
              >
                Explore Philanthropy
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
