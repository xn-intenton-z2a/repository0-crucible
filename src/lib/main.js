import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import chalk from 'chalk';
import express from 'express';
import pkg from '../../package.json' assert { type: 'json' };

// Version from package
export const version = pkg.version;

// Default built-in emoticon list
let EMOTICONS = [
  ":)",
  ":-([",
  ":D",
  "(¬_¬)",
  "(＾◡＾)",
  "(ʘ‿ʘ)",
  "(¬‿¬)",
  "ಠ_ಠ",
  "^_^"];
let configSource = 'builtin';
let isCustomConfig = false;

// Load custom configuration from JSON or YAML
function loadConfig(configPath) {
  if (!fs.existsSync(configPath)) {
    console.error('Invalid config: File not found');
    process.exit(1);
  }
  const content = fs.readFileSync(configPath, 'utf8');
  let arr;
  try {
    const ext = path.extname(configPath).toLowerCase();
    if (ext === '.yaml' || ext === '.yml') {
      arr = yaml.load(content);
    } else {
      arr = JSON.parse(content);
    }
  } catch (err) {
    console.error('Invalid config: Expected an array of strings');
    process.exit(1);
  }
  if (!Array.isArray(arr) || !arr.every((item) => typeof item === 'string')) {
    console.error('Invalid config: Expected an array of strings');
    process.exit(1);
  }
  EMOTICONS = arr;
  configSource = configPath;
  isCustomConfig = true;
}

// Programmatic API
export function listFaces() {
  return EMOTICONS.slice();
}

export function randomFace() {
  return EMOTICONS[Math.floor(Math.random() * EMOTICONS.length)];
}

export function seededFace(seed) {
  if (!Number.isInteger(seed) || seed < 0) {
    throw new Error(`Invalid seed: ${seed}`);
  }
  return EMOTICONS[seed % EMOTICONS.length];
}

export function emoticonJson({ face, mode, seed }) {
  return { face, mode, seed };
}

// Express middleware for HTTP API
export function createEmoticonRouter() {
  const router = express.Router();
  let totalRequests = 0;
  let rootRequests = 0;
  let listRequests = 0;
  let jsonRequests = 0;
  let seededRequests = 0;
  let errorRequests = 0;

  // CORS header
  router.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  // Metrics endpoint
  router.get('/metrics', (req, res) => {
    const lines = [];
    lines.push('# HELP emoticon_requests_total emoticon_requests_total counter');
    lines.push('# TYPE emoticon_requests_total counter');
    lines.push(`emoticon_requests_total ${totalRequests}`);
    res.type('text/plain').send(lines.join('\n'));
  });

  // Root: random emoticon
  router.get('/', (req, res) => {
    totalRequests++;
    rootRequests++;
    res.type('text/plain').send(randomFace());
  });

  // List: all emoticons plain text
  router.get('/list', (req, res) => {
    totalRequests++;
    listRequests++;
    res.type('text/plain').send(listFaces().join('\n'));
  });

  // JSON list route
  router.get('/json/list', (req, res) => {
    totalRequests++;
    jsonRequests++;
    res.json(listFaces());
  });

  // JSON endpoint with query params: seed, count, list
  router.get('/json', (req, res) => {
    totalRequests++;
    jsonRequests++;
    const { seed: seedParam, count: countParam, list } = req.query;

    // All faces
    if (list !== undefined) {
      return res.json(listFaces());
    }

    let seed;
    // Seeded
    if (seedParam !== undefined) {
      seed = parseInt(seedParam, 10);
      if (Number.isNaN(seed) || seed < 0) {
        errorRequests++;
        res.status(400);
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
          return res.json({ error: `Invalid seed: ${seedParam}` });
        }
        return res.type('text/plain').send(`Invalid seed: ${seedParam}`);
      }
      seededRequests++;
    }

    // Counted
    if (countParam !== undefined) {
      const count = parseInt(countParam, 10);
      if (Number.isNaN(count) || count < 0) {
        errorRequests++;
        res.status(400);
        const msg = `Invalid count: ${countParam}`;
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
          return res.json({ error: msg });
        }
        return res.type('text/plain').send(msg);
      }
      const out = [];
      for (let i = 0; i < count; i++) {
        if (seed !== undefined) {
          out.push(seededFace(seed + i));
        } else {
          out.push(randomFace());
        }
      }
      return res.json(out);
    }

    // Single seeded or random
    if (seed !== undefined) {
      return res.json({ face: seededFace(seed), mode: 'seeded', seed });
    }
    return res.json({ face: randomFace(), mode: 'random', seed: null });
  });

  // Version endpoint
  router.get('/version', (req, res) => {
    totalRequests++;
    res.json({ version });
  });

  // Health check
  router.get('/health', (req, res) => {
    res.type('text/plain').send('OK');
  });

  // 404 handler
  router.use((req, res) => {
    errorRequests++;
    res.status(404);
    const msg = 'Not Found';
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.json({ error: msg });
    }
    return res.type('text/plain').send(msg);
  });

  return router;
}

// CLI entrypoint
export function main(args) {
  const diagnosticsFlag = args.includes('--diagnostics');
  const helpFlag = args.includes('--help') || args.includes('-h');
  const versionFlag = args.includes('--version') || args.includes('-v');
  const listFlag = args.includes('--list');
  const jsonFlag = args.includes('--json');
  const serveFlag = args.includes('--serve');

  // Configuration flag or env var
  const configFlagIndex = args.indexOf('--config');
  if (configFlagIndex !== -1) {
    loadConfig(args[configFlagIndex + 1]);
  } else if (process.env.EMOTICONS_CONFIG) {
    loadConfig(process.env.EMOTICONS_CONFIG);
  }

  // Diagnostics
  if (diagnosticsFlag || process.env.EMOTICONS_DIAGNOSTICS) {
    const output = {
      version,
      configSource,
      emoticonCount: EMOTICONS.length,
      isCustomConfig,
      colorStyle: null,
      supportsColorLevel: chalk.level,
    };
    console.log(JSON.stringify(output));
    process.exit(0);
  }

  // Help
  if (helpFlag) {
    console.log(
      `Usage: node src/lib/main.js [options]
--config <path>    Load a custom emoticon list from a JSON or YAML file
--diagnostics      Output application diagnostics as JSON and exit
--list             Print all available emoticons with their zero-based index
--seed <n>         Use a non-negative integer seed to deterministically select an emoticon
--json             Output results in JSON format
--count <n>        Output multiple emoticons
--interactive, -i  Launch interactive REPL mode
--help, -h         Display this help message and exit
--version, -v      Print application version and exit
--serve            Start built-in HTTP server mode
--port <n>         Specify HTTP server port (default: 3000)

node src/lib/main.js --config <path>`
    );
    process.exit(0);
  }

  // Version
  if (versionFlag) {
    console.log(version);
    process.exit(0);
  }

  // HTTP Server mode
  if (serveFlag) {
    let port = 3000;
    const portIndex = args.indexOf('--port');
    if (portIndex !== -1) {
      const portArg = args[portIndex + 1];
      const p = parseInt(portArg, 10);
      if (Number.isNaN(p) || p < 0) {
        console.error(`Invalid port: ${portArg}`);
        process.exit(1);
      }
      port = p;
    }
    const app = express();
    app.use(createEmoticonRouter());
    const server = app.listen(port, () => {
      console.log(`Listening on port ${server.address().port}`);
    });
    return server;
  }

  // List emoticons
  if (listFlag) {
    listFaces().forEach((face, idx) => console.log(`${idx}: ${face}`));
    return;
  }

  // Count and/or seed
  const countIndex = args.indexOf('--count');
  const seedIndex = args.indexOf('--seed');

  if (countIndex !== -1) {
    const countArg = args[countIndex + 1];
    const count = parseInt(countArg, 10);
    if (Number.isNaN(count) || count < 0) {
      console.error(`Invalid count: ${countArg}`);
      process.exit(1);
    }
    if (jsonFlag) {
      const arr = [];
      if (seedIndex !== -1) {
        const seedVal = parseInt(args[seedIndex + 1], 10);
        for (let i = 0; i < count; i++) {
          arr.push(seededFace(seedVal + i));
        }
      } else {
        for (let i = 0; i < count; i++) {
          arr.push(randomFace());
        }
      }
      console.log(JSON.stringify(arr));
      process.exit(0);
    } else {
      if (seedIndex !== -1) {
        const seedVal = parseInt(args[seedIndex + 1], 10);
        for (let i = 0; i < count; i++) {
          console.log(seededFace(seedVal + i));
        }
      } else {
        for (let i = 0; i < count; i++) {
          console.log(randomFace());
        }
      }
      process.exit(0);
    }
  }

  // Seed without count
  if (seedIndex !== -1) {
    const seedArg = args[seedIndex + 1];
    const seed = parseInt(seedArg, 10);
    if (Number.isNaN(seed)) {
      throw new Error(`Invalid seed: ${seedArg}`);
    }
    const face = seededFace(seed);
    if (jsonFlag) {
      console.log(JSON.stringify({ face, mode: 'seeded', seed }));
    } else {
      console.log(face);
    }
    return;
  }

  // Default random output
  if (jsonFlag) {
    console.log(
      JSON.stringify({ face: randomFace(), mode: 'random', seed: null })
    );
  } else {
    console.log(randomFace());
  }
}
