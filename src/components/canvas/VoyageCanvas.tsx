'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BioluminescentOcean from './BioluminescentOcean';
import SplineTrack from './SplineTrack';
import { IslandLastOutpost, IslandPandemonium, IslandCarnival } from './Islands';
import SceneController from './SceneController';

interface VoyageCanvasProps {
  progress?: number;
  onWaypointReached?: (day: 1 | 2 | 3) => void;
}

export default function VoyageCanvas({ progress = 0, onWaypointReached }: VoyageCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#070b14] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full overflow-hidden">
      {/* ======================================================== */}
      {/* RICH ANIMATED GRADIENT ATMOSPHERE (NO PITCH BLACK VOID)  */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Cosmic Sky Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1224] via-[#101b38] to-[#060b14]" />

        {/* Ambient Thematic Glow Orbs */}
        {/* Warm Desert Amber (Day 1 Horizon) */}
        <div className="absolute top-1/4 -left-20 w-[42rem] h-[34rem] bg-amber-600/15 rounded-full blur-[140px] animate-pulse" />

        {/* Synthwave Magenta Sunset (Day 2 Sky) */}
        <div
          className="absolute top-1/3 -right-20 w-[46rem] h-[36rem] bg-rose-600/15 rounded-full blur-[160px] animate-pulse"
          style={{ animationDuration: '6s' }}
        />

        {/* Luminous Cyan Lagoon Reflection (Day 3 Pier) */}
        <div className="absolute bottom-1/4 left-1/3 w-[50rem] h-[30rem] bg-cyan-500/15 rounded-full blur-[160px]" />

        {/* Subtle Horizon Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#080d18]/40 to-[#04060c]/80" />
      </div>

      {/* ======================================================== */}
      {/* THREE.JS WEBGL CANVAS                                   */}
      {/* ======================================================== */}
      <Canvas
        camera={{ position: [0, 4.2, 26], fov: 42, near: 0.1, far: 400 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* Soft, colorful distance fog (never pitch black) */}
        <fog attach="fog" args={['#0e172e', 45, 240]} />

        {/* ======================================================== */}
        {/* CINEMATIC HIGH-VISIBILITY LIGHTING                      */}
        {/* ======================================================== */}
        {/* Bright Ambient Light */}
        <ambientLight intensity={1.9} color="#cbd5e1" />

        {/* Sky / Water Bounce Hemisphere Light */}
        <hemisphereLight args={['#38bdf8', '#1e1b4b', 1.5]} />

        {/* Primary Warm Sun / Moon Directional Key Light */}
        <directionalLight
          position={[35, 50, 25]}
          intensity={2.8}
          color="#ffedd5"
          castShadow
        />

        {/* Electric Cool Cyan Rim / Fill Light */}
        <directionalLight
          position={[-35, 35, -25]}
          intensity={1.9}
          color="#38bdf8"
        />

        {/* Rose Accent Light */}
        <directionalLight
          position={[20, -10, -40]}
          intensity={1.2}
          color="#f43f5e"
        />

        <Suspense fallback={null}>
          {/* Luminous Animated Water Plane */}
          <BioluminescentOcean />

          {/* Illuminated Glowing Teal Spline Path */}
          <SplineTrack />

          {/* Day 1: The Last Outpost - 3D Dune Desert Portal Card */}
          <IslandLastOutpost position={[-24, 6.5, -42]} />

          {/* Day 2: The Pandemonium - 3D Synthwave Cyberpunk Portal Card */}
          <IslandPandemonium position={[26, 6.5, -108]} />

          {/* Day 3: The Carnival Island - 3D Festive Pier Portal Card */}
          <IslandCarnival position={[-20, 6.5, -182]} />

          {/* Camera Follow Rig & Navigating Sleek Voyager Skiff */}
          <SceneController
            progress={progress}
            onWaypointReached={onWaypointReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
