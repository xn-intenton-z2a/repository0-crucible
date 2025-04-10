#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

function convertArg(arg) {
  // Special case: if the argument is exactly 'NaN', keep it as a string to preserve the special case
  if (arg === "NaN") return arg;
  
  // Convert boolean strings (case-insensitive) to booleans
  if (arg.toLowerCase() === "true") return true;
  if (arg.toLowerCase() === "false") return false;

  // Attempt to convert to a number if applicable
  const num = Number(arg);
  // If the argument is not empty and conversion does not yield NaN, return the number
  if (arg.trim() !== "" && !isNaN(num)) return num;

  // Fallback: return the original string
  return arg;
}

export function main(args) {
  // Convert each argument using intelligent parsing
  const convertedArgs = args.map(convertArg);
  console.log(`Run with: ${JSON.stringify(convertedArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
