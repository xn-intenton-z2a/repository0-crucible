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
  "^_^
"];
let emoticons = [...BUILTIN_EMOTICONS];

// Load custom configuration from JSON or YAML
function loadCustomConfig(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('Invalid config: File not found');
    process.exit(1);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(content);
  } catch (_err) {
    try {
      data = yaml.load(content);
    } catch (_e) {
      console.error('Invalid config: Expected an array of strings');
      process.exit(1);
      return;
    }
  }
  if (!Array.isArray(data) || !data.every(item => typeof item === 'string')) {
    console.error('Invalid config: Expected an array of strings');
    process.exit(1);
    return;
  }
  emoticons = data;
}

// Core API functions
export function listFaces() {
  return [...emoticons];
}

export function randomFace() {
  const idx = Math.floor(Math.random() * emoticons.length);
  return emoticons[idx];
}

export function seededFace(seed) {
  const idx = seed % emoticons.length;
  return emoticons[idx];
}

export function emoticonJson({ mode, seed }) {
  return {
    face: mode === 'random' ? randomFace() : seededFace(seed),
    mode,
    seed: mode === 'random' ? null : seed
  };
}

// Create Express router for HTTP API
export function createEmoticonRouter() {
  const router = express.Router();
  const counters = {
    emoticon_requests_total: 0,
    emoticon_requests_root_total: 0,
    emoticon_requests_list_total: 0,
    emoticon_requests_json_total: 0,
    emoticon_requests_seeded_total: 0,
    emoticon_requests_errors_total: 0
  };
  // CORS header for all requests
  router.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });
  // Metrics endpoint
  router.get('/metrics', (req, res) => {
    res.type('text/plain');
    let txt = '';
    txt += '# HELP emoticon_requests_total emoticon_requests_total counter\n';
    txt += '# TYPE emoticon_requests_total counter\n';
    txt += `emoticon_requests_total ${counters.emoticon_requests_total}\n`;
    res.send(txt);
  });
  // Health endpoint
  router.get('/health', (req, res) => {
    res.type('text/plain').send('OK');
  });
  // Version endpoint
  router.get('/version', (req, res) => {
    counters.emoticon_requests_total++;
    res.json({ version });
  });
  // Root - random emoticon
  router.get('/', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_root_total++;
    res.type('text/plain').send(randomFace());
  });
  // List - plain list
  router.get('/list', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_list_total++;
    res.type('text/plain').send(listFaces().join('\n'));
  });
  // JSON routes
  router.get('/json/list', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_json_total++;
    res.json(listFaces());
  });
  router.get('/json', (req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_json_total++;
    const { seed, count, list } = req.query;
    // List all faces
    if (list !== undefined) {
      return res.json(listFaces());
    }
    // Parse seed if provided
    let seedVal;
    if (seed !== undefined) {
      seedVal = parseInt(seed, 10);
      if (isNaN(seedVal)) {
        counters.emoticon_requests_errors_total++;
        const msg = `Invalid seed: ${seed}`;
        res.status(400);
        // Use explicit check for Accept header
        if (req.headers.accept && req.accepts('json')) {
          return res.json({ error: msg });
        }
        return res.type('text/plain').send(msg);
      }
      counters.emoticon_requests_seeded_total++;
    }
    // Parse count if provided
    if (count !== undefined) {
      const cnt = parseInt(count, 10);
      if (isNaN(cnt) || cnt < 0) {
        counters.emoticon_requests_errors_total++;
        const msg = `Invalid count: ${count}`;
        res.status(400);
        if (req.headers.accept && req.accepts('json')) {
          return res.json({ error: msg });
        }
        return res.type('text/plain').send(msg);
      }
      // Build array
      const arr = [];
      for (let i = 0; i < cnt; i++) {
        if (seedVal !== undefined) {
          arr.push(seededFace(seedVal + i));
        } else {
          arr.push(randomFace());
        }
      }
      return res.json(arr);
    }
    // Single JSON response
    const mode = seedVal !== undefined ? 'seeded' : 'random';
    const obj = emoticonJson({ mode, seed: seedVal });
    return res.json(obj);
  });
  // 404 for other routes or methods
  router.use((req, res) => {
    counters.emoticon_requests_total++;
    counters.emoticon_requests_errors_total++;
    res.status(404);
    if (req.headers.accept && req.accepts('json')) {
      return res.json({ error: 'Not Found' });
    }
    return res.type('text/plain').send('Not Found');
  });
  return router;
}

// CLI entry point
export function main(args) {
  const options = {
    config: null,
    diagnostics: false,
    list: false,
    seed: null,
    json: false,
    countFlag: false,
    count: 1,
    interactive: false,
    help: false,
    versionFlag: false,
    serve: false,
    port: 3000
  };
  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--config':
        options.config = args[++i];
        break;
      case '--diagnostics':
        options.diagnostics = true;
        break;
      case '--list':
        options.list = true;
        break;
      case '--seed':
        options.seed = args[++i];
        break;
      case '--json':
        options.json = true;
        break;
      case '--count':
        options.countFlag = true;
        options.count = args[++i] !== undefined ? args[i] : undefined;
        break;
      case '--interactive':
      case '-i':
        options.interactive = true;
        break;
      case '--help':
      case '-h':
        options.help = true;
        break;
      case '--version':
      case '-v':
        options.versionFlag = true;
        break;
      case '--serve':
        options.serve = true;
        break;
      case '--port':
        options.port = args[++i];
        break;
      default:
        break;
    }
  }
  // Load configuration
  if (options.config) {
    loadCustomConfig(options.config);
  } else if (process.env.EMOTICONS_CONFIG) {
    loadCustomConfig(process.env.EMOTICONS_CONFIG);
  }
  // Help
  const helpMessage = `Usage: node src/lib/main.js [options]

Options:
  --config <path>      Load custom emoticon list from a JSON or YAML file
  --diagnostics        Output application diagnostics as JSON and exit
  --list               List all available emoticons with indices
  --seed <n>           Use a non-negative integer seed for deterministic emoticon
  --json               Output results in JSON format
  --count <n>          Output multiple emoticons
  --interactive, -i    Launch interactive REPL mode
  --help, -h           Display help message and exit
  --version, -v        Print application version and exit
  --serve              Start built-in HTTP server mode
  --port <n>           Specify HTTP server port (default: 3000)

Examples:
  node src/lib/main.js --config <path>\n`;
  if (options.help) {
    console.log(helpMessage);
    process.exit(0);
    return;
  }
  // Version
  if (options.versionFlag) {
    console.log(version);
    process.exit(0);
    return;
  }
  // Diagnostics
  if (options.diagnostics || process.env.EMOTICONS_DIAGNOSTICS) {
    const obj = {
      version,
      configSource: options.config || process.env.EMOTICONS_CONFIG || 'builtin',
      emoticonCount: emoticons.length,
      isCustomConfig: Boolean(options.config || process.env.EMOTICONS_CONFIG),
      colorStyle: null,
      supportsColorLevel: chalk.level
    };
    console.log(JSON.stringify(obj));
    process.exit(0);
    return;
  }
  // Serve HTTP server
  if (options.serve) {
    const portVal = parseInt(options.port, 10);
    if (isNaN(portVal) || portVal < 0) {
      console.error(`Invalid port: ${options.port}`);
      process.exit(1);
      return;
    }
    const app = express();
    app.use(createEmoticonRouter());
    const server = http.createServer(app);
    server.listen(portVal);
    console.log(`Listening on port ${server.address().port}`);
    return server;
  }
  // CLI operations
  // Seed parsing
  let seedVal;
  if (options.seed !== null) {
    const sv = parseInt(options.seed, 10);
    if (isNaN(sv)) {
      throw new Error(`Invalid seed: ${options.seed}`);
    }
    seedVal = sv;
  }
  // Count parsing
  if (options.countFlag) {
    const cnt = parseInt(options.count, 10);
    if (isNaN(cnt) || cnt < 0) {
      console.error(`Invalid count: ${options.count}`);
      process.exit(1);
      return;
    }
    // Multi-output
    if (options.json) {
      const arr = [];
      for (let i = 0; i < cnt; i++) {
        if (seedVal !== undefined) {
          arr.push(seededFace(seedVal + i));
        } else {
          arr.push(randomFace());
        }
      }
      console.log(JSON.stringify(arr));
      process.exit(0);
      return;
    } else {
      for (let i = 0; i < cnt; i++) {
        if (seedVal !== undefined) console.log(seededFace(seedVal + i));
        else console.log(randomFace());
      }
      process.exit(0);
      return;
    }
  }
  // List
  if (options.list) {
    if (options.json) {
      console.log(JSON.stringify(listFaces()));
    } else {
      listFaces().forEach((face, idx) => console.log(`${idx}: ${face}`));
    }
    return;
  }
  // Single output
  if (options.json) {
    const mode = seedVal !== undefined ? 'seeded' : 'random';
    const obj = emoticonJson({ mode, seed: seedVal });
    console.log(JSON.stringify(obj));
    return;
  }
  if (seedVal !== undefined) {
    console.log(seededFace(seedVal));
    return;
  }
  // Default random
  console.log(randomFace());
}