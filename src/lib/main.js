#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";
import minimist from "minimist";
import Decimal from "decimal.js";
import { createCanvas } from "canvas";

export function computePiSpigot(digits) {
  const n = digits + 1;
  const len = Math.floor((10 * n) / 3) + 1;
  const A = new Array(len).fill(2);
  let result = "";
  let carry = 0;
  let nines = 0;
  let predigit = 0;
  for (let j = 0; j < n; j++) {
    carry = 0;
    for (let i = len - 1; i > 0; i--) {
      const x = A[i] * 10 + carry;
      A[i] = x % (2 * i + 1);
      carry = Math.floor(x / (2 * i + 1)) * i;
    }
    const x = A[0] * 10 + carry;
    A[0] = x % 10;
    carry = Math.floor(x / 10);
    if (carry === 9) {
      nines++;
    } else if (carry === 10) {
      result += (predigit + 1).toString();
      result += "0".repeat(nines);
      predigit = 0;
      nines = 0;
    } else {
      result += predigit.toString();
      predigit = carry;
      if (nines > 0) {
        result += "9".repeat(nines);
        nines = 0;
      }
    }
  }
  result += predigit.toString();
  return result[0] + "." + result.slice(1, digits);
}

function factorialBig(n) {
  let result = 1n;
  for (let i = 1n; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function computePiChudnovsky(digits) {
  Decimal.set({ precision: digits + 5, rounding: Decimal.ROUND_FLOOR });
  const sqrt10005 = new Decimal(10005).sqrt();
  const C = new Decimal(426880).times(sqrt10005);
  let sum = new Decimal(0);
  let k = 0;
  const tolerance = new Decimal(10).pow(-digits);
  while (true) {
    const numFact = factorialBig(6n * BigInt(k));
    const denFact1 = factorialBig(3n * BigInt(k));
    const denFact2 = factorialBig(BigInt(k));
    const numerator = new Decimal(numFact.toString())
      .times(new Decimal(13591409).plus(new Decimal(545140134).times(k)));
    const denominator = new Decimal(denFact1.toString())
      .times(new Decimal(denFact2.toString()).pow(3))
      .times(new Decimal(-262537412640768000).pow(k));
    const term = numerator.div(denominator);
    sum = sum.plus(term);
    if (term.abs().lt(tolerance)) {
      break;
    }
    k++;
  }
  const pi = C.div(sum);
  return pi.toFixed(digits - 1);
}

export function main(args) {
  const argv = minimist(args, {
    string: ["algorithm", "output", "file"],
    boolean: ["diagnostics"],
    default: {
      algorithm: "spigot",
      digits: 100,
      output: "text",
      diagnostics: false
    }
  });
  const algorithm = argv.algorithm.toLowerCase();
  const digits = parseInt(argv.digits, 10);
  const output = argv.output.toLowerCase();
  const file = argv.file;
  const diagnostics = argv.diagnostics;
  let pi;
  if (diagnostics) console.time("Compute time");
  if (algorithm === "spigot") {
    pi = computePiSpigot(digits);
  } else if (algorithm === "chudnovsky") {
    pi = computePiChudnovsky(digits);
  } else {
    console.error(`Unknown algorithm: ${algorithm}`);
    process.exit(1);
  }
  if (diagnostics) console.timeEnd("Compute time");
  if (output === "text") {
    if (file) {
      fs.writeFileSync(file, pi);
    } else {
      console.log(pi);
    }
  } else if (output === "png") {
    if (diagnostics) console.time("Render time");
    const fontSize = 20;
    const padding = 10;
    const width = pi.length * (fontSize * 0.6) + padding * 2;
    const height = fontSize + padding * 2;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillText(pi, padding, fontSize + padding / 2);
    const buffer = canvas.toBuffer("image/png");
    const outFile = file || "pi.png";
    fs.writeFileSync(outFile, buffer);
    if (diagnostics) console.timeEnd("Render time");
  } else {
    console.error(`Unknown output type: ${output}`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}