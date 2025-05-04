#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import seedrandom from "seedrandom";
import { z } from "zod";

const faces = {
  happy: ["😀", "😄", "😊", "(＾▽＾)", "(＾ω＾)"],
  sad: ["😢", "😞", "☹️", "(Ｔ＿Ｔ)", "(；д；)"],
  angry: ["😠", "😡", "👿", "(-_-#)", "(╬ಠ益ಠ)"],
  surprised: ["😮", "😲", "😯", "(ﾟOﾟ)", "(⊙_⊙)"],
};

const categories = [...Object.keys(faces), "all"];

const OptionsSchema = z.object({
  count: z.coerce.number().int().min(1).default(1),
  category: z.enum(categories).default("all"),
  seed: z.coerce.number().int().nonnegative().optional(),
  json: z.boolean().default(false),
});

/**
 * Parse command line arguments into options
 * @param {string[]} args
 */
export function parseOptions(args) {
  const result = { count: undefined, category: undefined, seed: undefined, json: undefined };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--count" || arg === "-c") {
      result.count = Number(args[++i]);
    } else if (arg === "--category" || arg === "-C") {
      result.category = args[++i];
    } else if (arg === "--seed" || arg === "-s") {
      result.seed = Number(args[++i]);
    } else if (arg === "--json" || arg === "-j") {
      result.json = true;
    }
  }
  return OptionsSchema.parse(result);
}

/**
 * Select a random element from a list using provided rng
 * @param {Array} list
 * @param {Function} rng
 */
export function getRandomFaceFromList(list, rng = Math.random) {
  const idx = Math.floor(rng() * list.length);
  return list[idx];
}

/**
 * Main entry point
 * @param {string[]} args
 */
export function main(args) {
  if (!Array.isArray(args)) {
    args = process.argv.slice(2);
  }
  if (args.includes("--help") || args.includes("-h")) {
    console.log("Usage: node src/lib/main.js [options]");
    console.log("");
    console.log("Options:");
    console.log("  --count, -c     number of faces to display (default: 1)");
    console.log(
      "  --category, -C  emotion category (happy, sad, angry, surprised, all) (default: all)"
    );
    console.log(
      "  --seed, -s      nonnegative integer seed for reproducible output"
    );
    console.log("  --json, -j      output JSON payload");
    console.log("  --help, -h      show this help message");
    console.log("");
    console.log(`Categories: ${categories.join(", ")}`);
    return;
  }
  const { count, category, seed, json } = parseOptions(args);
  const rng = seed !== undefined ? seedrandom(String(seed)) : Math.random;
  let pool = [];

  if (category === "all") {
    pool = Object.values(faces).flat();
  } else {
    pool = faces[category];
  }

  if (json) {
    const facesArray = [];
    for (let i = 0; i < count; i++) {
      facesArray.push(getRandomFaceFromList(pool, rng));
    }
    const payload = { faces: facesArray, category, count, seed: seed !== undefined ? seed : null };
    console.log(JSON.stringify(payload));
    return;
  }

  for (let i = 0; i < count; i++) {
    console.log(getRandomFaceFromList(pool, rng));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
