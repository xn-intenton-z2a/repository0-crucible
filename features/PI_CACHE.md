# Overview
Introduce a transparent caching layer for π calculation results to avoid repeated heavy computations. Caching is enabled by default, storing results by method and digit count in-memory and persisting them to disk. Users can disable caching or specify a custom cache file per invocation.

# CLI Usage
--no-cache
    Disable cache lookup and persistence for this run.
--cache-file <path>
    Specify a custom path for the cache file. Defaults to .pi_cache.json in the working directory.

# Implementation Details

## Cache Store
- On startup in src/lib/pi.js, read cache data from the cache file (default path or from CLI flag). If the file is missing or invalid JSON, initialize an empty cache Map keyed by "method:digits".
- Use an in-memory Map to track cached π strings.
- After computing a missing entry, store it in memory and atomically write the full cache object back to disk by writing to a temporary file and renaming it.

## calculatePi Wrapper
- Extend the existing calculatePi signature to accept an options object: calculatePi(digits, method, {cacheEnabled = true, cacheFilePath}).
- When cacheEnabled is true, before computing, check the in-memory Map and return the cached string if available.
- When cacheEnabled is false, skip lookup and do not persist results.

## CLI Integration in main.js
- Parse new flags --no-cache and --cache-file in src/lib/main.js, validating inputs:
    • --no-cache sets cacheEnabled to false.
    • --cache-file <path> sets cacheFilePath to the supplied path.
- Pass cacheEnabled and cacheFilePath into calculatePi when invoking it.

# Tests
- Add tests in tests/unit/cache.test.js:
    • Stub fs.readFileSync and fs.writeFileSync to simulate existing cache and ensure proper reads and writes.
    • Verify that on a cache miss, calculatePi writes a new entry and returns correct value.
    • Verify that on subsequent calls with identical parameters, calculatePi returns from memory without invoking the algorithm or writing to disk.
    • Verify that supplying --no-cache always computes fresh results and never writes to disk.
    • Verify that supplying --cache-file uses the custom file path for both reading and writing.

# Documentation
- Update README.md under Features to document caching usage, including examples of disabling the cache and specifying a custom cache file.
- Update docs/USAGE.md under a new "Caching" section to describe default cache location, CLI flags, and behaviors.