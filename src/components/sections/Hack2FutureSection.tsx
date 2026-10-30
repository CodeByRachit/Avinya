'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import CyberScramble from '@/components/ui/CyberScramble';
import {
  ExternalLink,
  Cpu,
  Brain,
  Boxes,
  Radio,
  Zap,
  LucideIcon,
  Compass,
} from 'lucide-react';

const AstronautCanvas = dynamic(() => import('@/components/canvas/AstronautCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-amber-300/30 border-t-amber-300 animate-spin" />
    </div>
  ),
});

interface MissionTrack {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  accentColor: string;
  icon: LucideIcon;
}

const MISSION_TRACKS: MissionTrack[] = [
  {
    id: 'ai-agentic',
    code: 'TRACK 01',
    title: 'AI & Agentic Systems',
    subtitle: 'Autonomous Reasoning & Swarm Intelligence',
    description:
      'Engineer multi-agent workflows, autonomous tool execution, and local reasoning pipelines utilizing Google Gemma, Gemini SDKs, and multimodal architectures.',
    techStack: ['Gemma', 'LangGraph', 'RAG Search', 'Agentic Tool Calling'],
    accentColor: '#38bdf8',
    icon: Brain,
  },
  {
    id: 'web3-fintech',
    code: 'TRACK 02',
    title: 'Web3 & Next-Gen FinTech',
    subtitle: 'Decentralized Protocols & Algorithmic Markets',
    description:
      'Architect trustless settlement layers, zero-knowledge proofs, automated liquidity engines, and decentralized physical infrastructure networks (DePIN).',
    techStack: ['zk-Rollups', 'Solidity / Rust', 'DePIN Protocols', 'AMM Algorithmic Trading'],
    accentColor: '#fb7185',
    icon: Boxes,
  },
  {
    id: 'hardware-iot',
    code: 'TRACK 03',
    title: 'Hardware & Quantum IoT',
    subtitle: 'FPGA Accelerators & Sensory Edge Compute',
    description:
      'Bridge digital code and physical reality. Construct high-throughput FPGA pipelines, sensor telemetry arrays, and Qiskit quantum circuit integration modules.',
    techStack: ['FPGA Verilog', 'Qiskit Quantum', 'Sensory IoT', 'Embedded RISC-V'],
    accentColor: '#f59e0b',
    icon: Cpu,
  },
  {
    id: 'open-innovation',
    code: 'TRACK 04',
    title: 'Open Innovation & Planetary Tech',
    subtitle: 'Disruptive Solutions for Civilization Scale',
    description:
      'Tackle high-impact frontier problems across climate intelligence, automated robotic logistics, biomedical diagnostics, and critical infrastructure resilience.',
    techStack: ['Planetary Geospatial', 'BioTech ML', 'Autonomous Drone Fleet', 'Cyber Resilience'],
    accentColor: '#10b981',
    icon: Zap,
  },
];

export default function Hack2FutureSection() {
  const [activeTrack, setActiveTrack] = useState<string>('ai-agentic');

  return (
    <section
      id="hack2future"
      className="relative w-full py-32 overflow-hidden bg-gradient-to-b from-[#07090e] via-[#090d16] to-[#07090e] border-y border-white/10"
    >
      {/* Deep-Space Cosmic Background Stars and Atmospheric Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Top Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 font-mono text-xs text-amber-200 mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-amber-300" />
            <span>MISSION BRIEF // NATIONAL LEVEL SPRINT</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight">
            <CyberScramble text="HACK2FUTURE" />
          </h2>

          <p className="font-syne text-lg sm:text-xl text-amber-200/90 font-medium mt-3">
            The Flagship 36-Hour National Hackathon of IIIT Dharwad
          </p>

          <p className="font-grotesk text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
            Ascend beyond conventional boundaries. Hack2Future gathers India's most ambitious student engineers, researchers, and designers under one roof to build the technologies of tomorrow.
          </p>
        </div>

        {/* 3D Zero-G Astronaut Visual & Mission Brief Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Left: 3D Zero-Gravity Astronaut Centerpiece */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
            <AstronautCanvas />

            {/* Astronaut Mission HUD Tag */}
            <div className="absolute bottom-4 left-6 right-6 sm:left-12 sm:right-12 glass-pill p-3 rounded-xl border border-white/15 bg-black/80 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white/80 text-[11px]">ORBITAL STATUS: NOMINAL</span>
              </div>
              <span className="text-amber-300 text-[11px] font-bold">SECTOR: IIIT-DWD</span>
            </div>
          </div>

          {/* Right: Sci-Fi Mission Telemetry & Direct Portal Action */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            {/* Mission Telemetry Metrics HUD */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-colors">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  CONTINUOUS SPRINT
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-black text-amber-300 mt-1 block">
                  36 HOURS
                </span>
                <span className="text-xs text-white/60 font-grotesk mt-1 block">
                  Non-stop prototyping marathon
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/30 transition-colors">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  SCALE & TIER
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-black text-white mt-1 block">
                  NATIONAL
                </span>
                <span className="text-xs text-white/60 font-grotesk mt-1 block">
                  500+ qualified collegiate builders
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-rose-400/40 transition-colors">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  LOCATION BASE
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-black text-rose-300 mt-1 block">
                  IIIT DHARWAD
                </span>
                <span className="text-xs text-white/60 font-grotesk mt-1 block">
                  Incubation & Innovation Complex
                </span>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-emerald-400/40 transition-colors">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                  INNOVATION TRACKS
                </span>
                <span className="font-syne text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">
                  4 DOMAINS
                </span>
                <span className="text-xs text-white/60 font-grotesk mt-1 block">
                  AI, Web3, Hardware, Open Tech
                </span>
              </div>
            </div>

            {/* Launch Portal CTA Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-black/80 to-transparent">
              <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest block mb-2">
                OFFICIAL PORTAL // HACK2FUTURE.IIITDWD.AC.IN
              </span>

              <h3 className="font-syne text-xl sm:text-2xl font-bold text-white">
                READY FOR THE COUNTDOWN?
              </h3>

              <p className="font-grotesk text-xs sm:text-sm text-white/70 mt-2 leading-relaxed">
                Registrations, rulebook, problem tracks, mentor roster, and accommodation details are officially accessible via the dedicated Hack2Future portal.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="https://hack2future.iiitdwd.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 text-black font-syne font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                  data-cursor-text="LAUNCH"
                >
                  <span>Launch Hack2Future Portal</span>
                  <ExternalLink className="w-4 h-4 text-black" />
                </a>

                <a
                  href="#events"
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white font-syne font-semibold text-xs tracking-wider uppercase hover:bg-white/5 transition-colors"
                >
                  View Fest Events
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Mission Tracks Showcase */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
                // PROBLEM HORIZONS
              </span>
              <h3 className="font-syne text-2xl sm:text-3xl font-bold text-white mt-1">
                FOUR MISSION TRACKS
              </h3>
            </div>
            <span className="font-mono text-xs text-white/40 hidden sm:inline">
              SELECT TRACK TO INSPECT BLUEPRINT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MISSION_TRACKS.map((track) => {
              const Icon = track.icon;
              const isActive = activeTrack === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`glass-panel p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                    isActive
                      ? 'border-amber-400/60 bg-white/[0.06] shadow-xl scale-[1.02]'
                      : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03]'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 30px -5px ${track.accentColor}30` : 'none',
                  }}
                >
                  {/* Top Glow Stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${track.accentColor}, transparent)`,
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/40">
                        {track.code}
                      </span>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: `${track.accentColor}18`,
                          border: `1px solid ${track.accentColor}40`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: track.accentColor }} />
                      </div>
                    </div>

                    <h4 className="font-syne text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {track.title}
                    </h4>

                    <span
                      className="font-syne text-xs font-semibold mt-1 block"
                      style={{ color: track.accentColor }}
                    >
                      {track.subtitle}
                    </span>

                    <p className="font-grotesk text-xs text-white/70 mt-3 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-2">
                      KEY ACCELERATORS:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
