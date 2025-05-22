# xn-intenton-z2a/repository0-crucible
Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
## Maintain Feature at 2025-05-22T01:04:06.133Z

Maintained feature PI_CALCULATOR.

Feature spec:

# Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text and PNG).

# CLI Options

* `--algorithm <name>`  Choose from supported algorithms: spigot, Chudnovsky.
* `--digits <n>`        Number of π digits to generate (default: 100).
* `--output <type>`     Output format: text or png (default: text).
* `--file <path>`       Optional file path to save output.

# Source File Changes

Enhance `src/lib/main.js` to:

1. Parse new CLI options using a lightweight argument parser.
2. Invoke the chosen algorithm to compute π to the requested precision.
3. Output the result as:
   - Plain text printed to console or saved to file.
   - PNG visualization rendered via a canvas library and saved to file.
4. Emit simple benchmark timings for compute and render phases when `--diagnostics` is passed.

# Test File Changes

Add unit tests in `tests/unit/main.test.js` to verify:

* Correct first 10 digits of π for each algorithm.
* CLI exits without error when invoked with valid options.
* Benchmark output appears when diagnostics flag is used.

# README Updates

Document the new commands, options, usage examples, and sample output. Update the Features section to list π calculation capabilities.

# Dependencies

Add new dependencies to `package.json`:

* A big-number library (e.g., decimal.js or big.js) for high precision.
* A canvas library (e.g., canvas) to render PNG visualizations.

Feature development should follow existing style and ensure compatibility with Node 20.

Git diff:

```diff
\n\n// New [features/PI_CALCULATOR.md]:\n# Overview

Introduce a core π calculation engine with multiple algorithm options, digit-length control, benchmark reporting, and flexible output modes (text and PNG).

# CLI Options

* `--algorithm <name>`  Choose from supported algorithms: spigot, Chudnovsky.
* `--digits <n>`        Number of π digits to generate (default: 100).
* `--output <type>`     Output format: text or png (default: text).
* `--file <path>`       Optional file path to save output.

# Source File Changes

Enhance `src/lib/main.js` to:

1. Parse new CLI options using a lightweight argument parser.
2. Invoke the chosen algorithm to compute π to the requested precision.
3. Output the result as:
   - Plain text printed to console or saved to file.
   - PNG visualization rendered via a canvas library and saved to file.
4. Emit simple benchmark timings for compute and render phases when `--diagnostics` is passed.

# Test File Changes

Add unit tests in `tests/unit/main.test.js` to verify:

* Correct first 10 digits of π for each algorithm.
* CLI exits without error when invoked with valid options.
* Benchmark output appears when diagnostics flag is used.

# README Updates

Document the new commands, options, usage examples, and sample output. Update the Features section to list π calculation capabilities.

# Dependencies

Add new dependencies to `package.json`:

* A big-number library (e.g., decimal.js or big.js) for high precision.
* A canvas library (e.g., canvas) to render PNG visualizations.

Feature development should follow existing style and ensure compatibility with Node 20.
```

LLM API Usage:

```json
{"prompt_tokens":4230,"completion_tokens":865,"total_tokens":5095,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":448,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-22T01:05:18.747Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/2715 with title:

Implement Core PI_CALCULATOR Engine with CLI Options, Algorithms, Benchmarking, and Output Modes

And description:

Background
--------
The PI_CALCULATOR feature needs a complete implementation of a π calculation engine that supports multiple algorithms (spigot and Chudnovsky), digit-length control, benchmark reporting, and flexible output formats (text and PNG). The repository currently only has a stub in src/lib/main.js and minimal tests.

Goals
-----
1. Add high-precision math and canvas dependencies.
2. Enhance src/lib/main.js to:
   - Parse CLI options: --algorithm <spigot|chudnovsky>, --digits <n>, --output <text|png>, --file <path>, and --diagnostics.
   - Compute π to N digits using the requested algorithm.
   - If --output=text, write the digits to stdout or save to --file.
   - If --output=png, render the digits as text onto a canvas and save as PNG to --file (or default file name).
   - When --diagnostics is present, emit compute and render timings.

3. Update tests in tests/unit/main.test.js to:
   - Verify first 10 digits of π for both algorithms.
   - Ensure CLI exits without error with valid options.
   - Confirm diagnostics flag prints timing labels (e.g., "Compute time:" and "Render time:").

4. Update README.md:
   - Document new CLI commands and options with usage examples.
   - Demonstrate saving text and PNG outputs.
   - List the π calculation feature under Features.

5. Update package.json:
   - Add dependencies: decimal.js (for big‐number arithmetic), canvas (for PNG rendering), and minimist (for argument parsing).

Tasks
-----
- package.json (dependencies):
  • Add "decimal.js" and "canvas".
  • Add "minimist" for parsing.

- src/lib/main.js:
  • Import minimist, Decimal from decimal.js, and create Canvas via canvas.
  • Add functions: computePiSpigot(digits), computePiChudnovsky(digits).
  • In main(), parse args, call selected algorithm, measure time with console.time/console.timeEnd when --diagnostics.
  • Write output or render PNG.

- tests/unit/main.test.js:
  • Add tests for computePiSpigot and computePiChudnovsky first 10 digits.
  • Simulate CLI calls (e.g., programmatic main invocation) for text and PNG modes and diagnostics flag.

- README.md:
  • Under "Features", add π calculation engine.
  • Under "Usage", show examples of:
     - node src/lib/main.js --algorithm spigot --digits 50
     - node src/lib/main.js --algorithm chudnovsky --digits 100 --output=png --file=pi100.png
     - node src/lib/main.js --diagnostics

Verification
------------
- Run npm install to pull in new dependencies.
- npm test should pass all new unit tests.
- Manually try:
    node src/lib/main.js --algorithm spigot --digits 10
    node src/lib/main.js --algorithm chudnovsky --digits 20 --output=png --file=pi20.png
    node src/lib/main.js --digits 30 --diagnostics
- Confirm output digits and PNG file creation, and that diagnostics timings appear.


LLM API Usage:

```json
{"prompt_tokens":4690,"completion_tokens":1346,"total_tokens":6036,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":576,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-22T01:06:15.286Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/ with enhanced description:

Implement the core π calculation engine with configurable CLI options, two algorithm implementations (Spigot and Chudnovsky), benchmark reporting, and dual output modes (text and PNG).  

Acceptance Criteria:  
1. CLI Behavior  
   - Running `node src/lib/main.js --algorithm spigot --digits 10` prints exactly the first 10 digits of π (`3.141592653`) to stdout and exits with code 0.  
   - Running `node src/lib/main.js --algorithm chudnovsky --digits 15` prints the first 15 digits of π (`3.14159265358979`) to stdout and exits with code 0.  
   - When `--file <path>` is provided with `--output=text`, the digits are written to the given file instead of stdout.  
2. PNG Output  
   - Running `node src/lib/main.js --algorithm spigot --digits 20 --output=png --file=pi20.png` produces a valid PNG at `pi20.png`.  
   - The PNG can be opened in any standard image viewer and visibly contains the computed digits.  
3. Diagnostics  
   - Including `--diagnostics` logs lines prefixed `Compute time:` and `Render time:` (if PNG) to the console.  
4. Unit Tests  
   - `tests/unit/main.test.js` includes tests verifying the first ten digits returned by `computePiSpigot(10)` and `computePiChudnovsky(10)`.  
   - Tests simulate CLI invocations for text and PNG outputs and assert exit status 0 and expected side effects (stdout content or file creation).  
5. Documentation  
   - `README.md` is updated with examples for all CLI options: algorithm selection, digit count, output mode, file path, and diagnostics.  
6. Dependencies  
   - `package.json` is updated to include `decimal.js`, `canvas`, and `minimist` as dependencies.  

Implementation Tasks:  
- Add and import `minimist` for CLI parsing, `decimal.js` for high-precision arithmetic, and `canvas` for PNG rendering.  
- Implement `computePiSpigot(digits)` and `computePiChudnovsky(digits)` functions.  
- Enhance `main(args)` in `src/lib/main.js` to parse options, compute π, render output, and measure timings with `console.time()`/`console.timeEnd()`.  
- Write and update unit tests in `tests/unit/main.test.js` to cover all acceptance criteria.  
- Update `README.md` under Features and Usage sections with CLI command examples and expected outcomes.

LLM API Usage:

```json
{"prompt_tokens":5169,"completion_tokens":2039,"total_tokens":7208,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1408,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

