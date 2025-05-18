# PI Calculator Feature

## Feature Overview
Implement a high-precision calculation of π at user-specified digit lengths directly in the CLI. Users can request π to a chosen number of digits, benchmark performance, and receive the output in a plain text format suitable for piping or file storage.

## Requirements

1. Support a `--digits <n>` flag to specify how many digits of π to generate (default 100).
2. Support a `--benchmark` flag to display computation time and memory usage alongside the result.
3. Validate that `<n>` is a positive integer within a practical limit (e.g., up to 10000). Provide a clear error message if out of range.
4. Use a deterministic, high-precision algorithm (such as the Chudnovsky formula) implemented with JavaScript BigInt without external dependencies.
5. Ensure minimal additional dependencies—rely on built-in Node.js APIs and BigInt.

## Behavior

- When invoked without flags, the CLI computes π to 100 digits and prints it.
- When invoked with `--digits 500`, the CLI computes π to 500 digits and prints it in a single line.
- When invoked with `--benchmark`, after the π value is printed, display a summary:
  - Total execution time in milliseconds
  - Peak memory usage in megabytes
- If an invalid `--digits` value is provided, exit with an error code and print a descriptive message.

## CLI Usage Examples

node src/lib/main.js --digits 1000 > pi.txt
node src/lib/main.js --digits 250 --benchmark

## Testing

- Add unit tests for `calculatePi(n)`:
  - Verify the first 10 known digits for standard values (e.g., 3.141592653).
  - Test behavior when `n` is 0, negative, or exceeds the max limit.
- Add integration tests for the CLI:
  - Default invocation prints 100 digits and exits with code 0.
  - Invocation with valid `--digits` flag prints correct length.
  - Invocation with invalid flag prints an error and exits with code 1.

## Documentation Updates

- Update README to list "Calculate π to arbitrary precision with benchmarking" under Features.
- Provide usage examples in the README and API reference for `calculatePi` in documentation sections.