# Overview
This feature introduces a caching layer for π calculation results in both CLI and HTTP server modes to avoid redundant computation and improve performance for repeated requests.

# CLI Interface
Extend main(args) to accept the following flags:
--cache <on|off>         Enable or disable caching of π results (default: on)
--cache-file <file>      Path to a JSON file used for persistent cache storage (default: .pi_cache.json)
--clear-cache            Clear the in-memory and persistent cache before proceeding

# HTTP API Integration
In HTTP server mode, cache is applied to the GET /pi route:
• Before computing π for a query parameter digits, check the in-memory cache for a stored result matching digits and any algorithm or worker options.
• If a cached value is found, return it immediately in the JSON response without invoking calculatePi.
• On a cache miss, compute π, store the result in both the in-memory cache and persistent cache file, then respond normally.
• Respect --cache and --clear-cache flags for controlling cache behavior in server mode.

# Implementation Details
• Maintain an in-memory Map keyed by a string of serialized options (digits, algorithm, workers) with computed π strings as values.
• On startup, if caching is enabled, read the cache file using fs/promises and populate the in-memory Map.
• In CLI mode, follow existing behavior: on cache miss compute then save, on clear-cache delete file and empty Map.
• In HTTP server setup (src/lib/main.js), wrap the GET /pi handler:
  • Compute a cache key from request query parameters.
  • If cache enabled and key exists, return JSON { digits, pi: cachedValue }.
  • Else call calculatePi, store result in Map and write updated cache file asynchronously, then return JSON.
• Ensure file I/O errors for cache file read or write do not prevent π calculation or server startup.

# Testing
• Unit tests in tests/unit/main.test.js should mock fs and the cache file to verify CLI load and save behavior.
• Add unit tests for HTTP cache logic using supertest:
  – Start server with --serve 0 --cache on.
  – Perform GET /pi?digits=10 twice; verify calculatePi is called only on the first request and second returns from cache.
  – Test that --cache off disables caching and calculatePi is invoked on each request.
  – Test that --clear-cache resets cache so subsequent requests recompute.

# Documentation
• Update README.md under Features and HTTP Server sections:
  – Document the --cache, --cache-file, and --clear-cache flags and defaults.
  – Describe caching behavior in HTTP mode with examples:
      node src/lib/main.js --serve 3000 --cache on
      curl http://localhost:3000/pi?digits=50  # computes and caches
      curl http://localhost:3000/pi?digits=50  # returns cached result
