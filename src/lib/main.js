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
  const hasList = args.includes("--list");
  const nameIndex = args.findIndex(arg => arg === "--name" || arg === "-n");

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
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
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
