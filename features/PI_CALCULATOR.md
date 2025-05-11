# PI_CALCULATOR

# Description
Adds a command line option to compute π to a specified number of decimal places using the Gauss-Legendre algorithm with arbitrary precision support via decimal.js. Provides optional benchmarking mode and optional digit frequency histogram output to display the distribution of digits in the computed value.

# CLI Usage
node src/lib/main.js --pi <digits> [--benchmark] [--digit-frequency]

--pi        Number of decimal places to compute π
--benchmark Optional flag; when provided, report the time taken to compute π in milliseconds
--digit-frequency Optional flag; when provided, compute and print a digit frequency histogram of the computed value

# Implementation
- Ensure decimal.js is a dependency
- Extend argument parser in main to detect:
  - --pi <digits>
  - --benchmark
  - --digit-frequency
- Compute π using Gauss-Legendre algorithm with Decimal objects
- If benchmark mode is enabled: record high-resolution timing
- After computation:
  - Print the π string to stdout
  - If digit frequency mode is enabled:
    - Count occurrences of each digit in the π string (excluding decimal point)
    - Print lines in the form "<digit>: <count>" for digits 0–9
  - If benchmark mode is enabled: print "Computation Time: <elapsed> ms"

# Testing
- Verify known π values for digits 0,1,3,5 remain correct
- Confirm that invoking with --digit-frequency prints ten lines, one for each digit from 0 to 9, with correct counts
- Confirm combined flags produce π output, histogram lines, and timing lines in the expected order
- Test error handling for missing or invalid --pi inputs