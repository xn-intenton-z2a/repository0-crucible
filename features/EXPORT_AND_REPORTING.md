# Overview

Provide a unified export and reporting capability that consolidates multiple output modes into a single feature. Users can format π calculation results in plain text, JSON, CSV, or XML; generate convergence data files; render convergence charts; and apply custom report templates for HTML or Markdown outputs.

# Implementation

1. Extend CLI options in src/lib/main.js to recognize:
   • --format <format>        : Choose output format (text, json, csv, xml).
   • --output <filepath>      : Write formatted result to file.
   • --convergence-data <path>: Export raw convergence data JSON.
   • --chart <path>           : Render a PNG convergence chart (error vs. index).
   • --template <path>        : Path to an EJS template for custom reports.
   • --template-data <path>   : JSON file with additional context for templates.
   • --template-output <path> : File path for the rendered report.
2. After computing π and optional diagnostics:
   a. If --format or --output is used, serialize or format the result accordingly and write or log.
   b. If --convergence-data is provided, collect intermediate data points during calculation and write JSON to file.
   c. If --chart is provided, register Chart.js components, use node-canvas to plot error vs. index, then write PNG to file.
   d. If --template is set, read the EJS template and any extra data, build a context { result, options, data }, render with EJS, and write to --template-output or stdout.

# Testing

1. Unit tests for each export mode in tests/unit/main.test.js:
   • Spy on console.log and fs.writeFileSync to verify correct formatting and file writes for text, json, csv, xml.
   • Mock Chart and createCanvas to confirm chart PNG buffer is generated and written when --chart is used.
   • Mock ejs.renderFile and fs to verify template rendering with and without --template-data, and file writes or console output.
2. Validate that combining options (e.g., --chart and --convergence-data) triggers both export paths.

# Documentation

1. Update docs/USAGE.md to describe new options under **Export & Reporting** with examples demonstrating each mode.
2. Update README.md under **Features** to list **Export and Reporting** with sample commands and expected outputs.