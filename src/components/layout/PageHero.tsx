'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Container } from '@/components/ui';
import { EightPointStar, GeometricGrid, ArabesqueCorner } from '@/components/ui';

interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  icon: ReactNode;
  iconStyle?: 'circular' | 'square';
  minHeight?: string;
  layout?: 'center' | 'two-column';
  rightContent?: ReactNode;
  decorativeLine?: boolean;
  heroPrefix: string;
  children?: ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  description,
  icon,
  iconStyle = 'circular',
  minHeight = 'min-h-[75vh]',
  layout = 'center',
  rightContent,
  decorativeLine = false,
  heroPrefix,
  children,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        `.${heroPrefix}-hero-icon`,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.7)' }
      );

      if (decorativeLine) {
        tl.fromTo(
          `.${heroPrefix}-hero-line`,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.inOut' },
          '-=0.5'
        );
      }

      tl.fromTo(
        `.${heroPrefix}-hero-title`,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
        .fromTo(
          `.${heroPrefix}-hero-subtitle`,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        );

      // Floating animation
      gsap.to(`.${heroPrefix}-hero-icon`, {
        y: -12,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Star parallax
      gsap.to(`.${heroPrefix}-hero-star`, {
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
  }, [heroPrefix, decorativeLine]);

  const starClass = `${heroPrefix}-hero-star`;

  const renderIcon = () => {
    if (iconStyle === 'square') {
      return (
        <>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 rotate-12" />
          <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/20 -rotate-6">
            {icon}
          </div>
        </>
      );
    }
    return (
      <>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 blur-xl" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/30">
          {icon}
        </div>
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      className={`relative ${minHeight} flex items-center bg-deep-navy overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <GeometricGrid className="text-regal-gold/5" />
      </div>

      {/* Decorative stars */}
      <EightPointStar className={`${starClass} absolute top-32 right-[12%] rtl:right-auto rtl:left-[12%] text-regal-gold/25 rotate-[18deg]`} size={160} strokeWidth={0.8} />
      <EightPointStar className={`${starClass} absolute bottom-32 left-[8%] rtl:left-auto rtl:right-[8%] text-regal-gold/20 -rotate-[22deg]`} size={120} strokeWidth={0.6} />
      <EightPointStar className={`${starClass} absolute top-1/2 left-[3%] rtl:left-auto rtl:right-[3%] text-regal-gold/15 rotate-[30deg]`} size={200} strokeWidth={0.4} />
      <EightPointStar className={`${starClass} absolute top-40 right-[3%] rtl:right-auto rtl:left-[3%] text-regal-gold/10 -rotate-[15deg]`} size={250} strokeWidth={0.3} />
      <EightPointStar className={`${starClass} absolute bottom-20 right-[20%] rtl:right-auto rtl:left-[20%] text-regal-gold/15 rotate-45`} size={80} strokeWidth={0.8} />
      <EightPointStar className={`${starClass} absolute top-28 left-[18%] rtl:left-auto rtl:right-[18%] text-regal-gold/12 -rotate-[28deg]`} size={60} strokeWidth={1} />
      <EightPointStar className={`${starClass} absolute top-1/3 right-[5%] rtl:right-auto rtl:left-[5%] text-regal-gold/12 rotate-[28deg]`} size={180} strokeWidth={0.4} />

      {/* Corner accents */}
      <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
      <ArabesqueCorner position="top-right" className="text-regal-gold/30" />
      <ArabesqueCorner position="bottom-left" className="text-regal-gold/30" />
      <ArabesqueCorner position="bottom-right" className="text-regal-gold/30" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/20 via-deep-navy/5 to-deep-navy/40" />

      <Container className="relative z-10">
        {layout === 'center' ? (
          <div className="text-center max-w-4xl mx-auto">
            <div className={`${heroPrefix}-hero-icon relative w-28 h-28 mx-auto mb-8`}>
              {renderIcon()}
            </div>

            {decorativeLine && (
              <div className={`${heroPrefix}-hero-line w-24 h-1 bg-regal-gold mb-8 mx-auto origin-center`} />
            )}

            <h1 className={`${heroPrefix}-hero-title text-display font-serif text-white mb-6`}>
              {title}
            </h1>

            <p className={`${heroPrefix}-hero-subtitle text-subtitle text-regal-gold-light font-light max-w-2xl mx-auto${description || rightContent ? ' mb-8' : ''}`}>
              {subtitle}
            </p>

            {description && (
              <p className={`${heroPrefix}-hero-subtitle text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto${rightContent ? ' mb-16' : ''}`}>
                {description}
              </p>
            )}

            {rightContent}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`${heroPrefix}-hero-icon relative w-28 h-28 mb-8`}>
                {renderIcon()}
              </div>

              {decorativeLine && (
                <div className={`${heroPrefix}-hero-line w-24 h-1 bg-regal-gold mb-8 origin-left rtl:origin-right`} />
              )}

              <h1 className={`${heroPrefix}-hero-title text-display font-serif text-white mb-6`}>
                {title}
              </h1>

              <p className={`${heroPrefix}-hero-subtitle text-xl text-gray-300 leading-relaxed max-w-xl mb-8`}>
                {subtitle}
              </p>

              {description && (
                <p className={`${heroPrefix}-hero-subtitle text-lg text-regal-gold-light/80 leading-relaxed max-w-xl`}>
                  {description}
                </p>
              )}
            </div>

            {rightContent && <div>{rightContent}</div>}
          </div>
        )}
      </Container>

      {children}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
