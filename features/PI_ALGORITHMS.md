# Overview

Consolidate all π calculation methods and introduce automatic selection mode under a unified feature. Support five high-precision and sampling algorithms plus an `auto` algorithm that chooses the best method based on user-provided parameters. Simplify dispatcher logic so both CLI and HTTP API use a single entry point for algorithm choice.

# Implementation

1. Dependencies
   • Ensure `decimal.js` is listed in package.json. No additional new libraries required.

2. Algorithm Functions
   • calculatePiLeibniz(digits): unchanged.
   • calculatePiMonteCarlo(samples): unchanged.
   • calculatePiChudnovsky(digits): implement true series using Decimal until term < 10^(-digits).
   • calculatePiRamanujanSato(opts): support `level`, `maxIterations`, `errorTolerance` parameters with Decimal and BigInt per RAMANUJAN_SATO guidelines.
   • calculatePiGaussLegendre(digits): implement iteration until |a−b|<10^(−digits) with precision bits computed from digits.

3. Automatic Selection
   • Extend allowed algorithm values to include `auto` in Zod schemas and minimist enums.
   • In dispatcher (CLI main and `/pi` handler), detect `algorithm === "auto"` and apply heuristics:
     – If digits >= 50 → `chudnovsky`.
     – Else if digits >= 10 → `gauss-legendre`.
     – Else if `samples` provided and samples > 10000 → `montecarlo`.
     – Else → `leibniz`.
   • When diagnostics enabled, include both `auto` and resolved `algorithm` fields in output.

4. Dispatcher Refactor
   • Extract shared logic for parameter parsing and algorithm invocation into a helper dispatchAlgo(params) returning `{ name, result, meta }`.
   • Use dispatchAlgo in both CLI and HTTP routes, passing `diagnostics` flag to control response shape.

# Testing

1. Unit tests in `tests/unit/main.test.js`
   • New tests for `auto` algorithm matching outputs for known thresholds.
   • Retain existing tests for individual algorithms.
   • Mock Decimal precision errors to validate fallback.

2. HTTP tests in `tests/unit/server.test.js`
   • GET `/pi?algorithm=auto&digits=2` returns same result as `leibniz`.
   • GET `/pi?algorithm=auto&digits=20&diagnostics=true` includes selected algorithm `gauss-legendre`.

# Documentation

1. docs/USAGE.md
   • Under **Algorithms**, add `auto` description and examples.

2. README.md
   • Under **Features**, update **π Calculation** to list `auto` option and its heuristics.
   • Provide CLI and HTTP examples demonstrating automatic selection.