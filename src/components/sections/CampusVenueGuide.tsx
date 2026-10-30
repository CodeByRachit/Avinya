'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Users,
  Calendar,
  ArrowUpRight,
  Check,
  Building,
  Compass,
  Footprints,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLenis } from '@/components/providers/SmoothScroll';

interface CampusVenue {
  id: string;
  name: string;
  code: string;
  zone: string;
  capacity: string;
  location: string;
  landmark: string;
  walkTime: string;
  category: 'auditorium' | 'outdoor' | 'lab';
  eventsHosted: string[];
  amenities: string[];
}

const CAMPUS_VENUES: CampusVenue[] = [
  {
    id: '260-seater',
    name: '260 Seater Auditorium',
    code: 'AUD-260',
    zone: 'Zone A · Academic Core',
    category: 'auditorium',
    capacity: '260 Delegates',
    location: 'Academic Complex, Level 2',
    landmark: 'Adjacent to Central Library stairs',
    walkTime: '1 min from Main Quad',
    eventsHosted: [
      'Code Royale 3v3 Relay',
      'AI Arcade Reverse-Prompting',
      'Drama Competition (Limelight)',
      'Yukti 2.0 Quantum Hack',
      'Build with Gemma (Agentic AI)',
    ],
    amenities: ['Dual 4K Projectors', 'Wired Ethernet Drops', 'Tiered Acoustic Seating'],
  },
  {
    id: '120-seater',
    name: '120 Seater Hall',
    code: 'HALL-120',
    zone: 'Zone A · Academic Core',
    category: 'auditorium',
    capacity: '120 Delegates',
    location: 'Academic Block, Ground Floor',
    landmark: 'West Wing Corridor next to Cafeteria',
    walkTime: '2 min from East Portal',
    eventsHosted: [
      'Music Competition (440 hz)',
      'Just A Minute / JAM (Zeitgeist)',
      'Quiz Quest (Inquizitive)',
      'Kernel Panic (Linux Festival)',
    ],
    amenities: ['Studio Soundstage', 'Podium Mics', 'Digital Scoreboard'],
  },
  {
    id: '240-seater',
    name: '240 Seater Lecture Theatre',
    code: 'LT-240',
    zone: 'Zone A · Academic Core',
    category: 'auditorium',
    capacity: '240 Delegates',
    location: 'Academic Complex, Level 1',
    landmark: 'Main Quadrangle Entrance',
    walkTime: '1 min from Quad',
    eventsHosted: ['Debate Competition (Zeitgeist)', 'Mega Rush 2.0 Esports Stage'],
    amenities: ['Amphitheater Acoustics', 'Dual Screen Output', 'High-Speed Wi-Fi 6'],
  },
  {
    id: 'incubation-hall',
    name: 'Incubation & Innovation Hall',
    code: 'INC-HUB',
    zone: 'Zone C · Innovation Complex',
    category: 'lab',
    capacity: '180+ Builders',
    location: 'Research & Incubation Complex',
    landmark: 'Near Startup Park & Lab Corridors',
    walkTime: '3 min from Main Lawn',
    eventsHosted: [
      'Hack2Future 36-Hour Hackathon',
      'Monopoly Stock Simulation',
      'Yukti 2.0 Hardware Hack',
    ],
    amenities: ['24/7 Power UPS Backup', 'Dedicated Mentorship Bays', 'Snack & Coffee Stations'],
  },
  {
    id: 'main-ground',
    name: 'Main Festival Ground',
    code: 'STG-OPEN',
    zone: 'Zone B · Central Arena',
    category: 'outdoor',
    capacity: '2,500+ Attendees',
    location: 'Central Campus Arena',
    landmark: 'Surrounded by Sports Complex & Food Promenade',
    walkTime: 'Central Gathering Point',
    eventsHosted: [
      'Group Dance Competition (Dynamight)',
      'Battle of Bands (440 hz)',
      'Street Play (Limelight)',
      'Fashion Show (InMotion)',
      'Closing Ceremony & Prize Distribution',
      'Grand Festival DJ Night (Artist)',
    ],
    amenities: ['Concert Line-Array Audio', 'Moving-Head Laser Rig', 'Emergency Response Hub'],
  },
  {
    id: 'm-block',
    name: 'M Block Pavilion',
    code: 'BLK-M',
    zone: 'Zone B · Central Arena',
    category: 'outdoor',
    capacity: '200 Delegates',
    location: 'Student Activity Zone',
    landmark: 'North Courtyard Pavilion',
    walkTime: '2 min from Ground',
    eventsHosted: ['Solo and Duet Dance (Dynamight)'],
    amenities: ['Wooden Sprung Dance Floor', 'Green Rooms', 'Full-Length Mirrors'],
  },
  {
    id: 'pi-block',
    name: 'Pi Block Courtyard',
    code: 'BLK-PI',
    zone: 'Zone A · Academic Core',
    category: 'outdoor',
    capacity: 'Open Campus',
    location: 'Mathematical & Science Wing',
    landmark: 'Behind Pi Block Sculptural Lawn',
    walkTime: '3 min from East Wing',
    eventsHosted: ['Photography Contest (Iridescence)'],
    amenities: ['Architectural Shadow Vistas', 'Golden Hour Vantage Points'],
  },
  {
    id: 'front-gate-e-block',
    name: 'Front Gate E Block',
    code: 'GATE-E',
    zone: 'Zone B · Central Arena',
    category: 'outdoor',
    capacity: '1,000+ Attendees',
    location: 'Main University Entrance Portico',
    landmark: 'Campus Grand Entry Gate',
    walkTime: 'Arrival Reception Area',
    eventsHosted: ['Opening Ceremony and Cultural Night (Mosaic)'],
    amenities: ['Registration Canopy', 'ID Verification Desk', 'Illuminated Archway'],
  },
  {
    id: 'labs-l405-c404',
    name: 'Computing Labs L405-L407',
    code: 'LAB-COMP',
    zone: 'Zone C · Innovation Complex',
    category: 'lab',
    capacity: '180 Gaming Rigs',
    location: 'Computing Center, 4th Floor',
    landmark: 'Central IT Wing Elevators',
    walkTime: '4 min from Quad',
    eventsHosted: ['Mega Rush 2.0 Esports LAN (Techniosys)'],
    amenities: ['Gigabit Isolated LAN Switches', '240Hz High-FPS Displays', 'Ergonomic Stations'],
  },
];

export default function CampusVenueGuide() {
  const { lenis } = useLenis();
  const [selectedVenue, setSelectedVenue] = useState<CampusVenue>(CAMPUS_VENUES[0]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'auditorium' | 'outdoor' | 'lab'>('all');
  const listRef = useRef<HTMLDivElement>(null);

  // Filter venues by category if selected
  const visibleVenues = useMemo(() => {
    if (selectedCategory === 'all') return CAMPUS_VENUES;
    return CAMPUS_VENUES.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  // Keep selected venue in sync with filter
  useEffect(() => {
    if (!visibleVenues.some((v) => v.id === selectedVenue.id)) {
      setSelectedVenue(visibleVenues[0] || CAMPUS_VENUES[0]);
    }
  }, [visibleVenues, selectedVenue]);

  // Wheel boundary pass-through to parent page
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      const isAtBottom = el.scrollTop >= maxScroll - 4;
      const isAtTop = el.scrollTop <= 4;

      if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
        if (lenis) {
          lenis.scrollTo(window.scrollY + e.deltaY, { immediate: true });
        } else {
          window.scrollBy({ top: e.deltaY, behavior: 'auto' });
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [lenis]);

  return (
    <section id="venues" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-28">
      {/* Header matching the Countdown Design Language */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 font-grotesk text-xs text-amber-300 font-medium mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">CAMPUS DIRECTORY · 9 VENUES</span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Campus Venue Guide
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            Navigate the 9 official competition venues and auditoriums across IIIT Dharwad for seamless movement during the 3-day fest.
          </p>
        </div>

        {/* Campus Arena Location Badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-white/70 bg-[#0c101a]/90 px-4 py-2.5 rounded-xl border border-white/10 shadow-sm">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>IIIT DHARWAD · HUBBALLI-DHARWAD, KARNATAKA</span>
        </div>
      </div>

      {/* Category Pills (Unified Luxury Gold/Slate Aesthetic) */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {[
          { id: 'all' as const, label: 'All 9 Venues' },
          { id: 'auditorium' as const, label: 'Auditoriums & Halls' },
          { id: 'outdoor' as const, label: 'Main Ground & Outdoor' },
          { id: 'lab' as const, label: 'Computing & Incubation Labs' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-grotesk font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Guide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Venue Selector List - Clean Luxury Slate Glass */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <div
            ref={listRef}
            className="flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-2 select-none"
            data-lenis-prevent="true"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.03)',
            }}
          >
            {visibleVenues.map((venue) => {
              const isSelected = selectedVenue.id === venue.id;

              return (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => setSelectedVenue(venue)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/15 via-white/[0.04] to-transparent border-amber-400/60 shadow-[0_4px_24px_rgba(245,158,11,0.2)] translate-x-1'
                      : 'bg-[#0c101a]/70 border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-amber-400 font-bold uppercase">
                        {venue.code}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="font-mono text-[10px] text-white/50">
                        {venue.capacity}
                      </span>
                    </div>

                    <h4 className="font-syne text-sm sm:text-base font-bold text-white mt-1 group-hover:text-amber-200 transition-colors truncate">
                      {venue.name}
                    </h4>

                    <span className="font-grotesk text-xs text-white/50 block mt-0.5 truncate">
                      {venue.location}
                    </span>
                  </div>

                  {/* Clean Gold Beacon (Unified single-tone aesthetic) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-amber-400 shadow-[0_0_12px_#f59e0b] scale-125'
                          : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* List Footer Telemetry */}
          <div className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center text-[11px] font-mono text-white/40 flex items-center justify-between">
            <span>{visibleVenues.length} OF 9 VENUES</span>
            <span className="text-white/60">SCROLL TO EXPLORE ALL ↓</span>
          </div>
        </div>

        {/* Right Active Venue Details Display Card */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-[#0c101a]/95 backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            {/* Top Amber Ambient Glow */}
            <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 rounded-full bg-amber-500/10 blur-[90px]" />

            {/* Header Telemetry */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-sm">
                VENUE // {selectedVenue.code}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5">
                  <Footprints className="w-3.5 h-3.5 text-amber-400" />
                  {selectedVenue.walkTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-white/40" />
                  {selectedVenue.capacity}
                </span>
              </div>
            </div>

            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedVenue.name}
            </h3>

            <p className="font-mono text-xs text-amber-400/80 mt-1">
              {selectedVenue.zone}
            </p>

            {/* Campus Landmark & Location Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 font-grotesk text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[10px] text-white/40 block mb-1 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-amber-400" />
                  BUILDING & LEVEL
                </span>
                <span className="text-white font-medium text-sm block">{selectedVenue.location}</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[10px] text-white/40 block mb-1 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-amber-400" />
                  WALKING LANDMARK
                </span>
                <span className="text-white font-medium text-sm block">{selectedVenue.landmark}</span>
              </div>
            </div>

            {/* Scheduled Events At This Venue */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                SCHEDULED EVENTS AT THIS VENUE ({selectedVenue.eventsHosted.length})
              </h4>
              <div className="space-y-2">
                {selectedVenue.eventsHosted.map((eventTitle) => (
                  <div
                    key={eventTitle}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between group hover:border-amber-400/30 hover:bg-white/[0.04] transition-all"
                  >
                    <span className="font-grotesk text-xs sm:text-sm text-white font-medium">
                      {eventTitle}
                    </span>
                    <a
                      href="#events"
                      className="text-amber-300 text-xs font-mono inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    >
                      SCHEDULE <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Amenities */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2.5">
                ON-SITE FACILITIES & INFRASTRUCTURE:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVenue.amenities.map((facility) => (
                  <span
                    key={facility}
                    className="font-grotesk text-xs px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/80 inline-flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-amber-400" />
                    <span>{facility}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
