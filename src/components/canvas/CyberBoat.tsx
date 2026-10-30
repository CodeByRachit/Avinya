'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberBoatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  accentColor?: string;
}

export default function CyberBoat({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  accentColor = '#f59e0b',
}: CyberBoatProps) {
  const boatRef = useRef<THREE.Group>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const wakePointsRef = useRef<THREE.Points>(null);

  // Construct a handcrafted, high-detail wooden expedition boat
  const {
    hullGeometry,
    sheerRailGeometry,
    deckGeometry,
    keelGeometry,
    ribGeometries,
    thwartGeometries,
  } = useMemo(() => {
    // 1. Sleek, double-ended traditional voyager boat hull (faceted lofted cross-sections)
    // Cross sections from bow (z = -2.6) to stern (z = 1.8)
    const stations = [
      { z: -2.6, w: 0.05, h: 0.55, y: 0.45 }, // Sharp Bow Stem
      { z: -1.8, w: 0.45, h: 0.50, y: 0.35 }, // Forward Shoulder
      { z: -0.8, w: 0.72, h: 0.48, y: 0.28 }, // Mid-Forward
      { z: 0.2,  w: 0.80, h: 0.48, y: 0.25 }, // Midships (Widest)
      { z: 1.1,  w: 0.68, h: 0.50, y: 0.28 }, // Aft Quarter
      { z: 1.8,  w: 0.42, h: 0.52, y: 0.35 }, // Stern Transom
    ];

    const vertices: number[] = [];
    const indices: number[] = [];

    // Build 6 longitudinal strakes (planks) per side
    const segmentsY = 5;
    for (let i = 0; i < stations.length; i++) {
      const st = stations[i];
      for (let j = 0; j <= segmentsY; j++) {
        const t = j / segmentsY;
        // Half-elliptical hull profile
        const angle = (t * Math.PI) / 2;
        const x = Math.sin(angle) * st.w;
        const y = st.y - (1 - Math.cos(angle)) * st.h;
        vertices.push(x, y, st.z);
        if (x !== 0) {
          vertices.push(-x, y, st.z);
        }
      }
    }

    // Handcrafted solid hull using lofted curve geometry
    const hullShape = new THREE.Shape();
    hullShape.moveTo(0, 0);
    hullShape.quadraticCurveTo(0.75, 0.05, 0.8, 0.45);
    hullShape.lineTo(0.72, 0.48);
    hullShape.quadraticCurveTo(0.68, 0.08, 0, 0.02);
    hullShape.closePath();

    // Hull mesh: Detailed clinker-built wooden hull
    const hullLength = 4.2;
    const hullMeshGeo = new THREE.CylinderGeometry(
      0.82,
      0.35,
      hullLength,
      24,
      1,
      false,
      0,
      Math.PI
    );
    // Rotate to lie horizontally along Z-axis
    hullMeshGeo.rotateX(Math.PI / 2);
    hullMeshGeo.rotateZ(Math.PI);
    hullMeshGeo.scale(1, 0.6, 1);

    // Keel spline along the spine
    const keelPoints = [
      new THREE.Vector3(0, 0.5, -2.4),
      new THREE.Vector3(0, -0.12, -1.8),
      new THREE.Vector3(0, -0.15, 0),
      new THREE.Vector3(0, -0.12, 1.4),
      new THREE.Vector3(0, 0.45, 1.9),
    ];
    const keelCurve = new THREE.CatmullRomCurve3(keelPoints);
    const keelGeo = new THREE.TubeGeometry(keelCurve, 32, 0.045, 8, false);

    // Gunwale Sheer Rails (curving trim around port & starboard edges)
    const portRailPoints = [
      new THREE.Vector3(0, 0.5, -2.35),
      new THREE.Vector3(0.5, 0.45, -1.2),
      new THREE.Vector3(0.78, 0.42, 0),
      new THREE.Vector3(0.65, 0.44, 1.2),
      new THREE.Vector3(0.35, 0.48, 1.85),
    ];
    const starboardRailPoints = portRailPoints.map((p) => new THREE.Vector3(-p.x, p.y, p.z));

    const portCurve = new THREE.CatmullRomCurve3(portRailPoints);
    const starboardCurve = new THREE.CatmullRomCurve3(starboardRailPoints);

    const portRailGeo = new THREE.TubeGeometry(portCurve, 32, 0.035, 8, false);
    const starRailGeo = new THREE.TubeGeometry(starboardCurve, 32, 0.035, 8, false);

    // Internal Timber Floorboards
    const floorGeo = new THREE.BoxGeometry(0.75, 0.04, 3.2);

    // Cross-benches (thwarts)
    const thwarts = [
      { z: -0.8, w: 1.15 },
      { z: 0.15, w: 1.35 },
      { z: 1.05, w: 1.10 },
    ];

    return {
      hullGeometry: hullMeshGeo,
      sheerRailGeometry: { port: portRailGeo, star: starRailGeo },
      deckGeometry: floorGeo,
      keelGeometry: keelGeo,
      ribGeometries: [],
      thwartGeometries: thwarts,
    };
  }, []);

  // Luminous hydro-wake particles trailing behind the hull
  const { wakePositions, wakeLifetimes } = useMemo(() => {
    const count = 55;
    const positions = new Float32Array(count * 3);
    const lifetimes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.random();
      positions[i * 3] = (Math.random() - 0.5) * 0.4;
      positions[i * 3 + 1] = 0.02;
      positions[i * 3 + 2] = 1.8 + Math.random() * 4.0;
    }

    return { wakePositions: positions, wakeLifetimes: lifetimes };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Natural hydro-dynamic wave pitching, roll, and heave
    if (boatRef.current) {
      boatRef.current.position.y = Math.sin(time * 2.0) * 0.05 + 0.16;
      boatRef.current.rotation.z = Math.sin(time * 1.5) * 0.03;
      boatRef.current.rotation.x = Math.cos(time * 1.7) * 0.025;
    }

    // Bow Lantern flame flicker
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 3.6 + Math.sin(time * 8) * 0.6 + Math.sin(time * 15) * 0.2;
    }

    // Animate glowing wake particles
    if (wakePointsRef.current) {
      const positions = wakePointsRef.current.geometry.attributes.position.array as Float32Array;
      const count = wakeLifetimes.length;

      for (let i = 0; i < count; i++) {
        wakeLifetimes[i] += delta * 1.0;
        if (wakeLifetimes[i] > 1.0) {
          wakeLifetimes[i] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.3;
          positions[i * 3 + 1] = 0.02;
          positions[i * 3 + 2] = 1.7;
        } else {
          positions[i * 3 + 2] += delta * 3.4;
          positions[i * 3] += (positions[i * 3] >= 0 ? 1 : -1) * delta * 0.55;
        }
      }
      wakePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <group ref={boatRef}>
        {/* ======================================================== */}
        {/* 1. CARVED TIMBER HULL & CLINKER STRAKES                  */}
        {/* ======================================================== */}
        {/* Outer Hull with warm rich teak/mahogany finish */}
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

        {/* Curved Bow Prow Cap (Ornamental Brass Stemhead) */}
        <group position={[0, 0.52, -2.35]}>
          <mesh castShadow>
            <boxGeometry args={[0.09, 0.45, 0.22]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial color="#e5c158" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Stern Transom Backplate & Rudder Post */}
        <group position={[0, 0.38, 1.82]}>
          <mesh>
            <boxGeometry args={[0.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#3a2315" roughness={0.6} />
          </mesh>
          {/* Rudder blade submerged in water */}
          <mesh position={[0, -0.2, 0.08]} rotation={[0.08, 0, 0]}>
            <boxGeometry args={[0.06, 0.55, 0.35]} />
            <meshStandardMaterial color="#2d1c10" roughness={0.7} />
          </mesh>
          {/* Wooden Tiller Arm */}
          <mesh position={[0, 0.22, -0.15]} rotation={[-0.15, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.03, 0.55, 8]} />
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
        {/* 3. VOYAGER MAST, FURLLED CANVAS SAIL & SHROUD RIGGING    */}
        {/* ======================================================== */}
        {/* Tapered Main Mast */}
        <group position={[0, 0.38, -0.4]}>
          <mesh position={[0, 1.15, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.065, 2.3, 12]} />
            <meshStandardMaterial color="#543722" roughness={0.6} />
          </mesh>

          {/* Brass Mast Base Collar */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.08, 0.09, 0.14, 12]} />
            <meshStandardMaterial color="#cba153" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Cross-Boom Yardarm */}
          <mesh position={[0, 1.85, 0.18]} rotation={[0.08, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.8, 8]} />
            <meshStandardMaterial color="#6a4428" roughness={0.5} />
          </mesh>

          {/* Draped / Furled Canvas Sail along the yardarm */}
          <mesh position={[0, 1.78, 0.22]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.07, 1.65, 12]} />
            <meshStandardMaterial
              color="#e6dfd3"
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>

          {/* Rigging Ropes (Port & Starboard Shrouds) */}
          <mesh position={[-0.32, 0.9, 0]} rotation={[0, 0, -0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 1.9, 4]} />
            <meshBasicMaterial color="#b8a68d" />
          </mesh>
          <mesh position={[0.32, 0.9, 0]} rotation={[0, 0, 0.28]}>
            <cylinderGeometry args={[0.008, 0.008, 1.9, 4]} />
            <meshBasicMaterial color="#b8a68d" />
          </mesh>
        </group>

        {/* Pair of Wooden Rowing Oars resting neatly along gunwales */}
        <group position={[-0.62, 0.44, 0.2]} rotation={[0.06, 0.05, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 2.4, 6]} />
            <meshStandardMaterial color="#6a4428" roughness={0.5} />
          </mesh>
          {/* Oar blade */}
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[0.08, 0.38, 0.02]} />
            <meshStandardMaterial color="#543722" roughness={0.5} />
          </mesh>
        </group>

        {/* ======================================================== */}
        {/* 4. WARM BRASS BOW LANTERN (Primary Illuminating Beacon)  */}
        {/* ======================================================== */}
        <group position={[0, 0.78, -2.25]}>
          {/* Curved Brass Lantern Bracket */}
          <mesh position={[0, -0.12, 0.08]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.28, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Octagonal Brass Lantern Housing */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.11, 0.24, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.25} />
          </mesh>

          {/* Conical Brass Lantern Top Cap */}
          <mesh position={[0, 0.16, 0]}>
            <coneGeometry args={[0.11, 0.1, 8]} />
            <meshStandardMaterial color="#cba153" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Incandescent Glowing Core */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>

          {/* Warm Point Light Casting Amber Reflection on Water & Boat */}
          <pointLight
            ref={lanternLightRef}
            color="#ff9800"
            intensity={4.0}
            distance={11}
            decay={1.8}
            position={[0, 0, -0.05]}
            castShadow
          />
        </group>

        {/* Small Stern Lantern */}
        <group position={[0, 0.58, 1.78]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.06, 0.14, 6]} />
            <meshStandardMaterial color="#cba153" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#ffb74d" />
          </mesh>
          <pointLight color="#ff9800" intensity={2.0} distance={5} />
        </group>

        {/* ======================================================== */}
        {/* 5. LUMINOUS HYDRO WAKE RIPPLES                           */}
        {/* ======================================================== */}
        <points ref={wakePointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[wakePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.22}
            color="#7dd3fc"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
