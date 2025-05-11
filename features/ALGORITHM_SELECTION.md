# Overview

Unify and enhance π computation algorithm selection by providing real implementations for Ramanujan and Chudnovsky series algorithms, and support an automatic mode that chooses the optimal algorithm based on the requested digit count. Allow users to configure selection thresholds via environment variables or configuration file, improving performance and ease of use.

# CLI Interface

Extend the existing flags in src/lib/main.js:

--algorithm <auto|machin|ramanujan|chudnovsky>   Specify the algorithm to compute π. auto (default) selects the fastest method based on digit count.
--workers <n>                                    Number of worker threads for parallel Chudnovsky computation (default 1)
--auto-threshold-machin <n>                      Maximum digits to use the Machin formula in auto mode (default 50)
--auto-threshold-ramanujan <n>                   Maximum digits to use the Ramanujan series in auto mode (default 500)

# Implementation Details

In src/lib/main.js:

1. Implement calculatePiRamanujan(digits) using the Ramanujan rapidly convergent series: sum terms until additional terms no longer affect the target precision and format result to the requested decimal places.
2. Implement calculatePiChudnovsky(digits, workers) using the Chudnovsky series: compute terms in parallel when workers > 1 via worker_threads, or serially when workers equals 1.
3. Extend calculatePi(digits, options) to support algorithm auto: read thresholds from opts.autoThresholdMachin and opts.autoThresholdRamanujan or from environment variables AUTO_THRESHOLD_MACHIN and AUTO_THRESHOLD_RAMANUJAN; choose:
   • if digits ≤ autoThresholdMachin then machin
   • else if digits ≤ autoThresholdRamanujan then ramanujan
   • else chudnovsky
4. Parse new CLI flags --auto-threshold-machin and --auto-threshold-ramanujan, merge them after defaults, configuration file values, and environment variables.
5. Validate that threshold values are positive integers; on invalid values, fall back to code defaults without error.
6. Ensure backward compatibility: if algorithm flag is set to machin, ramanujan, or chudnovsky explicitly, auto thresholds are ignored.

# Testing

Add unit tests in tests/unit/main.test.js and a new tests/unit/algorithm-implementation.test.js:

• Spy on calculatePiRamanujan and calculatePiChudnovsky and verify correct dispatch for auto mode thresholds and explicit algorithm flags.
• Test that auto thresholds correctly separate digit counts: at boundary values for machin, ramanujan, and chudnovsky.
• Validate fallback to default thresholds if environment variables or flags provide invalid threshold values.
• Verify calculatePiRamanujan produces expected prefixes for small digit counts (for example first five digits) and that calculatePiChudnovsky matches existing Machin output for small inputs.
• Simulate parallel execution by setting workers to 2 or more and verify consistency of results and that worker_threads module is invoked.

# Documentation

Update README.md under the CLI Usage section:

• Document the new algorithm options including auto and how the tool selects algorithms.
• Describe --auto-threshold-machin and --auto-threshold-ramanujan flags and their defaults.
• Show examples:
  node src/lib/main.js --digits 100 --algorithm auto
  node src/lib/main.js --digits 30 --algorithm auto --auto-threshold-machin 20
  node src/lib/main.js --digits 1000 --algorithm chudnovsky --workers 4