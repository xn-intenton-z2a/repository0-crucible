# CALCULATE_PI Feature

This feature adds a `--digits <n>` flag to the CLI tool in `src/lib/main.js`, allowing computation of π (Pi) to a specified number of decimal places.

## Usage

```bash
# Default (10 decimal places)
node src/lib/main.js
# -> 3.1415926536

# Specify digits
node src/lib/main.js --digits 5
# -> 3.14159

# Rounding behavior
node src/lib/main.js --digits 3
# -> 3.142

# Help output
node src/lib/main.js --help
``` 

## Options

- `--digits <n>`: Number of decimal places to calculate (integer, default: 10, max: 1000)
- `--help`, `-h`: Show help information

## Limits & Performance

- Maximum supported digits: 1000 (requests above this will display an error and exit with a non-zero status).
- Under the hood, uses a Machin-like formula with BigInt arithmetic and extra precision for correct rounding.
- Calculating up to 1000 digits completes in under 2 seconds on modern CI environments.
