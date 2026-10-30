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
      <div className="fixed inset-0 z-0 bg-[#07090e] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-300 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full">
      <Canvas
        camera={{ position: [0, 4.2, 26], fov: 44, near: 0.1, far: 350 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <color attach="background" args={['#07090e']} />
        <fog attach="fog" args={['#07090e', 18, 140]} />

        {/* Ambient Warm Moonlight */}
        <ambientLight intensity={0.65} color="#e2e8f0" />
        <directionalLight
          position={[25, 45, 15]}
          intensity={1.4}
          color="#fef3c7"
          castShadow
        />

        <Suspense fallback={null}>
          {/* Natural Reflective Ocean Water */}
          <BioluminescentOcean />

          {/* Celestial Shimmer Navigation Wake */}
          <SplineTrack />

          {/* 3 Themed Island Biomes (Directly from Artworks) */}
          <IslandLastOutpost position={[-24, 0, -38]} />
          <IslandPandemonium position={[26, 0, -104]} />
          <IslandCarnival position={[-22, 0, -178]} />

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
