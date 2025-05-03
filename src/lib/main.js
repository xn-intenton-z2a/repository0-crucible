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
  "^_^",
  "(ꈍᴗꈍ)"
];

export function main(args = process.argv.slice(2)) {
  if (args.includes("--list")) {
    EMOTICONS.forEach((face) => console.log(face));
    return;
  }

  const seedIndex = args.indexOf("--seed");
  if (seedIndex !== -1) {
    const seedValue = args[seedIndex + 1];
    const seed = Number(seedValue);
    if (
      seedValue === undefined ||
      Number.isNaN(seed) ||
      !Number.isInteger(seed) ||
      seed < 0
    ) {
      console.error("Invalid seed. Seed must be a non-negative integer.");
      process.exit(1);
    }
    const idx = seed % EMOTICONS.length;
    console.log(EMOTICONS[idx]);
    return;
  }

  const idx = Math.floor(Math.random() * EMOTICONS.length);
  console.log(EMOTICONS[idx]);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
