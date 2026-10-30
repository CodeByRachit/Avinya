'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import CyberScramble from '@/components/ui/CyberScramble';

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
  const [selectedVenue, setSelectedVenue] = useState<CampusVenue>(CAMPUS_VENUES[0]);

  return (
    <section id="venues" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-28">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-avinya-cyan/30 bg-avinya-cyan/10 font-mono text-xs text-avinya-cyan mb-3">
            <Navigation className="w-3.5 h-3.5 text-avinya-cyan" />
            <span>CAMPUS RADAR // ON-GROUND DIRECTORY</span>
          </div>

          <h2 className="font-orbitron text-3xl sm:text-5xl font-black text-white tracking-tight">
            <CyberScramble text="CAMPUS VENUE GUIDE" />
          </h2>

          <p className="font-grotesk text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            Navigate the 9 official competition venues and auditoriums across the IIIT Dharwad campus for seamless movement during the 3-day fest.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-white/50 bg-white/[0.03] px-4 py-2 rounded-xl border border-white/10">
          <MapPin className="w-4 h-4 text-avinya-gold" />
          <span>IIIT DHARWAD • HUBBALLI-DHARWAD, KARNATAKA</span>
        </div>
      </div>

      {/* Main Interactive Guide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Venue Selector List (9 Venues) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 max-h-[580px] overflow-y-auto pr-1">
          {CAMPUS_VENUES.map((venue) => {
            const isSelected = selectedVenue.id === venue.id;

            return (
              <button
                key={venue.id}
                type="button"
                onClick={() => setSelectedVenue(venue)}
                className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isSelected
                    ? 'glass-panel bg-white/10 border-white/40 shadow-lg scale-[1.01]'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
                style={{
                  borderLeftColor: venue.accentColor,
                  borderLeftWidth: '4px',
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/40 font-bold uppercase">
                      {venue.code}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="font-mono text-[10px] text-white/60">
                      {venue.capacity}
                    </span>
                  </div>
                  <h4 className="font-orbitron text-sm sm:text-base font-bold text-white mt-1 group-hover:text-avinya-cyan transition-colors">
                    {venue.name}
                  </h4>
                  <span className="font-grotesk text-xs text-white/50 block mt-0.5 truncate">
                    {venue.location}
                  </span>
                </div>

                <div
                  className="w-2.5 h-2.5 rounded-full transition-transform duration-200 shrink-0 ml-2"
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

        {/* Right Active Venue Details Display Card */}
        <div className="lg:col-span-7">
          <div
            className="glass-panel p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300"
            style={{
              borderColor: `${selectedVenue.accentColor}50`,
              boxShadow: `0 0 40px -10px ${selectedVenue.accentColor}25`,
            }}
          >
            {/* Top Glow Stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${selectedVenue.accentColor}, transparent)`,
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: `${selectedVenue.accentColor}18`,
                  borderColor: `${selectedVenue.accentColor}40`,
                  color: selectedVenue.accentColor,
                }}
              >
                SECTOR // {selectedVenue.code}
              </span>
              <span className="font-mono text-xs text-white/60 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {selectedVenue.capacity}
              </span>
            </div>

            <h3 className="font-orbitron text-2xl sm:text-3xl font-black text-white">
              {selectedVenue.name}
            </h3>

            {/* Campus Landmark & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-white/40 block mb-1">BUILDING & LEVEL</span>
                <span className="text-white font-medium">{selectedVenue.location}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-white/40 block mb-1">WALKING LANDMARK</span>
                <span className="text-white font-medium">{selectedVenue.landmark}</span>
              </div>
            </div>

            {/* Events Hosted At This Venue */}
            <div className="mb-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-avinya-cyan" />
                SCHEDULED EVENTS AT THIS VENUE ({selectedVenue.eventsHosted.length})
              </h4>
              <div className="space-y-2">
                {selectedVenue.eventsHosted.map((eventTitle) => (
                  <div
                    key={eventTitle}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors"
                  >
                    <span className="font-grotesk text-xs sm:text-sm text-white font-medium">
                      {eventTitle}
                    </span>
                    <a
                      href="#events"
                      className="text-avinya-cyan text-xs font-mono inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      SCHEDULE <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue Amenities */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                ON-SITE FACILITIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVenue.amenities.map((facility) => (
                  <span
                    key={facility}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70"
                  >
                    ✓ {facility}
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
