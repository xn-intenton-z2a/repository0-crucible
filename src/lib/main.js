#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath, URL } from "url";
import http from "http";
import { z } from "zod";

/**
 * Pools of ASCII faces by category.
 */
export const FACE_POOLS = {
  happy: [":)", ":-)", ":D", "(:", ":^)"] ,
  sad: [":(", ":-(", ":'(", "):", ":(("],
  angry: [">:(", ":-@", ">:O", "(@)", "x("],
  surprised: [":O", ":-O", ":0", "O_O", "o_O"]
};

/**
 * Seeded linear congruential generator for reproducible randomness.
 */
function seededRandom(seed) {
  const m = 0x80000000; // 2**31
  const a = 1103515245;
  const c = 12345;
  let state = seed % m;
  return function () {
    state = (a * state + c) % m;
    return state / m;
  };
}

// Zod schema for options validation
const OptionsSchema = z.object({
  count: z
    .number()
    .int({ message: "count must be a positive integer" })
    .positive({ message: "count must be a positive integer" }),
  seed: z.number().int({ message: "seed must be an integer" }),
  category: z.enum(["all", "happy", "sad", "angry", "surprised"]),
  unique: z.boolean().optional().default(false)
});

/**
 * Core generation function for ASCII faces.
 * Validates inputs, uses seeded randomness, applies category filtering and uniqueness.
 * @param {Object} options
 * @param {number} options.count - positive integer number of faces to generate
 * @param {number} options.seed - integer seed for RNG
 * @param {string} options.category - "all","happy","sad","angry","surprised"
 * @param {boolean} [options.unique=false] - whether to enforce unique faces
 * @returns {{id:number,face:string}[]}
 */
export function generateFacesCore(options) {
  const parsed = OptionsSchema.parse(options);
  const { count, seed, category, unique } = parsed;
  // Select appropriate pool
  const pool =
    category === "all"
      ? [...FACE_POOLS.happy, ...FACE_POOLS.sad, ...FACE_POOLS.angry, ...FACE_POOLS.surprised]
      : FACE_POOLS[category];
  if (unique && count > pool.length) {
    throw new RangeError(
      `unique constraint violated: requested ${count} but only ${pool.length} available`
    );
  }
  const rng = seededRandom(seed);
  const faces = [];
  const used = new Set();
  for (let i = 0; i < count; i++) {
    let idx;
    if (unique) {
      do {
        idx = Math.floor(rng() * pool.length);
      } while (used.has(idx));
      used.add(idx);
    } else {
      idx = Math.floor(rng() * pool.length);
    }
    faces.push({ id: i + 1, face: pool[idx] });
  }
  return faces;
}

/**
 * Print CLI usage information.
 */
export function printUsage() {
  console.log("Usage: node src/lib/main.js [options]");
  console.log("");
  console.log("Options:");
  console.log("  --help                Show help and exit");
  console.log("  --demo                Run the interactive demo");
  console.log("  --serve               Launch the HTTP server");
  console.log("  --port=<port>         Specify the port for HTTP server (default: 3000)");
  console.log("  --diagnostics         Show diagnostics");
  console.log("  --build-intermediate  Build intermediate stage");
  console.log("  --build-enhanced      Build enhanced stage");
  console.log("  --refresh             Refresh data");
  console.log("  --merge-persist       Merge and persist changes");
}

/**
 * Run the interactive demo showcasing core features.
 */
export function runDemo() {
  console.log("=== Interactive Demo ===");
  const seeded = generateFacesCore({ count: 3, category: "all", seed: 42 });
  console.log(JSON.stringify(seeded));
  const unique = generateFacesCore({ count: 3, category: "happy", seed: 7, unique: true });
  console.log(JSON.stringify(unique));
  console.log('To launch HTTP server: node src/lib/main.js --serve');
  console.log('curl "http://localhost:3000/faces?count=2&seed=7"');
  console.log('Response: {"faces":[{"id":1,"face":":)"}]}');
  process.exit(0);
}

/**
 * Main entry point.
 * @param {string[]} args CLI arguments
 */
export function main(args) {
  args = args || [];

  if (args.includes("--help")) {
    printUsage();
    process.exit(0);
  }
  if (args.includes("--serve")) {
    // existing server logic unchanged...
    let port = 3000;
    const portArg = args.find((a) => a.startsWith("--port="));
    if (portArg) {
      const parsed = parseInt(portArg.split("=")[1], 10);
      if (!isNaN(parsed)) {
        port = parsed;
      }
    }
    const server = http.createServer((req, res) => {
      try {
        const reqUrl = new URL(req.url || "", `http://${req.headers.host}`);
        if (req.method === "GET" && reqUrl.pathname === "/faces") {
          const params = reqUrl.searchParams;
          const countStr = params.get("count");
          if (!countStr) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing required parameter: count" }));
            return;
          }
          const count = parseInt(countStr, 10);
          if (isNaN(count)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid parameter: count must be an integer" }));
            return;
          }
          const seedStr = params.get("seed");
          if (!seedStr) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing required parameter: seed" }));
            return;
          }
          const seed = parseInt(seedStr, 10);
          if (isNaN(seed)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid parameter: seed must be an integer" }));
            return;
          }
          const category = params.get("category") || "all";
          const uniqueStr = params.get("unique");
          let unique = false;
          if (uniqueStr !== null) {
            if (uniqueStr === "true") {
              unique = true;
            } else if (uniqueStr === "false") {
              unique = false;
            } else {
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({ error: "Invalid parameter: unique must be true or false" })
              );
              return;
            }
          }
          const result = generateFacesCore({ count, seed, category, unique });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ faces: result }));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Not Found" }));
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });
    server.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    return server;
  } else if (args.includes("--demo")) {
    runDemo();
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
