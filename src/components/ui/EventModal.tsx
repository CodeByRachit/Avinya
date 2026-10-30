'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FestEvent } from '@/data/events';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle,
} from 'lucide-react';

interface EventModalProps {
  event: FestEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const isTech = event.category === 'technical';
  const accentColor = isTech ? '#00f0ff' : '#ff007f';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-2xl bg-[#090d18]/95 border rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          style={{
            borderColor: `${accentColor}40`,
            boxShadow: `0 0 50px -10px ${accentColor}30`,
          }}
        >
          {/* Subtle Top Accent Glow Line */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border"
              style={{
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
            >
              DAY 0{event.day} • {event.category.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
              {event.dayThemeName}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-white tracking-wide">
            {event.title}
          </h2>

          {/* Organizing Club Highlight */}
          <div className="mt-2 text-xs font-grotesk text-white/70 flex items-center gap-2">
            <span className="font-mono text-avinya-gold font-bold">ORGANIZED BY:</span>
            <span className="font-semibold text-white px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {event.club}
            </span>
          </div>

          {/* Mission Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 font-mono text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Calendar className="w-3 h-3 text-avinya-gold" /> DATE
              </span>
              <span className="text-white font-medium mt-1 block">{event.date}</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-avinya-cyan" /> TIME SLOT
              </span>
              <span className="text-white font-medium mt-1 block">{event.time}</span>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-white/40 block flex items-center gap-1">
                <MapPin className="w-3 h-3 text-avinya-magenta" /> VENUE
              </span>
              <span className="text-white font-medium mt-1 block truncate">{event.venue}</span>
            </div>
          </div>

          {/* Full Detailed Description */}
          <div className="mb-6">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
              // BRIEF & OBJECTIVE
            </h4>
            <p className="font-grotesk text-sm text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
              {event.description}
            </p>
          </div>

          {/* Arena Rules & Regulations */}
          <div className="mb-6 space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-avinya-cyan" />
              RULES & PROTOCOLS
            </h4>
            <ul className="text-xs font-grotesk text-white/70 space-y-1.5 list-disc list-inside bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <li>All team members must carry valid institute/college identification cards.</li>
              <li>Reporting time is strictly 20 minutes prior to scheduled slot at {event.venue}.</li>
              <li>Decisions of the judge panel and {event.club} organizers are final and binding.</li>
              <li>Fair play code of conduct is enforced across all collegiate arenas.</li>
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs font-mono text-white/50 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-white/40" />
              <span>TEAM SIZE: <strong>{event.teamSize || 'Individual'}</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs font-mono text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Registration request logged for: ${event.title}! Welcome aboard Avinya 2027.`);
                  onClose();
                }}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full font-orbitron font-bold text-xs tracking-wider uppercase text-white shadow-lg transition-all"
                style={{
                  background: `linear-gradient(90deg, ${accentColor}, #8b5cf6)`,
                  boxShadow: `0 0 20px ${accentColor}50`,
                }}
              >
                Confirm Spot
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

