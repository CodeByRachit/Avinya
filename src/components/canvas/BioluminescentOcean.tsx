'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OceanShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#030712') },
    uSurfaceColor: { value: new THREE.Color('#0a192f') },
    uCrestColor: { value: new THREE.Color('#00f0ff') },
    uFoamColor: { value: new THREE.Color('#48e5c2') },
    uBiolumIntensity: { value: 0.85 },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    // Gerstner / compounded sine wave function
    float getWaveElevation(vec2 pos, float time) {
      float elevation = 0.0;
      
      // Wave 1 - Large primary swell
      elevation += sin(pos.x * 0.06 + time * 0.9) * cos(pos.y * 0.04 + time * 0.7) * 0.55;
      
      // Wave 2 - Medium cross chop
      elevation += sin(pos.x * 0.12 - time * 1.3) * sin(pos.y * 0.10 + time * 1.1) * 0.28;
      
      // Wave 3 - Fine bioluminescent ripple
      elevation += sin((pos.x + pos.y) * 0.25 + time * 2.1) * 0.12;

      return elevation;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float elevation = getWaveElevation(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      // Approximate normal for lighting calculation
      float delta = 0.1;
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
    uniform vec3 uCrestColor;
    uniform vec3 uFoamColor;
    uniform float uBiolumIntensity;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    void main() {
      // Elevation-based color mixing
      float mixElevation = smoothstep(-0.6, 0.7, vElevation);
      vec3 waterColor = mix(uDeepColor, uSurfaceColor, mixElevation);

      // Bioluminescent crest highlight
      float crestFactor = smoothstep(0.25, 0.65, vElevation);
      vec3 bioluminescentCrest = mix(waterColor, uCrestColor, crestFactor * uBiolumIntensity);

      // Micro ripple sparkles
      float noisePattern = sin(vUv.x * 120.0 + uTime * 2.0) * sin(vUv.y * 120.0 - uTime * 1.8);
      float foamSparkle = step(0.85, noisePattern) * crestFactor * 0.4;
      vec3 finalColor = bioluminescentCrest + uFoamColor * foamSparkle;

      // Distance fog falloff into the abyss
      float dist = length(vWorldPosition.xz);
      float fogFactor = smoothstep(120.0, 240.0, dist);
      finalColor = mix(finalColor, uDeepColor, fogFactor);

      gl_FragColor = vec4(finalColor, 0.95);
    }
  `,
};

export default function BioluminescentOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#020409') },
      uSurfaceColor: { value: new THREE.Color('#071324') },
      uCrestColor: { value: new THREE.Color('#00f0ff') },
      uFoamColor: { value: new THREE.Color('#38bdf8') },
      uBiolumIntensity: { value: 0.9 },
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
      position={[0, -0.2, -90]}
      receiveShadow
    >
      <planeGeometry args={[380, 380, 160, 160]} />
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

