'use client';

import React from 'react';
import { Compass, ChevronDown } from 'lucide-react';

interface HeroOverlayProps {
  onBoardVoyage: () => void;
}

export default function HeroOverlay({ onBoardVoyage }: HeroOverlayProps) {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 pt-24 sm:pt-28 pb-10 text-center pointer-events-none select-none"
    >
      {/* Top Refined Fest Badge */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0d111a]/70 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
          MARCH 12–14, 2027 • IIIT DHARWAD
        </span>
      </div>

      {/* Main Headline & Ultra-Concise Subtitle (Positioned in upper half so it never overlaps the 3D boat) */}
      <div className="flex flex-col items-center max-w-4xl mt-4 sm:mt-6 mb-auto">
        <h1 className="whitespace-nowrap font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-[#ede8df] to-[#9c9588] drop-shadow-2xl leading-none">
          AVINYA <span className="text-amber-300 font-bold">'27</span>
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-white/80 font-syne font-medium tracking-wide">
          Three days. Three realities. One epic odyssey.
        </p>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex items-center justify-center gap-3 mt-6 sm:mt-7">
          <button
            type="button"
            onClick={onBoardVoyage}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            data-cursor-text="BOARD"
          >
            <Compass className="w-3.5 h-3.5 text-black group-hover:rotate-45 transition-transform duration-500" />
            <span>Board Voyage</span>
          </button>

          <a
            href="#events"
            className="pointer-events-auto px-6 sm:px-7 py-3 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white font-syne font-semibold text-xs tracking-wider uppercase hover:border-amber-400/50 hover:bg-white/[0.08] transition-all duration-300"
            data-cursor-text="EVENTS"
          >
            24 Events
          </a>
        </div>
      </div>

      {/* Subtle Scroll Cue at Viewport Bottom */}
      <div
        className="pointer-events-auto flex flex-col items-center gap-1 cursor-pointer text-white/40 hover:text-white transition-colors pb-4"
        onClick={onBoardVoyage}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">
          SCROLL TO NAVIGATE
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-amber-300/80 animate-bounce" />
      </div>
    </section>
  );
}
