# Overview

Consolidate all π calculation methods under a unified feature and introduce an automatic selection mode. Support five high-precision and sampling algorithms plus an `auto` option that delegates algorithm choice based on user parameters. This simplifies dispatch logic so both CLI and HTTP API use a shared helper for algorithm invocation and diagnostics.

# Implementation

1. Dependencies
   • Ensure `decimal.js` is listed in package.json for high-precision algorithms. No additional libraries required.

2. Algorithm Functions
   • calculatePiLeibniz(digits): existing Leibniz series implementation.
   • calculatePiMonteCarlo(samples): existing Monte Carlo sampling implementation.
   • calculatePiChudnovsky(digits): existing Chudnovsky fallback or full series if extended.
   • calculatePiRamanujanSato(opts): existing Ramanujan–Sato implementation with level, errorTolerance, maxIterations parameters.
   • calculatePiGaussLegendre(digits): existing Gauss–Legendre implementation based on decimal.js.

3. Automatic Selection
   • Extend CLIOptionsSchema and ApiParamsSchema to include `auto` in the allowed algorithm enum.
   • Introduce a helper function `dispatchAlgo(params)` that returns an object with fields: `requested`, `resolved`, `result`, and metadata (`iterations`, `samplesUsed`, `level`, `errorTolerance`).
   • When algorithm is `auto`, apply heuristics:
     – If digits ≥ 50: choose `chudnovsky`.
     – Else if digits ≥ 10: choose `gauss-legendre`.
     – Else if samples > 10000: choose `montecarlo`.
     – Else: choose `leibniz`.

4. CLI Integration
   • In `src/lib/main.js`, modify the Zod `CLIOptionsSchema` to include `auto` and add `dispatchAlgo` invocation in main().
   • Replace existing per-algorithm branches with a call to `dispatchAlgo({digits,algorithm,samples,level,maxIterations,errorTolerance,diagnostics})`.
   • When `--diagnostics` is set, log the full dispatch output including both `requested` and `resolved` algorithm fields.

5. HTTP API Integration
   • In `createApp()`, extend `ApiParamsSchema` to accept `auto`.
   • Replace `/pi` handler logic with a call to `dispatchAlgo(params)` and return JSON: if `diagnostics=true`, return full dispatch object; otherwise return `{ result }`.

6. Backward Compatibility
   • Preserve existing behavior when algorithm is explicitly set to a known method.
   • Fail-fast on invalid algorithm strings via Zod.

# Testing

1. Unit Tests (`tests/unit/main.test.js`)
   • Add tests for `dispatchAlgo` with algorithm `auto` at various thresholds to confirm correct resolution.
   • Verify that dispatch output includes both `requested` and `resolved` fields and appropriate metadata.

2. Existing Algorithm Tests
   • Retain tests for each individual calculation function (Leibniz, Monte Carlo, Chudnovsky, Ramanujan–Sato, Gauss–Legendre).

3. CLI Tests
   • Test `main(["--algorithm","auto","--digits",X])` produces correct result matching the resolved algorithm.
   • Test diagnostics output for `--algorithm auto --diagnostics` includes `resolved` property.

4. HTTP Tests (`tests/unit/server.test.js`)
   • GET `/pi?algorithm=auto&digits=2` returns result matching `leibniz`.
   • GET `/pi?algorithm=auto&digits=20&diagnostics=true` returns JSON with both `requested: "auto"` and `resolved: "gauss-legendre"`.

# Documentation

1. docs/USAGE.md
   • Under **Algorithms**, add `auto`: automatic selection with heuristics and examples.
2. README.md
   • Under **Features**, update **π Calculation** to list `auto` option and its resolution heuristics.
   • Provide CLI and HTTP examples for auto mode:
     - `node src/lib/main.js --algorithm auto --digits 3`
     - `curl "http://localhost:3000/pi?algorithm=auto&digits=3&diagnostics=true"`
