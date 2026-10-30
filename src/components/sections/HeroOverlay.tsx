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
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 pt-32 pb-24 text-center pointer-events-none select-none"
    >
      {/* Top Refined Tag */}
      <div className="pointer-events-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0d111a]/70 backdrop-blur-md shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/80">
          IIIT DHARWAD PRESENTS • MARCH 12, 13 & 14, 2027
        </span>
      </div>

      {/* Main Cinematic Title */}
      <div className="flex flex-col items-center max-w-4xl my-auto">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-amber-300/80 font-medium mb-3">
          AN EPIC TECHNO-CULTURAL ODYSSEY
        </span>

        <h1 className="font-syne text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#ede8df] to-[#9c9588] drop-shadow-xl">
          AVINYA <span className="text-amber-300/90 font-light">'27</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-[#d4cfc5] font-syne font-medium max-w-2xl leading-snug">
          Three days. Three realities. Every day is an island across uncharted waters.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-white/60 font-grotesk max-w-xl leading-relaxed">
          Embark in a wooden voyaging skiff across the sands of <strong className="text-amber-400 font-semibold">The Last Outpost</strong>, through the sunset delta of <strong className="text-rose-400 font-semibold">The Pandemonium</strong>, to the festival lights of <strong className="text-amber-300 font-semibold">The Carnival Island</strong>.
        </p>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onBoardVoyage}
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-syne font-bold text-xs sm:text-sm tracking-wider uppercase text-black bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 shadow-[0_4px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            data-cursor-text="BOARD"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
            <span>Board the Voyage</span>
          </button>

          <a
            href="#events"
            className="pointer-events-auto px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white font-syne font-semibold text-xs sm:text-sm tracking-wider uppercase hover:border-amber-400/50 hover:bg-white/[0.08] transition-all duration-300"
            data-cursor-text="EVENTS"
          >
            Explore 24 Events
          </a>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div
        className="pointer-events-auto flex flex-col items-center gap-1.5 cursor-pointer text-white/40 hover:text-white transition-colors"
        onClick={onBoardVoyage}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest">
          SCROLL TO NAVIGATE THE ISLANDS
        </span>
        <ChevronDown className="w-4 h-4 text-amber-300/70 animate-bounce" />
      </div>
    </section>
  );
}
