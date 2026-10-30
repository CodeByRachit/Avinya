'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  accentColor?: string;
}

export default function CyberBoat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  accentColor = '#00f0ff',
}: CyberBoatProps) {
  const boatRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const wakePointsRef = useRef<THREE.Points>(null);

  // Custom faceted hull geometry for an elite futuristic voyager skiff
  const { hullGeo, keelGeo, deckGeo, neonEdgesGeo } = useMemo(() => {
    // Sleek geometric tapered hull (sharp bow, chined sides, flat transom)
    // Vertices layout (half-hull mirrored across X):
    // Prow tip: (0, 0.4, -2.2)
    // Keel prow: (0, -0.1, -1.8)
    // Mid gunwales: (+-0.65, 0.45, 0)
    // Mid chines: (+-0.5, 0.05, 0)
    // Stern gunwales: (+-0.55, 0.4, 1.6)
    // Stern transom bottom: (0, 0.1, 1.6)

    const hullVertices = new Float32Array([
      // Port Bow Upper Panel
      0, 0.4, -2.2,   -0.65, 0.45, 0,   -0.5, 0.05, 0,
      0, 0.4, -2.2,   -0.5, 0.05, 0,    0, -0.1, -1.8,
      // Starboard Bow Upper Panel
      0, 0.4, -2.2,   0.5, 0.05, 0,     0.65, 0.45, 0,
      0, 0.4, -2.2,   0, -0.1, -1.8,    0.5, 0.05, 0,

      // Port Mid/Aft Panel
      -0.65, 0.45, 0, -0.55, 0.4, 1.6,  -0.45, 0.12, 1.6,
      -0.65, 0.45, 0, -0.45, 0.12, 1.6, -0.5, 0.05, 0,
      // Starboard Mid/Aft Panel
      0.65, 0.45, 0,  0.45, 0.12, 1.6,  0.55, 0.4, 1.6,
      0.65, 0.45, 0,  0.5, 0.05, 0,     0.45, 0.12, 1.6,

      // Transom (Stern Flat Back)
      -0.55, 0.4, 1.6, 0.55, 0.4, 1.6,  0, 0.1, 1.6,
      -0.55, 0.4, 1.6, 0, 0.1, 1.6,     -0.45, 0.12, 1.6,
      0.55, 0.4, 1.6,  0.45, 0.12, 1.6, 0, 0.1, 1.6,

      // Bottom Keel Panels
      0, -0.1, -1.8,  -0.5, 0.05, 0,    0, 0.02, 0,
      0, -0.1, -1.8,  0, 0.02, 0,       0.5, 0.05, 0,
      -0.5, 0.05, 0,  -0.45, 0.12, 1.6, 0, 0.08, 1.6,
      -0.5, 0.05, 0,  0, 0.08, 1.6,     0, 0.02, 0,
      0.5, 0.05, 0,   0, 0.02, 0,       0, 0.08, 1.6,
      0.5, 0.05, 0,   0, 0.08, 1.6,     0.45, 0.12, 1.6,
    ]);

    const hull = new THREE.BufferGeometry();
    hull.setAttribute('position', new THREE.BufferAttribute(hullVertices, 3));
    hull.computeVertexNormals();

    // Neon Gunwale Rail contour line (loops around the top sheer edge)
    const neonPoints = [
      new THREE.Vector3(0, 0.42, -2.25),
      new THREE.Vector3(-0.66, 0.47, 0),
      new THREE.Vector3(-0.56, 0.42, 1.62),
      new THREE.Vector3(0.56, 0.42, 1.62),
      new THREE.Vector3(0.66, 0.47, 0),
      new THREE.Vector3(0, 0.42, -2.25),
    ];
    const neonCurve = new THREE.CatmullRomCurve3(neonPoints, true);
    const neonTube = new THREE.TubeGeometry(neonCurve, 64, 0.025, 8, true);

    // Sleek faceted cockpit interior
    const deck = new THREE.BoxGeometry(0.85, 0.05, 1.8);
    const keel = new THREE.BoxGeometry(0.06, 0.22, 3.4);

    return {
      hullGeo: hull,
      keelGeo: keel,
      deckGeo: deck,
      neonEdgesGeo: neonTube,
    };
  }, []);

  // Luminous hydro-wake particles trailing behind the stern
  const { wakePositions, wakeLifetimes } = useMemo(() => {
    const count = 48;
    const positions = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.random();
      positions[i * 3] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 0.02;
      positions[i * 3 + 2] = 1.6 + Math.random() * 3.5;
    }

    return { wakePositions: positions, wakeLifetimes: lifetimes };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Natural hydro-dynamic wave pitching and heave
    if (boatRef.current) {
      boatRef.current.position.y = Math.sin(time * 2.2) * 0.04 + 0.12;
      boatRef.current.rotation.z = Math.sin(time * 1.6) * 0.035;
      boatRef.current.rotation.x = Math.cos(time * 1.8) * 0.025;
    }

    // Dynamic Bow Lantern Intensity
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 3.5 + Math.sin(time * 7) * 0.5;
    }

    // Animate glowing wake particles
    if (wakePointsRef.current) {
      const positions = wakePointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = wakeLifetimes.length;

      for (let i = 0; i < count; i++) {
        wakeLifetimes[i] += delta * 1.1;
        if (wakeLifetimes[i] > 1.0) {
          wakeLifetimes[i] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.35;
          positions[i * 3 + 1] = 0.02;
          positions[i * 3 + 2] = 1.6;
        } else {
          positions[i * 3 + 2] += delta * 3.2;
          positions[i * 3] += (positions[i * 3] >= 0 ? 1 : -1) * delta * 0.5;
        }
      }
      wakePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={boatRef}>
        {/* Sleek Faceted Futuristic Hull (Deep Obsidian / Graphite with specular sheen) */}
        <mesh geometry={hullGeo} castShadow receiveShadow>
          <meshStandardMaterial
            color="#141c2b"
            roughness={0.25}
            metalness={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Glowing Neon Contour Trim along Gunwales */}
        <mesh geometry={neonEdgesGeo}>
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* Cockpit Floor / Interior Carbon Deck */}
        <mesh geometry={deckGeo} position={[0, 0.22, 0.3]}>
          <meshStandardMaterial
            color="#0a0f18"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Sleek Forward Cyber Windshield / Deflector Shield */}
        <mesh position={[0, 0.42, -0.6]} rotation={[0.42, 0, 0]}>
          <boxGeometry args={[0.72, 0.18, 0.04]} />
          <meshPhysicalMaterial
            color="#00f0ff"
            transmission={0.85}
            opacity={1}
            transparent
            roughness={0.1}
            ior={1.5}
          />
        </mesh>

        {/* Central Cyber Navigation Spire (Low profile, sleek) */}
        <mesh position={[0, 0.65, 0.05]} rotation={[-0.2, 0, 0]}>
          <coneGeometry args={[0.04, 0.7, 6]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Spire Neon Antenna Tip */}
        <mesh position={[0, 1.0, -0.02]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* High-Intensity Bow Lantern Beacon */}
        <group position={[0, 0.48, -2.15]}>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <pointLight
            ref={lanternLightRef}
            color="#00f0ff"
            intensity={4.0}
            distance={10}
            decay={1.8}
          />
        </group>

        {/* Stern Energy Thrusters (Dual Neon Glow Ports) */}
        <group position={[0, 0.24, 1.62]}>
          <mesh position={[-0.22, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.08, 12]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0.22, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.08, 12]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          <pointLight
            color="#f43f5e"
            intensity={2.5}
            distance={5}
            position={[0, 0, 0.2]}
          />
        </group>

        {/* Glowing Hydro Wake Particles */}
        <points ref={wakePointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[wakePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.18}
            color="#38bdf8"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
