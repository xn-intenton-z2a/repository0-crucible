#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import yaml from "js-yaml";

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

const validCategories = Object.keys(
  builtInFaces.reduce((acc, item) => {
    item.categories.forEach((cat) => {
      acc[cat] = true;
    });
    return acc;
  }, {})
);

function createSeededRandom(seedVal) {
  let state = seedVal % 2147483647;
  if (state <= 0) state += 2147483646;
  return {
    next: () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    },
  };
}

function shuffleArray(array, randomFn) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function errorExit(message) {
  console.error(message);
  throw new Error(message);
}

export function main(args) {
  if (!Array.isArray(args)) {
    args = process.argv.slice(2);
  }

  let faceFlag = false;
  let count = 1;
  let seed;
  let category;
  let facesFile;
  let mergeFaces = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--face") {
      faceFlag = true;
      const next = args[i + 1];
      if (next && !next.startsWith("--") && !isNaN(Number(next))) {
        count = Number(next);
        i++;
      }
    } else if (arg === "--seed") {
      const next = args[++i];
      if (next === undefined || isNaN(Number(next))) {
        errorExit(`Invalid seed value: ${next}`);
      }
      seed = Number(next);
    } else if (arg === "--category") {
      const next = args[++i];
      if (!next) {
        errorExit("Missing category value");
      }
      category = next;
    } else if (arg === "--faces-file") {
      const next = args[++i];
      if (!next) {
        errorExit("Missing faces file path");
      }
      facesFile = next;
    } else if (arg === "--merge-faces") {
      mergeFaces = true;
    }
  }

  if (!faceFlag) {
    console.log(`Run with: ${JSON.stringify(args)}`);
    return;
  }

  // Load faces
  let faceSet = builtInFaces.slice();
  if (facesFile) {
    let content;
    try {
      content = readFileSync(facesFile, "utf8");
    } catch (err) {
      errorExit(`Cannot read file: ${facesFile}`);
    }
    let parsed;
    try {
      if (facesFile.endsWith(".yaml") || facesFile.endsWith(".yml")) {
        parsed = yaml.load(content);
      } else {
        parsed = JSON.parse(content);
      }
    } catch (err) {
      errorExit(`Failed to parse faces file: ${err.message}`);
    }
    if (!parsed || !Array.isArray(parsed.faces)) {
      errorExit("Faces file must export an object with a 'faces' array");
    }
    const custom = parsed.faces.map((item) => {
      if (!item.face || typeof item.face !== "string") {
        errorExit("Each face must have a non-empty 'face' string");
      }
      if (item.categories && !Array.isArray(item.categories)) {
        errorExit("'categories' must be an array of strings");
      }
      return {
        face: item.face,
        categories: Array.isArray(item.categories) ? item.categories : [],
      };
    });
    faceSet = mergeFaces ? faceSet.concat(custom) : custom;
  }

  // Category filtering
  if (category) {
    if (!validCategories.includes(category)) {
      errorExit(
        `Invalid category '${category}'. Valid categories: ${validCategories.join(
          ", "
        )}`
      );
    }
    faceSet = faceSet.filter((item) => item.categories.includes(category));
    if (faceSet.length === 0) {
      errorExit(
        `No faces found for category '${category}'. Try a different category.`
      );
    }
  }

  if (!Number.isInteger(count) || count < 1) {
    errorExit(`Invalid count: ${count}. Must be a positive integer.`);
  }
  if (count > faceSet.length) {
    errorExit(
      `Requested ${count} faces but only ${faceSet.length} available. Reduce count or change category.`
    );
  }

  // Random selection
  let randomFn = Math.random;
  if (seed !== undefined) {
    const gen = createSeededRandom(seed);
    randomFn = () => gen.next();
  }

  const faces = faceSet.map((item) => item.face);
  const selection = shuffleArray(faces, randomFn).slice(0, count);

  for (const f of selection) {
    console.log(f);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (err) {
    process.exit(1);
  }
}
