'use client';

import React, { useEffect, useState } from 'react';
import { FEST_METRICS } from '@/data/events';

export default function HudOverlay() {
  const [coords, setCoords] = useState({
    lat: '15.291700° N',
    long: '75.050500° E',
    bearing: '042° NE',
  });

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // FESTIVAL DATE: March 12, 2027, 10:00:00 AM IST
    const targetDate = new Date('2027-03-12T10:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    const handleMouseMove = (e: MouseEvent) => {
      const xRatio = e.clientX / window.innerWidth;
      const yRatio = e.clientY / window.innerHeight;

      // Base: IIIT Dharwad 15.2917, 75.0505 with live micro telemetry
      const latVal = (15.2917 + (0.5 - yRatio) * 0.008).toFixed(6);
      const longVal = (75.0505 + (xRatio - 0.5) * 0.008).toFixed(6);
      const bearingVal = Math.round((Math.atan2(yRatio - 0.5, xRatio - 0.5) * 180) / Math.PI + 180);

      setCoords({
        lat: `${latVal}° N`,
        long: `${longVal}° E`,
        bearing: `${String(bearingVal).padStart(3, '0')}° AZ`,
      });
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.round((window.scrollY / maxScroll) * 100));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none font-mono">
      {/* Top Left Bracket & Festival Codename */}
      <div className="absolute top-4 left-6 hidden sm:flex items-center gap-3 text-[11px] text-white/40 tracking-wider">
        <div className="w-2.5 h-2.5 border-t border-l border-avinya-cyan/70" />
        <span className="text-avinya-cyan font-semibold">SYS.AVINYA // 2027</span>
        <span className="text-white/20">|</span>
        <span className="text-white/50">SECTOR 04 - IIIT DHARWAD</span>
      </div>

      {/* Top Right Bracket & Temporal Ticker */}
      <div className="absolute top-4 right-6 hidden sm:flex items-center gap-3 text-[11px] text-white/40 tracking-wider">
        <span className="text-white/50">T-MINUS</span>
        <span className="font-bold text-avinya-gold tracking-widest">
          {timeRemaining.days}D : {String(timeRemaining.hours).padStart(2, '0')}H :{' '}
          {String(timeRemaining.minutes).padStart(2, '0')}M :{' '}
          {String(timeRemaining.seconds).padStart(2, '0')}S
        </span>
        <div className="w-2.5 h-2.5 border-t border-r border-avinya-gold/70" />
      </div>

      {/* Bottom Left Corner: Lat/Long HUD Coordinates */}
      <div className="absolute bottom-5 left-6 flex flex-col gap-1 text-[11px] text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="text-emerald-400 font-semibold tracking-wider text-[10px]">
            GPS TELEMETRY ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-mono">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40">GEO-LAT</span>
            <span className="text-avinya-cyan font-medium text-[11px]">{coords.lat}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40">GEO-LONG</span>
            <span className="text-avinya-cyan font-medium text-[11px]">{coords.long}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-white/40">BEARING</span>
            <span className="text-white/80 font-medium text-[11px]">{coords.bearing}</span>
          </div>
        </div>
        <div className="w-3 h-3 border-b border-l border-avinya-cyan/70 mt-0.5" />
      </div>

      {/* Bottom Right Corner: System Status & Scroll Depth */}
      <div className="absolute bottom-5 right-6 flex flex-col items-end gap-1 text-[11px] text-white/60">
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-white/40">WARP INDEX</span>
            <span className="text-avinya-magenta font-medium text-[11px]">{scrollProgress}% DEPTH</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-widest text-white/40">HUB LOCATION</span>
            <span className="text-white/90 font-medium text-[11px]">{FEST_METRICS.geoCoordinates.hub}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/40 tracking-wider">FREQ: 440.00 MHZ</span>
          <div className="w-3 h-3 border-b border-r border-avinya-magenta/70" />
        </div>
      </div>
    </div>
  );
}
