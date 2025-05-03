#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import http from "http";
import readline from "readline";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import chalk from "chalk";
import express from "express";
import pkg from '../../package.json' assert { type: 'json' };
export const version = pkg.version;

// Built-in emoticon list
const BUILTIN_EMOTICONS = [
  ":)",
  ":-([",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];

// Dynamic emoticon list and config tracking
let EMOTICONS = [...BUILTIN_EMOTICONS];
let isCustomConfig = false;
let configSource = 'builtin';

// Load a custom emoticon file
function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    console.error("Invalid config: File not found");
    process.exit(1);
  }
  let data;
  try {
    const content = fs.readFileSync(configPath, "utf8");
    if (configPath.endsWith(".json")) {
      data = JSON.parse(content);
    } else {
      data = yaml.load(content);
    }
  } catch (err) {
    console.error("Invalid config: Failed to parse file");
    process.exit(1);
  }
  if (!Array.isArray(data) || !data.every(item => typeof item === "string")) {
    console.error("Invalid config: Expected an array of strings");
    process.exit(1);
  }
  EMOTICONS = data;
  isCustomConfig = true;
  configSource = configPath;
}

// Check for custom config via CLI or env var
function maybeLoadCustomConfig(args) {
  // Reset to built-in each run
  EMOTICONS = [...BUILTIN_EMOTICONS];
  isCustomConfig = false;
  configSource = 'builtin';
  const configIdx = args.indexOf("--config");
  const envConfig = process.env.EMOTICONS_CONFIG;
  let configPath;
  if (configIdx !== -1) {
    configPath = args[configIdx + 1];
  } else if (envConfig) {
    configPath = envConfig;
  }
  if (configPath) {
    const resolved = path.resolve(process.cwd(), configPath);
    loadConfig(resolved);
  }
}

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

// Express middleware
export function createEmoticonRouter(options = {}) {
  const router = express.Router();
  const counters = {
    emoticon_requests_total: 0,
    emoticon_requests_root_total: 0,
    emoticon_requests_list_total: 0,
    emoticon_requests_json_total: 0,
    emoticon_requests_seeded_total: 0,
    emoticon_requests_errors_total: 0,
  };

  function sendText(res, status, text) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(status).type('text/plain').send(text);
  }

  function sendJson(res, status, obj) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(status).json(obj);
  }

  // Metrics endpoint
  router.get('/metrics', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).type('text/plain; version=0.0.4');
    let body = '';
    for (const [name, value] of Object.entries(counters)) {
      body += `# HELP ${name} ${name} counter\n`;
      body += `# TYPE ${name} counter\n`;
      body += `${name} ${value}\n`;
    }
    res.send(body);
  });

  // Version endpoint
  router.get('/version', (req, res) => {
    sendJson(res, 200, { version });
  });

  // Health endpoint
  router.get('/health', (req, res) => {
    sendText(res, 200, 'OK');
  });

  // Root: random emoticon
  router.get('/', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_root_total++;
    sendText(res, 200, randomFace());
  });

  // List all emoticons
  router.get('/list', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_list_total++;
    const list = listFaces();
    sendText(res, 200, list.join('\n'));
  });

  // JSON single, list, or count
  router.get('/json', (req, res) => {
    const params = req.query;
    const accept = req.headers.accept || '';

    // Count support
    if (params.count !== undefined) {
      const countStr = params.count;
      if (!/^[0-9]+$/.test(countStr)) {
        counters.emoticon_requests_errors_total++;
        if (accept.includes('application/json')) {
          return sendJson(res, 400, { error: `Invalid count: ${countStr}` });
        }
        return sendText(res, 400, `Invalid count: ${countStr}`);
      }
      const count = Number(countStr);
      let seedVal = null;
      if (params.seed !== undefined) {
        const seedStr = params.seed;
        if (!/^[0-9]+$/.test(seedStr)) {
          counters.emoticon_requests_errors_total++;
          if (accept.includes('application/json')) {
            return sendJson(res, 400, { error: `Invalid seed: ${seedStr}` });
          }
          return sendText(res, 400, `Invalid seed: ${seedStr}`);
        }
        seedVal = Number(seedStr);
      }
      counters.emoticon_requests_total++;
      counters.emoticon_requests_json_total++;
      if (seedVal !== null) counters.emoticon_requests_seeded_total++;
      const results = [];
      for (let i = 0; i < count; i++) {
        if (seedVal !== null) {
          results.push(seededFace(seedVal + i));
        } else {
          results.push(randomFace());
        }
      }
      return sendJson(res, 200, results);
    }

    // JSON list alias
    if (params.list !== undefined) {
      counters.emoticon_requests_total++;
      counters.emoticon_requests_json_total++;
      return sendJson(res, 200, listFaces());
    }

    let mode = 'random';
    let seedVal = null;
    if (params.seed !== undefined) {
      const seedStr = params.seed;
      if (!/^[0-9]+$/.test(seedStr)) {
        counters.emoticon_requests_errors_total++;
        if (accept.includes('application/json')) {
          return sendJson(res, 400, { error: `Invalid seed: ${seedStr}` });
        }
        return sendText(res, 400, `Invalid seed: ${seedStr}`);
      }
      seedVal = Number(seedStr);
      mode = 'seeded';
    }
    counters.emoticon_requests_total++;
    counters.emoticon_requests_json_total++;
    if (mode === 'seeded') counters.emoticon_requests_seeded_total++;
    const obj = emoticonJson({ mode, seed: seedVal });
    return sendJson(res, 200, obj);
  });

  // JSON list alias via path
  router.get('/json/list', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_json_total++;
    return sendJson(res, 200, listFaces());
  });

  // Unknown path or non-GET
  router.use((req, res) => {
    counters.emoticon_requests_errors_total++;
    const accept = req.headers.accept || '';
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (accept.includes('application/json')) {
      res.status(404).json({ error: 'Not Found' });
    } else {
      res.status(404).type('text/plain').send('Not Found');
    }
  });

  return router;
}

export function main(args = []) {
  // Load custom emoticons if requested
  maybeLoadCustomConfig(args);

  // Diagnostics mode
  const hasDiagFlag = args.includes("--diagnostics");
  const hasDiagEnv = !!process.env.EMOTICONS_DIAGNOSTICS;
  if (hasDiagFlag || hasDiagEnv) {
    const diagnostics = {
      version,
      configSource,
      emoticonCount: EMOTICONS.length,
      isCustomConfig,
      colorStyle: null,
      // Ensure this is always a number for test expectations
      supportsColorLevel: chalk.supportsColor?.level ?? 0
    };
    console.log(JSON.stringify(diagnostics));
    process.exit(0);
    return;
  }

  // Version flag handling
  if (args.includes("--version") || args.includes("-v")) {
    console.log(version);
    process.exit(0);
    return;
  }

  // Interactive REPL mode
  if (args.includes("--interactive") || args.includes("-i")) {
    // existing REPL code unchanged
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
    // Load custom emoticons if requested
    maybeLoadCustomConfig(args);
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
    const app = express();
    const router = createEmoticonRouter();
    app.use(router);
    const server = app.listen(port);
    console.log(`Listening on port ${server.address().port}`);
    return server;
  }

  // CLI behaviors
  const usage = `ASCII Emoticon CLI

Usage:
  node src/lib/main.js [options]

Options:
  --config <path>    Load custom emoticon list from JSON or YAML file (overrides default).
  --diagnostics      Output application diagnostics as JSON and exit.
  --list               List all available ASCII emoticons in order.
  --seed <n>           Provide a non-negative integer seed for deterministic selection.
  --json               Output results in JSON format.
  --interactive, -i    Start interactive REPL session.
  --help, -h           Show help message.
  --version, -v        Show application version and exit.
  --serve              Start HTTP server mode.
  --port <n>           Specify HTTP server port (default: 3000).
  --count <n>          Output multiple emoticons per invocation (plain or JSON modes).

Examples:
  node src/lib/main.js
  node src/lib/main.js --config custom.json
  node src/lib/main.js --diagnostics
  node src/lib/main.js --list
  node src/lib/main.js --seed 5
  node src/lib/main.js --json
  node src/lib/main.js --interactive
  node src/lib/main.js -i
  node src/lib/main.js --help
  node src/lib/main.js --version
  node src/lib/main.js -v
`;

  if (args.includes("--help") || args.includes("-h")) {
    console.log(usage);
    process.exit(0);
    return;
  }

  const isJson = args.includes("--json");

  // Count option handling
  const countIdx = args.indexOf("--count");
  if (countIdx !== -1) {
    const countStr = args[countIdx + 1];
    if (!countStr || !/^[0-9]+$/.test(countStr)) {
      console.error(`Invalid count: ${countStr}`);
      process.exit(1);
      return;
    }
    const count = Number(countStr);
    let seedBase = null;
    if (args.includes("--seed")) {
      const seedIdx = args.indexOf("--seed");
      const seedStr = args[seedIdx + 1];
      if (!seedStr || !/^[0-9]+$/.test(seedStr)) {
        console.error(`Invalid seed: ${seedStr}`);
        process.exit(1);
        return;
      }
      seedBase = Number(seedStr);
    }
    const results = [];
    for (let i = 0; i < count; i++) {
      if (seedBase !== null) {
        results.push(seededFace(seedBase + i));
      } else {
        results.push(randomFace());
      }
    }
    if (isJson) {
      console.log(JSON.stringify(results));
    } else {
      results.forEach(face => console.log(face));
    }
    process.exit(0);
    return;
  }

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
