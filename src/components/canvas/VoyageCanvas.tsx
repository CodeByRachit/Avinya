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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#1a103c] via-[#2d124d] to-[#0f172a] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full overflow-hidden">
      {/* ======================================================== */}
      {/* 1. RADIANT EVENING SUNSET SKY (WARM GOLDEN HOUR GLOW)    */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Twilight Zenith to Radiant Sunset Horizon */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#120e28] via-[#241334] via-[#451a2e] to-[#1a0f24]" />

        {/* Golden Hour Sun Flare on Mid-Left Horizon */}
        <div className="absolute top-1/4 left-1/4 w-[55rem] h-[35rem] bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-transparent rounded-full blur-[140px]" />

        {/* Radiant Sunset Crimson Aura on Right Horizon */}
        <div
          className="absolute top-1/3 right-0 w-[50rem] h-[38rem] bg-rose-600/20 rounded-full blur-[160px] animate-pulse"
          style={{ animationDuration: '7s' }}
        />

        {/* Sunset Lagoon Water Horizon Reflection */}
        <div className="absolute bottom-1/4 left-1/3 w-[55rem] h-[28rem] bg-amber-400/15 rounded-full blur-[150px]" />

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0f0a1c]/25 to-[#07040d]/70" />
      </div>

      {/* ======================================================== */}
      {/* 2. THREE.JS WEBGL CANVAS                                 */}
      {/* ======================================================== */}
      <Canvas
        camera={{ position: [4.8, 3.2, 28], fov: 40, near: 0.1, far: 450 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* Warm evening sunset haze fog (never solid black) */}
        <fog attach="fog" args={['#241528', 65, 300]} />

        {/* ======================================================== */}
        {/* 3. WARM EVENING GOLDEN-HOUR LIGHTING                     */}
        {/* ======================================================== */}
        {/* Warm Evening Ambient Fill */}
        <ambientLight intensity={1.5} color="#fed7aa" />

        {/* Sky / Water Hemisphere Bounce */}
        <hemisphereLight args={['#fb923c', '#1e1b4b', 1.4]} />

        {/* Primary Low-Angle Sunset Golden Key Light */}
        <directionalLight
          position={[35, 22, -60]}
          intensity={3.4}
          color="#fef08a"
          castShadow
        />

        {/* Sunset Rose / Coral Horizon Fill */}
        <directionalLight
          position={[-35, 25, -30]}
          intensity={1.8}
          color="#fb7185"
        />

        {/* Deep Water Twilight Blue Fill */}
        <directionalLight
          position={[0, -10, 20]}
          intensity={0.9}
          color="#38bdf8"
        />

        <Suspense fallback={null}>
          {/* Natural Reflective Evening Ocean Plane */}
          <BioluminescentOcean />

          {/* Luminous Navigation Wake */}
          <SplineTrack />

          {/* Island 1: The Last Outpost (Desert Citadel & Moon) */}
          <IslandLastOutpost position={[-28, 0, -48]} />

          {/* Island 2: The Pandemonium (Cyber Spires & Sunset Sun) */}
          <IslandPandemonium position={[34, 0, -125]} />

          {/* Island 3: The Carnival Island (Ferris Wheel & Boardwalk Pier) */}
          <IslandCarnival position={[-26, 0, -202]} />

          {/* Navigating Skiff & 3/4 Cinematic Follow Camera */}
          <SceneController
            progress={progress}
            onWaypointReached={onWaypointReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
