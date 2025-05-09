# Overview

This feature adds a persistent caching layer for π calculation and benchmarking results to avoid redundant computation and improve performance. Computed values are stored on disk and reused when the same algorithm and digit count are requested.

# CLI Interface

--cache-dir <path>  Specify directory to read and write cache files (default: ~/.pi_cache)
--no-cache           Disable cache lookup and writing for this run

# Implementation

- Import fs and path modules from Node.js to manage cache files.
- On pi calculation or benchmark commands, construct a cache key file name based on algorithm name and digit count (e.g., chudnovsky-1000.json).
- Before computing, if caching is enabled, check for an existing cache file in the cache directory:
  - If present, load and parse the file and return its contents instead of recomputing.
  - If absent, proceed with computation, then serialize the result to JSON and write it to the cache directory.
- Ensure cache directory is created if it does not exist.
- Honor the --no-cache flag to bypass reads and writes.

# Testing

- Add unit tests in tests/unit/main.test.js to verify:
  - Cache directory creation when missing.
  - Correct cache file naming for various algorithms and digit counts.
  - Loading cached results returns expected values without invoking algorithm functions (use a mock implementation).
  - --no-cache flag disables cache reads and writes (e.g., cache file remains unchanged after run).

# Documentation

- Update README.md under Features to describe cache behavior and CLI flags with usage examples.
- Document location of default cache directory and how to override it.
