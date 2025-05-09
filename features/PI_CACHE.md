# PI_CACHE

Overview

Add a transparent caching layer for pi calculation results to avoid recomputing identical requests. Calculated values are stored both in memory and in a persistent JSON cache file so repeated invocations with the same digits and method return instantly.

# CLI Usage

Support a new flag to control caching behavior:

--no-cache    Disable use of the cache for this invocation. By default caching is enabled and automatic.

Existing flags remain unchanged. When caching is enabled, pi values for the same digits and method will be fetched from cache instead of recomputed.

# Implementation Details

In src/lib/pi.js:

• Introduce a cache store loaded at startup from .pi_cache.json in the working directory if present.  
• Wrap the calculatePi dispatcher so that before computing, it checks cache[method][digits]. If found, return the cached string.  
• After a fresh calculation, store the result in the in-memory cache and write the updated cache object back to .pi_cache.json atomically.

In src/lib/main.js:

• Parse the new --no-cache flag to disable cache lookup and prevent writing to the cache file when present.  
• Pass a cacheEnabled boolean into the calculatePi call or use a global setting to skip caching logic when disabled.

# Tests

• Unit tests should stub the cache file location to a temporary path and clear in-memory store between tests.  
• Verify that the first calculatePi call writes to cache file and that a second call returns without invoking the underlying algorithm.  
• Verify that using --no-cache always invokes the algorithm and does not write to or read from the cache file.

# Documentation

• Update README.md Features section to describe caching and the --no-cache flag with sample invocation.  
• Update docs/USAGE.md with a Caching section outlining default behavior and the disable flag.