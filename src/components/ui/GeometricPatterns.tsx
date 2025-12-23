'use client';

import { cn } from '@/lib/utils';

// Islamic 8-pointed star pattern - thicker strokes
export function EightPointStar({
  className,
  size = 100,
  strokeWidth = 2,
  animated = false,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn(animated && 'animate-spin-slow', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer star - main shape */}
      <path
        d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Inner star - secondary shape */}
      <path
        d="M50 15L58.5 41.5L85 50L58.5 58.5L50 85L41.5 58.5L15 50L41.5 41.5L50 15Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinejoin="round"
        opacity="0.6"
      />
      {/* Center circle accent */}
      <circle
        cx="50"
        cy="50"
        r="8"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.5}
        opacity="0.4"
      />
    </svg>
  );
}

// Enhanced Islamic geometric grid pattern - more visible
export function GeometricGrid({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="islamic-geometric-grid"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Main diamond shape */}
            <path
              d="M40 0L80 40L40 80L0 40Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.15"
            />
            {/* Inner diamond */}
            <path
              d="M40 15L65 40L40 65L15 40Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.1"
            />
            {/* Cross pattern - Islamic symmetry */}
            <path
              d="M40 0V80M0 40H80"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.08"
            />
            {/* Corner accents */}
            <circle cx="40" cy="40" r="3" fill="currentColor" opacity="0.1" />
            <circle cx="0" cy="0" r="2" fill="currentColor" opacity="0.08" />
            <circle cx="80" cy="0" r="2" fill="currentColor" opacity="0.08" />
            <circle cx="0" cy="80" r="2" fill="currentColor" opacity="0.08" />
            <circle cx="80" cy="80" r="2" fill="currentColor" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geometric-grid)" />
      </svg>
    </div>
  );
}

// Enhanced Arabesque corner ornament - more visible
export function ArabesqueCorner({
  className,
  position = 'top-left',
  size = 120,
}: {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
}) {
  const positions = {
    'top-left': 'absolute top-0 left-0',
    'top-right': 'absolute top-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
  };

  const rotations = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={cn('text-regal-gold pointer-events-none', positions[position], rotations[position], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main curved fill */}
      <path
        d="M0 0C0 66.27 53.73 120 120 120V100C64.77 100 20 55.23 20 0H0Z"
        fill="currentColor"
        opacity="0.12"
      />
      {/* Primary arc */}
      <path
        d="M0 0C0 66.27 53.73 120 120 120"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Secondary arc */}
      <path
        d="M10 0C10 60.75 59.25 110 120 110"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Tertiary arc */}
      <path
        d="M25 0C25 52.47 67.53 95 120 95"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.15"
      />
      {/* Corner dot accent */}
      <circle cx="5" cy="5" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Enhanced Islamic hexagonal pattern
export function HexagonalPattern({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="islamic-hexagonal"
            x="0"
            y="0"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M28 0L56 16.67V50L28 66.67L0 50V16.67L28 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.12"
            />
            <path
              d="M28 33.33L56 50V83.33L28 100L0 83.33V50L28 33.33Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.12"
            />
            {/* Center decorations */}
            <circle cx="28" cy="33.33" r="4" fill="currentColor" opacity="0.08" />
            <circle cx="28" cy="66.67" r="4" fill="currentColor" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-hexagonal)" />
      </svg>
    </div>
  );
}

// Islamic interlocking pattern - new component for variety
export function InterlockingPattern({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="islamic-interlock"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Interlocking squares rotated 45 degrees */}
            <path
              d="M25 0L50 25L75 0L100 25L75 50L100 75L75 100L50 75L25 100L0 75L25 50L0 25Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.12"
            />
            {/* Inner pattern */}
            <path
              d="M50 25L75 50L50 75L25 50Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              opacity="0.1"
            />
            {/* Central star hint */}
            <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-interlock)" />
      </svg>
    </div>
  );
}

// Animated line divider with thicker elements
export function GeometricDivider({
  className,
  variant = 'diamond',
}: {
  className?: string;
  variant?: 'diamond' | 'star' | 'line';
}) {
  if (variant === 'line') {
    return (
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-regal-gold/60 to-regal-gold" />
        <div className="w-2.5 h-2.5 rotate-45 bg-regal-gold" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-regal-gold/60 to-regal-gold" />
      </div>
    );
  }

  if (variant === 'star') {
    return (
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-regal-gold/40" />
        <EightPointStar size={28} strokeWidth={2} className="text-regal-gold" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-regal-gold/40" />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-regal-gold/40" />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rotate-45 bg-regal-gold/60" />
        <div className="w-4 h-4 rotate-45 border-2 border-regal-gold" />
        <div className="w-2 h-2 rotate-45 bg-regal-gold/60" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-regal-gold/40" />
    </div>
  );
}

// Floating geometric shapes with enhanced visibility
export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Large slow rotating star */}
      <div className="absolute -top-20 -right-20 opacity-10">
        <EightPointStar size={300} strokeWidth={1.5} animated />
      </div>

      {/* Medium star */}
      <div className="absolute top-1/3 -left-16 opacity-10">
        <EightPointStar size={200} strokeWidth={1.5} animated />
      </div>

      {/* Small accent diamonds */}
      <div className="absolute bottom-1/4 right-1/4 w-10 h-10 rotate-45 border-2 border-regal-gold/15" />
      <div className="absolute top-1/4 left-1/3 w-6 h-6 rotate-45 bg-regal-gold/10" />
    </div>
  );
}
