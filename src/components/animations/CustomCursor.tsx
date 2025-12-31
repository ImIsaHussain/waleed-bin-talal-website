'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fast spring config for tight cursor following
  const fastSpringConfig = { damping: 40, stiffness: 800, mass: 0.5 };
  const cursorX = useSpring(mouseX, fastSpringConfig);
  const cursorY = useSpring(mouseY, fastSpringConfig);

  // Animated scale for click effect (smooth, no teleporting)
  const clickScale = useMotionValue(1);
  const smoothClickScale = useSpring(clickScale, { damping: 30, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      clickScale.set(0.8);
    };
    const handleMouseUp = () => {
      setIsClicking(false);
      clickScale.set(1);
    };

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverableElement = target.closest('[data-cursor]');
      const linkElement = target.closest('a, button, [role="button"]');

      if (hoverableElement) {
        setIsHovering(true);
        const cursorType = hoverableElement.getAttribute('data-cursor');
        setCursorText(cursorType || '');
      } else if (linkElement) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [mouseX, mouseY, clickScale]);

  // Only show on Chrome desktop (not mobile, not other browsers)
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edg|OPR/.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const shouldShowCursor = isChrome && !isMobile && !isTouchDevice;
    setShouldShow(shouldShowCursor);

    // Add/remove class on body to control default cursor visibility
    if (shouldShowCursor) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!shouldShow) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-regal-gold pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: smoothClickScale,
        }}
      />

      {/* Cursor ring - follows tightly now */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-regal-gold/60 pointer-events-none z-[9998]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: smoothClickScale,
        }}
        animate={{
          width: isHovering ? 64 : 28,
          height: isHovering ? 64 : 28,
          backgroundColor: isHovering ? 'rgba(193, 154, 91, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-deep-navy uppercase tracking-wider">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
}
