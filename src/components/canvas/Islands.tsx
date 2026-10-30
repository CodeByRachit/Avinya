'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// =========================================================================
// ISLAND 1: THE LAST OUTPOST (Dune Desert Mountain Citadel)
// High-vector-density Petra/Dune ancient sandstone citadel:
// - Deep submerged bedrock foundation down to Y = -18 (NEVER FLOATING)
// - Citadel anchored firmly on the plateau at Y = 8.7 with ZERO AIR GAPS
// - Colonnade portico, central donjon, watchtowers & viaduct piers plunge
//   deeply into the stone foundation
// - Realistic luminous celestial moon with soft volumetric glow
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
      brazierLightRef.current.intensity = 4.8 + Math.sin(time * 11) * 0.8 + Math.sin(time * 23) * 0.35;
    }

    // Ancient techno-rune pulse
    if (runeGlowRef.current) {
      runeGlowRef.current.opacity = 0.6 + Math.sin(time * 2.0) * 0.25;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. LUMINOUS CELESTIAL MOON (REALISTIC - NO GREY WASHER)  */}
      {/* ======================================================== */}
      <group position={[6, 26, -26]}>
        {/* Radiant Celestial Moon Sphere */}
        <mesh ref={moonRef}>
          <sphereGeometry args={[16, 64, 64]} />
          <meshBasicMaterial color="#fff3db" />
        </mesh>
        {/* Soft Volumetric Lunar Atmosphere Glow Halo */}
        <pointLight color="#fde68a" intensity={4.5} distance={60} decay={1.6} />
      </group>

      {/* ======================================================== */}
      {/* 2. DEEP SUBMERGED BEDROCK FOUNDATION (NEVER FLOATING)    */}
      {/* Plunges 18 units deep into the ocean depths to Y = -18   */}
      {/* ======================================================== */}
      <mesh position={[0, -9.0, 0]} receiveShadow>
        <cylinderGeometry args={[27.5, 42.0, 18.0, 64]} />
        <meshStandardMaterial
          color="#42200f"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Shoreline Sandy Beach & Surf Collar at Waterline */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <cylinderGeometry args={[24.0, 27.5, 1.8, 64]} />
        <meshStandardMaterial
          color="#9c5427"
          roughness={0.88}
        />
      </mesh>

      {/* Foaming Waterline Wave Crest Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[24.5, 27.8, 64]} />
        <meshBasicMaterial
          color="#e0f2fe"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 3. SCULPTED CANYON STRATA (64 SEGMENTS)                  */}
      {/* ======================================================== */}
      {/* Lower Terraced Sandstone Shelf */}
      <mesh position={[0, 3.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[19.5, 24.0, 4.2, 64, 4]} />
        <meshStandardMaterial
          color="#a85d2c"
          roughness={0.85}
          metalness={0.06}
        />
      </mesh>

      {/* Upper Citadel Plateau (Surface at Y = 8.7) */}
      <mesh position={[0, 6.8, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[15.5, 19.5, 3.8, 64, 4]} />
        <meshStandardMaterial
          color="#be733d"
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      {/* Carved Cliff-Side Grand Stairway to the Citadel */}
      <group position={[0, 3.2, 17.0]} rotation={[-0.42, 0, 0]}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <mesh key={idx} position={[0, idx * 0.32, -idx * 0.55]}>
            <boxGeometry args={[4.5, 0.28, 0.65]} />
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
      {/* 4. MONUMENTAL MOUNTAIN CITADEL FORTRESS                  */}
      {/* Anchored at Y = 8.7 directly on plateau with ZERO GAPS   */}
      {/* ======================================================== */}
      <group position={[0, 8.7, 0]}>
        {/* Massive Stone Foundation Plinth (Penetrating into plateau) */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[11.5, 1.1, 11.5]} />
          <meshStandardMaterial color="#8a4720" roughness={0.88} />
        </mesh>

        {/* Central Palace Donjon (Multi-Tiered Stepped Keep) */}
        <group position={[0, 0, 0]}>
          {/* Base Palace Block - Sits on plinth from Y = 1.0 to 9.2 */}
          <mesh position={[0, 5.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[9.5, 8.2, 9.5]} />
            <meshStandardMaterial color="#be733d" roughness={0.75} />
          </mesh>

          {/* Stepped Upper Tier with Bevelled Cornice */}
          <mesh position={[0, 10.6, 0]} castShadow>
            <boxGeometry args={[7.6, 3.2, 7.6]} />
            <meshStandardMaterial color="#cf844e" roughness={0.72} />
          </mesh>

          {/* Palace Roof Parapet / Crenelated Battlements */}
          {[-3.4, -1.7, 0, 1.7, 3.4].map((cx, idx) => (
            <React.Fragment key={idx}>
              <mesh position={[cx, 12.5, 3.85]}>
                <boxGeometry args={[0.75, 0.65, 0.25]} />
                <meshStandardMaterial color="#965225" />
              </mesh>
              <mesh position={[cx, 12.5, -3.85]}>
                <boxGeometry args={[0.75, 0.65, 0.25]} />
                <meshStandardMaterial color="#965225" />
              </mesh>
            </React.Fragment>
          ))}
        </group>

        {/* Grand Colonnade Portico Entrance (Petra Style) */}
        <group position={[0, 0, 5.2]}>
          {/* Portico Ground Terrace Platform - Sits on plateau Y = 0 to 0.7 */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.8, 0.7, 2.6]} />
            <meshStandardMaterial color="#8a4720" roughness={0.85} />
          </mesh>

          {/* 4 Fluted Stone Columns (Resting solidly on portico floor at Y = 0.7) */}
          {[-2.3, -0.78, 0.78, 2.3].map((colX, idx) => (
            <group key={idx} position={[colX, 0.7, 0]}>
              {/* Column Base Plinth */}
              <mesh position={[0, 0.12, 0]}>
                <boxGeometry args={[0.62, 0.24, 0.62]} />
                <meshStandardMaterial color="#c27740" />
              </mesh>
              {/* Fluted Column Shaft */}
              <mesh position={[0, 2.0, 0]} castShadow>
                <cylinderGeometry args={[0.24, 0.28, 3.52, 24]} />
                <meshStandardMaterial color="#e8a370" roughness={0.65} />
              </mesh>
              {/* Column Capital */}
              <mesh position={[0, 3.88, 0]}>
                <boxGeometry args={[0.58, 0.24, 0.58]} />
                <meshStandardMaterial color="#f5b686" metalness={0.1} />
              </mesh>
            </group>
          ))}

          {/* Portico Entablature & Pediment (Resting on column capitals) */}
          <mesh position={[0, 5.0, 0]}>
            <boxGeometry args={[6.4, 0.65, 1.4]} />
            <meshStandardMaterial color="#d48a52" roughness={0.7} />
          </mesh>
          <mesh position={[0, 5.7, 0]}>
            <coneGeometry args={[3.6, 1.2, 4]} />
            <meshStandardMaterial color="#c27740" roughness={0.7} />
          </mesh>

          {/* Arched Recessed Portal with Warm Glowing Interior */}
          <mesh position={[0, 2.5, -0.4]}>
            <boxGeometry args={[2.5, 3.6, 0.5]} />
            <meshBasicMaterial color="#1a0a03" />
          </mesh>
          <mesh position={[0, 2.5, -0.3]}>
            <planeGeometry args={[1.9, 3.2]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <pointLight color="#f59e0b" intensity={3.5} distance={10} position={[0, 2.5, 0.2]} />

          {/* Stone Approach Steps in front of Portico */}
          <mesh position={[0, 0.18, 1.5]}>
            <boxGeometry args={[5.5, 0.36, 0.6]} />
            <meshStandardMaterial color="#a0592a" />
          </mesh>
        </group>

        {/* Central High Spire Keep (32 segments) */}
        <group position={[0, 9.2, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[1.7, 2.4, 7.8, 32]} />
            <meshStandardMaterial color="#a86030" roughness={0.72} />
          </mesh>
          {/* Corbelled Observation Balcony Ring */}
          <mesh position={[0, 4.2, 0]}>
            <cylinderGeometry args={[2.5, 1.9, 0.65, 32]} />
            <meshStandardMaterial color="#cf844e" roughness={0.68} />
          </mesh>
          {/* Conical Slate Watchtower Roof (32 segments) */}
          <mesh position={[0, 6.5, 0]}>
            <coneGeometry args={[2.6, 4.4, 32]} />
            <meshStandardMaterial color="#421f0b" roughness={0.6} />
          </mesh>
          {/* Golden Finial Sphere */}
          <mesh position={[0, 9.0, 0]}>
            <sphereGeometry args={[0.34, 16, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* 4 Corner Round Watchtowers (Plunging down to Y = -1.2 to eliminate gaps) */}
        {[
          [-5.4, 5.0, 5.4],
          [5.4, 5.0, 5.4],
          [-5.4, 5.0, -5.4],
          [5.4, 5.0, -5.4],
        ].map(([tx, ty, tz], idx) => (
          <group key={idx} position={[tx, ty, tz]}>
            {/* Tower Shaft (32 segments, height 12.5, bottom at Y = -1.25) */}
            <mesh castShadow>
              <cylinderGeometry args={[1.5, 1.8, 12.5, 32]} />
              <meshStandardMaterial color="#9c5427" roughness={0.78} />
            </mesh>
            {/* Corbelled Gallery Ring */}
            <mesh position={[0, 6.5, 0]}>
              <cylinderGeometry args={[2.0, 1.6, 0.6, 32]} />
              <meshStandardMaterial color="#be733d" />
            </mesh>
            {/* Conical Roof (32 segments) */}
            <mesh position={[0, 8.4, 0]}>
              <coneGeometry args={[2.0, 3.6, 32]} />
              <meshStandardMaterial color="#3c1c0a" roughness={0.65} />
            </mesh>
            {/* Arched Recessed Amber Window (Front) */}
            <mesh position={[0, 3.5, 1.6]}>
              <planeGeometry args={[0.6, 1.2]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
            {/* Secondary Window (Side) */}
            <mesh position={[1.6, 3.5, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.6, 1.2]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </group>
        ))}

        {/* Grand Double-Arched Stone Viaduct Bridge across Canyon */}
        <group position={[0, 0, 8.8]}>
          {/* Bridge Roadway Deck - Flush with portico steps */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[9.8, 0.6, 2.8]} />
            <meshStandardMaterial color="#a86030" roughness={0.8} />
          </mesh>
          {/* Balustrade Rails */}
          <mesh position={[0, 0.95, 1.3]}>
            <boxGeometry args={[9.8, 0.35, 0.22]} />
            <meshStandardMaterial color="#d48a52" />
          </mesh>
          <mesh position={[0, 0.95, -1.3]}>
            <boxGeometry args={[9.8, 0.35, 0.22]} />
            <meshStandardMaterial color="#d48a52" />
          </mesh>

          {/* 3 Heavy Pier Stanchions - Plunge deep into lower canyon shelf (Y = -6.0) */}
          {[-4.2, 0, 4.2].map((px, idx) => (
            <group key={idx} position={[px, -2.5, 0]}>
              <mesh>
                <cylinderGeometry args={[0.9, 1.2, 6.5, 24]} />
                <meshStandardMaterial color="#7c3f1d" />
              </mesh>
            </group>
          ))}

          {/* Semicircular Barrel Vault Arches */}
          {[-2.1, 2.1].map((ax, idx) => (
            <mesh key={idx} position={[ax, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[1.55, 1.55, 2.5, 32, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#582a12" side={THREE.BackSide} />
            </mesh>
          ))}
        </group>

        {/* Cast-Iron Tripod Fire Braziers on Ramparts */}
        <group position={[0, 9.8, 4.8]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.28, 0.55, 16]} />
            <meshStandardMaterial color="#221208" roughness={0.85} metalness={0.6} />
          </mesh>
          {/* Glowing Flame Core */}
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.24, 16, 16]} />
            <meshBasicMaterial color="#f97316" />
          </mesh>
          <pointLight
            ref={brazierLightRef}
            color="#f97316"
            intensity={4.8}
            distance={22}
          />
        </group>

        {/* Flanking Braziers on Tower Keeps */}
        {[-5.4, 5.4].map((bx, idx) => (
          <group key={idx} position={[bx, 10.8, 5.4]}>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
            <pointLight color="#f97316" intensity={3.0} distance={14} />
          </group>
        ))}

        {/* Glowing Ancient Techno-Runes Carved in Fortress Walls */}
        <group position={[0, 2.0, 4.8]}>
          {[-3.2, -1.9, 1.9, 3.2].map((rx, idx) => (
            <mesh key={idx} position={[rx, 0, 0]}>
              <planeGeometry args={[0.75, 0.16]} />
              <meshBasicMaterial
                ref={idx === 0 ? runeGlowRef : undefined}
                color="#f59e0b"
                transparent
                opacity={0.75}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Stone Harbor Quay & Dock Posts on Waterline */}
      <group position={[0, 0.6, 20.0]}>
        <mesh receiveShadow>
          <boxGeometry args={[12, 0.7, 6.0]} />
          <meshStandardMaterial color="#6a3a1c" roughness={0.8} />
        </mesh>
        {/* Stone Dock Steps descending into water */}
        <mesh position={[0, -0.3, 3.1]}>
          <boxGeometry args={[6.5, 0.45, 1.8]} />
          <meshStandardMaterial color="#4e2912" />
        </mesh>
        {/* Timber Mooring Bollards */}
        {[-4.8, -1.6, 1.6, 4.8].map((px, idx) => (
          <group key={idx} position={[px, 0.8, 2.6]}>
            <mesh>
              <cylinderGeometry args={[0.18, 0.22, 1.4, 16]} />
              <meshStandardMaterial color="#321a0c" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.75, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Fluttering Citadel Pennant Flags */}
      <group ref={flagsRef} position={[0, 18, 0]}>
        {[
          [0, 9.2, 0],
          [-5.4, 5.4, 5.4],
          [5.4, 5.4, 5.4],
          [-5.4, 5.4, -5.4],
          [5.4, 5.4, -5.4],
        ].map(([fx, fy, fz], idx) => (
          <group key={idx} position={[fx, fy, fz]}>
            <mesh position={[0, 1.1, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 2.4, 12]} />
              <meshStandardMaterial color="#2d1c10" />
            </mesh>
            <mesh position={[0.6, 1.6, 0]}>
              <boxGeometry args={[1.15, 0.55, 0.02]} />
              <meshStandardMaterial color="#dc2626" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Desert Sandstorm Embers & Ambient Dust */}
      <Sparkles
        count={100}
        scale={[48, 30, 48]}
        size={4.8}
        speed={0.5}
        color="#f59e0b"
        opacity={0.8}
        position={[0, 14, 0]}
      />

      {/* Warm Golden Island Directional Lighting */}
      <pointLight
        color="#f59e0b"
        intensity={5.5}
        distance={55}
        decay={1.6}
        position={[0, 18, 10]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 2: THE PANDEMONIUM (Synthwave Cyberpunk River Delta)
// High-vector-density cyberpunk megapolis:
// - Deep submerged bedrock foundation down to Y = -18 (NEVER FLOATING)
// - 14 multi-tiered skyscrapers with setback terraces and illuminated window arrays
// - Rooftop communication spires with blinking clearance beacons
// - Double-deck transit aqueduct bridges with cascading animated waterfalls
// - Waterfall base ocean spray particles & waterline foam collar
// =========================================================================
// ISLAND 2: THE PANDEMONIUM (Crimson Sunset Cyberpunk Metropolis & Cascades)
// Architectural Features:
// - Deep submerged basalt foundation down to Y = -18 (NEVER FLOATING)
// - Giant glowing synthwave horizon sun with horizontal scanlines & crimson corona
// - Faceted cybernetic skyscrapers with vertical neon strip pilasters & spire crowns
// - Elevated illuminated glass skywalk bridges connecting towers
// - Holographic neon billboards ("PANDEMONIUM" and cyber data matrices)
// - Double-tier arched aqueduct viaduct with cascading illuminated waterfalls
// - Terraced basalt polygonal shoreline columns & silhouetted cyber palm trees
// =========================================================================
export function IslandPandemonium({ position = [48, 0, -156] as [number, number, number] }) {
  const waterfallRef1 = useRef<THREE.Mesh>(null);
  const waterfallRef2 = useRef<THREE.Mesh>(null);
  const waterfallRef3 = useRef<THREE.Mesh>(null);
  const synthSunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const beaconLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Shimmering cascading waterfalls
    if (waterfallRef1.current) {
      waterfallRef1.current.position.y = 2.4 + Math.sin(time * 7.0) * 0.08;
    }
    if (waterfallRef2.current) {
      waterfallRef2.current.position.y = 2.4 + Math.sin(time * 7.5 + 1.2) * 0.08;
    }
    if (waterfallRef3.current) {
      waterfallRef3.current.position.y = 2.4 + Math.sin(time * 8.0 + 2.4) * 0.08;
    }

    // Breathing synthwave sun & corona
    if (synthSunRef.current) {
      const s = 1.0 + Math.sin(time * 1.5) * 0.02;
      synthSunRef.current.scale.set(s, s, 1);
    }
    if (coronaRef.current) {
      const s2 = 1.0 + Math.sin(time * 1.8 + 0.5) * 0.035;
      coronaRef.current.scale.set(s2, s2, 1);
    }

    // Aviation clearance beacon blink
    if (beaconLightRef.current) {
      beaconLightRef.current.intensity = Math.sin(time * 4.5) > 0.2 ? 5.0 : 0.6;
    }
  });

  return (
    <group position={position}>
      {/* ======================================================== */}
      {/* 1. GIANT GLOWING SYNTHWAVE SUN (Half-Submerged Horizon) */}
      {/* ======================================================== */}
      <group position={[0, 22, -36]}>
        {/* Core Sun Disk */}
        <mesh ref={synthSunRef}>
          <circleGeometry args={[24, 64]} />
          <meshBasicMaterial color="#f43f5e" side={THREE.DoubleSide} />
        </mesh>

        {/* Radiant Outer Corona Halo */}
        <mesh ref={coronaRef} position={[0, 0, -0.2]}>
          <ringGeometry args={[24, 38, 64]} />
          <meshBasicMaterial
            color="#e11d48"
            transparent
            opacity={0.42}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Horizontal Synthwave Sun Scanlines */}
        {[-12, -9, -6, -3, 0, 3, 6, 9, 12, 15].map((sy, idx) => (
          <mesh key={idx} position={[0, sy, 0.15]}>
            <planeGeometry args={[48, 0.55 + idx * 0.12]} />
            <meshBasicMaterial color="#080c16" />
          </mesh>
        ))}

        {/* Soft Sunset Radial Aura Light */}
        <pointLight
          color="#f43f5e"
          intensity={7.5}
          distance={85}
          decay={1.4}
          position={[0, 0, 10]}
        />
      </group>

      {/* ======================================================== */}
      {/* 2. DEEP SUBMERGED BASALT FOUNDATION (NEVER FLOATING)     */}
      {/* Plunges down to Y = -18 into the ocean seabed            */}
      {/* ======================================================== */}
      <mesh position={[0, -9.0, 0]} receiveShadow>
        <cylinderGeometry args={[28.5, 42.0, 18.0, 64]} />
        <meshStandardMaterial
          color="#080c14"
          roughness={0.85}
          metalness={0.25}
        />
      </mesh>

      {/* Waterline Stepped Basalt Embankment */}
      <mesh position={[0, 1.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[25.0, 28.5, 3.2, 64, 4]} />
        <meshStandardMaterial
          color="#0e1320"
          roughness={0.65}
          metalness={0.35}
        />
      </mesh>

      {/* Stepped Upper Delta Promenade with Neon Guide Strip */}
      <mesh position={[0, 4.6, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[21.0, 25.0, 3.8, 64, 4]} />
        <meshStandardMaterial
          color="#141a2c"
          roughness={0.58}
          metalness={0.4}
        />
      </mesh>
      {/* Promenade Neon Rim Accent */}
      <mesh position={[0, 6.55, 0]}>
        <torusGeometry args={[20.8, 0.08, 16, 64]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>

      {/* ======================================================== */}
      {/* 3. HIGH-TECH FACETED SKYSCRAPER METROPOLIS               */}
      {/* ======================================================== */}
      <group position={[0, 5.2, -4]}>
        {/* Center High Spire Tower (3-Tier Setback Cyber Skyscraper) */}
        <group position={[0, 16, 0]}>
          {/* Lower Bulk Base */}
          <mesh castShadow>
            <boxGeometry args={[5.8, 16, 5.8]} />
            <meshStandardMaterial color="#080e1c" metalness={0.92} roughness={0.14} />
          </mesh>
          {/* Vertical Cyan Corner Light Strips */}
          {[-2.85, 2.85].map((cx, idx1) =>
            [-2.85, 2.85].map((cz, idx2) => (
              <mesh key={`${idx1}-${idx2}`} position={[cx, 0, cz]}>
                <boxGeometry args={[0.08, 16, 0.08]} />
                <meshBasicMaterial color="#00f0ff" />
              </mesh>
            ))
          )}

          {/* Middle Setback Tier */}
          <mesh position={[0, 11, 0]} castShadow>
            <boxGeometry args={[4.4, 10, 4.4]} />
            <meshStandardMaterial color="#060a14" metalness={0.94} roughness={0.12} />
          </mesh>

          {/* Upper Crown Tower */}
          <mesh position={[0, 18.5, 0]} castShadow>
            <boxGeometry args={[3.0, 7, 3.0]} />
            <meshStandardMaterial color="#090e1c" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Pyramidal Rooftop Pinnacle */}
          <mesh position={[0, 23.0, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[2.0, 3.8, 4]} />
            <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={0.6} />
          </mesh>

          {/* Window Glass Illuminations */}
          {[-6, -3, 0, 3, 6, 9, 12, 15, 18, 20].map((wy, idx) => (
            <mesh key={idx} position={[0, wy, wy > 15 ? 1.55 : wy > 6 ? 2.25 : 2.95]}>
              <planeGeometry args={[wy > 15 ? 2.4 : wy > 6 ? 3.8 : 5.0, 0.42]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#f43f5e' : '#00f0ff'} />
            </mesh>
          ))}

          {/* Spire Antenna Mast with Blinking Beacon */}
          <mesh position={[0, 26.5, 0]}>
            <cylinderGeometry args={[0.08, 0.22, 5.5, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.98} />
          </mesh>
          <mesh position={[0, 29.5, 0]}>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <pointLight
            ref={beaconLightRef}
            color="#00f0ff"
            intensity={5.0}
            distance={30}
            position={[0, 29.8, 0]}
          />
        </group>

        {/* Flanking Staggered Cyber Towers with Illuminated Neon Pilasters */}
        {[
          [-8.5, 11, 2, 4.2, 22, '#00f0ff', '#f43f5e'],
          [8.5, 12, 1, 4.4, 24, '#f43f5e', '#00f0ff'],
          [-5.5, 9, -7, 3.8, 18, '#c084fc', '#f43f5e'],
          [5.8, 10, -6, 4.0, 20, '#00f0ff', '#c084fc'],
          [-12.0, 7, 4, 3.6, 14, '#f43f5e', '#fbbf24'],
          [12.0, 8, 3, 3.6, 16, '#fbbf24', '#f43f5e'],
          [-10.0, 6, -9, 3.4, 12, '#00f0ff', '#00f0ff'],
          [10.0, 7, -9, 3.4, 14, '#f43f5e', '#f43f5e'],
          [-3.5, 13, 7, 3.2, 26, '#00f0ff', '#f43f5e'],
          [3.5, 14, 6, 3.2, 28, '#f43f5e', '#00f0ff'],
        ].map(([tx, ty, tz, w, h, col1, col2], idx) => (
          <group key={idx} position={[tx as number, ty as number, tz as number]}>
            <mesh castShadow>
              <boxGeometry args={[w as number, h as number, w as number]} />
              <meshStandardMaterial color="#070c18" metalness={0.9} roughness={0.16} />
            </mesh>
            {/* Crown Illuminated Neon Edge Trim */}
            <mesh position={[0, (h as number) / 2 + 0.08, 0]}>
              <boxGeometry args={[(w as number) + 0.16, 0.35, (w as number) + 0.16]} />
              <meshBasicMaterial color={col1 as string} />
            </mesh>
            {/* Vertical Accent Pilaster Strip */}
            <mesh position={[0, 0, (w as number) / 2 + 0.05]}>
              <boxGeometry args={[0.15, (h as number) * 0.9, 0.06]} />
              <meshBasicMaterial color={col2 as string} />
            </mesh>
            {/* Window Slit Clusters */}
            {[-4, -1, 2, 5].map((sy, sIdx) => (
              <mesh key={sIdx} position={[0, sy, (w as number) / 2 + 0.06]}>
                <planeGeometry args={[(w as number) * 0.75, 0.38]} />
                <meshBasicMaterial color={col1 as string} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Elevated Illuminated Skywalk Glass Bridges */}
        {/* Skybridge 1 (Connecting Center Tower to Left Tower) */}
        <group position={[-4.5, 14, 1.0]}>
          <mesh>
            <boxGeometry args={[4.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.42, 0]}>
            <planeGeometry args={[4.0, 1.0]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Skybridge 2 (Connecting Center Tower to Right Tower) */}
        <group position={[4.5, 17, 0.5]}>
          <mesh>
            <boxGeometry args={[4.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.42, 0]}>
            <planeGeometry args={[4.0, 1.0]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
        </group>

        {/* Holographic Glowing Neon Billboards */}
        <group position={[-7.5, 8, 4.2]} rotation={[0, 0.15, 0]}>
          <mesh>
            <planeGeometry args={[4.5, 1.4]} />
            <meshBasicMaterial color="#060a14" />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[4.2, 1.1]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
        </group>

        <group position={[7.5, 9, 3.2]} rotation={[0, -0.15, 0]}>
          <mesh>
            <planeGeometry args={[4.2, 1.2]} />
            <meshBasicMaterial color="#060a14" />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[3.9, 0.9]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. GRAND DOUBLE-TIER AQUEDUCT VIADUCT & TRIPLE CASCADES */}
      {/* ======================================================== */}
      <group position={[0, 2.5, 10.5]}>
        {/* Upper Transit Viaduct Span */}
        <mesh position={[0, 4.6, 0]}>
          <boxGeometry args={[26, 1.35, 3.2]} />
          <meshStandardMaterial color="#1a2030" metalness={0.8} roughness={0.22} />
        </mesh>
        {/* Glowing Turquoise Water Channel Along Top */}
        <mesh position={[0, 5.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[25.5, 2.0]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* 6 Arched Stone & Metal Support Piers */}
        {[-10.0, -6.0, -2.0, 2.0, 6.0, 10.0].map((px, idx) => (
          <group key={idx} position={[px, 1.8, 0]}>
            <mesh>
              <cylinderGeometry args={[0.85, 1.05, 4.4, 24]} />
              <meshStandardMaterial color="#0b1120" metalness={0.75} roughness={0.3} />
            </mesh>
            {/* Neon Accent Collar */}
            <mesh position={[0, 2.05, 0]}>
              <cylinderGeometry args={[1.05, 1.05, 0.22, 24]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#f43f5e' : '#00f0ff'} />
            </mesh>
          </group>
        ))}

        {/* 3 Cascading Animated Waterfalls Pouring Between Piers */}
        <mesh ref={waterfallRef1} position={[-4.0, 1.8, 1.65]}>
          <planeGeometry args={[3.2, 4.6]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={waterfallRef2} position={[0, 1.8, 1.65]}>
          <planeGeometry args={[3.2, 4.6]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh ref={waterfallRef3} position={[4.0, 1.8, 1.65]}>
          <planeGeometry args={[3.2, 4.6]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Waterfall Base Ocean Mist & Luminescent Foam */}
        <Sparkles
          count={85}
          scale={[22, 3.5, 5.0]}
          size={4.5}
          speed={0.9}
          color="#7dd3fc"
          opacity={0.92}
          position={[0, 0.2, 2.5]}
        />
      </group>

      {/* ======================================================== */}
      {/* 5. TROPICAL CYBER PALM TREES FRAMING THE PROMENADE       */}
      {/* ======================================================== */}
      {[
        [-15.0, 5.8, 5.0, 0.2],
        [-13.5, 5.6, 7.5, -0.15],
        [13.5, 5.6, 7.5, 0.15],
        [15.0, 5.8, 5.0, -0.2],
      ].map(([px, py, pz, rot], idx) => (
        <group key={idx} position={[px as number, py as number, pz as number]} rotation={[0, 0, rot as number]}>
          {/* Curved Palm Trunk */}
          <mesh position={[0, 2.0, 0]}>
            <cylinderGeometry args={[0.18, 0.28, 4.2, 12]} />
            <meshStandardMaterial color="#0a0f1d" />
          </mesh>
          {/* Palm Fronds Fan */}
          {[0, 1, 2, 3, 4, 5].map((fIdx) => {
            const angle = (fIdx / 6) * Math.PI * 2;
            return (
              <mesh
                key={fIdx}
                position={[Math.cos(angle) * 1.5, 4.0, Math.sin(angle) * 1.5]}
                rotation={[0.4, angle, 0.3]}
              >
                <planeGeometry args={[1.2, 3.2]} />
                <meshBasicMaterial color={idx % 2 === 0 ? '#f43f5e' : '#00f0ff'} side={THREE.DoubleSide} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Cyberpunk Neon Purple/Magenta Atmospheric Particle Glow */}
      <Sparkles
        count={110}
        scale={[48, 35, 48]}
        size={5.0}
        speed={0.65}
        color="#f43f5e"
        opacity={0.9}
        position={[0, 18, 0]}
      />
    </group>
  );
}

// =========================================================================
// ISLAND 3: THE CARNIVAL ISLAND (Festive Pier & Illuminated Ferris Wheel)
// High-vector-density Victorian carnival festival:
// - Deep submerged seabed foundation down to Y = -18 (NEVER FLOATING)
// - Grand 16-spoke illuminated Victorian Ferris wheel with 16 counter-rotating gondolas
// - High-polygon striped circus big-tops (48 segments with scalloped valances)
// - Extensive wooden boardwalk pier with timber pilings and ornate festoon lantern posts
// - Carousel pavilion with faceted canopy and golden finials
// =========================================================================
export function IslandCarnival({ position = [-46, 0, -248] as [number, number, number] }) {
  const wheelRef = useRef<THREE.Group>(null);
  const gondolasRef = useRef<THREE.Group>(null);

  const gondolaCount = 16;
  const wheelRadius = 9.4;

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
      {/* 1. DEEP SUBMERGED BEDROCK FOUNDATION (NEVER FLOATING)    */}
      {/* Plunges 18 units deep into the ocean depths to Y = -18   */}
      {/* ======================================================== */}
      <mesh position={[0, -9.0, 0]} receiveShadow>
        <cylinderGeometry args={[25.0, 38.0, 18.0, 64]} />
        <meshStandardMaterial
          color="#140f0c"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Waterline Promenade Base */}
      <mesh position={[0, 1.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[21.0, 25.0, 3.4, 64, 4]} />
        <meshStandardMaterial
          color="#1e1814"
          roughness={0.82}
          metalness={0.12}
        />
      </mesh>

      {/* Upper Festive Promenade Tier */}
      <mesh position={[0, 4.2, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[17.0, 20.5, 2.8, 64, 4]} />
        <meshStandardMaterial
          color="#2e221b"
          roughness={0.78}
          metalness={0.15}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 2. GRAND 16-SPOKE ILLUMINATED ROTATING FERRIS WHEEL      */}
      {/* ======================================================== */}
      <group position={[0, 15.0, 0]}>
        {/* Support A-Frame Legs (Front & Back Heavy Victorian Stanchions) */}
        <group position={[0, -6.2, 0]}>
          {[-3.8, 3.8].map((sx, idx) => (
            <React.Fragment key={idx}>
              <mesh position={[sx, 0, 1.4]} rotation={[0, 0, sx < 0 ? 0.25 : -0.25]}>
                <cylinderGeometry args={[0.24, 0.34, 13.5, 16]} />
                <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
              </mesh>
              <mesh position={[sx, 0, -1.4]} rotation={[0, 0, sx < 0 ? 0.25 : -0.25]}>
                <cylinderGeometry args={[0.24, 0.34, 13.5, 16]} />
                <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
              </mesh>
            </React.Fragment>
          ))}
          {/* Horizontal Tie Beams */}
          <mesh position={[0, -2.6, 1.4]}>
            <boxGeometry args={[6.5, 0.32, 0.32]} />
            <meshStandardMaterial color="#a37c35" metalness={0.8} />
          </mesh>
          <mesh position={[0, -2.6, -1.4]}>
            <boxGeometry args={[6.5, 0.32, 0.32]} />
            <meshStandardMaterial color="#a37c35" metalness={0.8} />
          </mesh>
        </group>

        {/* Central Axle Hub (32 segments) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 3.5, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[0, 0, 1.8]}>
          <sphereGeometry args={[0.52, 24, 24]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>

        {/* Rotating Wheel Mesh (Dual Outer Lattice Rings & 16 Spokes) */}
        <group ref={wheelRef}>
          {/* Front Outer Ring (64 segments) */}
          <mesh position={[0, 0, 1.0]}>
            <ringGeometry args={[wheelRadius - 0.2, wheelRadius + 0.2, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          {/* Front Inner Ring */}
          <mesh position={[0, 0, 1.0]}>
            <ringGeometry args={[wheelRadius * 0.65 - 0.14, wheelRadius * 0.65 + 0.14, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>

          {/* Back Outer Ring (64 segments) */}
          <mesh position={[0, 0, -1.0]}>
            <ringGeometry args={[wheelRadius - 0.2, wheelRadius + 0.2, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
          {/* Back Inner Ring */}
          <mesh position={[0, 0, -1.0]}>
            <ringGeometry args={[wheelRadius * 0.65 - 0.14, wheelRadius * 0.65 + 0.14, 64]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>

          {/* 16 Radiating Lattice Truss Spokes */}
          {Array.from({ length: 16 }).map((_, idx) => {
            const angle = (idx / 16) * Math.PI * 2;
            return (
              <group key={idx} rotation={[0, 0, angle]}>
                <mesh position={[0, wheelRadius / 2, 0]}>
                  <cylinderGeometry args={[0.048, 0.048, wheelRadius, 12]} />
                  <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.22} />
                </mesh>
                {/* Glowing Light Nodes along Spokes */}
                <mesh position={[0, wheelRadius * 0.65, 1.06]}>
                  <sphereGeometry args={[0.15, 12, 12]} />
                  <meshBasicMaterial color={idx % 2 === 0 ? '#ef4444' : '#fbbf24'} />
                </mesh>
                <mesh position={[0, wheelRadius * 0.95, 1.06]}>
                  <sphereGeometry args={[0.18, 12, 12]} />
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
                  <mesh position={[0, -0.48, 0]} castShadow>
                    <boxGeometry args={[1.0, 0.85, 0.88]} />
                    <meshStandardMaterial
                      color={idx % 2 === 0 ? '#dc2626' : '#f59e0b'}
                      roughness={0.38}
                    />
                  </mesh>
                  {/* Arched Window Cutout */}
                  <mesh position={[0, -0.45, 0.46]}>
                    <planeGeometry args={[0.7, 0.4]} />
                    <meshBasicMaterial color="#fef3c7" />
                  </mesh>
                  {/* Brass Hanging Bracket */}
                  <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.032, 0.032, 0.38, 8]} />
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
          intensity={6.5}
          distance={52}
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
          <boxGeometry args={[16.5, 0.58, 6.8]} />
          <meshStandardMaterial color="#422e20" roughness={0.7} />
        </mesh>
        {/* Timber Pilings extending into water (24 segments each) */}
        {[-7.2, -2.4, 2.4, 7.2].map((wx, idx) => (
          <group key={idx} position={[wx, -1.4, 3.0]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 2.8, 24]} />
              <meshStandardMaterial color="#261912" roughness={0.85} />
            </mesh>
            {/* Victorian Ornate Festoon Lantern Post */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.045, 0.065, 1.5, 16]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} />
            </mesh>
            <mesh position={[0, 3.0, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color="#ffb74d" />
            </mesh>
            <pointLight color="#ffb74d" intensity={2.8} distance={9} position={[0, 3.0, 0]} />
          </group>
        ))}
      </group>

      {/* Warm Incandescent Festival Sparkles */}
      <Sparkles
        count={100}
        scale={[46, 30, 46]}
        size={4.8}
        speed={0.5}
        color="#fbbf24"
        opacity={0.88}
        position={[0, 14, 0]}
      />
    </group>
  );
}
