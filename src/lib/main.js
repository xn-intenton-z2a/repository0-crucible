#!/usr/bin/env node

import fs from "fs";
import { fileURLToPath } from "url";
import minimist from "minimist";
import Decimal from "decimal.js";
import { createCanvas } from "canvas";

function printHelpAndExit() {
  const help = [];
  help.push("Usage: node src/lib/main.js [options]");
  help.push("");
  help.push("General Options:");
  help.push("  -h, --help                   Show this help message and exit");
  help.push("  --file <path>                File path to save output (default: stdout)");
  help.push("");
  help.push("Algorithm Modes:");
  help.push("  --algorithm <spigot|chudnovsky|bbp>  Choose π algorithm (default: spigot)");
  help.push("  --digits <n>                 Number of decimal digits (default: 100)");
  help.push("  --hex-index <n>              Zero-based hex digit index for BBP mode");
  help.push("");
  help.push("Output Modes:");
  help.push("  --output <text|png>          Output format (default: text)");
  help.push("");
  help.push("Diagnostics Options:");
  help.push("  --diagnostics                Emit compute and render timing diagnostics");
  help.push("");
  help.push("Benchmarking Options:");
  help.push("  --benchmark-sizes <list>     Comma-separated list of digit counts to benchmark");
  help.push("  --benchmark-output <text|csv|png>  Format for benchmark report (default: text)");
  help.push("  --benchmark-file <path>      File path to save benchmark report/chart");
  help.push("");
  help.push("Examples:");
  help.push("  node src/lib/main.js --algorithm spigot --digits 20");
  help.push("  node src/lib/main.js --algorithm chudnovsky --digits 50 --output png --file pi.png");
  help.push("  node src/lib/main.js --algorithm bbp --hex-index 1");
  help.push("  node src/lib/main.js --benchmark-sizes 10,100");
  help.push("  node src/lib/main.js --benchmark-sizes 50,200 --benchmark-output csv --benchmark-file report.csv");
  help.push("  node src/lib/main.js --benchmark-sizes 100,500 --benchmark-output png --benchmark-file performance.png");
  console.log(help.join("\n"));
  process.exit(0);
}

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
  if (result[0] === "0") result = result.slice(1);
  return result[0] + "." + result.slice(1, digits);
}

function factorialBig(n) {
  let result = 1n;
  for (let i = 1n; i <= n; i++) result *= i;
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
    if (term.abs().lt(tolerance)) break;
    k++;
  }

  const pi = C.div(sum);
  return pi.toFixed(digits - 1);
}

export function computePiBBP(index) {
  if (!Number.isInteger(index) || index < 0) {
    throw new Error("Index must be a non-negative integer");
  }
  if (index === 0) return "3";
  const n = index - 1;
  function modPow(a, e, mod) {
    let res = 1;
    let base = a % mod;
    let exp = e;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  }
  function series(j) {
    let sum = 0;
    for (let k = 0; k <= n; k++) sum += modPow(16, n - k, 8 * k + j) / (8 * k + j);
    sum -= Math.floor(sum);
    for (let k = n + 1; k <= n + 100; k++) sum += Math.pow(16, n - k) / (8 * k + j);
    return sum - Math.floor(sum);
  }
  const raw = 4 * series(1) - 2 * series(4) - series(5) - series(6);
  const frac = raw - Math.floor(raw);
  const digit = Math.floor(frac * 16);
  return digit.toString(16).toUpperCase();
}

export function main(args) {
  const argv = minimist(args, {
    boolean: ["help", "h", "diagnostics"],
    alias: { h: "help" },
    string: [
      "algorithm",
      "digits",
      "hex-index",
      "output",
      "file",
      "benchmark-sizes",
      "benchmark-output",
      "benchmark-file"
    ],
    default: { algorithm: "spigot", digits: 100, output: "text", diagnostics: false }
  });

  if (argv.help) printHelpAndExit();
  const algo = argv.algorithm.toLowerCase();

  if (algo === "bbp") {
    const idx = parseInt(argv["hex-index"], 10);
    if (isNaN(idx) || idx < 0) { console.error("Invalid or missing hex-index for BBP algorithm"); process.exit(1); }
    const hex = computePiBBP(idx);
    if (argv.file) fs.writeFileSync(argv.file, hex);
    else console.log(hex);
    return;
  }

  if (argv["benchmark-sizes"]) {
    const sizes = argv["benchmark-sizes"].split(",").map((s) => parseInt(s, 10)).filter((n) => !isNaN(n));
    const results = sizes.map((size) => {
      const [s1, n1] = process.hrtime(); computePiSpigot(size);
      const d1 = process.hrtime([s1, n1]); const sp = d1[0] * 1000 + d1[1] / 1e6;
      const [s2, n2] = process.hrtime(); computePiChudnovsky(size);
      const d2 = process.hrtime([s2, n2]); const ch = d2[0] * 1000 + d2[1] / 1e6;
      const [s3, n3] = process.hrtime(); computePiBBP(size);
      const d3 = process.hrtime([s3, n3]); const bb = d3[0] * 1000 + d3[1] / 1e6;
      return { size, spigotTimeMs: sp, chudnovskyTimeMs: ch, bbpTimeMs: bb };
    });
    const type = (argv["benchmark-output"] || "text").toLowerCase();
    const fileOut = argv["benchmark-file"];
    if (type === "text") {
      const hdr = ["size","spigotTimeMs","chudnovskyTimeMs","bbpTimeMs"];
      const rows = [hdr, ...results.map(r => [r.size.toString(), r.spigotTimeMs.toFixed(3), r.chudnovskyTimeMs.toFixed(3), r.bbpTimeMs.toFixed(3)])];
      const widths = hdr.map((_, i) => Math.max(...rows.map(r => r[i].length)));
      const lines = rows.map(r => r.map((c,i) => c.padStart(widths[i])).join(" | "));
      const out = lines.join("\n"); if (fileOut) fs.writeFileSync(fileOut, out); else console.log(out);
    } else if (type === "csv") {
      const lines = ["size,spigotTimeMs,chudnovskyTimeMs,bbpTimeMs", ...results.map(r => `${r.size},${r.spigotTimeMs.toFixed(3)},${r.chudnovskyTimeMs.toFixed(3)},${r.bbpTimeMs.toFixed(3)}`)];
      const out = lines.join("\n"); if (fileOut) fs.writeFileSync(fileOut, out); else console.log(out);
    } else if (type === "png") {
      const w=800,h=600,m=50; const cv=createCanvas(w,h),ct=cv.getContext("2d");
      ct.fillStyle="white";ct.fillRect(0,0,w,h);
      ct.strokeStyle="black";ct.beginPath();ct.moveTo(m,m);ct.lineTo(m,h-m);ct.moveTo(m,h-m);ct.lineTo(w-m,h-m);ct.stroke();
      const t1=results.map(r=>r.spigotTimeMs), t2=results.map(r=>r.chudnovskyTimeMs), t3=results.map(r=>r.bbpTimeMs);
      const mn=Math.min(...t1,...t2,...t3), mx=Math.max(...t1,...t2,...t3);
      const getX=i=>m + (w-2*m)*(sizes.length>1? i/(sizes.length-1):0.5);
      const getY=t=> mn===mx? h-m: m + (h-2*m)*(1 - (t-mn)/(mx-mn));
      [[t1,"red","Spigot"],[t2,"blue","Chudnovsky"],[t3,"green","BBP"]].forEach(([arr,c,label])=>{ct.strokeStyle=c;ct.beginPath();arr.forEach((v,i)=>{const x=getX(i),y=getY(v);i===0?ct.moveTo(x,y):ct.lineTo(x,y)});ct.stroke();});
      ["red","blue","green"].forEach((col,i)=>{ct.fillStyle=col;ct.fillRect(w-m-150,m+20*i,10,10);ct.fillStyle="black";ct.fillText(["Spigot","Chudnovsky","BBP"][i],w-m-135,m+10+20*i)});
      fs.writeFileSync(fileOut||"benchmark.png",cv.toBuffer("image/png"));
    } else { console.error(`Unknown benchmark output type: ${type}`); process.exit(1);}  
    return;
  }

  const digits = parseInt(argv.digits,10);
  const output = argv.output.toLowerCase();
  const diagnostics = argv.diagnostics;
  let pi;
  if (diagnostics) console.time("Compute time");
  if (algo === "spigot") pi = computePiSpigot(digits);
  else if (algo === "chudnovsky") pi = computePiChudnovsky(digits);
  else { console.error(`Unknown algorithm: ${algo}`); process.exit(1);}  
  if (diagnostics) console.timeEnd("Compute time");

  if (output === "text") { console.log(pi); }
  else if (output === "png") {
    if (diagnostics) console.time("Render time");
    const fsz=20,p=10;
    const w=pi.length*fsz*0.6+p*2;
    const h=fsz+p*2;
    const cv=createCanvas(w,h),ct=cv.getContext("2d");
    ct.fillStyle="white";ct.fillRect(0,0,w,h);
    ct.fillStyle="black";ct.font=`${fsz}px sans-serif`;ct.fillText(pi,p,fsz+p/2);
    fs.writeFileSync(argv.file||"pi.png",cv.toBuffer("image/png"));
    if (diagnostics) console.timeEnd("Render time");
  } else { console.error(`Unknown output type: ${output}`); process.exit(1);}  
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
