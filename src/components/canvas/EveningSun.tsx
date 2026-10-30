'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function EveningSun({
  position = [40, 52, -450] as [number, number, number],
}) {
  const sunCoreRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle sun breathing aura
    if (coronaRef.current) {
      const s = 1.0 + Math.sin(time * 1.5) * 0.03;
      coronaRef.current.scale.set(s, s, 1);
    }

    // Subtle sun rays slow rotation
    if (raysRef.current) {
      raysRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* 1. Luminous Golden Sun Core Disk */}
      <mesh ref={sunCoreRef}>
        <sphereGeometry args={[26, 32, 32]} />
        <meshBasicMaterial color="#fef3c7" />
      </mesh>

      {/* 2. Radiant Outer Corona Glow Ring */}
      <mesh ref={coronaRef} position={[0, 0, 1.0]}>
        <ringGeometry args={[26.5, 46, 64]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Soft Far Atmospheric Halo */}
      <mesh position={[0, 0, 0.5]}>
        <ringGeometry args={[44, 78, 64]} />
        <meshBasicMaterial
          color="#ea580c"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 4. Translucent Volumetric Sun Rays */}
      <group ref={raysRef} position={[0, 0, 1.5]}>
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx / 8) * Math.PI * 2;
          return (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <planeGeometry args={[4.5, 95]} />
              <meshBasicMaterial
                color="#fde047"
                transparent
                opacity={0.12}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>

      {/* Primary Directional Golden Sun Light Casting Across Water */}
      <directionalLight
        position={[0, 20, 100]}
        intensity={3.6}
        color="#fed7aa"
        castShadow
      />
    </group>
  );
}

