#!/usr/bin/env node
import fs from "fs";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const defaultFaces = [
  "( ͡° ͜ʖ ͡°)",
  "(╯°□°)╯︵ ┻━┻",
  "¯\\_(ツ)_/¯",
  "(•_•)",
  "(ಥ_ಥ)",
  "(^_^)",
  "(⚆_⚆)",
  "ʕ•ᴥ•ʔ",
  "(>_<)",
  "(¬_¬)"
];

export function main(args) {
  // Parse --faces
  const facesIdx = args.indexOf("--faces");
  let faces = defaultFaces;
  if (facesIdx !== -1) {
    const filePath = args[facesIdx + 1];
    if (!filePath) {
      console.error("Error: --faces flag provided but no file path specified");
      process.exit(1);
    }
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const data = yaml.load(content);
      if (!Array.isArray(data)) {
        console.error(`Error: Faces file ${filePath} does not contain an array`);
        process.exit(1);
      }
      const validEntries = data.every(
        (item) => typeof item === "string" && item.length > 0
      );
      if (!validEntries) {
        console.warn(
          `Warning: Faces file ${filePath} contains invalid entries, using default faces`
        );
      } else {
        faces = data;
      }
    } catch (err) {
      console.error(`Error loading faces file: ${err.message}`);
      process.exit(1);
    }
  }

  // Parse --seed
  const seedIdx = args.indexOf("--seed");
  let seed = null;
  if (seedIdx !== -1) {
    const seedVal = args[seedIdx + 1];
    seed = Number(seedVal);
    if (isNaN(seed)) {
      console.error("Error: --seed value is not a number");
      process.exit(1);
    }
  }

  // Parse --count
  const countIdx = args.indexOf("--count");
  let count = 1;
  if (countIdx !== -1) {
    const countVal = args[countIdx + 1];
    count = Number(countVal);
    if (isNaN(count) || count < 1) {
      console.error("Error: --count value is not a positive number");
      process.exit(1);
    }
  }

  // Generate and output faces
  for (let i = 0; i < count; i++) {
    let face;
    if (seed !== null) {
      const idx = seed % faces.length;
      seed++;
      face = faces[idx];
    } else {
      face = faces[Math.floor(Math.random() * faces.length)];
    }
    console.log(face);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
