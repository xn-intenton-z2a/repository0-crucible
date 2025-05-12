# Parallel Monte Carlo Sampling

Provide the ability to distribute Monte Carlo sampling across multiple worker threads to leverage multi-core CPUs and improve performance for large sample sizes.

# CLI Options

--workers <number>    Number of worker threads to use for Monte Carlo sampling. Defaults to number of logical CPU cores. When set to 1 sampling runs on the main thread.

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize workers as a numeric option.
2. In main() or in calculatePiMonteCarlo, detect when algorithm is montecarlo and options.workers > 1:
   a. Compute samplesPerWorker = Math.floor(samples / workers) and distribute any remainder across workers.
   b. Use Node's worker_threads module to spawn the specified number of workers, each receiving its sample count via workerData.
   c. In each worker script, run the Monte Carlo loop to count inside-circle points and postMessage the inside count back to the main thread.
   d. In the main thread, listen for messages from all workers, sum their inside counts and sample counts, then compute final π approximation: (totalInside / totalSamples) * 4.
   e. Handle worker errors or exits, falling back to single-threaded sampling if necessary.
3. Measure durationMs across thread creation, execution, and aggregation, then report result and diagnostics as usual.

# Testing

1. In tests/unit/main.test.js, mock worker_threads.Worker to simulate workers posting predetermined inside counts and ensure the main thread aggregates correctly.
2. Test fallback behavior when --workers=1 or when Worker threads are not supported, verifying single-threaded sampling path.
3. Validate that main([...]) with --workers spawns mock workers, aggregates counts, and console.log produces the correct numeric value or diagnostics object.
4. Simulate worker errors and verify error propagation or fallback logic.

# Documentation

1. Update docs/USAGE.md to document the --workers option under the Monte Carlo section with example usages:
   node src/lib/main.js --algorithm montecarlo --samples 1000000 --workers 4
2. Update README.md under Features to describe parallel Monte Carlo sampling and show performance improvements when using multiple workers.