# Overview
Extend the CLI tool to calculate π to a specified number of digits using configurable algorithms, report basic performance metrics, and optionally generate a convergence plot as a PNG image.

# CLI Usage
Add or enhance the existing calculate command in the CLI entrypoint with the following flags:

--digits: positive integer specifying how many digits after the decimal point to compute
--algorithm: one of chudnovsky, bbp, gauss-legendre, leibniz specifying which algorithm to use
--format: one of text, png controlling output mode
--output: optional file path for PNG image when format is png

Provide clear help text and validation errors for missing or invalid values.

# Algorithms
- chudnovsky: optimized series for rapid high-precision results
- bbp: binary digit extraction for arbitrary starting positions
- gauss-legendre: iterative algorithm to demonstrate convergence
- leibniz: simple alternating series for educational purposes

# Output
- text mode (default): print computed π digits to standard output and append execution time and peak memory usage summary
- png mode: generate a PNG file showing convergence of the partial sums over iterations and save to the specified output path; also print a success message with file location

# Visualization
- Use a chart library compatible with Node 20 (for example chartjs-node-canvas) to draw a line chart of error magnitude vs iteration count
- Label axes appropriately and include chart title indicating algorithm and digit goal

# Implementation Details
- Update src/lib/main.js to parse the new flags using a CLI parser (for example yargs or commander)
- Refactor modules under src/lib/algorithms to record convergence data (error magnitude per iteration) alongside result digits
- Add a new module src/lib/plotter.js that uses chartjs-node-canvas to generate the PNG file
- Extend tests in tests/unit/main.test.js to verify flag parsing, text mode output, and for png mode ensure the file is created and has nonzero size (use a temporary directory)
- Update package.json to add dependencies chartjs-node-canvas and canvas if required
- Update README.md with usage examples illustrating both text and png modes, including error cases