'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface IslandPortalCardProps {
  dayNumber: number;
  title: string;
  subtitle: string;
  imagePath: string;
  position: [number, number, number];
  rotationY?: number;
  accentColor: string;
  glowColor: string;
}

function IslandPortalCard({
  dayNumber,
  title,
  subtitle,
  imagePath,
  position,
  rotationY = 0,
  accentColor,
  glowColor,
}: IslandPortalCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Load the official artwork texture
  const texture = useTexture(imagePath);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Elegant levitation bobbing
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5 + dayNumber) * 0.45;
    }

    // Rotating glowing water ripple ring
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3;
      const scale = 1 + Math.sin(time * 2.0 + dayNumber) * 0.08;
      ringRef.current.scale.set(scale, scale, 1);
    }

    // Dynamic point light breathing
    if (lightRef.current) {
      lightRef.current.intensity = 4.5 + Math.sin(time * 2.5 + dayNumber) * 0.8;
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* ======================================================== */}
      {/* 1. LUMINOUS WATER SURFACE PROJECTION RING                */}
      {/* ======================================================== */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.08, 0]}
      >
        <ringGeometry args={[7.5, 8.2, 48]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner energy circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[3.5, 4.2, 36]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 2. LEVITATING 3D PORTAL MONOLITH (Textured Artwork)      */}
      {/* ======================================================== */}
      <group ref={groupRef} position={[0, position[1], 0]} rotation={[0, rotationY, 0]}>
        {/* Glass Backplate / Chamfered Pedestal Plate */}
        <mesh position={[0, 0, -0.15]}>
          <boxGeometry args={[15.2, 8.8, 0.25]} />
          <meshPhysicalMaterial
            color="#0b101d"
            roughness={0.15}
            metalness={0.8}
            transmission={0.4}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* High-Resolution Thematic Artwork Plane */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <planeGeometry args={[14.6, 8.2]} />
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
          />
        </mesh>

        {/* Outer Glowing Neon Border Frame */}
        <mesh position={[0, 0, 0.06]}>
          <ringGeometry args={[7.4, 7.55, 4]} />
          <meshBasicMaterial color={glowColor} />
        </mesh>

        {/* Neon Border Outline using a thin extruded frame */}
        <group position={[0, 0, 0.05]}>
          {/* Top border */}
          <mesh position={[0, 4.15, 0]}>
            <boxGeometry args={[14.8, 0.08, 0.08]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
          {/* Bottom border */}
          <mesh position={[0, -4.15, 0]}>
            <boxGeometry args={[14.8, 0.08, 0.08]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
          {/* Left border */}
          <mesh position={[-7.35, 0, 0]}>
            <boxGeometry args={[0.08, 8.35, 0.08]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
          {/* Right border */}
          <mesh position={[7.35, 0, 0]}>
            <boxGeometry args={[0.08, 8.35, 0.08]} />
            <meshBasicMaterial color={glowColor} />
          </mesh>
        </group>

        {/* Floating Portal Plinth Header (Top Glass Monogram) */}
        <group position={[0, 4.85, 0.1]}>
          <mesh>
            <boxGeometry args={[7.5, 0.9, 0.18]} />
            <meshStandardMaterial
              color="#090d16"
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
          {/* Accent indicator strip */}
          <mesh position={[0, -0.42, 0.1]}>
            <boxGeometry args={[7.2, 0.06, 0.02]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        </group>

        {/* Ambient Portal Colored Sparkles */}
        <Sparkles
          count={55}
          scale={[18, 12, 6]}
          size={3.8}
          speed={0.6}
          color={glowColor}
          opacity={0.8}
        />

        {/* Colored Local Illuminator Light */}
        <pointLight
          ref={lightRef}
          color={glowColor}
          intensity={5.0}
          distance={28}
          decay={1.6}
          position={[0, 0, 3.5]}
        />
      </group>
    </group>
  );
}

// ========================================================
// DAY 1: THE LAST OUTPOST (Dune Desert Theme)
// ========================================================
export function IslandLastOutpost({ position = [-24, 6.5, -42] as [number, number, number] }) {
  return (
    <IslandPortalCard
      dayNumber={1}
      title="THE LAST OUTPOST"
      subtitle="Arrakis Canyons & Sandstone Citadel"
      imagePath="/images/themes/day1-last-outpost.jpg"
      position={position}
      rotationY={0.35}
      accentColor="#f59e0b"
      glowColor="#fbbf24"
    />
  );
}

// ========================================================
// DAY 2: THE PANDEMONIUM (Synthwave Cyberpunk Theme)
// ========================================================
export function IslandPandemonium({ position = [26, 6.5, -108] as [number, number, number] }) {
  return (
    <IslandPortalCard
      dayNumber={2}
      title="THE PANDEMONIUM"
      subtitle="Sunset Delta & Cybernetic Spires"
      imagePath="/images/themes/day2-pandemonium.jpg"
      position={position}
      rotationY={-0.38}
      accentColor="#f43f5e"
      glowColor="#fb7185"
    />
  );
}

// ========================================================
// DAY 3: THE CARNIVAL ISLAND (Festive Pier & Ferris Wheel)
// ========================================================
export function IslandCarnival({ position = [-20, 6.5, -182] as [number, number, number] }) {
  return (
    <IslandPortalCard
      dayNumber={3}
      title="THE CARNIVAL ISLAND"
      subtitle="Luminous Boardwalk & Ferris Wheel"
      imagePath="/images/themes/day3-carnival-island.jpg"
      position={position}
      rotationY={0.32}
      accentColor="#06b6d4"
      glowColor="#38bdf8"
    />
  );
}
