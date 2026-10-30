'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FestEvent } from '@/data/events';
import { useLenis } from '@/components/providers/SmoothScroll';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface EventModalProps {
  event: FestEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const { lenis } = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (event) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.body.classList.remove('custom-cursor-active');
      lenis?.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      document.body.classList.add('custom-cursor-active');
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
      document.body.classList.add('custom-cursor-active');
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose, lenis]);

  if (!mounted || !event) return null;

  const isTech = event.category === 'technical';
  const accentDotColor = isTech ? '#38bdf8' : '#fb7185';

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
        data-lenis-prevent="true"
      >
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Dialog Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0c101a] border border-white/[0.12] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden z-10 my-auto"
        >
          {/* Fixed Header */}
          <div className="relative p-5 sm:p-6 pb-4 border-b border-white/[0.08] bg-[#0c101a]/95 shrink-0">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-2.5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide bg-white/[0.05] border border-white/[0.08] text-white/80">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: accentDotColor,
                    boxShadow: `0 0 8px ${accentDotColor}80`,
                  }}
                />
                <span>Day {event.day} · {isTech ? 'Technical Track' : 'Cultural Track'}</span>
              </span>

              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-white/60">
                {event.dayThemeName}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight pr-6">
              {event.title}
            </h2>

            {/* Organizing Club Highlight */}
            <div className="mt-2 text-xs font-grotesk text-white/60 flex items-center gap-1.5">
              <span className="text-white/40 uppercase tracking-wider font-mono text-[10px]">Organized by</span>
              <span className="font-medium text-white/90 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                {event.club}
              </span>
            </div>
          </div>

          {/* Scrollable Body Content */}
          <div
            className="overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5 flex-1"
            data-lenis-prevent="true"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            }}
          >
            {/* Schedule & Venue Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-grotesk text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <span className="text-[11px] text-white/40 flex items-center gap-1.5 mb-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-white/50" /> DATE
                </span>
                <span className="text-white font-medium block truncate">{event.date}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <span className="text-[11px] text-white/40 flex items-center gap-1.5 mb-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-white/50" /> TIME SLOT
                </span>
                <span className="text-white font-medium block truncate">{event.time}</span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] col-span-2 sm:col-span-1">
                <span className="text-[11px] text-white/40 flex items-center gap-1.5 mb-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-white/50" /> VENUE
                </span>
                <span className="text-white font-medium block truncate">{event.venue}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2 font-mono">
                About This Event
              </h4>
              <p className="font-grotesk text-sm text-white/75 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
                {event.description}
              </p>
            </div>

            {/* Guidelines */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Event Guidelines
              </h4>
              <ul className="text-xs font-grotesk text-white/70 space-y-1.5 list-disc list-inside bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
                <li>All participants must carry a valid institute ID card during reporting.</li>
                <li>Please report to {event.venue} at least 15 minutes before scheduled slot.</li>
                <li>Decisions of the judge panel and {event.club} coordinators are final.</li>
                <li>Fair play and respectful conduct are mandatory across all competitions.</li>
              </ul>
            </div>

            {/* Tags */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block mb-2">
                Event Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Action Footer */}
          <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0c101a]/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs font-grotesk text-white/50 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-white/40" />
              <span>Team Size: <strong className="text-white/80 font-medium">{event.teamSize || 'Individual'}</strong></span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Registration request logged for: ${event.title}! Welcome aboard Avinya 2027.`);
                  onClose();
                }}
                className="w-1/2 sm:w-auto px-5 py-2 rounded-lg font-grotesk font-semibold text-xs tracking-wide text-black bg-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
              >
                Register for Event
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
