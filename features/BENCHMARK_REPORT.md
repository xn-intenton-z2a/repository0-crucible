# Overview

This feature extends the benchmark visualizer by generating a formatted report summarizing benchmark results and embedding performance charts. The report can be produced in markdown or HTML format to support easy sharing, archival, and integration into documentation.

# CLI Interface

--report-file <path>
    Specify a path to generate a benchmark report. Supported extensions are .md for markdown and .html for HTML. When provided, the tool generates the report after completing benchmark and chart creation.

# Implementation

- In src/lib/main.js, enhance the benchmarkPi handler to parse a report-file option from arguments.
- After collecting benchmark results and generating the performance chart, load an EJS template matching the report-file extension.
- The template includes sections for:
  • Title and timestamp of the benchmark run
  • A summary table listing algorithm names, digit counts, execution times, and memory usage
  • Embedded chart reference using markdown image syntax or an HTML img tag pointing to the chart-file path
  • A raw JSON appendix of full benchmark data
- Render the template with EJS and write the output to the specified report-file path.
- Validate that the extension is supported and that the output directory exists or can be created; exit with an error if validation fails.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Mock benchmark results and chart generation, invoke main with --benchmark-pi, --chart-file, and --report-file flags, and verify the report-file is created with expected sections and image references.
  • Test unsupported file extensions produce a descriptive error and nonzero exit code.
  • Verify that if chart-file is not provided, the report omits the image section gracefully.
  • Use temporary file paths to avoid side effects on the repository.

# Documentation

- Update README.md under Features to document the --report-file flag, supported extensions, and usage examples.
- Provide a sample command demonstrating report generation and include an excerpt from a generated markdown report.