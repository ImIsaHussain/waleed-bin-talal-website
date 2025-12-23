import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'navy' | 'outline';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        {
          // Variants
          'bg-gray-100 text-charcoal': variant === 'default',
          'bg-regal-gold text-white': variant === 'gold',
          'bg-deep-navy text-white': variant === 'navy',
          'border border-deep-navy text-deep-navy bg-transparent': variant === 'outline',
        },
        {
          // Sizes
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
