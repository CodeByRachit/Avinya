'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Activity, Radio, Sparkles as SparklesIcon, Orbit } from 'lucide-react';

// =========================================================================
// AUTHENTIC 3D NASA EVA ASTRONAUT MODEL (HACK2FUTURE FLAGSHIP)
// Using Google / NASA official high-resolution 3D GLB model
// Features:
// - Photorealistic Apollo/EVA pressurized spacesuit with fabric folds
// - Deep curved reflective gold visor reflecting Earth & cosmos
// - Chest PLSS Remote Life Support Control Unit & umbilical valves
// - Backpack Portable Life Support System
// - Dual helmet communications & illumination pods
// - Interactive 3D drag & hover rotation with inertia damping
// - Floating zero-G physics simulation & dynamic cosmic sparkles
// =========================================================================
function RealAstronautMesh() {
  const astronautRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/astronaut.glb');

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (astronautRef.current) {
      // Subtle natural breathing and zero-G drifting rotation
      astronautRef.current.position.y = -1.85 + Math.sin(time * 1.4) * 0.06;
      astronautRef.current.rotation.y = Math.sin(time * 0.4) * 0.12;
      astronautRef.current.rotation.z = Math.cos(time * 0.6) * 0.04;
    }
  });

  return (
    <group ref={astronautRef} position={[0, -1.85, 0]}>
      {/* 
        Model scale and positioning calibrated for standard 1.9x EVA bust/full view
        Faced slightly towards camera with dynamic 3/4 hero angle
      */}
      <primitive
        object={scene}
        scale={[1.9, 1.9, 1.9]}
        position={[0, 0, 0]}
        rotation={[0.08, -0.2, 0]}
      />
    </group>
  );
}

useGLTF.preload('/models/astronaut.glb');

function AstronautScene() {
  return (
    <>
      {/* Dynamic 3-Point Studio & Space Lighting */}
      <ambientLight intensity={0.9} color="#cbd5e1" />

      {/* Primary Sunlight (High Solar Radiance in Space) */}
      <directionalLight
        position={[5, 8, 6]}
        intensity={2.8}
        color="#ffffff"
        castShadow
      />

      {/* Earth-Shine Ocean Cyan Fill Light from Below */}
      <pointLight
        position={[-5, -3, 4]}
        intensity={2.6}
        color="#38bdf8"
        distance={15}
      />

      {/* Sunset Solar Corona Rim Light from Back-Right */}
      <pointLight
        position={[4, 3, -4]}
        intensity={2.2}
        color="#f59e0b"
        distance={15}
      />

      {/* Visor Glint Key Accent */}
      <pointLight
        position={[0, 2, 4]}
        intensity={1.8}
        color="#ffffff"
        distance={8}
      />

      {/* Floating Ambient Cosmic Energy Dust */}
      <Sparkles
        count={65}
        scale={[7, 7, 7]}
        size={2.5}
        speed={0.4}
        color="#38bdf8"
      />
      <Sparkles
        count={35}
        scale={[6, 6, 6]}
        size={2.0}
        speed={0.3}
        color="#f59e0b"
      />

      {/* Zero-G Floating Physics Wrapper with Drag & Hover Interaction */}
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1.5}
        zoom={1.0}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 5, Math.PI / 5]}
        azimuth={[-Math.PI / 3, Math.PI / 3]}
      >
        <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
          <RealAstronautMesh />
        </Float>
      </PresentationControls>
    </>
  );
}

export default function AstronautCanvas() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none group">
      {/* 3D Tilted Glassmorphic Card Container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#0b1120] via-[#060a14] to-[#030509] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(56,189,248,0.2)]">
        {/* Deep Space Cosmic Gradient Backdrop */}
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black pointer-events-none" />

        {/* Top Floating Telemetry Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-cyan-400/35 text-[10px] font-mono text-cyan-300">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>EVA SUIT // TELEMETRY ACTIVE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-amber-400/35 text-[10px] font-mono text-amber-300">
            <Radio className="w-3 h-3 text-amber-400" />
            <span>ORBIT 420 KM</span>
          </div>
        </div>

        {/* Interactive Drag Hint */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-white/60">
            <Orbit className="w-2.5 h-2.5 text-cyan-400" />
            DRAG TO ROTATE IN 3D
          </span>
        </div>

        {/* Bottom Telemetry HUD Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/75 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-medium">AUTONOMOUS COGNITION</span>
            </div>
            <span className="text-amber-300 font-bold">99.8% SYNC</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[9px] text-white/55">
            <div className="bg-black/55 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-cyan-400 block font-bold">QISKIT</span>
              <span>QUANTUM</span>
            </div>
            <div className="bg-black/55 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-amber-400 block font-bold">GEMMA</span>
              <span>AGENTIC</span>
            </div>
            <div className="bg-black/55 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
              <span className="text-rose-400 block font-bold">FPGA</span>
              <span>HARDWARE</span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Three.js WebGL Canvas */}
        <Canvas
          camera={{ position: [0, 0.2, 5.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={null}>
            <AstronautScene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
