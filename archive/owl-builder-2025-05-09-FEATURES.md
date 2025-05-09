features/PI_CALCULATION.md
# features/PI_CALCULATION.md
# PI CALCULATION

# Overview
Implement computation of π to a user-specified number of decimal digits using the Chudnovsky algorithm for high performance and arbitrary precision.

# Behavior
- The CLI accepts a --digits <n> flag to calculate π to n decimal places. Without this flag, the tool retains its existing behavior of echoing arguments.
- When the --digits flag is provided, the tool calculates π to the requested precision and prints the result to standard output.
- The library exports a calculatePi function that takes an integer precision parameter and returns a string of π to that many decimal digits.

# Implementation Details
1. Add a dependency on decimal.js to support arbitrary precision arithmetic.
2. Implement calculatePi in src/lib/main.js using the Chudnovsky series:
   - Set Decimal precision to precision + guard digits.
   - Use a loop to sum terms of the Chudnovsky series until the added term is smaller than the rounding threshold.
   - Multiply the summed series by the constant factor and format the result to the requested precision.
3. Update the main function in src/lib/main.js to parse the --digits flag and invoke calculatePi when present.
4. Ensure proper rounding and trimming of trailing digits.
5. Update package.json dependencies to include decimal.js.

# Testing
- Add unit tests in tests/unit/main.test.js to verify calculatePi for precision values such as 1, 5, and 10, comparing against known π values.
- Add CLI tests to confirm that invoking node src/lib/main.js --digits n outputs the correct π string and exits with code 0.

# Documentation
- Update README.md to document the --digits flag with examples for both CLI usage and library API usage.
features/PI_VISUALIZATION.md
# features/PI_VISUALIZATION.md
# Overview

Enable generation of a PNG image illustrating the convergence of partial π estimates over successive iterations of the Chudnovsky algorithm.

# Behavior

- Add a --visualize flag to the CLI. When provided, the tool computes π to the requested precision and generates a PNG file showing error magnitude versus iteration count.
- Accept an optional --output <path> flag to specify the output PNG filepath; default to convergence.png in the working directory.
- The library exports a generatePiConvergencePlot function that takes parameters precision, maxIterations, and outputPath, computes partial sums, and writes a PNG image file illustrating convergence.

# Implementation Details

1. Add a dependency on chartjs-node-canvas (or canvas) to render charts server-side.
2. In src/lib/main.js:
   - Parse --visualize and --output flags alongside existing --digits behavior.
   - If --visualize is present, call generatePiConvergencePlot with the parsed precision (default 50), iteration count equal to precision or a separate --iterations flag, and the output path.
3. Implement generatePiConvergencePlot in src/lib/main.js:
   - Compute incremental partial sums of the Chudnovsky series for each iteration up to maxIterations.
   - Calculate absolute error |partialPi - finalPi| at each step.
   - Build a line chart with iteration on the x-axis and error on the y-axis using Chart.js via chartjs-node-canvas.
   - Render chart to a PNG buffer and write to disk at outputPath.
4. Update package.json dependencies to include chartjs-node-canvas.

# Testing

- Add unit tests in tests/unit/main.test.js to verify:
  - generatePiConvergencePlot returns a Promise and writes a file of nonzero length.
  - generatePartialSums helper yields expected error values for a small number of iterations.
- Add an integration test in tests/e2e/cli.test.js to invoke the CLI with --digits 10 --visualize --output test.png and assert that test.png exists and is a valid PNG image.

# Documentation

- Update README.md:
  - Document the --visualize and --output flags with examples.
  - Show a sample convergence plot image and link to it.
  - Provide a code snippet demonstrating library API usage of generatePiConvergencePlot.
