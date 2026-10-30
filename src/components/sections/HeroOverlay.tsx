'use client';

import React from 'react';
import { Compass, ChevronDown, Sparkles } from 'lucide-react';

interface HeroOverlayProps {
  onBoardVoyage: () => void;
}

export default function HeroOverlay({ onBoardVoyage }: HeroOverlayProps) {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 pt-24 sm:pt-28 pb-10 text-center pointer-events-none select-none"
    >
      {/* High-End Glassmorphic Hero Card Backdrop (Positioned cleanly at the top) */}
      <div className="pointer-events-auto max-w-3xl w-full mx-auto p-6 sm:p-8 rounded-3xl border border-white/15 bg-slate-950/40 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.55)] flex flex-col items-center mt-2">
        {/* Top Fest Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-amber-200 font-semibold">
            MARCH 12–14, 2027 • IIIT DHARWAD
          </span>
        </div>

        {/* Clean, Majestic Single-Line Title */}
        <h1 className="whitespace-nowrap font-syne text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#ede8df] to-[#a8a29e] drop-shadow-2xl leading-none">
          AVINYA <span className="text-amber-300 font-black">2027</span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/85 font-syne font-medium tracking-wide max-w-xl">
          Three days. Three realities. One epic techno-cultural odyssey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
          <button
            type="button"
            onClick={onBoardVoyage}
            className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            data-cursor-text="BOARD"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
            <span>Board the Voyage</span>
          </button>

          <a
            href="#events"
            className="px-6 py-3 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md text-white font-syne font-semibold text-xs tracking-wider uppercase hover:border-amber-400/50 hover:bg-white/[0.12] transition-all duration-300"
            data-cursor-text="EVENTS"
          >
            Explore 24 Events
          </a>
        </div>
      </div>

      {/* Sleek Scroll Indicator at Viewport Bottom */}
      <div
        className="pointer-events-auto flex flex-col items-center gap-1 cursor-pointer text-white/50 hover:text-white transition-colors pb-2"
        onClick={onBoardVoyage}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-200/80">
          SCROLL TO NAVIGATE THE ISLANDS
        </span>
        <ChevronDown className="w-4 h-4 text-amber-300 animate-bounce" />
      </div>
    </section>
  );
}
