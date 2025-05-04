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
});

/**
 * Parse command line arguments into options
 * @param {string[]} args
 */
export function parseOptions(args) {
  const result = { count: undefined, category: undefined, seed: undefined };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--count" || arg === "-c") {
      result.count = Number(args[++i]);
    } else if (arg === "--category" || arg === "-C") {
      result.category = args[++i];
    } else if (arg === "--seed" || arg === "-s") {
      result.seed = Number(args[++i]);
    } else if (arg === "--help" || arg === "-h") {
      result.help = true;
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
    console.log("Usage: node main.js [--count N] [--category CATEGORY] [--seed S]");
    console.log(`Categories: ${categories.join(", ")}`);
    return;
  }
  const { count, category, seed } = parseOptions(args);
  const rng = seed !== undefined ? seedrandom(String(seed)) : Math.random;
  let pool = [];
  if (category === "all") {
    pool = Object.values(faces).flat();
  } else {
    pool = faces[category];
  }
  for (let i = 0; i < count; i++) {
    console.log(getRandomFaceFromList(pool, rng));
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
