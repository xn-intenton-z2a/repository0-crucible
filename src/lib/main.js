#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

const EMOTICONS = [
  ":)",
  ":-(",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function main(args = []) {
  const usage = `ASCII Emoticon CLI

Usage:
  node src/lib/main.js [options]

Options:
  --list          List all available ASCII emoticons in order.
  --seed <n>      Provide a non-negative integer seed for deterministic selection.
  --json          Output results in JSON format.
  --help, -h      Show this help message.

Examples:
  node src/lib/main.js
  node src/lib/main.js --list
  node src/lib/main.js --seed 5
  node src/lib/main.js --help
`;

  if (args.includes('--help') || args.includes('-h')) {
    console.log(usage);
    process.exit(0);
    return;
  }

  // Handle --list option
  if (args.includes('--list')) {
    EMOTICONS.forEach((face, idx) => console.log(`${idx}: ${face}`));
    return;
  }

  let rng = Math.random;
  const seedIndex = args.indexOf('--seed');
  if (seedIndex !== -1) {
    const seedString = args[seedIndex + 1];
    if (!seedString || !/^\d+$/.test(seedString)) {
      throw new Error(`Invalid seed: ${seedString}`);
    }
    const seed = Number(seedString);
    rng = mulberry32(seed);
  }

  const idx = Math.floor(rng() * EMOTICONS.length);
  console.log(EMOTICONS[idx]);
}

// If run as CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}