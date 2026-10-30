'use client';

import React from 'react';
import { ISLAND_WAYPOINTS, IslandWaypoint } from '../canvas/voyageConfig';
import { ChevronRight, Anchor, Sparkles, Navigation } from 'lucide-react';

interface VoyageHUDProps {
  progress: number; // 0 to 1
  onSelectWaypoint: (t: number) => void;
}

export default function VoyageHUD({ progress, onSelectWaypoint }: VoyageHUDProps) {
  // Determine active waypoint
  const getActiveWaypoint = (): IslandWaypoint => {
    if (progress < 0.4) return ISLAND_WAYPOINTS[0];
    if (progress < 0.75) return ISLAND_WAYPOINTS[1];
    return ISLAND_WAYPOINTS[2];
  };

  const activeWaypoint = getActiveWaypoint();

  return (
    <aside
      aria-label="Voyage Timeline HUD"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-5xl px-4 pointer-events-none"
    >
      <div className="glass-pill p-3 sm:p-4 rounded-2xl sm:rounded-3xl pointer-events-auto border border-white/15 bg-black/75 shadow-[0_16px_50px_rgba(0,0,0,0.85)]">
        {/* Progress Bar Track connecting the 3 islands */}
        <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-3.5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, progress * 100))}%`,
              background: `linear-gradient(90deg, #ffb300 0%, #00f0ff 50%, #ff007f 100%)`,
              boxShadow: `0 0 10px ${activeWaypoint.accentColor}`,
            }}
          />
        </div>

        {/* 3 Connected Island Timeline Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {ISLAND_WAYPOINTS.map((wp) => {
            const isActive = activeWaypoint.day === wp.day;
            const isPassed = progress >= wp.t;

            return (
              <button
                key={wp.id}
                type="button"
                onClick={() => onSelectWaypoint(wp.t)}
                className={`relative text-left p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 border flex flex-col justify-between group ${
                  isActive
                    ? 'bg-white/10 border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.08)] scale-[1.02]'
                    : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
                data-cursor-text={`DAY 0${wp.day}`}
              >
                {/* Active Glow Accent Bar */}
                {isActive && (
                  <div
                    className="absolute top-0 left-3 right-3 h-0.5 rounded-full"
                    style={{
                      background: wp.accentColor,
                      boxShadow: `0 0 12px ${wp.accentColor}`,
                    }}
                  />
                )}

                {/* Header row */}
                <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full transition-transform duration-300"
                      style={{
                        background: wp.accentColor,
                        boxShadow: isActive ? `0 0 8px ${wp.accentColor}` : 'none',
                        transform: isActive ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                    <span className="font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white/90">
                      DAY 0{wp.day}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[10px] text-white/40 hidden sm:inline">
                    {wp.date.split(',')[0]}
                  </span>
                </div>

                {/* Island Codename */}
                <div className="mb-1">
                  <h4 className="font-orbitron text-[11px] sm:text-sm font-bold text-white tracking-wide truncate group-hover:text-avinya-cyan transition-colors">
                    {wp.codename}
                  </h4>
                  <p className="font-syne text-[9px] sm:text-xs text-white/60 truncate hidden sm:block">
                    {wp.theme}
                  </p>
                </div>

                {/* Top Highlights (Expanded on active desktop) */}
                <div className="mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between w-full">
                  <div className="flex items-center gap-1 text-[8px] sm:text-[10px] font-mono text-white/50 truncate">
                    <Sparkles className="w-2.5 h-2.5 text-white/40 shrink-0" />
                    <span className="truncate">
                      {isActive ? wp.highlights[0] : `${wp.highlights.length} Events`}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-avinya-cyan opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    VOYAGE <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/40 px-1">
          <div className="flex items-center gap-2">
            <Navigation className="w-3 h-3 text-avinya-cyan animate-pulse" />
            <span className="text-white/70">
              CURRENT BIOME: <strong className="text-white font-semibold">{activeWaypoint.codename}</strong>
            </span>
          </div>
          <span className="hidden sm:inline">
            COORDINATE: {Math.round(progress * 100)}% OF 3D ARCHIPELAGO
          </span>
        </div>
      </div>
    </aside>
  );
}

