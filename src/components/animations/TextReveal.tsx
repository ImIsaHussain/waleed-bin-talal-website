'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'scroll' | 'load';
  animation?: 'fade-up' | 'fade-in' | 'split-chars' | 'split-words' | 'slide-up';
}

export default function TextReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  stagger = 0.02,
  trigger = 'scroll',
  animation = 'fade-up',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      if (animation === 'split-chars' || animation === 'split-words') {
        // Split text into spans
        const text = textRef.current?.innerText || '';
        const splitBy = animation === 'split-chars' ? '' : ' ';
        const parts = text.split(splitBy);

        if (textRef.current) {
          textRef.current.innerHTML = parts
            .map(
              (part) =>
                `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${part}${animation === 'split-words' ? '&nbsp;' : ''}</span></span>`
            )
            .join('');

          const innerSpans = textRef.current.querySelectorAll('span > span');

          const animConfig = {
            y: 0,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
          };

          if (trigger === 'scroll') {
            gsap.to(innerSpans, {
              ...animConfig,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          } else {
            gsap.to(innerSpans, animConfig);
          }
        }
      } else {
        const animProps: gsap.TweenVars = {
          duration,
          delay,
          ease: 'power3.out',
        };

        switch (animation) {
          case 'fade-up':
            gsap.set(textRef.current, { opacity: 0, y: 50 });
            animProps.opacity = 1;
            animProps.y = 0;
            break;
          case 'fade-in':
            gsap.set(textRef.current, { opacity: 0 });
            animProps.opacity = 1;
            break;
          case 'slide-up':
            gsap.set(textRef.current, { y: '100%' });
            animProps.y = 0;
            break;
        }

        if (trigger === 'scroll') {
          gsap.to(textRef.current, {
            ...animProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        } else {
          gsap.to(textRef.current, animProps);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, trigger]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', className)}>
      <div ref={textRef}>{children}</div>
    </div>
  );
}

// Animated heading component
interface AnimatedHeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  delay?: number;
}

export function AnimatedHeading({
  children,
  as: Component = 'h2',
  className,
  delay = 0,
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, skewY: 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, headingRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <Component ref={headingRef} className={className}>
      {children}
    </Component>
  );
}

// Counter animation for stats
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!counterRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = `${prefix}${Math.round(countRef.current.value)}${suffix}`;
          }
        },
      });
    }, counterRef);

    return () => ctx.revert();
  }, [end, duration, suffix, prefix]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
