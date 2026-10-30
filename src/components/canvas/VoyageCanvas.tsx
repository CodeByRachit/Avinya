'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import BioluminescentOcean from './BioluminescentOcean';
import SplineTrack from './SplineTrack';
import EveningSun from './EveningSun';
import Seabirds from './Seabirds';
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
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a1428] via-[#0d2242] to-[#050d1a] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full overflow-hidden">
      {/* ======================================================== */}
      {/* 1. NATURAL EVENING SKY (DEEP TWILIGHT BLUE WITH SUNSET)  */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Ocean Twilight Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061022] via-[#0b1d3d] via-[#14284b] to-[#081226]" />

        {/* Soft Evening Sunset Horizon Warmth (Right Horizon near Sun) */}
        <div className="absolute top-1/4 right-1/4 w-[50rem] h-[30rem] bg-gradient-to-r from-amber-500/18 via-orange-500/12 to-transparent rounded-full blur-[140px]" />

        {/* Subtle Sunset Rose Glaze on Far Horizon */}
        <div
          className="absolute top-1/3 left-10 w-[45rem] h-[32rem] bg-rose-500/10 rounded-full blur-[160px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />

        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#050b18]/20 to-[#02060e]/65" />
      </div>

      {/* ======================================================== */}
      {/* 2. THREE.JS WEBGL CANVAS                                 */}
      {/* ======================================================== */}
      <Canvas
        camera={{ position: [6.5, 4.5, 49.0], fov: 52, near: 0.1, far: 500 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        {/* Natural deep oceanic evening haze fog (Rich blue twilight) */}
        <fog attach="fog" args={['#081830', 85, 360]} />

        {/* ======================================================== */}
        {/* 3. CINEMATIC EVENING LIGHTING RIG                        */}
        {/* ======================================================== */}
        {/* Natural Ambient Ocean Sky Fill */}
        <ambientLight intensity={1.4} color="#93c5fd" />

        {/* Sky / Water Hemisphere Light */}
        <hemisphereLight args={['#38bdf8', '#07152b', 1.4]} />

        {/* Soft Sunset Horizon Fill */}
        <directionalLight
          position={[-30, 20, -30]}
          intensity={1.5}
          color="#f97316"
        />

        <Suspense fallback={null}>
          {/* Luminous 3D Evening Sun Disk & Light Corona stationed on the far ocean horizon */}
          <EveningSun position={[40, 52, -450]} />

          {/* Flying Seabirds Circling the Archipelago */}
          <Seabirds />

          {/* Deep Blue Natural Reflective Evening Ocean */}
          <BioluminescentOcean />

          {/* Floating Channel Markers (Zero Artificial Track Line) */}
          <SplineTrack />

          {/* Island 1: The Last Outpost on the LEFT */}
          <IslandLastOutpost position={[-44, 0, -60]} />

          {/* Island 2: The Pandemonium on the RIGHT */}
          <IslandPandemonium position={[48, 0, -156]} />

          {/* Island 3: The Carnival Island on the LEFT */}
          <IslandCarnival position={[-46, 0, -248]} />

          {/* Navigating Skiff & Smooth S-Curve Cinematic Camera */}
          <SceneController
            progress={progress}
            onWaypointReached={onWaypointReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
