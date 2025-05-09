# PI_CACHE

## Overview
Introduce a transparent caching layer for π calculation results to avoid repeated heavy computations. When enabled, results for a given digits and method combination are stored in memory and persisted to disk, so subsequent requests return instantly without rerunning the algorithm. Users may disable caching per invocation if desired.

## CLI Usage
--no-cache             Disable cache lookup and persistence for this run. By default caching is enabled.
--cache-file <path>    Custom path to cache file on disk (default: .pi_cache.json in working directory).

Existing flags remain unchanged. By default, when caching is enabled, calculatePi will check the cache before computing, and will persist new results after fresh computation.

## Implementation Details

### Cache Store
- At startup in src/lib/pi.js, load cache data from the file specified by an environment variable or default path (.pi_cache.json) into an in-memory Map keyed by `${method}:${digits}`. If the file does not exist, start with an empty cache. Handle JSON parse errors gracefully by resetting to empty.
- On first cache miss, compute π via the existing calculation methods, then store the string result under the key, update the in-memory Map, and atomically write the complete cache object back to disk (write to temporary file then rename).

### calculatePi Wrapper
- Extend the calculatePi export signature to accept an optional options object: `calculatePi(digits, method, { cacheEnabled: boolean, cacheFilePath?: string })`. Default `cacheEnabled` to true and `cacheFilePath` to default path.
- If `cacheEnabled` is true, check in-memory cache before invoking the algorithm. If found, return cached string immediately.
- If `cacheEnabled` is false, skip lookup and skip writing to disk after computation.

### main.js Integration
- Add parsing for `--no-cache` and `--cache-file` flags in src/lib/main.js, setting `cacheEnabled` and `cacheFilePath` accordingly.
- Pass the options object into the call to calculatePi in the CLI code path.

## Tests
- Create unit tests in tests/unit/cache.test.js:
  - Stub `fs.readFileSync` and `fs.writeFileSync` to simulate cache file behavior. Clear require cache between tests.
  - Verify that on first call with given digits and method, calculatePi writes the new entry to disk and returns identical to direct algorithm output.
  - Verify that a subsequent call returns from memory without invoking the algorithm (spy on underlying calculation functions).
  - Verify that `--no-cache` parameter always invokes algorithm and never writes to disk.
  - Test custom cache file via `--cache-file` flag uses supplied path.

## Documentation
- Update README.md Features section to describe caching with example usage:
    node src/lib/main.js --digits 200 --method machin
    node src/lib/main.js --digits 200 --method machin --no-cache
    node src/lib/main.js --digits 200 --method machin --cache-file /tmp/mycache.json
- Update docs/USAGE.md under Caching:
    Description of default cache file location, disabling, and custom path behavior.