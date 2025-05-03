#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";
import readline from "readline";

const EMOTICONS = [
  ":)",
  ":-(",
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

// Programmatic API utilities
export function listFaces() {
  return [...EMOTICONS];
}

export function randomFace() {
  const idx = Math.floor(Math.random() * EMOTICONS.length);
  return EMOTICONS[idx];
}

export function seededFace(seed) {
  const idx = seed % EMOTICONS.length;
  return EMOTICONS[idx];
}

export function emoticonJson({ mode, seed }) {
  if (mode === "random") {
    const face = randomFace();
    return { face, mode, seed: null };
  } else if (mode === "seeded") {
    const face = seededFace(seed);
    return { face, mode, seed };
  }
  throw new Error(`Invalid mode: ${mode}`);
}

export function main(args = []) {
  // Interactive REPL mode
  if (args.includes("--interactive") || args.includes("-i")) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
      historySize: 100,
      removeHistoryDuplicates: true
    });
    let lastResult = null;

    const printRandom = () => {
      const face = randomFace();
      console.log(face);
      lastResult = { type: "single", ...emoticonJson({ mode: "random", seed: null }) };
    };

    const printSeeded = (seedString) => {
      if (!/^[0-9]+$/.test(seedString)) {
        console.log(`Invalid seed: ${seedString}`);
        return;
      }
      const seed = Number(seedString);
      const face = seededFace(seed);
      console.log(face);
      lastResult = { type: "single", ...emoticonJson({ mode: "seeded", seed }) };
    };

    const printList = () => {
      listFaces().forEach((face, i) => console.log(`${i}: ${face}`));
      lastResult = { type: "list", list: listFaces() };
    };

    const printJson = () => {
      if (lastResult == null) {
        printRandom();
        return;
      }
      if (lastResult.type === "single") {
        console.log(JSON.stringify({
          face: lastResult.face,
          mode: lastResult.mode,
          seed: lastResult.seed
        }));
      } else if (lastResult.type === "list") {
        console.log(JSON.stringify(lastResult.list));
      }
    };

    const printHelp = () => {
      console.log(
        "Available commands:\n" +
        "  random        Show a random emoticon\n" +
        "  seed <n>      Show emoticon for seed n\n" +
        "  list          List all emoticons with indices\n" +
        "  json          Output last result as JSON\n" +
        "  help          Show this help message\n" +
        "  exit          Exit the REPL"
      );
    };

    rl.prompt();

    rl
      .on("line", (input) => {
        const [cmd, ...rest] = input.trim().split(/\s+/);
        if (!cmd || cmd === "random") {
          printRandom();
        } else if (cmd === "seed") {
          printSeeded(rest[0] || "");
        } else if (cmd === "list") {
          printList();
        } else if (cmd === "json") {
          printJson();
        } else if (cmd === "help") {
          printHelp();
        } else if (cmd === "exit") {
          rl.close();
          return;
        } else {
          console.log(`Unknown command: ${input.trim()}`);
        }
        rl.prompt();
      })
      .on("SIGINT", () => {
        rl.close();
      })
      .on("close", () => {
        process.exit(0);
      });

    return rl;
  }

  // HTTP server mode
  if (args.includes("--serve")) {
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
      const accept = req.headers.accept || "";

      function sendText(status, text) {
        res.writeHead(status, { "Content-Type": "text/plain" });
        res.end(text);
      }
      function sendJson(status, obj) {
        res.writeHead(status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(obj));
      }

      if (req.method !== "GET") {
        if (accept.includes("application/json")) {
          return sendJson(404, { error: "Not Found" });
        }
        return sendText(404, "Not Found");
      }

      if (pathname === "/") {
        return sendText(200, randomFace());
      }

      if (pathname === "/list") {
        return sendText(200, listFaces().join("\n"));
      }

      if (pathname === "/json") {
        if (params.has("list")) {
          return sendJson(200, listFaces());
        }
        let mode = "random";
        let seedVal = null;
        if (params.has("seed")) {
          const seedString = params.get("seed");
          if (!/^[0-9]+$/.test(seedString)) {
            if (accept.includes("application/json")) {
              return sendJson(400, { error: `Invalid seed: ${seedString}` });
            }
            return sendText(400, `Invalid seed: ${seedString}`);
          }
          seedVal = Number(seedString);
          mode = "seeded";
        }
        const obj = emoticonJson({ mode, seed: seedVal });
        return sendJson(200, obj);
      }

      if (pathname === "/json/list") {
        return sendJson(200, listFaces());
      }

      if (accept.includes("application/json")) {
        return sendJson(404, { error: "Not Found" });
      }
      return sendText(404, "Not Found");
    });

    server.listen(port);
    console.log(`Listening on port ${server.address().port}`);
    return server;
  }

  // CLI behaviors
  const usage = `ASCII Emoticon CLI

Usage:
  node src/lib/main.js [options]

Options:
  --list          List all available ASCII emoticons in order.
  --seed <n>      Provide a non-negative integer seed for deterministic selection.
  --json          Output results in JSON format.
  --help, -h      Show help message.

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
      console.log(JSON.stringify(listFaces()));
      return;
    }
    let mode = "random";
    let seedVal = null;
    if (args.includes("--seed")) {
      const seedIdx = args.indexOf("--seed");
      const seedString = args[seedIdx + 1];
      if (!seedString || !/^[0-9]+$/.test(seedString)) {
        console.error(JSON.stringify({ error: "Invalid seed. Seed must be a non-negative integer." }));
        process.exit(1);
        return;
      }
      seedVal = Number(seedString);
      mode = "seeded";
    }
    const result = emoticonJson({ mode, seed: seedVal });
    console.log(JSON.stringify(result));
    return;
  }

  if (args.includes("--list")) {
    listFaces().forEach((face, idx) => console.log(`${idx}: ${face}`));
    return;
  }

  if (args.includes("--seed")) {
    const seedIdx = args.indexOf("--seed");
    const seedString = args[seedIdx + 1];
    if (!seedString || !/^[0-9]+$/.test(seedString)) {
      throw new Error(`Invalid seed: ${seedString}`);
    }
    const seedVal = Number(seedString);
    console.log(seededFace(seedVal));
    return;
  }

  // Default: random plain text
  console.log(randomFace());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}