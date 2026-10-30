'use client';

import React from 'react';
import { Sparkles, Compass, ChevronDown, Flame } from 'lucide-react';

interface HeroOverlayProps {
  onBoardVoyage: () => void;
}

export default function HeroOverlay({ onBoardVoyage }: HeroOverlayProps) {
  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between px-4 pt-32 pb-28 text-center pointer-events-none select-none"
    >
      {/* Top Banner Tag */}
      <div className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)] animate-pulse-slow">
        <span className="w-2 h-2 rounded-full bg-avinya-cyan shadow-[0_0_8px_#00f0ff]" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/90">
          IIIT DHARWAD PRESENTS • MARCH 12, 13 & 14, 2027
        </span>
      </div>

      {/* Main Grand Typography */}
      <div className="flex flex-col items-center max-w-5xl my-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-avinya-cyan font-semibold">
            // THE TECHNO-CULTURAL ODYSSEY
          </span>
        </div>

        <h1 className="font-orbitron text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
          AVINYA <span className="text-avinya-cyan drop-shadow-[0_0_35px_rgba(0,240,255,0.6)]">'27</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-slate-200 font-syne font-medium max-w-3xl drop-shadow-md">
          Three days. Three realities. Every day is an island in the uncharted digital ocean.
        </p>

        <p className="mt-2 text-xs sm:text-sm text-white/60 font-grotesk max-w-xl">
          Navigate from the sandstorms of <strong className="text-avinya-gold font-semibold">The Last Outpost</strong>, through the synthwave grid of <strong className="text-avinya-cyan font-semibold">The Pandemonium</strong>, to the festival lights of <strong className="text-avinya-magenta font-semibold">The Carnival Island</strong>.
        </p>

        {/* Action Buttons */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onBoardVoyage}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full overflow-hidden font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase text-black bg-gradient-to-r from-avinya-cyan via-white to-avinya-cyan shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_45px_rgba(0,240,255,0.9)] transition-all duration-300 hover:scale-105 active:scale-95"
            data-cursor-text="BOARD"
          >
            <Compass className="w-4 h-4 text-black group-hover:rotate-90 transition-transform duration-500" />
            <span>Board the Voyage</span>
          </button>

          <a
            href="#events"
            className="pointer-events-auto px-7 py-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white font-orbitron font-semibold text-xs sm:text-sm tracking-wider uppercase hover:border-avinya-magenta hover:text-avinya-magenta hover:shadow-[0_0_25px_rgba(255,0,127,0.4)] transition-all duration-300"
            data-cursor-text="EVENTS"
          >
            Explore 24 Events
          </a>
        </div>
      </div>

      {/* Subtle Scroll / Interaction Indicator */}
      <div className="pointer-events-auto flex flex-col items-center gap-2 cursor-pointer" onClick={onBoardVoyage}>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          SCROLL OR CLICK ISLAND TO NAVIGATE
        </span>
        <ChevronDown className="w-4 h-4 text-avinya-cyan animate-bounce" />
      </div>
    </section>
  );
}
