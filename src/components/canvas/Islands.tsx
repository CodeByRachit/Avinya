'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// ISLAND 1: THE LAST OUTPOST (Dune Desert Mountain Citadel)
// =========================================================================
export function IslandLastOutpost({ position = [-24, 0, -42] as [number, number, number] }) {
  const flagsRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle flag flutter in desert breeze
    if (flagsRef.current) {
      flagsRef.current.children.forEach((child, i) => {
        child.rotation.y = Math.sin(time * 3.0 + i) * 0.2;
      });
    }
    // Subtle moon breathing glow
    if (moonRef.current) {
      moonRef.current.position.y = 28 + Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. GIANT CELESTIAL SANDSTONE MOON ON THE HORIZON        */}
      {/* ======================================================== */}
      <group position={[6, 28, -26]}>
        <mesh ref={moonRef}>
          <sphereGeometry args={[18, 36, 36]} />
          <meshBasicMaterial color="#ffe8cc" />
        </mesh>
        {/* Soft lunar atmospheric halo ring */}
        <mesh position={[0, 0, -1]}>
          <ringGeometry args={[18.2, 22, 48]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Distant Smaller Companion Moon */}
        <mesh position={[-24, 8, 8]}>
          <sphereGeometry args={[4.5, 24, 24]} />
          <meshBasicMaterial color="#fef3c7" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. LAYERED SANDSTONE CANYON MESAS & BLUFFS               */}
      {/* ======================================================== */}
      {/* Main Base Canyon Plateau */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[18, 24, 5.0, 16]} />
        <meshStandardMaterial
          color="#8c502b"
          roughness={0.9}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Upper Stepped Sandstone Tier */}
      <mesh position={[0, 6.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[14, 17, 4.0, 14]} />
        <meshStandardMaterial
          color="#a35f33"
          roughness={0.85}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Flanking Jagged Mesa Spires */}
      {[
        [-14, 7, 4, 3.2, 9],
        [15, 6, -6, 2.8, 8],
        [-10, 5, -12, 3.0, 7],
        [12, 6.5, 10, 3.5, 9],
        [-16, 4, -4, 2.5, 6],
      ].map(([x, y, z, r, h], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[r * 0.7, r, h, 8]} />
            <meshStandardMaterial
              color="#7c4322"
              roughness={0.9}
              flatShading
            />
          </mesh>
          <mesh position={[0, h / 2 + 0.8, 0]}>
            <coneGeometry args={[r * 0.75, 2.2, 8]} />
            <meshStandardMaterial color="#5a2e16" roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* 3. DESERT MOUNTAIN FORTRESS CITADEL                      */}
      {/* ======================================================== */}
      <group position={[0, 8.2, 0]}>
        {/* Central Bastion Keep */}
        <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 9, 7.5]} />
          <meshStandardMaterial color="#b46f3e" roughness={0.8} />
        </mesh>

        {/* Central High Spire Tower */}
        <group position={[0, 10.5, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[1.4, 2.0, 6, 10]} />
            <meshStandardMaterial color="#96582f" roughness={0.75} />
          </mesh>
          {/* Conical Watchtower Roof */}
          <mesh position={[0, 4.2, 0]}>
            <coneGeometry args={[1.8, 3.2, 10]} />
            <meshStandardMaterial color="#4a2612" roughness={0.7} />
          </mesh>
          {/* Spire Golden Finial */}
          <mesh position={[0, 6.0, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Four Corner Watchtowers with Arched Windows */}
        {[
          [-4.5, 4.5, 4.5],
          [4.5, 4.5, 4.5],
          [-4.5, 4.5, -4.5],
          [4.5, 4.5, -4.5],
        ].map(([tx, ty, tz], idx) => (
          <group key={idx} position={[tx, ty, tz]}>
            <mesh castShadow>
              <cylinderGeometry args={[1.2, 1.4, 8, 8]} />
              <meshStandardMaterial color="#8c502b" roughness={0.8} />
            </mesh>
            <mesh position={[0, 4.8, 0]}>
              <coneGeometry args={[1.4, 2.4, 8]} />
              <meshStandardMaterial color="#4a2612" roughness={0.7} />
            </mesh>
            {/* Glowing Amber Window */}
            <mesh position={[0, 2.0, 1.25]}>
              <planeGeometry args={[0.4, 0.8]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        ))}

        {/* Grand Fortress Canyon Archway Viaduct Bridge */}
        <group position={[0, 1.5, 7.5]}>
          <mesh position={[-3.2, 0, 0]}>
            <boxGeometry args={[1.2, 5, 1.2]} />
            <meshStandardMaterial color="#7c4322" />
          </mesh>
          <mesh position={[3.2, 0, 0]}>
            <boxGeometry args={[1.2, 5, 1.2]} />
            <meshStandardMaterial color="#7c4322" />
          </mesh>
          <mesh position={[0, 2.8, 0]}>
            <boxGeometry args={[7.6, 0.8, 2.0]} />
            <meshStandardMaterial color="#96582f" />
          </mesh>
        </group>
      </group>

      {/* Fluttering Citadel Pennant Flags */}
      <group ref={flagsRef} position={[0, 18, 0]}>
        {[
          [0, 6.2, 0],
          [-4.5, 3.5, 4.5],
          [4.5, 3.5, 4.5],
        ].map(([fx, fy, fz], idx) => (
          <group key={idx} position={[fx, fy, fz]}>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.8, 6]} />
              <meshStandardMaterial color="#2d1c10" />
            </mesh>
            <mesh position={[0.45, 1.3, 0]}>
              <boxGeometry args={[0.85, 0.45, 0.02]} />
              <meshStandardMaterial color="#dc2626" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floating Desert Sandstorm Embers */}
      <Sparkles
        count={75}
        scale={[38, 24, 38]}
        size={4.0}
        speed={0.5}
        color="#f59e0b"
        opacity={0.8}
        position={[0, 14, 0]}
      />

      {/* Warm Golden Island Directional & Ambient Lighting */}
      <pointLight
        color="#f59e0b"
        intensity={4.5}
        distance={42}
        decay={1.6}
        position={[0, 16, 6]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 2: THE PANDEMONIUM (Synthwave Cyberpunk River Delta)
// =========================================================================
export function IslandPandemonium({ position = [26, 0, -108] as [number, number, number] }) {
  const waterfallRef = useRef<THREE.Mesh>(null);
  const synthSunRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Waterfall texture coordinate offset shimmer
    if (waterfallRef.current) {
      waterfallRef.current.position.y = 4.2 + Math.sin(time * 8.0) * 0.08;
    }
    // Pulsing synthwave sun
    if (synthSunRef.current) {
      const s = 1 + Math.sin(time * 1.8) * 0.025;
      synthSunRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. GIANT GLOWING SYNTHWAVE SUN (Half-Submerged Horizon) */}
      {/* ======================================================== */}
      <group position={[0, 18, -32]}>
        <mesh ref={synthSunRef}>
          <circleGeometry args={[22, 48]} />
          <meshBasicMaterial color="#f43f5e" side={THREE.DoubleSide} />
        </mesh>
        {/* Horizontal Synthwave Sun Scanlines */}
        {[-8, -5, -2, 1, 4, 7, 10, 13].map((sy, idx) => (
          <mesh key={idx} position={[0, sy, 0.1]}>
            <planeGeometry args={[42, 0.6 + idx * 0.15]} />
            <meshBasicMaterial color="#0b0f19" />
          </mesh>
        ))}
        {/* Soft Sunset Radial Aura */}
        <pointLight
          color="#f43f5e"
          intensity={6.0}
          distance={65}
          decay={1.5}
          position={[0, 0, 8]}
        />
      </group>

      {/* ======================================================== */}
      {/* 2. RIVER DELTA CLIFF BASE                                */}
      {/* ======================================================== */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[18, 22, 5.0, 16]} />
        <meshStandardMaterial
          color="#161b2e"
          roughness={0.7}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* ======================================================== */}
      {/* 3. CYBERNETIC MEGAPOLIS SKYSCRAPER TOWERS                 */}
      {/* ======================================================== */}
      <group position={[0, 5.0, -4]}>
        {/* Tower 1 (Center High Spire) */}
        <group position={[0, 14, 0]}>
          <mesh castShadow>
            <boxGeometry args={[4.2, 28, 4.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Neon Window Bands */}
          {[-8, -4, 0, 4, 8, 11].map((wy, idx) => (
            <mesh key={idx} position={[0, wy, 2.15]}>
              <planeGeometry args={[3.6, 0.5]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#f43f5e' : '#00f0ff'} />
            </mesh>
          ))}
          {/* Spire Antenna */}
          <mesh position={[0, 15.5, 0]}>
            <cylinderGeometry args={[0.08, 0.18, 5, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          <mesh position={[0, 18.2, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Flanking Cyber Towers */}
        {[
          [-6.5, 10, 2, 3.4, 20, '#00f0ff'],
          [6.5, 11, 1, 3.6, 22, '#f43f5e'],
          [-4.0, 8, -6, 3.0, 16, '#fbbf24'],
          [4.5, 9, -5, 3.2, 18, '#00f0ff'],
          [-9.5, 6, 4, 2.8, 12, '#f43f5e'],
          [9.5, 7, 3, 2.8, 14, '#fbbf24'],
        ].map(([tx, ty, tz, w, h, col], idx) => (
          <group key={idx} position={[tx as number, ty as number, tz as number]}>
            <mesh castShadow>
              <boxGeometry args={[w as number, h as number, w as number]} />
              <meshStandardMaterial color="#0b1120" metalness={0.8} roughness={0.25} />
            </mesh>
            {/* Crown Neon Trim */}
            <mesh position={[0, (h as number) / 2 + 0.05, 0]}>
              <boxGeometry args={[(w as number) + 0.1, 0.25, (w as number) + 0.1]} />
              <meshBasicMaterial color={col as string} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. GRAND ARCHED AQUEDUCT BRIDGES & WATERFALLS            */}
      {/* ======================================================== */}
      <group position={[0, 2.5, 7.5]}>
        {/* Aqueduct Main Span */}
        <mesh position={[0, 3.8, 0]}>
          <boxGeometry args={[19, 1.2, 2.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arched Support Piers */}
        {[-7, -3.5, 0, 3.5, 7].map((px, idx) => (
          <group key={idx} position={[px, 1.4, 0]}>
            <mesh>
              <boxGeometry args={[1.2, 3.6, 2.2]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Glowing Accent Band */}
            <mesh position={[0, 1.6, 1.15]}>
              <planeGeometry args={[0.9, 0.2]} />
              <meshBasicMaterial color="#f43f5e" />
            </mesh>
          </group>
        ))}

        {/* Cascading Animated Waterfalls from the Bridge */}
        <mesh ref={waterfallRef} position={[0, 1.2, 1.22]}>
          <planeGeometry args={[14, 3.8]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Cyberpunk Neon Purple/Cyan Atmospheric Sparkles */}
      <Sparkles
        count={80}
        scale={[36, 26, 36]}
        size={4.2}
        speed={0.6}
        color="#f43f5e"
        opacity={0.85}
        position={[0, 14, 0]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 3: THE CARNIVAL ISLAND (Festive Pier & Illuminated Ferris Wheel)
// =========================================================================
export function IslandCarnival({ position = [-20, 0, -182] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);
  const gondolasRef = useRef<THREE.Group>(null);

  const gondolaCount = 12;
  const wheelRadius = 8.5;

  useFrame((state, delta) => {
    // Ferris wheel rotation
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.22;
    }
    // Keep gondolas swinging upright via counter-rotation
    if (gondolasRef.current) {
      gondolasRef.current.children.forEach((gondola) => {
        gondola.rotation.z = -(wheelRef.current?.rotation.z || 0);
      });
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. CARNIVAL DOCK & PROMONTORY BASE                       */}
      {/* ======================================================== */}
      <mesh position={[0, 2.0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[17, 22, 4.0, 18]} />
        <meshStandardMaterial
          color="#1e1814"
          roughness={0.8}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* ======================================================== */}
      {/* 2. GRAND ILLUMINATED ROTATING FERRIS WHEEL               */}
      {/* ======================================================== */}
      <group position={[0, 13.5, 0]}>
        {/* Support A-Frame Legs (Front & Back Stanchions) */}
        <group position={[0, -5.5, 0]}>
          <mesh position={[-3.2, 0, 1.2]} rotation={[0, 0, 0.25]}>
            <cylinderGeometry args={[0.18, 0.25, 12, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[3.2, 0, 1.2]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.18, 0.25, 12, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[-3.2, 0, -1.2]} rotation={[0, 0, 0.25]}>
            <cylinderGeometry args={[0.18, 0.25, 12, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[3.2, 0, -1.2]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.18, 0.25, 12, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Central Axle Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 3.2, 16]} />
          <meshStandardMaterial color="#e5c158" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 1.65]}>
          <sphereGeometry args={[0.45, 12, 12]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>

        {/* Rotating Wheel Mesh (Dual Outer Rings & Radiating Spokes) */}
        <group ref={wheelRef}>
          {/* Front Outer Ring */}
          <mesh position={[0, 0, 0.9]}>
            <ringGeometry args={[wheelRadius - 0.15, wheelRadius + 0.15, 36]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          {/* Back Outer Ring */}
          <mesh position={[0, 0, -0.9]}>
            <ringGeometry args={[wheelRadius - 0.15, wheelRadius + 0.15, 36]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>

          {/* Radiating Truss Spokes */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx / 12) * Math.PI * 2;
            return (
              <group key={idx} rotation={[0, 0, angle]}>
                <mesh position={[0, wheelRadius / 2, 0]}>
                  <cylinderGeometry args={[0.04, 0.04, wheelRadius, 6]} />
                  <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
                </mesh>
                {/* Glowing Light Nodes along Spokes */}
                <mesh position={[0, wheelRadius * 0.6, 0.95]}>
                  <sphereGeometry args={[0.12, 8, 8]} />
                  <meshBasicMaterial color={idx % 2 === 0 ? '#ef4444' : '#fbbf24'} />
                </mesh>
              </group>
            );
          })}

          {/* Gondolas Container */}
          <group ref={gondolasRef}>
            {Array.from({ length: gondolaCount }).map((_, idx) => {
              const angle = (idx / gondolaCount) * Math.PI * 2;
              const gx = Math.cos(angle) * wheelRadius;
              const gy = Math.sin(angle) * wheelRadius;

              return (
                <group key={idx} position={[gx, gy, 0]}>
                  {/* Passenger Cabin Box */}
                  <mesh position={[0, -0.4, 0]} castShadow>
                    <boxGeometry args={[0.9, 0.75, 0.8]} />
                    <meshStandardMaterial
                      color={idx % 2 === 0 ? '#dc2626' : '#f59e0b'}
                      roughness={0.4}
                    />
                  </mesh>
                  {/* Glowing Cabin Window */}
                  <mesh position={[0, -0.38, 0.42]}>
                    <planeGeometry args={[0.6, 0.35]} />
                    <meshBasicMaterial color="#fef3c7" />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>

        {/* Ferris Wheel Central Golden Point Light */}
        <pointLight
          color="#fbbf24"
          intensity={5.5}
          distance={45}
          decay={1.6}
          position={[0, 0, 3]}
        />
      </group>

      {/* ======================================================== */}
      {/* 3. CARNIVAL BIG-TOP FESTIVAL TENTS (Striped Canopies)    */}
      {/* ======================================================== */}
      {[
        [-10, 4.0, 5, 4.0, 5.5, '#dc2626'],
        [10, 4.0, 4, 3.5, 4.8, '#f59e0b'],
        [-6, 4.0, 11, 2.8, 3.8, '#dc2626'],
        [7, 4.0, 10, 3.0, 4.2, '#f59e0b'],
      ].map(([tx, ty, tz, r, h, col], idx) => (
        <group key={idx} position={[tx as number, ty as number, tz as number]}>
          {/* Main Tent Wall Cylinder */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[r as number, (r as number) * 1.05, 2.4, 16]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.7} />
          </mesh>
          {/* Scalloped Striped Conical Roof */}
          <mesh position={[0, 2.4 + (h as number) / 2, 0]} castShadow>
            <coneGeometry args={[(r as number) * 1.2, h as number, 16]} />
            <meshStandardMaterial color={col as string} roughness={0.6} />
          </mesh>
          {/* Roof Pennant Flag */}
          <mesh position={[0, 2.4 + (h as number) + 0.4, 0]}>
            <boxGeometry args={[0.6, 0.3, 0.02]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* 4. WOODEN BOARDWALK PIER & WATER DOCK POSTS              */}
      {/* ======================================================== */}
      <group position={[0, 1.6, 15]}>
        {/* Main Boardwalk Pier Deck */}
        <mesh receiveShadow>
          <boxGeometry args={[14, 0.5, 6]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.7} />
        </mesh>
        {/* Pilings extending down into water */}
        {[-6, -2, 2, 6].map((wx, idx) => (
          <group key={idx} position={[wx, -1.2, 2.6]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.18, 2.4, 8]} />
              <meshStandardMaterial color="#241710" roughness={0.8} />
            </mesh>
            {/* Pier Post Lantern */}
            <mesh position={[0, 1.8, 0]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshBasicMaterial color="#ffb74d" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Warm Incandescent Festival Sparkles */}
      <Sparkles
        count={85}
        scale={[38, 24, 38]}
        size={4.0}
        speed={0.5}
        color="#fbbf24"
        opacity={0.85}
        position={[0, 12, 0]}
      />
    </group>
  );
}
