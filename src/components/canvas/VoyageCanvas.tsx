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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0b1329] via-[#111c3b] to-[#070c18] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full overflow-hidden">
      {/* ======================================================== */}
      {/* 1. CINEMATIC MULTI-TIERED SKY GRADIENT & HORIZON GLOWS   */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Cosmic Twilight Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081024] via-[#0e1a38] to-[#060c18]" />

        {/* Ambient Thematic Glow Orbs for the 3 Days */}
        {/* Day 1: Warm Desert Sunrise / Moon Amber Glow */}
        <div className="absolute top-1/4 -left-20 w-[44rem] h-[36rem] bg-amber-500/15 rounded-full blur-[140px] animate-pulse" />

        {/* Day 2: Synthwave Crimson Sunset Sky */}
        <div
          className="absolute top-1/3 -right-20 w-[48rem] h-[38rem] bg-rose-500/15 rounded-full blur-[160px] animate-pulse"
          style={{ animationDuration: '6s' }}
        />

        {/* Day 3: Luminous Carnival Lagoon Glow */}
        <div className="absolute bottom-1/4 left-1/3 w-[50rem] h-[30rem] bg-cyan-400/15 rounded-full blur-[160px]" />

        {/* Subtle Vignette Framing */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#060a14]/30 to-[#03060c]/75" />
      </div>

      {/* ======================================================== */}
      {/* 2. THREE.JS WEBGL CANVAS                                 */}
      {/* ======================================================== */}
      <Canvas
        camera={{ position: [0, 4.4, 26], fov: 42, near: 0.1, far: 400 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* Colorful, distant depth fog (Never pitch black, never suffocates nearby models) */}
        <fog attach="fog" args={['#0e1830', 55, 260]} />

        {/* ======================================================== */}
        {/* 3. BRIGHT, HIGH-CONTRAST CINEMATIC LIGHTING RIG          */}
        {/* ======================================================== */}
        {/* Bright Ambient Fill */}
        <ambientLight intensity={1.85} color="#dbeafe" />

        {/* Sky / Ground Bounce Hemisphere Light */}
        <hemisphereLight args={['#38bdf8', '#1e1b4b', 1.4]} />

        {/* Primary Warm Sunlight / Moonshine Directional Key */}
        <directionalLight
          position={[35, 55, 25]}
          intensity={2.8}
          color="#fffbeb"
          castShadow
        />

        {/* Cool Cyan Rim / Fill Light */}
        <directionalLight
          position={[-35, 40, -20]}
          intensity={1.8}
          color="#38bdf8"
        />

        {/* Sunset Magenta Ambient Fill */}
        <directionalLight
          position={[25, -15, -45]}
          intensity={1.3}
          color="#f43f5e"
        />

        <Suspense fallback={null}>
          {/* Luminous Natural Reflective Water Plane */}
          <BioluminescentOcean />

          {/* Illuminated Glowing Teal Spline Navigation Wake */}
          <SplineTrack />

          {/* Island 1: The Last Outpost (Desert Canyon Citadel & Moon) */}
          <IslandLastOutpost position={[-24, 0, -42]} />

          {/* Island 2: The Pandemonium (Cyberpunk City Spires & Sunset Sun) */}
          <IslandPandemonium position={[26, 0, -108]} />

          {/* Island 3: The Carnival Island (Ferris Wheel, Big-Top Tents & Boardwalk) */}
          <IslandCarnival position={[-20, 0, -182]} />

          {/* Handcrafted Wooden Voyager Boat & Follow Camera Rig */}
          <SceneController
            progress={progress}
            onWaypointReached={onWaypointReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
