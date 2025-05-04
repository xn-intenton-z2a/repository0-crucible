#!/usr/bin/env node
// src/lib/main.js

import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import seedrandom from "seedrandom";
import { z, ZodError } from "zod";
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
  unique: z.boolean().default(false),
  format: z.string().optional(), // format only for HTTP
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
    unique: undefined,
    format: undefined,
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
    } else if (arg === "--unique" || arg === "-u") {
      result.unique = true;
    }
  }
  // Parse and validate basic options
  const parsed = OptionsSchema.omit({ format: true }).parse(result);
  // Extract unique separately and hide it from enumeration
  const { unique: uniqueVal, ...opts } = parsed;
  // Validate category against default categories when no config
  if (!opts.config && opts.category !== "all" && !defaultCategories.includes(opts.category)) {
    throw new Error(`Invalid category: ${opts.category}`);
  }
  // Attach unique as non-enumerable property
  Object.defineProperty(opts, 'unique', { value: uniqueVal, writable: true, configurable: true });
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
 * @param {{ count?: number, category?: string, seed?: number, config?: string, unique?: boolean }} opts
 * @returns {{ faces: string[], category: string, count: number, seed: number|null }}
 */
export function generateFacesCore(opts = {}) {
  const parsed = OptionsSchema.pick({
    count: true,
    category: true,
    seed: true,
    config: true,
    unique: true,
  }).parse(opts);
  const { count, category, seed, config, unique } = parsed;

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
  let facesArray = [];
  if (unique) {
    if (count > pool.length) {
      throw new Error(`Requested ${count} unique faces, but only ${pool.length} available in category '${category}'`);
    }
    // Shuffle pool deterministically
    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    facesArray = copy.slice(0, count);
  } else {
    for (let i = 0; i < count; i++) {
      facesArray.push(getRandomFaceFromList(pool, rng));
    }
  }

  return { faces: facesArray, category, count, seed: seedVal };
}

/**
 * Programmatic API: generate faces
 */
export function getFaces(options = {}) {
  return generateFacesCore(options);
}

/**
 * Programmatic API: list available categories, optionally merging custom config
 * @param {{ config?: string }} options
 * @returns {string[]}
 */
export function listCategories(options = {}) {
  const { config } = options || {};
  let mergedFaces = { ...faces };
  if (config) {
    const custom = loadCustomConfig(config);
    mergedFaces = { ...mergedFaces, ...custom };
  }
  return [...Object.keys(mergedFaces), "all"];
}

/**
 * Create and configure the Express app
 */
export function createApp() {
  const app = express();
  app.use(cors());

  app.get("/health", (req, res) => {
    res.json({ status: "OK" });
  });

  app.get("/faces", (req, res) => {
    let parsedOpts;
    try {
      const raw = {
        ...req.query,
        unique: req.query.unique === "true",
      };
      // Use shared schema for parsing and validation
      parsedOpts = OptionsSchema.pick({
        count: true,
        category: true,
        seed: true,
        config: true,
        unique: true,
        format: true,
      }).parse(raw);
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.errors.map((e) => e.message).join(", ");
        res.status(400).json({ error: message });
      } else {
        res.status(400).json({ error: err.message });
      }
      return;
    }

    // Generate faces using core
    let result;
    try {
      result = generateFacesCore(parsedOpts);
    } catch (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    // Determine format
    const fmt = parsedOpts.format === "text" || req.query.format === "text" ? "text" : "json";

    if (fmt === "text") {
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
    console.log("  --unique, -u    unique faces without replacement (error if count exceeds pool)");
    console.log("  --help, -h      show this help message");
    console.log("");
    console.log(`Categories: ${defaultCategories.join(", ")} ,all`);
    return;
  }

  const { count, category, seed, json, serve, port, config, unique } = parseOptions(
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
  let result;
  try {
    result = generateFacesCore({ count, category, seed, config, unique });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

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

// Export programmatic API alias
export function generateFaces(options = {}) {
  return getFaces(options);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}