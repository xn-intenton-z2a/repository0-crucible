# Overview

Introduce comprehensive parsing and handling of advanced CLI options in the main entrypoint to enable text formatting, caching, and progress reporting features seamlessly. This feature ensures all flags (--group-size, --line-length, --no-cache, --cache-file, --progress, --progress-interval) are recognized, validated, and wired into the existing calculatePi, formatPiString, and caching modules.

# CLI Flag Parsing

Update `src/lib/main.js` to:

• Recognize new flags:
  – `--group-size <n>`: integer ≥1
  – `--line-length <n>`: integer ≥1
  – `--no-cache`: boolean to disable caching
  – `--cache-file <path>`: path to JSON cache file
  – `--progress`: boolean to enable progress reporting
  – `--progress-interval <n>`: percent interval 1–100

• Validate each value and throw descriptive errors on invalid input:
  – "Invalid --group-size. Must be integer ≥1"
  – "Invalid --line-length. Must be integer ≥1"
  – "Invalid --progress-interval. Must be integer between 1 and 100"

# Integration in Main

1. After parsing standard flags, collect advanced options into an `options` object.
2. When invoking calculatePi:
   - Pass caching options (`cacheEnabled`, `cacheFilePath`) into the wrapper in `pi.js`.
   - Attach an onProgress callback if `--progress` is set, using `--progress-interval` to throttle updates via `readline`.
3. After receiving the raw π string (`piStr`):
   - If format is `text`, call `formatPiString(piStr, groupSize, lineLength)` to produce the final output.
   - Print the formatted output to console.
4. Ensure PNG and HTTP server modes ignore formatting flags but respect caching and progress callbacks.

# Testing

• Extend `tests/unit/main.test.js`:
  - Tests for invalid `--group-size`, `--line-length`, `--no-cache`, `--cache-file`, `--progress-interval` values.
  - Test that `main` with combined flags (`--digits 50 --group-size 5 --line-length 10`) produces formatted console output via spy on `console.log`.
  - Test that `--no-cache` disables cache reads/writes by stubbing filesystem.
  - Test that `--progress` and `--progress-interval` cause console writes at expected intervals using a fake fast calculation.

# Documentation

• Update **README.md** under Key Features to document new CLI integration, listing all flags with descriptions and examples:
  - node src/lib/main.js --digits 200 --group-size 4 --line-length 20 --no-cache --cache-file mycache.json --progress --progress-interval 10

• Update **docs/USAGE.md** under "CLI Options" to include new flags, validations, and combined usage scenarios.