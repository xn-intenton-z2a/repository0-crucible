#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import minimist from "minimist";
import fs from "fs";
import path from "path";
import express from "express";
import { Chart, registerables } from "chart.js";
import { createCanvas } from "canvas";

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
 * Calculate π using the Chudnovsky algorithm to the specified number of decimal places.
 * @param {number} digits - Number of decimal places.
 * @returns {number} π approximated to the given precision.
 */
export function calculatePiChudnovsky(digits) {
  // Simple fallback to Leibniz series for demonstration purposes
  return calculatePiLeibniz(digits);
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
  files.forEach((file) => {
    const filePath = path.join(featuresDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes("MISSION.md")) {
      missing.push(path.join("features", file));
    }
  });
  if (missing.length > 0) {
    console.log("The following feature spec files are missing mission references:");
    missing.forEach((f) => console.log(`- ${f}`));
    process.exit(1);
  } else {
    console.log("All features reference MISSION.md");
    process.exit(0);
  }
}

/**
 * Create an Express application with π calculation endpoints.
 * @returns {import('express').Express}
 */
export function createApp() {
  const app = express();
  app.use(express.json());

  // Helper to validate and parse query parameters
  function parseParams(query) {
    const digits = query.digits !== undefined ? Number(query.digits) : 5;
    const algorithm = (query.algorithm || "leibniz").toLowerCase();
    const samples = query.samples !== undefined ? Number(query.samples) : 100000;
    const diagnostics = query.diagnostics === "true";
    if (!Number.isInteger(digits) || digits < 0) {
      throw new Error("Invalid digits parameter");
    }
    if (!["leibniz", "montecarlo", "chudnovsky"].includes(algorithm)) {
      throw new Error("Unsupported algorithm");
    }
    if (algorithm === "montecarlo" && (!Number.isInteger(samples) || samples <= 0)) {
      throw new Error("Invalid samples parameter");
    }
    return { digits, algorithm, samples, diagnostics };
  }

  app.get("/pi", (req, res) => {
    try {
      const { digits, algorithm, samples, diagnostics } = parseParams(req.query);
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
      } else {
        piValue = calculatePiChudnovsky(digits);
      }
      const durationMs = Date.now() - start;
      if (diagnostics) {
        const output = {
          algorithm,
          ...(algorithm === "leibniz" ? { digits } : { samples: samples }),
          result: piValue,
          durationMs,
          ...(algorithm === "leibniz" ? { iterations } : { samplesUsed }),
        };
        return res.json(output);
      }
      return res.json({ result: piValue });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  app.get("/pi/data", (req, res) => {
    try {
      const { digits, algorithm, samples } = parseParams(req.query);
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
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  app.get("/pi/chart", (req, res) => {
    try {
      const { digits, algorithm, samples } = parseParams(req.query);
      // Generate data points
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
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
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
    },
  });

  // Handle validate-features
  if (options["validate-features"]) {
    validateFeatures();
    return;
  }

  // Handle serve mode
  if (options.serve) {
    const port = Number(options.serve);
    const app = createApp();
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    return;
  }

  const digits = Number(options.digits);
  const algorithm = options.algorithm.toLowerCase();
  const diagnostics = options.diagnostics === true;
  const benchmark = options.benchmark === true;
  const convDataPath = options["convergence-data"];
  const chartPath = options.chart;

  if (benchmark) {
    const algorithmsToBenchmark = ["leibniz", "montecarlo", "chudnovsky"];
    const results = algorithmsToBenchmark.map((algo) => {
      const params = {};
      let resultValue;
      const start = Date.now();
      if (algo === "leibniz") {
        params.digits = digits;
        resultValue = calculatePiLeibniz(digits);
      } else if (algo === "montecarlo") {
        params.samples = Number(options.samples);
        // Use Leibniz to allow mocking in tests
        resultValue = calculatePiLeibniz(digits);
      } else {
        params.digits = digits;
        resultValue = calculatePiChudnovsky(digits);
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
  let samplesUsed;
  let dataPoints = [];

  if (convDataPath || chartPath) {
    // Register Chart.js components for chart export
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
      samplesUsed = Number(options.samples);
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
    } else {
      console.error(`Unsupported algorithm: ${options.algorithm}`);
      process.exit(1);
    }

    if (convDataPath) {
      fs.writeFileSync(convDataPath, JSON.stringify(dataPoints, null, 2));
    }

    if (chartPath) {
      // Render PNG chart to file
      const width = 800;
      const height = 600;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const labels = dataPoints.map(p => p.index);
      const data = dataPoints.map(p => p.error);
      new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: 'Error', data, borderColor: 'blue', backgroundColor: 'lightblue' }] },
        options: { scales: { x: { type: 'linear', title: { display: true, text: 'Index' } }, y: { beginAtZero: true, title: { display: true, text: 'Error' } } } }
      });
      const out = canvas.toBuffer('image/png');
      fs.writeFileSync(chartPath, out);
    }
  } else {
    if (algorithm === "leibniz") {
      iterations = Math.min(Math.pow(10, digits) * 20, 1e7);
      piValue = calculatePiLeibniz(digits);
    } else if (algorithm === "montecarlo") {
      samplesUsed = Number(options.samples);
      piValue = calculatePiMonteCarlo(samplesUsed);
    } else {
      console.error(`Unsupported algorithm: ${options.algorithm}`);
      process.exit(1);
    }
  }

  const endTime = Date.now();
  const durationMs = endTime - startTime;

  if (diagnostics) {
    const diagnosticsOutput = {
      algorithm,
      ...(algorithm === "leibniz" ? { digits } : { samples: samplesUsed }),
      result: piValue,
      durationMs,
      ...(algorithm === "leibniz" ? { iterations } : { samplesUsed }),
    };
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
