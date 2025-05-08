#!/usr/bin/env node
import { fileURLToPath } from "url";

export const faces = [
  "(^_^)",
  "(>_<)",
  "(o_o)",
  "(¬_¬)",
  "(^.^)",
  "(-_-)",
  "(T_T)",
  "(^3^)",
];

function printUsage(scriptName) {
  console.error(
    `Usage: node ${scriptName} [--list] [--count <n>] [--seed <num>] [--help]`
  );
}

function createLcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function main(args) {
  let count = 1;
  let seedFunc = Math.random;
  let list = false;

  const scriptName = fileURLToPath(import.meta.url).split("/").pop();

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--help") {
      printUsage(scriptName);
      return 0;
    } else if (arg === "--list") {
      list = true;
    } else if (arg === "--count") {
      const val = Number(args[++i]);
      if (!Number.isInteger(val) || val < 0) {
        printUsage(scriptName);
        return 1;
      }
      count = val;
    } else if (arg === "--seed") {
      const val = Number(args[++i]);
      if (!Number.isInteger(val)) {
        printUsage(scriptName);
        return 1;
      }
      seedFunc = createLcg(val);
    } else {
      printUsage(scriptName);
      return 1;
    }
  }

  if (list) {
    faces.forEach((f) => console.log(f));
  } else {
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(seedFunc() * faces.length);
      console.log(faces[idx]);
    }
  }

  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const code = main(args);
  process.exit(code);
}
