# PI_ALGORITHMS

---
This feature aligns with the project mission defined in [MISSION.md](../MISSION.md)
---

# Overview

Consolidate all π calculation methods under a unified dispatch layer, streamline both CLI and HTTP logic, and introduce an `auto` algorithm selection mode based on user parameters. This reduces duplication and ensures consistent behavior across interfaces.

# Implementation

1. **Dispatch Helper**
   • Create `dispatchAlgo(params)` in `src/lib/main.js` that takes an object with fields: `digits`, `algorithm`, `samples`, `level`, `maxIterations`, `errorTolerance`, `diagnostics`.
   • Return an object: `{ requested, resolved, result, durationMs, metadata }` where:
     - `requested`: original algorithm string.
     - `resolved`: actual algorithm used (auto mode resolves to one of the five methods).
     - `metadata`: includes iterations, samplesUsed, level, errorTolerance as applicable.

2. **Automatic Selection**
   • Support `auto` in both CLIOptionsSchema and ApiParamsSchema enum alongside existing methods.
   • Heuristics for `auto`:
     - `digits >= 50` → `chudnovsky`
     - `digits >= 10` → `gauss-legendre`
     - `samples > 10000` → `montecarlo`
     - otherwise → `leibniz`

3. **Refactor CLI Integration**
   • In `main()`, replace per-algorithm branches with a single call to `dispatchAlgo(opts)`.
   • On `--diagnostics`, log full dispatch object; otherwise log `result`.

4. **Refactor HTTP API**
   • In `createApp()`, for `/pi`, replace current branching with `const output = dispatchAlgo({ ...params, diagnostics });`.
   • If diagnostics flag, return full output JSON; else return `{ result }`.

5. **Backward Compatibility**
   • Preserve existing behavior for explicit algorithm names.
   • Fail-fast on invalid algorithm via Zod.

# Testing

1. **Dispatch Tests** in `tests/unit/main.test.js`
   • Verify `dispatchAlgo` resolves correct algorithm for various `auto` thresholds.
   • Ensure returned object contains `requested`, `resolved`, `result`, `durationMs`, and correct metadata keys.
2. **CLI Tests**
   • Test `main(["--algorithm","auto","--digits",X])` produces expected result matching resolved algorithm.
   • Test diagnostic output for `auto` includes both `requested` and `resolved`.
3. **HTTP Tests** in `tests/unit/server.test.js`
   • GET `/pi?algorithm=auto&digits=3` returns correct JSON: `{ result }`.
   • GET `/pi?algorithm=auto&digits=20&diagnostics=true` returns `{ requested:"auto", resolved:"gauss-legendre", ... }`.

# Documentation

1. **docs/USAGE.md**
   • Under **Algorithms**, document `auto` option and heuristics, with examples for CLI and HTTP.
2. **README.md**
   • Under **Features** update π Calculation section to list `auto` and describe automatic dispatch.