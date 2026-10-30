'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Activity, Radio, Sparkles } from 'lucide-react';

export default function AstronautCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth Interactive 3D Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    damping: 25,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    damping: 25,
    stiffness: 200,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4 sm:p-6 perspective-1000 select-none cursor-pointer"
    >
      {/* 3D Tilted Interactive Holographic Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#0e1424] via-[#070b14] to-[#04060a] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(56,189,248,0.2)] group"
      >
        {/* Background Deep Space Cosmic Glow */}
        <div className="absolute inset-0 bg-radial from-cyan-500/15 via-transparent to-black pointer-events-none" />

        {/* Photorealistic 3D Robot Render Asset */}
        <div className="relative w-full h-full">
          <Image
            src="/images/hack2future-robot.jpg"
            alt="Hack2Future Autonomous AI Cyber-Android Robot"
            fill
            priority
            className="object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 520px"
          />

          {/* Vignette & Ambient Hologram Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>

        {/* Dynamic Holographic Surface Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(56,189,248,0.4) 0%, transparent 60%)`,
          }}
        />

        {/* ======================================================== */}
        {/* HOLOGRAPHIC HUD OVERLAYS & TELEMETRY STREAM             */}
        {/* ======================================================== */}
        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>NEURAL CORE // ACTIVE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-300">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>GEN-9 MECH</span>
          </div>
        </div>

        {/* Holographic Target Reticle in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative w-48 h-48 rounded-full border border-cyan-400/25 border-dashed animate-spin-slow">
            {/* Corner Bracket Accents */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </div>
        </div>

        {/* Bottom Telemetry HUD Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/70 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-medium">AUTONOMOUS COGNITION</span>
            </div>
            <span className="text-amber-300 font-bold">99.8% SYNC</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px] text-white/50">
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-cyan-400 block font-bold">QISKIT</span>
              <span>QUANTUM</span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-amber-400 block font-bold">GEMMA</span>
              <span>AGENTIC</span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-rose-400 block font-bold">FPGA</span>
              <span>HARDWARE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
