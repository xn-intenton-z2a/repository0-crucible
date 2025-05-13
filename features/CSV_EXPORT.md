# Overview

Add CSV export capabilities for convergence data to support spreadsheet imports and data analysis workflows. Users can retrieve error series in CSV format via the HTTP API or write CSV files from the CLI.

# Implementation

1. HTTP API Integration
   • Register a new GET /pi/data.csv route in createApp().
   • Accept the same query parameters as /pi/data (digits, algorithm, samples, level, etc.).
   • Generate dataPoints array with fields index, approximation, and error.
   • Convert dataPoints to CSV text with header row "index,approximation,error" and comma-separated values.
   • Respond with Content-Type text/csv and the CSV payload.

2. CLI Integration
   • Extend minimist and CLIOptionsSchema to accept a new string option --csv-file <filepath>.
   • When --csv-file is provided, after computing convergence data (as for --convergence-data), convert dataPoints to CSV format.
   • Write the CSV text to the specified filepath using fs.writeFileSync.
   • If --convergence-data is not provided, skip JSON output; otherwise, continue existing behavior.

# Testing

1. HTTP API Tests (tests/unit/server.test.js)
   • Issue GET /pi/data.csv with parameters (e.g., digits=2, algorithm=leibniz).
   • Assert status 200, Content-Type text/csv, and that response begins with header "index,approximation,error".
   • Verify at least one data row follows the header.

2. CLI Tests (tests/unit/main.test.js)
   • Spy on fs.writeFileSync and run main(["--digits","2","--convergence-data","data.json","--csv-file","out.csv"]).
   • Assert fs.writeFileSync is called with "out.csv" and data starting with "index,approximation,error".

# Documentation

1. docs/USAGE.md
   • Under **REST Endpoints**, document **GET /pi/data.csv** with CSV response example.
   • Under **Options**, document new **--csv-file <filepath>** flag for CLI.

2. README.md
   • Under **Features**, add **CSV Export** feature with brief description and examples for both HTTP and CLI.