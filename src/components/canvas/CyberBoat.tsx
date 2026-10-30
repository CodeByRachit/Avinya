'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  bankAngle?: number; // Dynamic centrifugal roll into turns
}

export default function CyberBoat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1.7, 1.7, 1.7],
  bankAngle = 0,
}: CyberBoatProps) {
  const boatRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const wakeLeftRef = useRef<THREE.Mesh>(null);
  const wakeRightRef = useRef<THREE.Mesh>(null);

  // Construct a handcrafted wooden expedition boat
  const {
    hullGeometry,
    sheerRailGeometry,
    deckGeometry,
    keelGeometry,
    thwartGeometries,
  } = useMemo(() => {
    // 1. Sleek voyager boat hull (faceted half-cylinder with pointed bow profile)
    const hullLength = 4.4;
    const hullMeshGeo = new THREE.CylinderGeometry(
      0.82,
      0.34,
      hullLength,
      24,
      1,
      false,
      0,
      Math.PI
    );
    hullMeshGeo.rotateX(Math.PI / 2);
    hullMeshGeo.rotateZ(Math.PI);
    hullMeshGeo.scale(1, 0.62, 1);

    // Keel spine along the bottom
    const keelPoints = [
      new THREE.Vector3(0, 0.52, -2.4),
      new THREE.Vector3(0, -0.12, -1.8),
      new THREE.Vector3(0, -0.16, 0),
      new THREE.Vector3(0, -0.12, 1.4),
      new THREE.Vector3(0, 0.46, 1.95),
    ];
    const keelCurve = new THREE.CatmullRomCurve3(keelPoints);
    const keelGeo = new THREE.TubeGeometry(keelCurve, 32, 0.045, 8, false);

    // Gunwale sheer rails along port & starboard edges
    const portRailPoints = [
      new THREE.Vector3(0, 0.52, -2.35),
      new THREE.Vector3(0.52, 0.46, -1.2),
      new THREE.Vector3(0.80, 0.44, 0),
      new THREE.Vector3(0.66, 0.45, 1.2),
      new THREE.Vector3(0.36, 0.49, 1.9),
    ];
    const starboardRailPoints = portRailPoints.map((p) => new THREE.Vector3(-p.x, p.y, p.z));

    const portCurve = new THREE.CatmullRomCurve3(portRailPoints);
    const starboardCurve = new THREE.CatmullRomCurve3(starboardRailPoints);

    const portRailGeo = new THREE.TubeGeometry(portCurve, 32, 0.038, 8, false);
    const starRailGeo = new THREE.TubeGeometry(starboardCurve, 32, 0.038, 8, false);

    // Internal Timber Floorboards
    const floorGeo = new THREE.BoxGeometry(0.78, 0.04, 3.3);

    // Cross-benches (thwarts)
    const thwarts = [
      { z: -0.85, w: 1.18 },
      { z: 0.15,  w: 1.38 },
      { z: 1.10,  w: 1.12 },
    ];

    return {
      hullGeometry: hullMeshGeo,
      sheerRailGeometry: { port: portRailGeo, star: starRailGeo },
      deckGeometry: floorGeo,
      keelGeometry: keelGeo,
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
      lanternLightRef.current.intensity = 3.8 + Math.sin(time * 9) * 0.5 + Math.sin(time * 19) * 0.25;
    }

    // Trailing wake ripple oscillation
    if (wakeLeftRef.current && wakeRightRef.current) {
      const wakeScale = 1.0 + Math.sin(time * 2.5) * 0.08;
      wakeLeftRef.current.scale.set(wakeScale, 1, wakeScale);
      wakeRightRef.current.scale.set(wakeScale, 1, wakeScale);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <group ref={boatRef}>
        {/* ======================================================== */}
        {/* 1. CARVED TIMBER HULL & CLINKER STRAKES                  */}
        {/* ======================================================== */}
        {/* Outer Hull with warm rich teak finish */}
        <mesh geometry={hullGeometry} position={[0, 0.32, -0.2]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#4a2e1b"
            roughness={0.55}
            metalness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Keel & Stem Backbone */}
        <mesh geometry={keelGeometry} castShadow>
          <meshStandardMaterial color="#2d1c10" roughness={0.7} />
        </mesh>

        {/* Port & Starboard Gunwale Sheer Rails */}
        <mesh geometry={sheerRailGeometry.port}>
          <meshStandardMaterial color="#6a4428" roughness={0.4} />
        </mesh>
        <mesh geometry={sheerRailGeometry.star}>
          <meshStandardMaterial color="#6a4428" roughness={0.4} />
        </mesh>

        {/* Ornamental Brass Stemhead & Prow Cap */}
        <group position={[0, 0.54, -2.38]}>
          <mesh castShadow>
            <boxGeometry args={[0.09, 0.46, 0.22]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#e5c158" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Stern Transom & Rudder */}
        <group position={[0, 0.40, 1.86]}>
          <mesh>
            <boxGeometry args={[0.78, 0.44, 0.08]} />
            <meshStandardMaterial color="#3a2315" roughness={0.6} />
          </mesh>
          {/* Submerged Rudder Blade */}
          <mesh position={[0, -0.22, 0.08]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[0.06, 0.58, 0.36]} />
            <meshStandardMaterial color="#2d1c10" roughness={0.7} />
          </mesh>
          {/* Wooden Steering Tiller */}
          <mesh position={[0, 0.22, -0.15]} rotation={[-0.15, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.58, 8]} />
            <meshStandardMaterial color="#6a4428" roughness={0.4} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 2. INNER DECK, FLOOR GRATINGS & BENCHES (THWARTS)        */}
        {/* ======================================================== */}
        {/* Floor Gratings */}
        <mesh geometry={deckGeometry} position={[0, 0.16, -0.15]} receiveShadow>
          <meshStandardMaterial color="#26160d" roughness={0.85} />
        </mesh>

        {/* Wooden Row Benches */}
        {thwartGeometries.map((th, idx) => (
          <group key={idx} position={[0, 0.36, th.z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[th.w, 0.05, 0.32]} />
              <meshStandardMaterial color="#5a3821" roughness={0.5} />
            </mesh>
            {/* Brass bench support brackets */}
            <mesh position={[-th.w / 2 + 0.06, -0.06, 0]}>
              <boxGeometry args={[0.04, 0.1, 0.14]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[th.w / 2 - 0.06, -0.06, 0]}>
              <boxGeometry args={[0.04, 0.1, 0.14]} />
              <meshStandardMaterial color="#cba153" metalness={0.8} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* ======================================================== */}
        {/* 3. VOYAGER MAST, FURLED CANVAS SAIL & SHROUD RIGGING     */}
        {/* ======================================================== */}
        {/* Tapered Main Mast */}
        <group position={[0, 0.38, -0.4]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.065, 2.4, 12]} />
            <meshStandardMaterial color="#543722" roughness={0.6} />
          </mesh>

          {/* Brass Mast Collar */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.14, 12]} />
            <meshStandardMaterial color="#cba153" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Cross-Boom Yardarm */}
          <mesh position={[0, 1.9, 0.18]} rotation={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.85, 8]} />
            <meshStandardMaterial color="#6a4428" roughness={0.5} />
          </mesh>

          {/* Furled Canvas Sail along Yardarm */}
          <mesh position={[0, 1.82, 0.22]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.07, 1.7, 12]} />
            <meshStandardMaterial
              color="#e6dfd3"
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>

          {/* Rigging Ropes (Shrouds) */}
          <mesh position={[-0.34, 0.95, 0]} rotation={[0, 0, -0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 2.0, 4]} />
            <meshBasicMaterial color="#b8a68d" />
          </mesh>
          <mesh position={[0.34, 0.95, 0]} rotation={[0, 0, 0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 2.0, 4]} />
            <meshBasicMaterial color="#b8a68d" />
          </mesh>
        </group>

        {/* Pair of Wooden Rowing Oars */}
        <group position={[-0.64, 0.45, 0.2]} rotation={[0.06, 0.05, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 2.5, 6]} />
            <meshStandardMaterial color="#6a4428" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[0.08, 0.4, 0.02]} />
            <meshStandardMaterial color="#543722" roughness={0.5} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 4. WARM BRASS BOW LANTERN (Primary Illuminating Beacon)  */}
        {/* ======================================================== */}
        <group position={[0, 0.8, -2.28]}>
          {/* Curved Brass Bracket */}
          <mesh position={[0, -0.12, 0.08]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.28, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Lantern Cage */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.24, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Conical Cap */}
          <mesh position={[0, 0.16, 0]}>
            <coneGeometry args={[0.11, 0.1, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Glowing Beacon Core */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>

          {/* Warm Illuminating Light */}
          <pointLight
            ref={lanternLightRef}
            color="#ff9800"
            intensity={4.2}
            distance={14}
            decay={1.8}
            position={[0, 0, -0.05]}
            castShadow
          />
        </group>

        {/* Small Stern Lantern */}
        <group position={[0, 0.6, 1.82]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.06, 0.14, 6]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>
          <pointLight color="#ff9800" intensity={2.2} distance={6} />
        </group>

        {/* ======================================================== */}
        {/* 5. NATURAL TRANSLUCENT WAKE RIBBONS (No Blocky Cubes)    */}
        {/* ======================================================== */}
        {/* Port Stern Wake Ribbon */}
        <mesh
          ref={wakeLeftRef}
          position={[-0.45, 0.03, 3.2]}
          rotation={[-Math.PI / 2, 0, 0.18]}
        >
          <planeGeometry args={[0.8, 3.4]} />
          <meshBasicMaterial
            color="#bae6fd"
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>

        {/* Starboard Stern Wake Ribbon */}
        <mesh
          ref={wakeRightRef}
          position={[0.45, 0.03, 3.2]}
          rotation={[-Math.PI / 2, 0, -0.18]}
        >
          <planeGeometry args={[0.8, 3.4]} />
          <meshBasicMaterial
            color="#bae6fd"
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>

        {/* Central Foaming Hull Wake */}
        <mesh position={[0, 0.025, 2.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 2.4]} />
          <meshBasicMaterial
            color="#e0f2fe"
            transparent
            opacity={0.14}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
