'use client';

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { FEST_EVENTS, FestEvent, EventCategory, EventDay } from '@/data/events';
import TiltEventCard from '@/components/ui/TiltEventCard';
import EventModal from '@/components/ui/EventModal';
import { useLenis } from '@/components/providers/SmoothScroll';
import {
  Calendar,
  Search,
  Sparkles,
  Terminal,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  GitCommit,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';

const DAY_THEME_ACCENTS: Record<string, { color: string; label: string; shadow: string; glowRgba: string }> = {
  all: {
    color: '#e08a3c',
    label: 'All Days Archipelago',
    shadow: 'rgba(224, 138, 60, 0.25)',
    glowRgba: 'rgba(224, 138, 60, 0.08)',
  },
  '1': {
    color: '#e08a3c',
    label: 'Day 1: The Last Outpost (Mar 12)',
    shadow: 'rgba(224, 138, 60, 0.3)',
    glowRgba: 'rgba(224, 138, 60, 0.1)',
  },
  '2': {
    color: '#e11d48',
    label: 'Day 2: The Pandemonium (Mar 13)',
    shadow: 'rgba(225, 29, 72, 0.3)',
    glowRgba: 'rgba(225, 29, 72, 0.1)',
  },
  '3': {
    color: '#f59e0b',
    label: 'Day 3: The Carnival Island (Mar 14)',
    shadow: 'rgba(245, 158, 11, 0.3)',
    glowRgba: 'rgba(245, 158, 11, 0.1)',
  },
};

// Helper: Parse start time in minutes from midnight for exact chronological sorting
function parseEventMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const startPart = timeStr.split('-')[0].trim();
  const match = startPart.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export default function EventsSection() {
  const { lenis } = useLenis();
  const [selectedDay, setSelectedDay] = useState<'all' | EventDay>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'slots' | 'grid'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalEvent, setModalEvent] = useState<FestEvent | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Dynamic theme accent based on active Day
  const currentAccent = useMemo(() => {
    return DAY_THEME_ACCENTS[String(selectedDay)] || DAY_THEME_ACCENTS.all;
  }, [selectedDay]);

  // Filter & sort events chronologically
  const filteredEvents = useMemo(() => {
    const list = FEST_EVENTS.filter((e) => {
      const matchesDay = selectedDay === 'all' || e.day === selectedDay;
      const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();

      const matchesSearch =
        q === '' ||
        e.title.toLowerCase().includes(q) ||
        e.club.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((tag) => tag.toLowerCase().includes(q));

      // Time of day filter
      const mins = parseEventMinutes(e.time);
      let matchesTime = true;
      if (timeFilter === 'morning') matchesTime = mins < 720; // before 12:00 PM
      else if (timeFilter === 'afternoon') matchesTime = mins >= 720 && mins < 1080; // 12 PM - 6 PM
      else if (timeFilter === 'evening') matchesTime = mins >= 1080; // 6 PM onwards

      return matchesDay && matchesCategory && matchesSearch && matchesTime;
    });

    // Chronological order: Day first, then start time
    return list.sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return parseEventMinutes(a.time) - parseEventMinutes(b.time);
    });
  }, [selectedDay, selectedCategory, timeFilter, searchQuery]);

  // Handle scroll tracking on horizontal timeline
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const current = el.scrollLeft;
    setScrollProgress(Math.min(100, Math.max(0, (current / maxScroll) * 100)));
    setCanScrollLeft(current > 8);
    setCanScrollRight(current < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, filteredEvents, viewMode]);

  // Map mouse wheel vertically to horizontal scroll inside timeline stream,
  // and immediately pass through to webpage scroll when at start or end
  useEffect(() => {
    if (viewMode !== 'timeline') return;
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll <= 0) return;

        const isAtEnd = el.scrollLeft >= maxScroll - 4;
        const isAtStart = el.scrollLeft <= 4;

        if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 0.9;
        } else if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtStart)) {
          // Reached the boundary: pass scroll to webpage immediately without lag
          if (lenis) {
            lenis.scrollTo(window.scrollY + e.deltaY, { immediate: true });
          } else {
            window.scrollBy({ top: e.deltaY, behavior: 'auto' });
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [viewMode, lenis]);

  const scrollByAmount = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="events"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-28 transition-colors duration-700"
    >
      {/* Background Section Glow shifting dynamically with active day */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full blur-[180px] -z-10 transition-all duration-700"
        style={{
          background: currentAccent.glowRgba,
        }}
      />

      {/* Header & Section Telemetry */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-3 font-grotesk text-xs">
            <span
              className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500"
              style={{ backgroundColor: currentAccent.color }}
            />
            <span className="uppercase tracking-widest text-white/70 font-mono text-[11px]">
              FESTIVAL TIMELINE · 24 FLAGSHIP EVENTS
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Flagship Events
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            Arranged chronologically from morning kickoff to nocturnal spectacles across Cultural & Technical tracks.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search event, club (Mosaic, 440 hz), venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 font-grotesk text-xs focus:outline-none focus:border-white/30 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Filter Bar: Days & Tracks */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-4 flex flex-wrap items-center justify-between gap-2">
        {/* Day Selector Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
          {[
            { id: 'all' as const, label: 'All Days', badge: '24 Events' },
            { id: 1 as const, label: 'Day 1: The Last Outpost', color: '#ffb300' },
            { id: 2 as const, label: 'Day 2: The Pandemonium', color: '#ff007f' },
            { id: 3 as const, label: 'Day 3: The Carnival Island', color: '#00f0ff' },
          ].map((tab) => {
            const isSelected = selectedDay === tab.id;
            return (
              <button
                key={String(tab.id)}
                type="button"
                onClick={() => setSelectedDay(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-grotesk font-medium tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
                style={{
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  border: isSelected ? `1px solid ${currentAccent.color}80` : '1px solid transparent',
                  boxShadow: isSelected ? `0 0 15px ${currentAccent.shadow}` : 'none',
                }}
              >
                {tab.color && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tab.color }}
                  />
                )}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto mt-2 lg:mt-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
          {[
            { id: 'all' as const, label: 'All Tracks' },
            { id: 'cultural' as const, label: 'Cultural' },
            { id: 'technical' as const, label: 'Technical' },
          ].map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-grotesk font-medium tracking-wide transition-all cursor-pointer ${
                  isCatActive
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Bar: Time-of-Day Slots & View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-1">
        {/* Time Slots Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-white/40" /> TIME:
          </span>
          {[
            { id: 'all' as const, label: 'All Time Slots' },
            { id: 'morning' as const, label: 'Morning (9 AM - 12 PM)', icon: Sun },
            { id: 'afternoon' as const, label: 'Afternoon (1 PM - 5 PM)', icon: Sunset },
            { id: 'evening' as const, label: 'Evening (6 PM+)', icon: Moon },
          ].map((slot) => {
            const isActive = timeFilter === slot.id;
            const Icon = slot.icon;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setTimeFilter(slot.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-grotesk transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white font-medium border border-white/30'
                    : 'bg-white/[0.02] text-white/50 hover:text-white/80 border border-white/5 hover:border-white/15'
                }`}
              >
                {Icon && <Icon className="w-3 h-3 text-white/50" />}
                <span>{slot.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher & Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/40 hidden sm:inline-block">
            {filteredEvents.length} OF 24 EVENTS
          </span>

          <div className="inline-flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-2.5 py-1 rounded-lg text-xs font-grotesk font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Time Stream</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('slots')}
              className={`px-2.5 py-1 rounded-lg text-xs font-grotesk font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'slots'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Agenda</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg text-xs font-grotesk font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. CHRONOLOGICAL TIMELINE STREAM VIEW (Horizontal Rail)  */}
      {/* ========================================================= */}
      {viewMode === 'timeline' && filteredEvents.length > 0 && (
        <div className="relative">
          {/* Scroll Navigation Header & Progress Tracker */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="font-mono text-xs text-white/60 uppercase tracking-wider">
                CHRONOLOGICAL TIME LINE · SCROLL HORIZONTALLY
              </span>
            </div>

            {/* Left/Right Smooth Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount(-380)}
                disabled={!canScrollLeft}
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(380)}
                disabled={!canScrollRight}
                className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Continuous Chronological Scroll Stream */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overscroll-contain pb-6 pt-2 select-none"
            data-lenis-prevent="true"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.03)',
            }}
          >
            {filteredEvents.map((event, idx) => (
              <div
                key={event.id}
                className="w-[320px] sm:w-[360px] shrink-0 flex flex-col"
              >
                {/* Time Indicator Stem & Node linked to Timeline Rail */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[11px] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{event.time.split('-')[0].trim()}</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                  <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
                </div>

                {/* The Clean Event Card */}
                <div className="h-[380px]">
                  <TiltEventCard
                    event={event}
                    onOpenModal={(e) => setModalEvent(e)}
                    accentGlowColor={currentAccent.color}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Visual Track Progress Line */}
          <div className="mt-4 px-1">
            <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${Math.max(8, scrollProgress)}%`,
                  background: `linear-gradient(90deg, #38bdf8, ${currentAccent.color})`,
                  boxShadow: `0 0 10px ${currentAccent.color}80`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 mt-2">
              <span>START OF DAY · 09:00 AM</span>
              <span>{Math.round(scrollProgress)}% EXPLORED</span>
              <span>NIGHT FINALE · 11:00 PM</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. AGENDA TIME SLOTS VIEW (Vertical Chronological Rail)  */}
      {/* ========================================================= */}
      {viewMode === 'slots' && filteredEvents.length > 0 && (
        <div className="space-y-12">
          {[
            {
              id: 'morning',
              title: 'Morning Block',
              slot: '09:00 AM – 12:30 PM',
              icon: Sun,
              color: '#38bdf8',
              events: filteredEvents.filter((e) => parseEventMinutes(e.time) < 720),
            },
            {
              id: 'afternoon',
              title: 'Afternoon Arena',
              slot: '01:00 PM – 05:30 PM',
              icon: Sunset,
              color: '#e08a3c',
              events: filteredEvents.filter((e) => {
                const m = parseEventMinutes(e.time);
                return m >= 720 && m < 1080;
              }),
            },
            {
              id: 'evening',
              title: 'Evening & Night Pro Showcase',
              slot: '06:00 PM – 11:00 PM',
              icon: Moon,
              color: '#ec4899',
              events: filteredEvents.filter((e) => parseEventMinutes(e.time) >= 1080),
            },
          ]
            .filter((session) => session.events.length > 0)
            .map((session) => {
              const Icon = session.icon;
              return (
                <div key={session.id} className="relative">
                  {/* Session Header with Time Node */}
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center border"
                      style={{
                        backgroundColor: `${session.color}15`,
                        borderColor: `${session.color}40`,
                        color: session.color,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-syne text-lg sm:text-xl font-bold text-white">
                        {session.title}
                      </h3>
                      <span className="font-mono text-xs text-white/50 block">
                        {session.slot} · {session.events.length} Events Scheduled
                      </span>
                    </div>
                  </div>

                  {/* Grid for this specific time block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {session.events.map((event) => (
                      <TiltEventCard
                        key={event.id}
                        event={event}
                        onOpenModal={(e) => setModalEvent(e)}
                        accentGlowColor={session.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. CLASSIC GRID VIEW                                     */}
      {/* ========================================================= */}
      {viewMode === 'grid' && filteredEvents.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <TiltEventCard
              key={event.id}
              event={event}
              onOpenModal={(e) => setModalEvent(e)}
              accentGlowColor={currentAccent.color}
            />
          ))}
        </div>
      )}

      {/* Zero State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-2xl border border-white/10">
          <Terminal className="w-8 h-8 text-white/30 mx-auto mb-3" />
          <p className="font-syne text-lg font-bold text-white">NO EVENTS MATCHED CURRENT FILTERS</p>
          <p className="font-grotesk text-xs text-white/50 mt-1">
            Try adjusting your search query, switching back to "All Days" or changing time slots.
          </p>
          <button
            onClick={() => {
              setSelectedDay('all');
              setSelectedCategory('all');
              setTimeFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 font-mono text-xs text-cyan-300 hover:bg-cyan-400/20 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      <EventModal
        event={modalEvent}
        onClose={() => setModalEvent(null)}
      />
    </section>
  );
}
