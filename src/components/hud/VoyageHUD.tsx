'use client';

import React from 'react';
import Image from 'next/image';
import { ISLAND_WAYPOINTS, IslandWaypoint } from '../canvas/voyageConfig';
import { Compass, Sparkles, ChevronRight } from 'lucide-react';

interface VoyageHUDProps {
  progress: number;
  onSelectWaypoint: (t: number) => void;
}

export default function VoyageHUD({ progress, onSelectWaypoint }: VoyageHUDProps) {
  const getActiveWaypoint = (): IslandWaypoint => {
    if (progress < 0.48) return ISLAND_WAYPOINTS[0];
    if (progress < 0.78) return ISLAND_WAYPOINTS[1];
    return ISLAND_WAYPOINTS[2];
  };

  const activeWaypoint = getActiveWaypoint();

  return (
    <aside
      aria-label="Voyage Timeline HUD"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-none"
    >
      <div className="glass-pill p-3 sm:p-4 rounded-3xl pointer-events-auto border border-white/15 bg-[#0a0d14]/85 shadow-[0_16px_45px_rgba(0,0,0,0.85)]">
        {/* Silky smooth voyage progress bar with glowing traveler beacon */}
        <div className="relative w-full h-2 bg-black/50 backdrop-blur-md rounded-full mb-3.5 p-[2px] border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)] overflow-visible">
          <div
            className="relative h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_14px_rgba(245,158,11,0.6)]"
            style={{
              width: `${Math.min(100, Math.max(1.8, progress * 100))}%`,
              background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
            }}
          >
            {/* Glowing traveling head beacon with smooth round geometry */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_10px_#f59e0b,0_0_20px_#f43f5e] border-2 border-amber-400 pointer-events-none z-10 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* 3 Connected Island Artwork Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
          {ISLAND_WAYPOINTS.map((wp) => {
            const isActive = activeWaypoint.day === wp.day;

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onSelectWaypoint(wp.t)}
                className={`relative text-left rounded-2xl overflow-hidden transition-all duration-300 border flex flex-col justify-between group ${
                  isActive
                    ? 'border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.02]'
                    : 'border-white/10 opacity-75 hover:opacity-100 hover:border-white/30'
                }`}
                data-cursor-text={`DAY 0${wp.day}`}
              >
                {/* Background Artwork Image with Dark Vignette Gradient */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={wp.image}
                    alt={wp.codename}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 33vw, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-2.5 sm:p-3.5 flex flex-col justify-between min-h-[92px] sm:min-h-[110px] w-full">
                  {/* Top Day Badge */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className="font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive ? wp.accentColor : 'rgba(0,0,0,0.6)',
                        color: isActive ? '#000000' : '#ffffff',
                      }}
                    >
                      DAY 0{wp.day}
                    </span>
                    <span className="font-mono text-[9px] text-white/70 hidden sm:inline">
                      {wp.date.split(',')[0]}
                    </span>
                  </div>

                  {/* Title & Highlights */}
                  <div className="mt-2">
                    <h4 className="font-syne text-[11px] sm:text-sm font-bold text-white tracking-wide truncate">
                      {wp.codename}
                    </h4>
                    <p className="font-grotesk text-[9px] sm:text-[11px] text-white/70 truncate hidden sm:block">
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
