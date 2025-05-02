#!/usr/bin/env node
import fs from "fs";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import pkg from "../../package.json" assert { type: "json" };
const { version } = pkg;

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

function printUsage() {
  const usage = [
    "Usage: node src/lib/main.js [options]",
    "",
    "A CLI tool to output random ASCII facial expressions.",
    "",
    "Options:",
    "  -h, --help        Show this help message and exit",
    "  -v, --version     Print the current version and exit",
    "  --faces <path>    Path to a YAML file defining custom faces",
    "  --seed <number>   Seed for deterministic face selection",
    "  --count <n>       Number of faces to output (default 1)",
    "",
    "Examples:",
    "  node src/lib/main.js",
    "  node src/lib/main.js --faces custom_faces.yaml --count 3",
    "  node src/lib/main.js --help",
    "  node src/lib/main.js --version"
  ].join("\n");
  console.log(usage);
}

function parseArgs(args) {
  const result = { help: false, facesPath: null, seed: null, count: 1 };
  // Help flag
  if (args.includes("--help") || args.includes("-h")) {
    result.help = true;
  }

  // Faces option
  const facesIdx = args.indexOf("--faces");
  if (facesIdx !== -1) {
    result.facesPath = args[facesIdx + 1] || null;
  }

  // Seed option
  const seedIdx = args.indexOf("--seed");
  if (seedIdx !== -1) {
    const seedVal = args[seedIdx + 1];
    const num = Number(seedVal);
    if (isNaN(num)) {
      console.error("Error: --seed value is not a number");
      process.exit(1);
    }
    result.seed = num;
  }

  // Count option
  const countIdx = args.indexOf("--count");
  if (countIdx !== -1) {
    const countVal = args[countIdx + 1];
    const num = Number(countVal);
    if (isNaN(num) || num < 1) {
      console.error("Error: --count value is not a positive number");
      process.exit(1);
    }
    result.count = num;
  }

  return result;
}

export function main(args) {
  // Version flag detection
  if (args.includes("--version") || args.includes("-v")) {
    console.log(version);
    process.exit(0);
  }

  const options = parseArgs(args);

  if (options.help) {
    printUsage();
    process.exit(0);
  }

  let faces = defaultFaces;
  if (options.facesPath !== null) {
    const filePath = options.facesPath;
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

  for (let i = 0; i < options.count; i++) {
    let face;
    if (options.seed !== null) {
      const idx = options.seed % faces.length;
      options.seed++;
      face = faces[idx];
    } else {
      face = faces[Math.floor(Math.random() * faces.length)];
    }
    console.log(face);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
