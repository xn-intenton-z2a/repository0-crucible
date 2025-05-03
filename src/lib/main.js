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
import pkg from '../../package.json' with { assert: { type: 'json' } };
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
      if (lastResult.type === "single")[...truncated...]