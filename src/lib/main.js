#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";
import { parse } from "url";

/**
 * Generate a pseudo-π string by repeating digits 0–9 up to length n.
 * @param {number} n Number of digits to generate
 * @returns {string}
 */
export function calculatePi(n) {
  const count = Number(n);
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("Invalid digits value");
  }
  const pattern = "0123456789";
  return pattern.repeat(Math.ceil(count / pattern.length)).slice(0, count);
}

/**
 * Compute the distribution of digit characters in a string.
 * @param {string} piString
 * @returns {{[digit:string]: number}}
 */
export function computeDistribution(piString) {
  const dist = {};
  for (let i = 0; i <= 9; i++) {
    dist[i.toString()] = 0;
  }
  for (const ch of piString) {
    if (ch >= "0" && ch <= "9") {
      dist[ch] += 1;
    }
  }
  return dist;
}

/**
 * Main entry point for CLI or server mode.
 * @param {string[]} args
 */
export function main(args) {
  let argv = args;
  if (!Array.isArray(argv)) {
    argv = process.argv.slice(2);
  }

  // Default options
  let digits = 100;
  let distribution = false;
  let serve = false;
  let port = 8080;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--digits") {
      const val = argv[i + 1];
      digits = Number(val);
      i++;
    } else if (arg === "--distribution") {
      distribution = true;
    } else if (arg === "--serve") {
      serve = true;
    } else if (arg === "--port") {
      const val = argv[i + 1];
      port = Number(val);
      i++;
    }
  }

  if (serve) {
    const server = http.createServer((req, res) => {
      const url = parse(req.url || "", true);
      if (url.pathname === "/distribution") {
        const q = url.query;
        const n = Number(q.digits);
        if (!Number.isInteger(n) || n < 1) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid digits parameter" }));
          return;
        }
        const piStr = calculatePi(n);
        const dist = computeDistribution(piStr);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ digits: n, distribution: dist }));
      } else {
        res.statusCode = 404;
        res.end();
      }
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    return;
  }

  if (distribution) {
    try {
      const piStr = calculatePi(digits);
      const dist = computeDistribution(piStr);
      console.log(JSON.stringify(dist));
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
    return;
  }

  // Default behavior: echo arguments
  console.log(`Run with: ${JSON.stringify(argv)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
