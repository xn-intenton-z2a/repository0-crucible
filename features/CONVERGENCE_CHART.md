# Convergence Chart and Data Export

_See the project mission in [MISSION.md](../MISSION.md) to understand the scope and context of this feature._

Provide both graphical and raw data export of π approximation convergence for supported algorithms.

## CLI Options

Add two options:

--chart <filepath>           File path where the PNG convergence chart will be saved. When provided, after computing π, the tool generates a line chart of approximation error versus iteration or sample index.

--convergence-data <filepath>  File path where the convergence data JSON will be saved. When provided, after computing π, the tool writes a JSON file containing an array of data points with iteration or sample index, approximation value, and absolute error.

## Implementation

1. In src/lib/main.js detect options.chart and options['convergence-data'].
2. During calculation of π for Leibniz, Chudnovsky, and Monte Carlo algorithms, record intermediate values:
   - For Leibniz and Chudnovsky, capture approximation at each iteration up to a limit of 1000 points by sampling evenly from the full iteration range or recording every k<sup>th</sup> iteration when too many steps.
   - For Monte Carlo, record approximation and error after fixed batch sizes (e.g., every 1000 samples) up to the requested sample count.
3. After computing π:
   - If options['convergence-data'] is set:
     a. Build an array of objects: { index: number, approximation: number, error: number }.
     b. Serialize this array to JSON and write to the specified file path using fs.writeFileSync.
   - If options.chart is set:
     a. Register required Chart.js controllers, elements, scales, and plugins.
     b. Create a Canvas instance via node-canvas.
     c. Configure a line chart: x-axis uses the recorded index values, y-axis shows absolute error.
     d. Render the chart to a PNG buffer and write to the specified file using fs.writeFileSync.

## Testing

1. In tests/unit/main.test.js, add tests to verify:
   - When --convergence-data is passed, fs.writeFileSync is called with the target JSON file and the correct data array.
   - The JSON file content parsed back matches the expected data shape for small digit or sample counts.
   - When both --chart and --convergence-data are passed, both fs.writeFileSync calls occur for the PNG and JSON files.
   - Mock Chart constructor and fs to confirm chart generation and file writes.

## Documentation

1. Update docs/USAGE.md to document the --convergence-data option with an example command and sample JSON output structure.
2. Update README.md under Features to include:
   - Description of convergence data export and chart generation.
   - Example CLI usage:
     node src/lib/main.js --digits 5 --chart chart.png --convergence-data data.json

Ensure consistency with existing convergence chart documentation and test coverage.