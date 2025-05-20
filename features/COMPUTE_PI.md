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