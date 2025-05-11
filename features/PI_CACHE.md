# Overview
This feature introduces a caching layer for π calculation results to avoid redundant computation and improve performance for repeated requests.

# CLI Interface
Extend main(args) to accept the following flags:
--cache <on|off>         Enable or disable caching of π results (default: on)
--cache-file <file>      Path to a JSON file used for persistent cache storage (default: .pi_cache.json)
--clear-cache            Clear the in-memory and persistent cache before proceeding

When caching is enabled and a request for a digit length has been computed before, the tool returns the cached value instead of recomputing.

# Implementation Details
• Maintain an in-memory Map keyed by digit length with computed π strings as values
• On startup, if caching is enabled, attempt to read the cache file (JSON) and populate the in-memory cache
• On cache miss, compute π using existing calculatePi or algorithm dispatch, then store the result in memory and update the cache file on disk
• When --clear-cache is provided, empty the in-memory Map and delete or truncate the cache file before any calculations
• Ensure file I/O is non-blocking and errors reading or writing the cache file do not prevent π calculation

# Testing
• Unit tests in tests/unit/main.test.js to mock fs and verify that cache file is loaded and saved correctly
• Tests for calculatePi calls: simulate two calls with the same digit count and assert that the second call returns cached result without invoking the underlying computation
• E2E tests in tests/e2e/cli.test.js to run the CLI with identical digit arguments twice, measure elapsed time for the second invocation, and confirm identical output values

# Documentation
• Update README.md to document the new cache flags, default cache behavior, and example usage:
  node src/lib/main.js --digits 100 --cache on
  node src/lib/main.js --digits 100 --cache off
  node src/lib/main.js --clear-cache
