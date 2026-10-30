'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroOverlay from '@/components/sections/HeroOverlay';
import VoyageHUD from '@/components/hud/VoyageHUD';
import ThemeShowcaseSection from '@/components/sections/ThemeShowcaseSection';
import EventsSection from '@/components/sections/EventsSection';
import CampusVenueGuide from '@/components/sections/CampusVenueGuide';
import Hack2FutureSection from '@/components/sections/Hack2FutureSection';
import Preloader from '@/components/hud/Preloader';
import NavigationChronometer from '@/components/hud/NavigationChronometer';
import CyberScramble from '@/components/ui/CyberScramble';
import { useLenis } from '@/components/providers/SmoothScroll';
import {
  Compass,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

// Dynamic import of 3D Canvas with ssr disabled for flawless WebGL mounting
const VoyageCanvas = dynamic(() => import('@/components/canvas/VoyageCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#06080e]" />,
});

export default function Home() {
  const { lenis } = useLenis();
  const [voyageProgress, setVoyageProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const voyageTrackRef = useRef<HTMLDivElement>(null);

  // Sync scroll progress with 3D boat voyage
  useEffect(() => {
    const handleScroll = () => {
      if (!voyageTrackRef.current) return;

      const track = voyageTrackRef.current;
      const rect = track.getBoundingClientRect();
      const scrollHeight = track.offsetHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / scrollHeight));
        setVoyageProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smoothly navigate boat to a chosen island waypoint
  const handleSelectWaypoint = useCallback(
    (t: number) => {
      if (!voyageTrackRef.current) return;
      const track = voyageTrackRef.current;
      const trackTop = track.offsetTop;
      const scrollHeight = track.offsetHeight - window.innerHeight;
      const targetScroll = trackTop + t * scrollHeight;

      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.8 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    },
    [lenis]
  );

  // Board the voyage button triggers smooth scroll to Day 1: The Last Outpost
  const handleBoardVoyage = useCallback(() => {
    handleSelectWaypoint(0.30);
  }, [handleSelectWaypoint]);

  return (
    <main className="relative w-full min-h-screen text-white overflow-x-hidden bg-[#07090e]">
      {/* ======================================================== */}
      {/* 0. FUTURISTIC INITIALIZING PRELOADER SCREEN             */}
      {/* ======================================================== */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* ======================================================== */}
      {/* 1. FIXED 3D WEBGL VOYAGE CANVAS & REFLECTIVE WATER       */}
      {/* ======================================================== */}
      <VoyageCanvas progress={voyageProgress} />

      {/* ======================================================== */}
      {/* 2. DEDICATED 3D VOYAGE SCROLL TRACK (Smooth Responsive)  */}
      {/* ======================================================== */}
      <div id="voyage" ref={voyageTrackRef} className="relative h-[320vh] w-full">
        {/* Sticky Hero inside the Voyage Track */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
          {/* Hero Typography & CTA (fades smoothly as voyage begins) */}
          <div
            className="w-full transition-opacity duration-500 ease-out"
            style={{
              opacity: voyageProgress < 0.12 ? 1 : Math.max(0, 1 - (voyageProgress - 0.12) * 8),
              pointerEvents: voyageProgress < 0.15 ? 'auto' : 'none',
            }}
          >
            <HeroOverlay onBoardVoyage={handleBoardVoyage} />
          </div>

          {/* Connected Island Timeline Cards at Bottom */}
          <VoyageHUD
            progress={voyageProgress}
            onSelectWaypoint={handleSelectWaypoint}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. GROUND DETAIL SECTIONS: CHRONOMETER, THEMES, EVENTS   */}
      {/* ======================================================== */}
      <div className="relative z-20 bg-gradient-to-b from-transparent via-[#080b12]/95 to-[#05070a] backdrop-blur-md pt-16">
        {/* Navigation Chronometer Countdown */}
        <NavigationChronometer />

        {/* Dedicated Panoramic Theme Artworks Showcase */}
        <ThemeShowcaseSection />

        {/* Section: About Avinya 2027 */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 font-mono text-xs text-amber-200 mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>FLAGSHIP OF IIIT DHARWAD</span>
              </div>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                <CyberScramble text="WHERE CODE, HARDWARE & ARTISTRY CONVERGE" />
              </h2>
              <p className="font-grotesk text-base text-white/75 mt-5 leading-relaxed">
                Avinya 2027 is a 3-day voyage across three cinematic realms—from the arid desert citadel of The Last Outpost, through the crimson sunset delta of The Pandemonium, to the luminous boardwalk of The Carnival Island.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 font-mono">
                <div>
                  <span className="text-[10px] text-white/40 block">DATES</span>
                  <span className="font-syne text-sm sm:text-base font-bold text-amber-300">
                    MAR 12-14
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">TOTAL EVENTS</span>
                  <span className="font-syne text-sm sm:text-base font-bold text-white">
                    24 OFFICIAL
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">CAMPUS</span>
                  <span className="font-syne text-sm sm:text-base font-bold text-rose-300">
                    IIIT DHARWAD
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Bento with Real Artworks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
                <span className="font-mono text-xs text-amber-400 font-semibold">DAY 01</span>
                <h3 className="font-syne text-lg font-bold text-white mt-1">The Last Outpost</h3>
                <p className="text-xs text-white/60 font-grotesk mt-1.5 leading-relaxed">
                  Sandstone cliffs, giant moons, CP relays, and theatrical dramatics under the desert sun.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-rose-400/40 transition-colors">
                <span className="font-mono text-xs text-rose-400 font-semibold">DAY 02</span>
                <h3 className="font-syne text-lg font-bold text-white mt-1">The Pandemonium</h3>
                <p className="text-xs text-white/60 font-grotesk mt-1.5 leading-relaxed">
                  Sunset river delta, FPGA quantum circuits, Google Gemma autonomous agents, and Battle of Bands.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-300/40 transition-colors">
                <span className="font-mono text-xs text-amber-300 font-semibold">DAY 03</span>
                <h3 className="font-syne text-lg font-bold text-white mt-1">The Carnival Island</h3>
                <p className="text-xs text-white/60 font-grotesk mt-1.5 leading-relaxed">
                  Luminous pier, Linux kernel fest, runway couture, and an unforgettable pro DJ night.
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-white/40">NATIONAL ARENA</span>
                  <h3 className="font-syne text-lg font-bold text-white mt-1">Hack2Future</h3>
                  <p className="text-xs text-white/60 font-grotesk mt-1.5 leading-relaxed">
                    36-hour non-stop flagship hackathon with ₹3,00,000+ prize pool.
                  </p>
                </div>
                <a
                  href="#hack2future"
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 mt-3 font-semibold"
                >
                  EXPLORE SPRINT <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. INTERACTIVE ISLAND EVENT COMMAND DECK SECTION        */}
        {/* ======================================================== */}
        <EventsSection />

        {/* ======================================================== */}
        {/* 5. ON-GROUND CAMPUS VENUE GUIDE & RADAR STRIP            */}
        {/* ======================================================== */}
        <CampusVenueGuide />

        {/* ======================================================== */}
        {/* 6. DEDICATED HACK2FUTURE ASTRONAUT & DEEP-SPACE SECTION */}
        {/* ======================================================== */}
        <Hack2FutureSection />

        {/* ======================================================== */}
        {/* 7. PASS REGISTRATION GATEWAY                             */}
        {/* ======================================================== */}
        <section id="register" className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="p-8 sm:p-14 rounded-2xl border border-white/[0.1] relative overflow-hidden bg-[#0c101a]/90 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-grotesk text-amber-300 font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Official Registration Gateway
            </span>

            <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Secure Your Festival Pass
            </h2>

            <p className="font-grotesk text-white/70 max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Open to collegiate delegates nationwide. Access all 24 cultural spectacles, technical competitions, pro-night concerts, and campus workshops.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alert("Registration Gateway: Delegate spot secured for Avinya 2027! Welcome aboard.")}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-black font-grotesk font-semibold text-sm hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get All-Access Pass</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href="#events"
                className="w-full sm:w-auto px-7 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/85 font-grotesk font-medium text-sm hover:bg-white/[0.08] transition-all"
              >
                Explore 24 Events
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-grotesk text-white/50">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified College ID Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Certificates & Kits Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                All-Access to Flagship Tracks
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 py-12 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40">
          <div className="flex items-center gap-3">
            <span className="font-syne font-bold text-white text-sm">AVINYA 2027</span>
            <span>|</span>
            <span>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, DHARWAD</span>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-6">
            <span>MARCH 12, 13 & 14, 2027</span>
            <span className="text-amber-300">DHARWAD, KARNATAKA</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
