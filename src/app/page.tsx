'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import HeroOverlay from '@/components/sections/HeroOverlay';
import VoyageHUD from '@/components/hud/VoyageHUD';
import EventsSection from '@/components/sections/EventsSection';
import CampusVenueGuide from '@/components/sections/CampusVenueGuide';
import Hack2FutureSection from '@/components/sections/Hack2FutureSection';
import Preloader from '@/components/hud/Preloader';
import NavigationChronometer from '@/components/hud/NavigationChronometer';
import CyberScramble from '@/components/ui/CyberScramble';
import { useLenis } from '@/components/providers/SmoothScroll';
import {
  Sparkles,
  Terminal,
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
    <div className="fixed inset-0 z-0 bg-[#030712] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/50">
          INITIALIZING AVINYA 3D CONTINUUM...
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
        // Compute progress 0.0 -> 1.0 along the voyage track
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
    <main className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* ======================================================== */}
      {/* 0. FUTURISTIC INITIALIZING PRELOADER SCREEN             */}
      {/* ======================================================== */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* ======================================================== */}
      {/* 1. FIXED 3D WEBGL VOYAGE CANVAS & BIOLUMINESCENT OCEAN   */}
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
              opacity:
                voyageProgress >= 0.16 && voyageProgress <= 0.36
                  ? 1
                  : 0,
              transform: `translateY(${
                voyageProgress >= 0.16 && voyageProgress <= 0.36 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-xl glass-panel p-6 sm:p-8 rounded-2xl border border-avinya-gold/30 bg-black/60 shadow-[0_0_30px_rgba(255,179,0,0.2)]">
              <span className="font-mono text-xs uppercase tracking-widest text-avinya-gold flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                DAY 01 ARCHIPELAGO • MARCH 12, 2027
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white mt-2">
                THE LAST OUTPOST
              </h2>
              <p className="font-syne text-sm text-avinya-gold mt-1 font-medium">
                Dune Desert & Monolithic Citadel
              </p>
              <p className="font-grotesk text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                Step foot onto the arid dunes beneath the twin moons. The battle begins with high-stakes competitive programming, AI prompt bypassing, and acoustic cultural showdowns.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-gold/20 text-avinya-gold border border-avinya-gold/30">
                  Code Royale 3v3
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-gold/20 text-avinya-gold border border-avinya-gold/30">
                  AI Arcade
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-gold/20 text-avinya-gold border border-avinya-gold/30">
                  Opening Night
                </span>
              </div>
            </div>
          </div>

          {/* Island 2 Announcement Overlay (Active around t = 0.50 to 0.68) */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-end px-6 sm:px-16 pointer-events-none transition-all duration-500"
            style={{
              opacity:
                voyageProgress >= 0.50 && voyageProgress <= 0.68
                  ? 1
                  : 0,
              transform: `translateY(${
                voyageProgress >= 0.50 && voyageProgress <= 0.68 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-xl glass-panel p-6 sm:p-8 rounded-2xl border border-avinya-cyan/30 bg-black/60 shadow-[0_0_30px_rgba(0,240,255,0.2)] text-right">
              <span className="font-mono text-xs uppercase tracking-widest text-avinya-cyan flex items-center justify-end gap-2">
                DAY 02 ARCHIPELAGO • MARCH 13, 2027
                <Terminal className="w-3.5 h-3.5" />
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white mt-2">
                THE PANDEMONIUM
              </h2>
              <p className="font-syne text-sm text-avinya-cyan mt-1 font-medium">
                Synthwave Cyberpunk & Neural Matrix
              </p>
              <p className="font-grotesk text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                The boat glides into neon-lit waters under the giant synthwave sun. Quantum QFT gate design on IBM hardware meets agentic AI sprints and the legendary Battle of Bands.
              </p>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-cyan/20 text-avinya-cyan border border-avinya-cyan/30">
                  Yukti 2.0 (IBM Quantum)
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-cyan/20 text-avinya-cyan border border-avinya-cyan/30">
                  Build with Gemma
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-cyan/20 text-avinya-cyan border border-avinya-cyan/30">
                  Battle of Bands
                </span>
              </div>
            </div>
          </div>

          {/* Island 3 Announcement Overlay (Active around t = 0.80 to 0.98) */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-center items-start px-6 sm:px-16 pointer-events-none transition-all duration-500"
            style={{
              opacity:
                voyageProgress >= 0.80 && voyageProgress <= 0.98
                  ? 1
                  : 0,
              transform: `translateY(${
                voyageProgress >= 0.80 && voyageProgress <= 0.98 ? 0 : 20
              }px)`,
            }}
          >
            <div className="max-w-xl glass-panel p-6 sm:p-8 rounded-2xl border border-avinya-magenta/30 bg-black/60 shadow-[0_0_30px_rgba(255,0,127,0.2)]">
              <span className="font-mono text-xs uppercase tracking-widest text-avinya-magenta flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                DAY 03 ARCHIPELAGO • MARCH 14, 2027
              </span>
              <h2 className="font-orbitron text-2xl sm:text-4xl font-black text-white mt-2">
                THE CARNIVAL ISLAND
              </h2>
              <p className="font-syne text-sm text-avinya-magenta mt-1 font-medium">
                Festival Night Carnival & Pro DJ Night
              </p>
              <p className="font-grotesk text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
                The grand finale illuminated by the glowing Ferris wheel and festival lanterns. Featuring Kernel Panic Linux Fest, high-fashion runway, awards ceremony, and an unforgettable closing rave.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-magenta/20 text-avinya-magenta border border-avinya-magenta/30">
                  Kernel Panic (Linux)
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-magenta/20 text-avinya-magenta border border-avinya-magenta/30">
                  Fashion Show
                </span>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-avinya-magenta/20 text-avinya-magenta border border-avinya-magenta/30">
                  Festival DJ Night
                </span>
              </div>
            </div>
          </div>

          {/* Connected Glassmorphic Island HUD Cards at Bottom */}
          <VoyageHUD
            progress={voyageProgress}
            onSelectWaypoint={handleSelectWaypoint}
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. GROUND DETAIL SECTIONS: ABOUT, CHRONOMETER, EVENTS    */}
      {/* ======================================================== */}
      <div className="relative z-20 bg-gradient-to-b from-transparent via-[#030408]/95 to-[#020306] backdrop-blur-md pt-16">
        {/* Navigation Chronometer Strip */}
        <NavigationChronometer />

        {/* Section: About Avinya 2027 */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-avinya-cyan/30 bg-avinya-cyan/10 font-mono text-xs text-avinya-cyan mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                THE TECHNO-CULTURAL FLAGSHIP OF IIIT DHARWAD
              </div>
              <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white leading-tight">
                <CyberScramble text="WHERE CODE, HARDWARE & ARTISTRY COLLIDE" />
              </h2>
              <p className="font-grotesk text-base text-white/70 mt-6 leading-relaxed">
                Avinya 2027 marks the monumental annual gathering at the Indian Institute of Information Technology, Dharwad. Bringing together thousands of visionary technologists, artists, and competitors from institutions across India.
              </p>
              <p className="font-grotesk text-base text-white/70 mt-3 leading-relaxed">
                Designed as a navigable 3-day voyage, every day completely transforms the campus into a cinematic realm—from the spice-scorched frontiers of The Last Outpost to the pulsing cybernetic streets of The Pandemonium and the bioluminescent fireworks of The Carnival Island.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 font-mono">
                <div>
                  <span className="text-[10px] text-white/40 block">DATES</span>
                  <span className="font-orbitron text-sm sm:text-base font-bold text-avinya-gold">
                    MAR 12-14
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">TOTAL EVENTS</span>
                  <span className="font-orbitron text-sm sm:text-base font-bold text-avinya-cyan">
                    24 OFFICIAL
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">VENUE</span>
                  <span className="font-orbitron text-sm sm:text-base font-bold text-avinya-magenta">
                    IIIT CAMPUS
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Glass Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-avinya-gold/40 transition-colors">
                <span className="font-mono text-xs text-avinya-gold font-semibold">DAY 01</span>
                <h3 className="font-orbitron text-xl font-bold text-white mt-1">Dune Desert</h3>
                <p className="text-xs text-white/60 font-grotesk mt-2">
                  The Last Outpost. High-stakes CP relays, AI reverse-prompting, and theatrical dramatics under the desert sun.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-avinya-cyan/40 transition-colors">
                <span className="font-mono text-xs text-avinya-cyan font-semibold">DAY 02</span>
                <h3 className="font-orbitron text-xl font-bold text-white mt-1">Synthwave</h3>
                <p className="text-xs text-white/60 font-grotesk mt-2">
                  The Pandemonium. FPGA quantum circuits, Google Gemma autonomous agents, and a deafening Battle of Bands.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-avinya-magenta/40 transition-colors">
                <span className="font-mono text-xs text-avinya-magenta font-semibold">DAY 03</span>
                <h3 className="font-orbitron text-xl font-bold text-white mt-1">Carnival Night</h3>
                <p className="text-xs text-white/60 font-grotesk mt-2">
                  The Carnival Island. Linux kernel workshops, runway couture, awards ceremony, and an unforgettable pro DJ night.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-white/40">NATIONAL ARENA</span>
                  <h3 className="font-orbitron text-xl font-bold text-white mt-1">Hack2Future</h3>
                  <p className="text-xs text-white/60 font-grotesk mt-2">
                    36-hour non-stop flagship hackathon with ₹3,00,000+ prize pool.
                  </p>
                </div>
                <a
                  href="#hack2future"
                  className="inline-flex items-center gap-1 text-xs font-mono text-avinya-cyan mt-4 font-semibold"
                >
                  VIEW SPRINT <ArrowUpRight className="w-3.5 h-3.5" />
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
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-white/15 relative overflow-hidden bg-black/80">
            <span className="font-mono text-xs uppercase tracking-widest text-avinya-magenta flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              OFFICIAL REGISTRATION GATEWAY
            </span>

            <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white mt-3">
              <CyberScramble text="CLAIM YOUR ALL-ACCESS PASS" />
            </h2>

            <p className="font-grotesk text-white/70 max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Open to undergraduate and postgraduate delegates from technical and cultural colleges nationwide. Access all 24 events, pro-nights, workshops, and food/lodging amenities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => alert("Delegate Registration Gateway: Pass secured for Avinya 2027! See you on campus March 12-14.")}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-avinya-cyan via-purple-600 to-avinya-magenta text-white font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(255,0,127,0.6)] transition-all"
                data-cursor-text="REGISTER"
              >
                Procure All-Access Delegate Pass
              </button>
              <a
                href="#events"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-orbitron font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white/10 transition-all"
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
            <span className="font-orbitron font-bold text-white text-sm">AVINYA 2027</span>
            <span>|</span>
            <span>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, DHARWAD</span>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-6">
            <span>MARCH 12, 13 & 14, 2027</span>
            <span className="text-avinya-cyan">15.2917° N, 75.0505° E</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
