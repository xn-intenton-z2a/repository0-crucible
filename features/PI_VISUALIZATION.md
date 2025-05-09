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
