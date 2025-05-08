# Overview

Introduce a real-time progress indicator for long-running π computations, giving users visibility into algorithm progress, estimated completion time, and iteration count. This enhancement improves user experience when calculating large digit counts by providing feedback and confidence during execution.

# Implementation

1. Command-Line Interface
   - Add a new flag `--progress` (boolean) to main.js argument parsing using minimist.
   - When `--progress` is enabled, display a dynamic progress bar in the console during computation.

2. Progress Bar Integration
   - Add dependency `cli-progress` to dependencies in package.json.
   - For iterative algorithms (Leibniz series, Gauss-Legendre, Chudnovsky), determine total work units (e.g., number of iterations or precision steps).
   - Initialize a `cli-progress` bar before computation begins, configured with total iterations or digit count.
   - On each major iteration or precision increase, update the progress bar to reflect work done.
   - Stop and clear the progress bar upon completion, then output final π result as usual.

3. Dependency Management
   - Add `cli-progress` to package.json dependencies.

# Testing

- Unit tests in tests/unit/progress.test.js:
  • Simulate a short computation with `--progress` enabled and verify that the progress bar methods start, update, and stop without errors.
  • Ensure that disabling `--progress` yields no progress bar output and returns only π result.

# Documentation

- Update README.md:
  • Document the `--progress` flag under CLI options.
  • Provide an example command: node src/lib/main.js --algorithm chudnovsky --digits 10000 --progress.
  • Describe expected console output including the progress bar and final π output.
