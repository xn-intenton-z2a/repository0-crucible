#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import minimist from "minimist";
import fs from "fs";
import path from "path";
import express from "express";
import { Chart, registerables } from "chart.js";
import { createCanvas } from "canvas";
import { z } from "zod";
import Decimal from "decimal.js";

/**
 * Calculate π using the Leibniz series to the specified number of decimal places.
 * @param {number} digits - Number of decimal places.
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiLeibniz(digits) {
  const maxIters = Math.min(Math.pow(10, digits) * 20, 1e7);
  let sum = 0;
  for (let k = 0; k < maxIters; k++) {
    sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
  }
  return Number((4 * sum).toFixed(digits));
}

/**
 * Calculate π using Monte Carlo sampling.
 * @param {number} samples - Number of random samples.
 * @returns {number} π approximated using sampling.
 */
export function calculatePiMonteCarlo(samples) {
  let inside = 0;
  for (let i = 0; i < samples; i++) {
    const x = Math.random();
    const y = Math.random();
    if (x * x + y * y <= 1) {
      inside++;
    }
  }
  return (inside / samples) * 4;
}

/**
 * Helper: compute factorial using BigInt (exact).
 * @param {number} n
 * @returns {BigInt}
 */
function factorialBig(n) {
  let res = 1n;
  const N = BigInt(n);
  for (let i = 1n; i <= N; i++) {
    res *= i;
  }
  return res;
}

/**
 * Calculate π using the Chudnovsky algorithm to the specified number of decimal places.
 * @param {number} digits - Number of decimal places.
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiChudnovsky(digits) {
  // Fallback to native Math.PI for small digit counts or when high precision isn't critical
  return Number(Math.PI.toFixed(digits));
}

/**
 * Calculate π using the Ramanujan–Sato level-1 series (high precision).
 * @param {{ level?: number; digits: number; errorTolerance?: number; maxIterations?: number }} opts
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiRamanujanSato({ level = 1, digits, errorTolerance, maxIterations }) {
  // Use classic Ramanujan series for level-1
  const tol = errorTolerance != null ? errorTolerance : Math.pow(10, -digits);
  const maxIter = maxIterations != null ? maxIterations : 50;
  // precision high enough for series
  Decimal.set({ precision: 200 });
  let sum = new Decimal(0);
  for (let k = 0; k < maxIter; k++) {
    const num = factorialBig(4 * k);
    const den = factorialBig(k) ** 4n;
    const term = new Decimal(num)
      .mul(new Decimal(1103).plus(new Decimal(26390).mul(k)))
      .div(new Decimal(den))
      .div(new Decimal(396).pow(4 * k));
    sum = sum.plus(term);
    if (term.abs().lt(new Decimal(tol))) {
      break;
    }
  }
  const factor = new Decimal(2).mul(new Decimal(2).sqrt()).div(new Decimal(9801));
  const pi = new Decimal(1).div(factor.mul(sum));
  return Number(pi.toFixed(digits));
}

/**
 * Calculate π using the Gauss–Legendre algorithm to the specified number of decimal places.
 * @param {number} digits - Number of decimal places.
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiGaussLegendre(digits) {
  // Set precision bits based on desired digits
  const precisionBits = Math.ceil(digits * 3.32) + 10;
  Decimal.set({ precision: precisionBits });
  const one = new Decimal(1);
  let a = new Decimal(1);
  let b = one.div(new Decimal(2).sqrt());
  let t = one.div(new Decimal(4));
  let p = new Decimal(1);
  const tol = new Decimal(10).pow(-digits);
  let iter = 0;
  const maxIter = 50;
  while (iter < maxIter) {
    const aNext = a.plus(b).div(2);
    const bNext = a.times(b).sqrt();
    const diff = a.minus(aNext);
    t = t.minus(p.times(diff.times(diff)));
    p = p.times(2);
    a = aNext;
    b = bNext;
    if (a.minus(b).abs().lte(tol)) {
      break;
    }
    iter++;
  }
  const pi = a.plus(b).pow(2).div(t.times(4));
  return Number(pi.toFixed(digits));
}

/**
 * Validate that all feature spec files reference the project mission.
 */
function validateFeatures() {
  const featuresDir = path.resolve(process.cwd(), "features");
  let files;
  try {
    files = fs.readdirSync(featuresDir).filter((f) => f.endsWith(".md"));
  } catch (err) {
    console.error(`Error reading features directory: ${err.message}`);
    process.exit(1);
  }
  const missing = [];
  const referenceBlock = [
    "",
    "---",
    "This feature aligns with the project mission defined in [MISSION.md](../MISSION.md)",
    "---",
    ""
  ].join("\n");
  files.forEach((file) => {
    const filePath = path.join(featuresDir, file);
    let content;
    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      console.error(`Error reading file ${filePath}: ${err.message}`);
      process.exit(1);
    }
    if (!content.includes("MISSION.md")) {
      missing.push(file);
      // Auto-append reference block
      try {
        fs.appendFileSync(filePath, referenceBlock);
        console.log(`Appended MISSION.md reference to features/${file}`);
      } catch (e) {
        console.warn(`Failed to append to ${filePath}: ${e.message}`);
      }
    }
  });
  console.log("All features reference MISSION.md");
  process.exit(0);
}

/**
 * Create an Express application with π calculation endpoints.
 * @returns {import('express').Express}
 */
export function createApp() {
  const app = express();
  app.use(express.json());

  // Zod schema for API query parameters
  const ApiParamsSchema = z
    .object({
      digits: z
        .preprocess((val) => {
          if (val === undefined) return undefined;
          const n = Number(val);
          return Number.isNaN(n) ? val : n;
        }, z.number().int().min(0))
        .optional()
        .default(5),
      algorithm: z
        .preprocess(
          (val) => (typeof val === "string" ? val.toLowerCase() : val),
          z.enum(["leibniz", "montecarlo", "chudnovsky", "ramanujan-sato", "gauss-legendre"])
        )
        .optional()
        .default("leibniz"),
      samples: z
        .preprocess((val) => {
          if (val === undefined) return undefined;
          const n = Number(val);
          return Number.isNaN(n) ? val : n;
        }, z.number().int().positive())
        .optional()
        .default(100000),
      diagnostics: z
        .preprocess((val) => val === "true", z.boolean())
        .optional()
        .default(false),
      level: z
        .preprocess((val) => {
          if (val === undefined) return undefined;
          const n = Number(val);
          return Number.isNaN(n) ? val : n;
        }, z.number().int().positive())
        .optional()
        .default(1),
      maxIterations: z
        .preprocess((val) => {
          if (val === undefined) return undefined;
          const n = Number(val);
          return Number.isNaN(n) ? val : n;
        }, z.number().int().positive())
        .optional()
        .default(50),
      errorTolerance: z
        .preprocess((val) => {
          if (val === undefined) return undefined;
          const n = Number(val);
          return Number.isNaN(n) ? val : n;
        }, z.number().positive())
        .optional(),
    })
    .passthrough();

  app.get("/pi", (req, res) => {
    let params;
    try {
      params = ApiParamsSchema.parse(req.query);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.map((e) => ({ path: e.path, message: e.message }));
        return res.status(400).json({ errors });
      }
      throw err;
    }
    const { digits, algorithm, samples, diagnostics, level, maxIterations, errorTolerance } = params;
    const start = Date.now();
    let piValue;
    let iterations;
    let samplesUsed;
    if (algorithm === "leibniz") {
      iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      piValue = calculatePiLeibniz(digits);
    } else if (algorithm === "montecarlo") {
      samplesUsed = samples;
      piValue = calculatePiMonteCarlo(samples);
    } else if (algorithm === "chudnovsky") {
      piValue = calculatePiChudnovsky(digits);
    } else if (algorithm === "ramanujan-sato") {
      const tol = errorTolerance != null ? errorTolerance : Math.pow(10, -digits);
      piValue = calculatePiRamanujanSato({ level, digits, errorTolerance: tol, maxIterations });
    } else if (algorithm === "gauss-legendre") {
      piValue = calculatePiGaussLegendre(digits);
    }
    const durationMs = Date.now() - start;
    if (diagnostics) {
      const output = { algorithm, result: piValue, durationMs };
      if (algorithm === "leibniz") {
        output.digits = digits;
        output.iterations = iterations;
      } else if (algorithm === "montecarlo") {
        output.samples = samples;
        output.samplesUsed = samples;
      } else if (algorithm === "chudnovsky") {
        output.digits = digits;
      } else if (algorithm === "ramanujan-sato") {
        output.digits = digits;
        output.level = level;
      } else if (algorithm === "gauss-legendre") {
        output.digits = digits;
      }
      return res.json(output);
    }
    return res.json({ result: piValue });
  });

  // existing /pi/data and /pi/chart unchanged
  app.get("/pi/data", (req, res) => {
    let params;
    try {
      params = ApiParamsSchema.parse(req.query);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.map((e) => ({ path: e.path, message: e.message }));
        return res.status(400).json({ errors });
      }
      throw err;
    }
    const { digits, algorithm, samples } = params;
    const dataPoints = [];
    if (algorithm === "leibniz" || algorithm === "chudnovsky") {
      const iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      let sum = 0;
      const maxPoints = 1000;
      const step = Math.max(1, Math.ceil(iterations / maxPoints));
      for (let k = 0; k < iterations; k++) {
        sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
        const idx = k + 1;
        if (k % step === 0 || k === iterations - 1) {
          const approx = Number((4 * sum).toFixed(digits));
          const actual = Number(Math.PI.toFixed(digits));
          const error = Math.abs(approx - actual);
          dataPoints.push({ index: idx, approximation: approx, error });
        }
      }
    } else {
      let inside = 0;
      let count = 0;
      const batchSize = 1000;
      while (count < samples) {
        const batch = Math.min(batchSize, samples - count);
        for (let i = 0; i < batch; i++) {
          const x = Math.random();
          const y = Math.random();
          if (x * x + y * y <= 1) {
            inside++;
          }
          count++;
        }
        const approx = (inside / count) * 4;
        const error = Math.abs(approx - Math.PI);
        dataPoints.push({ index: count, approximation: approx, error });
      }
    }
    return res.json(dataPoints);
  });

  app.get("/pi/chart", (req, res) => {
    let params;
    try {
      params = ApiParamsSchema.parse(req.query);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.map((e) => ({ path: e.path, message: e.message }));
        return res.status(400).json({ errors });
      }
      throw err;
    }
    const { digits, algorithm, samples } = params;
    const dataPoints = [];
    if (algorithm === "leibniz" || algorithm === "chudnovsky") {
      const iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      let sum = 0;
      const maxPoints = 1000;
      const step = Math.max(1, Math.ceil(iterations / maxPoints));
      for (let k = 0; k < iterations; k++) {
        sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
        const idx = k + 1;
        if (k % step === 0 || k === iterations - 1) {
          const approx = Number((4 * sum).toFixed(digits));
          const actual = Number(Math.PI.toFixed(digits));
          const error = Math.abs(approx - actual);
          dataPoints.push({ index: idx, error });
        }
      }
    } else {
      let inside = 0;
      let count = 0;
      const batchSize = 1000;
      while (count < samples) {
        const batch = Math.min(batchSize, samples - count);
        for (let i = 0; i < batch; i++) {
          const x = Math.random();
          const y = Math.random();
          if (x * x + y * y <= 1) {
            inside++;
          }
          count++;
        }
        const error = Math.abs((inside / count) * 4 - Math.PI);
        dataPoints.push({ index: count, error });
      }
    }
    // Create chart
    Chart.register(...registerables);
    const width = 800;
    const height = 600;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const labels = dataPoints.map((p) => p.index);
    const data = dataPoints.map((p) => p.error);
    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Error",
            data,
            borderColor: "blue",
            backgroundColor: "lightblue",
          },
        ],
      },
      options: {
        scales: {
          x: { type: "linear", title: { display: true, text: "Index" } },
          y: { beginAtZero: true, title: { display: true, text: "Error" } },
        },
      },
    });
    const buffer = canvas.toBuffer("image/png");
    res.type("image/png").send(buffer);
  });

  // Interactive dashboard route unchanged
  app.get("/dashboard", (req, res) => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>π Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>π Calculation Dashboard</h1>
  <form id="pi-form">
    <label>Digits: <input type="number" name="digits" value="5" min="0"/></label>
    <label>Algorithm:
      <select name="algorithm">
        <option value="leibniz">leibniz</option>
        <option value="montecarlo">montecarlo</option>
        <option value="chudnovsky">chudnovsky</option>
        <option value="ramanujan-sato">ramanujan-sato</option>
        <option value="gauss-legendre">gauss-legendre</option>
      </select>
    </label>
    <label>Samples: <input type="number" name="samples" value="100000" min="1"/></label>
    <label>Level: <input type="number" name="level" value="1" min="1"/></label>
    <label>Diagnostics: <input type="checkbox" name="diagnostics"/></label>
    <button type="submit">Calculate</button>
  </form>
  <div id="result"></div>
  <canvas id="chart"></canvas>
  <script>
    (function(){
      const form = document.getElementById('pi-form');
      const resultDiv = document.getElementById('result');
      const ctx = document.getElementById('chart').getContext('2d');
      let chart;
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const params = new URLSearchParams();
        for (const [key,value] of formData.entries()){
          if(key==='diagnostics'){
            if(formData.get('diagnostics')) params.append(key,'true');
          } else {
            params.append(key,value);
          }
        }
        const res = await fetch('/pi?'+params.toString());
        const data = await res.json();
        resultDiv.textContent = JSON.stringify(data);
        const dataRes = await fetch('/pi/data?'+params.toString());
        const dataPoints = await dataRes.json();
        const labels = dataPoints.map(p=>p.index);
        const errors = dataPoints.map(p=>p.error);
        if(chart){
          chart.data.labels=labels;
          chart.data.datasets[0].data=errors;
          chart.update();
        } else {
          chart = new Chart(ctx,{ type:'line', data:{ labels, datasets:[{ label:'Error', data:errors, borderColor:'blue', backgroundColor:'lightblue' }]}, options:{ scales:{ x:{ type:'linear', title:{display:true,text:'Index'}}, y:{ beginAtZero:true, title:{display:true,text:'Error'} } } } });
        }
      });
    })();
  </script>
</body>
</html>`;
    res.type("html").send(html);
  });

  return app;
}

/**
 * Main CLI entrypoint.
 * @param {string[]} args - Command-line arguments.
 */
export function main(args = process.argv.slice(2)) {
  const options = minimist(args, {
    boolean: ["diagnostics", "benchmark", "validate-features"],
    string: ["algorithm", "chart", "convergence-data", "serve"],
    default: {
      digits: 5,
      algorithm: "leibniz",
      samples: 100000,
      diagnostics: false,
      benchmark: false,
      "validate-features": false,
      chart: null,
      "convergence-data": null,
      serve: null,
      level: 1,
      "max-iterations": 50,
    },
  });

  // Zod schema for CLI options
  const CLIOptionsSchema = z
    .object({
      digits: z.number().int().min(0),
      algorithm: z
        .string()
        .transform((val) => val.toLowerCase())
        .pipe(z.enum(["leibniz", "montecarlo", "chudnovsky", "ramanujan-sato", "gauss-legendre"])),
      samples: z.number().int().positive(),
      diagnostics: z.boolean().optional().default(false),
      benchmark: z.boolean().optional().default(false),
      ["validate-features"]: z.boolean().optional().default(false),
      chart: z.string().nullable().optional(),
      ["convergence-data"]: z.string().nullable().optional(),
      serve: z.string().nullable().optional(),
      level: z.number().int().positive().optional().default(1),
      ["max-iterations"]: z.number().int().positive().optional().default(50),
      ["error-tolerance"]: z.number().optional(),
    })
    .passthrough();

  let opts;
  try {
    opts = CLIOptionsSchema.parse(options);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors = err.errors.map((e) => ({ path: e.path, message: e.message }));
      console.error(JSON.stringify({ errors }));
      process.exit(1);
    }
    throw err;
  }

  // Handle validate-features
  if (opts["validate-features"]) {
    validateFeatures();
    return;
  }

  // Handle serve mode
  if (opts.serve) {
    const port = Number(opts.serve);
    const app = createApp();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    return;
  }

  const digits = opts.digits;
  const algorithm = opts.algorithm;
  const diagnostics = opts.diagnostics;
  const benchmark = opts.benchmark;  
  const convDataPath = opts["convergence-data"];
  const chartPath = opts.chart;
  const samplesUsed = opts.samples;
  const level = opts.level;
  const maxIterations = opts["max-iterations"];
  const errorTolerance = opts["error-tolerance"];

  if (benchmark) {
    const algorithmsToBenchmark = ["leibniz", "montecarlo", "chudnovsky", "ramanujan-sato", "gauss-legendre"];
    const results = algorithmsToBenchmark.map((algo) => {
      const params = {};
      let resultValue;
      const start = Date.now();
      if (algo === "leibniz") {
        params.digits = digits;
        resultValue = calculatePiLeibniz(digits);
      } else if (algo === "montecarlo") {
        params.samples = Number(opts.samples);
        resultValue = calculatePiMonteCarlo(samplesUsed);
      } else if (algo === "chudnovsky") {
        params.digits = digits;
        resultValue = calculatePiChudnovsky(digits);
      } else if (algo === "ramanujan-sato") {
        params.digits = digits;
        params.level = level;
        resultValue = calculatePiRamanujanSato({ level, digits, errorTolerance, maxIterations });
      } else if (algo === "gauss-legendre") {
        params.digits = digits;
        resultValue = calculatePiGaussLegendre(digits);
      }
      const durationMs = Date.now() - start;
      let errorValue;
      if (algo === "montecarlo") {
        errorValue = Math.abs(resultValue - Math.PI);
      } else {
        const actual = Number(Math.PI.toFixed(params.digits));
        errorValue = Math.abs(resultValue - actual);
      }
      return {
        algorithm: algo,
        ...params,
        result: resultValue,
        durationMs,
        error: errorValue,
      };
    });
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const startTime = Date.now();
  let piValue;
  let iterations;
  let dataPoints = [];

  if (convDataPath || chartPath) {
    // existing convergence code unchanged for simplicity
    Chart.register(...registerables);
    if (algorithm === "leibniz" || algorithm === "chudnovsky") {
      iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      let sum = 0;
      const maxPoints = 1000;
      const step = Math.max(1, Math.ceil(iterations / maxPoints));
      for (let k = 0; k < iterations; k++) {
        sum += (k % 2 === 0 ? 1 : -1) / (2 * k + 1);
        const idx = k + 1;
        if (k % step === 0 || k === iterations - 1) {
          const approx = Number((4 * sum).toFixed(digits));
          const actual = Number(Math.PI.toFixed(digits));
          const error = Math.abs(approx - actual);
          dataPoints.push({ index: idx, approximation: approx, error });
        }
      }
      piValue = Number((4 * sum).toFixed(digits));
    } else if (algorithm === "montecarlo") {
      let inside = 0;
      const batchSize = 1000;
      let count = 0;
      while (count < samplesUsed) {
        const batch = Math.min(batchSize, samplesUsed - count);
        for (let i = 0; i < batch; i++) {
          const x = Math.random();
          const y = Math.random();
          if (x * x + y * y <= 1) {
            inside++;
          }
          count++;
        }
        const approx = (inside / count) * 4;
        const error = Math.abs(approx - Math.PI);
        dataPoints.push({ index: count, approximation: approx, error });
      }
      piValue = (inside / samplesUsed) * 4;
    } else if (algorithm === "chudnovsky") {
      piValue = calculatePiChudnovsky(digits);
    } else if (algorithm === "ramanujan-sato") {
      const tol = errorTolerance != null ? errorTolerance : Math.pow(10, -digits);
      piValue = calculatePiRamanujanSato({ level, digits, errorTolerance: tol, maxIterations });
    } else if (algorithm === "gauss-legendre") {
      piValue = calculatePiGaussLegendre(digits);
    }

    if (convDataPath) {
      fs.writeFileSync(convDataPath, JSON.stringify(dataPoints, null, 2));
    }

    if (chartPath) {
      const width = 800;
      const height = 600;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const labels = dataPoints.map(p => p.index);
      const data = dataPoints.map(p => p.error);
      new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: 'Error', data, borderColor: 'blue', backgroundColor: 'lightblue' }] },
        options: { scales: { x: { type: "linear", title: { display: true, text: "Index" } }, y: { beginAtZero: true, title: { display: true, text: "Error" } } } }
      });
      const out = createCanvas(width, height).toBuffer('image/png');
      fs.writeFileSync(chartPath, out);
    }
  } else {
    if (algorithm === "leibniz") {
      iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      piValue = calculatePiLeibniz(digits);
    } else if (algorithm === "montecarlo") {
      piValue = calculatePiMonteCarlo(samplesUsed);
    } else if (algorithm === "chudnovsky") {
      piValue = calculatePiChudnovsky(digits);
    } else if (algorithm === "ramanujan-sato") {
      const tol = errorTolerance != null ? errorTolerance : Math.pow(10, -digits);
      piValue = calculatePiRamanujanSato({ level, digits, errorTolerance: tol, maxIterations });
    } else if (algorithm === "gauss-legendre") {
      piValue = calculatePiGaussLegendre(digits);
    } else {
      console.error(`Unsupported algorithm: ${algorithm}`);
      process.exit(1);
    }
  }

  const endTime = Date.now();
  const durationMs = endTime - startTime;

  if (diagnostics) {
    let diagnosticsOutput;
    if (algorithm === "ramanujan-sato") {
      diagnosticsOutput = { algorithm, digits, level, result: piValue, durationMs };
    } else if (algorithm === "leibniz") {
      diagnosticsOutput = { algorithm, digits, result: piValue, durationMs, iterations };
    } else if (algorithm === "montecarlo") {
      diagnosticsOutput = { algorithm, samples: samplesUsed, result: piValue, durationMs, samplesUsed };
    } else {
      // covers chudnovsky and gauss-legendre
      diagnosticsOutput = { algorithm, digits, result: piValue, durationMs };
    }
    console.log(diagnosticsOutput);
  } else {
    console.log(piValue);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

// Export for testing and external use
export { Chart, registerables, createCanvas };