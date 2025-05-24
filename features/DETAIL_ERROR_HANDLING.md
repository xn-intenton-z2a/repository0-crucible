# Overview

Enhance CLI robustness by covering key error and default-output edge cases in automated tests. Ensure the pi calculator CLI correctly reports validation errors, uses standard exit codes, and generates default filenames when file paths are omitted.

# Behavior Scenarios

1. BBP Mode Missing Hex-Index
   - When user runs `node src/lib/main.js --algorithm bbp` without `--hex-index`, CLI must exit code 1 and print an error message matching `Invalid or missing hex-index for BBP algorithm` to stderr.

2. Unknown Algorithm
   - When user runs `node src/lib/main.js --algorithm foobar`, CLI must exit code 1 and print `Unknown algorithm: foobar` to stderr.

3. Unknown Output Type
   - When user runs `node src/lib/main.js --algorithm spigot --output xml --digits 10`, CLI must exit code 1 and print `Unknown output type: xml` to stderr.

4. Default PNG Output Filename
   - When user runs `node src/lib/main.js --algorithm spigot --digits 10 --output png` without specifying `--file`, CLI must exit code 0 and create file `pi.png` in working directory.

5. Default Benchmark PNG Filename
   - When user runs `node src/lib/main.js --benchmark-sizes 5,10 --benchmark-output png` without `--benchmark-file`, CLI must exit code 0 and create file `benchmark.png` in working directory.

# Test File Changes

Update `tests/unit/main.test.js`:

* Import `spawnSync` from `child_process` and `fs`.
* Use `beforeAll`/`afterAll` hooks to collect and remove created default files (`pi.png`, `benchmark.png`).
* Add tests covering scenarios 1–5 above, asserting correct exit codes, stderr or file creation.

# Source File Changes

No changes to source code required; rely on existing error checks and default behaviors.