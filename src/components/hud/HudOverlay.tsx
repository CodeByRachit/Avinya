'use client';

import React, { useEffect, useState } from 'react';
import { FEST_METRICS } from '@/data/events';
import { MapPin } from 'lucide-react';

export default function HudOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.round((window.scrollY / maxScroll) * 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none font-mono">
      {/* Subtle Bottom-Right Reading Progress */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-[10px] text-white/30 tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        <span>VOYAGE PROGRESS {scrollProgress}%</span>
      </div>

      {/* Subtle Bottom-Left Campus Location */}
      <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-2 text-[10px] text-white/30 tracking-widest bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
        <MapPin className="w-3 h-3 text-white/40" />
        <span>IIIT DHARWAD • 15.2917° N, 75.0505° E</span>
      </div>
    </div>
  );
}
