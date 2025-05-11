# Convergence Chart Export

Provide a graphical export of π approximation convergence for supported algorithms as a PNG chart file.

# CLI Options

Add a new option:

--chart <filepath>  File path where the PNG chart will be saved. When provided, after computing π, the tool generates a line chart showing approximation error versus iteration or sample index.

# Implementation

1. Detect options.chart in main CLI entrypoint in src/lib/main.js.
2. Integrate chart.js and node-canvas: install dependencies chart.js and canvas in package.json.
3. Capture intermediate approximation values during calculation:
   - For Leibniz and Chudnovsky algorithms, record approximation at each iteration up to a reasonable bound (limit raw points to 1000 for performance).
   - For Monte Carlo, record approximation error after fixed batch sizes (e.g., every 1000 samples).
4. After π is computed, if options.chart is set, create a Canvas instance, register Chart.js controllers and elements, build a line chart with x-axis as iteration or sample batch index and y-axis as absolute error from Math.PI, and write the canvas as PNG to the specified filepath using fs.

# Testing

1. In tests/unit/main.test.js, add tests to verify that when --chart is passed, a PNG file is created at the target location.
2. Mock Chart constructor and fs.writeFileSync to assert correct data and file write invocation.
3. Test with small digit and sample values to ensure chart generation runs without error.

# Documentation

1. Update docs/USAGE.md to document the --chart option with an example command and notes on output file.
2. Update README.md under Features and Usage sections to describe the chart export capability.