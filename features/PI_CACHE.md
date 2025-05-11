# Overview

Implement a persistent cache for computed π values on disk to accelerate repeated queries. When a user requests π to a certain number of digits and a cache file exists, the tool will serve the prefix from cache if available, or compute only the additional digits and append them to the cache. This dramatically reduces computation time for repeated or incremental precision requests.

# CLI Interface

- Add flag --cache-file or -c followed by an optional file path for the cache file. Default to .pi_cache in the working directory.
- Add flag --no-cache to disable cache lookup and writing.
- When --cache-file is provided, use that path; otherwise use default cache path.
- Cache operations are silent by default; add verbose logging if --verbose is enabled.

# Implementation Details

- Extend argument parsing in src/lib/main.js to detect --cache-file, --no-cache, and --verbose flags.
- On invocation:
  - If caching is enabled and cache file exists:
    - Read the cache file contents (string of π digits).
    - If requested digits <= cache length:
      - Immediately return the prefix of the cached string up to the requested length.
      - Skip calculation.
    - If requested digits > cache length:
      - Compute the additional tail segment: calculatePi(requestedDigits).slice(cacheLength).
      - Append the new segment to the cache file via fs.appendFileSync.
      - Return full π string.
  - If caching is disabled or cache file does not exist:
    - Compute π via calculatePi and if caching enabled, write full string to new cache file.
  - All file system errors (permission, invalid path) should throw descriptive errors.

# Testing

- In tests/unit/main.test.js:
  - Use a temporary test cache file path and simulate main with --digits, --cache-file testCache.
    - First invocation should compute and create the file containing π digits to N.
    - Second invocation with smaller digits should read from cache and not call calculatePi internally (mock function to track calls).
    - Third invocation with larger digits should call calculatePi only for the delta and append to cache file.
  - Test that --no-cache forces full recomputation and does not create or modify cache file.
  - Clean up any temporary cache files after each test.
