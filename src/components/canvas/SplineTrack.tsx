'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE, ISLAND_WAYPOINTS } from './voyageConfig';

export default function SplineTrack() {
  const pulsesRef = useRef<THREE.Points>(null);

  // Luminous illuminated path ribbon
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(VOYAGE_CURVE, 260, 0.16, 8, false);
  }, []);

  // Soft glowing outer path envelope
  const glowTubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(VOYAGE_CURVE, 200, 0.42, 8, false);
  }, []);

  // Traveling guidance light pulses along the path
  const { pulsePositions, pulseProgress } = useMemo(() => {
    const count = 45;
    const progress = new Float32Array(count);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      progress[i] = i / count;
      const pt = VOYAGE_CURVE.getPointAt(progress[i]);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y + 0.12;
      positions[i * 3 + 2] = pt.z;
    }

    return { pulsePositions: positions, pulseProgress: progress };
  }, []);

  useFrame((_, delta) => {
    // Travel guidance particles smoothly along the course
    if (pulsesRef.current) {
      const positions = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const count = pulseProgress.length;

      for (let i = 0; i < count; i++) {
        pulseProgress[i] = (pulseProgress[i] + delta * 0.05) % 1;
        const pt = VOYAGE_CURVE.getPointAt(pulseProgress[i]);
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y + 0.14;
        positions[i * 3 + 2] = pt.z;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Core Glowing Teal Navigation Spline */}
      <mesh geometry={tubeGeometry} position={[0, 0.05, 0]}>
        <meshBasicMaterial color="#00f5d4" />
      </mesh>

      {/* 2. Soft Luminous Translucent Glow Halo */}
      <mesh geometry={glowTubeGeometry} position={[0, 0.04, 0]}>
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Traveling Celestial Pulses along the Spline */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#ffffff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Glowing Waypoint Buoy Markers at Each Island */}
      {ISLAND_WAYPOINTS.map((wp) => (
        <group key={wp.id} position={wp.position}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.35, 0.5, 0.6, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color={wp.accentColor} />
          </mesh>
          <pointLight
            color={wp.accentColor}
            intensity={2.8}
            distance={8}
            position={[0, 0.8, 0]}
          />
        </group>
      ))}
    </group>
  );
}
