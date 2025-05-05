#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export const FACES = {
  frown: "(╥_╥)",
  smile: "(◕‿◕)",
  surprised: "ಠ_ಠ",
  wink: "(;^_^)",
};

export function main(args = process.argv.slice(2)) {
  const hasList = args.includes("--list") || args.includes("--list-faces");
  const nameIndex = args.findIndex(arg => arg === "--name" || arg === "-n");
  const seedIndex = args.findIndex(arg => arg === "--seed" || arg === "-s");

  // Setup RNG, seeded or default
  let rng = Math.random;
  if (seedIndex !== -1) {
    const seedValue = args[seedIndex + 1];
    const seed = Number(seedValue);
    if (!seedValue || Number.isNaN(seed)) {
      throw new Error(`Error: '${seedValue}' is not a valid seed value.`);
    }
    // Simple deterministic RNG (Mulberry32)
    function mulberry32(a) {
      let t = a;
      return function() {
        t += 0x6D2B79F5;
        let r = t;
        r = Math.imul(r ^ (r >>> 15), r | 1);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    }
    rng = mulberry32(seed);
  }

  if (hasList) {
    const names = Object.keys(FACES).sort();
    return names;
  } else if (nameIndex !== -1) {
    const faceName = args[nameIndex + 1];
    if (!faceName || !(faceName in FACES)) {
      throw new Error(`Error: '${faceName}' is not a valid face name.`);
    }
    return FACES[faceName];
  } else {
    const keys = Object.keys(FACES);
    const randomKey = keys[Math.floor(rng() * keys.length)];
    return FACES[randomKey];
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const result = main();
    if (Array.isArray(result)) {
      result.forEach(line => console.log(line));
    } else {
      console.log(result);
    }
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}
