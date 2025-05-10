# PI Cache Feature

## Overview

Introduce persistent caching of π computation results to dramatically speed up repeated calculations for identical digit and algorithm combinations. Cache entries are stored in a local JSON file with safe, atomic writes and file locking to prevent corruption under concurrent access.

## Functional Requirements

- Extend `calculatePi` in `src/lib/main.js` to accept two optional parameters:
  - `useCache` (boolean, default false)
  - `cacheFile` (string, default ".pi_cache.json")
- When `useCache` is true:
  - Acquire a shared lock on `cacheFile` using `proper-lockfile`.
  - Read and parse the JSON cache file, or initialize an empty object if missing.
  - Generate a key of the form `<algorithm>|<digits>`.
  - If the key exists, return a `Decimal` instance from the cached string without recomputing.
  - If the key is absent:
    - Release the shared lock.
    - Compute π normally.
    - Acquire an exclusive lock on `cacheFile`.
    - Reload the cache file to merge concurrent updates.
    - Insert the new entry keyed by `<algorithm>|<digits>` with the string value of π.
    - Atomically write the updated JSON to a temporary file and rename to `cacheFile`.
    - Release the lock and return the computed `Decimal`.
  - Ensure locks are always released even on errors.

## CLI Interface

- In `src/lib/main.js`, extend the CLI parser to accept flags:
  - `--use-cache` (boolean) to enable caching
  - `--cache-file <path>` to specify a custom cache file
- When `--use-cache` is provided, pass `useCache=true` and `cacheFile` to `calculatePi` or `calculatePiParallel`.
- Display a log message when a cached result is served or when a new entry is cached.
- Update the help output to document the new flags and defaults.

## Dependencies

- Add `proper-lockfile` to `package.json` dependencies.
- Import `lockfile` from `proper-lockfile` and `fs/promises` in `src/lib/main.js`.

## Testing

- **Unit Tests** in `tests/unit/main.test.js`:
  - Mock file system and `proper-lockfile` to simulate cache hits and misses.
  - Verify that `calculatePi` returns cached values when present and avoids computation.
  - Confirm that on cache miss, the new result is written to the cache file atomically.
  - Test error scenarios: corrupted cache file, lock acquisition failure.
- **CLI Tests** in `tests/e2e/cli.test.js`:
  - Invoke the CLI with `--digits 10 --algorithm machin --use-cache` and assert that a cache file is created.
  - Re-run with the same flags and assert that the output is served from cache (e.g., by observing a log message).