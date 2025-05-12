# Unified Export and Reporting

## Overview
Provide a single, consistent framework for exporting π calculation results across CLI and HTTP API modes.  Support multiple output formats, raw data dumps, graphical charts, benchmarking reports, batch tasks, and custom templated exports.

## CLI Options
• --format <format>         Select result format: text, json, csv, xml, table
• --output <filepath>       Write formatted result to file instead of stdout
• --convergence-data <path> Export raw convergence data (error and approximation per index) as JSON
• --chart <path>            Render a PNG chart (error vs index) and write to file
• --benchmark-report <path> Generate a consolidated benchmark report for selected algorithms in JSON or CSV
• --batch <path>            Process a JSON file with an array of tasks and output an array of results
• --template <path>         Path to an EJS template for custom report generation
• --template-data <path>    JSON file with additional context for templates
• --template-output <path>  File path for rendered custom report

## HTTP Endpoints
• GET /pi                     Return result in JSON or other negotiated formats
• GET /pi/data                Return raw convergence data in JSON array
• GET /pi/chart               Return PNG chart of convergence (error vs index)
• POST /pi/batch              Accept JSON array of tasks, return array of results in requested format via Accept header or query parameter

## Implementation
1. Extend minimist CLI schema to recognize all new export options.  Merge defaults, CLI args, and config file values.
2. After computation, pass result and any diagnostics or dataPoints into an export pipeline:
   a. Serialize or format result based on --format, writing to stdout or --output file
   b. If --convergence-data is set, write JSON dataPoints to given path
   c. If --chart is set, register Chart.js and node-canvas, generate error vs index plot, save PNG
   d. If --benchmark-report is set, run specified algorithms, collect durations and errors, format as JSON or CSV, save to file
   e. If --batch is set, read tasks array from file, execute each task through same pipeline, produce combined output array
   f. If --template is set, load EJS template and optional --template-data, render report and write to --template-output or stdout
3. In Express createApp(), refactor handlers to delegate to common export functions:
   a. Inspect Accept header or ?format= parameter to choose JSON, csv, xml, or image
   b. For /pi/batch, accept tasks array, process each request object, and return formatted array
4. Aim for minimal duplication by centralizing export logic in src/lib/exporter.js and invoking from main() and createApp().

## Testing
1. CLI: mock fs.writeFileSync, console.log and file reads for templates; verify correct calls and file outputs for each option.
2. HTTP: use supertest to request endpoints with ?format=csv or Accept: text/csv; verify status, content-type, and payload.
3. Batch modes: test CLI --batch and POST /pi/batch return combined formatted arrays
4. Template rendering: mock ejs.renderFile; confirm rendered content and file writes

## Documentation
1. Update docs/USAGE.md under **Export and Reporting** with examples for each mode
2. Update README.md **Features** list to describe unified export capabilities