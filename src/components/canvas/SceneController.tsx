'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE } from './voyageConfig';
import CyberBoat from './CyberBoat';

interface SceneControllerProps {
  progress: number;
  onWaypointReached?: (day: 1 | 2 | 3) => void;
}

export default function SceneController({ progress, onWaypointReached }: SceneControllerProps) {
  const { camera, scene } = useThree();
  const currentProgressRef = useRef(0);
  const boatRef = useRef<THREE.Group>(null);
  const lookTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentFogColor = useRef(new THREE.Color('#0e1830'));
  const targetFogColor = useRef(new THREE.Color('#0e1830'));

  // Responsive camera FOV setup
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 52 : 42;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state, delta) => {
    // Smooth dampening towards target progress
    const target = THREE.MathUtils.clamp(progress, 0, 0.999);
    currentProgressRef.current = THREE.MathUtils.damp(
      currentProgressRef.current,
      target,
      2.6,
      delta
    );

    const t = currentProgressRef.current;

    // Get current position on spline curve
    const point = VOYAGE_CURVE.getPointAt(t);

    // Get tangent direction slightly ahead
    const aheadT = Math.min(0.9999, t + 0.018);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);

      // Align boat to tangent direction
      const angle = Math.atan2(tangent.x, tangent.z);
      boatRef.current.rotation.y = angle + Math.PI; // Face forward along the voyage
    }

    // Dynamic Atmosphere Fog Morphing aligned with the 3 Theme Artworks
    if (t < 0.38) {
      // Day 1: The Last Outpost (Warm Desert Terracotta / Sandstone Amber)
      const weight = Math.max(0, 1 - Math.abs(t - 0.22) * 4.5);
      targetFogColor.current.set('#0e1830').lerp(new THREE.Color('#381c10'), weight * 0.85);
    } else if (t < 0.72) {
      // Day 2: The Pandemonium (Sunset Crimson / Coral Wine)
      const weight = Math.max(0, 1 - Math.abs(t - 0.58) * 4.5);
      targetFogColor.current.set('#0e1830').lerp(new THREE.Color('#3b1228'), weight * 0.85);
    } else {
      // Day 3: The Carnival Island (Festive Nocturnal Amber / Lagoon Navy)
      const weight = Math.max(0, 1 - Math.abs(t - 0.88) * 4.5);
      targetFogColor.current.set('#0e1830').lerp(new THREE.Color('#16253d'), weight * 0.85);
    }

    currentFogColor.current.lerp(targetFogColor.current, delta * 2.0);
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }

    // Camera follow rig: situated to give a sweeping third-person view of the skiff on water
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 11.5 : 9.6;
    const camHeight = isMobile ? 5.2 : 4.4;

    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance,
      point.y + camHeight,
      point.z - tangent.z * camDistance
    );

    // Frame the islands majestically as we approach them
    if (t < 0.38) {
      desiredCamPos.x += 1.8; // Frame Outpost Citadel on the left
    } else if (t < 0.72) {
      desiredCamPos.x -= 1.8; // Frame Sunset Aqueducts on the right
    } else {
      desiredCamPos.x += 1.5; // Frame Carnival Ferris Wheel on the left
    }

    camera.position.lerp(desiredCamPos, delta * 2.5);

    // Look target ahead of the boat (angled slightly down towards the water to keep the boat in lower third)
    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 6,
      point.y + 0.35,
      point.z + tangent.z * 6
    );

    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.5);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* Handcrafted 3D Wooden Voyager Boat */}
      <group ref={boatRef}>
        <CyberBoat />
      </group>
    </group>
  );
}
