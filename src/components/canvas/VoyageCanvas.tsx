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
      <div className="fixed inset-0 z-0 bg-[#030712] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-avinya-cyan/30 border-t-avinya-cyan animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            INITIALIZING 3D CONTINUUM...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto w-full h-full">
      <Canvas
        camera={{ position: [0, 4.5, 28], fov: 46, near: 0.1, far: 350 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 18, 135]} />

        {/* Ambient & Base Cosmic Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[20, 40, 10]}
          intensity={1.2}
          color="#90b8f8"
          castShadow
        />

        <Suspense fallback={null}>
          {/* Bioluminescent Ocean Mesh */}
          <BioluminescentOcean />

          {/* Glowing Catmull-Rom Spline Track */}
          <SplineTrack />

          {/* 3 Themed Island Biomes */}
          <IslandLastOutpost position={[-26, 0, -38]} />
          <IslandPandemonium position={[28, 0, -102]} />
          <IslandCarnival position={[-24, 0, -178]} />

          {/* Animated 3D Cyber Boat & Dynamic Camera Follow Rig */}
          <SceneController
            progress={progress}
            onWaypointReached={onWaypointReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
