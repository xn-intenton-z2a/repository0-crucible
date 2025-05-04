#!/usr/bin/env node
// src/lib/main.js

import express from "express";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import seedrandom from "seedrandom";
import { z } from "zod";
import yaml from "js-yaml";

// Default face categories
export const faces = {
  happy: ["😀", "😄", "😊", "(＾▽＾)", "(＾ω＾)"],
  sad: ["😢", "😞", "☹️", "(Ｔ＿Ｔ)", "(；д；)"],
  angry: ["😠", "😡", "👿", "(-_-#)", "(╬ಠ益ಠ)"],
  surprised: ["😮", "😲", "😯", "(ﾟOﾟ)", "(⊙_⊙)"],
};

// Allowed categories including all
const categories = [...Object.keys(faces), "all"];

// Schema for options including programmatic API and config
export const OptionsSchema = z.object({
  count: z.coerce.number().int().min(1).default(1),
  category: z.enum(categories).default("all"),
  seed: z.coerce.number().int().nonnegative().optional(),
  json: z.boolean().default(false),
  serve: z.boolean().default(false),
  port: z.coerce.number().int().min(1).default(3000),
  config: z.string().optional(),
});

/**
 * Load and validate a custom face configuration file (YAML or JSON)
 * @param {string} configPath
 * @returns {Record<string,string[]>}
 */
export function loadCustomConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config file not found: ${configPath}`);
  }
  const content = fs.readFileSync(configPath, "utf8");
  let parsed;
  if (configPath.endsWith(".yaml") || configPath.endsWith(".yml")) {
    parsed = yaml.load(content);
  } else {
    parsed = JSON.parse(content);
  }
  const configSchema = z.record(z.array(z.string()));
  const custom = configSchema.parse(parsed);
  return custom;
}

/**
 * Parse command line arguments into options
 * @param {string[]} args
 */
export function parseOptions(args) {
  const result = {
    count: undefined,
    category: undefined,
    seed: undefined,
    json: undefined,
    serve: undefined,
    port: undefined,
    config: undefined,
  };
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
    } else if (arg === "--serve" || arg === "-S") {
      result.serve = true;
    } else if (arg === "--port" || arg === "-p") {
      result.port = Number(args[++i]);
    } else if (arg === "--config" || arg === "-f") {
      result.config = args[++i];
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
 * Create and configure the Express app
 */
export function createApp() {
  const app = express();

  app.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

  app.get("/faces", (req, res) => {
    // parse query parameters
    let count = parseInt(req.query.count, 10);
    if (isNaN(count) || count < 1) count = 1;

    let category = req.query.category;
    if (!categories.includes(category)) category = "all";

    let seedVal = null;
    let rng = Math.random;
    if (req.query.seed !== undefined) {
      const s = parseInt(req.query.seed, 10);
      if (!isNaN(s) && s >= 0) {
        seedVal = s;
        rng = seedrandom(String(s));
      }
    }

    // merge custom config if provided
    let mergedFaces = { ...faces };
    if (req.query.config) {
      const custom = loadCustomConfig(req.query.config);
      for (const key in custom) {
        if (!mergedFaces.hasOwnProperty(key)) {
          res.status(400).json({ error: `Unknown category in config: ${key}` });
          return;
        }
        mergedFaces[key] = custom[key];
      }
    }

    // build pool
    let pool = [];
    if (category === "all") {
      pool = Object.values(mergedFaces).flat();
    } else {
      pool = mergedFaces[category];
    }

    // format selection
    const facesArray = [];
    for (let i = 0; i < count; i++) {
      facesArray.push(getRandomFaceFromList(pool, rng));
    }

    const format = req.query.format === "text" ? "text" : "json";

    if (format === "text") {
      res.set("Content-Type", "text/plain");
      res.send(facesArray.join("\n"));
    } else {
      res.json({ faces: facesArray, category, count, seed: seedVal });
    }
  });

  return app;
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
    console.log("  --serve, -S     start HTTP server mode");
    console.log("  --port, -p      port for HTTP server (default: 3000)");
    console.log("  --config, -f    path to JSON or YAML face configuration file");
    console.log("  --help, -h      show this help message");
    console.log("");
    console.log(`Categories: ${categories.join(", ")}`);
    return;
  }

  const { count, category, seed, json, serve, port, config } = parseOptions(args);

  if (serve) {
    const app = createApp();
    app.listen(port, () => {
      console.log(`Serving ASCII faces on http://localhost:${port}/faces`);
    });
    return;
  }

  // merge custom config if provided
  let mergedFaces = { ...faces };
  if (config) {
    const custom = loadCustomConfig(config);
    for (const key in custom) {
      if (!mergedFaces.hasOwnProperty(key)) {
        throw new Error(`Unknown category in config: ${key}`);
      }
      mergedFaces[key] = custom[key];
    }
  }

  const rng = seed !== undefined ? seedrandom(String(seed)) : Math.random;

  let pool = [];
  if (category === "all") {
    pool = Object.values(mergedFaces).flat();
  } else {
    pool = mergedFaces[category];
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

// Programmatic API
/**
 * Get random faces programmatically
 * @param {{count?: number, category?: string, seed?: number, config?: string}} options
 * @returns {{faces: string[], category: string, count: number, seed: number|null}}
 */
export function getFaces(options = {}) {
  const parsed = OptionsSchema.parse({
    count: options.count,
    category: options.category,
    seed: options.seed,
    config: options.config,
  });
  const { count, category, seed: seedInput, config } = parsed;
  const seedVal = seedInput !== undefined ? seedInput : null;
  const rng = seedInput !== undefined ? seedrandom(String(seedInput)) : Math.random;

  // merge custom config if provided
  let mergedFaces = { ...faces };
  if (config) {
    const custom = loadCustomConfig(config);
    for (const key in custom) {
      if (!mergedFaces.hasOwnProperty(key)) {
        throw new Error(`Unknown category in config: ${key}`);
      }
      mergedFaces[key] = custom[key];
    }
  }

  const pool = category === "all" ? Object.values(mergedFaces).flat() : mergedFaces[category];
  const facesArray = [];
  for (let i = 0; i < count; i++) {
    facesArray.push(getRandomFaceFromList(pool, rng));
  }
  return { faces: facesArray, category, count, seed: seedVal };
}

/**
 * List available categories
 * @returns {string[]}
 */
export function listCategories() {
  return [...categories];
}

/**
 * Generate random faces programmatically
 * @param {{count?: number, category?: string, seed?: number, config?: string}} options
 * @returns {{faces: string[], category: string, count: number, seed: number|null}}
 */
export function generateFaces(options = {}) {
  return getFaces(options);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
