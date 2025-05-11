# PI_CALCULATOR

# Description
Adds a command line option to compute π to a specified number of decimal places using the Gauss-Legendre algorithm with arbitrary precision support via decimal.js.

# CLI Usage
node src/lib/main.js --pi <digits>
--pi    Number of decimal places to compute π

# Implementation
- Add dependency decimal.js
- Extend argument parser in main to detect --pi and parse the digits parameter
- Use the Gauss-Legendre iterative algorithm with Decimal objects to compute π to the requested precision
- Format and print the resulting π string to stdout

# Testing
- Unit tests for known values: digits 0 returns "3", 1 returns "3.1", 3 returns "3.142", 5 returns "3.14159"
- Tests assert proper error handling or usage output for invalid or missing numeric inputs