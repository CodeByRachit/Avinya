'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE, ISLAND_WAYPOINTS } from './voyageConfig';

export default function SplineTrack() {
  const pulsesRef = useRef<THREE.Points>(null);
  const tubeMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Generate glowing tube geometry along spline
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(VOYAGE_CURVE, 260, 0.14, 8, false);
  }, []);

  // Traveling pulse particles along the spline
  const { pulsePositions, pulseProgress } = useMemo(() => {
    const count = 40;
    const progress = new Float32Array(count);
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      progress[i] = i / count;
      const pt = VOYAGE_CURVE.getPointAt(progress[i]);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y + 0.1;
      positions[i * 3 + 2] = pt.z;
    }

    return { pulsePositions: positions, pulseProgress: progress };
  }, []);

  useFrame((_, delta) => {
    // Pulse tube emission gently
    if (tubeMatRef.current) {
      const time = performance.now() * 0.002;
      tubeMatRef.current.emissiveIntensity = 1.2 + Math.sin(time) * 0.4;
    }

    // Move pulse particles forward
    if (pulsesRef.current) {
      const positions = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const count = pulseProgress.length;

      for (let i = 0; i < count; i++) {
        pulseProgress[i] = (pulseProgress[i] + delta * 0.05) % 1;
        const pt = VOYAGE_CURVE.getPointAt(pulseProgress[i]);
        positions[i * 3] = pt.x;
        positions[i * 3 + 1] = pt.y + 0.15;
        positions[i * 3 + 2] = pt.z;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Glowing Spline Tube */}
      <mesh geometry={tubeGeometry} position={[0, 0.05, 0]}>
        <meshStandardMaterial
          ref={tubeMatRef}
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Traveling Energy Pulses */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.6}
          color="#ffffff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Island Waypoint Markers & Beacons */}
      {ISLAND_WAYPOINTS.map((wp) => {
        const point = VOYAGE_CURVE.getPointAt(wp.t);
        return (
          <group key={wp.id} position={[point.x, point.y + 0.1, point.z]}>
            {/* Ground Energy Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.5, 1.8, 32]} />
              <meshBasicMaterial
                color={wp.accentColor}
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Inner Ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.4, 0.7, 32]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Vertical Light Beacon */}
            <mesh position={[0, 4, 0]}>
              <cylinderGeometry args={[0.06, 0.18, 8, 16]} />
              <meshBasicMaterial
                color={wp.accentColor}
                transparent
                opacity={0.35}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            <pointLight
              color={wp.accentColor}
              intensity={2.5}
              distance={8}
              decay={2}
              position={[0, 1, 0]}
            />
          </group>
        );
      })}
    </group>
  );
}

