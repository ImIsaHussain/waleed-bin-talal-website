'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EightPointStar } from '@/components/ui/GeometricPatterns';

interface MaskRevealProps {
  onComplete?: () => void;
}

// Custom loading star that fills in counterclockwise while spinning clockwise
function LoadingStar({ size = 260, duration = 3 }: { size?: number; duration?: number }) {
  const strokeWidth = 1.5;

  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    >
      {/* Background star - light grey, rotated 45deg */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(45deg)' }}
      >
        {/* Outer star - grey background */}
        <path
          d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        {/* Inner star - grey background */}
        <path
          d="M50 15L58.5 41.5L85 50L58.5 58.5L50 85L41.5 58.5L15 50L41.5 41.5L50 15Z"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth * 0.7}
          strokeLinejoin="round"
        />
        {/* Center circle - grey background */}
        <circle
          cx="50"
          cy="50"
          r="8"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth * 0.5}
        />
      </svg>

      {/* Animated star - fills in counterclockwise with gold color, rotated 45deg */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(45deg)' }}
      >
        {/* Outer star - animated gold (counterclockwise) */}
        <motion.path
          d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
          stroke="#C5A059"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          pathLength={1}
          initial={{ strokeDasharray: 1, strokeDashoffset: -1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: duration, ease: 'easeInOut' }}
        />
        {/* Inner star - animated gold with delay (counterclockwise) */}
        <motion.path
          d="M50 15L58.5 41.5L85 50L58.5 58.5L50 85L41.5 58.5L15 50L41.5 41.5L50 15Z"
          stroke="#C5A059"
          strokeWidth={strokeWidth * 0.7}
          strokeLinejoin="round"
          opacity={0.6}
          pathLength={1}
          initial={{ strokeDasharray: 1, strokeDashoffset: -1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: duration * 0.8, ease: 'easeInOut', delay: duration * 0.15 }}
        />
        {/* Center circle - animated gold with delay (counterclockwise) */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          stroke="#C5A059"
          strokeWidth={strokeWidth * 0.5}
          opacity={0.4}
          pathLength={1}
          initial={{ strokeDasharray: 1, strokeDashoffset: -1 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: duration * 0.5, ease: 'easeOut', delay: duration * 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

export default function MaskReveal({ onComplete }: MaskRevealProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start exit animation after loading completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Remove from DOM after animation completes
  useEffect(() => {
    if (!isAnimating) {
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000);

      return () => clearTimeout(removeTimer);
    }
  }, [isAnimating, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        style={{ pointerEvents: isAnimating ? 'auto' : 'none' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Circular reveal mask overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-deep-green via-deep-green-dark to-deep-green"
          initial={{ clipPath: 'circle(100% at 50% 50%)' }}
          animate={{
            clipPath: isAnimating
              ? 'circle(100% at 50% 50%)'
              : 'circle(0% at 50% 50%)'
          }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Decorative stars */}
          <div className="absolute inset-0">
            <EightPointStar
              size={120}
              className="absolute top-1/4 right-[15%] text-regal-gold/10 rotate-[15deg]"
              strokeWidth={0.5}
            />
            <EightPointStar
              size={80}
              className="absolute bottom-1/3 left-[10%] text-regal-gold/10 -rotate-[20deg]"
              strokeWidth={0.5}
            />
            <EightPointStar
              size={60}
              className="absolute top-1/3 left-[20%] text-regal-gold/8 rotate-[30deg]"
              strokeWidth={0.5}
            />
            <EightPointStar
              size={100}
              className="absolute bottom-1/4 right-[20%] text-regal-gold/8 -rotate-12"
              strokeWidth={0.5}
            />
          </div>
        </motion.div>

        {/* Center content - Loading Star */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isAnimating ? 1 : 0,
            scale: isAnimating ? 1 : 0.8
          }}
          transition={{
            opacity: { duration: 0.3, delay: isAnimating ? 0.1 : 0 },
            scale: { duration: 0.4, ease: 'easeOut', delay: isAnimating ? 0.1 : 0 }
          }}
        >
          {/* Loading star that fills in clockwise */}
          <LoadingStar size={260} duration={3} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
