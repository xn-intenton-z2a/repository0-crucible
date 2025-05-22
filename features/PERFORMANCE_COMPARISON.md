# Overview

Add a benchmarking mode that runs both the spigot and Chudnovsky π algorithms over a series of digit lengths, measures execution times, and produces comparison reports. Users can generate a simple text table, a CSV file, or a line chart PNG showing performance across sizes.

# CLI Options

* `--benchmark-sizes <list>`  Comma-separated list of digit counts to benchmark (for example 10,100,1000).  Overrides single-run mode when present.
* `--benchmark-output <type>`  Report format: text, csv, or png (default: text).
* `--benchmark-file <path>`    File path to save the report or chart.  If omitted, text output prints to stdout; CSV and PNG write to default files: benchmark.csv or benchmark.png.

# Source File Changes

Enhance `src/lib/main.js` to:

1. Parse `benchmark-sizes`, `benchmark-output`, and `benchmark-file` using minimist alongside existing options.
2. When `benchmark-sizes` is provided:
   - Split the list into integer digit values.
   - For each digit value, measure compute time for both `computePiSpigot` and `computePiChudnovsky`.  Use `console.time` / `console.timeEnd` or manual timing.
   - Collect results into an array of objects `{ size, spigotTime, chudnovskyTime }`.
3. Based on `benchmark-output`:
   - **text**: format a fixed-width table and either print to console or write to file.
   - **csv**: build CSV rows with header `size,spigotTime,chudnovskyTime` and write to file or stdout.
   - **png**: use `createCanvas` to draw axes and two lines (one per algorithm) showing time vs size, then write PNG to disk.

# Test File Changes

Add unit and CLI tests in `tests/unit/main.test.js` to verify:

* Running `node main.js --benchmark-sizes 10,50 --benchmark-output text` prints a table header and two data rows.
* Running with `--benchmark-output csv --benchmark-file report.csv` creates `report.csv` containing the header and correct number of lines.
* Running with `--benchmark-output png --benchmark-file perf.png` creates `perf.png` and the file size is nonzero.

# README Updates

Update `README.md` under Features and Usage to include the new benchmarking mode and examples:

* node src/lib/main.js --benchmark-sizes 10,100,1000
* node src/lib/main.js --benchmark-sizes 50,200 --benchmark-output csv --benchmark-file benchmark.csv
* node src/lib/main.js --benchmark-sizes 100,500 --benchmark-output png --benchmark-file performance.png

# Dependencies

No additional dependencies required.  Reuse the existing `decimal.js`, `canvas`, `minimist`, and core `fs` module for timing, CSV generation, and chart rendering.