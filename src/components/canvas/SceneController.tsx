'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { VOYAGE_CURVE, ISLAND_WAYPOINTS } from './voyageConfig';
import CyberBoat from './CyberBoat';

interface SceneControllerProps {
  progress: number; // 0.0 to 1.0 from page scroll or HUD click
  onWaypointReached?: (day: 1 | 2 | 3) => void;
}

export default function SceneController({ progress, onWaypointReached }: SceneControllerProps) {
  const { camera, scene } = useThree();
  const currentProgressRef = useRef(0);
  const boatRef = useRef<THREE.Group>(null);
  const lookTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentFogColor = useRef(new THREE.Color('#030712'));
  const targetFogColor = useRef(new THREE.Color('#030712'));

  // Mobile responsive camera FOV setup
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 58 : 46;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state, delta) => {
    // Smooth dampening towards target progress
    const target = THREE.MathUtils.clamp(progress, 0, 0.999);
    currentProgressRef.current = THREE.MathUtils.damp(
      currentProgressRef.current,
      target,
      2.8,
      delta
    );

    const t = currentProgressRef.current;

    // Get current point along the spline curve
    const point = VOYAGE_CURVE.getPointAt(t);

    // Get tangent direction slightly ahead
    const aheadT = Math.min(0.9999, t + 0.015);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);

      // Align boat to tangent direction
      const angle = Math.atan2(tangent.x, tangent.z);
      boatRef.current.rotation.y = angle + Math.PI; // Face forward along track
    }

    // Determine Dynamic Atmosphere Color based on active island vicinity
    if (t < 0.38) {
      // Day 1: The Last Outpost (Warm Amber / Desert Dune glow)
      const weight = Math.max(0, 1 - Math.abs(t - 0.22) * 5);
      targetFogColor.current.set('#030712').lerp(new THREE.Color('#1c0f05'), weight * 0.85);
    } else if (t < 0.72) {
      // Day 2: The Pandemonium (Cyberpunk Magenta / Neon)
      const weight = Math.max(0, 1 - Math.abs(t - 0.58) * 4);
      targetFogColor.current.set('#030712').lerp(new THREE.Color('#16041f'), weight * 0.85);
    } else {
      // Day 3: The Carnival Island (Carnival Violet / Festive Glow)
      const weight = Math.max(0, 1 - Math.abs(t - 0.88) * 4);
      targetFogColor.current.set('#030712').lerp(new THREE.Color('#180624'), weight * 0.85);
    }

    currentFogColor.current.lerp(targetFogColor.current, delta * 2.0);
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }

    // Camera follow rig
    // Third-person trailing camera slightly above and behind the boat
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 12 : 9.5;
    const camHeight = isMobile ? 5.5 : 4.2;

    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance,
      point.y + camHeight,
      point.z - tangent.z * camDistance
    );

    // Slight cinematic lateral offset to frame islands nicely
    if (t < 0.38) {
      desiredCamPos.x += 1.8; // Frame Island 1 on the left
    } else if (t < 0.72) {
      desiredCamPos.x -= 2.0; // Frame Island 2 on the right
    } else {
      desiredCamPos.x += 1.5; // Frame Island 3 on the left
    }

    camera.position.lerp(desiredCamPos, delta * 2.8);

    // Look target slightly ahead of boat
    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 6,
      point.y + 1.2,
      point.z + tangent.z * 6
    );

    lookTargetRef.current.lerp(desiredLookTarget, delta * 4.0);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* 3D Cyber Voyager Boat Mesh */}
      <group ref={boatRef}>
        <CyberBoat />
      </group>
    </group>
  );
}
