'use client';

import React, { useState, useMemo } from 'react';
import { FEST_EVENTS, FestEvent, EventCategory, EventDay } from '@/data/events';
import TiltEventCard from '@/components/ui/TiltEventCard';
import EventModal from '@/components/ui/EventModal';
import ScrollTimeline, { MISSION_MILESTONES } from '@/components/ui/ScrollTimeline';
import {
  Calendar,
  Search,
  Sparkles,
  Terminal,
  Clock,
  X,
  LayoutGrid,
  GitCommit,
  Rocket,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';

const DAY_THEME_ACCENTS: Record<string, { color: string; label: string; shadow: string; glowRgba: string }> = {
  all: {
    color: '#f59e0b',
    label: 'All Days Archipelago',
    shadow: 'rgba(245, 158, 11, 0.25)',
    glowRgba: 'rgba(245, 158, 11, 0.08)',
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
  const [selectedDay, setSelectedDay] = useState<'all' | EventDay>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [timelineSource, setTimelineSource] = useState<'mission' | 'events'>('mission');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalEvent, setModalEvent] = useState<FestEvent | null>(null);

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

  // When user filters by Day, category or search, automatically switch to events timeline
  const handleDaySelect = (day: 'all' | EventDay) => {
    setSelectedDay(day);
    if (day !== 'all') {
      setTimelineSource('events');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '') {
      setTimelineSource('events');
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

      {/* Header & Mission Telemetry */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-3 font-grotesk text-xs">
          <span
            className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500"
            style={{ backgroundColor: currentAccent.color }}
          />
          <span className="uppercase tracking-widest text-white/70 font-mono text-[11px]">
            FESTIVAL SEQUENCE · 24 FLAGSHIP EVENTS
          </span>
        </div>

        <h2 className="font-syne text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Timeline
        </h2>

        <p className="font-grotesk text-white/60 text-sm sm:text-base mt-3 max-w-xl">
          Every great mission has a sequence. Here&apos;s yours — from launch to landing.
        </p>

        {/* View Switcher: Vertical Shuttle Timeline vs Compact Grid */}
        <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-grotesk font-semibold inline-flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-grotesk font-semibold inline-flex items-center gap-2 transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid ({filteredEvents.length})</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation Controls: Timeline Source (Mission vs Event Schedule), Day Filter, Search */}
      <div className="glass-panel p-3 rounded-2xl border border-white/10 mb-10 flex flex-wrap items-center justify-between gap-3">
        {/* Sequence Mode Toggle (Mission Roadmap vs 24 Fest Events) */}
        {viewMode === 'timeline' && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/5">
            <button
              type="button"
              onClick={() => setTimelineSource('mission')}
              className={`px-3 py-1.5 rounded-lg text-xs font-grotesk font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                timelineSource === 'mission'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Mission Milestones</span>
            </button>
            <button
              type="button"
              onClick={() => setTimelineSource('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-grotesk font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                timelineSource === 'events'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event Roster ({filteredEvents.length})</span>
            </button>
          </div>
        )}

        {/* Day Selector Tabs (Active when viewing events or grid) */}
        {(timelineSource === 'events' || viewMode === 'grid') && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all' as const, label: 'All Days', badge: '24' },
              { id: 1 as const, label: 'Day 1', color: '#ffb300' },
              { id: 2 as const, label: 'Day 2', color: '#ff007f' },
              { id: 3 as const, label: 'Day 3', color: '#00f0ff' },
            ].map((tab) => {
              const isSelected = selectedDay === tab.id;
              return (
                <button
                  key={String(tab.id)}
                  type="button"
                  onClick={() => handleDaySelect(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-grotesk font-medium tracking-wide transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white/15 text-white border border-white/30 font-semibold'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {tab.color && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="font-mono text-[9px] px-1 rounded bg-white/10 text-white/70">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Search Input */}
        <div className="w-full sm:w-64 relative ml-auto">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search events, clubs, venues..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/40 font-grotesk text-xs focus:outline-none focus:border-white/30 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. SCROLL TIMELINE VIEW (Vertical Shuttle with Reveal)    */}
      {/* ========================================================= */}
      {viewMode === 'timeline' && (
        <div className="relative">
          {timelineSource === 'mission' ? (
            <ScrollTimeline
              items={MISSION_MILESTONES}
              accentColor={currentAccent.color}
            />
          ) : (
            <ScrollTimeline
              events={filteredEvents}
              onOpenModal={(e) => setModalEvent(e)}
              accentColor={currentAccent.color}
            />
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. CLASSIC GRID VIEW                                     */}
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
            Try adjusting your search query, switching back to &quot;All Days&quot; or changing filters.
          </p>
          <button
            onClick={() => {
              setSelectedDay('all');
              setSelectedCategory('all');
              setTimeFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10 font-mono text-xs text-amber-300 hover:bg-amber-400/20 transition-colors cursor-pointer"
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
