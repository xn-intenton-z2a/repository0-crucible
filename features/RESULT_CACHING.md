# Overview

Provide a persistent, file-based cache to speed up repeated π calculations in both the CLI tool and the HTTP API. With caching enabled, users will experience near-instant responses for identical calculation parameters, reducing CPU time and improving user productivity.

# Implementation

1. Cache Storage
   • On startup, attempt to load a JSON cache file named `.pi_cache.json` located first in the current working directory, then in the user’s home directory.  
   • On parse errors or missing file, start with an empty in-memory cache and create or overwrite the file on first write.  
   • Cache key format: `<algorithm>:digits=<n>` or `<algorithm>:samples=<m>:level=<l>:maxIterations=<x>:errorTolerance=<t>`.
   • Use atomic file writes for safety: write to a temporary file then rename, or leverage a small helper `writeFileAtomicSync` to prevent data races.

2. CLI Integration (`main()` in src/lib/main.js)
   • Add a new boolean flag `--cache` (default: true) and environment variable `CACHE_DISABLED` to disable caching when needed.  
   • Before computing π, compute the cache key and check the in-memory cache.  
   • On a cache hit, skip the algorithm call and return the cached result (with `fromCache: true` if `--diagnostics` is set).  
   • On a cache miss, perform the calculation, store the result in the in-memory cache, and asynchronously write the full cache object back to disk.

3. HTTP API Integration (`/pi` endpoint in createApp())
   • Read the same cache at server startup and share the in-memory object across requests.  
   • For each `/pi` request, generate the cache key and return a cached result immediately if present.  
   • Support a query parameter `cache=false` to bypass lookup and force recomputation on demand.  

4. Concurrency & Error Handling
   • Wrap all file I/O in try/catch blocks. On write failures, log a warning (using the Pino logger if available) but do not fail the calculation.  
   • Perform writes asynchronously or off the main request path to avoid blocking I/O.  

# Testing

1. Unit tests in `tests/unit/main.test.js` and `tests/unit/server.test.js`:
   • Mock `fs.readFileSync`, `fs.existsSync`, and atomic write methods to simulate existing cache files, invalid JSON, and write errors.  
   • Verify that on a cache hit, the calculation function is never invoked and the result comes from cache.  
   • Verify that on a cache miss, the calculation is invoked and the new entry is persisted.  
   • Test the `--cache` flag and `cache=false` query parameter to ensure bypass behavior works correctly.

# Documentation

1. docs/USAGE.md:
   • Under **Options**, document `--cache` (boolean) and `CACHE_DISABLED` env var.  
   • Show CLI examples demonstrating cache hits and misses.  

2. README.md:
   • Under **Features**, add **Result Caching** with a description and example usage for both CLI and HTTP.
