import * as THREE from 'three';

export interface IslandWaypoint {
  day: 1 | 2 | 3;
  t: number;
  id: string;
  title: string;
  codename: string;
  date: string;
  theme: string;
  accentColor: string;
  position: [number, number, number];
  highlights: string[];
}

export const VOYAGE_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 20),      // 0.00: Departure Harbor
  new THREE.Vector3(-10, 0, -5),     // 0.10: Approaching Outpost Reaches
  new THREE.Vector3(-26, 0, -38),    // 0.22: Day 1 - THE LAST OUTPOST
  new THREE.Vector3(-15, 0, -66),    // 0.38: Sandstorm Strait Transition
  new THREE.Vector3(8, 0, -82),      // 0.48: Entering Cyber Grid Waters
  new THREE.Vector3(28, 0, -102),    // 0.58: Day 2 - THE PANDEMONIUM
  new THREE.Vector3(12, 0, -132),    // 0.72: Neon Trench Transition
  new THREE.Vector3(-10, 0, -155),   // 0.80: Carnival Bay Approach
  new THREE.Vector3(-24, 0, -178),   // 0.88: Day 3 - THE CARNIVAL ISLAND
  new THREE.Vector3(0, 0, -210),     // 1.00: Grand Horizon Finale
];

export const VOYAGE_CURVE = new THREE.CatmullRomCurve3(VOYAGE_POINTS, false, 'catmullrom', 0.2);

export const ISLAND_WAYPOINTS: IslandWaypoint[] = [
  {
    day: 1,
    t: 0.22,
    id: 'last-outpost',
    title: 'Day 01 // Dune Desert',
    codename: 'THE LAST OUTPOST',
    date: 'March 12, 2027',
    theme: 'Arrakis Sands & Monolithic Citadel',
    accentColor: '#FFB300',
    position: [-26, 0, -38],
    highlights: ['Code Royale 3v3', 'AI Arcade RAG Hunt', 'Treasure Hunt', 'Opening Pro Night'],
  },
  {
    day: 2,
    t: 0.58,
    id: 'pandemonium',
    title: 'Day 02 // Cyberpunk Synthwave',
    codename: 'THE PANDEMONIUM',
    date: 'March 13, 2027',
    theme: 'Neon Megacity & Neural Matrix',
    accentColor: '#00F0FF',
    position: [28, 0, -102],
    highlights: ['Yukti 2.0 Quantum Hack', 'Build with Gemma', 'Battle of Bands', 'Mega Rush Esports'],
  },
  {
    day: 3,
    t: 0.88,
    id: 'carnival-island',
    title: 'Day 03 // Bioluminescent Carnival',
    codename: 'THE CARNIVAL ISLAND',
    date: 'March 14, 2027',
    theme: 'Ferris Wheel Revelry & Pro DJ Night',
    accentColor: '#FF007F',
    position: [-24, 0, -178],
    highlights: ['Kernel Panic Linux Fest', 'Fashion Show Runway', 'Grand DJ Night', 'Awards Finale'],
  },
];
