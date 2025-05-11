# π Digit Histogram

Generate and visualize the distribution of the first N decimal digits of π as a PNG bar chart.

# Usage

Invoke the CLI with the --pi-histogram flag followed by the number of digits and the output file path.

Example:

  node src/lib/main.js --pi-histogram 10000 histogram.png

# Implementation Details

1. Extend argument parsing in main to detect --pi-histogram (or -g) and capture two arguments: the digit count N and the output file path.
2. Validate that N is a positive integer between 1 and 100000. On invalid input, display an error message and exit with nonzero status.
3. Use the existing π calculation implementation to compute the first N decimal digits of π.
4. Tally the frequency of each digit 0 through 9 into an array of counts.
5. Use node-canvas to create a Canvas instance, set a fixed width and height, draw axes and bars where each bar’s height is proportional to the digit count frequency.
6. Convert the canvas to a PNG buffer and write the buffer to the specified output file path. Handle file system errors gracefully.
7. Ensure resources are released after writing the file.

# Testing

Add tests in tests/unit/main.test.js:

- Unit test for a helper function generateHistogramBuffer(N) that returns a PNG Buffer of non-zero length when N is valid.
- Verify invalid N values cause the process to exit with an error status.
- Mock the file system to test that CLI invocation with valid parameters writes a file to the given path without throwing.

# Documentation

Update README.md to include:

- Description of the --pi-histogram flag, its purpose, and usage example.
- Note on output file creation and dependencies.

# Dependencies

Add "canvas" to package.json dependencies to support drawing the bar chart.