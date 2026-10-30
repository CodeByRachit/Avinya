'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
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
} from 'lucide-react';
import { FestEvent } from '@/data/events';

export interface MilestoneItem {
  id: string;
  nodeNumber: string;
  badge: string;
  date: string;
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
    badge: 'INAUGURATION',
    date: 'Mar 5',
    title: 'Official Launch',
    description:
      'Inauguration ceremony and official release of the problem statements. The mission begins now.',
    icon: Rocket,
    tags: ['Kickoff', 'Mission Intel', 'IIIT Dharwad'],
  },
  {
    id: 'reg-live',
    nodeNumber: '02',
    badge: 'REGISTRATION OPEN',
    date: 'Mar 7',
    title: 'Registration Live',
    description:
      'Registrations are now live on Devfolio. Sign up to participate in the challenge.',
    icon: FileCode,
    tags: ['Devfolio', 'Nationwide', 'Free Pass'],
  },
  {
    id: 'hatch-sealed',
    nodeNumber: '03',
    badge: 'REGISTRATION CLOSES',
    date: 'Mar 18 (Extended)',
    title: 'Hatch Sealed',
    description:
      'Registration closes on March 18th(Extended). Secure your spot before the portal shuts for good.',
    icon: Lock,
    tags: ['Final Call', 'Lock-in', 'Portal Shutdown'],
  },
  {
    id: 'mentorship',
    nodeNumber: '04',
    badge: 'PHASE 01: INTEL',
    date: 'Mar 20',
    title: 'Problem Statements & Mentorship',
    description:
      'Deep dive AMA sessions with industry veterans, release of problem statements across 4 technological tracks.',
    icon: Terminal,
    tags: ['Mentorship', 'Architecture', 'Tech Stacks'],
  },
  {
    id: 'day1-outpost',
    nodeNumber: '05',
    badge: 'EXPEDITION DAY 01',
    date: 'Mar 12, 09:00 AM',
    title: 'Day 1: The Last Outpost',
    description:
      'Gates unlock at IIIT Dharwad campus. Arid sandstone canyon aesthetics, photography contests, and dramatic theatre kickoffs under the desert sun.',
    icon: Compass,
    tags: ['The Last Outpost', 'Campus Arrival', 'Pi Block'],
  },
  {
    id: 'day2-pandemonium',
    nodeNumber: '06',
    badge: 'EXPEDITION DAY 02',
    date: 'Mar 13, 08:30 AM',
    title: 'Day 2: The Pandemonium & Hack2Future',
    description:
      '36-Hour continuous hackathon marathon kicks into high gear. Google Gemma autonomous agents, quantum circuits, and high-voltage Battle of Bands.',
    icon: Cpu,
    tags: ['36h Sprint', 'Battle of Bands', 'Main Ground'],
  },
  {
    id: 'pitching',
    nodeNumber: '07',
    badge: 'GRAND EVALUATION',
    date: 'Mar 14, 02:00 PM',
    title: 'Jury Pitching & Demo Day',
    description:
      'Top finalist teams showcase working prototypes to national tech leaders, venture capitalists, and faculty jury.',
    icon: Trophy,
    tags: ['₹3,00,000 Prize', 'Venture Jury', 'Final Demos'],
  },
  {
    id: 'day3-carnival',
    nodeNumber: '08',
    badge: 'EXPEDITION DAY 03',
    date: 'Mar 14, 07:30 PM',
    title: 'The Carnival Island Finale & DJ Night',
    description:
      'Grand award felicitations, runway fashion showcase, and an unforgettable celebrity DJ night under the nocturnal stars.',
    icon: Sparkles,
    tags: ['Carnival Night', 'Pro DJ Night', 'Closing Show'],
  },
];

// High-fidelity SVG Space Shuttle Pointer with dynamic rotation & thruster plume
interface SpaceShuttleProps {
  rotation: number;
}

function SpaceShuttlePointer({ rotation }: SpaceShuttleProps) {
  return (
    <motion.div
      animate={{
        rotate: rotation,
      }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 20,
        mass: 0.8,
      }}
      className="relative w-16 h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
    >
      {/* Warm Ambient Pulsing Aura */}
      <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl animate-pulse" />

      {/* Thruster exhaust beam glowing behind the engines */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3.5 h-10 bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[2px] opacity-90 animate-pulse" />

      {/* SVG Space Orbiter */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.65)]"
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
        <ellipse cx="50" cy="108" rx="5" ry="10" fill="url(#thrusterGlow)" />
        <ellipse cx="43" cy="104" rx="3.5" ry="7" fill="url(#thrusterGlow)" />
        <ellipse cx="57" cy="104" rx="3.5" ry="7" fill="url(#thrusterGlow)" />

        {/* Main Delta Wings */}
        <path
          d="M 50 25 L 82 88 L 72 94 L 50 90 L 28 94 L 18 88 Z"
          fill="url(#wingGrad)"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Wing Leading Edges (Heat Tiles) */}
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

        {/* Black Nose Cap (Thermal Protection) */}
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
    </motion.div>
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
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [bankAngle, setBankAngle] = useState(0);

  // Normalize data: If events are passed, convert them into milestone timeline items
  const timelineItems: MilestoneItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;

    if (events && events.length > 0) {
      return events.map((e, idx) => ({
        id: e.id,
        nodeNumber: String(idx + 1).padStart(2, '0'),
        badge: `DAY 0${e.day} · ${e.category.toUpperCase()}`,
        date: `${e.date.split(',')[0]} · ${e.time.split('-')[0].trim()}`,
        title: e.title,
        description: e.description,
        icon: e.category === 'technical' ? Cpu : Sparkles,
        tags: [e.club, e.venue, ...(e.tags || [])],
        eventData: e,
      }));
    }

    return MISSION_MILESTONES;
  }, [items, events]);

  // Framer Motion Scroll Progress for the shuttle pointer and glowing rail
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 85%'],
  });

  // Track global scroll delta to detect scroll direction (down vs up)
  useMotionValueEvent(scrollY, 'change', (current) => {
    const prev = scrollY.getPrevious() ?? current;
    const diff = current - prev;
    if (diff > 1) {
      setIsScrollingDown(true);
    } else if (diff < -1) {
      setIsScrollingDown(false);
    }
  });

  // Calculate subtle banking tilt as shuttle navigates between alternating nodes
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const segments = Math.max(4, timelineItems.length);
    // Smooth roll banking tilt between -7 deg and +7 deg
    const bank = Math.sin(latest * Math.PI * segments) * 7;
    setBankAngle(bank);
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);
  const pointerTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Direction angle:
  // When scrolling DOWN: Base is 180° (nose pointing downwards, thrusters at top firing upwards)
  // When scrolling UP: Base is 0° (nose pointing upwards, thrusters at bottom firing downwards)
  const shuttleRotation = isScrollingDown ? 180 - bankAngle : 0 + bankAngle;

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-12 px-4 sm:px-6">
      {/* Background Central Rail (Static Dark Line) */}
      <div className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[2px] -translate-x-1/2 bg-white/10" />

      {/* Animated Glowing Rail tracked to Scroll */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-12 bottom-12 w-[2px] -translate-x-1/2 origin-top"
        style={{
          scaleY: lineScaleY,
          background: `linear-gradient(180deg, #38bdf8 0%, ${accentColor} 50%, #f43f5e 100%)`,
          boxShadow: `0 0 14px ${accentColor}90`,
        }}
      />

      {/* Traveling Space Shuttle Pointer along the Rail */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-12 z-20"
        style={{
          top: pointerTop,
        }}
      >
        <SpaceShuttlePointer rotation={shuttleRotation} />
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
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-2 border shadow-sm"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}50`,
                        color: accentColor,
                        boxShadow: `0 0 14px ${accentColor}25`,
                      }}
                    >
                      {item.badge}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {item.date}
                    </h3>
                  </div>
                ) : (
                  /* Node 02, 04, 06: Left side displays the Card */
                  <div
                    onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                    className={`w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/90 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 text-left shadow-[0_16px_40px_rgba(0,0,0,0.6)] group ${
                      item.eventData ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          borderColor: `${accentColor}40`,
                          color: accentColor,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.eventData && (
                      <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW DETAILS</span>
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
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#07090e] border-2 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-white shadow-[0_0_18px_rgba(0,0,0,0.9)] transition-all duration-300"
                  style={{
                    borderColor: `${accentColor}80`,
                    boxShadow: `0 0 16px ${accentColor}40`,
                  }}
                >
                  <span style={{ color: accentColor }}>{item.nodeNumber}</span>
                </div>
              </div>

              {/* ======================================================== */}
              {/* DESKTOP RIGHT SIDE                                      */}
              {/* ======================================================== */}
              <div className="w-full md:w-1/2 md:pl-14 pl-14 flex flex-col items-start text-left">
                {isEven ? (
                  /* Node 01, 03, 05: Right side displays the Card */
                  <div
                    onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                    className={`w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/90 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] group ${
                      item.eventData ? 'cursor-pointer' : ''
                    }`}
                  >
                    {/* On Mobile: Display Badge & Date at top of the card */}
                    <div className="flex md:hidden flex-wrap items-center gap-2 mb-3">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border"
                        style={{
                          backgroundColor: `${accentColor}18`,
                          borderColor: `${accentColor}50`,
                          color: accentColor,
                        }}
                      >
                        {item.badge}
                      </span>
                      <span className="font-syne text-xs font-bold text-white/80">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          borderColor: `${accentColor}40`,
                          color: accentColor,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h4>
                    </div>

                    <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 border border-white/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.eventData && (
                      <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW DETAILS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ) : (
                  /* Node 02, 04, 06: Right side displays Milestone Badge & Date */
                  <div className="flex flex-col items-start">
                    {/* On Mobile: Also show card below badge */}
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-2 border shadow-sm"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        borderColor: `${accentColor}50`,
                        color: accentColor,
                        boxShadow: `0 0 14px ${accentColor}25`,
                      }}
                    >
                      {item.badge}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {item.date}
                    </h3>

                    {/* Mobile fallback for odd cards */}
                    <div
                      onClick={() => item.eventData && onOpenModal && onOpenModal(item.eventData)}
                      className={`md:hidden mt-3 w-full max-w-md p-6 rounded-2xl bg-[#0c101a]/90 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] group ${
                        item.eventData ? 'cursor-pointer' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border"
                          style={{
                            backgroundColor: `${accentColor}15`,
                            borderColor: `${accentColor}40`,
                            color: accentColor,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <p className="font-grotesk text-white/60 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                          {item.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/50 border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.eventData && (
                        <div className="mt-3 flex items-center justify-end text-xs font-mono text-amber-300 gap-1 group-hover:translate-x-1 transition-transform">
                          <span>VIEW DETAILS</span>
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
