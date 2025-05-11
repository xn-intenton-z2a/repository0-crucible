# Result Caching

Provide the ability to cache π calculation outputs keyed by algorithm and parameters to speed up repeated invocations. Cached results are stored in a JSON file and reused when the same calculation is requested without diagnostic or export options.

# CLI Options

Add two options to the CLI:

--cache-file <filepath>  Path to the JSON cache file. Defaults to .pi-cache.json in the working directory
--clear-cache             Remove the existing cache file before running calculations

# Implementation

1. Extend minimist configuration in src/lib/main.js to recognize cacheFile as a string option and clearCache as a boolean option.
2. In main() before processing calculation modes:
   a. Determine cacheFile path from options.cacheFile or default to .pi-cache.json
   b. If options.clearCache is true, attempt to delete the cache file using fs.unlinkSync and ignore errors if the file does not exist
   c. Attempt to read and parse the cache file into an object mapping cache keys to result objects; if the file does not exist, initialize an empty cache object
3. Construct a cache key string based on algorithm name and relevant parameters (digits, samples, error threshold, batch size, etc.) serialized in a stable order
4. Check if a cached entry exists for the key, and if so and diagnostics, export, or chart options are not in use, log the cached result directly and return
5. After performing a calculation (in single-run, benchmark, or error modes) and obtaining the result object or numeric value, insert or update the cache object with the key and result data
6. Serialize the updated cache object and write it back to cacheFile using fs.writeFileSync

# Testing

1. In tests/unit/main.test.js add tests for cache behavior:
   - Mock fs.readFileSync to return a JSON string containing a known cached result and spy on console.log to verify a cache hit returns the expected value
   - Mock fs.unlinkSync and fs.writeFileSync to verify that --clear-cache causes deletion of cache and that new results are written to cache under correct file path
   - Test that when no cache file exists, main creates the file with the new result
2. Ensure tests cover both numeric console.log output for cache hits and JSON write operations for cache inserts

# Documentation

1. Update docs/USAGE.md to document the new --cache-file and --clear-cache options with examples showing reuse of cached output
2. Update README.md under Features to describe result caching and illustrate speedup for repeated runs using cache