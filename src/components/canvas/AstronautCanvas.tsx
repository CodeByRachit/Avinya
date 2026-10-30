'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function AstronautHelmet() {
  const helmetGroup = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const debrisRef = useRef<THREE.Points>(null);

  // Floating space debris coordinates
  const debrisPositions = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Subtle cursor tracking for helmet
    if (helmetGroup.current) {
      const targetRotY = (state.pointer.x * Math.PI) / 8;
      const targetRotX = (-state.pointer.y * Math.PI) / 10;
      helmetGroup.current.rotation.y = THREE.MathUtils.lerp(
        helmetGroup.current.rotation.y,
        targetRotY,
        delta * 3
      );
      helmetGroup.current.rotation.x = THREE.MathUtils.lerp(
        helmetGroup.current.rotation.x,
        targetRotX,
        delta * 3
      );
    }

    // Rotating orbital portal rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.4;
      ring1Ref.current.rotation.x += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.3;
      ring2Ref.current.rotation.y += delta * 0.35;
    }

    // Drifting space debris
    if (debrisRef.current) {
      debrisRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Zero-G Floating Wrapper */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <group ref={helmetGroup} position={[0, 0, 0]}>
          {/* Outer Helmet Dome (Matte White Composite) */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[2.2, 32, 32]} />
            <meshStandardMaterial
              color="#e2e8f0"
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>

          {/* Golden / Cyan Reflective Visor Shield */}
          <mesh
            ref={visorRef}
            position={[0, 0.1, 1.15]}
            rotation={[0.1, 0, 0]}
            scale={[1.5, 1.25, 1.4]}
          >
            <sphereGeometry args={[1.0, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial
              color="#ffb300"
              emissive="#d97706"
              emissiveIntensity={0.25}
              metalness={0.98}
              roughness={0.05}
            />
          </mesh>

          {/* Visor Cyan HUD Ring Reflection Glow */}
          <mesh position={[0, 0.1, 1.85]} rotation={[0.1, 0, 0]}>
            <ringGeometry args={[0.5, 0.55, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>

          {/* Neck Ring Collar */}
          <mesh position={[0, -2.1, 0]}>
            <cylinderGeometry args={[1.6, 1.8, 0.4, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Left Audio / Comms Pod */}
          <mesh position={[-2.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.5, 0.4, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>

          {/* Right Audio / Antenna Pod */}
          <mesh position={[2.15, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.45, 0.5, 0.4, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>

          {/* High-Gain Telemetry Antenna */}
          <mesh position={[2.15, 0.9, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
          </mesh>

          {/* Status LED Lights on Headpiece */}
          <mesh position={[-0.8, 1.9, 0.8]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#00ff88" />
          </mesh>
          <mesh position={[-0.5, 2.0, 0.8]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* Gyroscopic Orbital Portal Ring 1 (Cyan) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[3.8, 0.05, 12, 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Gyroscopic Orbital Portal Ring 2 (Magenta) */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[4.4, 0.04, 12, 64]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Floating Space Debris & Asteroids */}
      <points ref={debrisRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[debrisPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          color="#94a3b8"
          transparent
          opacity={0.75}
        />
      </points>

      {/* Ambient Starlight Sparkles */}
      <Sparkles
        count={70}
        scale={[18, 18, 18]}
        size={2.5}
        speed={0.4}
        color="#38bdf8"
      />

      {/* Lighting tailored for visor reflections */}
      <pointLight position={[5, 5, 8]} color="#00f0ff" intensity={3.5} distance={20} />
      <pointLight position={[-6, -4, 6]} color="#ff007f" intensity={3} distance={20} />
      <pointLight position={[0, 6, -5]} color="#ffb300" intensity={2} distance={15} />
    </group>
  );
}

export default function AstronautCanvas() {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <AstronautHelmet />
      </Canvas>
    </div>
  );
}
