'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#08162b') },
    uSurfaceColor: { value: new THREE.Color('#0c2d4a') },
    uGlintColor: { value: new THREE.Color('#00f0ff') },
    uSpecularColor: { value: new THREE.Color('#ffffff') },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPosition;

    // Compounded wave displacement
    float getWave(vec2 p, float t) {
      float w = 0.0;
      w += sin(p.x * 0.06 + t * 0.9) * cos(p.y * 0.05 + t * 0.7) * 0.38;
      w += sin(p.x * 0.12 - t * 1.1) * sin(p.y * 0.09 + t * 0.8) * 0.18;
      w += sin((p.x + p.y) * 0.2 + t * 1.5) * 0.06;
      return w;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = getWave(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uSurfaceColor;
    uniform vec3 uGlintColor;
    uniform vec3 uSpecularColor;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPosition;

    void main() {
      // Natural water depth blend
      float depthMix = smoothstep(-0.4, 0.5, vElevation);
      vec3 water = mix(uDeepColor, uSurfaceColor, depthMix);

      // Luminous bioluminescent teal wave crest highlights
      float crest = smoothstep(0.12, 0.42, vElevation);
      water = mix(water, uGlintColor, crest * 0.45);

      // Micro specular shimmer on ripple peaks
      float shimmer = sin(vUv.x * 120.0 + uTime * 1.6) * sin(vUv.y * 120.0 - uTime * 1.3);
      float spec = step(0.93, shimmer) * crest * 0.5;
      vec3 finalColor = water + uSpecularColor * spec;

      // Soft distance falloff
      float dist = length(vWorldPosition.xz);
      float fade = smoothstep(140.0, 320.0, dist);
      finalColor = mix(finalColor, uDeepColor * 0.8, fade);

      gl_FragColor = vec4(finalColor, 0.94);
    }
  `,
};

export default function BioluminescentOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#08162b') },
      uSurfaceColor: { value: new THREE.Color('#0c2d4a') },
      uGlintColor: { value: new THREE.Color('#00f0ff') },
      uSpecularColor: { value: new THREE.Color('#ffffff') },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 1.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.18, -90]}
      receiveShadow
    >
      <planeGeometry args={[440, 440, 140, 140]} />
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
