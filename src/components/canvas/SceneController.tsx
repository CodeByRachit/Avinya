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

  // Wide-Angle Cinematic Camera FOV (Ensures the full 3D islands & sky fit in frame)
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 58 : 50;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state, delta) => {
    // Smooth dampening towards target progress (creates smooth, natural sailing velocity)
    const target = THREE.MathUtils.clamp(progress, 0, 0.999);
    currentProgressRef.current = THREE.MathUtils.damp(
      currentProgressRef.current,
      target,
      2.2,
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
    // WIDE CINEMATIC CAMERA CHOREOGRAPHY (FULL 3D VISIBILITY)
    // ========================================================
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 15.0 : 13.5;
    const camHeight = isMobile ? 6.2 : 5.0;
    const sideOffset = isMobile ? 3.0 : 5.0; // 3/4 quarter side perspective

    // Compute base follow camera position
    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance + normal.x * sideOffset,
      point.y + camHeight,
      point.z - tangent.z * camDistance + normal.z * sideOffset
    );

    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 5.0,
      point.y + 1.2,
      point.z + tangent.z * 5.0
    );

    // Frame the FULL 3D elements majestically for each day:
    if (t < 0.12) {
      // Hero view: Sizable wooden boat in lower right foreground, open blue sea in center
      desiredCamPos.set(point.x + 6.2, point.y + 3.8, point.z + 12.0);
      desiredLookTarget.set(point.x - 2.5, point.y + 1.2, point.z - 5.0);
    } else if (t >= 0.12 && t < 0.42) {
      // Day 1: Pull back & elevate to frame the FULL Citadel Fortress & Sandstone Moon
      desiredCamPos.x += 10.0;
      desiredCamPos.y += 4.5;
      desiredCamPos.z += 8.0;
      desiredLookTarget.set(point.x - 14, point.y + 8.5, point.z - 8);
    } else if (t >= 0.42 && t < 0.74) {
      // Day 2: Pull back & elevate to frame the FULL Cyber Skyline, Aqueducts & Giant Sun
      desiredCamPos.x -= 12.0;
      desiredCamPos.y += 5.0;
      desiredCamPos.z += 8.0;
      desiredLookTarget.set(point.x + 16, point.y + 9.5, point.z - 8);
    } else if (t >= 0.74) {
      // Day 3: Pull back & elevate to frame the FULL Rotating Ferris Wheel, Tents & Pier
      desiredCamPos.x += 11.0;
      desiredCamPos.y += 5.0;
      desiredCamPos.z += 8.0;
      desiredLookTarget.set(point.x - 12, point.y + 8.5, point.z - 8);
    }

    camera.position.lerp(desiredCamPos, delta * 2.5);
    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.0);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* Prominently Sized Handcrafted Wooden Voyager Boat */}
      <group ref={boatRef}>
        <CyberBoat scale={[1.7, 1.7, 1.7]} />
      </group>
    </group>
  );
}
