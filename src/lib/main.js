#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

const FEATURE_NAME = "demo";

export function main(args) {
  if (args.includes(`--${FEATURE_NAME}`) || args.includes(`--enable-${FEATURE_NAME}`)) {
    console.log(`Feature ${FEATURE_NAME} enabled`);
  } else {
    console.log(`Run with: ${JSON.stringify(args)}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
