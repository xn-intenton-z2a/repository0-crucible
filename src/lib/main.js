#!/usr/bin/env node
// src/lib/main.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function main(args) {
  const cliArgs = Array.isArray(args) ? args : process.argv.slice(2);

  let handled = false;

  if (cliArgs.includes('--mission')) {
    const missionPath = path.join(process.cwd(), 'MISSION.md');
    try {
      const content = fs.readFileSync(missionPath, 'utf8');
      console.log(content);
    } catch (err) {
      console.error(`Error reading mission file: ${err.message}`);
      process.exit(1);
    }
    handled = true;
  }

  if (cliArgs.includes('--features')) {
    const featuresDir = path.join(process.cwd(), 'features');
    try {
      const files = fs.readdirSync(featuresDir).filter((file) => file.endsWith('.md'));
      files.forEach((file) => console.log(file));
    } catch (err) {
      console.error(`Error reading features directory: ${err.message}`);
      process.exit(1);
    }
    handled = true;
  }

  if (handled) {
    return;
  }

  console.log(`Run with: ${JSON.stringify(cliArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
