'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Terminal } from 'lucide-react';

interface PreloaderProps {
  onComplete?: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING AVINYA 2027 VOYAGE...',
  'CALIBRATING QUANTUM VOYAGER COMPASS...',
  'SYNTHESIZING BIOLUMINESCENT CURRENTS...',
  'MAPPING 3-DAY CONTINUUM ARCHIPELAGO...',
  'ESTABLISHING IIIT DHARWAD TELEMETRY LINK...',
  'ALL SYSTEMS NOMINAL // ENTERING ODYSSEY',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment counter smoothly up to 100% in ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }

        // Variable speed progression for organic feel
        const increment = prev < 30 ? 3 : prev < 70 ? 2 : prev < 90 ? 4 : 2;
        const next = Math.min(100, prev + increment);

        // Update boot log message based on progress bracket
        const nextLog = Math.min(
          BOOT_LOGS.length - 1,
          Math.floor((next / 100) * BOOT_LOGS.length)
        );
        setLogIndex(nextLog);

        return next;
      });
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#020307] flex flex-col items-center justify-between p-6 sm:p-12 select-none"
        >
          {/* Top telemetry brackets */}
          <div className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono text-white/40">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-avinya-cyan animate-ping" />
              <span className="text-avinya-cyan font-semibold">BOOT SEQUENCE // VER 27.04</span>
            </div>
            <div className="flex items-center gap-3">
              <span>LAT: 15.2917° N</span>
              <span>LONG: 75.0505° E</span>
            </div>
          </div>

          {/* Centerpiece: Concentric Gyroscopic Radar & Counter */}
          <div className="flex flex-col items-center my-auto">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
              {/* Outer Pulsing Glow */}
              <div className="absolute inset-0 rounded-full bg-avinya-cyan/10 blur-xl animate-pulse" />

              {/* Rotating Dashed Outer Ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-avinya-cyan/30 animate-spin-slow"
                style={{ animationDuration: '14s' }}
              />

              {/* Counter-Rotating Middle Ring */}
              <div
                className="absolute inset-3 rounded-full border border-white/10 border-t-avinya-magenta animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '8s' }}
              />

              {/* Inner Gyroscope Ring with Accent Dot */}
              <div className="absolute inset-6 rounded-full border border-avinya-gold/40 flex items-center justify-center">
                <Compass className="w-8 h-8 text-avinya-cyan animate-pulse" />
              </div>

              {/* Radial Progress Sweep */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="2"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-75 ease-out shadow-[0_0_10px_#00f0ff]"
                />
              </svg>
            </div>

            {/* Percentage Value */}
            <div className="flex items-baseline gap-1 font-orbitron">
              <span className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400">
                {String(progress).padStart(3, '0')}
              </span>
              <span className="text-lg sm:text-2xl font-bold text-avinya-cyan">%</span>
            </div>

            {/* Current Boot Log Message */}
            <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs text-white/80 max-w-md text-center">
              <Terminal className="w-3.5 h-3.5 text-avinya-cyan shrink-0 animate-pulse" />
              <span className="truncate">{BOOT_LOGS[logIndex]}</span>
            </div>
          </div>

          {/* Bottom Progress Bar & Node Tags */}
          <div className="w-full max-w-xl flex flex-col gap-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-avinya-gold via-avinya-cyan to-avinya-magenta"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
              <span>DAY 01: OUTPOST</span>
              <span>DAY 02: PANDEMONIUM</span>
              <span>DAY 03: CARNIVAL</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
