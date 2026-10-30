'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// ISLAND 1: THE LAST OUTPOST (Dune Desert Mountain Citadel)
// High-vector-density Petra/Dune ancient sandstone citadel:
// - 64-segment terraced rock strata with carved stone staircases
// - Central palace with fluted colonnade portico & crenelated battlements
// - 6 high-polygon watchtowers (32 segments) with arched stone embrasures
// - Double-barrel vaulted canyon viaduct bridge with keystones
// - Glowing ancient techno-runes carved into the stone
// - Tripod fire braziers & stone harbor quay
// - High-subdivision celestial moon with atmospheric corona
// =========================================================================
export function IslandLastOutpost({ position = [-44, 0, -60] as [number, number, number] }) {
  const flagsRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const brazierLightRef = useRef<THREE.PointLight>(null);
  const runeGlowRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Fluttering citadel pennant flags
    if (flagsRef.current) {
      flagsRef.current.children.forEach((flag, idx) => {
        flag.rotation.y = Math.sin(time * 3.6 + idx * 1.5) * 0.24;
        flag.rotation.z = Math.cos(time * 2.8 + idx) * 0.10;
      });
    }

    // Celestial moon gentle floating
    if (moonRef.current) {
      moonRef.current.position.y = 26 + Math.sin(time * 0.4) * 0.4;
    }

    // Dynamic fire brazier flicker
    if (brazierLightRef.current) {
      brazierLightRef.current.intensity = 4.5 + Math.sin(time * 11) * 0.7 + Math.sin(time * 23) * 0.3;
    }

    // Ancient techno-rune pulse
    if (runeGlowRef.current) {
      runeGlowRef.current.opacity = 0.55 + Math.sin(time * 2.0) * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. HIGH-SUBDIVISION CELESTIAL MOON & CORONA             */}
      {/* ======================================================== */}
      <group position={[6, 26, -24]}>
        <mesh ref={moonRef}>
          <sphereGeometry args={[18, 64, 64]} />
          <meshBasicMaterial color="#ffeacc" />
        </mesh>
        {/* Luminous Inner Atmosphere Halo */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[18.1, 23.5, 64]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Outer Radiant Corona */}
        <mesh position={[0, 0, -0.8]}>
          <ringGeometry args={[23.5, 30.0, 64]} />
          <meshBasicMaterial
            color="#d97706"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Companion Crescent Moon */}
        <mesh position={[-25, 9, 8]}>
          <sphereGeometry args={[4.8, 32, 32]} />
          <meshBasicMaterial color="#fef3c7" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. HIGH-DENSITY SCULPTED CANYON STRATA (64 SEGMENTS)     */}
      {/* ======================================================== */}
      {/* Tier 1: Submerged Coastal Base Plateau (Smooth Normals) */}
      <mesh position={[0, 1.8, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[22, 27, 4.0, 64, 4]} />
        <meshStandardMaterial
          color="#7c3f1d"
          roughness={0.88}
          metalness={0.08}
        />
      </mesh>

      {/* Tier 2: Lower Stepped Sandstone Shelf */}
      <mesh position={[0, 4.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[18, 22, 3.2, 64, 4]} />
        <meshStandardMaterial
          color="#9c5427"
          roughness={0.85}
          metalness={0.06}
        />
      </mesh>

      {/* Tier 3: Upper Citadel Plateau */}
      <mesh position={[0, 7.0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[15, 18, 3.5, 64, 4]} />
        <meshStandardMaterial
          color="#b86b36"
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      {/* Carved Cliff-Side Grand Stairway to the Citadel */}
      <group position={[0, 3.2, 16.5]} rotation={[-0.42, 0, 0]}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <mesh key={idx} position={[0, idx * 0.32, -idx * 0.55]}>
            <boxGeometry args={[4.2, 0.28, 0.65]} />
            <meshStandardMaterial color="#8a4720" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* High-Poly Canyon Mesa Spires & Rock Needles (32 segments each) */}
      {[
        [-17, 7.5, 6, 3.6, 11],
        [18, 6.8, -7, 3.2, 10],
        [-13, 6.0, -14, 3.4, 9],
        [15, 7.2, 12, 3.8, 11],
        [-19, 5.0, -6, 3.0, 8],
        [20, 5.5, 5, 2.8, 8.5],
      ].map(([x, y, z, r, h], idx) => (
        <group key={idx} position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[r * 0.72, r, h, 32, 4]} />
            <meshStandardMaterial color="#8c4922" roughness={0.88} />
          </mesh>
          {/* Weathered Cone Cap */}
          <mesh position={[0, h / 2 + 1.0, 0]}>
            <coneGeometry args={[r * 0.76, 2.6, 32]} />
            <meshStandardMaterial color="#683416" roughness={0.92} />
          </mesh>
          {/* Carved Stone Band Trim */}
          <mesh position={[0, h * 0.2, 0]}>
            <cylinderGeometry args={[r * 0.88, r * 0.88, 0.45, 32]} />
            <meshStandardMaterial color="#b46835" roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Shoreline Weathered Boulders (32 segments) */}
      {[
        [-18, 0.5, 20, 2.8],
        [-9, 0.4, 23, 2.2],
        [7, 0.5, 22, 2.5],
        [20, 0.4, 18, 2.9],
        [23, 0.3, -9, 2.4],
        [-22, 0.3, -12, 2.6],
      ].map(([bx, by, bz, bs], idx) => (
        <mesh key={idx} position={[bx, by, bz]} castShadow receiveShadow>
          <sphereGeometry args={[bs, 24, 24]} />
          <meshStandardMaterial color="#6d3618" roughness={0.95} />
        </mesh>
      ))}

      {/* ======================================================== */}
      {/* 3. MONUMENTAL MOUNTAIN CITADEL FORTRESS                  */}
      {/* ======================================================== */}
      <group position={[0, 8.8, 0]}>
        {/* Central Palace Donjon (Multi-Tiered Stepped Keep) */}
        <group position={[0, 5.0, 0]}>
          {/* Base Palace Block */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[9.0, 8.5, 9.0]} />
            <meshStandardMaterial color="#b86b36" roughness={0.75} />
          </mesh>

          {/* Stepped Upper Tier with Bevelled Cornice */}
          <mesh position={[0, 4.8, 0]} castShadow>
            <boxGeometry args={[7.2, 3.2, 7.2]} />
            <meshStandardMaterial color="#ca7d45" roughness={0.72} />
          </mesh>

          {/* Palace Roof Parapet / Crenelated Battlements */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((cx, idx) => (
            <React.Fragment key={idx}>
              <mesh position={[cx, 6.7, 3.65]}>
                <boxGeometry args={[0.7, 0.6, 0.25]} />
                <meshStandardMaterial color="#965225" />
              </mesh>
              <mesh position={[cx, 6.7, -3.65]}>
                <boxGeometry args={[0.7, 0.6, 0.25]} />
                <meshStandardMaterial color="#965225" />
              </mesh>
            </React.Fragment>
          ))}
        </group>

        {/* Grand Colonnade Portico Entrance (Petra Style) */}
        <group position={[0, 2.8, 4.8]}>
          {/* Portico Pediment Gable */}
          <mesh position={[0, 3.8, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[5.8, 0.6, 1.4]} />
            <meshStandardMaterial color="#d48a52" roughness={0.7} />
          </mesh>
          <mesh position={[0, 4.4, 0]}>
            <coneGeometry args={[3.2, 1.0, 4]} />
            <meshStandardMaterial color="#c27740" roughness={0.7} />
          </mesh>

          {/* 4 Fluted Stone Columns (24 segments each) */}
          {[-2.2, -0.75, 0.75, 2.2].map((colX, idx) => (
            <group key={idx} position={[colX, 1.6, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.22, 0.26, 3.5, 24]} />
                <meshStandardMaterial color="#e09862" roughness={0.65} />
              </mesh>
              {/* Column Capital */}
              <mesh position={[0, 1.85, 0]}>
                <boxGeometry args={[0.55, 0.22, 0.55]} />
                <meshStandardMaterial color="#f0ab77" metalness={0.1} />
              </mesh>
              {/* Column Base Plinth */}
              <mesh position={[0, -1.85, 0]}>
                <boxGeometry args={[0.58, 0.22, 0.58]} />
                <meshStandardMaterial color="#c27740" />
              </mesh>
            </group>
          ))}

          {/* Arched Recessed Portal with Warm Glowing Interior */}
          <mesh position={[0, 1.4, -0.4]}>
            <boxGeometry args={[2.4, 3.2, 0.5]} />
            <meshBasicMaterial color="#1a0a03" />
          </mesh>
          <mesh position={[0, 1.4, -0.3]}>
            <planeGeometry args={[1.8, 2.8]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <pointLight color="#f59e0b" intensity={3.0} distance={8} position={[0, 1.5, 0.2]} />
        </group>

        {/* Central High Spire Keep (32 segments) */}
        <group position={[0, 11.5, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[1.6, 2.3, 7.5, 32]} />
            <meshStandardMaterial color="#a0592a" roughness={0.72} />
          </mesh>
          {/* Corbelled Observation Balcony Ring */}
          <mesh position={[0, 4.0, 0]}>
            <cylinderGeometry args={[2.4, 1.8, 0.6, 32]} />
            <meshStandardMaterial color="#ca7d45" roughness={0.68} />
          </mesh>
          {/* Conical Slate Watchtower Roof (32 segments) */}
          <mesh position={[0, 6.2, 0]}>
            <coneGeometry args={[2.5, 4.2, 32]} />
            <meshStandardMaterial color="#421f0b" roughness={0.6} />
          </mesh>
          {/* Golden Finial Sphere */}
          <mesh position={[0, 8.6, 0]}>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* 4 Corner Round Watchtowers (32 segments each with arched windows) */}
        {[
          [-5.2, 5.2, 5.2],
          [5.2, 5.2, 5.2],
          [-5.2, 5.2, -5.2],
          [5.2, 5.2, -5.2],
        ].map(([tx, ty, tz], idx) => (
          <group key={idx} position={[tx, ty, tz]}>
            {/* Tower Shaft (32 segments) */}
            <mesh castShadow>
              <cylinderGeometry args={[1.4, 1.7, 9.5, 32]} />
              <meshStandardMaterial color="#965225" roughness={0.78} />
            </mesh>
            {/* Corbelled Gallery Ring */}
            <mesh position={[0, 5.0, 0]}>
              <cylinderGeometry args={[1.9, 1.5, 0.55, 32]} />
              <meshStandardMaterial color="#b86b36" />
            </mesh>
            {/* Conical Roof (32 segments) */}
            <mesh position={[0, 6.8, 0]}>
              <coneGeometry args={[1.9, 3.4, 32]} />
              <meshStandardMaterial color="#3c1c0a" roughness={0.65} />
            </mesh>
            {/* Arched Recessed Amber Window (Front) */}
            <mesh position={[0, 2.4, 1.52]}>
              <planeGeometry args={[0.55, 1.1]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
            {/* Secondary Window (Side) */}
            <mesh position={[1.52, 2.4, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.55, 1.1]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        ))}

        {/* Grand Double-Arched Stone Viaduct Bridge across Canyon */}
        <group position={[0, 1.8, 8.4]}>
          {/* Bridge Roadway Deck with Balustrades */}
          <mesh position={[0, 3.4, 0]}>
            <boxGeometry args={[9.5, 0.7, 2.6]} />
            <meshStandardMaterial color="#a0592a" roughness={0.8} />
          </mesh>
          {/* Balustrade Curb Rails */}
          <mesh position={[0, 3.9, 1.2]}>
            <boxGeometry args={[9.5, 0.4, 0.2]} />
            <meshStandardMaterial color="#d48a52" />
          </mesh>
          <mesh position={[0, 3.9, -1.2]}>
            <boxGeometry args={[9.5, 0.4, 0.2]} />
            <meshStandardMaterial color="#d48a52" />
          </mesh>

          {/* 3 Heavy Pier Stanchions (32 segments) */}
          {[-4.0, 0, 4.0].map((px, idx) => (
            <group key={idx} position={[px, 1.2, 0]}>
              <mesh>
                <cylinderGeometry args={[0.8, 1.0, 3.8, 24]} />
                <meshStandardMaterial color="#7c3f1d" />
              </mesh>
            </group>
          ))}

          {/* Two Semicircular Barrel Vault Arches */}
          {[-2.0, 2.0].map((ax, idx) => (
            <mesh key={idx} position={[ax, 2.3, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[1.5, 1.5, 2.4, 32, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#582a12" side={THREE.BackSide} />
            </mesh>
          ))}
        </group>

        {/* Cast-Iron Tripod Fire Braziers on Ramparts */}
        <group position={[0, 9.8, 4.6]}>
          <mesh>
            <cylinderGeometry args={[0.42, 0.26, 0.52, 16]} />
            <meshStandardMaterial color="#221208" roughness={0.85} metalness={0.6} />
          </mesh>
          {/* Glowing Flame Core */}
          <mesh position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
          <pointLight
            ref={brazierLightRef}
            color="#f97316"
            intensity={4.5}
            distance={20}
          />
        </group>

        {/* Flanking Braziers on Tower Keeps */}
        {[-5.2, 5.2].map((bx, idx) => (
          <group key={idx} position={[bx, 10.6, 5.2]}>
            <mesh position={[0, 0.28, 0]}>
              <sphereGeometry args={[0.16, 12, 12]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
            <pointLight color="#f97316" intensity={2.8} distance={12} />
          </group>
        ))}

        {/* Glowing Ancient Techno-Runes Carved in Fortress Walls */}
        <group position={[0, 2.0, 4.55]}>
          {[-3.0, -1.8, 1.8, 3.0].map((rx, idx) => (
            <mesh key={idx} position={[rx, 0, 0]}>
              <planeGeometry args={[0.7, 0.15]} />
              <meshBasicMaterial
                ref={idx === 0 ? runeGlowRef : undefined}
                color="#f59e0b"
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Stone Harbor Quay & Dock Posts on Waterline */}
      <group position={[0, 0.6, 19.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[11, 0.65, 5.5]} />
          <meshStandardMaterial color="#6a3a1c" roughness={0.8} />
        </mesh>
        {/* Stone Dock Steps descending into water */}
        <mesh position={[0, -0.25, 2.8]}>
          <boxGeometry args={[6.0, 0.4, 1.6]} />
          <meshStandardMaterial color="#4e2912" />
        </mesh>
        {/* Timber Mooring Bollards */}
        {[-4.5, -1.5, 1.5, 4.5].map((px, idx) => (
          <group key={idx} position={[px, 0.75, 2.4]}>
            <mesh>
              <cylinderGeometry args={[0.16, 0.20, 1.3, 16]} />
              <meshStandardMaterial color="#321a0c" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.7, 0]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Fluttering Citadel Pennant Flags */}
      <group ref={flagsRef} position={[0, 18, 0]}>
        {[
          [0, 8.8, 0],
          [-5.2, 5.2, 5.2],
          [5.2, 5.2, 5.2],
          [-5.2, 5.2, -5.2],
          [5.2, 5.2, -5.2],
        ].map(([fx, fy, fz], idx) => (
          <group key={idx} position={[fx, fy, fz]}>
            <mesh position={[0, 1.0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 2.2, 12]} />
              <meshStandardMaterial color="#2d1c10" />
            </mesh>
            <mesh position={[0.55, 1.5, 0]}>
              <boxGeometry args={[1.05, 0.52, 0.02]} />
              <meshStandardMaterial color="#dc2626" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Desert Sandstorm Embers & Ambient Dust */}
      <Sparkles
        count={95}
        scale={[46, 28, 46]}
        size={4.5}
        speed={0.5}
        color="#f59e0b"
        opacity={0.8}
        position={[0, 14, 0]}
      />

      {/* Warm Golden Island Directional Lighting */}
      <pointLight
        color="#f59e0b"
        intensity={5.2}
        distance={52}
        decay={1.6}
        position={[0, 18, 10]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 2: THE PANDEMONIUM (Synthwave Cyberpunk River Delta)
// High-vector-density cyberpunk megapolis:
// - 12 multi-tiered skyscrapers with setback terraces and illuminated window arrays
// - Rooftop communication spires with blinking clearance beacons
// - Double-deck transit aqueduct bridges with cascading animated waterfalls
// - Waterfall base ocean spray particles
// - Giant synthwave horizon sun with scanlines & neon magenta corona
// =========================================================================
export function IslandPandemonium({ position = [48, 0, -156] as [number, number, number] }) {
  const waterfallRef = useRef<THREE.Mesh>(null);
  const synthSunRef = useRef<THREE.Mesh>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Shimmering waterfall surface
    if (waterfallRef.current) {
      waterfallRef.current.position.y = 4.2 + Math.sin(time * 8.0) * 0.08;
    }
    // Pulsing synthwave sun
    if (synthSunRef.current) {
      const s = 1.0 + Math.sin(time * 1.8) * 0.025;
      synthSunRef.current.scale.set(s, s, 1);
    }
    // Aviation clearance beacon blink
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = Math.sin(time * 4.0) > 0.3 ? 4.0 : 0.4;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. GIANT GLOWING SYNTHWAVE SUN (Half-Submerged Horizon) */}
      {/* ======================================================== */}
      <group position={[0, 18, -32]}>
        <mesh ref={synthSunRef}>
          <circleGeometry args={[22, 64]} />
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
          intensity={6.5}
          distance={70}
          decay={1.5}
          position={[0, 0, 8]}
        />
      </group>

      {/* ======================================================== */}
      {/* 2. RIVER DELTA BASALT CLIFF BASE (64 SEGMENTS)           */}
      {/* ======================================================== */}
      <mesh position={[0, 2.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[22, 26, 5.0, 64, 4]} />
        <meshStandardMaterial
          color="#121726"
          roughness={0.65}
          metalness={0.3}
        />
      </mesh>

      {/* Stepped Upper Embankment */}
      <mesh position={[0, 5.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[18, 22, 3.5, 64, 4]} />
        <meshStandardMaterial
          color="#182035"
          roughness={0.62}
          metalness={0.35}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 3. HIGH-DENSITY CYBERNETIC SKYSCRAPER METROPOLIS         */}
      {/* ======================================================== */}
      <group position={[0, 5.2, -4]}>
        {/* Center High Spire (3-Stage Setback Skyscraper) */}
        <group position={[0, 15, 0]}>
          {/* Lower Bulk Base */}
          <mesh castShadow>
            <boxGeometry args={[4.8, 14, 4.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.88} roughness={0.18} />
          </mesh>
          {/* Middle Setback Tier */}
          <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[3.8, 10, 3.8]} />
            <meshStandardMaterial color="#0b1120" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Upper Crown Tower */}
          <mesh position={[0, 17, 0]} castShadow>
            <boxGeometry args={[2.6, 6, 2.6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.92} roughness={0.12} />
          </mesh>

          {/* Neon Window Bands on Facades */}
          {[-5, -2, 1, 4, 7, 10, 13, 16, 18].map((wy, idx) => (
            <mesh key={idx} position={[0, wy, 2.45]}>
              <planeGeometry args={[wy > 14 ? 2.2 : wy > 5 ? 3.4 : 4.4, 0.45]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#f43f5e' : '#00f0ff'} />
            </mesh>
          ))}

          {/* Spire Antenna Mast with Blinking Beacon */}
          <mesh position={[0, 21.5, 0]}>
            <cylinderGeometry args={[0.08, 0.20, 6, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} />
          </mesh>
          <mesh position={[0, 24.8, 0]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <pointLight
            ref={beaconLightRef}
            color="#00f0ff"
            intensity={4.0}
            distance={24}
            position={[0, 25, 0]}
          />
        </group>

        {/* 10 Staggered Flanking Cyber Towers with Neon Trims */}
        {[
          [-7.5, 10, 2, 3.8, 20, '#00f0ff'],
          [7.5, 11, 1, 4.0, 22, '#f43f5e'],
          [-5.0, 8, -6, 3.4, 16, '#fbbf24'],
          [5.2, 9, -5, 3.6, 18, '#00f0ff'],
          [-11.0, 6, 4, 3.2, 12, '#f43f5e'],
          [11.0, 7, 3, 3.2, 14, '#fbbf24'],
          [-9.0, 5, -8, 3.0, 10, '#00f0ff'],
          [9.0, 6, -8, 3.0, 12, '#f43f5e'],
          [-3.0, 12, 6, 2.8, 24, '#00f0ff'],
          [3.0, 13, 5, 2.8, 26, '#f43f5e'],
        ].map(([tx, ty, tz, w, h, col], idx) => (
          <group key={idx} position={[tx as number, ty as number, tz as number]}>
            <mesh castShadow>
              <boxGeometry args={[w as number, h as number, w as number]} />
              <meshStandardMaterial color="#0b1120" metalness={0.85} roughness={0.2} />
            </mesh>
            {/* Crown Illuminated Neon Edge Trim */}
            <mesh position={[0, (h as number) / 2 + 0.06, 0]}>
              <boxGeometry args={[(w as number) + 0.12, 0.28, (w as number) + 0.12]} />
              <meshBasicMaterial color={col as string} />
            </mesh>
            {/* Window Slits */}
            {[-3, 0, 3].map((sy, sIdx) => (
              <mesh key={sIdx} position={[0, sy, (w as number) / 2 + 0.05]}>
                <planeGeometry args={[(w as number) * 0.75, 0.35]} />
                <meshBasicMaterial color={col as string} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. GRAND DOUBLE-DECK AQUEDUCT BRIDGES & WATERFALLS       */}
      {/* ======================================================== */}
      <group position={[0, 2.5, 9.0]}>
        {/* Upper Transit Viaduct Span */}
        <mesh position={[0, 4.2, 0]}>
          <boxGeometry args={[22, 1.2, 2.8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.75} roughness={0.25} />
        </mesh>
        {/* Glowing Cyber Rail Track Strip */}
        <mesh position={[0, 4.85, 0]}>
          <planeGeometry args={[21.5, 0.5]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* 6 Arched Support Piers (24 segments each) */}
        {[-8.5, -5.1, -1.7, 1.7, 5.1, 8.5].map((px, idx) => (
          <group key={idx} position={[px, 1.6, 0]}>
            <mesh>
              <cylinderGeometry args={[0.7, 0.9, 4.0, 24]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Neon Accent Collar */}
            <mesh position={[0, 1.8, 0]}>
              <cylinderGeometry args={[0.92, 0.92, 0.2, 24]} />
              <meshBasicMaterial color="#f43f5e" />
            </mesh>
          </group>
        ))}

        {/* Cascading Animated Waterfalls from the Aqueduct */}
        <mesh ref={waterfallRef} position={[0, 1.4, 1.45]}>
          <planeGeometry args={[16.5, 4.2]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Waterfall Base Ocean Mist Spray */}
        <Sparkles
          count={60}
          scale={[18, 3.0, 4]}
          size={4.0}
          speed={0.8}
          color="#7dd3fc"
          opacity={0.85}
          position={[0, 0.2, 2.0]}
        />
      </group>

      {/* Cyberpunk Neon Purple/Cyan Atmospheric Sparkles */}
      <Sparkles
        count={95}
        scale={[42, 30, 42]}
        size={4.5}
        speed={0.6}
        color="#f43f5e"
        opacity={0.85}
        position={[0, 16, 0]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 3: THE CARNIVAL ISLAND (Festive Pier & Illuminated Ferris Wheel)
// High-vector-density Victorian carnival festival:
// - Grand 16-spoke illuminated Victorian Ferris wheel with 16 counter-rotating gondolas
// - High-polygon striped circus big-tops (48 segments with scalloped valances)
// - Extensive wooden boardwalk pier with timber pilings and ornate festoon lantern posts
// - Carousel pavilion with faceted canopy and golden finials
// =========================================================================
export function IslandCarnival({ position = [-46, 0, -248] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);
  const gondolasRef = useRef<THREE.Group>(null);

  const gondolaCount = 16; // 16 high-detail Victorian gondolas (up from 12)
  const wheelRadius = 9.2;

  useFrame((state, delta) => {
    // Smooth Ferris wheel rotation
    if (wheelRef.current) {
      wheelRef.current.rotation.z += delta * 0.20;
    }
    // Counter-rotate gondolas so they remain perfectly upright as wheel spins
    if (gondolasRef.current) {
      gondolasRef.current.children.forEach((gondola) => {
        gondola.rotation.z = -(wheelRef.current?.rotation.z || 0);
      });
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. CARNIVAL PROMONTORY BASE (64 SEGMENTS)                */}
      {/* ======================================================== */}
      <mesh position={[0, 2.0, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[20, 25, 4.2, 64, 4]} />
        <meshStandardMaterial
          color="#1e1814"
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* Upper Festive Promenade Tier */}
      <mesh position={[0, 4.4, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[16, 19, 2.5, 64, 4]} />
        <meshStandardMaterial
          color="#2e221b"
          roughness={0.78}
          metalness={0.15}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 2. GRAND 16-SPOKE ILLUMINATED ROTATING FERRIS WHEEL      */}
      {/* ======================================================== */}
      <group position={[0, 14.8, 0]}>
        {/* Support A-Frame Legs (Front & Back Heavy Victorian Stanchions) */}
        <group position={[0, -6.0, 0]}>
          {[-3.6, 3.6].map((sx, idx) => (
            <React.Fragment key={idx}>
              <mesh position={[sx, 0, 1.4]} rotation={[0, 0, sx < 0 ? 0.25 : -0.25]}>
                <cylinderGeometry args={[0.22, 0.32, 13, 16]} />
                <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
              </mesh>
              <mesh position={[sx, 0, -1.4]} rotation={[0, 0, sx < 0 ? 0.25 : -0.25]}>
                <cylinderGeometry args={[0.22, 0.32, 13, 16]} />
                <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
              </mesh>
            </React.Fragment>
          ))}
          {/* Horizontal Tie Beam */}
          <mesh position={[0, -2.5, 1.4]}>
            <boxGeometry args={[6.2, 0.3, 0.3]} />
            <meshStandardMaterial color="#a37c35" metalness={0.8} />
          </mesh>
          <mesh position={[0, -2.5, -1.4]}>
            <boxGeometry args={[6.2, 0.3, 0.3]} />
            <meshStandardMaterial color="#a37c35" metalness={0.8} />
          </mesh>
        </group>

        {/* Central Axle Hub (32 segments) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 3.4, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 1.75]}>
          <sphereGeometry args={[0.5, 24, 24]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>

        {/* Rotating Wheel Mesh (Dual Outer Lattice Rings & 16 Spokes) */}
        <group ref={wheelRef}>
          {/* Front Outer Ring (64 segments) */}
          <mesh position={[0, 0, 1.0]}>
            <ringGeometry args={[wheelRadius - 0.18, wheelRadius + 0.18, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          {/* Front Inner Ring */}
          <mesh position={[0, 0, 1.0]}>
            <ringGeometry args={[wheelRadius * 0.65 - 0.12, wheelRadius * 0.65 + 0.12, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>

          {/* Back Outer Ring (64 segments) */}
          <mesh position={[0, 0, -1.0]}>
            <ringGeometry args={[wheelRadius - 0.18, wheelRadius + 0.18, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          {/* Back Inner Ring */}
          <mesh position={[0, 0, -1.0]}>
            <ringGeometry args={[wheelRadius * 0.65 - 0.12, wheelRadius * 0.65 + 0.12, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>

          {/* 16 Radiating Lattice Truss Spokes */}
          {Array.from({ length: 16 }).map((_, idx) => {
            const angle = (idx / 16) * Math.PI * 2;
            return (
              <group key={idx} rotation={[0, 0, angle]}>
                <mesh position={[0, wheelRadius / 2, 0]}>
                  <cylinderGeometry args={[0.045, 0.045, wheelRadius, 12]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.22} />
                </mesh>
                {/* Glowing Light Nodes along Spokes */}
                <mesh position={[0, wheelRadius * 0.65, 1.05]}>
                  <sphereGeometry args={[0.14, 12, 12]} />
                  <meshBasicMaterial color={idx % 2 === 0 ? '#ef4444' : '#fbbf24'} />
                </mesh>
                <mesh position={[0, wheelRadius * 0.95, 1.05]}>
                  <sphereGeometry args={[0.16, 12, 12]} />
                  <meshBasicMaterial color={idx % 2 === 0 ? '#fbbf24' : '#ef4444'} />
                </mesh>
              </group>
            );
          })}

          {/* 16 Victorian Passenger Gondolas */}
          <group ref={gondolasRef}>
            {Array.from({ length: gondolaCount }).map((_, idx) => {
              const angle = (idx / gondolaCount) * Math.PI * 2;
              const gx = Math.cos(angle) * wheelRadius;
              const gy = Math.sin(angle) * wheelRadius;

              return (
                <group key={idx} position={[gx, gy, 0]}>
                  {/* Passenger Cabin Box */}
                  <mesh position={[0, -0.45, 0]} castShadow>
                    <boxGeometry args={[0.95, 0.82, 0.85]} />
                    <meshStandardMaterial
                      color={idx % 2 === 0 ? '#dc2626' : '#f59e0b'}
                      roughness={0.38}
                    />
                  </mesh>
                  {/* Arched Window Cutout */}
                  <mesh position={[0, -0.42, 0.44]}>
                    <planeGeometry args={[0.65, 0.38]} />
                    <meshBasicMaterial color="#fef3c7" />
                  </mesh>
                  {/* Brass Hanging Bracket */}
                  <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
                    <meshStandardMaterial color="#ffd700" metalness={0.9} />
                  </mesh>
                </group>
              );
            })}
          </group>
        </group>

        {/* Central Golden Illuminating Light */}
        <pointLight
          color="#fbbf24"
          intensity={6.0}
          distance={50}
          decay={1.6}
          position={[0, 0, 4]}
        />
      </group>

      {/* ======================================================== */}
      {/* 3. HIGH-DENSITY CIRCUS BIG-TOPS (48 SEGMENTS)            */}
      {/* ======================================================== */}
      {[
        [-12, 4.2, 5, 4.4, 6.2, '#dc2626'],
        [12, 4.2, 4, 3.8, 5.4, '#f59e0b'],
        [-8, 4.2, 12, 3.2, 4.4, '#dc2626'],
        [9, 4.2, 11, 3.4, 4.8, '#f59e0b'],
      ].map(([tx, ty, tz, r, h, col], idx) => (
        <group key={idx} position={[tx as number, ty as number, tz as number]}>
          {/* Main Tent Wall Cylinder (48 segments) */}
          <mesh position={[0, 1.3, 0]} castShadow>
            <cylinderGeometry args={[r as number, (r as number) * 1.05, 2.6, 48]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.7} />
          </mesh>
          {/* Scalloped Striped Conical Roof (48 segments) */}
          <mesh position={[0, 2.6 + (h as number) / 2, 0]} castShadow>
            <coneGeometry args={[(r as number) * 1.2, h as number, 48]} />
            <meshStandardMaterial color={col as string} roughness={0.55} />
          </mesh>
          {/* Golden Roof Finial & Pennant */}
          <mesh position={[0, 2.6 + (h as number) + 0.45, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.9} />
          </mesh>
          <mesh position={[0.4, 2.6 + (h as number) + 0.35, 0]}>
            <boxGeometry args={[0.7, 0.35, 0.02]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>
        </group>
      ))}

      {/* ======================================================== */}
      {/* 4. EXTENSIVE WOODEN BOARDWALK PIER & WATER PILINGS       */}
      {/* ======================================================== */}
      <group position={[0, 1.8, 17]}>
        {/* Main Boardwalk Pier Deck */}
        <mesh receiveShadow>
          <boxGeometry args={[16, 0.55, 6.5]} />
          <meshStandardMaterial color="#422e20" roughness={0.7} />
        </mesh>
        {/* Timber Pilings extending into water (24 segments each) */}
        {[-7.0, -2.4, 2.4, 7.0].map((wx, idx) => (
          <group key={idx} position={[wx, -1.3, 2.8]}>
            <mesh>
              <cylinderGeometry args={[0.20, 0.20, 2.6, 24]} />
              <meshStandardMaterial color="#261912" roughness={0.85} />
            </mesh>
            {/* Victorian Ornate Festoon Lantern Post */}
            <mesh position={[0, 2.0, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 1.4, 16]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} />
            </mesh>
            <mesh position={[0, 2.8, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshBasicMaterial color="#ffb74d" />
            </mesh>
            <pointLight color="#ffb74d" intensity={2.5} distance={8} position={[0, 2.8, 0]} />
          </group>
        ))}
      </group>

      {/* Warm Incandescent Festival Sparkles */}
      <Sparkles
        count={100}
        scale={[44, 28, 44]}
        size={4.5}
        speed={0.5}
        color="#fbbf24"
        opacity={0.88}
        position={[0, 14, 0]}
      />
    </group>
  );
}
