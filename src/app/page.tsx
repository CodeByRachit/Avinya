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
} from 'lucide-react';

// Dynamic import of 3D Canvas with ssr disabled for flawless WebGL mounting
const VoyageCanvas = dynamic(() => import('@/components/canvas/VoyageCanvas'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#06080e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">
          INITIALIZING AVINYA CONTINUUM...
        </span>
      </div>
    </div>
  ),
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
    handleSelectWaypoint(0.22);
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
      {/* 2. DEDICATED 3D VOYAGE SCROLL TRACK (320vh of 3D Steer) */}
      {/* ======================================================== */}
      <div id="voyage" ref={voyageTrackRef} className="relative h-[320vh] w-full">
        {/* Sticky Hero & Island Overlays inside the Voyage Track */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
          {/* Hero Typography & CTA (prominent at t = 0 to 0.15) */}
          <div
            className="w-full transition-opacity duration-500 ease-out"
            style={{
              opacity: voyageProgress < 0.12 ? 1 : Math.max(0, 1 - (voyageProgress - 0.12) * 8),
              pointerEvents: voyageProgress < 0.15 ? 'auto' : 'none',
            }}
          >
            <HeroOverlay onBoardVoyage={handleBoardVoyage} />
          </div>

          {/* Island 1 Announcement Overlay (Active around t = 0.16 to 0.36) */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-16 pointer-events-none transition-all duration-500"
            style={{
              opacity: voyageProgress >= 0.16 && voyageProgress <= 0.36 ? 1 : 0,
              transform: `translateY(${
                voyageProgress >= 0.16 && voyageProgress <= 0.36 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-lg glass-panel p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-[#0e0a07]/85 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
              {/* Thumbnail of Image 1 */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src="/images/themes/day1-last-outpost.jpg"
                  alt="The Last Outpost"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-amber-300 font-bold">
                  DAY 01 // MARCH 12, 2027
                </span>
              </div>

              <h2 className="font-syne text-2xl sm:text-3xl font-black text-white">
                THE LAST OUTPOST
              </h2>
              <p className="font-syne text-xs sm:text-sm text-amber-300 font-medium mt-0.5">
                Dune Desert & Mountain Fortress Citadel
              </p>
              <p className="font-grotesk text-xs text-white/70 mt-2.5 leading-relaxed">
                Step foot onto the arid sandstone canyons beneath the giant rising moon. Featuring Code Royale 3v3 relay, AI Arcade RAG Hunt, and the opening pro night.
              </p>
            </div>
          </div>

          {/* Island 2 Announcement Overlay (Active around t = 0.50 to 0.68) */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-end px-6 sm:px-16 pointer-events-none transition-all duration-500"
            style={{
              opacity: voyageProgress >= 0.50 && voyageProgress <= 0.68 ? 1 : 0,
              transform: `translateY(${
                voyageProgress >= 0.50 && voyageProgress <= 0.68 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-lg glass-panel p-6 sm:p-7 rounded-3xl border border-rose-500/30 bg-[#12080d]/85 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-right overflow-hidden relative">
              {/* Thumbnail of Image 2 */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src="/images/themes/day2-pandemonium.jpg"
                  alt="The Pandemonium"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 right-3 font-mono text-[10px] text-rose-300 font-bold">
                  DAY 02 // MARCH 13, 2027
                </span>
              </div>

              <h2 className="font-syne text-2xl sm:text-3xl font-black text-white">
                THE PANDEMONIUM
              </h2>
              <p className="font-syne text-xs sm:text-sm text-rose-300 font-medium mt-0.5">
                Sunset River Delta & Cybernetic Spires
              </p>
              <p className="font-grotesk text-xs text-white/70 mt-2.5 leading-relaxed">
                The wooden boat glides under massive aqueduct waterfalls beneath the giant crimson sun. Featuring Yukti 2.0 Quantum Hackathon, Build with Gemma, and Battle of Bands.
              </p>
            </div>
          </div>

          {/* Island 3 Announcement Overlay (Active around t = 0.80 to 0.98) */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-16 pointer-events-none transition-all duration-500"
            style={{
              opacity: voyageProgress >= 0.80 && voyageProgress <= 0.98 ? 1 : 0,
              transform: `translateY(${
                voyageProgress >= 0.80 && voyageProgress <= 0.98 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-lg glass-panel p-6 sm:p-7 rounded-3xl border border-amber-400/30 bg-[#0e0c07]/85 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
              {/* Thumbnail of Image 3 */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 border border-white/10">
                <Image
                  src="/images/themes/day3-carnival-island.jpg"
                  alt="The Carnival Island"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-amber-300 font-bold">
                  DAY 03 // MARCH 14, 2027
                </span>
              </div>

              <h2 className="font-syne text-2xl sm:text-3xl font-black text-white">
                THE CARNIVAL ISLAND
              </h2>
              <p className="font-syne text-xs sm:text-sm text-amber-300 font-medium mt-0.5">
                Luminous Pier, Ferris Wheel & Pro DJ Night
              </p>
              <p className="font-grotesk text-xs text-white/70 mt-2.5 leading-relaxed">
                Arriving at the illuminated festival boardwalk beneath the glowing Ferris wheel. Featuring Kernel Panic Linux Fest, Fashion Show runway, and the Grand DJ night.
              </p>
            </div>
          </div>

          {/* Connected Island Artwork Cards at Bottom */}
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
                <span>THE TECHNO-CULTURAL FLAGSHIP OF IIIT DHARWAD</span>
              </div>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                <CyberScramble text="WHERE CODE, HARDWARE & ARTISTRY CONVERGE" />
              </h2>
              <p className="font-grotesk text-base text-white/70 mt-6 leading-relaxed">
                Avinya 2027 marks the monumental annual gathering at the Indian Institute of Information Technology, Dharwad. Bringing together thousands of visionary technologists, artists, and competitors from institutions across India.
              </p>
              <p className="font-grotesk text-base text-white/70 mt-3 leading-relaxed">
                Designed as a navigable 3-day voyage, every day completely transforms the campus into a cinematic realm—from the sandstone citadel of The Last Outpost to the sunset river delta of The Pandemonium and the festive boardwalk of The Carnival Island.
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
        {/* 7. PASS PROCUREMENT & REGISTRATION GATEWAY               */}
        {/* ======================================================== */}
        <section id="register" className="max-w-4xl mx-auto px-4 sm:px-6 py-28 text-center">
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-white/15 relative overflow-hidden bg-[#0c0e15]/90">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-300/90 flex items-center justify-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              OFFICIAL REGISTRATION GATEWAY
            </span>

            <h2 className="font-syne text-3xl sm:text-5xl font-black text-white mt-3">
              <CyberScramble text="CLAIM YOUR ALL-ACCESS PASS" />
            </h2>

            <p className="font-grotesk text-white/70 max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Open to undergraduate and postgraduate delegates from technical and cultural colleges nationwide. Access all 24 events, pro-nights, workshops, and accommodation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => alert("Delegate Registration Gateway: Pass secured for Avinya 2027! See you on campus March 12-14.")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-black font-syne font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.5)] transition-all hover:scale-[1.02]"
                data-cursor-text="REGISTER"
              >
                Procure All-Access Delegate Pass
              </button>
              <a
                href="#events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-syne font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/10 transition-all"
              >
                Browse Individual Events
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                VERIFIED COLLEGE ID REQUIRED
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                CERTIFICATES & MERCH INCLUDED
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
            <span className="text-amber-300">15.2917° N, 75.0505° E</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
