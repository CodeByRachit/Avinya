'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OceanicBlueShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#051329') },     // Deep oceanic midnight navy
    uSurfaceColor: { value: new THREE.Color('#0a2b54') },  // Coastal sapphire blue
    uCrestColor: { value: new THREE.Color('#38bdf8') },    // Gentle azure wave crest
    uSunReflection: { value: new THREE.Color('#f97316') }, // Sunset coral sun streak
    uSpecularSun: { value: new THREE.Color('#fef08a') },   // Bright golden sun glitter
    uSunPosition: { value: new THREE.Vector3(30, 18, -90) },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    // Compounded natural ocean swell & capillary waves
    float getWave(vec2 p, float t) {
      float w = 0.0;
      w += sin(p.x * 0.045 + t * 0.8) * cos(p.y * 0.038 + t * 0.6) * 0.38;
      w += sin(p.x * 0.09 - t * 1.0) * sin(p.y * 0.075 + t * 0.8) * 0.18;
      w += sin((p.x + p.y) * 0.2 + t * 1.3) * 0.06;
      return w;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = getWave(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      // Surface normal approximation
      float delta = 0.14;
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
    uniform vec3 uSurfaceColor;
    uniform vec3 uCrestColor;
    uniform vec3 uSunReflection;
    uniform vec3 uSpecularSun;
    uniform vec3 uSunPosition;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    void main() {
      // 1. Natural Deep Ocean Blue Gradient (Firmly on the Blue Side)
      float depthMix = smoothstep(-0.4, 0.5, vElevation);
      vec3 water = mix(uDeepColor, uSurfaceColor, depthMix);

      // 2. Wave Crest Azure Highlights
      float crest = smoothstep(0.18, 0.45, vElevation);
      water = mix(water, uCrestColor, crest * 0.35);

      // 3. Realistic Sunset Sun Reflection Trail (Directional Glint)
      vec3 normal = normalize(vNormalVec);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 sunDir = normalize(uSunPosition - vWorldPosition);
      vec3 halfVec = normalize(sunDir + viewDir);

      // Specular golden glitter on wave facets
      float spec = pow(max(dot(normal, halfVec), 0.0), 32.0);
      water += uSpecularSun * spec * 0.85;

      // Soft sunset warm coral glaze only along the direct sun reflection lane
      float sunLane = smoothstep(0.65, 0.98, dot(reflect(-sunDir, normal), -viewDir));
      water = mix(water, uSunReflection, sunLane * 0.35);

      // 4. Subtle Grazing Fresnel (Soft sky reflection at extreme horizon)
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 4.5);
      vec3 horizonHaze = vec3(0.08, 0.22, 0.42); // Cool deep ocean twilight
      water = mix(water, horizonHaze, fresnel * 0.35);

      // 5. Distance fade into deep ocean indigo
      float dist = length(vWorldPosition.xz);
      float distFade = smoothstep(140.0, 320.0, dist);
      water = mix(water, uDeepColor, distFade * 0.5);

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
      uDeepColor: { value: new THREE.Color('#051329') },
      uSurfaceColor: { value: new THREE.Color('#0a2b54') },
      uCrestColor: { value: new THREE.Color('#38bdf8') },
      uSunReflection: { value: new THREE.Color('#ea580c') },
      uSpecularSun: { value: new THREE.Color('#fef08a') },
      uSunPosition: { value: new THREE.Vector3(30, 18, -90) },
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
        vertexShader={OceanicBlueShader.vertexShader}
        fragmentShader={OceanicBlueShader.fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
