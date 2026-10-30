'use client';

import React, { useRef, useState } from 'react';
import { FestEvent } from '@/data/events';
import { MapPin, Clock, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

interface TiltEventCardProps {
  event: FestEvent;
  onOpenModal: (event: FestEvent) => void;
  accentGlowColor: string;
}

export default function TiltEventCard({
  event,
  onOpenModal,
  accentGlowColor,
}: TiltEventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const isTech = event.category === 'technical';
  const eventAccent = isTech ? '#00f0ff' : '#ff007f';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 12; // Max 12deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;

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
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(event)}
        className="relative w-full h-full rounded-2xl glass-panel p-6 flex flex-col justify-between cursor-pointer border transition-transform duration-200 ease-out overflow-hidden group select-none"
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          borderColor: isHovered ? `${eventAccent}60` : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered
            ? `0 15px 35px -5px rgba(0, 0, 0, 0.7), 0 0 25px -5px ${eventAccent}40`
            : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
        data-cursor-text="EXPAND"
      >
        {/* Dynamic Interactive Radial Cursor Spotlight Glow */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 240px at ${glowPos.x}px ${glowPos.y}px, ${eventAccent}25, transparent 70%)`,
            }}
          />
        )}

        {/* Ambient Top Glow Line */}
        <div
          className="absolute top-0 left-4 right-4 h-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, transparent, ${eventAccent}, transparent)`,
          }}
        />

        {/* Card Header: Category & Time */}
        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span
              className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border"
              style={{
                backgroundColor: `${eventAccent}15`,
                borderColor: `${eventAccent}40`,
                color: eventAccent,
              }}
            >
              DAY 0{event.day} • {event.category.toUpperCase()}
            </span>
            <span className="text-white/50 flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-white/40" />
              {event.time.split('-')[0].trim()}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white group-hover:text-avinya-cyan transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Organizing Club Badge */}
          <div className="mt-2.5 flex items-center gap-2 text-xs font-grotesk">
            <span className="font-mono text-avinya-gold text-[11px] font-semibold">CLUB:</span>
            <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/80 font-medium text-[11px] truncate">
              {event.club}
            </span>
          </div>

          {/* Venue Badge */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-white/60">
            <MapPin className="w-3.5 h-3.5 text-avinya-cyan/80 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          {/* Event Description */}
          <p className="mt-3.5 text-xs sm:text-[13px] text-white/70 font-grotesk leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {/* Card Footer: Tags & Modal Trigger Button */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-white/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-1">
            <span className="text-[11px] text-white/40">
              SLOT: <strong className="text-white/80 font-medium">{event.time}</strong>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(event);
              }}
              className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-avinya-cyan group-hover:translate-x-0.5 transition-transform"
            >
              DETAILS <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

