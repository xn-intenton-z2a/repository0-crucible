# Overview

This feature introduces parallel computation for π digit calculations using Node.js worker_threads to leverage multicore processors. It divides the work across multiple threads, reducing total compute time for large digit counts while preserving result accuracy.

# CLI Interface

--threads <number>
    Specify the number of worker threads to use for π calculation (default: 1).
--no-threads
    Disable parallel execution and run computation on the main thread only.

# Implementation

- Import worker_threads from Node.js to enable parallel execution without additional dependencies.
- When handling --calculate-pi or --benchmark-pi: detect --threads and --no-threads flags.
  • If threads > 1, spawn the specified number of Worker instances, each assigned a range of series terms or digit blocks based on the Chudnovsky algorithm.
  • Each Worker computes its partial result and sends message to the main thread on completion.
  • The main thread collects partial results, merges them in correct sequence, and produces the final π digit string or benchmark metrics.
  • If threads <= 1 or --no-threads is present, execute existing single-threaded logic.
- Ensure proper error handling, thread cleanup, and graceful shutdown on signals or errors.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock the chudnovsky worker function to simulate parallel partial results; verify aggregated output matches single-threaded output.
  • Test invalid thread counts (zero, negative, non-integer) and expect process termination with nonzero status and descriptive error message.
  • Verify that --no-threads flag overrides --threads and runs on the main thread only.

# Documentation

- Update README.md under Features to document the --threads and --no-threads flags with example usage:
  node src/lib/main.js --calculate-pi 10000 --threads 4
- Include guidance on selecting an appropriate thread count based on available CPU cores and memory.