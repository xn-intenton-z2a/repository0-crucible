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

const defaultCategories = Object.keys(faces);

// Schema for options including programmatic API and config
export const OptionsSchema = z.object({
  count: z.coerce.number().int().min(1).default(1),
  category: z.string().default("all"),
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
  const opts = OptionsSchema.parse(result);
  // Validate category against default categories when no config
  if (!opts.config && opts.category !== "all" && !defaultCategories.includes(opts.category)) {
    throw new Error(`Invalid category: ${opts.category}`);
  }
  return opts;
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
 * Internal core function to generate faces
 * @param {{ count?: number, category?: string, seed?: number, config?: string }} opts
 * @returns {{ faces: string[], category: string, count: number, seed: number|null }}
 */
export function generateFacesCore(opts = {}) {
  const parsed = OptionsSchema.pick({
    count: true,
    category: true,
    seed: true,
    config: true,
  }).parse(opts);
  const { count, category, seed, config } = parsed;

  // Merge default faces with custom config if provided
  let mergedFaces = { ...faces };
  if (config) {
    const custom = loadCustomConfig(config);
    // Allow overrides and new categories
    mergedFaces = { ...mergedFaces, ...custom };
  }

  // Validate category against merged categories
  const validCategories = [...Object.keys(mergedFaces), "all"];
  if (!validCategories.includes(category)) {
    throw new Error(`Unknown category: ${category}`);
  }

  // Instantiate RNG
  const seedVal = seed !== undefined ? seed : null;
  const rng = seed !== undefined ? seedrandom(String(seed)) : Math.random;

  // Build face pool
  const pool =
    category === "all" ? Object.values(mergedFaces).flat() : mergedFaces[category];

  // Generate faces
  const facesArray = [];
  for (let i = 0; i < count; i++) {
    facesArray.push(getRandomFaceFromList(pool, rng));
  }

  return { faces: facesArray, category, count, seed: seedVal };
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
    // Parse and sanitize inputs
    let count;
    const c = parseInt(req.query.count, 10);
    count = !isNaN(c) && c >= 1 ? c : undefined;

    const category = req.query.category;

    let seed;
    if (req.query.seed !== undefined) {
      const s = parseInt(req.query.seed, 10);
      seed = !isNaN(s) && s >= 0 ? s : undefined;
    }

    const config = req.query.config;

    // Generate faces using core
    let result;
    try {
      result = generateFacesCore({ count, category, seed, config });
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    // Determine format
    const format = req.query.format === "text" ? "text" : "json";

    if (format === "text") {
      res.set("Content-Type", "text/plain");
      res.send(result.faces.join("\n"));
    } else {
      res.json(result);
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
    console.log(`Categories: ${defaultCategories.join(", ")} ,all`);
    return;
  }

  const { count, category, seed, json, serve, port, config } = parseOptions(
    args
  );

  if (serve) {
    const app = createApp();
    app.listen(port, () => {
      console.log(`Serving ASCII faces on http://localhost:${port}/faces`);
    });
    return;
  }

  // Generate faces using core
  const result = generateFacesCore({ count, category, seed, config });

  if (json) {
    console.log(
      JSON.stringify({
        faces: result.faces,
        category: result.category,
        count: result.count,
        seed: result.seed,
      })
    );
    return;
  }

  result.faces.forEach((face) => console.log(face));
}

// Programmatic API
export function getFaces(options = {}) {
  return generateFacesCore(options);
}

export function listCategories() {
  return [...defaultCategories, "all"];
}

export function generateFaces(options = {}) {
  return getFaces(options);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}