'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE, ISLAND_WAYPOINTS } from './voyageConfig';
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
  const currentFogColor = useRef(new THREE.Color('#091b36'));
  const targetFogColor = useRef(new THREE.Color('#091b36'));

  // Responsive camera FOV setup
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 50 : 40;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state, delta) => {
    // Smooth dampening towards target progress (creates smooth, natural sailing velocity)
    const target = THREE.MathUtils.clamp(progress, 0, 0.999);
    currentProgressRef.current = THREE.MathUtils.damp(
      currentProgressRef.current,
      target,
      2.2, // Smooth, stately sailing rate
      delta
    );

    const t = currentProgressRef.current;

    // Get current position on spline curve
    const point = VOYAGE_CURVE.getPointAt(t);

    // Get tangent direction slightly ahead
    const aheadT = Math.min(0.9999, t + 0.02);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Normal vector perpendicular to tangent (to the right of boat)
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);

      // Smooth boat heading alignment
      const angle = Math.atan2(tangent.x, tangent.z);
      boatRef.current.rotation.y = angle + Math.PI; // Face forward along the voyage
    }

    // Dynamic Atmospheric Blue-Evening Fog Morphing
    if (t < 0.40) {
      // Day 1: The Last Outpost on the Left (Desert Amber Sunset Glaze)
      const weight = Math.max(0, 1 - Math.abs(t - 0.30) * 3.8);
      targetFogColor.current.set('#091b36').lerp(new THREE.Color('#2e1810'), weight * 0.7);
    } else if (t < 0.74) {
      // Day 2: The Pandemonium on the Right (Cyber Wine Sunset)
      const weight = Math.max(0, 1 - Math.abs(t - 0.62) * 3.8);
      targetFogColor.current.set('#091b36').lerp(new THREE.Color('#281024'), weight * 0.7);
    } else {
      // Day 3: The Carnival Island on the Left (Festival Lagoon Navy)
      const weight = Math.max(0, 1 - Math.abs(t - 0.90) * 3.8);
      targetFogColor.current.set('#091b36').lerp(new THREE.Color('#0d2038'), weight * 0.7);
    }

    currentFogColor.current.lerp(targetFogColor.current, delta * 2.0);
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }

    // ========================================================
    // CINEMATIC S-CURVE CAMERA CHOREOGRAPHY
    // ========================================================
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 10.5 : 9.0;
    const camHeight = isMobile ? 3.4 : 2.6;
    const sideOffset = isMobile ? 1.4 : 3.0; // 3/4 quarter side perspective

    // Compute base follow camera position
    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance + normal.x * sideOffset,
      point.y + camHeight,
      point.z - tangent.z * camDistance + normal.z * sideOffset
    );

    // Frame each island as the boat navigates:
    // Departure -> LEFT (Day 1) -> RIGHT (Day 2) -> LEFT (Day 3)
    if (t < 0.12) {
      // Hero view: Elevated 3/4 vista with boat in lower right, open blue water in center
      desiredCamPos.x += 1.6;
      desiredCamPos.y += 0.4;
    } else if (t >= 0.12 && t < 0.42) {
      // Day 1: Boat steers LEFT towards Outpost Citadel (Frame Island 1 on Left)
      desiredCamPos.x += 3.4;
      desiredCamPos.y += 0.7;
    } else if (t >= 0.42 && t < 0.74) {
      // Day 2: Boat steers RIGHT towards Cyber City (Frame Island 2 on Right)
      desiredCamPos.x -= 3.6;
      desiredCamPos.y += 0.8;
    } else if (t >= 0.74) {
      // Day 3: Boat steers back LEFT towards Carnival Island (Frame Island 3 on Left)
      desiredCamPos.x += 3.2;
      desiredCamPos.y += 0.7;
    }

    camera.position.lerp(desiredCamPos, delta * 2.4);

    // Look target ahead of the boat
    const lookOffset = t < 0.12 ? -1.0 : 0;
    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 5.2 + normal.x * lookOffset,
      point.y + 0.35,
      point.z + tangent.z * 5.2 + normal.z * lookOffset
    );

    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.0);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* Handcrafted Wooden Voyager Boat */}
      <group ref={boatRef}>
        <CyberBoat />
      </group>
    </group>
  );
}
