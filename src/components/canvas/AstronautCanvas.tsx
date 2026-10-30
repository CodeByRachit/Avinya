'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// REALISTIC HIGH-DETAIL CYBER-ANDROID ROBOT (HACK2FUTURE FLAGSHIP)
// Features:
// - Precision-sculpted ceramic titanium cranial chassis & composite armor plates
// - Obsidian curved quantum visor with chromatic Fresnel reflections & neon HUD reticle
// - Articulated hydraulic neck pistons & exposed braided titanium fiber cables
// - Sculpted cyber-torso cuirass with glowing quantum arc reactor core
// - Articulated shoulder pauldrons & collarbone diagnostic micro-LEDs
// - Gyroscopic orbital telemetry rings with navigational degree markers
// - Smooth mouse/cursor tracking with weighted mechanical kinematics
// =========================================================================
function CyberAndroidModel() {
  const robotGroup = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth weighted cursor tracking for head & torso
    if (headGroup.current && robotGroup.current) {
      const targetHeadRotY = (state.pointer.x * Math.PI) / 6;
      const targetHeadRotX = (-state.pointer.y * Math.PI) / 8;

      headGroup.current.rotation.y = THREE.MathUtils.lerp(
        headGroup.current.rotation.y,
        targetHeadRotY,
        delta * 3.5
      );
      headGroup.current.rotation.x = THREE.MathUtils.lerp(
        headGroup.current.rotation.x,
        targetHeadRotX,
        delta * 3.5
      );

      // Subtle torso follow
      robotGroup.current.rotation.y = THREE.MathUtils.lerp(
        robotGroup.current.rotation.y,
        targetHeadRotY * 0.35,
        delta * 2.0
      );
    }

    // Pulsing quantum arc reactor core
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.8 + Math.sin(time * 3.5) * 1.2;
    }

    // Gyroscopic orbital telemetry rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
      ring1Ref.current.rotation.x += delta * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.28;
      ring2Ref.current.rotation.y += delta * 0.30;
    }
  });

  return (
    <group ref={robotGroup} position={[0, -0.4, 0]}>
      {/* Zero-G Gentle Floating Inertia */}
      <Float speed={2.0} rotationIntensity={0.25} floatIntensity={0.6}>
        {/* ======================================================== */}
        {/* 1. ARTICULATED CYBER-ANDROID HEAD                       */}
        {/* ======================================================== */}
        <group ref={headGroup} position={[0, 1.25, 0]}>
          {/* Main Cranial Helm Shell (Ceramic Titanium Alloy) */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1.35, 48, 48]} />
            <meshStandardMaterial
              color="#e2e8f0"
              roughness={0.18}
              metalness={0.88}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Cranial Top Aerodynamic Cowling Armor Plate */}
          <mesh position={[0, 0.45, -0.15]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[1.5, 0.4, 1.6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Lateral Jaw / Cheek Mandible Armor Plates */}
          {[-0.88, 0.88].map((jx, idx) => (
            <group key={idx} position={[jx, -0.25, 0.45]} rotation={[0.1, jx > 0 ? -0.25 : 0.25, 0]}>
              <mesh castShadow>
                <boxGeometry args={[0.32, 0.85, 0.9]} />
                <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.75} />
              </mesh>
              {/* Gold Accent Strip */}
              <mesh position={[jx > 0 ? 0.17 : -0.17, 0, 0]}>
                <boxGeometry args={[0.04, 0.75, 0.75]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}

          {/* Wraparound Obsidian Quantum Visor Shield */}
          <group position={[0, 0.05, 0.65]} rotation={[0.08, 0, 0]}>
            <mesh ref={visorRef} castShadow>
              <sphereGeometry args={[0.92, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
              <meshPhysicalMaterial
                color="#050811"
                roughness={0.04}
                metalness={0.95}
                clearcoat={1.0}
                clearcoatRoughness={0.06}
                reflectivity={1.0}
              />
            </mesh>

            {/* Glowing Internal Cyan Holographic HUD Reticle */}
            <mesh position={[0, 0.05, 0.88]}>
              <ringGeometry args={[0.22, 0.26, 32]} />
              <meshBasicMaterial
                color="#00f0ff"
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, 0.05, 0.88]}>
              <ringGeometry args={[0.38, 0.40, 32]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Center HUD Aim Point */}
            <mesh position={[0, 0.05, 0.88]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            {/* Horizontal Telemetry Bracket Lines */}
            {[-0.55, 0.55].map((bx, idx) => (
              <mesh key={idx} position={[bx, 0.05, 0.82]}>
                <planeGeometry args={[0.24, 0.02]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            ))}
          </group>

          {/* Lateral Auditory Communication / Heatsink Sensor Pods */}
          {[-1.38, 1.38].map((ex, idx) => (
            <group key={idx} position={[ex, 0, -0.05]} rotation={[0, ex > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
              {/* Outer Cylinder Housing */}
              <mesh>
                <cylinderGeometry args={[0.42, 0.46, 0.28, 32]} />
                <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
              </mesh>
              {/* Copper Heatsink Cooling Core */}
              <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.32, 0.32, 0.1, 24]} />
                <meshStandardMaterial color="#ea580c" metalness={0.9} roughness={0.3} />
              </mesh>
              {/* Status LED Diagnostic Indicator */}
              <mesh position={[0.22, 0.18, 0]}>
                <sphereGeometry args={[0.045, 12, 12]} />
                <meshBasicMaterial color={ex > 0 ? '#10b981' : '#00f0ff'} />
              </mesh>
            </group>
          ))}

          {/* Chin Vocoder Grille */}
          <group position={[0, -0.75, 0.8]} rotation={[-0.25, 0, 0]}>
            {[-0.18, -0.06, 0.06, 0.18].map((gx, idx) => (
              <mesh key={idx} position={[gx, 0, 0]}>
                <boxGeometry args={[0.04, 0.25, 0.08]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
              </mesh>
            ))}
          </group>
        </group>

        {/* ======================================================== */}
        {/* 2. ARTICULATED HYDRAULIC NECK & CERVICAL VERTEBRAE       */}
        {/* ======================================================== */}
        <group position={[0, 0.38, 0]}>
          {/* Central Structural Neck Column */}
          <mesh>
            <cylinderGeometry args={[0.45, 0.55, 0.85, 24]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Hydraulic Actuator Pistons (Left & Right) */}
          {[-0.38, 0.38].map((px, idx) => (
            <mesh key={idx} position={[px, 0, 0.2]} rotation={[0, 0, px > 0 ? -0.15 : 0.15]}>
              <cylinderGeometry args={[0.08, 0.08, 0.75, 16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
            </mesh>
          ))}
          {/* Braided Fiber Cables behind Neck */}
          {[-0.2, 0, 0.2].map((cx, idx) => (
            <mesh key={idx} position={[cx, 0, -0.32]} rotation={[0.15, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
              <meshStandardMaterial color="#475569" roughness={0.7} />
            </mesh>
          ))}
        </group>

        {/* ======================================================== */}
        {/* 3. SCULPTED CYBER-TORSO CUIRASS & QUANTUM REACTOR CORE   */}
        {/* ======================================================== */}
        <group position={[0, -0.7, 0]}>
          {/* Main Chest Armor Breastplate (Ceramic White Alloy) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.8, 1.4, 1.6]} />
            <meshStandardMaterial
              color="#f1f5f9"
              roughness={0.18}
              metalness={0.85}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Pectoral Segment Chamfers */}
          {[-0.85, 0.85].map((px, idx) => (
            <mesh key={idx} position={[px, 0.3, 0.82]} rotation={[0, px > 0 ? -0.2 : 0.2, 0]}>
              <boxGeometry args={[0.9, 0.65, 0.12]} />
              <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.75} />
            </mesh>
          ))}

          {/* Central Quantum Arc Reactor Power Core */}
          <group position={[0, 0.15, 0.82]}>
            {/* Outer Bevelled Ring Bezel */}
            <mesh>
              <cylinderGeometry args={[0.38, 0.42, 0.12, 32]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Brass Core Retainer Collar */}
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.32, 0.34, 0.05, 32]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
            </mesh>
            {/* Glowing Cyan Reactor Lens */}
            <mesh position={[0, 0.09, 0]}>
              <sphereGeometry args={[0.26, 24, 24]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
            {/* Reactor Volumetric Point Light */}
            <pointLight
              ref={coreLightRef}
              color="#00f0ff"
              intensity={4.2}
              distance={6}
              decay={1.8}
              position={[0, 0.2, 0]}
            />
          </group>

          {/* Collarbone Telemetry Sensors & Indicator LEDs */}
          {[-0.9, 0.9].map((lx, idx) => (
            <group key={idx} position={[lx, 0.68, 0.65]}>
              <mesh>
                <boxGeometry args={[0.35, 0.08, 0.15]} />
                <meshStandardMaterial color="#0f172a" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.05, 0]}>
                <sphereGeometry args={[0.035, 12, 12]} />
                <meshBasicMaterial color={lx > 0 ? '#10b981' : '#f59e0b'} />
              </mesh>
            </group>
          ))}

          {/* ======================================================== */}
          {/* 4. ARTICULATED SHOULDER PAULDRONS & ARMS                */}
          {/* ======================================================== */}
          {[-1.85, 1.85].map((sx, idx) => (
            <group key={idx} position={[sx, 0.45, 0]}>
              {/* Ball-Joint Shoulder Socket */}
              <mesh castShadow>
                <sphereGeometry args={[0.48, 24, 24]} />
                <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Outer Curved Shoulder Pauldron Shield */}
              <mesh position={[sx > 0 ? 0.25 : -0.25, 0.15, 0]} rotation={[0, 0, sx > 0 ? -0.25 : 0.25]}>
                <boxGeometry args={[0.85, 0.75, 1.35]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
              </mesh>
              {/* Upper Bicep Arm Segment */}
              <mesh position={[sx > 0 ? 0.15 : -0.15, -0.85, 0]}>
                <cylinderGeometry args={[0.32, 0.28, 1.1, 24]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ======================================================== */}
        {/* 5. DUAL GYROSCOPIC ORBITAL TELEMETRY RINGS               */}
        {/* ======================================================== */}
        {/* Orbital Ring 1 (Precision Gold Navigational Ring) */}
        <group ref={ring1Ref} position={[0, 0.3, 0]}>
          <mesh>
            <torusGeometry args={[3.2, 0.04, 16, 64]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#b45309"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
          {/* Orbital Satellite Node */}
          <mesh position={[3.2, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Orbital Ring 2 (Cyan Data Vector Ring) */}
        <group ref={ring2Ref} position={[0, 0.3, 0]} rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[3.6, 0.035, 16, 64]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.5}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[-3.6, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
      </Float>

      {/* Floating Ambient Quantum Energy Motes */}
      <Sparkles
        count={65}
        scale={[10, 10, 10]}
        size={2.8}
        speed={0.5}
        color="#38bdf8"
      />
      <Sparkles
        count={35}
        scale={[8, 8, 8]}
        size={2.2}
        speed={0.4}
        color="#f59e0b"
      />

      {/* Studio Lighting tailored for Metallic & Ceramic PBR Materials */}
      <ambientLight intensity={0.8} color="#94a3b8" />
      <directionalLight position={[8, 10, 8]} intensity={2.8} color="#f8fafc" castShadow />
      <directionalLight position={[-8, -4, -6]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[0, 5, 4]} color="#ffffff" intensity={2.0} distance={12} />
      <pointLight position={[-5, 2, 4]} color="#38bdf8" intensity={2.5} distance={10} />
      <pointLight position={[5, -2, 3]} color="#f59e0b" intensity={2.5} distance={10} />
    </group>
  );
}

export default function AstronautCanvas() {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center relative select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <CyberAndroidModel />
      </Canvas>
    </div>
  );
}
