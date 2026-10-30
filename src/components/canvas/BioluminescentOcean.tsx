'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EveningOceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#0c1b33') },
    uMidColor: { value: new THREE.Color('#162d54') },
    uSunsetHorizon: { value: new THREE.Color('#ea580c') },
    uSunsetGlow: { value: new THREE.Color('#fbbf24') },
    uSpecularColor: { value: new THREE.Color('#fef3c7') },
    uSunPosition: { value: new THREE.Vector3(25, 18, -80) },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    // Compounded Gerstner / Sine waves
    float getWave(vec2 p, float t) {
      float w = 0.0;
      // Primary long ocean swell
      w += sin(p.x * 0.05 + t * 0.85) * cos(p.y * 0.04 + t * 0.65) * 0.42;
      // Secondary angled cross-swell
      w += sin(p.x * 0.11 - t * 1.05) * sin(p.y * 0.08 + t * 0.85) * 0.22;
      // Capillary ripples
      w += sin((p.x + p.y) * 0.24 + t * 1.45) * 0.07;
      return w;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = getWave(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      // Approximate surface normal for lighting & Fresnel reflection
      float delta = 0.15;
      float eX = getWave(pos.xy + vec2(delta, 0.0), uTime);
      float eY = getWave(pos.xy + vec2(0.0, delta), uTime);
      vec3 computedNormal = normalize(vec3(-(eX - elevation) / delta, -(eY - elevation) / delta, 1.0));
      vNormalVec = normalMatrix * computedNormal;

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uMidColor;
    uniform vec3 uSunsetHorizon;
    uniform vec3 uSunsetGlow;
    uniform vec3 uSpecularColor;
    uniform vec3 uSunPosition;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    void main() {
      // 1. Water depth gradient (Deep Twilight Sapphire to Rich Mid-Water)
      float depthMix = smoothstep(-0.45, 0.55, vElevation);
      vec3 waterBase = mix(uDeepColor, uMidColor, depthMix);

      // 2. Fresnel Reflection (At grazing angles, water reflects the evening sunset sky)
      vec3 normal = normalize(vNormalVec);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.8);

      // Sunset sky reflection gradient across horizon
      float horizonFactor = smoothstep(0.1, 0.85, -viewDir.z);
      vec3 sunsetSkyReflect = mix(uSunsetHorizon, uSunsetGlow, horizonFactor);
      
      // Blend water base with warm sunset reflection
      vec3 water = mix(waterBase, sunsetSkyReflect, fresnel * 0.72 + 0.18);

      // 3. Specular Golden Sun Streak
      vec3 sunDir = normalize(uSunPosition - vWorldPosition);
      vec3 halfVec = normalize(sunDir + viewDir);
      float spec = pow(max(dot(normal, halfVec), 0.0), 38.0);
      water += uSpecularColor * spec * 0.95;

      // 4. Luminous Wave Crest Highlights
      float crest = smoothstep(0.15, 0.45, vElevation);
      water += uSunsetGlow * crest * 0.22;

      // 5. Distance atmospheric blend into evening mist
      float dist = length(vWorldPosition.xz);
      float distFade = smoothstep(130.0, 320.0, dist);
      water = mix(water, uSunsetHorizon * 0.65, distFade * 0.45);

      gl_FragColor = vec4(water, 0.96);
    }
  `,
};

export default function BioluminescentOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#0c1b33') },
      uMidColor: { value: new THREE.Color('#162d54') },
      uSunsetHorizon: { value: new THREE.Color('#ea580c') },
      uSunsetGlow: { value: new THREE.Color('#fbbf24') },
      uSpecularColor: { value: new THREE.Color('#fef3c7') },
      uSunPosition: { value: new THREE.Vector3(25, 18, -80) },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 1.0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.16, -90]}
      receiveShadow
    >
      <planeGeometry args={[460, 460, 150, 150]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={EveningOceanShader.vertexShader}
        fragmentShader={EveningOceanShader.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
