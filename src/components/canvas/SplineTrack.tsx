'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE, ISLAND_WAYPOINTS } from './voyageConfig';

export default function SplineTrack() {
  const pulsesRef = useRef<THREE.Points>(null);
  const trackMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Subtle translucent navigation wake
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(VOYAGE_CURVE, 240, 0.08, 6, false);
  }, []);

  // Traveling celestial guidance particles
  const { pulsePositions, pulseProgress } = useMemo(() => {
    const count = 30;
    const progress = new Float32Array(count);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      progress[i] = i / count;
      const pt = VOYAGE_CURVE.getPointAt(progress[i]);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y + 0.08;
      positions[i * 3 + 2] = pt.z;
    }

    return { pulsePositions: positions, pulseProgress: progress };
  }, []);

  useFrame((_, delta) => {
    // Shimmer guidance particles along the course
    if (pulsesRef.current) {
      const positions = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const count = pulseProgress.length;

      for (let i = 0; i < count; i++) {
        pulseProgress[i] = (pulseProgress[i] + delta * 0.04) % 1;
        const pt = VOYAGE_CURVE.getPointAt(pulseProgress[i]);
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y + 0.1;
        positions[i * 3 + 2] = pt.z;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Subtle translucent guidance wake */}
      <mesh geometry={tubeGeometry} position={[0, 0.02, 0]}>
        <meshStandardMaterial
          ref={trackMatRef}
          color="#d97706"
          emissive="#d97706"
          emissiveIntensity={0.6}
          roughness={0.4}
          metalness={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Floating Guidance Sparkles */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.35}
          color="#ffeedd"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Island Nautical Buoys with Warm Brass Lanterns */}
      {ISLAND_WAYPOINTS.map((wp) => {
        const point = VOYAGE_CURVE.getPointAt(wp.t);
        return (
          <group key={wp.id} position={[point.x, point.y + 0.05, point.z]}>
            {/* Wooden Buoy Float */}
            <mesh position={[0, 0.25, 0]}>
              <cylinderGeometry args={[0.3, 0.45, 0.6, 12]} />
              <meshStandardMaterial color="#4a2e1b" roughness={0.8} />
            </mesh>

            {/* Brass Lantern Pole */}
            <mesh position={[0, 0.85, 0]}>
              <cylinderGeometry args={[0.03, 0.04, 0.7, 8]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} />
            </mesh>

            {/* Glowing Lantern Beacon */}
            <mesh position={[0, 1.25, 0]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshBasicMaterial color={wp.accentColor} />
            </mesh>

            {/* Water Ripple Ring around buoy */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
              <ringGeometry args={[0.6, 1.2, 24]} />
              <meshBasicMaterial
                color={wp.accentColor}
                transparent
                opacity={0.25}
                side={THREE.DoubleSide}
              />
            </mesh>

            <pointLight
              color={wp.accentColor}
              intensity={2.8}
              distance={10}
              decay={2}
              position={[0, 1.25, 0]}
            />
          </group>
        );
      })}
    </group>
  );
}
