'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CyberScrambleProps {
  text: string;
  className?: string;
  speed?: number; // ms per frame
  triggerOnScroll?: boolean;
}

const GLYPHS = 'ABCDEF0123456789!<>-_\\/[]{}—=+*^?#________';

export default function CyberScramble({
  text,
  className = '',
  speed = 35,
  triggerOnScroll = true,
}: CyberScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const startScramble = () => {
    let iteration = 0;
    const maxIterations = text.length;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, speed);
  };

  useEffect(() => {
    if (!triggerOnScroll) {
      startScramble();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            startScramble();
          }
        });
      },
      { threshold: 0.25 }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [text, speed, triggerOnScroll]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
