# Overview
Extend the CLI to calculate π to a specified number of digits using multiple algorithms and benchmark execution performance.

# CLI Interface
Add a calculate command with flags:

 algorithm: choose from chudnovsky, gauss-legendre, bbp, leibniz as default algorithm
 digits: integer number of digits to compute
 benchmark: enable timing and memory usage metrics
 output: choose text or png output
 file: specify output filename for png mode

# Algorithms
Implement multiple algorithms for demonstration and performance:

 chudnovsky for fast high precision
gauss-legendre for iterative convergence
bbp for digit extraction at arbitrary positions
leibniz for simple series demonstration

# Benchmarking
When benchmark flag is enabled measure execution time and peak memory usage and include metrics in the output.

# Output Formats
text mode prints computed π digits and performance metrics to console
png mode generates a performance chart using a canvas library and saves it to a file

# Implementation Impact
Update src/lib/main.js to parse the new flags invoke algorithm implementations collect metrics and render output. Add canvas dependency in package.json write unit tests in tests/unit/main.test.js to verify small digit calculations metric reporting and output generation. Update README.md with usage examples and package.json with new dependency and script entries.