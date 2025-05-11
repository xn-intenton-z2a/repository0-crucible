# Overview

Enhance the existing algorithm selection feature by adding a third high-convergence option, the Ramanujan series algorithm, alongside Machin and Chudnovsky. This provides users with a faster alternative for medium-to-large digit counts and maintains parallel support for the Chudnovsky series.

# CLI Interface

Extend the existing flags:

--algorithm <machin|chudnovsky|ramanujan>   Choose π computation algorithm (default: machin)
--workers <n>                                Number of worker threads for parallel computation (default: 1)

Behavior:
• machin        : legacy Machin-like arctan formula (serial only)
• chudnovsky    : Chudnovsky series, supports parallel when workers > 1
• ramanujan     : Ramanujan rapidly convergent series (serial only; workers flag ignored)

# Implementation Details

• Refactor calculatePi to accept an options object with properties algorithm and workers.
• Implement calculatePiRamanujan(digits) using the Ramanujan series:
  – Compute terms of the Ramanujan formula: sum_{k=0..} (factorial(4k)*(1103+26390k))/(factorial(k)^4*396^(4k))
  – Multiply by constant 2*sqrt(2)/9801 and scale to required digits with rounding.
  – Stop when additional terms no longer affect the target precision.
• In the CLI entrypoint (src/lib/main.js):
  – Parse --algorithm and --workers flags into opts.algorithm and opts.workers.
  – Validate algorithm choice; on invalid value, print error and exit 1.
  – Validate workers is a positive integer up to CPU core count; if invalid, error and exit.
  – Dispatch computation:
    * machin      : calculatePiMachin(digits)
    * chudnovsky : if workers > 1, spawn worker threads for partial Chudnovsky terms; otherwise serial
    * ramanujan  : call calculatePiRamanujan(digits) regardless of workers

# Testing

• Unit tests in tests/unit/main.test.js or tests/unit/algorithm.test.js:
  – Mock small-digit outputs: verify calculatePi with algorithm ramanujan produces expected prefixes (e.g., first 5 digits).
  – Test option parsing: passing --algorithm ramanujan and --workers >1 computes serially without spawning threads.
  – Test invalid algorithm string and invalid workers values trigger clear error messages and exit(1).

• E2E tests in tests/e2e/cli.test.js:
  – Run CLI with --digits 50 --algorithm ramanujan and assert correct π string.
  – Run CLI with --digits 100 --algorithm chudnovsky --workers 2 to compare performance and accuracy.
  – Run CLI with unsupported algorithm (--algorithm foo) exits with error.

# Documentation

• Update README.md under Features:
  – Document the updated --algorithm choices including ramanujan and default values.
  – Note that --workers only affects chudnovsky.
  – Provide examples:
      node src/lib/main.js --digits 200 --algorithm ramanujan
      node src/lib/main.js --digits 500 --algorithm chudnovsky --workers 4
  – Describe trade-offs: Ramanujan converges fastest per term but serial only; Chudnovsky parallelizable for multi-core speed gains.