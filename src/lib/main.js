#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

export const asciiFaces = [
  "( ͡° ͜ʖ ͡°)",
  "( ಠ ͜ʖ ಠ)",
  "( ͡~ ͜ʖ ͡°)",
  "( ͡◉ ͜ʖ ͡◉)",
  "( ͠° ͟ʖ ͡°)",
  "(ᵔ ͜ʖᵔ)",
  "(¬ ͜ʖ¬)",
  "(▀ ͜ʖ▀)",
  "( ͡⚆ ͜ʖ ͡⚆)",
  "( ͡ಥ ͜ʖ ͡ಥ)"
];

function createSeededRandom(seedVal) {
  let state = seedVal % 2147483647;
  if (state <= 0) state += 2147483646;
  return {
    next: () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    }
  };
}

function shuffleArray(array, randomFn) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function main(args) {
  if (!Array.isArray(args)) {
    args = [];
  }
  const faceIndex = args.indexOf("--face");
  if (faceIndex === -1) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }
  // parse count and seed
  let count = 1;
  let seed;
  let i = faceIndex + 1;
  while (i < args.length) {
    const arg = args[i];
    if (arg === "--seed") {
      const next = args[i + 1];
      const num = Number(next);
      if (!isNaN(num)) {
        seed = num;
        i += 2;
        continue;
      }
    } else if (!isNaN(Number(arg))) {
      count = Number(arg);
      i++;
      continue;
    }
    i++;
  }
  if (count > asciiFaces.length) {
    count = asciiFaces.length;
  }
  // choose random faces
  let randomFn = Math.random;
  if (seed !== undefined) {
    const gen = createSeededRandom(seed);
    randomFn = () => gen.next();
  }
  const selection = shuffleArray(asciiFaces, randomFn).slice(0, count);
  for (const face of selection) {
    console.log(face);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
