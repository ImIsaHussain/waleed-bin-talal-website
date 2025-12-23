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
  FloatingShapes,
  GeometricDivider
} from '@/components/ui/GeometricPatterns';
import {
  AnimatedHeading,
  AnimatedCounter
} from '@/components/animations/TextReveal';
import ParallaxSection, {
  FadeIn
} from '@/components/animations/ParallaxSection';
import { MagneticButton } from '@/components/animations';
import { STATS, assetPath } from '@/lib/constants';
import { ArrowRight, ArrowUpRight, Building2, Heart, Landmark, Globe2, Award, Users } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const t = useTranslations('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [heroImageSrc, setHeroImageSrc] = useState('/images/wbt-image-1.webp');

  // Set correct image path for GitHub Pages
  useEffect(() => {
    setHeroImageSrc(assetPath('/images/wbt-image-1.webp'));
  }, []);

  useEffect(() => {
    if (!heroRef.current || !nameRef.current) return;

    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      tl.fromTo(
        '.hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut', stagger: 0.1 }
      )
      .fromTo(
        '.hero-title-char',
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.03 },
        '-=1'
      )
      .fromTo(
        '.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
        '-=0.5'
      )
      .fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.3'
      )
      .fromTo(
        '.hero-image-wrapper',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
        '-=2.5'
      );

      // Parallax effect on hero elements
      gsap.to('.hero-star', {
        y: -100,
        rotation: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.hero-pattern', {
        y: -50,
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

  // Split title into words for proper wrapping
  const titleWords = t('hero.title').split(' ');

  return (
    <>
      {/* ============================================
          HERO SECTION - Full Screen Immersive
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="hero-pattern absolute inset-0">
          <GeometricGrid className="absolute inset-0 text-regal-gold" />
        </div>

        {/* Floating decorative stars - more prominent with rotation variation */}
        <EightPointStar
          className="hero-star absolute top-20 right-[15%] text-regal-gold/25 rotate-[15deg]"
          size={140}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="hero-star absolute bottom-32 left-[10%] text-regal-gold/20 -rotate-[22deg]"
          size={100}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="hero-star absolute top-1/3 left-[5%] text-regal-gold/15 rotate-[30deg]"
          size={220}
          strokeWidth={0.4}
        />
        <EightPointStar
          className="hero-star absolute top-1/2 right-[5%] text-regal-gold/12 -rotate-[18deg]"
          size={280}
          strokeWidth={0.3}
        />
        <EightPointStar
          className="hero-star absolute bottom-20 right-[25%] text-regal-gold/18 rotate-45"
          size={70}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="hero-star absolute top-40 left-[20%] text-regal-gold/10 -rotate-[12deg]"
          size={50}
          strokeWidth={1}
        />
        <EightPointStar
          className="hero-star absolute bottom-40 left-[35%] text-regal-gold/12 rotate-[28deg]"
          size={90}
          strokeWidth={0.6}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/30" />

        {/* Gold accent lines */}
        <div className="hero-line absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-regal-gold via-regal-gold/50 to-transparent origin-top" />
        <div className="hero-line absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-regal-gold/50 to-regal-gold origin-bottom" />
        <div className="hero-line absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-regal-gold via-transparent to-regal-gold origin-left" />

        {/* Main content */}
        <Container className="relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Decorative element above title */}
              <div className="flex justify-center lg:justify-start mb-8">
                <EightPointStar className="text-regal-gold" size={40} strokeWidth={1} animated />
              </div>

              {/* Title with character animation */}
              <div ref={nameRef} className="overflow-hidden mb-6">
                <h1 className="text-hero font-display font-bold text-white leading-none tracking-tight">
                  {titleWords.map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                      {word.split('').map((char, charIndex) => (
                        <span key={charIndex} className="hero-title-char inline-block">
                          {char}
                        </span>
                      ))}
                      {/* Add space after word unless it's the last one */}
                      {wordIndex < titleWords.length - 1 && (
                        <span className="hero-title-char inline-block">&nbsp;</span>
                      )}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Subtitle */}
              <p className="hero-subtitle text-subtitle text-regal-gold-light max-w-2xl mx-auto lg:mx-0 mb-12 font-light">
                {t('hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <MagneticButton className="hero-cta">
                  <Link
                    href="/biography"
                    className="btn-primary group"
                    data-cursor="Explore"
                  >
                    {t('hero.cta.biography')}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>

                <MagneticButton className="hero-cta">
                  <Link
                    href="/philanthropy"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-regal-gold/50 text-regal-gold rounded-full transition-all duration-500 hover:bg-regal-gold hover:text-deep-navy"
                    data-cursor="Discover"
                  >
                    {t('hero.cta.philanthropy')}
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="hero-image-wrapper relative w-full max-w-[400px] lg:max-w-[480px] aspect-[4/5] opacity-0 translate-y-8">
                {/* Decorative Backdrop Layers */}
                <div className="absolute inset-0 bg-gradient-to-tr from-regal-gold/20 to-transparent rounded-[2rem] transform rotate-6 scale-95" />
                <div className="absolute inset-0 border border-regal-gold/30 rounded-[2rem] transform -rotate-3 scale-105" />
                
                {/* Main Image Container */}
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
                  <img
                    src={heroImageSrc}
                    alt="Prince Alwaleed bin Talal"
                    className="absolute inset-0 w-full h-full object-cover object-top z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent z-10" />
                </div>

                {/* Corner Accents */}
                <EightPointStar className="absolute -top-6 -right-6 text-regal-gold/40 animate-pulse-slow" size={48} strokeWidth={1} />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-regal-gold/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
          <span className="text-label text-regal-gold/60">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-regal-gold to-transparent" />
        </div>
      </section>

      {/* ============================================
          WELCOME / INTRO SECTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        {/* Arabic decorative elements with rotation */}
        <EightPointStar
          className="absolute top-16 right-[8%] text-regal-gold/10 rotate-[18deg]"
          size={120}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="absolute bottom-20 left-[5%] text-regal-gold/8 -rotate-[25deg]"
          size={100}
          strokeWidth={0.6}
        />
        <ArabesqueCorner position="top-left" className="text-regal-gold/12" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/12" />

        <Container size="md" className="relative z-10">
          <div className="text-center">
            <FadeIn direction="up">
              <div className="flex justify-center mb-8">
                <GeometricDivider variant="star" className="text-regal-gold" />
              </div>
            </FadeIn>

            <AnimatedHeading
              as="h2"
              className="text-display font-serif text-charcoal mb-8"
            >
              {t('welcome.title')}
            </AnimatedHeading>

            <FadeIn delay={0.3}>
              <p className="text-body-lg text-muted max-w-3xl mx-auto mb-12">
                {t('welcome.description')}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <MagneticButton>
                <Link
                  href="/biography"
                  className="inline-flex items-center gap-3 text-charcoal font-medium group"
                  data-cursor="Read"
                >
                  <span className="link-underline">{t('welcome.cta')}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          STATS SECTION - Bold Numbers
          ============================================ */}
      <ParallaxSection speed={0.2}>
        <section className="section-padding bg-cream relative overflow-hidden">
          <FloatingShapes className="absolute inset-0 text-regal-gold" />

          {/* Additional Arabic decorative elements with rotation */}
          <EightPointStar
            className="absolute top-10 left-[8%] text-regal-gold/15 rotate-[22deg]"
            size={100}
            strokeWidth={0.6}
          />
          <EightPointStar
            className="absolute bottom-10 right-[10%] text-regal-gold/12 -rotate-[15deg]"
            size={80}
            strokeWidth={0.7}
          />
          <ArabesqueCorner position="top-left" className="text-regal-gold/20" />
          <ArabesqueCorner position="bottom-right" className="text-regal-gold/20" />

          <Container className="relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <StatBlock
                number={STATS.sectors}
                label={t('stats.sectors')}
                suffix="+"
                delay={0}
              />
              <StatBlock
                number={STATS.countriesReached}
                label={t('stats.countries')}
                suffix="+"
                delay={0.1}
              />
              <StatBlock
                number={STATS.yearsInBusiness}
                label={t('stats.years')}
                suffix="+"
                delay={0.2}
              />
              <StatBlock
                number={STATS.givingPledgeYear}
                label={t('stats.givingPledge')}
                delay={0.3}
              />
            </div>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          AREAS OF FOCUS - Architectural Cards
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Arabic Heritage Background Art - enhanced with rotation */}
        <EightPointStar
          className="absolute top-20 right-[5%] text-regal-gold/12 rotate-[12deg]"
          size={180}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="absolute bottom-20 left-[5%] text-regal-gold/10 -rotate-[20deg]"
          size={160}
          strokeWidth={0.6}
        />
        <EightPointStar
          className="absolute top-1/2 left-[2%] text-regal-gold/8 rotate-[35deg]"
          size={220}
          strokeWidth={0.3}
        />
        <EightPointStar
          className="absolute top-32 left-[25%] text-regal-gold/6 -rotate-45"
          size={80}
          strokeWidth={0.8}
        />
        <EightPointStar
          className="absolute bottom-32 right-[20%] text-regal-gold/8 rotate-[28deg]"
          size={100}
          strokeWidth={0.6}
        />
        <ArabesqueCorner position="top-left" className="text-regal-gold/15" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/15" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/15" />

        <Container>
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">Areas of Impact</span>
            </FadeIn>
            <AnimatedHeading
              as="h2"
              className="text-title font-serif text-charcoal"
            >
              {t('focus.title')}
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <FocusCard
              icon={<Building2 className="w-8 h-8" />}
              title={t('focus.investments.title')}
              description={t('focus.investments.description')}
              link="/accomplishments"
              cta={t('focus.investments.cta')}
              delay={0}
            />
            <FocusCard
              icon={<Heart className="w-8 h-8" />}
              title={t('focus.philanthropy.title')}
              description={t('focus.philanthropy.description')}
              link="/philanthropy"
              cta={t('focus.philanthropy.cta')}
              delay={0.15}
            />
            <FocusCard
              icon={<Landmark className="w-8 h-8" />}
              title={t('focus.vision.title')}
              description={t('focus.vision.description')}
              link="/achievements"
              cta={t('focus.vision.cta')}
              delay={0.3}
            />
          </div>
        </Container>
      </section>

      {/* ============================================
          IMPACT HIGHLIGHTS - Horizontal Scroll Feel
          ============================================ */}
      <section className="section-dark section-padding relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>
        <EightPointStar
          className="absolute -right-20 top-1/2 -translate-y-1/2 text-regal-gold/10"
          size={400}
          strokeWidth={0.5}
        />

        <Container className="relative z-10">
          <div className="text-center mb-16">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">Global Reach</span>
            </FadeIn>
            <AnimatedHeading
              as="h2"
              className="text-title font-serif text-white"
            >
              A Legacy of Impact
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0} className="text-center p-8">
              <Globe2 className="w-12 h-12 text-regal-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-white mb-3">Global Investments</h3>
              <p className="text-gray-400">Strategic investments spanning technology, hospitality, media, and real estate across six continents.</p>
            </FadeIn>

            <FadeIn delay={0.15} className="text-center p-8 border-x border-regal-gold/20">
              <Award className="w-12 h-12 text-regal-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-white mb-3">Recognition</h3>
              <p className="text-gray-400">Consistently ranked among the world&apos;s most influential business leaders and philanthropists.</p>
            </FadeIn>

            <FadeIn delay={0.3} className="text-center p-8">
              <Users className="w-12 h-12 text-regal-gold mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-white mb-3">Lives Touched</h3>
              <p className="text-gray-400">Millions of lives improved through education, healthcare, and disaster relief initiatives worldwide.</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================
          CTA SECTION - Bold & Minimal
          ============================================ */}
      <section className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/20" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/20" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <EightPointStar className="text-regal-gold mx-auto mb-8" size={48} strokeWidth={1} />
            </FadeIn>

            <AnimatedHeading
              as="h2"
              className="text-display font-serif text-charcoal mb-8"
            >
              {t('cta.title')}
            </AnimatedHeading>

            <FadeIn delay={0.3}>
              <p className="text-body-lg text-muted mb-12 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="btn-primary"
                  data-cursor="Connect"
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function StatBlock({
  number,
  label,
  suffix = '',
  delay = 0
}: {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="text-center group">
      <div className="relative inline-block">
        <span className="text-hero font-display font-bold text-charcoal">
          <AnimatedCounter end={number} duration={2} />
          {suffix}
        </span>
        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-regal-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
      <p className="text-label text-muted mt-4">{label}</p>
    </FadeIn>
  );
}

function FocusCard({
  icon,
  title,
  description,
  link,
  cta,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  cta: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <Link
        href={link}
        className="group block relative h-full p-10 lg:p-12 bg-white border border-border rounded-2xl transition-all duration-500 hover:border-regal-gold hover:shadow-2xl hover:-translate-y-2"
        data-cursor="View"
      >
        {/* Corner accent on hover */}
        <div className="corner-accent corner-accent--tl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="corner-accent corner-accent--br opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-regal-gold-muted flex items-center justify-center mb-6 text-regal-gold transition-all duration-500 group-hover:bg-regal-gold group-hover:text-white">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-serif font-medium text-charcoal mb-4 group-hover:text-regal-gold transition-colors">
          {title}
        </h3>
        <p className="text-muted mb-6 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* CTA - pushed to bottom */}
        <span className="inline-flex items-center gap-2 text-regal-gold font-medium mt-auto">
          {cta}
          <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-2" />
        </span>
      </Link>
    </FadeIn>
  );
}
