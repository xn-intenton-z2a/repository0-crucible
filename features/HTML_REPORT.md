# HTML Report Generation Feature

# Overview

Provide a single-file static HTML dashboard report that aggregates results from pi computations, visualizations, benchmarks, and searches. Users can generate an interactive HTML summary to review numeric outputs, PNG charts, and search or extraction results in one document.

# Functional Requirements

- Add function generateHtmlReport(options) in src/lib/main.js
  - options.script: path to a JSON or YAML script defining a sequence of commands (required)
  - options.output: path to the HTML output file (required)
  - options.inline: boolean indicating whether to embed PNG images as Base64 (default false)
- When invoked, parse the script file similar to script mode, collecting results for each command:
  - Numeric results (pi, search, extraction) as text
  - File paths of generated PNG charts and exported text files
  - CSV data for benchmarks
- Build an HTML document with sections for each command entry:
  - For numeric outputs, display a code block or paragraph
  - For PNG charts, include an image tag referencing the file or embed Base64 if inline
  - For CSV benchmark data, render a table
  - For exports, provide download links
- Write the assembled HTML string to the specified output file atomically

# CLI Interface

- Extend src/lib/main.js to accept flags:
  --script <path> to specify script file (JSON or YAML)
  --html-report <file.html> to specify report output path
  --inline-images to embed charts as Base64
- When --html-report is provided:
  - Parse --script, --inline-images, and --html-report
  - Invoke generateHtmlReport with parsed options and exit after writing HTML
- Update CLI help output to document new report flags

# Dependencies

- Use built-in fs and fs/promises for file operations
- Import js-yaml for script parsing (already present)
- Import ejs from ejs for templating the HTML layout (already present)

# Testing

- Add unit tests in tests/unit/main.test.js to mock script parsing and template rendering:
  - Supply a sample script with a few commands, stub command functions to return known results
  - Verify generateHtmlReport writes an HTML file containing expected sections
- Add CLI tests in tests/e2e/cli.test.js:
  - Create a temporary script file defining pi calculation and distribution commands
  - Invoke the CLI with --script and --html-report flags and assert the HTML file exists
  - Confirm the HTML contains numeric pi output and image tags or embedded data according to --inline-images
