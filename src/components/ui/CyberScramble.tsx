'use client';

import React from 'react';

interface CyberScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  triggerOnScroll?: boolean;
}

export default function CyberScramble({
  text,
  className = '',
}: CyberScrambleProps) {
  // Clean, stable headline rendering without jittery random character scramble
  return (
    <span className={`inline-block tracking-tight ${className}`}>
      {text}
    </span>
  );
}
