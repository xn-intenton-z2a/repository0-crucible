#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import seedrandom from "seedrandom";

export const ASCII_FACES = [
  `(ಠ_ಠ)`,
  `(╯°□°）╯`,
  `(¬_¬)`,
  `(^_^)/`,
];

export const FACE_MAP = {
  frown: ASCII_FACES[0],
  surprised: ASCII_FACES[1],
  wink: ASCII_FACES[2],
  smile: ASCII_FACES[3],
};

export function main(args = process.argv.slice(2)) {
  let mode = "face";
  let seedValue = null;

  if (args.length === 0 || args[0] === "--face") {
    mode = "face";
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
  } else if (args[0] === "--list-faces") {
    mode = "list";
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
  } else if (args[0] === "--list-names" || args[0] === "-l") {
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
    return Object.keys(FACE_MAP).sort();
  } else if (args[0] === "--seed" || args[0] === "-s") {
    if (args.length < 2) {
      throw new Error(`Error: seed value must be a number.`);
    }
    const raw = args[1];
    if (raw !== "") {
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        throw new Error(`Error: seed value must be a number.`);
      }
      seedValue = raw;
    }
    if (args.length > 2) {
      throw new Error(`Error: unknown flag '${args[2]}'`);
    }
    mode = "face";
  } else if (args[0] === "--name" || args[0] === "-n") {
    if (args.length < 2) {
      throw new Error(`Error: '${args[0]}' requires a face name.`);
    }
    const name = args[1].toLowerCase();
    if (!(name in FACE_MAP)) {
      throw new Error(`Error: '${args[1]}' is not a valid face name.`);
    }
    if (args.length > 2) {
      throw new Error(`Error: unknown flag '${args[2]}'`);
    }
    return FACE_MAP[name];
  } else {
    throw new Error(`Error: unknown flag '${args[0]}'`);
  }

  let rng = Math.random;
  if (seedValue !== null) {
    rng = seedrandom(seedValue);
  }

  if (mode === "face") {
    const idx = Math.floor(rng() * ASCII_FACES.length);
    return ASCII_FACES[idx];
  } else if (mode === "list") {
    return ASCII_FACES.map((face, i) => `${i}: ${face}`);
  }
}

// CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const result = main();
    if (Array.isArray(result)) {
      result.forEach((line) => console.log(line));
    } else {
      console.log(result);
    }
    process.exitCode = 0;
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}
