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

// =========================================================================
// WIDE-CHANNEL S-CURVE VOYAGE ROUTE
// The boat stays in a generous, navigable sea channel while the 3 themed
// islands stand proudly across the water (30–36 units away) for breathtaking,
// wide-angle cinematic framing without clipping.
// =========================================================================
export const VOYAGE_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 36),        // 0.00: Departure Estuary (Hero Frame - open water)
  new THREE.Vector3(-4, 0, 10),       // 0.10: Beginning smooth glide forward
  new THREE.Vector3(-10, 0, -22),     // 0.20: Banking towards Day 1 Channel
  new THREE.Vector3(-14, 0, -60),     // 0.30: DAY 1 PASSAGE (Island 1 is at X = -44 on the LEFT)
  new THREE.Vector3(-6, 0, -100),     // 0.44: Exiting Desert Bay, turning toward center
  new THREE.Vector3(6, 0, -126),      // 0.54: Crossing open twilight sea toward the RIGHT
  new THREE.Vector3(14, 0, -156),     // 0.62: DAY 2 PASSAGE (Island 2 is at X = +48 on the RIGHT)
  new THREE.Vector3(6, 0, -192),      // 0.74: Leaving Cyber Delta, banking back toward the LEFT
  new THREE.Vector3(-6, 0, -218),     // 0.82: Entering Carnival Sound
  new THREE.Vector3(-14, 0, -248),    // 0.90: DAY 3 PASSAGE (Island 3 is at X = -46 on the LEFT)
  new THREE.Vector3(-4, 0, -280),     // 1.00: Open Festival Bay
];

export const VOYAGE_CURVE = new THREE.CatmullRomCurve3(VOYAGE_POINTS, false, 'catmullrom', 0.28);

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
    position: [-44, 0, -60],
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
    position: [48, 0, -156],
    highlights: ['FPGA Quantum Delta', 'Gemma Autonomous Agent Hack', 'Battle of Bands', 'EDM Revelry'],
  },
  {
    day: 3,
    t: 0.90,
    id: 'carnival-island',
    title: 'Day 03 // Festival Pier',
    codename: 'THE CARNIVAL ISLAND',
    date: 'March 14, 2027',
    theme: 'Luminous Pier & Ferris Wheel',
    accentColor: '#F59E0B',
    image: '/images/themes/day3-carnival-island.jpg',
    position: [-46, 0, -248],
    highlights: ['Linux Kernel Grand Prix', 'Runway Couture', 'Hack2Future Finale', 'Star DJ Night'],
  },
];
