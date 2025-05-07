#!/usr/bin/env node
import { fileURLToPath } from "url";
import minimist from "minimist";
import fs from "fs";
import yaml from "js-yaml";

/**
 * Predefined list of ASCII art facial expressions for emotional feedback.
 */
export const asciiFaces = [
  "(^_^)",
  ">_<",
  "(^o^)",
  "(-_-)",
  "(o_O)",
  "(T_T)",
  "(^3^)",
  "(^_~)",
  "(*_*)",
  "(^.^)"
];

/**
 * Loads custom faces from a YAML or JSON configuration file.
 * @param {string} configPath - Path to the config file.
 * @returns {string[]} Array of face strings.
 */
export function loadFaces(configPath) {
  let content;
  try {
    content = fs.readFileSync(configPath, "utf-8");
  } catch (err) {
    throw new Error(`Failed to read config file: ${err.message}`);
  }
  let data;
  try {
    if (/\.(ya?ml)$/i.test(configPath)) {
      data = yaml.load(content);
    } else {
      data = JSON.parse(content);
    }
  } catch (err) {
    throw new Error(`Failed to parse config file: ${err.message}`);
  }
  if (!Array.isArray(data)) {
    throw new Error(`Invalid config format: expected an array of strings`);
  }
  if (data.length === 0) {
    throw new Error(`Invalid config: array is empty`);
  }
  for (const item of data) {
    if (typeof item !== "string" || item.trim() === "") {
      throw new Error(`Invalid config: all items must be non-empty strings`);
    }
  }
  return data;
}

/**
 * Selects and returns a random ASCII face from the provided faces array.
 * @param {string[]} [faces=asciiFaces] - Array of face strings.
 * @returns {string} Randomly selected face.
 */
export function getRandomFace(faces = asciiFaces) {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

/**
 * Main CLI entry point.
 * @param {string[]} args - Command-line arguments.
 */
export function main(args = process.argv.slice(2)) {
  const helpMessage =
    "Usage: node src/lib/main.js [--face] [--config <path>] [--help]\n" +
    "Options:\n" +
    "  --face           Display a random ASCII face\n" +
    "  --config <path>  Load additional faces from config file (YAML or JSON)\n" +
    "  --help           Show this help message";

  const flags = minimist(args, {
    boolean: ["face", "help"],
    string: ["config"],
    alias: { h: "help" }
  });

  const knownFlags = ["--face", "--config", "--help", "-h"];
  const unknownFlags = args.filter(
    (arg) => arg.startsWith("--") && !knownFlags.includes(arg)
  );
  if (unknownFlags.length) {
    console.log(helpMessage);
    return;
  }

  if (flags.help) {
    console.log(helpMessage);
    return;
  }

  if (!flags.face) {
    console.log(helpMessage);
    return;
  }

  let faces = asciiFaces;
  if (flags.config) {
    try {
      const customFaces = loadFaces(flags.config);
      faces = faces.concat(customFaces);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }

  console.log(getRandomFace(faces));
}

// Execute main if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
