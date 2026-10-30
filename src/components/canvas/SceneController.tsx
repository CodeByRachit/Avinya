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
  const currentFogColor = useRef(new THREE.Color('#241528'));
  const targetFogColor = useRef(new THREE.Color('#241528'));

  // Responsive camera FOV setup
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 50 : 40;
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
    const aheadT = Math.min(0.9999, t + 0.02);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Normal vector perpendicular to tangent (to the right of boat)
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);

      // Align boat to tangent direction
      const angle = Math.atan2(tangent.x, tangent.z);
      boatRef.current.rotation.y = angle + Math.PI; // Face forward along the voyage
    }

    // Dynamic Evening Fog Morphing (Rich twilight sunset hues)
    if (t < 0.38) {
      // Day 1: The Last Outpost (Warm Desert Sunset Terracotta / Amber)
      const weight = Math.max(0, 1 - Math.abs(t - 0.22) * 4.5);
      targetFogColor.current.set('#241528').lerp(new THREE.Color('#421e10'), weight * 0.85);
    } else if (t < 0.72) {
      // Day 2: The Pandemonium (Sunset Crimson / Cyber Wine)
      const weight = Math.max(0, 1 - Math.abs(t - 0.58) * 4.5);
      targetFogColor.current.set('#241528').lerp(new THREE.Color('#3d1124'), weight * 0.85);
    } else {
      // Day 3: The Carnival Island (Festive Twilight Navy / Amber)
      const weight = Math.max(0, 1 - Math.abs(t - 0.88) * 4.5);
      targetFogColor.current.set('#241528').lerp(new THREE.Color('#1c1e3a'), weight * 0.85);
    }

    currentFogColor.current.lerp(targetFogColor.current, delta * 2.0);
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }

    // ========================================================
    // DYNAMIC 3/4 CINEMATIC CAMERA CHOREOGRAPHY
    // ========================================================
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 10.2 : 8.8;
    const camHeight = isMobile ? 3.4 : 2.6;
    const sideOffset = isMobile ? 1.5 : 3.2; // Offset to the right for 3/4 perspective

    // Compute desired camera position with 3/4 quarter offset
    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance + normal.x * sideOffset,
      point.y + camHeight,
      point.z - tangent.z * camDistance + normal.z * sideOffset
    );

    // Frame the islands majestically as we approach them
    if (t < 0.15) {
      // At Hero view: Give a wide three-quarter vista so boat is in lower-right
      desiredCamPos.x += 1.8;
      desiredCamPos.y += 0.4;
    } else if (t >= 0.15 && t < 0.40) {
      // Day 1: Frame Outpost Citadel & Moon on the left
      desiredCamPos.x += 3.2;
      desiredCamPos.y += 0.8;
    } else if (t >= 0.40 && t < 0.72) {
      // Day 2: Frame Cyber City towers & Sunset Sun on the right
      desiredCamPos.x -= 3.5;
      desiredCamPos.y += 1.0;
    } else if (t >= 0.72) {
      // Day 3: Frame Ferris Wheel & Carnival Pier on the left
      desiredCamPos.x += 3.0;
      desiredCamPos.y += 0.8;
    }

    camera.position.lerp(desiredCamPos, delta * 2.6);

    // Look target ahead of the boat, slightly offset to center the vista
    const lookOffset = t < 0.15 ? -1.2 : 0;
    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 5.0 + normal.x * lookOffset,
      point.y + 0.4,
      point.z + tangent.z * 5.0 + normal.z * lookOffset
    );

    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.2);
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
