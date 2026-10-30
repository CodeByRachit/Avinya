'use client';

import React, { useRef, useState } from 'react';
import { FestEvent } from '@/data/events';
import { MapPin, Clock, ArrowUpRight, Sparkles, Users } from 'lucide-react';

interface TiltEventCardProps {
  event: FestEvent;
  onOpenModal: (event: FestEvent) => void;
  accentGlowColor: string;
}

export default function TiltEventCard({
  event,
  onOpenModal,
}: TiltEventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const isTech = event.category === 'technical';
  const accentDotColor = isTech ? '#38bdf8' : '#fb7185';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, elegant micro-tilt (max 3.5 deg)
    const rotateX = -((y - centerY) / centerY) * 3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(event)}
        className="relative w-full h-full rounded-2xl p-6 flex flex-col justify-between cursor-pointer border transition-all duration-200 ease-out overflow-hidden group select-none bg-[#0c101a]/85 hover:bg-[#101524]/95 backdrop-blur-xl"
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            : '0 8px 24px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)',
        }}
        data-cursor-text="VIEW"
      >
        {/* Subtle, soft specular sheen on hover */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(380px circle at ${glowPos.x}px ${glowPos.y}px, rgba(255, 255, 255, 0.05), transparent 70%)`,
            }}
          />
        )}

        {/* Card Body */}
        <div className="relative z-10">
          {/* Top Bar: Clean Tag & Time Slot */}
          <div className="flex items-center justify-between text-xs mb-3.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide bg-white/[0.04] border border-white/[0.08] text-white/80">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: accentDotColor,
                    boxShadow: `0 0 8px ${accentDotColor}80`,
                  }}
                />
                <span>Day {event.day} · {isTech ? 'Technical' : 'Cultural'}</span>
              </span>

              {event.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-400/10 border border-amber-400/20 text-amber-300">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>

            <span className="text-white/50 flex items-center gap-1.5 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-white/40" />
              {event.time}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-syne text-xl sm:text-[22px] font-bold text-white tracking-tight leading-snug group-hover:text-amber-100 transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Organizer & Venue Metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-white/60 font-grotesk">
            <span className="inline-flex items-center gap-1.5">
              <span className="text-white/40 text-[11px] uppercase tracking-wider font-mono">By</span>
              <span className="font-semibold text-white/90">{event.club}</span>
            </span>
            <span className="text-white/25">•</span>
            <span className="inline-flex items-center gap-1.5 text-white/60 truncate">
              <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
          </div>

          {/* Event Description */}
          <p className="mt-3 text-xs sm:text-[13px] text-white/65 font-grotesk leading-relaxed line-clamp-2">
            {event.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.03] text-white/50 border border-white/[0.06] group-hover:border-white/10 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 mt-5 pt-3.5 border-t border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-white/50 font-grotesk">
            <Users className="w-3.5 h-3.5 text-white/40" />
            <span>{event.teamSize || 'Individual'}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(event);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.05] group-hover:bg-white/[0.12] text-white/80 group-hover:text-white border border-white/[0.08] group-hover:border-white/20 transition-all duration-200"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
