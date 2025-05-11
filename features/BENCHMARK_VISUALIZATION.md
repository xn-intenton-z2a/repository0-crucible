# Overview

Generate PNG bar chart visualizations of benchmark results for π calculation across multiple precision targets. This feature enables users to produce visual artifacts that help identify performance bottlenecks and compare execution characteristics at a glance.

# CLI Interface

- Add flag --benchmark-chart or -bc that accepts an optional comma-separated list of digit counts (e.g., --benchmark-chart 10,100,500).
- If no list is provided, default to benchmarking at 10, 100, and 500 digits.
- Add option --out or -o followed by a file path for the output PNG image; default to benchmark.png.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect the --benchmark-chart flag, parse digit targets, and read the output path.
- For each specified digit count:
  - Record start time using performance.now().
  - Invoke the existing calculatePi(digits) function.
  - Record end time and compute duration.
  - Capture memory usage delta via process.memoryUsage().heapUsed before and after.
- Aggregate results into an array of objects with fields digitCount, durationMs, and memoryBytes.
- Add a dependency on chartjs-node-canvas to render a bar chart:
  - X axis displays digitCount values.
  - Y axis displays durationMs values.
  - Optionally overlay memoryBytes as a secondary dataset.
- Render the chart to a PNG buffer and write it to the specified output file using fs.writeFileSync.
- Throw descriptive errors for invalid digit arguments or file write failures.

# Testing

- In tests/unit/main.test.js, mock performance.now and process.memoryUsage to return fixed values.
- Call main(["--benchmark-chart","5,10","--out","test.png"]) and assert that test.png is created on disk.
- Use fs.readFileSync to read the file and confirm the PNG file signature (first eight bytes) matches the standard PNG header.
- Test default behavior with no digits or output path, verifying the creation of benchmark.png in the working directory.
- Verify the CLI throws errors on non-integer digit lists or inaccessible output file paths.