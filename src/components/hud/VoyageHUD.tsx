'use client';

import React from 'react';
import Image from 'next/image';
import { ISLAND_WAYPOINTS, IslandWaypoint } from '../canvas/voyageConfig';

interface VoyageHUDProps {
  progress: number;
  onSelectWaypoint: (t: number) => void;
}

export default function VoyageHUD({ progress, onSelectWaypoint }: VoyageHUDProps) {
  const getActiveWaypoint = (): IslandWaypoint => {
    if (progress < 0.4) return ISLAND_WAYPOINTS[0];
    if (progress < 0.75) return ISLAND_WAYPOINTS[1];
    return ISLAND_WAYPOINTS[2];
  };

  const activeWaypoint = getActiveWaypoint();

  return (
    <aside
      aria-label="Voyage Timeline HUD"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-3 sm:px-4 pointer-events-none select-none"
    >
      <div className="glass-pill p-2.5 sm:p-3.5 rounded-3xl pointer-events-auto border border-white/20 bg-slate-950/70 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
        {/* Subtle voyage progress bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full mb-2.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, progress * 100))}%`,
              background: `linear-gradient(90deg, #f59e0b 0%, #f43f5e 50%, #06b6d4 100%)`,
            }}
          />
        </div>

        {/* 3 Interactive Floating Day Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {ISLAND_WAYPOINTS.map((wp) => {
            const isActive = activeWaypoint.day === wp.day;

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onSelectWaypoint(wp.t)}
                className={`relative text-left rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col justify-between group cursor-pointer ${
                  isActive
                    ? 'border-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-[1.02]'
                    : 'border-white/10 opacity-80 hover:opacity-100 hover:border-white/40 hover:scale-[1.01]'
                }`}
                data-cursor-text={`DAY 0${wp.day}`}
              >
                {/* Background Thematic Artwork */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={wp.image}
                    alt={wp.codename}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 33vw, 240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-2 sm:p-3 flex flex-col justify-between min-h-[85px] sm:min-h-[105px] w-full">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive ? wp.accentColor : 'rgba(0,0,0,0.7)',
                        color: isActive ? '#000000' : '#ffffff',
                      }}
                    >
                      DAY 0{wp.day}
                    </span>
                    <span className="font-mono text-[9px] text-white/80 hidden sm:inline">
                      {wp.date.split(',')[0]}
                    </span>
                  </div>

                  {/* Island Title */}
                  <div className="mt-1.5">
                    <h4 className="font-syne text-[10px] sm:text-xs md:text-sm font-bold text-white tracking-wide truncate">
                      {wp.codename}
                    </h4>
                    <p className="font-grotesk text-[8px] sm:text-[10px] text-white/70 truncate hidden sm:block">
                      {wp.theme}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
