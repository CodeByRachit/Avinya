'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Welcoming brand intro: gently lifts away in ~1 second
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -30,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#04060b] flex flex-col items-center justify-center p-6 select-none pointer-events-none"
        >
          {/* Subtle Ambient Radial Warmth */}
          <div className="absolute w-[36rem] h-[36rem] rounded-full bg-amber-500/[0.08] blur-[150px] pointer-events-none" />

          {/* Centered Welcoming Brand Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.03, y: -20 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center max-w-lg"
          >
            {/* Institute Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5 text-xs font-grotesk text-white/75">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>IIIT Dharwad Presents</span>
            </div>

            {/* Festival Monogram */}
            <h1 className="font-syne font-black text-5xl sm:text-7xl text-white tracking-tight leading-none">
              AVINYA <span className="text-amber-300 font-light text-4xl sm:text-6xl">'27</span>
            </h1>

            {/* Poetic Subtitle */}
            <p className="font-grotesk text-sm sm:text-base text-white/60 mt-3 font-normal tracking-wide">
              Techno-Cultural Fest · March 12 – 14, 2027
            </p>

            {/* Subtle Minimalist Shimmer Line */}
            <div className="w-32 h-[2px] bg-white/[0.08] rounded-full mt-7 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-amber-300 to-transparent"
              />
            </div>

            <span className="text-[11px] font-mono text-white/35 uppercase tracking-widest mt-2.5">
              Entering the Festival Arena
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
