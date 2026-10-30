'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { DAY_THEMES, DayTheme } from '@/data/events';
import { Calendar, Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import CyberScramble from '@/components/ui/CyberScramble';

export default function ThemeShowcaseSection() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const currentTheme = DAY_THEMES[activeDay];

  return (
    <section id="themes" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 font-mono text-xs text-amber-200 mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>CINEMATIC CONTINUUM // 3 DAYS • 3 REALITIES</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            <CyberScramble text="THE TRI-THEME VOYAGE" />
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Every day of Avinya 2027 plunges participants into a fully transformed cinematic world, each with its own signature architecture, atmosphere, and competitive stakes.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10">
          {([1, 2, 3] as const).map((day) => {
            const isTabActive = activeDay === day;
            const theme = DAY_THEMES[day];

            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`px-4 sm:px-5 py-2 rounded-full font-syne text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isTabActive
                    ? 'bg-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                Day 0{day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Panoramic Theme Hero Showcase Card */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 glass-panel shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Full-bleed High-Resolution Artwork Image */}
        <div className="relative w-full h-[400px] sm:h-[520px] md:h-[620px]">
          <Image
            src={currentTheme.image}
            alt={currentTheme.codename}
            fill
            priority
            className="object-cover object-center transition-all duration-700 filter brightness-90 contrast-105"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          {/* Subtle multi-stop gradient vignette so typography reads with crystal clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080a10] via-[#080a10]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080a10]/80 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Detailed Narrative & Meta Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${currentTheme.accentColor}25`,
                  borderColor: `${currentTheme.accentColor}60`,
                  color: currentTheme.accentColor,
                }}
              >
                DAY 0{currentTheme.day} • {currentTheme.date}
              </span>
              <span className="font-mono text-xs text-white/50">
                OFFICIAL THEMATIC CONTINUUM
              </span>
            </div>

            <h3 className="font-syne text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              {currentTheme.codename}
            </h3>

            <p className="font-syne text-base sm:text-lg text-amber-200/90 font-medium mt-1">
              {currentTheme.themeSubtitle}
            </p>

            <p className="font-grotesk text-sm sm:text-base text-white/80 mt-4 leading-relaxed max-w-xl">
              {currentTheme.description}
            </p>

            {/* Quick action linking to filtered events for this day */}
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#events"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-syne font-bold text-xs uppercase tracking-wider text-black bg-amber-200 hover:bg-white shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all"
              >
                <span>Explore Day 0{currentTheme.day} Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Day Highlights Bento Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl w-full md:w-80 shrink-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
              KEY ARENAS FOR DAY 0{currentTheme.day}:
            </span>
            <ul className="text-xs font-grotesk text-white/80 space-y-2">
              {currentTheme.day === 1 && (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <strong>Code Royale</strong> (3v3 CP Knockout)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <strong>AI Arcade</strong> (Reverse-Prompting)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <strong>Opening Pro Night</strong> (Mosaic)
                  </li>
                </>
              )}
              {currentTheme.day === 2 && (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>Yukti 2.0</strong> (FPGA + IBM Quantum)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>Build with Gemma</strong> (Agentic AI)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <strong>Battle of Bands</strong> (Live Rock Gig)
                  </li>
                </>
              )}
              {currentTheme.day === 3 && (
                <>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <strong>Kernel Panic</strong> (Linux Festival)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <strong>Fashion Show</strong> (Runway Couture)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                    <strong>Grand Festival DJ Night</strong>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

