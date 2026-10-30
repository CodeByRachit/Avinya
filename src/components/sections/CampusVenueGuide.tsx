'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Users,
  Calendar,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import CyberScramble from '@/components/ui/CyberScramble';
import { useLenis } from '@/components/providers/SmoothScroll';

interface CampusVenue {
  id: string;
  name: string;
  code: string;
  capacity: string;
  location: string;
  landmark: string;
  eventsHosted: string[];
  amenities: string[];
  accentColor: string;
}

const CAMPUS_VENUES: CampusVenue[] = [
  {
    id: '260-seater',
    name: '260 Seater Auditorium',
    code: 'AUD-260',
    capacity: '260 Delegates',
    location: 'Academic Complex, Level 2',
    landmark: 'Adjacent to Central Library stairs',
    eventsHosted: [
      'Code Royale 3v3 Relay',
      'AI Arcade Reverse-Prompting',
      'Drama Competition (Limelight)',
      'Yukti 2.0 Quantum Hack',
      'Build with Gemma (Agentic AI)',
    ],
    amenities: ['Dual 4K Projectors', 'Wired Ethernet Drops', 'Tiered Acoustic Seating'],
    accentColor: '#00f0ff',
  },
  {
    id: '120-seater',
    name: '120 Seater Hall',
    code: 'HALL-120',
    capacity: '120 Delegates',
    location: 'Academic Block, Ground Floor',
    landmark: 'West Wing Corridor next to Cafeteria',
    eventsHosted: [
      'Music Competition (440 hz)',
      'Just A Minute / JAM (Zeitgeist)',
      'Quiz Quest (Inquizitive)',
      'Kernel Panic (Linux Festival)',
    ],
    amenities: ['Studio Soundstage', 'Podium Mics', 'Digital Scoreboard'],
    accentColor: '#ffb300',
  },
  {
    id: '240-seater',
    name: '240 Seater Lecture Theatre',
    code: 'LT-240',
    capacity: '240 Delegates',
    location: 'Academic Complex, Level 1',
    landmark: 'Main Quadrangle Entrance',
    eventsHosted: ['Debate Competition (Zeitgeist)', 'Mega Rush 2.0 Esports Stage'],
    amenities: ['Amphitheater Acoustics', 'Dual Screen Output', 'High-Speed Wi-Fi 6'],
    accentColor: '#ff007f',
  },
  {
    id: 'incubation-hall',
    name: 'Incubation & Innovation Hall',
    code: 'INC-HUB',
    capacity: '180+ Builders',
    location: 'Research & Incubation Complex',
    landmark: 'Near Startup Park & Lab Corridors',
    eventsHosted: [
      'Hack2Future 36-Hour Hackathon',
      'Monopoly Stock Simulation',
      'Yukti 2.0 Hardware Hack',
    ],
    amenities: ['24/7 Power UPS Backup', 'Dedicated Mentorship Bays', 'Snack & Coffee Stations'],
    accentColor: '#00ffa3',
  },
  {
    id: 'main-ground',
    name: 'Main Festival Ground',
    code: 'STG-OPEN',
    capacity: '2,500+ Attendees',
    location: 'Central Campus Arena',
    landmark: 'Surrounded by Sports Complex & Food Promenade',
    eventsHosted: [
      'Group Dance Competition (Dynamight)',
      'Battle of Bands (440 hz)',
      'Street Play (Limelight)',
      'Fashion Show (InMotion)',
      'Closing Ceremony & Prize Distribution',
      'Grand Festival DJ Night (Artist)',
    ],
    amenities: ['Concert Line-Array Audio', 'Moving-Head Laser Rig', 'Emergency Response Hub'],
    accentColor: '#d946ef',
  },
  {
    id: 'm-block',
    name: 'M Block Pavilion',
    code: 'BLK-M',
    capacity: '200 Delegates',
    location: 'Student Activity Zone',
    landmark: 'North Courtyard Pavilion',
    eventsHosted: ['Solo and Duet Dance (Dynamight)'],
    amenities: ['Wooden Sprung Dance Floor', 'Green Rooms', 'Full-Length Mirrors'],
    accentColor: '#f43f5e',
  },
  {
    id: 'pi-block',
    name: 'Pi Block (Backside & Courtyard)',
    code: 'BLK-PI',
    capacity: 'Open Campus',
    location: 'Mathematical & Science Wing',
    landmark: 'Behind Pi Block Sculptural Lawn',
    eventsHosted: ['Photography Contest (Iridescence)'],
    amenities: ['Architectural Shadow Vistas', 'Golden Hour Vantage Points'],
    accentColor: '#eab308',
  },
  {
    id: 'front-gate-e-block',
    name: 'Front Gate E Block',
    code: 'GATE-E',
    capacity: '1,000+ Attendees',
    location: 'Main University Entrance Portico',
    landmark: 'Campus Grand Entry Gate',
    eventsHosted: ['Opening Ceremony and Cultural Night (Mosaic)'],
    amenities: ['Registration Canopy', 'ID Verification Desk', 'Illuminated Archway'],
    accentColor: '#38bdf8',
  },
  {
    id: 'labs-l405-c404',
    name: 'Computing Labs L405-L407 & C404',
    code: 'LAB-COMP',
    capacity: '180 Gaming Rigs',
    location: 'Computing Center, 4th Floor',
    landmark: 'Central IT Wing Elevators',
    eventsHosted: ['Mega Rush 2.0 Esports LAN (Techniosys)'],
    amenities: ['Gigabit Isolated LAN Switches', '240Hz High-FPS Displays', 'Ergonomic Stations'],
    accentColor: '#a855f7',
  },
];

export default function CampusVenueGuide() {
  const { lenis } = useLenis();
  const [selectedVenue, setSelectedVenue] = useState<CampusVenue>(CAMPUS_VENUES[0]);
  const listRef = useRef<HTMLDivElement>(null);

  // Allow scrolling the venue list, but when the user hits the top or bottom boundary,
  // pass the scroll through to the webpage naturally
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      const isAtBottom = el.scrollTop >= maxScroll - 6;
      const isAtTop = el.scrollTop <= 6;

      // When at boundary and attempting to scroll past, chain to webpage scroll
      if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
        if (lenis) {
          lenis.scrollTo(lenis.scroll + e.deltaY * 1.2, { immediate: false, duration: 0.25 });
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
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] font-grotesk text-xs text-white/80 mb-3">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider">CAMPUS RADAR · ON-GROUND DIRECTORY</span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl font-bold text-white tracking-tight">
            <CyberScramble text="CAMPUS VENUE GUIDE" />
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            Navigate the 9 official competition venues and auditoriums across the IIIT Dharwad campus for seamless movement during the 3-day fest.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/50 bg-white/[0.03] px-4 py-2 rounded-xl border border-white/10">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>IIIT DHARWAD • HUBBALLI-DHARWAD, KARNATAKA</span>
        </div>
      </div>

      {/* Main Interactive Guide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Venue Selector List (9 Venues) - Fully Scrollable */}
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
            {CAMPUS_VENUES.map((venue) => {
              const isSelected = selectedVenue.id === venue.id;

              return (
                <button
                  key={venue.id}
                  type="button"
                  onClick={() => setSelectedVenue(venue)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)] translate-x-1'
                      : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                  style={{
                    borderLeftColor: venue.accentColor,
                    borderLeftWidth: '4px',
                  }}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-white/40 font-bold uppercase">
                        {venue.code}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="font-mono text-[10px] text-white/60">
                        {venue.capacity}
                      </span>
                    </div>
                    <h4 className="font-syne text-sm sm:text-base font-bold text-white mt-1 group-hover:text-amber-100 transition-colors truncate">
                      {venue.name}
                    </h4>
                    <span className="font-grotesk text-xs text-white/50 block mt-0.5 truncate">
                      {venue.location}
                    </span>
                  </div>

                  <div
                    className="w-2.5 h-2.5 rounded-full transition-transform duration-200 shrink-0"
                    style={{
                      backgroundColor: venue.accentColor,
                      transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                      boxShadow: isSelected ? `0 0 10px ${venue.accentColor}` : 'none',
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Scroll hint indicator */}
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-center text-[11px] font-mono text-white/40 flex items-center justify-between">
            <span>9 VENUES TOTAL</span>
            <span className="text-white/60">SCROLL LIST TO EXPLORE ALL ↓</span>
          </div>
        </div>

        {/* Right Active Venue Details Display Card */}
        <div className="lg:col-span-7">
          <div
            className="p-6 sm:p-8 rounded-2xl border border-white/[0.12] bg-[#0c101a]/90 backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            style={{
              borderColor: `${selectedVenue.accentColor}40`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-md border"
                style={{
                  backgroundColor: `${selectedVenue.accentColor}15`,
                  borderColor: `${selectedVenue.accentColor}35`,
                  color: selectedVenue.accentColor,
                }}
              >
                VENUE · {selectedVenue.code}
              </span>
              <span className="font-mono text-xs text-white/60 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-white/40" />
                {selectedVenue.capacity}
              </span>
            </div>

            <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedVenue.name}
            </h3>

            {/* Campus Landmark & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 font-grotesk text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[10px] text-white/40 block mb-1 font-mono uppercase tracking-wider">
                  BUILDING & LEVEL
                </span>
                <span className="text-white font-medium text-sm">{selectedVenue.location}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-[10px] text-white/40 block mb-1 font-mono uppercase tracking-wider">
                  WALKING LANDMARK
                </span>
                <span className="text-white font-medium text-sm">{selectedVenue.landmark}</span>
              </div>
            </div>

            {/* Events Hosted At This Venue */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/45 mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                SCHEDULED EVENTS AT THIS VENUE ({selectedVenue.eventsHosted.length})
              </h4>
              <div className="space-y-2">
                {selectedVenue.eventsHosted.map((eventTitle) => (
                  <div
                    key={eventTitle}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between group hover:border-white/20 transition-colors"
                  >
                    <span className="font-grotesk text-xs sm:text-sm text-white font-medium">
                      {eventTitle}
                    </span>
                    <a
                      href="#events"
                      className="text-cyan-400 text-xs font-mono inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
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
                ON-SITE FACILITIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVenue.amenities.map((facility) => (
                  <span
                    key={facility}
                    className="font-grotesk text-xs px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/80 inline-flex items-center gap-1.5"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
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
