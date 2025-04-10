#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";

function convertArg(arg) {
  // If the argument is exactly 'NaN', keep it as a string to preserve the special case
  if (arg === "NaN") return arg;
  // If the argument represents a valid number, convert it
  // Using isNaN on the string works because isNaN('42') is false and isNaN('abc') is true
  if (!isNaN(arg) && arg.trim() !== "") {
    return Number(arg);
  }
  return arg;
}

export function main(args) {
  // Convert each argument
  const convertedArgs = args.map(convertArg);
  console.log(`Run with: ${JSON.stringify(convertedArgs)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
