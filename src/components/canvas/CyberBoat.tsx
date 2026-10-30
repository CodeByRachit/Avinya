'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  bankAngle?: number;
}

export default function CyberBoat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1.7, 1.7, 1.7],
  bankAngle = 0,
}: CyberBoatProps) {
  const boatRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);

  // High-Vector-Density Handcrafted Wooden Voyager Hull
  const {
    hullGeometry,
    sheerRailGeometry,
    deckGeometry,
    keelGeometry,
    ribGeometries,
    thwartGeometries,
  } = useMemo(() => {
    // 1. High-subdivision smooth hull (64 radial segments for ultra-smooth curves)
    const hullLength = 4.5;
    const hullMeshGeo = new THREE.CylinderGeometry(
      0.84,
      0.32,
      hullLength,
      64, // 64 radial vector segments (high quality, zero low-poly facets)
      16, // 16 length segments
      false,
      0,
      Math.PI
    );
    hullMeshGeo.rotateX(Math.PI / 2);
    hullMeshGeo.rotateZ(Math.PI);
    hullMeshGeo.scale(1, 0.64, 1);
    hullMeshGeo.computeVertexNormals();

    // 2. Smoothly curved keel spine along the bottom (48 segments)
    const keelPoints = [
      new THREE.Vector3(0, 0.54, -2.45),
      new THREE.Vector3(0, -0.10, -1.8),
      new THREE.Vector3(0, -0.16, 0),
      new THREE.Vector3(0, -0.10, 1.4),
      new THREE.Vector3(0, 0.48, 2.0),
    ];
    const keelCurve = new THREE.CatmullRomCurve3(keelPoints);
    const keelGeo = new THREE.TubeGeometry(keelCurve, 48, 0.045, 12, false);

    // 3. High-density Gunwale sheer rails along port & starboard edges (64 segments)
    const portRailPoints = [
      new THREE.Vector3(0, 0.54, -2.40),
      new THREE.Vector3(0.54, 0.47, -1.2),
      new THREE.Vector3(0.82, 0.45, 0),
      new THREE.Vector3(0.68, 0.46, 1.2),
      new THREE.Vector3(0.38, 0.50, 1.95),
    ];
    const starboardRailPoints = portRailPoints.map((p) => new THREE.Vector3(-p.x, p.y, p.z));

    const portCurve = new THREE.CatmullRomCurve3(portRailPoints);
    const starboardCurve = new THREE.CatmullRomCurve3(starboardRailPoints);

    const portRailGeo = new THREE.TubeGeometry(portCurve, 64, 0.038, 12, false);
    const starRailGeo = new THREE.TubeGeometry(starboardCurve, 64, 0.038, 12, false);

    // 4. Internal Curved Structural Wooden Ribs
    const ribs = [-1.4, -0.9, -0.4, 0.1, 0.6, 1.1, 1.6].map((rz) => {
      // Semi-elliptical rib arch
      const w = Math.cos((rz / 2.3) * (Math.PI / 2)) * 0.78;
      const h = 0.38;
      const ribPts = [
        new THREE.Vector3(-w, 0.42, rz),
        new THREE.Vector3(-w * 0.7, 0.12, rz),
        new THREE.Vector3(0, 0.08, rz),
        new THREE.Vector3(w * 0.7, 0.12, rz),
        new THREE.Vector3(w, 0.42, rz),
      ];
      const crv = new THREE.CatmullRomCurve3(ribPts);
      return new THREE.TubeGeometry(crv, 18, 0.022, 8, false);
    });

    // 5. Internal Timber Floorboards
    const floorGeo = new THREE.BoxGeometry(0.76, 0.035, 3.4);

    // 6. Cross-benches (thwarts)
    const thwarts = [
      { z: -0.85, w: 1.20 },
      { z: 0.15,  w: 1.40 },
      { z: 1.10,  w: 1.15 },
    ];

    return {
      hullGeometry: hullMeshGeo,
      sheerRailGeometry: { port: portRailGeo, star: starRailGeo },
      deckGeometry: floorGeo,
      keelGeometry: keelGeo,
      ribGeometries: ribs,
      thwartGeometries: thwarts,
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Natural hydrodynamic wave pitching, roll, and heave
    if (boatRef.current) {
      boatRef.current.position.y = Math.sin(time * 2.0) * 0.07 + 0.14;
      boatRef.current.rotation.z = Math.sin(time * 1.5) * 0.04 + bankAngle;
      boatRef.current.rotation.x = Math.cos(time * 1.8) * 0.035;
    }

    // Bow Lantern flame flicker
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 4.2 + Math.sin(time * 9) * 0.6 + Math.sin(time * 19) * 0.25;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={boatRef}>
        {/* ======================================================== */}
        {/* 1. HIGH-VECTOR-DENSITY CARVED TIMBER HULL                */}
        {/* ======================================================== */}
        {/* Outer Hull with rich polished teak/mahogany finish */}
        <mesh geometry={hullGeometry} position={[0, 0.32, -0.2]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#462a17"
            roughness={0.42}
            metalness={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Keel & Stem Backbone */}
        <mesh geometry={keelGeometry} castShadow>
          <meshStandardMaterial color="#2b1a0e" roughness={0.65} />
        </mesh>

        {/* Port & Starboard Gunwale Sheer Rails */}
        <mesh geometry={sheerRailGeometry.port}>
          <meshStandardMaterial color="#6e4628" roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh geometry={sheerRailGeometry.star}>
          <meshStandardMaterial color="#6e4628" roughness={0.35} metalness={0.15} />
        </mesh>

        {/* Internal Curved Ribs */}
        {ribGeometries.map((rGeo, idx) => (
          <mesh key={idx} geometry={rGeo} position={[0, 0.02, 0]}>
            <meshStandardMaterial color="#382112" roughness={0.6} />
          </mesh>
        ))}

        {/* Ornamental Brass Stemhead & Prow Cap (64 segments) */}
        <group position={[0, 0.54, -2.42]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.07, 0.48, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshStandardMaterial color="#ffd700" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>

        {/* Stern Transom Backplate & Rudder (CLEAN - ZERO GREY PLANES) */}
        <group position={[0, 0.40, 1.90]}>
          {/* Curved Wineglass Transom Shield */}
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.38, 0.10, 32, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#361f12" roughness={0.5} />
          </mesh>
          {/* Brass Transom Edge Trim */}
          <mesh position={[0, 0.05, 0.05]}>
            <boxGeometry args={[0.76, 0.04, 0.04]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Submerged Rudder Blade */}
          <mesh position={[0, -0.24, 0.12]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[0.05, 0.60, 0.38]} />
            <meshStandardMaterial color="#24150b" roughness={0.7} />
          </mesh>
          {/* Wooden Steering Tiller with Brass Handle */}
          <mesh position={[0, 0.24, -0.18]} rotation={[-0.14, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.62, 16]} />
            <meshStandardMaterial color="#6e4628" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.28, -0.46]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 2. INNER DECK & ROWING BENCHES                           */}
        {/* ======================================================== */}
        {/* Floor Gratings */}
        <mesh geometry={deckGeometry} position={[0, 0.16, -0.15]} receiveShadow>
          <meshStandardMaterial color="#22130a" roughness={0.85} />
        </mesh>

        {/* Wooden Row Benches (Thwarts) */}
        {thwartGeometries.map((th, idx) => (
          <group key={idx} position={[0, 0.36, th.z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[th.w, 0.05, 0.34]} />
              <meshStandardMaterial color="#58341d" roughness={0.45} />
            </mesh>
            {/* Brass bench support brackets */}
            <mesh position={[-th.w / 2 + 0.06, -0.06, 0]}>
              <boxGeometry args={[0.04, 0.1, 0.14]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[th.w / 2 - 0.06, -0.06, 0]}>
              <boxGeometry args={[0.04, 0.1, 0.14]} />
              <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}

        {/* ======================================================== */}
        {/* 3. VOYAGER MAST, FURLED CANVAS SAIL & SHROUD RIGGING     */}
        {/* ======================================================== */}
        {/* Tapered Main Mast (32 segments) */}
        <group position={[0, 0.38, -0.4]}>
          <mesh position={[0, 1.25, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.068, 2.5, 24]} />
            <meshStandardMaterial color="#56341d" roughness={0.55} />
          </mesh>

          {/* Brass Mast Collar */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.085, 0.095, 0.15, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Cross-Boom Yardarm */}
          <mesh position={[0, 1.95, 0.18]} rotation={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 1.9, 16]} />
            <meshStandardMaterial color="#6e4628" roughness={0.5} />
          </mesh>

          {/* Furled Canvas Sail along Yardarm */}
          <mesh position={[0, 1.86, 0.22]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.095, 0.075, 1.75, 24]} />
            <meshStandardMaterial
              color="#e8e2d5"
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>

          {/* Rigging Ropes (Shrouds) */}
          <mesh position={[-0.35, 1.0, 0]} rotation={[0, 0, -0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 2.1, 8]} />
            <meshBasicMaterial color="#c4b59f" />
          </mesh>
          <mesh position={[0.35, 1.0, 0]} rotation={[0, 0, 0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 2.1, 8]} />
            <meshBasicMaterial color="#c4b59f" />
          </mesh>
        </group>

        {/* Pair of Wooden Rowing Oars */}
        <group position={[-0.66, 0.46, 0.2]} rotation={[0.06, 0.05, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 2.6, 12]} />
            <meshStandardMaterial color="#6e4628" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[0.08, 0.42, 0.02]} />
            <meshStandardMaterial color="#56341d" roughness={0.5} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 4. WARM ORNATE BRASS BOW LANTERN                         */}
        {/* ======================================================== */}
        <group position={[0, 0.82, -2.32]}>
          {/* Curved Brass Bracket */}
          <mesh position={[0, -0.12, 0.08]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.22} />
          </mesh>

          {/* Pierced Octagonal Lantern Cage */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.095, 0.115, 0.25, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.22} />
          </mesh>

          {/* Conical Cap */}
          <mesh position={[0, 0.17, 0]}>
            <coneGeometry args={[0.115, 0.11, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={0.92} roughness={0.18} />
          </mesh>

          {/* Glowing Beacon Core */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>

          {/* Warm Illuminating Point Light */}
          <pointLight
            ref={lanternLightRef}
            color="#ff9800"
            intensity={4.5}
            distance={15}
            decay={1.8}
            position={[0, 0, -0.05]}
            castShadow
          />
        </group>

        {/* Small Stern Lantern */}
        <group position={[0, 0.62, 1.86]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.06, 0.15, 12]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>
          <pointLight color="#ff9800" intensity={2.2} distance={6} />
        </group>
      </group>
    </group>
  );
}
