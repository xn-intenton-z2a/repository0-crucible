# SEEDABLE_MONTECARLO

## Overview

Introduce an optional seed parameter for the Monte Carlo π calculation to produce deterministic and reproducible results. Users can supply a seed string or number via CLI or HTTP API, enabling consistent pseudo-random sequences across runs, which improves testability, debugging, and scientific reproducibility.

## Implementation

1. Add Dependency
   • Install `seedrandom` via npm and add it to dependencies.

2. Extend Monte Carlo Function
   • Update `calculatePiMonteCarlo(samples, seed?)` signature to accept an optional `seed`.
   • When a `seed` is provided, initialize a local RNG using `const rng = seedrandom(seed)`; otherwise use `Math.random`.
   • Replace direct calls to `Math.random()` with `rng()` when seeded.

3. CLI Integration (`main()` in `src/lib/main.js`)
   • Add a new string option `--seed` to minimist configuration and include it in the Zod `CLIOptionsSchema` as an optional string.
   • Pass `opts.seed` into calls to `calculatePiMonteCarlo` when invoking the algorithm.
   • When `--diagnostics` is enabled, include the `seed` value in the diagnostics output object.

4. HTTP API Integration (`/pi` endpoint in `createApp()`)
   • Extend the Zod `ApiParamsSchema` to accept an optional `seed` parameter of type string.
   • In the `/pi` handler, extract `seed` from `params` and pass it to `calculatePiMonteCarlo` when `algorithm === "montecarlo"`.
   • Include `seed` in the JSON diagnostics response if provided.

## Testing

1. Unit Tests (`tests/unit/main.test.js`)
   • Write tests that call `calculatePiMonteCarlo(samples, seed)` twice with the same seed and assert identical outputs.
   • Verify that different seeds produce different results with high probability.
   • Test behavior when `seed` is omitted to ensure results fall in plausible range (unchanged behavior).

2. HTTP API Tests (`tests/unit/server.test.js`)
   • Add tests for `GET /pi?algorithm=montecarlo&samples=10000&seed=abc` and assert two consecutive requests return the same JSON result field.
   • Confirm that omitting `seed` results in non-deterministic output within a valid range.

## Documentation

1. docs/USAGE.md
   • Under **Options**, document the new `--seed <string>` flag and the equivalent `seed` query parameter for HTTP API.
   • Provide CLI example:
     node src/lib/main.js --algorithm montecarlo --samples 100000 --seed mySeed123
   • Provide HTTP example:
     curl "http://localhost:3000/pi?algorithm=montecarlo&samples=100000&seed=serverSeed"

2. README.md
   • Under **Features**, add **Seedable Monte Carlo** with a brief description and usage examples.
