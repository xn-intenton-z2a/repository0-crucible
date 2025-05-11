# Overview

Provide an interactive web-based dashboard for π calculations, algorithm selection, performance benchmarking, and visualizations.  Users can launch a single HTTP server process that serves a dynamic HTML interface with inputs and charts, enabling browser-based exploration without installing separate tooling.

# Architecture

- Extend existing --serve HTTP server mode in src/lib/main.js to also serve a static dashboard at the root path `/`.
- Use EJS (already in dependencies) to render a simple HTML template with embedded JavaScript for client-side requests and Chart.js for rendering charts.
- Leverage existing API endpoints `/pi` and `/benchmark` to drive UI interactions.

# User Interface

- Input controls:
  - A numeric input for digit count (default 10).
  - A dropdown for algorithm selection (machin, chudnovsky, bbp).
  - A multi-select or comma-separated input for benchmark digit list (default 10,100,500).
  - Buttons to "Compute π" and "Run Benchmark".

- Output areas:
  - A text area displaying the resulting π value.
  - A bar chart showing execution time per digit count.
  - An optional memory usage line chart toggled by a checkbox.

# Implementation Details

- In src/lib/main.js:
  - Detect a new flag `--dashboard` or `-D` (optional port number, e.g. `--dashboard 4000`).  When present, start HTTP server and do not print CLI output.
  - On server startup:
    - Precompile an EJS template string in code for the dashboard page.
    - Serve GET `/` to render the EJS template with the configured port and API paths.
    - Serve static client-side assets inline or via EJS script tags for Chart.js (loaded from CDN).
    - Retain existing `/pi` and `/benchmark` JSON endpoints for data.

- Update package.json dependencies:
  - Ensure Chart.js CDN usage in template; no new npm dependency required for frontend.

# Testing

- In tests/unit/main.test.js:
  - Start the dashboard server with `main(["--dashboard","0"])`, capture the returned server instance.
  - Use Node http request to GET `/` and assert status 200 and Content-Type `text/html`.
  - Verify the returned HTML contains key elements: `<input` for digits, `<canvas` tags for charts.
  - Cleanly close the server after tests.

- Ensure existing API tests for `/pi` and `/benchmark` still pass under dashboard mode.
