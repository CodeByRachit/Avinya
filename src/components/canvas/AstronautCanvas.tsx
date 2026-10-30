'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Activity, Zap } from 'lucide-react';

// =========================================================================
// HIGH-FIDELITY 3D CYBER-ANDROID MECH MODEL (HACK2FUTURE FLAGSHIP)
// Sculpted 3D WebGL asset with:
// - Aerodynamic ceramic titanium cranial helmet with rear exhaust cowling
// - Deep obsidian curved visor with internal neon holographic HUD reticles
// - Articulated cervical spine with dual hydraulic neck actuator pistons
// - Sculpted composite armor cuirass with pulsing cyan quantum arc reactor
// - Layered ergonomic shoulder pauldrons & micro-thruster exhaust ports
// - Halo telemetry ring stationed BEHIND the model (never cuts the face)
// - Interactive cursor kinematic tracking (head & torso dynamically follow mouse)
// =========================================================================
function CyberAndroidModel() {
  const robotGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const reactorLightRef = useRef<THREE.PointLight>(null);
  const haloRef = useRef<THREE.Group>(null);
  const hudReticleRef = useRef<THREE.Group>(null);

  // Materials with PBR Metallic-Roughness properties
  const materials = useMemo(() => {
    return {
      // White Ceramic Titanium Armor
      ceramicArmor: new THREE.MeshStandardMaterial({
        color: '#f8fafc',
        roughness: 0.18,
        metalness: 0.85,
      }),
      // Dark Gunmetal / Carbon Chassis
      darkChassis: new THREE.MeshStandardMaterial({
        color: '#0f172a',
        roughness: 0.35,
        metalness: 0.9,
      }),
      // Chrome Mirror Hydraulic Pistons
      chromePiston: new THREE.MeshStandardMaterial({
        color: '#f1f5f9',
        roughness: 0.05,
        metalness: 0.98,
      }),
      // Brushed Gold Navigational Trim
      goldTrim: new THREE.MeshStandardMaterial({
        color: '#f59e0b',
        roughness: 0.2,
        metalness: 0.9,
        emissive: '#78350f',
        emissiveIntensity: 0.35,
      }),
      // Deep Obsidian Glass Visor
      visorGlass: new THREE.MeshPhysicalMaterial({
        color: '#020617',
        roughness: 0.04,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        transparent: true,
        opacity: 0.92,
      }),
      // Neon Cyan Holographic HUD
      neonCyanHUD: new THREE.MeshBasicMaterial({
        color: '#00f0ff',
      }),
      // Glowing Cyan Arc Reactor Core Lens
      reactorCore: new THREE.MeshStandardMaterial({
        color: '#00f0ff',
        emissive: '#00f0ff',
        emissiveIntensity: 3.2,
        roughness: 0.1,
      }),
      // Status LEDs
      ledAmber: new THREE.MeshBasicMaterial({ color: '#f59e0b' }),
      ledCyan: new THREE.MeshBasicMaterial({ color: '#38bdf8' }),
      ledGreen: new THREE.MeshBasicMaterial({ color: '#10b981' }),
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Smooth Fluid Cursor Kinematics (Head & Torso Tracking)
    if (headGroup.current && robotGroup.current) {
      const targetHeadY = (state.pointer.x * Math.PI) / 4.8;
      const targetHeadX = (-state.pointer.y * Math.PI) / 6.5;

      // Primary head rotation tracking
      headGroup.current.rotation.y = THREE.MathUtils.lerp(
        headGroup.current.rotation.y,
        targetHeadY,
        delta * 3.8
      );
      headGroup.current.rotation.x = THREE.MathUtils.lerp(
        headGroup.current.rotation.x,
        targetHeadX,
        delta * 3.8
      );

      // Torso secondary tracking with mechanical lag
      robotGroup.current.rotation.y = THREE.MathUtils.lerp(
        robotGroup.current.rotation.y,
        targetHeadY * 0.28,
        delta * 2.2
      );
    }

    // 2. Quantum Arc Reactor Pulsing Luminescence
    if (reactorLightRef.current) {
      reactorLightRef.current.intensity = 2.8 + Math.sin(time * 3.5) * 1.1;
    }

    // 3. Background Orbital Halo Slow Spin (Strictly behind robot)
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.18;
    }

    // 4. Subtle Micro-rotation on HUD reticle
    if (hudReticleRef.current) {
      hudReticleRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group ref={robotGroup} position={[0, -0.2, 0]}>
      {/* Zero-G Gentle Floating Inertia */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* ========================================================== */}
        {/* 1. ARTICULATED HEAD & AERODYNAMIC CRANIAL HELMET           */}
        {/* ========================================================== */}
        <group ref={headGroup} position={[0, 1.35, 0]}>
          {/* Main Cranial Helmet Dome (Ceramic Titanium) */}
          <mesh material={materials.ceramicArmor} castShadow receiveShadow scale={[0.96, 1.14, 1.1]}>
            <sphereGeometry args={[1.18, 64, 64]} />
          </mesh>

          {/* Rear Helmet Exhaust Cowling & Heat Sinks (Nape of the neck) */}
          <group position={[0, -0.15, -0.55]} rotation={[-0.2, 0, 0]}>
            <mesh material={materials.darkChassis}>
              <cylinderGeometry args={[0.85, 1.05, 1.1, 32, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
            </mesh>
            {/* Ventilation Rib Slats */}
            {[-0.2, 0.0, 0.2].map((yOffset, idx) => (
              <mesh key={idx} position={[0, yOffset, -0.55]} material={materials.goldTrim}>
                <boxGeometry args={[0.7, 0.04, 0.12]} />
              </mesh>
            ))}
          </group>

          {/* Aerodynamic Forehead Visor Brow Hood */}
          <mesh
            position={[0, 0.42, 0.48]}
            rotation={[0.38, 0, 0]}
            material={materials.darkChassis}
          >
            <torusGeometry args={[1.06, 0.08, 16, 64, Math.PI * 0.72]} />
          </mesh>

          {/* Mandible / Chin Armor Guard (Curving under the visor) */}
          <group position={[0, -0.62, 0.45]} rotation={[-0.32, 0, 0]}>
            <mesh material={materials.ceramicArmor}>
              <cylinderGeometry args={[0.62, 0.82, 0.45, 32, 1, false, -Math.PI * 0.35, Math.PI * 0.7]} />
            </mesh>
            {/* Rebreather Intake Filter Port */}
            <mesh position={[0, 0, 0.52]} material={materials.darkChassis}>
              <cylinderGeometry args={[0.16, 0.16, 0.12, 24]} />
            </mesh>
            <mesh position={[0, 0, 0.58]} material={materials.ledCyan}>
              <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
          </group>

          {/* Side Auditory Comms Pods / Ear Nodes (Left & Right) */}
          {[-1.05, 1.05].map((xPos, idx) => (
            <group key={idx} position={[xPos, 0.05, 0]} rotation={[0, 0, idx === 0 ? Math.PI / 2 : -Math.PI / 2]}>
              <mesh material={materials.darkChassis}>
                <cylinderGeometry args={[0.34, 0.34, 0.26, 32]} />
              </mesh>
              {/* Outer Gold Trim Ring */}
              <mesh position={[0, 0.14, 0]} material={materials.goldTrim}>
                <torusGeometry args={[0.32, 0.03, 16, 32]} />
              </mesh>
              {/* Status Indicator LED */}
              <mesh position={[0, 0.15, 0]} material={idx === 0 ? materials.ledCyan : materials.ledAmber}>
                <sphereGeometry args={[0.045, 16, 16]} />
              </mesh>
            </group>
          ))}

          {/* ======================================================== */}
          {/* THE VISOR: Deep Obsidian Glass Dome                     */}
          {/* ======================================================== */}
          <mesh
            position={[0, 0.06, 0.18]}
            rotation={[0.1, 0, 0]}
            scale={[0.96, 0.98, 1.06]}
            material={materials.visorGlass}
          >
            <sphereGeometry args={[1.06, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          </mesh>

          {/* Internal Visor Glow Light */}
          <pointLight position={[0, 0.06, 0.65]} color="#00f0ff" intensity={1.5} distance={2.2} />

          {/* ======================================================== */}
          {/* HOLOGRAPHIC HUD RETICLES (Strictly inside/on visor)     */}
          {/* ======================================================== */}
          <group ref={hudReticleRef} position={[0, 0.08, 1.08]} rotation={[0.08, 0, 0]}>
            {/* Center Target Lock Ring */}
            <mesh material={materials.neonCyanHUD}>
              <ringGeometry args={[0.22, 0.24, 32]} />
            </mesh>

            {/* Outer Concentric Vector Ring with Gap */}
            <mesh material={materials.neonCyanHUD} rotation={[0, 0, Math.PI / 4]}>
              <ringGeometry args={[0.42, 0.435, 32, 1, 0, Math.PI * 1.5]} />
            </mesh>

            {/* Target Crosshairs */}
            <mesh position={[-0.32, 0, 0]} material={materials.neonCyanHUD}>
              <planeGeometry args={[0.1, 0.015]} />
            </mesh>
            <mesh position={[0.32, 0, 0]} material={materials.neonCyanHUD}>
              <planeGeometry args={[0.1, 0.015]} />
            </mesh>
            <mesh position={[0, 0.32, 0]} material={materials.neonCyanHUD}>
              <planeGeometry args={[0.015, 0.1]} />
            </mesh>
            <mesh position={[0, -0.32, 0]} material={materials.neonCyanHUD}>
              <planeGeometry args={[0.015, 0.1]} />
            </mesh>

            {/* Telemetry Bracket Marks */}
            <mesh position={[-0.6, 0.12, -0.05]} rotation={[0, 0.2, 0]} material={materials.ledAmber}>
              <planeGeometry args={[0.08, 0.012]} />
            </mesh>
            <mesh position={[0.6, 0.12, -0.05]} rotation={[0, -0.2, 0]} material={materials.ledAmber}>
              <planeGeometry args={[0.08, 0.012]} />
            </mesh>
          </group>
        </group>

        {/* ========================================================== */}
        {/* 2. ARTICULATED CERVICAL SPINE & HYDRAULIC NECK             */}
        {/* ========================================================== */}
        <group position={[0, 0.35, -0.05]}>
          {/* Stacked Titanium Vertebrae Discs */}
          {[-0.15, 0.0, 0.15, 0.3].map((yPos, idx) => (
            <mesh key={idx} position={[0, yPos, 0]} material={materials.darkChassis}>
              <cylinderGeometry args={[0.32, 0.36, 0.1, 32]} />
            </mesh>
          ))}

          {/* Left & Right Hydraulic Actuator Pistons */}
          {[-0.38, 0.38].map((xPos, idx) => (
            <group key={idx} position={[xPos, 0.1, 0]}>
              {/* Outer Cylinder Sleeve */}
              <mesh material={materials.darkChassis}>
                <cylinderGeometry args={[0.07, 0.07, 0.48, 16]} />
              </mesh>
              {/* Inner Chrome Mirror Piston Rod */}
              <mesh position={[0, 0.15, 0]} material={materials.chromePiston}>
                <cylinderGeometry args={[0.04, 0.04, 0.42, 16]} />
              </mesh>
            </group>
          ))}

          {/* Braided Conduits connecting Skull to Clavicle */}
          <mesh position={[-0.28, 0.12, 0.22]} rotation={[0.4, 0.3, 0]} material={materials.darkChassis}>
            <cylinderGeometry args={[0.035, 0.035, 0.55, 12]} />
          </mesh>
          <mesh position={[0.28, 0.12, 0.22]} rotation={[0.4, -0.3, 0]} material={materials.darkChassis}>
            <cylinderGeometry args={[0.035, 0.035, 0.55, 12]} />
          </mesh>
        </group>

        {/* ========================================================== */}
        {/* 3. SCULPTED CHEST CUIRASS & QUANTUM ARC REACTOR CORE       */}
        {/* ========================================================== */}
        <group position={[0, -0.3, 0]}>
          {/* Clavicle / Collar Yoke (Ergonomic curved frame) */}
          <mesh position={[0, 0.45, 0.05]} material={materials.ceramicArmor}>
            <cylinderGeometry args={[0.95, 1.15, 0.3, 32, 1, false, -Math.PI * 0.4, Math.PI * 0.8]} />
          </mesh>

          {/* Left & Right Pectoral Armor Breastplates (Faceted Ceramic Titanium) */}
          <group position={[-0.55, 0.05, 0.4]} rotation={[0.15, 0.2, -0.05]}>
            <mesh material={materials.ceramicArmor} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.75, 0.3]} />
            </mesh>
            {/* Carbon Accent Recess */}
            <mesh position={[0, 0, 0.16]} material={materials.darkChassis}>
              <planeGeometry args={[0.65, 0.5]} />
            </mesh>
          </group>

          <group position={[0.55, 0.05, 0.4]} rotation={[0.15, -0.2, 0.05]}>
            <mesh material={materials.ceramicArmor} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.75, 0.3]} />
            </mesh>
            {/* Carbon Accent Recess */}
            <mesh position={[0, 0, 0.16]} material={materials.darkChassis}>
              <planeGeometry args={[0.65, 0.5]} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* QUANTUM ARC REACTOR CORE (Pulsing Center Emitter)        */}
          {/* ======================================================== */}
          <group position={[0, 0.02, 0.55]}>
            {/* Outer Titanium Bezel Cup */}
            <mesh material={materials.darkChassis} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.35, 0.15, 32]} />
            </mesh>
            {/* Gold Retaining Ring */}
            <mesh position={[0, 0, 0.08]} material={materials.goldTrim}>
              <torusGeometry args={[0.3, 0.025, 16, 32]} />
            </mesh>
            {/* Glowing Cyan Core Lens */}
            <mesh position={[0, 0, 0.04]} material={materials.reactorCore}>
              <sphereGeometry args={[0.2, 32, 32]} />
            </mesh>
            {/* Radial Electromagnetic Containment Prongs */}
            {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
              <mesh
                key={idx}
                position={[Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0.08]}
                rotation={[0, 0, angle]}
                material={materials.goldTrim}
              >
                <boxGeometry args={[0.08, 0.04, 0.05]} />
              </mesh>
            ))}
            {/* Dynamic Volumetric Point Light Illuminating Torso */}
            <pointLight
              ref={reactorLightRef}
              position={[0, 0, 0.25]}
              color="#00f0ff"
              intensity={3.2}
              distance={3.5}
            />
          </group>

          {/* Segmented Abdominal Gasket Plates (Tapering to waist) */}
          {[-0.45, -0.65, -0.85].map((yPos, idx) => (
            <mesh
              key={idx}
              position={[0, yPos, 0.15 - idx * 0.05]}
              material={materials.darkChassis}
            >
              <cylinderGeometry args={[0.82 - idx * 0.06, 0.88 - idx * 0.06, 0.14, 32]} />
            </mesh>
          ))}
        </group>

        {/* ========================================================== */}
        {/* 4. LAYERED SHOULDER PAULDRONS & ARTICULATED DELTOIDS      */}
        {/* ========================================================== */}
        {[-1.4, 1.4].map((xPos, idx) => {
          const isLeft = idx === 0;
          return (
            <group key={idx} position={[xPos, 0.05, 0]}>
              {/* Shoulder Ball Joint Socket */}
              <mesh material={materials.darkChassis}>
                <sphereGeometry args={[0.32, 32, 32]} />
              </mesh>

              {/* Curved Ceramic Pauldron Shield Plate */}
              <group
                position={[isLeft ? -0.15 : 0.15, 0.15, 0]}
                rotation={[0, 0, isLeft ? -0.35 : 0.35]}
              >
                <mesh
                  material={materials.ceramicArmor}
                  scale={[1.15, 0.65, 0.9]}
                  castShadow
                  receiveShadow
                >
                  <sphereGeometry args={[0.55, 32, 32, 0, Math.PI, 0, Math.PI * 0.6]} />
                </mesh>
                {/* Gold Inlay Edge */}
                <mesh position={[0, -0.15, 0]} material={materials.goldTrim}>
                  <boxGeometry args={[0.65, 0.03, 0.45]} />
                </mesh>
                {/* Lateral Micro-Thruster Nozzle Port */}
                <mesh
                  position={[isLeft ? -0.4 : 0.4, -0.05, 0]}
                  rotation={[0, 0, isLeft ? -Math.PI / 2 : Math.PI / 2]}
                  material={materials.darkChassis}
                >
                  <cylinderGeometry args={[0.08, 0.12, 0.14, 16]} />
                </mesh>
              </group>

              {/* Upper Arm Bicep Sleeve */}
              <mesh position={[0, -0.45, 0]} material={materials.darkChassis}>
                <cylinderGeometry args={[0.22, 0.18, 0.55, 24]} />
              </mesh>
            </group>
          );
        })}

        {/* ========================================================== */}
        {/* 5. CELESTIAL NAVIGATIONAL HALO RING (STRICTLY BEHIND MODEL) */}
        {/* ========================================================== */}
        <group ref={haloRef} position={[0, 0.35, -1.2]}>
          <mesh material={materials.goldTrim}>
            <torusGeometry args={[2.7, 0.025, 16, 96]} />
          </mesh>
          {/* Orbital Satellite Node */}
          <mesh position={[2.7, 0, 0]} material={materials.neonCyanHUD}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
          <mesh position={[-2.7, 0, 0]} material={materials.ledAmber}>
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
        </group>
      </Float>

      {/* Floating Ambient Cosmic Particle Dust */}
      <Sparkles count={55} scale={[8, 8, 8]} size={2.4} speed={0.4} color="#00f0ff" />
      <Sparkles count={30} scale={[6, 6, 6]} size={1.8} speed={0.3} color="#f59e0b" />

      {/* ============================================================ */}
      {/* STUDIO 3-POINT LIGHTING SETUP                                */}
      {/* ============================================================ */}
      <ambientLight intensity={0.85} color="#94a3b8" />
      <directionalLight position={[6, 8, 6]} intensity={2.2} color="#ffffff" castShadow />
      <directionalLight position={[-6, -3, -4]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-4, 2, 4]} color="#00f0ff" intensity={2.4} distance={10} />
      <pointLight position={[4, -1, 3]} color="#f59e0b" intensity={2.0} distance={10} />
      <pointLight position={[0, 4, -4]} color="#818cf8" intensity={1.8} distance={12} />
    </group>
  );
}

export default function AstronautCanvas() {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center select-none">
      {/* Glassmorphic Container Shell */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0e1424] via-[#070b14] to-[#04060a] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(56,189,248,0.2)]">
        {/* Background Deep Space Cosmic Glow */}
        <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black pointer-events-none" />

        {/* Top Floating Telemetry Badges */}
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

        {/* Interactive 3D WebGL Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 0.1, 5.8], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <CyberAndroidModel />
        </Canvas>
      </div>
    </div>
  );
}
