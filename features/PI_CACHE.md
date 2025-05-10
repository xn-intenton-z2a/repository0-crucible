# Overview

This feature adds a persistent caching layer for π calculation and benchmarking results to avoid redundant computation and improve performance, and provides management tools for cache entries including time-to-live (TTL) expiration and manual cleanup.

# CLI Interface

--cache-dir <path>
    Specify directory to read and write cache files (default: ~/.pi_cache)
--no-cache
    Disable cache lookup and writing for this run
--cache-ttl <seconds>
    Maximum age in seconds for cache entries before they are considered stale and eligible for removal. Accepts a positive integer or float.
--clear-cache
    Remove cache entries older than the configured TTL. If no TTL is specified, this deletes all cache files in the cache directory. When this flag is provided, the tool performs cleanup and exits without performing π computations.

# Implementation

- In src/lib/main.js:
  • Parse the new --cache-ttl and --clear-cache flags alongside the existing --cache-dir and --no-cache flags.
  • If --clear-cache is present:
      1. Determine the cache directory path (apply defaults if --cache-dir not provided).
      2. Read all files in the cache directory. If the directory does not exist, report "Cache directory not found" and exit with code 0.
      3. For each file:
         - If --cache-ttl is provided, use fs.stat to get the file's mtime. If (now - mtime) >= cacheTTL seconds, delete the file.
         - If --cache-ttl is not provided, delete every file.
      4. After cleanup, log a summary: number of files scanned and number of files deleted, then exit with status code 0.
  • On normal execution (when --clear-cache is absent) and cache enabled:
      - Before computing π or benchmarks, check for existing cache files named by algorithm and digit count.
      - If found and not expired (file age < cacheTTL if TTL set), load and return its contents.
      - After successful computation, write or overwrite the cache file with the result and timestamp.
      - Honor --no-cache by skipping both reads and writes.
- No additional dependencies are required; use built-in fs and path modules and JavaScript timers.

# Testing

- Add unit tests in tests/unit/main.test.js:
  • Setup: create a temporary directory and multiple dummy cache files with controlled mtimes using fs.utimesSync.
  • Test --clear-cache only: run main with ["--clear-cache","--cache-dir",tempDir]; verify that all files are deleted and the exit code is 0.
  • Test --clear-cache with TTL: run main with ["--clear-cache","--cache-dir",tempDir,"--cache-ttl",5]; set one file's mtime more than 5 seconds in the past and another newer; verify only the old file is deleted.
  • Test no --clear-cache: verify cache read/write behavior remains as before, including TTL-based expiry when reading stale entries.
  • Test that --no-cache bypasses cleanup and no files are deleted.

# Documentation

- Update README.md under Features to describe the new --cache-ttl and --clear-cache flags with example usage:

Example:
  node src/lib/main.js --cache-dir ./cache --cache-ttl 3600 --clear-cache

- Explain that --clear-cache performs cleanup and exits, and that --cache-ttl controls entry expiration when both cleaning and normal cache lookups occur.
