# PI_VISUALIZER

# Description
Adds a command line option to produce a PNG visualization of the digit frequency histogram of the computed π value. This feature uses node-canvas and chart.js to render a bar chart and save it as an image file.

# CLI Usage
node src/lib/main.js --pi <digits> --visualize-histogram <outputPath> [--benchmark]

--pi                  Number of decimal places to compute π
--visualize-histogram  Path to output the PNG histogram image (e.g., histogram.png)
--benchmark           Optional flag; when provided, report the time taken to compute π

# Implementation
- Add dependencies "canvas" and "chart.js" to package.json
- Extend argument parser in main.js to detect:
  - --visualize-histogram <outputPath>
- After computing π and optional digit frequency counts:
  - Generate a bar chart with labels 0–9 and data from digit frequencies
  - Initialize a Canvas of size 800×600
  - Use Chart.js to draw the bar chart onto the Canvas
  - Export the Canvas to a PNG Buffer
  - Write the Buffer to the specified output file path
- Preserve existing behavior for --benchmark and --digit-frequency flags

# Testing
- Mock the Canvas and verify that a PNG Buffer is produced and written to disk
- Test invoking with --visualize-histogram creates a file at the given path with non-zero size
- Verify that chart data in the output matches expected digit frequency for known π segments
- Confirm appropriate error is thrown when outputPath is missing or invalid