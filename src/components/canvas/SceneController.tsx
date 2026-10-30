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

  // Dynamic boat accent color matching the active day
  const [boatAccent, setBoatAccent] = React.useState('#00f0ff');

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
    const aheadT = Math.min(0.9999, t + 0.02);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);

      // Align boat to tangent direction
      const angle = Math.atan2(tangent.x, tangent.z);
      boatRef.current.rotation.y = angle + Math.PI; // Face forward along the voyage
    }

    // Dynamic boat accent color shift
    if (t < 0.38) {
      if (boatAccent !== '#f59e0b') setBoatAccent('#f59e0b');
    } else if (t < 0.72) {
      if (boatAccent !== '#f43f5e') setBoatAccent('#f43f5e');
    } else {
      if (boatAccent !== '#00f0ff') setBoatAccent('#00f0ff');
    }

    // Camera follow rig: third-person trailing behind the skiff on water
    const isMobile = state.size.width < 768;
    const camDistance = isMobile ? 11.0 : 9.2;
    const camHeight = isMobile ? 4.8 : 4.0;

    const desiredCamPos = new THREE.Vector3(
      point.x - tangent.x * camDistance,
      point.y + camHeight,
      point.z - tangent.z * camDistance
    );

    // Frame the floating portal cards as we navigate past them
    if (t > 0.12 && t < 0.38) {
      desiredCamPos.x += 2.2; // Frame Outpost Portal on the left
    } else if (t >= 0.38 && t < 0.72) {
      desiredCamPos.x -= 2.4; // Frame Pandemonium Portal on the right
    } else if (t >= 0.72) {
      desiredCamPos.x += 2.2; // Frame Carnival Portal on the left
    }

    camera.position.lerp(desiredCamPos, delta * 2.8);

    // Look target slightly ahead and downwards to keep the boat in the lower screen space
    const desiredLookTarget = new THREE.Vector3(
      point.x + tangent.x * 5.5,
      point.y + 0.3,
      point.z + tangent.z * 5.5
    );

    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.5);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* Sleek Glowing Cyber Skiff */}
      <group ref={boatRef}>
        <CyberBoat accentColor={boatAccent} />
      </group>
    </group>
  );
}
