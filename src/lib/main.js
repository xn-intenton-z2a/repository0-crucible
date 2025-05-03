#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";

const EMOTICONS = [
  ":)",
  ":- (".replace(" ",""), // fix spacing in code example
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];

function mulberry32(a) {
  return function() {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function main(args = []) {
  // HTTP server mode
  if (args.includes("--serve")) {
    // Default port 3000
    const portIdx = args.indexOf("--port");
    let port = 3000;
    if (portIdx !== -1) {
      const portStr = args[portIdx + 1];
      const p = Number(portStr);
      if (!portStr || isNaN(p) || p < 0) {
        console.error(`Invalid port: ${portStr}`);
        process.exit(1);
      }
      port = p;
    }
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const pathname = url.pathname;
      const params = url.searchParams;
      const accept = req.headers.accept || '';

      function sendText(status, text) {
        res.writeHead(status, { 'Content-Type': 'text/plain' });
        res.end(text);
      }
      function sendJson(status, obj) {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj));
      }

      if (req.method !== 'GET') {
        if (accept.includes('application/json')) {
          return sendJson(404, { error: 'Not Found' });
        }
        return sendText(404, 'Not Found');
      }

      // Root: random emoticon
      if (pathname === '/') {
        const idx = Math.floor(Math.random() * EMOTICONS.length);
        return sendText(200, EMOTICONS[idx]);
      }

      // Plain text list
      if (pathname === '/list') {
        return sendText(200, EMOTICONS.join('\n'));
      }

      // JSON endpoints
      if (pathname === '/json') {
        // list array
        if (params.has('list')) {
          return sendJson(200, EMOTICONS);
        }
        let mode = 'random';
        let seedVal = null;
        let idx;
        if (params.has('seed')) {
          const seedString = params.get('seed');
          if (!/^[0-9]+$/.test(seedString)) {
            if (accept.includes('application/json')) {
              return sendJson(400, { error: `Invalid seed: ${seedString}` });
            }
            return sendText(400, `Invalid seed: ${seedString}`);
          }
          const s = Number(seedString);
          mode = 'seeded';
          seedVal = s;
          idx = s % EMOTICONS.length;
        } else {
          idx = Math.floor(Math.random() * EMOTICONS.length);
        }
        return sendJson(200, { face: EMOTICONS[idx], mode, seed: seedVal });
      }

      // JSON list at /json/list
      if (pathname === '/json/list') {
        return sendJson(200, EMOTICONS);
      }

      // Not found
      if (accept.includes('application/json')) {
        return sendJson(404, { error: 'Not Found' });
      }
      return sendText(404, 'Not Found');
    });

    server.listen(port);
    console.log(`Listening on port ${server.address().port}`);
    return server;
  }

  // Original CLI behavior
  const usage = `ASCII Emoticon CLI

Usage:
  node src/lib/main.js [options]

Options:
  --list          List all available ASCII emoticons in order.
  --seed <n>      Provide a non-negative integer seed for deterministic selection.
  --json          Output results in JSON format.
  --help, -h      Show this help message.

Examples:
  node src/lib/main.js
  node src/lib/main.js --list
  node src/lib/main.js --seed 5
  node src/lib/main.js --json
  node src/lib/main.js --help
`;

  if (args.includes("--help") || args.includes("-h")) {
    console.log(usage);
    process.exit(0);
    return;
  }

  const isJson = args.includes("--json");

  if (isJson) {
    if (args.includes("--list")) {
      console.log(JSON.stringify(EMOTICONS));
      return;
    }

    let mode = "random";
    let seedVal = null;
    let idx;
    const seedIndex = args.indexOf("--seed");

    if (seedIndex !== -1) {
      const seedString = args[seedIndex + 1];
      if (!seedString || !/^[0-9]+$/.test(seedString)) {
        console.error(JSON.stringify({ error: "Invalid seed. Seed must be a non-negative integer." }));
        process.exit(1);
        return;
      }
      const seed = Number(seedString);
      mode = "seeded";
      seedVal = seed;
      idx = seed % EMOTICONS.length;
    } else {
      idx = Math.floor(Math.random() * EMOTICONS.length);
    }

    const result = { face: EMOTICONS[idx], mode, seed: seedVal };
    console.log(JSON.stringify(result));
    return;
  }

  if (args.includes("--list")) {
    EMOTICONS.forEach((face, idx) => console.log(`${idx}: ${face}`));
    return;
  }

  let rng = Math.random;
  const seedIndex = args.indexOf("--seed");
  if (seedIndex !== -1) {
    const seedString = args[seedIndex + 1];
    if (!seedString || !/^[0-9]+$/.test(seedString)) {
      throw new Error(`Invalid seed: ${seedString}`);
    }
    const seed = Number(seedString);
    rng = mulberry32(seed);
  }

  const idxNoJson = Math.floor(rng() * EMOTICONS.length);
  console.log(EMOTICONS[idxNoJson]);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}