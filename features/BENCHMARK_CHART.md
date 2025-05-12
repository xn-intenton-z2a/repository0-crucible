# Benchmark Chart Generation

Provide the ability to generate a graphical bar chart comparing execution times of π calculation algorithms as a PNG file, enabling users to quickly visualize performance differences.

# CLI Options

--benchmark-chart <filepath>    Path to write the benchmark comparison chart PNG file. When provided alongside --benchmark, the tool generates a bar chart of durationMs for each algorithm and saves it to this file instead of or in addition to printing JSON/table output.

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize benchmarkChart as a string option.
2. In main() when handling benchmark mode:
   a. After computing the results array, check if options.benchmarkChart is set.
   b. If set, import and register Chart.registerables and create a canvas via createCanvas(width, height).
   c. Prepare labels array from results.map(r => r.algorithm) and data array from results.map(r => r.durationMs).
   d. Create a bar chart using new Chart(ctx, { type: 'bar', data: { labels, datasets: [{ label: 'Duration (ms)', data, backgroundColor: 'lightgreen' }] }, options: { scales: { y: { beginAtZero: true, title: { display: true, text: 'Duration (ms)' } }, x: { title: { display: true, text: 'Algorithm' } } } } });
   e. Serialize the canvas to a PNG buffer and write to the specified file path via fs.writeFileSync.
   f. If no benchmarkChart option, preserve existing console.log of JSON or table.

# Testing

1. In tests/unit/main.test.js, add tests that:
   - Mock fs.writeFileSync and spy on Chart and createCanvas.
   - Call main(["--benchmark","--digits","2","--samples","10","--benchmark-chart","perf.png"]).
   - Verify fs.writeFileSync called once with 'perf.png' and a Buffer.
   - Verify Chart was constructed with the correct labels and data.

# Documentation

1. Update docs/USAGE.md to document the --benchmark-chart option with example:
   node src/lib/main.js --benchmark --digits 5 --benchmark-chart perf.png
2. Update README.md under Features to describe Benchmark Chart Generation and show sample CLI invocation and expected PNG output.