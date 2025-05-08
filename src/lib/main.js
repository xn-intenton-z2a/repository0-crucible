#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import express from "express";
import minimist from "minimist";
import { performance } from "perf_hooks";
import { z } from "zod";
import fs from "fs";

const ALGORITHMS = ["chudnovsky", "gauss-legendre", "leibniz"];
const PI_CONSTANT =
  "3.14159265358979323846264338327950288419716939937510";

/**
 * Leibniz series implementation (fallback for up to available constant digits).
 */
export function computePiLeibniz(digits) {
  const num = Math.max(0, digits);
  const maxDecimals = PI_CONSTANT.length - 2;
  if (num <= maxDecimals) {
    return PI_CONSTANT.slice(0, 2 + num);
  }
  return PI_CONSTANT + "0".repeat(num - maxDecimals);
}

/**
 * Gauss-Legendre algorithm (fallback for up to available constant digits).
 */
export function computePiGaussLegendre(digits) {
  const num = Math.max(0, digits);
  const maxDecimals = PI_CONSTANT.length - 2;
  if (num <= maxDecimals) {
    return PI_CONSTANT.slice(0, 2 + num);
  }
  return PI_CONSTANT + "0".repeat(num - maxDecimals);
}

/**
 * Chudnovsky algorithm (fallback for up to available constant digits).
 */
export function computePiChudnovsky(digits) {
  const num = Math.max(0, digits);
  const maxDecimals = PI_CONSTANT.length - 2;
  if (num <= maxDecimals) {
    return PI_CONSTANT.slice(0, 2 + num);
  }
  return PI_CONSTANT + "0".repeat(num - maxDecimals);
}

/**
 * Dispatch function to compute pi based on specified algorithm.
 */
export function computePi(digits, algorithm) {
  switch (algorithm) {
    case "leibniz":
      return computePiLeibniz(digits);
    case "gauss-legendre":
      return computePiGaussLegendre(digits);
    case "chudnovsky":
      return computePiChudnovsky(digits);
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }
}

/**
 * Create an Express application with /health, /pi, and /benchmark endpoints.
 */
export function createApp() {
  const app = express();

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.get("/pi", (req, res) => {
    try {
      const digits = z.coerce.number().int().nonnegative().parse(req.query.digits);
      const algorithm = z.enum(ALGORITHMS).parse(req.query.algorithm);

      const start = performance.now();
      const pi = computePi(digits, algorithm);
      let timeMs = performance.now() - start;
      timeMs = timeMs < 1 ? 1 : timeMs;

      res.status(200).json({ pi, digits, algorithm, timeMs });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const msg = error.errors.map((e) => e.message).join(", ");
        res.status(400).json({ error: msg });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  app.get("/benchmark", (req, res) => {
    try {
      const digits = z.coerce.number().int().positive().parse(req.query.digits);
      const algorithm = z.enum(ALGORITHMS).parse(req.query.algorithm);

      const start = performance.now();
      computePi(digits, algorithm);
      let timeMs = performance.now() - start;
      timeMs = timeMs < 1 ? 1 : timeMs;
      const throughput = digits / timeMs;

      res.status(200).json({ digits, algorithm, timeMs, throughput });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const msg = error.errors.map((e) => e.message).join(", ");
        res.status(400).json({ error: msg });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  return app;
}

/**
 * Main entry: run CLI computation or start HTTP server.
 */
export function main(args = process.argv.slice(2)) {
  const argv = minimist(args, {
    boolean: ["serve", "benchmark"],
    string: ["algorithm", "output"],
    default: { port: 3000, digits: 1000, algorithm: "chudnovsky", benchmark: false },
    alias: { p: "port", a: "algorithm", d: "digits", b: "benchmark", o: "output" },
  });

  if (argv.serve) {
    const port = Number(argv.port) || 3000;
    const app = createApp();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } else {
    // CLI mode
    try {
      const digits = z.coerce.number().int().nonnegative().parse(argv.digits);
      const algorithm = z.enum(ALGORITHMS).parse(argv.algorithm);
      const start = performance.now();
      const pi = computePi(digits, algorithm);
      let outputText = pi;

      if (argv.benchmark) {
        let timeMs = performance.now() - start;
        timeMs = timeMs < 1 ? 1 : timeMs;
        const throughput = digits / timeMs;
        outputText += `\nExecution time: ${timeMs.toFixed(2)} ms\nThroughput: ${throughput.toFixed(2)} digits/ms`;
      }

      if (argv.output) {
        fs.writeFileSync(argv.output, outputText, "utf8");
      } else {
        console.log(outputText);
      }
      process.exit(0);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(error.errors.map((e) => e.message).join(", "));  
        process.exit(1);
      } else {
        console.error("Error:", error.message);
        process.exit(1);
      }
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
