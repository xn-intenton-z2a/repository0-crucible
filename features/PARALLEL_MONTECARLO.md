# Overview

Introduce parallel Monte Carlo sampling using Node.js worker_threads to divide sampling work across multiple threads or CPU cores. This enhancement speeds up Monte Carlo π calculations for large sample counts, leveraging parallelism to reduce wall-clock time without changing result accuracy.

# Implementation

1. Worker Thread Pool
   • Use the built-in worker_threads module; spawn a pool of workers equal to the number of CPU cores or a configured value.
   • In the main thread, split the total sample count into roughly equal chunks per worker.
   • Each worker runs a lightweight script that performs Monte Carlo sampling for its assigned chunk and returns its count of points inside the unit circle.

2. Parallel Calculation Function
   • Add calculatePiMonteCarloParallel(samples, workers) that:
     - Determines workerCount from the --workers CLI option or WORKER_COUNT env var or falls back to os.cpus().length.
     - Divides samples among workers.
     - Uses Promise.all to dispatch work and collect individual inside counts.
     - Aggregates inside counts, computes π using totalInside / samples * 4, and returns the result.
   • Fallback: if worker_threads is unavailable or workers set to 1, call existing calculatePiMonteCarlo sequentially.

3. CLI Integration
   • Extend CLIOptionsSchema to include:
     - parallel: z.boolean().default(false) to enable parallel sampling explicitly.
     - workers: z.number().int().positive().optional() for number of worker threads.
   • In main(), when algorithm is montecarlo and parallel flag is true, call calculatePiMonteCarloParallel(samples, workers) instead of calculatePiMonteCarlo.

4. HTTP API Integration
   • In ApiParamsSchema, add parallel and workers parameters similar to CLI, defaulting to false and undefined.
   • In GET /pi handler, when algorithm is montecarlo and parallel is true, invoke the parallel function; preserve diagnostics flags.

5. Failure and Fallback
   • Wrap worker creation and messaging in try/catch; on failure, log a warning and fall back to sequential sampling without failing the request or CLI invocation.

# Testing

1. Unit Tests in tests/unit/main.test.js:
   - Mock worker_threads Worker to simulate inside counts; verify calculatePiMonteCarloParallel splits samples correctly and aggregates counts.
   - Test fallback path by mocking worker_threads absence or forcing workers=1, confirming result matches sequential calculatePiMonteCarlo.
   - CLI tests: spy on calculatePiMonteCarloParallel when --parallel flag is passed.

2. HTTP Tests in tests/unit/server.test.js:
   - Mock worker_threads in the createApp context; request GET /pi?algorithm=montecarlo&samples=1000&parallel=true&workers=4 and verify the response body result matches expected aggregated calculation.
   - Error handling test: simulate worker failure and confirm HTTP response returns correct π via sequential fallback with a warning logged.

# Documentation

1. docs/USAGE.md:
   • Add options under **Options**:
     - `--parallel` (boolean) enable parallel Monte Carlo sampling (default: false).
     - `--workers <number>` number of worker threads to use (default: number of CPU cores).
   • Show CLI example with parallel sampling.

2. README.md:
   • Under **Features**, add **Parallel Monte Carlo** describing use of multiple threads for faster sampling and example usage.