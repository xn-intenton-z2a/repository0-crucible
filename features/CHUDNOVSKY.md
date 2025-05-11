# Chudnovsky Algorithm

Implement the Chudnovsky algorithm for rapid convergence to compute pi to high precision. This method uses a series expansion that converges faster than Leibniz or Monte Carlo and supports calculation of pi to hundreds of decimal places within performance limits.

# CLI Usage

Users can select the Chudnovsky method by passing --algorithm chudnovsky and specifying --digits N for the number of decimal places (limit default to 1000). The tool will calculate pi using high precision arithmetic and output the result.

# Implementation

Add a function calculatePiChudnovsky in src/lib/main.js. Use BigInt for factorial and rational arithmetic, compute series terms until required precision is reached or a maximum iteration bound. Integrate the function into main dispatch under algorithm setting chudnovsky.

# Testing

Add unit tests in tests/unit/main.test.js to verify calculatePiChudnovsky for digits values such as 3, 5, 10. Compare results to Math.PI rounded to the same number of decimals. Test CLI invocation with algorithm set to chudnovsky and digits option, and validate console output.

# Documentation

Update docs/USAGE.md and README.md to include the new chudnovsky algorithm option with example commands and descriptions.