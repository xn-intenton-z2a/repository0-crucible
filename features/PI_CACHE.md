# Overview

This feature introduces persistent caching of π computation results to speed up repeated calculations. A local cache file stores results for combinations of digit count and algorithm. When caching is enabled, the library checks the cache for existing results and returns them if available; otherwise it computes the value and stores it for future reuse.

# Functional Requirements

- Extend calculatePi to accept cache options:
  - Add optional parameters useCache (boolean default false) and cacheFile (string default .pi_cache.json)
  - Before computation, load cacheFile and look for an entry keyed by algorithm|digits
  - If a cached entry exists, return its value without recomputing
  - If no entry exists, compute π, then write the new result to cacheFile under the same key
- Cache file format:
  - JSON mapping keys of the form algorithm|digits to the string representation of π
  - Create cacheFile if it does not exist and handle concurrent reads and writes safely
  - Use file locks or atomic writes to prevent corruption

# CLI Interface

- Add flags --use-cache and --cache-file <path> to src/lib/main.js
- When --use-cache is present, enable caching; otherwise ignore cache options
- --cache-file allows specifying a custom cache file path
- Example invocations:
  node src/lib/main.js --digits 1000 --algorithm gauss-legendre --use-cache
  node src/lib/main.js --digits 200 --use-cache --cache-file custom_cache.json

# Dependencies

- Use built in fs and fs promises APIs; no new dependencies are required

# Testing

- Add unit tests that mock file system operations to simulate cache hits and misses
- Verify calculatePi returns the cached value when available and skips heavy computation on cache hit
- Verify that on cache miss the new result is added to cacheFile
- Test CLI flag parsing to ensure --use-cache and --cache-file correctly control caching behavior