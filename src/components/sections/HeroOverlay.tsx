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
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 pt-24 sm:pt-28 pb-8 text-center pointer-events-none select-none"
    >
      {/* Top Fest Badge - Floating Naturally */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-black/40 backdrop-blur-md shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span className="font-mono text-xs uppercase tracking-widest text-amber-200 font-semibold">
          MARCH 12–14, 2027 • IIIT DHARWAD
        </span>
      </div>

      {/* Main Headline & Subtitle - Floating Cleanly with Natural Text Shadow (NO BLUR BOX) */}
      <div className="pointer-events-auto flex flex-col items-center max-w-4xl mt-3 sm:mt-5 mb-auto">
        <h1 className="whitespace-nowrap font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f3ede4] to-[#a39888] drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-none">
          AVINYA <span className="text-amber-300 font-bold">'27</span>
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-white/90 font-syne font-medium tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] max-w-2xl">
          Three days. Three realities. One epic odyssey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6 sm:mt-7">
          <button
            type="button"
            onClick={onBoardVoyage}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            data-cursor-text="BOARD"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
            <span>Board Voyage</span>
          </button>

          <a
            href="#events"
            className="px-7 py-3.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-syne font-semibold text-xs tracking-wider uppercase hover:border-amber-400/50 hover:bg-black/60 shadow-lg transition-all duration-300"
            data-cursor-text="EVENTS"
          >
            24 Events
          </a>
        </div>
      </div>

      {/* Subtle Scroll Cue at Viewport Bottom */}
      <div
        className="pointer-events-auto flex flex-col items-center gap-1 cursor-pointer text-white/50 hover:text-white transition-colors pb-2"
        onClick={onBoardVoyage}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-amber-200/80 drop-shadow">
          SCROLL TO NAVIGATE THE ISLANDS
        </span>
        <ChevronDown className="w-4 h-4 text-amber-300 animate-bounce" />
      </div>
    </section>
  );
}
