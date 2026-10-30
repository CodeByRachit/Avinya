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
  image: string;
  position: [number, number, number];
  highlights: string[];
}

export const VOYAGE_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 22),       // 0.00: Departure Estuary
  new THREE.Vector3(-8, 0, -5),       // 0.10: Approaching Outpost Reaches
  new THREE.Vector3(-24, 0, -38),     // 0.22: Day 1 - THE LAST OUTPOST
  new THREE.Vector3(-14, 0, -66),     // 0.38: Desert Canyon Pass
  new THREE.Vector3(8, 0, -84),       // 0.48: Approaching Sunset Delta
  new THREE.Vector3(26, 0, -104),     // 0.58: Day 2 - THE PANDEMONIUM
  new THREE.Vector3(12, 0, -134),     // 0.72: River Delta Channel
  new THREE.Vector3(-8, 0, -156),     // 0.80: Entering Festival Lagoon
  new THREE.Vector3(-22, 0, -178),    // 0.88: Day 3 - THE CARNIVAL ISLAND
  new THREE.Vector3(0, 0, -210),      // 1.00: Open Horizon
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
    theme: 'Desert Canyons & Citadel Fortress',
    accentColor: '#E08A3C',
    image: '/images/themes/day1-last-outpost.jpg',
    position: [-24, 0, -38],
    highlights: ['Code Royale 3v3', 'AI Arcade RAG Hunt', 'Treasure Hunt', 'Opening Pro Night'],
  },
  {
    day: 2,
    t: 0.58,
    id: 'pandemonium',
    title: 'Day 02 // Sunset Delta',
    codename: 'THE PANDEMONIUM',
    date: 'March 13, 2027',
    theme: 'Crimson Sunset & Aqueduct Cascades',
    accentColor: '#E11D48',
    image: '/images/themes/day2-pandemonium.jpg',
    position: [26, 0, -104],
    highlights: ['Yukti 2.0 Quantum Hack', 'Build with Gemma', 'Battle of Bands', 'Mega Rush Esports'],
  },
  {
    day: 3,
    t: 0.88,
    id: 'carnival-island',
    title: 'Day 03 // Carnival Night',
    codename: 'THE CARNIVAL ISLAND',
    date: 'March 14, 2027',
    theme: 'Luminous Pier, Ferris Wheel & Castles',
    accentColor: '#F59E0B',
    image: '/images/themes/day3-carnival-island.jpg',
    position: [-22, 0, -178],
    highlights: ['Kernel Panic Linux Fest', 'Fashion Show Runway', 'Grand DJ Night', 'Awards Finale'],
  },
];
