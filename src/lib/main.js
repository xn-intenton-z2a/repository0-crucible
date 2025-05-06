#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import yaml from "js-yaml";
import readline from "readline";
import http from "http";
import { URL } from "url";

// Built-in ASCII faces with categories
export const builtInFaces = [
  { face: "( ͡° ͜ʖ ͡°)", categories: ["happy"] },
  { face: "( ಠ ͜ʖ ಠ)", categories: ["angry"] },
  { face: "( ͡~ ͜ʖ ͡°)", categories: ["playful"] },
  { face: "( ͡◉ ͜ʖ ͡◉)", categories: ["surprise"] },
  { face: "( ͠° ͟ʖ ͡°)", categories: ["playful"] },
  { face: "(ᵔ ͜ʖᵔ)", categories: ["happy"] },
  { face: "(¬ ͜ʖ¬)", categories: ["playful"] },
  { face: "(▀ ͜ʖ▀)", categories: ["angry"] },
  { face: "( ͡⚆ ͜ʖ ͡⚆)", categories: ["surprise"] },
  { face: "( ͡ಥ ͜ʖ ͡ಥ)", categories: ["sad"] }
];

// Create a seeded random number generator
function createSeededRandom(seedVal) {
  let state = seedVal % 2147483647;
  if (state <= 0) state += 2147483646;
  return {
    next: () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    }
  };
}

// Shuffle an array using a provided random function
function shuffleArray(array, randomFn) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Internal: load face definitions from built-in and optional custom file
function loadFaceSet({ facesFile, mergeFaces } = {}) {
  let faceSet = builtInFaces.slice();
  if (facesFile) {
    let content;
    try {
      content = readFileSync(facesFile, "utf8");
    } catch (err) {
      throw new Error(`Cannot read file: ${facesFile}`);
    }
    let parsed;
    try {
      if (facesFile.endsWith(".yaml") || facesFile.endsWith(".yml")) {
        parsed = yaml.load(content);
      } else {
        parsed = JSON.parse(content);
      }
    } catch (err) {
      throw new Error(`Failed to parse faces file: ${err.message}`);
    }
    if (!parsed || !Array.isArray(parsed.faces)) {
      throw new Error("Faces file must export an object with a 'faces' array");
    }
    const custom = parsed.faces.map((item) => {
      if (!item.face || typeof item.face !== "string") {
        throw new Error("Each face must have a non-empty 'face' string");
      }
      if (item.categories && !Array.isArray(item.categories)) {
        throw new Error("'categories' must be an array of strings");
      }
      return {
        face: item.face,
        categories: Array.isArray(item.categories) ? item.categories : []
      };
    });
    faceSet = mergeFaces ? faceSet.concat(custom) : custom;
  }
  return faceSet;
}

/**
 * List all unique category names from the face library.
 */
export function listCategories(options = {}) {
  const faceSet = loadFaceSet(options);
  const categories = Array.from(
    faceSet.reduce((acc, { categories }) => {
      categories.forEach((cat) => acc.add(cat));
      return acc;
    }, new Set())
  );
  return categories;
}

/**
 * List all face strings in the library, optionally filtered by category.
 */
export function listFaces(options = {}) {
  const { category } = options;
  const faceSet = loadFaceSet(options);
  const validCategories = listCategories(options);
  let filtered = faceSet;
  if (category) {
    if (!validCategories.includes(category)) {
      throw new Error(
        `Invalid category '${category}'. Valid categories: ${validCategories.join(", ")}`
      );
    }
    filtered = faceSet.filter((item) => item.categories.includes(category));
    if (filtered.length === 0) {
      throw new Error(
        `No faces found for category '${category}'. Try a different category.`
      );
    }
  }
  return filtered.map((item) => item.face);
}

/**
 * Generate a random selection of faces.
 */
export function generateFaces(options = {}) {
  let { count = 1, seed, category, facesFile, mergeFaces } = options;
  if (!Number.isInteger(count) || count < 1) {
    throw new Error(`Invalid count: ${count}. Must be a positive integer.`);
  }
  if (seed !== undefined && (typeof seed !== "number" || isNaN(seed))) {
    throw new Error(`Invalid seed value: ${seed}`);
  }
  const allFaces = listFaces({ category, facesFile, mergeFaces });
  if (count > allFaces.length) {
    throw new Error(
      `Requested ${count} faces but only ${allFaces.length} available. Reduce count or change category.`
    );
  }
  let randomFn = Math.random;
  if (seed !== undefined) {

    const gen = createSeededRandom(seed);
    randomFn = () => gen.next();
  }
  return shuffleArray(allFaces, randomFn).slice(0, count);
}

// CLI error handler
function errorExit(message) {
  console.error(message);
  process.exit(1);
}

// Print help for interactive mode
function printInteractiveHelp() {
  console.log('Available commands:');
  console.log('  face [count] [--seed <seed>] [--category <category>]');
  console.log('  list-faces [--category <category>]');
  console.log('  list-categories');
  console.log('  category <name>');
  console.log('  seed <number>');
  console.log('  custom <path> [--merge]');
  console.log('  help');
  console.log('  exit, quit');
  console.log('Note: Defaults for seed, category, and custom apply automatically to subsequent commands.');
}

// Serve mode handler
function serveMode(port) {
  const server = http.createServer((req, res) => {
    const reqUrl = new URL(req.url || '/', `http://localhost`);
    const pathname = reqUrl.pathname;
    const params = reqUrl.searchParams;
    const sendJSON = (status, body) => {
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(body));
    };
    try {
      // OpenAPI specification endpoint
      if (pathname === '/openapi.json') {
        // load version
        let pkg;
        try {
          pkg = JSON.parse(
            readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
          );
        } catch {
          pkg = { version: null, description: null };
        }
        const spec = {
          openapi: '3.0.3',
          info: {
            title: pkg.name || 'ASCII Face API',
            version: pkg.version,
            description: pkg.description || ''
          },
          servers: [{ url: `http://localhost:${port}` }],
          paths: {
            '/face': {
              get: {
                summary: 'Generate random faces',
                parameters: [
                  { name: 'count', in: 'query', schema: { type: 'integer', minimum: 1 } },
                  { name: 'seed', in: 'query', schema: { type: 'integer', minimum: 0 } },
                  { name: 'category', in: 'query', schema: { type: 'string' } },
                  { name: 'facesFile', in: 'query', schema: { type: 'string' } },
                  { name: 'mergeFaces', in: 'query', schema: { type: 'boolean' } }
                ],
                responses: {
                  '200': { description: 'Successful response', content: { 'application/json': { schema: { type: 'object', properties: { faces: { type: 'array', items: { type: 'string' } } } } } } },
                  '400': { description: 'Bad request', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'string' } } } } } }
                }
              }
            },
            '/list-faces': {
              get: {
                summary: 'List all faces',
                parameters: [
                  { name: 'category', in: 'query', schema: { type: 'string' } },
                  { name: 'facesFile', in: 'query', schema: { type: 'string' } },
                  { name: 'mergeFaces', in: 'query', schema: { type: 'boolean' } }
                ],
                responses: {
                  '200': { description: 'Successful response', content: { 'application/json': { schema: { type: 'object', properties: { faces: { type: 'array', items: { type: 'string' } } } } } } },
                  '400': { description: 'Bad request', content: { 'application/json': { schema: { type: 'object', properties: { error: { type: 'string' } } } } } }
                }
              }
            },
            '/list-categories': {
              get: {
                summary: 'List all categories',
                parameters: [
                  { name: 'facesFile', in: 'query', schema: { type: 'string' } },
                  { name: 'mergeFaces', in: 'query', schema: { type: 'boolean' } }
                ],
                responses: {
                  '200': { description: 'Successful response', content: { 'application/json': { schema: { type: 'object', properties: { categories: { type: 'array', items: { type: 'string' } } } } } } }
                }
              }
            },
            '/diagnostics': { /* existing spec for diagnostics */ get: { summary: 'Diagnostics info', parameters: [ { name: 'facesFile', in: 'query', schema: { type: 'string' } }, { name: 'mergeFaces', in: 'query', schema: { type: 'boolean' } }, { name: 'seed', in: 'query', schema: { type: 'integer', minimum:0 } } ], responses: { '200': { description:'Successful response', content:{ 'application/json':{ schema:{ type:'object' } } } }, '400':{ description:'Error response', content:{ 'application/json':{ schema:{ type:'object', properties:{ error:{ type:'string' } } } } } } } } },
            '/openapi.json': { get: { summary: 'OpenAPI specification', responses: { '200': { description: 'OpenAPI JSON', content: { 'application/json': { schema: { type: 'object' } } } } } } }
          }
        };
        return sendJSON(200, spec);
      }
      if (pathname === '/face') {
        const count = params.has('count') ? Number(params.get('count')) : 1;
        if (!Number.isInteger(count) || count < 1) throw new Error('Invalid count');
        let seed;
        if (params.has('seed')) {
          seed = Number(params.get('seed'));
          if (!Number.isInteger(seed) || seed < 0) throw new Error('Invalid seed');
        }
        const category = params.get('category') || undefined;
        const facesFile = params.get('facesFile') || undefined;
        const mergeFaces = params.has('mergeFaces') && params.get('mergeFaces') === 'true';
        const faces = generateFaces({ count, seed, category, facesFile, mergeFaces });
        return sendJSON(200, { faces });
      }
      if (pathname === '/list-faces') {
        const category = params.get('category') || undefined;
        const facesFile = params.get('facesFile') || undefined;
        const mergeFaces = params.has('mergeFaces') && params.get('mergeFaces') === 'true';
        const faces = listFaces({ category, facesFile, mergeFaces });
        return sendJSON(200, { faces });
      }
      if (pathname === '/list-categories') {
        const facesFile = params.get('facesFile') || undefined;
        const mergeFaces = params.has('mergeFaces') && params.get('mergeFaces') === 'true';
        const categories = listCategories({ facesFile, mergeFaces });
        return sendJSON(200, { categories });
      }
      if (pathname === '/diagnostics') {
        const facesFile = params.get('facesFile') || undefined;
        const mergeFaces = params.has('mergeFaces') && params.get('mergeFaces') === 'true';
        let seedVal;
        if (params.has('seed')) {
          seedVal = Number(params.get('seed'));
          if (!Number.isInteger(seedVal) || seedVal < 0) throw new Error('Invalid seed');
        }
        // load version
        let cliVersion = null;
        try {
          const pkg = JSON.parse(
            readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
          );
          cliVersion = pkg.version;
        } catch {}
        const diagnostics = {
          nodeVersion: process.version,
          cliVersion,
          builtInFacesCount: builtInFaces.length,
          categories: listCategories({ facesFile, mergeFaces }).sort(),
          customLoaded: !!facesFile,
          customFacesCount: 0,
          mergeMode: facesFile ? (mergeFaces ? 'merge' : 'replace') : 'none',
          seed: seedVal !== undefined ? seedVal : null,
          timestamp: new Date().toISOString()
        };
        try {
          const fullSet = loadFaceSet({ facesFile, mergeFaces });
          if (facesFile) {
            diagnostics.customFacesCount = mergeFaces
              ? fullSet.length - builtInFaces.length
              : fullSet.length;
          }
        } catch (err) {
          diagnostics.error = err.message;
          return sendJSON(400, diagnostics);
        }
        return sendJSON(200, diagnostics);
      }
      return sendJSON(404, { error: 'Not Found' });
    } catch (err) {
      return sendJSON(400, { error: err.message });
    }
  });
  server.listen(port, () => {
    const addr = server.address();
    const actual = typeof addr === 'object' && addr ? addr.port : port;
    console.log(`Listening on http://localhost:${actual}`);
  });
  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Interactive REPL mode
function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let defaultCategory;
  let defaultSeed;
  let facesFileSession;
  let mergeFacesSession = false;
  printInteractiveHelp();
  rl.on('line', (line) => {
    const input = line.trim();
    if (!input) return;
    const parts = input.split(' ').filter(Boolean);
    const cmd = parts[0];
    let args = parts.slice(1);
    let cliArgs = [];
    switch (cmd) {
      case 'exit':
      case 'quit':
        rl.close();
        return;
      case 'help':
        printInteractiveHelp();
        return;
      case 'face':
        cliArgs.push('--face');
        cliArgs = cliArgs.concat(args);
        break;
      case 'list-faces':
        cliArgs.push('--list-faces');
        cliArgs = cliArgs.concat(args);
        break;
      case 'list-categories':
        cliArgs.push('--list-categories');
        break;
      case 'category':
        if (args[0]) {
          defaultCategory = args[0];
          console.log(`Default category set to ${defaultCategory}`);
        } else {
          console.log('Usage: category <name>');
        }
        return;
      case 'seed':
        if (args[0] && !isNaN(Number(args[0])) && Number.isInteger(Number(args[0]))) {
          defaultSeed = Number(args[0]);
          console.log(`Default seed set to ${defaultSeed}`);
        } else {
          console.log(`Invalid seed value: ${args[0]}`);
        }
        return;
      case 'custom':
        if (args[0]) {
          facesFileSession = args[0];
          mergeFacesSession = args.includes('--merge');
          console.log(
            `Custom faces ${mergeFacesSession ? 'merged from' : 'loaded from'} ${facesFileSession}`
          );
        } else {
          console.log('Usage: custom <path> [--merge]');
        }
        return;
      default:
        console.log(`Unknown command: ${cmd}`);
        return;
    }
    // apply session defaults
    if (defaultCategory && !cliArgs.includes('--category')) {
      cliArgs.push('--category', defaultCategory);
    }
    if (defaultSeed !== undefined && !cliArgs.includes('--seed')) {
      cliArgs.push('--seed', String(defaultSeed));
    }
    if (facesFileSession && !cliArgs.includes('--faces-file')) {
      cliArgs.push('--faces-file', facesFileSession);
      if (mergeFacesSession && !cliArgs.includes('--merge-faces')) {
        cliArgs.push('--merge-faces');
      }
    }
    try {
      main(cliArgs);
    } catch (err) {
      console.error(err.message);
    }
  }).on('close', () => {
    console.log('Goodbye!');
    process.exit(0);
  });
}

/**
 * Main CLI entry point parsing arguments and invoking API functions.
 */
export function main(args) {
  if (!Array.isArray(args)) {
    args = process.argv.slice(2);
  }

  // Serve mode detection
  const serveIndex = args.indexOf('--serve');
  const serveFlag = serveIndex !== -1;
  let port = 3000;
  if (serveFlag) {
    const portIndex = args.indexOf('--port');
    if (portIndex !== -1 && args[portIndex + 1] && !args[portIndex + 1].startsWith('--')) {
      const p = Number(args[portIndex + 1]);
      if (!Number.isInteger(p) || p < 0) errorExit(`Invalid port: ${args[portIndex + 1]}`);
      port = p;
    } else if (process.env.PORT) {
      const p2 = Number(process.env.PORT);
      if (!Number.isInteger(p2) || p2 < 0) errorExit(`Invalid port: ${process.env.PORT}`);
      port = p2;
    }
    serveMode(port);
    return;
  }

  let faceFlag = false;
  let listFacesFlag = false;
  let listCategoriesFlag = false;
  let count = 1;
  let seed;
  let category;
  let facesFile;
  let mergeFaces = false;
  const supportedColors = { black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
  let colorFlag = false;
  let colorName;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--interactive') {
      // handled later
    } else if (arg === '--face') {
      faceFlag = true;
      const next = args[i + 1];
      if (next && !next.startsWith('--') && !isNaN(Number(next))) {
        count = Number(next);
        i++;
      }
    } else if (arg === '--seed') {
      seed = Number(args[++i]);
    } else if (arg === '--category') {
      category = args[++i];
    } else if (arg === '--faces-file') {
      facesFile = args[++i];
    } else if (arg === '--merge-faces') {
      mergeFaces = true;
    } else if (arg === '--list-faces') {
      listFacesFlag = true;
    } else if (arg === '--list-categories') {
      listCategoriesFlag = true;
    } else if (arg === '--color') {
      colorFlag = true;
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        colorName = args[++i].toLowerCase();
      } else {
        colorName = 'green';
      }
      if (!supportedColors[colorName]) {
        errorExit(`Unsupported color '${colorName}'. Supported colors: ${Object.keys(supportedColors).join(', ')}.`);
      }
    }
  }

  // Interactive mode
  if (args.includes('--interactive')) {
    interactiveMode();
    return;
  }

  // No actionable flags
  if (!faceFlag && !listFacesFlag && !listCategoriesFlag) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  if (listCategoriesFlag) {
    listCategories({ facesFile, mergeFaces }).forEach((item) => console.log(item));
    return;
  }
  if (listFacesFlag) {
    listFaces({ category, facesFile, mergeFaces }).forEach((item) =>
      console.log(item)
    );
    return;
  }
  if (faceFlag) {
    generateFaces({ count, seed, category, facesFile, mergeFaces }).forEach((item) => {
      if (colorFlag) {
        const code = supportedColors[colorName];
        console.log(`\x1b[${code}m${item}\x1b[0m`);
      } else {
        console.log(item);
      }
    });
    return;
  }
}

// Execute when invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cliArgs = process.argv.slice(2);
  if (cliArgs.includes('--interactive')) {
    interactiveMode();
  } else if (cliArgs.includes('--serve')) {
    const portArgIndex = cliArgs.indexOf('--port');
    let port = 3000;
    if (portArgIndex !== -1) {
      port = Number(cliArgs[portArgIndex + 1]);
    } else if (process.env.PORT) {
      port = Number(process.env.PORT);
    }
    serveMode(port);
  } else {
    try {
      main(cliArgs);
    } catch (err) {
      process.exit(1);
    }
  }
}