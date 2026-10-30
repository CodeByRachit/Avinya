'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Seabirds() {
  const birdsGroupRef = useRef<THREE.Group>(null);

  // Generate 8 seabirds with individual orbit radii, heights, and wing flapping phases
  const birds = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      orbitRadius: 18 + i * 4.5,
      orbitSpeed: 0.28 + (i % 3) * 0.05,
      height: 12 + (i % 4) * 2.5,
      phase: (i / 8) * Math.PI * 2,
      wingSpeed: 7.0 + (i % 2) * 1.5,
      center: new THREE.Vector3(
        i < 4 ? -26 : 28, // Circling Island 1 and Island 2
        0,
        i < 4 ? -52 : -130
      ),
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (birdsGroupRef.current) {
      birdsGroupRef.current.children.forEach((birdGroup, i) => {
        const b = birds[i];
        const angle = time * b.orbitSpeed + b.phase;

        // Circular gliding trajectory
        const x = b.center.x + Math.cos(angle) * b.orbitRadius;
        const z = b.center.z + Math.sin(angle) * b.orbitRadius;
        const y = b.height + Math.sin(time * 1.2 + i) * 0.8;

        birdGroup.position.set(x, y, z);
        birdGroup.rotation.y = -angle + Math.PI / 2; // Face forward along tangent
        birdGroup.rotation.z = Math.sin(time * 1.2 + i) * 0.15; // Natural banking

        // Wing flapping
        const leftWing = birdGroup.children[0];
        const rightWing = birdGroup.children[1];
        if (leftWing && rightWing) {
          const flap = Math.sin(time * b.wingSpeed) * 0.35;
          leftWing.rotation.z = flap;
          rightWing.rotation.z = -flap;
        }
      });
    }
  });

  return (
    <group ref={birdsGroupRef}>
      {birds.map((_, i) => (
        <group key={i}>
          {/* Left Wing */}
          <mesh position={[-0.45, 0, 0]}>
            <boxGeometry args={[0.85, 0.02, 0.22]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
          {/* Right Wing */}
          <mesh position={[0.45, 0, 0]}>
            <boxGeometry args={[0.85, 0.02, 0.22]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
          {/* Bird Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.16, 0.1, 0.55]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
