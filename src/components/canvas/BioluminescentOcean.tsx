'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const OceanicBlueShader = {
  uniforms: {
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color('#071833') },     // Deep oceanic navy
    uSurfaceColor: { value: new THREE.Color('#103b70') },  // Coastal sapphire blue
    uCrestColor: { value: new THREE.Color('#38bdf8') },    // Azure wave crest
    uSunReflection: { value: new THREE.Color('#f59e0b') }, // Warm golden evening sun reflection
    uSpecularSun: { value: new THREE.Color('#fef08a') },   // Bright sun glint
    uSunPosition: { value: new THREE.Vector3(40, 52, -450) },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vNormalVec;
    varying vec3 vWorldPosition;

    // Natural layered ocean wave calculation
    float getWave(vec2 p, float t) {
      float w = 0.0;
      // Primary swell
      w += sin(p.x * 0.045 + t * 0.7) * cos(p.y * 0.038 + t * 0.55) * 0.42;
      // Secondary cross swell
      w += sin(p.x * 0.08 - t * 0.9) * sin(p.y * 0.07 + t * 0.75) * 0.22;
      // Capillary ripples
      w += sin((p.x * 0.6 + p.y * 0.8) * 0.18 + t * 1.2) * 0.08;
      return w;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = getWave(pos.xy, uTime);
      pos.z += elevation;
      vElevation = elevation;

      // Analytical normal estimation from height field
      float delta = 0.12;
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
      // 1. Natural Deep Ocean Blue Gradient (Rich Sapphire & Twilight Navy)
      float depthMix = smoothstep(-0.45, 0.45, vElevation);
      vec3 water = mix(uDeepColor, uSurfaceColor, depthMix);

      // 2. Wave Crest Azure Highlights
      float crest = smoothstep(0.22, 0.48, vElevation);
      water = mix(water, uCrestColor, crest * 0.38);

      // 3. Directional Sun Glint & Specular Reflection Path
      vec3 normal = normalize(vNormalVec);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 sunDir = normalize(uSunPosition - vWorldPosition);
      vec3 halfVec = normalize(sunDir + viewDir);

      // Specular golden glitter on wave facets
      float NdotH = max(dot(normal, halfVec), 0.0);
      float spec = pow(NdotH, 36.0);
      water += uSpecularSun * spec * 0.95;

      // Warm golden reflection trail across the water toward the setting sun
      vec3 reflectDir = reflect(-sunDir, normal);
      float sunTrail = smoothstep(0.72, 0.99, max(dot(reflectDir, -viewDir), 0.0));
      water = mix(water, uSunReflection, sunTrail * 0.42);

      // 4. Subtle Sky Fresnel at Grazing Angles (Reflecting Twilight Indigo Sky)
      float NdotV = max(dot(viewDir, normal), 0.0);
      float fresnel = pow(1.0 - NdotV, 4.0);
      vec3 skyReflection = vec3(0.09, 0.22, 0.42); // Deep twilight indigo
      water = mix(water, skyReflection, fresnel * 0.4);

      // 5. Atmospheric Horizon Distance Fade
      float dist = length(vWorldPosition.xz - cameraPosition.xz);
      float distFade = smoothstep(160.0, 360.0, dist);
      water = mix(water, uDeepColor, distFade * 0.55);

      gl_FragColor = vec4(water, 0.97);
    }
  `,
};

export default function BioluminescentOcean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeepColor: { value: new THREE.Color('#071833') },
      uSurfaceColor: { value: new THREE.Color('#103b70') },
      uCrestColor: { value: new THREE.Color('#38bdf8') },
      uSunReflection: { value: new THREE.Color('#f59e0b') },
      uSpecularSun: { value: new THREE.Color('#fef08a') },
      uSunPosition: { value: new THREE.Vector3(40, 52, -450) },
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
      position={[0, -0.15, -110]}
      receiveShadow
    >
      <planeGeometry args={[520, 520, 160, 160]} />
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
