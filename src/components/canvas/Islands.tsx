'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ========================================================
// ISLAND 1: THE LAST OUTPOST (Dune Desert / Arrakis Citadel)
// ========================================================
export function IslandLastOutpost({ position = [-26, 0, -38] as [number, number, number] }) {
  const monoliths = useMemo(
    () => [
      { pos: [0, 6, 0] as [number, number, number], scale: [3.5, 12, 3.5] as [number, number, number], rot: [0, 0.2, 0] },
      { pos: [-5, 4.5, 3] as [number, number, number], scale: [2.5, 9, 2.5] as [number, number, number], rot: [0.1, -0.4, 0] },
      { pos: [4, 5, -2] as [number, number, number], scale: [2.8, 10, 2.8] as [number, number, number], rot: [-0.1, 0.5, 0.05] },
      { pos: [-3, 3, -6] as [number, number, number], scale: [2, 6, 2] as [number, number, number], rot: [0, 0.8, -0.1] },
      { pos: [6, 3.5, 4] as [number, number, number], scale: [2.2, 7, 2.2] as [number, number, number], rot: [0.2, 0.1, 0] },
    ],
    []
  );

  return (
    <group position={position}>
      {/* Sandy Bedrock Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[14, 18, 1.2, 12]} />
        <meshStandardMaterial
          color="#38240f"
          roughness={0.9}
          metalness={0.1}
          flatShading
        />
      </mesh>

      {/* Monolithic Obelisks */}
      {monoliths.map((m, idx) => (
        <group key={idx} position={m.pos} rotation={m.rot as any}>
          {/* Main Stone Pillar */}
          <mesh castShadow receiveShadow>
            <coneGeometry args={[m.scale[0] * 0.5, m.scale[1], 4]} />
            <meshStandardMaterial
              color="#4a3118"
              roughness={0.7}
              metalness={0.2}
              flatShading
            />
          </mesh>
          {/* Glowing Golden Monolith Seam / Core */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, m.scale[1] * 0.9, 6]} />
            <meshBasicMaterial color="#ffb300" />
          </mesh>
        </group>
      ))}

      {/* Desert Archway Gate */}
      <group position={[1, 2.5, 8]} rotation={[0, 0.4, 0]}>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[0.8, 5, 0.8]} />
          <meshStandardMaterial color="#4a3118" flatShading />
        </mesh>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[0.8, 5, 0.8]} />
          <meshStandardMaterial color="#4a3118" flatShading />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[5.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#ffb300" emissive="#ffb300" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Warm Dune Light Source */}
      <pointLight color="#ff9500" intensity={4.5} distance={30} decay={2} position={[0, 8, 0]} />

      {/* Floating Sandstorm Embers */}
      <Sparkles
        count={75}
        scale={[28, 14, 28]}
        size={3.2}
        speed={0.5}
        color="#ffb300"
        position={[0, 5, 0]}
      />

      {/* Twin Moons in the Background Sky */}
      <group position={[-16, 26, -30]}>
        {/* Primary Giant Desert Moon */}
        <mesh>
          <sphereGeometry args={[7, 32, 32]} />
          <meshBasicMaterial color="#ffc107" />
        </mesh>
        {/* Secondary Crescent Moon */}
        <mesh position={[12, 6, -10]}>
          <sphereGeometry args={[3.2, 24, 24]} />
          <meshBasicMaterial color="#ffe082" />
        </mesh>
      </group>
    </group>
  );
}

// ========================================================
// ISLAND 2: THE PANDEMONIUM (Cyberpunk Synthwave Megacity)
// ========================================================
export function IslandPandemonium({ position = [28, 0, -102] as [number, number, number] }) {
  const towers = useMemo(
    () => [
      { pos: [0, 8, 0] as [number, number, number], size: [3.5, 16, 3.5] as [number, number, number], color: '#ff007f' },
      { pos: [-4, 6.5, 3] as [number, number, number], size: [3, 13, 2.5] as [number, number, number], color: '#00f0ff' },
      { pos: [4.5, 9.5, -2] as [number, number, number], size: [2.8, 19, 2.8] as [number, number, number], color: '#9d4edd' },
      { pos: [-3, 5, -5] as [number, number, number], size: [2.5, 10, 2.5] as [number, number, number], color: '#ff007f' },
      { pos: [5, 7, 4] as [number, number, number], size: [3.2, 14, 3] as [number, number, number], color: '#00f0ff' },
      { pos: [0, 4, 6] as [number, number, number], size: [2.2, 8, 2.2] as [number, number, number], color: '#ff007f' },
      { pos: [-7, 4.5, 0] as [number, number, number], size: [2, 9, 2] as [number, number, number], color: '#00f0ff' },
    ],
    []
  );

  return (
    <group position={position}>
      {/* Cybernetic Grid Island Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[15, 19, 1.2, 16]} />
        <meshStandardMaterial
          color="#060913"
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>

      {/* Skyscraper Silhouettes */}
      {towers.map((t, idx) => (
        <group key={idx} position={t.pos}>
          {/* Main Dark Tower Block */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={t.size} />
            <meshStandardMaterial
              color="#090d1a"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>

          {/* Glowing Vertical Edge Neon Line */}
          <mesh position={[t.size[0] * 0.5 + 0.02, 0, t.size[2] * 0.5 + 0.02]}>
            <boxGeometry args={[0.08, t.size[1], 0.08]} />
            <meshBasicMaterial color={t.color} />
          </mesh>

          {/* Roof Spire Antenna */}
          <mesh position={[0, t.size[1] * 0.5 + 1.2, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 2.4, 8]} />
            <meshBasicMaterial color={t.color} />
          </mesh>
        </group>
      ))}

      {/* Wireframe Holographic Bridges */}
      <mesh position={[0, 4, 3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[8, 0.3, 1.2]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>
      <mesh position={[2, 6, -1]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[7, 0.3, 1.2]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Giant Synthwave Sunset Sun with Scanline Grooves */}
      <group position={[18, 16, -28]}>
        {/* Sun Sphere */}
        <mesh>
          <sphereGeometry args={[12, 32, 32]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        {/* Synthwave horizontal dark blinds/scanlines */}
        {[-3, -1, 1, 3, 5, 7].map((y, i) => (
          <mesh key={i} position={[0, y, 0.2]}>
            <boxGeometry args={[25, 0.45 + i * 0.12, 0.1]} />
            <meshBasicMaterial color="#05070d" />
          </mesh>
        ))}
      </group>

      {/* Neon Lighting Atmosphere */}
      <pointLight color="#ff007f" intensity={5} distance={32} decay={2} position={[-2, 8, 2]} />
      <pointLight color="#00f0ff" intensity={4} distance={28} decay={2} position={[4, 6, -2]} />

      {/* Cyberpunk Dust & Digital Embers */}
      <Sparkles
        count={85}
        scale={[30, 16, 30]}
        size={3}
        speed={0.8}
        color="#00f0ff"
        position={[0, 7, 0]}
      />
    </group>
  );
}

// ========================================================
// ISLAND 3: THE CARNIVAL ISLAND (Festival Night & Ferris Wheel)
// ========================================================
export function IslandCarnival({ position = [-24, 0, -178] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);
  const gondolaRefs = useRef<THREE.Group[]>([]);

  const gondolaCount = 8;
  const wheelRadius = 5.2;

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.35;
      const currentWheelAngle = wheelRef.current.rotation.z;

      // Keep gondolas hanging upright as the wheel turns!
      gondolaRefs.current.forEach((gondola) => {
        if (gondola) {
          gondola.rotation.z = -currentWheelAngle;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* Carnival Festival Pier Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[16, 20, 1.2, 16]} />
        <meshStandardMaterial
          color="#130b24"
          roughness={0.6}
          metalness={0.3}
          flatShading
        />
      </mesh>

      {/* Support A-Frame Legs for Ferris Wheel */}
      <group position={[0, 4.5, 0]}>
        <mesh position={[-0.8, -1.8, 1.5]} rotation={[0.25, 0, 0.2]}>
          <cylinderGeometry args={[0.1, 0.15, 6.2, 8]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
        <mesh position={[0.8, -1.8, 1.5]} rotation={[0.25, 0, -0.2]}>
          <cylinderGeometry args={[0.1, 0.15, 6.2, 8]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
        <mesh position={[-0.8, -1.8, -1.5]} rotation={[-0.25, 0, 0.2]}>
          <cylinderGeometry args={[0.1, 0.15, 6.2, 8]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
        <mesh position={[0.8, -1.8, -1.5]} rotation={[-0.25, 0, -0.2]}>
          <cylinderGeometry args={[0.1, 0.15, 6.2, 8]} />
          <meshStandardMaterial color="#374151" metalness={0.8} />
        </mesh>
      </group>

      {/* Rotating Ferris Wheel Assembly */}
      <group position={[0, 8, 0]}>
        {/* Central Hub & Star */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 1.4, 16]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        <pointLight color="#ff007f" intensity={3} distance={15} />

        {/* The Wheel Structure (Rotates in Z) */}
        <group ref={wheelRef}>
          {/* Dual Outer Rings */}
          <mesh position={[0, 0, 0.45]}>
            <torusGeometry args={[wheelRadius, 0.08, 8, 36]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh position={[0, 0, -0.45]}>
            <torusGeometry args={[wheelRadius, 0.08, 8, 36]} />
            <meshBasicMaterial color="#ffb300" />
          </mesh>

          {/* Spokes & Gondolas */}
          {Array.from({ length: gondolaCount }).map((_, i) => {
            const angle = (i / gondolaCount) * Math.PI * 2;
            const x = Math.cos(angle) * wheelRadius;
            const y = Math.sin(angle) * wheelRadius;
            const spokeColor = i % 2 === 0 ? '#ff007f' : '#00f0ff';

            return (
              <group key={i}>
                {/* Spoke Beam from Hub to Rim */}
                <mesh
                  position={[x * 0.5, y * 0.5, 0]}
                  rotation={[0, 0, angle - Math.PI / 2]}
                >
                  <cylinderGeometry args={[0.03, 0.03, wheelRadius, 6]} />
                  <meshBasicMaterial color={spokeColor} />
                </mesh>

                {/* Hanging Gondola Cabin */}
                <group
                  position={[x, y, 0]}
                  ref={(el) => {
                    if (el) gondolaRefs.current[i] = el;
                  }}
                >
                  <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.7, 0.65, 0.6]} />
                    <meshStandardMaterial
                      color="#f43f5e"
                      emissive="#f43f5e"
                      emissiveIntensity={0.5}
                      roughness={0.3}
                    />
                  </mesh>
                  {/* Glowing Gondola Window */}
                  <mesh position={[0, -0.28, 0.31]}>
                    <planeGeometry args={[0.45, 0.3]} />
                    <meshBasicMaterial color="#ffffff" />
                  </mesh>
                </group>
              </group>
            );
          })}
        </group>
      </group>

      {/* Festival Waterfront Lantern Poles */}
      {[
        [-6, 1.2, 5],
        [-3, 1.2, 7],
        [2, 1.2, 7],
        [6, 1.2, 5],
        [7, 1.2, -4],
        [-7, 1.2, -4],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          {/* Lantern Pole */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 2.4, 8]} />
            <meshStandardMaterial color="#4b5563" metalness={0.8} />
          </mesh>
          {/* Glowing Lantern Orb */}
          <mesh position={[0, 2.5, 0]}>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshBasicMaterial color="#ffb300" />
          </mesh>
          <pointLight color="#ffb300" intensity={1.8} distance={6} position={[0, 2.5, 0]} />
        </group>
      ))}

      {/* Main Carnival Festival Light */}
      <pointLight color="#a855f7" intensity={5} distance={32} decay={2} position={[0, 10, 4]} />

      {/* Celebratory Floating Confetti & Sparkles */}
      <Sparkles
        count={120}
        scale={[32, 18, 32]}
        size={3.8}
        speed={1.2}
        color="#ffd700"
        position={[0, 8, 0]}
      />
    </group>
  );
}
