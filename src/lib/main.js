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
  if (result[0] === "0") {
    result = result.slice(1);
  }
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
    const numerator = new Decimal(numFact.toString()).times(
      new Decimal(13591409).plus(new Decimal(545140134).times(k))
    );
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

export function computePiBBP(index) {
  if (!Number.isInteger(index) || index < 0) {
    throw new Error("Index must be a non-negative integer");
  }
  if (index === 0) {
    return "3";
  }
  const n = index - 1;
  function modPow(a, e, mod) {
    let result = 1;
    let base = a % mod;
    let exp = e;
    while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return result;
  }
  function series(j, n) {
    let sum = 0;
    for (let k = 0; k <= n; k++) {
      const denom = 8 * k + j;
      sum += modPow(16, n - k, denom) / denom;
    }
    sum -= Math.floor(sum);
    for (let k = n + 1; k <= n + 100; k++) {
      sum += Math.pow(16, n - k) / (8 * k + j);
    }
    return sum - Math.floor(sum);
  }
  const t1 = series(1, n);
  const t2 = series(4, n);
  const t3 = series(5, n);
  const t4 = series(6, n);
  let x = 4 * t1 - 2 * t2 - t3 - t4;
  x -= Math.floor(x);
  const digit = Math.floor(x * 16);
  return digit.toString(16).toUpperCase();
}

export function main(args) {
  const argv = minimist(args, {
    string: [
      "algorithm",
      "output",
      "file",
      "benchmark-sizes",
      "benchmark-output",
      "benchmark-file",
      "hex-index"
    ],
    boolean: ["diagnostics"],
    default: {
      algorithm: "spigot",
      digits: 100,
      output: "text",
      diagnostics: false
    }
  });
  const algorithm = argv.algorithm.toLowerCase();

  if (algorithm === "bbp") {
    const idx = parseInt(argv["hex-index"], 10);
    if (isNaN(idx) || idx < 0) {
      console.error("Invalid or missing hex-index for BBP algorithm");
      process.exit(1);
    }
    const hexChar = computePiBBP(idx);
    if (argv.file) fs.writeFileSync(argv.file, hexChar);
    else console.log(hexChar);
    return;
  }

  const benchArg = argv["benchmark-sizes"];
  if (benchArg) {
    const sizes = benchArg.split(",").map((s) => parseInt(s, 10)).filter((n) => !isNaN(n));
    const results = sizes.map((size) => {
      const start1 = process.hrtime();
      computePiSpigot(size);
      const d1 = process.hrtime(start1);
      const spigotTimeMs = d1[0] * 1000 + d1[1] / 1e6;
      const start2 = process.hrtime();
      computePiChudnovsky(size);
      const d2 = process.hrtime(start2);
      const chudTimeMs = d2[0] * 1000 + d2[1] / 1e6;
      const start3 = process.hrtime();
      computePiBBP(size);
      const d3 = process.hrtime(start3);
      const bbpTimeMs = d3[0] * 1000 + d3[1] / 1e6;
      return { size, spigotTimeMs, chudnovskyTimeMs: chudTimeMs, bbpTimeMs };
    });
    const outType = (argv["benchmark-output"] || "text").toLowerCase();
    const outFile = argv["benchmark-file"];

    if (outType === "text") {
      const header = ["size", "spigotTimeMs", "chudnovskyTimeMs", "bbpTimeMs"];
      const rows = [header];
      results.forEach((r) => {
        rows.push([
          r.size.toString(),
          r.spigotTimeMs.toFixed(3),
          r.chudnovskyTimeMs.toFixed(3),
          r.bbpTimeMs.toFixed(3)
        ]);
      });
      const colWidths = header.map((_, i) => Math.max(...rows.map((r) => r[i].length)));
      const lines = rows.map((r) => r.map((cell, i) => cell.padStart(colWidths[i])).join(" | "));
      const outputStr = lines.join("\n");
      if (outFile) fs.writeFileSync(outFile, outputStr);
      else console.log(outputStr);
    } else if (outType === "csv") {
      const lines = ["size,spigotTimeMs,chudnovskyTimeMs,bbpTimeMs"];
      results.forEach((r) => {
        lines.push(
          `${r.size},${r.spigotTimeMs.toFixed(3)},${r.chudnovskyTimeMs.toFixed(3)},${r.bbpTimeMs.toFixed(3)}`
        );
      });
      const outputStr = lines.join("\n");
      if (outFile) fs.writeFileSync(outFile, outputStr);
      else console.log(outputStr);
    } else if (outType === "png") {
      const width = 800;
      const height = 600;
      const margin = 50;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin, height - margin);
      ctx.moveTo(margin, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.stroke();

      const times1 = results.map((r) => r.spigotTimeMs);
      const times2 = results.map((r) => r.chudnovskyTimeMs);
      const times3 = results.map((r) => r.bbpTimeMs);
      const minTime = Math.min(...times1, ...times2, ...times3);
      const maxTime = Math.max(...times1, ...times2, ...times3);
      function getX(i) { return sizes.length > 1 ? margin + (width - 2*margin)*(i/(sizes.length-1)) : margin + (width-2*margin)/2; }
      function getY(t) { return maxTime===minTime ? height-margin : margin + (height-2*margin)*(1 - (t-minTime)/(maxTime-minTime)); }

      ctx.strokeStyle = "red";
      ctx.beginPath();
      results.forEach((r, i) => {
        const x = getX(i);
        const y = getY(r.spigotTimeMs);
        i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      ctx.stroke();

      ctx.strokeStyle = "blue";
      ctx.beginPath();
      results.forEach((r, i) => { const x=getX(i), y=getY(r.chudnovskyTimeMs); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      ctx.strokeStyle = "green";
      ctx.beginPath();
      results.forEach((r, i) => { const x=getX(i), y=getY(r.bbpTimeMs); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); });
      ctx.stroke();

      // Legend
      ctx.fillStyle = "red"; ctx.fillRect(width-margin-150, margin, 10,10); ctx.fillStyle="black"; ctx.fillText("Spigot", width-margin-135, margin+10);
      ctx.fillStyle = "blue"; ctx.fillRect(width-margin-150, margin+20, 10,10); ctx.fillStyle="black"; ctx.fillText("Chudnovsky", width-margin-135, margin+30);
      ctx.fillStyle = "green"; ctx.fillRect(width-margin-150, margin+40, 10,10); ctx.fillStyle="black"; ctx.fillText("BBP", width-margin-135, margin+50);

      const buffer = canvas.toBuffer("image/png");
      const out = outFile || "benchmark.png";
      fs.writeFileSync(out, buffer);
    } else {
      console.error(`Unknown benchmark output type: ${outType}`);
      process.exit(1);
    }
    return;
  }

  const digits = parseInt(argv.digits, 10);
  const output = argv.output.toLowerCase();
  const file = argv.file;
  const diagnostics = argv.diagnostics;
  let pi;
  if (diagnostics) console.time("Compute time");
  if (algorithm === "spigot") pi = computePiSpigot(digits);
  else if (algorithm === "chudnovsky") pi = computePiChudnovsky(digits);
  else {
    console.error(`Unknown algorithm: ${algorithm}`);
    process.exit(1);
  }
  if (diagnostics) console.timeEnd("Compute time");

  if (output === "text") {
    if (file) fs.writeFileSync(file, pi);
    else console.log(pi);
  } else if (output === "png") {
    if (diagnostics) console.time("Render time");
    const fontSize = 20;
    const padding = 10;
    const width = pi.length * (fontSize * 0.6) + padding*2;
    const height = fontSize + padding*2;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillText(pi, padding, fontSize + padding/2);
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