# Overview

Introduce a persistent caching mechanism to store and reuse previously computed π digits and benchmark metrics, reducing compute time for repeated or incremental requests.

# Implementation

1. Cache Storage
   • Implement a cache directory configurable via --cache-dir or CACHE_DIR environment variable.
   • Store cache entries keyed by algorithm name and digit count in JSON or binary files.
   • Maintain a cache index file for quick lookup of available entries.

2. CLI Options
   • --cache-dir <path> to specify custom cache directory.
   • --no-cache to disable cache lookup and storage.
   • --cache-format <json|binary> to choose cache serialization format.

3. Cache Lookup and Update
   • On each compute request, check cache index for existing entry matching algorithm and digits.
   • If found and caching enabled, load result and timing metrics from cache and skip computation.
   • If not found or caching disabled, compute π, then serialize and save result and metrics to cache.
   • Enforce a cache cleanup policy based on maximum total size or entry count to limit disk usage.

# Testing

- Unit tests for cache lookup logic, serialization, and deserialization.
- Simulate CLI compute calls with caching enabled and disabled to verify correct behavior and fallback logic.

# Documentation

- Update README.md with new cache-related CLI flags and usage examples.
- Document cache directory structure, index format, and format options in Usage section.