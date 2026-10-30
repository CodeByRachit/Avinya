'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// ========================================================
// ISLAND 1: THE LAST OUTPOST (Dune Desert Mountain Citadel)
// Directly modeled from User Image 1: Sandstone Fortress,
// Giant Rising Moon, Archway Bridges, Flags & Desert Embers
// ========================================================
export function IslandLastOutpost({ position = [-24, 0, -38] as [number, number, number] }) {
  const flagsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (flagsRef.current) {
      flagsRef.current.children.forEach((child, i) => {
        child.rotation.y = Math.sin(time * 2.5 + i) * 0.15;
      });
    }
  });

  return (
    <group position={position}>
      {/* Terracotta / Sandstone Mountain Bluff Base */}
      <mesh position={[0, 1.2, 0]} receiveShadow>
        <cylinderGeometry args={[14, 18, 3.5, 14]} />
        <meshStandardMaterial
          color="#6e3c1d"
          roughness={0.9}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* Citadel Multi-Tiered Stone Fortresses */}
      <group position={[0, 3.2, 0]}>
        {/* Main Central Citadel Keep */}
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 8, 5.5]} />
          <meshStandardMaterial color="#8c502b" roughness={0.8} />
        </mesh>

        {/* Central Spire Tower */}
        <mesh position={[0, 9.5, 0]}>
          <cylinderGeometry args={[0.8, 1.5, 4, 8]} />
          <meshStandardMaterial color="#6e3c1d" roughness={0.7} />
        </mesh>
        <mesh position={[0, 12, 0]}>
          <coneGeometry args={[0.9, 2.5, 8]} />
          <meshStandardMaterial color="#4a2510" roughness={0.7} />
        </mesh>

        {/* Flanking Watchtowers */}
        {[
          [-4, 3, 2.5],
          [4, 3.5, -2],
          [-2.5, 2.5, -4],
          [3.5, 2.8, 3],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh castShadow>
              <cylinderGeometry args={[1.2, 1.5, 6, 8]} />
              <meshStandardMaterial color="#7a4422" roughness={0.8} />
            </mesh>
            <mesh position={[0, 3.8, 0]}>
              <coneGeometry args={[1.3, 2, 8]} />
              <meshStandardMaterial color="#4a2510" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Fortress Archway Bridge */}
        <group position={[1, 1.5, 6.5]}>
          <mesh position={[-2.2, 0, 0]}>
            <boxGeometry args={[0.9, 4, 0.9]} />
            <meshStandardMaterial color="#6e3c1d" />
          </mesh>
          <mesh position={[2.2, 0, 0]}>
            <boxGeometry args={[0.9, 4, 0.9]} />
            <meshStandardMaterial color="#6e3c1d" />
          </mesh>
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[5.2, 0.6, 1.4]} />
            <meshStandardMaterial color="#8c502b" />
          </mesh>
        </group>
      </group>

      {/* Billowing Terracotta Citadel Flags */}
      <group ref={flagsRef} position={[0, 8, 0]}>
        {[
          [-4, 3.5, 2.5],
          [0, 8, 0],
          [4, 4, -2],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 2.2, 6]} />
              <meshStandardMaterial color="#2d170a" />
            </mesh>
            <mesh position={[0.45, 1.8, 0]}>
              <planeGeometry args={[0.85, 0.5]} />
              <meshStandardMaterial color="#d9531e" side={THREE.DoubleSide} roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Giant Desert Planetary Moon in Sky (as seen in Image 1) */}
      <group position={[-18, 22, -35]}>
        <mesh>
          <sphereGeometry args={[9.5, 36, 36]} />
          <meshBasicMaterial color="#fcd34d" />
        </mesh>
        {/* Soft atmospheric halo */}
        <mesh scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[9.5, 24, 24]} />
          <meshBasicMaterial color="#fb923c" transparent opacity={0.2} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Warm Golden Sunset Directional Light */}
      <pointLight color="#f59e0b" intensity={4.5} distance={38} decay={1.8} position={[0, 10, 0]} />

      {/* Desert Sandstorm Golden Dust Embers */}
      <Sparkles
        count={75}
        scale={[32, 16, 32]}
        size={2.8}
        speed={0.4}
        color="#fbbf24"
        position={[0, 6, 0]}
      />
    </group>
  );
}

// ========================================================
// ISLAND 2: THE PANDEMONIUM (Sunset Delta & Spire Bridges)
// Directly modeled from User Image 2: Giant Crimson Sun,
// Arched Aqueduct Bridges, Waterfalls, Spire Silhouettes
// ========================================================
export function IslandPandemonium({ position = [26, 0, -104] as [number, number, number] }) {
  const palmRefs = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (palmRefs.current) {
      palmRefs.current.children.forEach((palm, i) => {
        palm.rotation.z = Math.sin(time * 1.5 + i * 0.8) * 0.05;
      });
    }
  });

  return (
    <group position={position}>
      {/* River Delta Island Base */}
      <mesh position={[0, 0.8, 0]} receiveShadow>
        <cylinderGeometry args={[16, 20, 2.5, 16]} />
        <meshStandardMaterial
          color="#1c111e"
          roughness={0.7}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* Massive Arched Aqueduct Viaducts (as in Image 2) */}
      <group position={[-2, 3, 2]}>
        {[-6, -1.5, 3, 7.5].map((x, idx) => (
          <group key={idx} position={[x, 0, 0]}>
            {/* Bridge Pier Pillars */}
            <mesh position={[0, 2, 0]}>
              <boxGeometry args={[1.2, 4.5, 1.6]} />
              <meshStandardMaterial color="#2c1a2e" roughness={0.8} />
            </mesh>
            {/* Arch Top Span */}
            <mesh position={[1.5, 4.3, 0]}>
              <boxGeometry args={[3.2, 0.6, 1.8]} />
              <meshStandardMaterial color="#3d2440" roughness={0.7} />
            </mesh>
            {/* Cascading Waterfall Streams spilling into river */}
            <mesh position={[1.5, 1.6, 0.85]}>
              <planeGeometry args={[1.4, 4.8]} />
              <meshStandardMaterial
                color="#f43f5e"
                emissive="#be123c"
                emissiveIntensity={0.6}
                transparent
                opacity={0.65}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Distant Cybernetic Skyscraper Spires rising through clouds */}
      {[
        [2, 9, -5, 2.8, 17, 2.8],
        [-3, 7, -7, 2.2, 13, 2.2],
        [6, 8, -6, 2.5, 15, 2.5],
        [-7, 5.5, -4, 1.8, 10, 1.8],
      ].map(([x, y, z, w, h, d], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh castShadow>
            <boxGeometry args={[w, h, d]} />
            <meshStandardMaterial color="#180e1b" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Glowing Red Spire Tip */}
          <mesh position={[0, h * 0.5 + 1.2, 0]}>
            <cylinderGeometry args={[0.04, 0.08, 2.4, 6]} />
            <meshBasicMaterial color="#e11d48" />
          </mesh>
        </group>
      ))}

      {/* Tropical Palm Tree Silhouettes (as seen in Image 2) */}
      <group ref={palmRefs} position={[-5, 2.1, 8]}>
        {[
          [0, 0, 0, 1.1],
          [2.5, 0, 1, 0.9],
          [-3, 0, -1, 1.2],
        ].map(([px, py, pz, scale], idx) => (
          <group key={idx} position={[px, py, pz]} scale={[scale, scale, scale]}>
            {/* Curved Trunk */}
            <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0.12]}>
              <cylinderGeometry args={[0.1, 0.2, 3.6, 8]} />
              <meshStandardMaterial color="#2d170a" />
            </mesh>
            {/* Palm Fronds Canopy */}
            <mesh position={[0.2, 3.6, 0]}>
              <sphereGeometry args={[1.4, 8, 8]} />
              <meshStandardMaterial color="#0f1f17" roughness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Giant Crimson Synth Sunset Sun on Horizon (Direct from Image 2) */}
      <group position={[14, 15, -34]}>
        <mesh>
          <sphereGeometry args={[12, 36, 36]} />
          <meshBasicMaterial color="#e11d48" />
        </mesh>
        {/* Soft Sunset Crimson Halo */}
        <mesh scale={[1.1, 1.1, 1.1]}>
          <sphereGeometry args={[12, 24, 24]} />
          <meshBasicMaterial color="#f43f5e" transparent opacity={0.25} side={THREE.BackSide} />
        </mesh>
      </group>

      {/* Sunset Coral Ambient Glow */}
      <pointLight color="#e11d48" intensity={5} distance={35} decay={2} position={[0, 7, 0]} />

      {/* Floating Sunset Atmospheric Mist */}
      <Sparkles
        count={85}
        scale={[32, 18, 32]}
        size={3}
        speed={0.5}
        color="#fb7185"
        position={[0, 6, 0]}
      />
    </group>
  );
}

// ========================================================
// ISLAND 3: THE CARNIVAL ISLAND (Nocturnal Festival & Pier)
// Directly modeled from User Image 3: Glowing Ferris Wheel,
// Red-Gold Circus Tents, Wooden Pier Lanterns & Fairy Castle
// ========================================================
export function IslandCarnival({ position = [-22, 0, -178] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);
  const gondolaRefs = useRef<THREE.Group[]>([]);

  const gondolaCount = 10;
  const wheelRadius = 5.8;

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.28;
      const angle = wheelRef.current.rotation.z;

      // Keep gondola cabins upright as wheel rotates
      gondolaRefs.current.forEach((g) => {
        if (g) g.rotation.z = -angle;
      });
    }
  });

  return (
    <group position={position}>
      {/* Festival Island Plateau Base */}
      <mesh position={[0, 0.8, 0]} receiveShadow>
        <cylinderGeometry args={[16, 20, 2.4, 16]} />
        <meshStandardMaterial
          color="#121824"
          roughness={0.7}
          metalness={0.2}
          flatShading
        />
      </mesh>

      {/* Wooden Boardwalk / Pier Decking (as seen in Image 3 foreground) */}
      <group position={[3, 1.8, 8]} rotation={[0, 0.2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[4, 0.35, 10]} />
          <meshStandardMaterial color="#4a2e1b" roughness={0.8} />
        </mesh>
        {/* Wooden Pilings */}
        {[-1.8, 1.8].map((x) =>
          [-4, -1, 2, 4.5].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, -1.2, z]}>
              <cylinderGeometry args={[0.15, 0.18, 2.8, 8]} />
              <meshStandardMaterial color="#331c0e" roughness={0.9} />
            </mesh>
          ))
        )}
        {/* Pier Nautical Lanterns on Wooden Posts */}
        {[-1.8, 1.8].map((x, i) => (
          <group key={i} position={[x, 0.8, 2]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.25, 0.45, 0.25]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshBasicMaterial color="#ffb74d" />
            </mesh>
            <pointLight color="#f59e0b" intensity={2} distance={6} />
          </group>
        ))}
      </group>

      {/* Illuminated Golden-Red Ferris Wheel (as seen in Image 3) */}
      <group position={[-5, 8.5, 0]} rotation={[0, 0.3, 0]}>
        {/* Heavy Timber Support A-Frame */}
        <mesh position={[-0.8, -3.2, 1.4]} rotation={[0.2, 0, 0.15]}>
          <cylinderGeometry args={[0.14, 0.2, 7.5, 8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.8} />
        </mesh>
        <mesh position={[0.8, -3.2, 1.4]} rotation={[0.2, 0, -0.15]}>
          <cylinderGeometry args={[0.14, 0.2, 7.5, 8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.8} />
        </mesh>
        <mesh position={[-0.8, -3.2, -1.4]} rotation={[-0.2, 0, 0.15]}>
          <cylinderGeometry args={[0.14, 0.2, 7.5, 8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.8} />
        </mesh>
        <mesh position={[0.8, -3.2, -1.4]} rotation={[-0.2, 0, -0.15]}>
          <cylinderGeometry args={[0.14, 0.2, 7.5, 8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.8} />
        </mesh>

        {/* Central Axle Hub */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.6, 1.2, 16]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>

        {/* The Rotating Wheel Assembly */}
        <group ref={wheelRef}>
          {/* Dual Concentric Rings with Warm Bulbs */}
          <mesh position={[0, 0, 0.4]}>
            <torusGeometry args={[wheelRadius, 0.09, 8, 40]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[0, 0, -0.4]}>
            <torusGeometry args={[wheelRadius, 0.09, 8, 40]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>

          {/* Spokes & Hanging Gondolas */}
          {Array.from({ length: gondolaCount }).map((_, i) => {
            const angle = (i / gondolaCount) * Math.PI * 2;
            const x = Math.cos(angle) * wheelRadius;
            const y = Math.sin(angle) * wheelRadius;
            const spokeColor = i % 2 === 0 ? '#f59e0b' : '#ef4444';

            return (
              <group key={i}>
                {/* Spoke Rod */}
                <mesh
                  position={[x * 0.5, y * 0.5, 0]}
                  rotation={[0, 0, angle - Math.PI / 2]}
                >
                  <cylinderGeometry args={[0.035, 0.035, wheelRadius, 6]} />
                  <meshBasicMaterial color={spokeColor} />
                </mesh>

                {/* Hanging Gondola Cabin */}
                <group
                  position={[x, y, 0]}
                  ref={(el) => {
                    if (el) gondolaRefs.current[i] = el;
                  }}
                >
                  <mesh position={[0, -0.32, 0]}>
                    <boxGeometry args={[0.75, 0.7, 0.65]} />
                    <meshStandardMaterial color="#b91c1c" roughness={0.4} />
                  </mesh>
                  {/* Glowing warm interior cabin window */}
                  <mesh position={[0, -0.3, 0.34]}>
                    <planeGeometry args={[0.45, 0.35]} />
                    <meshBasicMaterial color="#fef08a" />
                  </mesh>
                </group>
              </group>
            );
          })}
        </group>
      </group>

      {/* Red & Gold Striped Carnival Tents / Pavilions (as in Image 3) */}
      {[
        [2, 3.2, 1, 2.8, 3.4],
        [6.5, 3.0, 2.5, 2.2, 2.8],
        [-1, 3.0, 4.5, 2.0, 2.6],
      ].map(([tx, ty, tz, tr, th], idx) => (
        <group key={idx} position={[tx, ty, tz]}>
          {/* Cylindrical Base Wall */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[tr, tr, 1.4, 16]} />
            <meshStandardMaterial color="#f5f2eb" roughness={0.8} />
          </mesh>
          {/* Striped Conical Roof */}
          <mesh position={[0, 1.4 + th * 0.5, 0]}>
            <coneGeometry args={[tr * 1.15, th, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Distant Illuminated Hilltop Fairy-Tale Castle (as in Image 3 background) */}
      <group position={[4, 9, -12]}>
        <mesh>
          <coneGeometry args={[4, 7, 8]} />
          <meshStandardMaterial color="#1a2333" roughness={0.9} />
        </mesh>
        {/* Spire Pinpoints of Warm Castle Lights */}
        {[-1.5, 0, 1.5].map((cx, i) => (
          <group key={i} position={[cx, 3 + i * 0.8, 0]}>
            <mesh position={[0, 1, 0]}>
              <coneGeometry args={[0.4, 2, 6]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Festival Lights Ambient Warm Glow */}
      <pointLight color="#f59e0b" intensity={5.5} distance={38} decay={1.8} position={[-2, 9, 2]} />
      <pointLight color="#ef4444" intensity={3.5} distance={24} decay={1.8} position={[4, 5, 2]} />

      {/* Floating Celebratory Golden Confetti & Embers */}
      <Sparkles
        count={110}
        scale={[35, 18, 35]}
        size={3.2}
        speed={0.9}
        color="#fde047"
        position={[0, 7, 0]}
      />
    </group>
  );
}
