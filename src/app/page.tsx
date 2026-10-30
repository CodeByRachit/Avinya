'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { FEST_EVENTS, DAY_THEMES, EventCategory, EventDay } from '@/data/events';
import HeroOverlay from '@/components/sections/HeroOverlay';
import VoyageHUD from '@/components/hud/VoyageHUD';
import { useLenis } from '@/components/providers/SmoothScroll';
import {
  Calendar,
  MapPin,
  Sparkles,
  Terminal,
  Flame,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock,
  Compass,
  Search,
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
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [selectedDay, setSelectedDay] = useState<'all' | EventDay>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter events based on active category, day, and search query
  const filteredEvents = FEST_EVENTS.filter((e) => {
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesDay = selectedDay === 'all' || e.day === selectedDay;
    const matchesSearch =
      searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDay && matchesSearch;
  });

  return (
    <main className="relative w-full min-h-screen text-white">
      {/* ======================================================== */}
      {/* 1. FIXED 3D WEBGL VOYAGE CANVAS & BIOLUMINESCENT OCEAN   */}
      {/* ======================================================== */}
      <VoyageCanvas progress={voyageProgress} />

      {/* ======================================================== */}
      {/* 2. DEDICATED 3D VOYAGE SCROLL TRACK (300vh of 3D Steer) */}
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
      {/* 3. GROUND DETAIL SECTIONS: EVENTS, HACKATHON & ACCESS    */}
      {/* ======================================================== */}
      <div className="relative z-20 bg-gradient-to-b from-transparent via-[#030408]/90 to-[#020306] backdrop-blur-md pt-20">
        {/* Section: About Avinya 2027 */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-avinya-cyan/30 bg-avinya-cyan/10 font-mono text-xs text-avinya-cyan mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                THE TECHNO-CULTURAL FLAGSHIP OF IIIT DHARWAD
              </div>
              <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white leading-tight">
                WHERE CODE, HARDWARE & ARTISTRY COLLIDE
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

        {/* Section: Complete 24 Events Arena with Interactive Controls */}
        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-avinya-cyan flex items-center gap-2">
                <Compass className="w-3.5 h-3.5" />
                COMPLETE OFFICIAL SCHEDULE
              </span>
              <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white mt-2">
                THE 24 ARENA EVENTS
              </h2>
              <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
                Filter by track or day to explore all 17 cultural celebrations and 7 engineering showdowns.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search event, club, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 font-grotesk text-xs focus:outline-none focus:border-avinya-cyan transition-colors"
              />
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-white/40 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> TRACK:
              </span>
              {(['all', 'cultural', 'technical'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-grotesk uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? cat === 'cultural'
                        ? 'bg-avinya-magenta text-white font-bold shadow-[0_0_15px_rgba(255,0,127,0.5)]'
                        : cat === 'technical'
                        ? 'bg-avinya-cyan text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                        : 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                      : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {cat === 'all' ? 'All (24)' : cat === 'cultural' ? 'Cultural (17)' : 'Technical (7)'}
                </button>
              ))}
            </div>

            {/* Day filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-white/40 mr-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> DAY:
              </span>
              {(['all', 1, 2, 3] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedDay === d
                      ? 'bg-gradient-to-r from-avinya-cyan to-avinya-magenta text-white font-bold'
                      : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {d === 'all' ? 'All 3 Days' : `Day 0${d}`}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isTech = event.category === 'technical';
              const accentColor = isTech ? '#00f0ff' : '#ff007f';

              return (
                <div
                  key={event.id}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top Day & Category Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-semibold"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          color: accentColor,
                          border: `1px solid ${accentColor}35`,
                        }}
                      >
                        DAY 0{event.day} • {event.category.toUpperCase()}
                      </span>
                      <span className="text-white/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time.split('-')[0].trim()}
                      </span>
                    </div>

                    <h3 className="font-orbitron text-xl font-bold text-white group-hover:text-avinya-cyan transition-colors">
                      {event.title}
                    </h3>

                    {/* Club metadata */}
                    <div className="mt-2 text-xs font-grotesk text-white/70">
                      <span className="font-mono text-avinya-gold font-semibold">Organizing Club: </span>
                      <span className="text-white font-medium">{event.club}</span>
                    </div>

                    {/* Venue */}
                    <div className="mt-1 text-xs font-mono text-white/50 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-avinya-cyan/70 shrink-0" />
                      <span>{event.venue}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-xs sm:text-sm text-white/70 font-grotesk leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Footer Tags & Meta */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono pt-1 text-white/50">
                      <span>TEAM: {event.teamSize || 'Individual'}</span>
                      <a
                        href="#register"
                        className="text-avinya-cyan font-bold hover:underline flex items-center gap-1"
                      >
                        REGISTER <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 font-mono text-white/50">
              NO EVENTS MATCHED CRITERIA. RESET FILTERS TO EXPLORE ALL 24 ARENAS.
            </div>
          )}
        </section>

        {/* Section: Hack2Future Flagship Hackathon */}
        <section id="hack2future" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-avinya-cyan/30 relative overflow-hidden bg-gradient-to-br from-avinya-cyan/10 via-black/80 to-avinya-magenta/10 shadow-[0_0_60px_rgba(0,240,255,0.15)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-avinya-cyan/20 border border-avinya-cyan/40 text-avinya-cyan font-mono text-xs uppercase tracking-wider mb-4">
                <Flame className="w-4 h-4 text-avinya-cyan animate-pulse" />
                FLAGSHIP NATIONAL 36-HOUR HACKATHON
              </div>

              <h2 className="font-orbitron text-4xl sm:text-6xl font-black text-white tracking-tight">
                HACK2FUTURE
              </h2>

              <p className="font-syne text-lg text-white/80 font-medium mt-2">
                March 12-14, 2027 • IIIT Dharwad Campus
              </p>

              <p className="font-grotesk text-white/70 text-sm sm:text-base mt-4 leading-relaxed">
                The centerpiece engineering competition of Avinya 2027. Bring together a squad of 2 to 4 visionaries and build across Autonomous Agentic AI, Quantum Cryptography, Hardware/FPGA integration, and Decentralized Infrastructure.
              </p>

              {/* Hackathon Key Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 font-mono">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/40 block">PRIZE POOL</span>
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-avinya-gold">
                    ₹3,00,000+
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/40 block">DURATION</span>
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                    36 HOURS
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/40 block">SQUAD SIZE</span>
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-avinya-cyan">
                    2-4 MEMBERS
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/40 block">VENUE</span>
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-avinya-magenta">
                    INCUBATION HALL
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#register"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-avinya-cyan to-avinya-magenta text-white font-orbitron font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(255,0,127,0.6)] transition-all"
                  data-cursor-text="APPLY"
                >
                  Register Team for Hack2Future
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Register / Pass Procurement */}
        <section id="register" className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-white/15 relative overflow-hidden bg-black/80">
            <span className="font-mono text-xs uppercase tracking-widest text-avinya-magenta flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              OFFICIAL REGISTRATION GATEWAY
            </span>

            <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white mt-3">
              CLAIM YOUR ALL-ACCESS PASS
            </h2>

            <p className="font-grotesk text-white/70 max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
              Open to undergraduate and postgraduate delegates from technical and cultural colleges nationwide. Access all 24 events, pro-nights, workshops, and food/lodging amenities.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
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

            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-mono text-white/40">
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
