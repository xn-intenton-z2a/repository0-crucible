# Overview

Introduce the ability to generate a comprehensive HTML report for π calculations, combining algorithm results, benchmark metrics, and visualizations into a single shareable document. This feature leverages existing charting and templating dependencies to produce an interactive summary that users can open in any web browser.

# Implementation

1. Command-Line Interface
   - Add a new flag `--report <path>` to main.js argument parsing using minimist.
   - When provided, compute π and benchmark data as usual, then invoke the report generator to write an HTML file at the specified path.

2. Report Generation Module
   - Create an inline templating routine in src/lib/main.js using EJS to render an HTML template.
   - Template sections:
     • Summary: algorithm name, digits requested, execution time, and throughput.
     • Benchmark Chart: embed a base64-encoded PNG or inline SVG of error margin vs iteration count.
     • Details Table: list algorithm parameters and timing metrics.
   - Use existing PNG output logic if `--format png` was used; otherwise generate a lightweight inline chart using a JS charting library CDN link.

3. Dependencies
   - Reuse EJS dependency (already declared) for templating.
   - Add no new dependencies; include chart.js via a `<script>` tag in the HTML template.

# Testing

- Unit tests in tests/unit/html-report.test.js:
  • Simulate CLI calls with `--report report.html` and verify that the HTML file is created.
  • Assert that the file contains expected sections (Summary, Benchmark Chart, Details Table) by reading its contents.
  • Test fallback behavior when report path is invalid or unwritable.

# Documentation

- Update README.md:
  • Document the `--report` flag in the CLI options section.
  • Provide an example command: node src/lib/main.js --algorithm chudnovsky --digits 500 --benchmark --report pi-report.html.
  • Describe the structure of the generated HTML report and how to view it in a browser.