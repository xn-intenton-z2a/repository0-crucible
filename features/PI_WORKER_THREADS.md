# Overview
Add support for parallelizing π computation using Node.js worker_threads. Distribute series term computations across multiple threads to improve performance on large digit counts.

# Functional Requirements
- Extend calculatePi to accept an optional parameter threads (integer ≥1, default 1).
- When threads >1:
  - Partition the series iteration range among the specified number of worker threads.
  - Spawn a Worker for each partition using the worker_threads module and pass algorithm, digits, start, and end indices.
  - Each Worker computes its partial sum and posts the result back to the main thread.
  - The main thread aggregates partial sums and finalizes π computation according to the chosen algorithm.
- Provide an async function calculatePiParallel(digits, algorithm, threads) returning a Decimal instance representing π.
- Validate threads parameter to be a positive integer not exceeding the number of logical CPU cores.

# CLI Interface
- Add flag --threads <n> to src/lib/main.js.
- When specified, invoke calculatePiParallel with the threads parameter; otherwise default to single-threaded calculatePi.
- Example invocation:
  node src/lib/main.js --digits 10000 --algorithm chudnovsky --threads 4
- On invalid thread values exit with code non-zero and descriptive error message.

# Dependencies
- Import worker_threads from 'worker_threads'.
- No new external npm dependencies required.

# Testing
- Add unit tests in tests/unit/main.test.js:
  - Verify calculatePiParallel(digits, algorithm, 1) matches calculatePi(digits, algorithm).
  - Test calculatePiParallel for threads=2 and threads=4 on small digit counts (e.g. digits=10) for each algorithm.
  - Mock Worker to simulate message passing and verify correct aggregation of partial sums.
- Add CLI tests to confirm --threads flag parsing and error handling for invalid thread counts.