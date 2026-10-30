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

export default function SceneController({ progress }: SceneControllerProps) {
  const { camera, scene } = useThree();
  const currentProgressRef = useRef(0);
  const boatRef = useRef<THREE.Group>(null);
  const lookTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentFogColor = useRef(new THREE.Color('#081830'));
  const targetFogColor = useRef(new THREE.Color('#081830'));
  const bankAngleRef = useRef(0);
  const previousHeadingRef = useRef(0);

  // Cinematic Wide-Angle Camera Field of View
  useEffect(() => {
    if ('isPerspectiveCamera' in camera && camera.isPerspectiveCamera) {
      const isMobile = window.innerWidth < 768;
      camera.fov = isMobile ? 56 : 52;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  useFrame((state, delta) => {
    // Smooth dampening towards target progress (creates smooth, natural sailing velocity)
    const target = THREE.MathUtils.clamp(progress, 0, 0.999);
    currentProgressRef.current = THREE.MathUtils.damp(
      currentProgressRef.current,
      target,
      2.0,
      delta
    );

    const t = currentProgressRef.current;

    // Get current position on spline curve
    const point = VOYAGE_CURVE.getPointAt(t);

    // Get tangent direction slightly ahead
    const aheadT = Math.min(0.9999, t + 0.02);
    const aheadPoint = VOYAGE_CURVE.getPointAt(aheadT);
    const tangent = new THREE.Vector3().subVectors(aheadPoint, point).normalize();

    // Compute boat heading and dynamic banking into turns
    const heading = Math.atan2(tangent.x, tangent.z);
    const headingDelta = heading - previousHeadingRef.current;
    previousHeadingRef.current = heading;

    // Bank angle proportional to turn rate
    const targetBank = THREE.MathUtils.clamp(-headingDelta * 8.0, -0.15, 0.15);
    bankAngleRef.current = THREE.MathUtils.damp(bankAngleRef.current, targetBank, 3.0, delta);

    // Position and orient the boat
    if (boatRef.current) {
      boatRef.current.position.copy(point);
      boatRef.current.rotation.y = heading + Math.PI; // Face forward along the voyage
    }

    // Dynamic Atmospheric Twilight Fog Morphing
    if (t < 0.42) {
      // Day 1: Desert Sunset Amber Glaze
      const weight = Math.max(0, 1 - Math.abs(t - 0.30) * 3.5);
      targetFogColor.current.set('#081830').lerp(new THREE.Color('#221410'), weight * 0.65);
    } else if (t < 0.76) {
      // Day 2: Cyber Twilight Magenta/Wine Glaze
      const weight = Math.max(0, 1 - Math.abs(t - 0.62) * 3.5);
      targetFogColor.current.set('#081830').lerp(new THREE.Color('#1f0e20'), weight * 0.65);
    } else {
      // Day 3: Carnival Lagoon Navy Glaze
      const weight = Math.max(0, 1 - Math.abs(t - 0.90) * 3.5);
      targetFogColor.current.set('#081830').lerp(new THREE.Color('#0b1a2e'), weight * 0.65);
    }

    currentFogColor.current.lerp(targetFogColor.current, delta * 2.0);
    if (scene.fog) {
      scene.fog.color.copy(currentFogColor.current);
    }

    // ========================================================
    // CINEMATIC CAMERA CHOREOGRAPHY
    // Designed so that the FULL 3D islands (citadel + moon,
    // cyber towers + sun, Ferris wheel + tents) are displayed
    // with water in front and clear sky above—NEVER clipping
    // under or touching the top navbar.
    // ========================================================
    const desiredCamPos = new THREE.Vector3();
    const desiredLookTarget = new THREE.Vector3();

    if (t < 0.12) {
      // HERO VIEW:
      // Boat is prominently positioned in lower-right foreground.
      // Open horizon and setting sun are showcased in center/right.
      desiredCamPos.set(6.5, 4.5, 49.0);
      desiredLookTarget.set(-2.0, 1.4, 20.0);
    } else if (t < 0.44) {
      // DAY 1: THE LAST OUTPOST (Citadel & Giant Moon on the LEFT)
      // Transition smoothly from Hero into wide 3/4 aerial sailing shot
      const blend = THREE.MathUtils.smoothstep(t, 0.12, 0.26);
      const camX = THREE.MathUtils.lerp(6.5, 5.0, blend);
      const camY = THREE.MathUtils.lerp(4.5, 10.5, blend);
      const camZ = THREE.MathUtils.lerp(49.0, point.z + 14.0, blend);

      desiredCamPos.set(camX, camY, camZ);
      desiredLookTarget.set(-32.0, 6.0, point.z - 2.0);
    } else if (t < 0.54) {
      // TRANSITION TO DAY 2 (Crossing Open Twilight Sea)
      const blend = THREE.MathUtils.smoothstep(t, 0.44, 0.54);
      const camX = THREE.MathUtils.lerp(5.0, -6.0, blend);
      const camY = THREE.MathUtils.lerp(10.5, 11.5, blend);
      const camZ = point.z + 14.0;

      const lookX = THREE.MathUtils.lerp(-32.0, 34.0, blend);
      desiredCamPos.set(camX, camY, camZ);
      desiredLookTarget.set(lookX, 6.5, point.z - 4.0);
    } else if (t < 0.74) {
      // DAY 2: THE PANDEMONIUM (Cyber Skyline & Sun on the RIGHT)
      // Camera is on the left of channel, framing the full city & waterfalls
      desiredCamPos.set(-6.0, 11.5, point.z + 14.0);
      desiredLookTarget.set(34.0, 7.0, point.z - 2.0);
    } else if (t < 0.84) {
      // TRANSITION TO DAY 3 (Banking back across the Bay)
      const blend = THREE.MathUtils.smoothstep(t, 0.74, 0.84);
      const camX = THREE.MathUtils.lerp(-6.0, 5.0, blend);
      const camY = THREE.MathUtils.lerp(11.5, 10.5, blend);
      const camZ = point.z + 14.0;

      const lookX = THREE.MathUtils.lerp(34.0, -32.0, blend);
      desiredCamPos.set(camX, camY, camZ);
      desiredLookTarget.set(lookX, 6.5, point.z - 4.0);
    } else {
      // DAY 3: THE CARNIVAL ISLAND (Ferris Wheel & Pier on the LEFT)
      // Camera frames the rotating wheel, gondolas, marquees, and boardwalk
      desiredCamPos.set(5.0, 10.5, point.z + 14.0);
      desiredLookTarget.set(-32.0, 6.5, point.z - 2.0);
    }

    camera.position.lerp(desiredCamPos, delta * 2.5);
    lookTargetRef.current.lerp(desiredLookTarget, delta * 3.0);
    camera.lookAt(lookTargetRef.current);
  });

  return (
    <group>
      {/* Prominently Sized Handcrafted Wooden Voyager Vessel */}
      <group ref={boatRef}>
        <CyberBoat
          scale={[1.7, 1.7, 1.7]}
          bankAngle={bankAngleRef.current}
        />
      </group>
    </group>
  );
}
