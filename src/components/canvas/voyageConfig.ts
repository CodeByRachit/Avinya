'use client';

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

// Expansive, natural S-curve spline: Departure -> LEFT (Day 1) -> RIGHT (Day 2) -> LEFT (Day 3)
export const VOYAGE_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 32),        // 0.00: Departure Estuary (Hero Frame - open blue water)
  new THREE.Vector3(-6, 0, 8),        // 0.10: Beginning smooth glide forward
  new THREE.Vector3(-22, 0, -32),     // 0.20: Banking LEFT towards Day 1
  new THREE.Vector3(-30, 0, -56),     // 0.30: DAY 1 ARRIVAL (The Last Outpost on the Left)
  new THREE.Vector3(-14, 0, -92),     // 0.42: Turning out of Desert Canyons
  new THREE.Vector3(12, 0, -118),     // 0.52: Crossing open sunset sea to the RIGHT
  new THREE.Vector3(34, 0, -142),     // 0.62: DAY 2 ARRIVAL (The Pandemonium on the Right)
  new THREE.Vector3(18, 0, -180),     // 0.74: Leaving Cyber River Delta
  new THREE.Vector3(-6, 0, -206),     // 0.82: Crossing lagoon back to the LEFT
  new THREE.Vector3(-26, 0, -228),    // 0.90: DAY 3 ARRIVAL (The Carnival Island on the Left)
  new THREE.Vector3(-10, 0, -260),    // 1.00: Open Festival Bay
];

export const VOYAGE_CURVE = new THREE.CatmullRomCurve3(VOYAGE_POINTS, false, 'catmullrom', 0.25);

export const ISLAND_WAYPOINTS: IslandWaypoint[] = [
  {
    day: 1,
    t: 0.30,
    id: 'last-outpost',
    title: 'Day 01 // Dune Desert',
    codename: 'THE LAST OUTPOST',
    date: 'March 12, 2027',
    theme: 'Desert Canyons & Citadel Fortress',
    accentColor: '#E08A3C',
    image: '/images/themes/day1-last-outpost.jpg',
    position: [-34, 0, -58],
    highlights: ['Code Royale 3v3', 'AI Arcade RAG Hunt', 'Treasure Hunt', 'Opening Pro Night'],
  },
  {
    day: 2,
    t: 0.62,
    id: 'pandemonium',
    title: 'Day 02 // Sunset Delta',
    codename: 'THE PANDEMONIUM',
    date: 'March 13, 2027',
    theme: 'Crimson Sunset & Aqueduct Cascades',
    accentColor: '#E11D48',
    image: '/images/themes/day2-pandemonium.jpg',
    position: [40, 0, -144],
    highlights: ['Yukti 2.0 Quantum Hack', 'Build with Gemma', 'Battle of Bands', 'Mega Rush Esports'],
  },
  {
    day: 3,
    t: 0.90,
    id: 'carnival-island',
    title: 'Day 03 // Carnival Night',
    codename: 'THE CARNIVAL ISLAND',
    date: 'March 14, 2027',
    theme: 'Luminous Pier, Ferris Wheel & Castles',
    accentColor: '#F59E0B',
    image: '/images/themes/day3-carnival-island.jpg',
    position: [-30, 0, -228],
    highlights: ['Kernel Panic Linux Fest', 'Fashion Show Runway', 'Grand DJ Night', 'Awards Finale'],
  },
];
