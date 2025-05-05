#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath, URL } from "url";
import http from "http";

/**
 * Stub core generation function for demo purposes.
 */
export function generateFacesCore(options) {
  // Return options as dummy payload for demo
  return options;
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
    // Parse port from --port=<port> or default to 3000
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
          // count
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
          // seed
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
          // category
          const category = params.get("category") || "all";
          // unique
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
                JSON.stringify({
                  error: "Invalid parameter: unique must be true or false",
                })
              );
              return;
            }
          }
          const result = generateFacesCore({ count, seed, category, unique });
          const payload = { faces: result };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(payload));
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