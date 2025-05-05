#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import seedrandom from "seedrandom";
import { createServer as createNativeServer } from "http";

export const ASCII_FACES = [
  `(ಠ_ಠ)`,
  `(╯°□°）╯`,
  `(¬_¬)`,
  `(^_^)/`,
];

export const FACE_MAP = {
  frown: ASCII_FACES[0],
  surprised: ASCII_FACES[1],
  wink: ASCII_FACES[2],
  smile: ASCII_FACES[3],
};

export function main(args = process.argv.slice(2)) {
  // Diagnostics mode
  if (args[0] === "--diagnostics" || args[0] === "-d") {
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, "../..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const lines = [];
    lines.push("Diagnostics:");
    lines.push(`Node.js version: ${process.version}`);
    lines.push(`Application version: ${pkg.version}`);
    lines.push(`Face count: ${ASCII_FACES.length}`);
    lines.push(`Face names: ${Object.keys(FACE_MAP).sort().join(", ")}`);
    lines.push("Dependencies:");
    const deps = pkg.dependencies || {};
    Object.keys(deps)
      .sort()
      .forEach((name) => {
        lines.push(`- ${name}@${deps[name]}`);
      });
    return lines;
  }

  // Help mode
  if (args[0] === "--help" || args[0] === "-h") {
    return [
      "Usage: repository0-crucible [options]",
      "",
      "Options:",
      "--face                 Print a single random ASCII face (default behavior)",
      "--list-faces           List all available ASCII faces with indices",
      "--list, --list-names, -l       List all available face identifiers sorted alphabetically",
      "--seed <value>, -s <value>     Select a face deterministically using the provided numeric seed",
      "--name <face>, -n <face>       Print the specified ASCII face by its name (case-insensitive)",
      "--diagnostics, -d      Show diagnostics information and exit",
      "--help, -h            Show this help message and exit",
    ];
  }

  let mode = "face";
  let seedValue = null;

  if (args.length === 0 || args[0] === "--face") {
    mode = "face";
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
  } else if (args[0] === "--list-faces") {
    mode = "list";
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
  } else if (
    args[0] === "--list" ||
    args[0] === "--list-names" ||
    args[0] === "-l"
  ) {
    if (args.length > 1) {
      throw new Error(`Error: unknown flag '${args[1]}'`);
    }
    return Object.keys(FACE_MAP).sort();
  } else if (args[0] === "--seed" || args[0] === "-s") {
    if (args.length < 2) {
      throw new Error(`Error: seed value must be a number.`);
    }
    const raw = args[1];
    if (raw !== "") {
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        throw new Error(`Error: seed value must be a number.`);
      }
      seedValue = raw;
    }
    if (args.length > 2) {
      throw new Error(`Error: unknown flag '${args[2]}'`);
    }
    mode = "face";
  } else if (args[0] === "--name" || args[0] === "-n") {
    if (args.length < 2) {
      throw new Error(`Error: '${args[0]}' requires a face name.`);
    }
    const name = args[1].toLowerCase();
    if (!(name in FACE_MAP)) {
      throw new Error(`Error: '${args[1]}' is not a valid face name.`);
    }
    if (args.length > 2) {
      throw new Error(`Error: unknown flag '${args[2]}'`);
    }
    return FACE_MAP[name];
  } else {
    throw new Error(`Error: unknown flag '${args[0]}'`);
  }

  let rng = Math.random;
  if (seedValue !== null) {
    rng = seedrandom(seedValue);
  }

  if (mode === "face") {
    const idx = Math.floor(rng() * ASCII_FACES.length);
    return ASCII_FACES[idx];
  } else if (mode === "list") {
    return ASCII_FACES.map((face, i) => `${i}: ${face}`);
  }
}

/**
 * Create an HTTP server exposing ASCII face endpoints
 */
export function createHttpServer() {
  const handler = (req, res) => {
    const { method, url, headers } = req;
    const parsedUrl = new URL(url, `http://${headers.host}`);
    const pathname = parsedUrl.pathname;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pkgPath = join(__dirname, "../..", "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const deps = pkg.dependencies || {};

    if (method === "GET" && pathname === "/face") {
      const face = ASCII_FACES[Math.floor(Math.random() * ASCII_FACES.length)];
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(face);
    } else if (method === "GET" && pathname === "/faces") {
      const arr = ASCII_FACES.map((face, i) => `${i}: ${face}`);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(arr));
    } else if (method === "GET" && pathname === "/names") {
      const names = Object.keys(FACE_MAP).sort();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(names));
    } else if (method === "GET" && pathname.startsWith("/seed/")) {
      const value = decodeURIComponent(pathname.slice(6));
      const num = Number(value);
      if (!Number.isFinite(num)) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid seed value" }));
      } else {
        const rng = seedrandom(value);
        const face = ASCII_FACES[Math.floor(rng() * ASCII_FACES.length)];
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(face);
      }
    } else if (method === "GET" && pathname.startsWith("/name/")) {
      const name = decodeURIComponent(pathname.slice(6)).toLowerCase();
      if (name in FACE_MAP) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end(FACE_MAP[name]);
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Face not found" }));
      }
    } else if (method === "GET" && pathname === "/diagnostics") {
      const diagnostics = {
        nodeVersion: process.version,
        appVersion: pkg.version,
        faceCount: ASCII_FACES.length,
        faceNames: Object.keys(FACE_MAP).sort(),
        dependencies: deps,
      };
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(diagnostics));
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  };
  return createNativeServer(handler);
}

// CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args[0] === "--serve" || args[0] === "-S") {
    let port = 3000;
    if (args[1] === "--port" || args[1] === "-p") {
      if (args.length < 3 || isNaN(Number(args[2]))) {
        console.error("Error: --port requires a number");
        process.exitCode = 1;
        return;
      }
      port = Number(args[2]);
      if (args.length > 3) {
        console.error(`Error: unknown flag '${args[3]}'`);
        process.exitCode = 1;
        return;
      }
    } else if (args.length > 1) {
      console.error(`Error: unknown flag '${args[1]}'`);
      process.exitCode = 1;
      return;
    }
    const server = createHttpServer();
    server.listen(port, () => {
      console.log(`Serving HTTP API on port ${port}`);
    });
    process.on("SIGINT", () => {
      server.close(() => process.exit(0));
    });
  } else {
    try {
      const result = main(process.argv.slice(2));
      if (Array.isArray(result)) {
        result.forEach((line) => console.log(line));
      } else {
        console.log(result);
      }
      process.exitCode = 0;
    } catch (err) {
      console.error(err.message);
      process.exitCode = 1;
    }
  }
}