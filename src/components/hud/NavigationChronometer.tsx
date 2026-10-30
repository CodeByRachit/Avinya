'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Clock, Radio, Shield, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

export default function NavigationChronometer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
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
        const ms = Math.floor((difference % 1000) / 10);

        setTimeLeft({ days, hours, minutes, seconds, ms });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ms: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 bg-gradient-to-br from-[#0c1424]/80 via-black/80 to-[#140b20]/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle chronometer background grid */}
        <div className="absolute inset-0 hud-grid opacity-20 pointer-events-none" />

        {/* Top Telemetry Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-avinya-gold/15 border border-avinya-gold/30 flex items-center justify-center">
              <Compass className="w-5 h-5 text-avinya-gold animate-spin-slow" style={{ animationDuration: '30s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold text-sm tracking-wider text-white">
                  SHIP CHRONOMETER
                </span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-avinya-cyan/15 text-avinya-cyan border border-avinya-cyan/30">
                  CHRONO-2027
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/50 block">
                EXPEDITION EMBARKATION: MARCH 12, 2027 • 09:00:00 IST
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ATOMIC CLOCK SYNCED (UTC +05:30)</span>
          </div>
        </div>

        {/* 4 Chronometer Dials */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 my-8">
          {/* Days */}
          <div className="relative glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-avinya-gold/50 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              SOLAR DAYS
            </span>
            <div className="font-orbitron text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
              {String(timeLeft.days).padStart(3, '0')}
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-avinya-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (timeLeft.days / 365) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-avinya-gold mt-2">DUNE REVEAL T-MINUS</span>
          </div>

          {/* Hours */}
          <div className="relative glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-avinya-cyan/50 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              HOURS
            </span>
            <div className="font-orbitron text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-avinya-cyan h-full rounded-full transition-all duration-300"
                style={{ width: `${(timeLeft.hours / 24) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-avinya-cyan mt-2">DIURNAL CYCLE</span>
          </div>

          {/* Minutes */}
          <div className="relative glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-avinya-magenta/50 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              MINUTES
            </span>
            <div className="font-orbitron text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-avinya-magenta h-full rounded-full transition-all duration-300"
                style={{ width: `${(timeLeft.minutes / 60) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-avinya-magenta mt-2">NAUTICAL MIN</span>
          </div>

          {/* Seconds & Millis */}
          <div className="relative glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center group hover:border-emerald-400/50 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              SECONDS
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-orbitron text-4xl sm:text-6xl font-black text-white">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                .{String(timeLeft.ms).padStart(2, '0')}
              </span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(timeLeft.seconds / 60) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[9px] text-emerald-400 mt-2">HIGH PRECISION</span>
          </div>
        </div>

        {/* Footer Chrono Footnote */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-avinya-cyan" />
            <span>BROADCASTING FROM IIIT DHARWAD HUB // 15.2917° N, 75.0505° E</span>
          </div>
          <span className="text-white/60">GATES UNLOCK 08:00 AM IST</span>
        </div>
      </div>
    </div>
  );
}

