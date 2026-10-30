'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#050811') },
    uSurfaceColor: { value: new THREE.Color('#0e172a') },
    uReflectionColor: { value: new THREE.Color('#e08a3c') },
    uSpecularColor: { value: new THREE.Color('#f59e0b') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    // Smooth compounded natural wave function
    float getWaveElevation(vec2 pos, float time) {
      float elevation = 0.0;
      
      // Primary ocean swell
      elevation += sin(pos.x * 0.05 + time * 0.8) * cos(pos.y * 0.04 + time * 0.6) * 0.45;
      
      // Secondary cross swell
      elevation += sin(pos.x * 0.10 - time * 1.1) * sin(pos.y * 0.08 + time * 0.9) * 0.22;
      
      // Fine capillary ripples
      elevation += sin((pos.x + pos.y) * 0.22 + time * 1.6) * 0.08;

      return elevation;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float elevation = getWaveElevation(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      // Approximate surface normal for lighting reflection
      float delta = 0.12;
      float eX = getWaveElevation(pos.xy + vec2(delta, 0.0), uTime);
      float eY = getWaveElevation(pos.xy + vec2(0.0, delta), uTime);
      vec3 computedNormal = normalize(vec3(-(eX - elevation) / delta, -(eY - elevation) / delta, 1.0));
      vNormalVec = normalMatrix * computedNormal;

      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uSurfaceColor;
    uniform vec3 uReflectionColor;
    uniform vec3 uSpecularColor;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    void main() {
      // Natural depth gradient
      float depthMix = smoothstep(-0.5, 0.6, vElevation);
      vec3 waterBase = mix(uDeepColor, uSurfaceColor, depthMix);

      // Warm nocturnal surface reflection (reflecting celestial moons & lanterns)
      float crestGlint = smoothstep(0.2, 0.55, vElevation);
      vec3 waterWithGlint = mix(waterBase, uReflectionColor, crestGlint * 0.4);

      // Micro specular shimmer
      float shimmer = sin(vUv.x * 90.0 + uTime * 1.4) * sin(vUv.y * 90.0 - uTime * 1.2);
      float spec = step(0.92, shimmer) * crestGlint * 0.35;
      vec3 finalColor = waterWithGlint + uSpecularColor * spec;

      // Soft distance fog falloff
      float dist = length(vWorldPosition.xz);
      float fogFactor = smoothstep(110.0, 260.0, dist);
      finalColor = mix(finalColor, uDeepColor, fogFactor);

      gl_FragColor = vec4(finalColor, 0.96);
    }
  `,
};

export default function BioluminescentOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#050811') },
      uSurfaceColor: { value: new THREE.Color('#0e172a') },
      uReflectionColor: { value: new THREE.Color('#d97706') },
      uSpecularColor: { value: new THREE.Color('#f59e0b') },
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
      position={[0, -0.22, -90]}
      receiveShadow
    >
      <planeGeometry args={[420, 420, 140, 140]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={OceanShader.vertexShader}
        fragmentShader={OceanShader.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
