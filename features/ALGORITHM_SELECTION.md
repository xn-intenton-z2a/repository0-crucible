# Overview
Add support for selecting between multiple π calculation algorithms at runtime and enable parallel computation for the Chudnovsky series using worker threads.

# CLI Interface
Extend main(args) to accept the following flags together with existing flags:

--algorithm <machin|chudnovsky>    Choose the π computation algorithm (default: machin)
--workers <n>                       Number of worker threads for parallel calculation (default: 1)

Behavior
• When algorithm is chudnovsky and workers is greater than 1, split series computation across the specified number of workers and combine results.
• Ensure workers value is a positive integer up to the number of logical CPU cores.
• When workers is 1 or algorithm is machin, perform serial calculation.

# Implementation Details
In src/lib/main.js and helper modules
• Refactor calculatePi to accept options object with algorithm and workers properties.
• Define a mapping for supported algorithms: machin, chudnovsky.
• For machin algorithm, reuse existing Machin-like formula implementation.
• Implement calculatePiChudnovsky(digits, options):
  • Determine series term count required for desired digits.
  • If options.workers is greater than 1, use node worker_threads to spawn the given number of worker threads, each computing a portion of the series terms. Use MessageChannel or parentPort to send partial sums back.
  • If options.workers is 1, run the Chudnovsky series in the main thread.
  • After collecting all partial sums, combine BigInt results and apply rounding and scaling logic as in current implementation.
• Validate options.workers and throw an error for invalid values.
• Update benchmarkPi to accept and forward workers option into algorithm executions and include workers count in benchmark result objects.
• Update HTTP API handlers for /pi and /benchmark to parse and validate algorithm and workers query parameters using zod schemas.

# Testing
Unit Tests in tests/unit/main.test.js
• Test calculatePi with algorithm option: default machin and explicit chudnovsky produce expected prefixes for small digits.
• Mock worker_threads to simulate parallel computation: verify that parentPort is used, correct number of workers are spawned, and partial results are combined correctly.
• Validate error handling for unsupported algorithm values and invalid workers values.

E2E Tests in tests/e2e/cli.test.js
• Invoke CLI with --digits 5 --algorithm chudnovsky --workers 2 and assert output matches π to 5 decimal places and that parallel mode does not degrade accuracy.
• Invoke CLI with workers set to 1 and compare performance and output against default behavior.

# Documentation
Update README.md
• Document the --algorithm and --workers flags together.
• Provide examples for serial and parallel computations:
    node src/lib/main.js --digits 100 --algorithm chudnovsky --workers 4
    node src/lib/main.js --digits 50 --algorithm machin
• Note performance considerations, recommended worker counts, and fallbacks when workers is not supported.