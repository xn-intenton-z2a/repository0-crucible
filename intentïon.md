# xn-intenton-z2a/repository0-crucible
Explore novel algorithms for calculating π to varying digit lengths using different techniques, benchmark their performance, and generate results as PNG visualizations or text-based formats.
2025-05-20T01:35:24Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-crucible/tree/intention-2025-05-20T01-34Z

## Maintain Feature at 2025-05-20T01:35:45.221Z

Maintained feature COMPUTE_PI.

Feature spec:

# Compute Pi at High Precision

## Synopsis
Extend the CLI tool to compute π to a specified number of decimal places using high-precision arithmetic.

## CLI Usage
node src/lib/main.js --compute-pi <digits>

The command reads the digits parameter and prints π to that many decimal places.

## Implementation Details
- Add decimal.js library to dependencies.
- In main.js parse the --compute-pi flag and its numeric argument.
- Initialize Decimal and compute π using Machin-like formula: pi = 4 × arctan(1).
- Format the resulting Decimal value to string with the requested precision.
- Handle invalid or out-of-range digit values with a clear error message.

## Testing
- Add unit tests in tests/unit/main.test.js covering compute-pi for digits values 1, 2, and 5.
- Verify the output matches known π prefixes (e.g. "3.1", "3.14", "3.14159").

## Documentation
- Update README.md to include the new CLI option and example usage.

Git diff:

```diff
\n\n// New [features/COMPUTE_PI.md]:\n# Compute Pi at High Precision

## Synopsis
Extend the CLI tool to compute π to a specified number of decimal places using high-precision arithmetic.

## CLI Usage
node src/lib/main.js --compute-pi <digits>

The command reads the digits parameter and prints π to that many decimal places.

## Implementation Details
- Add decimal.js library to dependencies.
- In main.js parse the --compute-pi flag and its numeric argument.
- Initialize Decimal and compute π using Machin-like formula: pi = 4 × arctan(1).
- Format the resulting Decimal value to string with the requested precision.
- Handle invalid or out-of-range digit values with a clear error message.

## Testing
- Add unit tests in tests/unit/main.test.js covering compute-pi for digits values 1, 2, and 5.
- Verify the output matches known π prefixes (e.g. "3.1", "3.14", "3.14159").

## Documentation
- Update README.md to include the new CLI option and example usage.
```

LLM API Usage:

```json
{"prompt_tokens":4080,"completion_tokens":1618,"total_tokens":5698,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1344,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Feature to Issue at 2025-05-20T01:37:17.901Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/2708 with title:

Implement COMPUTE_PI feature: high-precision π calculation

And description:

## Objective

Add a new CLI flag `--compute-pi <digits>` to compute π to a specified number of decimal places using high-precision arithmetic.

### Tasks

1. **Dependencies**
   - Install and add `decimal.js` to `package.json` dependencies.

2. **Source Code** (`src/lib/main.js`)
   - Parse the `--compute-pi <digits>` flag from `args`.
   - Validate that `<digits>` is a non-negative integer within a reasonable range (e.g., 0–1,000).
   - Use `decimal.js` to compute π via a Machin-like formula:
     ```js
     // Example: pi = 16*arctan(1/5) - 4*arctan(1/239)
     // Implement arctan(x) using a Taylor series until term < 10^(-digits - 5)
     ```
   - Set `Decimal.set({ precision: digits + 5 })` before calculation.
   - Output the result with `console.log(pi.toFixed(digits));` and return the string from `main()` for testing.

3. **Tests** (`tests/unit/main.test.js`)
   - Add unit tests for `main(["--compute-pi","1"])`, `main(["--compute-pi","2"])`, and `main(["--compute-pi","5"])`.
   - Assert that the returned values are exactly:
     ```js
     expect(main(["--compute-pi","1"]).trim()).toBe("3.1");
     expect(main(["--compute-pi","2"]).trim()).toBe("3.14");
     expect(main(["--compute-pi","5"]).trim()).toBe("3.14159");
     ```

4. **Documentation** (`README.md`)
   - Under **Features**, add an entry for `--compute-pi <digits>`.
   - In **Usage**, show an example:
     ```bash
     node src/lib/main.js --compute-pi 10
     # => 3.1415926535
     ```

### Verification

- Run `npm install` to pull in `decimal.js`.
- Execute `npm test` to ensure all tests (including the new ones) pass.
- Run `node src/lib/main.js --compute-pi 5` and verify the CLI prints `3.14159`.

_No new files should be created or deleted. Only modify existing source, test, README, and `package.json`._

LLM API Usage:

```json
{"prompt_tokens":4408,"completion_tokens":1640,"total_tokens":6048,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":1024,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

## Issue to enhanced Issue at 2025-05-20T01:38:06.590Z

Updated feature development issue https://github.com/xn-intenton-z2a/repository0-crucible/issues/ with enhanced description:

## Objective

Implement a new CLI option `--compute-pi <digits>` to compute π to the specified number of decimal places using high-precision arithmetic.

## Acceptance Criteria

1. **Dependency**
   - `decimal.js` is added to `dependencies` in `package.json`.
   - Running `npm install` resolves `decimal.js`.

2. **CLI Behavior**
   - `node src/lib/main.js --compute-pi <digits>` prints exactly π to `<digits>` decimals and exits with code 0.
   - If `<digits>` is missing, non-integer, negative, or greater than 1000, the CLI prints a clear error message to stderr and exits with a non-zero code.

3. **Implementation Details**
   - The flag `--compute-pi` is parsed from `args` in `main(args)`.  
   - Input validation ensures `<digits>` is an integer in [0, 1000].  
   - Use `Decimal.set({ precision: digits + 5 })` before calculation.  
   - Compute π using a Machin-like formula, e.g.:  
     ```js
     // Machin-like identity:
     pi = Decimal(16).times(arctan(Decimal(1).div(5)))
          .minus(Decimal(4).times(arctan(Decimal(1).div(239))));
     function arctan(x) {
       // Taylor series until |term| < 10**(-digits-5)
     }
     ```
   - Return the formatted string from `main()` (`pi.toFixed(digits)`).

4. **Testing**
   - Add unit tests in `tests/unit/main.test.js` asserting:
     ```js
     expect(main(["--compute-pi","1"]).trim()).toBe("3.1");
     expect(main(["--compute-pi","2"]).trim()).toBe("3.14");
     expect(main(["--compute-pi","5"]).trim()).toBe("3.14159");
     ```
   - Test invalid inputs (e.g., `-1`, `foo`, `1001`) produce errors and non-zero exit codes.

5. **Documentation**
   - Update **Features** section in `README.md` to list `--compute-pi <digits>`.
   - Add usage example under **Usage**:
     ```bash
     node src/lib/main.js --compute-pi 10
     # => 3.1415926535
     ```

## Verification Steps

- Run `npm install` to install `decimal.js`.
- Run `npm test` and confirm all new and existing tests pass.
- Run `node src/lib/main.js --compute-pi 5` to confirm CLI prints exactly `3.14159`.

LLM API Usage:

```json
{"prompt_tokens":4880,"completion_tokens":1323,"total_tokens":6203,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```
---

