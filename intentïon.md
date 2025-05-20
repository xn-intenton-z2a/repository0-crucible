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

