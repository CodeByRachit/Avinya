'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Rocket,
  FileCode,
  Lock,
  Terminal,
  Compass,
  Cpu,
  Trophy,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ArrowUpRight,
  LucideIcon,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { FestEvent } from '@/data/events';
import { useLenis } from '@/components/providers/SmoothScroll';

export interface MilestoneItem {
  id: string;
  nodeNumber: string;
  phaseCode: string;
  badge: string;
  date: string;
  timeSlot: string;
  location: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
  eventData?: FestEvent;
}

export const MISSION_MILESTONES: MilestoneItem[] = [
  {
    id: 'launch',
    nodeNumber: '01',
    phaseCode: 'PHASE 01 // LAUNCH PROTOCOL',
    badge: 'INAUGURATION',
    date: 'Mar 5, 2027',
    timeSlot: '10:00 AM IST',
    location: 'Official Portal',
    title: 'Official Launch',
    description:
      'Inauguration ceremony and official release of the problem statements. The mission begins now.',
    icon: Rocket,
    tags: ['Kickoff', 'Mission Intel', 'IIIT Dharwad'],
  },
  {
    id: 'reg-live',
    nodeNumber: '02',
    phaseCode: 'PHASE 02 // ACCESS PASSES',
    badge: 'REGISTRATION OPEN',
    date: 'Mar 7, 2027',
    timeSlot: '12:00 PM IST',
    location: 'Devfolio Gateway',
    title: 'Registration Live',
    description:
      'Registrations are now live on Devfolio. Sign up to participate in the challenge.',
    icon: FileCode,
    tags: ['Devfolio', 'Nationwide', 'Free Pass'],
  },
  {
    id: 'hatch-sealed',
    nodeNumber: '03',
    phaseCode: 'PHASE 03 // AIRLOCK LOCK-IN',
    badge: 'REGISTRATION CLOSES',
    date: 'Mar 18 (Extended)',
    timeSlot: '11:59 PM IST',
    location: 'Portal Shutdown',
    title: 'Hatch Sealed',
    description:
      'Registration closes on March 18th(Extended). Secure your spot before the portal shuts for good.',
    icon: Lock,
    tags: ['Final Call', 'Lock-in', 'Portal Shutdown'],
  },
  {
    id: 'mentorship',
    nodeNumber: '04',
    phaseCode: 'PHASE 04 // INTEL BRIEFING',
    badge: 'PHASE 01: INTEL',
    date: 'Mar 20, 2027',
    timeSlot: '04:00 PM IST',
    location: 'Discord & Stream',
    title: 'Problem Statements & Mentorship',
    description:
      'Deep dive AMA sessions with industry veterans, release of problem statements across 4 technological tracks.',
    icon: Terminal,
    tags: ['Mentorship', 'Architecture', 'Tech Stacks'],
  },
  {
    id: 'day1-outpost',
    nodeNumber: '05',
    phaseCode: 'PHASE 05 // OUTPOST ARRIVAL',
    badge: 'EXPEDITION DAY 01',
    date: 'Mar 12, 09:00 AM',
    timeSlot: 'All-Day Marathon',
    location: 'IIIT Dharwad Campus',
    title: 'Day 1: The Last Outpost',
    description:
      'Gates unlock at IIIT Dharwad campus. Arid sandstone canyon aesthetics, photography contests, and dramatic theatre kickoffs under the desert sun.',
    icon: Compass,
    tags: ['The Last Outpost', 'Campus Arrival', 'Pi Block'],
  },
  {
    id: 'day2-pandemonium',
    nodeNumber: '06',
    phaseCode: 'PHASE 06 // CONTINUOUS SPRINT',
    badge: 'EXPEDITION DAY 02',
    date: 'Mar 13, 08:30 AM',
    timeSlot: '36-Hour Hackathon',
    location: 'Incubation Complex & Main Ground',
    title: 'Day 2: The Pandemonium & Hack2Future',
    description:
      '36-Hour continuous hackathon marathon kicks into high gear. Google Gemma autonomous agents, quantum circuits, and high-voltage Battle of Bands.',
    icon: Cpu,
    tags: ['36h Sprint', 'Battle of Bands', 'Main Ground'],
  },
  {
    id: 'pitching',
    nodeNumber: '07',
    phaseCode: 'PHASE 07 // GRAND JURY EVALUATION',
    badge: 'GRAND EVALUATION',
    date: 'Mar 14, 02:00 PM',
    timeSlot: 'Demo Showcase',
    location: 'Auditorium AUD-260',
    title: 'Jury Pitching & Demo Day',
    description:
      'Top finalist teams showcase working prototypes to national tech leaders, venture capitalists, and faculty jury.',
    icon: Trophy,
    tags: ['₹3,00,000 Prize', 'Venture Jury', 'Final Demos'],
  },
  {
    id: 'day3-carnival',
    nodeNumber: '08',
    phaseCode: 'PHASE 08 // NOCTURNAL SPECTACLE',
    badge: 'EXPEDITION DAY 03',
    date: 'Mar 14, 07:30 PM',
    timeSlot: 'Night Finale',
    location: 'Central Campus Arena',
    title: 'The Carnival Island Finale & DJ Night',
    description:
      'Grand award felicitations, runway fashion showcase, and an unforgettable celebrity DJ night under the nocturnal stars.',
    icon: Sparkles,
    tags: ['Carnival Night', 'Pro DJ Night', 'Closing Show'],
  },
];

// High-fidelity SVG Space Shuttle Graphic
function SpaceShuttleGraphic() {
  return (
    <div className="relative w-16 h-20 pointer-events-none select-none">
      {/* Warm Ambient Pulsing Aura */}
      <div className="absolute inset-0 rounded-full bg-amber-500/35 blur-xl animate-pulse" />

      {/* Thruster exhaust beam glowing behind the engines */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3.5 h-10 bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[2px] opacity-95 animate-pulse" />

      {/* SVG Space Orbiter */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-[0_4px_18px_rgba(245,158,11,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="thrusterGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Thruster Exhaust Plumes */}
        <ellipse cx="50" cy="108" rx="5.5" ry="11" fill="url(#thrusterGlow)" />
        <ellipse cx="43" cy="104" rx="3.5" ry="7.5" fill="url(#thrusterGlow)" />
        <ellipse cx="57" cy="104" rx="3.5" ry="7.5" fill="url(#thrusterGlow)" />

        {/* Main Delta Wings */}
        <path
          d="M 50 25 L 82 88 L 72 94 L 50 90 L 28 94 L 18 88 Z"
          fill="url(#wingGrad)"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Wing Leading Edges (Dark Heat Shield Tiles) */}
        <path
          d="M 50 25 L 82 88 L 79 90 L 50 28 L 21 90 L 18 88 Z"
          fill="#1e293b"
        />

        {/* Fuselage / Main Body */}
        <path
          d="M 50 14 C 44 24 43 70 43 96 L 57 96 C 57 70 56 24 50 14 Z"
          fill="url(#fuselageGrad)"
          stroke="#334155"
          strokeWidth="1"
        />

        {/* Black Nose Cap (Thermal Protection Nose Tip) */}
        <path
          d="M 50 14 C 47 19 46 25 46 28 L 54 28 C 54 25 53 19 50 14 Z"
          fill="#0f172a"
        />

        {/* Cockpit Canopy Windows */}
        <polygon points="48,32 50,30 52,32 50,34" fill="#38bdf8" opacity="0.95" />
        <polygon points="45,34 48,33 48,36 45,36" fill="#0284c7" />
        <polygon points="55,34 52,33 52,36 55,36" fill="#0284c7" />

        {/* Vertical Stabilizer Tail Fin */}
        <path d="M 50 54 L 50 96 L 48 94 L 48 60 Z" fill="#64748b" />
        <path d="M 50 54 L 52 60 L 52 94 L 50 96 Z" fill="#94a3b8" />

        {/* OMS Engine Pods */}
        <rect x="40" y="88" width="5" height="10" rx="2" fill="#334155" />
        <rect x="55" y="88" width="5" height="10" rx="2" fill="#334155" />
        <rect x="47.5" y="92" width="5" height="10" rx="2" fill="#1e293b" />
      </svg>
    </div>
  );
}

interface ScrollTimelineProps {
  items?: MilestoneItem[];
  events?: FestEvent[];
  onOpenModal?: (event: FestEvent) => void;
  accentColor?: string;
}

export default function ScrollTimeline({
  items,
  events,
  onOpenModal,
  accentColor = '#f59e0b',
}: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // By default, since user is reading top-to-bottom, shuttle points DOWN (180deg)
  const [isScrollingDown, setIsScrollingDown] = useState(true);

  // Normalize data: If events are passed, convert them into milestone timeline items
  const timelineItems: MilestoneItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;

    if (events && events.length > 0) {
      return events.map((e, idx) => ({
        id: e.id,
        nodeNumber: String(idx + 1).padStart(2, '0'),
        phaseCode: `DAY 0${e.day} // ${e.category.toUpperCase()}`,
        badge: `DAY 0${e.day}`,
        date: `${e.date.split(',')[0]}`,
        timeSlot: e.time,
        location: e.venue,
        title: e.title,
        description: e.description,
        icon: e.category === 'technical' ? Cpu : Sparkles,
        tags: [e.club, e.venue, ...(e.tags || [])],
        eventData: e,
      }));
    }

    return MISSION_MILESTONES;
  }, [items, events]);

  // Robust, multi-signal scroll direction detection:
  // Listens directly to window wheel, window scroll delta, and Lenis smooth scroll
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    // 1. Wheel listener: Detects trackpad/mouse wheel instantly on first tick
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setIsScrollingDown(true); // Scrolling down -> TIP POINTS DOWN (180 deg)
      } else if (e.deltaY < 0) {
        setIsScrollingDown(false); // Scrolling up -> TIP POINTS UP (0 deg)
      }
    };

    // 2. Window scroll delta: Catches touch drag, keyboard arrow keys, and scrollbars
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (delta > 2) {
        setIsScrollingDown(true); // Moving down -> TIP POINTS DOWN
      } else if (delta < -2) {
        setIsScrollingDown(false); // Moving up -> TIP POINTS UP
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Lenis scroll listener
    if (lenis) {
      const unbindLenis = lenis.on('scroll', (e: { direction: number }) => {
        if (e.direction === 1) setIsScrollingDown(true);
        else if (e.direction === -1) setIsScrollingDown(false);
      });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('scroll', handleScroll);
        if (typeof unbindLenis === 'function') unbindLenis();
      };
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lenis]);

  // Framer Motion Scroll Progress for the shuttle pointer and glowing rail
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const pointerTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Target Rotation:
  // When scrolling DOWN: 180° -> nose tip points straight DOWN
  // When scrolling UP: 0° -> nose tip points straight UP
  const targetRotation = isScrollingDown ? 180 : 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Background Central Rail (Static Dark Line) */}
      <div className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[2px] -translate-x-1/2 bg-white/10" />

      {/* Animated Glowing Rail tracked to Scroll (Unified Amber Gold Theme) */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[2px] -translate-x-1/2 origin-top"
        style={{
          scaleY: lineScaleY,
          background: 'linear-gradient(180deg, #f59e0b 0%, #fbbf24 60%, #ea580c 100%)',
          boxShadow: '0 0 16px rgba(245, 158, 11, 0.85)',
        }}
      />

      {/* Traveling Space Shuttle Pointer along the Rail */}
      {/* Outer wrapper handles the positioning & centering without interfering with CSS rotate */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-12 z-20 pointer-events-none select-none"
        style={{
          top: pointerTop,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Inner element handles clean rotation: 180deg when scrolling down, 0deg when scrolling up */}
        <div
          style={{
            transform: `rotate(${targetRotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="relative w-16 h-20"
        >
          <SpaceShuttleGraphic />
        </div>
      </motion.div>

      {/* Alternating Milestone Items */}
      <div className="space-y-16 sm:space-y-24 relative z-10">
        {timelineItems.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col md:flex-row items-start md:items-center w-full"
            >
              {/* ======================================================== */}
              {/* DESKTOP LEFT SIDE                                       */}
              {/* ======================================================== */}
              <div className="w-full md:w-1/2 md:pr-14 hidden md:flex flex-col items-end text-right">
                {isEven ? (
                  /* Node 01, 03, 05: Left side displays the Milestone Badge & Date */
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-widest block mb-1">
                      {item.phaseCode}
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-2 border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      {item.badge}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {item.date}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono text-white/50">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.timeSlot}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                ) : (
                  /* Node 02, 04, 06: Left side displays the Creative Card */
                  <div
                    onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                    className={`w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/95 backdrop-blur-xl border border-white/15 hover:border-amber-400/60 transition-all duration-300 text-left shadow-[0_16px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] group relative overflow-hidden ${
                      item.eventData ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Top ambient glow on hover */}
                    <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />

                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-amber-400/35 bg-amber-400/10 text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10">
                        {item.phaseCode}
                      </span>
                    </div>

                    <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>

                    <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed my-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-white/50 mb-3 pt-3 border-t border-white/[0.08]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.timeSlot}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.07]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.eventData && (
                      <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW INTEL</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* CENTRAL NUMBERED NODE                                   */}
              {/* ======================================================== */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#07090e] border-2 border-amber-400/80 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-300">
                    <span className="text-amber-400">{item.nodeNumber}</span>
                  </div>
                </div>
              </div>

              {/* ======================================================== */}
              {/* DESKTOP RIGHT SIDE                                      */}
              {/* ======================================================== */}
              <div className="w-full md:w-1/2 md:pl-14 pl-14 flex flex-col items-start text-left">
                {isEven ? (
                  /* Node 01, 03, 05: Right side displays the Creative Card */
                  <div
                    onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                    className={`w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/95 backdrop-blur-xl border border-white/15 hover:border-amber-400/60 transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.25)] group relative overflow-hidden ${
                      item.eventData ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* Top ambient glow on hover */}
                    <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />

                    {/* On Mobile: Display Phase, Badge & Date at top of the card */}
                    <div className="flex md:hidden flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border border-amber-400/40 bg-amber-400/10 text-amber-300">
                        {item.badge}
                      </span>
                      <span className="font-syne text-xs font-bold text-white/80">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-amber-400/35 bg-amber-400/10 text-amber-400 shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10 hidden md:inline-block">
                        {item.phaseCode}
                      </span>
                    </div>

                    <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h4>

                    <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed my-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-white/50 mb-3 pt-3 border-t border-white/[0.08]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {item.timeSlot}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.07]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.eventData && (
                      <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW INTEL</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ) : (
                  /* Node 02, 04, 06: Right side displays Milestone Badge & Date */
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[10px] text-amber-400/80 uppercase tracking-widest block mb-1">
                      {item.phaseCode}
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-2 border border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      {item.badge}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {item.date}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs font-mono text-white/50">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.timeSlot}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{item.location}</span>
                    </div>

                    {/* Mobile fallback for odd cards */}
                    <div
                      onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                      className={`md:hidden mt-3 w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/95 backdrop-blur-xl border border-white/15 hover:border-amber-400/60 transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] group relative overflow-hidden ${
                        item.eventData ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-amber-400/35 bg-amber-400/10 text-amber-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-white/50 mb-3 pt-3 border-t border-white/[0.08]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {item.timeSlot}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          {item.location}
                        </span>
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.07]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.eventData && (
                        <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                          <span>VIEW INTEL</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
