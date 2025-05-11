# PI_CALCULATOR

# Description
Supports computing π to a specified number of decimal places using a choice of algorithms. Enables selection between Gauss-Legendre, Chudnovsky, and Monte Carlo approaches. Retains optional benchmarking and digit frequency histogram generation. Provides flexible controls for Monte Carlo simulation parameters.

# CLI Usage
node src/lib/main.js --pi <digits> --algorithm <algorithmName> [--samples <count>] [--seed <number>] [--benchmark] [--digit-frequency]

--pi                  Number of decimal places to compute π (required)
--algorithm           Algorithm to use: gauss-legendre, chudnovsky, monte-carlo (default: gauss-legendre)
--samples             Number of random samples for monte-carlo algorithm (only for monte-carlo, default: 1e6)
--seed                Seed value for Monte Carlo random number generator (only for monte-carlo, optional)
--benchmark           Optional flag; when provided, report computation time in milliseconds
--digit-frequency     Optional flag; when provided, compute and print a digit frequency histogram of the computed value

# Implementation
- Add or update dependencies: ensure decimal.js is available for high-precision algorithms
- Extend argument parser in main.js to detect:
  - --pi <digits>
  - --algorithm <algorithmName>
  - --samples <count>
  - --seed <number>
  - --benchmark
  - --digit-frequency
- Implement algorithm dispatch:
  - Gauss-Legendre: use Decimal and Gauss-Legendre as before
  - Chudnovsky: implement Chudnovsky series with Decimal for high-performance arbitrary precision
  - Monte Carlo: use built-in Math.random or seeded PRNG when --seed is provided; sample points in unit square to estimate π
- After computation:
  - Print π string to stdout
  - If digit-frequency enabled: count and print each digit 0–9 excluding decimal point
  - If benchmark enabled: print Computation Time: <elapsed> ms

# Testing
- Verify Gauss-Legendre known outputs for small digit counts
- Verify Chudnovsky outputs match Gauss-Legendre for overlapping digits
- Test Monte Carlo with small sample sizes and fixed seed produces consistent approximate value
- Confirm errors thrown for missing or invalid inputs (negative digits, unsupported algorithm names)
- Ensure combined flags produce the correct sequence of π output, histogram lines, and timing lines