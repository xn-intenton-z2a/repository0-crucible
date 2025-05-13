# Overview

Add end-to-end CLI tests to verify that chart generation and convergence data export behave as expected when invoking the CLI tool. These tests ensure that the --chart and --convergence-data options produce valid files and correct content.

# Implementation

1. Add a new test file at tests/e2e/cli.test.js containing tests that:
   - Spawn the CLI process using execa for commands with --convergence-data <file> and --chart <file>.
   - Verify the convergence data file exists, contains a JSON array of data points with fields index, approximation, and error.
   - Verify the chart file exists, is a PNG image by checking the PNG signature bytes.
   - Clean up temporary files after tests.
2. Install execa as a devDependency in package.json.
3. Ensure the existing test:e2e script in package.json runs Vitest on tests/e2e.

# Testing

- The E2E test suite runs as part of npm run test:e2e.
- Tests cover successful generation of data.json and chart.png with valid contents.

# Documentation

- Update README.md under Testing to include instructions for running end-to-end CLI tests using npm run test:e2e.
