'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/ui';
import {
  EightPointStar,
  GeometricGrid,
  ArabesqueCorner,
  GeometricDivider,
} from '@/components/ui/GeometricPatterns';
import { AnimatedHeading } from '@/components/animations/TextReveal';
import ParallaxSection, { FadeIn } from '@/components/animations/ParallaxSection';
import { CONTACT_INFO, EXTERNAL_LINKS } from '@/lib/constants';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  MessageSquare,
  Building2,
  Briefcase,
  Newspaper,
  ExternalLink,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const guestbookSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  category: z.enum(['impact', 'business', 'inspiration', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type GuestbookFormData = z.infer<typeof guestbookSchema>;

export default function ContactPage() {
  const t = useTranslations('contact');
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GuestbookFormData>({
    resolver: zodResolver(guestbookSchema),
    defaultValues: {
      category: 'general',
    },
  });

  const onSubmit = async (data: GuestbookFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const categories = [
    { value: 'impact', label: t('guestbook.categories.impact') },
    { value: 'business', label: t('guestbook.categories.business') },
    { value: 'inspiration', label: t('guestbook.categories.inspiration') },
    { value: 'general', label: t('guestbook.categories.general') },
  ];

  const contactCards = [
    {
      icon: MapPin,
      title: t('info.address'),
      content: CONTACT_INFO.address,
      link: null,
    },
    {
      icon: Phone,
      title: t('info.phone'),
      content: CONTACT_INFO.phone,
      link: `tel:${CONTACT_INFO.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: Mail,
      title: t('info.email'),
      content: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
    },
  ];

  const externalLinks = [
    {
      icon: Building2,
      title: 'Kingdom Holding Company',
      description: 'Official corporate website for investment inquiries',
      url: EXTERNAL_LINKS.kingdomHolding,
    },
    {
      icon: Heart,
      title: 'Alwaleed Philanthropies',
      description: 'Global humanitarian initiatives and programs',
      url: EXTERNAL_LINKS.alwaleedPhilanthropies,
    },
  ];

  // Hero animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.contact-hero-icon',
        { scale: 0, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
      )
        .fromTo(
          '.contact-hero-title',
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.contact-hero-subtitle',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );

      // Floating animation
      gsap.to('.contact-hero-icon', {
        y: -10,
        rotation: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax stars
      gsap.to('.contact-star', {
        y: -70,
        rotation: 100,
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

  // Form section animation
  useEffect(() => {
    if (!formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-form-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-card',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info-card',
            start: 'top 85%',
          },
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center bg-deep-navy overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <GeometricGrid className="text-regal-gold/5" />
        </div>

        {/* Decorative stars */}
        <EightPointStar
          className="contact-star absolute top-24 right-[15%] text-regal-gold/20"
          size={130}
          strokeWidth={0.5}
        />
        <EightPointStar
          className="contact-star absolute bottom-36 left-[10%] text-regal-gold/10"
          size={180}
          strokeWidth={0.5}
        />

        {/* Corner accents */}
        <ArabesqueCorner position="top-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="top-right" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-left" className="text-regal-gold/30" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/30" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/20 via-deep-navy/5 to-deep-navy/40" />

        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Icon */}
            <div className="contact-hero-icon relative w-28 h-28 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-regal-gold/20 to-regal-gold/5 blur-xl" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-regal-gold/30 to-transparent flex items-center justify-center border border-regal-gold/20">
                <MessageSquare className="w-14 h-14 text-regal-gold" />
              </div>
            </div>

            {/* Title */}
            <h1 className="contact-hero-title text-display font-serif text-white mb-6">
              {t('title')}
            </h1>

            {/* Subtitle */}
            <p className="contact-hero-subtitle text-subtitle text-regal-gold-light font-light max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ============================================
          INTRO SECTION
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
          MAIN CONTENT - FORM & INFO
          ============================================ */}
      <section ref={formRef} className="section-padding bg-cream relative overflow-hidden">
        <ArabesqueCorner position="top-left" className="text-regal-gold/10" />
        <ArabesqueCorner position="bottom-right" className="text-regal-gold/10" />

        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Guestbook Form */}
            <div className="lg:col-span-3">
              <div className="contact-form-card">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-regal-gold-muted flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-regal-gold" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-medium text-charcoal">
                      {t('guestbook.title')}
                    </h2>
                    <p className="text-sm text-muted">Share your thoughts and experiences</p>
                  </div>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <p className="text-emerald-800">{t('guestbook.form.success')}</p>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          {t('guestbook.form.name')} *
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-regal-gold/20 focus:border-regal-gold transition-all bg-gray-50 hover:bg-white"
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-charcoal mb-2"
                        >
                          {t('guestbook.form.email')} *
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-regal-gold/20 focus:border-regal-gold transition-all bg-gray-50 hover:bg-white"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category Field */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        {t('guestbook.form.category')} *
                      </label>
                      <select
                        {...register('category')}
                        id="category"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-regal-gold/20 focus:border-regal-gold transition-all bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-charcoal mb-2"
                      >
                        {t('guestbook.form.message')} *
                      </label>
                      <textarea
                        {...register('message')}
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-regal-gold/20 focus:border-regal-gold transition-all bg-gray-50 hover:bg-white resize-none"
                        placeholder="Share your message..."
                      />
                      {errors.message && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {t('guestbook.form.submit')}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-8">
                {t('info.title')}
              </h2>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {contactCards.map((card, index) => (
                  <div
                    key={index}
                    className="contact-info-card group bg-white rounded-xl border border-border p-5 hover:border-regal-gold/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-regal-gold-muted flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                        <card.icon className="w-5 h-5 text-regal-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">{card.title}</p>
                        {card.link ? (
                          <a
                            href={card.link}
                            className="text-charcoal hover:text-regal-gold transition-colors"
                            dir={card.icon === Phone ? 'ltr' : undefined}
                          >
                            {card.content}
                          </a>
                        ) : (
                          <p className="text-charcoal">{card.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sponsor Info */}
              <div className="contact-info-card bg-deep-navy/5 rounded-xl p-6 mb-8">
                <h3 className="font-medium text-charcoal mb-3">{t('info.sponsor')}</h3>
                <p className="text-sm text-muted leading-relaxed">{CONTACT_INFO.sponsor}</p>
              </div>

              {/* Inquiry Types */}
              <div className="contact-info-card space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border">
                  <Newspaper className="w-5 h-5 text-regal-gold mt-0.5" />
                  <div>
                    <h4 className="font-medium text-charcoal text-sm mb-1">{t('info.mediaInquiries')}</h4>
                    <p className="text-xs text-muted">
                      Contact Kingdom Holding Company communications team for press inquiries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border">
                  <Briefcase className="w-5 h-5 text-regal-gold mt-0.5" />
                  <div>
                    <h4 className="font-medium text-charcoal text-sm mb-1">{t('info.businessInquiries')}</h4>
                    <p className="text-xs text-muted">
                      Reach out to investor relations for partnership opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          EXTERNAL LINKS SECTION
          ============================================ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />

        <Container>
          <div className="text-center mb-12">
            <FadeIn>
              <span className="text-label text-regal-gold mb-4 block">Official Channels</span>
            </FadeIn>
            <AnimatedHeading as="h2" className="text-title font-serif text-charcoal">
              Connect With Us
            </AnimatedHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {externalLinks.map((link, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl border border-border p-8 hover:border-regal-gold/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-regal-gold-muted flex items-center justify-center transition-transform group-hover:scale-110">
                      <link.icon className="w-7 h-7 text-regal-gold" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 transition-all group-hover:text-regal-gold group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal mb-2 group-hover:text-regal-gold transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted">
                    {link.description}
                  </p>
                </a>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================
          MAP / LOCATION SECTION (Placeholder)
          ============================================ */}
      <ParallaxSection speed={0.15}>
        <section className="section-dark section-padding relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <GeometricGrid className="text-regal-gold/5" />
          </div>

          {/* Decorative stars */}
          <EightPointStar
            className="absolute -left-20 top-1/2 -translate-y-1/2 text-regal-gold/10"
            size={250}
            strokeWidth={0.3}
          />
          <EightPointStar
            className="absolute -right-20 top-1/3 text-regal-gold/5"
            size={180}
            strokeWidth={0.3}
          />

          <Container className="relative z-10">
            <FadeIn className="text-center">
              {/* Location icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-regal-gold/20 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-2 border-regal-gold/50 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-regal-gold" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">
                Visit Us
              </h2>

              {/* Address */}
              <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                {CONTACT_INFO.address}
              </p>

              {/* Map placeholder */}
              <div className="w-full max-w-3xl mx-auto aspect-[16/9] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-regal-gold/50 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive map coming soon</p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      </ParallaxSection>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="section-padding-sm bg-background relative">
        <Container size="md">
          <FadeIn className="text-center">
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
            <h2 className="text-subtitle font-serif text-charcoal mb-4">
              Continue Exploring
            </h2>
            <p className="text-muted mb-8">
              Learn more about the vision, achievements, and philanthropy of Prince Alwaleed bin Talal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/biography"
                className="btn-primary"
                data-cursor="Read"
              >
                Read Biography
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
