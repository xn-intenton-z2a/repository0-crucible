#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import minimist from "minimist";

/**
 * Predefined list of ASCII art facial expressions for emotional feedback.
 */
export const asciiFaces = [
  "(^_^)" ,
  ">_<" ,
  "(^o^)" ,
  "(-_-)" ,
  "(o_O)" ,
  "(T_T)" ,
  "(^3^)" ,
  "(^_~)" ,
  "(*_*)" ,
  "(^.^)"
];

/**
 * Selects and returns a random ASCII face from the asciiFaces array.
 */
export function getRandomFace() {
  const index = Math.floor(Math.random() * asciiFaces.length);
  return asciiFaces[index];
}

/**
 * Main CLI entry point.
 * @param {string[]} args - Command-line arguments (flags).
 */
export function main(args = process.argv.slice(2)) {
  const helpMessage =
    "Usage: node src/lib/main.js [--ascii-face] [--help]\n" +
    "Options:\n" +
    "  --ascii-face    Display a random ASCII face\n" +
    "  --help          Show this help message";

  const flags = minimist(args, {
    boolean: ["ascii-face", "help"],
    alias: { h: "help" }
  });

  // Detect unknown flags
  const knownFlags = ["--ascii-face", "--help", "-h"];
  const unknownFlags = args.filter(
    (arg) => arg.startsWith("--") && !knownFlags.includes(arg)
  );
  if (unknownFlags.length) {
    console.log(helpMessage);
    return;
  }

  // Help flag
  if (flags.help) {
    console.log(helpMessage);
    return;
  }

  // Default or explicit ascii-face flag
  if (flags["ascii-face"] || args.length === 0) {
    console.log(getRandomFace());
    return;
  }

  // Fallback to help
  console.log(helpMessage);
}

// Execute main if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
