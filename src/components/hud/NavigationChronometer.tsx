'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Sparkles, Radio, CheckCircle2 } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function NavigationChronometer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: March 12, 2027 09:00:00 IST (+05:30)
    const targetDate = new Date('2027-03-12T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live progress percentages for the visual micro-gauges
  const hoursProgress = Math.min(100, Math.max(0, ((24 - timeLeft.hours) / 24) * 100));
  const minutesProgress = Math.min(100, Math.max(0, ((60 - timeLeft.minutes) / 60) * 100));
  const secondsProgress = Math.min(100, Math.max(0, ((60 - timeLeft.seconds) / 60) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4 sm:px-6">
      <div className="relative rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#0c101a]/95 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Subtle Ambient Amber Glow in Background */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px]" />

        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="font-syne font-bold text-base sm:text-lg text-white tracking-tight">
                  Countdown to Avinya 2027
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm">
                  March 12 – 14, 2027
                </span>
              </div>
              <span className="text-xs text-white/50 font-grotesk block mt-0.5">
                Official Embarkation Sequence · IIIT Dharwad Main Campus
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/25 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="tracking-wide">LIVE CHRONOMETER SYNC</span>
          </div>
        </div>

        {/* 4 Professional Countdown Metric Cards with Precision Typography & Micro-Gauges */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          {/* 1. DAYS */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-amber-400/40 hover:bg-white/[0.05] transition-all flex flex-col items-center justify-between text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold mb-2">
              DAYS
            </span>
            <div className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight tabular-nums my-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="w-full mt-3 pt-3 border-t border-white/[0.06] flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                T-MINUS STAGE
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* 2. HOURS */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-amber-400/40 hover:bg-white/[0.05] transition-all flex flex-col items-center justify-between text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold mb-2">
              HOURS
            </span>
            <div className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight tabular-nums my-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="w-full mt-3 pt-3 border-t border-white/[0.06] flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                DIURNAL CYCLE
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${hoursProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3. MINUTES */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-amber-400/40 hover:bg-white/[0.05] transition-all flex flex-col items-center justify-between text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold mb-2">
              MINUTES
            </span>
            <div className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight tabular-nums my-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="w-full mt-3 pt-3 border-t border-white/[0.06] flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                HOUR FRACTION
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${minutesProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4. SECONDS */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-amber-400/40 hover:bg-white/[0.05] transition-all flex flex-col items-center justify-between text-center group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400/90 font-semibold mb-2 flex items-center gap-1.5">
              <span>SECONDS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </span>
            <div className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-300 tracking-tight tabular-nums my-1 drop-shadow-[0_2px_14px_rgba(245,158,11,0.4)]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="w-full mt-3 pt-3 border-t border-white/[0.06] flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                REAL-TIME PULSE
              </span>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-300"
                  style={{ width: `${secondsProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.08] text-xs font-grotesk text-white/60">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus Arena: IIIT Dharwad Main Campus · Hubballi-Dharwad, Karnataka</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>GATES UNLOCK: MARCH 12, 09:00 AM IST</span>
          </div>
        </div>
      </div>
    </div>
  );
}
