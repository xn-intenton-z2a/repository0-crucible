# Feature Overview

Provide persistent caching of computed π sequences to accelerate repeated π digit requests in both CLI and HTTP modes. Cached results are stored in a local cache file and reused when possible.

# Requirements

1. Add a `--cache` flag in the CLI. When provided, after computing or retrieving the π sequence, store or update the cache in a `.pi-cache.json` file in the working directory.
2. On invocation with `--cache`, if the requested digits count is less than or equal to the cached maximum, return the substring of the cached value without recomputation. If greater, compute the additional digits, append to the cache, and return the full sequence.
3. Extend the HTTP `/pi` endpoint to accept an optional `cache=true` query parameter. When enabled, apply the same caching logic on the server side storing the cache file in a configurable cache directory.
4. Validate the integrity of the cache file format. On cache corruption, ignore the cache and recompute, issuing a warning to the user.
5. Use built-in Node.js `fs` module for reading and writing the cache file without adding external dependencies.

# Behavior

CLI: node src/lib/main.js --digits 1000 --cache
- Reads `.pi-cache.json` if present, serves up to cached digits, computes additional needed digits, updates cache, and prints full sequence.
HTTP: GET /pi?digits=500&cache=true
- Reads cache file from server cache directory, serves from cache or computes extra, updates cache, and returns JSON with pi string.
On cache file corruption, recompute full sequence, overwrite cache, and print or log a warning message.

# Testing

- Unit tests for `loadCache()`, `saveCache(piString)`, and `getPiFromCache(n)` verifying correct cache behavior.
- Integration tests invoking the CLI with `--cache` on repeated runs to assert speed improvement and correct output.
- HTTP tests for GET /pi with `cache=true` to assert caching logic and warning on corrupted cache.

# Documentation Updates

- Update README to document the `--cache` flag in CLI usage and cache file behavior.
- Add examples for HTTP request with `cache=true` and describe cache file management.