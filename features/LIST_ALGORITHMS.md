# Overview

This feature adds the ability for users to discover all supported π calculation and extraction algorithms available in the CLI tool and HTTP API. It helps users understand which algorithms they can invoke and provides descriptions for each.

# CLI Interface

--list-algorithms
    Print a table or JSON list of all available algorithms and their descriptions to stdout.

# HTTP API

GET /algorithms
    Return a JSON array of objects, each with fields:
    - name: algorithm identifier string
    - description: brief human-readable description
    Support Accept: application/json; return JSON by default.

# Implementation

- Define a constant `ALGORITHMS` in src/lib/main.js as an array of `{ name, description }` entries for each supported algorithm (e.g., chudnovsky, bbp).
- Extend `main(args)` to detect the `--list-algorithms` flag:
  - If present, format and print the algorithm list to stdout (plain table or JSON based on an optional `--json` flag).
  - Do not perform any numeric calculation when this flag is used.
- In the HTTP server logic (triggered by `--serve`), add a new route handler for GET /algorithms:
  - Respond with the JSON representation of `ALGORITHMS`.
  - Set `Content-Type: application/json` and appropriate status codes.
- Update package.json scripts if needed (no changes required unless adding a shorthand).

# Testing

- Add unit tests in tests/unit/main.test.js:
  - Verify that invoking `main(["--list-algorithms"])` writes all algorithm names and descriptions and exits cleanly.
  - Verify that `main(["--list-algorithms", "--json"])` outputs valid JSON array matching `ALGORITHMS`.
- Add HTTP integration tests:
  - Start the server with `--serve` and request GET /algorithms.
  - Verify status code 200, content-type application/json, and payload matches `ALGORITHMS`.

# Documentation

- Update README.md to include a new section under Features:
  - Describe the `--list-algorithms` flag and example usage.
  - Document the GET /algorithms endpoint with example curl commands.
