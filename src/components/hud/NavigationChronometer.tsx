'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

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

  return (
    <div className="w-full max-w-4xl mx-auto my-14 px-4 sm:px-6">
      <div className="relative rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-[#0c101a]/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden">
        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne font-bold text-base text-white tracking-tight">
                  Countdown to Avinya 2027
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  March 12 – 14, 2027
                </span>
              </div>
              <span className="text-xs text-white/50 font-grotesk block mt-0.5">
                Flagship Techno-Cultural Fest of IIIT Dharwad
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-grotesk text-emerald-400/90 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Countdown Active</span>
          </div>
        </div>

        {/* 4 Clean Countdown Metric Blocks */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          {[
            { label: 'Days Remaining', value: timeLeft.days, sub: 'Days to Kickoff' },
            { label: 'Hours', value: timeLeft.hours, sub: 'Hours' },
            { label: 'Minutes', value: timeLeft.minutes, sub: 'Minutes' },
            { label: 'Seconds', value: timeLeft.seconds, sub: 'Seconds' },
          ].map((item, idx) => (
            <div
              key={item.label}
              className="relative p-5 sm:p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15 transition-all flex flex-col items-center justify-center text-center group"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1">
                {item.label}
              </span>
              <div className="font-syne text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight tabular-nums my-1">
                {String(item.value).padStart(2, '0')}
              </div>
              <span className="text-[11px] font-grotesk text-white/45 mt-1">
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Information Footer */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/[0.06] text-xs font-grotesk text-white/50">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-white/40" />
            <span>Campus Arena: IIIT Dharwad Main Campus, Karnataka</span>
          </div>
          <span className="text-white/40 font-mono text-[11px]">
            GATES OPEN AT 09:00 AM IST
          </span>
        </div>
      </div>
    </div>
  );
}
