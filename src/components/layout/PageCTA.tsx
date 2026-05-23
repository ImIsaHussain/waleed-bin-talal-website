'use client';

import { Container } from '@/components/ui';
import { GeometricDivider } from '@/components/ui';
import { FadeIn } from '@/components/animations';
import { Link } from '@/i18n/navigation';

interface PageCTAProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  primaryCursor: string;
  outlineLabel: string;
  outlineHref: string;
  outlineCursor: string;
  showDivider?: boolean;
}

export default function PageCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  primaryCursor,
  outlineLabel,
  outlineHref,
  outlineCursor,
  showDivider = true,
}: PageCTAProps) {
  return (
    <section className="py-16 bg-cream relative">
      <Container size="md">
        <FadeIn className="text-center">
          {showDivider && (
            <GeometricDivider variant="star" className="text-regal-gold mx-auto mb-8" />
          )}
          <h2 className="text-subtitle font-serif text-charcoal mb-4">
            {title}
          </h2>
          <p className="text-muted mb-8">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              className="btn-primary"
              data-cursor={primaryCursor}
            >
              {primaryLabel}
            </Link>
            <Link
              href={outlineHref}
              className="btn-outline"
              data-cursor={outlineCursor}
            >
              {outlineLabel}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
