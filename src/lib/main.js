#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import yaml from "js-yaml";
import readline from "readline";

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
 * @param {Object} options
 * @param {string} [options.facesFile]
 * @param {boolean} [options.mergeFaces]
 * @returns {string[]} Array of category names
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
 * @param {Object} options
 * @param {string} [options.category]
 * @param {string} [options.facesFile]
 * @param {boolean} [options.mergeFaces]
 * @returns {string[]} Array of face strings
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
 * @param {Object} options
 * @param {number} [options.count=1]
 * @param {number} [options.seed]
 * @param {string} [options.category]
 * @param {string} [options.facesFile]
 * @param {boolean} [options.mergeFaces]
 * @returns {string[]} Array of generated face strings
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
  console.log('  custom <path> [--merge]');
  console.log('  help');
  console.log('  exit, quit');
}

// Interactive REPL mode
function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let defaultCategory;
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
 * @param {string[]} args
 */
export function main(args) {
  if (!Array.isArray(args)) {
    args = process.argv.slice(2);
  }

  let faceFlag = false;
  let listFacesFlag = false;
  let listCategoriesFlag = false;
  let count = 1;
  let seed;
  let category;
  let facesFile;
  let mergeFaces = false;

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

  try {
    if (listCategoriesFlag) {
      listCategories({ facesFile, mergeFaces }).forEach(console.log);
      return;
    }
    if (listFacesFlag) {
      listFaces({ category, facesFile, mergeFaces }).forEach(console.log);
      return;
    }
    if (faceFlag) {
      generateFaces({ count, seed, category, facesFile, mergeFaces }).forEach(
        console.log
      );
      return;
    }
  } catch (err) {
    errorExit(err.message);
  }
}

// Execute when invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cliArgs = process.argv.slice(2);
  if (cliArgs.includes('--interactive')) {
    interactiveMode();
  } else {
    try {
      main(cliArgs);
    } catch (err) {
      process.exit(1);
    }
  }
}
