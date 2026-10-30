'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function CyberBoat({ position = [0, 0, 0], rotation = [0, 0, 0] }: CyberBoatProps) {
  const boatGroup = useRef<THREE.Group>(null);
  const wakePointsRef = useRef<THREE.Points>(null);
  const lanternRef = useRef<THREE.PointLight>(null);

  // Generate wake particles behind the stern
  const { wakePositions, wakeLifetimes } = useMemo(() => {
    const count = 35;
    const positions = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.random();
      positions[i * 3] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 1] = 0.02;
      positions[i * 3 + 2] = 1.0 + Math.random() * 3.5;
    }

    return { wakePositions: positions, wakeLifetimes: lifetimes };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Natural bobbing and wave pitching
    if (boatGroup.current) {
      boatGroup.current.position.y = Math.sin(time * 2.2) * 0.07 + 0.12;
      boatGroup.current.rotation.z = Math.sin(time * 1.8) * 0.04;
      boatGroup.current.rotation.x = Math.cos(time * 2.0) * 0.03;
    }

    // Flicker / pulse bow lantern
    if (lanternRef.current) {
      lanternRef.current.intensity = 2.0 + Math.sin(time * 4) * 0.5;
    }

    // Animate wake particles expanding and flowing back
    if (wakePointsRef.current) {
      const positions = wakePointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = wakeLifetimes.length;

      for (let i = 0; i < count; i++) {
        wakeLifetimes[i] += delta * 1.2;
        if (wakeLifetimes[i] > 1.0) {
          wakeLifetimes[i] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.4;
          positions[i * 3 + 1] = 0.02;
          positions[i * 3 + 2] = 0.8;
        } else {
          // Flow back along z and spread out along x
          positions[i * 3 + 2] += delta * 3.5;
          positions[i * 3] += (positions[i * 3] > 0 ? 1 : -1) * delta * 0.8;
        }
      }
      wakePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={boatGroup}>
        {/* Main Sleek Angular Hull */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <coneGeometry args={[0.75, 2.6, 5]} />
          {/* Rotated so cone points forward along -Z */}
          <meshStandardMaterial
            color="#080e1a"
            metalness={0.9}
            roughness={0.2}
            flatShading
          />
        </mesh>

        {/* Hull Upper Deck / Crest */}
        <mesh position={[0, 0.38, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.85, 2.2, 0.22]} />
          <meshStandardMaterial
            color="#0d1829"
            metalness={0.85}
            roughness={0.3}
          />
        </mesh>

        {/* Neon Keel Trim (Left) */}
        <mesh position={[-0.42, 0.28, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.04, 2.2, 0.05]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Neon Keel Trim (Right) */}
        <mesh position={[0.42, 0.28, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.04, 2.2, 0.05]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Helm Cabin Structure */}
        <mesh position={[0, 0.65, 0.35]}>
          <boxGeometry args={[0.55, 0.45, 0.7]} />
          <meshStandardMaterial
            color="#05080f"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Helm Windshield Glow */}
        <mesh position={[0, 0.72, -0.02]} rotation={[Math.PI / 6, 0, 0]}>
          <planeGeometry args={[0.48, 0.28]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Mast & Energy Sail */}
        <mesh position={[0, 1.35, 0.15]}>
          <cylinderGeometry args={[0.035, 0.045, 1.6, 8]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Geometric Holographic Sail */}
        <mesh position={[0, 1.45, -0.25]} rotation={[0, Math.PI / 2, 0]}>
          <bufferGeometry>
            {/* Custom triangle for angled futuristic sail */}
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  0, 0.7, 0,     // Top peak
                  -0.85, -0.5, 0, // Aft corner
                  0.35, -0.5, 0,  // Fore corner
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            transparent
            opacity={0.65}
            side={THREE.DoubleSide}
            wireframe={false}
          />
        </mesh>

        {/* Bow Lantern / Beacon at Prow */}
        <group position={[0, 0.48, -1.3]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#ffb300" />
          </mesh>
          <pointLight
            ref={lanternRef}
            color="#ffb300"
            intensity={2.8}
            distance={7}
            decay={1.8}
          />
        </group>

        {/* Stern Engine Glow (Cyan / Magenta exhaust) */}
        <group position={[0, 0.25, 1.15]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.18, 16]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#00f0ff" intensity={1.5} distance={4} />
        </group>

        {/* Particle Wake Trail behind the Stern */}
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
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
