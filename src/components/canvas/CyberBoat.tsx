'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoyageBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function CyberBoat({ position = [0, 0, 0], rotation = [0, 0, 0] }: VoyageBoatProps) {
  const boatGroup = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const wakePointsRef = useRef<THREE.Points>(null);

  // Wake ripple particles behind the stern
  const { wakePositions, wakeLifetimes } = useMemo(() => {
    const count = 40;
    const positions = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.random();
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = 0.02;
      positions[i * 3 + 2] = 1.2 + Math.random() * 4.0;
    }

    return { wakePositions: positions, wakeLifetimes: lifetimes };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Natural hydro-dynamic wave pitching and heave
    if (boatGroup.current) {
      boatGroup.current.position.y = Math.sin(time * 1.8) * 0.08 + 0.14;
      boatGroup.current.rotation.z = Math.sin(time * 1.4) * 0.04;
      boatGroup.current.rotation.x = Math.cos(time * 1.6) * 0.035;
    }

    // Incandescent lantern flame flicker
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 2.4 + Math.sin(time * 6) * 0.4 + Math.sin(time * 14) * 0.15;
    }

    // Animate wake ripples trailing back and spreading outward
    if (wakePointsRef.current) {
      const positions = wakePointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = wakeLifetimes.length;

      for (let i = 0; i < count; i++) {
        wakeLifetimes[i] += delta * 0.9;
        if (wakeLifetimes[i] > 1.0) {
          wakeLifetimes[i] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 1] = 0.02;
          positions[i * 3 + 2] = 1.0;
        } else {
          positions[i * 3 + 2] += delta * 2.8;
          positions[i * 3] += (positions[i * 3] >= 0 ? 1 : -1) * delta * 0.6;
        }
      }
      wakePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={boatGroup}>
        {/* ======================================================== */}
        {/* CRAFTED TIMBER VOYAGER HULL                              */}
        {/* ======================================================== */}
        
        {/* Main curved boat hull (tapered keel & sheer line) */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.45, 3.2, 16, 1, false, 0, Math.PI]} />
          {/* Rotated so hollow side faces up */}
          <meshStandardMaterial
            color="#5a3825"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Outer Hull Clinker Planks (Warm Cedar Strakes) */}
        <mesh position={[0, 0.26, 0]} rotation={[0, 0, Math.PI]}>
          <cylinderGeometry args={[0.72, 0.48, 3.25, 14, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color="#462b1c"
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Curved Bow Stem (Curving prow at the front) */}
        <group position={[0, 0.52, -1.65]} rotation={[-0.35, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.85, 0.22]} />
            <meshStandardMaterial color="#3a2215" roughness={0.6} />
          </mesh>
          {/* Carved Brass Prow Cap */}
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>

        {/* Stern Transom (Flat timber aft backplate) */}
        <mesh position={[0, 0.42, 1.62]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.0, 0.55, 0.12]} />
          <meshStandardMaterial color="#3a2215" roughness={0.6} />
        </mesh>

        {/* Gunwale Railing (Port & Starboard Timber Trims) */}
        <mesh position={[-0.58, 0.52, 0]}>
          <boxGeometry args={[0.08, 0.08, 3.3]} />
          <meshStandardMaterial color="#6e462d" roughness={0.5} />
        </mesh>
        <mesh position={[0.58, 0.52, 0]}>
          <boxGeometry args={[0.08, 0.08, 3.3]} />
          <meshStandardMaterial color="#6e462d" roughness={0.5} />
        </mesh>

        {/* ======================================================== */}
        {/* INTERIOR TIMBER DETAILS & BENCHES (THWARTS)              */}
        {/* ======================================================== */}
        
        {/* Forward Rowing Bench */}
        <mesh position={[0, 0.42, -0.65]}>
          <boxGeometry args={[1.1, 0.06, 0.35]} />
          <meshStandardMaterial color="#784c2f" roughness={0.6} />
        </mesh>

        {/* Midship Mast Bench */}
        <mesh position={[0, 0.42, 0.15]}>
          <boxGeometry args={[1.15, 0.06, 0.38]} />
          <meshStandardMaterial color="#784c2f" roughness={0.6} />
        </mesh>

        {/* Aft Helm Bench */}
        <mesh position={[0, 0.42, 0.95]}>
          <boxGeometry args={[1.0, 0.06, 0.35]} />
          <meshStandardMaterial color="#784c2f" roughness={0.6} />
        </mesh>

        {/* Floor Gratings / Floorboards */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.7, 0.04, 2.8]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.9} />
        </mesh>

        {/* Wooden Voyager Mast */}
        <mesh position={[0, 1.45, 0.15]}>
          <cylinderGeometry args={[0.04, 0.06, 2.2, 10]} />
          <meshStandardMaterial color="#6e462d" roughness={0.7} />
        </mesh>

        {/* Furled Canvas Sail on Boom */}
        <mesh position={[0, 1.8, 0.35]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 1.4, 8]} />
          <meshStandardMaterial color="#e5dfd5" roughness={0.9} />
        </mesh>

        {/* Brass Mast Collar & Ring */}
        <mesh position={[0, 0.55, 0.15]}>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 12]} />
          <meshStandardMaterial color="#cba153" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* ======================================================== */}
        {/* BRASS VOYAGE LANTERN (Bow Warm Amber Beacon)            */}
        {/* ======================================================== */}
        <group position={[0, 0.95, -1.65]}>
          {/* Lantern Brass Frame */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.28, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Glowing Incandescent Lantern Core */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>

          {/* Point Light Casting Warm Reflection on Water */}
          <pointLight
            ref={lanternLightRef}
            color="#ff9800"
            intensity={3.2}
            distance={8.5}
            decay={1.8}
            position={[0, -0.1, 0]}
          />
        </group>

        {/* Aft Stern Lantern */}
        <group position={[0, 0.65, 1.62]}>
          <mesh>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>
          <pointLight color="#ff9800" intensity={1.5} distance={4.5} />
        </group>

        {/* ======================================================== */}
        {/* NATURAL WATER WAKE PARTICLES                             */}
        {/* ======================================================== */}
        <points ref={wakePointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[wakePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.16}
            color="#b0bec5"
            transparent
            opacity={0.5}
            blending={THREE.NormalBlending}
          />
        </points>
      </group>
    </group>
  );
}
