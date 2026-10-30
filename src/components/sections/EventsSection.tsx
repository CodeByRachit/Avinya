'use client';

import React, { useState, useMemo } from 'react';
import { FEST_EVENTS, FestEvent, EventCategory, EventDay } from '@/data/events';
import TiltEventCard from '@/components/ui/TiltEventCard';
import EventModal from '@/components/ui/EventModal';
import CyberScramble from '@/components/ui/CyberScramble';
import {
  Calendar,
  Filter,
  Search,
  Sparkles,
  Terminal,
  Compass,
  Flame,
  X,
  Layers,
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

export default function EventsSection() {
  const [selectedDay, setSelectedDay] = useState<'all' | EventDay>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalEvent, setModalEvent] = useState<FestEvent | null>(null);

  // Dynamic theme accent based on active Day
  const currentAccent = useMemo(() => {
    return DAY_THEME_ACCENTS[String(selectedDay)] || DAY_THEME_ACCENTS.all;
  }, [selectedDay]);

  // Filter events
  const filteredEvents = useMemo(() => {
    return FEST_EVENTS.filter((e) => {
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

      return matchesDay && matchesCategory && matchesSearch;
    });
  }, [selectedDay, selectedCategory, searchQuery]);

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
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-3 font-grotesk text-xs">
            <span
              className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500"
              style={{ backgroundColor: currentAccent.color }}
            />
            <span className="uppercase tracking-widest text-white/70 font-mono text-[11px]">
              FESTIVAL SCHEDULE · 24 FLAGSHIP EVENTS
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            <CyberScramble text="FLAGSHIP EVENTS" />
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            Explore 24 competitions across Cultural spectacles and Technical / Quantum engineering challenges.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search event, club (Mosaic, Dynamight), venue..."
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

      {/* Filtering HUD: Day Selector Tabs */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-2">
        {/* Day Selector Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
          {[
            { id: 'all' as const, label: 'All Days', badge: '24 Events' },
            { id: 1 as const, label: 'Day 1: The Last Outpost (Mar 12)', color: '#ffb300' },
            { id: 2 as const, label: 'Day 2: The Pandemonium (Mar 13)', color: '#ff007f' },
            { id: 3 as const, label: 'Day 3: The Carnival Island (Mar 14)', color: '#00f0ff' },
          ].map((tab) => {
            const isSelected = selectedDay === tab.id;
            return (
              <button
                key={String(tab.id)}
                type="button"
                onClick={() => setSelectedDay(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-grotesk font-medium tracking-wide transition-all duration-300 flex items-center gap-2 ${
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
            { id: 'cultural' as const, label: 'Cultural Fest' },
            { id: 'technical' as const, label: 'Technical & AI/Quantum' },
          ].map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-grotesk tracking-wider uppercase transition-all ${
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

      {/* Active Filter Metrics Readout */}
      <div className="flex items-center justify-between text-xs font-grotesk text-white/40 mb-8 px-2">
        <div className="flex items-center gap-2">
          <span>Active Deck:</span>
          <strong className="text-white font-medium" style={{ color: currentAccent.color }}>
            {currentAccent.label}
          </strong>
        </div>
        <span className="font-mono text-[11px]">SHOWING {filteredEvents.length} OF 24 EVENTS</span>
      </div>

      {/* 3D Perspective Tilt Event Cards Grid */}
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

      {filteredEvents.length === 0 && (
        <div className="text-center py-24 glass-panel rounded-2xl border border-white/10">
          <Terminal className="w-8 h-8 text-white/30 mx-auto mb-3" />
          <p className="font-orbitron text-lg font-bold text-white">NO EVENTS MATCHED CURRENT FILTERS</p>
          <p className="font-grotesk text-xs text-white/50 mt-1">
            Try adjusting your search query or switching back to "All Days" and "All Tracks".
          </p>
          <button
            onClick={() => {
              setSelectedDay('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full border border-avinya-cyan/40 bg-avinya-cyan/10 font-mono text-xs text-avinya-cyan hover:bg-avinya-cyan/20 transition-colors"
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

